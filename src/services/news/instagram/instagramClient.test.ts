import { describe, expect, it, vi } from "vitest"
import { fetchRecentMedia } from "./instagramClient"

const media = (id: string) => ({
  id,
  caption: "Legenda",
  media_type: "IMAGE",
  media_url: "https://x/a.jpg",
  permalink: `https://www.instagram.com/p/${id}/`,
  timestamp: "2026-11-26T15:00:00+0000",
})

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status })

describe("fetchRecentMedia", () => {
  it("pede os campos necessários com a chave e segue a paginação", async () => {
    const fetchImpl = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(json({ data: [media("1"), media("2")], paging: { next: "https://api/pagina-2" } }))
      .mockResolvedValueOnce(json({ data: [media("3")] }))

    const items = await fetchRecentMedia({ accessToken: "CHAVE", baseUrl: "https://api", fetchImpl })

    expect(items.map((item) => item.id)).toEqual(["1", "2", "3"])
    const firstUrl = new URL(String(fetchImpl.mock.calls[0][0]))
    expect(firstUrl.pathname).toBe("/me/media")
    expect(firstUrl.searchParams.get("access_token")).toBe("CHAVE")
    expect(firstUrl.searchParams.get("fields")).toContain("permalink")
    expect(fetchImpl.mock.calls[1][0]).toBe("https://api/pagina-2")
  })

  it("para ao atingir o limite", async () => {
    const fetchImpl = vi
      .fn<typeof fetch>()
      .mockImplementation(async () => json({ data: [media("1"), media("2")], paging: { next: "https://api/mais" } }))
    const items = await fetchRecentMedia({ accessToken: "x", limit: 3, baseUrl: "https://api", fetchImpl })
    expect(items).toHaveLength(3)
    expect(fetchImpl).toHaveBeenCalledTimes(2)
  })

  it("descarta itens sem os campos mínimos", async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(json({ data: [media("1"), { id: "2" }, null] }))
    expect(await fetchRecentMedia({ accessToken: "x", baseUrl: "https://api", fetchImpl })).toHaveLength(1)
  })

  it("mostra a mensagem de erro da Meta sem expor a chave", async () => {
    const fetchImpl = vi
      .fn<typeof fetch>()
      .mockResolvedValue(json({ error: { message: "Error validating access token", code: 190 } }, 400))
    const error = await fetchRecentMedia({ accessToken: "SEGREDO", baseUrl: "https://api", fetchImpl }).catch(
      (e: Error) => e,
    )
    expect(String(error)).toContain("Error validating access token")
    expect(String(error)).not.toContain("SEGREDO")
  })

  it("falha com resposta em formato inesperado", async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(json({ outra: 1 }))
    await expect(fetchRecentMedia({ accessToken: "x", baseUrl: "https://api", fetchImpl })).rejects.toThrow(
      "Resposta inesperada",
    )
  })
})
