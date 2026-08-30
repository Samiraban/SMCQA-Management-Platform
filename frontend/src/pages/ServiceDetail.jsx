import * as Icons from "lucide-react";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import "../styles/pages.css";

function ServiceDetail({
  title,
  tagline,
  description,
  paragraphs = [],
  images = [],
  icon,
}) {
  const Icon = Icons[icon] || Icons.Briefcase;

  const aboutParagraphs =
    paragraphs.length > 0
      ? paragraphs
      : [description].filter(Boolean);

  return (
    <div className="page-services page-service-detail">
      <section className="page-hero">
        <div className="container">
          <Link to="/services" className="service-link" style={{ marginBottom: 18 }}>
            <ArrowLeft size={16} />
            All services
          </Link>

          <span className="section-label">What We Do</span>
          <h1>{title}</h1>
          <p>{tagline || description}</p>
        </div>
      </section>

      {images.length > 0 && (
        <section>
          <div className="container">
            <div className="service-gallery-heading">
              <div className="service-gallery-icon">
                <Icon size={22} />
              </div>
              <h2>{title} Gallery</h2>
            </div>

            <div className="service-gallery-grid">
              {images.map((image, index) => (
                <div className="service-gallery-card" key={`${title}-photo-${index}`}>
                  <img
                    src={image.url}
                    alt={`${title} ${index + 1}`}
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = image.fallback;
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section>
        <div className="container">
          <div className="service-about">
            <h2>About {title}</h2>
            {aboutParagraphs.map((paragraph, index) => (
              <p key={`about-${index}`}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="page-about">
        <div className="container about-cta-inner">
          <div>
            <h2>Need staff for {title.toLowerCase()}?</h2>
            <p>Tell us your requirement and a consultant will follow up within one business day.</p>
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

export default ServiceDetail;