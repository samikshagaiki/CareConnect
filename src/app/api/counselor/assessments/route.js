import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import AssessmentResponse from "@/models/AssessmentResponse";
import PatientProfile from "@/models/PatientProfile";
import CounselorAssignment from "@/models/CounselorAssignment";
import AssessmentTemplate from "@/models/AssessmentTemplate";

export async function GET() {
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

    const assignments =
  await CounselorAssignment.find({
    counselorId:
      session.user.id,

    status: "accepted",
  }).lean();

const patientIds =
  assignments.map(
    (assignment) =>
      assignment.patientId
  );

    const responses =
  await AssessmentResponse.find({
    status: "completed",

    patientId: {
      $in: patientIds,
    },
  }).lean();

    const enriched =
      await Promise.all(
        responses.map(
          async (
            response
          ) => {
            const patient =
              await PatientProfile.findOne({
                userId:
                  response.patientId,
              }).lean();

              const template =
  await AssessmentTemplate.findById(
    response.templateId
  ).lean();

            return {
              ...response,
              patient,
                template,
            };
          }

          
        )
      );

    return NextResponse.json({
      success: true,
      assessments:
        enriched,
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