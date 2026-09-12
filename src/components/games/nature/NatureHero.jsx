"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Flame,
  Star,
  Trees,
  Search,
} from "lucide-react";

export default function NatureHero({
  streak,
  level,
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
          border-green-200
          bg-white
          px-5
          py-3
          text-sky-700
          shadow-sm
          transition
          hover:bg-green-50
        "
      >
        <ArrowLeft size={20} />
        Back to Games
      </Link>

      {/* Hero Card */}

      <div
        className="
          relative
          overflow-hidden
          rounded-[34px]
          border
          border-green-100
          bg-gradient-to-r
         from-sky-50
via-white
to-purple-50
          p-8
          shadow-lg
        "
      >

        {/* Decorative Leaves */}

        <div
          className="
            absolute
            -right-6
            -top-6
            text-[120px]
            opacity-10
            rotate-12
          "
        >
          🌿
        </div>

        <div
          className="
            absolute
            -left-8
            bottom-0
            text-[90px]
            opacity-10
          "
        >
          🍃
        </div>

        <div className="grid gap-8 lg:grid-cols-4">

          {/* Left */}

          <div
            className="
              flex
              items-center
              justify-center
            "
          >
            <div
              className="
                flex
                h-36
                w-36
                items-center
                justify-center
                rounded-full
                bg-gradient-to-br
from-sky-100
to-purple-100
              "
            >
              <Search
                size={70}
                className="text-sky-700"
              />
            </div>
          </div>

          {/* Center */}

          <div className="lg:col-span-2">

            <div className="flex items-center gap-3">

              <Trees
                size={30}
                className="text-sky-700"
              />

              <h1
                className="
                  text-5xl
                  font-extrabold
                  text-slate-800
                "
              >
                Nature Scavenger Hunt
              </h1>

            </div>

            <p
              className="
                mt-5
                text-xl
                leading-8
                text-slate-600
              "
            >
              Explore nature and discover
              today's hidden treasures.
              Complete every task to earn XP,
              maintain your streak,
              and unlock exclusive badges.
            </p>

          </div>

          {/* Right */}

          <div>

            <div
              className="
                rounded-3xl
                bg-white
                p-6
                shadow-md
              "
            >

              <div
                className="
                  flex
                  justify-between
                "
              >

                <div className="text-center">

                  <Flame
                    className="
                      mx-auto
                      text-orange-500
                    "
                  />

                  <p className="mt-2 text-sm text-slate-500">
                    Streak
                  </p>

                  <h2
                    className="
                      mt-2
                      text-4xl
                      font-bold
                      text-orange-500
                    "
                  >
                    {streak}
                  </h2>

                  <p className="text-sm">
                    Days
                  </p>

                </div>

                <div className="border-l" />

                <div className="text-center">

                  <Star
                    className="
                      mx-auto
                      text-yellow-500
                    "
                  />

                  <p className="mt-2 text-sm text-slate-500">
                    Level
                  </p>

                  <h2
                    className="
                      mt-2
                      text-4xl
                      font-bold
                      text-sky-700
                    "
                  >
                    {level}
                  </h2>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}