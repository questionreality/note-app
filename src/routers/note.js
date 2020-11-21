const Note = require("../models/note");
const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
router.post("/notes", auth, async (req, res) => {
  const note = new Note({
    ...req.body,
    author: req.user._id,
  });
  try {
    await note.save();
    res.status(201).send(note);
  } catch (e) {
    res.status(400).send(error);
  }
});
// GET /notes?priority=true
// limit skip
// query string is always a string
// GET /notes?limit=10&skip=0 -> first 10 results
// GET /notes?sortBy=createdAt:desc
router.get("/notes", auth, async (req, res) => {
  try {
    const match = {};
    const sort = {};
    if (req.query.priority) {
      match.priority = req.query.priority === "true" ? true : false;
      //converting string to boolean
    }
    if (req.query.sortBy) {
      const parts = req.query.sortBy.split(":");
      sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
    }
    await req.user
      .populate({
        path: "notes",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          //converts string to int
          sort,
        },
      })
      .execPopulate();
    res.send(req.user.notes);
  } catch (e) {
    res.status(500).send();
  }
});
router.get("/notes/:id", auth, async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      author: req.user.id,
    });
    if (!note) {
      return res.status(404).send("Not found");
    }
    res.send(note);
  } catch (e) {
    res.status(500).send();
  }
});
router.patch("/notes/:id", auth, async (req, res) => {
  const allowedUpdates = ["description", "priority"];
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
      const note = await Note.findOne({
        _id: req.params.id,
        author: req.user.id,
      });
      if (!note) return res.status(404).send("Not found");

      updates.forEach((update) => (note[update] = req.body[update]));
      await note.save();
      return res.send(note);
    } catch (e) {
      res.status(400).send();
    }
  }
});
router.delete("/notes/:id", auth, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      author: req.user.id,
    });
    if (!note) {
      return res.status(404).send();
    }
    res.send(note);
  } catch (e) {
    res.status(500).send(e);
  }
});
module.exports = router;
