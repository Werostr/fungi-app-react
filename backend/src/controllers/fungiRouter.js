const express = require("express");
const fungiRouter = express.Router();
const Fungus = require("../models/fungus");
const cloudinary = require("../utils/cloudinary");
const authenticateUser = require("../utils/authentication");

fungiRouter.get("/", async (req, res) => {
  try {
    const allFungi = await Fungus.find({});
    return res.status(200).json(allFungi);
  } catch (error) {
    return res.status(500).json({ error: "Error loading fungi." });
  }
});

fungiRouter.post(
  "/",
  authenticateUser,
  cloudinary.upload.array("files"),
  async (req, res) => {
    const { files } = req;
    console.log(files);

    try {
      const newFungus = new Fungus({
        variety: req.body.variety,
        poisonous: req.body.poisonous,
        description: req.body.description,
        city: req.body.city,
        country: req.body.country,
        author: req.user.userId,
      });

      if (files) {
        const uploadPromises = files.map(async (file) => {
          try {
            const b64 = Buffer.from(file.buffer).toString("base64");
            let dataURI = "data:" + file.mimetype + ";base64," + b64;
            const imageDetails = await cloudinary.handleUpload(dataURI);
            console.log("po imageDetails");
            if (imageDetails && imageDetails.secure_url) {
              newFungus.images.push({
                url: imageDetails.secure_url,
                filename: imageDetails.public_id,
              });
            }
          } catch (err) {
            throw new Error("Error while uploading files: " + err);
          }
        });

        await Promise.all(uploadPromises);
      }
      await newFungus.populate("author");
      const savedFungus = await newFungus.save();

      return res.status(201).json(savedFungus);
    } catch (error) {
      return res.status(500).json({ error: "Error creating new fungus." });
    }
  }
);

fungiRouter.get("/:id", async (req, res) => {
  try {
    const fungus = await Fungus.findById(req.params.id)
      .populate({
        path: "reviews",
        populate: { path: "author" },
      })
      .populate("author");
    return res.status(200).json(fungus);
  } catch (error) {
    return res.status(404).json({ error: "Fungus not found." });
  }
});

fungiRouter.put(
  "/:id",
  authenticateUser,
  cloudinary.upload.array("files"),
  async (req, res) => {
    const id = req.params.id;
    const { files } = req;

    try {
      const fungus = await Fungus.findByIdAndUpdate(id, {
        variety: req.body.variety,
        poisonous: req.body.poisonous,
        description: req.body.description,
        city: req.body.city,
        country: req.body.country,
      }).populate("author");

      if (fungus.author.id !== req.user.userId) {
        return res.status(403).json({ error: "Not Author." });
      }

      if (files) {
        const uploadPromises = files.map(async (file) => {
          try {
            const b64 = Buffer.from(file.buffer).toString("base64");
            let dataURI = "data:" + file.mimetype + ";base64," + b64;
            const imageDetails = await cloudinary.handleUpload(dataURI);
            console.log("po imageDetails");
            if (imageDetails && imageDetails.secure_url) {
              fungus.images.push({
                url: imageDetails.secure_url,
                filename: imageDetails.public_id,
              });
            }
          } catch (err) {
            throw new Error("Error while uploading files: " + err);
          }
        });

        await Promise.all(uploadPromises);
      }

      const savedFungus = await fungus.save();
      return res.status(200).json(savedFungus);
    } catch (error) {
      return res.status(500).json({ error: "Error updating fungus." });
    }
  }
);

fungiRouter.delete("/:id", authenticateUser, async (req, res) => {
  try {
    const id = req.params.id;
    const fungus = await Fungus.findById(id).populate("author");
    if (fungus.author.id !== req.user.userId) {
      return res.status(403).json({ error: "Not Author." });
    }
    const deletedFungus = await Fungus.findByIdAndDelete(id);
    await Promise.all(
      deletedFungus.images.map(
        async (image) => await cloudinary.handleDelete(image.filename)
      )
    );

    return res.status(200).json("OK");
  } catch (error) {
    return res.status(500).json({ error: "Error removing fungus." });
  }
});

module.exports = fungiRouter;
