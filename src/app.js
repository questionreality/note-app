require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./db/mongoose");

const userRouter = require("./routers/user");
const noteRouter = require("./routers/note");
const path = require("path");
const app = express();
app.use(cors());
const port = process.env.PORT;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "/client/build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "/build", "index.html"));
// });
console.log(path.join(__dirname, "/client/build", "index.html"));
app.use(express.json());
app.use(userRouter, noteRouter);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});
app.listen(port, () => {
  console.log("Server is up on port " + port);
});
