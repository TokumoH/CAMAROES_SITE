import { FallbackNewsRepository } from "./FallbackNewsRepository"
import { JsonNewsRepository } from "./JsonNewsRepository"
import type { NewsRepository } from "./NewsRepository"

// Fonte das notícias (decisão em docs/adr/0002-noticias-json-no-github.md).
// 1º: o arquivo na branch master do GitHub, para que uma notícia nova apareça sem
//     novo deploy (o GitHub pode levar cerca de 5 minutos para servir a versão nova);
// 2º: a cópia publicada junto com o site, se o GitHub não responder.
const githubRepository = { owner: "TokumoH", repo: "CAMAROES_SITE", branch: "master" }
const newsFilePath = "public/data/noticias.json"

export const newsSourceUrl = `https://raw.githubusercontent.com/${githubRepository.owner}/${githubRepository.repo}/${githubRepository.branch}/${newsFilePath}`
const bundledNewsUrl = "data/noticias.json"

export const newsRepository: NewsRepository = new FallbackNewsRepository([
  new JsonNewsRepository(newsSourceUrl),
  new JsonNewsRepository(bundledNewsUrl),
])

/** Intervalo entre buscas automáticas enquanto a página está aberta. */
export const newsRefreshIntervalMs = 5 * 60 * 1000

export type { NewsRepository } from "./NewsRepository"
export { readNewsCache, writeNewsCache } from "./newsCache"
