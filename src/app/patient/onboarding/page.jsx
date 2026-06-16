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
    <div className="min-h-screen bg-background py-10">

      <div className="mx-auto max-w-3xl rounded-3xl border bg-card p-8 shadow-sm">

        <h1 className="text-3xl font-bold">
          Complete Your Profile
        </h1>

        <p className="mt-2 text-muted-foreground">
          Help us personalize your
          experience.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
        >

          <input
            type="text"
            name="anonymousName"
            placeholder="Anonymous Name"
            value={
              formData.anonymousName
            }
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
            required
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
            required
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
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

            <option value="prefer_not_to_say">
              Prefer Not To Say
            </option>
          </select>

          <input
            type="text"
            name="occupation"
            placeholder="Occupation"
            value={
              formData.occupation
            }
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
          />

          <select
            name="preferredCounselorGender"
            value={
              formData.preferredCounselorGender
            }
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
          >
            <option value="no_preference">
              No Preference
            </option>

            <option value="male">
              Male
            </option>

            <option value="female">
              Female
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
            className="w-full rounded-xl border p-3"
          />

          <textarea
            name="primaryConcerns"
            placeholder="Primary Concerns (comma separated)"
            value={
              formData.primaryConcerns
            }
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
            rows={4}
          />

          <div className="border-t pt-6">

            <h2 className="mb-4 text-xl font-semibold">
              Emergency Contact
            </h2>

            <input
              type="text"
              name="emergencyName"
              placeholder="Name"
              value={
                formData.emergencyName
              }
              onChange={handleChange}
              className="mb-3 w-full rounded-xl border p-3"
            />

            <input
              type="text"
              name="emergencyRelationship"
              placeholder="Relationship"
              value={
                formData.emergencyRelationship
              }
              onChange={handleChange}
              className="mb-3 w-full rounded-xl border p-3"
            />

            <input
              type="text"
              name="emergencyPhone"
              placeholder="Phone Number"
              value={
                formData.emergencyPhone
              }
              onChange={handleChange}
              className="w-full rounded-xl border p-3"
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-primary py-3 text-primary-foreground"
          >
            {loading
              ? "Saving..."
              : "Complete Profile"}
          </button>

        </form>

      </div>

    </div>
  );
}