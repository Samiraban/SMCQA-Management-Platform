import { useCollection } from "../lib/useRealtime.js";
import "../styles/Team.css";

// Shown for a team member who doesn't have a photo yet, so the
// grid never breaks — just shows their initials instead.
function initials(name = "") {
  return name
    .replace(/^(Mr\.|Mrs\.|Ms\.|Dr\.)\s+/i, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

function Team() {
  const teamMembers = useCollection("team");

  return (
    <div className="team2-page">
      {/* OUR TEAM */}
      <section className="team2-dark">
        <div className="container">
          <h2 className="team2-heading">Our Team</h2>
          <p className="team2-subheading">
            Our management team includes specialists from specific sectors
            to work in partnership with you.
          </p>

          {teamMembers.length === 0 ? (
            <p style={{ color: "var(--color-text)", textAlign: "center" }}>
              Team members will appear here soon.
            </p>
          ) : (
            <div className="team2-grid">
              {teamMembers.map((m) => (
                <div className="team2-card" key={m.id || m.name}>
                  <div className="team2-photo">
                    {m.photo ? (
                      <img src={m.photo} alt={m.name} loading="lazy" />
                    ) : (
                      <div className="team2-photo-fallback">
                        {initials(m.name)}
                      </div>
                    )}
                  </div>
                  <div className="team2-info">
                    <h3>{m.name}</h3>
                    <span>{m.role}</span>
                  </div>
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