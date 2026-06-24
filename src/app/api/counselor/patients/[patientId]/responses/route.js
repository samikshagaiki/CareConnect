import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import AssessmentResponse from "@/models/AssessmentResponse";

export async function GET(
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
      session.user.role !==
        "counselor"
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

    const params =
      await context.params;

    await connectDB();

    const responses =
      await AssessmentResponse.find({
        patientId:
          params.patientId,
      })
        .populate(
          "templateId"
        )
        .sort({
          submittedAt: -1,
        });

    return NextResponse.json({
      success: true,
      responses,
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