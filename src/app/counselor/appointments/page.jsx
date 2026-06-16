"use client";

import { useEffect, useState } from "react";

export default function CounselorAppointmentsPage() {
  const [appointments,
    setAppointments] =
    useState([]);

  async function fetchAppointments() {
    const response =
      await fetch(
        "/api/counselor/appointments"
      );

    const data =
      await response.json();

    if (data.success) {
      setAppointments(
        data.appointments
      );
    }
  }

  async function accept(id) {
    await fetch(
      `/api/counselor/appointments/${id}/accept`,
      {
        method: "PATCH",
      }
    );

    fetchAppointments();
  }

  async function reject(id) {
    await fetch(
      `/api/counselor/appointments/${id}/reject`,
      {
        method: "PATCH",
      }
    );

    fetchAppointments();
  }

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold">
        Appointment Requests
      </h1>

      <div className="mt-8 space-y-5">

        {appointments.map(
          (appointment) => (
            <div
              key={
                appointment._id
              }
              className="rounded-3xl border p-6"
            >
              <h2 className="text-xl font-semibold">
                {
                  appointment
                    .patient
                    ?.anonymousName
                }
              </h2>

              <p>
                {new Date(
                  appointment.appointmentDate
                ).toLocaleString()}
              </p>

              <p className="mt-2">
                {
                  appointment.reason
                }
              </p>

              <div className="mt-4 flex gap-3">

                <button
                  onClick={() =>
                    accept(
                      appointment._id
                    )
                  }
                  className="rounded-xl bg-green-600 px-4 py-2 text-white"
                >
                  Accept
                </button>

                <button
                  onClick={() =>
                    reject(
                      appointment._id
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
    </div>
  );
}