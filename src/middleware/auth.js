const connectMongoDB = require("../config/db.config");
const Users = require("../models/users.model");

const checkIsAdmin = async (req, res, next) => {
  connectMongoDB();
  const token = req.headers.authorization;
  const user = await Users.findOne({ token });
  if (!user || !token || user.role !== "ADMIN") {
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
  const token = req.headers.authorization;
  const user = await Users.findOne({ token });
  if (!user || !token) {
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
