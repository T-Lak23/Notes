import { useState } from "react";
import { useNoteStore } from "../store/useNoteStore";

const CreateNotePage = () => {
  const { createNote, isCreating } = useNoteStore();
  const [form, setForm] = useState({
    title: "",
    content: "",
    tags: "",
    isPinned: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      tags: form.tags.split(",").map((tag) => tag.trim()),
    };
    await createNote(payload);
    setForm({ title: "", content: "", tags: "", isPinned: false });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-card text-card-foreground rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Create New Note</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full p-3 border border-border rounded bg-input text-main-foreground"
          required
        />
        <textarea
          placeholder="Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          rows={6}
          className="w-full p-3 border border-border rounded bg-input text-main-foreground"
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
          className="w-full p-3 border border-border rounded bg-input text-main-foreground"
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.isPinned}
            onChange={(e) => setForm({ ...form, isPinned: e.target.checked })}
          />
          <span className="text-muted-foreground">Pin this note</span>
        </label>
        <button
          type="submit"
          disabled={isCreating}
          className="bg-primary text-primary-foreground px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          {isCreating ? "Creating..." : "Create Note"}
        </button>
      </form>
    </div>
  );
};
export default CreateNotePage;
