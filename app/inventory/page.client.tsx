"use client";

import { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  vehicles,
  getUniqueMakes,
  getUniqueCategories,
  formatPrice,
  formatMileage,
} from "@/app/data/vehicleData";
import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/app/components/AnimatedSection";
import {
  SlidersHorizontal,
  X,
  Gauge,
  Fuel,
  Search,
  ChevronDown,
  ArrowRight,
  Zap,
  Clock,
} from "lucide-react";

const categoryLabels: Record<string, string> = {
  supercar: "Supercar",
  sports: "Sport",
  luxury: "Luxe",
  electric: "Électrique",
};

function FilterSidebar({
  filters,
  setFilters,
  onClose,
}: {
  filters: {
    make: string;
    category: string;
    minPrice: string;
    maxPrice: string;
    search: string;
    sort: string;
  };
  setFilters: (f: typeof filters) => void;
  onClose?: () => void;
}) {
  const makes = getUniqueMakes();
  const categories = getUniqueCategories();
  const hasActiveFilters = Object.values(filters).some((v) => v !== "");

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-black text-white uppercase tracking-widest">Filtres</h3>
          {hasActiveFilters && (
            <p className="text-[10px] text-brand mt-0.5">Filtres actifs appliqués</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={() => setFilters({ make: "", category: "", minPrice: "", maxPrice: "", search: "", sort: "newest" })}
              className="text-[10px] font-medium text-white/30 hover:text-brand transition-colors uppercase tracking-wider"
            >
              Tout effacer
            </button>
          )}
          {onClose && (
            <button onClick={onClose} className="text-white/30 hover:text-white lg:hidden p-1">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Search */}
      <div>
        <label className="block text-[10px] font-semibold text-white/30 uppercase tracking-[0.2em] mb-2.5">Recherche</label>
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25" />
          <input
            type="text"
            placeholder="Marque, modèle, année..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="w-full pl-9 pr-4 py-3 bg-white/4 border border-white/8 rounded-xl text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-brand/40 transition-colors"
          />
        </div>
      </div>

      {/* Make */}
      <div>
        <label className="block text-[10px] font-semibold text-white/30 uppercase tracking-[0.2em] mb-2.5">Marque</label>
        <div className="relative">
          <select
            value={filters.make}
            onChange={(e) => setFilters({ ...filters, make: e.target.value })}
            className="w-full px-4 py-3 bg-white/4 border border-white/8 rounded-xl text-white text-sm focus:outline-none focus:border-brand/40 appearance-none cursor-pointer transition-colors"
          >
            <option value="">Toutes les Marques</option>
            {makes.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25 pointer-events-none" />
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="block text-[10px] font-semibold text-white/30 uppercase tracking-[0.2em] mb-2.5">Catégorie</label>
        <div className="flex flex-wrap gap-2">
          {["", ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilters({ ...filters, category: cat })}
              className={`px-3.5 py-1.5 rounded-lg text-[11px] font-semibold tracking-wide transition-all duration-200 ${
                filters.category === cat
                  ? "bg-brand text-white"
                  : "bg-white/4 border border-white/8 text-white/40 hover:text-white hover:border-white/20"
              }`}
            >
              {cat ? (categoryLabels[cat] || cat) : "Toutes"}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-[10px] font-semibold text-white/30 uppercase tracking-[0.2em] mb-2.5">Gamme de Prix</label>
        <div className="grid grid-cols-2 gap-2.5">
          <input
            type="number"
            placeholder="Min €"
            value={filters.minPrice}
            onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
            className="px-3 py-3 bg-white/4 border border-white/8 rounded-xl text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-brand/40 transition-colors"
          />
          <input
            type="number"
            placeholder="Max €"
            value={filters.maxPrice}
            onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
            className="px-3 py-3 bg-white/4 border border-white/8 rounded-xl text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-brand/40 transition-colors"
          />
        </div>
      </div>

      {/* Sort By (Mobile Only Sidebar view) */}
      <div className="lg:hidden">
        <label className="block text-[10px] font-semibold text-white/30 uppercase tracking-[0.2em] mb-2.5">Trier Par</label>
        <div className="relative">
          <select
            value={filters.sort}
            onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
            className="w-full px-4 py-3 bg-white/4 border border-white/8 rounded-xl text-white text-sm focus:outline-none focus:border-brand/40 appearance-none cursor-pointer transition-colors"
          >
            <option value="newest">Nouveautés</option>
            <option value="price-asc">Prix : Croissant</option>
            <option value="price-desc">Prix : Décroissant</option>
            <option value="hp-desc">Puissance : Décroissante</option>
            <option value="year-desc">Année : La plus récente</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}

function CarCard({ car, index }: { car: (typeof vehicles)[0]; index: number }) {
  return (
    <AnimatedSection delay={index * 0.05}>
      <Link
        href={`/inventory/${car.slug}`}
        className="group block rounded-2xl overflow-hidden bg-surface border border-white/5 hover:border-white/12 transition-all duration-400 hover:shadow-[0_16px_48px_oklch(0%_0_0/0.5)] hover:-translate-y-0.5"
      >
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={car.image}
            alt={car.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/10 to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <span className="px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur-md border border-white/10 text-[9px] font-semibold uppercase tracking-widest text-white/60">
              {categoryLabels[car.category] || car.category}
            </span>
            {car.newArrival && (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brand text-white text-[9px] font-black uppercase tracking-widest">
                <Zap className="w-2.5 h-2.5" fill="currentColor" />
                Nouveau
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Name */}
          <div>
            <p className="text-[10px] font-semibold text-white/30 uppercase tracking-widest mb-1">
              {car.make} · {car.year}
            </p>
            <h3 className="text-base font-black text-white group-hover:text-brand-bright transition-colors duration-300 leading-tight">
              {car.model}
            </h3>
            <p className="text-[11px] text-white/30 mt-0.5">{car.color}</p>
          </div>

          {/* Specs row */}
          <div className="flex items-center gap-4 py-3 border-y border-white/5">
            <div className="flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-brand" strokeWidth={1.5} />
              <span className="text-[11px] font-bold text-white/70">{car.horsepower} CV</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-white/30" strokeWidth={1.5} />
              <span className="text-[11px] font-medium text-white/40">{car.zeroToSixty}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Fuel className="w-3.5 h-3.5 text-white/30" strokeWidth={1.5} />
              <span className="text-[11px] font-medium text-white/40">{car.fuelType}</span>
            </div>
          </div>

          {/* Price + CTA */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] text-white/20 uppercase tracking-wider mb-0.5">À partir de</p>
              <span className="text-lg font-black text-white">{formatPrice(car.price)}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-semibold text-white/30 group-hover:text-brand transition-colors duration-300">
              <span className="uppercase tracking-wider">Voir</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>

        {/* Bottom brand accent line */}
        <div className="h-px w-0 bg-brand group-hover:w-full transition-all duration-500 ease-out" />
      </Link>
    </AnimatedSection>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden bg-surface border border-white/5">
      <div className="aspect-[16/10] skeleton-shimmer" />
      <div className="p-5 space-y-4">
        <div className="space-y-2">
          <div className="h-3 w-1/3 rounded skeleton-shimmer" />
          <div className="h-5 w-3/4 rounded skeleton-shimmer" />
          <div className="h-3 w-1/4 rounded skeleton-shimmer" />
        </div>
        <div className="flex gap-4 py-3 border-y border-white/5">
          <div className="h-4 w-16 rounded skeleton-shimmer" />
          <div className="h-4 w-12 rounded skeleton-shimmer" />
          <div className="h-4 w-14 rounded skeleton-shimmer" />
        </div>
        <div className="flex justify-between">
          <div className="h-6 w-24 rounded skeleton-shimmer" />
          <div className="h-4 w-12 rounded skeleton-shimmer" />
        </div>
      </div>
    </div>
  );
}

export default function InventoryPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [filters, setFiltersState] = useState({
    make: searchParams.get("make") || "",
    category: searchParams.get("category") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    search: searchParams.get("search") || "",
    sort: searchParams.get("sort") || "newest",
  });

  const setFilters = (newFilters: typeof filters) => {
    setFiltersState(newFilters);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 300);

    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    const qs = params.toString();
    router.replace(`/inventory${qs ? `?${qs}` : ""}`, { scroll: false });
  };

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      if (filters.make && v.make !== filters.make) return false;
      if (filters.category && v.category !== filters.category) return false;
      if (filters.minPrice && v.price < parseInt(filters.minPrice)) return false;
      if (filters.maxPrice && v.price > parseInt(filters.maxPrice)) return false;
      if (
        filters.search &&
        !v.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !v.make.toLowerCase().includes(filters.search.toLowerCase()) &&
        !v.model.toLowerCase().includes(filters.search.toLowerCase())
      )
        return false;
      return true;
    }).sort((a, b) => {
      switch (filters.sort) {
        case "price-asc": return a.price - b.price;
        case "price-desc": return b.price - a.price;
        case "hp-desc": return b.horsepower - a.horsepower;
        case "year-desc": return b.year - a.year;
        case "newest":
        default:
          if (a.newArrival && !b.newArrival) return -1;
          if (!a.newArrival && b.newArrival) return 1;
          return 0;
      }
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-background">
      {/* ─── Page Hero ─── */}
      <div className="relative pt-32 pb-16 overflow-hidden border-b border-white/5">
        {/* Ambient glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand/5 blur-[180px] rounded-full pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/8 to-transparent" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-5">
              <span className="block w-8 h-px bg-brand" />
              <span className="text-[10px] font-semibold tracking-[0.4em] uppercase text-brand">Notre Collection</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <h1 className="text-5xl sm:text-6xl font-black text-white tracking-tight leading-none">
                  Les <span className="text-white/20">Modèles</span>
                </h1>
                <p className="mt-3 text-sm text-white/35 leading-relaxed max-w-md">
                  Chaque véhicule est sélectionné pour sa performance, sa rareté et sa qualité sans compromis.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-3xl font-black text-white tabular-nums">{filteredVehicles.length}</span>
                <span className="text-sm text-white/30">
                  véhicule{filteredVehicles.length !== 1 ? "s" : ""}<br />disponible{filteredVehicles.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </AnimatedSection>

          {/* Mobile filter toggle */}
          <div className="mt-8 lg:hidden">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-[11px] font-semibold uppercase tracking-widest text-white/50 hover:text-white hover:border-white/20 transition-all"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filtres
            </button>
          </div>

          {/* Sort & Quick Filter Bar */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 py-4 border-y border-white/5">
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-0.5 w-full sm:w-auto">
              <span className="text-[10px] font-black text-white/20 uppercase tracking-widest mr-2 shrink-0">Populaire :</span>
              {["Porsche", "Lamborghini", "Ferrari", "BMW"].map((m) => (
                <button
                  key={m}
                  onClick={() => setFilters({ ...filters, make: filters.make === m ? "" : m })}
                  className={`shrink-0 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                    filters.make === m 
                      ? "bg-brand text-white shadow-[0_0_15px_oklch(65%_0.22_55/0.3)]" 
                      : "bg-white/4 border border-white/8 text-white/35 hover:text-white hover:border-white/15"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <span className="text-[10px] font-black text-white/20 uppercase tracking-widest hidden sm:block">Trier Par :</span>
              <div className="relative">
                <select
                  value={filters.sort}
                  onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                  className="bg-transparent text-[11px] font-bold text-white uppercase tracking-widest focus:outline-none appearance-none pr-6 cursor-pointer hover:text-brand transition-colors"
                >
                  <option value="newest">Nouveautés</option>
                  <option value="price-asc">Prix : Croissant</option>
                  <option value="price-desc">Prix : Décroissant</option>
                  <option value="hp-desc">Puissance : Décroissante</option>
                  <option value="year-desc">Année : La plus récente</option>
                </select>
                <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 text-white/25 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Main Content ─── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-10">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-28 p-6 rounded-2xl bg-white/2 border border-white/6">
              <FilterSidebar filters={filters} setFilters={setFilters} />
            </div>
          </aside>

          {/* Mobile filter drawer */}
          {mobileFiltersOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={() => setMobileFiltersOpen(false)}
              />
              <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto p-6 bg-carbon rounded-t-3xl border-t border-white/10">
                <FilterSidebar
                  filters={filters}
                  setFilters={setFilters}
                  onClose={() => setMobileFiltersOpen(false)}
                />
              </div>
            </div>
          )}

          {/* Grid */}
          <div className="flex-1 min-w-0">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : filteredVehicles.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredVehicles.map((car, i) => (
                  <CarCard key={car.slug} car={car} index={i} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-28 text-center">
                <div className="w-16 h-16 rounded-2xl bg-white/4 border border-white/8 flex items-center justify-center mb-6">
                  <Search className="w-7 h-7 text-white/20" />
                </div>
                <h3 className="text-xl font-black text-white mb-2">Aucun véhicule trouvé</h3>
                <p className="text-sm text-white/30 mb-8 max-w-xs">
                  Aucun véhicule ne correspond à vos filtres. Essayez d&apos;ajuster votre recherche.
                </p>
                <button
                  onClick={() => setFilters({ make: "", category: "", minPrice: "", maxPrice: "", search: "", sort: "newest" })}
                  className="px-6 py-3 bg-brand text-white rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-brand-bright transition-all"
                >
                  Effacer tous les filtres
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
