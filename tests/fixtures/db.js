const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../../src/models/user");
const Task = require("../../src/models/task");
const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "Rahul",
  email: "vivekvarma15516@gmail.com",
  password: "wutwut4343",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
    },
  ],
};
const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  name: "Wassup",
  email: "wsb123@gmail.com",
  password: "wutwut4343",
  tokens: [
    {
      token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET),
    },
  ],
};
const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: "First test task",
  completed: false,
  author: userOne._id,
};

const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: "First test task",
  completed: true,
  author: userOne._id,
};

const taskThree = {
  _id: new mongoose.Types.ObjectId(),
  description: "First test task",
  completed: true,
  author: userTwo._id,
};
const setupDatabase = async () => {
  await User.deleteMany();
  await Task.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
  await new Task(taskOne).save();
  await new Task(taskTwo).save();
  await new Task(taskThree).save();
};

module.exports = {
  userOneId,
  userTwoId,
  userOne,
  userTwo,
  taskOne,
  taskTwo,
  taskThree,
  setupDatabase,
};
