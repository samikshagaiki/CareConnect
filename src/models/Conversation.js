import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    counselorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    lastMessage: {
      type: String,
      default: "",
    },

    lastSender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    lastMessageAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// One conversation per patient-counselor pair
ConversationSchema.index(
  {
    patientId: 1,
    counselorId: 1,
  },
  {
    unique: true,
  }
);

export default mongoose.models.Conversation ||
  mongoose.model(
    "Conversation",
    ConversationSchema
  );