"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const result = await signIn(
      "credentials",
      {
        email,
        password,
        redirect: false,
      }
    );

    if (result?.error) {
      setError(
        "Invalid Credentials"
      );
      setLoading(false);
      return;
    }

    router.push("/patient/onboarding");
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
          Welcome Back
        </h1>

        <p className="mt-4 text-muted-foreground text-lg">
          Continue your journey towards
          emotional wellbeing and
          meaningful support.
        </p>

      </div>

      <div className="flex flex-1 items-center justify-center p-6">

        <div className="w-full max-w-md rounded-3xl border bg-card p-8 shadow-sm">

          <h2 className="text-3xl font-bold">
            Login
          </h2>

          <p className="mt-2 text-muted-foreground">
            Access your Connect Care
            account.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-4"
          >

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full rounded-xl border bg-background p-3"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="w-full rounded-xl border bg-background p-3"
            />

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
                ? "Signing In..."
                : "Login"}
            </button>

          </form>

          <p className="mt-6 text-center text-sm">

            Don&apos;t have an account?{" "}

            <Link
              href="/signup"
              className="font-semibold"
            >
              Sign Up
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}