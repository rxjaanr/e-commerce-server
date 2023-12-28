const { MongooseError } = require("mongoose");
const connectMongoDB = require("../config/db.config");
const Users = require("../models/users.model");
const md5 = require("md5");

const registerHandler = async (req, res) => {
  try {
    connectMongoDB();
    const hasUser = await Users.findOne({ email: req.body.email });
    if (hasUser) {
      return res.status(422).json({
        error: {
          errors: {
            email: {
              name: "ValidatorError",
              message: "Email has used by another user",
              properties: {
                message: "Email has used by another user",
                type: "unique",
                path: "email",
              },
              kind: "unique",
              path: "email",
            },
          },
        },
      });
    }
    const user = await new Users(req.body).save();
    if (user) {
      return res.status(200).json({
        message: "Register Successful",
      });
    }
  } catch (error) {
    if (error instanceof MongooseError) {
      return res.status(422).json({ error: error });
    }
    return res.status(400).json(error);
  }
};

const loginHandler = async (req, res, next) => {
  try {
    connectMongoDB();
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(401).json({
        error: {
          message: "Email or Password Incorrect",
        },
      });
    }
    user.comparePassword(password, (err, match) => {
      if (!match) {
        return res.status(401).json({
          error: {
            message: "Email or Password Incorrect",
          },
        });
      }
      user.login_tokens = md5(user.firstName);
      user.save();
      const { _id, password, __v, ...restData } = user._doc;
      return res
        .status(200)
        .json({ message: "Login Success", result: restData });
    });
  } catch (error) {
    if (error instanceof MongooseError) {
      console.log(error.message);
      return res.status(422).json(error);
    }
    return res.status(400).json(error);
  }
};

const logoutHandler = async (req, res) => {
  try {
    connectMongoDB();
    const login_tokens = req.headers.authorization;
    const user = await Users.findOne({ login_tokens });
    user.login_tokens = null;
    const saved = await user.save();
    if (saved) {
      return res.status(200).json({
        message: "Logout Success",
      });
    }
  } catch (error) {
    if (error instanceof MongooseError) {
      console.log(error.message);
      return res.status(422).json(error);
    }
    return res.status(400).json(error);
  }
};

module.exports = { registerHandler, loginHandler, logoutHandler };
