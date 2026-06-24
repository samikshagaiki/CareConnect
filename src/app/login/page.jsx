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

    console.log("SIGNIN RESULT:", result);

    if (result?.error) {
      setError("Invalid Credentials");
      return;
    }

    router.push("/admin/dashboard");
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    setError("Something went wrong");
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="min-h-screen bg-linear-to-br from-[#F7FBFF] via-[#EEF8FF] to-[#F8F3FF] flex items-center justify-center p-8">
      <div className="w-full max-w-6xl overflow-hidden rounded-[40px] bg-white shadow-2xl grid lg:grid-cols-2">
        {/* LEFT SIDE */}

        <div className="p-12 lg:p-14 flex flex-col justify-center">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Connect Care"
                width={60}
                height={60}
              />

              <div>
                <h1 className="text-3xl font-bold">Connect Care</h1>

                <p className="text-sm text-slate-500">
                  Your Mental Wellness Partner
                </p>
              </div>
            </div>
          </div>

          <h2 className="mt-16 text-6xl font-bold leading-tight">
            Welcome Back
            <span className="ml-3">💜</span>
          </h2>

          <p className="mt-4 text-lg text-slate-500">
            Continue your wellness journey.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-5">
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

            {error && <p className="text-red-500 text-sm">{error}</p>}

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
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm">
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

        {/* RIGHT SIDE */}

        <div
          className="
            hidden
            lg:flex
            relative
            items-center
            justify-center
            bg-linear-to-br
          from-[#F7F3FF]
          via-[#F3F8FF]
          to-[#EEF8FF]
            overflow-hidden
          "
        >
          {/* Main Illustration */}

          <div
            className="
              relative
              z-10
              flex
              items-center
              justify-center
            "
          >
            <Image
              src="/mental-wellness.png"
              alt="Mental Wellness"
              width={700}
              height={700}
              priority
              className="
                object-contain
                drop-shadow-xl
                transition-all
                duration-500
                hover:scale-105
              "
            />
          </div>

          {/* Decorative Bubbles */}

          <div className="absolute top-16 right-44 h-3 w-3 rounded-full bg-purple-200" />

          <div className="absolute bottom-20 left-40 h-4 w-4 rounded-full bg-sky-200" />

          <div className="absolute top-1/2 right-12 h-2 w-2 rounded-full bg-purple-300" />
        </div>
      </div>
    </div>
  );
}
