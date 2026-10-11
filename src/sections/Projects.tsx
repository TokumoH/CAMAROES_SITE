import SectionTag from "@/components/ui/SectionTag"
import { ArrowIcon } from "@/components/ui/Icons"
import {
  featuredCoral,
  featuredIntro,
  featuredMain,
  featuredPurple,
} from "@/data/featured"

export default function Projects() {
  return (
    <section className="projects section" id="projetos">
      <div className="projects-intro">
        <SectionTag number="03">Projetos em destaque</SectionTag>
        <h2>{featuredIntro.title}</h2>
        <p>{featuredIntro.text}</p>
      </div>

      <article className="featured-project">
        <img src={featuredMain.image} alt={featuredMain.imageAlt} />
        <div className="featured-project__overlay" />
        <div className="featured-project__content">
          <div className="project-tags">
            {featuredMain.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <div>
            <p>{featuredMain.label}</p>
            <h3>{featuredMain.title}</h3>
          </div>
          <a href={featuredMain.link} aria-label="Conhecer projeto em destaque">
            <ArrowIcon />
          </a>
        </div>
      </article>

      <div className="project-grid">
        <article className="mini-project mini-project--purple">
          <div className="mini-project__art">
            <span>{featuredPurple.art}</span>
            <i />
            <i />
            <i />
          </div>
          <div>
            <p>{featuredPurple.category}</p>
            <h3>{featuredPurple.title}</h3>
          </div>
        </article>
        <article className="mini-project mini-project--coral">
          <div className="mini-project__code">
            <span>+</span>
            <code>
              {featuredCoral.codeLines.map((line, index) => (
                <span key={line}>
                  {index > 0 && <br />}
                  {line}
                </span>
              ))}
            </code>
          </div>
          <div>
            <p>{featuredCoral.category}</p>
            <h3>{featuredCoral.title}</h3>
          </div>
        </article>
      </div>

      <div className="projects-more">
        <a className="button button--primary" href="#/projetos">
          Ver todos os projetos <ArrowIcon />
        </a>
      </div>
    </section>
  )
}
