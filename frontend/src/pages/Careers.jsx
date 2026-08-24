import { useState } from "react";
import { MapPin, Briefcase, Clock, X } from "lucide-react";
import { useCollection } from "../lib/useRealtime.js";
import { createApplicant } from "../lib/api.js";
import "../styles/pages.css";

function ApplyModal({ job, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    createApplicant({ ...form, jobId: job.id, jobTitle: job.title });
    setSubmitted(true);
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>

        {submitted ? (
          <div className="form-success">
            Thanks, {form.name.split(" ")[0] || "there"}! Your application for
            "{job.title}" was received. Our team will reach out at{" "}
            {form.email}.
          </div>
        ) : (
          <>
            <h3>Apply for {job.title}</h3>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div>
                <label>Full name</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="two-col">
                <div>
                  <label>Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div>
                  <label>Phone</label>
                  <input
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label>Message (optional)</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit application
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function Careers() {
  const jobs = useCollection("jobs");
  const [activeJob, setActiveJob] = useState(null);
  const openJobs = jobs.filter((j) => j.status === "Open");

  return (
    <div className="page-careers">
      <section className="page-hero">
        <div className="container">
          <span className="section-label">Careers</span>
          <h1>Find Your Next Opportunity</h1>
          <p>
            Browse open roles across our client network in Qatar. New
            positions appear here the moment our team publishes them.
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          {openJobs.length === 0 ? (
            <div className="empty-state">
              No open positions right now — check back soon.
            </div>
          ) : (
            openJobs.map((job) => (
              <div className="job-card" key={job.id}>
                <div>
                  <h3>{job.title}</h3>
                  <div className="job-meta">
                    <span>
                      <MapPin size={13} /> {job.location}
                    </span>
                    <span>
                      <Briefcase size={13} /> {job.department}
                    </span>
                    <span>
                      <Clock size={13} /> {job.type}
                    </span>
                  </div>
                </div>
                <button className="btn btn-dark" onClick={() => setActiveJob(job)}>
                  Apply Now
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      {activeJob && (
        <ApplyModal job={activeJob} onClose={() => setActiveJob(null)} />
      )}
    </div>
  );
}

export default Careers;
