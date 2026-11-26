import { describe, expect, it } from "vitest"
import { makeNews } from "@/test/fixtures"
import { mergeNews } from "./mergeNews"

const ids = (list: { id: string }[]) => list.map((item) => item.id)

describe("mergeNews", () => {
  const manual = [makeNews({ id: "manual-1", publishedAt: "2026-11-06" })]

  it("junta manuais e posts buscados, ordenados por data", () => {
    const fetched = [makeNews({ id: "ig-2", publishedAt: "2026-11-20" }), makeNews({ id: "ig-1", publishedAt: "2026-10-01" })]
    const result = mergeNews({
      manual,
      previous: [],
      fetched,
      seenIds: new Set(["ig-1", "ig-2"]),
      oldestFetchedDate: "2026-10-01",
    })
    expect(ids(result)).toEqual(["ig-2", "manual-1", "ig-1"])
  })

  it("usa os dados novos de um post que já existia (ex.: legenda editada)", () => {
    const result = mergeNews({
      manual: [],
      previous: [makeNews({ id: "ig-1", title: "Antigo" })],
      fetched: [makeNews({ id: "ig-1", title: "Editado" })],
      seenIds: new Set(["ig-1"]),
      oldestFetchedDate: "2026-11-01",
    })
    expect(result).toHaveLength(1)
    expect(result[0].title).toBe("Editado")
  })

  it("mantém posts antigos, de fora da janela buscada", () => {
    const result = mergeNews({
      manual: [],
      previous: [makeNews({ id: "ig-velho", publishedAt: "2025-01-01" })],
      fetched: [makeNews({ id: "ig-novo", publishedAt: "2026-11-01" })],
      seenIds: new Set(["ig-novo"]),
      oldestFetchedDate: "2026-11-01",
    })
    expect(ids(result)).toEqual(["ig-novo", "ig-velho"])
  })

  it("remove posts da janela que foram apagados ou ganharam #nosite", () => {
    const result = mergeNews({
      manual: [],
      previous: [
        makeNews({ id: "ig-apagado", publishedAt: "2026-11-10" }),
        makeNews({ id: "ig-oculto", publishedAt: "2026-11-12" }),
      ],
      fetched: [],
      seenIds: new Set(["ig-oculto"]),
      oldestFetchedDate: "2026-11-01",
    })
    expect(result).toEqual([])
  })

  it("não carrega notícias manuais da execução anterior (a master é a fonte delas)", () => {
    const result = mergeNews({
      manual: [],
      previous: [makeNews({ id: "manual-apagada" })],
      fetched: [],
      seenIds: new Set(),
    })
    expect(result).toEqual([])
  })

  it("notícia manual vence em caso de id repetido", () => {
    const result = mergeNews({
      manual: [makeNews({ id: "ig-1", title: "Manual" })],
      previous: [],
      fetched: [makeNews({ id: "ig-1", title: "Instagram" })],
      seenIds: new Set(["ig-1"]),
    })
    expect(result[0].title).toBe("Manual")
  })
})
