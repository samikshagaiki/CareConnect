"use client";

import { CalendarDays } from "lucide-react";

export default function BingoTomorrow({

  reward,

}) {

  return (

    <div
      className="
      rounded-[30px]
      bg-gradient-to-r
      from-sky-400
      to-purple-500
      p-8
      text-white
      shadow-lg
    "
    >

      <CalendarDays
        size={48}
      />

      <h2
        className="
        mt-5
        text-2xl
        font-bold
      "
      >

        Tomorrow's Bingo

      </h2>

      <p
        className="
        mt-4
        text-white/90
        leading-7
      "
      >

        A brand new AI-generated
        wellness board will be
        available tomorrow.

      </p>

      <div
        className="
        mt-8
        rounded-2xl
        bg-white/20
        p-4
        backdrop-blur
      "
      >

        <p className="text-sm">

          Reward

        </p>

        <h3
          className="
          mt-2
          text-3xl
          font-bold
        "
        >

          +{reward} XP

        </h3>

      </div>

    </div>

  );

}