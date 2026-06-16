import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import CounselorProfile from "@/models/CounselorProfile";

export async function GET() {
  try {
    const session =
      await getServerSession(
        authOptions
      );

    if (
      !session ||
      session.user.role !== "admin"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 403,
        }
      );
    }

    await connectDB();

    const counselors =
      await CounselorProfile.find({
        isApproved: false,
      }).sort({
        createdAt: -1,
      });

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