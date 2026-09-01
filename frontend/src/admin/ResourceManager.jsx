import { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Reply,
  Upload,
  ImagePlus,
} from "lucide-react";

import { useCollection } from "../lib/useRealtime.js";
import ReplyModal from "./ReplyModal.jsx";
import {
  fileToImageDataUrl,
  isImageSource,
} from "../lib/imageFile.js";

function ResourceManager({
  title,
  description,
  collection,
  fields,
  onCreate,
  onUpdate,
  onDelete,
  columns,
  enableReply = false,
}) {
  const items = useCollection(collection);

  const [editing, setEditing] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [uploadingKey, setUploadingKey] = useState("");

  const displayCols = columns || fields.map((field) => field.key);

  function openNew() {
    const blank = {};

    fields.forEach((field) => {
      blank[field.key] =
        field.default ??
        (field.type === "gallery" || field.type === "repeater" ? [] : "");
    });

    setError("");
    setEditing(blank);
  }

  function openEdit(item) {
    setError("");
    setEditing({ ...item });
  }

  async function handleSave(e) {
    e.preventDefault();

    setError("");
    setSaving(true);

    try {
      if (editing.id) {
        await onUpdate(editing.id, editing);
      } else {
        await onCreate(editing);
      }

      setEditing(null);
    } catch (error) {
      console.error("Admin save failed:", error);
      setError(error.message || "Unable to save this record.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm("Delete this item? This can't be undone.");

    if (!confirmed) {
      return;
    }

    try {
      await onDelete(id);
    } catch (error) {
      console.error("Admin delete failed:", error);
      window.alert(error.message || "Unable to delete this record.");
    }
  }

  function updateField(key, value) {
    setEditing((current) => ({ ...current, [key]: value }));
  }

  /* ---------------------------------------------------------
     FILE UPLOAD (single-value fields: "image" / "icon")
     Reads the picked file, compresses it in the browser, and
     stores it as a data URL directly on the field — no file
     server needed, so it works the same locally and on Render.
     --------------------------------------------------------- */
  async function handleFileUpload(field, fileList) {
    const file = fileList?.[0];

    if (!file) {
      return;
    }

    setError("");
    setUploadingKey(field.key);

    try {
      const dataUrl = await fileToImageDataUrl(file, {
        maxSize: field.type === "icon" ? 300 : 1600,
        forcePng: field.type === "icon",
      });

      updateField(field.key, dataUrl);
    } catch (uploadError) {
      console.error("Image upload failed:", uploadError);
      setError(uploadError.message || "Unable to use that image.");
    } finally {
      setUploadingKey("");
    }
  }

  /* ---------------------------------------------------------
     GALLERY FIELD (array of image strings)
     --------------------------------------------------------- */
  async function handleGalleryUpload(field, fileList) {
    const files = Array.from(fileList || []);

    if (files.length === 0) {
      return;
    }

    setError("");
    setUploadingKey(field.key);

    try {
      const dataUrls = await Promise.all(
        files.map((file) => fileToImageDataUrl(file, { maxSize: 1600 }))
      );

      const current = editing[field.key] || [];

      updateField(field.key, [...current, ...dataUrls]);
    } catch (uploadError) {
      console.error("Gallery upload failed:", uploadError);
      setError(uploadError.message || "Unable to use one of those images.");
    } finally {
      setUploadingKey("");
    }
  }

  function removeGalleryImage(field, index) {
    const current = editing[field.key] || [];
    updateField(field.key, current.filter((_, i) => i !== index));
  }

  /* ---------------------------------------------------------
     REPEATER FIELD (array of small objects, e.g. sub-categories)
     --------------------------------------------------------- */
  function addRepeaterRow(field) {
    const blank = {};

    (field.itemFields || []).forEach((itemField) => {
      blank[itemField.key] = "";
    });

    const current = editing[field.key] || [];
    updateField(field.key, [...current, blank]);
  }

  function updateRepeaterRow(field, index, itemKey, value) {
    const current = editing[field.key] || [];

    updateField(
      field.key,
      current.map((row, i) => (i === index ? { ...row, [itemKey]: value } : row))
    );
  }

  function removeRepeaterRow(field, index) {
    const current = editing[field.key] || [];
    updateField(field.key, current.filter((_, i) => i !== index));
  }

  function getLabel(key) {
    return fields.find((field) => field.key === key)?.label || key;
  }

  function formatValue(value) {
    if (value === null || value === undefined) {
      return "";
    }

    if (Array.isArray(value)) {
      return value.length
        ? `${value.length} item${value.length === 1 ? "" : "s"}`
        : "—";
    }

    if (typeof value === "object") {
      return JSON.stringify(value);
    }

    return String(value).slice(0, 80);
  }

  function getFieldType(key) {
    return fields.find((field) => field.key === key)?.type;
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>{title}</h1>
          {description && <p>{description}</p>}
        </div>

        <button type="button" className="btn btn-dark" onClick={openNew} disabled={saving}>
          <Plus size={16} />
          Add New
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
                  <th key={key}>{getLabel(key)}</th>
                ))}
                <th className="admin-table-actions-col">Actions</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  {displayCols.map((key) => {
                    const fieldType = getFieldType(key);

                    if (
                      fieldType === "image" ||
                      (fieldType === "icon" && isImageSource(item[key]))
                    ) {
                      return (
                        <td key={key}>
                          {item[key] ? (
                            <img src={item[key]} alt="" className="admin-table-thumb" />
                          ) : (
                            <span className="admin-table-thumb admin-table-thumb-empty" />
                          )}
                        </td>
                      );
                    }

                    return <td key={key}>{formatValue(item[key])}</td>;
                  })}

                  <td className="admin-table-actions">
                    {enableReply && (
                      <button
                        type="button"
                        onClick={() => setReplyingTo(item)}
                        aria-label="Reply"
                        title="Reply by email or WhatsApp"
                        disabled={saving}
                      >
                        <Reply size={15} />
                      </button>
                    )}

                    <button type="button" onClick={() => openEdit(item)} aria-label="Edit" disabled={saving}>
                      <Pencil size={15} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      aria-label="Delete"
                      className="danger"
                      disabled={saving}
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

      {editing && (
        <div
          className="modal-overlay"
          onClick={() => {
            if (!saving) setEditing(null);
          }}
        >
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close"
              onClick={() => !saving && setEditing(null)}
              aria-label="Close"
              disabled={saving}
            >
              <X size={18} />
            </button>

            <h3>
              {editing.id ? "Edit" : "Add"} {title.replace(/^Manage /, "").replace(/s$/, "")}
            </h3>

            {error && (
              <div className="form-error" style={{ marginBottom: 18 }}>
                {error}
              </div>
            )}

            <form className="contact-form" onSubmit={handleSave}>
              {fields.map((field) => (
                <div key={field.key}>
                  <label>{field.label}</label>

                  {field.type === "textarea" ? (
                    <textarea
                      value={editing[field.key] ?? ""}
                      onChange={(e) => updateField(field.key, e.target.value)}
                      required={field.required}
                      disabled={saving}
                    />
                  ) : field.type === "select" ? (
                    <select
                      value={editing[field.key] ?? ""}
                      onChange={(e) => updateField(field.key, e.target.value)}
                      required={field.required}
                      disabled={saving}
                    >
                      {(field.options || []).map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : field.type === "image" ? (
                    <div className="admin-image-field">
                      <input
                        type="text"
                        placeholder="https://example.com/photo.jpg"
                        value={editing[field.key] ?? ""}
                        onChange={(e) => updateField(field.key, e.target.value)}
                        required={field.required}
                        disabled={saving}
                      />

                      <label className={`btn-upload${uploadingKey === field.key ? " is-busy" : ""}`}>
                        <Upload size={14} />
                        {uploadingKey === field.key ? "Uploading…" : "Upload"}
                        <input
                          type="file"
                          accept="image/*"
                          hidden
                          disabled={saving || !!uploadingKey}
                          onChange={(e) => {
                            handleFileUpload(field, e.target.files);
                            e.target.value = "";
                          }}
                        />
                      </label>

                      {editing[field.key] ? (
                        <img src={editing[field.key]} alt="Preview" className="admin-image-preview" />
                      ) : (
                        <div className="admin-image-preview admin-image-preview-empty">No photo yet</div>
                      )}
                    </div>
                  ) : field.type === "icon" ? (
                    <>
                      <div className="admin-image-field">
                        <input
                          type="text"
                          list={`${field.key}-options`}
                          placeholder={field.placeholder || "e.g. Building2"}
                          value={isImageSource(editing[field.key]) ? "" : editing[field.key] ?? ""}
                          onChange={(e) => updateField(field.key, e.target.value)}
                          disabled={saving || isImageSource(editing[field.key])}
                        />

                        <datalist id={`${field.key}-options`}>
                          {(field.options || []).map((option) => (
                            <option key={option} value={option} />
                          ))}
                        </datalist>

                        <label className={`btn-upload${uploadingKey === field.key ? " is-busy" : ""}`}>
                          <ImagePlus size={14} />
                          {uploadingKey === field.key ? "Uploading…" : "Upload icon"}
                          <input
                            type="file"
                            accept="image/*"
                            hidden
                            disabled={saving || !!uploadingKey}
                            onChange={(e) => {
                              handleFileUpload(field, e.target.files);
                              e.target.value = "";
                            }}
                          />
                        </label>

                        {isImageSource(editing[field.key]) ? (
                          <img
                            src={editing[field.key]}
                            alt="Icon preview"
                            className="admin-image-preview admin-icon-preview"
                          />
                        ) : (
                          <div className="admin-image-preview admin-image-preview-empty">No icon</div>
                        )}
                      </div>

                      {isImageSource(editing[field.key]) && (
                        <button
                          type="button"
                          className="admin-inline-link"
                          onClick={() => updateField(field.key, "")}
                          disabled={saving}
                        >
                          Remove uploaded icon & pick a preset instead
                        </button>
                      )}

                      {field.helpText && <small className="admin-field-hint">{field.helpText}</small>}
                    </>
                  ) : field.type === "gallery" ? (
                    <div className="admin-gallery-field">
                      {(editing[field.key] || []).length > 0 && (
                        <div className="admin-gallery-grid">
                          {editing[field.key].map((image, index) => (
                            <div className="admin-gallery-thumb" key={`${field.key}-${index}`}>
                              <img src={image} alt="" />

                              <button
                                type="button"
                                aria-label="Remove photo"
                                onClick={() => removeGalleryImage(field, index)}
                                disabled={saving}
                              >
                                <X size={13} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      <label className={`btn-upload${uploadingKey === field.key ? " is-busy" : ""}`}>
                        <ImagePlus size={14} />
                        {uploadingKey === field.key ? "Uploading…" : "Add photos"}
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          hidden
                          disabled={saving || !!uploadingKey}
                          onChange={(e) => {
                            handleGalleryUpload(field, e.target.files);
                            e.target.value = "";
                          }}
                        />
                      </label>

                      {field.helpText && <small className="admin-field-hint">{field.helpText}</small>}
                    </div>
                  ) : field.type === "repeater" ? (
                    <div className="admin-repeater-field">
                      {(editing[field.key] || []).map((row, index) => (
                        <div className="admin-repeater-row" key={`${field.key}-${index}`}>
                          <div className="admin-repeater-row-fields">
                            {(field.itemFields || []).map((itemField) =>
                              itemField.type === "textarea" ? (
                                <textarea
                                  key={itemField.key}
                                  placeholder={itemField.label}
                                  value={row[itemField.key] ?? ""}
                                  onChange={(e) =>
                                    updateRepeaterRow(field, index, itemField.key, e.target.value)
                                  }
                                  disabled={saving}
                                />
                              ) : (
                                <input
                                  key={itemField.key}
                                  type="text"
                                  placeholder={itemField.label}
                                  value={row[itemField.key] ?? ""}
                                  onChange={(e) =>
                                    updateRepeaterRow(field, index, itemField.key, e.target.value)
                                  }
                                  disabled={saving}
                                />
                              )
                            )}
                          </div>

                          <button
                            type="button"
                            className="admin-repeater-remove"
                            aria-label="Remove"
                            onClick={() => removeRepeaterRow(field, index)}
                            disabled={saving}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}

                      <button
                        type="button"
                        className="btn-upload"
                        onClick={() => addRepeaterRow(field)}
                        disabled={saving}
                      >
                        <Plus size={14} />
                        {field.addLabel || "Add"}
                      </button>

                      {field.helpText && <small className="admin-field-hint">{field.helpText}</small>}
                    </div>
                  ) : field.type === "text-suggest" ? (
                    <>
                      <input
                        type="text"
                        list={`${field.key}-options`}
                        placeholder={field.placeholder}
                        value={editing[field.key] ?? ""}
                        onChange={(e) => updateField(field.key, e.target.value)}
                        required={field.required}
                        disabled={saving}
                      />
                      <datalist id={`${field.key}-options`}>
                        {(field.options || []).map((option) => (
                          <option key={option} value={option} />
                        ))}
                      </datalist>
                      {field.helpText && <small className="admin-field-hint">{field.helpText}</small>}
                    </>
                  ) : (
                    <>
                      <input
                        type={field.type || "text"}
                        placeholder={field.placeholder}
                        value={editing[field.key] ?? ""}
                        onChange={(e) => updateField(field.key, e.target.value)}
                        required={field.required}
                        disabled={saving}
                      />
                      {field.helpText && <small className="admin-field-hint">{field.helpText}</small>}
                    </>
                  )}
                </div>
              ))}

              <button type="submit" className="btn btn-dark" disabled={saving || !!uploadingKey}>
                {saving ? "Saving..." : editing.id ? "Update" : "Save"}
              </button>
            </form>
          </div>
        </div>
      )}

      {replyingTo && <ReplyModal item={replyingTo} onClose={() => setReplyingTo(null)} />}
    </div>
  );
}

export default ResourceManager;