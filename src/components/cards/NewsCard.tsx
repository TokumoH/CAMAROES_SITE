import Photo from "@/components/ui/Photo"
import { linkTargetProps } from "@/components/ui/linkProps"
import { formatNewsDate, type News } from "@/data/news"

// Cartão de uma notícia na grade. Sem imagem, mostra a textura da marca.
export default function NewsCard({ news }: { news: News }) {
  return (
    <article className="news-card">
      <div className="news-card__media">
        {news.image ? (
          <Photo src={news.image} alt={news.imageAlt ?? news.title} />
        ) : (
          <div className="news-card__fallback" aria-hidden="true">
            camarões.inc
          </div>
        )}
      </div>
      <div className="news-card__body">
        <p className="news-card__meta">
          <span>{news.category}</span>
          <time dateTime={news.publishedAt}>{formatNewsDate(news.publishedAt)}</time>
        </p>
        <h3>{news.title}</h3>
        <p className="news-card__summary">{news.summary}</p>
        {news.link && (
          <a className="news-card__link" href={news.link} {...linkTargetProps(news.link)}>
            Ler mais<span className="visually-hidden">: {news.title}</span>
          </a>
        )}
      </div>
    </article>
  )
}
