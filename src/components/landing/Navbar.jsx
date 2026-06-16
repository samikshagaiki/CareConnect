"use client";

import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/20 bg-background/80 backdrop-blur-md">
      <nav className="max-w-350 mx-auto px-6 py-6 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Connect Care"
            width={85}
            height={85}
            priority
          />

          <span className="text-3xl font-bold">
            Connect Care
          </span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="#features">Features</Link>
          <Link href="#resources">Resources</Link>
          <Link href="#about">About</Link>
          <Link href="#contact">Contact</Link>
        </div>

        {/* Buttons */}
       <div className="flex gap-3">

  <Link
    href="/login"
    className="px-5 py-2 rounded-xl border hover:bg-muted transition"
  >
    Login
  </Link>

  <Link
    href="/signup"
    className="px-5 py-2 rounded-xl bg-primary text-white hover:opacity-90 transition"
  >
    Sign Up
  </Link>

  <button
    onClick={() =>
      signOut({
        callbackUrl: "/",
      })
    }
    className="px-5 py-2 rounded-xl border"
  >
    Logout
  </button>

</div>

      </nav>
    </header>
  );
}