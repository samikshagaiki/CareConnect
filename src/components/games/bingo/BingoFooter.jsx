"use client";

import { Gift } from "lucide-react";

export default function BingoFooter() {

  return (

    <div
      className="
      rounded-full
      border
      border-purple-200
      bg-gradient-to-r
      from-purple-50
      via-white
      to-sky-50
      p-5
      shadow-lg
    "
    >

      <div
        className="
        flex
        flex-wrap
        items-center
        justify-center
        gap-3
        text-center
      "
      >

        <Gift
          className="
          text-purple-600
        "
        />

        <span className="text-lg">

          Finish today's Bingo
          board to earn

        </span>

        <span
          className="
          text-2xl
          font-bold
          text-purple-700
        "
        >

          XP, Badges & Streak

        </span>

      </div>

    </div>

  );

}