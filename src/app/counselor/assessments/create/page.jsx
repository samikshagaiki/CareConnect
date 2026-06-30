"use client";

import { useEffect, useState } from "react";

export default function CreateAssessmentPage() {
  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [patients, setPatients] =
    useState([]);

  const [patientId, setPatientId] =
    useState("");

  const [questions, setQuestions] =
    useState([""]);

  const [loading, setLoading] =
    useState(false);

  async function fetchPatients() {
    try {
      const response =
        await fetch(
          "/api/counselor/patients"
        );

      const data =
        await response.json();

      if (data.success) {
        setPatients(
          data.patients
        );

        if (
          data.patients.length > 0
        ) {
          setPatientId(
            data.patients[0].userId
          );
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchPatients();
  }, []);

  function addQuestion() {
    setQuestions([
      ...questions,
      "",
    ]);
  }

  function updateQuestion(
    index,
    value
  ) {
    const updated =
      [...questions];

    updated[index] =
      value;

    setQuestions(updated);
  }

  function removeQuestion(
    index
  ) {
    const updated =
      questions.filter(
        (_, i) => i !== index
      );

    setQuestions(updated);
  }

  async function handleSubmit(
    e
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const formattedQuestions =
        questions
          .filter(
            (question) =>
              question.trim() !==
              ""
          )
          .map(
            (question) => ({
              question,

              options: [
                "Strongly Disagree",
                "Disagree",
                "Neutral",
                "Agree",
                "Strongly Agree",
              ],
            })
          );

      const response =
        await fetch(
          "/api/counselor/custom-assessments",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              title,

              description,

              patientId,

              questions:
                formattedQuestions,
            }),
          }
        );

      const data =
        await response.json();

      if (!data.success) {
        alert(
          "Failed to create assessment."
        );
        return;
      }

      alert(
        "Assessment created successfully."
      );

      setTitle("");
      setDescription("");
      setQuestions([""]);
    } catch (error) {
      console.error(error);

      alert(
        "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {

  async function markNotificationsRead() {

    await fetch(
      "/api/notifications/read",
      {
        method: "PATCH",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          type: "assessment",
        }),
      }
    );

  }

  markNotificationsRead();

}, []);

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
        Counselor Workspace
      </p>

      <h1 className="mt-2 text-4xl font-bold text-slate-800">
        Create Custom Assessment
      </h1>

      <p className="mt-3 max-w-3xl text-slate-500">
        Design personalized assessments for your patients,
        monitor their responses, and gain deeper insights
        into their wellbeing journey.
      </p>
    </div>

    {/* Summary Cards */}

    <div className="grid gap-5 md:grid-cols-3">

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">
          Patients Available
        </p>

        <h2 className="mt-3 text-4xl font-bold text-slate-800">
          {patients.length}
        </h2>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">
          Questions Added
        </p>

        <h2 className="mt-3 text-4xl font-bold text-blue-600">
          {questions.length}
        </h2>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">
          Assessment Type
        </p>

        <h2 className="mt-3 text-2xl font-semibold text-slate-800">
          Custom
        </h2>
      </div>

    </div>

    {/* Form */}

    <form
      onSubmit={handleSubmit}
      className="
      rounded-[32px]
      border
      border-slate-200
      bg-white
      p-8
      shadow-sm
      space-y-8
    "
    >

      {/* Basic Details */}

      <div className="grid gap-6 lg:grid-cols-2">

        <div>

          <label className="mb-2 block font-medium text-slate-700">
            Assessment Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            placeholder="Sleep Quality Assessment"
            className="
            w-full
            rounded-2xl
            border
            border-slate-300
            p-4
            focus:border-blue-500
            focus:outline-none
          "
            required
          />

        </div>

        <div>

          <label className="mb-2 block font-medium text-slate-700">
            Assign Patient
          </label>

          <select
            value={patientId}
            onChange={(e) =>
              setPatientId(
                e.target.value
              )
            }
            className="
            w-full
            rounded-2xl
            border
            border-slate-300
            p-4
            focus:border-blue-500
            focus:outline-none
          "
            required
          >
            {patients.map(
              (patient) => (
                <option
                  key={patient._id}
                  value={
                    patient.userId
                  }
                >
                  {
                    patient.anonymousName
                  }
                </option>
              )
            )}
          </select>

        </div>

      </div>

      {/* Description */}

      <div>

        <label className="mb-2 block font-medium text-slate-700">
          Description
        </label>

        <textarea
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          rows={4}
          placeholder="Explain the objective and purpose of this assessment."
          className="
          w-full
          rounded-2xl
          border
          border-slate-300
          p-4
          focus:border-blue-500
          focus:outline-none
        "
        />

      </div>

      {/* Questions Section */}

      <div>

        <div className="mb-6 flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold text-slate-800">
              Questions
            </h2>

            <p className="text-sm text-slate-500">
              Each question will use a 5-point Likert scale.
            </p>

          </div>

          <button
            type="button"
            onClick={addQuestion}
            className="
            rounded-2xl
            bg-blue-600
            px-5
            py-3
            font-medium
            text-white
            hover:bg-blue-700
          "
          >
            + Add Question
          </button>

        </div>

        <div className="space-y-5">

          {questions.map(
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
                bg-slate-50
                p-5
              "
              >

                <div className="mb-3 flex items-center justify-between">

                  <h3 className="font-semibold text-slate-700">
                    Question {index + 1}
                  </h3>

                  {questions.length >
                    1 && (
                    <button
                      type="button"
                      onClick={() =>
                        removeQuestion(
                          index
                        )
                      }
                      className="
                      rounded-xl
                      bg-red-500
                      px-4
                      py-2
                      text-sm
                      text-white
                      hover:bg-red-600
                    "
                    >
                      Remove
                    </button>
                  )}

                </div>

                <input
                  type="text"
                  value={question}
                  onChange={(e) =>
                    updateQuestion(
                      index,
                      e.target.value
                    )
                  }
                  placeholder="Enter question text..."
                  className="
                  w-full
                  rounded-2xl
                  border
                  border-slate-300
                  bg-white
                  p-4
                "
                  required
                />

              </div>

            )
          )}

        </div>

      </div>

      {/* Submit */}

      <div className="border-t border-slate-200 pt-6">

        <button
          type="submit"
          disabled={loading}
          className="
          rounded-2xl
          bg-blue-600
          px-8
          py-4
          font-medium
          text-white
          shadow-sm
          transition
          hover:bg-blue-700
          disabled:opacity-50
        "
        >
          {loading
            ? "Creating Assessment..."
            : "Create Assessment"}
        </button>

      </div>

    </form>

  </div>
);
}