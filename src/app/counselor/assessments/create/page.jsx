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

  return (
    <div className="mx-auto max-w-4xl">

      <h1 className="text-4xl font-bold">
        Create Custom Assessment
      </h1>

      <p className="mt-2 text-muted-foreground">
        Create a personalized
        assessment and assign it
        to a patient.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-6"
      >

        <div>
          <label className="mb-2 block font-medium">
            Assessment Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            className="w-full rounded-xl border p-3"
            placeholder="Sleep Quality Assessment"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            rows={3}
            className="w-full rounded-xl border p-3"
            placeholder="Purpose of this assessment"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Assign To Patient
          </label>

          <select
            value={patientId}
            onChange={(e) =>
              setPatientId(
                e.target.value
              )
            }
            className="w-full rounded-xl border p-3"
            required
          >
            {patients.map(
              (patient) => (
                <option
                  key={
                    patient._id
                  }
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

        <div>
          <div className="mb-4 flex items-center justify-between">

            <h2 className="text-xl font-semibold">
              Questions
            </h2>

            <button
              type="button"
              onClick={
                addQuestion
              }
              className="rounded-xl border px-4 py-2"
            >
              Add Question
            </button>

          </div>

          <div className="space-y-4">

            {questions.map(
              (
                question,
                index
              ) => (
                <div
                  key={index}
                  className="flex gap-3"
                >

                  <input
                    type="text"
                    value={question}
                    onChange={(
                      e
                    ) =>
                      updateQuestion(
                        index,
                        e.target
                          .value
                      )
                    }
                    placeholder={`Question ${
                      index + 1
                    }`}
                    className="flex-1 rounded-xl border p-3"
                    required
                  />

                  {questions.length >
                    1 && (
                    <button
                      type="button"
                      onClick={() =>
                        removeQuestion(
                          index
                        )
                      }
                      className="rounded-xl bg-red-500 px-4 text-white"
                    >
                      X
                    </button>
                  )}

                </div>
              )
            )}

          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-primary px-6 py-3 text-primary-foreground"
        >
          {loading
            ? "Creating..."
            : "Create Assessment"}
        </button>

      </form>

    </div>
  );
}