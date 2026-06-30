import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Appointment from "@/models/Appointment";
import { createNotification } from "@/lib/createNotification";

export async function PATCH(
  request,
  context
) {
  try {
    await connectDB();

    const { id } =
      await context.params;
      
const appointment =
  await Appointment.findByIdAndUpdate(
    id,
    {
      status: "rejected",
    },
    {
      new: true,
    }
  );

await createNotification({
  userId: appointment.patientId,

  type: "appointment",

  title: "Appointment Rejected",

  message:
    "Your appointment request was rejected.",

  referenceId:
    appointment._id.toString(),
});

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