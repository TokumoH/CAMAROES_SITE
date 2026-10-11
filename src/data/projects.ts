import { siteImages } from "@/data/assets"

export type Project = {
  title: string
  category: string
  description: string
  tags: string[]
  /** Caminho da imagem dentro de public/, ex.: "images/projects/app.jpg". Vazio = espaço reservado. */
  image: string
  /** Link do projeto (botão só aparece se preenchido). */
  link: string
  linkLabel: string
}

// ✏️ EDITE AQUI: texto de abertura da página Projetos
export const projectsIntro = {
  eyebrow: "Nossos projetos",
  title: "Coisas que a gente ",
  highlight: "tira do papel.",
  description:
    "Escreva aqui uma breve introdução sobre os projetos da camarões.inc e o impacto que eles geram.",
}

// ✏️ EDITE AQUI: os 3 projetos (a ordem do array é a ordem na página)
export const projects: Project[] = [
  {
    title: "Título do projeto 01",
    category: "Categoria",
    description:
      "Descreva aqui o projeto: qual problema resolve, para quem e qual foi o resultado.",
    tags: ["Tag 1", "Tag 2"],
    image: siteImages.projects[0],
    link: "",
    linkLabel: "Conhecer projeto",
  },
  {
    title: "Título do projeto 02",
    category: "Categoria",
    description:
      "Descreva aqui o projeto: qual problema resolve, para quem e qual foi o resultado.",
    tags: ["Tag 1", "Tag 2"],
    image: siteImages.projects[1],
    link: "",
    linkLabel: "Conhecer projeto",
  },
  {
    title: "Título do projeto 03",
    category: "Categoria",
    description:
      "Descreva aqui o projeto: qual problema resolve, para quem e qual foi o resultado.",
    tags: ["Tag 1", "Tag 2"],
    image: siteImages.projects[2],
    link: "",
    linkLabel: "Conhecer projeto",
  },
]
