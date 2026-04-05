"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import AdminPanel from "./AdminPanel";

const navLinks = [
  { href: "/inventory", label: "Models" },
  { href: "/sell-my-car", label: "Trade-In" },
  { href: "/finance", label: "Enquire" },
];

export default function Navbar() {
  const [adminOpen, setAdminOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <AdminPanel isOpen={adminOpen} onClose={() => setAdminOpen(false)} />

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-4 bg-carbon/85 backdrop-blur-xl border-b border-white/6 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            : "py-6 sm:py-8"
        }`}
      >
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <div className="flex h-10 items-center justify-between">

            {/* Left: Admin trigger */}
            <div className="flex-1 flex justify-start">
              <button
                onClick={() => setAdminOpen(true)}
                className="group flex flex-col gap-[5px] p-1.5 text-white/50 hover:text-white transition-colors focus:outline-none"
                aria-label="Open admin panel"
              >
                <span className="block w-5 h-[1.5px] bg-current transition-all duration-300 group-hover:w-6" />
                <span className="block w-4 h-[1.5px] bg-current transition-all duration-300 group-hover:w-6" />
                <span className="block w-5 h-[1.5px] bg-current transition-all duration-300 group-hover:w-6" />
              </button>
            </div>

            {/* Center: Logo */}
            <div className="flex items-center justify-center">
              <Link href="/" className="group flex flex-col items-center">
                <span className="text-xl sm:text-2xl lg:text-3xl font-black tracking-[0.15em] text-white uppercase italic transition-all duration-300">
                  NO<span className="text-crimson">LIMIT</span>
                </span>
                <div className="w-12 h-[2px] bg-crimson mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </div>

            {/* Right: Nav links (Desktop) or Search (Mobile) */}
            <div className="flex-1 flex items-center justify-end">
              {/* Mobile Search Icon */}
              <Link 
                href="/inventory"
                className="md:hidden p-2 text-white/50 hover:text-white transition-colors"
                aria-label="Search vehicles"
              >
                <Search className="w-5 h-5" />
              </Link>

              {/* Desktop Nav Links */}
              <div className="hidden md:flex items-center gap-10">
                {navLinks.map((link) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 relative group ${
                        isActive ? "text-white" : "text-white/45 hover:text-white"
                      }`}
                    >
                      {link.label}
                      <span
                        className={`absolute -bottom-1 left-0 h-[1px] bg-crimson transition-all duration-300 ${
                          isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                      {isActive && (
                        <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-crimson" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
