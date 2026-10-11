import { siteImages } from "@/data/assets"
import { siteLinks } from "@/data/links"

export default function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <a className="brand brand--footer" href={siteLinks.home}>
          <img
            className="brand__image"
            src={siteImages.headerLogo}
            alt="camarões.inc"
          />
        </a>
        <p>
          Da universidade
          <br />
          para o mundo.
        </p>
      </div>
      <div className="footer-bottom">
        <p>© 2025 camarões.inc</p>
        <div>
          <a href={siteLinks.instagram}>Instagram</a>
          <a href={siteLinks.linkedin}>LinkedIn</a>
          <a href={siteLinks.contactEmail}>E-mail</a>
        </div>
        <a href={siteLinks.home}>Voltar ao topo ↑</a>
      </div>
    </footer>
  )
}
