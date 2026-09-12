import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import DailyChallenge from "@/models/DailyChallenge";
import GameProgress from "@/models/GameProgress";

import { generateBingoChallenge } from "@/lib/ai/generateBingoChallenge";
import { fallbackBingo } from "@/lib/ai/fallbackBingo";

export async function GET() {

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

    const today =
      new Date()
        .toISOString()
        .split("T")[0];

    // ---------------------------------
    // Today's Bingo Board
    // ---------------------------------

    let challenge =
      await DailyChallenge.findOne({

        game:"bingo",

        date:today,

      });

    if(!challenge){

      let generated =
        await generateBingoChallenge();

      if(!generated){

        generated =
          fallbackBingo;

      }

      challenge =
        await DailyChallenge.create({

          game:"bingo",

          date:today,

          title:
            generated.title,

          description:
            generated.description,

          rewardXP:
            generated.rewardXP,

          cells:
            generated.cells,

        });

    }

    // ---------------------------------
    // Player Progress
    // ---------------------------------

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

    const todayProgress = {

      checkedCells:
        progress.bingo?.checkedCells?.get(today) ?? [],

      rowsCompleted:0,

      completed:
        progress.bingo?.completedDates?.includes(today) ?? false,

    };

    return NextResponse.json({

      success:true,

      challenge,

      progress:{

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

  catch(error){

    console.error(error);

    return NextResponse.json({

      success:false,

      message:error.message,

    },{
      status:500,
    });

  }

}