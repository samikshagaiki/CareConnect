"use client";

import { useEffect, useState } from "react";

export default function CounselorAnalytics() {
  const [analytics,
    setAnalytics] =
    useState(null);

  async function fetchAnalytics() {
    const response =
      await fetch(
        "/api/counselor/analytics"
      );

    const data =
      await response.json();

    if (data.success) {
      setAnalytics(data);
    }
  }

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (!analytics) {
    return null;
  }

  return (
    <div className="grid gap-4 md:grid-cols-4">

      <div className="rounded-3xl border p-6">
        <h3 className="font-semibold">
          Assigned Patients
        </h3>

        <p className="mt-3 text-4xl font-bold">
          {
            analytics.assignedPatients
          }
        </p>
      </div>

      <div className="rounded-3xl border p-6">
        <h3 className="font-semibold">
          Pending Assessments
        </h3>

        <p className="mt-3 text-4xl font-bold">
          {
            analytics.pendingAssessments
          }
        </p>
      </div>

      <div className="rounded-3xl border p-6">
        <h3 className="font-semibold">
          Completed Assessments
        </h3>

        <p className="mt-3 text-4xl font-bold">
          {
            analytics.completedAssessments
          }
        </p>
      </div>

      <div className="rounded-3xl border p-6">
        <h3 className="font-semibold">
          Upcoming Sessions
        </h3>

        <p className="mt-3 text-4xl font-bold">
          {
            analytics.upcomingSessions
          }
        </p>
      </div>

    </div>
  );
}