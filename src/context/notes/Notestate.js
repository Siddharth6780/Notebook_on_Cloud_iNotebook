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
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzYzkxYWVkM2RjOWM1MjVjMGU4ZWY0In0sImlhdCI6MTYzMTM2NjA5OX0.EegxkW1nxCX_EdgPVtYS0Ky5aZyzO2C8DGhlZQe7Ahk",
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
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzYzkxYWVkM2RjOWM1MjVjMGU4ZWY0In0sImlhdCI6MTYzMTM2NjA5OX0.EegxkW1nxCX_EdgPVtYS0Ky5aZyzO2C8DGhlZQe7Ahk",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    console.log("Adding a new note");
    const note = {
      _id: "6140b340fd06d00bcdc842532324943",
      user: "613c91aed3dc9c525c0e8ef4",
      title: title,
      description: description,
      tag: tag,
      date: "2021-09-14T14:35:44.885Z",
      __v: 0,
    };
    setnotes(notes.concat(note));
  };

  //Delete a note
  const deleteNote = async (id) => {

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzYzkxYWVkM2RjOWM1MjVjMGU4ZWY0In0sImlhdCI6MTYzMTM2NjA5OX0.EegxkW1nxCX_EdgPVtYS0Ky5aZyzO2C8DGhlZQe7Ahk",
      },
      body: JSON.stringify(),
    });
    const json = response.json();
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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzYzkxYWVkM2RjOWM1MjVjMGU4ZWY0In0sImlhdCI6MTYzMTM2NjA5OX0.EegxkW1nxCX_EdgPVtYS0Ky5aZyzO2C8DGhlZQe7Ahk",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    // const resp = response.json();

    //Logic

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
