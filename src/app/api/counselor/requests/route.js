import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import CounselorAssignment from "@/models/CounselorAssignment";
import PatientProfile from "@/models/PatientProfile";

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

    const requests =
      await CounselorAssignment.find({
        counselorId:
          session.user.id,

        status: "pending",
      }).lean();

    const enrichedRequests =
      await Promise.all(
        requests.map(
          async (
            request
          ) => {
            const profile =
              await PatientProfile.findOne({
                userId:
                  request.patientId,
              }).lean();

            return {
              ...request,

              patient:
                profile,
            };
          }
        )
      );

    return NextResponse.json({
      success: true,
      requests:
        enrichedRequests,
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