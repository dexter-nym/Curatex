var express = require("express");
var router = express.Router();
const userModel = require("../models/userModel");
const passport = require('passport');
const localStrategy = require('passport-local')

passport.use(new localStrategy(userModel.authenticate()))

/* GET home page. */
router.get("/:val", function (req, res, next) {
  if (req.params.val === "login") {
    return res.render("index");
  }
  if (req.params.val === "signup") {
    return res.render("signup");
  }
});

module.exports = router;
