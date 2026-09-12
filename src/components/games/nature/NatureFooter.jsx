import { Gift } from "lucide-react";

export default function NatureFooter() {

  return (

    <div
      className="
      rounded-full
      border
      border-yellow-200
      bg-gradient-to-r
      from-yellow-50
      via-white
      to-yellow-50
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
          className="text-yellow-600"
        />

        <span className="text-lg">

          Complete today's hunt to earn

        </span>

        <span
          className="
          text-2xl
          font-bold
          text-green-700
        "
        >

          +20 XP

        </span>

        <span className="text-lg">

          and increase your streak!

        </span>

      </div>

    </div>

  );

}