"use client";

import { useEffect, useState } from "react";

export default function CounselorDashboard() {
  const [requests, setRequests] =
    useState([]);

  async function fetchRequests() {
    try {
      const response =
        await fetch(
          "/api/counselor/requests"
        );

      const data =
        await response.json();

      if (data.success) {
        setRequests(
          data.requests
        );
      }
    } catch (error) {
      console.error(error);
    }
  }


  async function acceptRequest(
  id
) {
  await fetch(
    `/api/counselor/requests/${id}/accept`,
    {
      method: "PATCH",
    }
  );

  fetchRequests();
}

async function rejectRequest(
  id
) {
  await fetch(
    `/api/counselor/requests/${id}/reject`,
    {
      method: "PATCH",
    }
  );

  fetchRequests();

}

  useEffect(() => {
    fetchRequests();
  }, []);

 return (
  <div>
    <h1 className="text-4xl font-bold">
      Counselor Dashboard
    </h1>

    <p className="mt-2 text-muted-foreground">
      Pending patient requests.
    </p>

    <div className="mt-8 space-y-5">
      {requests.length === 0 ? (
        <div className="rounded-3xl border p-6">
          No pending requests.
        </div>
      ) : (
        requests.map((request) => (
          <div
            key={request._id}
            className="rounded-3xl border p-6"
          >
            <h2 className="text-xl font-semibold">
              {request.patient?.anonymousName}
            </h2>

            <p>
              Age: {request.patient?.age}
            </p>

            <p>
              Gender: {request.patient?.gender}
            </p>

            <p>
              Preferred Language:{" "}
              {request.patient?.preferredLanguage}
            </p>

            <div className="mt-4 flex gap-3">
              <button
                onClick={() =>
                  acceptRequest(
                    request._id
                  )
                }
                className="rounded-xl bg-green-600 px-4 py-2 text-white"
              >
                Accept
              </button>

              <button
                onClick={() =>
                  rejectRequest(
                    request._id
                  )
                }
                className="rounded-xl bg-red-600 px-4 py-2 text-white"
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
);
}