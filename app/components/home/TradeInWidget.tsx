"use client";

import { useState } from "react";
import { Search, ArrowRight, CheckCircle, Lock } from "lucide-react";
import AnimatedSection from "../AnimatedSection";

const features = [
  "Évaluation instantanée en quelques secondes",
  "Sans obligation — totalement gratuit",
  "Prix du marché équitable, garanti",
];

export default function TradeInWidget() {
  const [vin, setVin] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (vin.length > 0) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setVin("");
      }, 3000);
    }
  };

  return (
    <section className="relative py-16 sm:py-20 lg:py-28 bg-background overflow-hidden">
      {/* Top / bottom rules */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      {/* Background: subtle brand pulse */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-brand/4 blur-[200px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: copy */}
          <AnimatedSection>
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="block w-8 h-px bg-brand" />
                  <span className="text-[10px] font-semibold tracking-[0.4em] uppercase text-brand">Reprise</span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-[1.1]">
                  Quelle est la valeur
                  <br />
                  <span className="text-white/20">de votre voiture ?</span>
                </h2>
                <p className="text-sm text-white/40 leading-relaxed max-w-sm">
                  Obtenez une estimation immédiate et précise de la valeur de reprise de votre véhicule.
                  Sans pression, sans artifice — juste des chiffres réels.
                </p>
              </div>

              {/* Feature bullets */}
              <ul className="space-y-3">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-brand shrink-0" strokeWidth={2} />
                    <span className="text-[13px] text-white/50">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          {/* Right: form card */}
          <AnimatedSection delay={0.15}>
            <div className="relative p-8 rounded-3xl border border-white/8 bg-surface overflow-hidden">
              {/* Card ambient glow */}
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-brand/6 blur-[80px] rounded-full" />

              <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-white/35 mb-6">
                Entrez le NIV ou la Plaque d&apos;immatriculation
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className={`relative flex items-center rounded-2xl border transition-all duration-300 ${
                  focused ? "border-brand/40 shadow-[0_0_20px_oklch(65%_0.22_55/0.1)]" : "border-white/10"
                } bg-white/4`}>
                  <Search className={`absolute left-5 w-4 h-4 transition-colors duration-300 ${focused ? "text-brand" : "text-white/25"}`} />
                  <input
                    type="text"
                    placeholder="ex. 1HGBH41JXMN109186"
                    value={vin}
                    onChange={(e) => setVin(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className="w-full pl-12 pr-4 py-4 bg-transparent text-white placeholder:text-white/20 text-sm focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitted}
                  className="w-full inline-flex items-center justify-center gap-2.5 py-4 bg-brand hover:bg-brand-bright text-white text-[12px] font-bold tracking-[0.2em] uppercase rounded-2xl transition-all duration-300 hover:shadow-[0_0_30px_oklch(65%_0.22_55/0.4)] active:scale-[0.98] disabled:opacity-70"
                >
                  {submitted ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Évaluation Demandée !
                    </>
                  ) : (
                    <>
                      Obtenir l&apos;Évaluation Instantanée
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              {/* Trust footnote */}
              <div className="flex items-center justify-center gap-2 mt-5">
                <Lock className="w-3 h-3 text-white/20" />
                <p className="text-[10px] text-white/20">
                  Vos informations sont cryptées et ne sont jamais partagées.
                </p>
              </div>
            </div>
          </AnimatedSection>

        </div>
      </div>
    </section>
  );
}
