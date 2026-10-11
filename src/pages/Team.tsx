import PageHero from "@/components/ui/PageHero"
import MemberCard from "@/components/cards/MemberCard"
import Contact from "@/sections/Contact"
import { team, teamIntro } from "@/data/team"

export default function Team() {
  return (
    <>
      <PageHero
        {...teamIntro}
        actionTargetId="equipe-fotos"
        actionLabel="Conheça nossos membros"
      />
      <section className="team section" id="equipe-fotos">
        <div className="team-grid">
          {team.map((member) => (
            <MemberCard
              key={member.name}
              member={member}
            />
          ))}
        </div>
      </section>
      <Contact />
    </>
  )
}
