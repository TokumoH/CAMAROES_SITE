import {
  instagramCategoryTags,
  instagramDefaultCategory,
  instagramFeaturedTag,
  instagramHiddenTag,
  type News,
} from "@/data/news"
import type { InstagramMedia } from "./types"

// Converte um post do Instagram em notícia. Regras (ADR 0004):
// - a primeira linha da legenda vira o título e o resto vira o resumo
//   (legenda de uma linha só: a primeira frase é o título);
// - hashtags saem do texto e definem categoria, destaque (#destaque) ou exclusão (#nosite);
// - posts sem texto na legenda são ignorados;
// - a data é a do post no horário de Brasília.

export const instagramIdPrefix = "ig-"
const maxTitle = 120
const maxSummary = 280
const fallbackSummary = "Publicado no Instagram da camarões.inc."

export type InstagramConversion =
  | { kind: "news"; news: News; imageSourceUrl?: string }
  | { kind: "hidden" }
  | { kind: "skipped"; reason: string }

export function instagramToNews(media: InstagramMedia, timeZone = "America/Sao_Paulo"): InstagramConversion {
  const caption = media.caption ?? ""
  const tags = extractHashtags(caption)
  if (tags.includes(instagramHiddenTag)) return { kind: "hidden" }

  const publishedAt = toLocalDate(media.timestamp, timeZone)
  if (!publishedAt) return { kind: "skipped", reason: "data inválida" }
  if (!/^https:\/\//i.test(media.permalink ?? "")) return { kind: "skipped", reason: "link do post inválido" }

  const { title, summary } = splitCaption(caption)
  if (!title) return { kind: "skipped", reason: "legenda sem texto" }

  const news: News = {
    id: `${instagramIdPrefix}${media.id}`,
    title,
    summary: summary || fallbackSummary,
    category: categoryFromTags(tags),
    publishedAt,
    link: media.permalink,
  }
  if (tags.includes(instagramFeaturedTag)) news.featured = true

  const imageSourceUrl = pickImageUrl(media)
  return imageSourceUrl ? { kind: "news", news, imageSourceUrl } : { kind: "news", news }
}

/** Hashtags da legenda, em minúsculas e sem acentos, na ordem em que aparecem. */
export function extractHashtags(caption: string): string[] {
  return [...caption.matchAll(/#([\p{L}\p{N}_]+)/gu)].map((match) => normalize(match[1]))
}

export function splitCaption(caption: string): { title: string; summary: string } {
  const lines = caption
    .split(/\r?\n/)
    .map((line) => line.replace(/#[\p{L}\p{N}_]+/gu, "").replace(/\s+/g, " ").trim())
    .filter(Boolean)
  if (lines.length === 0) return { title: "", summary: "" }

  let [title, ...rest] = lines
  if (rest.length === 0) {
    // uma linha só: separa a primeira frase do restante
    const sentence = title.match(/^(.+?[.!?])\s+(.+)$/)
    if (sentence) [title, rest] = [sentence[1], [sentence[2]]]
  }
  return { title: truncate(title, maxTitle), summary: truncate(rest.join(" "), maxSummary) }
}

function categoryFromTags(tags: string[]): News["category"] {
  for (const tag of tags) {
    const category = instagramCategoryTags[tag]
    if (category) return category
  }
  return instagramDefaultCategory
}

/** Foto do post; em vídeos, a capa; em carrosséis, a primeira mídia. */
function pickImageUrl(media: InstagramMedia): string | undefined {
  const source = media.media_type === "CAROUSEL_ALBUM" ? (media.children?.data[0] ?? media) : media
  const url = source.media_type === "VIDEO" ? source.thumbnail_url : source.media_url
  return url && /^https:\/\//i.test(url) ? url : undefined
}

/** "2026-11-27T01:30:00+0000" → "2026-11-26" (data local no fuso informado). */
export function toLocalDate(timestamp: string, timeZone: string): string {
  const date = new Date(timestamp.replace(/([+-]\d{2})(\d{2})$/, "$1:$2"))
  if (Number.isNaN(date.getTime())) return ""
  return new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).format(date)
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text
  let cut = text.slice(0, max - 1)
  const lastSpace = cut.lastIndexOf(" ")
  if (lastSpace > max * 0.6) cut = cut.slice(0, lastSpace)
  return `${cut.replace(/[\s,;:.!?-]+$/, "")}…`
}

function normalize(text: string): string {
  return text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
}
