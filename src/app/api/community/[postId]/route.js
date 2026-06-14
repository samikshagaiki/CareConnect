import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import CommunityPost from "@/models/CommunityPost";
import CommunityComment from "@/models/CommunityComment";

export async function DELETE(
  request,
  context
) {
  try {
    const session =
      await getServerSession(
        authOptions
      );

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    await connectDB();

    const { postId } =
      await context.params;

    const post =
      await CommunityPost.findById(
        postId
      );

    if (!post) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Post not found",
        },
        {
          status: 404,
        }
      );
    }

    const isOwner =
      post.authorId.toString() ===
      session.user.id;

    const isAdmin =
      session.user.role ===
      "admin";

    if (
      !isOwner &&
      !isAdmin
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Not authorized",
        },
        {
          status: 403,
        }
      );
    }

    await CommunityComment.deleteMany({
      postId: post._id,
    });

    await CommunityPost.findByIdAndDelete(
      post._id
    );

    return NextResponse.json({
      success: true,
      message:
        "Post deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete Post Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}