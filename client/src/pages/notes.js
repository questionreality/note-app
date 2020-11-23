import React, { useContext, useEffect } from "react";
//TO-DO : Pagination
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { StateContext, NoteContext, UserContext } from "../App";
import NoteCard from "../components/layout/NoteCard";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));
function Notes() {
  const classes = useStyles();
  const [state, setState] = useContext(StateContext);
  const [user, setUser] = useContext(UserContext);
  const [note, setNote] = useContext(NoteContext);
  useEffect(() => {
    axios.get("/notes").then((res) => {
      setNote({ notes: res.data });
    });
  });
  return (
    <>
    
    <div className={classes.root}>
      <Grid container spacing={2}>
        {note.notes &&
          note.notes.map((note) => <NoteCard data={note} key={note.id} />)}
      </Grid>
    </div>
    </>
  );
}

export default Notes;
