import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

import AssessmentResponse from "@/models/AssessmentResponse";

export async function PATCH(
  request,
  context
) {
  try {
    await connectDB();

    const { responseId } =
      await context.params;

    const body =
      await request.json();

    const response =
      await AssessmentResponse.findByIdAndUpdate(
        responseId,
        {
          counselorNotes:
            body.notes,
        },
        {
          new: true,
        }
      );

    return NextResponse.json({
      success: true,
      response,
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