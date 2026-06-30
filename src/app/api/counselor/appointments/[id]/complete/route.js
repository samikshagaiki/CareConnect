import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import Appointment from "@/models/Appointment";
import { createNotification } from "@/lib/createNotification";

export async function PATCH(
  request,
  { params }
) {
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

    const {
      id,
    } = await params;

    const appointment =
      await Appointment.findById(
        id
      );

    if (!appointment) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Appointment not found",
        },
        {
          status: 404,
        }
      );
    }

    appointment.sessionStatus =
      "completed";

    appointment.completedAt =
      new Date();

    await appointment.save();

    await createNotification({
  userId: appointment.patientId,

  type: "appointment",

  title: "Appointment Completed",

  message:
    "Your appointment has been marked as completed.",

  referenceId:
    appointment._id.toString(),
});

    return NextResponse.json({
      success: true,
      message:
        "Appointment marked completed",
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