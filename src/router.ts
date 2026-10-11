import { useEffect, useState } from "react"
import { siteLinks } from "@/data/links"

export type Route = "home" | "team" | "projects"

// Para criar uma nova página: adicione a rota aqui, o título abaixo
// e a página em src/pages/ + src/App.tsx.
const routes: Record<string, Route> = {
  [siteLinks.teamPage]: "team",
  [siteLinks.projectsPage]: "projects",
}

export const routeTitles: Record<Route, string> = {
  home: "camarões.inc",
  team: "Equipe · camarões.inc",
  projects: "Projetos · camarões.inc",
}

const read = (): Route => routes[window.location.hash] ?? "home"

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(read)
  useEffect(() => {
    const onChange = () => setRoute(read())
    window.addEventListener("hashchange", onChange)
    return () => window.removeEventListener("hashchange", onChange)
  }, [])
  return route
}
