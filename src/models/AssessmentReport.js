
import mongoose from "mongoose";

const AssessmentReportSchema = new mongoose.Schema(
  {
    responseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AssessmentResponse",
      required: true,
      unique: true,
    },

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

    report: {
      overview: {
        type: String,
        required: true,
      },

      responseSummary: {
        type: String,
        required: true,
      },

      observedPatterns: {
        type: [String],
        default: [],
      },

      areasForDiscussion: {
        type: [String],
        default: [],
      },

      positiveIndicators: {
        type: [String],
        default: [],
      },

      suggestedQuestions: {
        type: [String],
        default: [],
      },

      limitations: {
        type: String,
        default: "",
      },
    },

    model: {
      type: String,
      default: "gpt-4o-mini",
    },

    generatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

AssessmentReportSchema.index(
  { unique: true }
);

export default mongoose.models.AssessmentReport ||
  mongoose.model("AssessmentReport", AssessmentReportSchema);
