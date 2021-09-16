import React from "react";
import { useContext } from "react";
import noteContext from "../context/notes/notecontext";
import AddNote from "./AddNote";
import Noteitems from "./Noteitems";
import { useEffect } from "react";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  useEffect(() => {
    getNotes();
  }, []);
  return (
    <>
      <AddNote />
      <div className="row my-3">
        <h2>You Notes</h2>
        {notes.map((note) => {
          return <Noteitems key={note._id} note={note} />;
        })}
      </div>
    </>
  );
};

export default Notes;
