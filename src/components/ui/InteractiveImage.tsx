import Photo from "@/components/ui/Photo"
import { linkTargetProps } from "@/components/ui/linkProps"

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
    return (
      <a className={classes} href={href} {...linkTargetProps(href)}>
        {image}
      </a>
    )
  }

  return (
    <div className={classes}>{image}</div>
  )
}
