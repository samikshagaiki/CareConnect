import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import DailyChallenge from "@/models/DailyChallenge";
import GameProgress from "@/models/GameProgress";

import { generateNatureChallenge } from "@/lib/ai/generateNatureChallenge";
import { fallbackNature } from "@/lib/ai/fallbackNature";

export async function GET() {
  try {
    const session =
      await getServerSession(authOptions);

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

    const today =
      new Date()
        .toISOString()
        .split("T")[0];

    // -----------------------------
    // Game Progress
    // -----------------------------

    let progress =
      await GameProgress.findOne({
        userId: session.user.id,
      });

    if (!progress) {
      progress =
        await GameProgress.create({
          userId: session.user.id,
        });
    }

    // -----------------------------
    // Today's Challenge
    // -----------------------------

    let challenge =
      await DailyChallenge.findOne({
        game: "nature",
        date: today,
      });

    if (!challenge) {

      let aiChallenge =
        await generateNatureChallenge();

      if (!aiChallenge) {
        aiChallenge =
          fallbackNature;
      }

      challenge =
        await DailyChallenge.create({
          game: "nature",

          date: today,

          title:
            aiChallenge.title,

          description:
            aiChallenge.description,

          rewardXP:
            aiChallenge.rewardXP,

          tasks:
            aiChallenge.tasks,
        });
    }

    // -----------------------------
    // Today's Progress
    // -----------------------------

    const todayProgress =
      progress.nature.get(today) || {

        completedTasks: [],

        completed: false,

        earnedXP: 0,

      };

    return NextResponse.json({

      success: true,

      challenge,

      progress: {

        xp:
          progress.xp,

        level:
          progress.level,

        streak:
          progress.streak,

        badges:
          progress.badges,

        today:
          todayProgress,

      },

    });

  }

  catch (error) {

    console.error(error);

    return NextResponse.json(

      {
        success: false,

        message:
          error.message,
      },

      {
        status: 500,
      }

    );

  }
}