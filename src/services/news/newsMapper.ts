import { isNewsCategory, type News } from "@/data/news"

// Converte o JSON recebido em notícias válidas. O arquivo vem do nosso repositório,
// mas é tratado como entrada não confiável: campos são checados um a um, itens
// inválidos são descartados e só links/imagens com destinos seguros são aceitos.

const maxLength = { id: 120, title: 200, summary: 600, imageAlt: 200, url: 500 }
const datePattern = /^\d{4}-\d{2}-\d{2}$/

export function parseNewsPayload(payload: unknown): News[] {
  const list = Array.isArray(payload)
    ? payload
    : isRecord(payload) && Array.isArray(payload.news)
      ? payload.news
      : null
  if (!list) throw new Error("Formato inválido: esperado { \"news\": [...] }")

  const seen = new Set<string>()
  const items: News[] = []
  for (const raw of list) {
    const item = toNews(raw)
    if (item && !seen.has(item.id)) {
      seen.add(item.id)
      items.push(item)
    }
  }
  return items
}

function toNews(raw: unknown): News | null {
  if (!isRecord(raw)) return null
  const id = text(raw.id, maxLength.id)
  const title = text(raw.title, maxLength.title)
  const summary = text(raw.summary, maxLength.summary)
  const publishedAt = typeof raw.publishedAt === "string" && datePattern.test(raw.publishedAt) ? raw.publishedAt : ""
  if (!id || !title || !summary || !publishedAt || !isNewsCategory(raw.category)) return null

  const item: News = { id, title, summary, category: raw.category, publishedAt }
  const image = safeImage(raw.image)
  if (image) {
    item.image = image
    item.imageAlt = text(raw.imageAlt, maxLength.imageAlt) || title
  }
  const link = safeLink(raw.link)
  if (link) item.link = link
  if (raw.featured === true) item.featured = true
  return item
}

function text(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : ""
}

/** Imagem: URL https ou caminho relativo dentro de public/ (sem esquema, sem "//", sem ".."). */
function safeImage(value: unknown): string {
  const url = text(value, maxLength.url)
  if (!url) return ""
  if (/^https:\/\//i.test(url)) return url
  if (/^[a-z0-9][\w\-./]*$/i.test(url) && !url.includes("..") && !url.includes("//")) return url
  return ""
}

/** Link: http(s) externo ou rota interna por hash ("#/projetos", "#contato"). */
function safeLink(value: unknown): string {
  const url = text(value, maxLength.url)
  if (/^https?:\/\//i.test(url) || /^#[\w\-/]*$/.test(url)) return url
  return ""
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}
