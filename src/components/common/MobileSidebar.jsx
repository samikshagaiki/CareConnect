"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function MobileSidebar({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}

      <div
        className="
        sticky
        top-0
        z-40
        flex
        items-center
        gap-4
        border-b
        bg-white
        px-4
        py-4
        lg:hidden
      "
      >
        <button onClick={() => setOpen(true)}>
          <Menu size={28} />
        </button>

        <h2 className="text-xl font-bold">
          Connect Care
        </h2>
      </div>

      {/* Overlay */}

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="
          fixed
          inset-0
          z-40
          bg-black/40
          lg:hidden
        "
        />
      )}

      {/* Drawer */}

      <div
        className={`
        fixed
        top-0
        left-0
        z-50
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
            : "-translate-x-full"
        }
      `}
      >
        <div className="flex items-center justify-between p-6">

          <h2 className="text-2xl font-bold">
            Connect Care
          </h2>

          <button
            onClick={() => setOpen(false)}
          >
            <X size={28} />
          </button>

        </div>

        <div
          onClick={() => setOpen(false)}
        >
          {children}
        </div>

      </div>
    </>
  );
}