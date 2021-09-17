// import react from "react";
import NoteContext from "./notecontext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesinitial = [];
  const [notes, setnotes] = useState(notesinitial);

  //Get all Notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzYzkxYWVkM2RjOWM1MjVjMGU4ZWY0In0sImlhdCI6MTYzMTM2NjA5OX0.EegxkW1nxCX_EdgPVtYS0Ky5aZyzO2C8DGhlZQe7Ahk",
      },
      body: JSON.stringify(),
    });
    const json = await response.json();
    console.log(json);
    setnotes(json);
  };

  //Add a note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzYzkxYWVkM2RjOWM1MjVjMGU4ZWY0In0sImlhdCI6MTYzMTM2NjA5OX0.EegxkW1nxCX_EdgPVtYS0Ky5aZyzO2C8DGhlZQe7Ahk",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setnotes(notes.concat(note));
  };

  //Delete a note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzYzkxYWVkM2RjOWM1MjVjMGU4ZWY0In0sImlhdCI6MTYzMTM2NjA5OX0.EegxkW1nxCX_EdgPVtYS0Ky5aZyzO2C8DGhlZQe7Ahk",
      },
      body: JSON.stringify(),
    });
    const json = await response.json();
    console.log(json);

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(newNotes);
  };

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/updatenode/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzYzkxYWVkM2RjOWM1MjVjMGU4ZWY0In0sImlhdCI6MTYzMTM2NjA5OX0.EegxkW1nxCX_EdgPVtYS0Ky5aZyzO2C8DGhlZQe7Ahk",
      },
      body: JSON.stringify({ id, title, description, tag }),
    });
    // const resp = response.json();

    //Logic
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setnotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
