import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import CommunityPost from "@/models/CommunityPost";
import PatientProfile from "@/models/PatientProfile";

export async function POST(request) {
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

    const body =
      await request.json();

    let authorName = "Anonymous";

    if (
      session.user.role ===
      "patient"
    ) {
      const profile =
        await PatientProfile.findOne({
          userId:
            session.user.id,
        });

      if (profile) {
        authorName =
          profile.anonymousName;
      }
    }

    const post =
      await CommunityPost.create({
        authorId:
          session.user.id,

        authorName,

        authorRole:
          session.user.role,

        title: body.title,

        content:
          body.content,
      });

    return NextResponse.json({
      success: true,
      post,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET() {
  try {
    const session =
      await getServerSession(
        authOptions
      );

    await connectDB();

    const posts =
      await CommunityPost.find()
        .sort({
          createdAt: -1,
        })
        .lean();

    return NextResponse.json({
      success: true,
      posts,
      currentUserId:
        session?.user?.id || null,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}