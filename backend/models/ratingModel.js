import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  purchaseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Purchase", // Reference to the Purchase model

    required: true,
  },

  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    // Field to store the populated user information
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
  },
});

const Rating = mongoose.model("Rating", ratingSchema)
export default Rating; // Exporting Rating model as default
