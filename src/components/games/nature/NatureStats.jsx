"use client";

import { Star, Leaf } from "lucide-react";

export default function NatureStats({

completed,

total,

streak,

level,

xp,

rewardXP,

}) {

  const progress =
  total === 0
    ? 0
    : Math.round(
        (completed / total) * 100
      );

  const radius = 70;

  const circumference =
    2 * Math.PI * radius;

  const offset =
    circumference -
    (progress / 100) *
      circumference;

  return (

    <div
      className="
      grid
      gap-6
      lg:grid-cols-3
    "
    >

      {/* Reward */}

      <div
        className="
        rounded-[30px]
        border
        border-green-100
        bg-gradient-to-br
        from-green-50
        to-white
        p-8
        shadow-lg
      "
      >

        <Star
          size={60}
          className="
          text-yellow-500
        "
        />

        <h3
          className="
          mt-5
          text-xl
          font-semibold
        "
        >
          Today's Reward
        </h3>

        <h2
          className="
          mt-2
          text-5xl
          font-bold
          text-sky-700
        "
        >
          +{rewardXP} XP
        </h2>

        <p
          className="
          mt-4
          text-slate-500
        "
        >
          Complete today's
          hunt to claim it.
        </p>

      </div>


      {/* Progress */}

      <div
        className="
        rounded-[30px]
        bg-white
        p-8
        shadow-lg
      "
      >

        <div
          className="
          flex
          justify-center
        "
        >

          <svg
            width="180"
            height="180"
          >

            <circle

              cx="90"

              cy="90"

              r={radius}

              fill="none"

              stroke="#E5E7EB"

              strokeWidth="12"

            />

            <circle

              cx="90"

              cy="90"

              r={radius}

              fill="none"

              stroke="#5AAEFE"

              strokeWidth="12"

              strokeLinecap="round"

              strokeDasharray={
                circumference
              }

              strokeDashoffset={
                offset
              }

              transform="
                rotate(-90 90 90)
              "

              style={{

                transition:
                  "0.5s",

              }}

            />

            <text

              x="90"

              y="82"

              textAnchor="middle"

              fontSize="34"

              fontWeight="700"

              fill="#166534"

            >

              {completed}/{total}

            </text>

            <text

              x="90"

              y="112"

              textAnchor="middle"

              fontSize="18"

              fill="#64748B"

            >

              Done

            </text>

          </svg>

        </div>

      </div>

      {/* Motivation */}

      <div
        className="
        rounded-[30px]
        bg-white
        p-8
        shadow-lg
      "
      >

        <div
          className="
          flex
          items-center
          gap-3
        "
        >

          <Leaf
            className="
            text-green-600
          "
          />

          <h2
            className="
            text-2xl
            font-bold
            text-sky-700
          "
          >
            You're doing great!
          </h2>

        </div>

       <p
  className="
  mt-6
  text-lg
  text-slate-600
"
>
  Every task completed is another step toward
  building healthy habits.
</p>

<div
  className="
  mt-8
  grid
  grid-cols-3
  gap-4
"
>

  <div
    className="
    rounded-2xl
    bg-sky-50
    p-4
    text-center
  "
  >

    <p className="text-sm text-slate-500">
      🔥 Streak
    </p>

    <h3 className="mt-2 text-2xl font-bold">
      {streak}
    </h3>

  </div>

  <div
    className="
    rounded-2xl
    bg-purple-50
    p-4
    text-center
  "
  >

    <p className="text-sm text-slate-500">
      ⭐ Level
    </p>

    <h3 className="mt-2 text-2xl font-bold">
      {level}
    </h3>

  </div>

  <div
    className="
    rounded-2xl
    bg-green-50
    p-4
    text-center
  "
  >

    <p className="text-sm text-slate-500">
      ✨ XP
    </p>

    <h3 className="mt-2 text-2xl font-bold">
      {xp}
    </h3>

  </div>

</div>

        <div
          className="
          mt-8
          h-4
          rounded-full
          bg-slate-200
        "
        >

          <div

            className="
            h-full
            rounded-full
            bg-gradient-to-r
           from-sky-400
via-cyan-400
to-purple-500
            transition-all
            duration-500
          "

            style={{

              width:
                `${progress}%`,

            }}

          />

        </div>

        <p
          className="
          mt-3
          text-right
          text-lg
          font-semibold
          text-sky-700
        "
        >
          {progress}%
        </p>

      </div>

    </div>

  );

}