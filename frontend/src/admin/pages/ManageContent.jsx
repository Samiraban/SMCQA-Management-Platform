import { useState, useEffect } from "react";
import { useCollection } from "../../lib/useRealtime.js";
import { saveSiteContent } from "../../lib/api.js";

function ManageContent() {
  const content = useCollection("siteContent");
  const [form, setForm] = useState(content);
  const [saved, setSaved] = useState(false);

  useEffect(() => setForm(content), [content]);

  function handleSubmit(e) {
    e.preventDefault();
    saveSiteContent(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Site Content</h1>
          <p>Edit homepage and about page copy — changes go live instantly, no redeploy needed.</p>
        </div>
      </div>

      <form className="contact-form admin-content-form" onSubmit={handleSubmit}>
        <div>
          <label>Homepage hero title</label>
          <input
            value={form.heroTitle}
            onChange={(e) => setForm({ ...form, heroTitle: e.target.value })}
          />
        </div>
        <div>
          <label>Homepage hero subtitle</label>
          <textarea
            value={form.heroSubtitle}
            onChange={(e) => setForm({ ...form, heroSubtitle: e.target.value })}
          />
        </div>
        <div>
          <label>About page intro</label>
          <textarea
            value={form.aboutText}
            onChange={(e) => setForm({ ...form, aboutText: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-dark" style={{ maxWidth: 200 }}>
          {saved ? "Saved ✓" : "Save changes"}
        </button>
      </form>
    </div>
  );
}

export default ManageContent;
