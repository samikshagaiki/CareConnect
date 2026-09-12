"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import useNotifications from "@/hooks/useNotifications";

import {
  Calendar,
  Clock,
  HeartHandshake,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export default function AppointmentsPage() {
  const [date, setDate] =
    useState("");

  const [reason, setReason] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [appointments, setAppointments] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [reschedulingAppt, setReschedulingAppt] = useState(null);
  const [rescheduleDate, setRescheduleDate] = useState("");

  const { refreshNotifications } = useNotifications();

  const fetchAppointments = useCallback(async () => {
    try {
      setFetching(true);
      const response = await fetch("/api/patient/appointments");
      const data = await response.json();

      if (data.success) {
        setAppointments(data.appointments || []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setFetching(false);
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

  const pastOrCancelledAppointments = appointments.filter(
    (a) =>
      a.status === "rejected" ||
      a.status === "cancelled" ||
      a.sessionStatus === "missed" ||
      (new Date(a.appointmentDate) < now && a.sessionStatus !== "completed" && a.status !== "pending")
  );

  async function handleCancel(id) {
    if (!confirm("Are you sure you want to cancel this appointment request?")) return;
    try {
      const response = await fetch(`/api/appointments/${id}/cancel`, {
        method: "PATCH",
      });
      const data = await response.json();
      if (data.success) {
        fetchAppointments();
      } else {
        alert(data.message || "Failed to cancel appointment.");
      }
    } catch {
      alert("Error cancelling appointment.");
    }
  }

  async function handleRescheduleSubmit(e) {
    e.preventDefault();
    if (!reschedulingAppt || !rescheduleDate) return;

    try {
      const response = await fetch(
        `/api/appointments/${reschedulingAppt._id}/reschedule`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ appointmentDate: rescheduleDate }),
        }
      );
      const data = await response.json();
      if (data.success) {
        setReschedulingAppt(null);
        setRescheduleDate("");
        fetchAppointments();
      } else {
        alert(data.message || "Failed to reschedule.");
      }
    } catch {
      alert("Error rescheduling appointment.");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appointmentDate: date,
          reason,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        alert(data.message || "Failed to request appointment");
        return;
      }

      alert("Appointment request sent successfully 💜");
      setDate("");
      setReason("");
      fetchAppointments();
    } catch {
      alert("Something went wrong");
    } finally {
      setLoading(false);
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
        console.error("Failed to mark notifications read", e);
      }
    }

    markNotificationsRead();
  }, [refreshNotifications]);

  return (
    <div className="space-y-8">

      {/* HERO SECTION */}

      <section
        className="
        relative
        overflow-hidden
        rounded-[40px]
        bg-linear-to-r
        from-[#8EC5FC]
        to-[#DCCCFD]
        p-10
        shadow-xl
      "
      >

        <div className="relative z-10">

          <div className="flex items-center gap-3">

            <div
              className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-white/20
              backdrop-blur-sm
            "
            >
              <Calendar
                className="text-white"
                size={24}
              />
            </div>

            <h1
              className="
              text-5xl
              font-bold
              text-white
            "
            >
              Appointments 💜
            </h1>

          </div>

          <p
            className="
            mt-4
            max-w-2xl
            text-lg
            text-white/90
          "
          >
            Schedule a confidential
            session with your counselor
            and continue your journey
            toward emotional wellbeing.
          </p>

        </div>

        <div
          className="
          absolute
          -right-12
          -top-12
          h-56
          w-56
          rounded-full
          bg-white/10
        "
        />

        <div
          className="
          absolute
          right-24
          bottom-6
          h-20
          w-20
          rounded-full
          bg-white/10
        "
        />

      </section>

      {/* MAIN GRID */}

      <div
        className="
        grid
        gap-8
        xl:grid-cols-[1fr_350px]
      "
      >

        {/* LEFT SIDE */}

        <div
          className="
          rounded-[32px]
          border
          border-purple-100
          bg-white
          p-8
          shadow-lg
        "
        >

          <div className="flex items-center gap-3">

            <Calendar
              className="text-purple-500"
            />

            <h2
              className="
              text-2xl
              font-bold
            "
            >
              Book New Appointment
            </h2>

          </div>

          <p
            className="
            mt-2
            text-slate-500
          "
          >
            Choose your preferred
            date and tell your counselor
            how they can support you.
          </p>

          <form
            onSubmit={handleSubmit}
            className="
            mt-8
            space-y-6
          "
          >

            <div>

              <label
                className="
                mb-2
                block
                font-medium
              "
              >
                Appointment Date & Time
              </label>

              <input
                type="datetime-local"
                value={date}
                onChange={(e) =>
                  setDate(
                    e.target.value
                  )
                }
                required
                className="
                w-full
                rounded-2xl
                border
                border-purple-100
                bg-[#FAFCFF]
                px-5
                py-4
                outline-none
                focus:ring-4
                focus:ring-purple-100
              "
              />

            </div>

            <div>

              <label
                className="
                mb-2
                block
                font-medium
              "
              >
                Session Notes
              </label>

              <textarea
                rows={7}
                value={reason}
                onChange={(e) =>
                  setReason(
                    e.target.value
                  )
                }
                placeholder="Describe what you'd like to discuss during your session..."
                className="
                w-full
                resize-none
                rounded-2xl
                border
                border-purple-100
                bg-[#FAFCFF]
                p-5
                outline-none
                focus:ring-4
                focus:ring-purple-100
              "
              />

            </div>

            <button
              type="submit"
              disabled={loading}
              className="
              w-full
              rounded-2xl
              bg-gradient-to-r
              from-[#8EC5FC]
              to-[#DCCCFD]
              py-4
              text-lg
              font-semibold
              text-white
              shadow-md
              transition
              hover:scale-[1.02]
            "
            >
              {loading
                ? "Requesting..."
                : "Request Appointment"}
            </button>

          </form>

        </div>

        {/* RIGHT SIDE */}

        <div className="space-y-6">

          {/* WELLNESS CARD */}

          <div
            className="
            rounded-[32px]
            bg-gradient-to-br
            from-[#F7FBFF]
            to-[#F8F3FF]
            p-6
            shadow-lg
          "
          >

            <Sparkles
              className="
              text-purple-500
            "
            />

            <h3
              className="
              mt-4
              text-xl
              font-bold
            "
            >
              Wellness Reminder
            </h3>

            <p
              className="
              mt-3
              text-slate-600
            "
            >
              Seeking support is a
              sign of strength. Every
              conversation is a step
              toward healing.
            </p>

          </div>

          {/* SESSION BENEFITS */}

          <div
            className="
            rounded-[32px]
            bg-white
            p-6
            shadow-lg
            border
            border-purple-100
          "
          >

            <h3
              className="
              text-xl
              font-bold
            "
            >
              Session Benefits
            </h3>

            <div
              className="
              mt-5
              space-y-4
            "
            >

              <div className="flex gap-3">

                <CheckCircle2
                  size={20}
                  className="
                  text-purple-500
                "
                />

                <span>
                  Personalized guidance
                </span>

              </div>

              <div className="flex gap-3">

                <CheckCircle2
                  size={20}
                  className="
                  text-purple-500
                "
                />

                <span>
                  Emotional support
                </span>

              </div>

              <div className="flex gap-3">

                <CheckCircle2
                  size={20}
                  className="
                  text-purple-500
                "
                />

                <span>
                  Safe confidential space
                </span>

              </div>

              <div className="flex gap-3">

                <CheckCircle2
                  size={20}
                  className="
                  text-purple-500
                "
                />

                <span>
                  Practical coping strategies
                </span>

              </div>

            </div>

          </div>

          {/* QUICK INFO */}

          <div
            className="
            rounded-[32px]
            bg-white
            p-6
            shadow-lg
            border
            border-sky-100
          "
          >

            <div className="flex gap-3">

              <Clock
                className="
                text-sky-500
              "
              />

              <div>

                <h3
                  className="
                  font-bold
                "
                >
                  Typical Session
                </h3>

                <p
                  className="
                  mt-1
                  text-slate-500
                "
                >
                  45 - 60 minutes
                </p>

              </div>

            </div>

            <div
              className="
              mt-6
              flex
              gap-3
            "
            >

              <HeartHandshake
                className="
                text-purple-500
              "
              />

              <div>

                <h3
                  className="
                  font-bold
                "
                >
                  Confidential Care
                </h3>

                <p
                  className="
                  mt-1
                  text-slate-500
                "
                >
                  Your privacy is
                  always protected.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* APPOINTMENT HISTORY */}

      <div className="space-y-8">

        {/* STATS */}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Total Requests
            </p>
            <h2 className="mt-2 text-4xl font-bold">
              {appointments.length}
            </h2>
          </div>

          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Pending Approval
            </p>
            <h2 className="mt-2 text-4xl font-bold text-amber-600">
              {pendingAppointments.length}
            </h2>
          </div>

          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Upcoming
            </p>
            <h2 className="mt-2 text-4xl font-bold text-blue-600">
              {upcomingAppointments.length}
            </h2>
          </div>

          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Completed
            </p>
            <h2 className="mt-2 text-4xl font-bold text-green-600">
              {completedAppointments.length}
            </h2>
          </div>

        </div>

        {/* PENDING SESSIONS */}
        {pendingAppointments.length > 0 && (
          <section>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-800">
                Pending Requests
              </h2>
              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 border border-amber-200">
                Awaiting Counselor
              </span>
            </div>

            <div className="space-y-4">
              {pendingAppointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className="rounded-3xl border border-amber-100 bg-amber-50/40 p-6 shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-slate-800 text-lg">
                        Session Request
                      </h3>
                      <p className="mt-1 text-slate-600">
                        Requested for: {new Date(appointment.appointmentDate).toLocaleString()}
                      </p>
                    </div>
                    <span className="self-start rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                      Pending Confirmation
                    </span>
                  </div>

                  {appointment.reason && (
                    <p className="mt-4 text-slate-700">
                      {appointment.reason}
                    </p>
                  )}

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setReschedulingAppt(appointment);
                        setRescheduleDate(
                          new Date(appointment.appointmentDate).toISOString().slice(0, 16)
                        );
                      }}
                      className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                      Reschedule
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCancel(appointment._id)}
                      className="rounded-xl border border-red-200 bg-white px-5 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                    >
                      Cancel Request
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* UPCOMING */}
        <section>
          <h2 className="mb-5 text-2xl font-bold text-slate-800">
            Upcoming Sessions
          </h2>

          {upcomingAppointments.length === 0 ? (
            <div className="rounded-3xl border border-slate-100 bg-white p-8 text-center text-slate-500">
              No confirmed upcoming sessions scheduled right now.
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-slate-800 text-lg">
                        Confirmed Counseling Session
                      </h3>
                      <p className="mt-1 text-slate-600 font-medium">
                        {new Date(appointment.appointmentDate).toLocaleString()}
                      </p>
                    </div>

                    <span className="self-start rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 border border-blue-200">
                      Confirmed Upcoming
                    </span>
                  </div>

                  {appointment.reason && (
                    <p className="mt-4 text-slate-600">
                      {appointment.reason}
                    </p>
                  )}

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href="/patient/chat"
                      className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                    >
                      💬 Chat with Counselor
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        setReschedulingAppt(appointment);
                        setRescheduleDate(
                          new Date(appointment.appointmentDate).toISOString().slice(0, 16)
                        );
                      }}
                      className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                      Reschedule
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCancel(appointment._id)}
                      className="rounded-xl border border-red-200 bg-white px-5 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                    >
                      Cancel Session
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* COMPLETED */}
        {completedAppointments.length > 0 && (
          <section>
            <h2 className="mb-5 text-2xl font-bold text-green-800">
              Completed Sessions
            </h2>

            <div className="space-y-4">
              {completedAppointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className="rounded-3xl border border-green-200 bg-green-50/60 p-6"
                >
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-green-900">
                      Session Completed
                    </p>
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      Completed
                    </span>
                  </div>

                  <p className="mt-2 text-slate-600">
                    {new Date(appointment.appointmentDate).toLocaleString()}
                  </p>

                  {appointment.reason && (
                    <p className="mt-3 text-slate-700">
                      {appointment.reason}
                    </p>
                  )}

                  <div className="mt-6 flex gap-3">
                    <Link
                      href="/patient/chat"
                      className="rounded-xl border border-blue-300 bg-white px-5 py-2.5 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
                    >
                      Continue Conversation
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* MISSED & CANCELLED */}
        {pastOrCancelledAppointments.length > 0 && (
          <section>
            <h2 className="mb-5 text-2xl font-bold text-slate-700">
              Past & Cancelled
            </h2>

            <div className="space-y-4">
              {pastOrCancelledAppointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-6"
                >
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-slate-800">
                      {appointment.status === "cancelled"
                        ? "Appointment Cancelled"
                        : appointment.status === "rejected"
                        ? "Appointment Declined"
                        : "Session Missed"}
                    </p>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        appointment.status === "cancelled"
                          ? "bg-slate-200 text-slate-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {appointment.status === "cancelled"
                        ? "Cancelled"
                        : appointment.status === "rejected"
                        ? "Declined"
                        : "Missed"}
                    </span>
                  </div>

                  <p className="mt-2 text-slate-500">
                    {new Date(appointment.appointmentDate).toLocaleString()}
                  </p>

                  {appointment.reason && (
                    <p className="mt-3 text-slate-600">
                      {appointment.reason}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

      </div>

      {/* RESCHEDULE MODAL */}
      {reschedulingAppt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-200">
            <h3 className="text-xl font-bold text-slate-800">Reschedule Appointment</h3>
            <p className="mt-1 text-sm text-slate-500">
              Select a new date and time for your counseling session.
            </p>

            <form onSubmit={handleRescheduleSubmit} className="mt-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  New Date & Time
                </label>
                <input
                  type="datetime-local"
                  required
                  value={rescheduleDate}
                  onChange={(e) => setRescheduleDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#FAFCFF] px-4 py-3 outline-none focus:ring-2 focus:ring-purple-200"
                />
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setReschedulingAppt(null)}
                  className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-purple-700"
                >
                  Confirm Reschedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}