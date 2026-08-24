import * as Icons from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCollection } from "../lib/useRealtime.js";
import "../styles/pages.css";

function Services() {
  const services = useCollection("services");

  return (
    <div className="page-services">
      <section className="page-hero">
        <div className="container">
          <span className="section-label">What We Do</span>
          <h1>Manpower Solutions Across Every Industry</h1>
          <p>
            From hospitality floors to construction sites, we supply vetted,
            reliable staff so your operations never miss a beat.
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="card-grid">
            {services.map((s) => {
              const Icon = Icons[s.icon] || Icons.Briefcase;
              return (
                <div className="info-card" key={s.id}>
                  <div className="card-icon">
                    <Icon size={24} />
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="page-about">
        <div className="container about-cta-inner">
          <div>
            <h2>Need staff for a role not listed here?</h2>
            <p>We source across dozens of specialisations — tell us what you need.</p>
          </div>
          <Link to="/contact" className="btn btn-dark">
            Request staffing
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Services;
