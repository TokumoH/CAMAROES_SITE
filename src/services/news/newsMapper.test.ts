import { describe, expect, it } from "vitest"
import { parseNewsPayload } from "./newsMapper"

const valid = {
  id: "n1",
  title: "Título",
  summary: "Resumo",
  category: "Equipe",
  publishedAt: "2026-11-26",
}

const parseOne = (overrides: Record<string, unknown>) => parseNewsPayload({ news: [{ ...valid, ...overrides }] })[0]

describe("parseNewsPayload: formato", () => {
  it("aceita { news: [...] } e também uma lista direta", () => {
    expect(parseNewsPayload({ news: [valid] })).toHaveLength(1)
    expect(parseNewsPayload([valid])).toHaveLength(1)
  })

  it("rejeita formatos inesperados", () => {
    expect(() => parseNewsPayload(null)).toThrow()
    expect(() => parseNewsPayload("texto")).toThrow()
    expect(() => parseNewsPayload({ items: [] })).toThrow()
  })
})

describe("parseNewsPayload: campos obrigatórios", () => {
  it.each([
    ["sem id", { id: undefined }],
    ["título vazio", { title: "   " }],
    ["sem resumo", { summary: undefined }],
    ["categoria desconhecida", { category: "Outra" }],
    ["data em outro formato", { publishedAt: "26/11/2026" }],
    ["id numérico", { id: 1 }],
  ])("descarta item %s", (_, overrides) => {
    expect(parseNewsPayload({ news: [{ ...valid, ...overrides }, { ...valid, id: "ok" }] }).map((n) => n.id)).toEqual([
      "ok",
    ])
  })

  it("ignora itens que não são objetos", () => {
    expect(parseNewsPayload({ news: [null, 42, "x", [], valid] })).toHaveLength(1)
  })

  it("mantém só a primeira ocorrência de um id repetido", () => {
    const items = parseNewsPayload({ news: [valid, { ...valid, title: "Duplicada" }] })
    expect(items).toHaveLength(1)
    expect(items[0].title).toBe("Título")
  })

  it("remove espaços nas pontas e limita o tamanho dos textos", () => {
    const item = parseOne({ title: `  ${"a".repeat(500)}  ` })
    expect(item.title).toHaveLength(200)
    expect(item.title.startsWith("a")).toBe(true)
  })
})

describe("parseNewsPayload: links e imagens seguros", () => {
  it.each(["https://revocast.vercel.app/", "http://exemplo.com", "#/projetos", "#contato"])("aceita o link %s", (link) => {
    expect(parseOne({ link }).link).toBe(link)
  })

  it.each(["javascript:alert(1)", "//evil.com", "data:text/html,oi", "mailto:a@b.c", "#/x y"])(
    "descarta o link %s",
    (link) => {
      expect(parseOne({ link }).link).toBeUndefined()
    },
  )

  it.each(["images/projects/semeia.webp", "https://cdn.exemplo.com/a.webp"])("aceita a imagem %s", (image) => {
    expect(parseOne({ image }).image).toBe(image)
  })

  it.each(["//evil.com/a.png", "http://exemplo.com/a.png", "../segredo.png", "javascript:alert(1)", "/images/a.png"])(
    "descarta a imagem %s",
    (image) => {
      expect(parseOne({ image }).image).toBeUndefined()
    },
  )

  it("usa o título como texto alternativo quando a imagem não tem imageAlt", () => {
    expect(parseOne({ image: "images/a.webp" }).imageAlt).toBe("Título")
  })

  it("só marca destaque com featured: true", () => {
    expect(parseOne({ featured: true }).featured).toBe(true)
    expect(parseOne({ featured: "true" }).featured).toBeUndefined()
  })
})
