const express = require("express");
const isLoggedin = require("../middlewares/isLoggedin");
const router = express.Router();

router.get("/", isLoggedin, function (req, res) {
  {
    let error = req.flash("error"); // erro ki vlaue nikal li
    res.render("index", { error });
  }
});
router.get("/shop", isLoggedin, function (req, res) {
  {
    let error = req.flash("error");
    res.render("shop", { error });
  }
});
