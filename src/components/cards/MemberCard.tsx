import Photo from "@/components/ui/Photo"
import type { Member } from "@/data/team"

export default function MemberCard({
  member,
}: {
  member: Member
}) {
  const links = member.links.filter((link) => link.href)
  return (
    <article className="member">
      <div className="member__photo">
        <Photo src={member.image} alt={member.name} />
      </div>
      <span className="member__kit-number" role="img" aria-label={`Camisa número ${member.jerseyNumber}`}>
        {member.jerseyNumber}
      </span>
      <img className="member__sticker" src={member.sticker} alt="" aria-hidden="true" />
      <h3>{member.name}</h3>
      <p className="member__role">{member.role}</p>
      <p className="member__bio">{member.bio}</p>
      {links.length > 0 && (
        <div className="member__links">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </article>
  )
}
