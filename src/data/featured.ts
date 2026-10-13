import { siteImages } from "@/data/assets"
import { siteLinks } from "@/data/links"

type FeaturedCollaboration = {
  image: string
  imageAlt: string
  imageLink?: string
  imageFit?: "cover" | "contain"
  category: string
  title: string
}

// ✏️ EDITE AQUI: textos da seção "Projetos em destaque" da página inicial.

export const featuredIntro = {
  title: "Desenvolvendo e aprendendo.",
  text: "Testamos, erramos, ajustamos e construímos." + 
        " Cada projeto é um passo a mais para descobrir o que a gente consegue fazer.",
}

// Cartão grande (com imagem de fundo)
export const featuredMain = {
  tags: ["Extensão", "Inovação"],
  label: "Projeto em destaque",
  title: "SEMEIA",
  image: siteImages.featuredProject,
  imageAlt: "Imagem do projeto em destaque",
  /** Para onde a seta do cartão leva. */
  link: "",
}

// Cartões de projetos feitos em colaboração com outras equipes.
export const featuredPurple: FeaturedCollaboration = {
  image: siteImages.projectCollaborations[0],
  imageAlt: "Arte do RevoCast com ilustrações de mídia, leitura e tecnologia",
  imageLink: siteLinks.revoCast,
  imageFit: "cover",
  category: "Participamos também",
  title: "RevoCast",
}

export const featuredCoral: FeaturedCollaboration = {
  image: siteImages.projectCollaborations[1],
  imageAlt: "Logotipo do IFSP Câmpus Birigui",
  imageLink: siteLinks.faculdade,
  imageFit: "contain",
  category: "Onde a gente estuda",
  title: "IFSP - Campus Birigui",
}
