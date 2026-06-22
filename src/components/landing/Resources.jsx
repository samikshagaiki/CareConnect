import WaveDivider from "./WaveDivider";

const resources = [
  {
    title: "Managing Academic Stress",
    category: "Stress",
    emoji: "📚",
  },
  {
    title: "Building Healthy Habits",
    category: "Self Care",
    emoji: "🌱",
  },
  {
    title: "Understanding Anxiety",
    category: "Mental Health",
    emoji: "💜",
  },
];

export default function Resources() {
  return (
    <section
      id="resources"
      className="relative overflow-hidden py-26 bg-[#F5F0FF]"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <h2 className="text-5xl font-bold">
            Resource Library
          </h2>

          <p className="mt-4 text-slate-600">
            Learn, grow and improve.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-24 mt-16">

          {resources.map((resource) => (
            <div
              key={resource.title}
              className="rounded-4xl bg-white p-8 shadow-lg hover:-translate-y-2 transition"
            >
              <div className="text-5xl">
                {resource.emoji}
              </div>

              <span className="inline-block mt-4 rounded-full bg-purple-100 px-3 py-1 text-sm">
                {resource.category}
              </span>

              <h3 className="mt-5 text-xl font-bold">
                {resource.title}
              </h3>

              <button className="mt-6 text-purple-600 font-medium">
                Read More →
              </button>
            </div>
          ))}

        </div>

      </div>

      <WaveDivider color="#FFFDF8" />
    </section>
  );
}