"use client";

import { AnimatePresence, motion } from "framer-motion";

export default function XPAnimation({
  show,
  xp,
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            y: -60,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: -100,
          }}
          transition={{
            duration: 1,
          }}
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            z-50
            -translate-x-1/2
            rounded-full
            bg-yellow-400
            px-5
            py-2
            font-bold
            text-white
            shadow-xl
          "
        >
          +{xp} XP ⭐
        </motion.div>
      )}
    </AnimatePresence>
  );
}