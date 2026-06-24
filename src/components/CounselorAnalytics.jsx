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
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

  <div className="
rounded-3xl
border
border-slate-200
bg-white
p-6
shadow-sm
hover:shadow-md
transition
">
    <p className="text-sm text-slate-500">
      Assigned Patients
    </p>

    <h3 className="mt-3 text-4xl font-bold">
      {analytics.assignedPatients}
    </h3>
  </div>

  <div className="
rounded-3xl
border
border-slate-200
bg-white
p-6
shadow-sm
hover:shadow-md
transition
">
    <p className="text-sm text-slate-500">
      Pending Assessments
    </p>

    <h3 className="mt-3 text-4xl font-bold">
      {analytics.pendingAssessments}
    </h3>
  </div>

  <div className="
rounded-3xl
border
border-slate-200
bg-white
p-6
shadow-sm
hover:shadow-md
transition
">
    <p className="text-sm text-slate-500">
      Completed Assessments
    </p>

    <h3 className="mt-3 text-4xl font-bold">
      {analytics.completedAssessments}
    </h3>
  </div>

  <div className="
rounded-3xl
border
border-slate-200
bg-white
p-6
shadow-sm
hover:shadow-md
transition
">
    <p className="text-sm text-slate-500">
      Upcoming Sessions
    </p>

    <h3 className="mt-3 text-4xl font-bold">
      {analytics.upcomingSessions}
    </h3>
  </div>

</div>
  );
}