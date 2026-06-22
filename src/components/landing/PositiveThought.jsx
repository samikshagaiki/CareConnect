import WaveDivider from "./WaveDivider";

export default function PositiveThought() {
  return (
    <section className="relative overflow-hidden py-20 bg-[#F5F0FF]">


      {/* Decorations */}

      <div className="absolute left-20 top-20 text-4xl opacity-30">
        ✨
      </div>

      <div className="absolute right-24 top-40 text-3xl opacity-20">
        💜
      </div>

      <div className="absolute left-32 bottom-24 text-3xl opacity-20">
        ⭐
      </div>

      <div className="relative max-w-5xl mx-auto px-4 text-center">

        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-lg">

          <span className="text-4xl">
            ✨
          </span>

        </div>

        <h2 className="mt-10 text-5xl font-bold">
          Today&apos;s Positive Thought
        </h2>

        <blockquote className="mt-10 text-3xl italic leading-relaxed text-slate-700">

          &quot;You don&apos;t have to control your thoughts.
          You only have to stop letting them control you.&quot;

        </blockquote>

        <p className="mt-8 text-lg text-slate-500">
          — Dan Millman
        </p>

      </div>

      {/* Bottom Wave */}

      <div className="absolute bottom-0 left-0 right-0">

        <WaveDivider color="#FFFDF8" />

      </div>

    </section>
  );
}