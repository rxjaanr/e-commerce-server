const { MongooseError } = require("mongoose");
const connectMongoDB = require("../config/db.config");
const Cart = require("../models/cart.model");

const createCart = async (req, res) => {
  try {
    connectMongoDB();
    const cart = await new Cart(req.body);
    if (cart) return res.status(200).json({ message: "Success", result: cart });
  } catch (error) {
    if (error instanceof MongooseError) {
      return res.status(422).json({
        error: error,
      });
    }
  }
};
