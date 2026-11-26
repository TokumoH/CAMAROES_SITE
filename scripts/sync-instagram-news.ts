// Sincroniza os posts do Instagram com a página de Notícias (ADR 0004).
// Roda no GitHub Actions (.github/workflows/sync-instagram.yml); a lógica fica em
// src/services/news/instagram/, com testes. Uso local (com uma chave válida):
//   INSTAGRAM_ACCESS_TOKEN=... OUT_DIR=../noticias npx tsx scripts/sync-instagram-news.ts
import { existsSync } from "node:fs"
import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises"
import path from "node:path"
import sharp from "sharp"
import type { News } from "@/data/news"
import { generatedImageUrl, generatedNews, manualNewsPath } from "@/services/news/config"
import { fetchRecentMedia, instagramGraphUrl } from "@/services/news/instagram/instagramClient"
import { instagramIdPrefix, instagramToNews } from "@/services/news/instagram/instagramToNews"
import { mergeNews } from "@/services/news/instagram/mergeNews"
import { parseNewsPayload } from "@/services/news/newsMapper"

const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN ?? ""
const outDir = process.env.OUT_DIR ?? ""
const manualFile = process.env.MANUAL_NEWS_FILE ?? manualNewsPath
const graphUrl = process.env.INSTAGRAM_GRAPH_URL ?? instagramGraphUrl
const limit = Number(process.env.INSTAGRAM_LIMIT ?? 50)

async function main() {
  if (!accessToken) throw new Error("Defina INSTAGRAM_ACCESS_TOKEN")
  if (!outDir) throw new Error("Defina OUT_DIR (pasta da branch de notícias)")

  const newsFile = path.join(outDir, generatedNews.file)
  const imagesDir = path.join(outDir, generatedNews.imagesDir)
  await mkdir(imagesDir, { recursive: true })

  const manual = parseNewsPayload(JSON.parse(await readFile(manualFile, "utf8")))
  const previous = existsSync(newsFile) ? parseNewsPayload(JSON.parse(await readFile(newsFile, "utf8"))) : []

  const posts = await fetchRecentMedia({ accessToken, limit, baseUrl: graphUrl })
  const seenIds = new Set<string>()
  const fetched: News[] = []
  let hidden = 0
  let skipped = 0

  for (const post of posts) {
    seenIds.add(`${instagramIdPrefix}${post.id}`)
    const result = instagramToNews(post)
    if (result.kind === "hidden") hidden++
    if (result.kind === "skipped") {
      skipped++
      console.log(`Post ${post.id} ignorado: ${result.reason}`)
    }
    if (result.kind !== "news") continue

    const item = result.news
    if (result.imageSourceUrl) {
      const fileName = `${post.id}.webp`
      const saved = await saveImage(result.imageSourceUrl, path.join(imagesDir, fileName))
      if (saved) {
        item.image = generatedImageUrl(fileName)
        item.imageAlt = item.title
      }
    }
    fetched.push(item)
  }

  const oldestFetchedDate = fetched.map((item) => item.publishedAt).sort()[0]
  const merged = mergeNews({ manual, previous, fetched, seenIds, oldestFetchedDate })

  // JSON determinístico (sem data de geração): só muda quando o conteúdo muda.
  await writeFile(newsFile, `${JSON.stringify({ news: merged }, null, 2)}\n`)
  await removeUnusedImages(imagesDir, merged)
  await writeBranchReadme(outDir)

  console.log(
    `Posts lidos: ${posts.length} · viraram notícia: ${fetched.length} · ocultos (#nosite): ${hidden} · ignorados: ${skipped} · total na página: ${merged.length}`,
  )
}

/** Baixa a foto uma vez só e salva em WebP (até 1200 px de largura). */
async function saveImage(sourceUrl: string, target: string): Promise<boolean> {
  if (existsSync(target)) return true
  try {
    const response = await fetch(sourceUrl, { signal: AbortSignal.timeout(20_000) })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const buffer = Buffer.from(await response.arrayBuffer())
    await sharp(buffer).rotate().resize({ width: 1200, withoutEnlargement: true }).webp({ quality: 80 }).toFile(target)
    return true
  } catch (error) {
    console.warn(`Não foi possível salvar a foto ${path.basename(target)}: ${(error as Error).message}`)
    return false
  }
}

async function removeUnusedImages(imagesDir: string, items: News[]) {
  const used = new Set(items.map((item) => item.image && path.basename(item.image)).filter(Boolean))
  for (const file of await readdir(imagesDir)) {
    if (!used.has(file)) await rm(path.join(imagesDir, file))
  }
}

async function writeBranchReadme(dir: string) {
  const readme = path.join(dir, "README.md")
  if (existsSync(readme)) return
  await writeFile(
    readme,
    `# Notícias geradas automaticamente

Esta branch é escrita pela tarefa \`.github/workflows/sync-instagram.yml\` (veja docs/adr/0004 na master).
Não edite à mão: para notícias manuais, edite \`${manualNewsPath}\` na master.
`,
  )
}

main().catch((error: Error) => {
  console.error(error.message)
  process.exit(1)
})
