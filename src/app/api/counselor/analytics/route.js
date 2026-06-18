import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import CounselorAssignment from "@/models/CounselorAssignment";
import AssessmentAssignment from "@/models/AssessmentAssignment";
import AssessmentResponse from "@/models/AssessmentResponse";
import Appointment from "@/models/Appointment";

export async function GET() {
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

    await connectDB();

    const assignedPatients =
      await CounselorAssignment.countDocuments({
        counselorId:
          session.user.id,

        status:
          "accepted",
      });

    const pendingAssessments =
      await AssessmentAssignment.countDocuments({
        counselorId:
          session.user.id,

        status:
          "pending",
      });

    const completedAssessments =
      await AssessmentResponse.countDocuments({
        assignedBy:
          session.user.id,
      });

    const upcomingSessions =
      await Appointment.countDocuments({
        counselorId:
          session.user.id,

        status:
          "accepted",
      });

    return NextResponse.json({
      success: true,

      assignedPatients,

      pendingAssessments,

      completedAssessments,

      upcomingSessions,
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