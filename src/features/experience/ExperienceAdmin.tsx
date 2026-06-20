"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { iExperience } from "@/types";

type Exp = iExperience & { _id: string };

const EMPTY = {
  titleDescription: "",
  companyLogo: "",
  className: "job",
  startYear: "",
  endYear: "",
  isEnded: false,
  descriptionMore: "",
};

type FormState = typeof EMPTY;

export default function ExperienceAdmin({ experiences }: { experiences: Exp[] }) {
  const router = useRouter();
  const [secret, setSecret] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [addForm, setAddForm] = useState<FormState>({ ...EMPTY });
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<FormState>({ ...EMPTY });
  const [msg, setMsg] = useState("");

  function headers() {
    return { "Content-Type": "application/json", "x-admin-secret": secret };
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    const res = await fetch("/api/experience/add-experience", {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(addForm),
    });
    const d = await res.json();
    if (!res.ok) { setMsg(d.error ?? "Error"); return; }
    setMsg("Added successfully.");
    setAddForm({ ...EMPTY });
    router.refresh();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this experience?")) return;
    setMsg("");
    const res = await fetch(`/api/experience/${id}`, {
      method: "DELETE",
      headers: headers(),
    });
    if (!res.ok) { const d = await res.json(); setMsg(d.error ?? "Error"); return; }
    router.refresh();
  }

  function openEdit(item: Exp) {
    setEditId(item._id);
    setEditForm({
      titleDescription: item.titleDescription,
      companyLogo: item.companyLogo ?? "",
      className: item.className,
      startYear: new Date(item.startYear).toISOString().slice(0, 10),
      endYear: item.endYear ? new Date(item.endYear).toISOString().slice(0, 10) : "",
      isEnded: item.currentYear !== null,
      descriptionMore: item.descriptionMore,
    });
  }

  async function handleEdit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    const res = await fetch(`/api/experience/${editId}`, {
      method: "PATCH",
      headers: headers(),
      body: JSON.stringify(editForm),
    });
    const d = await res.json();
    if (!res.ok) { setMsg(d.error ?? "Error"); return; }
    setMsg("Updated successfully.");
    setEditId(null);
    router.refresh();
  }

  if (!unlocked) {
    return (
      <div className="exp-admin">
        <h1 className="experience-title">Admin — Experience</h1>
        <div className="exp-admin-unlock">
          <input
            type="password"
            placeholder="Admin secret"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && secret && setUnlocked(true)}
            className="exp-admin-input"
          />
          <button className="exp-admin-btn" onClick={() => secret && setUnlocked(true)}>
            Unlock
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="exp-admin">
      <h1 className="experience-title">Admin — Experience</h1>
      {msg && <p className="exp-admin-msg">{msg}</p>}

      <section className="exp-admin-section">
        <h2 className="exp-admin-subtitle">Add experience</h2>
        <ExperienceForm form={addForm} onChange={setAddForm} onSubmit={handleAdd} submitLabel="Add" />
      </section>

      <section className="exp-admin-section">
        <h2 className="exp-admin-subtitle">All experiences ({experiences.length})</h2>
        {experiences.length === 0 && (
          <p className="exp-admin-empty">No experiences yet.</p>
        )}
        <ul className="exp-admin-list">
          {experiences.map((item) => (
            <li key={item._id} className="exp-admin-item">
              <div className="exp-admin-item-header">
                <span className="exp-admin-item-title">{item.titleDescription}</span>
                <span className="exp-admin-item-dates">
                  {new Date(item.startYear).getFullYear()} –{" "}
                  {item.currentYear !== null
                    ? "present"
                    : new Date(item.endYear!).getFullYear()}
                </span>
                <div className="exp-admin-actions">
                  <button
                    className="exp-admin-btn exp-admin-btn--sm"
                    onClick={() => (editId === item._id ? setEditId(null) : openEdit(item))}
                  >
                    {editId === item._id ? "Cancel" : "Edit"}
                  </button>
                  <button
                    className="exp-admin-btn exp-admin-btn--sm exp-admin-btn--danger"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              {editId === item._id && (
                <div className="exp-admin-edit-form">
                  <ExperienceForm
                    form={editForm}
                    onChange={setEditForm}
                    onSubmit={handleEdit}
                    submitLabel="Save"
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function ExperienceForm({
  form,
  onChange,
  onSubmit,
  submitLabel,
}: {
  form: FormState;
  onChange: (f: FormState) => void;
  onSubmit: (e: React.FormEvent) => void;
  submitLabel: string;
}) {
  function set(key: keyof FormState, value: string | boolean) {
    onChange({ ...form, [key]: value });
  }

  return (
    <form className="exp-admin-form" onSubmit={onSubmit}>
      <div className="exp-admin-row">
        <label className="exp-admin-label">Title</label>
        <input
          className="exp-admin-input"
          value={form.titleDescription}
          onChange={(e) => set("titleDescription", e.target.value)}
          placeholder="Software Engineer @ Acme"
          required
        />
      </div>
      <div className="exp-admin-row">
        <label className="exp-admin-label">Logo URL (optional)</label>
        <input
          className="exp-admin-input"
          value={form.companyLogo}
          onChange={(e) => set("companyLogo", e.target.value)}
          placeholder="https://..."
        />
      </div>
      <div className="exp-admin-row">
        <label className="exp-admin-label">Type</label>
        <select
          className="exp-admin-input"
          value={form.className}
          onChange={(e) => set("className", e.target.value)}
        >
          <option value="job">Job</option>
          <option value="school">School</option>
          <option value="internship">Internship</option>
          <option value="google">Google</option>
          <option value="amazon">Amazon</option>
          <option value="facebook">Facebook</option>
        </select>
      </div>
      <div className="exp-admin-row">
        <label className="exp-admin-label">Start date</label>
        <input
          type="date"
          className="exp-admin-input"
          value={form.startYear}
          onChange={(e) => set("startYear", e.target.value)}
          required
        />
      </div>
      <div className="exp-admin-row">
        <label className="exp-admin-label exp-admin-label--inline">
          <input
            type="checkbox"
            checked={form.isEnded}
            onChange={(e) => set("isEnded", e.target.checked)}
          />
          Currently working here
        </label>
      </div>
      {!form.isEnded && (
        <div className="exp-admin-row">
          <label className="exp-admin-label">End date</label>
          <input
            type="date"
            className="exp-admin-input"
            value={form.endYear}
            onChange={(e) => set("endYear", e.target.value)}
          />
        </div>
      )}
      <div className="exp-admin-row">
        <label className="exp-admin-label">Description (one bullet per line)</label>
        <textarea
          className="exp-admin-input exp-admin-textarea"
          value={form.descriptionMore}
          onChange={(e) => set("descriptionMore", e.target.value)}
          rows={5}
          required
        />
      </div>
      <button type="submit" className="exp-admin-btn">
        {submitLabel}
      </button>
    </form>
  );
}
