const connectMongoDB = require("../config/db.config");
const Users = require("../models/users.model");

const checkIsAdmin = async (req, res, next) => {
  connectMongoDB();
  const login_tokens = req.headers.authorization;
  const user = await Users.findOne({ login_tokens });
  if (!user || !login_tokens || user.role !== "ADMIN") {
    return res.status(401).json({
      error: {
        message: "Unauthorized",
      },
    });
  } else {
    next();
  }
};

const checkAuth = async (req, res, next) => {
  connectMongoDB();
  const login_tokens = req.headers.authorization;
  const user = await Users.findOne({ login_tokens });
  if (!user || !login_tokens) {
    return res.status(401).json({
      error: {
        message: "Unauthorized",
      },
    });
  } else {
    next();
  }
};

module.exports = {
  checkAuth,
  checkIsAdmin,
};
