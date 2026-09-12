import { Leaf } from "lucide-react";

export default function NatureTips() {

  return (

    <div
      className="
      rounded-[28px]
      border
      border-green-100
      bg-gradient-to-br
      from-green-50
      to-white
      p-6
      shadow-lg
    "
    >

      <div className="flex items-center gap-3">

        <Leaf className="text-green-700"/>

        <h2 className="text-2xl font-bold text-green-800">

          Tips for Your Adventure

        </h2>

      </div>

      <ul className="mt-6 space-y-4 text-slate-600">

        <li>🌿 Look carefully around you.</li>

        <li>🌼 Take your time and enjoy nature.</li>

        <li>🐦 Listen to the sounds around you.</li>

        <li>🌳 Respect plants and animals.</li>

        <li>😊 Have fun exploring.</li>

      </ul>

    </div>

  );

}