import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import MoodEntry from "@/models/MoodEntry";

export async function GET() {
  try {
    const session =
      await getServerSession(
        authOptions
      );

    await connectDB();

    const moods =
      await MoodEntry.find({
        userId:
          session.user.id,
      })
        .sort({
          createdAt: -1,
        })
        .limit(7)
        .lean();

    return NextResponse.json({
      success: true,
      moods: moods.reverse(),
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