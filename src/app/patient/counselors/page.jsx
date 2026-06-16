"use client";

import { useEffect, useState } from "react";

export default function CounselorsPage() {
  const [counselors, setCounselors] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  async function fetchCounselors() {
    try {
      const response =
        await fetch(
          "/api/counselor"
        );

      if (!response.ok) {
        throw new Error(
          `HTTP ${response.status}`
        );
      }

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

  async function requestCounselor(
    counselorId
  ) {
    try {
      setLoading(true);

      const response =
        await fetch(
          "/api/counselor-assignment",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              counselorId,
            }),
          }
        );

      const data =
        await response.json();

      if (!data.success) {
        alert(
          data.message ||
            "Unable to send request"
        );
        return;
      }

      alert(
        "Counselor request sent successfully!"
      );
    } catch (error) {
      console.error(error);

      alert(
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCounselors();
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold">
        Find a Counselor
      </h1>

      <p className="mt-2 text-muted-foreground">
        Browse approved counselors
        and choose the one that best
        matches your needs.
      </p>

      <p className="mt-4 font-medium">
        Total Counselors:
        {" "}
        {counselors.length}
      </p>

      <div className="mt-8 space-y-6">

        {counselors.map(
          (counselor) => (
            <div
              key={
                counselor._id
              }
              className="rounded-3xl border bg-card p-6"
            >

              <h2 className="text-2xl font-semibold">
                {
                  counselor.fullName
                }
              </h2>

              <p className="mt-2">
                Experience:
                {" "}
                {
                  counselor.experience
                }
                {" "}
                years
              </p>

              <p className="mt-2">
                Gender:
                {" "}
                {
                  counselor.gender
                }
              </p>

              <p className="mt-2">
                Languages:
                {" "}
                {counselor.languages?.join(
                  ", "
                )}
              </p>

              <p className="mt-2">
                Specializations:
                {" "}
                {counselor.specialization?.join(
                  ", "
                )}
              </p>

              <p className="mt-3 text-muted-foreground">
                {
                  counselor.bio
                }
              </p>

              <button
                onClick={() =>
                  requestCounselor(
                    counselor.userId
                  )
                }
                disabled={loading}
                className="mt-5 rounded-xl bg-primary px-5 py-2 text-primary-foreground disabled:opacity-50"
              >
                {loading
                  ? "Sending..."
                  : "Request Counselor"}
              </button>

            </div>
          )
        )}

      </div>
    </div>
  );
}