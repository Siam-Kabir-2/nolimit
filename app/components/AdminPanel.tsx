"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  X,
  Lock,
  Eye,
  EyeOff,
  LayoutDashboard,
  Car,
  Zap,
  Star,
  TrendingUp,
  Users,
  Settings,
  LogOut,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { vehicles, getFeaturedVehicles, getNewArrivals } from "@/app/data/vehicleData";

const DUMMY_USER = "admin";
const DUMMY_PASS = "nolimit2024";

const categoryColors: Record<string, string> = {
  supercar: "text-brand",
  sports: "text-blue-400",
  luxury: "text-amber-400",
  electric: "text-emerald-400",
};

export default function AdminPanel({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [authed, setAuthed] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setUsername("");
        setPassword("");
        setError("");
        setAuthed(false);
      }, 400);
    }
  }, [isOpen]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      if (username === DUMMY_USER && password === DUMMY_PASS) {
        setAuthed(true);
      } else {
        setError("Identifiants invalides. Essayez admin / nolimit2024");
      }
      setLoading(false);
    }, 800);
  };

  // Dashboard stats
  const totalVehicles = vehicles.length;
  const featured = getFeaturedVehicles().length;
  const newArrivals = getNewArrivals().length;
  const categories = [...new Set(vehicles.map((v) => v.category))];
  const categoryBreakdown = categories.map((cat) => {
    const labels: Record<string, string> = {
      supercar: "Supercar",
      sports: "Sport",
      luxury: "Luxe",
      electric: "Électrique",
    };
    return {
      name: labels[cat] || cat.charAt(0).toUpperCase() + cat.slice(1),
      count: vehicles.filter((v) => v.category === cat).length,
      key: cat,
    };
  });
  const avgPrice = Math.floor(vehicles.reduce((s, v) => s + v.price, 0) / totalVehicles);

  const quickLinks = [
    { label: "Voir tous les Modèles", href: "/inventory", icon: Car },
    { label: "Demandes de Reprise", href: "/sell-my-car", icon: TrendingUp },
    { label: "Demandes Clients", href: "/finance", icon: Users },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-60 bg-black/70 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-70 w-full max-w-[400px] bg-carbon border-r border-white/8 flex flex-col transition-transform duration-500 ease-out-expo ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-brand/15 border border-brand/25 flex items-center justify-center">
              <ShieldCheck className="w-3.5 h-3.5 text-brand" />
            </div>
            <div>
              <p className="text-[11px] font-black text-white uppercase tracking-widest">Admin</p>
              <p className="text-[9px] text-white/25 tracking-wider">Panneau de Contrôle NoLimit</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 -mr-2 flex items-center justify-center rounded-xl text-white/30 hover:text-white hover:bg-white/8 transition-all active:scale-95"
            aria-label="Fermer le panneau"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content — data-lenis-prevent stops Lenis hijacking scroll inside the panel */}
        <div
          className="flex-1 overflow-y-auto overscroll-contain"
          data-lenis-prevent
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {!authed ? (
            /* ── Login Form ── */
            <div className="flex flex-col items-center justify-center h-full px-8 py-12">
              <div className="w-14 h-14 rounded-2xl bg-white/4 border border-white/8 flex items-center justify-center mb-6">
                <Lock className="w-6 h-6 text-white/40" strokeWidth={1.5} />
              </div>
              <h2 className="text-xl font-black text-white mb-1">Accès Restreint</h2>
              <p className="text-[12px] text-white/30 mb-8 text-center">
                Connectez-vous avec vos identifiants administrateur pour continuer.
              </p>

              <form onSubmit={handleLogin} className="w-full space-y-3">
                <input
                  type="text"
                  placeholder="Nom d'utilisateur"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="off"
                  className="w-full px-4 py-3.5 bg-white/4 border border-white/8 rounded-xl text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-brand/40 transition-all"
                />
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3.5 pr-12 bg-white/4 border border-white/8 rounded-xl text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-brand/40 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/50 transition-colors"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {error && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-brand/8 border border-brand/20 text-[11px] text-brand">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-brand hover:bg-brand-bright text-white text-[12px] font-bold uppercase tracking-[0.2em] rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_oklch(65%_0.22_55/0.4)] disabled:opacity-60"
                >
                  {loading ? "Authentification..." : "Se Connecter"}
                </button>
              </form>

              <p className="mt-6 text-[10px] text-white/15 text-center">
                Demo: admin / nolimit2024
              </p>
            </div>
          ) : (
            /* ── Dashboard ── */
            <div className="px-6 py-6 space-y-6">
              {/* Welcome */}
              <div className="flex items-center gap-3 p-4 rounded-xl bg-brand/8 border border-brand/15">
                <ShieldCheck className="w-4 h-4 text-brand shrink-0" />
                <div>
                  <p className="text-[11px] font-bold text-white">Bienvenue, Administrateur</p>
                  <p className="text-[10px] text-white/30">Accès complet autorisé</p>
                </div>
              </div>

              {/* Stats grid */}
              <div>
                <p className="text-[9px] font-semibold text-white/25 uppercase tracking-[0.3em] mb-3">
                  Vue d&apos;ensemble de l&apos;Inventaire
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { icon: LayoutDashboard, label: "Total Véhicules", value: totalVehicles, color: "text-white" },
                    { icon: Star, label: "En Vedette", value: featured, color: "text-amber-400" },
                    { icon: Zap, label: "Nouveautés", value: newArrivals, color: "text-brand" },
                    { icon: TrendingUp, label: "Prix Moyen", value: `${(avgPrice / 1000).toFixed(0)}k€`, color: "text-emerald-400" },
                  ].map(({ icon: Icon, label, value, color }) => (
                    <div key={label} className="p-4 rounded-xl bg-white/3 border border-white/6">
                      <Icon className={`w-4 h-4 ${color} mb-2`} strokeWidth={1.5} />
                      <p className={`text-xl font-black ${color}`}>{value}</p>
                      <p className="text-[10px] text-white/30 mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category breakdown */}
              <div>
                <p className="text-[9px] font-semibold text-white/25 uppercase tracking-[0.3em] mb-3">
                  Par Catégorie
                </p>
                <div className="space-y-2">
                  {categoryBreakdown.map(({ name, count, key }) => (
                    <div key={key} className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-white/2 border border-white/5">
                      <span className={`text-[11px] font-semibold ${categoryColors[key] ?? "text-white"}`}>
                        {name}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-brand/60"
                            style={{ width: `${(count / totalVehicles) * 100}%` }}
                          />
                        </div>
                        <span className="text-[11px] font-bold text-white/50 w-4 text-right">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick links */}
              <div>
                <p className="text-[9px] font-semibold text-white/25 uppercase tracking-[0.3em] mb-3">
                  Actions Rapides
                </p>
                <div className="space-y-1.5">
                  {quickLinks.map(({ label, href, icon: Icon }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={onClose}
                      className="flex items-center justify-between p-3.5 rounded-xl bg-white/3 border border-white/6 hover:border-white/15 hover:bg-white/5 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 text-white/30 group-hover:text-brand transition-colors" strokeWidth={1.5} />
                        <span className="text-[12px] font-medium text-white/60 group-hover:text-white transition-colors">
                          {label}
                        </span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-white/20 group-hover:text-white/50 transition-all group-hover:translate-x-0.5" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Settings placeholder */}
              <div className="border-t border-white/5 pt-5 flex items-center gap-3">
                <button className="flex-1 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white/3 border border-white/6 hover:border-white/15 transition-all text-[11px] font-medium text-white/40 hover:text-white">
                  <Settings className="w-3.5 h-3.5" strokeWidth={1.5} />
                  Paramètres
                </button>
                <button
                  onClick={() => setAuthed(false)}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-brand/8 border border-brand/15 hover:bg-brand/15 transition-all text-[11px] font-medium text-brand"
                >
                  <LogOut className="w-3.5 h-3.5" strokeWidth={1.5} />
                  Déconnexion
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
