import type { News } from "@/data/news"
import type { NewsRepository } from "./NewsRepository"
import { parseNewsPayload } from "./newsMapper"

/** Lê as notícias de um arquivo JSON servido por HTTP (GitHub ou o próprio site). */
export class JsonNewsRepository implements NewsRepository {
  constructor(
    private readonly url: string,
    private readonly timeoutMs = 10_000,
  ) {}

  async fetchAll(signal?: AbortSignal): Promise<News[]> {
    // Um controlador próprio junta o cancelamento externo e o tempo limite.
    const controller = new AbortController()
    const abort = () => controller.abort()
    const timer = window.setTimeout(abort, this.timeoutMs)
    signal?.addEventListener("abort", abort, { once: true })
    try {
      const response = await fetch(this.url, {
        cache: "no-cache",
        headers: { Accept: "application/json" },
        signal: controller.signal,
      })
      if (!response.ok) throw new Error(`Falha ao buscar notícias (HTTP ${response.status})`)
      return parseNewsPayload(await response.json())
    } finally {
      window.clearTimeout(timer)
      signal?.removeEventListener("abort", abort)
    }
  }
}
