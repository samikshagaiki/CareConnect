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

    const now = new Date();

const appointments =
  await Appointment.find({
    counselorId: session.user.id,
    appointmentDate: {
      $gte: now,
    },
    status: "approved",
  });

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
      },
      {
        status: 500,
      }
    );
  }
}