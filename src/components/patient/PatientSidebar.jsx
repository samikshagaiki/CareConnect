"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "Dashboard",
    href: "/patient/dashboard",
  },
  {
    name: "Mood Tracking",
    href: "/patient/mood",
  },
  {
    name: "Journal",
    href: "/patient/journal",
  },
  {
    name: "Community",
    href: "/patient/community",
  },
  {
    name: "Appointments",
    href: "/patient/appointments",
  },
  {
    name: "Resources",
    href: "/patient/resources",
  },
  {
    name: "Progress",
    href: "/patient/progress",
  },
  {
    name: "Maya AI",
    href: "/patient/maya",
  },
  {
    name: "Profile",
    href: "/patient/profile",
  },
];

export default function PatientSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-card p-5">

      <h2 className="mb-8 text-2xl font-bold">
        Connect Care
      </h2>

      <nav className="space-y-2">

        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block rounded-xl px-4 py-3 transition ${
              pathname === link.href
                ? "bg-primary text-primary-foreground"
                : "hover:bg-accent"
            }`}
          >
            {link.name}
          </Link>
        ))}

      </nav>

    </aside>
  );
}