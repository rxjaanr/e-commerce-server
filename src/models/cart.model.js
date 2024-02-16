const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "user",
    required: [true, "User Is Required"],
  },
  products: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: "product",
    required: true,
  },
});

const Cart = mongoose.models.carts || mongoose.model("cart", schema);

module.exports = Cart;
