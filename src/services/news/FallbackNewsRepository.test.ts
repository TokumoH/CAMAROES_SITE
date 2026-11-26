import { describe, expect, it, vi } from "vitest"
import { makeNews } from "@/test/fixtures"
import { FallbackNewsRepository } from "./FallbackNewsRepository"
import type { NewsRepository } from "./NewsRepository"

const ok = (id: string): NewsRepository => ({ fetchAll: vi.fn().mockResolvedValue([makeNews({ id })]) })
const failing = (message: string): NewsRepository => ({ fetchAll: vi.fn().mockRejectedValue(new Error(message)) })

describe("FallbackNewsRepository", () => {
  it("usa a primeira fonte que responder e não consulta as seguintes", async () => {
    const second = ok("segunda")
    const items = await new FallbackNewsRepository([ok("primeira"), second]).fetchAll()
    expect(items[0].id).toBe("primeira")
    expect(second.fetchAll).not.toHaveBeenCalled()
  })

  it("passa para a próxima fonte quando uma falha", async () => {
    const items = await new FallbackNewsRepository([failing("GitHub fora"), ok("copia")]).fetchAll()
    expect(items[0].id).toBe("copia")
  })

  it("propaga o último erro quando todas falham", async () => {
    await expect(new FallbackNewsRepository([failing("um"), failing("dois")]).fetchAll()).rejects.toThrow("dois")
  })

  it("falha sem fontes configuradas", async () => {
    await expect(new FallbackNewsRepository([]).fetchAll()).rejects.toThrow()
  })

  it("não tenta outras fontes depois de cancelado", async () => {
    const controller = new AbortController()
    const second = ok("segunda")
    const first: NewsRepository = {
      fetchAll: vi.fn().mockImplementation(async () => {
        controller.abort()
        throw new Error("cancelado")
      }),
    }
    await expect(new FallbackNewsRepository([first, second]).fetchAll(controller.signal)).rejects.toThrow("cancelado")
    expect(second.fetchAll).not.toHaveBeenCalled()
  })
})
