// Endereços das notícias, compartilhados pelo site (leitura) e pela tarefa
// de sincronização com o Instagram (escrita). Decisões: ADR 0002 e ADR 0004.

export const githubRepository = { owner: "TokumoH", repo: "CAMAROES_SITE" } as const

const rawBase = `https://raw.githubusercontent.com/${githubRepository.owner}/${githubRepository.repo}`

/** Branch gerada automaticamente pela tarefa do Instagram (notícias + fotos). */
export const generatedNews = {
  branch: "noticias",
  file: "noticias.json",
  imagesDir: "imagens",
} as const

/** JSON gerado: posts do Instagram + notícias escritas à mão. */
export const generatedNewsUrl = `${rawBase}/${generatedNews.branch}/${generatedNews.file}`

/** URL pública de uma foto salva pela tarefa na branch gerada. */
export function generatedImageUrl(fileName: string): string {
  return `${rawBase}/${generatedNews.branch}/${generatedNews.imagesDir}/${fileName}`
}

/** Notícias escritas à mão, na master (também entram no JSON gerado). */
export const manualNewsPath = "public/data/noticias.json"
export const manualNewsUrl = `${rawBase}/master/${manualNewsPath}`

/** Cópia publicada junto com o site, usada se o GitHub não responder. */
export const bundledNewsUrl = "data/noticias.json"
