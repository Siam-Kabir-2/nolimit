"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  vehicles,
  getVehicleBySlug,
  formatPrice,
  formatMileage,
  type Vehicle,
} from "@/app/data/vehicleData";
import {
  ArrowLeft,
  Phone,
  MessageSquare,
  Share2,
  Heart,
  Gauge,
  Fuel,
  Settings,
  Zap,
  Calendar,
  Palette,
} from "lucide-react";
import { useParams } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

function ImageGallery({ vehicle }: { vehicle: Vehicle }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = vehicle.images.length > 0 ? vehicle.images : [vehicle.image];

  return (
    <div className="space-y-3">
      {/* Main Image */}
      <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-surface">
        <Image
          src={images[activeIndex]}
          alt={vehicle.name}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                i === activeIndex
                  ? "border-crimson"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <Image src={img} alt="" fill className="object-cover" sizes="80px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SpecGrid({ vehicle }: { vehicle: Vehicle }) {
  const specsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!specsRef.current) return;
    const cells = specsRef.current.querySelectorAll(".spec-cell");
    gsap.fromTo(
      cells,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: specsRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  const specs = [
    { icon: Settings, label: "Engine", value: vehicle.engine },
    { icon: Gauge, label: "Horsepower", value: `${vehicle.horsepower} HP` },
    { icon: Zap, label: "Torque", value: vehicle.torque },
    { icon: Gauge, label: "0-60 mph", value: vehicle.zeroToSixty },
    { icon: Settings, label: "Transmission", value: vehicle.transmission },
    { icon: Fuel, label: "Drivetrain", value: vehicle.drivetrain },
    { icon: Fuel, label: "Fuel Type", value: vehicle.fuelType },
    { icon: Fuel, label: "MPG", value: vehicle.mpg },
    { icon: Calendar, label: "Year", value: vehicle.year.toString() },
    { icon: Palette, label: "Color", value: vehicle.color },
    { icon: Gauge, label: "Mileage", value: formatMileage(vehicle.mileage) },
    { icon: Settings, label: "Category", value: vehicle.category.charAt(0).toUpperCase() + vehicle.category.slice(1) },
  ];

  return (
    <div ref={specsRef}>
      <h2 className="text-xl font-bold text-white mb-4 font-mono uppercase tracking-wider">
        Technical Specifications
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden">
        {specs.map((spec) => {
          const Icon = spec.icon;
          return (
            <div
              key={spec.label}
              className="spec-cell tech-cell p-4 opacity-0"
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon className="w-3.5 h-3.5 text-crimson" />
                <span className="text-[10px] uppercase tracking-wider text-steel">
                  {spec.label}
                </span>
              </div>
              <span className="text-sm font-bold text-white">{spec.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FloatingCTA({ vehicle }: { vehicle: Vehicle }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4 glass-strong lg:hidden">
      <div className="flex gap-3">
        <a
          href="tel:+15551234567"
          className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 bg-white/10 text-white font-semibold rounded-xl text-sm hover:bg-white/15 transition-all"
        >
          <Phone className="w-4 h-4" />
          Call Now
        </a>
        <button className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 bg-crimson text-white font-semibold rounded-xl text-sm hover:bg-crimson-bright transition-all pulse-glow">
          <MessageSquare className="w-4 h-4" />
          Inquire
        </button>
      </div>
    </div>
  );
}

export default function VehicleDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const vehicle = getVehicleBySlug(slug);

  if (!vehicle) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Vehicle Not Found</h1>
          <p className="text-steel mb-8">
            The vehicle you&apos;re looking for is no longer available.
          </p>
          <Link
            href="/inventory"
            className="px-6 py-3 bg-crimson text-white rounded-xl text-sm font-medium hover:bg-crimson-bright transition-all"
          >
            Browse Inventory
          </Link>
        </div>
      </div>
    );
  }

  const similarVehicles = vehicles
    .filter((v) => v.slug !== vehicle.slug && v.category === vehicle.category)
    .slice(0, 3);

  return (
    <>
      <div className="pt-20 pb-24 lg:pb-16 min-h-screen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Back */}
          <Link
            href="/inventory"
            className="inline-flex items-center gap-2 text-sm text-steel hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Inventory
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left — Gallery */}
            <div className="lg:col-span-3 space-y-6">
              <ImageGallery vehicle={vehicle} />

              {/* Description */}
              <div className="p-6 bg-surface rounded-2xl border border-white/5">
                <h2 className="text-lg font-bold text-white mb-3">About This Vehicle</h2>
                <p className="text-sm text-silver leading-relaxed">
                  {vehicle.description}
                </p>
              </div>

              {/* Specs */}
              <SpecGrid vehicle={vehicle} />
            </div>

            {/* Right — Info & CTA */}
            <div className="lg:col-span-2 space-y-6">
              <div className="sticky top-24 space-y-6">
                {/* Main Info Card */}
                <div className="p-6 bg-surface rounded-2xl border border-white/5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-2xl font-bold text-white">{vehicle.name}</h1>
                      <p className="text-sm text-steel mt-1">{vehicle.color}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 rounded-lg bg-white/5 text-steel hover:text-crimson transition-colors">
                        <Heart className="w-5 h-5" />
                      </button>
                      <button className="p-2 rounded-lg bg-white/5 text-steel hover:text-white transition-colors">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="text-3xl font-bold text-crimson mb-1">
                    {formatPrice(vehicle.price)}
                  </div>
                  <p className="text-xs text-steel">
                    {formatMileage(vehicle.mileage)} · {vehicle.fuelType}
                  </p>

                  {/* Quick Specs */}
                  <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-white/5">
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{vehicle.horsepower}</div>
                      <div className="text-[10px] uppercase text-steel tracking-wider">Horsepower</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{vehicle.torque}</div>
                      <div className="text-[10px] uppercase text-steel tracking-wider">Torque</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{vehicle.zeroToSixty}</div>
                      <div className="text-[10px] uppercase text-steel tracking-wider">0-60 mph</div>
                    </div>
                  </div>
                </div>

                {/* Desktop CTAs */}
                <div className="hidden lg:flex flex-col gap-3">
                  <button className="w-full py-4 bg-crimson text-white font-semibold rounded-xl text-sm hover:bg-crimson-bright transition-all hover:shadow-[0_0_30px_oklch(60%_0.25_20/0.4)]">
                    <MessageSquare className="w-4 h-4 inline mr-2" />
                    Send Inquiry
                  </button>
                  <a
                    href="tel:+15551234567"
                    className="w-full py-4 bg-white/5 text-white font-semibold rounded-xl text-sm text-center border border-white/10 hover:bg-white/10 transition-all"
                  >
                    <Phone className="w-4 h-4 inline mr-2" />
                    Call (555) 123-4567
                  </a>
                  <Link
                    href="/finance"
                    className="w-full py-4 bg-white/5 text-white font-semibold rounded-xl text-sm text-center border border-white/10 hover:bg-white/10 transition-all"
                  >
                    Apply for Financing
                  </Link>
                </div>

                {/* Trade-in CTA */}
                <div className="p-5 bg-crimson/5 border border-crimson/20 rounded-2xl">
                  <h3 className="text-sm font-bold text-white mb-1">Have a Trade-In?</h3>
                  <p className="text-xs text-steel mb-3">
                    Get an instant estimate on your current vehicle.
                  </p>
                  <Link
                    href="/sell-my-car"
                    className="inline-flex items-center text-xs font-semibold text-crimson hover:text-crimson-bright transition-colors"
                  >
                    Get Trade-In Value →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Similar Vehicles */}
          {similarVehicles.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-white mb-6">
                Similar <span className="text-crimson">Vehicles</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {similarVehicles.map((car) => (
                  <Link
                    key={car.slug}
                    href={`/inventory/${car.slug}`}
                    className="group block rounded-2xl overflow-hidden bg-surface border border-white/5 hover:border-crimson/20 transition-all"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={car.image}
                        alt={car.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-60" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-bold text-white group-hover:text-crimson-bright transition-colors truncate">
                        {car.name}
                      </h3>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-base font-bold text-white">
                          {formatPrice(car.price)}
                        </span>
                        <span className="text-xs text-steel">{car.horsepower} HP</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <FloatingCTA vehicle={vehicle} />
    </>
  );
}
