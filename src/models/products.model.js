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
    enum: ["gadget", "gaming", "fashion", "accessories"],
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
  discount: {
    type: Number,
    default: 0,
  },
  likedBy: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: "user",
    default: [],
  },
});

const Products = mongoose.models.products || mongoose.model("product", schema);

module.exports = Products;
