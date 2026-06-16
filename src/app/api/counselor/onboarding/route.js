import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import User from "@/models/User";
import CounselorProfile from "@/models/CounselorProfile";

export async function POST(
  request
) {
  try {
    const session =
      await getServerSession(
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

    const body =
      await request.json();

    const existingProfile =
      await CounselorProfile.findOne({
        userId:
          session.user.id,
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

    await CounselorProfile.create({
      userId:
        session.user.id,

      fullName:
        body.fullName,

      gender:
        body.gender,

      specialization:
        body.specialization,

      experience:
        body.experience,

      bio:
        body.bio,

      languages:
        body.languages,

      ageGroups:
        body.ageGroups,
    });

    await User.findByIdAndUpdate(
      session.user.id,
      {
        profileCompleted:
          true,
      }
    );

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