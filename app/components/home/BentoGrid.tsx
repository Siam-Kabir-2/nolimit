"use client";

import Image from "next/image";
import Link from "next/link";
import { getNewArrivals, formatPrice } from "@/app/data/vehicleData";
import AnimatedSection from "../AnimatedSection";
import { ArrowRight, Zap } from "lucide-react";

export default function BentoGrid() {
  const arrivals = getNewArrivals().slice(0, 6);

  return (
    <section className="relative py-16 sm:py-20 lg:py-28 bg-background overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-brand/3 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <AnimatedSection>
          <div className="flex items-end justify-between gap-4 mb-10 sm:mb-16">
            <div className="space-y-2 sm:space-y-4">
              <div className="flex items-center gap-3">
                <span className="block w-8 h-px bg-brand" />
                <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.5em] uppercase text-brand">
                  Inventaire Récent
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black text-white tracking-tighter leading-none uppercase italic">
                Nouveaux <span className="text-white/10 not-italic">Arrivages</span>
              </h2>
              <p className="text-xs sm:text-sm text-white/40 max-w-xs leading-relaxed font-medium hidden sm:block">
                Des machines sélectionnées avec soin pour ceux qui refusent les compromis.
              </p>
            </div>
            <Link
              href="/inventory?sort=newest"
              className="shrink-0 group inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3.5 border border-white/10 rounded-xl sm:rounded-2xl text-[10px] sm:text-[11px] font-bold tracking-[0.15em] uppercase text-white/50 hover:text-white hover:border-brand/40 transition-all duration-300"
            >
              <span className="hidden sm:inline">Tout Voir</span>
              <span className="sm:hidden">Tout</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            {/* Comic BOOM */}
            <div className="absolute -top-10 -right-4 sm:-right-8 lg:-right-12 z-20 pointer-events-none animate-bounce-slow hidden sm:block">
              <Image src="/images/comics/boom.png" alt="BOOM!" width={140} height={140} className="drop-shadow-[0_0_25px_rgba(255,69,0,0.5)] -rotate-6" />
            </div>
          </div>
        </AnimatedSection>

        {/* ── MOBILE: Horizontal scroll strip ── */}
        <div className="sm:hidden -mx-4 px-4 overflow-x-auto scrollbar-none">
          <div className="flex gap-3 w-max pb-2">
            {arrivals.map((car, i) => (
              <AnimatedSection key={car.slug} delay={i * 0.06}>
                <Link
                  href={`/inventory/${car.slug}`}
                  className="group relative block w-[260px] h-[180px] rounded-2xl overflow-hidden bg-black border border-white/8 shrink-0"
                >
                  <Image src={car.image} alt={car.name} fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="260px"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />
                  {/* Badge */}
                  <span className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-lg bg-brand text-white text-[8px] font-black uppercase tracking-widest">
                    <Zap className="w-2 h-2" fill="currentColor" /> Nouveau
                  </span>
                  {/* Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-[8px] font-bold text-brand uppercase tracking-widest">{car.make} · {car.year}</p>
                    <p className="text-sm font-black text-white uppercase tracking-tight leading-tight">{car.model}</p>
                    <p className="text-[10px] font-bold text-white/50 mt-0.5">{formatPrice(car.price)}</p>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* ── TABLET: 2-col simple grid ── */}
        <div className="hidden sm:grid lg:hidden grid-cols-2 gap-3">
          {arrivals.slice(0, 4).map((car, i) => (
            <AnimatedSection key={car.slug} delay={i * 0.08} className={i === 0 ? "col-span-2" : ""}>
              <div className={i === 0 ? "h-64" : "h-52"}>
                <CarCard car={car} size={i === 0 ? "wide" : "small"} />
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* ── DESKTOP: Asymmetric bento ── */}
        <div
          className="hidden lg:grid grid-cols-6 gap-4"
          style={{ gridAutoRows: "minmax(220px, auto)" }}
        >
          {/* Hero — tall left */}
          {arrivals[0] && (
            <div className="col-span-3 row-span-2">
              <AnimatedSection delay={0} className="w-full h-full">
                <CarCard car={arrivals[0]} size="hero" />
              </AnimatedSection>
            </div>
          )}
          {/* Wide right top */}
          {arrivals[1] && (
            <div className="col-span-3 row-span-1">
              <AnimatedSection delay={0.1} className="w-full h-full">
                <CarCard car={arrivals[1]} size="wide" />
              </AnimatedSection>
            </div>
          )}
          {/* Wide right bottom */}
          {arrivals[2] && (
            <div className="col-span-3 row-span-1">
              <AnimatedSection delay={0.2} className="w-full h-full">
                <CarCard car={arrivals[2]} size="wide" />
              </AnimatedSection>
            </div>
          )}
          {/* Bottom equal row */}
          {arrivals.slice(3, 6).map((car, idx) => (
            <div key={car.slug} className="col-span-2 row-span-1 min-h-[220px]">
              <AnimatedSection delay={0.3 + idx * 0.1} className="w-full h-full">
                <CarCard car={car} size="small" />
              </AnimatedSection>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

function CarCard({ car, size }: { car: any; size: "hero" | "wide" | "small" }) {
  const isHero = size === "hero";
  return (
    <Link
      href={`/inventory/${car.slug}`}
      className="group relative flex w-full h-full rounded-[1.75rem] overflow-hidden bg-black border border-white/5 transition-all duration-700 hover:border-brand/30 hover:shadow-[0_24px_80px_-16px_rgba(255,165,0,0.2)]"
    >
      <Image
        src={car.image} alt={car.name} fill
        className="object-cover transition-transform duration-1000 group-hover:scale-105"
        sizes={isHero ? "50vw" : "33vw"}
      />
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/15 to-transparent" />

      {/* Top badge */}
      <div className="absolute top-4 left-4">
        {car.newArrival && (
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand text-white text-[9px] font-black uppercase tracking-widest">
            <Zap className="w-2.5 h-2.5" fill="currentColor" /> Nouveau
          </span>
        )}
      </div>

      {/* Bottom content */}
      <div className={`absolute bottom-0 left-0 right-0 ${isHero ? "p-7" : "p-5"}`}>
        {!isHero || true ? null : null}
        <p className="text-[9px] sm:text-[10px] font-black text-white/25 uppercase tracking-[0.4em] mb-1">
          {car.make} · {car.year}
        </p>
        <div className="flex items-end justify-between gap-3">
          <h3 className={`font-black text-white uppercase tracking-tighter leading-[0.9] transition-colors duration-500 group-hover:text-brand-bright ${
            isHero ? "text-3xl lg:text-4xl xl:text-5xl" : "text-xl"
          }`}>
            {car.model}
          </h3>
          <span className={`shrink-0 font-black text-white ${isHero ? "text-xl" : "text-base"}`}>
            {formatPrice(car.price)}
          </span>
        </div>

        {/* Hover reveal */}
        <div className="flex items-center gap-4 mt-3 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
          <span className="text-[9px] font-bold text-white/25 uppercase tracking-widest">{car.horsepower} CV</span>
          <span className="w-px h-3 bg-white/10" />
          <span className="text-[9px] font-bold text-white/25 uppercase tracking-widest">{car.zeroToSixty} 0–100</span>
          <div className="ml-auto w-8 h-8 rounded-full bg-brand flex items-center justify-center">
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </div>
        </div>
      </div>
    </Link>
  );
}
