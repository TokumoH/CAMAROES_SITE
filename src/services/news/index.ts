import { bundledNewsUrl, generatedNewsUrl, manualNewsUrl } from "./config"
import { FallbackNewsRepository } from "./FallbackNewsRepository"
import { JsonNewsRepository } from "./JsonNewsRepository"
import type { NewsRepository } from "./NewsRepository"

// Ordem de leitura das notícias (ADR 0002 e ADR 0004):
// 1º: o JSON gerado na branch "noticias" (posts do Instagram + notícias manuais),
//     atualizado a cada hora pela tarefa do GitHub Actions;
// 2º: as notícias manuais da master, se a branch gerada ainda não existir;
// 3º: a cópia publicada junto com o site, se o GitHub não responder.
// O GitHub pode levar cerca de 5 minutos para servir a versão nova de um arquivo.
export const newsRepository: NewsRepository = new FallbackNewsRepository([
  new JsonNewsRepository(generatedNewsUrl),
  new JsonNewsRepository(manualNewsUrl),
  new JsonNewsRepository(bundledNewsUrl),
])

/** Intervalo entre buscas automáticas enquanto a página está aberta. */
export const newsRefreshIntervalMs = 5 * 60 * 1000

export type { NewsRepository } from "./NewsRepository"
export { readNewsCache, writeNewsCache } from "./newsCache"
