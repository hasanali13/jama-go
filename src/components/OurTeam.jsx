import Reveal from "./Reveal.jsx";

const TEAM = [
  {
    name: "Operations Lead",
    role: "Field Operations",
    bio: "Oversees manned guarding, patrol routes, and on-site incident response.",
  },
  {
    name: "Client Success Manager",
    role: "Account Management",
    bio: "Your main point of contact for reporting, scheduling, and service planning.",
  },
  {
    name: "Technical Supervisor",
    role: "Systems & Monitoring",
    bio: "Leads CCTV, access control, and alarm monitoring across client sites.",
  },
];

export default function OurTeam() {
  return (
    <section className="section section-alt" id="team">
      <div className="container">
        <Reveal className="section-head">
          <span className="kicker">Our Team</span>
          <h2>The people behind your protection</h2>
          <p>
            Licensed, trained, and committed professionals working together to
            keep your people, property, and peace of mind secure.
          </p>
        </Reveal>

        <div className="cards">
          {TEAM.map((member) => (
            <Reveal as="article" className="feature team-card" key={member.role}>
              <div className="feature-icon">👤</div>
              <h3>{member.name}</h3>
              <p className="team-role">{member.role}</p>
              <p>{member.bio}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
