"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  Sparkles,
  Star,
} from "lucide-react";

import { useEffect, useState } from "react";

import XPAnimation from "./XPAnimation";

import NatureTaskIcon from "@/components/games/icons/NatureTaskIcon";

export default function GameTaskCard({
  task,
  completed,
  onToggle,
}) {
  const [showXP, setShowXP] = useState(false);

  const difficultyColor = {
    easy: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    hard: "bg-red-100 text-red-700",
  };

  function handleClick() {

  if (!completed) {

    setShowXP(true);

    setTimeout(() => {

      setShowXP(false);

    }, 1000);

  }

  onToggle();

}

  return (
    <div className="relative">

<XPAnimation

show={showXP}

xp={task.xp}

/>

<motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      whileTap={{
        scale: 0.98,
      }}
      layout
      className={`
        overflow-hidden
        rounded-[32px]
        border
        bg-white
        shadow-lg
        transition-all
        ${
          completed
            ? "border-green-400"
            : "border-slate-200"
        }
      `}
    >
      {/* Top */}

      <div
        className="
          bg-gradient-to-r
          from-sky-50
          to-purple-50
          p-6
        "
      >
        <div className="flex justify-center">
          <NatureTaskIcon
            category={task.category}
            size={80}
          />
        </div>
      </div>

      {/* Body */}

      <div className="space-y-5 p-6">
        <h2
          className="
            text-center
            text-xl
            font-bold
          "
        >
          {task.title}
        </h2>

        {task.hint && (
          <p
            className="
              rounded-2xl
              bg-slate-50
              p-3
              text-center
              text-sm
              text-slate-500
            "
          >
            💡 {task.hint}
          </p>
        )}

        <div className="flex justify-center gap-3">
          <span
            className={`
              rounded-full
              px-4
              py-2
              text-sm
              font-semibold
              ${difficultyColor[task.difficulty]}
            `}
          >
            {task.difficulty}
          </span>

          <span
            className="
              flex
              items-center
              gap-2
              rounded-full
              bg-sky-100
              px-4
              py-2
              text-sm
              font-semibold
              text-sky-700
            "
          >
            <Star size={16} />

            +{task.xp} XP
          </span>
        </div>

        <motion.button
          whileHover={{
            scale: 1.04,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={handleClick}
          className={`
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-2xl
            py-4
            font-semibold
            transition

            ${
              completed
                ? `
                bg-green-500
                text-white
              `
                : `
                bg-gradient-to-r
                from-sky-500
                to-purple-500
                text-white
              `
            }
          `}
        >
          {completed ? (
            <>
              <CheckCircle2 size={20} />
              Completed
            </>
          ) : (
            <>
              <Sparkles size={20} />
              Complete
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
    </div>
  );
}