import { siteImages } from "@/data/assets"

export type Member = {
  name: string
  role: string
  bio: string
  /** Caminho da foto dentro de public/, ex.: "images/team/ana.jpg". Vazio = espaço reservado. */
  image: string
  /** Links opcionais (aparecem só se tiverem href). Ex.: { label: "LinkedIn", href: "https://..." } */
  links: { label: string; href: string }[]
}

// ✏️ EDITE AQUI: texto de abertura da página Equipe
export const teamIntro = {
  eyebrow: "Nossa equipe",
  title: "Pessoas inquietas que ",
  highlight: "transformam ideias.",
  description:
    "Escreva aqui uma breve apresentação da equipe: quem são vocês, o que os une e como trabalham juntos.",
}

// ✏️ EDITE AQUI: os 5 membros (a ordem do array é a ordem na página)
export const team: Member[] = [
  {
    name: "Nome do membro 01",
    role: "Cargo ou função",
    bio: "Escreva aqui uma breve apresentação sobre esta pessoa.",
    image: siteImages.team[0],
    links: [{ label: "LinkedIn", href: "" }],
  },
  {
    name: "Nome do membro 02",
    role: "Cargo ou função",
    bio: "Escreva aqui uma breve apresentação sobre esta pessoa.",
    image: siteImages.team[1],
    links: [{ label: "LinkedIn", href: "" }],
  },
  {
    name: "Nome do membro 03",
    role: "Cargo ou função",
    bio: "Escreva aqui uma breve apresentação sobre esta pessoa.",
    image: siteImages.team[2],
    links: [{ label: "LinkedIn", href: "" }],
  },
  {
    name: "Nome do membro 04",
    role: "Cargo ou função",
    bio: "Escreva aqui uma breve apresentação sobre esta pessoa.",
    image: siteImages.team[3],
    links: [{ label: "LinkedIn", href: "" }],
  },
  {
    name: "Nome do membro 05",
    role: "Cargo ou função",
    bio: "Escreva aqui uma breve apresentação sobre esta pessoa.",
    image: siteImages.team[4],
    links: [{ label: "LinkedIn", href: "" }],
  },
]
