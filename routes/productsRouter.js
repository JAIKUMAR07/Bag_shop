const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");

// make sure ki image rhe inpure ka name
router.post("/create", upload.single("image"), async (req, res) => {
  try {
    let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
    // take detail and add into backend
    let product = await productModel.create({
      image: req.file.buffer,
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
    });

    req.flash("success", "product created successfully");
    res.redirect("/owners/admin");
    // res.send(product);
  } catch (err) {
    res.status(500).send("internal server error");
  }
});

module.exports = router;
