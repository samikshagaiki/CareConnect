"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Users,
  ClipboardList,
  CalendarDays,
  User,
  LogOut,
} from "lucide-react";

const links = [
  {
    name: "Dashboard",
    href: "/counselor/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Patients",
    href: "/counselor/patients",
    icon: Users,
  },
  {
    name: "Appointments",
    href: "/counselor/appointments",
    icon: CalendarDays,
  },
  {
    name: "Profile",
    href: "/counselor/profile",
    icon: User,
  },
];

export default function CounselorSidebar() {
  const pathname =
    usePathname();

  return (
    <aside
      className="
      w-72
      bg-white
      border-r
      border-slate-200
      shadow-sm
      flex
      flex-col
      p-6
    "
    >
      <div className="mb-10">
        <h2 className="text-2xl font-bold">
          Connect Care
        </h2>

        <p className="text-sm text-slate-500">
          Counselor Portal
        </p>
      </div>

      <nav className="flex-1 space-y-2">
        {links.map((link) => {
          const Icon =
            link.icon;

          const active =
            pathname ===
            link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                transition
                ${
                  active
                    ? `
                      bg-slate-900
                      text-white
                    `
                    : `
                      text-slate-600
                      hover:bg-slate-100
                    `
                }
              `}
            >
              <Icon size={18} />

              {link.name}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={() =>
          signOut({
            callbackUrl: "/",
          })
        }
        className="
        mt-6
        flex
        items-center
        gap-3
        rounded-xl
        px-4
        py-3
        text-red-500
        hover:bg-red-50
      "
      >
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
}