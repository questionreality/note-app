import React, { useState, Fragment, useContext } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "./MyButton";
//MUI
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core";
import { deleteNote } from "../store/actions";
import { StateContext } from "../App";

const useStyles = makeStyles((theme) => ({
  delete: {
    position: "absolute",
    left: "85%",
  },
}));
const DeleteTodo = (props) => {
  //   open = {
  //     open: false,
  //   };
  const { state, dispatch } = useContext(StateContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const deleteTodo = () => {
    deleteNote(dispatch, props.noteId);
    setOpen(false);
  };
  const classes = useStyles();
  return (
    <Fragment>
      {/* <MyButton
        tip="Delete Todo"
        onClick={handleOpen}
        btnClassName={classes.deleteButton}
      >
        <DeleteOutline color="secondary" />
      </MyButton> */}
      <MyButton
        onClick={handleOpen}
        tip="Delete Note"
        tipClassName={classes.delete}
      >
        <DeleteIcon color="secondary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Are you sure you want to delete this note?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteTodo} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default DeleteTodo;
