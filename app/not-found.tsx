import Link from "next/link";
import { ArrowLeft, Gauge } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-brand/5 blur-[200px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-brand/3 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative text-center max-w-lg mx-auto">
        {/* Speedometer icon */}
        <div className="relative inline-block mb-8">
          <div className="w-24 h-24 rounded-3xl bg-white/3 border border-white/8 flex items-center justify-center mx-auto">
            <Gauge className="w-10 h-10 text-white/20" strokeWidth={1} />
          </div>
          <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-brand flex items-center justify-center">
            <span className="text-white text-[10px] font-black">!</span>
          </span>
        </div>

        {/* 404 number */}
        <p className="text-[10px] font-semibold text-brand uppercase tracking-[0.4em] mb-4">Erreur 404</p>
        <h1 className="text-6xl sm:text-8xl font-black text-white tracking-tighter leading-none mb-4">
          Hors <span className="text-white/15">Piste</span>
        </h1>
        <p className="text-sm text-white/35 leading-relaxed mb-10 max-w-sm mx-auto">
          Il semble que vous ayez pris un mauvais virage. Cet itinéraire n&apos;existe pas — mais notre collection de véhicules extraordinaires, oui.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-black text-[12px] font-black uppercase tracking-[0.2em] rounded-full transition-all hover:bg-brand hover:text-white hover:shadow-[0_0_24px_oklch(65%_0.22_55/0.4)] active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Retour à l&apos;Accueil
          </Link>
          <Link
            href="/inventory"
            className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/10 text-white/60 hover:text-white hover:border-brand/40 text-[12px] font-semibold uppercase tracking-[0.15em] rounded-full transition-all"
          >
            Parcourir les Modèles
          </Link>
        </div>

        {/* Brand watermark */}
        <p className="mt-16 text-[10px] text-white/8 font-black uppercase tracking-[0.5em] italic">
          NoLimit Autos
        </p>
      </div>
    </div>
  );
}
