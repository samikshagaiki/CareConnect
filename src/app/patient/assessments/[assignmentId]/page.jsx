"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function AssessmentPage() {
  const params = useParams();

  const assignmentId =
    params?.assignmentId;

  const [template, setTemplate] =
    useState(null);

  const [answers, setAnswers] =
    useState([]);

  const [submitted, setSubmitted] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  async function fetchAssessment() {
    try {
      if (!assignmentId) {
        return;
      }

      console.log(
        "Assignment ID:",
        assignmentId
      );

      const response =
        await fetch(
          `/api/patient/assigned-assessments/${assignmentId}`
        );

      const data =
        await response.json();

      console.log(
        "Assessment Data:",
        data
      );

      if (data.success) {
        setTemplate(
          data.template
        );

        setAnswers(
          new Array(
            data.template.questions
              .length
          ).fill(2)
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAssessment();
  }, [assignmentId]);

  function updateAnswer(
    index,
    value
  ) {
    const updated =
      [...answers];

    updated[index] =
      Number(value);

    setAnswers(updated);
  }

  async function handleSubmit(
    e
  ) {
    e.preventDefault();

    try {
      const response =
        await fetch(
          `/api/patient/assigned-assessments/${assignmentId}/submit`,
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

      if (data.success) {
        setSubmitted(true);
      } else {
        alert(
          "Failed to submit assessment."
        );
      }
    } catch (error) {
      console.error(error);

      alert(
        "Something went wrong."
      );
    }
  }

  if (loading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  if (!template) {
    return (
      <div>
        Assessment not found.
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold">
          Assessment Submitted
        </h1>

        <p className="mt-4 text-muted-foreground">
          Thank you for completing
          the assessment.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-4xl font-bold">
        {template.title}
      </h1>

      <p className="mt-2 text-muted-foreground">
        {template.description}
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-6"
      >
        {template.questions.map(
          (
            question,
            index
          ) => (
            <div
              key={index}
              className="rounded-3xl border p-6"
            >
              <h2 className="text-lg font-medium">
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
                          updateAnswer(
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
          className="rounded-xl bg-primary px-6 py-3 text-primary-foreground"
        >
          Submit Assessment
        </button>
      </form>
    </div>
  );
}