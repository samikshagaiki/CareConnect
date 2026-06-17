import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import AssessmentTemplate from "@/models/AssessmentTemplate";

export async function GET() {
  try {
    await connectDB();

    const assessment =
      await AssessmentTemplate.findOne({
        title: "PHQ-9",
      }).lean();

    return NextResponse.json({
      success: true,
      assessment,
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