"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const SPECIALIZATIONS = [
  "Anxiety",
  "Depression",
  "Academic Stress",
  "Relationship Issues",
  "Career Guidance",
  "Adolescents",
  "Adults",
  "Senior Citizens",
];

const AGE_GROUPS = [
  "Teenagers",
  "Adults",
  "Seniors",
];

export default function CounselorOnboardingPage() {
  const router = useRouter();

  const [fullName, setFullName] =
    useState("");

  const [gender, setGender] =
    useState("");

  const [experience, setExperience] =
    useState("");

  const [bio, setBio] =
    useState("");

  const [languages, setLanguages] =
    useState("");

  const [
    specialization,
    setSpecialization,
  ] = useState([]);

  const [ageGroups, setAgeGroups] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  function toggleSpecialization(
    value
  ) {
    if (
      specialization.includes(
        value
      )
    ) {
      setSpecialization(
        specialization.filter(
          (item) =>
            item !== value
        )
      );
    } else {
      setSpecialization([
        ...specialization,
        value,
      ]);
    }
  }

  function toggleAgeGroup(
    value
  ) {
    if (
      ageGroups.includes(value)
    ) {
      setAgeGroups(
        ageGroups.filter(
          (item) =>
            item !== value
        )
      );
    } else {
      setAgeGroups([
        ...ageGroups,
        value,
      ]);
    }
  }

  async function handleSubmit(
    e
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const response =
        await fetch(
          "/api/counselor/onboarding",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              fullName,

              gender,

              experience,

              bio,

              languages:
                languages
                  .split(",")
                  .map(
                    (lang) =>
                      lang.trim()
                  ),

              specialization,

              ageGroups,
            }),
          }
        );

      const data =
        await response.json();

      if (!data.success) {
        alert(
          data.message
        );
        return;
      }

      router.push(
        "/counselor/pending-approval"
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

 return (
  <div className="min-h-screen bg-[#F7FBFF] py-10 px-6">

    <div className="mx-auto max-w-6xl">

      {/* HERO */}

      <div
        className="
        mb-8
        overflow-hidden
        rounded-[36px]
        bg-gradient-to-r
        from-[#67B7FF]
        to-[#B89CFF]
        p-10
        text-white
        shadow-xl
      "
      >
        <div className="max-w-3xl">

          <p className="text-sm uppercase tracking-widest text-white/80">
            Counselor Onboarding
          </p>

          <h1 className="mt-3 text-5xl font-bold">
            Build Your Profile
          </h1>

          <p className="mt-4 text-lg text-white/90">
            Complete your profile for verification and start
            helping patients on CareConnect.
          </p>

        </div>
      </div>

      {/* FORM CARD */}

      <div
        className="
        rounded-[36px]
        bg-white
        p-10
        shadow-xl
        border
        border-slate-100
      "
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >

          {/* BASIC DETAILS */}

          <div>

            <h2 className="mb-5 text-2xl font-bold text-slate-800">
              Personal Information
            </h2>

            <div className="grid gap-5 md:grid-cols-2">

              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) =>
                  setFullName(
                    e.target.value
                  )
                }
                className="
                rounded-2xl
                border
                border-slate-200
                px-5
                py-4
                outline-none
                focus:border-sky-300
                focus:ring-4
                focus:ring-sky-100
              "
                required
              />

              <select
                value={gender}
                onChange={(e) =>
                  setGender(
                    e.target.value
                  )
                }
                className="
                rounded-2xl
                border
                border-slate-200
                px-5
                py-4
                outline-none
                focus:border-sky-300
                focus:ring-4
                focus:ring-sky-100
              "
                required
              >
                <option value="">
                  Select Gender
                </option>

                <option value="male">
                  Male
                </option>

                <option value="female">
                  Female
                </option>

                <option value="other">
                  Other
                </option>
              </select>

            </div>

          </div>

          {/* EXPERIENCE */}

          <div>

            <h2 className="mb-5 text-2xl font-bold text-slate-800">
              Professional Details
            </h2>

            <div className="grid gap-5 md:grid-cols-2">

              <input
                type="number"
                placeholder="Years of Experience"
                value={experience}
                onChange={(e) =>
                  setExperience(
                    e.target.value
                  )
                }
                className="
                rounded-2xl
                border
                border-slate-200
                px-5
                py-4
                outline-none
                focus:border-sky-300
                focus:ring-4
                focus:ring-sky-100
              "
                required
              />

              <input
                type="text"
                placeholder="Languages (comma separated)"
                value={languages}
                onChange={(e) =>
                  setLanguages(
                    e.target.value
                  )
                }
                className="
                rounded-2xl
                border
                border-slate-200
                px-5
                py-4
                outline-none
                focus:border-sky-300
                focus:ring-4
                focus:ring-sky-100
              "
                required
              />

            </div>

            <textarea
              rows={6}
              placeholder="Professional Bio"
              value={bio}
              onChange={(e) =>
                setBio(
                  e.target.value
                )
              }
              className="
              mt-5
              w-full
              rounded-2xl
              border
              border-slate-200
              px-5
              py-4
              outline-none
              resize-none
              focus:border-sky-300
              focus:ring-4
              focus:ring-sky-100
            "
              required
            />

          </div>

          {/* SPECIALIZATIONS */}

          <div>

            <h2 className="mb-5 text-2xl font-bold text-slate-800">
              Specializations
            </h2>

            <div className="flex flex-wrap gap-3">

              {SPECIALIZATIONS.map(
                (item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() =>
                      toggleSpecialization(
                        item
                      )
                    }
                    className={`
                    rounded-full
                    px-5
                    py-3
                    font-medium
                    transition-all
                    ${
                      specialization.includes(
                        item
                      )
                        ? `
                          bg-gradient-to-r
                          from-sky-400
                          to-purple-400
                          text-white
                          shadow-md
                        `
                        : `
                          border
                          border-slate-200
                          hover:border-sky-300
                          hover:bg-sky-50
                        `
                    }
                  `}
                  >
                    {item}
                  </button>
                )
              )}

            </div>

          </div>

          {/* AGE GROUPS */}

          <div>

            <h2 className="mb-5 text-2xl font-bold text-slate-800">
              Preferred Age Groups
            </h2>

            <div className="flex flex-wrap gap-3">

              {AGE_GROUPS.map(
                (item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() =>
                      toggleAgeGroup(
                        item
                      )
                    }
                    className={`
                    rounded-full
                    px-5
                    py-3
                    font-medium
                    transition-all
                    ${
                      ageGroups.includes(
                        item
                      )
                        ? `
                          bg-gradient-to-r
                          from-sky-400
                          to-purple-400
                          text-white
                          shadow-md
                        `
                        : `
                          border
                          border-slate-200
                          hover:border-sky-300
                          hover:bg-sky-50
                        `
                    }
                  `}
                  >
                    {item}
                  </button>
                )
              )}

            </div>

          </div>

          {/* SUBMIT */}

          <div className="pt-4">

            <button
              type="submit"
              disabled={loading}
              className="
              w-full
              rounded-2xl
              bg-gradient-to-r
              from-sky-400
              to-purple-400
              py-4
              text-lg
              font-semibold
              text-white
              shadow-lg
              transition-all
              hover:scale-[1.01]
            "
            >
              {loading
                ? "Submitting Profile..."
                : "Submit For Verification"}
            </button>

          </div>

        </form>

      </div>

    </div>

  </div>
);
}