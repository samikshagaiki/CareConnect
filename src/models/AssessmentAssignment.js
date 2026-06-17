import mongoose from "mongoose";

const AssessmentAssignmentSchema =
  new mongoose.Schema(
    {
      templateId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref:
          "AssessmentTemplate",
      },

      counselorId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      patientId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      status: {
        type: String,
        enum: [
          "assigned",
          "completed",
        ],
        default:
          "assigned",
      },
    },
    {
      timestamps: true,
    }
  );

export default
  mongoose.models
    .AssessmentAssignment ||
  mongoose.model(
    "AssessmentAssignment",
    AssessmentAssignmentSchema
  );