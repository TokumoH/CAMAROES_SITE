import { describe, expect, it } from "vitest"
import { extractHashtags, instagramToNews, splitCaption, toLocalDate } from "./instagramToNews"
import type { InstagramMedia } from "./types"

function post(overrides: Partial<InstagramMedia> = {}): InstagramMedia {
  return {
    id: "1789",
    caption: "Nova pista no Camarão Kart\nAgora com modo para dois jogadores. #projetos",
    media_type: "IMAGE",
    media_url: "https://scontent.cdninstagram.com/foto.jpg",
    permalink: "https://www.instagram.com/p/ABC123/",
    timestamp: "2026-11-26T15:00:00+0000",
    ...overrides,
  }
}

function news(media: InstagramMedia) {
  const result = instagramToNews(media)
  if (result.kind !== "news") throw new Error(`esperava notícia, veio ${result.kind}`)
  return result
}

describe("instagramToNews", () => {
  it("converte legenda, data, link e categoria", () => {
    const { news: item, imageSourceUrl } = news(post())
    expect(item).toEqual({
      id: "ig-1789",
      title: "Nova pista no Camarão Kart",
      summary: "Agora com modo para dois jogadores.",
      category: "Projetos",
      publishedAt: "2026-11-26",
      link: "https://www.instagram.com/p/ABC123/",
    })
    expect(imageSourceUrl).toBe("https://scontent.cdninstagram.com/foto.jpg")
  })

  it("usa a categoria padrão sem hashtag conhecida e aceita acentos e maiúsculas", () => {
    expect(news(post({ caption: "Bom dia\n#camaroes" })).news.category).toBe("Equipe")
    expect(news(post({ caption: "Palestra\n#EVENTOS" })).news.category).toBe("Eventos")
    expect(news(post({ caption: "Visita\n#IFSP #Projetos" })).news.category).toBe("IFSP")
  })

  it("#destaque marca o destaque", () => {
    expect(news(post({ caption: "Grande dia\n#destaque" })).news.featured).toBe(true)
    expect(news(post()).news.featured).toBeUndefined()
  })

  it("#nosite deixa o post de fora", () => {
    expect(instagramToNews(post({ caption: "Meme da semana #NoSite" })).kind).toBe("hidden")
  })

  it("ignora posts sem texto, com data ou link inválidos", () => {
    expect(instagramToNews(post({ caption: undefined })).kind).toBe("skipped")
    expect(instagramToNews(post({ caption: "#projetos #eventos" })).kind).toBe("skipped")
    expect(instagramToNews(post({ timestamp: "ontem" })).kind).toBe("skipped")
    expect(instagramToNews(post({ permalink: "javascript:alert(1)" })).kind).toBe("skipped")
  })

  it("usa um resumo padrão quando a legenda só tem o título", () => {
    expect(news(post({ caption: "Só um título" })).news.summary).toMatch(/Instagram/)
  })

  it("vídeo usa a capa; carrossel usa a primeira mídia", () => {
    expect(
      news(post({ media_type: "VIDEO", media_url: "https://x/video.mp4", thumbnail_url: "https://x/capa.jpg" }))
        .imageSourceUrl,
    ).toBe("https://x/capa.jpg")
    expect(
      news(
        post({
          media_type: "CAROUSEL_ALBUM",
          media_url: undefined,
          children: {
            data: [
              { media_type: "VIDEO", thumbnail_url: "https://x/capa1.jpg" },
              { media_type: "IMAGE", media_url: "https://x/2.jpg" },
            ],
          },
        }),
      ).imageSourceUrl,
    ).toBe("https://x/capa1.jpg")
  })

  it("sem imagem válida, a notícia sai sem foto", () => {
    expect(news(post({ media_url: "http://inseguro/foto.jpg" })).imageSourceUrl).toBeUndefined()
  })
})

describe("splitCaption", () => {
  it("legenda de uma linha: a primeira frase vira título", () => {
    expect(splitCaption("Chegamos à final! Obrigado a todos que torceram.")).toEqual({
      title: "Chegamos à final!",
      summary: "Obrigado a todos que torceram.",
    })
  })

  it("junta as demais linhas, tira hashtags e espaços extras", () => {
    expect(splitCaption("Título  #a\n\nLinha 1\n  Linha 2 #b #c  ")).toEqual({
      title: "Título",
      summary: "Linha 1 Linha 2",
    })
  })

  it("encurta textos longos sem cortar palavras", () => {
    const { title, summary } = splitCaption(`${"palavra ".repeat(40)}\n${"texto ".repeat(80)}`)
    expect(title.length).toBeLessThanOrEqual(120)
    expect(title.endsWith("palavra…")).toBe(true)
    expect(summary.length).toBeLessThanOrEqual(280)
    expect(summary.endsWith("texto…")).toBe(true)
  })
})

describe("extractHashtags", () => {
  it("normaliza e mantém a ordem", () => {
    expect(extractHashtags("Oi #Notícia #IFSP e #extensão_2026")).toEqual(["noticia", "ifsp", "extensao_2026"])
  })
})

describe("toLocalDate", () => {
  it("converte para a data de Brasília", () => {
    expect(toLocalDate("2026-11-27T01:30:00+0000", "America/Sao_Paulo")).toBe("2026-11-26")
    expect(toLocalDate("2026-11-27T04:00:00+0000", "America/Sao_Paulo")).toBe("2026-11-27")
  })

  it("devolve vazio para datas inválidas", () => {
    expect(toLocalDate("não é data", "America/Sao_Paulo")).toBe("")
  })
})
