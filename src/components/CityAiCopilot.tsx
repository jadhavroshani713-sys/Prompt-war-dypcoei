"use client";

import React, { useState, useRef, useEffect } from "react";
import { CityData } from "@/data/citiesData";
import {
  Bot,
  Sparkles,
  Send,
  User,
  Compass,
  Shield,
  Utensils,
  Landmark,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";
import { audioEngine } from "@/lib/audioEngine";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  tags?: string[];
}

interface CityAiCopilotProps {
  city: CityData;
}

export const CityAiCopilot: React.FC<CityAiCopilotProps> = ({ city }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-1",
      sender: "ai",
      text: `Namaste & Welcome to ${city.name}! I am your **Urban AI Navigator**. I transform real-world city data, safety heatmaps, traffic telemetries, and local secrets into clear, actionable recommendations.\n\nAsk me anything: customized budget itineraries, night safety audits, hidden street food gems, or neighborhood comparisons!`,
      timestamp: "Just Now",
      tags: ["AI Copilot", "NLP Insights", city.name],
    },
  ]);

  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const presetQueries = [
    `Plan a 1-day budget street food & heritage tour in ${city.name} (under ₹500)`,
    `Is it safe to walk near FC Road & Station at 11:30 PM?`,
    `Compare Koregaon Park vs Hinjawadi for a student`,
    `Where can I find the most legendary heritage Irani chai?`,
  ];

  const generateAIResponse = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes("budget") || q.includes("itinerary") || q.includes("1-day") || q.includes("tour")) {
      return `### 🗺️ Curated 1-Day Budget & Heritage Itinerary for ${city.name} (Total Est: ~₹420)

**1. 08:30 AM — Heritage Breakfast at Goodluck Cafe / MTR**
• *Dish:* Bun Maska + Spiced Chai / Crispy Ghee Roast Dosa (₹80)
• *Vibe:* Historic 1930s cultural melting pot.

**2. 10:30 AM — Shaniwar Wada & Peshwa Fort Gates**
• *Entry:* ₹25 • Walk through Delhi Darwaza with iron elephant deterrent spikes.
• *Safety Index:* 92% • High CCTV & pedestrian security.

**3. 01:30 PM — Legendary FC Road Food Hop**
• *Dish:* Sev Potato Dahi Puri (SPDP) at Vaishali + Mango Mastani (₹180)
• *Cleanliness Score:* 9.2/10.

**4. 04:30 PM — Aga Khan Palace Memorial Gardens**
• *Entry:* ₹25 • Quiet reflection amidst Italian arches and Gandhi museum.

**5. 07:00 PM — Evening Sunset & Live Music Walk**
• Stroll down illuminated tree-lined lanes. 100% lit with 24/7 police beat marshals.`;
    }

    if (q.includes("safe") || q.includes("night") || q.includes("security") || q.includes("walk")) {
      return `### 🛡️ Real-Time Night Safety Audit: ${city.name}

• **Overall Safety Score:** **89/100 (Safe & Active)**
• **Well-Lit Recommended Corridors:** FC Road, Koregaon Park North Main Road, and Metro Station concourses (Lighting Score: 9.5/10, 24/7 Police Patrols).
• **Caution Hotspots to Detour:** Avoid the dark pedestrian tunnels near old railway underpasses after 10:30 PM. Use the overhead illuminated skywalk with CCTV instead.
• **Emergency Quick Dial:** Police 112 • Women's Helpline 1091.`;
    }

    if (q.includes("compare") || q.includes("koregaon") || q.includes("hinjawadi")) {
      return `### ⚖️ Neighborhood Matrix Breakdown: Koregaon Park vs. Hinjawadi

| Metric | Koregaon Park | Hinjawadi IT Park |
| :--- | :--- | :--- |
| **Safety Score** | 94% (High Night Patrol) | 76% (Moderate) |
| **Cleanliness** | 91% (Leafy Banyan Canopy) | 79% (Rapid Development) |
| **Affordability** | ₹₹₹ (Higher Rent & Cafes) | ₹₹ (More Student/IT Friendly) |
| **Transit Access** | 88% (Central & Walkable) | 60% (Peak Commute Traffic) |

**AI Verdict:** If you value vibrant indie cafes, heritage trees, and late-night walking, **Koregaon Park** is unbeatable. If you work in tech and need proximity to IT campuses, **Hinjawadi** offers modern gated townships.`;
    }

    if (q.includes("chai") || q.includes("irani") || q.includes("tea") || q.includes("food")) {
      return `### ☕ Legendary Chai & Local Gastronomy Radar

1. **Goodluck Cafe (Deccan Gymkhana):** 1935 vintage Irani cafe. Golden bun maska dipped in steaming cutting chai (₹60).
2. **Vaishali (FC Road):** The student philosophical sanctuary. Famous for filter coffee and SPDP.
3. **Kyani & Co. / Irani Bakery:** Warm mawa cake and classic chai since 1904.

*Pro-tip:* Visit between 7:30 AM and 9:00 AM for fresh-out-of-the-oven buttery pav!`;
    }

    return `### 💡 AI Urban Recommendation for "${query}"

Based on telemetry and citizen verified data in **${city.name}**:
• **Cleanliness Index:** 88% across hospitality corridors.
• **Traffic Status:** 24 km/h average city speed; peak flow expected around 6:30 PM.
• **Recommended Next Step:** Check out our **Interactive City Map** to inspect real-time safety heatmaps and verified food pins!`;
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text: text.trim(),
      timestamp: "Just Now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);
    audioEngine.playChimeNote(659.25);

    setTimeout(() => {
      const responseText = generateAIResponse(text);
      const aiMsg: Message = {
        id: `msg-ai-${Date.now()}`,
        sender: "ai",
        text: responseText,
        timestamp: "Just Now",
        tags: ["Verified Telemetry", "AI Navigator"],
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
      audioEngine.playChimeNote(880.0);
    }, 900);
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER HERO */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-slate-900 bg-slate-900/90 backdrop-blur-xl border border-emerald-500/20 shadow-2xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center lg:text-left">
            <span className="px-3 py-1 rounded-full text-xs font-mono-code font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              NLP & Urban Intelligence Copilot
            </span>
            <h2 className="font-serif-title text-2xl md:text-3xl font-extrabold text-white">
              City AI Copilot & Itinerary Architect
            </h2>
            <p className="text-xs md:text-sm text-slate-300 max-w-xl">
              Ask natural language questions about safety audits, custom budget itineraries, real-time traffic bypasses, and neighborhood intelligence in {city.name}.
            </p>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-2xl bg-black/40 border border-white/10 text-xs font-mono-code text-emerald-300">
            <Bot className="w-4 h-4 text-emerald-400" />
            <span>AI Reasoning Engine Active</span>
          </div>
        </div>
      </div>

      {/* QUICK PRESET CHIPS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {presetQueries.map((preset, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(preset)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-slate-900/80 hover:bg-emerald-500/20 hover:border-emerald-500/40 border border-white/10 text-xs text-slate-300 whitespace-nowrap transition-all shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{preset}</span>
          </button>
        ))}
      </div>

      {/* CHAT LOG BOX */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-white/10 shadow-2xl space-y-4 flex flex-col h-[520px]">
        
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${
                m.sender === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              {/* Avatar */}
              <div
                className={`p-2.5 rounded-2xl flex-shrink-0 ${
                  m.sender === "user"
                    ? "bg-amber-500 text-black font-bold"
                    : "bg-emerald-500/20 border border-emerald-500/40 text-emerald-400"
                }`}
              >
                {m.sender === "user" ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-2xl p-4 md:p-5 rounded-3xl text-xs md:text-sm leading-relaxed space-y-2 ${
                  m.sender === "user"
                    ? "bg-gradient-to-r from-amber-600 to-rose-600 text-white rounded-tr-none shadow-lg shadow-amber-600/20"
                    : "bg-black/50 border border-white/10 text-slate-200 rounded-tl-none shadow-lg"
                }`}
              >
                <div className="whitespace-pre-wrap font-sans">{m.text}</div>

                {m.tags && (
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
                    {m.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md text-[10px] font-mono-code bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
                <Bot className="w-4 h-4" />
              </div>
              <div className="px-4 py-3 rounded-2xl bg-black/50 border border-white/10 text-xs text-slate-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>AI Navigator synthesizing telemetry & insights...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2 pt-2 border-t border-white/10"
        >
          <input
            type="text"
            placeholder={`Ask about safety, food spots, heritage, or budget plans in ${city.name}...`}
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="flex-1 px-4 py-3 rounded-2xl bg-black/50 border border-white/10 text-white text-xs md:text-sm placeholder:text-slate-500 focus:outline-none focus:border-emerald-400"
          />
          <button
            type="submit"
            className="p-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center"
            title="Send Query"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>

    </div>
  );
};
