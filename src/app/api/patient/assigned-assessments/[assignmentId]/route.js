import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import AssessmentAssignment from "@/models/AssessmentAssignment";
import AssessmentTemplate from "@/models/AssessmentTemplate";

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

    const { assignmentId } =
      await context.params;

    const assignment =
      await AssessmentAssignment.findById(
        assignmentId
      ).lean();

    if (!assignment) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Assessment not found",
        },
        {
          status: 404,
        }
      );
    }

    const template =
      await AssessmentTemplate.findById(
        assignment.templateId
      ).lean();

    return NextResponse.json({
      success: true,
      assignment,
      template,
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