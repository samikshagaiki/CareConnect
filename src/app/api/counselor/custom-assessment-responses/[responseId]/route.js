import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

import AssessmentResponse from "@/models/AssessmentResponse";
import AssessmentTemplate from "@/models/AssessmentTemplate";
import PatientProfile from "@/models/PatientProfile";

export async function GET(
  request,
  context
) {
  try {
    await connectDB();

    const { responseId } =
      await context.params;

    const response =
      await AssessmentResponse.findById(
        responseId
      ).lean();

    if (!response) {
      return NextResponse.json(
        {
          success: false,
        },
        {
          status: 404,
        }
      );
    }

    const patient =
      await PatientProfile.findOne({
        userId:
          response.patientId,
      }).lean();

    const template =
      await AssessmentTemplate.findById(
        response.templateId
      ).lean();

    return NextResponse.json({
      success: true,

      response: {
        ...response,
        patient,
        template,
      },
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