const { MongooseError } = require("mongoose");
const Products = require("../models/products.model");
const slugify = require("slugify");
const connectMongoDB = require("../config/db.config");

const getProducts = async (req, res) => {
  try {
    connectMongoDB();
    const products = await Products.find(req.query ?? {});
    if (products.length > 0) {
      return res.status(200).json({
        message: "Success",
        result: products,
      });
    }
    return res.status(204).json({
      message: "Product Is Empty",
    });
  } catch (error) {
    if (error instanceof MongooseError) {
      console.log(error);
      if (error.name === "ValidationError") {
        return res.status(422).json({ error: error });
      }
    }
    console.log(error);
    return res.status(400).json(error);
  }
};

const getProduct = async (req, res) => {
  try {
    await connectMongoDB();
    const { slug } = req.params;
    const product = await Products.findOne({ slug });
    if (!product)
      return res.status(404).json({
        error: {
          message: "Product Not Found",
        },
      });
    return res.status(200).json({
      message: "Product Found",
      result: product,
    });
  } catch (error) {
    if (error instanceof MongooseError) {
      console.log(error);
    }
    console.log(error);
    return res.status(400).json(error);
  }
};

const createProduct = async (req, res) => {
  try {
    connectMongoDB();
    const { slug, ...restData } = req.body;
    const slugHasUsed = await Products.findOne({
      slug: slugify(slug, { separator: "-" }),
    });
    if (slugHasUsed) {
      return res.status(422).json({
        error: {
          errors: {
            slug: {
              name: "ValidatorError",
              message: "Slug Has Used by Another Product",
              properties: {
                message: "Slug Has Used by Another Product",
                type: "unique",
                path: "name",
              },
              kind: "unique",
              path: "name",
            },
          },
        },
      });
    }
    const product = await new Products({
      slug: slug ? slugify(slug, { separator: "-" }) : "",
      ...restData,
    }).save();
    if (product) {
      return res.status(200).json({
        message: "Product Created",
        result: product,
      });
    }
  } catch (error) {
    if (error instanceof MongooseError) {
      console.log(error);
      if (error.name === "ValidationError") {
        return res.status(422).json({ error: error });
      }
    }
    console.log(error);
    return res.status(400).json(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    connectMongoDB();
    const slug = req.params.slug;
    const product = await Products.findOneAndUpdate({ slug: slug }, req.body, {
      new: true,
    });
    if (product) {
      return res
        .status(200)
        .json({ message: "Product Updated", result: product });
    }
  } catch (error) {
    if (error instanceof MongooseError) {
      if (error.name === "CastError") {
        return res.status(404).json({
          error: {
            message: "Product Not Found",
            result: error,
          },
        });
      }
    }
    console.log(error);
    return res.status(401).json(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    connectMongoDB();
    console.log(req.body);
    const isDeleted = await Products.deleteMany(req.body);
    if (isDeleted) {
      return res.json({
        message: "Product Deleted",
        result: isDeleted,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
};

module.exports = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
