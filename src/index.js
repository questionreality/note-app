require("dotenv").config();
const express = require("express");
require("./db/mongoose");

const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT;

const multer = require("multer");
const upload = multer({
  dest: "images",
  limits: {
    fileSize: 2000000, //2MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(doc|docx)$/)) {
      return cb(new Error("Please upload a word doc"));
    }
    cb(undefined, true);
    //req - request
    //file - file being uploaded
    //cb - tell multer when file is uploaded
    //2 approaches
    // cb(new Error("File must be a pdf"));
    // cb(undefined, true);
  },
});
app.post("/upload", upload.single("upload"), (req, res) => {
  res.send();
});
//(error,req,res,next)=>{} //this will let express know to handle errors
app.use(express.json());
// this is going to autmoatically parse incoming json to an object
app.use(userRouter, taskRouter);
// app.use(taskRouter);
app.listen(port, () => {
  console.log("Server is up on port " + port);
});
// const Task = require("./models/task");
// const User = require("./models/user");
// const main = async () => {
//   // const task = await Task.findById("5f9894549acc9e47e0b38405");
//   // await task.populate("author").execPopulate();
//   // console.log(task.author);
//   const user = await User.findById("5f989328c22a54461c2fced2");
//   await user.populate('tasks').execPopulate()
//   console.log(user.tasks);
// };
// main();

//res.send calls JSON.stringify behind the scenes
