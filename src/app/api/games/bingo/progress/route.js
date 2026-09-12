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
          success:false,
        },
        {
          status:401,
        }
      );

    }

    await connectDB();

    const {
      checkedCells,
    } = await request.json();

    const today =
      new Date()
        .toISOString()
        .split("T")[0];

    const challenge =
      await DailyChallenge.findOne({

        game:"bingo",

        date:today,

      });

    let progress =
      await GameProgress.findOne({

        userId:
          session.user.id,

      });

    if(!progress){

      progress =
        await GameProgress.create({

          userId:
            session.user.id,

        });

    }

    // ------------------------
    // Save checked cells
    // ------------------------

    progress.bingo.checkedCells.set(

      today,

      checkedCells,

    );

    // ------------------------
    // Calculate completed rows
    // ------------------------

    const winningLines = [

      [0,1,2,3,4],

      [5,6,7,8,9],

      [10,11,12,13,14],

      [0,5,10],

      [1,6,11],

      [2,7,12],

      [3,8,13],

      [4,9,14],

      [0,6,12],

      [2,6,10],

      [4,8,12],

    ];

    let rowsCompleted = 0;

    winningLines.forEach(line=>{

      const complete =
        line.every(cell=>

          checkedCells.includes(cell)

        );

      if(complete){

        rowsCompleted++;

      }

    });

    let justCompleted = false;

    // ------------------------
    // Entire board completed
    // ------------------------

    if(

      checkedCells.length ===
      challenge.cells.length &&

      !progress.bingo.completedDates.includes(today)

    ){

      justCompleted = true;

      progress.bingo.completedDates.push(today);

      progress.xp += challenge.rewardXP;

      progress.level =
        Math.floor(
          progress.xp / 100
        ) + 1;

      // ---------- STREAK ----------

      const yesterday =
        new Date();

      yesterday.setDate(

        yesterday.getDate()-1

      );

      const yesterdayString =
        yesterday
        .toISOString()
        .split("T")[0];

      if(!progress.lastPlayedDate){

        progress.streak = 1;

      }

      else if(

        progress.lastPlayedDate ===
        yesterdayString

      ){

        progress.streak++;

      }

      else if(

        progress.lastPlayedDate !==
        today

      ){

        progress.streak = 1;

      }

      progress.lastPlayedDate =
        today;

      progress.longestStreak =
        Math.max(

          progress.longestStreak,

          progress.streak,

        );

      // ---------- BADGE ----------

      const already =
        progress.badges.some(

          badge=>

            badge.id==="first-bingo"

        );

      if(!already){

        progress.badges.push({

          id:"first-bingo",

          title:"🎯 First Bingo",

          icon:"target",

          unlockedAt:new Date(),

        });

      }

    }

    await progress.save();

    return NextResponse.json({

      success:true,

      xp:progress.xp,

      level:progress.level,

      streak:progress.streak,

      badges:progress.badges,

      rowsCompleted,

      completed:
        progress.bingo.completedDates.includes(today),

      justCompleted,

    });

  }

  catch(error){

    console.error(error);

    return NextResponse.json({

      success:false,

      message:error.message,

    },
    {
      status:500,
    });

  }

}