"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Award } from "lucide-react";

export default function BadgePopup({
  show,
}) {
  return (
    <AnimatePresence>

      {show && (

        <motion.div

          initial={{
            opacity:0,
            scale:0.5,
            y:80,
          }}

          animate={{
            opacity:1,
            scale:1,
            y:0,
          }}

          exit={{
            opacity:0,
            scale:0.7,
          }}

          transition={{
            duration:.5
          }}

          className="
          fixed
          left-1/2
          top-1/2
          z-[100]
          w-[320px]
          -translate-x-1/2
          rounded-[30px]
          bg-white
          p-8
          text-center
          shadow-2xl
        "
        >

          <Award
            size={70}
            className="
            mx-auto
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

            Badge Unlocked!

          </h2>

          <p
            className="
            mt-3
            text-slate-500
          "
          >

            🌿 Nature Explorer

          </p>

        </motion.div>

      )}

    </AnimatePresence>
  );
}