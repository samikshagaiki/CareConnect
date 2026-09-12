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

AssessmentAssignmentSchema.index({ patientId: 1, status: 1 });
AssessmentAssignmentSchema.index({ counselorId: 1, status: 1 });
AssessmentAssignmentSchema.index({ _id: 1, patientId: 1 });

export default
  mongoose.models
    .AssessmentAssignment ||
  mongoose.model(
    "AssessmentAssignment",
    AssessmentAssignmentSchema
  );