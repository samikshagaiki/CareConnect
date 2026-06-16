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
    <div>

      <h1 className="text-4xl font-bold">
        Admin Dashboard
      </h1>

      <p className="mt-2 text-muted-foreground">
        Review counselor applications.
      </p>

      <div className="mt-8 space-y-5">

        {counselors.map(
          (counselor) => (
            <div
              key={
                counselor._id
              }
              className="rounded-3xl border p-6"
            >

              <h2 className="text-xl font-semibold">
                {
                  counselor.fullName
                }
              </h2>

              <p>
                Gender:
                {" "}
                {
                  counselor.gender
                }
              </p>

              <p>
                Experience:
                {" "}
                {
                  counselor.experience
                } years
              </p>

              <p className="mt-2">
                {
                  counselor.bio
                }
              </p>

              <p className="mt-3">
                Specializations:
                {" "}
                {
                  counselor.specialization.join(
                    ", "
                  )
                }
              </p>

              <button
                onClick={() =>
                  approveCounselor(
                    counselor._id
                  )
                }
                className="mt-4 rounded-xl bg-primary px-5 py-2 text-primary-foreground"
              >
                Approve
              </button>

            </div>
          )
        )}

      </div>

    </div>
  );
}