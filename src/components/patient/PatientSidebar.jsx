"use client";

import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Smile,
  BookOpen,
  Users,
  Calendar,
  BarChart3,
  Bot,
  User,
  LogOut,
  MessageCircle,
} from "lucide-react";

const links = [
  {
    name: "Dashboard",
    href: "/patient/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Mood Tracking",
    href: "/patient/mood",
    icon: Smile,
  },
  {
    name: "Journal",
    href: "/patient/journal",
    icon: BookOpen,
  },
  {
    name: "Community",
    href: "/patient/community",
    icon: Users,
  },
  {
    name: "Find Counselor",
    href: "/patient/counselors",
    icon: User,
  },
  {
    name: "Appointments",
    href: "/patient/appointments",
    icon: Calendar,
  },
  {
  name: "Support Chat",
  href: "/patient/chat",
  icon: MessageCircle,
},
  {
    name: "Assessments",
    href: "/patient/assessments",
    icon: BookOpen,
  },
  {
    name: "Resources",
    href: "/patient/resources",
    icon: BookOpen,
  },
  {
    name: "Progress",
    href: "/patient/progress",
    icon: BarChart3,
  },
  {
    name: "Maya AI",
    href: "/patient/maya",
    icon: Bot,
  },
  {
    name: "Profile",
    href: "/patient/profile",
    icon: User,
  },
];

export default function PatientSidebar({
  mobile = false,
}) {
  const pathname = usePathname();

  return (
    <aside
  className={`
    bg-white
    h-full
    ${
      mobile
        ? "w-72 p-6"
        : "w-80 border-r shadow-lg p-6"
    }
  `}
>
      {/* Logo */}

      <div className="flex items-center gap-3 mb-10">
        <Image
          src="/logo.png"
          alt="CareConnect"
          width={55}
          height={55}
        />

        <div>
          <h2 className="font-bold text-2xl">
            CareConnect
          </h2>

          <p className="text-xs text-slate-500">
            Mental Wellness
          </p>
        </div>
      </div>

      {/* Navigation */}

      <nav className="space-y-2 flex-1">
        {links.map((link) => {
          const Icon = link.icon;

          const active =
            pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`
                flex
items-center
justify-center
lg:justify-start
gap-3
min-w-fit
lg:min-w-0
px-4
py-3
rounded-2xl
whitespace-nowrap
                transition-all
                ${
                  active
                    ? `
                      bg-linear-to-r
                      from-sky-400
                      to-purple-400
                      text-white
                      shadow-md
                    `
                    : `
                      hover:bg-sky-50
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

      {/* Logout */}

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
      justify-center
      lg:justify-start
      gap-3
      whitespace-nowrap
      min-w-fit
      lg:min-w-0
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