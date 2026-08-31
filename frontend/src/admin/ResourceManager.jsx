import { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Reply,
} from "lucide-react";

import { useCollection } from "../lib/useRealtime.js";
import ReplyModal from "./ReplyModal.jsx";

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
  const items = useCollection(
    collection
  );

  const [editing, setEditing] =
    useState(null);

  const [replyingTo, setReplyingTo] =
    useState(null);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const displayCols =
    columns ||
    fields.map((field) => field.key);

  function openNew() {
    const blank = {};

    fields.forEach((field) => {
      blank[field.key] =
        field.default ?? "";
    });

    setError("");
    setEditing(blank);
  }

  function openEdit(item) {
    setError("");

    setEditing({
      ...item,
    });
  }

  async function handleSave(e) {
    e.preventDefault();

    setError("");
    setSaving(true);

    try {
      if (editing.id) {
        await onUpdate(
          editing.id,
          editing
        );
      } else {
        await onCreate(editing);
      }

      setEditing(null);
    } catch (error) {
      console.error(
        "Admin save failed:",
        error
      );

      setError(
        error.message ||
          "Unable to save this record."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Delete this item? This can't be undone."
    );

    if (!confirmed) {
      return;
    }

    try {
      await onDelete(id);
    } catch (error) {
      console.error(
        "Admin delete failed:",
        error
      );

      window.alert(
        error.message ||
          "Unable to delete this record."
      );
    }
  }

  function updateField(
    key,
    value
  ) {
    setEditing((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function getLabel(key) {
    return (
      fields.find(
        (field) => field.key === key
      )?.label || key
    );
  }

  function formatValue(value) {
    if (
      value === null ||
      value === undefined
    ) {
      return "";
    }

    if (
      typeof value === "object"
    ) {
      return JSON.stringify(value);
    }

    return String(value).slice(0, 80);
  }

  function getFieldType(key) {
    return fields.find(
      (field) => field.key === key
    )?.type;
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>{title}</h1>

          {description && (
            <p>{description}</p>
          )}
        </div>

        <button
          type="button"
          className="btn btn-dark"
          onClick={openNew}
          disabled={saving}
        >
          <Plus size={16} />
          Add New
        </button>
      </div>

      <div className="admin-table-wrap">
        {items.length === 0 ? (
          <div className="empty-state">
            No records yet — add your
            first one.
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                {displayCols.map(
                  (key) => (
                    <th key={key}>
                      {getLabel(key)}
                    </th>
                  )
                )}

                <th className="admin-table-actions-col">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  {displayCols.map(
                    (key) =>
                      getFieldType(key) ===
                      "image" ? (
                        <td key={key}>
                          {item[key] ? (
                            <img
                              src={item[key]}
                              alt=""
                              className="admin-table-thumb"
                            />
                          ) : (
                            <span className="admin-table-thumb admin-table-thumb-empty" />
                          )}
                        </td>
                      ) : (
                        <td key={key}>
                          {formatValue(
                            item[key]
                          )}
                        </td>
                      )
                  )}

                  <td className="admin-table-actions">
                    {enableReply && (
                      <button
                        type="button"
                        onClick={() =>
                          setReplyingTo(item)
                        }
                        aria-label="Reply"
                        title="Reply by email or WhatsApp"
                        disabled={saving}
                      >
                        <Reply size={15} />
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        openEdit(item)
                      }
                      aria-label="Edit"
                      disabled={saving}
                    >
                      <Pencil size={15} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(
                          item.id
                        )
                      }
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
            if (!saving) {
              setEditing(null);
            }
          }}
        >
          <div
            className="modal-card"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <button
              type="button"
              className="modal-close"
              onClick={() =>
                !saving &&
                setEditing(null)
              }
              aria-label="Close"
              disabled={saving}
            >
              <X size={18} />
            </button>

            <h3>
              {editing.id
                ? "Edit"
                : "Add"}{" "}
              {title
                .replace(
                  /^Manage /,
                  ""
                )
                .replace(/s$/, "")}
            </h3>

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
              className="contact-form"
              onSubmit={handleSave}
            >
              {fields.map((field) => (
                <div key={field.key}>
                  <label>
                    {field.label}
                  </label>

                  {field.type ===
                  "textarea" ? (
                    <textarea
                      value={
                        editing[
                          field.key
                        ] ?? ""
                      }
                      onChange={(e) =>
                        updateField(
                          field.key,
                          e.target.value
                        )
                      }
                      required={
                        field.required
                      }
                      disabled={saving}
                    />
                  ) : field.type ===
                    "select" ? (
                    <select
                      value={
                        editing[
                          field.key
                        ] ?? ""
                      }
                      onChange={(e) =>
                        updateField(
                          field.key,
                          e.target.value
                        )
                      }
                      required={
                        field.required
                      }
                      disabled={saving}
                    >
                      {(
                        field.options ||
                        []
                      ).map((option) => (
                        <option
                          key={option}
                          value={option}
                        >
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : field.type ===
                    "image" ? (
                    <div className="admin-image-field">
                      <input
                        type="text"
                        placeholder="https://example.com/photo.jpg"
                        value={
                          editing[
                            field.key
                          ] ?? ""
                        }
                        onChange={(e) =>
                          updateField(
                            field.key,
                            e.target.value
                          )
                        }
                        required={
                          field.required
                        }
                        disabled={saving}
                      />

                      {editing[
                        field.key
                      ] ? (
                        <img
                          src={
                            editing[
                              field.key
                            ]
                          }
                          alt="Preview"
                          className="admin-image-preview"
                        />
                      ) : (
                        <div className="admin-image-preview admin-image-preview-empty">
                          No photo yet
                        </div>
                      )}
                    </div>
                  ) : field.type ===
                    "text-suggest" ? (
                    <>
                      <input
                        type="text"
                        list={`${field.key}-options`}
                        placeholder={
                          field.placeholder
                        }
                        value={
                          editing[
                            field.key
                          ] ?? ""
                        }
                        onChange={(e) =>
                          updateField(
                            field.key,
                            e.target.value
                          )
                        }
                        required={
                          field.required
                        }
                        disabled={saving}
                      />
                      <datalist
                        id={`${field.key}-options`}
                      >
                        {(
                          field.options ||
                          []
                        ).map((option) => (
                          <option
                            key={option}
                            value={option}
                          />
                        ))}
                      </datalist>
                      {field.helpText && (
                        <small className="admin-field-hint">
                          {field.helpText}
                        </small>
                      )}
                    </>
                  ) : (
                    <input
                      type={
                        field.type ||
                        "text"
                      }
                      value={
                        editing[
                          field.key
                        ] ?? ""
                      }
                      onChange={(e) =>
                        updateField(
                          field.key,
                          e.target.value
                        )
                      }
                      required={
                        field.required
                      }
                      disabled={saving}
                    />
                  )}
                </div>
              ))}

              <button
                type="submit"
                className="btn btn-dark"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : editing.id
                  ? "Update"
                  : "Save"}
              </button>
            </form>
          </div>
        </div>
      )}

      {replyingTo && (
        <ReplyModal
          item={replyingTo}
          onClose={() => setReplyingTo(null)}
        />
      )}
    </div>
  );
}

export default ResourceManager;