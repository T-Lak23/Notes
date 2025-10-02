import { Pencil, Trash2 } from "lucide-react";
import { useNoteStore } from "../store/useNoteStore";
import { useNavigate } from "react-router-dom";

const NoteCard = ({ note, selectedIds, setSelectedIds, onOpen }) => {
  const { deleteNote, getAllNotes } = useNoteStore();
  const isSelected = selectedIds.includes(note._id);

  const toggleSelect = () => {
    setSelectedIds((prev) =>
      isSelected ? prev.filter((id) => id !== note._id) : [...prev, note._id]
    );
  };
  const navigate = useNavigate();
  const handleDelete = async () => {
    await deleteNote(note._id);
    getAllNotes();
  };

  const handleEdit = () => {
    navigate(`/notes/note/${note._id}`);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 shadow-md relative hover:shadow-lg transition">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={toggleSelect}
        className="absolute bottom-3 left-3 accent-primary"
      />
      <div onClick={onOpen} className="cursor-pointer">
        <h2 className="text-lg font-semibold text-card-foreground truncate">
          {note.title}
        </h2>
        <p className="text-muted-foreground text-sm mt-2 line-clamp-3">
          {note.content}
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          {note.tags.map((tag) => (
            <span
              key={tag}
              className="bg-sidebar-primary text-sidebar-primary-foreground px-2 py-1 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="flex gap-2 mt-4 justify-end">
        <button
          onClick={handleEdit}
          className="text-muted-foreground hover:text-primary transition"
        >
          <Pencil size={18} />
        </button>
        <button
          onClick={handleDelete}
          className="text-muted-foreground hover:text-red-500 transition"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
