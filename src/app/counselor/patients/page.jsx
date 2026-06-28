"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, ClipboardList, FileText } from "lucide-react";

export default function PatientsPage() {
  const [patients, setPatients] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

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
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPatients();
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        Loading patients...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* HEADER */}

      <div className="mb-8">

  <h1 className="text-5xl font-bold text-slate-800">
    Assigned Patients
  </h1>

  <p className="mt-3 text-slate-500">
    View patient profiles, assign assessments and monitor progress.
  </p>

</div>

      {/* SUMMARY */}

     <div
  className="
    mb-10
    rounded-[32px]
    border
    border-slate-200
    bg-white
    p-8
    shadow-sm
  "
>

  <p className="text-sm uppercase tracking-widest text-slate-500">
    Counselor Workspace
  </p>

  <h2 className="mt-2 text-3xl font-bold text-slate-800">
    Patient Management
  </h2>

  <p className="mt-3 text-slate-500">
    Access patient profiles, assign assessments and review responses.
  </p>

  <div className="mt-6 flex items-center gap-3">

    <div
      className="
        rounded-2xl
        bg-blue-50
        px-5
        py-3
        text-blue-700
        font-semibold
      "
    >
      {patients.length} Active Patients
    </div>

  </div>

</div>

      {/* PATIENTS */}

      {patients.length === 0 ? (

        <div
          className="
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-10
          text-center
          shadow-sm
        "
        >
          <h3 className="text-xl font-semibold">
            No Patients Assigned
          </h3>

          <p className="mt-2 text-slate-500">
            Accepted patients will appear here.
          </p>
        </div>

      ) : (

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {patients.map(
            (patient) => (

              <div
  key={patient._id}
  className="
    rounded-[28px]
    border
    border-slate-200
    bg-white
    p-6
    shadow-sm
    transition-all
    hover:-translate-y-1
    hover:shadow-lg
  "
>


<div className="flex items-start justify-between">

  <div>

    <h2 className="text-2xl font-bold text-slate-800">
      {patient.anonymousName}
    </h2>

    <p className="mt-1 text-slate-500">
      {patient.occupation}
    </p>

    <p className="text-sm text-slate-400">
      {patient.gender} • {patient.age} years
    </p>

  </div>

  <span
    className="
      rounded-full
      bg-blue-50
      px-3
      py-1
      text-xs
      font-medium
      text-blue-700
    "
  >
    {patient.preferredLanguage}
  </span>

</div>

  {/* Concerns */}

  <div className="mt-6">

    <p className="mb-3 font-medium text-slate-700">
      Primary Concerns
    </p>

    <div className="flex flex-wrap gap-2">

      {patient.primaryConcerns?.map(
        (concern, index) => (

          <span
            key={index}
            className="
rounded-full
bg-slate-100
px-3
py-1.5
text-sm
font-medium
text-slate-700
"
            
          >
            {concern}
          </span>

        )
      )}

    </div>

  </div>


 {/* Actions */}

<div className="mt-6 space-y-3">

  <div className="grid grid-cols-2 gap-3">

    <Link
      href={`/counselor/patients/${patient.userId}`}
      className="
      rounded-xl
      border
      border-slate-300
      py-3
      text-center
      font-medium
      hover:bg-slate-50
    "
    >
      Profile
    </Link>

    <Link
      href={`/counselor/patients/${patient.userId}/responses`}
      className="
      rounded-xl
      border
      border-slate-300
      py-3
      text-center
      font-medium
      hover:bg-slate-50
    "
    >
      Responses
    </Link>

  </div>

  <Link
    href={`/counselor/assessments/create?patient=${patient.userId}`}
    className="
    block
    rounded-xl
    bg-slate-900
    py-3
    text-center
    font-medium
    text-white
    hover:bg-slate-800
  "
  >
    Assign Assessment
  </Link>

  <Link
    href="/counselor/chat"
    className="
    block
    rounded-xl
    bg-blue-600
    py-3
    text-center
    font-medium
    text-white
    hover:bg-blue-700
  "
  >
    💬 Message Patient
  </Link>

</div>

</div>

            )
          )}

        </div>

      )}

    </div>
  );
}

