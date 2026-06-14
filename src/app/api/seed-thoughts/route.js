import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import PositiveThought from "@/models/PositiveThought";

import positiveThoughts from "@/data/positiveThoughts";

export async function GET() {
  try {
    await connectDB();

    // Remove existing thoughts
    await PositiveThought.deleteMany({});

    // Insert fresh thoughts
    await PositiveThought.insertMany(
      positiveThoughts
    );

    return NextResponse.json({
      success: true,
      message:
        "Positive thoughts seeded successfully",
      insertedCount:
        positiveThoughts.length,
    });
  } catch (error) {
    console.error(
      "Seed Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to seed positive thoughts",
      },
      {
        status: 500,
      }
    );
  }
}