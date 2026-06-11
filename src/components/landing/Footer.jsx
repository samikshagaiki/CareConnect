import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-white">

      <div className="max-w-350 mx-auto px-6 py-12">

        <div className="grid md:grid-cols-3 gap-10">

          <div>
            <h3 className="text-2xl font-bold">
              Connect Care
            </h3>

            <p className="mt-4 text-muted-foreground">
              A safe space for mental wellness,
              emotional support and professional guidance.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">
              Quick Links
            </h4>

            <div className="flex flex-col gap-3">
              <Link href="#features">Features</Link>
              <Link href="#resources">Resources</Link>
              <Link href="#contact">Contact</Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">
              Support
            </h4>

            <div className="flex flex-col gap-3">
              <Link href="/">Privacy Policy</Link>
              <Link href="/">Terms of Service</Link>
              <Link href="/">Help Center</Link>
            </div>
          </div>

        </div>

        <div className="mt-10 pt-6 border-t text-center text-muted-foreground">

          © {new Date().getFullYear()} Connect Care.
          All rights reserved.

        </div>

      </div>

    </footer>
  );
}