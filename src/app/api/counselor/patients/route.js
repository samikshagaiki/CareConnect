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

    const assignments =
      await CounselorAssignment.find({
        counselorId:
          session.user.id,

        status: "accepted",
      }).lean();

    const patients =
      await Promise.all(
        assignments.map(
          async (
            assignment
          ) => {
            return await PatientProfile.findOne({
              userId:
                assignment.patientId,
            }).lean();
          }
        )
      );

    return NextResponse.json({
      success: true,
      patients,
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