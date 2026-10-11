import PageHero from "@/components/ui/PageHero"
import MemberCard from "@/components/cards/MemberCard"
import Contact from "@/sections/Contact"
import { team, teamIntro } from "@/data/team"

export default function Team() {
  return (
    <>
      <PageHero {...teamIntro} />
      <section className="team section">
        <div className="team-grid">
          {team.map((member, index) => (
            <MemberCard
              key={`${member.name}-${index}`}
              member={member}
              index={index}
            />
          ))}
        </div>
      </section>
      <Contact />
    </>
  )
}
