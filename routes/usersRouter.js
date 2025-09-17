const express = require("express");
const router = express.Router();
const userModel = require("../models/user-model");

router.post("/register", async (req, res) => {
  console.log("BODY RECEIVED:", req.body);
  try {
    let { email, password, fullname } = req.body;

    let user = await userModel.create({
      email,
      password,
      fullname,
    });

    res.send(user);
  } catch (error) {
    console.error("Error creating user ye rha :", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
