"use client";

import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

export default function ConfettiCelebration({
  show,
}) {
  const { width, height } =
    useWindowSize();

  if (!show) return null;

  return (
    <Confetti
      width={width}
      height={height}
      recycle={false}
      numberOfPieces={350}
      gravity={0.25}
    />
  );
}