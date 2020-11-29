import React, { useState, useEffect, useContext } from "react";
import { Button } from "@material-ui/core";
import { StateContext } from "../App";
import { logOutAllUser, logOutUser } from "../store/actions";

function User(props) {
  const { user, dispatch } = useContext(StateContext);
  console.log("here");
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        // justifyContent: "center",
        height: "100vh",
        width: "25%",
        alignItems: "center",
        margin: "0px auto",
        minWidth: "300px",
      }}
    >
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        style={{ margin: "50px 0px" }}
        onClick={() => logOutUser(dispatch, props.history)}
      >
        Log Out
      </Button>
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        onClick={() => logOutAllUser(dispatch, props.history)}
      >
        Log Out All Devices
      </Button>
    </div>
  );
}

export default User;
