import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Appointment from "@/models/Appointment";
import { createNotification } from "@/lib/createNotification";

export async function PATCH(request, context) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = await context.params;

    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return NextResponse.json(
        { success: false, message: "Appointment not found" },
        { status: 404 }
      );
    }

    // Verify user is either the patient or the counselor
    const isPatient = appointment.patientId.toString() === session.user.id;
    const isCounselor = appointment.counselorId.toString() === session.user.id;

    if (!isPatient && !isCounselor) {
      return NextResponse.json(
        { success: false, message: "Forbidden" },
        { status: 403 }
      );
    }

    appointment.status = "cancelled";
    appointment.sessionStatus = "cancelled";
    await appointment.save();

    // Notify the other party
    const targetUserId = isPatient ? appointment.counselorId : appointment.patientId;
    const cancelledBy = isPatient ? "patient" : "counselor";

    await createNotification({
      userId: targetUserId,
      type: "appointment",
      title: "Appointment Cancelled",
      message: `The scheduled appointment was cancelled by the ${cancelledBy}.`,
      referenceId: appointment._id.toString(),
    });

    return NextResponse.json({
      success: true,
      message: "Appointment cancelled successfully",
    });
  } catch (error) {
    console.error("Cancel appointment error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to cancel appointment" },
      { status: 500 }
    );
  }
}
