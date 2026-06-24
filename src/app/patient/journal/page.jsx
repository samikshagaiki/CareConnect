"use client";

import { useEffect, useState } from "react";



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
  <div className="space-y-8">

    {/* HEADER */}

    <div>
      <h1 className="text-5xl font-bold text-slate-800">
        My Journal
        <span className="ml-3 text-purple-400">
          ✨
        </span>
      </h1>

      <p className="mt-3 text-lg text-slate-500">
        A safe place to reflect, write and express yourself.
      </p>
    </div>

    {/* MAIN SECTION */}

    <div
      className="
      overflow-hidden
      rounded-[40px]
      bg-white
      shadow-xl
    "
    >

      <div className="grid lg:grid-cols-[1.5fr_0.9fr]">

        {/* JOURNAL WRITING AREA */}

        <div
          className="
          p-10
          bg-linear-to-br
          from-[#F8F3FF]
          via-white
          to-[#EEF8FF]
        "
        >

          <h2 className="text-3xl font-bold text-slate-800">
            Today&apos;s Entry 💜
          </h2>

          <p className="mt-2 text-slate-500">
            Write freely. Your thoughts matter.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
          >

            <input
              type="text"
              placeholder="Journal Title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              required
              className="
                w-full
                rounded-2xl
                border
                border-purple-100
                bg-white
                px-5
                py-4
                outline-none
                focus:ring-4
                focus:ring-purple-100
              "
            />

            {/* NOTEBOOK */}

            <div
              className="
              relative
              h-130
              overflow-hidden
              rounded-[30px]
              border
              border-purple-100
              bg-white
              shadow-inner
            "
            >

              {/* NOTEBOOK LINES */}

              <div
                className="
                absolute
                inset-0
                opacity-30
                pointer-events-none
              "
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(transparent, transparent 35px, #dbeafe 36px)",
                }}
              />

              {/* LEFT MARGIN */}

              <div
                className="
                absolute
                top-0
                bottom-0
                left-16
                w-0.5
                bg-pink-200
                opacity-70
              "
              />

              <textarea
                rows={12}
                value={content}
                onChange={(e) =>
                  setContent(
                    e.target.value
                  )
                }
                placeholder="Dear Journal..."
                required
                className="
                  relative
                  z-10
                  h-full
                  w-full
                  resize-none
                  bg-transparent
                  p-8
                  pl-24
                  text-lg
                  leading-9
                  outline-none
                "
              />

            </div>

            <button
              type="submit"
              disabled={loading}
              className="
              rounded-2xl
              bg-linear-to-r
              from-[#8EC5FC]
              to-[#DCCCFD]
              px-8
              py-4
              font-semibold
              text-white
              shadow-lg
              transition-all
              hover:scale-[1.02]
            "
            >
              {loading
                ? "Saving..."
                : "Save Journal"}
            </button>

          </form>

        </div>

        {/* JOURNAL HISTORY */}

        <div
          className="
          flex
          h-212.5
          flex-col
          border-l
          border-purple-100
          bg-white
          p-8
        "
        >

          <h2 className="text-2xl font-bold">
            Past Entries 📖
          </h2>

          <p className="mt-2 text-slate-500">
            Revisit your journey.
          </p>

          <div
            className="
            mt-6
            flex-1
            space-y-4
            overflow-y-auto
            pr-2
            custom-scrollbar
          "
          >

            {journals.length === 0 ? (
              <div
                className="
                rounded-3xl
                border
                border-dashed
                border-purple-200
                p-8
                text-center
                text-slate-500
              "
              >
                No journal entries yet.
              </div>
            ) : (
              journals.map(
                (journal) => (
                  <div
                    key={journal._id}
                    className="
                    rounded-3xl
                    border
                    border-purple-100
                    bg-linear-to-r
                    from-[#FCF8FF]
                    to-[#F7FBFF]
                    p-5
                    transition-all
                    hover:shadow-md
                  "
                  >

                    <h3 className="font-semibold text-slate-800">
                      {journal.title}
                    </h3>

                    <p
                      className="
                      mt-3
                      line-clamp-4
                      text-sm
                      text-slate-500
                    "
                    >
                      {journal.content}
                    </p>

                    <p
                      className="
                      mt-4
                      text-xs
                      text-slate-400
                    "
                    >
                      {new Date(
                        journal.createdAt
                      ).toLocaleString()}
                    </p>

                  </div>
                )
              )
            )}

          </div>

        </div>

      </div>

    </div>

  </div>
);
}