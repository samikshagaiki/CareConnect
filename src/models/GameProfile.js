import mongoose from "mongoose";

const GameProfileSchema =
  new mongoose.Schema(
    {
      userId: {
        type: String,
        required: true,
        unique: true,
      },

      xp: {
        type: Number,
        default: 0,
      },

      level: {
        type: Number,
        default: 1,
      },

      streak: {
        type: Number,
        default: 0,
      },

      longestStreak: {
        type: Number,
        default: 0,
      },

      lastPlayed: Date,

      completedNature: {
        type: Number,
        default: 0,
      },

      completedBingo: {
        type: Number,
        default: 0,
      },

      badges: [
        {
          type: String,
        },
      ],
    },
    {
      timestamps: true,
    }
  );

export default mongoose.models.GameProfile ||
  mongoose.model(
    "GameProfile",
    GameProfileSchema
  );