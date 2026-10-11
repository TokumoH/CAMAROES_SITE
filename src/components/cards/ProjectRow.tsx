import InteractiveImage from "@/components/ui/InteractiveImage"
import { ArrowIcon } from "@/components/ui/Icons"
import type { Project } from "@/data/projects"

// Linhas alternadas: fundo claro/escuro e imagem à esquerda/direita (via CSS).
export default function ProjectRow({
  project,
  index,
}: {
  project: Project
  index: number
}) {
  const dark = index % 2 === 1
  return (
    <article className={dark ? "project-row project-row--dark" : "project-row"}>
      <InteractiveImage
        className="project-row__media"
        src={project.image}
        alt={project.title}
      />
      <div className="project-row__body">
        <p className="project-row__number">
          {String(index + 1).padStart(2, "0")} · {project.category}
        </p>
        <h2>{project.title}</h2>
        <p className="project-row__text">{project.description}</p>
        {project.tags.length > 0 && (
          <div className="chips">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        )}
        {project.link && (
          <a
            className={dark ? "button button--light" : "button button--primary"}
            href={project.link}
            target="_blank"
            rel="noreferrer"
          >
            {project.linkLabel} <ArrowIcon />
          </a>
        )}
      </div>
    </article>
  )
}
