import { ArrowIcon } from "@/components/ui/Icons"
import { siteImages } from "@/data/assets"
import { siteLinks } from "@/data/links"

export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-copy">
        <p className="eyebrow">
          <span />
          Startup universitária
        </p>
        <h1>
          Ideias que saem
          <br />
          da sala de aula.
          <br />
          <em>E mudam o jogo.</em>
        </h1>
        <p className="hero-description">
          Unimos tecnologia, criatividade e propósito para transformar desafios
          acadêmicos e sociais em soluções digitais reais.
        </p>
        <div className="hero-actions">
          <a className="button button--primary" href={siteLinks.projectsSection}>
            Conheça nossos projetos <ArrowIcon />
          </a>
          <a className="text-link" href={siteLinks.about}>
            Descubra quem somos
          </a>
        </div>
      </div>

      <div className="hero-visual" aria-label="Ideias, código e impacto">
        <div className="hero-grid" />
        <div className="hero-orbit hero-orbit--one" />
        <div className="hero-orbit hero-orbit--two" />
        <div className="hero-mark">
          <img
            className="hero-mark__image"
            src={siteImages.homeHero}
            alt="camarões.inc: ideias, código e impacto"
          />
        </div>
        <div className="floating-tag floating-tag--top">
          <span>01</span>
          Pesquisa
        </div>
        <div className="floating-tag floating-tag--bottom">
          <span>02</span>
          Tecnologia
        </div>
        <div className="code-window">
          <div className="code-window__top">
            <i />
            <i />
            <i />
            <span>impacto.tsx</span>
          </div>
          <code>
            <b>const</b> futuro = <strong>ideia</strong>
            <br />
            &nbsp;&nbsp;.comPropósito()
            <br />
            &nbsp;&nbsp;.virarRealidade();
          </code>
        </div>
        <p className="hero-signature">IDEIAS · CÓDIGO · IMPACTO</p>
      </div>
    </section>
  )
}
