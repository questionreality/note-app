import React, { useContext, useEffect, useState, Fragment } from "react";
//TO-DO : Pagination
import { makeStyles } from "@material-ui/core/styles";
import { Grid, MenuItem } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";

import { StateContext } from "../App";
import NoteCard from "../components/NoteCard";
import axios from "axios";
import { Link } from "react-router-dom";

import { getUserData, getNotes } from "../store/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiPaginationItem-root": {
      color: "white",
    },
  },
  selected: {
    color: "white",
  },
  center: {
    justifyContent: "center",
  },
}));
function Notes() {
  const classes = useStyles();
  const { state, dispatch } = useContext(StateContext);
  const [queryParams, setQueryParams] = useState({ limit: 6, skip: 0 });
  const [page, setPage] = useState(1);
  //initial useEffect render
  useEffect(() => {
    getNotes(dispatch, { limit: 6, skip: 0 });
  }, []);
  useEffect(() => {
    getNotes(dispatch, queryParams);
    console.log("useEffect notes triggered");
  }, [queryParams, dispatch]);
  // useEffect(() => {
  //   if (state.maxNumberOfPages === null) getUserData(dispatch);
  // }, [dispatch]);

  const handleChange = (event, value) => {
    setPage(value);
    setQueryParams({ limit: value * 6, skip: (value - 1) * 6 });
  };
  const paginationMarkup =
    state.maxNumberOfPages === null ? null : (
      <Pagination
        count={state.maxNumberOfPages}
        page={page}
        onChange={handleChange}
        shape="rounded"
        color="primary"
        classes={{ ul: classes.center }}
        renderItem={(item) => (
          <PaginationItem {...item} classes={{ root: classes.selected }} />
        )}
      />
    );
  console.log(state);
  return state.loading === true ? (
    <div>Loading...</div>
  ) : (
    <Fragment>
      <div className={classes.root}>
        <Grid container spacing={2}>
          {state.notes &&
            state.notes.map((note) => <NoteCard data={note} key={note._id} />)}
        </Grid>
      </div>
      {paginationMarkup}
    </Fragment>
  );
}

export default Notes;
