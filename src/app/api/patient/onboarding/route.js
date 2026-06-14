import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import User from "@/models/User";
import PatientProfile from "@/models/PatientProfile";

export async function POST(request) {
  try {
    const session = await getServerSession(
      authOptions
    );

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    await connectDB();

    const body = await request.json();

    const existingProfile =
      await PatientProfile.findOne({
        userId: session.user.id,
      });

    if (existingProfile) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Profile already exists",
        },
        {
          status: 400,
        }
      );
    }

    const profile =
      await PatientProfile.create({
        userId: session.user.id,

        anonymousName:
          body.anonymousName,

        age: body.age,

        gender: body.gender,

        occupation:
          body.occupation,

        preferredCounselorGender:
          body.preferredCounselorGender,

        preferredLanguage:
          body.preferredLanguage,

        primaryConcerns:
          body.primaryConcerns,

        emergencyContacts:
          body.emergencyContacts,
      });

    await User.findByIdAndUpdate(
      session.user.id,
      {
        profileCompleted: true,
      }
    );

    return NextResponse.json({
      success: true,
      profile,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}