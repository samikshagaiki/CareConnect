"use client";

import { motion } from "framer-motion";

import {
  CheckCircle2,
  Circle,
  Sparkles,
} from "lucide-react";

import { iconMap } from "@/lib/gameIcons";

export default function BingoCard({

  task,

  checked,

  onClick,

  disabled,

}) {

  const Icon =
    iconMap[task.icon] ??
    Sparkles;

  const difficultyColors = {

    easy:
      "bg-green-100 text-green-700",

    medium:
      "bg-yellow-100 text-yellow-700",

    hard:
      "bg-red-100 text-red-700",

  };

  return (

    <motion.button

      whileHover={
        disabled
          ? {}
          : {
              y: -6,
              scale: 1.02,
            }
      }

      whileTap={{
        scale: 0.98,
      }}

      onClick={onClick}

      disabled={disabled}

      className={`
      relative
      overflow-hidden
      rounded-[28px]
      border
      p-6
      text-left
      shadow-lg
      transition-all
      duration-300

      ${
        checked
          ? "border-green-300 bg-gradient-to-br from-green-50 to-white"
          : "border-slate-200 bg-white hover:border-sky-300"
      }

      ${
        disabled
          ? "cursor-default"
          : "cursor-pointer"
      }
    `}
    >

      {/* Decorative Circle */}

      <div
        className="
        absolute
        -right-10
        -top-10
        h-24
        w-24
        rounded-full
        bg-sky-100/30
      "
      />

      {/* Tick */}

      <div
        className="
        flex
        justify-between
      "
      >

        {checked ? (

          <CheckCircle2
            size={28}
            className="
            text-green-600
          "
          />

        ) : (

          <Circle
            size={28}
            className="
            text-slate-300
          "
          />

        )}

        <span
          className={`
          rounded-full
          px-3
          py-1
          text-xs
          font-semibold

          ${
            difficultyColors[
              task.difficulty
            ]
          }
        `}
        >

          {task.difficulty}

        </span>

      </div>

      {/* Icon */}

      <div
        className="
        mt-6
        flex
        justify-center
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

          <Icon
            size={42}
            className="
            text-sky-700
          "
          />

        </div>

      </div>

      {/* Title */}

      <h3
        className="
        mt-6
        text-center
        text-lg
        font-bold
        leading-7
        text-slate-800
      "
      >

        {task.title}

      </h3>

      {/* XP */}

      <div
        className="
        mt-6
        flex
        justify-center
      "
      >

        <span
          className="
          rounded-full
          bg-sky-100
          px-4
          py-2
          text-sm
          font-semibold
          text-sky-700
        "
        >

          +{task.xp} XP

        </span>

      </div>

      {/* Completed Overlay */}

      {checked && (

        <motion.div

          initial={{
            opacity: 0,
          }}

          animate={{
            opacity: 1,
          }}

          className="
          absolute
          inset-0
          bg-green-500/5
        "

        />

      )}

    </motion.button>

  );

}