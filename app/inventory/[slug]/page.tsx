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
                  ? "border-brand"
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
    { icon: Settings, label: "Moteur", value: vehicle.engine },
    { icon: Gauge, label: "Puissance", value: `${vehicle.horsepower} CV` },
    { icon: Zap, label: "Couple", value: vehicle.torque },
    { icon: Gauge, label: "0-100 km/h", value: vehicle.zeroToSixty },
    { icon: Settings, label: "Transmission", value: vehicle.transmission },
    { icon: Fuel, label: "Transmission", value: vehicle.drivetrain },
    { icon: Fuel, label: "Carburant", value: vehicle.fuelType },
    { icon: Fuel, label: "Conso.", value: vehicle.mpg },
    { icon: Calendar, label: "Année", value: vehicle.year.toString() },
    { icon: Palette, label: "Couleur", value: vehicle.color },
    { icon: Gauge, label: "Kilométrage", value: formatMileage(vehicle.mileage) },
    { icon: Settings, label: "Catégorie", value: vehicle.category.charAt(0).toUpperCase() + vehicle.category.slice(1) },
  ];

  return (
    <div ref={specsRef}>
      <h2 className="text-xl font-bold text-white mb-4 font-mono uppercase tracking-wider">
        Caractéristiques Techniques
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
                <Icon className="w-3.5 h-3.5 text-brand" />
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
          Appeler
        </a>
        <button className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 bg-brand text-white font-semibold rounded-xl text-sm hover:bg-brand-bright transition-all pulse-glow">
          <MessageSquare className="w-4 h-4" />
          S&apos;informer
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
          <h1 className="text-4xl font-bold text-white mb-4">Véhicule non trouvé</h1>
          <p className="text-steel mb-8">
            Le véhicule que vous recherchez n&apos;est plus disponible.
          </p>
          <Link
            href="/inventory"
            className="px-6 py-3 bg-brand text-white rounded-xl text-sm font-medium hover:bg-brand-bright transition-all"
          >
            Parcourir l&apos;Inventaire
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
            Retour à l&apos;Inventaire
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left — Gallery */}
            <div className="lg:col-span-3 space-y-6">
              <ImageGallery vehicle={vehicle} />

              {/* Description */}
              <div className="p-6 bg-surface rounded-2xl border border-white/5">
                <h2 className="text-lg font-bold text-white mb-3">À propos de ce véhicule</h2>
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
                      <button className="p-2 rounded-lg bg-white/5 text-steel hover:text-brand transition-colors">
                        <Heart className="w-5 h-5" />
                      </button>
                      <button className="p-2 rounded-lg bg-white/5 text-steel hover:text-white transition-colors">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="text-3xl font-bold text-brand mb-1">
                    {formatPrice(vehicle.price)}
                  </div>
                  <p className="text-xs text-steel">
                    {formatMileage(vehicle.mileage)} · {vehicle.fuelType}
                  </p>

                  {/* Quick Specs */}
                  <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-white/5">
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{vehicle.horsepower}</div>
                      <div className="text-[10px] uppercase text-steel tracking-wider">Chevaux</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{vehicle.torque}</div>
                      <div className="text-[10px] uppercase text-steel tracking-wider">Couple</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{vehicle.zeroToSixty}</div>
                      <div className="text-[10px] uppercase text-steel tracking-wider">0-100 km/h</div>
                    </div>
                  </div>
                </div>

                {/* Desktop CTAs */}
                <div className="hidden lg:flex flex-col gap-3">
                  <button className="w-full py-4 bg-brand text-white font-semibold rounded-xl text-sm hover:bg-brand-bright transition-all hover:shadow-[0_0_30px_oklch(65%_0.22_55/0.4)]">
                    <MessageSquare className="w-4 h-4 inline mr-2" />
                    Envoyer une demande
                  </button>
                  <a
                    href="tel:+15551234567"
                    className="w-full py-4 bg-white/5 text-white font-semibold rounded-xl text-sm text-center border border-white/10 hover:bg-white/10 transition-all"
                  >
                    <Phone className="w-4 h-4 inline mr-2" />
                    Appeler le (555) 123-4567
                  </a>
                  <Link
                    href="/finance"
                    className="w-full py-4 bg-white/5 text-white font-semibold rounded-xl text-sm text-center border border-white/10 hover:bg-white/10 transition-all"
                  >
                    Demander un Financement
                  </Link>
                </div>

                {/* Trade-in CTA */}
                <div className="p-5 bg-brand/5 border border-brand/20 rounded-2xl">
                  <h3 className="text-sm font-bold text-white mb-1">Vous avez une Reprise ?</h3>
                  <p className="text-xs text-steel mb-3">
                    Obtenez une estimation immédiate pour votre véhicule.
                  </p>
                  <Link
                    href="/sell-my-car"
                    className="inline-flex items-center text-xs font-semibold text-brand hover:text-brand-bright transition-colors"
                  >
                    Obtenir la Valeur de Reprise →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Similar Vehicles */}
          {similarVehicles.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-white mb-6">
                Véhicules <span className="text-brand">Similaires</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {similarVehicles.map((car) => (
                  <Link
                    key={car.slug}
                    href={`/inventory/${car.slug}`}
                    className="group block rounded-2xl overflow-hidden bg-surface border border-white/5 hover:border-brand/20 transition-all"
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
                      <h3 className="text-sm font-bold text-white group-hover:text-brand-bright transition-colors truncate">
                        {car.name}
                      </h3>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-base font-bold text-white">
                          {formatPrice(car.price)}
                        </span>
                        <span className="text-xs text-steel">{car.horsepower} CV</span>
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
