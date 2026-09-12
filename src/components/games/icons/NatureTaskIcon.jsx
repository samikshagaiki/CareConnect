"use client";

import {
  Flower2,
  Trees,
  Leaf,
  Cloud,
  Sun,
  Wind,
  Waves,
  Bug,
  Bird,
  Apple,
  Sprout,
  Mountain,
  CircleHelp,
} from "lucide-react";

export default function NatureTaskIcon({
  category,
  size = 72,
}) {
  const iconClass =
    "text-emerald-600";

  switch (category) {
    case "flower":
      return (
        <Flower2
          size={size}
          className={iconClass}
        />
      );

    case "tree":
      return (
        <Trees
          size={size}
          className={iconClass}
        />
      );

    case "leaf":
      return (
        <Leaf
          size={size}
          className={iconClass}
        />
      );

    case "cloud":
      return (
        <Cloud
          size={size}
          className={iconClass}
        />
      );

    case "sun":
      return (
        <Sun
          size={size}
          className={iconClass}
        />
      );

    case "wind":
      return (
        <Wind
          size={size}
          className={iconClass}
        />
      );

    case "water":
      return (
        <Waves
          size={size}
          className={iconClass}
        />
      );

    case "bird":
      return (
        <Bird
          size={size}
          className={iconClass}
        />
      );

    case "bug":
      return (
        <Bug
          size={size}
          className={iconClass}
        />
      );

    case "grass":
      return (
        <Sprout
          size={size}
          className={iconClass}
        />
      );

    case "fruit":
      return (
        <Apple
          size={size}
          className={iconClass}
        />
      );

    case "rock":
      return (
        <Mountain
          size={size}
          className={iconClass}
        />
      );

    case "mushroom":
      return (
        <div
          className="text-6xl"
          style={{
            lineHeight: 1,
          }}
        >
          🍄
        </div>
      );

    case "butterfly":
      return (
        <div
          className="text-6xl"
          style={{
            lineHeight: 1,
          }}
        >
          🦋
        </div>
      );

    case "pinecone":
      return (
        <div
          className="text-6xl"
          style={{
            lineHeight: 1,
          }}
        >
          🌲
        </div>
      );

    default:
      return (
        <CircleHelp
          size={size}
          className="text-slate-400"
        />
      );
  }
}