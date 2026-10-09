"use client";

import React, { useState, useEffect, useRef } from "react";
import { CityData, PlaceItem, HeritageSite, SafetyZone, CitizenReport } from "@/data/citiesData";
import {
  Layers,
  Utensils,
  Shield,
  Landmark,
  Radio,
  AlertTriangle,
  Navigation,
  Sparkles,
  Volume2,
  CheckCircle2,
  X,
  Footprints,
  Clock,
  Car,
  Eye,
  MapPin,
} from "lucide-react";
import { audioEngine } from "@/lib/audioEngine";

interface CityMapProps {
  city: CityData;
  onSelectPlace?: (place: PlaceItem) => void;
  onSelectHeritage?: (site: HeritageSite) => void;
}

export const CityMap: React.FC<CityMapProps> = ({
  city,
  onSelectPlace,
  onSelectHeritage,
}) => {
  const [activeLayers, setActiveLayers] = useState({
    food: true,
    heritage: true,
    safety: true,
    traffic: true,
    citizen: true,
  });

  const [selectedPin, setSelectedPin] = useState<{
    type: "place" | "heritage" | "safety" | "citizen";
    data: PlaceItem | HeritageSite | SafetyZone | CitizenReport;
  } | null>(null);

  const [routeMode, setRouteMode] = useState<"safest" | "fastest" | "scenic">("safest");
  const [isRoutingActive, setIsRoutingActive] = useState(false);

  // Toggle map layers
  const toggleLayer = (key: keyof typeof activeLayers) => {
    setActiveLayers((prev) => ({ ...prev, [key]: !prev[key] }));
    audioEngine.playChimeNote(659.25);
  };

  // Convert lat/lng to relative coordinate in canvas viewport box
  const bounds = {
    minLat: city.center[0] - 0.08,
    maxLat: city.center[0] + 0.08,
    minLng: city.center[1] - 0.08,
    maxLng: city.center[1] + 0.08,
  };

  const getPosPercent = (lat: number, lng: number) => {
    const y = ((bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat)) * 100;
    const x = ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * 100;
    return {
      top: `${Math.min(92, Math.max(8, y))}%`,
      left: `${Math.min(92, Math.max(8, x))}%`,
    };
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-[#0a0f1d] border border-white/10 shadow-2xl flex flex-col">
      
      {/* MAP TOP CONTROLS & LAYER BAR */}
      <div className="p-4 bg-slate-900/90 backdrop-blur-md border-b border-white/10 flex flex-wrap items-center justify-between gap-3 z-20">
        
        {/* City Info & Live Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono-code text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Live City Geolocation & Mesh Active</span>
          </div>
          <span className="hidden sm:inline text-xs text-slate-400 font-medium">
            {city.name} Center: [{city.center[0].toFixed(2)}, {city.center[1].toFixed(2)}]
          </span>
        </div>

        {/* Dynamic Layer Switchers */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-black/50 border border-white/10 rounded-2xl text-xs font-medium">
          <button
            onClick={() => toggleLayer("food")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              activeLayers.food
                ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>Food & Stays</span>
          </button>

          <button
            onClick={() => toggleLayer("heritage")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              activeLayers.heritage
                ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <Landmark className="w-3.5 h-3.5" />
            <span>Heritage</span>
          </button>

          <button
            onClick={() => toggleLayer("safety")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              activeLayers.safety
                ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Safety Heatmap</span>
          </button>

          <button
            onClick={() => toggleLayer("citizen")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              activeLayers.citizen
                ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>Citizen Pulse</span>
          </button>
        </div>

        {/* Safe Route Planner Button */}
        <button
          onClick={() => {
            setIsRoutingActive(!isRoutingActive);
            audioEngine.playChimeNote(880.0);
          }}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-md ${
            isRoutingActive
              ? "bg-emerald-600 text-white shadow-emerald-600/30"
              : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10"
          }`}
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>{isRoutingActive ? "Hide Safe Navigator" : "Plan Safe Route"}</span>
        </button>

      </div>

      {/* ROUTE COMPARATOR BAR (If Route Planning is Active) */}
      {isRoutingActive && (
        <div className="p-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 z-20 animate-in slide-in-from-top-3 duration-200">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono-code uppercase font-bold text-emerald-400">
              Smart Route Navigator:
            </span>
            <span className="text-xs text-slate-300">
              Shivajinagar Station ➔ Koregaon Park Sanctuary
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setRouteMode("safest")}
              className={`p-2 px-3 rounded-xl text-xs font-medium border transition-all ${
                routeMode === "safest"
                  ? "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold"
                  : "bg-black/30 border-white/5 text-slate-400"
              }`}
            >
              🛡️ Safest (100% Lit, CCTV) • 18 min
            </button>
            <button
              onClick={() => setRouteMode("fastest")}
              className={`p-2 px-3 rounded-xl text-xs font-medium border transition-all ${
                routeMode === "fastest"
                  ? "bg-amber-500/20 border-amber-500 text-amber-300 font-bold"
                  : "bg-black/30 border-white/5 text-slate-400"
              }`}
            >
              ⚡ Fastest (Caution: 1 Alley) • 14 min
            </button>
            <button
              onClick={() => setRouteMode("scenic")}
              className={`p-2 px-3 rounded-xl text-xs font-medium border transition-all ${
                routeMode === "scenic"
                  ? "bg-purple-500/20 border-purple-500 text-purple-300 font-bold"
                  : "bg-black/30 border-white/5 text-slate-400"
              }`}
            >
              🌿 Heritage Scenic Walk • 24 min
            </button>
          </div>
        </div>
      )}

      {/* MAP CANVAS VIEWPORT */}
      <div className="relative w-full h-[520px] md:h-[620px] bg-[#070b14] overflow-hidden select-none">
        
        {/* Dark Mode City Street Mesh SVG Background */}
        <svg className="absolute inset-0 w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(56, 189, 248, 0.15)" strokeWidth="0.8" />
              <circle cx="30" cy="30" r="1.5" fill="rgba(56, 189, 248, 0.25)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Stylized River / Geographic Arterial Lines */}
          <path
            d="M 0 350 Q 250 280, 500 380 T 1000 340 T 1500 420"
            fill="none"
            stroke="rgba(14, 165, 233, 0.4)"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <path
            d="M 120 0 L 380 700 M 720 0 L 640 700 M 0 220 L 1200 480"
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="4"
          />

          {/* Safe Route Polyline Overlay if active */}
          {isRoutingActive && (
            <g>
              {routeMode === "safest" && (
                <path
                  d="M 280 260 C 350 240, 480 290, 720 320"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="6"
                  strokeDasharray="8 4"
                  className="animate-pulse"
                />
              )}
              {routeMode === "fastest" && (
                <path
                  d="M 280 260 L 520 280 L 720 320"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="5"
                  strokeDasharray="6 3"
                />
              )}
              {routeMode === "scenic" && (
                <path
                  d="M 280 260 C 320 180, 540 160, 720 320"
                  fill="none"
                  stroke="#c084fc"
                  strokeWidth="5"
                  strokeDasharray="4 4"
                />
              )}
            </g>
          )}
        </svg>

        {/* LAYER 1: SAFETY HAZARDS & HEATMAP ZONES */}
        {activeLayers.safety &&
          city.safetyZones.map((zone) => {
            const pos = getPosPercent(zone.lat, zone.lng);
            return (
              <div
                key={zone.id}
                style={{ top: pos.top, left: pos.left }}
                onClick={() => setSelectedPin({ type: "safety", data: zone })}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
              >
                {/* Pulsing Safety Perimeter Circle */}
                <div
                  className={`w-28 h-28 rounded-full -translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 pointer-events-none ${
                    zone.riskLevel === "High Alert"
                      ? "bg-rose-500/20 border border-rose-500/40 animate-ping"
                      : zone.riskLevel === "Moderate"
                      ? "bg-amber-500/15 border border-amber-500/30"
                      : "bg-emerald-500/15 border border-emerald-500/30"
                  }`}
                  style={{ animationDuration: "3s" }}
                />
                
                <div
                  className={`relative p-2.5 rounded-2xl border shadow-xl flex items-center gap-1.5 transition-all group-hover:scale-110 ${
                    zone.riskLevel === "High Alert"
                      ? "bg-rose-950/90 border-rose-500 text-rose-300"
                      : zone.riskLevel === "Moderate"
                      ? "bg-amber-950/90 border-amber-500 text-amber-300"
                      : "bg-emerald-950/90 border-emerald-500 text-emerald-300"
                  }`}
                >
                  <Shield className="w-4 h-4" />
                  <span className="text-[11px] font-bold font-mono-code whitespace-nowrap">
                    {zone.name.split(" ")[0]} ({zone.safetyIndex}%)
                  </span>
                </div>
              </div>
            );
          })}

        {/* LAYER 2: FOOD & HOSPITALITY PINS */}
        {activeLayers.food &&
          city.places.map((place) => {
            const pos = getPosPercent(place.lat, place.lng);
            return (
              <div
                key={place.id}
                style={{ top: pos.top, left: pos.left }}
                onClick={() => setSelectedPin({ type: "place", data: place })}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
              >
                <div className="p-2 rounded-2xl bg-amber-500 text-black font-bold shadow-lg shadow-amber-500/30 flex items-center gap-1.5 transition-all group-hover:scale-125 group-hover:bg-amber-400">
                  <Utensils className="w-3.5 h-3.5" />
                  <span className="text-[10px] whitespace-nowrap max-w-[120px] truncate">
                    {place.name.split(" ")[0]}
                  </span>
                  <span className="text-[9px] bg-black text-amber-400 px-1 rounded-md">
                    ★{place.rating}
                  </span>
                </div>
              </div>
            );
          })}

        {/* LAYER 3: HERITAGE & CULTURE PINS */}
        {activeLayers.heritage &&
          city.heritage.map((site) => {
            const pos = getPosPercent(site.lat, site.lng);
            return (
              <div
                key={site.id}
                style={{ top: pos.top, left: pos.left }}
                onClick={() => setSelectedPin({ type: "heritage", data: site })}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
              >
                <div className="p-2 rounded-2xl bg-purple-600 text-white font-bold shadow-lg shadow-purple-600/30 flex items-center gap-1.5 transition-all group-hover:scale-125 group-hover:bg-purple-500">
                  <Landmark className="w-3.5 h-3.5" />
                  <span className="text-[10px] whitespace-nowrap max-w-[120px] truncate">
                    {site.name.split(" ")[0]}
                  </span>
                </div>
              </div>
            );
          })}

        {/* LAYER 4: CITIZEN INCIDENT REPORTS */}
        {activeLayers.citizen &&
          city.citizenReports.map((report) => {
            const pos = getPosPercent(report.lat, report.lng);
            return (
              <div
                key={report.id}
                style={{ top: pos.top, left: pos.left }}
                onClick={() => setSelectedPin({ type: "citizen", data: report })}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
              >
                <div className="p-2 rounded-2xl bg-cyan-600 text-white font-bold shadow-lg shadow-cyan-600/30 flex items-center gap-1.5 transition-all group-hover:scale-125 group-hover:bg-cyan-500">
                  <Radio className="w-3.5 h-3.5 animate-pulse" />
                  <span className="text-[10px] whitespace-nowrap max-w-[120px] truncate">
                    {report.category}
                  </span>
                </div>
              </div>
            );
          })}

        {/* SELECTED PIN DETAILS DRAWER / MODAL */}
        {selectedPin && (
          <div className="absolute bottom-4 left-4 right-4 md:right-auto md:w-96 z-30 p-5 rounded-3xl bg-slate-900/95 backdrop-blur-xl border border-white/15 shadow-2xl space-y-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono-code font-bold uppercase tracking-wider text-cyan-400">
                  {selectedPin.type === "place"
                    ? "Hospitality Landmark"
                    : selectedPin.type === "heritage"
                    ? "Heritage & Culture"
                    : selectedPin.type === "safety"
                    ? "Safety Corridor Alert"
                    : "Citizen Incident Report"}
                </span>
                <h4 className="font-serif-title text-base font-bold text-white">
                  {"name" in selectedPin.data
                    ? selectedPin.data.name
                    : "title" in selectedPin.data
                    ? selectedPin.data.title
                    : "Incident"}
                </h4>
              </div>
              <button
                onClick={() => setSelectedPin(null)}
                className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content per type */}
            {selectedPin.type === "place" && (
              <div className="space-y-2 text-xs text-slate-300">
                <p className="leading-relaxed line-clamp-2">
                  {(selectedPin.data as PlaceItem).description}
                </p>
                <div className="flex items-center justify-between pt-1 font-mono-code text-[11px]">
                  <span className="text-amber-400">
                    Cleanliness: {(selectedPin.data as PlaceItem).cleanlinessScore}/10
                  </span>
                  <span className="text-emerald-400">
                    Safety: {(selectedPin.data as PlaceItem).safetyScore}/10
                  </span>
                </div>
              </div>
            )}

            {selectedPin.type === "heritage" && (
              <div className="space-y-2 text-xs text-slate-300">
                <p className="leading-relaxed line-clamp-2">
                  {(selectedPin.data as HeritageSite).significance}
                </p>
                <button
                  onClick={() => audioEngine.playChimeNote(783.99)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Play Virtual Audio Walk</span>
                </button>
              </div>
            )}

            {selectedPin.type === "safety" && (
              <div className="space-y-2 text-xs text-slate-300">
                <div className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-500/20 text-rose-200">
                  <strong>Safer Alternative:</strong>{" "}
                  {(selectedPin.data as SafetyZone).saferAlternative}
                </div>
                <div className="text-[11px] font-mono-code text-slate-400">
                  Lighting Score: {(selectedPin.data as SafetyZone).lightingScore}/10 • Patrol: {(selectedPin.data as SafetyZone).policePatrolScore}/10
                </div>
              </div>
            )}

            {selectedPin.type === "citizen" && (
              <div className="space-y-2 text-xs text-slate-300">
                <p className="leading-relaxed">
                  {(selectedPin.data as CitizenReport).description}
                </p>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>{(selectedPin.data as CitizenReport).locationName}</span>
                  <span className="text-cyan-400 font-bold">
                    {(selectedPin.data as CitizenReport).upvotes} Upvotes Verified
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
};
