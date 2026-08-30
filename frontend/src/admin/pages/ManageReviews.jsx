import { useState } from "react";
import { Star, Trash2, CheckCircle2, XCircle } from "lucide-react";
import { useCollection } from "../../lib/useRealtime.js";
import { editReview, deleteReview } from "../../lib/api.js";

function Stars({ rating = 5 }) {
  const value = Number(rating) || 0;

  return (
    <span style={{ display: "inline-flex", gap: 2 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          fill={i < value ? "#c9962e" : "none"}
          color="#c9962e"
        />
      ))}
    </span>
  );
}

function ManageReviews() {
  const reviews = useCollection("reviews");
  const [busyId, setBusyId] = useState(null);
  const [error, setError] = useState("");

  async function toggleApproved(review) {
    setError("");
    setBusyId(review.id);

    try {
      await editReview(review.id, {
        ...review,
        approved: !review.approved,
      });
    } catch (err) {
      console.error("Review update failed:", err);
      setError(err.message || "Unable to update this review.");
    } finally {
      setBusyId(null);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Delete this review? This can't be undone."
    );

    if (!confirmed) return;

    setError("");
    setBusyId(id);

    try {
      await deleteReview(id);
    } catch (err) {
      console.error("Review delete failed:", err);
      setError(err.message || "Unable to delete this review.");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Manage Reviews</h1>
          <p>
            Approve, reject or delete testimonials submitted by customers.
            Only approved reviews are shown on the homepage.
          </p>
        </div>
      </div>

      {error && (
        <div className="form-error" style={{ marginBottom: 18 }}>
          {error}
        </div>
      )}

      <div className="admin-table-wrap">
        {reviews.length === 0 ? (
          <div className="empty-state">
            No reviews yet — they'll appear here as customers submit them.
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Rating</th>
                <th>Review</th>
                <th>Status</th>
                <th className="admin-table-actions-col">Actions</th>
              </tr>
            </thead>

            <tbody>
              {reviews.map((review) => (
                <tr key={review.id}>
                  <td>{review.name}</td>
                  <td>
                    <Stars rating={review.rating} />
                  </td>
                  <td>{(review.text || "").slice(0, 90)}</td>
                  <td>
                    <span
                      className={`review-badge ${
                        review.approved ? "approved" : "pending"
                      }`}
                    >
                      {review.approved ? "Approved" : "Pending"}
                    </span>
                  </td>
                  <td className="admin-table-actions">
                    <button
                      type="button"
                      onClick={() => toggleApproved(review)}
                      aria-label={review.approved ? "Unapprove" : "Approve"}
                      title={review.approved ? "Unapprove" : "Approve"}
                      disabled={busyId === review.id}
                    >
                      {review.approved ? (
                        <XCircle size={15} />
                      ) : (
                        <CheckCircle2 size={15} />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(review.id)}
                      aria-label="Delete"
                      className="danger"
                      disabled={busyId === review.id}
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ManageReviews;