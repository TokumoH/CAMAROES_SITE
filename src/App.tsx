import { useEffect } from "react"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import Home from "@/pages/Home"
import Team from "@/pages/Team"
import ProjectsPage from "@/pages/ProjectsPage"
import { routeTitles, useRoute, type Route } from "@/router"

const pages: Record<Route, () => React.JSX.Element> = {
  home: Home,
  team: Team,
  projects: ProjectsPage,
}

export default function App() {
  const route = useRoute()
  const Page = pages[route]

  useEffect(() => {
    document.title = routeTitles[route]
    const id = window.location.hash.slice(1)
    if (route === "home" && id) {
      // veio de outra página para uma âncora da home (ex.: #sobre)
      document.getElementById(id)?.scrollIntoView()
    } else {
      window.scrollTo({ top: 0, behavior: "instant" })
    }
  }, [route])

  return (
    <>
      <Header />
      <main>
        <Page />
      </main>
      <Footer />
    </>
  )
}
