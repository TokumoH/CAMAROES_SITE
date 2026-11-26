import { ArrowIcon } from "@/components/ui/Icons"
import { linkTargetProps } from "@/components/ui/linkProps"
import { formatNewsDate, type News } from "@/data/news"

// Notícia em destaque no topo da página, com imagem de fundo.
export default function NewsFeatured({ news }: { news: News }) {
  return (
    <article className={news.image ? "news-featured" : "news-featured news-featured--plain"}>
      {news.image && <img src={news.image} alt={news.imageAlt ?? news.title} />}
      <div className="news-featured__overlay" />
      <div className="news-featured__content">
        <div className="news-featured__tags">
          <span className="news-featured__tag news-featured__tag--accent">Destaque</span>
          <span className="news-featured__tag">{news.category}</span>
        </div>
        <h2>{news.title}</h2>
        <p>{news.summary}</p>
        <div className="news-featured__footer">
          {news.link && (
            <a className="button button--primary" href={news.link} {...linkTargetProps(news.link)}>
              Ler notícia <ArrowIcon />
            </a>
          )}
          <time dateTime={news.publishedAt}>{formatNewsDate(news.publishedAt)}</time>
        </div>
      </div>
    </article>
  )
}
