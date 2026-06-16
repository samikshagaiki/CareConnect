import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import CounselorProfile from "@/models/CounselorProfile";

export async function GET() {
  try {
    await connectDB();

    const counselors =
      await CounselorProfile.find({
        isApproved: true,
      })
        .select(
          `
          userId
          fullName
          gender
          specialization
          experience
          bio
          languages
          ageGroups
        `
        )
        .lean();

    return NextResponse.json({
      success: true,
      counselors,
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