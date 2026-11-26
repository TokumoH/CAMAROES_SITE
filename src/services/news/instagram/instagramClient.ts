import type { InstagramMedia } from "./types"

// Cliente mínimo da API do Instagram (login do Instagram, conta profissional).
// Roda só na tarefa do GitHub Actions: a chave nunca vai para o navegador.

export const instagramGraphUrl = "https://graph.instagram.com"
const fields = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,children{media_type,media_url,thumbnail_url}"

type Options = {
  accessToken: string
  /** Quantos posts recentes buscar, no máximo. */
  limit?: number
  baseUrl?: string
  fetchImpl?: typeof fetch
}

export async function fetchRecentMedia({
  accessToken,
  limit = 50,
  baseUrl = instagramGraphUrl,
  fetchImpl = fetch,
}: Options): Promise<InstagramMedia[]> {
  const params = new URLSearchParams({ fields, limit: String(Math.min(limit, 50)), access_token: accessToken })
  let url: string | undefined = `${baseUrl}/me/media?${params}`
  const items: InstagramMedia[] = []

  while (url && items.length < limit) {
    const response = await fetchImpl(url)
    const body = (await response.json().catch(() => ({}))) as {
      data?: unknown
      paging?: { next?: unknown }
      error?: { message?: string; code?: number }
    }
    if (!response.ok || body.error) {
      // a mensagem da Meta não inclui a chave; a URL inclui, por isso não é exibida
      const detail = body.error?.message ?? `HTTP ${response.status}`
      throw new Error(`API do Instagram recusou a requisição: ${detail}`)
    }
    if (!Array.isArray(body.data)) throw new Error("Resposta inesperada da API do Instagram")

    items.push(...(body.data.filter(isMedia) as InstagramMedia[]))
    url = typeof body.paging?.next === "string" ? body.paging.next : undefined
  }
  return items.slice(0, limit)
}

function isMedia(value: unknown): boolean {
  if (typeof value !== "object" || value === null) return false
  const media = value as Record<string, unknown>
  return typeof media.id === "string" && typeof media.permalink === "string" && typeof media.timestamp === "string"
}
