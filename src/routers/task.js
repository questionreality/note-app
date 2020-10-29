const Task = require("../models/task");
const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
router.post("/tasks", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    author: req.user._id,
  });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(error);
  }
});
// GET /tasks?completed=true
// limit skip
// query string is always a string
// GET /tasks?limit=10&skip=0 -> first 10 results
// GET /tasks?sortBy=createdAt:desc
router.get("/tasks", auth, async (req, res) => {
  try {
    const match = {};
    const sort = {};
    if (req.query.completed) {
      match.completed = req.query.completed === "true" ? true : false;
      //converting string to boolean
    }
    if (req.query.sortBy) {
      const parts = req.query.sortBy.split(":");
      sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
      
    }
    await req.user
      .populate({
        path: "tasks",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          //converts string to int
          sort,
        },
      })
      .execPopulate();
    res.send(req.user.tasks);
  } catch (e) {
    res.status(500).send();
  }
});
router.get("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      author: req.user.id,
    });
    if (!task) {
      return res.status(404).send("Not found");
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});
router.patch("/tasks/:id", auth, async (req, res) => {
  const allowedUpdates = ["description", "completed"];
  const updates = Object.keys(req.body);
  const isValid =
    updates.filter((update) => {
      if (!allowedUpdates.includes(update)) {
        return -1;
      }
    }).length > 0
      ? false
      : true;
  if (!isValid) {
    return res.status(400).send("That value doesn't exist!");
  } else {
    try {
      const task = await Task.findOne({
        _id: req.params.id,
        author: req.user.id,
      });
      if (!task) return res.status(404).send("Not found");

      updates.forEach((update) => (task[update] = req.body[update]));
      await task.save();
      return res.send(task);
    } catch (e) {
      res.status(400).send();
    }
  }
});
router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      author: req.user.id,
    });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});
module.exports = router;
