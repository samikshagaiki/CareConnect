import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import NatureChallenge from "@/models/NatureChallenge";
import NatureProgress from "@/models/NatureProgress";

import { generateNatureChallenge } from "@/lib/games/generateNatureChallenge";

export async function GET() {

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

    const today =
      new Date()
        .toISOString()
        .split("T")[0];

    let challenge =
      await NatureChallenge.findOne({
        date: today,
      });

    if (!challenge) {

      challenge =
        await NatureChallenge.create({

          date: today,

          title:
            "Today's Nature Hunt",

          tasks:
            generateNatureChallenge(),

        });

    }

    let progress =
      await NatureProgress.findOne({

        userId:
          session.user.id,

        challengeDate:
          today,

      });

    if (!progress) {

      progress =
        await NatureProgress.create({

          userId:
            session.user.id,

          challengeDate:
            today,

          completedTasks: [],

        });

    }

    return NextResponse.json({

      success: true,

      challenge,

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