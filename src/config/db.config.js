const mongoose = require("mongoose");

async function connectMongoDB() {
  try {
    mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => console.log("MongoDB CONNECTED!"));
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectMongoDB;
