require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./db/mongoose");

const userRouter = require("./routers/user");
const noteRouter = require("./routers/note");
const path = require("path");
const app = express();
// Serve static files from the React app
// app.use(express.static(path.join(__dirname, "client/build")));
app.use(cors());

app.use(express.json());
app.use(userRouter, noteRouter);
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/client/build/index.html"));
// });
module.exports = app;
