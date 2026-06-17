import mongoose from "mongoose";

const QuestionSchema =
  new mongoose.Schema(
    {
      question: {
        type: String,
        required: true,
      },

      options: {
        type: [String],
        default: [],
      },
    },
    {
      _id: false,
    }
  );

const AssessmentTemplateSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },

      description: {
        type: String,
        default: "",
      },

      type: {
        type: String,
        enum: [
          "standard",
          "custom",
        ],
        default: "standard",
      },

      createdBy: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
      },

      questions: {
        type: [QuestionSchema],
        default: [],
      },

      scoringEnabled: {
        type: Boolean,
        default: false,
      },

      isActive: {
        type: Boolean,
        default: true,
      },
    },
    {
      timestamps: true,
    }
  );

export default
  mongoose.models
    .AssessmentTemplate ||
  mongoose.model(
    "AssessmentTemplate",
    AssessmentTemplateSchema
  );