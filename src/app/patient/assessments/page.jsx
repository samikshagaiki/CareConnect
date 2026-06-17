"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AssessmentsPage() {
  const [
    assignedAssessments,
    setAssignedAssessments,
  ] = useState([]);

  async function fetchAssignedAssessments() {
    try {
      const response =
        await fetch(
          "/api/patient/assigned-assessments"
        );

      const data =
        await response.json();

      if (data.success) {
        setAssignedAssessments(
          data.assessments
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchAssignedAssessments();
  }, []);

  return (
    <div>

      <h1 className="text-4xl font-bold">
        Assessments
      </h1>

      <p className="mt-2 text-muted-foreground">
        Complete assessments and
        track your wellbeing.
      </p>

      {/* Standard Assessments */}

      <div className="mt-10">

        <h2 className="text-2xl font-semibold">
          Standard Assessments
        </h2>

        <div className="mt-5 grid gap-5 md:grid-cols-2">

          <Link
            href="/patient/assessments/phq9"
            className="rounded-3xl border bg-card p-6 hover:border-primary"
          >
            <h3 className="text-xl font-semibold">
              PHQ-9
            </h3>

            <p className="mt-2 text-muted-foreground">
              Depression screening
              assessment.
            </p>
          </Link>

        </div>

      </div>

      {/* Assigned Assessments */}

      <div className="mt-12">

        <h2 className="text-2xl font-semibold">
          Assigned Assessments
        </h2>

        <div className="mt-5 space-y-5">

          {assignedAssessments.length ===
          0 ? (
            <div className="rounded-3xl border p-6">
              No assessments assigned.
            </div>
          ) : (
            assignedAssessments.map(
              (assessment) => (
                <div
                  key={
                    assessment.assignmentId
                  }
                  className="rounded-3xl border bg-card p-6"
                >

                  <h3 className="text-xl font-semibold">
                    {
                      assessment.title
                    }
                  </h3>

                  <p className="mt-2 text-muted-foreground">
                    {
                      assessment.description
                    }
                  </p>

                  <p className="mt-3 text-sm">
                    Questions:
                    {" "}
                    {
                      assessment.questionCount
                    }
                  </p>

                  <Link
                    href={`/patient/assessments/${assessment.assignmentId}`}
                    className="mt-4 inline-block rounded-xl bg-primary px-5 py-2 text-primary-foreground"
                  >
                    Start Assessment
                  </Link>

                </div>
              )
            )
          )}

        </div>

      </div>

    </div>
  );
}