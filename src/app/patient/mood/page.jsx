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

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div>

      <h1 className="text-4xl font-bold">
        Mood Tracking
      </h1>

      <p className="mt-2 text-muted-foreground">
        Track how you&apos;re feeling
        throughout the day.
      </p>

      <div className="mt-8 rounded-3xl border bg-card p-6">

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <div>

            <h2 className="mb-3 font-semibold">
              Select Your Mood
            </h2>

            <div className="grid gap-3 md:grid-cols-5">

              {moods.map((mood) => (
                <button
                  key={mood.value}
                  type="button"
                  onClick={() =>
                    setSelectedMood(
                      mood.value
                    )
                  }
                  className={`rounded-xl border p-3 ${
                    selectedMood ===
                    mood.value
                      ? "border-blue-500"
                      : ""
                  }`}
                >
                  {mood.label}
                </button>
              ))}

            </div>

          </div>

          <textarea
            value={note}
            onChange={(e) =>
              setNote(
                e.target.value
              )
            }
            placeholder="Add a note (optional)"
            rows={4}
            className="w-full rounded-xl border p-3"
          />

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-primary px-6 py-3 text-primary-foreground"
          >
            {loading
              ? "Saving..."
              : "Save Mood"}
          </button>

        </form>

      </div>

      <div className="mt-10">

        <h2 className="mb-4 text-2xl font-bold">
          Mood History
        </h2>

        <div className="space-y-4">

          {history.map((entry) => (
            <div
              key={entry._id}
              className="rounded-2xl border bg-card p-4"
            >

              <p className="font-semibold">
                {entry.mood}
              </p>

              <p className="mt-2 text-muted-foreground">
                {entry.note}
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                {new Date(
                  entry.createdAt
                ).toLocaleString()}
              </p>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}