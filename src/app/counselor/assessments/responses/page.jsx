"use client";

import { useEffect, useState } from "react";

const OPTIONS = [
  "Strongly Disagree",
  "Disagree",
  "Neutral",
  "Agree",
  "Strongly Agree",
];

export default function AssessmentResponsesPage() {
  const [responses, setResponses] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  async function fetchResponses() {
    try {
      const response =
        await fetch(
          "/api/counselor/custom-assessment-responses"
        );

      const data =
        await response.json();

      if (data.success) {
        setResponses(
          data.responses
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchResponses();
  }, []);

  if (loading) {
    return (
      <div>
        Loading responses...
      </div>
    );
  }

 return (
  <div className="mx-auto max-w-7xl space-y-8">

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
        Assessment Records
      </p>

      <h1 className="mt-2 text-4xl font-bold text-slate-800">
        Patient Assessment History
      </h1>

      <p className="mt-3 text-slate-500">
        Review completed assessments, analyze patient responses,
        and monitor wellbeing trends over time.
      </p>
    </div>

    {/* Stats */}

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
          Total Responses
        </p>

        <h2 className="mt-3 text-4xl font-bold text-slate-800">
          {responses.length}
        </h2>
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
          PHQ-9 Responses
        </p>

        <h2 className="mt-3 text-4xl font-bold text-blue-600">
          {
            responses.filter(
              (r) => r.score > 0
            ).length
          }
        </h2>
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
          Custom Assessments
        </p>

        <h2 className="mt-3 text-4xl font-bold text-slate-800">
          {
            responses.filter(
              (r) =>
                r.answers?.length > 0
            ).length
          }
        </h2>
      </div>

    </div>

    {/* Content */}

    {responses.length === 0 ? (

      <div
        className="
        rounded-[32px]
        border
        border-slate-200
        bg-white
        p-10
        text-center
        shadow-sm
      "
      >
        <h3 className="text-xl font-semibold text-slate-700">
          No Responses Found
        </h3>

        <p className="mt-2 text-slate-500">
          Completed patient assessments will appear here.
        </p>
      </div>

    ) : (

      <div className="space-y-6">

        {responses.map(
          (response) => (

            <div
              key={response._id}
              className="
              rounded-[32px]
              border
              border-slate-200
              bg-white
              p-8
              shadow-sm
            "
            >

              {/* Top */}

              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                <div>

                  <h2 className="text-2xl font-bold text-slate-800">
                    {
                      response.patient
                        ?.anonymousName
                    }
                  </h2>

                  <p className="mt-2 text-slate-500">
                    Submitted on{" "}
                    {new Date(
                      response.submittedAt
                    ).toLocaleString()}
                  </p>

                </div>

                <span
                  className="
                  w-fit
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
                    response.template
                      ?.title
                  }
                </span>

              </div>

              {/* PHQ-9 */}

              {response.score > 0 && (

                <div
                  className="
                  mt-6
                  grid
                  gap-4
                  md:grid-cols-2
                "
                >

                  <div
                    className="
                    rounded-3xl
                    bg-slate-50
                    p-6
                  "
                  >
                    <p className="text-sm text-slate-500">
                      Score
                    </p>

                    <h3 className="mt-2 text-4xl font-bold text-blue-600">
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
                      Severity
                    </p>

                    <h3 className="mt-2 text-xl font-semibold text-slate-800">
                      {response.severity}
                    </h3>
                  </div>

                </div>

              )}

              {/* Custom Assessment */}

              {response.answers?.length > 0 &&
                response.template?.questions && (

                <div className="mt-8">

                  <h3 className="mb-5 text-lg font-semibold text-slate-800">
                    Patient Responses
                  </h3>

                  <div className="space-y-4">

                    {response.template.questions.map(
                      (
                        question,
                        index
                      ) => (

                        <div
                          key={index}
                          className="
                          rounded-2xl
                          border
                          border-slate-200
                          p-5
                        "
                        >

                          <p className="font-medium text-slate-800">
                            Q{index + 1}.{" "}
                            {
                              question.question
                            }
                          </p>

                          <div
                            className="
                            mt-4
                            inline-flex
                            rounded-full
                            bg-slate-100
                            px-4
                            py-2
                            text-sm
                            font-medium
                            text-slate-700
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

            </div>

          )
        )}

      </div>

    )}

  </div>
);
}