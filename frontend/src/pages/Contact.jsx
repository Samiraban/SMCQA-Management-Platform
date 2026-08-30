import { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import { createInquiry } from "../lib/api.js";
import "../styles/Contact.css";

const EMPTY = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setSent(false);
    setError("");
    setSending(true);

    try {
      await createInquiry({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        message: form.message.trim(),
      });

      setSent(true);
      setForm({ ...EMPTY });
    } catch (err) {
      console.error("Contact submission failed:", err);
      setError(
        err.message || "Unable to send your message. Please try again."
      );
    } finally {
      setSending(false);
    }
  }

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    setSent(false);
    setError("");
  }

  return (
    <div className="contact2-page">
      <section className="contact2-top">
        <div className="container contact2-top-grid">
          {/* LOCATE US CARD */}
          <div className="contact2-locate">
            <div className="contact2-locate-gold" />
            <div className="contact2-locate-white" />

            <div className="contact2-locate-card">
              <div className="contact2-locate-block">
                <div className="contact2-locate-icon">
                  <MapPin size={26} />
                </div>
                <div className="contact2-locate-label">Locate Us</div>
                <p>Star Management Consultancy</p>
                <p>Building No: 01, Floor No: 7,</p>
                <p>Office No: 8 Al Muntazah Trading Center</p>
                <p>Doha, State of Qatar</p>
              </div>

              <div className="contact2-locate-block">
                <div className="contact2-locate-icon">
                  <Phone size={24} />
                </div>
                <div className="contact2-locate-label">Call Us</div>
                <p>
                  <a href="tel:+97466310125">(+974) 6631 0125</a>,{" "}
                  <a href="tel:+97441436428">(+974) 41436428</a>
                </p>
                <p>
                  <a href="tel:+97451149143">(+974) 5114 9143</a>
                </p>
              </div>

              <div className="contact2-locate-block">
                <div className="contact2-locate-icon">
                  <Mail size={24} />
                </div>
                <div className="contact2-locate-label">Mail Us</div>
                <p>
                  <a href="mailto:info@smcqa.com">info@smcqa.com</a>
                </p>
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="contact2-form-panel">
            {sent && (
              <div className="contact2-form-success">
                Message sent! Our team received your inquiry and will follow
                up shortly.
              </div>
            )}

            {error && <div className="contact2-form-error">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="contact2-field">
                <label htmlFor="contact2-name">Name</label>
                <input
                  id="contact2-name"
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                />
              </div>

              <div className="contact2-field">
                <label htmlFor="contact2-email">
                  Email <span className="required">*</span>
                </label>
                <input
                  id="contact2-email"
                  type="email"
                  placeholder="Email"
                  required
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                />
              </div>

              <div className="contact2-field">
                <label htmlFor="contact2-phone">
                  Phone <span className="required">*</span>
                </label>
                <input
                  id="contact2-phone"
                  type="tel"
                  placeholder="Phone"
                  required
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                />
              </div>

              <div className="contact2-field">
                <label htmlFor="contact2-message">Message</label>
                <textarea
                  id="contact2-message"
                  placeholder="Message"
                  value={form.message}
                  onChange={(e) => updateField("message", e.target.value)}
                />
              </div>

              <div className="contact2-submit-row">
                <button
                  type="submit"
                  className="contact2-submit-btn"
                  disabled={sending}
                >
                  {sending ? "Sending..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FULL WIDTH MAP */}
      <iframe
        className="contact2-map"
        title="Star Management Consultancy location in Doha"
        src="https://www.google.com/maps?q=Al%20Muntazah%20Trading%20Center%20Doha%20Qatar&output=embed"
        loading="lazy"
        allowFullScreen
      />
    </div>
  );
}

export default Contact;