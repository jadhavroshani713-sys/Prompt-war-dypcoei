"use client";

import React, { useState } from "react";
import { CityData, HeritageSite } from "@/data/citiesData";
import {
  Landmark,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Sparkles,
  BookOpen,
  Compass,
  Clock,
  Ticket,
  Calendar,
  Layers,
  Heart,
} from "lucide-react";
import { audioEngine } from "@/lib/audioEngine";

interface HistoryCultureProps {
  city: CityData;
}

export const HistoryCulture: React.FC<HistoryCultureProps> = ({ city }) => {
  const [activeAudioSite, setActiveAudioSite] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const localDialectData: Record<
    string,
    Array<{ term: string; meaning: string; context: string }>
  > = {
    pune: [
      {
        term: "Puneri Patya (पुणेरी पाट्या)",
        meaning: "Witty, sarcastic noticeboards unique to Pune shopkeepers and households.",
        context: "e.g. 'Do not ring the bell between 1:00 PM and 4:00 PM unless the building is on fire.'",
      },
      {
        term: "Chai Katta (चहा कट्टा)",
        meaning: "The informal street corner tea joint where students & philosophers debate world politics.",
        context: "The beating social heart of every Pune neighborhood.",
      },
      {
        term: "Dhol Tasha Pathak (ढोल ताशा पथक)",
        meaning: "Youth-led traditional percussion troupes that rehearse for months for Ganesh Chaturthi.",
        context: "A profound cultural brotherhood and acoustic tradition.",
      },
      {
        term: "Bhaag (भाग) / Kaka (काका)",
        meaning: "Affectionate, respectful local address for elder shopkeepers or rickshaw drivers.",
        context: "Instantly wins warm smiles across Deccan and Peths.",
      },
    ],
    mumbai: [
      {
        term: "Bambaiya Slang (बंबइया)",
        meaning: "The unique cosmopolitan Hindi-Marathi-Gujarati fusion spoken on Mumbai streets.",
        context: "Words like 'Khallas', 'Bindaas', 'Wat lag gayi'.",
      },
      {
        term: "Cutting Chai (कटिंग चहा)",
        meaning: "Half a glass of strong, spiced ginger chai.",
        context: "The universal currency of quick conversation in Mumbai.",
      },
    ],
    bengaluru: [
      {
        term: "Macha / Guru",
        meaning: "Universal Kannada slang for 'friend' or 'mentor'.",
        context: "Used casually among friends across cafes.",
      },
      {
        term: "Oota Aaytha? (ಊಟ ಆಯ್ತಾ?)",
        meaning: "'Did you have your meals?' — the most caring Kannada greeting.",
        context: "Shows hospitality and community warmth.",
      },
    ],
  };

  const dialects = localDialectData[city.id] || localDialectData["pune"];

  const toggleAudioGuide = (siteId: string) => {
    if (activeAudioSite === siteId && isPlayingAudio) {
      setIsPlayingAudio(false);
    } else {
      setActiveAudioSite(siteId);
      setIsPlayingAudio(true);
      audioEngine.playChimeNote(659.25);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER HERO */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-slate-900 bg-slate-900/90 backdrop-blur-xl border border-purple-500/20 shadow-2xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center lg:text-left">
            <span className="px-3 py-1 rounded-full text-xs font-mono-code font-bold uppercase tracking-widest bg-purple-500/10 text-purple-400 border border-purple-500/20">
              Living Heritage & Architectural Lore
            </span>
            <h2 className="font-serif-title text-2xl md:text-3xl font-extrabold text-white">
              History, Culture & Traditions
            </h2>
            <p className="text-xs md:text-sm text-slate-300 max-w-xl">
              Step through centuries of Maratha fortresses, colonial heritage, sacred sanctuaries, and local dialects that make {city.name} unique.
            </p>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-2xl bg-black/40 border border-white/10 text-xs font-mono-code text-purple-300">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Interactive Virtual Audio Walk Engine</span>
          </div>
        </div>
      </div>

      {/* HERITAGE SITES SHOWCASE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {city.heritage.map((site) => {
          const isCurrentAudio = activeAudioSite === site.id && isPlayingAudio;
          return (
            <div
              key={site.id}
              className="rounded-3xl bg-slate-900/90 border border-white/10 hover:border-purple-500/40 shadow-xl overflow-hidden flex flex-col justify-between transition-all group duration-300"
            >
              {/* Site Image Header */}
              <div className="relative h-52 w-full overflow-hidden bg-slate-950">
                <img
                  src={site.image}
                  alt={site.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono-code font-bold uppercase bg-black/70 backdrop-blur-md text-purple-300 border border-white/10">
                    {site.era}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="font-serif-title text-lg font-bold text-white leading-tight">
                    {site.name}
                  </h3>
                  <span className="text-[11px] text-amber-300 font-mono-code">
                    Built by: {site.builtBy}
                  </span>
                </div>
              </div>

              {/* Site Body */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <p className="text-xs text-slate-300 leading-relaxed">
                  {site.significance}
                </p>

                {/* Cultural Traditions List */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-mono-code uppercase font-bold text-slate-400">
                    Local Traditions & Practices:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {site.traditions.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-lg text-[10px] font-mono-code bg-purple-950/40 text-purple-200 border border-purple-500/20"
                      >
                        • {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Visiting Hours & Entry Fee */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono-code text-slate-400">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>{site.visitingHours}</span>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-400">
                    <Ticket className="w-3.5 h-3.5" />
                    <span>{site.entryFee}</span>
                  </div>
                </div>

                {/* Virtual Audio Guide Play Button & Transcript */}
                <div className="pt-2">
                  <button
                    onClick={() => toggleAudioGuide(site.id)}
                    className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-md ${
                      isCurrentAudio
                        ? "bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30"
                        : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-600/30"
                    }`}
                  >
                    {isCurrentAudio ? (
                      <>
                        <Pause className="w-3.5 h-3.5" />
                        <span>Pause Audio Narrative</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Play Virtual Audio Walk</span>
                      </>
                    )}
                  </button>

                  {isCurrentAudio && (
                    <div className="mt-3 p-3.5 rounded-xl bg-black/60 border border-purple-500/30 text-xs text-purple-200 italic leading-relaxed animate-in fade-in duration-200">
                      &ldquo;{site.audioTranscript}&rdquo;
                    </div>
                  )}
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* LOCAL DIALECT & TRADITIONS DICTIONARY */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-white/10 shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <h3 className="font-serif-title text-lg font-bold text-white">
              Local Slang & Cultural Etiquette Guide
            </h3>
          </div>
          <span className="text-xs font-mono-code text-slate-400">
            {city.name} Cultural Dictionary
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {dialects.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2 hover:border-amber-500/30 transition-all"
            >
              <h4 className="font-bold text-sm text-amber-400 font-mono-code">
                {item.term}
              </h4>
              <p className="text-xs text-slate-200 font-medium">
                {item.meaning}
              </p>
              <p className="text-[11px] text-slate-400 italic">
                {item.context}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
