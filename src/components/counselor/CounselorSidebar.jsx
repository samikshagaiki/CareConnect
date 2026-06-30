"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import useNotifications from "@/hooks/useNotifications";

import {
  LayoutDashboard,
  Users,
  CalendarDays,
  User,
  LogOut,
  MessageCircle,
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
    name: "Patient Inbox",
    href: "/counselor/chat",
    icon: MessageCircle,
    notificationType: "chat",
    
  },
  {
    name: "Appointments",
    href: "/counselor/appointments",
    icon: CalendarDays,
    notificationType: "appointment",
    
  },
  {
    name: "Profile",
    href: "/counselor/profile",
    icon: User,
  },
];

export default function CounselorSidebar({ mobile = false }) {
  const pathname = usePathname();

  const { counts } = useNotifications();
 



  return (
    <aside
      className={`
    bg-white
    h-full
    ${mobile ? "w-72 p-6" : "w-80 border-r shadow-sm p-6"}
  `}
    >
      <div className="mb-10">
        <h2 className="text-2xl font-bold">CareConnect</h2>

        <p className="text-sm text-slate-500">Counselor Portal</p>
      </div>

      <nav className="flex-1 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;

          const active = pathname === link.href;

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
whitespace-nowrap
min-w-fit
lg:min-w-0
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

              <div className="flex w-full items-center justify-between">
               

<span className="flex-1">
  {link.name}
</span>

                {link.notificationType && counts[link.notificationType] > 0 && (
                  <span
                    className="
      flex
      h-6
      min-w-6
      items-center
      justify-center
      rounded-full
      bg-red-500
      px-2
      text-xs
      font-semibold
      text-white
    "
                  >
                    {counts[link.notificationType]}
                  </span>
                )}
              </div>
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
