import { useCollection } from "../lib/useRealtime.js";
import "../styles/pages.css";

function initials(name) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function Team() {
  const team = useCollection("team");

  return (
    <div className="page-team">
      <section className="page-hero">
        <div className="container">
          <span className="section-label">Our Team</span>
          <h1>The People Behind Every Placement</h1>
          <p>
            A dedicated team of recruiters, operations leads and client
            managers working to match the right people to the right roles.
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          {team.length === 0 ? (
            <div className="empty-state">No team members published yet.</div>
          ) : (
            <div className="card-grid reveal-group">
              {team.map((m) => (
                <div className="info-card team-card" key={m.id}>
                  <div className="team-photo">
                    {m.photo ? (
                      <img src={m.photo} alt={m.name} />
                    ) : (
                      <span className="team-initials">{initials(m.name)}</span>
                    )}
                  </div>
                  <h3>{m.name}</h3>
                  <span>{m.role}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Team;