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
        <div className="contact-actions">
          <a
            className="button button--light"
            href={siteLinks.gmailCompose}
            target="_blank"
            rel="noopener noreferrer"
          >
            Tirar uma ideia do papel <ArrowIcon />
          </a>
          <a className="text-link contact-actions__mailto" href={siteLinks.mailto}>
            ou use seu app de e-mail
          </a>
        </div>
      </div>
      <div className="contact-mark">
        <OfficialLogo />
      </div>
    </section>
  )
}
