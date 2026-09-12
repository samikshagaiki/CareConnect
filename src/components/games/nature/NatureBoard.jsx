"use client";

import GameTaskCard from "@/components/games/common/GameTaskCard";

export default function NatureBoard({
  tasks,
  completedTasks,
  toggleTask,
}) {
  return (
    <section className="space-y-8">

      {/* Heading */}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

        <div>

          <h2 className="text-3xl font-bold text-slate-800">
            Today's Nature Hunt
          </h2>

          <p className="mt-2 text-slate-500">
            Complete every challenge to earn today's reward.
          </p>

        </div>

        <span
          className="
          rounded-full
          bg-green-100
          px-5
          py-2
          text-sm
          font-semibold
          text-green-700
        "
        >
          {completedTasks.length} / {tasks.length} Completed
        </span>

      </div>

      {/* Cards */}

      <div
        className="
        grid
        gap-6
        sm:grid-cols-2
        xl:grid-cols-3
      "
      >
        {tasks.map((task, index) => (

          <GameTaskCard
            key={task.id ?? index}
            task={task}
            completed={completedTasks.includes(index)}
            onToggle={() => toggleTask(index)}
          />

        ))}
      </div>

    </section>
  );
}