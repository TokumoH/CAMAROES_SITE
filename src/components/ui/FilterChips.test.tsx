import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import FilterChips from "./FilterChips"

describe("FilterChips", () => {
  it("marca a opção selecionada com aria-pressed e avisa a troca", () => {
    const onChange = vi.fn()
    render(<FilterChips label="Filtrar" options={["Todas", "Eventos"]} value="Todas" onChange={onChange} />)

    expect(screen.getByRole("group", { name: "Filtrar" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Todas" })).toHaveAttribute("aria-pressed", "true")
    expect(screen.getByRole("button", { name: "Eventos" })).toHaveAttribute("aria-pressed", "false")

    fireEvent.click(screen.getByRole("button", { name: "Eventos" }))
    expect(onChange).toHaveBeenCalledWith("Eventos")
  })
})
