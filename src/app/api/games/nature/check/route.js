import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import NatureProgress from "@/models/NatureProgress";

export async function PATCH(request) {

  try {

    const session =
      await getServerSession(authOptions);

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

    const {
      challengeDate,
      completedTasks,
    } = await request.json();

    const progress =
      await NatureProgress.findOneAndUpdate(

        {
          userId:
            session.user.id,

          challengeDate,
        },

        {
          completedTasks,

          completed:
            completedTasks.length >= 10,
        },

        {
          new: true,
        }

      );

    return NextResponse.json({

      success: true,

      progress,

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