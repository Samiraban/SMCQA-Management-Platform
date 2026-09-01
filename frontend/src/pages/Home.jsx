import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import heroImage from "../assets/hero.png";
import CountUp from "../components/CountUp.jsx";
import LogoCarousel from "../components/LogoCarousel.jsx";
import { createInquiry } from "../lib/api.js";
import { useCollection } from "../lib/useRealtime.js";
import { useMailtoFeedback } from "../lib/useMailtoFeedback.js";

import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Globe2,
  Headphones,
  ShieldCheck,
  Users,
  UserRound,
  MapPin,
} from "lucide-react";
import * as Icons from "lucide-react";

import { isImageSource } from "../lib/imageFile.js";

import "../styles/Home.css";

/*
 * Services used to be a hardcoded list here, so anything an admin
 * added in /admin/services never showed up on the homepage (it only
 * appeared on the /services page, which already read from the CMS).
 * Now this section pulls the same live "services" collection, and
 * resolves each item's stored icon name (e.g. "Building2") to the
 * matching lucide-react component, falling back to Building2 if the
 * name doesn't match a known icon.
 */
function slugify(title) {
  return (title || "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const locations = [
  {
    city: "Ain Khaled, Qatar",
    brand: "Star Euro Consultancy Services",
  },
  {
    city: "Deira, Dubai",
    brand: "Star Euro Group",
  },
  {
    city: "Delhi, India",
    brand: "Star Euro Migration Services",
  },
  {
    city: "Siliguri, India",
    brand: "Star Management Consultancy Services",
  },
  {
    city: "Lafayette, Tunis, Tunisia",
    brand: "Star Management Consultancy",
  },
  {
    city: "Hawally, Kuwait",
    brand: "Star Immigration Consultancy",
  },
  {
    city: "Sinamangal, Kathmandu, Nepal",
    brand: "Star Tours and Travels",
  },
];

const testimonials = [
  {
    name: "Mohammad Osman Gani",
    text:
      "I feel I have put my documents on the right place. Very fantastic service.",
  },
  {
    name: "Sobit Magar",
    text:
      "Very comfortable and supportive environment throughout the process.",
  },
  {
    name: "Shfiq Miya",
    text:
      "Very fantastic work experience and professional support.",
  },
];

/*
 * Fallback clients.
 *
 * These are displayed only when there are no clients
 * available from the backend.
 */
const clients = [
  {
    id: "client-1",
    name: "Al Kubaisi Group",
    logo: "https://assets.cdn.filesafe.space/7l7AhPqfXqde9yLH2psg/media/66a86ba8a57ce51515621eea.svg",
  },
  {
    id: "client-2",
    name: "Almoayyed Air Conditioning",
    logo: "https://assets.cdn.filesafe.space/7l7AhPqfXqde9yLH2psg/media/66a86bb63c9fe0bce846da52.svg",
  },
  {
    id: "client-3",
    name: "CP",
    logo: "https://assets.cdn.filesafe.space/7l7AhPqfXqde9yLH2psg/media/66a86bb6688d5e74f516d5a1.svg",
  },
  {
    id: "client-4",
    name: "CEPROTEC",
    logo: "https://assets.cdn.filesafe.space/7l7AhPqfXqde9yLH2psg/media/66a86bb6a57ce5fd35621eeb.svg",
  },
  {
    id: "client-5",
    name: "Challenger Trading & Contracting",
    logo: "https://assets.cdn.filesafe.space/7l7AhPqfXqde9yLH2psg/media/66a86bb67e16fc5c4e57d761.svg",
  },
  {
    id: "client-6",
    name: "Coastal Qatar",
    logo: "https://assets.cdn.filesafe.space/7l7AhPqfXqde9yLH2psg/media/66a86bb67e16fc68fa57d760.svg",
  },
  {
    id: "client-7",
    name: "EXBT",
    logo: "https://assets.cdn.filesafe.space/7l7AhPqfXqde9yLH2psg/media/66a86bb63c9fe065d346da53.svg",
  },
  {
    id: "client-8",
    name: "GETP Group",
    logo: "https://assets.cdn.filesafe.space/7l7AhPqfXqde9yLH2psg/media/66a86bb63c9fe02ed046da56.svg",
  },
  {
    id: "client-9",
    name: "ME",
    logo: "https://assets.cdn.filesafe.space/7l7AhPqfXqde9yLH2psg/media/66a86bb69d8a395d8871ddd5.svg",
  },
  {
    id: "client-10",
    name: "Paris United Group",
    logo: "https://assets.cdn.filesafe.space/7l7AhPqfXqde9yLH2psg/media/66a86bb6688d5eb88116d5a0.svg",
  },
  {
    id: "client-11",
    name: "Porto Holding",
    logo: "https://assets.cdn.filesafe.space/7l7AhPqfXqde9yLH2psg/media/66a86bb63c9fe07a5046da55.svg",
  },
  {
    id: "client-12",
    name: "QatarEnergy",
    logo: "https://assets.cdn.filesafe.space/7l7AhPqfXqde9yLH2psg/media/66a86bb6688d5ece9216d5a2.svg",
  },
  {
    id: "client-13",
    name: "Qatar National Import & Export",
    logo: "https://assets.cdn.filesafe.space/7l7AhPqfXqde9yLH2psg/media/66a86bb63c9fe0277646da54.svg",
  },
  {
    id: "client-14",
    name: "Red Links Construction",
    logo: "https://assets.cdn.filesafe.space/7l7AhPqfXqde9yLH2psg/media/66a86bb6688d5e20a816d5a3.svg",
  },
  {
    id: "client-15",
    name: "Shelter Group",
    logo: "https://assets.cdn.filesafe.space/7l7AhPqfXqde9yLH2psg/media/66a86bb63c9fe0df9146da57.svg",
  },
  {
    id: "client-16",
    name: "Snoonu",
    logo: "https://assets.cdn.filesafe.space/7l7AhPqfXqde9yLH2psg/media/66a86bb69d8a39fd0e71ddd6.svg",
  },
  {
    id: "client-17",
    name: "Voltech",
    logo: "https://assets.cdn.filesafe.space/7l7AhPqfXqde9yLH2psg/media/66a86bb7a57ce5eadf621eec.svg",
  },
  {
    id: "client-18",
    name: "Aseel",
    logo: "https://assets.cdn.filesafe.space/7l7AhPqfXqde9yLH2psg/media/66a86bb77e16fc4e5457d762.svg",
  },
];

/* =========================================================
   ENQUIRY FORM
   ========================================================= */

function EnquiryForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [status, setStatus] = useState("idle");

  function update(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    if (status !== "idle") {
      setStatus("idle");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setStatus("sending");

    try {
      await createInquiry({
        name: form.name.trim(),
        email: form.email.trim(),
        company: form.company.trim(),
        message: form.message.trim(),
        phone: "",
        subject: "Employer enquiry",
      });

      setForm({
        name: "",
        email: "",
        company: "",
        message: "",
      });

      setStatus("success");
    } catch (error) {
      console.error("Unable to save enquiry:", error);
      setStatus("error");
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      {status === "success" && (
        <div className="form-success">
          Enquiry sent successfully. Your message has been added to the
          enquiries dashboard.
        </div>
      )}

      {status === "error" && (
        <div className="form-error">
          Something went wrong while saving your enquiry. Please try again.
        </div>
      )}

      <div className="form-row">
        <label>
          Your Name

          <input
            type="text"
            placeholder="Enter your name"
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            required
          />
        </label>

        <label>
          Email

          <input
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
            required
          />
        </label>
      </div>

      <label>
        Company

        <input
          type="text"
          placeholder="Company name"
          value={form.company}
          onChange={(event) => update("company", event.target.value)}
          required
        />
      </label>

      <label>
        Message

        <textarea
          rows="6"
          placeholder="Tell us about your requirement..."
          value={form.message}
          onChange={(event) => update("message", event.target.value)}
          required
        />
      </label>

      <button
        type="submit"
        className="btn"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending..." : "Send Enquiry"}

        <ArrowRight size={18} />
      </button>

      <small>
        Your enquiry is securely saved to the SMC database and can be managed
        from the admin dashboard.
      </small>
    </form>
  );
}

/*
 * Turns an admin-edited stat string like "20K+" into the pieces
 * <CountUp> needs: a numeric value to animate from 0, and the
 * trailing suffix ("K+", "+", etc.) to display after it.
 * Falls back to fallbackValue/fallbackSuffix when nothing has
 * been saved in the admin panel yet.
 */
function parseStat(raw, fallbackValue, fallbackSuffix) {
  const str = typeof raw === "string" ? raw.trim() : "";

  if (!str) {
    return { value: fallbackValue, suffix: fallbackSuffix };
  }

  const match = str.match(/^([\d,.]+)\s*(.*)$/);

  if (!match) {
    return { value: fallbackValue, suffix: fallbackSuffix };
  }

  const numeric = parseFloat(match[1].replace(/,/g, ""));

  return {
    value: Number.isFinite(numeric) ? numeric : fallbackValue,
    suffix: match[2] || fallbackSuffix,
  };
}

/* =========================================================
   HOME
   ========================================================= */

function Home() {
  const navigate = useNavigate();
  const team = useCollection("team");
  const reviews = useCollection("reviews");
  const siteContent = useCollection("siteContent");
  const services = useCollection("services");

  const {
    handleClick: handleEmailClick,
    copied: emailCopied,
  } = useMailtoFeedback("info@smcqa.com");

  const stats = siteContent?.stats || {};
  const peopleRecruited = parseStat(stats.peopleRecruited, 20, "K+");
  const happyClients = parseStat(stats.happyClients, 20, "K+");
  const industryExperts = parseStat(stats.industryExperts, 500, "+");
  const globalLocations = parseStat(stats.globalLocations, 7, "+");

  // Live customer reviews approved by the admin, falling back to the
  // built-in testimonials only until the first real review is approved.
  const liveTestimonials = reviews.length > 0 ? reviews : testimonials;

  /*
   * Always show the real client logos here,
   * regardless of what's saved in the admin
   * "Manage Clients" backend collection.
   */
  const liveClients = clients;

  return (
    <div className="home-page">

      {/* =====================================================
          HERO
          ===================================================== */}

      <section className="hero" id="home">
        <div className="hero-background"></div>

        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-tag">
              <span></span>
              HUMAN RESOURCE & HOSPITALITY SERVICES
            </div>

            <h1>
              Building the workforce
              <span> that builds the future.</span>
            </h1>

            <p>
              Connecting organisations with reliable manpower and helping
              talented people discover meaningful opportunities across global
              markets.
            </p>

            <div className="hero-buttons">
              <a href="#services" className="btn">
                Explore Services
                <ArrowRight size={18} />
              </a>

              <a href="#careers" className="hero-secondary-button">
                Find Opportunities
                <ArrowUpRight size={18} />
              </a>
            </div>

                       <div className="hero-trust">
              <div>
                <strong>{stats.peopleRecruited || "20K+"}</strong>
                <span>People Recruited</span>
              </div>

              <div>
                <strong>{stats.industryExperts || "500+"}</strong>
                <span>Industry Experts</span>
              </div>

              <div>
                <strong>{stats.globalLocations || "7+"}</strong>
                <span>Global Locations</span>
              </div>
            </div>
          </div>

          <div className="hero-image-card">
            <img
              src={heroImage}
              alt="Professional workforce"
            />

            <div className="hero-floating-card">
              <div className="floating-icon">
                <CheckCircle2 size={20} />
              </div>

              <div>
                <strong>Trusted Workforce</strong>
                <span>Professional recruitment solutions</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-announcement">
          <div className="container announcement-inner">
            <div className="announcement-left">
              <BriefcaseBusiness size={18} />
              <span>Looking for your next opportunity?</span>
            </div>

            <a href="#careers">
              View Current Opportunities
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* =====================================================
          THREE PILLARS
          ===================================================== */}

      <section className="pillars-section reveal-onscroll">
        <div className="container">
          <div className="pillars-row reveal-group">
            <article className="pillar-block">
              <div className="pillar-icon">
                <Headphones size={30} />
              </div>

              <h3>Management Consultancy</h3>

              <p>
                We have been fulfilling the requirement of human resources.
              </p>
            </article>

            <article className="pillar-block featured">
              <div className="pillar-icon">
                <Users size={30} />
              </div>

              <h3>Recruitment Agency</h3>

              <p>
                We have the dedication and consistency to provide a reliable
                manpower supply.
              </p>
            </article>

            <article className="pillar-block">
              <div className="pillar-icon">
                <UserRound size={30} />
              </div>

              <h3>Human Resource</h3>

              <p>
                We have executed the task efficiently in the field of manpower
                recruitment.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* =====================================================
          ABOUT
          ===================================================== */}

      <section
        className="about-section section reveal-onscroll"
        id="about"
      >
        <div className="container">
          <div className="about-grid">
            <div className="about-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1000&q=85"
                alt="Business team working together"
              />

              <div className="about-experience">
                <strong>SMC</strong>

                <span>
                  Human Resource
                  <br />
                  Experts
                </span>
              </div>
            </div>

            <div className="about-content">
              <div className="section-label">ABOUT SMCQA</div>

              <h2 className="section-title">
  People are at the{" "}
  <span>heart of what we do.</span>
</h2>

              <p className="about-lead">
                Star Management Consultancy is a Human Resource and Hospitality
                Services provider focused on connecting organisations with the
                people they need to grow.
              </p>

              <p>
                We provide manpower recruitment and workforce solutions across
                multiple industries. Our approach is built around reliability,
                professional service and creating opportunities for both
                organisations and candidates.
              </p>

              <a href="#services" className="text-button">
                Discover Our Services
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHY CHOOSE US
          ===================================================== */}

      <section className="why-section section reveal-onscroll">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <div className="section-label">WHY SMCQA</div>

              <h2 className="section-title">
  Recruitment with{" "}
  <span>purpose.</span>
</h2>
            </div>

            <p className="section-description">
              We combine industry knowledge, recruitment experience and a
              people-first approach to deliver dependable workforce solutions.
            </p>
          </div>

          <div className="why-grid reveal-group">
            <article className="why-card">
              <span className="why-number">01</span>

              <ShieldCheck size={32} />

              <h3>Reliable Workforce</h3>

              <p>
                We focus on connecting organisations with dependable and
                suitable candidates.
              </p>
            </article>

            <article className="why-card">
              <span className="why-number">02</span>

              <Users size={32} />

              <h3>People First</h3>

              <p>
                Our recruitment approach considers the needs of both employers
                and candidates.
              </p>
            </article>

            <article className="why-card">
              <span className="why-number">03</span>

              <Globe2 size={32} />

              <h3>Global Network</h3>

              <p>
                Our presence across multiple markets helps us reach a diverse
                talent pool.
              </p>
            </article>

            <article className="why-card">
              <span className="why-number">04</span>

              <Headphones size={32} />

              <h3>Dedicated Support</h3>

              <p>
                Our team stays involved throughout the recruitment and
                workforce process.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* =====================================================
          SERVICES
          ===================================================== */}

      <section
        className="services-section section reveal-onscroll"
        id="services"
        style={
          siteContent?.servicesBackgroundImage
            ? {
                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.93), rgba(255, 255, 255, 0.93)), url(${siteContent.servicesBackgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      >
        <div className="container">
          <div className="section-heading-row">
            <div>
              <div className="section-label">OUR SERVICES</div>

              <h2 className="section-title">
  Workforce solutions{" "}
  <span>for growing industries.</span>
</h2>
            </div>

            <p className="section-description">
              From hospitality and construction to healthcare and security, our
              services are designed around real workforce requirements.
            </p>
          </div>

          <div className="services-grid reveal-group">
            {services.map((service) => {
              const hasImageIcon =
                isImageSource(service.icon);

              const Icon =
                Icons[service.icon] || Building2;

              return (
                <article
                  className="service-card"
                  key={service.id}
                >
                  <div className="service-top">
                    <span>{service.number}</span>

                    <div className="service-icon">
                      {hasImageIcon ? (
                        <img
                          src={service.icon}
                          alt=""
                          className="service-icon-img"
                        />
                      ) : (
                        <Icon size={25} strokeWidth={1.7} />
                      )}
                    </div>
                  </div>

                  <h3>{service.title}</h3>

                  <p>{service.description}</p>

                  <Link
                    to={`/services/${
                      service.slug ||
                      slugify(service.title)
                    }`}
                    className="service-link"
                  >
                    Learn More
                    <ArrowUpRight size={17} />
                  </Link>
                </article>
              );
            })}
          </div>

          <div className="service-bottom">
            <Link to="/contact" className="btn btn-dark">
              Discuss Your Requirement
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          STATS
          ===================================================== */}

      <section className="stats-section reveal-onscroll">
        <div className="container">
          <div className="stats-intro">
            <div className="section-label">OUR IMPACT</div>

            <h2>
  Experience you can{" "}
  <span>build on.</span>
</h2>
          </div>

                   <div className="stats-grid reveal-group">
            <div className="big-stat">
              <CountUp value={peopleRecruited.value} suffix={peopleRecruited.suffix} />
              <span>People Recruited</span>
            </div>

            <div className="big-stat">
              <CountUp value={happyClients.value} suffix={happyClients.suffix} />
              <span>Happy Clients</span>
            </div>

            <div className="big-stat">
              <CountUp value={industryExperts.value} suffix={industryExperts.suffix} />
              <span>Industry Experts</span>
            </div>

            <div className="big-stat">
              <CountUp value={globalLocations.value} suffix={globalLocations.suffix} />
              <span>Global Locations</span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          HOW WE WORK
          ===================================================== */}

      <section className="process-section section reveal-onscroll">
        <div className="container">
          <div className="center-heading">
            <div className="section-label">HOW WE WORK</div>

            <h2 className="section-title">
  From requirement{" "}
  <span>to recruitment.</span>
