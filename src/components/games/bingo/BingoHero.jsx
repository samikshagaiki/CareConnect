"use client";

import Link from "next/link";

import {
  ArrowLeft,
  Target,
  Flame,
  Star,
  Trophy,
  Sparkles,
} from "lucide-react";

export default function BingoHero({

  streak,

  level,

  xp,

  reward,

  rowsCompleted,

}) {

  return (

    <div className="space-y-6">

      {/* Back Button */}

      <Link
        href="/patient/games"
        className="
        inline-flex
        items-center
        gap-2
        rounded-2xl
        border
        border-sky-200
        bg-white
        px-5
        py-3
        text-sky-700
        shadow-sm
        transition
        hover:bg-sky-50
      "
      >
        <ArrowLeft size={20}/>
        Back to Games
      </Link>

      {/* Hero */}

      <section
        className="
        relative
        overflow-hidden
        rounded-[36px]
        border
        border-sky-100
        bg-gradient-to-r
        from-sky-50
        via-white
        to-purple-50
        shadow-xl
      "
      >

        {/* Decorative Background */}

        <div className="absolute -top-8 left-10 text-8xl opacity-10">

          🎯

        </div>

        <div className="absolute right-10 bottom-0 text-8xl opacity-10">

          ✨

        </div>

        <div className="p-8 lg:p-10">

          <div
            className="
            grid
            gap-8
            lg:grid-cols-[1fr_auto]
          "
          >

            {/* Left */}

            <div>

              <div
                className="
                flex
                items-center
                gap-4
              "
              >

                <div
                  className="
                  flex
                  h-20
                  w-20
                  items-center
                  justify-center
                  rounded-full
                  bg-gradient-to-br
                  from-sky-100
                  to-purple-100
                "
                >

                  <Target
                    size={40}
                    className="text-sky-700"
                  />

                </div>

                <div>

                  <h1
                    className="
                    text-5xl
                    font-extrabold
                    text-slate-800
                  "
                  >

                    Wellness Bingo

                  </h1>

                  <p
                    className="
                    mt-3
                    text-lg
                    text-slate-600
                  "
                  >

                    Complete activities • Finish rows • Earn XP • Build healthy habits

                  </p>

                </div>

              </div>

            </div>

            {/* Reward */}

            <div>

              <div
                className="
                rounded-3xl
                bg-white
                p-6
                shadow-lg
                border
                border-purple-100
              "
              >

                <div
                  className="
                  flex
                  items-center
                  gap-3
                "
                >

                  <Sparkles
                    className="
                    text-purple-500
                  "
                  />

                  <span
                    className="
                    text-sm
                    font-semibold
                    text-slate-500
                  "
                  >

                    Today&apos;s Reward

                  </span>

                </div>

                <h2
                  className="
                  mt-4
                  text-4xl
                  font-bold
                  text-purple-600
                "
                >

                  +{reward} XP

                </h2>

              </div>

            </div>

          </div>

          {/* Stats */}

          <div
            className="
            mt-10
            grid
            gap-5
            sm:grid-cols-2
            xl:grid-cols-4
          "
          >

            {/* Streak */}

            <div
              className="
              rounded-3xl
              bg-white
              p-6
              shadow-md
            "
            >

              <Flame
                className="
                text-orange-500
              "
              />

              <p className="mt-3 text-sm text-slate-500">

                Streak

              </p>

              <h3
                className="
                mt-2
                text-4xl
                font-bold
              "
              >

                {streak}

              </h3>

              <p className="text-sm">

                Days

              </p>

            </div>

            {/* Level */}

            <div
              className="
              rounded-3xl
              bg-white
              p-6
              shadow-md
            "
            >

              <Star
                className="
                text-yellow-500
              "
              />

              <p className="mt-3 text-sm text-slate-500">

                Level

              </p>

              <h3
                className="
                mt-2
                text-4xl
                font-bold
              "
              >

                {level}

              </h3>

            </div>

            {/* XP */}

            <div
              className="
              rounded-3xl
              bg-white
              p-6
              shadow-md
            "
            >

              <Trophy
                className="
                text-purple-500
              "
              />

              <p className="mt-3 text-sm text-slate-500">

                Total XP

              </p>

              <h3
                className="
                mt-2
                text-4xl
                font-bold
              "
              >

                {xp}

              </h3>

            </div>

            {/* Rows */}

            <div
              className="
              rounded-3xl
              bg-white
              p-6
              shadow-md
            "
            >

              <Target
                className="
                text-green-600
              "
              />

              <p className="mt-3 text-sm text-slate-500">

                Rows Completed

              </p>

              <h3
                className="
                mt-2
                text-4xl
                font-bold
              "
              >

                {rowsCompleted}/5

              </h3>

            </div>

          </div>

        </div>

      </section>

    </div>

  );

}