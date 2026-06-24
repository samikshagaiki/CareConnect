import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

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
          message: "Unauthorized",
        },
        {
          status: 403,
        }
      );
    }

    await connectDB();

    const now = new Date();

    // Mark all past accepted/upcoming appointments as missed

    await Appointment.updateMany(
      {
        patientId:
          session.user.id,

        appointmentDate: {
          $lt: now,
        },

        status: {
          $in: ["accepted"],
        },

        sessionStatus: {
          $nin: [
            "completed",
            "missed",
          ],
        },
      },
      {
        $set: {
          sessionStatus:
            "missed",
        },
      }
    );

    const appointments =
      await Appointment.find({
        patientId:
          session.user.id,
      })
        .populate(
          "counselorId"
        )
        .sort({
          appointmentDate:
            -1,
        })
        .lean();

    return NextResponse.json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}