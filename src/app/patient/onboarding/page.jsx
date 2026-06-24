"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PatientOnboardingPage() {

    const { data: session } = useSession(); 

  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      anonymousName: "",
      age: "",
      gender: "",
      occupation: "",
      preferredCounselorGender:
        "no_preference",
      preferredLanguage:
        "English",
      primaryConcerns: "",
      emergencyName: "",
      emergencyRelationship: "",
      emergencyPhone: "",
    });

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(
        "/api/patient/onboarding",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            anonymousName:
              formData.anonymousName,

            age: Number(formData.age),

            gender:
              formData.gender,

            occupation:
              formData.occupation,

            preferredCounselorGender:
              formData.preferredCounselorGender,

            preferredLanguage:
              formData.preferredLanguage,

            primaryConcerns:
              formData.primaryConcerns
                .split(",")
                .map((item) =>
                  item.trim()
                ),

            emergencyContacts: [
              {
                name:
                  formData.emergencyName,

                relationship:
                  formData.emergencyRelationship,

                phone:
                  formData.emergencyPhone,
              },
            ],
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      router.push(
        "/patient/dashboard"
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

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  }

  useEffect(() => {
  if (
    session?.user
      ?.profileCompleted
  ) {
    router.push(
      "/patient/dashboard"
    );
  }
}, [session, router]);

  return (
  <div className="min-h-screen bg-gradient-to-br from-[#F7FBFF] via-[#EEF8FF] to-[#F8F3FF] py-10 px-6">

    <div className="mx-auto max-w-7xl overflow-hidden rounded-[40px] bg-white shadow-2xl">

      {/* HERO */}

      <section
        className="
        relative
        overflow-hidden
        bg-gradient-to-r
        from-[#6EC6FF]
        via-[#89D5FF]
        to-[#C5A8FF]
        px-10
        py-12
      "
      >
        <h1 className="text-5xl font-bold text-white">
          Welcome to Connect Care 🌸
        </h1>

        <p className="mt-4 text-lg text-white/90 max-w-2xl">
          Let&apos;s personalize your wellness journey and
          help you find the support that fits your needs.
        </p>

        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10" />
        <div className="absolute left-10 bottom-0 h-24 w-24 rounded-full bg-white/10" />
      </section>

      {/* FORM SECTION */}

      <form
        onSubmit={handleSubmit}
        className="grid gap-8 p-10 lg:grid-cols-2"
      >

        {/* LEFT SIDE */}

        <div className="hidden lg:flex items-center justify-center">
          <img
            src="/default-wellness.png"
            alt="Wellness"
            className="w-[420px] object-contain"
          />
        </div>

        {/* RIGHT SIDE */}

        <div className="space-y-6">

          {/* PERSONAL DETAILS */}

          <div
            className="
            rounded-[32px]
            border
            border-sky-100
            bg-[#FAFCFF]
            p-6
          "
          >
            <h2 className="mb-5 text-xl font-bold">
              👤 Personal Details
            </h2>

            <div className="space-y-4">

              <input
                type="text"
                name="anonymousName"
                placeholder="Anonymous Name"
                value={formData.anonymousName}
                onChange={handleChange}
                required
                className="
                w-full
                rounded-2xl
                border
                border-slate-200
                bg-white
                px-5
                py-4
                focus:border-purple-300
                focus:ring-4
                focus:ring-purple-100
                outline-none
              "
              />

              <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                required
                className="
                w-full
                rounded-2xl
                border
                border-slate-200
                bg-white
                px-5
                py-4
                focus:border-purple-300
                focus:ring-4
                focus:ring-purple-100
                outline-none
              "
              />

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="
                w-full
                rounded-2xl
                border
                border-slate-200
                bg-white
                px-5
                py-4
                focus:border-purple-300
                focus:ring-4
                focus:ring-purple-100
                outline-none
              "
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

                <option value="prefer_not_to_say">
                  Prefer Not To Say
                </option>
              </select>

              <input
                type="text"
                name="occupation"
                placeholder="Occupation"
                value={formData.occupation}
                onChange={handleChange}
                className="
                w-full
                rounded-2xl
                border
                border-slate-200
                bg-white
                px-5
                py-4
                focus:border-purple-300
                focus:ring-4
                focus:ring-purple-100
                outline-none
              "
              />

            </div>
          </div>

          {/* PREFERENCES */}

          <div
            className="
            rounded-[32px]
            border
            border-purple-100
            bg-[#F8F3FF]
            p-6
          "
          >
            <h2 className="mb-5 text-xl font-bold">
              ⚙️ Preferences
            </h2>

            <div className="space-y-4">

              <select
                name="preferredCounselorGender"
                value={
                  formData.preferredCounselorGender
                }
                onChange={handleChange}
                className="
                w-full
                rounded-2xl
                border
                border-slate-200
                bg-white
                px-5
                py-4
              "
              >
                <option value="no_preference">
                  No Preference
                </option>

                <option value="male">
                  Male Counselor
                </option>

                <option value="female">
                  Female Counselor
                </option>
              </select>

              <input
                type="text"
                name="preferredLanguage"
                placeholder="Preferred Language"
                value={
                  formData.preferredLanguage
                }
                onChange={handleChange}
                className="
                w-full
                rounded-2xl
                border
                border-slate-200
                bg-white
                px-5
                py-4
              "
              />

              <textarea
                name="primaryConcerns"
                rows={4}
                placeholder="Primary Concerns (Anxiety, Stress, Depression...)"
                value={
                  formData.primaryConcerns
                }
                onChange={handleChange}
                className="
                w-full
                rounded-2xl
                border
                border-slate-200
                bg-white
                px-5
                py-4
              "
              />

            </div>
          </div>

          {/* EMERGENCY CONTACT */}

          <div
            className="
            rounded-[32px]
            border
            border-sky-100
            bg-[#EEF8FF]
            p-6
          "
          >
            <h2 className="mb-5 text-xl font-bold">
              🚨 Emergency Contact
            </h2>

            <div className="space-y-4">

              <input
                type="text"
                name="emergencyName"
                placeholder="Contact Name"
                value={formData.emergencyName}
                onChange={handleChange}
                className="
                w-full
                rounded-2xl
                border
                border-slate-200
                bg-white
                px-5
                py-4
              "
              />

              <input
                type="text"
                name="emergencyRelationship"
                placeholder="Relationship"
                value={
                  formData.emergencyRelationship
                }
                onChange={handleChange}
                className="
                w-full
                rounded-2xl
                border
                border-slate-200
                bg-white
                px-5
                py-4
              "
              />

              <input
                type="text"
                name="emergencyPhone"
                placeholder="Phone Number"
                value={formData.emergencyPhone}
                onChange={handleChange}
                className="
                w-full
                rounded-2xl
                border
                border-slate-200
                bg-white
                px-5
                py-4
              "
              />

            </div>
          </div>

          {/* SUBMIT */}

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
            hover:scale-[1.02]
          "
          >
            {loading
              ? "Saving Profile..."
              : "Complete Profile ✨"}
          </button>

        </div>

      </form>

    </div>

  </div>
);
}