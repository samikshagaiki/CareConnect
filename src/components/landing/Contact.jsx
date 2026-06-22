import WaveDivider from "./WaveDivider";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden py-24 bg-[#F5F0FF]"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Side */}

          <div>

            <span className="rounded-full bg-white px-4 py-2 text-sm">
              📩 Contact Us
            </span>

            <h2 className="mt-6 text-5xl font-bold">
              We&apos;d Love To
              <span className="block bg-linear-to-r from-sky-400 to-purple-400 bg-clip-text text-transparent">
                Hear From You
              </span>
            </h2>

            <p className="mt-6 text-slate-600 text-lg">
              Whether you have feedback, questions,
              suggestions or partnership opportunities,
              we&apos;re always happy to connect.
            </p>

            <div className="mt-10 space-y-6">

              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center shadow">
                  📧
                </div>

                <div>
                  <h4 className="font-semibold">
                    Email
                  </h4>

                  <p className="text-slate-500">
                    support@connectcare.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center shadow">
                  📞
                </div>

                <div>
                  <h4 className="font-semibold">
                    Phone
                  </h4>

                  <p className="text-slate-500">
                    +91 9876543210
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center shadow">
                  💬
                </div>

                <div>
                  <h4 className="font-semibold">
                    Support
                  </h4>

                  <p className="text-slate-500">
                    Available 24/7
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Right Side */}

          <div className="rounded-4xl bg-white p-8 shadow-xl">

            <h3 className="text-2xl font-bold">
              Send A Message
            </h3>

            <div className="mt-8 space-y-5">

              <input
                type="text"
                placeholder="Your Name"
                className="w-full rounded-2xl border p-4"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full rounded-2xl border p-4"
              />

              <textarea
                rows={5}
                placeholder="Your Message"
                className="w-full rounded-2xl border p-4"
              />

              <button className="w-full rounded-2xl bg-primary py-4 text-white font-medium shadow-lg">
                Send Message
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* Soft Wave */}

      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 180"
          className="w-full"
        >
          <path
            fill="#EEF7FF"
            d="M0,96L120,112C240,128,480,160,720,160C960,160,1200,128,1320,112L1440,96L1440,320L0,320Z"
          />
        </svg>
      </div>
    </section>
  );
}