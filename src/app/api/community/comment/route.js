import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import CommunityComment from "@/models/CommunityComment";
import CommunityPost from "@/models/CommunityPost";
import PatientProfile from "@/models/PatientProfile";

export async function POST(request) {
  try {
    const session =
      await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { success: false },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await request.json();

    let authorName = "Anonymous";

    if (
      session.user.role === "patient"
    ) {
      const profile =
        await PatientProfile.findOne({
          userId: session.user.id,
        });

      if (profile) {
        authorName =
          profile.anonymousName;
      }
    }

    const comment =
      await CommunityComment.create({
        postId: body.postId,

        authorId:
          session.user.id,

        authorName,

        content: body.content,
      });

    await CommunityPost.findByIdAndUpdate(
      body.postId,
      {
        $inc: {
          commentsCount: 1,
        },
      }
    );

    return NextResponse.json({
      success: true,
      comment,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } =
      new URL(request.url);

    const postId =
      searchParams.get("postId");

    const comments =
      await CommunityComment.find({
        postId,
      })
        .sort({
          createdAt: 1,
        })
        .lean();

    return NextResponse.json({
      success: true,
      comments,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}