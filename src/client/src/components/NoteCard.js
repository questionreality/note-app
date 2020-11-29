import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import MyButton from "./MyButton";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Paper,
  TextField,
  MenuItem,
  Grid,
  CssBaseline,
} from "@material-ui/core";
import DeleteNote from "./DeleteNote";
import { StateContext } from "../App";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(2),
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
    paddingTop: "50px",
    paddingBottom: "34px",
    backgroundImage:
      "url(https://static.tumblr.com/maopbtg/E9Bmgtoht/lines.png), url(https://static.tumblr.com/maopbtg/nBUmgtogx/paper.png)",
    backgroundRepeat: "repeat-y, repeat",
    WebkitBorderRadius: "12px",
    borderRadius: "12px",
    WebkitBoxShadow: "0px 2px 14px #000",
    boxShadow: "0px 2px 14px #000",
    borderTop: "1px solid #FFF",
    borderBottom: "1px solid #FFF",
  },
  title: {
    fontSize: "36px",
    marginBottom: "40px",
  },
  description: {
    fontSize: "24px",
    lineHeight: "40px",
  },
  menuItem: {
    whiteSpace: "normal",
  },
}));

export default function NoteCard({ data }) {
  const classes = useStyles();
  const notesRoute = {
    pathname: `/notes/${data._id}`,
    param1: data,
  };
  const { state, dispatch } = useContext(StateContext);
  return (
    <Grid item xs={12} sm={6} lg={4}>
      {/* <MenuItem
        component={Link}
        className={classes.menuItem}
        // disableGutters
        // component="div"
      > */}
      <div style={{ position: "relative" }}>
        <DeleteNote noteId={data._id} />

        <Link
          to={notesRoute}
          style={{ color: "inherit", textDecoration: "inherit" }}
        >
          <Paper
            className={classes.paper}
            elevation={3}
            // component={Link}
            //     to={notesRoute}
          >
            <Typography
              variant="inherit"
              color="textPrimary"
              component="p"
              className={classes.title}
              style={{
                overflow: "hidden",
                resize: "none",
                whiteSpace: "nowrap",
              }}
            >
              {data.title}
            </Typography>

            <Typography
              variant="inherit"
              color="textSecondary"
              component="p"
              style={{
                overflow: "hidden",
                wordWrap: "break-word",
                resize: "none",
                height: "120px",
              }}
              className={classes.description}
            >
              {data.description}
            </Typography>
          </Paper>
        </Link>
        {/* </Card> */}
        {/* </MenuItem> */}
      </div>
    </Grid>
  );
}
