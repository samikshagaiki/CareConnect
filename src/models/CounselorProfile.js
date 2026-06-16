import mongoose from "mongoose";

const CounselorProfileSchema =
  new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      fullName: {
        type: String,
        required: true,
      },

      gender: {
        type: String,
        enum: [
          "male",
          "female",
          "other",
        ],
        required: true,
      },

      specialization: [
        {
          type: String,
        },
      ],

      experience: {
        type: Number,
        default: 0,
      },

      bio: {
        type: String,
        default: "",
      },

      languages: [
        {
          type: String,
        },
      ],

      ageGroups: [
        {
          type: String,
        },
      ],

      isApproved: {
        type: Boolean,
        default: false,
      },

      approvedBy: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
      },

      approvedAt: {
        type: Date,
        default: null,
      },
    },
    {
      timestamps: true,
    }
  );

export default
  mongoose.models.CounselorProfile ||
  mongoose.model(
    "CounselorProfile",
    CounselorProfileSchema
  );