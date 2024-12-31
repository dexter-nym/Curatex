var express = require("express");
var router = express.Router();
var userModel = require("../models/userModel");
var postModel = require("../models/postModel");
var isLoggedIn = require("../middlewares/isLoggedIn");
const passport = require("passport");
const upload = require("../utils/multer");

/* GET users listing. */
router.get("/profile", isLoggedIn, async function (req, res) {
  let user = await userModel.findOne({ username: req.session.passport.user });
  res.render("profile", { user });
});

router.get("/home", isLoggedIn, async function (req, res) {
  let user = await userModel.findOne({ username: req.session.passport.user });
  res.render("home", { user });
});

router.get("/create", isLoggedIn, async function (req, res) {
  let user = await userModel.findOne({ username: req.session.passport.user });
  res.render("create", { user });
});

router.get("/logout", isLoggedIn, function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
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

router.post(
  "/setprofile",
  isLoggedIn,
  upload.single("image"),
  async function (req, res, next) {
    let user = await userModel.findOne({ username: req.session.passport.user });
    user.profileImage = req.file.filename;
    await user.save();
    res.redirect("/users/profile");
  }
);

router.post(
  "/createpost",
  isLoggedIn,
  upload.single("postimage"),
  async function (req, res, next) {
    let user = await userModel.findOne({ username: req.session.passport.user });
    let post = await postModel.create({
      user: user._id,
      title: req.body.title,
      description: req.body.description,
      postImage: req.file.filename,
      keywords: req.body.keywords.split(",").map((e) => "#" + e.toLowerCase().trim()),
    });
    user.posts.push(post._id);
    await user.save();
    res.redirect("/users/create");
  }
);

module.exports = router;
