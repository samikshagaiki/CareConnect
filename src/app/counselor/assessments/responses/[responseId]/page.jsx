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

  const [aiReport, setAiReport] = useState(null);
const [reportLoading, setReportLoading] = useState(false);
const [reportError, setReportError] = useState("");

async function fetchAIReport() {
  try {
    const res = await fetch(
      `/api/counselor/custom-assessment-responses/${params.responseId}/ai-report`
    );

    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(
        data.message || "Could not load AI report"
      );
    }

    setAiReport(data.report);
  } catch (error) {
    console.error("Fetch AI report error:", error);
  }
}

async function generateAIReport() {
  try {
    setReportLoading(true);
    setReportError("");

    const res = await fetch(
      `/api/counselor/custom-assessment-responses/${params.responseId}/ai-report`,
      {
        method: "POST",
      }
    );

    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(
        data.message || "Failed to generate report"
      );
    }

    setAiReport(data.report);

  } catch (error) {
    console.error("AI report generation error:", error);

    setReportError(
      error.message || "Something went wrong."
    );
  } finally {
    setReportLoading(false);
  }
}

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
  if (params.responseId) {
    fetchResponse();
    fetchAIReport();
  }
}, [params.responseId]);

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


{/* AI Assessment Report */}

<div
  className="
    rounded-[32px]
    border border-slate-200
    bg-white
    p-8
    shadow-sm
    space-y-6
  "
>
  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

    <div>
      <p className="text-sm font-medium uppercase tracking-wider text-blue-600">
        AI-Powered Insights
      </p>

      <h2 className="mt-2 text-2xl font-bold text-slate-800">
        Assessment Analysis Report
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        AI-assisted summary of the patient's submitted responses.
      </p>
    </div>

    <button
      type="button"
      onClick={generateAIReport}
      disabled={reportLoading}
      className="
        rounded-2xl
        bg-blue-600
        px-6
        py-3
        font-medium
        text-white
        transition
        hover:bg-blue-700
        disabled:cursor-not-allowed
        disabled:opacity-50
      "
    >
      {reportLoading
        ? "Generating Report..."
        : aiReport
          ? "View Saved Report"
          : "Generate AI Report"}
    </button>

  </div>

  {reportError && (
    <div className="rounded-2xl bg-red-50 p-4 text-sm text-red-700">
      {reportError}
    </div>
  )}

  {!aiReport && !reportLoading && (
    <div className="rounded-3xl bg-slate-50 p-8 text-center">
      <h3 className="text-lg font-semibold text-slate-800">
        No AI Report Generated Yet
      </h3>

      <p className="mt-2 text-sm text-slate-500">
        Generate a report to review response summaries,
        observed patterns, and suggested discussion points.
      </p>
    </div>
  )}

  {reportLoading && (
    <div className="rounded-3xl bg-slate-50 p-8 text-center">
      <p className="font-medium text-slate-700">
        Analyzing assessment responses...
      </p>

      <p className="mt-2 text-sm text-slate-500">
        This may take a few seconds.
      </p>
    </div>
  )}

  {aiReport?.report && (
    <div className="space-y-6">

      {/* Overview */}

      <div className="rounded-3xl bg-blue-50 p-6">
        <h3 className="text-lg font-bold text-blue-900">
          Overview
        </h3>

        <p className="mt-3 leading-7 text-slate-700">
          {aiReport.report.overview}
        </p>
      </div>

      {/* Response Summary */}

      <div className="rounded-3xl border border-slate-200 p-6">
        <h3 className="text-lg font-bold text-slate-800">
          Response Summary
        </h3>

        <p className="mt-3 leading-7 text-slate-600">
          {aiReport.report.responseSummary}
        </p>
      </div>

      {/* Reusable section */}

      {[
        {
          title: "Observed Patterns",
          items: aiReport.report.observedPatterns,
        },
        {
          title: "Areas for Discussion",
          items: aiReport.report.areasForDiscussion,
        },
        {
          title: "Positive Indicators",
          items: aiReport.report.positiveIndicators,
        },
        {
          title: "Suggested Discussion Questions",
          items: aiReport.report.suggestedQuestions,
        },
      ].map((section) => (
        <div
          key={section.title}
          className="rounded-3xl border border-slate-200 p-6"
        >
          <h3 className="text-lg font-bold text-slate-800">
            {section.title}
          </h3>

          {section.items?.length > 0 ? (
            <ul className="mt-4 space-y-3">
              {section.items.map((item, index) => (
                <li
                  key={index}
                  className="
                    flex gap-3
                    rounded-2xl
                    bg-slate-50
                    p-4
                    text-slate-600
                  "
                >
                  <span className="font-bold text-blue-600">
                    {index + 1}.
                  </span>

                  <span className="leading-6">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-slate-500">
              No specific observations in this section.
            </p>
          )}
        </div>
      ))}

      {/* Limitations */}

      <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6">
        <h3 className="font-bold text-amber-900">
          Report Limitations
        </h3>

        <p className="mt-3 text-sm leading-6 text-amber-800">
          {aiReport.report.limitations}
        </p>
      </div>

      <p className="text-xs leading-5 text-slate-500">
        Generated using AI on{" "}
        {new Date(aiReport.generatedAt).toLocaleString()}.
        This report is an automated summary of submitted responses,
        not a clinical diagnosis. Counselor review is required.
      </p>

    </div>
  )}
</div>



  </div>
);
}