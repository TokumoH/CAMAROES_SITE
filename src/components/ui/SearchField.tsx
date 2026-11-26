type Props = {
  label: string
  value: string
  onChange: (value: string) => void
}

export default function SearchField({ label, value, onChange }: Props) {
  return (
    <label className="search-field">
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <span className="visually-hidden">{label}</span>
      <input type="search" placeholder={label} value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  )
}
