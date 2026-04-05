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
  if (/(go to|take me|open|navigate).*(model|inventory|collection)/.test(q) || q === "models") {
    router.push("/inventory");
    return { id, role: "apex", text: "Taking you to the Models collection now. 🚀", links: [] };
  }
  if (/(go to|take me|open|navigate).*(trade|sell)/.test(q) || /trade.?in/.test(q) && /how|where|page/.test(q)) {
    router.push("/sell-my-car");
    return { id, role: "apex", text: "Navigating to our Trade-In page.", links: [] };
  }
  if (/(go to|take me|open|navigate).*(contact|enquire|finance)/.test(q) || /contact/.test(q) && /page|us/.test(q)) {
    router.push("/finance");
    return { id, role: "apex", text: "Opening the Enquire page for you.", links: [] };
  }

  // Greetings
  if (/^(hi|hello|hey|sup|yo|what's up|howdy)/.test(q)) {
    return {
      id, role: "apex",
      text: "Hey! I'm APEX, your personal NoLimit advisor. Ask me about any car in our collection, trade-ins, pricing, or where to go on the site.",
      links: [
        { label: "Browse Models", href: "/inventory" },
        { label: "Enquire Now", href: "/finance" },
      ],
    };
  }

  // Fastest car
  if (/fastest|quickest|most powerful|0.?to.?60|0.?to.?100/.test(q)) {
    const sorted = [...vehicles].sort((a, b) => parseFloat(a.zeroToSixty) - parseFloat(b.zeroToSixty));
    const fastest = sorted[0];
    return {
      id, role: "apex",
      text: `Our quickest car is the **${fastest.name}** — it hits 0-100 km/h in just **${fastest.zeroToSixty}** with **${fastest.horsepower} HP**. A proper weapon.`,
      cars: [fastest],
      links: [{ label: `View ${fastest.model}`, href: `/inventory/${fastest.slug}` }],
    };
  }

  // Most expensive / cheapest
  if (/most expensive|priciest|highest price/.test(q)) {
    const sorted = [...vehicles].sort((a, b) => b.price - a.price);
    const top = sorted[0];
    return {
      id, role: "apex",
      text: `Our crown jewel is the **${top.name}** at **${formatPrice(top.price)}**. Absolutely uncompromising.`,
      cars: [top],
      links: [{ label: `View ${top.model}`, href: `/inventory/${top.slug}` }],
    };
  }
  if (/cheapest|affordable|lowest price|entry/.test(q)) {
    const sorted = [...vehicles].sort((a, b) => a.price - b.price);
    const low = sorted[0];
    return {
      id, role: "apex",
      text: `Our most accessible vehicle is the **${low.name}** starting at **${formatPrice(low.price)}**. Still an absolutely pure machine.`,
      cars: [low],
      links: [{ label: `View ${low.model}`, href: `/inventory/${low.slug}` }],
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
          text: `We have **${found.length}** ${make.charAt(0).toUpperCase() + make.slice(1)} model${found.length > 1 ? "s" : ""} in stock:`,
          cars: found,
          links: [{ label: `All ${make.charAt(0).toUpperCase() + make.slice(1)} Models`, href: `/inventory?make=${make.charAt(0).toUpperCase() + make.slice(1)}` }],
        };
      }
    }
  }

  // Search by category
  if (/supercar|super car/.test(q)) {
    const found = vehicles.filter((v) => v.category === "supercar");
    return { id, role: "apex", text: `We carry **${found.length} supercars**. Here's a look:`, cars: found.slice(0, 3), links: [{ label: "View All Supercars", href: "/inventory?category=supercar" }] };
  }
  if (/electric|ev|electr/.test(q)) {
    const found = vehicles.filter((v) => v.category === "electric");
    return { id, role: "apex", text: `We have **${found.length} electric vehicles** — silent but devastating:`, cars: found, links: [{ label: "View EVs", href: "/inventory?category=electric" }] };
  }
  if (/luxury/.test(q)) {
    const found = vehicles.filter((v) => v.category === "luxury");
    return { id, role: "apex", text: `Our **luxury** selection — refined power with unmatched presence:`, cars: found, links: [{ label: "View Luxury", href: "/inventory?category=luxury" }] };
  }
  if (/sports/.test(q)) {
    const found = vehicles.filter((v) => v.category === "sports");
    return { id, role: "apex", text: `Our **sports** lineup — track precision with road manners:`, cars: found, links: [{ label: "View Sports", href: "/inventory?category=sports" }] };
  }

  // Trade-in
  if (/trade.?in|sell.*car|my car|get offer|valuation/.test(q)) {
    return {
      id, role: "apex",
      text: "Thinking of trading in? We offer instant, fair-market valuations with zero pressure. Just enter your VIN and we handle the rest.",
      links: [{ label: "Start Trade-In", href: "/sell-my-car" }],
    };
  }

  // Finance / payment
  if (/financ|loan|payment|monthly|credit|down payment/.test(q)) {
    return {
      id, role: "apex",
      text: "We offer competitive financing with $0 down payment available. Our specialists will find the right structure for your situation.",
      links: [{ label: "Enquire About Finance", href: "/finance?type=finance" }],
    };
  }

  // Contact / location
  if (/contact|location|address|call|email|phone|showroom|visit/.test(q)) {
    return {
      id, role: "apex",
      text: "📍 **1200 Velocity Drive, Beverly Hills, CA 90210**\n📞 +1 (800) NO-LIMIT\n📧 hello@nolimitautos.com\n\n⏰ Mon–Sat: 9am–7pm | Sun: By Appointment",
      links: [{ label: "Full Contact Page", href: "/finance" }],
    };
  }

  // Test drive
  if (/test drive|drive it|try it|appointment/.test(q)) {
    return {
      id, role: "apex",
      text: "Absolutely — we encourage every client to experience the machine before committing. Book a test drive and our team will arrange everything.",
      links: [{ label: "Book a Test Drive", href: "/finance" }],
    };
  }

  // How many cars / inventory
  if (/how many|all cars|full list|all vehicle|inventory|collection/.test(q)) {
    return {
      id, role: "apex",
      text: `We currently have **${vehicles.length} vehicles** across ${[...new Set(vehicles.map(v => v.category))].length} categories. Every one is handpicked.`,
      links: [{ label: "Browse Full Collection", href: "/inventory" }],
    };
  }

  // New arrivals
  if (/new|arrival|latest|recent|fresh/.test(q)) {
    const newOnes = vehicles.filter((v) => v.newArrival);
    return {
      id, role: "apex",
      text: `**${newOnes.length} new arrivals** just landed in the collection:`,
      cars: newOnes.slice(0, 3),
      links: [{ label: "All New Arrivals", href: "/inventory?sort=newest" }],
    };
  }

  // About APEX
  if (/who are you|what are you|apex|your name/.test(q)) {
    return {
      id, role: "apex",
      text: "I'm **APEX** — NoLimit's AI concierge. I know every car in this collection by heart. Ask me specs, pricing, comparisons, or I can take you anywhere on the site.",
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
    text: "I didn't quite catch that. I can help you with:\n• Car specs & pricing\n• Finding vehicles by make or category\n• Trade-in & finance info\n• Navigating the site",
    links: suggestions.map((s) => ({ label: s.label, href: "#", query: s.q } as { label: string; href: string; query?: string })),
  };
}

