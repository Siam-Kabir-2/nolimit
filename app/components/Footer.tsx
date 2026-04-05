"use client";

import Link from "next/link";
import { Instagram, Youtube, ArrowRight, MapPin, Phone, Mail } from "lucide-react";

const footerLinks = {
  inventory: [
    { label: "All Vehicles", href: "/inventory" },
    { label: "New Arrivals", href: "/inventory?sort=newest" },
    { label: "Supercars", href: "/inventory?category=supercar" },
    { label: "Luxury", href: "/inventory?category=luxury" },
    { label: "Electric", href: "/inventory?category=electric" },
  ],
  services: [
    { label: "Trade-In", href: "/sell-my-car" },
    { label: "Enquire", href: "/finance" },
    { label: "Test Drive", href: "/finance" },
    { label: "Financing", href: "/finance" },
  ],
};

const socials = [
  {
    label: "Instagram",
    href: "#",
    icon: Instagram,
  },
  {
    label: "YouTube",
    href: "#",
    icon: Youtube,
  },
  {
    label: "X / Twitter",
    href: "#",
    icon: () => (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L2.25 2.25h6.988l4.27 5.65 4.736-5.65Zm-1.16 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: () => (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-carbon overflow-hidden pb-32 lg:pb-0">
      {/* Top crimson accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-crimson/50 to-transparent" />

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-crimson/3 blur-[100px] rounded-full pointer-events-none" />

      {/* Newsletter bar */}
      <div className="relative border-b border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-[10px] font-semibold text-crimson uppercase tracking-[0.4em] mb-1">Stay in the Loop</p>
              <h3 className="text-xl font-black text-white tracking-tight">
                New arrivals. First to know.
              </h3>
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center gap-2 w-full sm:w-auto"
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 sm:w-64 px-4 py-3 bg-white/4 border border-white/8 rounded-xl text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-crimson/40 transition-all"
              />
              <button
                type="submit"
                className="px-5 py-3 bg-crimson hover:bg-crimson-bright text-white text-[11px] font-bold uppercase tracking-widest rounded-xl transition-all hover:shadow-[0_0_20px_oklch(60%_0.25_20/0.4)] active:scale-95 shrink-0"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <span className="text-3xl font-black tracking-[0.15em] text-white uppercase italic">
                NO<span className="text-crimson">LIMIT</span>
              </span>
            </Link>
            <p className="text-sm text-white/35 leading-relaxed max-w-[220px]">
              Premium machines for those who refuse to compromise. Every vehicle handpicked.
            </p>
            {/* Socials */}
            <div className="flex gap-2.5">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white/4 border border-white/8 flex items-center justify-center text-white/35 hover:text-white hover:bg-crimson/15 hover:border-crimson/30 transition-all duration-300"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Inventory */}
          <div>
            <h3 className="text-[9px] font-black text-white/25 uppercase tracking-[0.35em] mb-5">
              Inventory
            </h3>
            <ul className="space-y-3">
              {footerLinks.inventory.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/40 hover:text-white transition-colors duration-200 inline-flex items-center gap-1.5 group"
                  >
                    <span className="block w-0 h-px bg-crimson group-hover:w-3 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-[9px] font-black text-white/25 uppercase tracking-[0.35em] mb-5">
              Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/40 hover:text-white transition-colors duration-200 inline-flex items-center gap-1.5 group"
                  >
                    <span className="block w-0 h-px bg-crimson group-hover:w-3 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[9px] font-black text-white/25 uppercase tracking-[0.35em] mb-5">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-crimson shrink-0 mt-0.5" strokeWidth={1.5} />
                <span className="text-sm text-white/40 leading-relaxed">
                  1200 Velocity Drive<br />Beverly Hills, CA 90210
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-crimson shrink-0" strokeWidth={1.5} />
                <a href="tel:+18001234567" className="text-sm text-white/40 hover:text-white transition-colors">
                  +1 (800) NO-LIMIT
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-crimson shrink-0" strokeWidth={1.5} />
                <a href="mailto:hello@nolimitautos.com" className="text-sm text-white/40 hover:text-white transition-colors">
                  hello@nolimitautos.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-white/20 tracking-wider">
            © 2026 NoLimit Autos. All rights reserved.
          </p>
          <div className="flex gap-6 text-[11px] text-white/20">
            {["Privacy", "Terms", "Sitemap"].map((item) => (
              <a key={item} href="#" className="hover:text-white/50 transition-colors tracking-wider">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
