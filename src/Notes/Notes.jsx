import { useState, useEffect, useRef } from "react";
import "./Notes.css";

function Notes() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const [selectedNote, setSelectedNote] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const popupRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleSaveNote = () => {
    if (!title.trim() && !text.trim()) return;

    if (editingNote) {
      setNotes((n) =>
        n.map((note) =>
          note.id === editingNote.id
            ? { ...note, title: title.trim(), text: text }
            : note
        )
      );
      setEditingNote(null);
      setSelectedNote(null);
    } else {
      const newNote = {
        id: Date.now(),
        title: title.trim() || "Untitled",
        text: text,
        createdAt: new Date().toISOString(),
      };
      setNotes((n) => [newNote, ...n]);
    }

    setTitle("");
    setText("");
    setShowForm(false);
  };

  const handleDeleteNote = (id) => {
    setNotes((n) => n.filter((note) => note.id !== id));
    if (selectedNote?.id === id) setSelectedNote(null);
  };

  const handleEditNote = () => {
    setEditingNote(selectedNote);
    setTitle(selectedNote.title);
    setText(selectedNote.text);
    setSelectedNote(null);
    setShowForm(true);
  };

  const getPreviewText = (text) =>
    text.length <= 110 ? text : text.slice(0, 110) + "…";

  return (
    <div className="notes-container">
      <div className="notes-header-row">
        <h1 className="notes-header">Notes</h1>
        <button
          className="notes-add-toggle-btn"
          onClick={() => {
            setEditingNote(null);
            setTitle("");
            setText("");
            setShowForm(true);
          }}
        >
          Add a Note
        </button>
      </div>

      <div className="notes-line"></div>

      {showForm && (
        <div
          className="note-full-overlay"
          onMouseDown={(e) => {
            if (popupRef.current && !popupRef.current.contains(e.target)) {
              setShowForm(false);
              setEditingNote(null);
            }
          }}
        >
          <div
            className="note-full-card add-note-card"
            ref={popupRef}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="note-full-header">
              <h2>{editingNote ? "Edit Note" : "Add a Note"}</h2>
              <button
                className="note-full-close-btn"
                onClick={() => {
                  setShowForm(false);
                  setEditingNote(null);
                }}
              >
                ✖
              </button>
            </div>

            <div className="note-full-body">
              <input
                type="text"
                className="notes-title-input"
                placeholder="Note title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <textarea
                className="notes-textarea"
                placeholder="Write your note..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={6}
              />

              <button className="notes-add-btn" onClick={handleSaveNote}>
                {editingNote ? "Save Changes" : "Add Note"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="notes-grid">
        {notes.length === 0 ? (
          <p className="notes-empty">No notes yet.</p>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="note-card"
              onClick={() => setSelectedNote(note)}
            >
              <div className="note-card-header">
                <h3 className="note-card-title">{note.title}</h3>
                <button
                  className="note-delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteNote(note.id);
                  }}
                >
                  ❌
                </button>
              </div>
              <p className="note-card-preview">{getPreviewText(note.text)}</p>
            </div>
          ))
        )}
      </div>

      {selectedNote && (
        <div
          className="note-full-overlay"
          onMouseDown={(e) => {
            if (popupRef.current && !popupRef.current.contains(e.target)) {
              setSelectedNote(null);
            }
          }}
        >
          <div
            className="note-full-card"
            ref={popupRef}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="note-full-header">
              <h2>{selectedNote.title}</h2>

              <div>
                <button
                  className="note-edit-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditNote();
                  }}
                >
                  ✏️
                </button>

                <button
                  className="note-full-close-btn"
                  onClick={() => setSelectedNote(null)}
                >
                  ✖
                </button>
              </div>
            </div>

            <div className="note-full-body">
              <p>{selectedNote.text}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Notes;



