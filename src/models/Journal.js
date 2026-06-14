import mongoose from "mongoose";

const JournalSchema =
  new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      title: {
        type: String,
        required: true,
        trim: true,
      },

      content: {
        type: String,
        required: true,
      },

      moodTag: {
        type: String,
        enum: [
          "very_happy",
          "happy",
          "neutral",
          "sad",
          "very_sad",
        ],
        default: "neutral",
      },
    },
    {
      timestamps: true,
    }
  );

export default
  mongoose.models.Journal ||
  mongoose.model(
    "Journal",
    JournalSchema
  );