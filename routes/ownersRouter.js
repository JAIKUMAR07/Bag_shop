const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");

if (process.env.DEBUG === "development:*") {
  router.post("/create", async function (req, res) {
    let owners = await ownerModel.find();

    if (owners.length > 0)
      return res
        .send(503)
        .send("you dont have permissions to create more owners");

    let { fullname, email, password } = req.body;
    let createOwner = await ownerModel.create({
      fullname,
      email,
      password,
    });
    res.status(201).json({ owner: createOwner });
  });
} else {
  res.status(503).send("you dont have permissions to create owners");
}

router.get("/", function (req, res) {
  res.send("hey it working ");
});
module.exports = router;
