var express = require("express");
var router = express.Router();
const userModel = require("../models/userModel");

/* GET home page. */
router.get("/:val", function (req, res, next) {
  if (req.params.val === "login") {
    return res.render("index");
  }
  if (req.params.val === "signup") {
    return res.render("signup");
  }
});

router.post("/register", function (req, res, next) {
  let { username, email, fullname, password } = req.body;
});

module.exports = router;
