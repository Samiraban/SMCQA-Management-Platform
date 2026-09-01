import {
  useEffect,
  useState,
} from "react";

import { Upload } from "lucide-react";

import {
  useCollection,
} from "../../lib/useRealtime.js";

import {
  saveSiteContent,
} from "../../lib/api.js";

import { fileToImageDataUrl } from "../../lib/imageFile.js";

const EMPTY_CONTENT = {
  heroTitle: "",
  heroSubtitle: "",
  aboutText: "",
  servicesBackgroundImage: "",
  stats: {
    peopleRecruited: "",
    happyClients: "",
    industryExperts: "",
    globalLocations: "",
  },
};

function ManageContent() {
  const content =
    useCollection("siteContent");

  const [form, setForm] =
    useState({
      ...EMPTY_CONTENT,
      ...content,
      stats: {
        ...EMPTY_CONTENT.stats,
        ...(content?.stats || {}),
      },
    });

  const [saved, setSaved] =
    useState(false);

  const [error, setError] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  const [uploading, setUploading] =
    useState(false);

  useEffect(() => {
    setForm({
      ...EMPTY_CONTENT,
      ...content,
      stats: {
        ...EMPTY_CONTENT.stats,
        ...(content?.stats || {}),
      },
    });
  }, [content]);

  function updateStat(key, value) {
    setForm((current) => ({
      ...current,
      stats: {
        ...current.stats,
        [key]: value,
      },
    }));
  }

  async function handleBackgroundUpload(fileList) {
    const file = fileList?.[0];

    if (!file) {
      return;
    }

    setError("");
    setUploading(true);

    try {
      const dataUrl = await fileToImageDataUrl(file, {
        maxSize: 2000,
        quality: 0.82,
      });

      setForm((current) => ({
        ...current,
        servicesBackgroundImage: dataUrl,
      }));
    } catch (uploadError) {
      console.error("Background image upload failed:", uploadError);
      setError(uploadError.message || "Unable to use that image.");
    } finally {
      setUploading(false);
    }
  }

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
            Edit homepage copy and the "Experience you can build on" stats
            — changes save to the database and update the live site
            automatically within a few seconds.
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

        <div>
          <label>
            "Workforce solutions for growing industries" section
            background image
          </label>

          <div className="admin-image-field">
            <input
              type="text"
              placeholder="https://example.com/photo.jpg"
              value={form.servicesBackgroundImage || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  servicesBackgroundImage: e.target.value,
                })
              }
              disabled={saving}
            />

            <label
              className={`btn-upload${uploading ? " is-busy" : ""}`}
            >
              <Upload size={14} />
              {uploading ? "Uploading…" : "Upload"}
              <input
                type="file"
                accept="image/*"
                hidden
                disabled={saving || uploading}
                onChange={(e) => {
                  handleBackgroundUpload(e.target.files);
                  e.target.value = "";
                }}
              />
            </label>

            {form.servicesBackgroundImage ? (
              <img
                src={form.servicesBackgroundImage}
                alt="Preview"
                className="admin-image-preview"
              />
            ) : (
              <div className="admin-image-preview admin-image-preview-empty">
                No photo yet
              </div>
            )}
          </div>

          <small className="admin-field-hint">
            Shown behind the "OUR SERVICES" section on the homepage. Leave
            blank to keep it plain white.
          </small>

          {form.servicesBackgroundImage && (
            <button
              type="button"
              className="admin-inline-link"
              onClick={() =>
                setForm({ ...form, servicesBackgroundImage: "" })
              }
              disabled={saving}
            >
              Remove background image
            </button>
          )}
        </div>

        <h3 style={{ margin: "8px 0 0" }}>
          Homepage stats
        </h3>
        <p
          style={{
            margin: "-6px 0 4px",
            fontSize: 13,
            color: "var(--color-gray)",
          }}
        >
          Type the number exactly as it should appear, e.g. "20K+", "500+",
          "7+". This updates every matching number shown on the homepage.
        </p>

        <div>
          <label>People Recruited</label>
          <input
            value={form.stats.peopleRecruited}
            onChange={(e) =>
              updateStat("peopleRecruited", e.target.value)
            }
            placeholder="20K+"
            disabled={saving}
          />
        </div>

        <div>
          <label>Happy Clients</label>
          <input
            value={form.stats.happyClients}
            onChange={(e) =>
              updateStat("happyClients", e.target.value)
            }
            placeholder="20K+"
            disabled={saving}
          />
        </div>

        <div>
          <label>Industry Experts</label>
          <input
            value={form.stats.industryExperts}
            onChange={(e) =>
              updateStat("industryExperts", e.target.value)
            }
            placeholder="500+"
            disabled={saving}
          />
        </div>

        <div>
          <label>Global Locations</label>
          <input
            value={form.stats.globalLocations}
            onChange={(e) =>
              updateStat("globalLocations", e.target.value)
            }
            placeholder="7+"
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