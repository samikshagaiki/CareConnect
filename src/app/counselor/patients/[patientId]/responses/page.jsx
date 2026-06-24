"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function PatientResponsesPage() {

  const params =
    useParams();

  const [
    responses,
    setResponses,
  ] = useState([]);

  const [loading, setLoading] =
    useState(true);

  async function fetchResponses() {
    try {

      const response =
        await fetch(
          `/api/counselor/patients/${params.patientId}/responses`
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
    if (
      params.patientId
    ) {
      fetchResponses();
    }
  }, [params.patientId]);

  if (loading) {
    return (
      <div>
        Loading responses...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div
        className="
        rounded-[28px]
        border
        border-slate-200
        bg-white
        p-8
        shadow-sm
      "
      >

        <h1 className="text-4xl font-bold text-slate-800">
          Assessment Responses
        </h1>

        <p className="mt-2 text-slate-500">
          Review assessments submitted by this patient.
        </p>

      </div>

      {/* Responses */}

      {responses.length === 0 ? (

        <div
          className="
          rounded-3xl
          border
          bg-white
          p-8
          text-center
          shadow-sm
        "
        >
          No responses found.
        </div>

      ) : (

        <div className="space-y-5">

          {responses.map(
            (response) => (

              <div
                key={response._id}
                className="
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-6
                shadow-sm
              "
              >

                <div className="flex items-center justify-between">

                  <div>

                    <h2 className="text-xl font-semibold">
                      {
                        response
                          .templateId
                          ?.title
                      }
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Submitted on{" "}
                      {new Date(
                        response.submittedAt
                      ).toLocaleDateString()}
                    </p>

                  </div>

                  <Link
                    href={`/counselor/assessments/responses/${response._id}`}
                    className="
                    rounded-xl
                    bg-slate-900
                    px-4
                    py-2
                    text-sm
                    font-medium
                    text-white
                  "
                  >
                    Review
                  </Link>

                </div>

                {response.score >
                  0 && (

                  <div className="mt-5 flex gap-6">

                    <div>
                      <p className="text-sm text-slate-500">
                        Score
                      </p>

                      <p className="text-2xl font-bold">
                        {
                          response.score
                        }
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-slate-500">
                        Severity
                      </p>

                      <p className="font-medium">
                        {
                          response.severity
                        }
                      </p>
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