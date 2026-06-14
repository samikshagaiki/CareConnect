import mongoose from "mongoose";

const CommunityPostSchema =
  new mongoose.Schema(
    {
      authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      authorName: {
        type: String,
        required: true,
      },

      authorRole: {
        type: String,
        enum: [
          "patient",
          "counselor",
          "admin",
        ],
        required: true,
      },

      title: {
        type: String,
        required: true,
      },

      content: {
        type: String,
        required: true,
      },

      likes: [
        {
          type:
            mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],

      commentsCount: {
        type: Number,
        default: 0,
      },
    },
    {
      timestamps: true,
    }
  );

export default
  mongoose.models.CommunityPost ||
  mongoose.model(
    "CommunityPost",
    CommunityPostSchema
  );