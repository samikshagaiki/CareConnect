"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signIn , getSession} from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  async function handleSubmit(e) {
  e.preventDefault();

  try {
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid Credentials");
      return;
    }

    // Wait for session to be available
    const session = await getSession();

    if (!session) {
      setError("Unable to fetch session.");
      return;
    }

    // Ask backend where to redirect
    const response = await fetch(
      "/api/auth/redirect"
    );

    const data =
      await response.json();

    if (!data.success) {
      setError(
        "Unable to determine redirect."
      );
      return;
    }

    router.replace(data.redirectTo);

  } catch (error) {
    console.error(error);

    setError("Something went wrong.");

  } finally {
    setLoading(false);
  }
}

  return (
  <div
    className="
      min-h-screen
      bg-linear-to-br
      from-[#F7FBFF]
      via-[#EEF8FF]
      to-[#F8F3FF]
      flex
      items-center
      justify-center
      p-4
      sm:p-6
      lg:p-8
    "
  >
    <div
      className="
        w-full
        max-w-7xl
        overflow-hidden
        rounded-[32px]
        lg:rounded-[40px]
        bg-white
        shadow-2xl
        grid
        lg:grid-cols-2
      "
    >
      {/* LEFT */}

      <div
        className="
          flex
          flex-col
          justify-center
          p-6
          sm:p-10
          lg:p-14
        "
      >
        {/* Logo */}

        <div className="flex items-center gap-3">

          <Image
            src="/logo.png"
            alt="Connect Care"
            width={55}
            height={55}
          />

          <div>

            <h1 className="text-2xl font-bold sm:text-3xl">
              Connect Care
            </h1>

            <p className="text-xs sm:text-sm text-slate-500">
              Your Mental Wellness Partner
            </p>

          </div>

        </div>

        {/* Heading */}

        <h2
          className="
            mt-10
            text-4xl
            font-bold
            leading-tight
            sm:text-5xl
            lg:mt-16
            lg:text-6xl
          "
        >
          Welcome Back
          <span className="ml-2">💜</span>
        </h2>

        <p
          className="
            mt-4
            text-base
            text-slate-500
            sm:text-lg
          "
        >
          Continue your wellness journey.
        </p>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5 lg:mt-10"
        >

          <input
            type="email"
            name="fake-email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            autoComplete="new-email"
            className="
              w-full
              rounded-2xl
              border
              border-slate-200
              px-5
              py-4
              outline-none
              focus:border-purple-300
              focus:ring-4
              focus:ring-purple-100
            "
          />

          <div>

            <input
              type="password"
              name="fake-password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              autoComplete="new-password"
              className="
                w-full
                rounded-2xl
                border
                border-slate-200
                px-5
                py-4
                outline-none
                focus:border-purple-300
                focus:ring-4
                focus:ring-purple-100
              "
            />

            <div className="mt-2 flex justify-end">

              <button
                type="button"
                className="
                  text-sm
                  text-purple-500
                  hover:text-purple-600
                "
              >
                Forgot Password?
              </button>

            </div>

          </div>

          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              rounded-2xl
              bg-linear-to-r
              from-sky-400
              to-purple-400
              py-4
              font-semibold
              text-white
              shadow-lg
              transition
              hover:scale-[1.02]
            "
          >
            {loading
              ? "Signing In..."
              : "Sign In"}
          </button>

        </form>

        <p
          className="
            mt-8
            text-center
            text-sm
          "
        >
          Don't have an account?

          <Link
            href="/signup"
            className="
              ml-2
              font-semibold
              text-purple-500
            "
          >
            Sign Up
          </Link>

        </p>

      </div>

      {/* RIGHT */}

      <div
        className="
          hidden
          lg:flex
          relative
          items-center
          justify-center
          overflow-hidden
          bg-linear-to-br
          from-[#F7F3FF]
          via-[#F3F8FF]
          to-[#EEF8FF]
        "
      >

        <Image
          src="/mental-wellness.png"
          alt="Mental Wellness"
          width={650}
          height={650}
          priority
          className="
            h-auto
            w-[90%]
            max-w-[620px]
            object-contain
            drop-shadow-xl
            transition
            duration-500
            hover:scale-105
          "
        />

        <div className="absolute top-16 right-44 h-3 w-3 rounded-full bg-purple-200" />

        <div className="absolute bottom-20 left-40 h-4 w-4 rounded-full bg-sky-200" />

        <div className="absolute top-1/2 right-12 h-2 w-2 rounded-full bg-purple-300" />

      </div>

    </div>
  </div>
);
}
