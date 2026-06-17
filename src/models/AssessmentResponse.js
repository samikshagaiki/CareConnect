import mongoose from "mongoose";

const AssessmentResponseSchema = new mongoose.Schema(
  {
    templateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AssessmentTemplate",
      required: true,
    },

    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    answers: {
      type: [Number],
      default: [],
    },

    score: {
      type: Number,
      default: 0,
    },

    severity: {
      type: String,
      default: "",
    },

    counselorNotes: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },

    submittedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.AssessmentResponse ||
  mongoose.model("AssessmentResponse", AssessmentResponseSchema);
