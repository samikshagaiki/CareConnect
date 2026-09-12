"use client";

import BingoCard from "./BingoCard";

export default function BingoBoard({

  tasks,

  checked,

  toggle,

  disabled,

}) {

  return (

    <section className="space-y-8">

      {/* Heading */}

      <div
        className="
        flex
        flex-col
        gap-4
        md:flex-row
        md:items-center
        md:justify-between
      "
      >

        <div>

          <h2
            className="
            text-3xl
            font-bold
            text-slate-800
          "
          >

            Today's Bingo Board

          </h2>

          <p
            className="
            mt-2
            text-slate-500
          "
          >

            Complete activities and finish rows to unlock rewards.

          </p>

        </div>

        <div
          className="
          rounded-full
          bg-sky-100
          px-5
          py-2
          text-sm
          font-semibold
          text-sky-700
        "
        >

          {checked.length} / 15 Completed

        </div>

      </div>

      {/* Grid */}

      <div
        className="
        grid
        grid-cols-2
        gap-5
        sm:grid-cols-3
        lg:grid-cols-5
      "
      >

        {tasks.map((task, index) => (

          <BingoCard

            key={task.id}

            task={task}

            checked={checked.includes(index)}

            onClick={() =>
              toggle(index)
            }

            disabled={disabled}

          />

        ))}

      </div>

    </section>

  );

}