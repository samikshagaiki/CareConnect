import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import CounselorAssignment from "@/models/CounselorAssignment";
import CounselorProfile from "@/models/CounselorProfile";

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
        },
        {
          status: 401,
        }
      );
    }

    await connectDB();

    const assignment =
      await CounselorAssignment.findOne({
        patientId:
          session.user.id,

        status: "accepted",
      });

    if (!assignment) {
      return NextResponse.json({
        success: true,
        counselor: null,
      });
    }

    const counselor =
      await CounselorProfile.findOne({
        userId:
          assignment.counselorId,
      }).lean();

    return NextResponse.json({
      success: true,
      counselor,
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