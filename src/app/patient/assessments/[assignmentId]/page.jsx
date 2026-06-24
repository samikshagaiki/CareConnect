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
    data.template.questions.length
  ).fill(null)
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
    <div className="max-w-3xl mx-auto">

      <div
        className="
        rounded-[40px]
        bg-white
        border
        border-purple-100
        shadow-xl
        p-12
        text-center
      "
      >

        <div
          className="
          mx-auto
          flex
          h-28
          w-28
          items-center
          justify-center
          rounded-full
          bg-gradient-to-r
          from-[#8EC5FC]
          to-[#DCCCFD]
          text-5xl
        "
        >
          🎉
        </div>

        <h1 className="mt-8 text-4xl font-bold">
          Assessment Submitted
        </h1>

        <p className="mt-4 text-slate-500 text-lg">
          Thank you for completing your assessment.
          Your responses have been shared with your counselor.
        </p>

      </div>

    </div>
  );
}

  return (
  <div className="max-w-5xl mx-auto space-y-8">

    {/* HERO */}

    <section
      className="
      relative
      overflow-hidden
      rounded-[40px]
      bg-gradient-to-r
      from-[#8EC5FC]
      to-[#DCCCFD]
      p-10
      shadow-xl
    "
    >

      <div className="relative z-10">

        <h1 className="text-5xl font-bold text-white">
          {template.title}
        </h1>

        <p className="mt-4 text-lg text-white/90">
          {template.description}
        </p>

        <div className="mt-6 inline-flex rounded-full bg-white/20 px-5 py-3 text-white backdrop-blur-sm">
          {template.questions.length} Questions
        </div>

      </div>

      <div
        className="
        absolute
        -right-10
        -top-10
        h-64
        w-64
        rounded-full
        bg-white/10
      "
      />

    </section>

    {/* PROGRESS */}

    <div
      className="
      rounded-[32px]
      bg-white
      border
      border-purple-100
      p-6
      shadow-lg
    "
    >
      <div className="flex justify-between mb-3">

        <span className="font-medium">
          Progress
        </span>

        <span className="text-slate-500">
          {
            answers.filter(
              (a) => a !== null
            ).length
          }
          /
          {template.questions.length}
        </span>

      </div>

      <div className="h-3 rounded-full bg-slate-100 overflow-hidden">

        <div
          className="
          h-full
          bg-gradient-to-r
          from-[#8EC5FC]
          to-[#DCCCFD]
          transition-all
        "
          style={{
            width: `${
              (
                answers.filter(
                  (a) => a !== null
                ).length /
                template.questions.length
              ) * 100
            }%`,
          }}
        />

      </div>

    </div>

    {/* QUESTIONS */}

    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >

      {template.questions.map(
        (question, index) => (

          <div
            key={index}
            className="
            rounded-[32px]
            bg-white
            border
            border-purple-100
            p-8
            shadow-lg
          "
          >

            <div className="flex items-center gap-4">

              <div
                className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-gradient-to-r
                from-[#8EC5FC]
                to-[#DCCCFD]
                text-white
                font-bold
              "
              >
                {index + 1}
              </div>

              <h2 className="text-xl font-semibold">
                {question.question}
              </h2>

            </div>

            <div className="mt-6 space-y-3">

              {question.options.map(
                (
                  option,
                  optionIndex
                ) => (

                  <button
                    key={optionIndex}
                    type="button"
                    onClick={() =>
                      updateAnswer(
                        index,
                        optionIndex
                      )
                    }
                    className={`
                      w-full
                      rounded-2xl
                      border
                      p-4
                      text-left
                      transition-all
                      ${
                        answers[index] ===
                        optionIndex
                          ? `
                            border-purple-300
                            bg-[#F8F3FF]
                            shadow-md
                          `
                          : `
                            border-slate-200
                            hover:border-sky-300
                          `
                      }
                    `}
                  >
                    {option}
                  </button>

                )
              )}

            </div>

          </div>

        )
      )}

      <button
        type="submit"
        className="
        w-full
        rounded-[24px]
        bg-gradient-to-r
        from-[#8EC5FC]
        to-[#DCCCFD]
        py-5
        text-lg
        font-semibold
        text-white
        shadow-lg
      "
      >
        Submit Assessment ✨
      </button>

    </form>

  </div>
);
}