import type { News } from "@/data/news"

/** Cria uma notícia válida para testes; sobrescreva só o que importa em cada caso. */
export function makeNews(overrides: Partial<News> = {}): News {
  return {
    id: "noticia-1",
    title: "Título de teste",
    summary: "Resumo de teste.",
    category: "Projetos",
    publishedAt: "2026-11-01",
    ...overrides,
  }
}
