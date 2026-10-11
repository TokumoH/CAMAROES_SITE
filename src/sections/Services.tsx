import SectionTag from "@/components/ui/SectionTag"
import { ArrowIcon } from "@/components/ui/Icons"
import { services } from "@/data/content"

export default function Services() {
  return (
    <section className="services section" id="fazemos">
      <div className="section-heading">
        <SectionTag number="02" light>
          O que fazemos
        </SectionTag>
        <h2>
          Tecnologia que resolve.
          <br />
          <em>Conhecimento que transforma.</em>
        </h2>
      </div>

      <div className="service-list">
        {services.map((service) => (
          <article className="service-card" key={service.number}>
            <div className="service-card__top">
              <span>{service.number}</span>
              <div className="service-icon">{service.icon}</div>
            </div>
            <h3>{service.title}</h3>
            <p>{service.text}</p>
            <a href="#contato" aria-label={`Saiba mais sobre ${service.title}`}>
              Explorar <ArrowIcon />
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}
