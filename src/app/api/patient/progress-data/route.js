import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import MoodEntry from "@/models/MoodEntry";
import AssessmentResponse from "@/models/AssessmentResponse";
import AssessmentTemplate from "@/models/AssessmentTemplate";
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

    const moods =
      await MoodEntry.find({
        userId:
          session.user.id,
      })
        .sort({
          createdAt: 1,
        })
        .lean();

    const assessments =
      await AssessmentResponse.find({
        patientId:
          session.user.id,
      })
        .sort({
          submittedAt: -1,
        })
        .lean();

    const appointments =
      await Appointment.find({
        patientId:
          session.user.id,
      })
        .sort({
          appointmentDate: -1,
        })
        .lean();

    const assessmentHistory =
      await Promise.all(
        assessments.map(
          async (
            assessment
          ) => {
            const template =
              await AssessmentTemplate.findById(
                assessment.templateId
              ).lean();

            return {
              ...assessment,
              template,
            };
          }
        )
      );

    const counselorNotes =
      assessments.filter(
        (
          assessment
        ) =>
          assessment.counselorNotes
      );

    return NextResponse.json({
      success: true,

      moods,

      assessments:
        assessmentHistory,

      appointments,

      counselorNotes,
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