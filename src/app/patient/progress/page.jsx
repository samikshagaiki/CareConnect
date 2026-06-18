"use client";

import { useEffect, useState } from "react";
import ProgressCharts from "@/components/ProgressCharts";

export default function ProgressPage() {
  const [data, setData] =
    useState(null);

  async function fetchProgress() {
    try {
      const response =
        await fetch(
          "/api/patient/progress-data"
        );

      const result =
        await response.json();

      if (result.success) {
        setData(result);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchProgress();
  }, []);

  if (!data) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <div>

      <h1 className="text-4xl font-bold">
        Progress Dashboard
      </h1>

      <p className="mt-2 text-muted-foreground">
        Track your wellness journey.
      </p>

      <div className="mt-8">
  <ProgressCharts
    moods={data.moods}
    assessments={
      data.assessments
    }
  />
</div>

      {/* Mood History */}

      <div className="mt-8">
        <h2 className="text-2xl font-bold">
          Mood History
        </h2>

        <div className="mt-4 space-y-4">

          {data.moods.map(
            (mood) => (
              <div
                key={mood._id}
                className="rounded-2xl border p-4"
              >
                <p>
                  Mood:
                  {" "}
                  {mood.mood}
                </p>

                <p>
                  Note:
                  {" "}
                  {mood.note}
                </p>

                <p className="text-sm text-muted-foreground">
                  {new Date(
                    mood.createdAt
                  ).toLocaleString()}
                </p>
              </div>
            )
          )}

        </div>
      </div>

      {/* Assessment History */}

      <div className="mt-10">
        <h2 className="text-2xl font-bold">
          Assessment History
        </h2>

        <div className="mt-4 space-y-4">

          {data.assessments.map(
            (
              assessment
            ) => (
              <div
                key={
                  assessment._id
                }
                className="rounded-2xl border p-4"
              >
                <p>
                  {
                    assessment
                      .template
                      ?.title
                  }
                </p>

                <p>
                  Score:
                  {" "}
                  {
                    assessment.score
                  }
                </p>

                <p>
                  Severity:
                  {" "}
                  {
                    assessment.severity
                  }
                </p>

                <p className="text-sm text-muted-foreground">
                  {new Date(
                    assessment.submittedAt
                  ).toLocaleString()}
                </p>
              </div>
            )
          )}

        </div>
      </div>

      {/* Counselor Notes */}

      <div className="mt-10">
        <h2 className="text-2xl font-bold">
          Counselor Feedback
        </h2>

        <div className="mt-4 space-y-4">

          {data.counselorNotes.map(
            (
              note
            ) => (
              <div
                key={
                  note._id
                }
                className="rounded-2xl border p-4"
              >
                <p>
                  {
                    note.counselorNotes
                  }
                </p>

                <p className="text-sm text-muted-foreground">
                  {new Date(
                    note.updatedAt
                  ).toLocaleString()}
                </p>
              </div>
            )
          )}

        </div>
      </div>

      {/* Appointment History */}

      <div className="mt-10 mb-10">
        <h2 className="text-2xl font-bold">
          Appointment History
        </h2>

        <div className="mt-4 space-y-4">

          {data.appointments.map(
            (
              appointment
            ) => (
              <div
                key={
                  appointment._id
                }
                className="rounded-2xl border p-4"
              >
                <p>
                  Reason:
                  {" "}
                  {
                    appointment.reason
                  }
                </p>

                <p>
                  Status:
                  {" "}
                  {
                    appointment.status
                  }
                </p>

                <p className="text-sm text-muted-foreground">
                  {new Date(
                    appointment.appointmentDate
                  ).toLocaleString()}
                </p>
              </div>
            )
          )}

        </div>
      </div>

    </div>
  );
}