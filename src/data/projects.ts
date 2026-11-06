import { siteImages } from "@/data/assets"

export type Project = {
  title: string
  category: string
  description: string
  tags: string[]
  /** Caminho da imagem dentro de public/, ex.: "images/projects/app.jpg". Vazio = espaço reservado. */
  image: string
  /** Link opcional aberto ao clicar na imagem. */
  imageLink?: string
  /** Enquadramento opcional da imagem; use "contain" para logos. */
  imageFit?: "cover" | "contain"
  /** Link do projeto (botão só aparece se preenchido). */
  link: string
  linkLabel: string
}

// ✏️ EDITE AQUI: texto de abertura da página Projetos
export const projectsIntro = {
  eyebrow: "Nossos projetos",
  title: "Coisas que a gente ",
  highlight: "tira do papel.",
  imageSrc: siteImages.projectHero,
  imageAlt: "Imagem provisória do projeto SEMEIA",
  description:
    "Cada projeto começou como uma ideia solta e virou algo que a gente pôde testar, mostrar e aprender com ele.",
}

// ✏️ EDITE AQUI: os projetos (a ordem do array é a ordem na página)
export const projects: Project[] = [
  {
    title: "SEMEIA",
    category: "Extensão",
    description:
      "SEMEIA, uma Plataforma de Inteligência Territorial e Sustentabilidade para Assentamentos, " +
      "nasce como uma iniciativa integrada de pesquisa, inovação e extensão, voltada à geração de conhecimento, fortalecimento produtivo e valorização dos territórios de assentamentos rurais.",
    tags: ["Extensão", "Inovação"],
    image: siteImages.projects[0],
    link: "",
    linkLabel: "Conhecer projeto",
  },
  {
    title: "Camarão Kart",
    category: "Jogo",
    description:
      "Camarão Kart é um jogo de corrida criado como teste para o desenvolvimento de jogos 2D, com o objetivo de aprender e aplicar conceitos de programação, design e mecânicas de jogo.",
    tags: ["Jogo", "Desenvolvimento"],
    image: siteImages.projects[1],
    link: "",
    linkLabel: "Conhecer projeto",
  },
]
