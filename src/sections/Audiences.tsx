import { useEffect, useState } from "react"
import SectionTag from "@/components/ui/SectionTag"
import { audiences } from "@/data/content"

export default function Audiences() {
  // destaca um item de cada vez, em loop
  const [active, setActive] = useState(0)
  useEffect(() => {
    const id = setInterval(
      () => setActive((i) => (i + 1) % audiences.length),
      2500,
    )
    return () => clearInterval(id)
  }, [])

  return (
    <section className="audiences section">
      <SectionTag number="04">Para quem fazemos</SectionTag>
      <div className="audience-grid">
        <div className="audience-intro">
          <h2>Ideias não têm fronteiras. Nosso impacto também não.</h2>
          <p>
            Construímos pontes entre a universidade e quem quer transformar
            realidades.
          </p>
        </div>
        <div className="audience-list">
          {audiences.map(([title, description], index) => (
            <article
              key={title}
              className={index === active ? "is-active" : undefined}
            >
              <span>0{index + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
