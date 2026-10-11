import OfficialLogo from "@/components/ui/OfficialLogo"
import { ArrowIcon } from "@/components/ui/Icons"
import { siteLinks } from "@/data/links"

export default function Contact() {
  return (
    <section className="contact section" id="contato">
      <div className="contact-pattern" />
      <div className="contact-copy">
        <p className="eyebrow">
          <span />
          Vamos construir juntos
        </p>
        <h2>
          Tem uma ideia?
          <br />
          <em>A gente dá vida.</em>
        </h2>
        <p>
          Conte seu desafio. A próxima solução que transforma a universidade —
          ou o mundo — pode começar aqui.
        </p>
        <a className="button button--light" href={siteLinks.gmailCompose}>
          Tirar uma ideia do papel <ArrowIcon />
        </a>
      </div>
      <div className="contact-mark">
        <OfficialLogo />
      </div>
    </section>
  )
}
