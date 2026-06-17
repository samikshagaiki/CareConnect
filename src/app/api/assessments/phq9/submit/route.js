import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import AssessmentTemplate from "@/models/AssessmentTemplate";
import AssessmentResponse from "@/models/AssessmentResponse";

function getSeverity(score) {
  if (score <= 4)
    return "Minimal";

  if (score <= 9)
    return "Mild";

  if (score <= 14)
    return "Moderate";

  if (score <= 19)
    return "Moderately Severe";

  return "Severe";
}

export async function POST(
  request
) {
  try {
    const session =
      await getServerSession(
        authOptions
      );

    await connectDB();

    const body =
      await request.json();

    const template =
      await AssessmentTemplate.findOne({
        title: "PHQ-9",
      });

    const score =
      body.answers.reduce(
        (sum, value) =>
          sum + value,
        0
      );

    const severity =
      getSeverity(score);

    const response =
      await AssessmentResponse.create({
        templateId:
          template._id,

        patientId:
          session.user.id,

        answers:
          body.answers,

        score,

        severity,

        status:
          "completed",

        submittedAt:
          new Date(),
      });

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