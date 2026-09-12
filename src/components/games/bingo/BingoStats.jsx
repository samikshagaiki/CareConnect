"use client";

import {
  Trophy,
  Target,
  Flame,
  Star,
} from "lucide-react";

export default function BingoStats({

  completed,

  total,

  streak,

  level,

  xp,

  reward,

  rowsCompleted,

}) {

  const progress = Math.round(
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
      xl:grid-cols-3
    "
    >

      {/* Today's Reward */}

      <div
        className="
        rounded-[30px]
        border
        border-purple-100
        bg-gradient-to-br
        from-purple-50
        via-white
        to-sky-50
        p-8
        shadow-lg
      "
      >

        <Trophy
          size={60}
          className="
          text-yellow-500
          "
        />

        <h2
          className="
          mt-5
          text-xl
          font-semibold
          "
        >

          Today's Reward

        </h2>

        <h1
          className="
          mt-3
          text-5xl
          font-bold
          text-purple-600
          "
        >

          +{reward} XP

        </h1>

        <p
          className="
          mt-4
          text-slate-500
          "
        >

          Complete the board to
          claim today's reward.

        </p>

      </div>

      {/* Circular Progress */}

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

              stroke="#7C3AED"

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
                  "0.6s",
              }}

            />

            <text

              x="90"

              y="82"

              textAnchor="middle"

              fontSize="34"

              fontWeight="700"

              fill="#4F46E5"

            >

              {completed}

            </text>

            <text

              x="90"

              y="112"

              textAnchor="middle"

              fontSize="18"

              fill="#64748B"

            >

              / {total}

            </text>

          </svg>

        </div>

      </div>

      {/* Progress Summary */}

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

          <Target
            className="
            text-purple-600
          "
          />

          <h2
            className="
            text-2xl
            font-bold
            text-slate-800
          "
          >

            Progress

          </h2>

        </div>

        <div
          className="
          mt-8
          grid
          grid-cols-3
          gap-4
        "
        >

          {/* Rows */}

          <div
            className="
            rounded-2xl
            bg-sky-50
            p-4
            text-center
          "
          >

            <Target
              className="
              mx-auto
              text-sky-600
            "
            />

            <h3
              className="
              mt-3
              text-2xl
              font-bold
            "
            >

              {rowsCompleted}

            </h3>

            <p
              className="
              text-xs
              text-slate-500
            "
            >

              Rows

            </p>

          </div>

          {/* Streak */}

          <div
            className="
            rounded-2xl
            bg-orange-50
            p-4
            text-center
          "
          >

            <Flame
              className="
              mx-auto
              text-orange-500
            "
            />

            <h3
              className="
              mt-3
              text-2xl
              font-bold
            "
            >

              {streak}

            </h3>

            <p
              className="
              text-xs
              text-slate-500
            "
            >

              Streak

            </p>

          </div>

          {/* Level */}

          <div
            className="
            rounded-2xl
            bg-purple-50
            p-4
            text-center
          "
          >

            <Star
              className="
              mx-auto
              text-purple-600
            "
            />

            <h3
              className="
              mt-3
              text-2xl
              font-bold
            "
            >

              {level}

            </h3>

            <p
              className="
              text-xs
              text-slate-500
            "
            >

              Level

            </p>

          </div>

        </div>

        {/* XP */}

        <div
          className="
          mt-8
          rounded-2xl
          bg-gradient-to-r
          from-sky-50
          to-purple-50
          p-5
        "
        >

          <div
            className="
            flex
            items-center
            justify-between
          "
          >

            <span
              className="
              text-slate-600
            "
            >

              Total XP

            </span>

            <span
              className="
              text-3xl
              font-bold
              text-sky-700
            "
            >

              {xp}

            </span>

          </div>

        </div>

      </div>

    </div>

  );

}