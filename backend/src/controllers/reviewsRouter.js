const express = require("express");
const reviewsRouter = express.Router({ mergeParams: true });
const Review = require("../models/review");
const Fungus = require("../models/fungus");

reviewsRouter.post("/", async (req, res) => {
  try {
    const fungus = await Fungus.findById(req.params.id).populate("reviews");
    const review = new Review({
      comment: req.body.comment,
      rating: req.body.rating,
    });
    //review.author = req.user._id;
    fungus.reviews.push(review);
    const savedReview = await review.save();
    if (fungus.reviews.length > 0) {
      const totalRating = fungus.reviews.reduce(
        (sum, review) => sum + review.rating,
        0
      );
      fungus.average = totalRating / fungus.reviews.length;
    }
    await fungus.save();

    return res.status(200).json({ savedReview, average: fungus.average });
  } catch (error) {
    return res.status(500).json({ error: "Error creating review." });
  }
});

reviewsRouter.delete("/:reviewId", async (req, res) => {
  try {
    const { id, reviewId } = req.params;
    const fungus = await Fungus.findById(id).populate("reviews");
    const reviewIndex = fungus.reviews.findIndex((r) => r._id.equals(reviewId));

    if (reviewIndex !== -1) {
      fungus.reviews.splice(reviewIndex, 1);
    }
    // await Fungus.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await fungus.save();
    await Review.findByIdAndDelete(reviewId);
    if (fungus.reviews.length > 0) {
      const totalRating = fungus.reviews.reduce(
        (sum, review) => sum + review.rating,
        0
      );
      fungus.average = totalRating / fungus.reviews.length;
      fungus.save();
    } else if (fungus.reviews.length === 0) {
      fungus.average = 0;
      fungus.save();
    }

    return res.status(200).json(fungus.average);
  } catch (error) {
    return res.status(500).json({ error: "Error deleting review." });
  }
});

module.exports = reviewsRouter;
