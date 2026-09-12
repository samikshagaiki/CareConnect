"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import useNotifications from "@/hooks/useNotifications";

export default function CounselorAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const { refreshNotifications } = useNotifications();

  const fetchAppointments = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/counselor/appointments");
      const data = await response.json();

      if (data.success) {
        setAppointments(data.appointments || []);
      }
    } catch (error) {
      console.error("Failed to load appointments:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const now = new Date();

  const pendingAppointments = appointments.filter(
    (a) => a.status === "pending" && a.sessionStatus !== "cancelled"
  );

  const upcomingAppointments = appointments.filter(
    (a) =>
      a.status === "accepted" &&
      a.sessionStatus === "upcoming" &&
      new Date(a.appointmentDate) >= now
  );

  const completedAppointments = appointments.filter(
    (a) => a.sessionStatus === "completed" || a.status === "completed"
  );

  const missedAppointments = appointments.filter(
    (a) =>
      a.status === "rejected" ||
      a.status === "cancelled" ||
      a.sessionStatus === "missed" ||
      (new Date(a.appointmentDate) < now && a.sessionStatus !== "completed" && a.status !== "pending")
  );

  async function accept(id) {
    try {
      await fetch(`/api/counselor/appointments/${id}/accept`, {
        method: "PATCH",
      });
      fetchAppointments();
    } catch (e) {
      console.error(e);
    }
  }

  async function reject(id) {
    try {
      await fetch(`/api/counselor/appointments/${id}/reject`, {
        method: "PATCH",
      });
      fetchAppointments();
    } catch (e) {
      console.error(e);
    }
  }

  async function completeAppointment(id) {
    try {
      await fetch(`/api/counselor/appointments/${id}/complete`, {
        method: "PATCH",
      });
      fetchAppointments();
    } catch (e) {
      console.error(e);
    }
  }

  async function cancelAppointment(id) {
    if (!confirm("Are you sure you want to cancel this appointment?")) return;
    try {
      const res = await fetch(`/api/appointments/${id}/cancel`, {
        method: "PATCH",
      });
      const data = await res.json();
      if (data.success) {
        fetchAppointments();
      } else {
        alert(data.message || "Failed to cancel");
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    async function markNotificationsRead() {
      try {
        await fetch("/api/notifications/read", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "appointment",
          }),
        });
        refreshNotifications();
      } catch (e) {
        console.error(e);
      }
    }

    markNotificationsRead();
  }, [refreshNotifications]);

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

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/counselor/chat"
                  className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                >
                  💬 Open Chat
                </Link>

                <button
                  type="button"
                  onClick={() => completeAppointment(appointment._id)}
                  className="rounded-xl bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-700"
                >
                  Mark Completed
                </button>

                <button
                  type="button"
                  onClick={() => cancelAppointment(appointment._id)}
                  className="rounded-xl border border-red-200 bg-white px-5 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                  Cancel Session
                </button>
              </div>

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
        
                  px-2
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