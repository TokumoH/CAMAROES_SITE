import SectionTag from "@/components/ui/SectionTag"
import InteractiveImage from "@/components/ui/InteractiveImage"
import { ArrowIcon } from "@/components/ui/Icons"
import {
  featuredCoral,
  featuredIntro,
  featuredMain,
  featuredPurple,
} from "@/data/featured"
import { siteLinks } from "@/data/links"

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
          {featuredMain.link && (
            <a href={featuredMain.link} aria-label="Conhecer projeto em destaque">
              <ArrowIcon />
            </a>
          )}
        </div>
      </article>

      <div className="project-grid">
        <article className="mini-project mini-project--purple">
          <InteractiveImage
            className="mini-project__visual mini-project__visual--revo"
            src={featuredPurple.image}
            alt={featuredPurple.imageAlt}
            href={featuredPurple.imageLink}
            fit={featuredPurple.imageFit}
          />
          <div>
            <p>{featuredPurple.category}</p>
            <h3>{featuredPurple.title}</h3>
          </div>
        </article>
        <article className="mini-project mini-project--coral">
          <InteractiveImage
            className="mini-project__visual mini-project__visual--support"
            src={featuredCoral.image}
            alt={featuredCoral.imageAlt}
            href={featuredCoral.imageLink}
            fit={featuredCoral.imageFit}
          />
          <div>
            <p>{featuredCoral.category}</p>
            <h3>{featuredCoral.title}</h3>
          </div>
        </article>
      </div>

      <div className="projects-more">
        <a className="button button--primary" href={siteLinks.projectsPage}>
          Ver todos os projetos <ArrowIcon />
        </a>
      </div>
    </section>
  )
}
