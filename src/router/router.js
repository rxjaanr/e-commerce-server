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
  deleteProduct,
  getProduct,
} = require("../controllers/product.controller");
const { checkAuth, checkIsAdmin } = require("../middleware/auth");
const route = express.Router();

route.get("/test", (req, res) => {
  return res.json("TEEEESSS");
});

// Auth
route.post("/auth/register", registerHandler);
route.post("/auth/login", loginHandler);
route.post("/auth/logout", checkAuth, logoutHandler);

// Images

route.post("/images", checkAuth, upload.array("image"), uploadImage);

// Products
route.get("/product", getProducts);
route.post("/product", checkIsAdmin, createProduct);
route.get("/product/:slug", getProduct);
route.put("/product/:slug", checkAuth, updateProduct);
route.delete("/product", checkIsAdmin, deleteProduct);

// Cart

route.post("/cart");

module.exports = route;
