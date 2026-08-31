import { useEffect, useState } from "react";
import { Star, MessageSquareText } from "lucide-react";
import { getReviews, createReview } from "../lib/api.js";
import "../styles/Reviews.css";

const EMPTY = {
  name: "",
  email: "",
  rating: 5,
  text: "",
};

function StarPicker({ value, onChange }) {
  return (
    <div className="reviews-star-picker">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
          className="reviews-star-btn"
          onClick={() => onChange(n)}
        >
          <Star size={26} fill={n <= value ? "#c9962e" : "none"} color="#c9962e" />
        </button>
      ))}
    </div>
  );
}

function Stars({ rating = 5 }) {
  const value = Number(rating) || 0;
  return (
    <span className="reviews-stars-static">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={15} fill={i < value ? "#c9962e" : "none"} color="#c9962e" />
      ))}
    </span>
  );
}

function Reviews() {
  const [form, setForm] = useState(EMPTY);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const [approved, setApproved] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    getReviews()
      .then((data) => {
        if (!cancelled) setApproved(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Failed to load reviews:", err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [sent]);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    setSent(false);
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSent(false);
    setError("");

    if (!form.name.trim() || !form.text.trim()) {
      setError("Please add your name and your feedback before submitting.");
      return;
    }

    setSending(true);

    try {
      await createReview({
        name: form.name.trim(),
        email: form.email.trim(),
        rating: form.rating,
        text: form.text.trim(),
      });

      setSent(true);
      setForm(EMPTY);
    } catch (err) {
      console.error("Review submission failed:", err);
      setError(err.message || "Unable to submit your feedback. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="reviews-page">
      <section className="reviews-hero">
        <div className="container">
          <h1>Client Feedback</h1>
          <p>
            We'd love to hear about your experience with Star Management
            Consultancy. Your feedback helps us improve — and helps other
            clients know what to expect.
          </p>
        </div>
      </section>

      <section className="reviews-content">
        <div className="container reviews-grid">
          {/* WRITE A REVIEW */}
          <div className="reviews-form-panel">
            <div className="reviews-form-heading">
              <MessageSquareText size={22} />
              <h2>Share Your Feedback</h2>
            </div>

            {sent && (
              <div className="reviews-form-success">
                Thank you! Your feedback has been submitted and will appear
                here once our team reviews it.
              </div>
            )}

            {error && <div className="reviews-form-error">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="reviews-field">
                <label htmlFor="review-name">
                  Name <span className="required">*</span>
                </label>
                <input
                  id="review-name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                />
              </div>

              <div className="reviews-field">
                <label htmlFor="review-email">Email (optional)</label>
                <input
                  id="review-email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                />
              </div>

              <div className="reviews-field">
                <label>Rating</label>
                <StarPicker
                  value={form.rating}
                  onChange={(n) => updateField("rating", n)}
                />
              </div>

              <div className="reviews-field">
                <label htmlFor="review-text">
                  Your Feedback <span className="required">*</span>
                </label>
                <textarea
                  id="review-text"
                  placeholder="Tell us about your experience..."
                  rows={5}
                  value={form.text}
                  onChange={(e) => updateField("text", e.target.value)}
                />
              </div>

              <button type="submit" className="reviews-submit-btn" disabled={sending}>
                {sending ? "Submitting..." : "Submit Feedback"}
              </button>
            </form>
          </div>

          {/* APPROVED REVIEWS LIST */}
          <div className="reviews-list-panel">
            <h2>What Our Clients Say</h2>

            {loading ? (
              <p className="reviews-empty">Loading feedback...</p>
            ) : approved.length === 0 ? (
              <p className="reviews-empty">
                No feedback published yet — be the first to share yours!
              </p>
            ) : (
              <div className="reviews-list">
                {approved.map((review) => (
                  <div className="reviews-card" key={review.id}>
                    <div className="reviews-card-top">
                      <span className="reviews-card-name">{review.name}</span>
                      <Stars rating={review.rating} />
                    </div>
                    <p className="reviews-card-text">{review.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Reviews;