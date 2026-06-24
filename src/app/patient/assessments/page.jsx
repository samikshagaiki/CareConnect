"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AssessmentsPage() {
  const [
    assignedAssessments,
    setAssignedAssessments,
  ] = useState([]);

  async function fetchAssignedAssessments() {
    try {
      const response =
        await fetch(
          "/api/patient/assigned-assessments"
        );

      const data =
        await response.json();

      if (data.success) {
        setAssignedAssessments(
          data.assessments
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchAssignedAssessments();
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
          Wellness Assessments 🧠
        </h1>

        <p className="mt-4 text-lg text-white/90">
          Complete assessments recommended by your counselor
          and track your emotional wellbeing.
        </p>

        <div className="mt-8 flex gap-10">
          <div>
            <p className="text-4xl font-bold text-white">
              1
            </p>

            <p className="text-white/80">
              Standard Assessment
            </p>
          </div>

          <div>
            <p className="text-4xl font-bold text-white">
              {assignedAssessments.length}
            </p>

            <p className="text-white/80">
              Assigned Assessments
            </p>
          </div>
        </div>
      </div>

      <div
        className="
        absolute
        -top-16
        -right-16
        h-72
        w-72
        rounded-full
        bg-white/10
      "
      />
    </section>

    {/* STANDARD ASSESSMENTS */}

    <section>

      <h2 className="text-3xl font-bold">
        Standard Assessments
      </h2>

      <div className="mt-6 grid gap-6 md:grid-cols-2">

        <Link
          href="/patient/assessments/phq9"
          className="
          group
          rounded-[32px]
          bg-white
          p-8
          shadow-lg
          border
          border-purple-100
          transition-all
          hover:-translate-y-1
          hover:shadow-xl
        "
        >
          <div className="flex items-center justify-between">

            <div>

              <div
                className="
                h-14
                w-14
                rounded-2xl
                bg-gradient-to-r
                from-[#8EC5FC]
                to-[#DCCCFD]
                flex
                items-center
                justify-center
                text-2xl
              "
              >
                🧠
              </div>

              <h3 className="mt-5 text-2xl font-bold">
                PHQ-9 Assessment
              </h3>

              <p className="mt-3 text-slate-500">
                Depression screening questionnaire used
                by mental health professionals.
              </p>

            </div>

            <div
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
              9 Questions
            </div>

          </div>

          <div className="mt-6 flex items-center justify-between">

            <span className="text-slate-500">
              Approx. 3 mins
            </span>

            <span
              className="
              rounded-full
              bg-purple-100
              px-4
              py-2
              text-purple-600
              font-medium
            "
            >
              Start →
            </span>

          </div>

        </Link>

      </div>

    </section>

    {/* ASSIGNED */}

    <section>

      <div className="flex items-center justify-between">

        <h2 className="text-3xl font-bold">
          Assigned Assessments
        </h2>

        <span
          className="
          rounded-full
          bg-[#F8F3FF]
          px-4
          py-2
          text-purple-600
          font-medium
        "
        >
          {assignedAssessments.length} Active
        </span>

      </div>

      {assignedAssessments.length === 0 ? (

        <div
          className="
          mt-6
          rounded-[32px]
          bg-white
          p-10
          shadow-lg
          border
          border-purple-100
          text-center
        "
        >
          <div className="text-6xl">
            🌸
          </div>

          <h3 className="mt-4 text-2xl font-bold">
            No Assigned Assessments
          </h3>

          <p className="mt-2 text-slate-500">
            Your counselor hasn&apos;t assigned any assessments yet.
          </p>
        </div>

      ) : (

        <div className="mt-6 grid gap-6">

          {assignedAssessments.map(
            (assessment) => (

              <div
                key={assessment.assignmentId}
                className="
                rounded-[32px]
                bg-white
                p-8
                shadow-lg
                border
                border-purple-100
              "
              >

                <div className="flex items-start justify-between">

                  <div>

                    <h3 className="text-2xl font-bold">
                      {assessment.title}
                    </h3>

                    <p className="mt-3 text-slate-500">
                      {assessment.description}
                    </p>

                    <div className="mt-5 flex gap-3">

                      <span
                        className="
                        rounded-full
                        bg-[#EEF8FF]
                        px-4
                        py-2
                        text-sky-600
                        text-sm
                      "
                      >
                        {assessment.questionCount} Questions
                      </span>

                      <span
                        className="
                        rounded-full
                        bg-[#F8F3FF]
                        px-4
                        py-2
                        text-purple-600
                        text-sm
                      "
                      >
                        Assigned
                      </span>

                    </div>

                  </div>

                  <Link
                    href={`/patient/assessments/${assessment.assignmentId}`}
                    className="
                    rounded-2xl
                    bg-gradient-to-r
                    from-[#8EC5FC]
                    to-[#DCCCFD]
                    px-6
                    py-3
                    text-white
                    font-medium
                    shadow-md
                  "
                  >
                    Start →
                  </Link>

                </div>

              </div>

            )
          )}

        </div>

      )}

    </section>

  </div>
);
}