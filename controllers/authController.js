const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
  console.log("BODY RECEIVED:", req.body);

  try {
    let { email, password, fullname } = req.body;

    //firstly check ki pehle se kahi account to nhi hai uska

    let user = await userModel.findOne({ email: email });

    if (user)
      return res.status(401).send("your already have a account plz log in ");

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) return res.send(err.message);
        else {
          let user = await userModel.create({
            email,
            password: hash,
            fullname,
          });

          // jb user login krke log in ho jayega to uske baad kya chahiye
          let token = generateToken(user);
          res.cookie("token", token);
          res.send("user created succeddfully");
        }
      });
    });
  } catch (error) {
    console.error("Error creating user ye rha :", error);
    res.status(500).send("Internal Server Error");
  }
};
