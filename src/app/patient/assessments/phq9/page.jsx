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
  const severityColor =
    result.severity?.toLowerCase().includes("minimal")
      ? "bg-green-100 text-green-600"
      : result.severity?.toLowerCase().includes("mild")
      ? "bg-sky-100 text-sky-600"
      : result.severity?.toLowerCase().includes("moderate")
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-600";

  return (
    <div className="max-w-4xl mx-auto">

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
          h-32
          w-32
          items-center
          justify-center
          rounded-full
          bg-gradient-to-r
          from-[#8EC5FC]
          to-[#DCCCFD]
          text-5xl
          font-bold
          text-white
        "
        >
          {result.score}
        </div>

        <h1 className="mt-8 text-4xl font-bold">
          Assessment Complete 🎉
        </h1>

        <p className="mt-3 text-slate-500">
          Thank you for taking time to reflect on your wellbeing.
        </p>

        <div
          className={`
          mt-6
          inline-flex
          rounded-full
          px-5
          py-3
          font-medium
          ${severityColor}
        `}
        >
          {result.severity}
        </div>

        <div
          className="
          mt-10
          rounded-[28px]
          bg-[#F8F3FF]
          p-8
          text-left
        "
        >

          <h3 className="text-xl font-semibold">
            🌱 Wellness Reminder
          </h3>

          <p className="mt-3 text-slate-600">
            Assessment scores are only indicators and do not
            replace professional diagnosis. Continue tracking
            your mood, journaling regularly, and staying
            connected with your counselor.
          </p>

        </div>

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
          PHQ-9 Assessment 🧠
        </h1>

        <p className="mt-4 text-lg text-white/90">
          Over the last two weeks, how often have you been
          bothered by the following problems?
        </p>

        <div className="mt-6 inline-flex rounded-full bg-white/20 px-5 py-3 text-white backdrop-blur-sm">
          9 Questions
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
              (a) => a !== undefined
            ).length
          }
          /
          {assessment.questions.length}
        </span>

      </div>

      <div className="h-3 rounded-full bg-slate-100 overflow-hidden">

        <div
          className="
          h-full
          bg-gradient-to-r
          from-[#8EC5FC]
          to-[#DCCCFD]
        "
          style={{
            width: `${
              (
                answers.filter(
                  (a) => a !== undefined
                ).length /
                assessment.questions.length
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

      {assessment.questions.map(
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
                      handleAnswerChange(
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
        disabled={loading}
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
        {loading
          ? "Submitting..."
          : "Submit Assessment ✨"}
      </button>

    </form>

  </div>
);
}