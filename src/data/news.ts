// Domínio "Notícia": tipo, categorias e regras puras (sem I/O).
// O conteúdo vem de public/data/noticias.json, buscado por src/services/news/.

export const newsCategories = ["Projetos", "Eventos", "Equipe", "IFSP"] as const

export type NewsCategory = (typeof newsCategories)[number]

export type News = {
  /** Identificador único e estável (ex.: "2026-11-site-nova-versao"). */
  id: string
  title: string
  summary: string
  category: NewsCategory
  /** Data de publicação no formato AAAA-MM-DD. */
  publishedAt: string
  /** Caminho em public/ (ex.: "images/projects/semeia.webp") ou URL https. */
  image?: string
  imageAlt?: string
  /** Link opcional para ler mais (http/https ou rota interna "#/..."). */
  link?: string
  /** Marca a notícia que aparece em destaque no topo da página. */
  featured?: boolean
}

export type NewsFilter = "Todas" | NewsCategory

// ✏️ EDITE AQUI: texto de abertura da página Notícias
export const newsIntro = {
  eyebrow: "Fique por dentro",
  title: "O que está ",
  highlight: "acontecendo por aqui.",
  description:
    "Projetos que avançam, eventos de que participamos e novidades da equipe, atualizados automaticamente.",
}

/** Quantos cartões aparecem antes do botão "Carregar mais". */
export const newsPageSize = 6

export function isNewsCategory(value: unknown): value is NewsCategory {
  return typeof value === "string" && (newsCategories as readonly string[]).includes(value)
}

/** Converte "AAAA-MM-DD" em Date local (sem deslocamento de fuso). */
export function parseNewsDate(value: string): Date {
  const [year, month, day] = value.split("-").map(Number)
  return new Date(year, month - 1, day)
}

/** Mais recentes primeiro. */
export function sortNewsByDate(items: readonly News[]): News[] {
  return [...items].sort(
    (a, b) => parseNewsDate(b.publishedAt).getTime() - parseNewsDate(a.publishedAt).getTime(),
  )
}

/** A notícia marcada como destaque; sem marcação, a mais recente. */
export function pickFeatured(sorted: readonly News[]): News | undefined {
  return sorted.find((item) => item.featured) ?? sorted[0]
}

export function filterNews(items: readonly News[], filter: NewsFilter, query: string): News[] {
  const term = normalize(query.trim())
  return items.filter((item) => {
    if (filter !== "Todas" && item.category !== filter) return false
    if (!term) return true
    return normalize(`${item.title} ${item.summary}`).includes(term)
  })
}

const dateFormat = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", year: "numeric" })

export function formatNewsDate(value: string): string {
  return dateFormat.format(parseNewsDate(value))
}

function normalize(text: string): string {
  return text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
}
