import OfficialLogo from "@/components/ui/OfficialLogo"

export default function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <a className="brand brand--footer" href="#inicio">
          <OfficialLogo />
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
          <a href="#sobre">Instagram</a>
          <a href="#sobre">LinkedIn</a>
          <a href="mailto:contato@camaroes.inc">E-mail</a>
        </div>
        <a href="#inicio">Voltar ao topo ↑</a>
      </div>
    </footer>
  )
}
