"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  ShoppingBag,
  Stethoscope,
  UserRound,
} from "lucide-react";

const items = [
  {
    label: "Accueil",
    href: "/",
    icon: Home,
  },
  {
    label: "Boutique",
    href: "/boutique",
    icon: ShoppingBag,
  },
  {
    label: "Prestataires",
    href: "/prestataires",
    icon: Stethoscope,
  },
  {
    label: "Compte",
    href: "/compte",
    icon: UserRound,
  },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 shadow-[0_-4px_20px_rgba(0,0,0,0.04)] backdrop-blur md:hidden">
      <div className="grid h-16 grid-cols-4">
        {items.map(({ label, href, icon: Icon }) => {
          const isActive =
            href === "/"
              ? pathname === "/"
              : pathname.startsWith(href);

          return (
            <Link
              key={label}
              href={href}
              className={`relative flex flex-col items-center justify-center gap-1 text-[11px] font-medium transition ${
                isActive
                  ? "text-emerald-700"
                  : "text-slate-500 hover:text-emerald-700"
              }`}
            >
              {isActive && (
                <span className="absolute top-0 h-0.5 w-8 rounded-full bg-emerald-700" />
              )}

              <Icon
                className={`h-5 w-5 ${
                  isActive ? "stroke-[2.4]" : ""
                }`}
              />

              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}