"use client";

import { useState } from "react";
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

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

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
        "Appointment request sent successfully 💜"
      );

      setDate("");
      setReason("");
    } catch {
      alert(
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">

      {/* HERO SECTION */}

      <section
        className="
        relative
        overflow-hidden
        rounded-[40px]
        bg-gradient-to-r
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

    </div>
  );
}