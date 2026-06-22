import WaveDivider from "./WaveDivider";

const testimonials = [
  {
    name: "Anonymous User",
    text: "Journaling helped me understand my emotions.",
  },
  {
    name: "Student",
    text: "Maya supported me during stressful exams.",
  },
  {
    name: "Community Member",
    text: "I realized I wasn't alone.",
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-24 bg-[#EEF7FF]">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-center text-5xl font-bold">
          Stories Of Growth
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          {testimonials.map((item) => (
            <div
              key={item.name}
              className="rounded-4xl bg-white p-8 shadow-lg"
            >
              <div className="text-4xl">
                💬
              </div>

              <p className="mt-5 italic">
                &quot;{item.text}&quot;
              </p>

              <h4 className="mt-6 font-semibold">
                {item.name}
              </h4>
            </div>
          ))}

        </div>

      </div>

      <WaveDivider color="#F5F0FF" />
    </section>
  );
}