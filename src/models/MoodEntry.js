import mongoose from "mongoose";

const MoodEntrySchema =
  new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      mood: {
        type: String,
        enum: [
          "very_happy",
          "happy",
          "neutral",
          "sad",
          "very_sad",
        ],
        required: true,
      },

      note: {
        type: String,
        default: "",
        maxlength: 500,
      },
    },
    {
      timestamps: true,
    }
  );

export default
  mongoose.models.MoodEntry ||
  mongoose.model(
    "MoodEntry",
    MoodEntrySchema
  );