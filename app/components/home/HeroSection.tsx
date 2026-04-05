"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Cpu, Gauge, Timer, ChevronDown } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { vehicles, getFeaturedVehicles, getNewArrivals, Vehicle, formatPrice } from "@/app/data/vehicleData";
import CarModal from "./CarModal";

export default function HeroSection() {
  const [selectedCar, setSelectedCar] = useState<Vehicle | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedRect, setClickedRect] = useState<DOMRect | null>(null);
  const [hoveredCar, setHoveredCar] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const featuredVehicles = getFeaturedVehicles();
  const featuredCar = featuredVehicles[activeIndex] || vehicles[0];
  const newArrivals = getNewArrivals();

  const heroRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselInnerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll carousel (desktop)
  useGSAP(() => {
    if (!carouselInnerRef.current) return;
    const cards = carouselInnerRef.current.children;
    const totalWidth = Array.from(cards).reduce(
      (acc: number, card) => acc + (card as HTMLElement).offsetWidth + 24,
      0
    );
    const loop = gsap.to(carouselInnerRef.current, {
      x: `-${totalWidth / 2}`,
      duration: 25,
      ease: "none",
      repeat: -1,
    });
    carouselRef.current?.addEventListener("mouseenter", () => loop.pause());
    carouselRef.current?.addEventListener("mouseleave", () => loop.play());
    return () => loop.kill();
  }, { scope: heroRef });

  // Entrance animation
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(".featured-item",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.15 }
    ).fromTo(".carousel-container",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1 },
      "-=0.5"
    );
  }, { scope: heroRef });

  // Auto-cycle
  useEffect(() => {
    if (isModalOpen || featuredVehicles.length <= 1) return;
    const interval = setInterval(() => {
      gsap.to(".featured-item", {
        opacity: 0, y: 10, duration: 0.4, stagger: 0.04,
        onComplete: () => setActiveIndex((p) => (p + 1) % featuredVehicles.length),
      });
    }, 8000);
    return () => clearInterval(interval);
  }, [isModalOpen, featuredVehicles.length]);

  // Fade-in on index change
  useGSAP(() => {
    if (activeIndex === 0 && !heroRef.current) return;
    gsap.fromTo(".featured-item",
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power2.out", delay: 0.1 }
    );
  }, [activeIndex]);

  const openModal = (car: Vehicle, e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setClickedRect(rect);
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  return (
    <section ref={heroRef} className="relative w-full h-screen overflow-hidden bg-black">
      {/* ── Background Video ── */}
      <div className="absolute inset-0">
        <video
          autoPlay muted playsInline poster="/poster.png"
          className="absolute inset-0 w-full h-full object-cover grayscale-[0.15]"
        >
          <source src="/carC.mp4" type="video/mp4" />
        </video>
        {/* Gradients */}
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-black/50 z-10" />
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/10 to-transparent z-10 hidden lg:block" />
        {/* Mobile-specific stronger bottom fade */}
        <div className="absolute inset-0 lg:hidden bg-linear-to-t from-black via-black/60 to-transparent z-10" />
      </div>

      {/* ══════════════════════════════════════════
          MOBILE LAYOUT  (< lg)
          — Full-screen, content pinned to bottom
      ══════════════════════════════════════════ */}
      <div className="lg:hidden absolute inset-0 z-20 flex flex-col justify-end pb-36 px-5">
        {/* Brand pill */}
        <div className="featured-item mb-4 flex items-center gap-2">
          <span className="block w-[3px] h-3.5 bg-crimson rounded-full" />
          <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-crimson">Featured Selection</p>
        </div>

        {/* Make / Model */}
        <div className="featured-item mb-3">
          <h1 className="text-[2.6rem] font-black text-white uppercase tracking-tighter leading-[0.9]">
            {featuredCar.make}
          </h1>
          <span className="text-[2.1rem] font-black text-white/25 uppercase tracking-tighter leading-[0.9]">
            {featuredCar.model}
          </span>
        </div>

        {/* Short description */}
        <p className="featured-item text-[11px] text-white/45 leading-relaxed mb-5 max-w-[300px]">
          {featuredCar.description.split(".")[0] + "."}
        </p>

        {/* Specs — horizontal row */}
        <div className="featured-item flex items-center gap-3 mb-5">
          {[
            { Icon: Cpu,   val: featuredCar.engine.match(/V\d+|Electric|Flat-\d+/)?.[0] ?? "V12", label: "Engine" },
            { Icon: Gauge, val: `${featuredCar.horsepower}`, label: "HP" },
            { Icon: Timer, val: featuredCar.zeroToSixty, label: "0–100" },
          ].map(({ Icon, val, label }) => (
            <div key={label}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/10 bg-white/5"
              style={{ backdropFilter: "blur(12px)" }}
            >
              <Icon className="w-3 h-3 text-crimson" strokeWidth={1.5} />
              <div>
                <p className="text-[12px] font-black text-white leading-none">{val}</p>
                <p className="text-[8px] text-white/30 uppercase tracking-wider mt-0.5">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Row */}
        <div className="featured-item flex items-center gap-3 mb-5">
          <button
            onClick={(e) => openModal(featuredCar, e)}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-white text-black rounded-full font-bold text-[12px] tracking-[0.15em] uppercase active:scale-95 transition-all"
          >
            Discover
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <div className="text-right">
            <p className="text-[8px] text-white/25 uppercase tracking-wider">From</p>
            <p className="text-[16px] font-black text-white">{formatPrice(featuredCar.price)}</p>
          </div>
        </div>

        {/* Cycle dots */}
        {featuredVehicles.length > 1 && (
          <div className="featured-item flex items-center gap-2 mb-1">
            {featuredVehicles.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-0.5 rounded-full transition-all duration-500 ${
                  i === activeIndex ? "w-6 bg-crimson" : "w-2 bg-white/20"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════
          DESKTOP LAYOUT  (≥ lg)
          — Original left-panel + bottom carousel
      ══════════════════════════════════════════ */}
      {/* Left panel */}
      <div className="hidden lg:flex absolute top-10 bottom-0 left-0 z-20 flex-col justify-center pl-10 xl:pl-20 pb-8">
        <div className="flex flex-col gap-5 max-w-[520px]">
          {/* Label */}
          <div className="featured-item flex items-center gap-2">
            <span className="block w-[3px] h-4 bg-crimson rounded-full" />
            <p className="text-[10px] font-semibold tracking-[0.35em] uppercase text-crimson">Featured Selection</p>
          </div>

          {/* Headline */}
          <div className="featured-item flex flex-col leading-none">
            <h1 className="text-[clamp(2rem,4.5vw,4rem)] font-black text-white uppercase tracking-tight leading-none whitespace-nowrap">
              {featuredCar.make}
            </h1>
            <span className="text-[clamp(1.75rem,4vw,3.5rem)] font-black text-white/30 uppercase tracking-tight leading-none whitespace-nowrap">
              {featuredCar.model}
            </span>
          </div>

          {/* Tagline */}
          <p className="featured-item text-[11px] font-semibold tracking-[0.22em] uppercase text-white/55">
            A Legend Redefined.&nbsp;&nbsp;Power Without Limits.
          </p>

          {/* Description */}
          <p className="featured-item text-[13px] text-white/45 leading-relaxed max-w-[340px]">
            {featuredCar.description.split(".")[0] + "."}
          </p>

          {/* CTA */}
          <div className="featured-item">
            <button
              onClick={(e) => openModal(featuredCar, e)}
              className="group inline-flex items-center gap-3 py-3 px-7 bg-white text-black rounded-full font-semibold text-[13px] tracking-[0.2em] uppercase transition-all duration-300 hover:bg-white/90 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] active:scale-95"
            >
              Discover Features
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>
          </div>

          {/* Specs Bar */}
          <div className="featured-item">
            <div className="inline-flex items-stretch divide-x divide-white/10 rounded-2xl overflow-hidden"
              style={{ background: 'oklch(10% 0.005 250 / 0.75)', backdropFilter: 'blur(24px)', border: '1px solid oklch(30% 0.005 250 / 0.35)' }}
            >
              {[
                { Icon: Cpu,   val: featuredCar.engine.match(/V\d+|Electric|Flat-\d+/)?.[0] ?? "V12", label: "Engine" },
                { Icon: Gauge, val: `${featuredCar.horsepower}`, label: "HP" },
                { Icon: Timer, val: featuredCar.zeroToSixty, label: "0–100 KM/H" },
              ].map(({ Icon, val, label }) => (
                <div key={label} className="flex flex-col items-center justify-center gap-2 px-7 py-4 w-[110px]">
                  <Icon className="w-5 h-5 text-white/50" strokeWidth={1.5} />
                  <div className="text-center">
                    <p className="text-[20px] font-black text-white leading-none">{val}</p>
                    <p className="text-[9px] font-semibold tracking-[0.3em] uppercase text-white/35 mt-1">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress bar */}
          <div className="featured-item w-full max-w-[340px] h-0.5 bg-white/10 rounded-full overflow-hidden">
            <div
              key={activeIndex}
              className="h-full bg-crimson origin-left animate-[hero-progress_8s_linear_forwards]"
            />
          </div>
        </div>
      </div>

      {/* Bottom-right carousel (desktop only) */}
      <div className="carousel-container hidden lg:block absolute bottom-2 right-0 z-30 w-full max-w-[50%] overflow-hidden">
        <div
          ref={carouselRef}
          className="relative cursor-pointer"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 25%)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 25%)",
          }}
        >
          <div ref={carouselInnerRef} className="flex gap-6 px-10 w-max">
            {[...newArrivals, ...newArrivals].map((car, i) => (
              <div
                key={`${car.slug}-${i}`}
                onClick={(e) => openModal(car, e)}
                onMouseEnter={() => setHoveredCar(`${car.slug}-${i}`)}
                onMouseLeave={() => setHoveredCar(null)}
                className="group relative w-36 h-24 rounded-xl overflow-hidden bg-zinc-900 border border-white/5 transition-all duration-500 hover:border-crimson/40 hover:-translate-y-1 shrink-0 cursor-pointer"
              >
                <Image src={car.image} alt={car.name} fill
                  className={`object-cover transition-transform duration-700 ${hoveredCar === `${car.slug}-${i}` ? "scale-110" : "scale-100"}`}
                  sizes="144px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-400 ${hoveredCar === `${car.slug}-${i}` ? "opacity-100" : "opacity-0"}`} />
                <div className={`absolute bottom-0 left-0 right-0 p-3 transition-all duration-400 ${hoveredCar === `${car.slug}-${i}` ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}>
                  <p className="text-[9px] font-semibold text-crimson uppercase tracking-widest leading-none">{car.make}</p>
                  <p className="text-[11px] font-bold text-white leading-tight mt-0.5">{car.model}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint (mobile, shown briefly) */}
      <div className="lg:hidden absolute bottom-24 right-5 z-20 flex flex-col items-center gap-1 opacity-40">
        <ChevronDown className="w-4 h-4 text-white animate-bounce" />
      </div>

      {/* Modal */}
      <CarModal
        car={selectedCar}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        originRect={clickedRect}
      />
    </section>
  );
}
