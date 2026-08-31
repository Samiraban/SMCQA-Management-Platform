import { useState } from "react";
import { X, Mail, MessageCircle } from "lucide-react";
import { sendReplyEmail } from "../lib/api.js";

function cleanPhoneForWhatsApp(phone) {
  // WhatsApp's wa.me links want digits only (country code + number, no + or spaces).
  return String(phone || "").replace(/[^\d]/g, "");
}

function ReplyModal({ item, onClose }) {
  const [tab, setTab] = useState(item?.email ? "email" : "whatsapp");

  const [subject, setSubject] = useState(
    item?.jobTitle
      ? `Re: your application for ${item.jobTitle}`
      : "Re: your enquiry to SMCQA"
  );
  const [message, setMessage] = useState(
    `Hi ${item?.name || ""},\n\n`
  );

  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const hasEmail = Boolean(item?.email);
  const hasPhone = Boolean(item?.phone);

  async function handleSendEmail(e) {
    e.preventDefault();
    setError("");
    setSent(false);

    if (!subject.trim() || !message.trim()) {
      setError("Please fill in both the subject and the message.");
      return;
    }

    setSending(true);

    try {
      await sendReplyEmail({
        to: item.email,
        subject: subject.trim(),
        message: message.trim(),
      });

      setSent(true);
    } catch (err) {
      console.error("Reply email failed:", err);
      setError(err.message || "Unable to send this email.");
    } finally {
      setSending(false);
    }
  }

  function handleOpenWhatsApp() {
    const digits = cleanPhoneForWhatsApp(item?.phone);

    if (!digits) {
      setError("No valid phone number on file for WhatsApp.");
      return;
    }

    const url = `https://wa.me/${digits}?text=${encodeURIComponent(
      message.trim()
    )}`;

    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <h3>Reply to {item?.name || "this person"}</h3>

        <div className="reply-modal-tabs">
          <button
            type="button"
            className={`reply-modal-tab ${tab === "email" ? "active" : ""}`}
            onClick={() => setTab("email")}
            disabled={!hasEmail}
            title={!hasEmail ? "No email on file" : undefined}
          >
            <Mail size={15} /> Email
          </button>

          <button
            type="button"
            className={`reply-modal-tab ${tab === "whatsapp" ? "active" : ""}`}
            onClick={() => setTab("whatsapp")}
            disabled={!hasPhone}
            title={!hasPhone ? "No phone number on file" : undefined}
          >
            <MessageCircle size={15} /> WhatsApp
          </button>
        </div>

        {error && (
          <div className="form-error" style={{ marginTop: 14 }}>
            {error}
          </div>
        )}

        {sent && tab === "email" && (
          <div className="reply-modal-success">Email sent successfully.</div>
        )}

        {tab === "email" ? (
          <form className="contact-form" onSubmit={handleSendEmail}>
            <div>
              <label>To</label>
              <input type="email" value={item?.email || ""} disabled />
            </div>

            <div>
              <label>Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                disabled={sending}
              />
            </div>

            <div>
              <label>Message</label>
              <textarea
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={sending}
              />
            </div>

            <button type="submit" className="btn btn-dark" disabled={sending}>
              {sending ? "Sending..." : "Send Email"}
            </button>
          </form>
        ) : (
          <div className="contact-form">
            <div>
              <label>To</label>
              <input type="text" value={item?.phone || ""} disabled />
            </div>

            <div>
              <label>Message</label>
              <textarea
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <button
              type="button"
              className="btn btn-dark"
              onClick={handleOpenWhatsApp}
            >
              Open in WhatsApp
            </button>

            <small className="admin-field-hint">
              This opens WhatsApp Web (or the app) with your message
              pre-filled — you'll press Send there.
            </small>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReplyModal;