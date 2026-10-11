// Mostra a imagem se "src" existir; senão, um espaço reservado no estilo do site.
export default function Photo({
  src,
  alt,
  label = "Adicione uma imagem",
}: {
  src?: string
  alt: string
  label?: string
}) {
  if (src) return <img className="photo" src={src} alt={alt} loading="lazy" />
  return (
    <div
      className="photo photo--empty"
      role="img"
      aria-label={`${label}: ${alt}`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="9" cy="10" r="1.8" />
        <path d="m4 18 5.5-5.5 4 4 2.5-2.5L20 18" />
      </svg>
      <span>{label}</span>
    </div>
  )
}
