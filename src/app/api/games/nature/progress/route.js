import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import GameProgress from "@/models/GameProgress";
import DailyChallenge from "@/models/DailyChallenge";

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
      completedTasks,
    } = await request.json();

    const today =
      new Date()
        .toISOString()
        .split("T")[0];

    const challenge =
      await DailyChallenge.findOne({
        game: "nature",
        date: today,
      });

    if (!challenge) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Challenge not found",
        },
        {
          status: 404,
        }
      );
    }

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

    // today's history

    const todayHistory =
      progress.nature.get(today) || {
        completedTasks: [],
        completed: false,
        earnedXP: 0,
      };

    // update checked tasks

    todayHistory.completedTasks =
      completedTasks;

    let justCompleted = false;

    // completed for first time?

   if (
  completedTasks.length === challenge.tasks.length &&
  !todayHistory.completed
) {
  justCompleted = true;

  todayHistory.completed = true;

  todayHistory.completedAt = new Date();

  todayHistory.earnedXP = challenge.rewardXP;

  // --------------------------
  // XP
  // --------------------------

  progress.xp += challenge.rewardXP;

  // --------------------------
  // Level
  // Every 100 XP = +1 level
  // --------------------------

  progress.level =
    Math.floor(progress.xp / 100) + 1;
}


// --------------------------
// STREAK
// --------------------------

const yesterday = new Date();

yesterday.setDate(
  yesterday.getDate() - 1
);

const yesterdayString =
  yesterday
    .toISOString()
    .split("T")[0];

if (!progress.lastPlayedDate) {

  progress.streak = 1;

}

else if (
  progress.lastPlayedDate ===
  yesterdayString
) {

  progress.streak += 1;

}

else if (
  progress.lastPlayedDate ===
  today
) {

  // already counted today

}

else {

  progress.streak = 1;

}

progress.lastPlayedDate =
  today;

progress.longestStreak =
  Math.max(
    progress.longestStreak,
    progress.streak
  );

  // --------------------------
// BADGES
// --------------------------

const hasBadge = (id) =>
  progress.badges.some(
    (badge) => badge.id === id
  );

// First Hunt

// --------------------------
// First Hunt Badge
// --------------------------

if (
  !hasBadge("first-hunt")
) {

  progress.badges.push({

    id: "first-hunt",

    title: "🌱 First Explorer",

    icon: "leaf",

    unlockedAt: new Date(),

  });

}

// 7 Day Streak

if (
  progress.streak >= 7 &&
  !hasBadge("nature-lover")
) {

  progress.badges.push({

    id: "nature-lover",

    title: "🔥 Nature Lover",

    icon: "flame",

    unlockedAt: new Date(),

  });

}

// Level 5

if (
  progress.level >= 5 &&
  !hasBadge("wellness-explorer")
) {

  progress.badges.push({

    id: "wellness-explorer",

    title: "⭐ Wellness Explorer",

    icon: "star",

    unlockedAt: new Date(),

  });

}


    progress.nature.set(
      today,
      todayHistory
    );

    await progress.save();

   return NextResponse.json({
  success: true,

  today: todayHistory,

  xp: progress.xp,

  level: progress.level,

  streak: progress.streak,

  badges: progress.badges,

  justCompleted,
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