type Props<T extends string> = {
  label: string
  options: readonly T[]
  value: T
  onChange: (value: T) => void
}

// Grupo de botões de filtro; o selecionado fica marcado com aria-pressed.
export default function FilterChips<T extends string>({ label, options, value, onChange }: Props<T>) {
  return (
    <div className="filter-chips" role="group" aria-label={label}>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className="filter-chips__item"
          aria-pressed={option === value}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  )
}
