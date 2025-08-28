const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email,
  movie_id,
  text,
  date: {
    type: Date,
  },
});

module.exports = mongoose.model("comment", commentSchema);
