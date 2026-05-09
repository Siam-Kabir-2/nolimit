"use client";

import { useState } from "react";
import {
  ArrowRight,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Car,
  Shield,
  Zap,
} from "lucide-react";
import AnimatedSection from "@/app/components/AnimatedSection";

const contactInfo = [
  {
    icon: Phone,
    label: "Appelez-nous",
    value: "+1 (800) NO-LIMIT",
    sub: "Lun–Sam, 9h–19h",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@nolimitautos.com",
    sub: "Réponse sous 2 heures",
  },
  {
    icon: MapPin,
    label: "Showroom",
    value: "1200 Velocity Drive",
    sub: "Beverly Hills, CA 90210",
  },
  {
    icon: Clock,
    label: "Horaires",
    value: "Lun–Sam : 9h–19h",
    sub: "Dim : Sur rendez-vous",
  },
];

const enquiryTypes = [
  { id: "purchase", label: "Demande d'achat", icon: Car },
  { id: "finance", label: "Options Financement", icon: Zap },
  { id: "test-drive", label: "Essai Routier", icon: CheckCircle },
  { id: "other", label: "Demande Générale", icon: MessageSquare },
];

export default function EnquirePage() {
  const [enquiryType, setEnquiryType] = useState("purchase");
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    vehicle: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass =
    "w-full px-4 py-3.5 bg-white/4 border border-white/8 rounded-xl text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-brand/40 focus:bg-white/6 transition-all";

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <AnimatedSection className="max-w-md text-center p-10 bg-surface rounded-3xl border border-white/8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center mb-6">
            <CheckCircle className="w-7 h-7 text-brand" />
          </div>
          <h2 className="text-2xl font-black text-white mb-3">Message Reçu</h2>
          <p className="text-sm text-white/40 leading-relaxed mb-8">
            Merci, <span className="text-white">{formData.name}</span>. L&apos;un de nos spécialistes
            vous contactera sous 2 heures à l&apos;adresse{" "}
            <span className="text-white">{formData.email}</span>.
          </p>
          <div className="flex items-center justify-center gap-2 text-[10px] text-white/20 mb-8">
            <Shield className="w-3 h-3" />
            Vos informations sont cryptées et sécurisées
          </div>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({ name: "", email: "", phone: "", vehicle: "", message: "" });
            }}
            className="px-6 py-3 bg-white/5 border border-white/10 text-white text-[11px] font-semibold uppercase tracking-widest rounded-full hover:bg-white/8 transition-all"
          >
            Envoyer une autre demande
          </button>
        </AnimatedSection>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* ─── Hero ─── */}
      <div className="relative pt-32 pb-16 overflow-hidden border-b border-white/5">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-brand/4 blur-[200px] rounded-full pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/8 to-transparent" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-5">
              <span className="block w-8 h-px bg-brand" />
              <span className="text-[10px] font-semibold tracking-[0.4em] uppercase text-brand">
                Contactez-nous
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-black text-white tracking-tight leading-none">
              Parlons <span className="text-white/20">Ensemble.</span>
            </h1>
            <p className="mt-4 text-sm text-white/35 leading-relaxed max-w-lg">
              Que vous soyez prêt à acquérir votre prochaine machine ou que vous ayez simplement une question
              — nos spécialistes sont là pour vous.
            </p>
          </AnimatedSection>
        </div>
      </div>

      {/* ─── Main ─── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-[1fr_420px] gap-12 xl:gap-20">

          {/* Left: Form */}
          <AnimatedSection>
            <div className="p-8 sm:p-10 rounded-3xl bg-surface border border-white/6">
              {/* Enquiry type selector */}
              <div className="mb-8">
                <p className="text-[10px] font-semibold text-white/30 uppercase tracking-[0.2em] mb-3">
                  Type de Demande
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {enquiryTypes.map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setEnquiryType(id)}
                      className={`flex flex-col items-center gap-2 px-3 py-4 rounded-xl text-center transition-all duration-200 ${
                        enquiryType === id
                          ? "bg-brand/15 border border-brand/30 text-white"
                          : "bg-white/3 border border-white/6 text-white/35 hover:text-white/60 hover:border-white/15"
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${enquiryType === id ? "text-brand" : ""}`} strokeWidth={1.5} />
                      <span className="text-[10px] font-semibold tracking-wide leading-tight">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Nom Complet *"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={inputClass}
                  />
                  <input
                    type="tel"
                    placeholder="Numéro de Téléphone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={inputClass}
                  />
                </div>

                <input
                  type="email"
                  placeholder="Adresse Email *"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={inputClass}
                />

                <input
                  type="text"
                  placeholder="Véhicule d'Intérêt (Optionnel)"
                  value={formData.vehicle}
                  onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                  className={inputClass}
                />

                <textarea
                  placeholder="Votre message..."
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`${inputClass} resize-none`}
                />

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2 text-[10px] text-white/20">
                    <Shield className="w-3 h-3" />
                    Crypté & Sécurisé
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-brand hover:bg-brand-bright text-white text-[12px] font-bold uppercase tracking-[0.2em] rounded-full transition-all duration-300 hover:shadow-[0_0_30px_oklch(65%_0.22_55/0.4)] active:scale-[0.98]"
                  >
                    Envoyer la demande
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </AnimatedSection>

          {/* Right: Contact info + note */}
          <div className="space-y-6">
            <AnimatedSection delay={0.1}>
              <div className="grid grid-cols-1 gap-3">
                {contactInfo.map(({ icon: Icon, label, value, sub }) => (
                  <div
                    key={label}
                    className="flex items-start gap-4 p-5 rounded-2xl bg-surface border border-white/5 hover:border-white/10 transition-all duration-300"
                  >
                    <div className="w-9 h-9 rounded-xl bg-white/4 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-white/40" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-white/25 uppercase tracking-widest mb-0.5">
                        {label}
                      </p>
                      <p className="text-sm font-semibold text-white">{value}</p>
                      <p className="text-[11px] text-white/30 mt-0.5">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* Premium service note */}
            <AnimatedSection delay={0.2}>
              <div className="p-6 rounded-2xl border border-brand/15 bg-brand/5">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-4 h-4 text-brand" fill="currentColor" />
                  <p className="text-[11px] font-bold text-brand uppercase tracking-widest">
                    Service Conciergerie
                  </p>
                </div>
                <p className="text-sm text-white/50 leading-relaxed">
                  Chaque client bénéficie d&apos;un spécialiste dédié qui vous guidera tout au long du
                  processus d&apos;acquisition — de la sélection à la livraison.
                </p>
              </div>
            </AnimatedSection>
          </div>

        </div>
      </div>
    </div>
  );
}
