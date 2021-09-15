// import react from "react";
import NoteContext from "./notecontext";
import { useState } from "react";

const NoteState = (props) => {
  const notesinitial = [
    {
      _id: "6140b31cf3232fgd06d00b8425493f",
      user: "613c91aed3dc9c525c0e8ef4",
      title: "Title2",
      description: "Hello this is desc2",
      tag: "personal2",
      date: "2021-09-14T14:35:08.766Z",
      __v: 0,
    },
    {
      _id: "6140b32ffd0656d00b84254941",
      user: "613c91aed3dc9c525c0e8ef4",
      title: "New Title",
      description: "Hello this is desc",
      tag: "personal",
      date: "2021-09-14T14:35:27.935Z",
      __v: 0,
    },
    {
      _id: "6140b340fd06d00b8784254943",
      user: "613c91aed3dc9c525c0e8ef4",
      title: "New title of the project",
      description: "Hello this is desc of iNotebook",
      tag: "personal",
      date: "2021-09-14T14:35:44.885Z",
      __v: 0,
    },
    {
      _id: "6140b31c454fd06d00b8425493f",
      user: "613c91aed3dc9c525c0e8ef4",
      title: "Title2",
      description: "Hello this is desc2",
      tag: "personal2",
      date: "2021-09-14T14:35:08.766Z",
      __v: 0,
    },
    {
      _id: "644140b32ffd06d00b84254941",
      user: "613c91aed3dcdd9c525c0e8ef4",
      title: "New Title",
      description: "Hello this is desc",
      tag: "personal",
      date: "2021-09-14T14:35:27.935Z",
      __v: 0,
    },
    {
      _id: "6140b340fd3206d00b84254943",
      user: "613c91aed3dc9c525c0e8ef4",
      title: "New title of the project",
      description: "Hello this is desc of iNotebook",
      tag: "personal",
      date: "2021-09-14T14:35:44.885Z",
      __v: 0,
    },
  ];
  const [notes, setnotes] = useState(notesinitial);

  //Add a note
  const addNote = (title, description, tag) => {
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
  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(newNotes);
  };

  //Edit a note
  const editNote = (id, title, description, tag) => {};

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
