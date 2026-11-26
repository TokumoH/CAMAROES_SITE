import type { News } from "@/data/news"
import type { NewsRepository } from "./NewsRepository"

/** Tenta cada fonte em ordem e devolve a primeira que responder. */
export class FallbackNewsRepository implements NewsRepository {
  constructor(private readonly sources: readonly NewsRepository[]) {}

  async fetchAll(signal?: AbortSignal): Promise<News[]> {
    let lastError: unknown = new Error("Nenhuma fonte de notícias configurada")
    for (const source of this.sources) {
      if (signal?.aborted) break
      try {
        return await source.fetchAll(signal)
      } catch (error) {
        lastError = error
      }
    }
    throw lastError
  }
}
