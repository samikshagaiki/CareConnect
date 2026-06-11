const testimonials = [
  {
    name: "Anonymous User",
    text: "The journaling feature helped me identify patterns in my emotions and become more self-aware.",
  },
  {
    name: "Student",
    text: "Having Maya available anytime made me feel supported during stressful academic periods.",
  },
  {
    name: "Community Member",
    text: "The anonymous support community helped me realize I wasn't alone.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-350 mx-auto px-6">

        <div className="text-center">
          <h2 className="text-4xl font-bold">
            What People Say
          </h2>

          <p className="mt-4 text-muted-foreground">
            Stories from individuals who found support through Connect Care.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-background rounded-3xl p-8 border"
            >
              <p className="italic text-muted-foreground">
                &quot;{testimonial.text}&quot;
              </p>

              <h4 className="mt-6 font-semibold">
                {testimonial.name}
              </h4>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}