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

      <div className="container mx-auto px-5 sm:px-8 pt-32 lg:pt-40 pb-24">

  <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">

    {/* LEFT */}

    <div className="order-2 lg:order-1">

      <div
        className="
        inline-flex
        items-center
        rounded-full
        border
        border-purple-200
        bg-white/70
        px-4
        py-3
        text-sm
        sm:px-6
        sm:py-4
        sm:text-base
        backdrop-blur
        shadow-sm
      "
      >
        🌿 Your Safe Space For Mental Wellness
      </div>

      <h1
        className="
        mt-8
        text-5xl
        font-bold
        leading-tight
        sm:text-6xl
        xl:text-7xl
      "
      >
        Your Journey To

        <span
          className="
          mt-2
          block
          bg-gradient-to-r
          from-sky-400
          via-blue-400
          to-purple-400
          bg-clip-text
          text-transparent
        "
        >
          Better Mental Wellness
        </span>

        Starts Here.
      </h1>

      <p
        className="
        mt-6
        max-w-xl
        text-base
        text-slate-600
        sm:text-lg
      "
      >
        Track emotions, reflect through journaling,
        connect with counselors, complete
        assessments and receive support whenever
        you need it.
      </p>

      <div
        className="
        mt-10
        flex
        flex-col
        gap-4
        sm:flex-row
      "
      >
        <button
          className="
          rounded-2xl
          bg-primary
          px-8
          py-4
          text-white
          shadow-lg
          transition
          hover:scale-105
        "
        >
          Get Started
        </button>

        <button
          className="
          rounded-2xl
          border
          bg-white
          px-8
          py-4
          shadow-sm
          transition
          hover:bg-slate-50
        "
        >
          Learn More
        </button>
      </div>

      <div
        className="
        mt-12
        grid
        grid-cols-3
        gap-8
      "
      >
        <div>
          <h3 className="text-3xl sm:text-4xl font-bold">
            24/7
          </h3>

          <p className="text-slate-500 text-sm sm:text-base">
            AI Support
          </p>
        </div>

        <div>
          <h3 className="text-3xl sm:text-4xl font-bold">
            100%
          </h3>

          <p className="text-slate-500 text-sm sm:text-base">
            Private
          </p>
        </div>

        <div>
          <h3 className="text-3xl sm:text-4xl font-bold">
            ∞
          </h3>

          <p className="text-slate-500 text-sm sm:text-base">
            Growth
          </p>
        </div>
      </div>

    </div>

          {/* RIGHT SIDE */}

              {/* RIGHT */}

    <div
      className="
      order-1
      lg:order-2
      relative
      flex
      justify-center
      mt-8
      lg:mt-0
    "
    >

      {/* Dashboard */}

      <div
        className="
        w-full
        max-w-lg
        rounded-[32px]
        border
        border-white/40
        bg-white/80
        p-5
        shadow-2xl
        backdrop-blur-xl
      "
      >

        <div className="flex gap-2">

          <div className="h-3 w-3 rounded-full bg-red-300"/>

          <div className="h-3 w-3 rounded-full bg-yellow-300"/>

          <div className="h-3 w-3 rounded-full bg-green-300"/>

        </div>

        <div className="mt-6">

          <div className="flex items-center justify-between">

            <h3 className="text-lg font-semibold">
              Mood Tracker
            </h3>

            <span className="text-2xl">
              😊
            </span>

          </div>

          <p className="mt-2 text-slate-500">
            Weekly mood trend
          </p>

          <div className="mt-8 flex h-44 items-end gap-2 sm:gap-3">

            <div className="h-12 w-6 sm:w-8 rounded-xl bg-sky-200"/>

            <div className="h-16 w-6 sm:w-8 rounded-xl bg-sky-300"/>

            <div className="h-24 w-6 sm:w-8 rounded-xl bg-sky-300"/>

            <div className="h-28 w-6 sm:w-8 rounded-xl bg-sky-400"/>

            <div className="h-32 w-6 sm:w-8 rounded-xl bg-sky-500"/>

            <div className="h-36 w-6 sm:w-8 rounded-xl bg-sky-400"/>

            <div className="h-44 w-6 sm:w-8 rounded-xl bg-sky-500"/>

          </div>

        </div>

      </div>

      {/* Maya */}

      <div
        className="
        absolute
        right-0
        top-8
        rounded-3xl
        bg-white
        p-4
        shadow-xl
        sm:p-5
      "
      >

        <MessageCircle
          className="text-purple-500"
          size={26}
        />

        <h4 className="mt-3 font-semibold">
          Maya AI
        </h4>

        <p className="mt-2 text-xs sm:text-sm text-slate-500">
          How are you feeling today?
        </p>

      </div>

      {/* Journal */}

      <div
        className="
        absolute
        left-0
        bottom-16
        max-w-48
        rounded-3xl
        bg-white
        p-4
        shadow-xl
        sm:max-w-56
        sm:p-5
      "
      >

        <BookOpen
          className="text-orange-400"
          size={26}
        />

        <h4 className="mt-3 font-semibold">
          Journal Entry
        </h4>

        <p className="mt-2 text-xs sm:text-sm text-slate-500">
          Today I felt more focused and productive.
        </p>

      </div>

      {/* Assessment */}

      <div
        className="
        absolute
        bottom-0
        right-6
        rounded-3xl
        bg-white
        p-4
        shadow-xl
        sm:right-10
        sm:p-5
      "
      >

        <Brain
          className="text-sky-500"
          size={26}
        />

        <h4 className="mt-3 font-semibold">
          Assessment
        </h4>

        <p className="mt-2 text-xs sm:text-sm text-slate-500">
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