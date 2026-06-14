import mongoose from "mongoose";

const CommunityCommentSchema =
  new mongoose.Schema(
    {
      postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CommunityPost",
        required: true,
      },

      authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      authorName: {
        type: String,
        required: true,
      },

      content: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

export default
  mongoose.models
    .CommunityComment ||
  mongoose.model(
    "CommunityComment",
    CommunityCommentSchema
  );