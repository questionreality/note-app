import React, { Fragment, useContext, useState } from "react";
import {
  Dialog,
  Grid,
  InputBase,
  Paper,
  Button,
  CircularProgress,
  DialogContent,
} from "@material-ui/core";
import MyButton from "./MyButton";
import { postNote } from "../store/actions";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CloseIcon from "@material-ui/icons/Close";

import clsx from "clsx";

import { StateContext } from "../App";
const useStyles = makeStyles((theme) => ({
  // ...theme.editDialogs,
  // textFieldStrikeThrough: {
  //   textDecoration: "line-through",
  // },
  paper: {
    color: theme.palette.text.secondary,
    // width: "500px",
    overflow: "hidden",
    backgroundColor: "#FFF",
    color: "#222",
    fontFamily: "Courier, monospace",
    fontWeight: "normal",
    fontSize: "24px",
    resize: "none",
    lineHeight: "42px",
    paddingLeft: "100px",
    paddingRight: "50px",
    paddingTop: "30px",
    paddingBottom: "34px",
    backgroundImage:
      "url(https://static.tumblr.com/maopbtg/E9Bmgtoht/lines.png), url(https://static.tumblr.com/maopbtg/nBUmgtogx/paper.png)",
    backgroundRepeat: "repeat-y, repeat",
    // backgroundPosition: "",
    // backgroundSize: "100% 14%",
    WebkitBorderRadius: "12px",
    borderRadius: "12px",
    WebkitBoxShadow: "0px 2px 14px #000",
    boxShadow: "0px 2px 14px #000",
    borderTop: "1px solid #FFF",
    borderBottom: "1px solid #FFF",
    maxWidth: "550px",
  },
  submitButton: {
    position: "relative",
    float: "right",
    marginTop: 10,
  },
  progressSpinner: {
    position: "absolute",
  },
  closeButton: {
    position: "absolute",
    left: "85%",
    // top: "6%",
    // [breakpoints.down("sm")]: {
    //   left: "85%",
    //   top: "2%",
    // },
  },
  dialogContent: {
    padding: "0px",
    "&:first-child": {
      padding: "0px",
    },
  },
  dialog: {
    "& .MuiPaper-rounded": {
      borderRadius: "20px",
    },
  },

  // root: {
  //   "& .MuiInputBase-input": {
  //     // margin: "16px auto",
  //     color: theme.palette.text.secondary,
  //     // width: "500px",
  //     overflow: "hidden",
  //     // backgroundColor: "#FFF",
  //     color: "#222",
  //     fontFamily: "Courier, monospace",
  //     fontWeight: "normal",
  //     fontSize: "24px",
  //     resize: "none",
  //     lineHeight: "42px",

  //     // WebkitBorderRadius: "12px",
  //     // borderRadius: "12px",
  //     // WebkitBoxShadow: "0px 2px 14px #000",
  //     // boxShadow: "0px 2px 14px #000",
  //     // borderTop: "1px solid #FFF",
  //     // borderBottom: "1px solid #FFF",
  //   },
  title: {
    "& .MuiInputBase-input": {
      color: "#222",
      // width: "500px",
      overflow: "hidden",
      // backgroundColor: "#FFF",
      fontFamily: "Courier, monospace",
      fontWeight: "normal",
      fontSize: "24px",
      resize: "none",
      lineHeight: "42px",
      fontSize: "36px",
      marginBottom: "30px",
      marginTop: "10px",
    },
  },
  description: {
    "& .MuiInputBase-input": {
      color: theme.palette.text.secondary,

      // width: "500px",
      overflow: "hidden",
      // backgroundColor: "#FFF",
      fontFamily: "Courier, monospace",
      fontWeight: "normal",
      fontSize: "24px",
      resize: "none",
      lineHeight: "42px",
      fontSize: "24px",
      lineHeight: "40px",
    },
  },
}));
function PostNote(props) {
  const [note, setNote] = useState({
    open: false,
    title: "",
    description: "",
    errors: "",
  });
  const classes = useStyles();
  const { state, dispatch } = useContext(StateContext);
  const handleOpen = () => {
    setNote({ ...note, open: true });
  };
  const handleClose = () => {
    // props.clearErrors();
    setNote({ open: false, errors: {}, title: "", body: "" });
  };
  const handleChange = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { title: note.title, description: note.description };
    console.log(data);
    postNote({ data, dispatch });
    if (!state.loading) {
      handleClose();
    }
  };
  //   const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Fragment>
      <MyButton onClick={handleOpen} tip="Create new note">
        <AddIcon />
      </MyButton>
      <Dialog
        open={note.open}
        onClose={handleClose}
        // fullWidth
        // maxWidth="sm"
        // fullScreen={fullScreen}
        aria-labelledby="responsive-dialog-title"
        // className={classes.paper}
        scroll="paper"
        className={classes.dialog}
        // PaperProps={}
      >
        <MyButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogContent className={classes.dialogContent}>
          <Paper className={classes.paper} elevation={3}>
            <Grid container>
              <form noValidate onSubmit={handleSubmit}>
                <Grid item xs={12}>
                  <InputBase
                    value={state.title}
                    name="title"
                    fullWidth
                    placeholder="title of your note"
                    onChange={handleChange}
                    className={clsx(classes.root, classes.title)}
                    multiline
                  ></InputBase>
                </Grid>

                <Grid item xs={12}>
                  <InputBase
                    value={note.description}
                    name="description"
                    multiline
                    fullWidth
                    placeholder="body of your note"
                    onChange={handleChange}
                    className={clsx(classes.root, classes.description)}
                  ></InputBase>
                </Grid>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submitButton}
                  onClick={handleSubmit}
                  disabled={state.loading}
                >
                  Submit
                  {state.loading && (
                    <CircularProgress
                      size={30}
                      className={classes.progressSpinner}
                    />
                  )}
                </Button>
              </form>
            </Grid>
          </Paper>{" "}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

export default PostNote;
