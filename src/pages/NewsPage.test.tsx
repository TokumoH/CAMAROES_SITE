import { fireEvent, render, screen, within } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"
import type { NewsState } from "@/hooks/useNews"
import { makeNews } from "@/test/fixtures"
import NewsPage from "./NewsPage"

// A página é testada isolada da rede: o hook useNews é substituído por um estado controlado.
const mockState = vi.hoisted(() => ({ current: {} as NewsState }))
vi.mock("@/hooks/useNews", () => ({ useNews: () => mockState.current }))

function setState(overrides: Partial<NewsState>) {
  mockState.current = {
    items: [],
    status: "ready",
    updatedAt: Date.now(),
    failed: false,
    refreshing: false,
    refresh: vi.fn(),
    ...overrides,
  }
}

const list = () => screen.getByRole("region", { name: "Lista de notícias" })
const cardTitles = () => within(list()).queryAllByRole("heading", { level: 3 }).map((h) => h.textContent)

const items = [
  makeNews({ id: "semeia", title: "SEMEIA", category: "Projetos", featured: true }),
  makeNews({ id: "kart", title: "Camarão Kart", category: "Projetos", summary: "Jogo de corrida." }),
  makeNews({ id: "revo", title: "RevoCast", category: "Eventos" }),
]

beforeEach(() => setState({ items }))

describe("NewsPage", () => {
  it("mostra o destaque separado da grade e a contagem", () => {
    render(<NewsPage />)
    expect(within(list()).getByRole("heading", { level: 2, name: "SEMEIA" })).toBeInTheDocument()
    expect(cardTitles()).toEqual(["Camarão Kart", "RevoCast"])
    expect(screen.getByText("Mostrando 3 de 3 notícias")).toBeInTheDocument()
  })

  it("ao filtrar por categoria, esconde o destaque e mostra só a categoria", () => {
    render(<NewsPage />)
    fireEvent.click(screen.getByRole("button", { name: "Eventos" }))
    expect(within(list()).queryByRole("heading", { level: 2 })).not.toBeInTheDocument()
    expect(cardTitles()).toEqual(["RevoCast"])
  })

  it("busca por texto e oferece limpar os filtros quando nada é encontrado", () => {
    render(<NewsPage />)
    const search = screen.getByRole("searchbox", { name: "Buscar notícias" })
    fireEvent.change(search, { target: { value: "corrida" } })
    expect(cardTitles()).toEqual(["Camarão Kart"])

    fireEvent.change(search, { target: { value: "inexistente" } })
    expect(screen.getByText("Nenhuma notícia encontrada.")).toBeInTheDocument()
    fireEvent.click(screen.getByRole("button", { name: "Limpar filtros" }))
    expect(cardTitles()).toEqual(["Camarão Kart", "RevoCast"])
  })

  it("mostra 6 cartões por vez e carrega mais sob demanda", () => {
    setState({
      items: Array.from({ length: 9 }, (_, i) => makeNews({ id: `n${i}`, title: `Notícia ${i}` })),
    })
    render(<NewsPage />)
    expect(cardTitles()).toHaveLength(6)
    expect(screen.getByText("Mostrando 7 de 9 notícias")).toBeInTheDocument()

    fireEvent.click(screen.getByRole("button", { name: "Carregar mais notícias" }))
    expect(cardTitles()).toHaveLength(8)
    expect(screen.queryByRole("button", { name: "Carregar mais notícias" })).not.toBeInTheDocument()
  })

  it("lista vazia sem filtros convida a ver os projetos", () => {
    setState({ items: [] })
    render(<NewsPage />)
    expect(screen.getByText("Nenhuma notícia por aqui ainda.")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /veja nossos projetos/ })).toHaveAttribute("href", "#/projetos")
  })

  it("carregando mostra esqueletos e marca a lista como ocupada", () => {
    setState({ status: "loading", updatedAt: null })
    const { container } = render(<NewsPage />)
    expect(list()).toHaveAttribute("aria-busy", "true")
    expect(container.querySelectorAll(".news-card--skeleton")).toHaveLength(3)
  })

  it("erro sem dados mostra alerta com \"Tentar de novo\"", () => {
    const refresh = vi.fn()
    setState({ status: "error", updatedAt: null, failed: true, refresh })
    render(<NewsPage />)
    expect(screen.getByRole("alert")).toHaveTextContent("Não conseguimos buscar as notícias agora.")
    fireEvent.click(screen.getByRole("button", { name: "Tentar de novo" }))
    expect(refresh).toHaveBeenCalled()
  })

  it("falha com dados antigos mantém a lista e avisa", () => {
    setState({ items, failed: true })
    render(<NewsPage />)
    expect(screen.getByText(/Mostrando a última versão recebida/)).toBeInTheDocument()
    expect(cardTitles()).toHaveLength(2)
  })
})
