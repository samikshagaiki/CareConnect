import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import Journal from "@/models/Journal";

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
        { status: 401 }
      );
    }

    await connectDB();

    const body =
      await request.json();

    const journal =
      await Journal.create({
        userId:
          session.user.id,

        title: body.title,

        content:
          body.content,

        moodTag:
          body.moodTag,
      });

    return NextResponse.json({
      success: true,
      journal,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
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
        { status: 401 }
      );
    }

    await connectDB();

    const journals =
      await Journal.find({
        userId:
          session.user.id,
      })
        .sort({
          createdAt: -1,
        })
        .lean();

    return NextResponse.json({
      success: true,
      journals,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong",
      },
      { status: 500 }
    );
  }
}