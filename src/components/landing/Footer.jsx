import Link from "next/link";

import {
  Instagram,
  Linkedin,
  Mail,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-linear-to-b from-[#EEF7FF] via-[#F8F5FF] to-white">

      {/* Decorations */}

      <div className="absolute left-20 top-20 text-3xl opacity-20">
        ✨
      </div>

      <div className="absolute right-24 top-24 text-3xl opacity-20">
        🌟
      </div>

      <div className="absolute left-1/2 bottom-20 text-3xl opacity-20">
        💜
      </div>

      <div className="max-w-7xl mx-auto px-6 py-28">

        {/* Quote Card */}

        <div className="flex justify-center mb-20">

          <div className="max-w-2xl rounded-4xl bg-white p-8 shadow-xl text-center">

            <p className="text-2xl italic text-slate-600">
              "Healing doesn't mean the damage
              never existed. It means the damage
              no longer controls your life."
            </p>

          </div>

        </div>

        {/* Main Grid */}

        <div className="grid md:grid-cols-3 gap-20">

          <div>

            <h3 className="text-3xl font-bold">
              Connect Care
            </h3>

            <p className="mt-5 text-slate-600 leading-relaxed">
              A safe space for mental wellness,
              emotional support, self-reflection,
              community connection and professional guidance.
            </p>

            <div className="mt-8 flex gap-4">

              <div className="h-12 w-12 rounded-full bg-white shadow flex items-center justify-center">
                <Instagram size={18} />
              </div>

              <div className="h-12 w-12 rounded-full bg-white shadow flex items-center justify-center">
                <Linkedin size={18} />
              </div>

              <div className="h-12 w-12 rounded-full bg-white shadow flex items-center justify-center">
                <Mail size={18} />
              </div>

            </div>

          </div>

          <div>

            <h4 className="font-semibold text-lg">
              Quick Links
            </h4>

            <div className="mt-5 flex flex-col gap-4 text-slate-600">

              <Link href="#features">
                Features
              </Link>

              <Link href="#resources">
                Resources
              </Link>

              <Link href="#contact">
                Contact
              </Link>

              <Link href="#about">
                About
              </Link>

            </div>

          </div>

          <div>

            <h4 className="font-semibold text-lg">
              Support
            </h4>

            <div className="mt-5 flex flex-col gap-4 text-slate-600">

              <Link href="/">
                Privacy Policy
              </Link>

              <Link href="/">
                Terms of Service
              </Link>

              <Link href="/">
                Help Center
              </Link>

              <Link href="/">
                Emergency Resources
              </Link>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-20 border-t pt-8 flex flex-col md:flex-row justify-between text-slate-500">

          <p>
            © {new Date().getFullYear()} Connect Care.
            All rights reserved.
          </p>

          <p>
            🌿 Supporting Mental Wellness Every Day
          </p>

        </div>

      </div>

    </footer>
  );
}