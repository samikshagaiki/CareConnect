import mongoose from "mongoose";

const NatureChallengeSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
      unique: true,
    },

    title: {
      type: String,
      default: "Today's Nature Hunt",
    },

    tasks: [
      {
        text: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.NatureChallenge ||
mongoose.model(
  "NatureChallenge",
  NatureChallengeSchema
);