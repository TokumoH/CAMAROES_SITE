import { useState } from "react"
import { siteImages } from "@/data/assets"
import { siteLinks } from "@/data/links"

export default function Footer() {
  const [emailStatus, setEmailStatus] = useState("")

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteLinks.contactEmailAddress)
      setEmailStatus("Copiado")
    } catch {
      setEmailStatus("Não foi possível copiar")
    }

    window.setTimeout(() => setEmailStatus(""), 2200)
  }

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
      <div className="footer-info">
        <div className="footer-info__item">
          <p className="footer-info__label">Instagram</p>
          <a
            className="footer-info__value"
            href={siteLinks.instagram}
            target="_blank"
            rel="noreferrer"
          >
            @camaroes.inc
          </a>
        </div>
        <div className="footer-info__item">
          <p className="footer-info__label">E-mail</p>
          <button
            className="footer-info__copy"
            type="button"
            onClick={copyEmail}
            aria-label={`Copiar e-mail ${siteLinks.contactEmailAddress}`}
          >
            <span>{siteLinks.contactEmailAddress}</span>
            <span className="footer-info__status" aria-live="polite">
              {emailStatus || "Copiar"}
            </span>
          </button>
        </div>
        <div className="footer-info__item">
          <p className="footer-info__label">Instituição</p>
          <a
            className="footer-info__value"
            href={siteLinks.faculdade}
            target="_blank"
            rel="noreferrer"
          >
            Instituto Federal de São Paulo
            <br />
            Câmpus Birigui
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 camarões.inc</p>
        <a href={siteLinks.home}>Voltar ao topo ↑</a>
      </div>
    </footer>
  )
}
