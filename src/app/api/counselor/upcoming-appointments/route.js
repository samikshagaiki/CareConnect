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
        },
        {
          status: 403,
        }
      );
    }

    await connectDB();

    // Auto mark expired appointments as missed

    await Appointment.updateMany(
      {
        appointmentDate: {
          $lt: new Date(),
        },

        sessionStatus:
          "upcoming",
      },
      {
        $set: {
          sessionStatus:
            "missed",
        },
      }
    );

    // Fetch upcoming appointments (both pending confirmation and accepted)
    const appointments = await Appointment.find({
      counselorId: session.user.id,
      status: { $in: ["pending", "accepted"] },
      sessionStatus: "upcoming",
      appointmentDate: {
        $gte: new Date(),
      },
    })
      .sort({ appointmentDate: 1 })
      .lean();

    const enriched = await Promise.all(
      appointments.map(async (appointment) => {
        const patient = await PatientProfile.findOne({
          userId: appointment.patientId,
        }).lean();

        return {
          ...appointment,
          patient: patient || {
            anonymousName: "Patient",
            userId: appointment.patientId,
          },
        };
      })
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
      },
      {
        status: 500,
      }
    );
  }
}