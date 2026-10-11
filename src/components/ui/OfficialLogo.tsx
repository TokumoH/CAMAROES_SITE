export default function OfficialLogo({
  variant = "horizontal",
}: {
  variant?: "horizontal" | "vertical" | "icon"
}) {
  return (
    <span
      className={`official-logo official-logo--${variant}`}
      role="img"
      aria-label="Logo oficial camarões.inc"
    />
  )
}
