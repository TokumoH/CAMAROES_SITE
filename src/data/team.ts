import { siteImages } from "@/data/assets"

export type Member = {
  name: string
  role: string
  bio: string
  /** Caminho da foto dentro de public/, ex.: "images/team/ana.jpg". Vazio = espaço reservado. */
  image: string
  sticker: string
  jerseyNumber: string
  /** Links opcionais (aparecem só se tiverem href). Ex.: { label: "LinkedIn", href: "https://..." } */
  links: { label: string; href: string }[]
}

// ✏️ EDITE AQUI: texto de abertura da página Equipe
export const teamIntro = {
  eyebrow: "Nossa equipe",
  title: "Pessoas inquietas que ",
  highlight: "transformam ideias.",
  imageSrc: siteImages.teamHero,
  imageAlt: "Estudantes colaborando em um projeto",
  description:
    "A camarões.inc é uma startup universitária feita por estudantes de engenharia da computação que querem entender" +
     ", na prática, como uma empresa nasce e funciona.",
}

// ✏️ EDITE AQUI: os 5 membros (a ordem do array é a ordem na página)
export const team: Member[] = [
  {
    name: "Victor Hideki Ioza Tokumo",
    role: "CTO",
    bio: "Bacharel em Engenharia de Computação com afinidade em Engenharia de Software e desenvolvimento de sistemas.",
    image: siteImages.team[0],
    sticker: siteImages.teamStickers[0],
    jerseyNumber: "♥",
    links: [{ label: "LinkedIn", href: "https://www.linkedin.com/in/victortokumo/" }],
  },
  {
    name: "João Pedro de Oliveira",
    role: "Desenvolvedor",
    bio: "Bacharel em Engenharia de Computação com experiência em tecnologias web e desenvolvimento de aplicações.",
    image: siteImages.team[1],
    sticker: siteImages.teamStickers[1],
    jerseyNumber: "♪",
    links: [{ label: "LinkedIn", href: "https://www.linkedin.com/in/jo%C3%A3o-pedro-ferreira-oliveira-2a4382204/" }],
  },
  {
    name: "Júlia Monguini Ribeiro",
    role: "CEO",
    bio: "Bacharel em Engenharia de Computação, entusiasta da robótica, programação, gestão de projetos e literatura.",
    image: siteImages.team[2],
    sticker: siteImages.teamStickers[2],
    jerseyNumber: "☺",
    links: [{ label: "LinkedIn", href: "https://www.linkedin.com/in/j%C3%BAlia-monguini-371708364/" }],
  },
  {
    name: "Bruno Messias de Souza Lara",
    role: "Desenvolvedor",
    bio: "Bacharel em Engenharia de Computação com experiência em desenvolvimento e análise de dados.",
    image: siteImages.team[3],
    sticker: siteImages.teamStickers[3],
    jerseyNumber: "☼",
    links: [{ label: "LinkedIn", href: "" }],
  },
  {
    name: "Katherina de Oliveira Achkar",
    role: "COO",
    bio: "Bacharel em Engenharia de Computação com experiência em desenvolvimento web.",
    image: siteImages.team[4],
    sticker: siteImages.teamStickers[4],
    links: [{ label: "LinkedIn", href: "" }],
    jerseyNumber: "♦",
  },
]
