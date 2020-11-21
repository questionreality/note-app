import React, { useContext, Fragment, useEffect } from "react";
//TO-DO : Pagination
import { makeStyles } from "@material-ui/core/styles";
import { StateContext, NoteContext, UserContext } from "../App";
import NoteCard from "../components/layout/NoteCard";
import axios from "axios";
function Notes() {
  const [state, setState] = useContext(StateContext);
  const [user, setUser] = useContext(UserContext);
  const [note, setNote] = useContext(NoteContext);
  useEffect(() => {
    axios.get("/notes").then((res) => {
      setNote({ notes: res.data });
    });
  });
  return (
    <Fragment>
      {note.notes &&
        note.notes.map((note) => <NoteCard data={note} key={note.id} />)}
    </Fragment>
  );
}

export default Notes;
