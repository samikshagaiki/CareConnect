import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import CounselorProfile from "@/models/CounselorProfile";

export async function PATCH(
  request,
  context
) {
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
        },
        {
          status: 403,
        }
      );
    }

    await connectDB();

    const { id } =
      await context.params;

    await CounselorProfile.findByIdAndUpdate(
      id,
      {
        isApproved: true,

        approvedBy:
          session.user.id,

        approvedAt:
          new Date(),
      }
    );

    return NextResponse.json({
      success: true,
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