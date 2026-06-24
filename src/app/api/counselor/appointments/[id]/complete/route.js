import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import Appointment from "@/models/Appointment";

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