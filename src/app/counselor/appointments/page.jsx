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
  <div className="space-y-8">

    {/* Header */}

    <div>
      <h1 className="text-4xl font-bold text-slate-800">
        Appointments
      </h1>

      <p className="mt-2 text-slate-500">
        Manage appointment requests and counseling sessions.
      </p>
    </div>

    {/* Stats */}

    <div className="grid gap-5 md:grid-cols-3">

      <div className="rounded-3xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">
          Total Appointments
        </p>

        <h2 className="mt-2 text-4xl font-bold">
          {appointments.length}
        </h2>
      </div>

      <div className="rounded-3xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">
          Upcoming Sessions
        </p>

        <h2 className="mt-2 text-4xl font-bold text-blue-600">
          {
            appointments.filter(
              (a) =>
                new Date(
                  a.appointmentDate
                ) > new Date()
            ).length
          }
        </h2>
      </div>

      <div className="rounded-3xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">
          Pending Requests
        </p>

        <h2 className="mt-2 text-4xl font-bold text-amber-600">
          {
            appointments.filter(
              (a) =>
                a.status ===
                "pending"
            ).length
          }
        </h2>
      </div>

    </div>

    {/* Upcoming */}

    <section>

      <h2 className="mb-5 text-2xl font-bold">
        Upcoming Sessions
      </h2>

      <div className="space-y-5">

        {appointments
          .filter(
            (appointment) =>
              new Date(
                appointment.appointmentDate
              ) > new Date()
          )
          .map(
            (appointment) => (

              <div
                key={
                  appointment._id
                }
                className="
                rounded-3xl
                border
                bg-white
                p-6
                shadow-sm
              "
              >

                <div className="flex justify-between">

                  <div>

                    <h3 className="text-xl font-semibold">
                      {
                        appointment.patient
                          ?.anonymousName
                      }
                    </h3>

                    <p className="mt-1 text-slate-500">
                      {new Date(
                        appointment.appointmentDate
                      ).toLocaleString()}
                    </p>

                  </div>

                  <span
                    className="
                    rounded-full
                    bg-blue-100
                    px-3
                    py-1
                    text-sm
                    font-medium
                    text-blue-700
                  "
                  >
                    Upcoming
                  </span>

                </div>

                <p className="mt-4 text-slate-600">
                  {
                    appointment.reason
                  }
                </p>

              </div>

            )
          )}

      </div>

    </section>

    {/* Pending */}

    <section>

      <h2 className="mb-5 text-2xl font-bold">
        Appointment Requests
      </h2>

      <div className="space-y-5">

        {appointments
          .filter(
            (appointment) =>
              appointment.status ===
              "pending"
          )
          .map(
            (appointment) => (

              <div
                key={
                  appointment._id
                }
                className="
                rounded-3xl
                border
                bg-white
                p-6
                shadow-sm
              "
              >

                <h3 className="text-xl font-semibold">
                  {
                    appointment.patient
                      ?.anonymousName
                  }
                </h3>

                <p className="mt-2 text-slate-500">
                  {new Date(
                    appointment.appointmentDate
                  ).toLocaleString()}
                </p>

                <p className="mt-4 text-slate-600">
                  {
                    appointment.reason
                  }
                </p>

                <div className="mt-5 flex gap-3">

                  <button
                    onClick={() =>
                      accept(
                        appointment._id
                      )
                    }
                    className="
                    rounded-xl
                    bg-blue-600
                    px-5
                    py-2.5
                    text-white
                    hover:bg-blue-700
                  "
                  >
                    Accept
                  </button>

                  <button
                    onClick={() =>
                      reject(
                        appointment._id
                      )
                    }
                    className="
                    rounded-xl
                    border
                    px-5
                    py-2.5
                    hover:bg-slate-50
                  "
                  >
                    Reject
                  </button>

                </div>

              </div>

            )
          )}

      </div>

    </section>

    {/* Past */}

    <section>

      <h2 className="mb-5 text-2xl font-bold">
        Past Sessions
      </h2>

      <div className="space-y-5">

        {appointments
          .filter(
            (appointment) =>
              new Date(
                appointment.appointmentDate
              ) < new Date()
          )
          .map(
            (appointment) => (

              <div
                key={
                  appointment._id
                }
                className="
                rounded-3xl
                border
                bg-slate-50
                p-6
              "
              >

                <div className="flex justify-between">

                  <div>

                    <h3 className="text-xl font-semibold">
                      {
                        appointment.patient
                          ?.anonymousName
                      }
                    </h3>

                    <p className="mt-1 text-slate-500">
                      {new Date(
                        appointment.appointmentDate
                      ).toLocaleString()}
                    </p>

                  </div>

                  <span
                    className="
                    rounded-full
                    bg-slate-200
                    px-3
                    py-1
                    text-sm
                  "
                  >
                    Completed
                  </span>

                </div>

                <p className="mt-4 text-slate-600">
                  {
                    appointment.reason
                  }
                </p>

              </div>

            )
          )}

      </div>

    </section>

  </div>
);
}