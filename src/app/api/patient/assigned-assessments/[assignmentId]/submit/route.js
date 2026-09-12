import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import AssessmentAssignment from "@/models/AssessmentAssignment";
import AssessmentResponse from "@/models/AssessmentResponse";

import { createNotification } from "@/lib/createNotification";

export async function POST(request, context) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "patient") {
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

    const body = await request.json();
    const { assignmentId } = await context.params;

    const assignment = await AssessmentAssignment.findOne({
      _id: assignmentId,
      patientId: session.user.id,
    });

    if (!assignment) {
      return NextResponse.json(
        {
          success: false,
          message: "Assignment not found",
        },
        {
          status: 404,
        }
      );
    }

    if (assignment.status === "completed") {
      return NextResponse.json(
        {
          success: false,
          message: "Assessment already submitted",
        },
        {
          status: 400,
        }
      );
    }

    const response = await AssessmentResponse.create({
      templateId: assignment.templateId,
      patientId: session.user.id,
      assignedBy: assignment.counselorId,
      answers: body.answers || [],
      status: "completed",
      submittedAt: new Date(),
    });

    assignment.status = "completed";
    await assignment.save();

    if (assignment.counselorId) {
      await createNotification({
        userId: assignment.counselorId,
        type: "assessment",
        title: "Assessment Submitted",
        message: "A patient has submitted an assessment.",
        referenceId: response._id.toString(),
      });
    }

    return NextResponse.json({
      success: true,
      responseId: response._id.toString(),
    });
  } catch (error) {
    console.error("Assessment submit error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit assessment",
      },
      {
        status: 500,
      }
    );
  }
}