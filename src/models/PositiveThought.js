import mongoose from "mongoose";

const PositiveThoughtSchema =
  new mongoose.Schema({
    month: {
      type: Number,
      required: true,
      unique: true,
    },

    thoughts: [
      {
        type: String,
        required: true,
      },
    ],
  });

export default
  mongoose.models.PositiveThought ||
  mongoose.model(
    "PositiveThought",
    PositiveThoughtSchema
  );