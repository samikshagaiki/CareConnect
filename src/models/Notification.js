import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },

    type: {
      type: String,
      enum: [
        "chat",
        "appointment",
        "assessment",
        "community",
        "patient",
        "system",
      ],
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    referenceId: {
      type: String,
      default: null,
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default
mongoose.models.Notification ||
mongoose.model(
  "Notification",
  notificationSchema
);