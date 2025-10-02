import { useEffect, useState } from "react";
import { useNoteStore } from "../store/useNoteStore";
import NoteCard from "../components/NoteCard";
import NoteModal from "../components/NoteModal";
import ButtonAuth from "../components/ButtonAuth";

const Notes = () => {
  const {
    getAllNotes,
    notes,
    isFetchingAll,
    deleteSelectedNotes,
    isDeletingSelected,
    hasMore,
  } = useNoteStore();

  const [search, setSearch] = useState("");
  const [activeTags, setActiveTags] = useState([]);
  const [sortBy, setSortBy] = useState("latest");
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);
  const [activeNote, setActiveNote] = useState(null);

  useEffect(() => {
    const more = getAllNotes({ search, tags: activeTags, sort: sortBy, page });
    console.log(more);
  }, [search, activeTags, sortBy, page, getAllNotes]);

  const toggleTag = (tag) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
    setPage(1);
  };

  const handleDeleteSelected = async () => {
    await deleteSelectedNotes(selectedIds);
    setSelectedIds([]);
    getAllNotes({ search, tags: activeTags, sort: sortBy, page });
  };

  const allTags = [...new Set(notes.flatMap((note) => note.tags))];

  return (
    <div className="p-4 md:p-6 bg-main min-h-screen">
      <div className="flex flex-col md:flex-row gap-3 justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-input border border-border px-4 py-2 rounded-lg w-full md:w-1/2"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-input border border-border px-4 py-2 rounded-lg"
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      <div className="flex flex-wrap items-center  md:justify-start justify-center gap-2 mb-4">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`px-3 py-1 rounded-full  text-sm border ${
              activeTags.includes(tag)
                ? "bg-primary text-white border-primary"
                : "bg-muted text-muted-foreground border-border"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {selectedIds.length > 0 && (
        <button
          className="px-3 py-2 rounded-lg bg-primary text-primary-foreground my-5 cursor-pointer"
          disabled={isDeletingSelected}
          onClick={handleDeleteSelected}
        >
          Delete Selected
        </button>
      )}

      {isFetchingAll ? (
        <div className="text-center py-6">Loading...</div>
      ) : notes.length === 0 ? (
        <div className="text-center py-6 text-muted-foreground">
          No notes found
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              selectedIds={selectedIds}
              setSelectedIds={setSelectedIds}
              onOpen={() => setActiveNote(note)}
            />
          ))}
        </div>
      )}

      {hasMore && (
        <div className="flex justify-center mt-6">
          {" "}
          <ButtonAuth onClick={() => setPage((prev) => prev + 1)}>
            Load More
          </ButtonAuth>
        </div>
      )}

      {activeNote && (
        <NoteModal note={activeNote} onClose={() => setActiveNote(null)} />
      )}
    </div>
  );
};

export default Notes;
