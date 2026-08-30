import { useState, useMemo } from "react";
import { UploadCloud, ShieldCheck, X } from "lucide-react";

import { useCollection } from "../lib/useRealtime.js";
import { createApplicant } from "../lib/api.js";

import "../styles/Careers.css";

/* =========================================================
   COUNTRIES
   ========================================================= */

const COUNTRIES = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Guatemala",
  "Guinea",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Ivory Coast",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kuwait",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Togo",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];


/* =========================================================
   INITIAL FORM
   ========================================================= */

const initialForm = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  dob: "",
  address: "",
  city: "",
  country: "",
  post: "",
  message: "",
};


/* =========================================================
   CAREER COMPONENT
   ========================================================= */

function Careers() {
  const jobs = useCollection("jobs");

  const postOptions = useMemo(() => {
    const openTitles = jobs
      .filter((job) => job.status === "Open")
      .map((job) => job.title);

    return openTitles.length > 0
      ? openTitles
      : ["General Application"];
  }, [jobs]);


  const [form, setForm] = useState(initialForm);

  const [cvFile, setCvFile] = useState(null);

  const [agreed, setAgreed] = useState(false);

  const [honeypot, setHoneypot] = useState("");

  const [sending, setSending] = useState(false);

  const [error, setError] = useState("");

  const [submitted, setSubmitted] = useState(false);


  /* =======================================================
     UPDATE FORM
     ======================================================= */

  function update(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setError("");
  }


  /* =======================================================
     FILE UPLOAD
     ======================================================= */

  function handleFile(e) {
    const file = e.target.files?.[0] || null;

    setCvFile(file);
  }


  /* =======================================================
     SUBMIT APPLICATION
     ======================================================= */

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");


    /* BOT PROTECTION */

    if (honeypot) {
      setSubmitted(true);
      return;
    }


    /* TERMS */

    if (!agreed) {
      setError(
        "Please agree to the terms & conditions to continue."
      );

      return;
    }


    setSending(true);


    try {
      await createApplicant({
        name:
          `${form.firstName} ${form.lastName}`.trim() ||
          "Not provided",

        firstName: form.firstName.trim(),

        lastName: form.lastName.trim(),

        phone: form.phone.trim(),

        email: form.email.trim(),

        dob: form.dob,

        address: form.address.trim(),

        city: form.city.trim(),

        country: form.country,

        jobTitle: form.post,

        message: form.message.trim(),

        cvFileName: cvFile?.name || "",
      });


      setSubmitted(true);

    } catch (err) {
      console.error(
        "Application submission failed:",
        err
      );

      setError(
        err.message ||
          "Unable to submit your application. Please try again."
      );

    } finally {
      setSending(false);
    }
  }


  /* =======================================================
     PAGE
     ======================================================= */

  return (
    <div className="career2-page">


      {/* =====================================================
          JOIN OUR TEAM
          ===================================================== */}

      <section className="career2-light">

        <span
          className="career2-deco career2-deco-tl"
          aria-hidden="true"
        />

        <span
          className="career2-deco career2-deco-br"
          aria-hidden="true"
        />


        <div className="container">


          {/* HEADING */}

          <span className="career2-label reveal-onscroll">
            CAREERS
          </span>

          <h2 className="career2-heading reveal-onscroll">
            Join Our Team
          </h2>


          <p
            className="career2-subheading reveal-onscroll"
            style={{ transitionDelay: "0.08s" }}
          >
            Explore career opportunities and become
            part of our growing team.
          </p>



          {/* FORM */}

          <div
            className="career2-form-frame reveal-onscroll"
            style={{ transitionDelay: "0.16s" }}
          >

            <div className="career2-form-card">


              {/* =================================================
                  SUCCESS MESSAGE
                  ================================================= */}

              {submitted ? (

                <div className="career2-success">

                  <div className="career2-success-icon">
                    ✓
                  </div>

                  <strong>
                    Application Received
                  </strong>

                  <span>
                    Thanks
                    {form.firstName
                      ? `, ${form.firstName}`
                      : ""}!

                    Your application has been
                    received. Our team will reach
                    out to you soon
                    {form.email
                      ? ` at ${form.email}`
                      : ""}.
                  </span>

                </div>


              ) : (


                /* =================================================
                   APPLICATION FORM
                   ================================================= */

                <form
                  className="career2-form"
                  onSubmit={handleSubmit}
                >


                  {/* HONEYPOT */}

                  <input
                    type="text"
                    name="company_website"
                    value={honeypot}
                    onChange={(e) =>
                      setHoneypot(e.target.value)
                    }
                    className="career2-honeypot"
                    tabIndex={-1}
                    autoComplete="off"
                  />



                  {/* ERROR */}

                  {error && (
                    <div className="career2-error">
                      {error}
                    </div>
                  )}



                  {/* =================================================
                      PERSONAL INFORMATION
                      ================================================= */}

                  <div className="career2-section-title">

                    <span>
                      01
                    </span>

                    <div>

                      <h3>
                        Personal Information
                      </h3>

                      <p>
                        Tell us a little about yourself
                      </p>

                    </div>

                  </div>



                  {/* FIRST + LAST */}

                  <div className="career2-row">

                    <div>

                      <label>
                        First Name
                      </label>

                      <input
                        placeholder="First Name"
                        value={form.firstName}
                        onChange={(e) =>
                          update(
                            "firstName",
                            e.target.value
                          )
                        }
                      />

                    </div>


                    <div>

                      <label>
                        Last Name
                      </label>

                      <input
                        placeholder="Last Name"
                        value={form.lastName}
                        onChange={(e) =>
                          update(
                            "lastName",
                            e.target.value
                          )
                        }
                      />

                    </div>

                  </div>



                  {/* PHONE + EMAIL */}

                  <div className="career2-row">

                    <div>

                      <label>
                        Phone *
                      </label>

                      <input
                        type="tel"
                        placeholder="Phone"
                        required
                        value={form.phone}
                        onChange={(e) =>
                          update(
                            "phone",
                            e.target.value
                          )
                        }
                      />

                    </div>


                    <div>

                      <label>
                        Email *
                      </label>

                      <input
                        type="email"
                        placeholder="Email"
                        required
                        value={form.email}
                        onChange={(e) =>
                          update(
                            "email",
                            e.target.value
                          )
                        }
                      />

                    </div>

                  </div>



                  {/* DOB + ADDRESS */}

                  <div className="career2-row">

                    <div>

                      <label>
                        Date of birth *
                      </label>

                      <input
                        type="date"
                        required
                        value={form.dob}
                        onChange={(e) =>
                          update(
                            "dob",
                            e.target.value
                          )
                        }
                      />

                    </div>


                    <div>

                      <label>
                        Address *
                      </label>

                      <input
                        placeholder="Address"
                        required
                        value={form.address}
                        onChange={(e) =>
                          update(
                            "address",
                            e.target.value
                          )
                        }
                      />

                    </div>

                  </div>



                  {/* CITY + COUNTRY */}

                  <div className="career2-row">

                    <div>

                      <label>
                        City *
                      </label>

                      <input
                        placeholder="City"
                        required
                        value={form.city}
                        onChange={(e) =>
                          update(
                            "city",
                            e.target.value
                          )
                        }
                      />

                    </div>


                    <div>

                      <label>
                        Country *
                      </label>

                      <select
                        required
                        value={form.country}
                        onChange={(e) =>
                          update(
                            "country",
                            e.target.value
                          )
                        }
                      >

                        <option
                          value=""
                          disabled
                        >
                          Country
                        </option>


                        {COUNTRIES.map(
                          (country) => (
                            <option
                              key={country}
                              value={country}
                            >
                              {country}
                            </option>
                          )
                        )}

                      </select>

                    </div>

                  </div>



                  {/* =================================================
                      APPLICATION DETAILS
                      ================================================= */}

                  <div className="career2-section-title career2-section-spacing">

                    <span>
                      02
                    </span>

                    <div>

                      <h3>
                        Application Details
                      </h3>

                      <p>
                        Choose the position you are
                        applying for
                      </p>

                    </div>

                  </div>



                  {/* POSITION + MESSAGE */}

                  <div className="career2-row">

                    <div>

                      <label>
                        Applying for the Post *
                      </label>

                      <select
                        required
                        value={form.post}
                        onChange={(e) =>
                          update(
                            "post",
                            e.target.value
                          )
                        }
                      >

                        <option
                          value=""
                          disabled
                        >
                          Select a position
                        </option>


                        {postOptions.map(
                          (title) => (
                            <option
                              key={title}
                              value={title}
                            >
                              {title}
                            </option>
                          )
                        )}

                      </select>

                    </div>


                    <div>

                      <label>
                        Message
                      </label>

                      <input
                        placeholder="Message"
                        value={form.message}
                        onChange={(e) =>
                          update(
                            "message",
                            e.target.value
                          )
                        }
                      />

                    </div>

                  </div>



                  {/* =================================================
                      CV UPLOAD
                      ================================================= */}

                  <div className="career2-cv-field">

                    <label>
                      Upload Your CV
                    </label>


                    <label
                      className="career2-dropzone"
                      htmlFor="career2-cv"
                    >

                      <UploadCloud size={22} />


                      <span className="career2-dropzone-title">

                        {cvFile
                          ? cvFile.name
                          : "Upload Your CV"}

                      </span>


                      <span className="career2-dropzone-hint">

                        PDF, DOC/DOCX, XLS/CSV,
                        JPG/JPEG, PNG, GIF

                      </span>

                    </label>


                    <input
                      id="career2-cv"
                      type="file"
                      className="career2-file-input"
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.jpg,.jpeg,.png,.gif"
                      onChange={handleFile}
                    />


                    {cvFile && (

                      <button
                        type="button"
                        className="career2-remove-file"
                        onClick={() =>
                          setCvFile(null)
                        }
                      >

                        <X size={13} />

                        Remove file

                      </button>

                    )}

                  </div>



                  {/* =================================================
                      SPAM PROTECTION
                      ================================================= */}

                  <div className="career2-protection">

                    <ShieldCheck size={20} />

                    <div>

                      <strong>
                        This form is protected against spam
                      </strong>

                      <span>
                        Automated submissions are filtered out.
                      </span>

                    </div>

                  </div>



                  {/* =================================================
                      TERMS
                      ================================================= */}

                  <label className="career2-agree">

                    <input
                      type="checkbox"
                      required
                      checked={agreed}
                      onChange={(e) =>
                        setAgreed(
                          e.target.checked
                        )
                      }
                    />


                    <span>

                      I agree to terms &amp;
                      conditions provided by the
                      company. By providing my phone
                      number, I agree to receive text
                      messages from the business.

                    </span>

                  </label>



                  {/* =================================================
                      SUBMIT
                      ================================================= */}

                  <button
                    type="submit"
                    className="career2-submit"
                    disabled={sending}
                  >

                    {sending
                      ? "Submitting..."
                      : "Submit Your Application"}

                  </button>


                </form>

              )}

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}
export default Careers;