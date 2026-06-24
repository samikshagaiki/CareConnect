import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import Appointment from "@/models/Appointment";
import PatientProfile from "@/models/PatientProfile";

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
          message: "Unauthorized",
        },
        {
          status: 403,
        }
      );
    }

    await connectDB();

    const now = new Date();

    // Mark old accepted appointments as missed

    await Appointment.updateMany(
      {
        counselorId:
          session.user.id,

        appointmentDate: {
          $lt: now,
        },

        status: "accepted",

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
        counselorId:
          session.user.id,
      })
        .sort({
          appointmentDate: -1,
        })
        .lean();

    const enriched =
      await Promise.all(
        appointments.map(
          async (
            appointment
          ) => {
            const patient =
              await PatientProfile.findOne({
                userId:
                  appointment.patientId,
              }).lean();

            return {
              ...appointment,
              patient,
            };
          }
        )
      );

    return NextResponse.json({
      success: true,
      appointments:
        enriched,
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