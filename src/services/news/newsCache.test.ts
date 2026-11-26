import { describe, expect, it, vi } from "vitest"
import { makeNews } from "@/test/fixtures"
import { readNewsCache, writeNewsCache } from "./newsCache"

describe("newsCache", () => {
  it("guarda e recupera a última lista", () => {
    const items = [makeNews({ id: "a" }), makeNews({ id: "b" })]
    writeNewsCache(items, 1234)
    expect(readNewsCache()).toEqual({ items, savedAt: 1234 })
  })

  it("devolve null quando não há nada salvo", () => {
    expect(readNewsCache()).toBeNull()
  })

  it("ignora conteúdo corrompido", () => {
    localStorage.setItem("camaroes:news:v1", "{não é json")
    expect(readNewsCache()).toBeNull()
    localStorage.setItem("camaroes:news:v1", JSON.stringify({ news: [] }))
    expect(readNewsCache()).toBeNull()
  })

  it("revalida os itens lidos do cache", () => {
    localStorage.setItem(
      "camaroes:news:v1",
      JSON.stringify({ news: [makeNews({ id: "ok" }), { ...makeNews({ id: "ruim" }), link: "javascript:alert(1)" }], savedAt: 1 }),
    )
    const cached = readNewsCache()
    expect(cached?.items.map((item) => item.id)).toEqual(["ok", "ruim"])
    expect(cached?.items[1].link).toBeUndefined()
  })

  it("não quebra quando o armazenamento está indisponível", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new DOMException("Cota cheia", "QuotaExceededError")
    })
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new DOMException("Bloqueado", "SecurityError")
    })
    expect(() => writeNewsCache([makeNews()], 1)).not.toThrow()
    expect(readNewsCache()).toBeNull()
  })
})
