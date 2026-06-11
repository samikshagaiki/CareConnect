export default function Contact() {
  return (
    <section
      id="contact"
      className="py-24"
    >
      <div className="max-w-200 mx-auto px-6 text-center">

        <h2 className="text-4xl font-bold">
          Get In Touch
        </h2>

        <p className="mt-4 text-muted-foreground">
          Have questions, suggestions or feedback?
          We&apos;d love to hear from you.
        </p>

        <div className="mt-10 grid gap-4">

          <input
            type="text"
            placeholder="Your Name"
            className="border rounded-2xl px-5 py-4"
          />

          <input
            type="email"
            placeholder="Your Email"
            className="border rounded-2xl px-5 py-4"
          />

          <textarea
            rows={5}
            placeholder="Your Message"
            className="border rounded-2xl px-5 py-4"
          />

          <button className="bg-primary text-white rounded-2xl py-4">
            Send Message
          </button>

        </div>

      </div>
    </section>
  );
}