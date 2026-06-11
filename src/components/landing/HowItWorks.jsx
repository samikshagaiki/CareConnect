import { Smile, BookOpen, HeartHandshake } from "lucide-react";

const steps = [
  {
    title: "Check In Daily",
    description:
      "Track your emotions and understand your mental wellbeing over time.",
    icon: Smile,
  },
  {
    title: "Reflect & Journal",
    description:
      "Capture thoughts, experiences and emotions through guided journaling.",
    icon: BookOpen,
  },
  {
    title: "Receive Support",
    description:
      "Connect with Maya AI, counselors and supportive communities.",
    icon: HeartHandshake,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-350 mx-auto px-6">

        <div className="text-center">
          <h2 className="text-4xl font-bold">
            How Connect Care Works
          </h2>

          <p className="mt-4 text-muted-foreground">
            Three simple steps towards a healthier mind.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 mt-16">

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="text-center"
              >
                <div className="mx-auto w-20 h-20 rounded-full bg-secondary flex items-center justify-center">
                  <Icon size={32} />
                </div>

                <div className="mt-4 text-primary font-bold">
                  Step {index + 1}
                </div>

                <h3 className="mt-3 text-2xl font-semibold">
                  {step.title}
                </h3>

                <p className="mt-3 text-muted-foreground">
                  {step.description}
                </p>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}