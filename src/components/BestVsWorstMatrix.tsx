"use client";

import React, { useState } from "react";
import { CityData, AreaBenchmark } from "@/data/citiesData";
import {
  Scale,
  Sparkles,
  Shield,
  Sparkle,
  DollarSign,
  Bus,
  Trees,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
} from "lucide-react";
import { audioEngine } from "@/lib/audioEngine";

interface BestVsWorstMatrixProps {
  city: CityData;
}

export const BestVsWorstMatrix: React.FC<BestVsWorstMatrixProps> = ({ city }) => {
  const benchmarks = city.benchmarks;
  const [area1Id, setArea1Id] = useState<string>(benchmarks[0]?.id || "");
  const [area2Id, setArea2Id] = useState<string>(benchmarks[1]?.id || benchmarks[0]?.id || "");

  const area1 = benchmarks.find((b) => b.id === area1Id) || benchmarks[0];
  const area2 = benchmarks.find((b) => b.id === area2Id) || benchmarks[1];

  const metrics: Array<{
    key: keyof Pick<
      AreaBenchmark,
      "safety" | "cleanliness" | "affordability" | "accessibility" | "greeneryAQI"
    >;
    label: string;
    icon: typeof Shield;
    color1: string;
    color2: string;
  }> = [
    { key: "safety", label: "Safety & Night Security", icon: Shield, color1: "bg-emerald-500", color2: "bg-teal-500" },
    { key: "cleanliness", label: "Cleanliness & Sanitation", icon: Sparkles, color1: "bg-cyan-500", color2: "bg-blue-500" },
    { key: "affordability", label: "Affordability & Cost Index", icon: DollarSign, color1: "bg-amber-500", color2: "bg-orange-500" },
    { key: "accessibility", label: "Transit & Walkability", icon: Bus, color1: "bg-purple-500", color2: "bg-indigo-500" },
    { key: "greeneryAQI", label: "Green Canopy & Air Quality", icon: Trees, color1: "bg-lime-500", color2: "bg-green-500" },
  ];

  return (
    <div className="space-y-6">
      
      {/* HEADER HERO */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-slate-900 bg-slate-900/90 backdrop-blur-xl border border-indigo-500/20 shadow-2xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center lg:text-left">
            <span className="px-3 py-1 rounded-full text-xs font-mono-code font-bold uppercase tracking-widest bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Urban Comparative Benchmark
            </span>
            <h2 className="font-serif-title text-2xl md:text-3xl font-extrabold text-white">
              Best vs. Worst Places: Urban Matrix
            </h2>
            <p className="text-xs md:text-sm text-slate-300 max-w-xl">
              Compare {city.name} neighborhoods side-by-side across verified safety, hygiene, cost of living, transit access, and air quality indices.
            </p>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-2xl bg-black/40 border border-white/10 text-xs font-mono-code text-indigo-300">
            <Scale className="w-4 h-4 text-indigo-400" />
            <span>5-Dimensional Objective Analytics</span>
          </div>
        </div>
      </div>

      {/* NEIGHBORHOOD SELECTORS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Selector 1 */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-cyan-500/30 flex items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-cyan-400" />
            <span className="text-xs font-mono-code uppercase font-bold text-cyan-300">
              Locality A:
            </span>
          </div>
          <select
            value={area1Id}
            onChange={(e) => {
              setArea1Id(e.target.value);
              audioEngine.playChimeNote(587.33);
            }}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs font-bold focus:outline-none focus:border-cyan-400"
          >
            {benchmarks.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name} (Score: {b.overallScore}%)
              </option>
            ))}
          </select>
        </div>

        {/* Selector 2 */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-amber-500/30 flex items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-400" />
            <span className="text-xs font-mono-code uppercase font-bold text-amber-300">
              Locality B:
            </span>
          </div>
          <select
            value={area2Id}
            onChange={(e) => {
              setArea2Id(e.target.value);
              audioEngine.playChimeNote(783.99);
            }}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs font-bold focus:outline-none focus:border-amber-400"
          >
            {benchmarks.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name} (Score: {b.overallScore}%)
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* METRIC COMPARISON MATRIX */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-white/10 shadow-2xl space-y-6">
        <h3 className="font-serif-title text-base font-bold text-white flex items-center gap-2">
          <Scale className="w-4 h-4 text-amber-400" />
          <span>Multi-Dimensional Index Comparison</span>
        </h3>

        <div className="space-y-5">
          {metrics.map((m) => {
            const val1 = area1 ? area1[m.key] : 0;
            const val2 = area2 ? area2[m.key] : 0;
            const diff = val1 - val2;
            const IconComp = m.icon;

            return (
              <div key={m.key} className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-200 font-bold">
                    <IconComp className="w-4 h-4 text-indigo-400" />
                    <span>{m.label}</span>
                  </div>

                  <div className="flex items-center gap-3 font-mono-code text-[11px]">
                    <span className="text-cyan-400 font-bold">
                      {area1.name.split(" ")[0]}: {val1}%
                    </span>
                    <span className="text-slate-600">vs</span>
                    <span className="text-amber-400 font-bold">
                      {area2.name.split(" ")[0]}: {val2}%
                    </span>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        diff > 0
                          ? "bg-cyan-500/20 text-cyan-300"
                          : diff < 0
                          ? "bg-amber-500/20 text-amber-300"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {diff > 0 ? `+${diff}% A` : diff < 0 ? `+${Math.abs(diff)}% B` : "Tie"}
                    </span>
                  </div>
                </div>

                {/* Comparative Double Bars */}
                <div className="space-y-1.5 pt-1">
                  <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                      style={{ width: `${val1}%` }}
                    />
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-rose-500 transition-all duration-500"
                      style={{ width: `${val2}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* DETAILED SIDE-BY-SIDE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card Locality A */}
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-cyan-500/30 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-[10px] font-mono-code font-bold uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Locality A Profile
            </span>
            <span className="font-mono-code text-base font-extrabold text-cyan-400">
              ★ {area1.overallScore}/100 Overall
            </span>
          </div>

          <div>
            <h3 className="font-serif-title text-xl font-bold text-white">
              {area1.name}
            </h3>
            <p className="text-xs text-amber-300 font-medium italic mt-0.5">
              {area1.tagline}
            </p>
          </div>

          {/* Pros */}
          <div className="space-y-1.5 pt-2">
            <span className="text-[11px] font-mono-code uppercase font-bold text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Key Strengths:</span>
            </span>
            <ul className="space-y-1 text-xs text-slate-300 list-disc list-inside">
              {area1.pros.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>

          {/* Cons */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-mono-code uppercase font-bold text-rose-400 flex items-center gap-1">
              <XCircle className="w-3.5 h-3.5" />
              <span>Urban Friction / Trade-offs:</span>
            </span>
            <ul className="space-y-1 text-xs text-slate-300 list-disc list-inside">
              {area1.cons.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>

          <div className="p-3 rounded-2xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-cyan-200">
            <strong>Ideal For:</strong> {area1.idealFor}
          </div>
        </div>

        {/* Card Locality B */}
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-amber-500/30 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-[10px] font-mono-code font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Locality B Profile
            </span>
            <span className="font-mono-code text-base font-extrabold text-amber-400">
              ★ {area2.overallScore}/100 Overall
            </span>
          </div>

          <div>
            <h3 className="font-serif-title text-xl font-bold text-white">
              {area2.name}
            </h3>
            <p className="text-xs text-amber-300 font-medium italic mt-0.5">
              {area2.tagline}
            </p>
          </div>

          {/* Pros */}
          <div className="space-y-1.5 pt-2">
            <span className="text-[11px] font-mono-code uppercase font-bold text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Key Strengths:</span>
            </span>
            <ul className="space-y-1 text-xs text-slate-300 list-disc list-inside">
              {area2.pros.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>

          {/* Cons */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-mono-code uppercase font-bold text-rose-400 flex items-center gap-1">
              <XCircle className="w-3.5 h-3.5" />
              <span>Urban Friction / Trade-offs:</span>
            </span>
            <ul className="space-y-1 text-xs text-slate-300 list-disc list-inside">
              {area2.cons.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>

          <div className="p-3 rounded-2xl bg-amber-950/30 border border-amber-500/20 text-xs text-amber-200">
            <strong>Ideal For:</strong> {area2.idealFor}
          </div>
        </div>

      </div>

    </div>
  );
};
