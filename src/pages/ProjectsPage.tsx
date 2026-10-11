import PageHero from "@/components/ui/PageHero"
import ProjectRow from "@/components/cards/ProjectRow"
import Contact from "@/sections/Contact"
import { projects, projectsIntro } from "@/data/projects"

export default function ProjectsPage() {
  return (
    <>
      <PageHero {...projectsIntro} />
      <div className="project-list">
        {projects.map((project, index) => (
          <ProjectRow
            key={`${project.title}-${index}`}
            project={project}
            index={index}
          />
        ))}
      </div>
      <Contact />
    </>
  )
}
