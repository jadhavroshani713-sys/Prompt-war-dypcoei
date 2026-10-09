"use client";

import React from "react";
import { CITIES, CityData } from "@/data/citiesData";
import {
  Sparkles,
  MapPin,
  Utensils,
  Landmark,
  ShieldAlert,
  Scale,
  Activity,
  Bot,
  Volume2,
  VolumeX,
  PhoneCall,
  CloudSun,
} from "lucide-react";

export type CityTabType =
  | "map"
  | "food"
  | "heritage"
  | "safety"
  | "matrix"
  | "pulse"
  | "copilot";

interface CityNavbarProps {
  selectedCityId: string;
  onSelectCity: (cityId: string) => void;
  activeTab: CityTabType;
  onSelectTab: (tab: CityTabType) => void;
  isAudioMuted: boolean;
  onToggleMute: () => void;
  onTriggerSOS: () => void;
}

export const CityNavbar: React.FC<CityNavbarProps> = ({
  selectedCityId,
  onSelectCity,
  activeTab,
  onSelectTab,
  isAudioMuted,
  onToggleMute,
  onTriggerSOS,
}) => {
  const currentCity = CITIES[selectedCityId] || CITIES["pune"];

  return (
    <header className="sticky top-0 z-50 w-full px-4 py-3 bg-[#07090e]/90 backdrop-blur-xl border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col xl:flex-row items-center justify-between gap-4">
        
        {/* LOGO & CITY DROPDOWN */}
        <div className="flex items-center justify-between w-full xl:w-auto gap-4">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-amber-500 p-[1px] shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[15px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif-title text-base md:text-lg font-bold tracking-wider text-slate-100">
                  CITY LIFE NAVIGATOR
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono-code font-bold rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  Smart AI
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Exploring, Experiencing & Navigating the Chaos We Call Home
              </p>
            </div>
          </div>

          {/* City Selector Dropdown */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-white/10 rounded-2xl">
            <MapPin className="w-3.5 h-3.5 text-amber-400 ml-2" />
            <select
              value={selectedCityId}
              onChange={(e) => onSelectCity(e.target.value)}
              className="px-2 py-1.5 rounded-xl bg-transparent text-white font-bold text-xs focus:outline-none cursor-pointer"
            >
              <option value="pune" className="bg-slate-900 text-white">Pune (Host City)</option>
              <option value="mumbai" className="bg-slate-900 text-white">Mumbai</option>
              <option value="bengaluru" className="bg-slate-900 text-white">Bengaluru</option>
            </select>
          </div>
        </div>

        {/* PRIMARY MODULE TABS */}
        <nav className="flex items-center gap-1 overflow-x-auto w-full xl:w-auto p-1 bg-slate-900/90 border border-white/10 rounded-2xl shadow-inner scrollbar-none">
          <button
            onClick={() => onSelectTab("map")}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
              activeTab === "map"
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-md shadow-cyan-500/25"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Interactive Map</span>
          </button>

          <button
            onClick={() => onSelectTab("food")}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
              activeTab === "food"
                ? "bg-gradient-to-r from-amber-500 to-rose-600 text-white font-bold shadow-md shadow-amber-500/25"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>Food & Stays</span>
          </button>

          <button
            onClick={() => onSelectTab("heritage")}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
              activeTab === "heritage"
                ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold shadow-md shadow-purple-500/25"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Landmark className="w-3.5 h-3.5" />
            <span>History & Culture</span>
          </button>

          <button
            onClick={() => onSelectTab("safety")}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
              activeTab === "safety"
                ? "bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold shadow-md shadow-rose-500/25"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Safety & Detour</span>
          </button>

          <button
            onClick={() => onSelectTab("matrix")}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
              activeTab === "matrix"
                ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-bold shadow-md shadow-indigo-500/25"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Best vs. Worst</span>
          </button>

          <button
            onClick={() => onSelectTab("pulse")}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
              activeTab === "pulse"
                ? "bg-gradient-to-r from-sky-500 to-teal-600 text-white font-bold shadow-md shadow-sky-500/25"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>City Pulse</span>
          </button>

          <button
            onClick={() => onSelectTab("copilot")}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
              activeTab === "copilot"
                ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold shadow-md shadow-emerald-500/25"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>AI Copilot</span>
          </button>
        </nav>

        {/* WEATHER PILL, SOS EMERGENCY, AND AUDIO */}
        <div className="flex items-center gap-2.5">
          {/* Weather Pill */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-2xl bg-black/40 border border-white/10 text-xs font-mono-code">
            <CloudSun className="w-4 h-4 text-amber-400" />
            <span>{currentCity.weather.temp}°C</span>
            <span className="text-emerald-400">AQI {currentCity.weather.aqi}</span>
          </div>

          {/* SOS Trigger */}
          <button
            onClick={onTriggerSOS}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-600/30 transition-all animate-pulse"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>SOS 112</span>
          </button>

          {/* Audio Master */}
          <button
            onClick={onToggleMute}
            className={`p-2 rounded-2xl border transition-all ${
              !isAudioMuted
                ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-400"
                : "bg-slate-900 border-white/10 text-slate-400 hover:text-white"
            }`}
            title="Toggle Ambient Procedural Audio"
          >
            {isAudioMuted ? (
              <VolumeX className="w-4 h-4 text-rose-400" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
