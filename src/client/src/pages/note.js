import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Paper,
  TextField,
  MenuItem,
  Grid,
  InputBase,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { StateContext } from "../App";
import { getNote, editNote } from "../store/actions";
import clsx from "clsx";
const useStyles = makeStyles((theme) => ({
  paper: {
    margin: "16px auto",
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

  menuItem: {
    whiteSpace: "normal",
  },
}));

function Note(props) {
  console.log(props);
  const classes = useStyles();
  const { state, dispatch } = useContext(StateContext);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const id = props.match.params.id;

  useEffect(() => {
    getNote(dispatch, id);
  }, [dispatch, id]);
  useEffect(() => {
    if (state.note) {
      setFormData(state.note);
    }
  }, [state.note, setFormData]);
  
  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    console.log("handleSubmit");
    if (state.note !== null)
      editNote({
        dispatch,
        id,
        data: { title: formData.title, description: formData.description },
      });
  };

  useEffect(() => {
    const unlisten = props.history.listen(() => {
      // Detecting, user has changed URL
      handleSubmit();
    });
    //submiting form before refresh
    window.addEventListener("beforeunload", handleSubmit);
    return () => {
      //cleanup
      unlisten();
      window.removeEventListener("beforeunload", handleSubmit);
    };
  }, [handleSubmit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };
  return formData ? (
    <div>
      {/* <Grid container spacing={2}> */}
      {/* <Grid item lg={6} > */}
      <Paper className={classes.paper} elevation={3}>
        <Grid container>
          <form noValidate onSubmit={handleSubmit}>
            <Grid item xs={12}>
              <InputBase
                value={formData.title}
                name="title"
                fullWidth
                onChange={handleChange}
                className={clsx(classes.root, classes.title)}
                multiline
              ></InputBase>
            </Grid>
            {/* <Typography
          variant="inherit"
          color="textPrimary"
          component="p"
          className={classes.title}
        >
          {state.note.title}
        </Typography> */}
            <Grid item xs={12}>
              <InputBase
                value={formData.description}
                name="description"
                multiline
                fullWidth
                onChange={handleChange}
                className={clsx(classes.root, classes.description)}
              ></InputBase>
            </Grid>
            {/* <Typography
          variant="inherit"
          color="textSecondary"
          component="p"
          style={{
            overflow: "hidden",
            wordWrap: "break-word",
            resize: "none",
            height: "120px",
            // borderBottom: "4px dotted red",
            // display: "inline",
            // backgroundImage:
            //   "repeating-linear-gradient(180deg, transparent, transparent 1em, blue, blue calc(1em + 1px))",
            // lineHeight: "calc(1em + 1px)",
          }}
          className={classes.description}
        > */}
            {/* {state.note.description}
        </Typography> */}
          </form>
        </Grid>
      </Paper>
    </div>
  ) : (
    <>Loading</>
  );
}

export default Note;
