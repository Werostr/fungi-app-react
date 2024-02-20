const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const config = require("./config");

cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_KEY,
  api_secret: config.CLOUDINARY_SECRET,
});

const handleUpload = async (file) => {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
    folder: "fungiElysium",
  });
  console.log("po handleUpload");
  return res;
};

const storage = multer.memoryStorage();
const upload = multer({
  storage,
});

module.exports = { upload, handleUpload };
