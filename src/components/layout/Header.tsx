import { useState } from "react"
import { ArrowIcon } from "@/components/ui/Icons"
import { siteImages } from "@/data/assets"
import { useRoute } from "@/router"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)
  const route = useRoute()

  return (
    <header className="site-header">
      <a className="brand" href="#inicio" aria-label="camarões.inc — início">
        <img
          className="brand__image"
          src={siteImages.headerLogo}
          alt="camarões.inc"
        />
      </a>

      <nav className={menuOpen ? "nav-links nav-links--open" : "nav-links"}>
        <a href="#sobre" onClick={closeMenu}>
          Sobre
        </a>
        <a href="#fazemos" onClick={closeMenu}>
          O que fazemos
        </a>
        <a
          href="#/projetos"
          aria-current={route === "projects" ? "page" : undefined}
          onClick={closeMenu}
        >
          Projetos
        </a>
        <a
          href="#/equipe"
          aria-current={route === "team" ? "page" : undefined}
          onClick={closeMenu}
        >
          Equipe
        </a>
        <a href="#contato" onClick={closeMenu}>
          Contato
        </a>
      </nav>

      <a className="header-cta" href="#contato">
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
