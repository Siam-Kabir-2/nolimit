"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  Gauge,
  Fuel,
  Settings,
  Zap,
  Calendar,
  Palette,
  Phone,
  MessageSquare,
  ArrowRight,
  Heart,
  Share2,
  Timer,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import gsap from "gsap";
import { Vehicle, formatPrice, formatMileage, vehicles } from "@/app/data/vehicleData";

interface CarModalProps {
  car: Vehicle | null;
  isOpen: boolean;
  onClose: () => void;
  originRect: DOMRect | null;
}

export default function CarModal({ car, isOpen, onClose, originRect }: CarModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [liked, setLiked] = useState(false);

  // Derive images early (needed for keyboard hook below)
  const images = car?.images && car.images.length > 0 ? car.images : car ? [car.image] : [];

  // Reset image index when car changes
  useEffect(() => {
    setActiveImage(0);
    setLiked(false);
  }, [car]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") setActiveImage((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setActiveImage((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, images.length]);

  // Genie entrance animation
  useEffect(() => {
    if (isOpen && car && originRect && contentRef.current && overlayRef.current) {
      document.body.style.overflow = "hidden";

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const startX = (originRect.left + originRect.width / 2) - (vw / 2);
      const startY = (originRect.top + originRect.height / 2) - (vh / 2);

      gsap.set(contentRef.current, { x: startX, y: startY, scale: 0.08, opacity: 0, borderRadius: "120px" });

      const tl = gsap.timeline();
      tl.to(overlayRef.current, { opacity: 1, duration: 0.35, ease: "power2.out" })
        .to(contentRef.current, {
          opacity: 1, scale: 1, x: 0, y: 0, borderRadius: "24px",
          duration: 0.65, ease: "elastic.out(1, 0.75)",
        }, "-=0.15");

    } else if (!isOpen) {
      document.body.style.overflow = "";
    }
  }, [isOpen, car, originRect]);

  const handleClose = () => {
    if (!originRect || !contentRef.current || !overlayRef.current) {
      onClose(); return;
    }
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const endX = (originRect.left + originRect.width / 2) - (vw / 2);
    const endY = (originRect.top + originRect.height / 2) - (vh / 2);

    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(contentRef.current, {
      opacity: 0, scale: 0.08, x: endX, y: endY, borderRadius: "120px",
      duration: 0.45, ease: "power3.inOut",
    }).to(overlayRef.current, { opacity: 0, duration: 0.25 }, "-=0.25");
  };

  if (!isOpen || !car) return null;

  const similarVehicles = vehicles
    .filter((v) => v.slug !== car.slug && v.category === car.category)
    .slice(0, 3);

  const specs = [
    { icon: Settings, label: "Moteur", value: car.engine },
    { icon: Gauge,    label: "Puissance",  value: `${car.horsepower} CV` },
    { icon: Zap,      label: "Couple", value: car.torque },
    { icon: Timer,    label: "0-100",   value: car.zeroToSixty },
    { icon: Settings, label: "Trans.", value: car.transmission },
    { icon: Fuel,     label: "Transmission",  value: car.drivetrain },
    { icon: Fuel,     label: "Carburant",   value: car.fuelType },
    { icon: Fuel,     label: "Conso.",    value: car.mpg },
    { icon: Calendar, label: "Année",   value: String(car.year) },
    { icon: Palette,  label: "Couleur",  value: car.color },
    { icon: Gauge,    label: "Kilométrage",  value: formatMileage(car.mileage) },
    { icon: Settings, label: "Cat.",   value: car.category.charAt(0).toUpperCase() + car.category.slice(1) },
  ];

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-3 sm:p-6 lg:p-10 pointer-events-none">

      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/85 backdrop-blur-xl opacity-0 pointer-events-auto"
        onClick={handleClose}
      />

      {/* Modal shell */}
      <div
        ref={contentRef}
        className="relative w-full max-w-5xl max-h-[92vh] opacity-0 pointer-events-auto flex flex-col rounded-3xl overflow-hidden"
        style={{ background: "oklch(9% 0.005 250)", border: "1px solid oklch(25% 0.005 250 / 0.6)" }}
      >
        {/* ── Sticky header bar ── */}
        <div
          className="shrink-0 flex items-center justify-between px-6 py-4 border-b"
          style={{ borderColor: "oklch(25% 0.005 250 / 0.5)" }}
        >
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-semibold text-brand uppercase tracking-[0.3em]">{car.category}</span>
            <span className="w-px h-3 bg-white/15" />
            <span className="text-[9px] text-white/30 tracking-widest uppercase">Modèle {car.year}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLiked((l) => !l)}
              className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${liked ? "text-brand" : "text-white/25 hover:text-white/60"} hover:bg-white/5`}
            >
              <Heart className="w-4 h-4" fill={liked ? "currentColor" : "none"} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-white/25 hover:text-white/60 hover:bg-white/5 transition-all">
              <Share2 className="w-4 h-4" />
            </button>
            <div className="w-px h-5 bg-white/10 mx-1" />
            <button
              onClick={handleClose}
              className="group w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 text-white/40 hover:bg-white/10 hover:text-white transition-all"
            >
              <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* ── Scrollable body ── */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto overscroll-contain"
          data-lenis-prevent
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {/* Top section: image + info */}
          <div className="grid lg:grid-cols-5 gap-0">

            {/* ── Left: image gallery (3 cols) ── */}
            <div className="lg:col-span-3 p-5 space-y-3">
              {/* Main image */}
              <div className="relative aspect-16/10 rounded-2xl overflow-hidden bg-white/4">
                <Image
                  src={images[activeImage]}
                  alt={car.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />

                {/* Prev / next arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImage((i) => (i - 1 + images.length) % images.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white flex items-center justify-center hover:bg-black/70 transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setActiveImage((i) => (i + 1) % images.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white flex items-center justify-center hover:bg-black/70 transition-all"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}

                {/* Image counter dot */}
                {images.length > 1 && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(i)}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${i === activeImage ? "bg-white w-4" : "bg-white/30"}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`relative w-16 h-11 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                        i === activeImage ? "border-brand" : "border-white/8 opacity-50 hover:opacity-80"
                      }`}
                    >
                      <Image src={img} alt="" fill className="object-cover" sizes="64px" />
                    </button>
                  ))}
                </div>
              )}

              {/* Description */}
              <div className="p-5 rounded-2xl border" style={{ background: "oklch(12% 0.005 250 / 0.8)", borderColor: "oklch(25% 0.005 250 / 0.5)" }}>
                <h3 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.25em] mb-2">À propos de ce véhicule</h3>
                <p className="text-sm text-white/55 leading-relaxed">{car.description}</p>
              </div>
            </div>

            {/* ── Right: info card (2 cols) ── */}
            <div className="lg:col-span-2 p-5 lg:pl-0 space-y-4">
              {/* Name & price */}
              <div className="p-5 rounded-2xl border" style={{ background: "oklch(12% 0.005 250 / 0.8)", borderColor: "oklch(25% 0.005 250 / 0.5)" }}>
                <h2 className="text-2xl font-black text-white leading-tight tracking-tight">
                  {car.make} <span className="text-white/40">{car.model}</span>
                </h2>
                <p className="text-2xl font-black text-brand mt-1">{formatPrice(car.price)}</p>
                <p className="text-[11px] text-white/30 mt-1">{formatMileage(car.mileage)} · {car.fuelType}</p>

                {/* Quick 3-stat bar */}
                <div className="grid grid-cols-3 gap-px mt-5 pt-5 border-t" style={{ borderColor: "oklch(25% 0.005 250 / 0.5)" }}>
                  {[
                    { label: "CV", value: String(car.horsepower) },
                    { label: "Couple", value: car.torque },
                    { label: "0-100", value: car.zeroToSixty },
                  ].map((s) => (
                    <div key={s.label} className="text-center">
                      <p className="text-base font-black text-white">{s.value}</p>
                      <p className="text-[9px] text-white/25 uppercase tracking-widest mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-2.5">
                <Link
                  href="/finance"
                  onClick={handleClose}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-white text-black text-[11px] font-black uppercase tracking-[0.2em] rounded-xl transition-all hover:bg-brand hover:text-white hover:shadow-[0_0_24px_oklch(65%_0.22_55/0.4)] active:scale-[0.98]"
                >
                  Envoyer une Demande <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <a
                  href="tel:+18001234567"
                  className="w-full flex items-center justify-center gap-2 py-3.5 border rounded-xl text-[11px] font-bold text-white/60 uppercase tracking-[0.15em] hover:text-white hover:border-white/25 transition-all"
                  style={{ borderColor: "oklch(25% 0.005 250 / 0.5)" }}
                >
                  <Phone className="w-3.5 h-3.5" /> Appelez-nous
                </a>
                <Link
                  href="/sell-my-car"
                  onClick={handleClose}
                  className="w-full flex items-center justify-center gap-2 py-3 text-[10px] font-semibold text-white/30 hover:text-brand uppercase tracking-widest transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> Vous avez une reprise ?
                </Link>
              </div>

              {/* Full page link */}
              <Link
                href={`/inventory/${car.slug}`}
                onClick={handleClose}
                className="flex items-center justify-center gap-1.5 text-[10px] font-semibold text-white/20 hover:text-white/50 uppercase tracking-widest transition-colors"
              >
                Voir les Détails Complets <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* ── Spec grid ── */}
          <div className="px-5 pb-5">
            <div className="p-5 rounded-2xl border" style={{ background: "oklch(12% 0.005 250 / 0.8)", borderColor: "oklch(25% 0.005 250 / 0.5)" }}>
              <h3 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.25em] mb-4">Caractéristiques Techniques</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-px rounded-xl overflow-hidden bg-white/4">
                {specs.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="p-4" style={{ background: "oklch(11% 0.005 250)" }}>
                    <div className="flex items-center gap-1.5 mb-1">
                      <Icon className="w-3 h-3 text-brand" strokeWidth={1.5} />
                      <span className="text-[9px] text-white/25 uppercase tracking-wider">{label}</span>
                    </div>
                    <span className="text-[13px] font-bold text-white">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Similar vehicles ── */}
          {similarVehicles.length > 0 && (
            <div className="px-5 pb-6">
              <h3 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.25em] mb-3">Véhicules Similaires</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {similarVehicles.map((v) => (
                  <Link
                    key={v.slug}
                    href={`/inventory/${v.slug}`}
                    onClick={handleClose}
                    className="group relative rounded-xl overflow-hidden border transition-all hover:border-brand/30"
                    style={{ borderColor: "oklch(25% 0.005 250 / 0.4)" }}
                  >
                    <div className="relative aspect-16/10 overflow-hidden">
                      <Image
                        src={v.image}
                        alt={v.name}
                        fill
                        className="object-cover group-hover:scale-[1.05] transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-[9px] text-white/40 uppercase tracking-widest">{v.make}</p>
                      <p className="text-[12px] font-bold text-white group-hover:text-brand-bright transition-colors">{v.model}</p>
                      <p className="text-[11px] font-black text-white/70 mt-0.5">{formatPrice(v.price)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
