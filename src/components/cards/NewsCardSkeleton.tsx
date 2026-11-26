// Esqueleto no formato do NewsCard, exibido enquanto a primeira resposta chega.
export default function NewsCardSkeleton() {
  return (
    <div className="news-card news-card--skeleton" aria-hidden="true">
      <div className="news-card__media" />
      <div className="news-card__body">
        <i style={{ width: "40%" }} />
        <i style={{ width: "92%", height: 20 }} />
        <i style={{ width: "70%", height: 20 }} />
        <i style={{ width: "85%" }} />
      </div>
    </div>
  )
}
