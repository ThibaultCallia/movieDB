import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    maxlength: [50, "Title cannot be more than 50 characters"],
  },
  year: {
    type: Number,
    required: [true, "Year is required"],
    min: [1900, "Year cannot be less than 1900"],
  },
  actors: {
    type: [String],
    required: [true, "Actors are required"],
  },
});
export const Movie = mongoose.model("Movie", movieSchema);
