type Props = {
  eyebrow: string
  title: string
  highlight: string
  description: string
}

// Cabeçalho padrão das páginas internas (Equipe, Projetos...).
export default function PageHero({
  eyebrow,
  title,
  highlight,
  description,
}: Props) {
  return (
    <section className="page-hero">
      <p className="eyebrow">
        <span />
        {eyebrow}
      </p>
      <h1>
        {title}
        <em>{highlight}</em>
      </h1>
      <p className="page-hero__text">{description}</p>
    </section>
  )
}
