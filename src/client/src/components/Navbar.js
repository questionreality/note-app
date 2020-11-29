import React, { Fragment } from "react";
import PostNote from "./PostNote";
import { AppBar, Toolbar, IconButton, InputBase } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import MyButton from "./MyButton";
import SearchIcon from "@material-ui/icons/Search";
import { fade, makeStyles } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { withRouter } from "react-router";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    // [theme.breakpoints.up("sm")]: {
    //   marginLeft: theme.spacing(3),
    //   width: "auto",
    // },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    // [theme.breakpoints.up("md")]: {
    //   width: "20ch",
    // },
  },
}));

function Navbar(props) {
  const classes = useStyles();
  console.log("navbar", props.location.pathname);
  const pathName = props.location.pathname;
  return pathName === "/notes" ? (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <PostNote />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              fullWidth
            />
          </div>
          <MyButton
            // edge="start"
            tipClassName={classes.menuButton}
            tip="Your profile"
            onClick={() => props.history.push("/user")}

            // color="inherit"
          >
            <PersonIcon />
          </MyButton>
          <div className={classes.grow} />
        </Toolbar>
      </AppBar>
    </div>
  ) : pathName.match(/notes\/.+/) ? (
    <>
      <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar>
            {/* <PostNote />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                fullWidth
              />
            </div> */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <MyButton
                // edge="start"
                tipClassName={classes.menuButton}
                tip="Back"
                onClick={() => props.history.push("/notes")}
                // color="inherit"
              >
                <ArrowBackIcon />
              </MyButton>
              <MyButton
                // edge="start"
                tipClassName={classes.menuButton}
                tip="Your profile"
                onClick={() => props.history.push("/user")}
                // color="inherit"
              >
                <PersonIcon />
              </MyButton>
            </div>
            <div className={classes.grow} />
          </Toolbar>
        </AppBar>
      </div>
    </>
  ) : (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          {/* <PostNote />
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
            fullWidth
          />
        </div> */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <MyButton
              // edge="start"
              tipClassName={classes.menuButton}
              tip="Back"
              onClick={() => props.history.push("/notes")}
              // color="inherit"
            >
              <ArrowBackIcon />
            </MyButton>
            {/* <MyButton
              // edge="start"
              tipClassName={classes.menuButton}
              tip="Your profile"
              // color="inherit"
            >
              <PersonIcon />
            </MyButton> */}
          </div>
          <div className={classes.grow} />
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default withRouter(Navbar);
