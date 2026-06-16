import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import CounselorAssignment from "@/models/CounselorAssignment";

export async function POST(
  request
) {
  try {
    const session =
      await getServerSession(
        authOptions
      );

    if (
      !session ||
      session.user.role !==
        "patient"
    ) {
      return NextResponse.json(
        {
          success: false,
        },
        {
          status: 403,
        }
      );
    }

    await connectDB();

    const { counselorId } =
      await request.json();

    const existing =
      await CounselorAssignment.findOne({
        patientId:
          session.user.id,
      });

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          message:
            "You already have a counselor request.",
        },
        {
          status: 400,
        }
      );
    }

    const assignment =
      await CounselorAssignment.create({
        patientId:
          session.user.id,

        counselorId,

        status: "pending",
      });

    return NextResponse.json({
      success: true,
      assignment,
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