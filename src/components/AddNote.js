import React from "react";
import noteContext from "../context/notes/notecontext";
import { useContext } from "react";
import { useState } from "react";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    props.showAlert("Added Successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="container my-3">
        <h2>Add a Note</h2>
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              minLength={5}
              required
              value={note.title}
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              minLength={5}
              required
              value={note.description}
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={onChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              value={note.tag}
              name="tag"
              onChange={onChange}
            />
          </div>

          <button
            disabled={note.title.length < 3 || note.description.length < 5}
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
