import mongoose from "mongoose";

const CounselorAssignmentSchema =
  new mongoose.Schema(
    {
      patientId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      counselorId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      status: {
        type: String,
        enum: [
          "pending",
          "accepted",
          "rejected",
        ],
        default: "pending",
      },

      assignedAt: {
        type: Date,
        default: null,
      },
    },
    {
      timestamps: true,
    }
  );

export default
  mongoose.models
    .CounselorAssignment ||
  mongoose.model(
    "CounselorAssignment",
    CounselorAssignmentSchema
  );