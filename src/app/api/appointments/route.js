import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import Appointment from "@/models/Appointment";
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

    const body =
      await request.json();

    const assignment =
      await CounselorAssignment.findOne({
        patientId:
          session.user.id,

        status: "accepted",
      });

    if (!assignment) {
      return NextResponse.json(
        {
          success: false,
          message:
            "No counselor assigned.",
        },
        {
          status: 400,
        }
      );
    }

    const appointment =
      await Appointment.create({
        patientId:
          session.user.id,

        counselorId:
          assignment.counselorId,

        appointmentDate:
          body.appointmentDate,

        reason: body.reason,
      });

    return NextResponse.json({
      success: true,
      appointment,
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