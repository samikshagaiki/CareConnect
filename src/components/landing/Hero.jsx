import {
  MessageCircle,
  BookOpen,
  Brain,
} from "lucide-react";

import WaveDivider from "./WaveDivider";

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-screen bg-linear-to-br from-[#EEF7FF] via-[#F5F8FF] to-[#F8F1FF]">
      {/* Background Blobs */}

      <div className="absolute -left-20 top-32 h-96 w-96 rounded-full bg-purple-200/40 blur-3xl" />

      <div className="absolute right-0 bottom-20 h-112.5 w-112.5 rounded-full bg-sky-200/40 blur-3xl" />

      <div className="absolute top-40 left-24 text-3xl opacity-20">
        💜
      </div>

      <div className="absolute right-32 top-40 text-3xl opacity-20">
        ✨
      </div>

      <div className="container mx-auto px-8 pt-40 pb-24">

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] items-center gap-10">

          {/* LEFT CONTENT */}

          <div className="px-8 py-8">

            <div className="inline-flex items-center rounded-full border border-purple-200 bg-white/70 backdrop-blur px-5 py-5 text-lg shadow-sm">

              🌿 Your Safe Space For Mental Wellness

            </div>

            <h1 className="mt-8 text-5xl md:text-6xl xl:text-7xl font-bold leading-tight">

              Your Journey To

              <span className="block bg-linear-to-r from-sky-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">

                Better Mental Wellness

              </span>

              Starts Here.

            </h1>

            <p className="mt-6 max-w-xl text-lg text-slate-600">

              Track emotions, reflect through journaling,
              connect with counselors, complete assessments
              and receive support whenever you need it.

            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              <button className="rounded-2xl bg-primary px-8 py-4 text-white shadow-lg transition hover:scale-105">

                Get Started

              </button>

              <button className="rounded-2xl border bg-white px-8 py-4 shadow-sm transition hover:bg-slate-50">

                Learn More

              </button>

            </div>

            <div className="mt-12 flex items-center gap-16">

              <div>
                <h3 className="text-4xl font-bold">
                  24/7
                </h3>

                <p className="text-slate-500">
                  AI Support
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-bold">
                  100%
                </h3>

                <p className="text-slate-500">
                  Private
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-bold">
                  ∞
                </h3>

                <p className="text-slate-500">
                  Growth
                </p>
              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}

          <div className="relative flex justify-center">

            {/* Main Dashboard Card */}

            <div className="w-full max-w-130 rounded-4xl border border-white/40 bg-white/80 p-6 shadow-2xl backdrop-blur-xl">

              <div className="flex gap-2">

                <div className="h-3 w-3 rounded-full bg-red-300" />

                <div className="h-3 w-3 rounded-full bg-yellow-300" />

                <div className="h-3 w-3 rounded-full bg-green-300" />

              </div>

              <div className="mt-6">

                <div className="flex items-center justify-between">

                  <h3 className="font-semibold text-lg">

                    Mood Tracker

                  </h3>

                  <span className="text-2xl">
                    😊
                  </span>

                </div>

                <p className="mt-2 text-slate-500">

                  Weekly mood trend

                </p>

                <div className="mt-8 flex h-44 items-end gap-3">

                  <div className="h-12 w-8 rounded-xl bg-sky-200" />

                  <div className="h-16 w-8 rounded-xl bg-sky-300" />

                  <div className="h-24 w-8 rounded-xl bg-sky-300" />

                  <div className="h-28 w-8 rounded-xl bg-sky-400" />

                  <div className="h-32 w-8 rounded-xl bg-sky-500" />

                  <div className="h-36 w-8 rounded-xl bg-sky-400" />

                  <div className="h-44 w-8 rounded-xl bg-sky-500" />

                </div>

              </div>

            </div>

            {/* Maya Card */}

            <div className="absolute right-0 top-12 rounded-3xl bg-white p-5 shadow-xl">

              <MessageCircle
                className="text-purple-500"
                size={28}
              />

              <h4 className="mt-3 font-semibold">

                Maya AI

              </h4>

              <p className="mt-2 text-sm text-slate-500">

                How are you feeling today?

              </p>

            </div>

            {/* Journal Card */}

            <div className="absolute left-0 bottom-16 rounded-3xl bg-white p-5 shadow-xl max-w-55">

              <BookOpen
                className="text-orange-400"
                size={28}
              />

              <h4 className="mt-3 font-semibold">

                Journal Entry

              </h4>

              <p className="mt-2 text-sm text-slate-500">

                Today I felt more focused and productive.

              </p>

            </div>

            {/* Assessment Card */}

            <div className="absolute right-10 bottom-0 rounded-3xl bg-white p-5 shadow-xl">

              <Brain
                className="text-sky-500"
                size={28}
              />

              <h4 className="mt-3 font-semibold">

                Assessment

              </h4>

              <p className="mt-2 text-sm text-slate-500">

                PHQ-9 Progress Improving

              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Bottom Wave */}

      <div className="absolute bottom-0 left-0 w-full">

        <WaveDivider color="#F5F0FF" />

      </div>

    </section>
  );
}