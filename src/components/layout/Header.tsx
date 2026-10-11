import { useState } from "react"
import { ArrowIcon } from "@/components/ui/Icons"
import { siteImages } from "@/data/assets"
import { siteLinks } from "@/data/links"
import { useRoute } from "@/router"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)
  const route = useRoute()

  return (
    <header className="site-header">
      <a className="brand" href={siteLinks.home} aria-label="camarões.inc — início">
        <img
          className="brand__image"
          src={siteImages.headerLogo}
          alt="camarões.inc"
        />
      </a>

      <nav className={menuOpen ? "nav-links nav-links--open" : "nav-links"}>
        <a href={siteLinks.about} onClick={closeMenu}>
          Sobre
        </a>
        <a href={siteLinks.services} onClick={closeMenu}>
          O que fazemos
        </a>
        <a
          href={siteLinks.projectsPage}
          aria-current={route === "projects" ? "page" : undefined}
          onClick={closeMenu}
        >
          Projetos
        </a>
        <a
          href={siteLinks.teamPage}
          aria-current={route === "team" ? "page" : undefined}
          onClick={closeMenu}
        >
          Equipe
        </a>
        <a
          className="mobile-contact-link"
          href={siteLinks.contact}
          onClick={closeMenu}
        >
          Vamos conversar <ArrowIcon />
        </a>
      </nav>

      <a className="header-cta" href={siteLinks.contact}>
        Vamos conversar <ArrowIcon />
      </a>

      <button
        className={menuOpen ? "menu-button menu-button--open" : "menu-button"}
        type="button"
        aria-label="Abrir menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
      </button>
    </header>
  )
}
