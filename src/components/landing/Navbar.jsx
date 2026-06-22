"use client";

import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm">

      <nav className="w-full px-16 xl:px-20">

        <div className="flex items-center justify-between h-24 border-b border-white/30">

          {/* Logo */}

          <Link
  href="/"
  className="flex items-center gap-5 shrink-0"
>
            <Image
              src="/logo.png"
              alt="Connect Care"
              width={55}
              height={55}
            />

            <span className="text-4xl font-bold">
              Connect Care
            </span>
          </Link>

          {/* Links */}

          <div className="hidden lg:flex items-center gap-32 text-sm font-bold">

            <Link href="#features">
              Features
            </Link>

            <Link href="#resources">
              Resources
            </Link>

            <Link href="#about">
              About
            </Link>

            <Link href="#contact">
              Contact
            </Link>

          </div>

          {/* Buttons */}

          <div className="flex items-center gap-10 shrink-0">

            <Link
              href="/login"
              className="rounded-xl border bg-white/60 px-5 py-2 backdrop-blur"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="rounded-xl bg-primary px-5 py-2 text-white shadow-md"
            >
              Sign Up
            </Link>

          </div>

        </div>

      </nav>

    </header>
  );
}