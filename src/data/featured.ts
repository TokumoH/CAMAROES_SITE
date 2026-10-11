import { siteImages } from "@/data/assets"

// ✏️ EDITE AQUI: textos da seção "Projetos em destaque" da página inicial.

export const featuredIntro = {
  title: "Coisas que já tiramos do papel.",
  text: "Experimentamos, prototipamos e construímos em parceria. Cada projeto é uma chance de gerar impacto mensurável.",
}

// Cartão grande (com imagem de fundo)
export const featuredMain = {
  tags: ["Tag 1", "Tag 2"],
  label: "Projeto em destaque",
  title: "Título do projeto em destaque",
  image: siteImages.featuredProject,
  imageAlt: "Imagem do projeto em destaque",
  /** Para onde a seta do cartão leva. */
  link: "#/projetos",
}

// Cartão roxo (arte: uma letra grande)
export const featuredPurple = {
  art: "P",
  category: "Categoria",
  title: "Título do projeto 02",
}

// Cartão coral (arte: texto curto em código, uma linha por item)
export const featuredCoral = {
  codeLines: ["texto curto", "aqui"],
  category: "Categoria",
  title: "Título do projeto 03",
}
