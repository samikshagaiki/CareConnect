"use client";

import { useEffect, useState } from "react";

export default function PHQ9Page() {
  const [assessment, setAssessment] =
    useState(null);

  const [answers, setAnswers] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState(null);

  async function fetchAssessment() {
    try {
      const response =
        await fetch(
          "/api/assessments/phq9"
        );

      const data =
        await response.json();

      if (data.success) {
        setAssessment(
          data.assessment
        );

        setAnswers(
          new Array(
            data.assessment.questions
              .length
          ).fill(0)
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchAssessment();
  }, []);

  function handleAnswerChange(
    questionIndex,
    value
  ) {
    const updatedAnswers =
      [...answers];

    updatedAnswers[
      questionIndex
    ] = Number(value);

    setAnswers(
      updatedAnswers
    );
  }

  async function handleSubmit(
    e
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const response =
        await fetch(
          "/api/assessments/phq9/submit",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              answers,
            }),
          }
        );

      const data =
        await response.json();

      if (!data.success) {
        alert(
          "Failed to submit assessment."
        );
        return;
      }

      setResult(
        data.response
      );
    } catch (error) {
      console.error(error);

      alert(
        "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  if (!assessment) {
    return (
      <div>
        Loading Assessment...
      </div>
    );
  }

  if (result) {
    return (
      <div className="mx-auto max-w-3xl">

        <h1 className="text-4xl font-bold">
          PHQ-9 Completed
        </h1>

        <div className="mt-8 rounded-3xl border bg-card p-8">

          <p className="text-xl">
            Your Score:
          </p>

          <p className="mt-2 text-5xl font-bold">
            {result.score}
          </p>

          <p className="mt-4 text-lg">
            Severity:
            {" "}
            <span className="font-semibold">
              {
                result.severity
              }
            </span>
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">

      <h1 className="text-4xl font-bold">
        PHQ-9 Assessment
      </h1>

      <p className="mt-2 text-muted-foreground">
        Over the last 2 weeks,
        how often have you been
        bothered by the following
        problems?
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-8"
      >

        {assessment.questions.map(
          (
            question,
            index
          ) => (
            <div
              key={index}
              className="rounded-3xl border bg-card p-6"
            >

              <h2 className="text-lg font-medium">
                {index + 1}.
                {" "}
                {
                  question.question
                }
              </h2>

              <div className="mt-4 space-y-2">

                {question.options.map(
                  (
                    option,
                    optionIndex
                  ) => (
                    <label
                      key={
                        optionIndex
                      }
                      className="flex items-center gap-3"
                    >

                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={
                          optionIndex
                        }
                        checked={
                          answers[
                            index
                          ] ===
                          optionIndex
                        }
                        onChange={(
                          e
                        ) =>
                          handleAnswerChange(
                            index,
                            e.target
                              .value
                          )
                        }
                      />

                      <span>
                        {option}
                      </span>

                    </label>
                  )
                )}

              </div>

            </div>
          )
        )}

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-primary px-6 py-3 text-primary-foreground"
        >
          {loading
            ? "Submitting..."
            : "Submit Assessment"}
        </button>

      </form>

    </div>
  );
}