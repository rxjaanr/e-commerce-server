const express = require("express");
const {
  registerHandler,
  loginHandler,
  logoutHandler,
} = require("../controllers/user.controller");
const upload = require("../middleware/multer");
const { uploadImage } = require("../controllers/image.controller");
const {
  createProduct,
  updateProduct,
  getProducts,
} = require("../controllers/product.controller");
const { checkAuth, checkIsAdmin } = require("../middleware/auth");
const route = express.Router();

// Auth
route.post("/auth/register", registerHandler);
route.post("/auth/login", loginHandler);
route.post("/auth/logout", checkAuth, logoutHandler);

// Images

route.post("/images", checkAuth, upload.array("image"), uploadImage);

// Products
route.get("/product", getProducts);
route.post("/product", checkIsAdmin, createProduct);
route.put("/product/:id", checkIsAdmin, updateProduct);

module.exports = route;
