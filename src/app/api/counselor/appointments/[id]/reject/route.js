import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Appointment from "@/models/Appointment";

export async function PATCH(
  request,
  context
) {
  try {
    await connectDB();

    const { id } =
      await context.params;

    await Appointment.findByIdAndUpdate(
      id,
      {
        status: "rejected",
      }
    );

    return NextResponse.json({
      success: true,
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