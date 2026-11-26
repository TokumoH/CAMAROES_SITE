import { useNow } from "@/hooks/useNow"

type Props = {
  updatedAt: number | null
  failed: boolean
  refreshing: boolean
  onRefresh: () => void
  /** Texto curto explicando a frequência da atualização. */
  note: string
}

// Quadro "Atualizado há X min" com botão para buscar de novo.
export default function UpdateStatus({ updatedAt, failed, refreshing, onRefresh, note }: Props) {
  const now = useNow()
  const label = refreshing
    ? "Atualizando…"
    : updatedAt === null
      ? "Aguardando a primeira atualização"
      : `Atualizado ${relativeTime(now - updatedAt)}`

  return (
    <aside className="update-status" aria-label="Status da atualização">
      <p className="update-status__label">
        <span className={failed ? "update-status__dot update-status__dot--off" : "update-status__dot"} />
        {failed ? "Sem conexão com a fonte" : "Atualização automática"}
      </p>
      <p className="update-status__time" aria-live="polite">
        {label}
      </p>
      <p className="update-status__note">{note}</p>
      <button className="update-status__button" type="button" onClick={onRefresh} disabled={refreshing}>
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
          <path d="M20 12a8 8 0 1 1-2.3-5.7M20 4v5h-5" />
        </svg>
        Atualizar agora
      </button>
    </aside>
  )
}

function relativeTime(elapsedMs: number): string {
  const minutes = Math.floor(elapsedMs / 60_000)
  if (minutes < 1) return "agora mesmo"
  if (minutes < 60) return `há ${minutes} min`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `há ${hours} h`
  const days = Math.floor(hours / 24)
  return days === 1 ? "há 1 dia" : `há ${days} dias`
}
