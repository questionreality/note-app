const mongoose = require("mongoose");
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      default: "Undefined"
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    priority: {
      type: Boolean,
      required: false,
      default: false,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
