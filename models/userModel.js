const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/curatex");

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: String,
    posts: {
        type: Array,
        default: [],
    },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const user = mongoose.model("user", userSchema);

module.exports = user;
