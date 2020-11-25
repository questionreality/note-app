import React, { useState, useReducer } from "react";
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
import Navbar from "./components/layout/Navbar";
import reducer from "./store/reducers";
import { getUserData, logoutUser } from "./store/actions";
import { SET_AUTHENTICATED } from "./store/types";

const theme = createMuiTheme(themeFile);
const StateContext = React.createContext();
axios.defaults.baseURL = "http://localhost:3000";
const initialState = {
  notes: [],
  note: {},
  loading: false,
  user: {},
  authenticated: false,
  maxNumberOfPages: null,
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode(token);
    //not sure if the token has an expiry - need to check
    if (decodedToken.exp * 1000 < Date.now()) {
      window.location.href = `${window.location.origin}/login`;
      dispatch(logoutUser());
    } else {
      if (state.authenticated === false) {
        dispatch({ type: SET_AUTHENTICATED });
        axios.defaults.headers.common["Authorization"] = token;
        getUserData(dispatch);
      }
    }
  }
  const navbarHtml = state.authenticated === true ? <Navbar /> : null;
  return (
    <MuiThemeProvider theme={theme}>
      <StateContext.Provider value={{ state, dispatch }}>
        {navbarHtml}
        <Router>
          <Switch>
            <Route exact path="/">
              {state.authenticated ? (
                <Redirect to="/notes" />
              ) : (
                <Redirect to="/signup" />
              )}
            </Route>
            <AuthRoute exact path="/login" component={Login} routeType="auth" />
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
      </StateContext.Provider>
    </MuiThemeProvider>
  );
}

export { StateContext, App };
