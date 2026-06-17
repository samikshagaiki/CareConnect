import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import AssessmentResponse from "@/models/AssessmentResponse";
import AssessmentTemplate from "@/models/AssessmentTemplate";
import PatientProfile from "@/models/PatientProfile";
import CounselorAssignment from "@/models/CounselorAssignment";

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
        patientId: {
          $in: patientIds,
        },
      })
        .sort({
          submittedAt: -1,
        })
        .lean();

    const result =
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
      responses: result,
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