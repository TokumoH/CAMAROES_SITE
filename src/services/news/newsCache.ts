import type { News } from "@/data/news"
import { parseNewsPayload } from "./newsMapper"

// Guarda a última lista recebida no navegador, para mostrar algo de imediato na
// próxima visita e quando a fonte estiver fora do ar. Falhas de armazenamento
// (modo privado, cota cheia) são ignoradas: o cache é só uma conveniência.

const storageKey = "camaroes:news:v1"

export type CachedNews = { items: News[]; savedAt: number }

export function readNewsCache(): CachedNews | null {
  try {
    const raw = localStorage.getItem(storageKey)
    if (!raw) return null
    const data: unknown = JSON.parse(raw)
    if (typeof data !== "object" || data === null) return null
    const { news, savedAt } = data as { news?: unknown; savedAt?: unknown }
    if (typeof savedAt !== "number") return null
    return { items: parseNewsPayload({ news }), savedAt }
  } catch {
    return null
  }
}

export function writeNewsCache(items: News[], savedAt: number): void {
  try {
    localStorage.setItem(storageKey, JSON.stringify({ news: items, savedAt }))
  } catch {
    // sem cache, sem problema
  }
}
