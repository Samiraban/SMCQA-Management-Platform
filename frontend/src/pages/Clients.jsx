import { Building } from "lucide-react";
import { useCollection } from "../lib/useRealtime.js";
import "../styles/pages.css";

function Clients() {
  const clients = useCollection("clients");

  return (
    <div className="page-clients">
      <section className="page-hero">
        <div className="container">
          <span className="section-label">Our Clients</span>
          <h1>Trusted by Businesses Across Qatar</h1>
          <p>
            We partner with organisations of every size, supplying dependable
            manpower that keeps their operations running smoothly.
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          {clients.length === 0 ? (
            <div className="empty-state">No clients published yet.</div>
          ) : (
            <div className="card-grid">
              {clients.map((c) => (
                <div className="info-card client-card" key={c.id}>
                  <div className="client-mark">
                    <Building size={20} />
                  </div>
                  <div>
                    <h3>{c.name}</h3>
                    <span>{c.industry}</span>
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

export default Clients;
