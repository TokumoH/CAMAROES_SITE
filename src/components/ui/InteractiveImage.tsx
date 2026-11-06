import Photo from "@/components/ui/Photo"

type Props = {
  src?: string
  alt: string
  className: string
  href?: string
  fit?: "cover" | "contain"
}

export default function InteractiveImage({
  src,
  alt,
  className,
  href,
  fit = "cover",
}: Props) {
  const image = (
    <div
      className={`interactive-image__viewport${
        fit === "contain" ? " interactive-image__viewport--contain" : ""
      }`}
    >
      <Photo src={src} alt={alt} />
    </div>
  )
  const classes = `interactive-image ${className}${href ? " interactive-image--linked" : ""}`

  if (href) {
    const external = /^https?:\/\//i.test(href)
    return (
      <a
        className={classes}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {image}
      </a>
    )
  }

  return (
    <div className={classes}>{image}</div>
  )
}
