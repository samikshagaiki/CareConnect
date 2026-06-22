import {
  Smile,
  BookOpen,
  HeartHandshake,
} from "lucide-react";

import WaveDivider from "./WaveDivider";

const steps = [
  {
    title: "Check In Daily",
    description:
      "Track your emotions and understand your wellbeing.",
    icon: Smile,
    color: "bg-sky-300",
  },
  {
    title: "Reflect & Journal",
    description:
      "Capture your thoughts and experiences.",
    icon: BookOpen,
    color: "bg-purple-300",
  },
  {
    title: "Receive Support",
    description:
      "Connect with Maya AI and counselors.",
    icon: HeartHandshake,
    color: "bg-orange-300",
  },
];

export default function HowItWorks() {
  return (
    <section
      className="relative overflow-hidden py-24 bg-[#EEF7FF]"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <span className="rounded-full bg-white px-10 py-4 text-lg font-medium">
            🚀 How It Works
          </span>

          <h2 className="mt-10 text-5xl font-bold">
            Your Wellness Journey
          </h2>

        </div>

        <div className="relative mt-24">

          <div className="absolute top-10 left-0 w-full h-1 bg-slate-200" />

          <div className="grid md:grid-cols-3 gap-10 relative">

            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.title}
                  className="text-center"
                >
                  <div
                    className={`mx-auto w-20 h-20 rounded-full ${step.color} flex items-center justify-center shadow-lg`}
                  >
                    <Icon size={34} />
                  </div>

                  <h3 className="mt-8 text-2xl font-bold">
                    {step.title}
                  </h3>

                  <p className="mt-4 text-slate-600">
                    {step.description}
                  </p>
                </div>
              );
            })}

          </div>

        </div>

      </div>

      <WaveDivider color="#F5F0FF" />
    </section>
  );
}