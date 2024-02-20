require("dotenv").config();

const PORT = process.env.PORT;
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_KEY = process.env.CLOUDINARY_KEY;
const CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET;

module.exports = {
  PORT,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_KEY,
  CLOUDINARY_SECRET,
};
