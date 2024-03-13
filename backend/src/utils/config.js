require("dotenv").config();

const PORT = process.env.PORT;
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_KEY = process.env.CLOUDINARY_KEY;
const CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET;
const SECRET_KEY = process.env.SECRET_KEY;
const MONGODB_URI = process.env.MONGODB_URI;

module.exports = {
  PORT,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_KEY,
  CLOUDINARY_SECRET,
  SECRET_KEY,
  MONGODB_URI,
};
