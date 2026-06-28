"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [counselors, setCounselors] =
    useState([]);

  async function fetchCounselors() {
    try {
      const response =
        await fetch(
          "/api/admin/counselors"
        );

      const data =
        await response.json();

      if (data.success) {
        setCounselors(
          data.counselors
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function approveCounselor(
    id
  ) {
    try {
      const response =
        await fetch(
          `/api/admin/counselors/${id}/approve`,
          {
            method: "PATCH",
          }
        );

      const data =
        await response.json();

      if (data.success) {
        fetchCounselors();
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchCounselors();
  }, []);

 return (
  <div className="mx-auto max-w-7xl space-y-8">

    {/* HEADER */}

    <div>
      <p className="text-sm font-medium uppercase tracking-wider text-blue-600">
        Administration Panel
      </p>

      <h1 className="mt-2 text-3xl md:text-4xl font-bold text-slate-800">
        Admin Dashboard
      </h1>

      <p className="mt-3 text-slate-500">
        Review counselor applications and manage platform onboarding.
      </p>
    </div>

    {/* SUMMARY CARD */}

    <div
      className="
      rounded-[32px]
      border
      border-slate-200
      bg-white
      p-5 md:p-8
      shadow-sm
    "
    >
      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm uppercase tracking-wider text-slate-500">
            Pending Reviews
          </p>

          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-slate-800">
            {counselors.length}
          </h2>

          <p className="mt-2 text-slate-500">
            Counselor applications awaiting approval.
          </p>
        </div>

        <div
          className="
          rounded-full
          bg-amber-100
          px-4
          py-2
          text-sm
          font-medium
          text-amber-700
        "
        >
          Pending Verification
        </div>

      </div>
    </div>

    {/* APPLICATIONS */}

    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <h2 className="text-2xl font-bold text-slate-800">
          Counselor Applications
        </h2>

        <span
          className="
          rounded-full
          bg-slate-100
          px-4
          py-2
          text-sm
          font-medium
          text-slate-600
        "
        >
          {counselors.length} Applications
        </span>

      </div>

      {counselors.length === 0 ? (

        <div
          className="
          rounded-[32px]
          border
          border-slate-200
          bg-white
          p-16
          text-center
          shadow-sm
        "
        >
          <h3 className="text-xl font-semibold text-slate-700">
            No Pending Applications
          </h3>

          <p className="mt-2 text-slate-500">
            All counselor applications have been reviewed.
          </p>
        </div>

      ) : (

        <div className="grid-cols-1 gap-6">

          {counselors.map((counselor) => (

            <div
              key={counselor._id}
              className="
              rounded-[32px]
              border
              border-slate-200
              bg-white
              p-5 md:p-8
              shadow-sm
              transition
              hover:shadow-md
            "
            >

              <div className="flex flex-col gap-6 xl:flex-row lg:items-start lg:justify-between">

                <div className="flex-1">

                  <div className="flex items-center gap-4">

                    <div
                      className="
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-full
                      bg-blue-100
                      text-lg
                      font-bold
                      text-blue-700
                    "
                    >
                      {counselor.fullName?.charAt(0)}
                    </div>

                    <div>

                      <h3 className="text-2xl font-bold text-slate-800">
                        {counselor.fullName}
                      </h3>

                      <p className="text-slate-500">
                        {counselor.experience} years experience
                      </p>

                    </div>

                  </div>

                  <div className="mt-6 grid gap-4 grid-cols-1
sm:grid-cols-2
xl:grid-cols-3">

                    <div>
                      <p className="text-xs uppercase text-slate-400">
                        Gender
                      </p>

                      <p className="font-medium capitalize">
                        {counselor.gender}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs uppercase text-slate-400">
                        Languages
                      </p>

                      <p className="font-medium">
                        {counselor.languages?.join(", ")}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs uppercase text-slate-400">
                        Age Groups
                      </p>

                      <p className="font-medium">
                        {counselor.ageGroups?.join(", ")}
                      </p>
                    </div>

                  </div>

                  <div className="mt-6">

                    <p className="text-xs uppercase text-slate-400 mb-2">
                      Professional Bio
                    </p>

                    <p className="text-slate-600 leading-relaxed">
                      {counselor.bio}
                    </p>

                  </div>

                  <div className="mt-6">

                    <p className="text-xs uppercase text-slate-400 mb-3">
                      Specializations
                    </p>

                    <div className="flex flex-wrap gap-2">

                      {counselor.specialization?.map((item) => (

                        <span
                          key={item}
                          className="
                          rounded-full
                          bg-blue-50
                          px-3
                          py-1
                          text-sm
                          text-blue-700
                        "
                        >
                          {item}
                        </span>

                      ))}

                    </div>

                  </div>

                </div>

                <div>

                  <button
                    onClick={() =>
                      approveCounselor(
                        counselor._id
                      )
                    }
                    className="
                    w-full
                    xl:w-auto
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
                    Approve Counselor
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  </div>
);
}