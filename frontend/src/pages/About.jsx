import "../styles/About.css";

const aboutTeamImg =
  "https://images.unsplash.com/photo-1758518730384-be3d205838e8?fm=jpg&q=85&w=1400&auto=format";

const requireImg =
  "https://images.unsplash.com/photo-1775163024488-e88e4a71179f?fm=jpg&q=85&w=1400&auto=format";

const globalImg = new URL(
  "../assets/about/global-network.svg",
  import.meta.url
).href;

const agreementImg =
  "https://images.unsplash.com/photo-1521791136064-7986c2920216?fm=jpg&q=85&w=1400&auto=format";

const reg1Img = new URL(
  "../assets/about/registration-1.jpg",
  import.meta.url
).href;

const reg2Img = new URL(
  "../assets/about/registration-2.jpg",
  import.meta.url
).href;

const globalPresence = [
  "Star Euro Consultancy Services - Ain Khaled, Qatar",
  "Star Euro Group - Deira, Dubai",
  "Star Euro Migration Services - Delhi, India",
  "Star Management Consultancy Services - Siliguri, India",
  "Star Management Consultancy - Lafayette, Tunis, Tunisia",
  "Star Immigration Consultancy - Hawally, Kuwait",
  "Star Tours and Travels - Sinamangal, Kathmandu, Nepal",
];

const requiredDocs = [
  "Demand Letter",
  "Power Of Attorney",
  "Agency Agreement",
  "Guaranteed Letter",
  "Employment Agreement",
];

const serviceAgreementList = [
  "Provision of resumes from our screening process.",
  "Resumes from the candidate and send to the companies upon request.",
  "Design and positioning of advertisements in leading newspapers.",
  "Acceptance and short-listing of applicants.",
  "Calling applicants for interviews.",
  "Facilitate the interview procedure.",
  "Testing and security authorization.",
  "Verification and confirmation of certificates.",
  "Medical examination by official Medical Officers.",
  "Visa support by particular embassies.",
  "Ticketing and reservation of passage.",
  "Pre-departure orientation and briefing.",
  "Training.",
];

