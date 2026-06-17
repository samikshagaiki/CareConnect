import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import AssessmentTemplate
  from "@/models/AssessmentTemplate";

export async function POST(
  request
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
        },
        {
          status: 403,
        }
      );
    }

    await connectDB();

    const body =
      await request.json();

    const assessment =
      await AssessmentTemplate.create({
        title: body.title,

        description:
          body.description,

        type: "custom",

        createdBy:
          session.user.id,

        questions:
          body.questions,

        scoringEnabled:
          false,
      });

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