"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const router = useRouter();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
      role: "patient",
    });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(
            formData
          ),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      router.push("/login");

    } catch {
      setError(
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-background">

      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-16">

        <Image
          src="/logo.png"
          alt="Connect Care"
          width={90}
          height={90}
        />

        <h1 className="mt-6 text-5xl font-bold">
          Begin Your Journey
        </h1>

        <p className="mt-4 text-muted-foreground text-lg">
          A safe space for growth,
          healing and meaningful
          support.
        </p>

      </div>

      <div className="flex flex-1 items-center justify-center p-6">

        <div className="w-full max-w-md rounded-3xl border bg-card p-8 shadow-sm">

          <h2 className="text-3xl font-bold">
            Create Account
          </h2>

          <p className="mt-2 text-muted-foreground">
            Join Connect Care today.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-4"
          >

            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email:
                    e.target.value,
                })
              }
              className="w-full rounded-xl border bg-background p-3"
            />

            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password:
                    e.target.value,
                })
              }
              className="w-full rounded-xl border bg-background p-3"
            />

            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  role:
                    e.target.value,
                })
              }
              className="w-full rounded-xl border bg-background p-3"
            >
              <option value="patient">
                Patient
              </option>

              <option value="counselor">
                Counselor
              </option>
            </select>

            {error && (
              <p className="text-sm text-red-500">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-primary py-3 text-primary-foreground"
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

          </form>

          <p className="mt-6 text-center text-sm">

            Already have an account?{" "}

            <Link
              href="/login"
              className="font-semibold"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}