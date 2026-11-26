import type { ReactNode } from "react"

type Props = {
  title: string
  text: string
  /** "dark" para erros, "light" para avisos neutros (ex.: lista vazia). */
  tone?: "dark" | "light"
  action?: ReactNode
}

// Painel para estados especiais de uma lista: erro, vazio etc.
export default function StatusPanel({ title, text, tone = "light", action }: Props) {
  return (
    <div className={`status-panel status-panel--${tone}`} role={tone === "dark" ? "alert" : "status"}>
      <h2>{title}</h2>
      <p>{text}</p>
      {action}
    </div>
  )
}
