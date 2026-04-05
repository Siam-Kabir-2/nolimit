"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Car, Home, PlusCircle, MessageSquare } from "lucide-react";

const navItems = [
  { label: "Home",    href: "/",           icon: Home },
  { label: "Models",  href: "/inventory",  icon: Car },
  { label: "Trade",   href: "/sell-my-car", icon: PlusCircle },
  { label: "Enquire", href: "/finance",    icon: MessageSquare },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden px-4 pb-5 pt-2 pointer-events-none">
      <div
        className="pointer-events-auto flex items-center justify-around px-2 py-1.5 rounded-2xl border border-white/10 shadow-[0_-4px_40px_rgba(0,0,0,0.6)]"
        style={{ background: "oklch(12% 0.005 250 / 0.9)", backdropFilter: "blur(24px)" }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex flex-col items-center gap-1 px-5 py-2.5 rounded-xl transition-all duration-300"
            >
              {/* Active indicator dot above icon */}
              {isActive && (
                <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-crimson" />
              )}
              <Icon
                className={`w-5 h-5 transition-all duration-300 ${
                  isActive ? "text-crimson scale-110" : "text-white/30"
                }`}
                strokeWidth={isActive ? 2.5 : 1.8}
              />
              <span
                className={`text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${
                  isActive ? "text-crimson opacity-100" : "text-white/25 opacity-100"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
