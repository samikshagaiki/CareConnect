"use client";

import { useEffect, useState } from "react";

const moods = [
  {
    label: "😄 Very Happy",
    value: "very_happy",
  },
  {
    label: "🙂 Happy",
    value: "happy",
  },
  {
    label: "😐 Neutral",
    value: "neutral",
  },
  {
    label: "🙁 Sad",
    value: "sad",
  },
  {
    label: "😢 Very Sad",
    value: "very_sad",
  },
];

export default function MoodPage() {
  const [selectedMood, setSelectedMood] =
    useState("");

  const [note, setNote] =
    useState("");

  const [history, setHistory] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  async function fetchHistory() {
    try {
      const response =
        await fetch("/api/mood");

      const data =
        await response.json();

      if (data.success) {
        setHistory(
          data.moodEntries
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!selectedMood) {
      alert(
        "Please select a mood"
      );
      return;
    }

    try {
      setLoading(true);

      const response =
        await fetch("/api/mood", {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            mood: selectedMood,
            note,
          }),
        });

      const data =
        await response.json();

      if (!data.success) {
        alert(data.message);
        return;
      }

      setSelectedMood("");
      setNote("");

      await fetchHistory();

      alert(
        "Mood saved successfully"
      );
    } catch (error) {
      console.error(error);

      alert(
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  const moodColors = {
  very_happy:
    "bg-pink-200 border-pink-300",

  happy:
    "bg-yellow-200 border-yellow-300",

  neutral:
    "bg-sky-200 border-sky-300",

  sad:
    "bg-blue-200 border-blue-300",

  very_sad:
    "bg-purple-200 border-purple-300",
};

const moodMap = {};

history.forEach((entry) => {
  const day = new Date(
    entry.createdAt
  ).getDate();

  moodMap[day] = entry.mood;
});

const moodIcons = {
  very_happy: "😄",
  happy: "🙂",
  neutral: "😐",
  sad: "🙁",
  very_sad: "😢",
};

  useEffect(() => {
    fetchHistory();
  }, []);

 return (
  <div className="space-y-8">

    {/* PAGE HEADER */}

    <div className="relative">
      <h1 className="text-5xl font-bold text-slate-800">
        Mood Tracking
        <span className="ml-3 text-purple-400">✦</span>
      </h1>

      <p className="mt-3 text-slate-500 text-lg">
        Track how you're feeling throughout the day.
      </p>
    </div>

    {/* MOOD INPUT CARD */}

    <div
      className="
      relative
      overflow-hidden
      rounded-[40px]
      bg-white
      border
      border-white
      shadow-xl
      p-10
    "
    >

      <div className="absolute top-6 right-8 text-6xl opacity-30">
        🌈
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >

        <div>

          <h2 className="text-2xl font-bold text-slate-800">
            Select Your Mood ✨
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-5">

            {moods.map((mood) => (
              <button
                key={mood.value}
                type="button"
                onClick={() =>
                  setSelectedMood(mood.value)
                }
                className={`
                  rounded-3xl
                  border
                  py-5
                  px-4
                  font-medium
                  transition-all
                  ${
                    selectedMood === mood.value
                      ? "bg-gradient-to-r from-sky-400 to-purple-400 text-white shadow-lg scale-105"
                      : "bg-white border-purple-100 hover:border-purple-300"
                  }
                `}
              >
                {mood.label}
              </button>
            ))}

          </div>

        </div>

        <div className="grid lg:grid-cols-[1fr_220px] gap-6">

          <textarea
            value={note}
            onChange={(e) =>
              setNote(e.target.value)
            }
            placeholder="Add a note (optional)"
            rows={5}
            className="
              w-full
              rounded-3xl
              border
              border-purple-100
              p-5
              outline-none
              focus:ring-4
              focus:ring-purple-100
            "
          />

          {/* GRATITUDE NOTE */}

          <div
            className="
            rounded-[30px]
            bg-gradient-to-br
            from-[#FFF7FC]
            to-[#F6F0FF]
            p-6
            shadow-md
            text-center
          "
          >
            <h3 className="font-semibold text-slate-700">
              Today I'm
            </h3>

            <h3 className="font-semibold text-slate-700">
              Grateful For
            </h3>

            <div className="mt-6 text-5xl">
              💜
            </div>

            <p className="mt-4 text-sm text-slate-500">
              Small moments matter.
            </p>
          </div>

        </div>

        <button
          type="submit"
          disabled={loading}
          className="
          rounded-2xl
          bg-gradient-to-r
          from-sky-400
          to-purple-400
          px-8
          py-4
          font-semibold
          text-white
          shadow-lg
        "
        >
          {loading
            ? "Saving..."
            : "Save Mood"}
        </button>

      </form>

    </div>

    {/* HISTORY + PUZZLE */}

    <div className="grid gap-8 xl:grid-cols-2">

      {/* HISTORY */}

       {/* HISTORY */}

      <div
        className="
        rounded-[40px]
        bg-white
        shadow-xl
        p-8
        h-[700px]
        flex
        flex-col
      "
      >
        <h2 className="text-3xl font-bold mb-6">
          Mood History ✨
        </h2>

        <div
          className="
          flex-1
          overflow-y-auto
          pr-2
          custom-scrollbar
          space-y-4
        "
        >

          {history.map((entry) => (
            <div
              key={entry._id}
              className="
              rounded-3xl
              border
              border-purple-100
              bg-linear-to-r
              from-[#FCF8FF]
              to-[#F7FBFF]
              p-5
            "
            >

              <div className="flex gap-4">

                <div className="text-4xl">
                  {moodIcons[
                    entry.mood
                  ]}
                </div>

                <div>

                  <p className="font-semibold capitalize">
                    {entry.mood.replace(
                      "_",
                      " "
                    )}
                  </p>

                  {entry.note && (
                    <p className="mt-2 text-slate-500">
                      {entry.note}
                    </p>
                  )}

                  <p className="mt-2 text-sm text-slate-400">
                    {new Date(
                      entry.createdAt
                    ).toLocaleString()}
                  </p>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* PUZZLE TRACKER */}

      <div
        className="
        rounded-[40px]
        bg-white
        shadow-xl
        p-8
      "
      >

        <h2 className="text-3xl font-bold text-center">
          💜 Mood Puzzle Tracker 💜
        </h2>

        <div className="mt-8">

          <div className="grid grid-cols-7 gap-1">

            {Array.from({
  length: 31,
}).map((_, index) => {

  const day = index + 1;

  const mood =
    moodMap[day];

  return (
    <div
      key={day}
      className={`
        aspect-square
        rounded-xl
        border
        flex
        items-center
        justify-center
        font-medium
        transition-all
        ${
          mood
            ? moodColors[mood]
            : "bg-white border-purple-100"
        }
      `}
    >
      {day}
    </div>
  );
})}

          </div>

          <div className="mt-8 space-y-3">

            <div className="flex items-center gap-3">
              <div className="h-4 w-4 rounded-full bg-pink-300" />
              Very Happy
            </div>

            <div className="flex items-center gap-3">
              <div className="h-4 w-4 rounded-full bg-yellow-300" />
              Happy
            </div>

            <div className="flex items-center gap-3">
              <div className="h-4 w-4 rounded-full bg-green-300" />
              Neutral
            </div>

            <div className="flex items-center gap-3">
              <div className="h-4 w-4 rounded-full bg-blue-300" />
              Sad
            </div>

            <div className="flex items-center gap-3">
              <div className="h-4 w-4 rounded-full bg-purple-300" />
              Very Sad
            </div>

          </div>

        </div>

      </div>

    </div>

  </div>
);
}