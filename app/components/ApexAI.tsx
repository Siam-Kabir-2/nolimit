"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  X,
  Send,
  Zap,
  ChevronRight,
  Car,
  Gauge,
  Clock,
  DollarSign,
  Phone,
  RotateCcw,
} from "lucide-react";
import { vehicles, formatPrice } from "@/app/data/vehicleData";

interface Message {
  id: string;
  role: "apex" | "user";
  text: string;
  links?: { label: string; href: string }[];
  cars?: typeof vehicles;
}

// ── Smart response engine ──
function getResponse(input: string, router: ReturnType<typeof useRouter>): Message {
  const q = input.toLowerCase().trim();
  const id = Math.random().toString(36).slice(2);

  // Navigation intents
  if (/(aller à|amène-moi|ouvrir|naviguer).*(modèle|inventaire|collection)/.test(q) || q === "modèles") {
    router.push("/inventory");
    return { id, role: "apex", text: "Je vous emmène à la collection de Modèles. 🚀", links: [] };
  }
  if (/(aller à|amène-moi|ouvrir|naviguer).*(reprise|vendre)/.test(q) || /reprise/.test(q) && /comment|où|page/.test(q)) {
    router.push("/sell-my-car");
    return { id, role: "apex", text: "Navigation vers notre page de Reprise.", links: [] };
  }
  if (/(aller à|amène-moi|ouvrir|naviguer).*(contact|s'informer|financement)/.test(q) || /contact/.test(q) && /page|nous/.test(q)) {
    router.push("/finance");
    return { id, role: "apex", text: "Ouverture de la page d'Information pour vous.", links: [] };
  }

  // Greetings
  if (/^(salut|bonjour|hey|yo|coucou|bonsoir)/.test(q)) {
    return {
      id, role: "apex",
      text: "Salut ! Je suis APEX, votre conseiller personnel NoLimit. Interrogez-moi sur n'importe quelle voiture de notre collection, les reprises, les tarifs ou la navigation sur le site.",
      links: [
        { label: "Parcourir les Modèles", href: "/inventory" },
        { label: "S'informer", href: "/finance" },
      ],
    };
  }

  // Fastest car
  if (/rapide|puissante|plus rapide|0.?à.?100|0.?a.?100/.test(q)) {
    const sorted = [...vehicles].sort((a, b) => parseFloat(a.zeroToSixty) - parseFloat(b.zeroToSixty));
    const fastest = sorted[0];
    return {
      id, role: "apex",
      text: `Notre voiture la plus rapide est la **${fastest.name}** — elle atteint 0-100 km/h en seulement **${fastest.zeroToSixty}** avec **${fastest.horsepower} CV**. Une véritable arme.`,
      cars: [fastest],
      links: [{ label: `Voir la ${fastest.model}`, href: `/inventory/${fastest.slug}` }],
    };
  }

  // Most expensive / cheapest
  if (/plus cher|plus couteux|prix le plus haut/.test(q)) {
    const sorted = [...vehicles].sort((a, b) => b.price - a.price);
    const top = sorted[0];
    return {
      id, role: "apex",
      text: `Notre joyau de la couronne est la **${top.name}** à **${formatPrice(top.price)}**. Absolument sans compromis.`,
      cars: [top],
      links: [{ label: `Voir la ${top.model}`, href: `/inventory/${top.slug}` }],
    };
  }
  if (/moins cher|abordable|prix le plus bas|entrée de gamme/.test(q)) {
    const sorted = [...vehicles].sort((a, b) => a.price - b.price);
    const low = sorted[0];
    return {
      id, role: "apex",
      text: `Notre véhicule le plus accessible est la **${low.name}** à partir de **${formatPrice(low.price)}**. Toujours une machine absolument pure.`,
      cars: [low],
      links: [{ label: `Voir la ${low.model}`, href: `/inventory/${low.slug}` }],
    };
  }

  // Search by make
  const makes = ["lamborghini", "porsche", "ferrari", "bmw", "mercedes", "audi", "mclaren"];
  for (const make of makes) {
    if (q.includes(make)) {
      const found = vehicles.filter((v) => v.make.toLowerCase().includes(make));
      if (found.length) {
        return {
          id, role: "apex",
          text: `Nous avons **${found.length}** modèle${found.length > 1 ? "s" : ""} ${make.charAt(0).toUpperCase() + make.slice(1)} en stock :`,
          cars: found,
          links: [{ label: `Tous les modèles ${make.charAt(0).toUpperCase() + make.slice(1)}`, href: `/inventory?make=${make.charAt(0).toUpperCase() + make.slice(1)}` }],
        };
      }
    }
  }

  // Search by category
  if (/supercar|super car/.test(q)) {
    const found = vehicles.filter((v) => v.category === "supercar");
    return { id, role: "apex", text: `Nous avons **${found.length} supercars**. En voici un aperçu :`, cars: found.slice(0, 3), links: [{ label: "Voir toutes les Supercars", href: "/inventory" }] };
  }
  if (/electrique|ev|electr/.test(q)) {
    const found = vehicles.filter((v) => v.category === "electric");
    return { id, role: "apex", text: `Nous avons **${found.length} véhicules électriques** — silencieux mais dévastateurs :`, cars: found, links: [{ label: "Voir les EVs", href: "/inventory" }] };
  }
  if (/luxe|luxury/.test(q)) {
    const found = vehicles.filter((v) => v.category === "luxury");
    return { id, role: "apex", text: `Notre sélection **luxe** — puissance raffinée avec une présence inégalée :`, cars: found, links: [{ label: "Voir Luxe", href: "/inventory" }] };
  }
  if (/sport|sports/.test(q)) {
    const found = vehicles.filter((v) => v.category === "sports");
    return { id, role: "apex", text: `Notre gamme **sport** — précision de piste avec manières routières :`, cars: found, links: [{ label: "Voir Sport", href: "/inventory" }] };
  }

  // Trade-in
  if (/reprise|vendre.*voiture|ma voiture|estimation|evaluation/.test(q)) {
    return {
      id, role: "apex",
      text: "Vous envisagez une reprise ? Nous offrons des évaluations instantanées au prix du marché, sans aucune pression. Entrez simplement votre NIV et nous nous occupons du reste.",
      links: [{ label: "Démarrer une Reprise", href: "/sell-my-car" }],
    };
  }

  // Finance / payment
  if (/financ|pret|paiement|mensuel|credit|acompte/.test(q)) {
    return {
      id, role: "apex",
      text: "Nous proposons des financements compétitifs avec acompte de 0 € possible. Nos spécialistes trouveront la structure adaptée à votre situation.",
      links: [{ label: "S'informer sur le Financement", href: "/finance" }],
    };
  }

  // Contact / location
  if (/contact|lieu|adresse|appeler|email|telephone|showroom|visite/.test(q)) {
    return {
      id, role: "apex",
      text: "📍 **1200 Velocity Drive, Beverly Hills, CA 90210**\n📞 +1 (800) NO-LIMIT\n📧 hello@nolimitautos.com\n\n⏰ Lun–Sam : 9h–19h | Dim : Sur rendez-vous",
      links: [{ label: "Page de Contact", href: "/finance" }],
    };
  }

  // Test drive
  if (/essai|conduire|essayer|rendez-vous/.test(q)) {
    return {
      id, role: "apex",
      text: "Absolument — nous encourageons chaque client à faire l'expérience de la machine avant de s'engager. Réservez un essai routier et notre équipe organisera tout.",
      links: [{ label: "Réserver un Essai", href: "/finance" }],
    };
  }

  // How many cars / inventory
  if (/combien|toutes les voitures|liste complète|tout vehicule|inventaire|collection/.test(q)) {
    return {
      id, role: "apex",
      text: `Nous avons actuellement **${vehicles.length} véhicules** dans ${[...new Set(vehicles.map(v => v.category))].length} catégories. Chaque exemplaire est rigoureusement sélectionné.`,
      links: [{ label: "Parcourir la Collection", href: "/inventory" }],
    };
  }

  // New arrivals
  if (/nouveau|arrivage|dernier|recent|frais/.test(q)) {
    const newOnes = vehicles.filter((v) => v.newArrival);
    return {
      id, role: "apex",
      text: `**${newOnes.length} nouveaux arrivages** viennent d'intégrer la collection :`,
      cars: newOnes.slice(0, 3),
      links: [{ label: "Toutes les Nouveautés", href: "/inventory" }],
    };
  }

  // About APEX
  if (/qui es-tu|c'est quoi|apex|ton nom/.test(q)) {
    return {
      id, role: "apex",
      text: "Je suis **APEX** — le concierge IA de NoLimit. Je connais chaque voiture de cette collection par cœur. Demandez-moi les specs, les tarifs, des comparaisons, ou je peux vous guider n'importe où sur le site.",
    };
  }

  // Default fallback
  const suggestions = [
    { label: "Fastest car in stock", q: "What's the fastest car?" },
    { label: "Browse Lamborghinis", q: "Show Lamborghinis" },
    { label: "Electric vehicles", q: "Electric cars" },
    { label: "Trade-in my car", q: "How do I trade in?" },
  ];

  return {
    id, role: "apex",
    text: "Je n'ai pas bien saisi. Je peux vous aider avec :\n• Spécifications et tarifs des voitures\n• Recherche de véhicules par marque ou catégorie\n• Infos sur les reprises et le financement\n• Navigation sur le site",
    links: suggestions.map((s) => ({ label: s.label, href: "#", query: s.q } as { label: string; href: string; query?: string })),
  };
}

const SUGGESTIONS = [
  "Voiture la plus rapide",
  "Montrer les Lamborghinis",
  "Véhicules électriques",
  "Reprendre ma voiture",
  "Infos de contact",
];

export default function ApexAI() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "apex",
      text: "Je suis **APEX**, votre conseiller IA NoLimit. Interrogez-moi sur n'importe quel véhicule, tarifs, reprises, ou laissez-moi vous guider sur le site.",
      links: [
        { label: "Parcourir les Modèles", href: "/inventory" },
        { label: "Obtenir un Devis de Reprise", href: "/sell-my-car" },
        { label: "S'informer Maintenant", href: "/finance" },
      ],
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Math.random().toString(36).slice(2), role: "user", text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    // Simulate thinking delay
    setTimeout(() => {
      const response = getResponse(text, router);
      setTyping(false);
      setMessages((prev) => [...prev, response]);
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send(input);
  };

  const renderText = (text: string) => {
    // Bold markdown
    return text.split(/(\*\*.*?\*\*)/).map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i} className="text-white font-bold">{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        className={`fixed bottom-24 sm:bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full bg-brand text-white shadow-[0_0_30px_oklch(65%_0.22_55/0.5)] hover:bg-brand-bright transition-all duration-300 hover:scale-105 active:scale-95 ${open ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        aria-label="Ouvrir APEX IA"
      >
        <Zap className="w-4 h-4" fill="currentColor" />
        <span className="text-[11px] font-black uppercase tracking-widest">APEX</span>
      </button>

      {/* Chat window */}
      <div
        className={`fixed bottom-24 sm:bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] rounded-2xl overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.7)] border border-white/10 transition-all duration-500 ease-out origin-bottom-right ${
          open ? "scale-100 opacity-100 pointer-events-auto" : "scale-90 opacity-0 pointer-events-none"
        }`}
        style={{ background: "oklch(10% 0.005 250 / 0.98)", backdropFilter: "blur(24px)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/8">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-xl bg-brand/15 border border-brand/25 flex items-center justify-center">
              <Zap className="w-4 h-4 text-brand" fill="currentColor" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-black" />
            </div>
            <div>
              <p className="text-[12px] font-black text-white tracking-wider">APEX</p>
              <p className="text-[9px] text-emerald-400 tracking-wider">En ligne · IA NoLimit</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                setMessages([{
                  id: "welcome",
                  role: "apex",
                  text: "Conversation réinitialisée. Comment puis-je vous aider aujourd'hui ?",
                }]);
              }}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-white/25 hover:text-white/60 hover:bg-white/5 transition-all"
              title="Reset chat"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setOpen(false)}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-white/25 hover:text-white/60 hover:bg-white/5 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role === "apex" ? (
                <div className="max-w-[85%] space-y-2">
                  {/* Bubble */}
                  <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-white/6 border border-white/8">
                    <p className="text-[12px] text-white/70 leading-relaxed whitespace-pre-line">
                      {renderText(msg.text)}
                    </p>
                  </div>

                  {/* Car previews */}
                  {msg.cars && msg.cars.length > 0 && (
                    <div className="space-y-1.5">
                      {msg.cars.slice(0, 3).map((car) => (
                        <Link
                          key={car.slug}
                          href={`/inventory/${car.slug}`}
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/4 border border-white/6 hover:border-brand/30 hover:bg-white/6 transition-all group"
                        >
                          <div className="flex flex-col flex-1 min-w-0">
                            <p className="text-[10px] font-semibold text-brand uppercase tracking-wider truncate">{car.make}</p>
                            <p className="text-[11px] font-bold text-white truncate">{car.model}</p>
                          </div>
                          <div className="flex flex-col items-end gap-0.5 shrink-0">
                            <div className="flex items-center gap-1 text-[9px] text-white/30">
                              <Gauge className="w-2.5 h-2.5" />
                              <span>{car.horsepower} CV</span>
                            </div>
                            <div className="flex items-center gap-1 text-[9px] text-white/30">
                              <Clock className="w-2.5 h-2.5" />
                              <span>{car.zeroToSixty}</span>
                            </div>
                            <div className="flex items-center gap-1 text-[9px] text-white/40">
                              <DollarSign className="w-2.5 h-2.5" />
                              <span>{formatPrice(car.price)}</span>
                            </div>
                          </div>
                          <ChevronRight className="w-3 h-3 text-white/20 group-hover:text-brand transition-colors shrink-0" />
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Action links */}
                  {msg.links && msg.links.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {msg.links.map((link) =>
                        "query" in link && link.query ? (
                          <button
                            key={link.label}
                            onClick={() => send(link.query as string)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-brand/40 hover:bg-brand/8 transition-all text-[10px] font-semibold text-white/50 hover:text-brand"
                          >
                            {link.label}
                          </button>
                        ) : (
                          <Link
                            key={link.label}
                            href={link.href}
                            onClick={() => setOpen(false)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-brand/40 hover:bg-brand/8 transition-all text-[10px] font-semibold text-white/50 hover:text-brand"
                          >
                            {link.label}
                            <ChevronRight className="w-2.5 h-2.5" />
                          </Link>
                        )
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="max-w-[75%] px-4 py-2.5 rounded-2xl rounded-tr-sm bg-brand/20 border border-brand/25">
                  <p className="text-[12px] text-white/80 leading-relaxed">{msg.text}</p>
                </div>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {typing && (
            <div className="flex justify-start">
              <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-white/6 border border-white/8 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Suggestions */}
        {messages.length <= 1 && (
          <div className="px-4 pb-2 flex gap-1.5 overflow-x-auto scrollbar-none">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="shrink-0 px-3 py-1.5 rounded-full bg-white/4 border border-white/8 hover:border-brand/30 transition-all text-[10px] font-medium text-white/40 hover:text-white whitespace-nowrap"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-3 border-t border-white/8">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Demandez n'importe quoi à APEX..."
            className="flex-1 bg-white/4 border border-white/8 rounded-xl px-4 py-2.5 text-[12px] text-white placeholder:text-white/20 focus:outline-none focus:border-brand/40 transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-brand hover:bg-brand-bright transition-all disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
          >
            <Send className="w-3.5 h-3.5 text-white" />
          </button>
        </form>

        {/* Footer branding */}
        <div className="flex items-center justify-center gap-1.5 py-2 border-t border-white/5">
          <Car className="w-2.5 h-2.5 text-white/15" />
          <p className="text-[9px] text-white/15 tracking-widest uppercase">NoLimit APEX Intelligence</p>
          <Phone className="w-2.5 h-2.5 text-white/15" />
        </div>
      </div>
    </>
  );
}