</h2>

            <p>
              A straightforward process designed to make workforce recruitment
              easier for organisations.
            </p>
          </div>

          <div className="process-grid reveal-group">
            <div className="process-item">
              <span>01</span>

              <div>
                <h3>Understand</h3>

                <p>
                  We understand your workforce requirements and the roles you
                  need to fill.
                </p>
              </div>
            </div>

            <div className="process-item">
              <span>02</span>

              <div>
                <h3>Source</h3>

                <p>
                  Our recruitment network helps identify suitable candidates
                  for your requirements.
                </p>
              </div>
            </div>

            <div className="process-item">
              <span>03</span>

              <div>
                <h3>Select</h3>

                <p>
                  Candidates are evaluated according to the requirements of the
                  organisation.
                </p>
              </div>
            </div>

            <div className="process-item">
              <span>04</span>

              <div>
                <h3>Support</h3>

                <p>
                  We continue supporting the recruitment process through
                  communication and coordination.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          EMPLOYER CTA
          ===================================================== */}

      <section
        className="employer-section reveal-onscroll"
        id="employer"
      >
        <div className="container">
          <div className="employer-banner">
            <div className="employer-content">
              <div className="section-label">FOR EMPLOYERS</div>

              <h2>
  Looking for{" "}
  <span>reliable manpower?</span>
