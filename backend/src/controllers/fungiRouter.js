const express = require("express");
const fungiRouter = express.Router();
const Fungus = require("../models/fungus");

fungiRouter.get("/", async (req, res) => {
  try {
    const allFungi = await Fungus.find({});
    return res.status(200).json(allFungi);
  } catch (error) {
    return res.status(500).json({ error: "Error loading fungi." });
  }
});

fungiRouter.post("/", async (req, res) => {
  try {
    const newFungus = new Fungus({
      variety: req.body.variety,
      poisonous: req.body.poisonous,
      description: req.body.description,
      city: req.body.city,
      country: req.body.country,
    });
    const savedFungus = await newFungus.save();
    return res.status(201).json(savedFungus);
  } catch (error) {
    return res.status(500).json({ error: "Error creating new fungus." });
  }
});

fungiRouter.get("/:id", async (req, res) => {
  try {
    const fungus = await Fungus.findById(req.params.id).populate("reviews");
    console.log(fungus);
    return res.status(200).json(fungus);
  } catch (error) {
    return res.status(500).json({ error: "Error searching fungus." });
  }
});

fungiRouter.put("/:id", async (req, res) => {
  try {
    const fungus = await Fungus.findByIdAndUpdate(req.params.id, {
      variety: req.body.variety,
      poisonous: req.body.poisonous,
      description: req.body.description,
      city: req.body.city,
      country: req.body.country,
    });
    const savedFungus = await fungus.save();
    return res.status(200).json(savedFungus);
  } catch (error) {
    return res.status(500).json({ error: "Error updating fungus." });
  }
});

fungiRouter.delete("/:id", async (req, res) => {
  try {
    await Fungus.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Fungus removed." });
  } catch (error) {
    return res.status(500).json({ error: "Error removing fungus." });
  }
});

module.exports = fungiRouter;
