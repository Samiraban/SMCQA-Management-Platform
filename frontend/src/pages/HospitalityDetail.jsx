import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import { hospitalityDepartments } from "../data/hospitalityRoles.js";
import { imageFor } from "../lib/stockImage.js";

import "../styles/pages.css";

function HospitalityDetail({ service }) {
  return (
    <div className="page-services page-hospitality">

      {/* HERO */}

      <section className="hospitality-hero">

        <div className="container hospitality-hero-inner">

          <Link
            to="/services"
            className="hospitality-back"
          >
            <ArrowLeft size={15} />
            Back to Services
          </Link>

          <span className="hospitality-kicker">
            OUR SERVICES
          </span>

          <h1>HOSPITALITY</h1>

          <p>
            {service?.description ||
              "Professional hospitality manpower for hotels, restaurants, resorts and guest-service operations."}
          </p>

        </div>

      </section>


      {/* DEPARTMENT NAVIGATION */}

      <nav className="hospitality-nav">

        <div className="container hospitality-nav-scroll">

          {hospitalityDepartments.map(
            (department) => (
              <a
                key={department.key}
                href={`#section-${department.key}`}
                className="hospitality-nav-link"
              >
                {department.label}
              </a>
            )
          )}

        </div>

      </nav>


      {/* DEPARTMENTS */}

      <main>

        {hospitalityDepartments.map(
          (department) => (

            <section
              key={department.key}
              id={`section-${department.key}`}
              className="hospitality-department"
            >

              <div className="container">

                <div className="hospitality-heading">

                  <h2>
                    {department.label}
                  </h2>

                  <span className="heading-line"></span>

                </div>


                <div className="hospitality-role-grid">

                  {department.roles.map(
                    (role, index) => (

                      <article
                        key={`${department.key}-${index}`}
                        className="hospitality-role-card"
                      >

                        <div className="hospitality-role-image">

                          <img
                            src={imageFor(
                              role.image,
                              role.title,
                              900,
                              600,
                              index
                            )}
                            alt={role.title}
                            loading="lazy"
                          />

                        </div>

                        <div className="hospitality-role-name">
                          {role.title}
                        </div>

                      </article>

                    )
                  )}

                </div>

              </div>

            </section>

          )
        )}

      </main>


      {/* CTA */}

      <section className="hospitality-cta">

        <div className="container hospitality-cta-inner">

          <div>

            <span className="hospitality-kicker">
              NEED HOSPITALITY STAFF?
            </span>

            <h2>
              Let us build the right team
              for your operation.
            </h2>

          </div>

          <Link
            to="/contact"
            className="btn btn-dark"
          >
            Request Staffing
            <ArrowUpRight size={16} />
          </Link>

        </div>

      </section>

    </div>
  );
}

export default HospitalityDetail;