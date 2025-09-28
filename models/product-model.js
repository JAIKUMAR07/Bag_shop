const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  bgcolor: {
    type: String,
    default: "#ffffff",
  },
  panelcolor: {
    type: String,
    default: "#000000",
  },
  textcolor: {
    type: String,
    default: "#333333",
  },
  image: Buffer,
});

module.exports = mongoose.model("product", productSchema);
