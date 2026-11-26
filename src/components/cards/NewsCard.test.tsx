import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { makeNews } from "@/test/fixtures"
import NewsCard from "./NewsCard"

describe("NewsCard", () => {
  it("mostra título, resumo, categoria e data formatada", () => {
    render(<NewsCard news={makeNews({ title: "Nova pista", summary: "Mais curvas.", publishedAt: "2026-11-06" })} />)
    expect(screen.getByRole("heading", { name: "Nova pista" })).toBeInTheDocument()
    expect(screen.getByText("Mais curvas.")).toBeInTheDocument()
    expect(screen.getByText("Projetos")).toBeInTheDocument()
    expect(screen.getByText(/06.*nov.*2026/)).toHaveAttribute("datetime", "2026-11-06")
  })

  it("usa a imagem com texto alternativo quando existe", () => {
    render(<NewsCard news={makeNews({ image: "images/a.webp", imageAlt: "Equipe reunida" })} />)
    expect(screen.getByRole("img", { name: "Equipe reunida" })).toHaveAttribute("src", "images/a.webp")
  })

  it("sem imagem, mostra a textura da marca escondida de leitores de tela", () => {
    const { container } = render(<NewsCard news={makeNews()} />)
    expect(screen.queryByRole("img")).not.toBeInTheDocument()
    expect(container.querySelector(".news-card__fallback")).toHaveAttribute("aria-hidden", "true")
  })

  it("link externo abre em nova aba com noopener", () => {
    render(<NewsCard news={makeNews({ title: "RevoCast", link: "https://revocast.vercel.app/" })} />)
    const link = screen.getByRole("link", { name: /Ler mais.*RevoCast/ })
    expect(link).toHaveAttribute("target", "_blank")
    expect(link).toHaveAttribute("rel", "noopener noreferrer")
  })

  it("link interno fica na mesma aba", () => {
    render(<NewsCard news={makeNews({ link: "#/projetos" })} />)
    expect(screen.getByRole("link")).not.toHaveAttribute("target")
  })

  it("sem link, não mostra \"Ler mais\"", () => {
    render(<NewsCard news={makeNews()} />)
    expect(screen.queryByRole("link")).not.toBeInTheDocument()
  })
})
