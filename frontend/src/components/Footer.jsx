import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import companyLogo from "../assets/smc-logo.png";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "./SocialIcons.jsx";
import { useMailtoFeedback } from "../lib/useMailtoFeedback.js";
import "../styles/Footer.css";

const services = [
  ["Hospitality", "/services/hospitality"],
  ["Construction", "/services/construction"],
  ["Health Care", "/services/health-care"],
  ["Office Management", "/services/office-management"],
  ["Security & Guarding", "/services/security-guarding"],
  ["Agricultural & Farming", "/services/agricultural-farming"],
];

function Footer() {
  const {
    handleClick: handleEmailClick,
    copied: emailCopied,
    href: emailHref,
  } = useMailtoFeedback("info@smcqa.com");

  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="container footer-grid">
          <div className="footer-brand">
            <img src={companyLogo} alt="Star Management Consultancy" />
            <p>
              Connecting organisations with reliable manpower across
              hospitality, construction, healthcare, office management,
              security and agriculture.
            </p>

            <div className="footer-socials" aria-label="Social media">
              <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook">
                <FacebookIcon size={18} />
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">
                <InstagramIcon size={18} />
              </a>
              <a href="https://qa.linkedin.com/company/smcqatar" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <LinkedinIcon size={18} />
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h3>Quick Links</h3>
            <Link to="/about">About Us</Link>
            <Link to="/services">Services</Link>
            <Link to="/clients">Clients</Link>
            <Link to="/team">Our Team</Link>
            <Link to="/careers">Career</Link>
            <Link to="/contact">Contact Us</Link>
          </div>

          <div className="footer-column">
            <h3>Our Services</h3>
            {services.map(([label, path]) => (
              <Link key={path} to={path}>{label}</Link>
            ))}
          </div>

          <div className="footer-column footer-contact">
            <h3>Contact Us</h3>
            <div className="footer-contact-item">
              <MapPin size={18} />
              <span>
                Building No: 01, Floor No: 7,<br />
                Office No: 8, Al Muntazah Trading Center,<br />
                Doha, Qatar
              </span>
            </div>
            <a className="footer-contact-item" href="tel:+97466310125">
              <Phone size={18} />
              <span>+974 6631 0125<br />+974 41436428</span>
            </a>
            <a
              className="footer-contact-item"
              href={emailHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleEmailClick}
              title={
                emailCopied
                  ? "Copied to clipboard!"
                  : "Email us"
              }
            >
              <Mail size={18} />
              <span>
                {emailCopied
                  ? "Copied! info@smcqa.com"
                  : "info@smcqa.com"}
              </span>
            </a>
          </div>
        </div>
      </div>

      <section className="footer-map-section" aria-label="Location">
        <div className="container footer-map-layout">
          <div className="footer-map-copy">
            <span className="footer-eyebrow">OUR LOCATION</span>
            <h2>Visit our Doha office.</h2>
            <p>
              Al Muntazah Trading Center, Doha, Qatar. We are ready to discuss
              your manpower and recruitment requirements.
            </p>
            <a
              className="footer-map-link"
              href="https://www.google.com/maps/search/?api=1&query=Al+Muntazah+Trading+Center+Doha+Qatar"
              target="_blank"
              rel="noreferrer"
            >
              Open in Google Maps <ArrowUpRight size={17} />
            </a>
          </div>

          <div className="footer-map">
            <iframe
              title="Star Management Consultancy location in Doha"
              src="https://www.google.com/maps?q=Al%20Muntazah%20Trading%20Center%20Doha%20Qatar&output=embed"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© {new Date().getFullYear()} Star Management Consultancy. All Rights Reserved.</p>
          <div>
            <Link to="/contact">Contact</Link>
            <Link to="/careers">Careers</Link>
            <a href="https://www.smcqa.com/" target="_blank" rel="noreferrer">smcqa.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;