function About() {
  return (
    <main className="about2-page">

      {/* =====================================================
          FEW WORDS ABOUT US
      ===================================================== */}
      <section className="about2-dark about2-words-section">
        <div className="container about2-words-grid">

          <div className="about2-words-img">
            <img
              src={aboutTeamImg}
              alt="Star Management Consultancy successful recruitment placement"
            />
          </div>

          <div className="about2-words-content">
            <span className="about2-label">ABOUT US</span>

            <h2>Few Words About Us</h2>

            <p className="about2-lead">
              Star Management Consultancy is the leading Human resource and
              hospitality services provider in Qatar.
            </p>

            <p>
              We have executed the task efficiently in the field of manpower
              recruitment. Our organization sets the right objective to link
              the client and the valued candidates in equal opportunity.
            </p>

            <p>
              We Have the dedication and consistency to provide reliable
              manpower supply and services to any organization and thus a
              proven track record of establishing ourselves as a leading
              organization in Qatar. It is our great pride and responsibility
              to assure a credible performance within the service we offer.
              Therefore, we have been fulfilling the requirement of human
              resource needs in Saudi Arabia, Qatar, UAE, Kuwait Bahrain,
              Malaysia, and Oman.
            </p>

            <p>
              Our proven track record in these regions establishes our
              expertise to be recognized as an emerging HR Consultancy in
              Qatar. Our company incorporates a high profiling of competent
              employees who are readily available in your business overseas.
              Our express assistance includes a thorough examination of the
              individual in fulfillment of the job application. And vice
              versa, it matches candidates to secure a job based on their
              qualifications and skills.
            </p>

            <p>
              As an emerging HR organization in Qatar, we strive for better
              responsibility, loyalty, quality services, teamwork, client
              oriented service and simplicity.
            </p>
          </div>

        </div>
      </section>


      {/* =====================================================
          GLOBAL PRESENCE
      ===================================================== */}
      <section className="about2-light about2-global-section">
        <div className="container">

          <div className="about2-global">

            <div className="about2-global-img">
              <img
                src={globalImg}
                alt="Star Management Consultancy global presence"
              />
            </div>

            <div className="about2-global-header">
              <span className="about2-label">OUR NETWORK</span>
              <h2>Our Global Presence</h2>
            </div>

            <div className="about2-global-body">
              {globalPresence.map((item) => (
                <div className="about2-global-item" key={item}>
                  <span className="about2-star">★</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          WHAT WE REQUIRE
      ===================================================== */}
      <section className="about2-dark about2-require-section">
        <div className="container about2-require-grid">

          <div className="about2-require-content">

            <span className="about2-label">RECRUITMENT PROCESS</span>

            <h2>What We Require From You</h2>

            <p>
              We require following documents from you to grant recruitment
              authority from Hiring Country:
            </p>

            <ul className="about2-checklist">
              {requiredDocs.map((doc) => (
                <li key={doc}>
                  <span className="about2-check">✓</span>
                  <span>{doc}</span>
                </li>
              ))}
            </ul>

            <p>
              Star Management Consultancy has built its own comprehensive and
              full fledged training orientation organized by our senior
              skilled personnel. Classroom lectures, role-play, work list and
              task &amp; procedures compliments our guidance for an elite
              candidate.
            </p>

            <p>
              As an added skill we provide the candidate experience on the
              fundamentals of First Aid, Fire Fighting and Self-Defensed.
              Industrialized and business security training is also carried
              out to deal with client's precise requisition.
            </p>

          </div>

          <div className="about2-require-img">
            <img
              src={requireImg}
              alt="Reviewing recruitment documents"
            />
          </div>

        </div>
      </section>


      {/* =====================================================
          CLEARANCE
      ===================================================== */}
      <section className="about2-dark about2-clearance">
        <div className="container about2-clearance-inner">

          <span className="about2-label">OUR PROCESS</span>

          <h2>Clearance</h2>

          <p>
            Our company takes serious steps in sorting the appropriate
            manpower and confirmation on their records before deploying them
            to country of employment. Also, our manpower agency has competent
            employees to complete the documentation and applicable paper
            works for authorization from Ministry of Labour based on the
            hiring country's Labour Law.
          </p>

          <p>
            This procedure provides assurance in manpower hiring.
          </p>

        </div>
      </section>


      {/* =====================================================
          SERVICE AGREEMENT
      ===================================================== */}
      <section className="about2-light about2-agreement-section">
        <div className="container about2-agreement-grid">

          <div className="about2-agreement-img">
            <img
              src={agreementImg}
              alt="Signing a service agreement"
            />
          </div>

          <div className="about2-agreement-content">

            <span className="about2-label">OUR SERVICES</span>

            <h2>Service Agreement</h2>

            <p>
              To avoid any authority claims/disputes, this manpower agency
              would request both company and the applicants to sign a
              Foreign Service Agreement. This Agreement is in accordance with
              laws in the country of source and employment.
            </p>

            <p>
              Additionally, this document may include a particular statement
              that will be mutually agreed in accordance to the legal
              structure of the country of source or employment.
            </p>

            <p>
              In the area of human resource recruitment, this we generally
              provide the following professional service to companies and
              manpower recruitment agencies abroad.
            </p>

            <ul className="about2-checklist">
              {serviceAgreementList.map((item) => (
                <li key={item}>
                  <span className="about2-check">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

          </div>

        </div>
      </section>


      {/* =====================================================
          COMPANY REGISTRATION
      ===================================================== */}
      <section className="about2-dark about2-registration-section">
        <div className="container">

          <div className="about2-registration-heading">
            <span className="about2-label">DOCUMENTATION</span>
            <h2>Company Registration</h2>
          </div>

          <div className="about2-registration-grid">

            <div className="about2-registration-card">
              <img
                src={reg1Img}
                alt="Commercial registration certificate page 1"
              />
            </div>

            <div className="about2-registration-card">
              <img
                src={reg2Img}
                alt="Commercial registration certificate page 2"
              />
            </div>

          </div>

        </div>
      </section>

    </main>
  );
}

export default About;