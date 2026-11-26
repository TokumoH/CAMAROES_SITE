/** Formato de um post como a API do Instagram devolve (só os campos usados). */
export type InstagramMedia = {
  id: string
  caption?: string
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM" | string
  media_url?: string
  thumbnail_url?: string
  permalink: string
  /** Ex.: "2026-11-26T22:30:00+0000". */
  timestamp: string
  children?: { data: Array<Pick<InstagramMedia, "media_type" | "media_url" | "thumbnail_url">> }
}
