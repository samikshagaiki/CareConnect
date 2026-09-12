import mongoose from "mongoose";

const NatureProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    challengeDate: {
      type: String,
      required: true,
    },

    completedTasks: [
      Number,
    ],

    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

NatureProgressSchema.index(
  {
    userId: 1,
    challengeDate: 1,
  },
  {
    unique: true,
  }
);

export default mongoose.models.NatureProgress ||
mongoose.model(
  "NatureProgress",
  NatureProgressSchema
);