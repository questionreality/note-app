import React, { useContext,useState } from "react";
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
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { StateContext, UserContext, NoteContext } from "../App";
import Copyright from "../components/layout/Copyright";

import axios from "axios";
import { loginUser } from "../store/actions";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    color: "#eee",

    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp(props) {
  const classes = useStyles();
  const { state, dispatch } = useContext(StateContext);
  const [user, setUser] = useState({ name: null, email: null, password: null });

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name: user.name,
      email: user.email,
      password: user.password,
    };
    loginUser({
      userData: userData,
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
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TextField
                id="name"
                name="name"
                type="name"
                label="Name"
                // helperText={errors.password}
                // error={errors.password ? true : false}
                className={classes.textField}
                value={user.name}
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
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Log in
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
