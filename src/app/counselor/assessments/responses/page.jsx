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
    <div>
      <h1 className="text-4xl font-bold">
        Patient Assessment History
      </h1>

      <p className="mt-2 text-muted-foreground">
        Review all completed
        assessments submitted by
        your patients.
      </p>

      <div className="mt-8 space-y-8">
        {responses.length === 0 ? (
          <div className="rounded-3xl border p-6">
            No assessment responses
            found.
          </div>
        ) : (
          responses.map(
            (response) => (
              <div
                key={response._id}
                className="rounded-3xl border bg-card p-6 shadow-sm"
              >
                {/* Header */}

                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold">
                      {
                        response
                          .patient
                          ?.anonymousName
                      }
                    </h2>

                    <p className="text-sm text-muted-foreground">
                      Submitted on{" "}
                      {new Date(
                        response.submittedAt
                      ).toLocaleString()}
                    </p>
                  </div>

                  <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-sm font-medium">
                    {
                      response
                        .template
                        ?.title
                    }
                  </span>
                </div>

                {/* PHQ9 */}

                {response.score >
                  0 && (
                  <div className="mt-6 rounded-2xl border p-4">
                    <h3 className="font-semibold">
                      Assessment
                      Summary
                    </h3>

                    <div className="mt-3 grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Score
                        </p>

                        <p className="text-2xl font-bold">
                          {
                            response.score
                          }
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground">
                          Severity
                        </p>

                        <p className="text-lg font-semibold">
                          {
                            response.severity
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Custom Assessment */}

                {response.answers
                  ?.length >
                  0 &&
                  response
                    .template
                    ?.questions && (
                    <div className="mt-6">
                      <h3 className="mb-4 text-lg font-semibold">
                        Responses
                      </h3>

                      <div className="space-y-4">
                        {response.template.questions.map(
                          (
                            question,
                            index
                          ) => (
                            <div
                              key={
                                index
                              }
                              className="rounded-2xl border p-4"
                            >
                              <p className="font-medium">
                                {
                                  question.question
                                }
                              </p>

                              <p className="mt-3 text-muted-foreground">
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
                        )}
                      </div>
                    </div>
                  )}
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}