
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import AssessmentResponse from "@/models/AssessmentResponse";
import AssessmentReport from "@/models/AssessmentReport";

import { generateAssessmentReport } from "@/lib/ai/generateAssessmentReport";

async function getAuthorizedResponse(responseId, counselorId) {
  if (!mongoose.Types.ObjectId.isValid(responseId)) {
    return null;
  }

  return AssessmentResponse.findOne({
    _id: responseId,
    assignedBy: counselorId,
    status: "completed",
  }).populate("templateId");
}

// GET: Retrieve an existing AI report
export async function GET(request, context) {
  try {
    const session = await getServerSession(authOptions);

    if (
      !session ||
      session.user.role !== "counselor"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 403 }
      );
    }

    await connectDB();

    const { responseId } = await context.params;

    const response = await getAuthorizedResponse(
      responseId,
      session.user.id
    );

    if (!response) {
      return NextResponse.json(
        {
          success: false,
          message: "Assessment response not found",
        },
        { status: 404 }
      );
    }

    const report = await AssessmentReport.findOne({
      responseId: response._id,
      counselorId: session.user.id,
    }).lean();

    return NextResponse.json({
      success: true,
      report: report || null,
    });
  } catch (error) {
    console.error("AI report retrieval error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to retrieve assessment report",
      },
      { status: 500 }
    );
  }
}

// POST: Generate an AI report
export async function POST(request, context) {
  try {
    const session = await getServerSession(authOptions);

    if (
      !session ||
      session.user.role !== "counselor"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 403 }
      );
    }

    await connectDB();

    const { responseId } = await context.params;

    const response = await getAuthorizedResponse(
      responseId,
      session.user.id
    );

    if (!response) {
      return NextResponse.json(
        {
          success: false,
          message: "Assessment response not found",
        },
        { status: 404 }
      );
    }

    if (!response.templateId) {
      return NextResponse.json(
        {
          success: false,
          message: "Assessment template not found",
        },
        { status: 404 }
      );
    }

    // Return an existing report instead of generating it again.
    const existingReport = await AssessmentReport.findOne({
      responseId: response._id,
    }).lean();

    if (existingReport) {
      if (
        existingReport.counselorId.toString() !==
        session.user.id
      ) {
        return NextResponse.json(
          {
            success: false,
            message: "Unauthorized",
          },
          { status: 403 }
        );
      }

      return NextResponse.json({
        success: true,
        report: existingReport,
        alreadyGenerated: true,
      });
    }

    const result = await generateAssessmentReport({
      template: response.templateId,
      answers: response.answers,
      score: response.score,
      severity: response.severity,
    });

    let savedReport;

    try {
      savedReport = await AssessmentReport.create({
        responseId: response._id,
        patientId: response.patientId,
        counselorId: session.user.id,
        report: result.report,
        model: result.model,
        generatedAt: new Date(),
      });
    } catch (saveError) {
      // Handle simultaneous requests that may have generated
      // the same report at nearly the same time.
      if (saveError.code === 11000) {
        savedReport = await AssessmentReport.findOne({
          responseId: response._id,
          counselorId: session.user.id,
        });
      } else {
        throw saveError;
      }
    }

    if (!savedReport) {
      throw new Error("Failed to save AI report");
    }

    return NextResponse.json({
      success: true,
      report: savedReport,
      alreadyGenerated: false,
    });
  } catch (error) {
    console.error("AI report generation error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to generate assessment report. Please try again.",
      },
      { status: 500 }
    );
  }
}
