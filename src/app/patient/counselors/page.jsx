"use client";

import { useEffect, useState } from "react";

export default function CounselorsPage() {
  const [counselors, setCounselors] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  async function fetchCounselors() {
    try {
      const response =
        await fetch(
          "/api/counselor"
        );

      if (!response.ok) {
        throw new Error(
          `HTTP ${response.status}`
        );
      }

      const data =
        await response.json();

      if (data.success) {
        setCounselors(
          data.counselors
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function requestCounselor(
    counselorId
  ) {
    try {
      setLoading(true);

      const response =
        await fetch(
          "/api/counselor-assignment",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              counselorId,
            }),
          }
        );

      const data =
        await response.json();

      if (!data.success) {
        alert(
          data.message ||
            "Unable to send request"
        );
        return;
      }

      alert(
        "Counselor request sent successfully!"
      );
    } catch (error) {
      console.error(error);

      alert(
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCounselors();
  }, []);

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
          Find Your Counselor 💜
        </h1>

        <p className="mt-4 text-lg text-white/90 max-w-2xl">
          Connect with trusted mental health professionals
          who can support you throughout your wellness journey.
        </p>

        <div className="mt-8 inline-flex rounded-2xl bg-white/20 px-6 py-4 backdrop-blur-sm">
          <div>
            <p className="text-4xl font-bold text-white">
              {counselors.length}
            </p>

            <p className="text-white/80">
              Available Counselors
            </p>
          </div>
        </div>

      </div>

      <div
        className="
        absolute
        -right-10
        -top-10
        h-64
        w-64
        rounded-full
        bg-white/10
      "
      />

    </section>

    {/* COUNSELORS */}

    <div className="grid gap-8 lg:grid-cols-2">

      {counselors.map((counselor) => (

        <div
          key={counselor._id}
          className="
          rounded-[32px]
          bg-white
          border
          border-purple-100
          p-8
          shadow-lg
          transition-all
          hover:-translate-y-1
          hover:shadow-2xl
        "
        >

          {/* TOP */}

          <div className="flex items-start gap-5">

            <img
              src={
                counselor.gender === "female"
                  ? "/female-wellness.png"
                  : "/male-wellness.png"
              }
              alt="Counselor"
              className="
              h-24
              w-24
              rounded-full
              border-4
              border-purple-100
              object-cover
            "
            />

            <div>

              <h2 className="text-3xl font-bold text-slate-800">
                {counselor.fullName}
              </h2>

              <p className="mt-2 text-slate-500">
                {counselor.experience} Years Experience
              </p>

              <span
                className="
                mt-3
                inline-block
                rounded-full
                bg-[#EEF8FF]
                px-4
                py-1
                text-sm
                font-medium
                text-sky-600
              "
              >
                {counselor.gender}
              </span>

            </div>

          </div>

          {/* BIO */}

          <div className="mt-6">

            <h3 className="font-semibold text-slate-700">
              About
            </h3>

            <p className="mt-2 leading-relaxed text-slate-500">
              {counselor.bio}
            </p>

          </div>

          {/* SPECIALIZATIONS */}

          <div className="mt-6">

            <h3 className="font-semibold text-slate-700">
              Specializations
            </h3>

            <div className="mt-3 flex flex-wrap gap-2">

              {counselor.specialization?.map(
                (item, index) => (
                  <span
                    key={index}
                    className="
                    rounded-full
                    bg-[#F8F3FF]
                    px-4
                    py-2
                    text-sm
                    font-medium
                    text-purple-600
                  "
                  >
                    {item}
                  </span>
                )
              )}

            </div>

          </div>

          {/* LANGUAGES */}

          <div className="mt-6">

            <h3 className="font-semibold text-slate-700">
              Languages
            </h3>

            <div className="mt-3 flex flex-wrap gap-2">

              {counselor.languages?.map(
                (language, index) => (
                  <span
                    key={index}
                    className="
                    rounded-full
                    bg-[#EEF8FF]
                    px-4
                    py-2
                    text-sm
                    font-medium
                    text-sky-600
                  "
                  >
                    {language}
                  </span>
                )
              )}

            </div>

          </div>

          {/* BUTTON */}

          <button
            onClick={() =>
              requestCounselor(
                counselor.userId
              )
            }
            disabled={loading}
            className="
            mt-8
            w-full
            rounded-2xl
            bg-gradient-to-r
            from-sky-400
            to-purple-400
            py-4
            font-semibold
            text-white
            shadow-lg
            transition-all
            hover:scale-[1.02]
            disabled:opacity-50
          "
          >
            {loading
              ? "Sending Request..."
              : "Request Counselor 💜"}
          </button>

        </div>

      ))}

    </div>

    {/* EMPTY STATE */}

    {counselors.length === 0 && (
      <div
        className="
        rounded-[32px]
        bg-white
        border
        border-purple-100
        p-12
        text-center
        shadow-lg
      "
      >
        <h3 className="text-2xl font-bold">
          No Counselors Available
        </h3>

        <p className="mt-3 text-slate-500">
          Approved counselors will appear here once available.
        </p>
      </div>
    )}

  </div>
);
}