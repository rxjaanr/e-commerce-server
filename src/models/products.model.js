const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product Name Is required"],
    trim: true,
  },
  slug: {
    type: String,
    required: [true, "Product Slug Is required"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Product Description is required"],
  },
  category: {
    type: String,
    enum: ["laptop", "handphone", "accessories"],
    required: true,
  },
  price: {
    type: Number,
    required: [true, "Price Is Required"],
  },
  qty: {
    type: Number,
    required: [true, "Qty Is Required"],
  },
  images: {
    type: [
      {
        url: { type: String, default: null },
        imageId: { type: String, default: null },
      },
    ],
  },
});

const Products = mongoose.models.products || mongoose.model("product", schema);

module.exports = Products;
