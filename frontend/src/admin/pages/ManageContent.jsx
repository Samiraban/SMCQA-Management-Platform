import {
  useEffect,
  useState,
} from "react";

import {
  useCollection,
} from "../../lib/useRealtime.js";

import {
  saveSiteContent,
} from "../../lib/api.js";

const EMPTY_CONTENT = {
  heroTitle: "",
  heroSubtitle: "",
  aboutText: "",
};

function ManageContent() {
  const content =
    useCollection("siteContent");

  const [form, setForm] =
    useState({
      ...EMPTY_CONTENT,
      ...content,
    });

  const [saved, setSaved] =
    useState(false);

  const [error, setError] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    setForm({
      ...EMPTY_CONTENT,
      ...content,
    });
  }, [content]);

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSaved(false);
    setSaving(true);

    try {
      await saveSiteContent(form);

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 2000);
    } catch (err) {
      console.error(
        "Save site content failed:",
        err
      );

      setError(
        err.message ||
          "Unable to save site content."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Site Content</h1>

          <p>
            Edit homepage and about page
            copy — changes are saved to the
            database.
          </p>
        </div>
      </div>

      {error && (
        <div
          className="form-error"
          style={{
            marginBottom: 18,
          }}
        >
          {error}
        </div>
      )}

      <form
        className="contact-form admin-content-form"
        onSubmit={handleSubmit}
      >
        <div>
          <label>
            Homepage hero title
          </label>

          <input
            value={form.heroTitle}
            onChange={(e) =>
              setForm({
                ...form,
                heroTitle:
                  e.target.value,
              })
            }
            disabled={saving}
          />
        </div>

        <div>
          <label>
            Homepage hero subtitle
          </label>

          <textarea
            value={form.heroSubtitle}
            onChange={(e) =>
              setForm({
                ...form,
                heroSubtitle:
                  e.target.value,
              })
            }
            disabled={saving}
          />
        </div>

        <div>
          <label>
            About page intro
          </label>

          <textarea
            value={form.aboutText}
            onChange={(e) =>
              setForm({
                ...form,
                aboutText:
                  e.target.value,
              })
            }
            disabled={saving}
          />
        </div>

        <button
          type="submit"
          className="btn btn-dark"
          style={{ maxWidth: 200 }}
          disabled={saving}
        >
          {saving
            ? "Saving..."
            : saved
            ? "Saved ✓"
            : "Save changes"}
        </button>
      </form>
    </div>
  );
}

export default ManageContent;