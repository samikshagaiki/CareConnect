import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import AssessmentAssignment from "@/models/AssessmentAssignment";
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
        "patient"
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
      await AssessmentAssignment.find({
        patientId:
          session.user.id,

        status:
          "assigned",
      }).lean();

    const assessments =
      await Promise.all(
        assignments.map(
          async (
            assignment
          ) => {
            const template =
              await AssessmentTemplate.findById(
                assignment.templateId
              ).lean();

            return {
              assignmentId:
                assignment._id,

              templateId:
                template._id,

              title:
                template.title,

              description:
                template.description,

              questionCount:
                template.questions
                  ?.length || 0,
            };
          }
        )
      );

    return NextResponse.json({
      success: true,
      assessments,
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