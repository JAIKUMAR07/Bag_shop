const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  image: String,
  name: string,

  price: Number,
  discount: {
    type: Number,
    default: 0,
  },

  bgcolor: string,
  panelcolor: string,

  textcolor: string,
});

module.exports = mongoose.model("Product", productSchema);
