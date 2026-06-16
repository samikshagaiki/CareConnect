"use client";

import { useState } from "react";

export default function AppointmentsPage() {
  const [date, setDate] =
    useState("");

  const [reason, setReason] =
    useState("");

  async function handleSubmit(
    e
  ) {
    e.preventDefault();

    const response =
      await fetch(
        "/api/appointments",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            appointmentDate:
              date,

            reason,
          }),
        }
      );

    const data =
      await response.json();

    if (!data.success) {
      alert(data.message);
      return;
    }

    alert(
      "Appointment request sent."
    );

    setDate("");
    setReason("");
  }

  return (
    <div>
      <h1 className="text-4xl font-bold">
        Book Appointment
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-4"
      >
        <input
          type="datetime-local"
          value={date}
          onChange={(e) =>
            setDate(
              e.target.value
            )
          }
          className="w-full rounded-xl border p-3"
          required
        />

        <textarea
          rows={4}
          value={reason}
          onChange={(e) =>
            setReason(
              e.target.value
            )
          }
          placeholder="Reason for appointment"
          className="w-full rounded-xl border p-3"
        />

        <button
          type="submit"
          className="rounded-xl bg-primary px-6 py-3 text-primary-foreground"
        >
          Request Appointment
        </button>
      </form>
    </div>
  );
}