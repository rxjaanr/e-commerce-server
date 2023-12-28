const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_ROUND = 10;

const schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [6, "Your Password Must Be longer"],
    trim: true,
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
  login_tokens: {
    type: String,
    default: null,
  },
});

schema.pre("save", function (next) {
  let user = this;
  if (!user.isModified("password")) return next();
  bcrypt.genSalt(SALT_ROUND, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

schema.methods.comparePassword = async function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, match) {
    if (err) return callback(err);
    callback(null, match);
  });
};

const Users = mongoose.models.user || mongoose.model("user", schema);

module.exports = Users;
