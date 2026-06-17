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
    <div>

      <h1 className="text-3xl font-bold">
        {
          response.template
            ?.title
        }
      </h1>

      <p className="mt-2">
        Patient:
        {" "}
        {
          response.patient
            ?.anonymousName
        }
      </p>

      <div className="mt-8 space-y-4">

        {response.score >
        0 ? (
          <>
            <div className="rounded-3xl border p-6">
              <p>
                Score:
                {" "}
                {
                  response.score
                }
              </p>

              <p>
                Severity:
                {" "}
                {
                  response.severity
                }
              </p>
            </div>
          </>
        ) : (
          response.template.questions.map(
            (
              question,
              index
            ) => (
              <div
                key={index}
                className="rounded-3xl border p-6"
              >
                <h3 className="font-semibold">
                  {
                    question.question
                  }
                </h3>

                <p className="mt-2">
                  Answer:
                  {" "}
                  {
                    OPTIONS[
                      response.answers[
                        index
                      ]
                    ]
                  }
                </p>
              </div>
            )
          )
        )}

      </div>

      <div className="mt-8 rounded-3xl border p-6">

  <h2 className="text-xl font-semibold">
    Counselor Notes
  </h2>

  <textarea
    value={notes}
    onChange={(e) =>
      setNotes(
        e.target.value
      )
    }
    rows={6}
    className="mt-4 w-full rounded-xl border p-4"
    placeholder="Write your observations..."
  />

  <button
    onClick={saveNotes}
    className="mt-4 rounded-xl bg-primary px-5 py-2 text-primary-foreground"
  >
    Save Notes
  </button>

</div>

    </div>
  );
}