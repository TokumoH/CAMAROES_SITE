type Props = {
  eyebrow: string
  title: string
  highlight: string
  description: string
  imageSrc?: string
  imageAlt?: string
  imageLayout?: "projects"
  actionTargetId?: string
  actionLabel?: string
}

// Cabeçalho padrão das páginas internas (Equipe, Projetos...).
export default function PageHero({
  eyebrow,
  title,
  highlight,
  description,
  imageSrc,
  imageAlt,
  imageLayout,
  actionTargetId,
  actionLabel,
}: Props) {
  return (
    <section
      className={`page-hero${imageSrc ? " page-hero--with-image" : ""}${
        imageLayout ? ` page-hero--${imageLayout}` : ""
      }`}
    >
      <div className="page-hero__content">
        <p className="eyebrow">
          <span />
          {eyebrow}
        </p>
        <h1>
          {title}
          <em>{highlight}</em>
        </h1>
        <p className="page-hero__text">{description}</p>
        {actionTargetId && actionLabel && (
          <a
            className="button button--primary page-hero__action"
            href={`#${actionTargetId}`}
            onClick={(event) => {
              event.preventDefault()
              document
                .getElementById(actionTargetId)
                ?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            {actionLabel}
          </a>
        )}
      </div>
      {imageSrc && (
        <div className="page-hero__visual">
          <img src={imageSrc} alt={imageAlt ?? ""} />
        </div>
      )}
    </section>
  )
}
