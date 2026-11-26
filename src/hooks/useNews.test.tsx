import { act, renderHook, waitFor } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { readNewsCache, writeNewsCache, type NewsRepository } from "@/services/news"
import { makeNews } from "@/test/fixtures"
import { useNews } from "./useNews"

const older = makeNews({ id: "antiga", publishedAt: "2026-01-01" })
const newer = makeNews({ id: "nova", publishedAt: "2026-06-01" })

function fakeRepository(impl: () => Promise<ReturnType<typeof makeNews>[]>) {
  const fetchAll = vi.fn(impl)
  return { repository: { fetchAll } as NewsRepository, fetchAll }
}

function setVisibility(state: DocumentVisibilityState) {
  Object.defineProperty(document, "visibilityState", { value: state, configurable: true })
}

beforeEach(() => setVisibility("visible"))
afterEach(() => vi.useRealTimers())

describe("useNews", () => {
  it("começa carregando e fica pronto com a lista ordenada e salva no cache", async () => {
    const { repository } = fakeRepository(async () => [older, newer])
    const { result } = renderHook(() => useNews(repository))
    expect(result.current.status).toBe("loading")

    await waitFor(() => expect(result.current.status).toBe("ready"))
    expect(result.current.items.map((item) => item.id)).toEqual(["nova", "antiga"])
    expect(result.current.failed).toBe(false)
    expect(result.current.updatedAt).toEqual(expect.any(Number))
    expect(readNewsCache()?.items).toHaveLength(2)
  })

  it("mostra erro quando a busca falha e não há cache", async () => {
    const { repository } = fakeRepository(async () => {
      throw new Error("fora do ar")
    })
    const { result } = renderHook(() => useNews(repository))
    await waitFor(() => expect(result.current.status).toBe("error"))
    expect(result.current.failed).toBe(true)
    expect(result.current.items).toEqual([])
  })

  it("com cache, mostra a lista salva na hora e a mantém se a busca falhar", async () => {
    writeNewsCache([older], 1000)
    const { repository } = fakeRepository(async () => {
      throw new Error("fora do ar")
    })
    const { result } = renderHook(() => useNews(repository))
    expect(result.current.status).toBe("ready")
    expect(result.current.updatedAt).toBe(1000)

    await waitFor(() => expect(result.current.failed).toBe(true))
    expect(result.current.status).toBe("ready")
    expect(result.current.items.map((item) => item.id)).toEqual(["antiga"])
  })

  it("refresh busca de novo e limpa a falha quando dá certo", async () => {
    let fail = true
    const { repository, fetchAll } = fakeRepository(async () => {
      if (fail) throw new Error("fora do ar")
      return [newer]
    })
    const { result } = renderHook(() => useNews(repository))
    await waitFor(() => expect(result.current.status).toBe("error"))

    fail = false
    act(() => result.current.refresh())
    await waitFor(() => expect(result.current.status).toBe("ready"))
    expect(result.current.failed).toBe(false)
    expect(fetchAll).toHaveBeenCalledTimes(2)
  })

  it("busca de novo a cada 5 minutos enquanto a aba está visível", async () => {
    vi.useFakeTimers()
    const { repository, fetchAll } = fakeRepository(async () => [newer])
    renderHook(() => useNews(repository))
    await act(() => vi.advanceTimersByTimeAsync(0))
    expect(fetchAll).toHaveBeenCalledTimes(1)

    await act(() => vi.advanceTimersByTimeAsync(5 * 60 * 1000))
    expect(fetchAll).toHaveBeenCalledTimes(2)

    setVisibility("hidden")
    await act(() => vi.advanceTimersByTimeAsync(5 * 60 * 1000))
    expect(fetchAll).toHaveBeenCalledTimes(2)
  })

  it("ao voltar para a aba, busca de novo só se passou mais de 1 minuto", async () => {
    vi.useFakeTimers()
    const { repository, fetchAll } = fakeRepository(async () => [newer])
    renderHook(() => useNews(repository))
    await act(() => vi.advanceTimersByTimeAsync(0))

    await act(async () => document.dispatchEvent(new Event("visibilitychange")))
    expect(fetchAll).toHaveBeenCalledTimes(1)

    await act(() => vi.advanceTimersByTimeAsync(61 * 1000))
    await act(async () => document.dispatchEvent(new Event("visibilitychange")))
    expect(fetchAll).toHaveBeenCalledTimes(2)
  })

  it("cancela a busca em andamento ao desmontar", async () => {
    let signal: AbortSignal | undefined
    const repository: NewsRepository = {
      fetchAll: (s) => {
        signal = s
        return new Promise(() => {})
      },
    }
    const { unmount } = renderHook(() => useNews(repository))
    unmount()
    expect(signal?.aborted).toBe(true)
  })
})
