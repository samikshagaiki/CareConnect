"use client";

import { useEffect, useState } from "react";
import ProgressCharts from "@/components/ProgressCharts";

export default function ProgressPage() {
  const [data, setData] =
    useState(null);

  async function fetchProgress() {
    try {
      const response =
        await fetch(
          "/api/patient/progress-data"
        );

      const result =
        await response.json();

      if (result.success) {
        setData(result);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchProgress();
  }, []);

  if (!data) {
    return (
      <div>
        Loading...
      </div>
    );
  }

 return (
  <div className="space-y-8">

    {/* HERO */}

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

        <h1 className="text-5xl font-bold text-white">
          Progress Journey 🌸
        </h1>

        <p className="mt-4 text-lg text-white/90">
          Every step forward matters.
          Track your emotional growth,
          wellness trends and counseling journey.
        </p>

      </div>

      <div
        className="
        absolute
        -right-16
        -top-16
        h-72
        w-72
        rounded-full
        bg-white/10
      "
      />

    </section>

    {/* STATS */}

    <div className="grid gap-6 md:grid-cols-3">

      <div
        className="
        rounded-[32px]
        bg-gradient-to-r
        from-[#8EC5FC]
        to-[#A7D7FF]
        p-8
        text-white
        shadow-lg
      "
      >
        <h3 className="text-lg font-medium">
          Mood Entries
        </h3>

        <p className="mt-4 text-5xl font-bold">
          {data.moods.length}
        </p>
      </div>

      <div
        className="
        rounded-[32px]
        bg-gradient-to-r
        from-[#B388FF]
        to-[#DCCCFD]
        p-8
        text-white
        shadow-lg
      "
      >
        <h3 className="text-lg font-medium">
          Assessments
        </h3>

        <p className="mt-4 text-5xl font-bold">
          {data.assessments.length}
        </p>
      </div>

      <div
        className="
        rounded-[32px]
        bg-gradient-to-r
        from-[#8EC5FC]
        to-[#DCCCFD]
        p-8
        text-white
        shadow-lg
      "
      >
        <h3 className="text-lg font-medium">
          Appointments
        </h3>

        <p className="mt-4 text-5xl font-bold">
          {data.appointments.length}
        </p>
      </div>

    </div>

    {/* CHARTS */}

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
  <h2 className="text-2xl font-bold mb-4">
    😊 Mood Trend
  </h2>

  <ProgressCharts
    type="mood"
    data={data.moods}
  />
</div>

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
  <h2 className="text-2xl font-bold mb-4">
    📊 Assessment Trend
  </h2>

  <ProgressCharts
    type="assessment"
    data={data.assessments}
  />
</div>

    {/* FEEDBACK + APPOINTMENTS */}

    <div className="grid xl:grid-cols-2 gap-8">

      <div
        className="
        rounded-[32px]
        bg-white
        p-8
        shadow-lg
        border
        border-purple-100
      "
      >

        <h2 className="text-2xl font-bold">
          💜 Counselor Feedback
        </h2>

        <div className="mt-6 space-y-4">

          {data.counselorNotes
            ?.length > 0 ? (
            data.counselorNotes.map(
              (note) => (

                <div
                  key={note._id}
                  className="
                  rounded-2xl
                  bg-[#F8F3FF]
                  p-5
                "
                >
                  <p>
                    {
                      note.counselorNotes
                    }
                  </p>

                  <p
                    className="
                    mt-3
                    text-sm
                    text-slate-500
                  "
                  >
                    {new Date(
                      note.updatedAt
                    ).toLocaleString()}
                  </p>
                </div>

              )
            )
          ) : (
            <p className="mt-4 text-slate-500">
              No feedback available.
            </p>
          )}

        </div>

      </div>

      <div
        className="
        rounded-[32px]
        bg-white
        p-8
        shadow-lg
        border
        border-sky-100
      "
      >

        <h2 className="text-2xl font-bold">
          📅 Appointments
        </h2>

        <div className="mt-6 space-y-4">

          {data.appointments
            ?.length > 0 ? (
            data.appointments.map(
              (
                appointment
              ) => (

                <div
                  key={
                    appointment._id
                  }
                  className="
                  rounded-2xl
                  bg-[#EEF8FF]
                  p-5
                "
                >
                  <p className="font-medium">
                    {
                      appointment.reason
                    }
                  </p>

                  <p className="mt-2 text-slate-500">
                    Status:
                    {" "}
                    {
                      appointment.status
                    }
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    {new Date(
                      appointment.appointmentDate
                    ).toLocaleString()}
                  </p>
                </div>

              )
            )
          ) : (
            <p className="mt-4 text-slate-500">
              No appointments yet.
            </p>
          )}

        </div>

      </div>

    </div>

    {/* WELLNESS TIMELINE */}

    <div
      className="
      rounded-[32px]
      bg-white
      p-8
      shadow-lg
      border
      border-purple-100
    "
    >

      <h2 className="text-2xl font-bold">
        🌱 Wellness Timeline
      </h2>

      <div className="mt-6 space-y-4 max-h-[400px] overflow-y-auto pr-2">

        {data.moods.map((mood) => (

          <div
            key={mood._id}
            className="
            flex
            gap-4
            rounded-2xl
            bg-[#FAFCFF]
            p-5
          "
          >

            <div
              className="
              mt-1
              h-4
              w-4
              rounded-full
              bg-gradient-to-r
              from-[#8EC5FC]
              to-[#DCCCFD]
            "
            />

            <div>

              <p className="font-semibold">
                {mood.mood}
              </p>

              <p className="text-slate-500">
                {mood.note}
              </p>

              <p className="mt-2 text-sm text-slate-400">
                {new Date(
                  mood.createdAt
                ).toLocaleString()}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>

  </div>
);
}