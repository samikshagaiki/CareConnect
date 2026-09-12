"use client";

import { Award } from "lucide-react";

export default function BingoBadge({

  badge,

}) {

  return (

    <div
      className="
      rounded-[30px]
      bg-white
      p-8
      shadow-lg
    "
    >

      <Award
        size={56}
        className="text-yellow-500"
      />

      <h2
        className="
        mt-5
        text-2xl
        font-bold
      "
      >

        Latest Badge

      </h2>

      {

        badge ?

        (

          <>

            <h3
              className="
              mt-5
              text-xl
              font-bold
              text-purple-700
            "
            >

              {badge.title}

            </h3>

            <p
              className="
              mt-3
              text-slate-500
            "
            >

              Unlocked on{" "}

              {new Date(
                badge.unlockedAt
              ).toLocaleDateString()}

            </p>

          </>

        )

        :

        (

          <>

            <p
              className="
              mt-5
              text-lg
              text-slate-500
            "
            >

              🎯 First Bingo Awaits!

            </p>

            <p
              className="
              mt-3
              text-slate-500
            "
            >

              Finish today's board
              to unlock your first
              Bingo badge.

            </p>

          </>

        )

      }

    </div>

  );

}