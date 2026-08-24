import { Target, Eye, HeartHandshake, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCollection } from "../lib/useRealtime.js";
import "../styles/pages.css";

function About() {
  const content = useCollection("siteContent");

  return (
    <div className="page-about">
      <section className="page-hero">
        <div className="container">
          <span className="section-label">About Us</span>
          <h1>Building Qatar's Workforce, One Placement at a Time</h1>
          <p>{content.aboutText}</p>
        </div>
      </section>

      <section className="about-story">
        <div className="container about-story-grid">
          <div>
            <span className="section-label">Who We Are</span>
            <h2>A Trusted Manpower Partner in Doha</h2>
            <p>
              Star Management Consultancy was founded to solve a simple
              problem: businesses in Qatar need reliable, skilled people
              faster than traditional hiring allows. We built a consultancy
              that moves quickly, vets thoroughly, and stands behind every
              placement we make.
            </p>
            <p>
              Today we support clients across hospitality, construction,
              healthcare, office management, security and agriculture —
              matching organisations with candidates who are ready to
              contribute from day one.
            </p>
          </div>

          <div className="about-stats">
            <div>
              <strong>500+</strong>
              <span>Placements Made</span>
            </div>
            <div>
              <strong>50+</strong>
              <span>Corporate Clients</span>
            </div>
            <div>
              <strong>6</strong>
              <span>Industries Served</span>
            </div>
            <div>
              <strong>24/7</strong>
              <span>Support Availability</span>
            </div>
          </div>
        </div>
      </section>

      <section className="about-pillars">
        <div className="container">
          <div className="pillars-grid">
            <div className="pillar-card">
              <Target size={26} />
              <h3>Our Mission</h3>
              <p>
                Connect organisations with dependable manpower while creating
                meaningful, well-matched opportunities for job seekers across
                every industry we serve.
              </p>
            </div>

            <div className="pillar-card">
              <Eye size={26} />
              <h3>Our Vision</h3>
              <p>
                To be Qatar's most trusted workforce consultancy, known for
                speed, integrity and long-term partnerships with the
                businesses and people we place.
              </p>
            </div>

            <div className="pillar-card">
              <HeartHandshake size={26} />
              <h3>Our Values</h3>
              <p>
                Reliability, transparency and respect — for the businesses we
                staff and the candidates who trust us with their next
                opportunity.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-cta">
        <div className="container about-cta-inner">
          <div>
            <h2>Ready to build your team?</h2>
            <p>Tell us what you need and we'll match you with the right people, fast.</p>
          </div>
          <Link to="/contact" className="btn btn-dark">
            Get in touch
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default About;
