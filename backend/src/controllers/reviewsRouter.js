const express = require("express");
const reviewsRouter = express.Router({ mergeParams: true });
const Review = require("../models/review");
const Fungus = require("../models/fungus");

reviewsRouter.post("/", async (req, res) => {
  try {
    const fungus = await Fungus.findById(req.params.id);
    const review = new Review({
      comment: req.body.comment,
      rating: req.body.rating,
    });
    //review.author = req.user._id;
    fungus.reviews.push(review);
    const savedReview = await review.save();
    await fungus.save();
    return res.status(200).json(savedReview);
  } catch (error) {
    return res.status(500).json({ error: "Error creating review." });
  }
});

reviewsRouter.delete("/:reviewId", async (req, res) => {
  try {
    const { id, reviewId } = req.params;
    await Fungus.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    return res.status(200).json({ message: "Review deleted." });
  } catch (error) {
    return res.status(500).json({ error: "Error deleting review." });
  }
});

module.exports = reviewsRouter;
