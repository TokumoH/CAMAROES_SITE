export default function SectionTag({
  number,
  children,
  light = false,
}: {
  number: string
  children: string
  light?: boolean
}) {
  return (
    <div className={light ? "section-tag section-tag--light" : "section-tag"}>
      <span className="section-tag__number">{number}</span>
      <span className="section-tag__text">{children}</span>
      <i aria-hidden="true" />
    </div>
  )
}
