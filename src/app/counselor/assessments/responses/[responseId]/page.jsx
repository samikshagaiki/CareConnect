"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const OPTIONS = [
  "Strongly Disagree",
  "Disagree",
  "Neutral",
  "Agree",
  "Strongly Agree",
];

export default function ResponsePage() {
  const params =
    useParams();

  const [response,
    setResponse] =
    useState(null);

    const [notes, setNotes] =
  useState("");

  async function fetchResponse() {
    const res =
      await fetch(
        `/api/counselor/custom-assessment-responses/${params.responseId}`
      );

    const data =
      await res.json();

    if (data.success) {
      setResponse(
        data.response
      );
    }

  setNotes(
    data.response
      ?.counselorNotes || ""
  );
}

async function saveNotes() {
  const response =
    await fetch(
      `/api/counselor/assessment-notes/${params.responseId}`,
      {
        method: "PATCH",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          notes,
        }),
      }
    );

  const data =
    await response.json();

  if (data.success) {
    alert(
      "Notes saved successfully"
    );
  }
}

  useEffect(() => {
    if (
      params.responseId
    ) {
      fetchResponse();
    }
  }, [params]);

  if (!response) {
    return (
      <div>
        Loading...
      </div>
    );
  }

 return (
  <div className="mx-auto max-w-6xl space-y-8">

    {/* Header */}

    <div
      className="
      rounded-[32px]
      border
      border-slate-200
      bg-white
      p-8
      shadow-sm
    "
    >

      <p className="text-sm font-medium uppercase tracking-wider text-blue-600">
        Assessment Review
      </p>

      <h1 className="mt-2 text-4xl font-bold text-slate-800">
        {response.template?.title}
      </h1>

      <p className="mt-3 text-slate-500">
        Review patient responses and record professional observations.
      </p>

    </div>

    {/* Patient Info */}

    <div className="grid gap-5 md:grid-cols-3">

      <div
        className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
      "
      >
        <p className="text-sm text-slate-500">
          Patient
        </p>

        <h3 className="mt-2 text-2xl font-bold text-slate-800">
          {response.patient?.anonymousName}
        </h3>
      </div>

      <div
        className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
      "
      >
        <p className="text-sm text-slate-500">
          Submitted
        </p>

        <h3 className="mt-2 font-semibold text-slate-800">
          {new Date(
            response.submittedAt
          ).toLocaleDateString()}
        </h3>
      </div>

      <div
        className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
      "
      >
        <p className="text-sm text-slate-500">
          Assessment Type
        </p>

        <h3 className="mt-2 font-semibold text-slate-800">
          {response.score > 0
            ? "PHQ-9"
            : "Custom Assessment"}
        </h3>
      </div>

    </div>

    {/* PHQ9 Result */}

    {response.score > 0 ? (

      <div
        className="
        rounded-[32px]
        border
        border-slate-200
        bg-white
        p-8
        shadow-sm
      "
      >

        <h2 className="text-2xl font-bold text-slate-800">
          Assessment Summary
        </h2>

        <div className="mt-6 grid gap-6 md:grid-cols-2">

          <div
            className="
            rounded-3xl
            bg-slate-50
            p-6
          "
          >
            <p className="text-sm text-slate-500">
              Total Score
            </p>

            <h3 className="mt-3 text-5xl font-bold text-blue-600">
              {response.score}
            </h3>
          </div>

          <div
            className="
            rounded-3xl
            bg-slate-50
            p-6
          "
          >
            <p className="text-sm text-slate-500">
              Severity Level
            </p>

            <h3 className="mt-3 text-2xl font-bold text-slate-800">
              {response.severity}
            </h3>
          </div>

        </div>

      </div>

    ) : (

      <div
        className="
        rounded-[32px]
        border
        border-slate-200
        bg-white
        p-8
        shadow-sm
      "
      >

        <h2 className="mb-6 text-2xl font-bold text-slate-800">
          Patient Responses
        </h2>

        <div className="space-y-5">

          {response.template.questions.map(
            (
              question,
              index
            ) => (

              <div
                key={index}
                className="
                rounded-3xl
                border
                border-slate-200
                p-6
              "
              >

                <p className="font-semibold text-slate-800">
                  Q{index + 1}.{" "}
                  {question.question}
                </p>

                <div
                  className="
                  mt-4
                  inline-flex
                  rounded-full
                  bg-blue-50
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-blue-700
                "
                >
                  {
                    OPTIONS[
                      response.answers[
                        index
                      ]
                    ]
                  }
                </div>

              </div>

            )
          )}

        </div>

      </div>

    )}

    {/* Counselor Notes */}

    <div
      className="
      rounded-[32px]
      border
      border-slate-200
      bg-white
      p-8
      shadow-sm
    "
    >

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-slate-800">
            Counselor Notes
          </h2>

          <p className="mt-1 text-slate-500">
            Record observations and recommendations.
          </p>

        </div>

      </div>

      <textarea
        value={notes}
        onChange={(e) =>
          setNotes(
            e.target.value
          )
        }
        rows={10}
        placeholder="Write clinical observations, recommendations, risk indicators, follow-up plans..."
        className="
        mt-6
        w-full
        rounded-2xl
        border
        border-slate-300
        p-5
        focus:border-blue-500
        focus:outline-none
      "
      />

      <button
        onClick={saveNotes}
        className="
        mt-6
        rounded-2xl
        bg-blue-600
        px-6
        py-3
        font-medium
        text-white
        transition
        hover:bg-blue-700
      "
      >
        Save Notes
      </button>

    </div>

  </div>
);
}