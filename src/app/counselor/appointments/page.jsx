"use client";

import { useEffect, useState } from "react";

export default function CounselorAppointmentsPage() {
  const [
  appointments,
  setAppointments,
] = useState([]);

const now = new Date();

const pendingAppointments =
  appointments.filter(
    (a) =>
      a.status === "pending"
  );

const upcomingAppointments =
  appointments.filter(
    (a) =>
      a.status === "accepted" &&
      new Date(
        a.appointmentDate
      ) > now
  );

const completedAppointments =
  appointments.filter(
    (a) =>
      a.sessionStatus ===
      "completed"
  );

const missedAppointments =
  appointments.filter(
    (a) =>
      new Date(
        a.appointmentDate
      ) < now &&
      a.sessionStatus !==
        "completed"
  );

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

  async function fetchUpcomingAppointments() {
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
}

async function fetchCompletedAppointments() {
  const response =
    await fetch(
      "/api/counselor/completed-appointments"
    );

  const data =
    await response.json();

  if (data.success) {
    setCompletedAppointments(
      data.appointments
    );
  }
}

async function fetchMissedAppointments() {
  const response =
    await fetch(
      "/api/counselor/missed-appointments"
    );

  const data =
    await response.json();

  if (data.success) {
    setMissedAppointments(
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

  async function completeAppointment(
  id
) {
  await fetch(
    `/api/counselor/appointments/${id}/complete`,
    {
      method: "PATCH",
    }
  );

  fetchAppointments();
  fetchUpcomingAppointments();
  fetchCompletedAppointments();
  fetchMissedAppointments();
}

  useEffect(() => {
  fetchAppointments();

  fetchUpcomingAppointments();

  fetchCompletedAppointments();

  fetchMissedAppointments();
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

    <div className="grid gap-5 md:grid-cols-4">

      <div className="rounded-3xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">
          Total Requests
        </p>

        <h2 className="mt-2 text-4xl font-bold">
          {appointments.length}
        </h2>
      </div>

      <div className="rounded-3xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">
          Upcoming
        </p>

        <h2 className="mt-2 text-4xl font-bold text-blue-600">
          {upcomingAppointments.length}
        </h2>
      </div>

      <div className="rounded-3xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">
          Completed
        </p>

        <h2 className="mt-2 text-4xl font-bold text-green-600">
          {completedAppointments.length}
        </h2>
      </div>

      <div className="rounded-3xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">
          Missed
        </p>

        <h2 className="mt-2 text-4xl font-bold text-red-600">
          {missedAppointments.length}
        </h2>
      </div>

    </div>

    {/* Pending Requests */}

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
                key={appointment._id}
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
                  {appointment.reason}
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

    {/* Upcoming Sessions */}

    <section>

      <h2 className="mb-5 text-2xl font-bold">
        Upcoming Sessions
      </h2>

      <div className="space-y-5">

        {upcomingAppointments.map(
          (appointment) => (

            <div
              key={appointment._id}
              className="
              rounded-3xl
              border
              bg-white
              p-6
              shadow-sm
            "
            >

              <div className="flex items-start justify-between">

                <div>

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
                {appointment.reason}
              </p>

              <button
                onClick={() =>
                  completeAppointment(
                    appointment._id
                  )
                }
                className="
                mt-5
                rounded-xl
                bg-green-600
                px-5
                py-2.5
                text-white
              "
              >
                Mark Completed
              </button>

            </div>

          )
        )}

      </div>

    </section>

    {/* Completed Sessions */}

    <section>

      <h2 className="mb-5 text-2xl font-bold text-green-700">
        Completed Sessions
      </h2>

      <div className="space-y-5">

        {completedAppointments.map(
          (appointment) => (

            <div
              key={appointment._id}
              className="
              rounded-3xl
              border
              bg-green-50
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

                  <p className="mt-2 text-slate-500">
                    {new Date(
                      appointment.appointmentDate
                    ).toLocaleString()}
                  </p>

                </div>

                <span
                  className="
                  rounded-full
                  bg-green-200
                  px-3
                  py-1
                  text-sm
                  font-medium
                  text-green-800
                "
                >
                  Completed
                </span>

              </div>

              <p className="mt-4 text-slate-600">
                {appointment.reason}
              </p>

            </div>

          )
        )}

      </div>

    </section>

    {/* Missed Sessions */}

    <section>

      <h2 className="mb-5 text-2xl font-bold text-red-700">
        Missed Sessions
      </h2>

      <div className="space-y-5">

        {missedAppointments.map(
          (appointment) => (

            <div
              key={appointment._id}
              className="
              rounded-3xl
              border
              border-red-200
              bg-red-50
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

                  <p className="mt-2 text-slate-500">
                    {new Date(
                      appointment.appointmentDate
                    ).toLocaleString()}
                  </p>

                </div>

                <span
                  className="
                   rounded-full
                  bg-red-100
                  px-3
                  py-1
                  text-sm
                  font-medium
                  text-red-800"
                >
                  Missed
                </span>

              </div>

              <p className="mt-4 text-slate-600">
                {appointment.reason}
              </p>

            </div>

          )
        )}

      </div>

    </section>

  </div>
);
}