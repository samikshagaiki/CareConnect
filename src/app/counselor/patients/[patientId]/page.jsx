"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function PatientProfilePage() {
  const params = useParams();

  const [patient, setPatient] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  async function fetchPatient() {
    try {
      const response =
        await fetch(
          `/api/counselor/patients/${params.patientId}`
        );

      const data =
        await response.json();

      if (data.success) {
        setPatient(data.patient);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (params.patientId) {
      fetchPatient();
    }
  }, [params.patientId]);

  if (loading) {
    return (
      <div className="p-10">
        Loading patient profile...
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="p-10">
        Patient not found.
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
        <p className="text-sm uppercase tracking-wider text-slate-500">
          Patient Profile
        </p>

        <h1 className="mt-2 text-4xl font-bold text-slate-800">
          {patient.anonymousName}
        </h1>

        <p className="mt-2 text-slate-500">
          Assigned Patient Overview
        </p>
      </div>

      {/* Personal Info */}

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
        <h2 className="text-2xl font-bold">
          Personal Information
        </h2>

        <div className="mt-6 grid gap-6 md:grid-cols-2">

          <div>
            <p className="text-sm text-slate-500">
              Age
            </p>

            <p className="font-medium">
              {patient.age}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Gender
            </p>

            <p className="font-medium">
              {patient.gender}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Occupation
            </p>

            <p className="font-medium">
              {patient.occupation}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Language
            </p>

            <p className="font-medium">
              {patient.preferredLanguage}
            </p>
          </div>

        </div>
      </div>

      {/* Concerns */}

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
        <h2 className="text-2xl font-bold">
          Primary Concerns
        </h2>

        <div className="mt-6 flex flex-wrap gap-3">

          {patient.primaryConcerns?.map(
            (concern, index) => (
              <span
                key={index}
                className="
                rounded-full
                bg-blue-50
                px-4
                py-2
                text-sm
                font-medium
                text-blue-700
              "
              >
                {concern}
              </span>
            )
          )}

        </div>
      </div>

      {/* Emergency Contacts */}

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
        <h2 className="text-2xl font-bold">
          Emergency Contacts
        </h2>

        <div className="mt-6 space-y-4">

          {patient.emergencyContacts?.map(
            (contact, index) => (
              <div
                key={index}
                className="
                rounded-2xl
                border
                p-4
              "
              >
                <p className="font-semibold">
                  {contact.name}
                </p>

                <p className="text-slate-500">
                  {contact.relationship}
                </p>

                <p className="mt-2">
                  {contact.phone}
                </p>
              </div>
            )
          )}

        </div>
      </div>

      {/* Actions */}

      <div className="flex flex-wrap gap-4">

        <Link
          href={`/counselor/assessments/create?patient=${patient.userId}`}
          className="
          rounded-xl
          bg-slate-900
          px-6
          py-3
          text-white
          font-medium
        "
        >
          Assign Assessment
        </Link>

          <Link
href="/counselor/chat"
className="
mt-3
block
rounded-xl
border
border-blue-300
py-3
text-center
font-medium
text-blue-600
transition
hover:bg-blue-50
"
>

💬 Message Patient

</Link>

        <Link
          href={`/counselor/patients/${patient.userId}/responses`}
          className="
          rounded-xl
          border
          border-slate-300
          px-6
          py-3
          font-medium
        "
        >
          View Responses
        </Link>

      </div>

    </div>
  );
}