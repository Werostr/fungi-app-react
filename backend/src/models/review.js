const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  comment: {
    type: String,
    required: true,
  },
  rating: Number,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

reviewSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Review", reviewSchema);
