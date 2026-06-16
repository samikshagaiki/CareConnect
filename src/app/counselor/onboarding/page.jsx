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
    <div className="mx-auto max-w-4xl p-8">

      <h1 className="text-4xl font-bold">
        Counselor Profile
      </h1>

      <p className="mt-2 text-muted-foreground">
        Complete your profile
        for admin review.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-6"
      >

        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) =>
            setFullName(
              e.target.value
            )
          }
          className="w-full rounded-xl border p-3"
          required
        />

        <select
          value={gender}
          onChange={(e) =>
            setGender(
              e.target.value
            )
          }
          className="w-full rounded-xl border p-3"
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

        <input
          type="number"
          placeholder="Years of Experience"
          value={experience}
          onChange={(e) =>
            setExperience(
              e.target.value
            )
          }
          className="w-full rounded-xl border p-3"
          required
        />

        <textarea
          rows={5}
          placeholder="Professional Bio"
          value={bio}
          onChange={(e) =>
            setBio(
              e.target.value
            )
          }
          className="w-full rounded-xl border p-3"
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
          className="w-full rounded-xl border p-3"
          required
        />

        <div>

          <h3 className="mb-3 font-semibold">
            Specializations
          </h3>

          <div className="flex flex-wrap gap-2">

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
                  className={`rounded-xl border px-4 py-2 ${
                    specialization.includes(
                      item
                    )
                      ? "border-blue-500"
                      : ""
                  }`}
                >
                  {item}
                </button>
              )
            )}

          </div>

        </div>

        <div>

          <h3 className="mb-3 font-semibold">
            Age Groups
          </h3>

          <div className="flex flex-wrap gap-2">

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
                  className={`rounded-xl border px-4 py-2 ${
                    ageGroups.includes(
                      item
                    )
                      ? "border-blue-500"
                      : ""
                  }`}
                >
                  {item}
                </button>
              )
            )}

          </div>

        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-primary px-6 py-3 text-primary-foreground"
        >
          {loading
            ? "Submitting..."
            : "Submit Profile"}
        </button>

      </form>

    </div>
  );
}