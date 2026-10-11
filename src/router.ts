import { useEffect, useState } from "react"

export type Route = "home" | "team" | "projects"

// Para criar uma nova página: adicione a rota aqui, o título abaixo
// e a página em src/pages/ + src/App.tsx.
const routes: Record<string, Route> = {
  "#/equipe": "team",
  "#/projetos": "projects",
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
