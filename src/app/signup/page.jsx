"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "patient",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      router.push("/login");
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#F7FBFF] via-[#EEF8FF] to-[#F8F3FF] flex items-center justify-center p-8">
      <div className="w-full max-w-7xl overflow-hidden rounded-[40px] bg-white shadow-2xl grid lg:grid-cols-[1fr_1.1fr]">
        {/* Left Side */}

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

          <h2 className="mt-12 text-5xl font-bold leading-tight">
            Begin Your
            <span className="block bg-linear-to-r from-sky-400 to-purple-400 bg-clip-text text-transparent">
              Wellness Journey
            </span>
          </h2>

          <p className="mt-4 text-lg text-slate-500">
            Join Connect Care and take your first step toward emotional
            wellbeing.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-5">
            <input
  type="email"
  placeholder="Email Address"
  value={formData.email}
  onChange={(e) =>
    setFormData({
      ...formData,
      email: e.target.value,
    })
  }
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

            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
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

            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  role: e.target.value,
                })
              }
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
            >
              <option value="patient">Patient</option>

              <option value="counselor">Counselor</option>
            </select>

            {error && <p className="text-red-500 text-sm">{error}</p>}

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
      font-semibold
      text-white
      shadow-lg
      transition
      hover:scale-[1.02]
      "
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm">
            Already have an account?
            <Link
              href="/login"
              className="
      ml-2
      font-semibold
      text-purple-500
      "
            >
              Login
            </Link>
          </p>
        </div>

        {/* Right Side */}

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
