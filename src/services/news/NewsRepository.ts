import type { News } from "@/data/news"

/**
 * Porta de acesso às notícias. A página só conhece esta interface; trocar a fonte
 * (JSON no GitHub, CMS, outra API) é criar outra implementação.
 */
export interface NewsRepository {
  fetchAll(signal?: AbortSignal): Promise<News[]>
}
