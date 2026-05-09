"use client";

import { useState } from "react";
import { Search, ArrowRight, CheckCircle, Car, DollarSign, FileText, ShieldCheck } from "lucide-react";
import AnimatedSection from "@/app/components/AnimatedSection";

const steps = [
  { icon: FileText, title: "Entrez le NIV", desc: "Le code à 17 caractères de votre véhicule" },
  { icon: Car, title: "Évaluation", desc: "Prix du marché instantané, sans devinettes" },
  { icon: DollarSign, title: "Paiement", desc: "Concluez l'affaire dans notre showroom" },
];

export default function SellMyCarPage() {
  const [vin, setVin] = useState("");
  const [step, setStep] = useState<"input" | "form" | "done">("input");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", notes: "" });

  const handleVinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (vin.length > 0) setStep("form");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("done");
  };

  return (
    <div className="min-h-screen bg-background">

      {/* ── Hero ── */}
      <div className="relative pt-32 pb-16 overflow-hidden border-b border-white/5">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-brand/4 blur-[200px] rounded-full pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/8 to-transparent" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-5">
              <span className="block w-8 h-px bg-brand" />
              <span className="text-[10px] font-semibold tracking-[0.4em] uppercase text-brand">
                Évaluation Instantanée
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-black text-white tracking-tight leading-none">
              Vendre ou <span className="text-white/20">Reprendre.</span>
            </h1>
            <p className="mt-4 text-sm text-white/35 leading-relaxed max-w-lg">
              Obtenez une offre équitable et sans obligation pour votre véhicule actuel en quelques minutes.
              Nos spécialistes s'occupent de tout.
            </p>
          </AnimatedSection>
        </div>
      </div>

      {/* ── Process steps ── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="relative flex items-start gap-4 p-6 rounded-2xl bg-surface border border-white/6 overflow-hidden group hover:border-white/12 transition-all duration-300">
                  {/* Step number watermark */}
                  <span className="absolute right-4 top-2 text-[80px] font-black text-white/3 leading-none select-none">
                    {i + 1}
                  </span>
                  <div className="relative w-10 h-10 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center shrink-0 group-hover:bg-brand/15 transition-colors">
                    <Icon className="w-5 h-5 text-brand" strokeWidth={1.5} />
                  </div>
                  <div className="relative">
                    <p className="text-[9px] text-white/25 uppercase tracking-widest font-semibold mb-0.5">Étape {i + 1}</p>
                    <h3 className="text-sm font-black text-white mb-1">{s.title}</h3>
                    <p className="text-[12px] text-white/35 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </AnimatedSection>

        {/* ── Main form ── */}
        <div className="max-w-xl mx-auto">
          <AnimatedSection delay={0.15}>
            {step === "input" && (
              <div className="p-8 rounded-3xl bg-surface border border-white/6">
                <h2 className="text-xl font-black text-white mb-1">Commencez avec votre NIV</h2>
                <p className="text-[12px] text-white/35 mb-7 leading-relaxed">
                  Votre NIV est un code à 17 caractères situé sur votre tableau de bord ou le montant de la porte conducteur.
                </p>
                <form onSubmit={handleVinSubmit} className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                    <input
                      type="text"
                      placeholder="ex. 1HGCM82633A004352"
                      value={vin}
                      onChange={(e) => setVin(e.target.value)}
                      maxLength={17}
                      className="w-full pl-12 pr-4 py-4 bg-white/4 border border-white/8 rounded-xl text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-brand/40 font-mono tracking-wider transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2.5 py-4 bg-brand hover:bg-brand-bright text-white font-bold text-[12px] uppercase tracking-[0.2em] rounded-xl transition-all hover:shadow-[0_0_24px_oklch(65%_0.22_55/0.4)] active:scale-[0.98]"
                  >
                    Évaluer ma voiture <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
                <div className="flex items-center justify-center gap-2 mt-5">
                  <ShieldCheck className="w-3.5 h-3.5 text-white/15" />
                  <p className="text-[10px] text-white/15">Sans obligation · Totalement gratuit · Résultats en quelques secondes</p>
                </div>
              </div>
            )}

            {step === "form" && (
              <div className="p-8 rounded-3xl bg-surface border border-white/6">
                <div className="flex items-center gap-3 mb-6 p-4 bg-brand/6 border border-brand/15 rounded-xl">
                  <CheckCircle className="w-4 h-4 text-brand shrink-0" />
                  <div>
                    <p className="text-[12px] font-bold text-white">Véhicule Identifié</p>
                    <p className="text-[10px] text-white/35 font-mono">{vin.toUpperCase()}</p>
                  </div>
                </div>
                <h2 className="text-xl font-black text-white mb-1">Vos Coordonnées</h2>
                <p className="text-[12px] text-white/35 mb-6">Nous enverrons votre évaluation à l&apos;adresse email fournie.</p>
                <form onSubmit={handleFormSubmit} className="space-y-3">
                  {[
                    { ph: "Nom Complet *", key: "name", type: "text" },
                    { ph: "Adresse Email *", key: "email", type: "email" },
                    { ph: "Numéro de Téléphone *", key: "phone", type: "tel" },
                  ].map(({ ph, key, type }) => (
                    <input
                      key={key}
                      type={type}
                      placeholder={ph}
                      required
                      value={formData[key as keyof typeof formData]}
                      onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                      className="w-full px-4 py-3.5 bg-white/4 border border-white/8 rounded-xl text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-brand/40 transition-all"
                    />
                  ))}
                  <textarea
                    placeholder="Notes supplémentaires (optionnel)"
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-3.5 bg-white/4 border border-white/8 rounded-xl text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-brand/40 transition-all resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full py-4 bg-brand hover:bg-brand-bright text-white font-bold text-[12px] uppercase tracking-[0.2em] rounded-xl transition-all hover:shadow-[0_0_24px_oklch(65%_0.22_55/0.4)] active:scale-[0.98]"
                  >
                    Obtenir mon offre instantanée
                  </button>
                </form>
              </div>
            )}

            {step === "done" && (
              <div className="p-10 rounded-3xl bg-surface border border-white/6 text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center mb-6">
                  <CheckCircle className="w-7 h-7 text-brand" />
                </div>
                <h2 className="text-2xl font-black text-white mb-2">Offre soumise !</h2>
                <p className="text-sm text-white/40 mb-8 leading-relaxed">
                  Nous examinerons votre véhicule et enverrons une offre sous 24 heures à{" "}
                  <span className="text-white font-semibold">{formData.email}</span>.
                </p>
                <button
                  onClick={() => { setStep("input"); setVin(""); setFormData({ name: "", email: "", phone: "", notes: "" }); }}
                  className="px-6 py-3 bg-white/5 border border-white/10 text-white text-[11px] font-bold uppercase tracking-widest rounded-full hover:bg-white/8 transition-all"
                >
                  Soumettre un autre véhicule
                </button>
              </div>
            )}
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
