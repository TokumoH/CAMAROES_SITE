import Photo from "@/components/ui/Photo"

type Props = {
  src?: string
  alt: string
  className: string
}

export default function InteractiveImage({ src, alt, className }: Props) {
  return (
    <div className={`interactive-image ${className}`}>
      <div className="interactive-image__viewport">
        <Photo src={src} alt={alt} />
      </div>
    </div>
  )
}
