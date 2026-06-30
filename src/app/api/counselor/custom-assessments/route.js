import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import AssessmentTemplate from "@/models/AssessmentTemplate";
import AssessmentAssignment from "@/models/AssessmentAssignment";

import { createNotification } from "@/lib/createNotification";

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

    const template =
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

   const assignment =
  await AssessmentAssignment.create({
    templateId:
      template._id,

    counselorId:
      session.user.id,

    patientId:
      body.patientId,
  });

  await createNotification({
  userId:
    body.patientId,

  type:
    "assessment",

  title:
    "New Assessment",

  message:
    "Your counselor has assigned you a new assessment.",

  referenceId:
    assignment._id.toString(),
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