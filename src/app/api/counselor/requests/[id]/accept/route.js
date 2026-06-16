import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import CounselorAssignment from "@/models/CounselorAssignment";

export async function PATCH(
  request,
  context
) {
  try {
    await connectDB();

    const { id } =
      await context.params;

    await CounselorAssignment.findByIdAndUpdate(
      id,
      {
        status: "accepted",
        assignedAt:
          new Date(),
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