import { useState } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { createInquiry } from "../lib/api.js";
import "../styles/pages.css";

const EMPTY = { name: "", email: "", phone: "", subject: "", message: "" };

function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    createInquiry(form);
    setSent(true);
    setForm(EMPTY);
  }

  return (
    <div className="page-contact">
      <section className="page-hero">
        <div className="container">
          <span className="section-label">Contact</span>
          <h1>Let's Talk About Your Staffing Needs</h1>
          <p>
            Reach out and a consultant will get back to you within one
            business day — usually much sooner.
          </p>
        </div>
      </section>

      <section>
        <div className="container contact-grid">
          <div>
            <div className="contact-detail-card">
              <Phone size={20} />
              <div>
                <h4>Call Us</h4>
                <a href="tel:+97466310125">+974 6631 0125</a>
              </div>
            </div>
            <div className="contact-detail-card">
              <Mail size={20} />
              <div>
                <h4>Email Us</h4>
                <a href="mailto:info@smcqa.com">info@smcqa.com</a>
              </div>
            </div>
            <div className="contact-detail-card">
              <MapPin size={20} />
              <div>
                <h4>Visit Us</h4>
                <p>Doha, Qatar</p>
              </div>
            </div>
            <div className="contact-detail-card">
              <Clock size={20} />
              <div>
                <h4>Working Hours</h4>
                <p>Sun – Thu, 8:00 AM – 6:00 PM</p>
              </div>
            </div>
          </div>

          <div>
            {sent && (
              <div className="form-success" style={{ marginBottom: 18 }}>
                Message sent! Our team received your inquiry and will follow
                up shortly.
              </div>
            )}
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="two-col">
                <div>
                  <label>Full name</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div>
                  <label>Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="two-col">
                <div>
                  <label>Phone</label>
                  <input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label>Subject</label>
                  <input
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label>Message</label>
                <textarea
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Send message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
