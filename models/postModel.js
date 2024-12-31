const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  userLiked: [],
  keywords: Array,
  postImage: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const post = mongoose.model("post", postSchema);

module.exports = post;
