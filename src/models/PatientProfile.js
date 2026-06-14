import mongoose from "mongoose";

const EmergencyContactSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },

      relationship: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: true,
      },
    },
    { _id: false }
  );

const PatientProfileSchema =
  new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
      },

      anonymousName: {
        type: String,
        required: true,
        trim: true,
      },

      age: {
        type: Number,
        required: true,
      },

      gender: {
        type: String,
        enum: [
          "male",
          "female",
          "other",
          "prefer_not_to_say",
        ],
        required: true,
      },

      occupation: {
        type: String,
        default: "",
      },

      preferredCounselorGender: {
        type: String,
        enum: [
          "male",
          "female",
          "no_preference",
        ],
        default: "no_preference",
      },

      preferredLanguage: {
        type: String,
        default: "English",
      },

      primaryConcerns: [
        {
          type: String,
        },
      ],

      emergencyContacts: [
        EmergencyContactSchema,
      ],

      assignedCounselor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CounselorProfile",
        default: null,
      },

      counselorChangeUsed: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.models.PatientProfile ||
  mongoose.model(
    "PatientProfile",
    PatientProfileSchema
  );