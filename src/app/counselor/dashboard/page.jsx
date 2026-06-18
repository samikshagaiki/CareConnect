"use client";

import { useEffect, useState } from "react";
import CounselorAnalytics from "@/components/CounselorAnalytics";


export default function CounselorDashboard() {
  const [requests, setRequests] =
    useState([]);

    const [
  upcomingAppointments,
  setUpcomingAppointments,
] = useState([]);

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

async function fetchUpcomingAppointments() {
  try {
    const response =
      await fetch(
        "/api/counselor/upcoming-appointments"
      );

    const data =
      await response.json();

    if (data.success) {
      setUpcomingAppointments(
        data.appointments
      );
    }

    console.log(
  "Upcoming Appointments:",
  data
);

  } catch (error) {
    console.error(error);
  }
}


  useEffect(() => {
  fetchRequests();
  fetchUpcomingAppointments();
}, []);

return (
  <div className="space-y-10">

    {/* Header */}

    <div>
      <h1 className="text-4xl font-bold">
        Counselor Dashboard
      </h1>

      <p className="mt-2 text-muted-foreground">
        Manage patients,
        assessments and sessions.
      </p>
    </div>

    {/* Analytics */}

    <CounselorAnalytics />

    {/* Pending Requests */}

    <section>
      <h2 className="mb-5 text-2xl font-bold">
        Pending Requests
      </h2>

      {requests.length === 0 ? (
        <div className="rounded-3xl border p-6">
          No pending requests.
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {requests.map(
            (request) => (
              <div
                key={request._id}
                className="rounded-3xl border p-6"
              >
                <h3 className="text-xl font-semibold">
                  {
                    request.patient
                      ?.anonymousName
                  }
                </h3>

                <div className="mt-4 space-y-1 text-sm">
                  <p>
                    Age:
                    {" "}
                    {
                      request.patient
                        ?.age
                    }
                  </p>

                  <p>
                    Gender:
                    {" "}
                    {
                      request.patient
                        ?.gender
                    }
                  </p>

                  <p>
                    Language:
                    {" "}
                    {
                      request.patient
                        ?.preferredLanguage
                    }
                  </p>
                </div>

                <div className="mt-5 flex gap-3">

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
            )
          )}
        </div>
      )}
    </section>

    {/* Upcoming Sessions */}

    <section>
      <h2 className="mb-5 text-2xl font-bold">
        Upcoming Sessions
      </h2>

      {upcomingAppointments.length === 0 ? (
        <div className="rounded-3xl border p-6">
          No upcoming sessions.
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {upcomingAppointments.map(
            (
              appointment
            ) => (
              <div
                key={
                  appointment._id
                }
                className="rounded-3xl border p-6"
              >
                <h3 className="text-xl font-semibold">
                  {
                    appointment.patient
                      ?.anonymousName
                  }
                </h3>

                <p className="mt-3">
                  {new Date(
                    appointment.appointmentDate
                  ).toLocaleString()}
                </p>

                <p className="mt-2 text-sm text-muted-foreground">
                  {
                    appointment.reason
                  }
                </p>
              </div>
            )
          )}
        </div>
      )}
    </section>

  </div>
);
}