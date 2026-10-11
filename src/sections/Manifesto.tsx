import SectionTag from "@/components/ui/SectionTag"
import { ArrowIcon } from "@/components/ui/Icons"
import { siteLinks } from "@/data/links"

export default function Manifesto() {
  return (
    <section className="manifesto section" id="sobre">
      <SectionTag number="01">Quem somos</SectionTag>
      <div className="manifesto-content">
        <p className="manifesto-lead">
          A gente acredita que boas ideias não nasceram para{" "}
          <span>ficar presas em uma apresentação.</span>
        </p>
        <div className="manifesto-detail">
          <p>
            Somos uma empresa universitária formada por gente inquieta.
            Transformamos conhecimento em produtos, experiências e soluções que
            fazem diferença de verdade.
          </p>
          <div className="manifesto-actions">
            <a className="button button--primary" href={siteLinks.teamPage}>
              Conheça a equipe <ArrowIcon />
            </a>
            <a className="text-link text-link--dark" href={siteLinks.services}>
              Veja como trabalhamos <ArrowIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
