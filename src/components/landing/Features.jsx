import {
  Brain,
  BookOpen,
  Users,
  Calendar,
  Shield,
  MessageCircle,
} from "lucide-react";

const features = [
  {
    title: "Maya AI Companion",
    description:
      "24/7 emotional support and guidance whenever you need someone to talk to.",
    icon: MessageCircle,
  },
  {
    title: "Mood Tracking",
    description:
      "Track your emotions daily and identify patterns in your mental wellbeing.",
    icon: Brain,
  },
  {
    title: "Private Journaling",
    description:
      "Reflect on your thoughts through secure and private journal entries.",
    icon: BookOpen,
  },
  {
    title: "Anonymous Community",
    description:
      "Connect with others in a safe and supportive environment.",
    icon: Users,
  },
  {
    title: "Appointments",
    description:
      "Schedule and manage counseling sessions with ease.",
    icon: Calendar,
  },
  {
    title: "Privacy First",
    description:
      "Your data stays secure and protected with strong privacy controls.",
    icon: Shield,
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="py-24"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">
          <h2 className="text-4xl font-bold">
            Everything You Need For Mental Wellness
          </h2>

          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Connect Care combines emotional support,
            self-reflection, community and professional guidance
            into one platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="bg-white rounded-3xl border p-8 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center">
                  <Icon size={28} />
                </div>

                <h3 className="mt-6 text-xl font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-3 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}