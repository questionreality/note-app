import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import themeFile from "./utils/theme";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Note from "./pages/note";
import Notes from "./pages/notes";
import User from "./pages/user";
import AuthRoute from "./utils/AuthRoute";

const theme = createMuiTheme(themeFile);
const UserContext = React.createContext([{}, () => {}]);
const NoteContext = React.createContext([{}, () => {}]);
const StateContext = React.createContext([{}, () => {}]);
axios.defaults.baseURL = "http://localhost:3000";

function App() {
  const [state, setState] = useState({ authenticated: false });
  const [user, setUser] = useState({});
  const [note, setNote] = useState({});

  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      //TO-DO : logout user
      window.location.href = `${window.location.origin}/login`;
    } else {
      //TO-DO :  set-authenticated
      axios.defaults.headers.common["Authorization"] = token;
      if (!state.authenticated) setState({ ...state, authenticated: true });
      //TO-DO : get-user-data
    }
  }
  return (
    <MuiThemeProvider theme={theme}>
      <StateContext.Provider value={[state, setState]}>
        <UserContext.Provider value={[user, setUser]}>
          <NoteContext.Provider value={[note, setNote]}>
            <Router>
              <Switch>
                <Route exact path="/">
                  {state.authenticated ? (
                    <Redirect to="/notes" />
                  ) : (
                    <Redirect to="/signup" />
                  )}
                </Route>
                <AuthRoute
                  exact
                  path="/login"
                  component={Login}
                  routeType="auth"
                />
                <AuthRoute
                  exact
                  path="/signup"
                  component={Signup}
                  routeType="auth"
                />
                <AuthRoute
                  exact
                  path="/notes"
                  component={Notes}
                  routeType="private"
                />
                <AuthRoute
                  exact
                  path="/notes/:id"
                  component={Note}
                  routeType="private"
                />
                <AuthRoute
                  exact
                  path="/user"
                  component={User}
                  routeType="private"
                />
              </Switch>
            </Router>
          </NoteContext.Provider>
        </UserContext.Provider>
      </StateContext.Provider>
    </MuiThemeProvider>
  );
}

export { StateContext, UserContext, NoteContext, App };
