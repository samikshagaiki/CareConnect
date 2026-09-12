"use client";

import { Award } from "lucide-react";

export default function NatureBadge({
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
        size={55}
        className="
        text-yellow-500
      "
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

        badge ? (

          <>

            <p
              className="
              mt-4
              text-xl
              font-semibold
              text-sky-700
            "
            >
              {badge.title}
            </p>

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

        ) : (

          <>

            <p
              className="
              mt-5
              text-lg
              text-slate-500
            "
            >
              🌱 First Badge Awaits!
            </p>

            <p
              className="
              mt-3
              text-slate-500
            "
            >
              Complete today's challenge
              to earn your first badge.
            </p>

          </>

        )

      }

    </div>

  );

}