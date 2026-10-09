"use client";

import React, { useState, useEffect } from "react";
import { CITIES, CityData, CitizenReport } from "@/data/citiesData";
import { CityNavbar, CityTabType } from "@/components/CityNavbar";
import { CityMap } from "@/components/CityMap";
import { ExplorationHospitality } from "@/components/ExplorationHospitality";
import { HistoryCulture } from "@/components/HistoryCulture";
import { SafetyNavigator } from "@/components/SafetyNavigator";
import { BestVsWorstMatrix } from "@/components/BestVsWorstMatrix";
import { SmartCityPulse } from "@/components/SmartCityPulse";
import { CityAiCopilot } from "@/components/CityAiCopilot";
import { audioEngine } from "@/lib/audioEngine";
import {
  Sparkles,
  MapPin,
  Utensils,
  Landmark,
  ShieldAlert,
  Scale,
  Activity,
  Bot,
  Compass,
  ArrowRight,
} from "lucide-react";

export default function HomePage() {
  const [selectedCityId, setSelectedCityId] = useState<string>("pune");
  const [activeTab, setActiveTab] = useState<CityTabType>("map");
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);

  const currentCity = CITIES[selectedCityId] || CITIES["pune"];

  // Initialize Web Audio on first user gesture
  useEffect(() => {
    const handleGesture = () => {
      if (!audioStarted) {
        audioEngine.init();
        audioEngine.resume();
        audioEngine.updateMixer({
          masterVolume: 0.5,
          isMuted: false,
          hearthFire: 0.2,
          stormRain: 0.15,
          cosmicDrone: 0.2,
          urbanEcho: 0.35,
          zenChimes: 0.3,
          forestWind: 0.25,
        });
        setAudioStarted(true);
      }
    };

    window.addEventListener("click", handleGesture, { once: true });
    window.addEventListener("keydown", handleGesture, { once: true });

    return () => {
      window.removeEventListener("click", handleGesture);
      window.removeEventListener("keydown", handleGesture);
    };
  }, [audioStarted]);

  const handleToggleMute = () => {
    if (!audioStarted) {
      audioEngine.init();
      audioEngine.resume();
      setAudioStarted(true);
    }
    setIsAudioMuted(!isAudioMuted);
    audioEngine.updateMixer({
      masterVolume: 0.5,
      isMuted: !isAudioMuted,
      hearthFire: 0.2,
      stormRain: 0.15,
      cosmicDrone: 0.2,
      urbanEcho: 0.35,
      zenChimes: 0.3,
      forestWind: 0.25,
    });
  };

  const handleSelectCity = (cityId: string) => {
    setSelectedCityId(cityId);
    audioEngine.playChimeNote(659.25);
  };

  const handleSelectTab = (tab: CityTabType) => {
    setActiveTab(tab);
    audioEngine.playChimeNote(783.99);
  };

  const handleAddReport = (report: CitizenReport) => {
    currentCity.citizenReports = [report, ...currentCity.citizenReports];
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#07090e] text-slate-100 relative overflow-hidden">
      
      {/* AMBIENT AURORA BLUR CIRCLES */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[550px] h-[550px] bg-amber-600/10 rounded-full blur-[160px] pointer-events-none" />

      {/* TOP NAVBAR */}
      <CityNavbar
        selectedCityId={selectedCityId}
        onSelectCity={handleSelectCity}
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        isAudioMuted={isAudioMuted}
        onToggleMute={handleToggleMute}
        onTriggerSOS={() => handleSelectTab("safety")}
      />

      {/* CITY BANNER STRIP */}
      <div className="w-full max-w-7xl mx-auto px-4 pt-4">
        <div className="p-4 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-mono-code text-slate-300">
              Active Urban Mesh: <strong className="text-amber-400">{currentCity.name}, {currentCity.state}</strong>
            </span>
            <span className="hidden md:inline text-slate-500">— {currentCity.tagline}</span>
          </div>

          <div className="flex items-center gap-3 font-mono-code text-[11px] text-slate-400">
            <span>Traffic: <strong className="text-amber-400">{currentCity.trafficStats.congestionLevel}%</strong></span>
            <span>Avg Speed: <strong className="text-cyan-400">{currentCity.trafficStats.avgSpeedKmh} km/h</strong></span>
            <span>Safety Mesh: <strong className="text-emerald-400">Online</strong></span>
          </div>
        </div>
      </div>

      {/* MAIN DYNAMIC CONTENT CONTAINER */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 py-6">
        {activeTab === "map" && <CityMap city={currentCity} />}

        {activeTab === "food" && <ExplorationHospitality city={currentCity} />}

        {activeTab === "heritage" && <HistoryCulture city={currentCity} />}

        {activeTab === "safety" && (
          <SafetyNavigator city={currentCity} onAddReport={handleAddReport} />
        )}

        {activeTab === "matrix" && <BestVsWorstMatrix city={currentCity} />}

        {activeTab === "pulse" && <SmartCityPulse city={currentCity} />}

        {activeTab === "copilot" && <CityAiCopilot city={currentCity} />}
      </div>

      {/* FOOTER */}
      <footer className="w-full px-4 py-8 bg-[#05070a] border-t border-white/10 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="font-serif-title font-bold text-sm text-slate-100">
                CITY LIFE: EXPLORING, EXPERIENCING & NAVIGATING THE CHAOS WE CALL HOME
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Transforming scattered urban data, safety heatmaps, and citizen reports into verified, actionable intelligence.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono-code text-slate-400">
            <button onClick={() => handleSelectTab("map")} className="hover:text-cyan-400">
              Interactive Map
            </button>
            <button onClick={() => handleSelectTab("food")} className="hover:text-amber-400">
              Food & Stays
            </button>
            <button onClick={() => handleSelectTab("heritage")} className="hover:text-purple-400">
              Heritage
            </button>
            <button onClick={() => handleSelectTab("safety")} className="hover:text-rose-400">
              Safety Radar
            </button>
            <button onClick={() => handleSelectTab("matrix")} className="hover:text-indigo-400">
              Urban Matrix
            </button>
            <button onClick={() => handleSelectTab("pulse")} className="hover:text-sky-400">
              Telemetry
            </button>
            <button onClick={() => handleSelectTab("copilot")} className="hover:text-emerald-400">
              AI Copilot
            </button>
          </div>

          <div className="text-[11px] font-mono-code text-slate-500">
            Built for DYPCOEI Prompt War • Next.js & AI Edition
          </div>
        </div>
      </footer>

    </main>
  );
}
