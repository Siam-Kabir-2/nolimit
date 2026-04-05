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
    label: "Call Us",
    value: "+1 (800) NO-LIMIT",
    sub: "Mon–Sat, 9am–7pm",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "hello@nolimitautos.com",
    sub: "We reply within 2 hours",
  },
  {
    icon: MapPin,
    label: "Showroom",
    value: "1200 Velocity Drive",
    sub: "Beverly Hills, CA 90210",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon–Sat: 9am–7pm",
    sub: "Sun: By Appointment",
  },
];

const enquiryTypes = [
  { id: "purchase", label: "Purchase Enquiry", icon: Car },
  { id: "finance", label: "Finance Options", icon: Zap },
  { id: "test-drive", label: "Test Drive", icon: CheckCircle },
  { id: "other", label: "General Enquiry", icon: MessageSquare },
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
    "w-full px-4 py-3.5 bg-white/4 border border-white/8 rounded-xl text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-crimson/40 focus:bg-white/6 transition-all";

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <AnimatedSection className="max-w-md text-center p-10 bg-surface rounded-3xl border border-white/8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-crimson/10 border border-crimson/20 flex items-center justify-center mb-6">
            <CheckCircle className="w-7 h-7 text-crimson" />
          </div>
          <h2 className="text-2xl font-black text-white mb-3">Message Received</h2>
          <p className="text-sm text-white/40 leading-relaxed mb-8">
            Thank you, <span className="text-white">{formData.name}</span>. One of our specialists
            will be in touch within 2 hours at{" "}
            <span className="text-white">{formData.email}</span>.
          </p>
          <div className="flex items-center justify-center gap-2 text-[10px] text-white/20 mb-8">
            <Shield className="w-3 h-3" />
            Your information is encrypted and secure
          </div>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({ name: "", email: "", phone: "", vehicle: "", message: "" });
            }}
            className="px-6 py-3 bg-white/5 border border-white/10 text-white text-[11px] font-semibold uppercase tracking-widest rounded-full hover:bg-white/8 transition-all"
          >
            Send Another Enquiry
          </button>
        </AnimatedSection>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* ─── Hero ─── */}
      <div className="relative pt-32 pb-16 overflow-hidden border-b border-white/5">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-crimson/4 blur-[200px] rounded-full pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/8 to-transparent" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-5">
              <span className="block w-8 h-px bg-crimson" />
              <span className="text-[10px] font-semibold tracking-[0.4em] uppercase text-crimson">
                Get in Touch
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-black text-white tracking-tight leading-none">
              Let&apos;s <span className="text-white/20">Talk.</span>
            </h1>
            <p className="mt-4 text-sm text-white/35 leading-relaxed max-w-lg">
              Whether you&apos;re ready to acquire your next machine or simply have a question
              — our specialists are here for you.
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
                  Type of Enquiry
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {enquiryTypes.map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setEnquiryType(id)}
                      className={`flex flex-col items-center gap-2 px-3 py-4 rounded-xl text-center transition-all duration-200 ${
                        enquiryType === id
                          ? "bg-crimson/15 border border-crimson/30 text-white"
                          : "bg-white/3 border border-white/6 text-white/35 hover:text-white/60 hover:border-white/15"
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${enquiryType === id ? "text-crimson" : ""}`} strokeWidth={1.5} />
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
                    placeholder="Full Name *"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={inputClass}
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={inputClass}
                  />
                </div>

                <input
                  type="email"
                  placeholder="Email Address *"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={inputClass}
                />

                <input
                  type="text"
                  placeholder="Vehicle of Interest (Optional)"
                  value={formData.vehicle}
                  onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                  className={inputClass}
                />

                <textarea
                  placeholder="Your message..."
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`${inputClass} resize-none`}
                />

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2 text-[10px] text-white/20">
                    <Shield className="w-3 h-3" />
                    Encrypted & Secure
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-crimson hover:bg-crimson-bright text-white text-[12px] font-bold uppercase tracking-[0.2em] rounded-full transition-all duration-300 hover:shadow-[0_0_30px_oklch(60%_0.25_20/0.4)] active:scale-[0.98]"
                  >
                    Send Enquiry
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
              <div className="p-6 rounded-2xl border border-crimson/15 bg-crimson/5">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-4 h-4 text-crimson" fill="currentColor" />
                  <p className="text-[11px] font-bold text-crimson uppercase tracking-widest">
                    Concierge Service
                  </p>
                </div>
                <p className="text-sm text-white/50 leading-relaxed">
                  Every client receives a dedicated specialist who will guide you through the
                  entire acquisition process — from shortlisting to delivery.
                </p>
              </div>
            </AnimatedSection>
          </div>

        </div>
      </div>
    </div>
  );
}
