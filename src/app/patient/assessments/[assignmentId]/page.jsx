"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, AlertCircle } from "lucide-react";

export default function AssessmentPage() {
  const params = useParams();
  const assignmentId = params?.assignmentId;

  const [template, setTemplate] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchAssessment = useCallback(async () => {
    try {
      if (!assignmentId) return;

      const response = await fetch(
        `/api/patient/assigned-assessments/${assignmentId}`
      );
      const data = await response.json();

      if (data.success && data.template) {
        setTemplate(data.template);
        setAnswers(new Array(data.template.questions.length).fill(null));
      } else {
        setErrorMessage(data.message || "Assessment could not be loaded.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Network error while loading assessment.");
    } finally {
      setLoading(false);
    }
  }, [assignmentId]);

  useEffect(() => {
    if (assignmentId) {
      fetchAssessment();
    }
  }, [assignmentId, fetchAssessment]);

  useEffect(() => {
    async function markNotificationsRead() {
      try {
        await fetch("/api/notifications/read", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "assessment",
          }),
        });
      } catch (e) {
        console.error("Failed to mark assessment notifications read", e);
      }
    }

    markNotificationsRead();
  }, []);

  function updateAnswer(index, value) {
    const updated = [...answers];
    updated[index] = Number(value);
    setAnswers(updated);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (submitting) return;

    const unansweredCount = answers.filter((a) => a === null).length;
    if (unansweredCount > 0) {
      alert(`Please answer all questions before submitting (${unansweredCount} remaining).`);
      return;
    }

    try {
      setSubmitting(true);
      const response = await fetch(
        `/api/patient/assigned-assessments/${assignmentId}/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            answers,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        alert(data.message || "Failed to submit assessment.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong submitting your assessment.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-12">
        <div className="rounded-[32px] bg-white border border-slate-200 p-12 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
            <Loader2 className="animate-spin" size={28} />
          </div>
          <h2 className="mt-5 text-xl font-bold text-slate-800">Loading Assessment...</h2>
          <p className="mt-2 text-slate-500">Preparing your wellness questions</p>
        </div>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="max-w-4xl mx-auto py-12">
        <div className="rounded-[32px] bg-white border border-slate-200 p-12 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
            <AlertCircle size={28} />
          </div>
          <h2 className="mt-5 text-2xl font-bold text-slate-800">Assessment Unavailable</h2>
          <p className="mt-2 text-slate-500">{errorMessage || "This assessment could not be found or has expired."}</p>
          <div className="mt-6">
            <Link
              href="/patient/assessments"
              className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
            >
              <ArrowLeft size={18} /> Back to Assessments
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto py-8">
        <div className="rounded-[40px] bg-white border border-purple-100 shadow-xl p-12 text-center">
          <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-linear-to-r from-[#8EC5FC] to-[#DCCCFD] text-5xl">
            🎉
          </div>
          <h1 className="mt-8 text-4xl font-bold">Assessment Submitted</h1>
          <p className="mt-4 text-slate-500 text-lg">
            Thank you for completing your assessment. Your responses have been securely shared with your counselor.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/patient/dashboard"
              className="rounded-2xl bg-purple-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-purple-700"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/patient/assessments"
              className="rounded-2xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              View Assessments
            </Link>
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
      bg-linear-to-r
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
      rounded-4xl
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
          bg-linear-to-r
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
            rounded-4xl
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
                bg-linear-to-r
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
        rounded-3xl
        bg-linear-to-r
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