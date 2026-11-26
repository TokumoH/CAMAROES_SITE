import { useMemo, useState } from "react"
import NewsCard from "@/components/cards/NewsCard"
import NewsCardSkeleton from "@/components/cards/NewsCardSkeleton"
import NewsFeatured from "@/components/cards/NewsFeatured"
import FilterChips from "@/components/ui/FilterChips"
import PageHero from "@/components/ui/PageHero"
import SearchField from "@/components/ui/SearchField"
import StatusPanel from "@/components/ui/StatusPanel"
import UpdateStatus from "@/components/ui/UpdateStatus"
import { siteLinks } from "@/data/links"
import {
  filterNews,
  newsCategories,
  newsIntro,
  newsPageSize,
  pickFeatured,
  type NewsFilter,
} from "@/data/news"
import { useNews } from "@/hooks/useNews"
import Contact from "@/sections/Contact"

const filterOptions: readonly NewsFilter[] = ["Todas", ...newsCategories]

export default function NewsPage() {
  const { items, status, updatedAt, failed, refreshing, refresh } = useNews()
  const [filter, setFilter] = useState<NewsFilter>("Todas")
  const [query, setQuery] = useState("")
  const [visible, setVisible] = useState(newsPageSize)

  const filtering = filter !== "Todas" || query.trim() !== ""
  const featured = filtering ? undefined : pickFeatured(items)
  const results = useMemo(
    () => filterNews(items, filter, query).filter((item) => item !== featured),
    [items, filter, query, featured],
  )
  const shown = results.slice(0, visible)
  const total = results.length + (featured ? 1 : 0)
  const shownCount = shown.length + (featured ? 1 : 0)

  const changeFilter = (value: NewsFilter) => {
    setFilter(value)
    setVisible(newsPageSize)
  }
  const changeQuery = (value: string) => {
    setQuery(value)
    setVisible(newsPageSize)
  }
  const clearFilters = () => {
    changeFilter("Todas")
    setQuery("")
  }

  return (
    <>
      <PageHero
        {...newsIntro}
        aside={
          <UpdateStatus
            updatedAt={updatedAt}
            failed={failed}
            refreshing={refreshing}
            onRefresh={refresh}
            note="A lista busca novidades a cada 5 minutos e quando você volta para esta aba."
          />
        }
      />

      <div className="news-toolbar">
        <FilterChips label="Filtrar por categoria" options={filterOptions} value={filter} onChange={changeFilter} />
        <SearchField label="Buscar notícias" value={query} onChange={changeQuery} />
      </div>

      <section className="news section" aria-label="Lista de notícias" aria-busy={status === "loading"}>
        {status === "loading" && (
          <div className="news-grid">
            {Array.from({ length: 3 }, (_, index) => (
              <NewsCardSkeleton key={index} />
            ))}
          </div>
        )}

        {status === "error" && (
          <StatusPanel
            tone="dark"
            title="Não conseguimos buscar as notícias agora."
            text="Verifique sua conexão e tente de novo em instantes."
            action={
              <button className="button button--primary" type="button" onClick={refresh} disabled={refreshing}>
                Tentar de novo
              </button>
            }
          />
        )}

        {status === "ready" && (
          <>
            {failed && (
              <p className="news-notice" role="status">
                Não foi possível atualizar agora. Mostrando a última versão recebida.
              </p>
            )}

            {featured && <NewsFeatured news={featured} />}

            {shown.length > 0 && (
              <div className="news-grid">
                {shown.map((news) => (
                  <NewsCard key={news.id} news={news} />
                ))}
              </div>
            )}

            {total === 0 && (
              <StatusPanel
                title={filtering ? "Nenhuma notícia encontrada." : "Nenhuma notícia por aqui ainda."}
                text={
                  filtering
                    ? "Tente outra categoria ou outro termo de busca."
                    : "Assim que publicarmos novidades, elas aparecem aqui."
                }
                action={
                  filtering ? (
                    <button className="text-link text-link--dark" type="button" onClick={clearFilters}>
                      Limpar filtros
                    </button>
                  ) : (
                    <a className="text-link text-link--dark" href={siteLinks.projectsPage}>
                      Enquanto isso, veja nossos projetos
                    </a>
                  )
                }
              />
            )}

            {total > 0 && (
              <div className="news-more">
                {shown.length < results.length && (
                  <button
                    className="button button--primary"
                    type="button"
                    onClick={() => setVisible((count) => count + newsPageSize)}
                  >
                    Carregar mais notícias
                  </button>
                )}
                <p aria-live="polite">
                  Mostrando {shownCount} de {total} {total === 1 ? "notícia" : "notícias"}
                </p>
              </div>
            )}
          </>
        )}
      </section>

      <Contact />
    </>
  )
}
