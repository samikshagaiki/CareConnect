const resources = [
  {
    title: "Managing Academic Stress",
    category: "Stress",
  },
  {
    title: "Building Healthy Habits",
    category: "Self Care",
  },
  {
    title: "Understanding Anxiety",
    category: "Mental Health",
  },
];

export default function Resources() {
  return (
    <section
      id="resources"
      className="py-24"
    >
      <div className="max-w-350 mx-auto px-6">

        <div className="text-center">
          <h2 className="text-4xl font-bold">
            Resource Library
          </h2>

          <p className="mt-4 text-muted-foreground">
            Trusted articles and resources to support your wellbeing.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          {resources.map((resource) => (
            <div
              key={resource.title}
              className="bg-white border rounded-3xl p-8 shadow-sm"
            >
              <span className="text-sm px-3 py-1 rounded-full bg-secondary">
                {resource.category}
              </span>

              <h3 className="mt-5 text-xl font-semibold">
                {resource.title}
              </h3>

              <button className="mt-6 text-primary font-medium">
                Read More →
              </button>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}