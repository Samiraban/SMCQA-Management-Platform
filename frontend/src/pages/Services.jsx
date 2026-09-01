import { ArrowUpRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCollection } from "../lib/useRealtime.js";
import { imageFor, getGallery } from "../lib/stockImage.js";
import HospitalityDetail from "./HospitalityDetail.jsx";
import ServiceDetail from "./ServiceDetail.jsx";
import { serviceDetails } from "../data/serviceDetails.js";
import "../styles/pages.css";


/* =========================================================
   CREATE COMPARABLE WORDS
   ========================================================= */

function significantWords(text) {
  return text
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .split(" ")
    .filter(
      (word) =>
        word &&
        word !== "and"
    )
    .map((word) =>
      word.slice(0, 6)
    );
}


/* =========================================================
   SLUGIFY
   ========================================================= */

function slugify(title) {
  return (title || "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}


/* =========================================================
   FIND MATCHING SERVICE
   ========================================================= */

function findMatchingService(
  services,
  slug
) {
  if (!slug) {
    return null;
  }

  const slugWords =
    significantWords(slug);

  if (slugWords.length === 0) {
    return null;
  }

  let best = null;
  let bestScore = 0;

  for (const service of services) {

    const titleWords =
      significantWords(
        service.title || ""
      );

    if (titleWords.length === 0) {
      continue;
    }

    const matches =
      slugWords.filter((word) =>
        titleWords.includes(word)
      ).length;

    const score =
      matches / slugWords.length;

    if (score > bestScore) {
      bestScore = score;
      best = service;
    }
  }

  return bestScore >= 0.5
    ? best
    : null;
}


/* =========================================================
   SERVICES PAGE
   ========================================================= */

function Services() {

  const services =
    useCollection("services");

  const location =
    useLocation();


  /* ---------------------------------------------------------
     GET URL SLUG
     Example:
     /services/hospitality
     --------------------------------------------------------- */

  const slug =
    location.pathname
      .replace(/^\/services\/?/, "")
      .replace(/\/$/, "");


  /* ---------------------------------------------------------
     FIND SERVICE
     --------------------------------------------------------- */

  const matchedService =
    findMatchingService(
      services,
      slug
    );


  /* ---------------------------------------------------------
     STATIC SERVICE CONTENT MATCH
     (gallery photos + about paragraphs, defined locally so
     services like "Sub Contracting Works" work even if they
     aren't in the backend collection yet)
     --------------------------------------------------------- */

  const matchedStaticService =
    findMatchingService(
      serviceDetails,
      slug
    );


  /* ---------------------------------------------------------
     FALLBACK HOSPITALITY
     --------------------------------------------------------- */

  const activeService =
    matchedService ||
    matchedStaticService ||
    (
      slug === "hospitality"
        ? {
            title: "Hospitality",
            description:
              "Professional hospitality manpower for hotels, restaurants, resorts and guest-service operations.",
          }
        : null
    );


  /* =========================================================
     SERVICE DETAIL PAGE
     ========================================================= */

  if (
    slug &&
    activeService
  ) {

    /* -------------------------------------------------------
       HOSPITALITY SPECIAL PAGE
       ------------------------------------------------------- */

    if (
      significantWords(
        activeService.title
      ).includes(
        significantWords(
          "Hospitality"
        )[0]
      )
    ) {

      return (
        <HospitalityDetail
          service={activeService}
        />
      );

    }


    /* -------------------------------------------------------
       OTHER SERVICES
       Static content (gallery + about paragraphs) falls back
       to the backend service's own title/description if we
       don't have a dedicated entry for it yet.
       ------------------------------------------------------- */

    const staticContent =
      matchedStaticService ||
      findMatchingService(
        serviceDetails,
        activeService.title
      );

    /* -------------------------------------------------------
       GALLERY IMAGES
       Photos an admin has uploaded for this service (in
       Admin → Services → Photo Gallery) always take priority.
       Only fall back to the auto-picked stock photos when the
       admin hasn't uploaded any photos yet.
       ------------------------------------------------------- */

    const adminUploadedGallery = Array.isArray(
      activeService.gallery
    )
      ? activeService.gallery
      : [];

    const galleryImages =
      adminUploadedGallery.length > 0
        ? adminUploadedGallery.map((url) => ({
            url,
            fallback: url,
          }))
        : getGallery(
            staticContent?.category || "hospitality",
            10
          );

    const subcategories = Array.isArray(
      activeService.subcategories
    )
      ? activeService.subcategories
      : [];

    return (
      <ServiceDetail
        title={activeService.title}
        tagline={staticContent?.tagline}
        subcategories={subcategories}
        description={activeService.description}
        paragraphs={
          staticContent?.paragraphs ||
          [activeService.description].filter(Boolean)
        }
        images={galleryImages}
        icon={activeService.icon}
      />
    );

  }


  /* =========================================================
     SERVICE NOT FOUND
     ========================================================= */

  const notFoundNotice =
    slug &&
    !activeService;


  /* =========================================================
     MAIN SERVICES PAGE
     ========================================================= */

  return (

    <div className="page-services">


      {/* =========================
          HERO
      ========================= */}

      <section className="page-hero">

        <div className="container">

          <span className="section-label">
            What We Do
          </span>

          <h1>
            Manpower Solutions Across
            Every Industry
          </h1>

          <p>
            From hospitality floors to
            construction sites, we supply
            vetted, reliable staff so your
            operations never miss a beat.
          </p>

        </div>

      </section>


      {/* =========================
          NOT FOUND MESSAGE
      ========================= */}

      {notFoundNotice && (

        <section>

          <div className="container">

            <div className="empty-state">

              We don't have a dedicated
              page for "
              {slug.replace(
                /-/g,
                " "
              )}
              " yet — here's everything
              we currently offer.

            </div>

          </div>

        </section>

      )}


      {/* =========================
          SERVICE CARDS
      ========================= */}

      <section>

        <div className="container">

          <div className="service-photo-grid">

            {services.map((service) => (

              <Link
                to={`/services/${
                  service.slug ||
                  slugify(
                    service.title
                  )
                }`}
                className="service-photo-card"
                key={service.id}
              >

                <div className="service-photo-card-image">

                  <img
                    src={imageFor(
                      service.image,
                      service.title
                    )}
                    alt={service.title}
                    loading="lazy"
                  />

                </div>


                <div className="service-photo-card-label">

                  {service.title.toUpperCase()}

                </div>

              </Link>

            ))}

          </div>

        </div>

      </section>


      {/* =========================
          CTA
      ========================= */}

      <section className="page-about">

        <div className="container about-cta-inner">

          <div>

            <h2>
              Need staff for a role
              not listed here?
            </h2>

            <p>
              We source across dozens
              of specialisations —
              tell us what you need.
            </p>

          </div>


          <Link
            to="/contact"
            className="btn btn-dark"
          >

            Request staffing

            <ArrowUpRight
              size={16}
            />

          </Link>

        </div>

      </section>

    </div>

  );
}


export default Services;