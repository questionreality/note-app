import React, { useContext, useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@material-ui/core";
import NoteIcon from "@material-ui/icons/Note";
import { makeStyles } from "@material-ui/core/styles";
import { loginUser } from "../store/actions";
import { StateContext } from "../App";
import theme from "../utils/theme";
import Copyright from "../components/Copyright";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    color: "#eee",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(6),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login(props) {
  const classes = useStyles();
  const { state, dispatch } = useContext(StateContext);
  const [user, setUser] = useState({ email: null, password: null });

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: user.email,
      password: user.password,
    };
    loginUser({
      userData,
      route: "/users/login",
      history: props.history,
      dispatch,
    });
  };
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <Container component="main" maxWidth="xs">
      {/* <CssBaseline /> */}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <NoteIcon style={{ fill: "#222" }} />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TextField
                id="email"
                name="email"
                type="email"
                label="Email"
                // helperText={errors.email}
                // error={errors.email ? true : false}
                className={classes.textField}
                value={user.email}
                onChange={handleChange}
                fullWidth
                InputProps={{
                  style: {
                    color: "white",
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: "white",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="password"
                name="password"
                type="password"
                label="Password"
                // helperText={errors.password}
                // error={errors.password ? true : false}
                className={classes.textField}
                value={user.password}
                onChange={handleChange}
                fullWidth
                InputProps={{
                  style: {
                    color: "white",
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: "white",
                  },
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signup" variant="body2">
                Don't have an account? Sign up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
