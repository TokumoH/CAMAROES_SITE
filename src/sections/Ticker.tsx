import { Fragment } from "react"

const phrases = [
  "Da universidade para o mundo",
  "Ideias em movimento",
  "Tecnologia com propósito",
]

const REPEATS = 3 // repetições das frases em cada grupo (garante largura suficiente)

function Group() {
  return (
    <div className="ticker__group">
      {Array.from({ length: REPEATS }).flatMap((_, r) =>
        phrases.map((phrase) => (
          <Fragment key={`${r}-${phrase}`}>
            <span>{phrase}</span>
            <i />
          </Fragment>
        )),
      )}
    </div>
  )
}

// Dois grupos idênticos: a animação CSS desloca -50% e reinicia sem emenda.
export default function Ticker() {
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker__track">
        <Group />
        <Group />
      </div>
    </div>
  )
}
