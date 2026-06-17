import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import AssessmentAssignment from "@/models/AssessmentAssignment";
import AssessmentResponse from "@/models/AssessmentResponse";

export async function POST(
  request,
  context
) {
  try {
    const session =
      await getServerSession(
        authOptions
      );

    await connectDB();

    const body =
      await request.json();

    const { assignmentId } =
      await context.params;

    const assignment =
      await AssessmentAssignment.findById(
        assignmentId
      );

    if (
  assignment.status ===
  "completed"
) {
  return NextResponse.json(
    {
      success: false,
      message:
        "Assessment already submitted",
    },
    {
      status: 400,
    }
  );
}

    if (!assignment) {
      return NextResponse.json(
        {
          success: false,
        },
        {
          status: 404,
        }
      );
    }

    
    await AssessmentResponse.create({
      templateId:
        assignment.templateId,

      patientId:
        session.user.id,

      assignedBy:
        assignment.counselorId,

      answers:
        body.answers,

      status:
        "completed",

      submittedAt:
        new Date(),
    });

    assignment.status =
      "completed";

    await assignment.save();

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