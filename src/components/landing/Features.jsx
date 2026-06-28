import {
  Brain,
  BookOpen,
  Users,
  Calendar,
  Shield,
  MessageCircle,
} from "lucide-react";

import WaveDivider from "./WaveDivider";

const features = [
  {
    title: "Maya AI",
    description:
      "24/7 emotional support whenever you need someone to talk to.",
    icon: MessageCircle,
    bg: "from-purple-200 to-purple-300",
  },
  {
    title: "Mood Tracking",
    description:
      "Track emotions and discover patterns in your wellbeing.",
    icon: Brain,
    bg: "from-sky-200 to-sky-300",
  },
  {
    title: "Private Journal",
    description:
      "Capture your thoughts securely and reflect daily.",
    icon: BookOpen,
    bg: "from-orange-200 to-orange-300",
  },
  {
    title: "Community",
    description:
      "Connect anonymously with supportive peers.",
    icon: Users,
    bg: "from-green-200 to-green-300",
  },
  {
    title: "Appointments",
    description:
      "Schedule counseling sessions easily.",
    icon: Calendar,
    bg: "from-pink-200 to-pink-300",
  },
  {
    title: "Privacy First",
    description:
      "Your data remains secure and protected.",
    icon: Shield,
    bg: "from-cyan-200 to-cyan-300",
  },
];

export default function Features() {
  return (
    <section
  id="features"
  className="relative overflow-hidden py-28 bg-[#FFFDF8]"
>
      {/* Decorative Shapes */}

      <div className="absolute top-20 left-20 h-40 w-40 rounded-full bg-purple-200 opacity-20 blur-3xl" />

      <div className="absolute bottom-10 right-20 h-60 w-60 rounded-full bg-sky-200 opacity-20 blur-3xl" />

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <span className="rounded-full bg-purple-100 px-10 py-5 text-lg">
            ✨ What We Offer
          </span>

          <h2 className="mt-10 text-5xl px-10 font-bold ">
            Everything You Need
            <span className="block bg-linear-to-r from-sky-400 to-purple-400 bg-clip-text text-transparent mt-4">
              For Mental Wellness
            </span>
          </h2>

          <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-600 font-medium">
            CareConnect combines AI support,
            mood tracking, journaling,
            counseling and community into
            one platform.
          </p>

        </div>

        <div className="mt-18 grid gap-16 md:grid-cols-2 lg:grid-cols-3">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className={`group relative overflow-hidden rounded-4xl bg-linear-to-br ${feature.bg} p-8 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl`}
              >

                {/* Decorative Circle */}

                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/20" />

                <div className="absolute -left-8 -bottom-8 h-24 w-24 rounded-full bg-white/20" />

                <div className="relative">

                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/50 backdrop-blur">

                    <Icon size={30} />

                  </div>

                  <h3 className="mt-8 text-2xl font-bold">
                    {feature.title}
                  </h3>

                  <p className="mt-4 text-slate-700">
                    {feature.description}
                  </p>

                  <div className="mt-8">

                    <button className="rounded-xl bg-white/70 px-5 py-2 text-sm font-medium backdrop-blur transition hover:bg-white">
                      Explore →
                    </button>

                  </div>

                </div>

              </div>
            );
          })}

          

        </div>

      </div>

      <WaveDivider color="#EEF7FF" />

    </section>
  );
}