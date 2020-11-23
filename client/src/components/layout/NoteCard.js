import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Paper,
  TextField,
} from "@material-ui/core";
import { Grid } from "@material-ui/core";

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
}));

export default function NoteCard({ data }) {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} lg={4}>
      <Paper className={classes.paper}>
        <Typography
          variant="heading1"
          color="textPrimary"
          component="p"
          className={classes.title}
        >
          {data.title}
        </Typography>

        <Typography
          variant="body1"
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
      {/* </Card> */}
    </Grid>
  );
}
