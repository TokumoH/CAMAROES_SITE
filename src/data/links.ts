const contactEmailAddress = "camaroes.inc@gmail.com"

export const siteLinks = {
  home: "#inicio",
  about: "#sobre",
  services: "#fazemos",
  projectsSection: "#projetos",
  contact: "#contato",
  teamPage: "#/equipe",
  projectsPage: "#/projetos",
  contactEmailAddress,
  mailto: `mailto:${contactEmailAddress}`,
  gmailCompose: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(contactEmailAddress)}`,
  instagram: "https://www.instagram.com/camaroes.inc?vrfl=ZDNlZDc0MzIxNw==",
  faculdade: "https://bri.ifsp.edu.br/",
  revoCast: "https://revocast.vercel.app/",
} as const