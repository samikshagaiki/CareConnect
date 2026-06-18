import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import AssessmentResponse from "@/models/AssessmentResponse";
import Appointment from "@/models/Appointment";
import PatientProfile from "@/models/PatientProfile";
import CounselorProfile from "@/models/CounselorProfile";

export async function GET() {
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

    const completedAssessments =
      await AssessmentResponse.countDocuments({
        patientId:
          session.user.id,
      });

    const latestPhq9 =
      await AssessmentResponse.findOne({
        patientId:
          session.user.id,

        score: {
          $gt: 0,
        },
      })
        .sort({
          submittedAt: -1,
        })
        .lean();

    const upcomingAppointment =
      await Appointment.findOne({
        patientId:
          session.user.id,

        status: "accepted",
      })
        .sort({
          appointmentDate: 1,
        })
        .lean();

    const profile =
      await PatientProfile.findOne({
        userId:
          session.user.id,
      }).lean();

    let counselor = null;

    if (
      profile?.assignedCounselor
    ) {
      counselor =
        await CounselorProfile.findOne({
          userId:
            profile.assignedCounselor,
        })
          .select(
            "fullName specialization"
          )
          .lean();
    }

    return NextResponse.json({
      success: true,

      completedAssessments,

      latestPhq9,

      upcomingAppointment,

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