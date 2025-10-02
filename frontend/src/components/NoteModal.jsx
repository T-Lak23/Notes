const NoteModal = ({ note, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center p-4 justify-center z-50">
      <div className="bg-card p-6 rounded-lg w-full max-w-lg relative ">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-muted-foreground"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold text-card-foreground">{note.title}</h2>
        <p className="mt-4 text-main-foreground whitespace-pre-wrap">
          {note.content}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {note.tags.map((tag) => (
            <span
              key={tag}
              className="bg-muted text-muted-foreground px-2 py-1 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
