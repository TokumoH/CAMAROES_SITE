import { sortNewsByDate, type News } from "@/data/news"
import { instagramIdPrefix } from "./instagramToNews"

type MergeInput = {
  /** Notícias escritas à mão (public/data/noticias.json na master). */
  manual: News[]
  /** JSON gerado na execução anterior. */
  previous: News[]
  /** Notícias convertidas dos posts buscados agora. */
  fetched: News[]
  /** Ids ("ig-...") de TODOS os posts buscados agora, inclusive os ocultos com #nosite. */
  seenIds: ReadonlySet<string>
  /** Data do post mais antigo buscado agora (AAAA-MM-DD), se houver. */
  oldestFetchedDate?: string
}

// Junta as fontes em uma lista só (ADR 0004):
// - notícias manuais sempre entram e têm prioridade em caso de id repetido;
// - posts buscados agora entram com os dados mais recentes;
// - posts antigos, de fora da janela buscada, são mantidos da execução anterior;
// - posts dentro da janela que sumiram (apagados) ou ganharam #nosite saem.
export function mergeNews({ manual, previous, fetched, seenIds, oldestFetchedDate }: MergeInput): News[] {
  const keptFromPrevious = previous.filter(
    (item) =>
      item.id.startsWith(instagramIdPrefix) &&
      !seenIds.has(item.id) &&
      oldestFetchedDate !== undefined &&
      item.publishedAt < oldestFetchedDate,
  )

  const byId = new Map<string, News>()
  for (const item of [...manual, ...fetched, ...keptFromPrevious]) {
    if (!byId.has(item.id)) byId.set(item.id, item)
  }
  return sortNewsByDate([...byId.values()])
}
