"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import {
  Menu,
  X,
} from "lucide-react";

export default function Navbar() {
  const [open, setOpen] =
    useState(false);

  return (
    <header
      className="
      fixed
      top-0
      left-0
      right-0
      z-50
      backdrop-blur-md
      bg-white/30
    "
    >
      <nav
  className="
    mx-auto
    flex
    h-24
    w-full
    items-center
    justify-between
    px-6
    lg:px-12
    xl:px-20
    2xl:px-28
    border-b
    border-white/30
  "
>
        {/* Logo */}

        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <Image
            src="/logo.png"
            alt="CareConnect"
            width={100}
            height={100}
            className="h-22 w-22 mt-4"
          />

          <div>

            <h2
              className="
              text-2xl
              font-bold
              sm:text-3xl
            "
            >
              CareConnect
            </h2>

          </div>

        </Link>

        {/* Desktop Links */}

        <div
  className="
    hidden
    lg:flex
    items-center
    gap-12
    xl:gap-16
    text-sm
    font-bold
  "
>
          <Link
            href="#features"
            className="font-medium hover:text-sky-500"
          >
            Features
          </Link>

          <Link
            href="#resources"
            className="font-medium hover:text-sky-500"
          >
            Resources
          </Link>

          <Link
            href="#about"
            className="font-medium hover:text-sky-500"
          >
            About
          </Link>

          <Link
            href="#contact"
            className="font-medium hover:text-sky-500"
          >
            Contact
          </Link>

        </div>

        {/* Desktop Buttons */}

        <div className="hidden lg:flex items-center gap-4 xl:gap-5 shrink-0">
  <Link
    href="/login"
    className="
      rounded-xl
      border
      bg-white/60
      px-6
      py-2.5
      backdrop-blur
    "
  >
    Login
  </Link>

  <Link
    href="/signup"
    className="
      rounded-xl
      bg-primary
      px-6
      py-2.5
      text-white
      shadow-md
    "
  >
    Sign Up
  </Link>
</div>

        {/* Mobile Menu */}

        <button
          onClick={() =>
            setOpen(true)
          }
          className="
          rounded-xl
          p-2
          lg:hidden
        "
        >
          <Menu size={28} />
        </button>

      </nav>

      {/* Overlay */}

      {open && (

        <div
          onClick={() =>
            setOpen(false)
          }
          className="
          fixed
          inset-0
          bg-black/40
          lg:hidden
        "
        />

      )}

      {/* Mobile Drawer */}

      <div
        className={`
        fixed
        top-0
        right-0
        h-screen
        w-72
        bg-white
        shadow-2xl
        transition-transform
        duration-300
        lg:hidden

        ${
          open
            ? "translate-x-0"
            : "translate-x-full"
        }
      `}
      >
        <div
          className="
          flex
          items-center
          justify-between
          border-b
          p-6
        "
        >
          <h2 className="text-2xl font-bold">
            Menu
          </h2>

          <button
            onClick={() =>
              setOpen(false)
            }
          >
            <X size={28} />
          </button>

        </div>

        <div className="flex flex-col p-6">

          <Link
            href="#features"
            onClick={() =>
              setOpen(false)
            }
            className="
            rounded-xl
            px-4
            py-3
            hover:bg-slate-100
          "
          >
            Features
          </Link>

          <Link
            href="#resources"
            onClick={() =>
              setOpen(false)
            }
            className="
            rounded-xl
            px-4
            py-3
            hover:bg-slate-100
          "
          >
            Resources
          </Link>

          <Link
            href="#about"
            onClick={() =>
              setOpen(false)
            }
            className="
            rounded-xl
            px-4
            py-3
            hover:bg-slate-100
          "
          >
            About
          </Link>

          <Link
            href="#contact"
            onClick={() =>
              setOpen(false)
            }
            className="
            rounded-xl
            px-4
            py-3
            hover:bg-slate-100
          "
          >
            Contact
          </Link>

          <div className="mt-8 flex flex-col gap-4">

            <Link
              href="/login"
              onClick={() =>
                setOpen(false)
              }
              className="
              rounded-xl
              border
              border-slate-300
              py-3
              text-center
              font-medium
            "
            >
              Login
            </Link>

            <Link
              href="/signup"
              onClick={() =>
                setOpen(false)
              }
              className="
              rounded-xl
              bg-primary
              from-sky-400
              to-purple-400
              py-3
              text-center
              font-medium
              text-white
            "
            >
              Sign Up
            </Link>

          </div>

        </div>

      </div>

    </header>
  );
}