import { describe, expect, it } from "vitest"
import {
  filterNews,
  formatNewsDate,
  isNewsCategory,
  parseNewsDate,
  pickFeatured,
  sortNewsByDate,
} from "@/data/news"
import { makeNews } from "@/test/fixtures"

describe("isNewsCategory", () => {
  it("aceita só as categorias conhecidas", () => {
    expect(isNewsCategory("Projetos")).toBe(true)
    expect(isNewsCategory("IFSP")).toBe(true)
    expect(isNewsCategory("projetos")).toBe(false)
    expect(isNewsCategory("Outra")).toBe(false)
    expect(isNewsCategory(undefined)).toBe(false)
  })
})

describe("parseNewsDate", () => {
  it("interpreta a data no fuso local, sem voltar um dia", () => {
    const date = parseNewsDate("2026-11-06")
    expect(date.getFullYear()).toBe(2026)
    expect(date.getMonth()).toBe(10)
    expect(date.getDate()).toBe(6)
  })
})

describe("sortNewsByDate", () => {
  it("ordena da mais recente para a mais antiga sem alterar a lista original", () => {
    const items = [
      makeNews({ id: "a", publishedAt: "2026-01-10" }),
      makeNews({ id: "b", publishedAt: "2026-03-01" }),
      makeNews({ id: "c", publishedAt: "2025-12-31" }),
    ]
    const sorted = sortNewsByDate(items)
    expect(sorted.map((item) => item.id)).toEqual(["b", "a", "c"])
    expect(items.map((item) => item.id)).toEqual(["a", "b", "c"])
  })
})

describe("pickFeatured", () => {
  it("prefere a notícia marcada como destaque", () => {
    const items = [makeNews({ id: "recente" }), makeNews({ id: "marcada", featured: true })]
    expect(pickFeatured(items)?.id).toBe("marcada")
  })

  it("sem marcação, usa a primeira (a mais recente da lista ordenada)", () => {
    expect(pickFeatured([makeNews({ id: "primeira" }), makeNews({ id: "segunda" })])?.id).toBe("primeira")
  })

  it("lista vazia não tem destaque", () => {
    expect(pickFeatured([])).toBeUndefined()
  })
})

describe("filterNews", () => {
  const items = [
    makeNews({ id: "kart", category: "Projetos", title: "Camarão Kart", summary: "Jogo de corrida 2D." }),
    makeNews({ id: "revo", category: "Eventos", title: "RevoCast", summary: "Participação em podcast." }),
    makeNews({ id: "ifsp", category: "IFSP", title: "Semana de tecnologia", summary: "Apresentação no câmpus." }),
  ]
  const ids = (list: { id: string }[]) => list.map((item) => item.id)

  it("\"Todas\" sem busca devolve tudo", () => {
    expect(ids(filterNews(items, "Todas", ""))).toEqual(["kart", "revo", "ifsp"])
  })

  it("filtra por categoria", () => {
    expect(ids(filterNews(items, "Eventos", ""))).toEqual(["revo"])
  })

  it("busca no título e no resumo, sem diferenciar maiúsculas e acentos", () => {
    expect(ids(filterNews(items, "Todas", "CAMARAO"))).toEqual(["kart"])
    expect(ids(filterNews(items, "Todas", "campus"))).toEqual(["ifsp"])
    expect(ids(filterNews(items, "Todas", "  podcast  "))).toEqual(["revo"])
  })

  it("combina categoria e busca", () => {
    expect(filterNews(items, "Projetos", "podcast")).toEqual([])
  })
})

describe("formatNewsDate", () => {
  it("formata em português", () => {
    expect(formatNewsDate("2026-11-06")).toMatch(/06.*nov.*2026/)
  })
})
