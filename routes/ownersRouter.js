const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");
const productModel = require("../models/product-model");
const upload = require("../config/multer-config");

if (process.env.NODE_ENV === "development") {
  router.post("/create", async function (req, res) {
    let owners = await ownerModel.find();
    if (owners.length > 0) {
      return res.status(503).send("you dont have permissions to create owners");
    }

    let { fullname, email, password } = req.body;

    let createdOwner = await ownerModel.create({
      fullname,
      email,
      password,
    });

    res.status(201).send(createdOwner);
  });
} else {
  router.post("/create", function (req, res) {
    res.status(503).send("you dont have permissions to create owners");
  });
}

router.get("/admin", function (req, res) {
  let success = req.flash("success");
  let error = req.flash("error");
  res.render("createproducts", { success, error });
});

// ADD THIS MISSING ROUTE - Product creation route
router.post(
  "/products/create",
  upload.single("image"),
  async function (req, res) {
    try {
      let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

      // Check if required fields are provided
      if (!name || !price) {
        req.flash("error", "Product name and price are required");
        return res.redirect("/owners/admin");
      }

      // Create product object
      let productData = {
        name,
        price: parseFloat(price),
        discount: discount ? parseFloat(discount) : 0,
        bgcolor: bgcolor || "#ffffff",
        panelcolor: panelcolor || "#000000",
        textcolor: textcolor || "#333333",
      };

      // Add image if uploaded
      if (req.file) {
        productData.image = req.file.buffer; // or req.file.filename depending on your multer config
      }

      // Create product in database
      let product = await productModel.create(productData);

      req.flash("success", "Product created successfully!");
      res.redirect("/owners/admin");
    } catch (error) {
      console.error("Error creating product:", error);
      req.flash("error", "Failed to create product. Please try again.");
      res.redirect("/owners/admin");
    }
  }
);

// Route to view all products
router.get("/products", async function (req, res) {
  try {
    let products = await productModel.find();
    res.render("admin-products", { products });
  } catch (error) {
    console.error("Error fetching products:", error);
    req.flash("error", "Failed to load products");
    res.redirect("/owners/admin");
  }
});

module.exports = router;
