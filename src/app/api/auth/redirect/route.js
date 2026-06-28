import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import PatientProfile from "@/models/PatientProfile";
import CounselorProfile from "@/models/CounselorProfile";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        {
          success: false,
        },
        {
          status: 401,
        }
      );
    }

    await connectDB();

    //---------------------------------------
    // ADMIN
    //---------------------------------------

    if (session.user.role === "admin") {
      return NextResponse.json({
        success: true,
        redirectTo: "/admin/dashboard",
      });
    }

    //---------------------------------------
    // PATIENT
    //---------------------------------------

    if (session.user.role === "patient") {
      const profile =
        await PatientProfile.findOne({
          userId: session.user.id,
        });

      if (!profile) {
        return NextResponse.json({
          success: true,
          redirectTo: "/patient/onboarding",
        });
      }

      return NextResponse.json({
        success: true,
        redirectTo: "/patient/dashboard",
      });
    }

    //---------------------------------------
    // COUNSELOR
    //---------------------------------------

    if (session.user.role === "counselor") {
      const profile =
        await CounselorProfile.findOne({
          userId: session.user.id,
        });

      // First Login

      if (!profile) {
        return NextResponse.json({
          success: true,
          redirectTo: "/counselor/onboarding",
        });
      }

      // Waiting Approval

      if (!profile.isApproved) {
        return NextResponse.json({
          success: true,
          redirectTo:
            "/counselor/pending-approval",
        });
      }

      // Approved

      return NextResponse.json({
        success: true,
        redirectTo:
          "/counselor/dashboard",
      });
    }

    //---------------------------------------

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 400,
      }
    );

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