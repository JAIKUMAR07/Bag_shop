const JWT = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports = async function (req, res, next) {
  if (!req.cookies.token) {
    req.flash("error", "plz login first");
    return res.redirect("/");
  }

  try {
    let decoded = JWT.verify(req.cookies.token, process.env.JWT_SECRET);
    req.user = await userModel
      .findOne({ email: decoded.email })
      .select("password");

    req.user = user; // ab hamne req create kiya jisko aage route me bhej skte
    next();
  } catch (error) {
    req.flash("error", "plz login first");
    return res.redirect("/");
  }
};
