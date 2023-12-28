const cloudinary = require("../config/cloudinary");
const connectMongoDB = require("../config/db.config");
const Users = require("../models/users.model");

const uploadImage = async (req, res) => {
  try {
    const cloudinaryImageUpload = async (file, option) => {
      return new Promise((resolve) => {
        cloudinary.uploader.upload(file, option, (err, result) => {
          if (err) return res.status(500).send(err);
          resolve({
            imageId: result.public_id,
            url: result.secure_url,
          });
        });
      });
    };
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const data = await cloudinaryImageUpload(file.path, {
        folder: "products",
      });
      urls.push(data);
    }
    return res.status(200).json({
      message: "Image Upload Success",
      data: urls,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  uploadImage,
};
