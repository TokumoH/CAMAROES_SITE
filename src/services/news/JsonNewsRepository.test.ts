import { afterEach, describe, expect, it, vi } from "vitest"
import { JsonNewsRepository } from "./JsonNewsRepository"

const payload = {
  news: [{ id: "n1", title: "Título", summary: "Resumo", category: "Equipe", publishedAt: "2026-11-26" }],
}

function stubFetch(impl: (url: string, init?: RequestInit) => Promise<Response>) {
  const fetchMock = vi.fn(impl)
  vi.stubGlobal("fetch", fetchMock)
  return fetchMock
}

afterEach(() => {
  vi.useRealTimers()
})

describe("JsonNewsRepository", () => {
  it("busca a URL sem cache e devolve as notícias validadas", async () => {
    const fetchMock = stubFetch(async () => new Response(JSON.stringify(payload), { status: 200 }))
    const items = await new JsonNewsRepository("https://exemplo.com/noticias.json").fetchAll()
    expect(items.map((item) => item.id)).toEqual(["n1"])
    expect(fetchMock).toHaveBeenCalledWith(
      "https://exemplo.com/noticias.json",
      expect.objectContaining({ cache: "no-cache" }),
    )
  })

  it("falha com status HTTP de erro", async () => {
    stubFetch(async () => new Response("não encontrado", { status: 404 }))
    await expect(new JsonNewsRepository("x").fetchAll()).rejects.toThrow("HTTP 404")
  })

  it("falha com JSON em formato inesperado", async () => {
    stubFetch(async () => new Response(JSON.stringify({ outra: 1 }), { status: 200 }))
    await expect(new JsonNewsRepository("x").fetchAll()).rejects.toThrow()
  })

  it("cancela a requisição quando passa do tempo limite", async () => {
    vi.useFakeTimers()
    stubFetch(
      (_, init) =>
        new Promise((_resolve, reject) => {
          init?.signal?.addEventListener("abort", () => reject(new DOMException("Abortado", "AbortError")))
        }),
    )
    const result = new JsonNewsRepository("x", 1000).fetchAll()
    const assertion = expect(result).rejects.toThrow("Abortado")
    await vi.advanceTimersByTimeAsync(1000)
    await assertion
  })

  it("repassa o cancelamento externo", async () => {
    const fetchMock = stubFetch(
      (_, init) =>
        new Promise((_resolve, reject) => {
          init?.signal?.addEventListener("abort", () => reject(new DOMException("Abortado", "AbortError")))
        }),
    )
    const controller = new AbortController()
    const result = new JsonNewsRepository("x").fetchAll(controller.signal)
    controller.abort()
    await expect(result).rejects.toThrow("Abortado")
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })
})