const SUGGESTIONS = [
  "Fastest car in stock",
  "Show Lamborghinis",
  "Electric vehicles",
  "Trade-in my car",
  "Contact info",
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
      text: "I'm **APEX**, your NoLimit AI advisor. Ask me about any vehicle, pricing, trade-ins, or let me navigate you around the site.",
      links: [
        { label: "Browse Models", href: "/inventory" },
        { label: "Get a Trade-In Quote", href: "/sell-my-car" },
        { label: "Enquire Now", href: "/finance" },
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
        className={`fixed bottom-24 sm:bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full bg-crimson text-white shadow-[0_0_30px_oklch(60%_0.25_20/0.5)] hover:bg-crimson-bright transition-all duration-300 hover:scale-105 active:scale-95 ${open ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        aria-label="Open APEX AI"
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
            <div className="relative w-8 h-8 rounded-xl bg-crimson/15 border border-crimson/25 flex items-center justify-center">
              <Zap className="w-4 h-4 text-crimson" fill="currentColor" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-black" />
            </div>
            <div>
              <p className="text-[12px] font-black text-white tracking-wider">APEX</p>
              <p className="text-[9px] text-emerald-400 tracking-wider">Online · NoLimit AI</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                setMessages([{
                  id: "welcome",
                  role: "apex",
                  text: "Conversation reset. How can I help you today?",
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
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/4 border border-white/6 hover:border-crimson/30 hover:bg-white/6 transition-all group"
                        >
                          <div className="flex flex-col flex-1 min-w-0">
                            <p className="text-[10px] font-semibold text-crimson uppercase tracking-wider truncate">{car.make}</p>
                            <p className="text-[11px] font-bold text-white truncate">{car.model}</p>
                          </div>
                          <div className="flex flex-col items-end gap-0.5 shrink-0">
                            <div className="flex items-center gap-1 text-[9px] text-white/30">
                              <Gauge className="w-2.5 h-2.5" />
                              <span>{car.horsepower} HP</span>
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
                          <ChevronRight className="w-3 h-3 text-white/20 group-hover:text-crimson transition-colors shrink-0" />
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
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-crimson/40 hover:bg-crimson/8 transition-all text-[10px] font-semibold text-white/50 hover:text-crimson"
                          >
                            {link.label}
                          </button>
                        ) : (
                          <Link
                            key={link.label}
                            href={link.href}
                            onClick={() => setOpen(false)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-crimson/40 hover:bg-crimson/8 transition-all text-[10px] font-semibold text-white/50 hover:text-crimson"
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
                <div className="max-w-[75%] px-4 py-2.5 rounded-2xl rounded-tr-sm bg-crimson/20 border border-crimson/25">
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
                className="shrink-0 px-3 py-1.5 rounded-full bg-white/4 border border-white/8 hover:border-crimson/30 transition-all text-[10px] font-medium text-white/40 hover:text-white whitespace-nowrap"
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
            placeholder="Ask APEX anything..."
            className="flex-1 bg-white/4 border border-white/8 rounded-xl px-4 py-2.5 text-[12px] text-white placeholder:text-white/20 focus:outline-none focus:border-crimson/40 transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-crimson hover:bg-crimson-bright transition-all disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
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
