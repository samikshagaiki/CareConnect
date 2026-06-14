import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import MoodEntry from "@/models/MoodEntry";

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

    const moodEntry =
      await MoodEntry.create({
        userId:
          session.user.id,

        mood: body.mood,

        note: body.note,
      });

    return NextResponse.json({
      success: true,
      moodEntry,
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

    const moodEntries =
      await MoodEntry.find({
        userId:
          session.user.id,
      })
        .sort({
          createdAt: -1,
        })
        .lean();

    return NextResponse.json({
      success: true,
      moodEntries,
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