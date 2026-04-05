"use client";

import { useRef, useEffect, useState } from "react";
import AnimatedSection from "../AnimatedSection";
import { Trophy, Star, Handshake, Shield } from "lucide-react";

const stats = [
  {
    icon: Trophy,
    value: 500,
    suffix: "+",
    label: "Cars Sold",
    sublabel: "Since 2018",
    prefix: "",
  },
  {
    icon: Star,
    value: 4.9,
    suffix: "",
    label: "Customer Rating",
    sublabel: "★ Out of 5.0",
    prefix: "",
  },
  {
    icon: Handshake,
    value: 0,
    suffix: "",
    label: "Down Payment",
    sublabel: "Available now",
    prefix: "$",
  },
  {
    icon: Shield,
    value: 100,
    suffix: "%",
    label: "Satisfaction",
    sublabel: "Guaranteed",
    prefix: "",
  },
];

function AnimatedCounter({
  target,
  prefix,
  suffix,
  decimals = 0,
}: {
  target: number;
  prefix: string;
  suffix: string;
  decimals?: number;
}) {
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tabular-nums tracking-tight">
      {prefix}
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-carbon py-16 sm:py-20 lg:py-28 pb-20 sm:pb-28">
      {/* Top / bottom rules */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/8 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/8 to-transparent" />

      {/* Radial crimson ambient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,oklch(60%_0.25_20/0.06),transparent)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-10 sm:mb-20">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="block w-6 sm:w-8 h-px bg-crimson" />
            <span className="text-[9px] sm:text-[10px] font-semibold tracking-[0.4em] uppercase text-crimson">By the Numbers</span>
            <span className="block w-6 sm:w-8 h-px bg-crimson" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-none">
            Trusted by <span className="text-white/20">Enthusiasts</span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-white/35 max-w-xs mx-auto leading-relaxed">
            Performance. Integrity. Results.
          </p>
        </AnimatedSection>

        {/* Stat grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <AnimatedSection key={stat.label} delay={i * 0.12}>
                <div className="relative group p-5 sm:p-7 lg:p-9 rounded-2xl bg-surface border border-white/5
                             hover:border-crimson/20 transition-all duration-500 text-center overflow-hidden">

                  {/* Glow behind card on hover */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(60%_0.25_20/0.06),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Icon */}
                  <div className="relative inline-flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white/4 text-white/50 mb-4 sm:mb-6 group-hover:text-crimson group-hover:bg-crimson/10 transition-all duration-300">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.5} />
                  </div>

                  {/* Value */}
                  <div className="relative">
                    <AnimatedCounter
                      target={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      decimals={stat.value === 4.9 ? 1 : 0}
                    />
                  </div>

                  {/* Label */}
                  <p className="relative mt-2 text-[11px] font-semibold text-white/40 uppercase tracking-[0.2em]">
                    {stat.label}
                  </p>

                  {/* Sublabel */}
                  <p className="relative mt-1 text-[10px] text-white/20">
                    {stat.sublabel}
                  </p>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-crimson group-hover:w-1/2 transition-all duration-500" />
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