</h2>

              <p>
                Tell us what your organisation needs and our team will help you
                explore the right workforce solution.
              </p>

              <a href="#contact-form" className="btn">
                Submit Your Requirement
                <ArrowRight size={18} />
              </a>
            </div>

            <div className="employer-decoration">
              <Users size={150} strokeWidth={0.5} />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          GLOBAL PRESENCE
          ===================================================== */}

      <section
        className="global-section section reveal-onscroll"
        id="global"
      >
        <div className="container">
          <div className="section-heading-row">
            <div>
              <div className="section-label">GLOBAL PRESENCE</div>

              <h2 className="section-title">
  Connecting talent{" "}
  <span>across borders.</span>
</h2>
            </div>

            <p className="section-description">
              Our network extends across key recruitment and business markets,
              helping organisations access talent across regions.
            </p>
          </div>

          <div className="locations-grid">
            {locations.map((location) => (
              <article
                className="location-card"
                key={location.city}
              >
                <MapPin size={19} />

                <div>
                  <strong>{location.city}</strong>
                  <span>{location.brand}</span>
                </div>

                <ArrowUpRight size={18} />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          TEAM
          ===================================================== */}

      <section
        className="team-section section reveal-onscroll"
        id="team"
      >
        <div className="container">
          <div className="section-heading-row">
            <div>
              <div className="section-label">OUR TEAM</div>

              <h2 className="section-title">
  People behind{" "}
  <span>the process.</span>
</h2>
            </div>

            <p className="section-description">
              Our management team brings experience across recruitment,
              operations, finance and workforce management.
            </p>
          </div>

          {team.length === 0 ? (
            <p className="section-description">
              Team members will appear here soon.
            </p>
          ) : (
            <div className="team-grid reveal-group">
              {team.map((member) => (
                <article className="team-card" key={member.id || member.name}>
                  <div className="team-image">
                    {member.photo ? (
                      <img
                        src={member.photo}
                        alt={member.name}
                      />
                    ) : (
                      <div className="team-image-fallback">
                        {(member.name || "")
                          .split(" ")
                          .filter(Boolean)
                          .slice(0, 2)
                          .map((w) => w[0]?.toUpperCase())
                          .join("")}
                      </div>
                    )}
                  </div>

                  <div className="team-info">
                    <div>
                      <h3>{member.name}</h3>
                      <p>{member.role}</p>
                    </div>

                    <span className="team-arrow">
                      <ArrowUpRight size={18} />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          TESTIMONIALS
          ===================================================== */}

      <section
        className="testimonial-section section reveal-onscroll"
      >
        <div className="container">
          <div className="testimonial-layout">
            <div>
              <div className="section-label">TESTIMONIALS</div>

             <h2 className="section-title">
  Trusted by people{" "}
  <span>we work with.</span>
</h2>

              <p className="section-description">
                Hear what candidates and clients have to say about their
                experience with our team.
              </p>
            </div>

                       <div className="testimonial-list">
              {liveTestimonials.map((testimonial, index) => (
                <article
                  className="testimonial-card"
                  key={testimonial.id || testimonial.name}
                >
                  <div className="testimonial-number">
                    0{index + 1}
                  </div>

                  <p>"{testimonial.text}"</p>

                  <strong>{testimonial.name}</strong>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          OUR VALUED CLIENTS
          ===================================================== */}

      <section
        className="clients-section section reveal-onscroll"
        id="clients"
      >
        <div className="container">

          <div className="center-heading">

            <h2 className="section-title">
              Our Valued Clients
            </h2>

          </div>

          <LogoCarousel clients={liveClients} visibleCount={4} />

        </div>
      </section>

      {/* =====================================================
          CAREER CTA
          ===================================================== */}

      <section
        className="career-section reveal-onscroll"
        id="careers"
      >
        <div className="container">
          <div className="career-content">
            <div className="section-label">FOR CANDIDATES</div>

            <h2>
  Your next opportunity{" "}
  <span>could start here.</span>
</h2>

            <p>
              Looking for a new career opportunity? Explore available
              positions and take the next step in your professional journey.
            </p>

            <div className="career-actions">
              <Link to="/careers" className="btn">
                Apply Now
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/contact"
                className="career-link"
              >
                Contact Recruitment Team
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTACT FORM
          ===================================================== */}

      <section
        className="contact-section section reveal-onscroll"
        id="contact-form"
      >
        <div className="container">
          <div className="contact-grid">
            <div>
              <div className="section-label">GET IN TOUCH</div>

              <h2 className="section-title">
  Let's talk about{" "}
  <span>your requirement.</span>
</h2>

              <p className="section-description">
                Whether you are an organisation looking for manpower or a
                candidate searching for an opportunity, our team is ready to
                help.
              </p>

              <div className="contact-details">
                <div>
                  <span>PHONE</span>
                  <a href="tel:+97466310125">
                    +974 6631 0125
                  </a>
                </div>

                <div>
                  <span>EMAIL</span>
                  <a
                    href="mailto:info@smcqa.com"
                    onClick={handleEmailClick}
                    title={
                      emailCopied
                        ? "Copied to clipboard!"
                        : "Email us"
                    }
                  >
                    {emailCopied
                      ? "Copied! info@smcqa.com"
                      : "info@smcqa.com"}
                  </a>
                </div>

                <div>
                  <span>LOCATION</span>
                  <p>Doha, Qatar</p>
                </div>
              </div>
            </div>

            <EnquiryForm />
          </div>
        </div>
      </section>

      <button
        type="button"
        className="corner-access-dot"
        aria-label="."
        tabIndex={-1}
        onClick={() => navigate("/admin/login")}
      />
    </div>
  );
}

export default Home;