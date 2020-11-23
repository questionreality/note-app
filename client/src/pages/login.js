import React, { useContext } from "react";
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
import { getUser } from "../utils/actions";
import { StateContext, UserContext, NoteContext } from "../App";
import theme from "../utils/theme";
import Copyright from "../components/layout/Copyright";

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
  const [state, setState] = useContext(StateContext);
  const [user, setUser] = useContext(UserContext);
  const [note, setNote] = useContext(NoteContext);

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: user.email,
      password: user.password,
    };
    getUser({
      user,
      setUser,
      state,
      setState,
      formData: userData,
      route: "/users/login",
    });
    props.history.push("/notes");
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
