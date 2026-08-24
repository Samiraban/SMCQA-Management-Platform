import { useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { useCollection } from "../lib/useRealtime.js";

/**
 * A generic, reusable admin table with add/edit/delete — every "Manage X"
 * page in /admin is a thin wrapper around this component. Data updates
 * everywhere on the site the instant you save here (see lib/store.js).
 */
function ResourceManager({
  title,
  description,
  collection,
  fields,
  onCreate,
  onUpdate,
  onDelete,
  columns, // optional: which field keys to show as table columns (defaults to all)
}) {
  const items = useCollection(collection);
  const [editing, setEditing] = useState(null); // null = closed, {} = new, {...} = edit
  const displayCols = columns || fields.map((f) => f.key);

  function openNew() {
    const blank = {};
    fields.forEach((f) => (blank[f.key] = f.default ?? ""));
    setEditing(blank);
  }

  function openEdit(item) {
    setEditing(item);
  }

  function handleSave(e) {
    e.preventDefault();
    if (editing.id) {
      onUpdate(editing.id, editing);
    } else {
      onCreate(editing);
    }
    setEditing(null);
  }

  function handleDelete(id) {
    if (confirm("Delete this item? This can't be undone.")) {
      onDelete(id);
    }
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>{title}</h1>
          {description && <p>{description}</p>}
        </div>
        <button className="btn btn-dark" onClick={openNew}>
          <Plus size={16} /> Add New
        </button>
      </div>

      <div className="admin-table-wrap">
        {items.length === 0 ? (
          <div className="empty-state">No records yet — add your first one.</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                {displayCols.map((key) => (
                  <th key={key}>{fields.find((f) => f.key === key)?.label || key}</th>
                ))}
                <th className="admin-table-actions-col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  {displayCols.map((key) => (
                    <td key={key}>{String(item[key] ?? "").slice(0, 80)}</td>
                  ))}
                  <td className="admin-table-actions">
                    <button onClick={() => openEdit(item)} aria-label="Edit">
                      <Pencil size={15} />
                    </button>
                    <button onClick={() => handleDelete(item.id)} aria-label="Delete" className="danger">
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {editing && (
        <div className="modal-overlay" onClick={() => setEditing(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setEditing(null)} aria-label="Close">
              <X size={18} />
            </button>
            <h3>{editing.id ? "Edit" : "Add"} {title.replace(/^Manage /, "").replace(/s$/, "")}</h3>
            <form className="contact-form" onSubmit={handleSave}>
              {fields.map((f) => (
                <div key={f.key}>
                  <label>{f.label}</label>
                  {f.type === "textarea" ? (
                    <textarea
                      value={editing[f.key] ?? ""}
                      onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value })}
                      required={f.required}
                    />
                  ) : f.type === "select" ? (
                    <select
                      value={editing[f.key] ?? ""}
                      onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value })}
                    >
                      {f.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={f.type || "text"}
                      value={editing[f.key] ?? ""}
                      onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value })}
                      required={f.required}
                    />
                  )}
                </div>
              ))}
              <button type="submit" className="btn btn-dark">
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResourceManager;
