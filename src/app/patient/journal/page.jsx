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

export default function JournalPage() {
  const [title, setTitle] =
    useState("");

  const [content, setContent] =
    useState("");

  const [moodTag, setMoodTag] =
    useState("neutral");

  const [journals, setJournals] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  async function fetchJournals() {
    try {
      const response =
        await fetch("/api/journal");

      const data =
        await response.json();

      if (data.success) {
        setJournals(data.journals);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const response =
        await fetch("/api/journal", {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            title,
            content,
            moodTag,
          }),
        });

      const data =
        await response.json();

      if (!data.success) {
        alert(data.message);
        return;
      }

      setTitle("");
      setContent("");
      setMoodTag("neutral");

      await fetchJournals();

      alert(
        "Journal saved successfully"
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
    fetchJournals();
  }, []);

  return (
    <div>

      <h1 className="text-4xl font-bold">
        Journal
      </h1>

      <p className="mt-2 text-muted-foreground">
        Write your thoughts and
        feelings freely.
      </p>

      <div className="mt-8 rounded-3xl border bg-card p-6">

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            placeholder="Journal Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full rounded-xl border p-3"
            required
          />

          <select
            value={moodTag}
            onChange={(e) =>
              setMoodTag(
                e.target.value
              )
            }
            className="w-full rounded-xl border p-3"
          >
            {moods.map((mood) => (
              <option
                key={mood.value}
                value={mood.value}
              >
                {mood.label}
              </option>
            ))}
          </select>

          <textarea
            rows={8}
            placeholder="Write your thoughts..."
            value={content}
            onChange={(e) =>
              setContent(
                e.target.value
              )
            }
            className="w-full rounded-xl border p-3"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-primary px-6 py-3 text-primary-foreground"
          >
            {loading
              ? "Saving..."
              : "Save Journal"}
          </button>

        </form>

      </div>

      <div className="mt-10">

        <h2 className="mb-4 text-2xl font-bold">
          Journal History
        </h2>

        <div className="space-y-4">

          {journals.map(
            (journal) => (
              <div
                key={journal._id}
                className="rounded-2xl border bg-card p-5"
              >

                <h3 className="text-xl font-semibold">
                  {journal.title}
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  Mood:
                  {" "}
                  {journal.moodTag}
                </p>

                <p className="mt-4 whitespace-pre-wrap">
                  {journal.content}
                </p>

                <p className="mt-4 text-sm text-muted-foreground">
                  {new Date(
                    journal.createdAt
                  ).toLocaleString()}
                </p>

              </div>
            )
          )}

        </div>

      </div>

    </div>
  );
}