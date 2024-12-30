var express = require("express");
var router = express.Router();
var userModel = require("../models/userModel");
var isLoggedIn = require("../middlewares/isLoggedIn");
const passport = require("passport");

/* GET users listing. */
router.get("/profile", isLoggedIn, function (req, res) {
  res.render("profile");
});

router.get("/home", isLoggedIn, function (req, res) {
  res.render("home");
});

router.get("/users/logout", isLoggedIn, function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

/* POST users listing. */
router.post("/signup", function (req, res, next) {
  let { username, email, fullname, password } = req.body;
  const user = new userModel({
    username,
    email,
    fullname,
  });
  console.log(user);

  userModel.register(user, password, function (err, registeredUser) {
    if (err) {
      console.error("Error registering user:", err);
      return res.status(500).send("Error registering user: " + err.message);
    }
    console.log("User successfully registered:", registeredUser);

    passport.authenticate("local")(req, res, function () {
      res.redirect("/users/profile");
    });
  });
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/users/login",
    successRedirect: "/users/profile",
  }),
  function (req, res, next) {}
);

module.exports = router;
