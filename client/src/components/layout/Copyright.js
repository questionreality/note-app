import React from "react";
import { Typography, Link } from "@material-ui/core";

export default function Copyright() {
  return (
    <Typography
      variant="body2"
      color=""
      align="center"
      style={{ color: "white" }}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        Aesthetic-Notes
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
