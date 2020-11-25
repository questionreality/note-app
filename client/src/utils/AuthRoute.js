import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { StateContext } from "../App";

const AuthRoute = ({ component: Component, routeType, ...rest }) => {
  const { state, dispatch } = useContext(StateContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        state.authenticated === true && routeType === "auth" ? (
          <Redirect to="/notes" />
        ) : state.authenticated === false && routeType === "private" ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default AuthRoute;
