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
    const body = await request.json();

    if (!body.appointmentDate) {
      return NextResponse.json(
        { success: false, message: "New appointment date is required" },
        { status: 400 }
      );
    }

    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return NextResponse.json(
        { success: false, message: "Appointment not found" },
        { status: 404 }
      );
    }

    const isPatient = appointment.patientId.toString() === session.user.id;
    const isCounselor = appointment.counselorId.toString() === session.user.id;

    if (!isPatient && !isCounselor) {
      return NextResponse.json(
        { success: false, message: "Forbidden" },
        { status: 403 }
      );
    }

    appointment.appointmentDate = new Date(body.appointmentDate);
    if (body.reason) {
      appointment.reason = body.reason;
    }
    // If patient reschedules, mark as pending counselor re-confirmation
    // If counselor reschedules, mark as accepted
    appointment.status = isPatient ? "pending" : "accepted";
    appointment.sessionStatus = "upcoming";
    await appointment.save();

    const targetUserId = isPatient ? appointment.counselorId : appointment.patientId;
    const rescheduledBy = isPatient ? "patient" : "counselor";

    await createNotification({
      userId: targetUserId,
      type: "appointment",
      title: "Appointment Rescheduled",
      message: `The appointment has been rescheduled by the ${rescheduledBy} to ${new Date(
        appointment.appointmentDate
      ).toLocaleString()}.`,
      referenceId: appointment._id.toString(),
    });

    return NextResponse.json({
      success: true,
      message: "Appointment rescheduled successfully",
      appointment,
    });
  } catch (error) {
    console.error("Reschedule appointment error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to reschedule appointment" },
      { status: 500 }
    );
  }
}
