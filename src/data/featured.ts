import { siteImages } from "@/data/assets"
import { siteLinks } from "@/data/links"

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
  link: siteLinks.projectsPage,
}

// Cartões de projetos feitos em colaboração com outras equipes.
export const featuredPurple = {
  image: siteImages.projectCollaborations[0],
  imageAlt: "Arte do RevoCast com ilustrações de mídia, leitura e tecnologia",
  category: "Participamos também",
  title: "RevoCast",
}

export const featuredCoral = {
  image: siteImages.projectCollaborations[1],
  imageAlt: "Logo da faculdade",
  category: "Onde a gente estuda",
  title: "IFSP - Campus Birigui",
}
