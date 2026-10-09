"use client";

import React, { useState } from "react";
import { CityData, CitizenReport } from "@/data/citiesData";
import {
  Activity,
  CloudRain,
  Wind,
  Gauge,
  Car,
  Radio,
  ThumbsUp,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  AlertCircle,
  Clock,
  MapPin,
} from "lucide-react";
import { audioEngine } from "@/lib/audioEngine";

interface SmartCityPulseProps {
  city: CityData;
  onUpvoteReport?: (id: string) => void;
}

export const SmartCityPulse: React.FC<SmartCityPulseProps> = ({
  city,
  onUpvoteReport,
}) => {
  const [reports, setReports] = useState<CitizenReport[]>(city.citizenReports);
  const [upvotedMap, setUpvotedMap] = useState<Record<string, boolean>>({});

  const handleUpvote = (id: string) => {
    if (upvotedMap[id]) return;
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, upvotes: r.upvotes + 1 } : r))
    );
    setUpvotedMap((prev) => ({ ...prev, [id]: true }));
    audioEngine.playChimeNote(880.0);
    if (onUpvoteReport) onUpvoteReport(id);
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER HERO */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-slate-900 bg-slate-900/90 backdrop-blur-xl border border-cyan-500/20 shadow-2xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center lg:text-left">
            <span className="px-3 py-1 rounded-full text-xs font-mono-code font-bold uppercase tracking-widest bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              Real-Time Telemetry & Citizen Data
            </span>
            <h2 className="font-serif-title text-2xl md:text-3xl font-extrabold text-white">
              Smart City Live Pulse
            </h2>
            <p className="text-xs md:text-sm text-slate-300 max-w-xl">
              Real-time traffic congestion, microclimate weather radars, air quality sensors, and community-verified citizen reports across {city.name}.
            </p>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-2xl bg-black/40 border border-white/10 text-xs font-mono-code text-cyan-300">
            <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>Telemetry Streams Synchronized</span>
          </div>
        </div>
      </div>

      {/* TOP 3 METRIC TILES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Tile 1: Weather & Microclimate */}
        <div className="p-6 rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-code uppercase font-bold text-sky-400 flex items-center gap-1.5">
              <CloudRain className="w-4 h-4" />
              <span>Microclimate Radar</span>
            </span>
            <span className="text-xs font-mono-code text-slate-400">Live</span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="font-serif-title text-4xl font-extrabold text-white">
              {city.weather.temp}°C
            </span>
            <span className="text-xs text-slate-300 font-medium">
              {city.weather.condition}
            </span>
          </div>

          <div className="space-y-2 pt-1 text-xs">
            <div className="flex items-center justify-between text-slate-400 font-mono-code">
              <span>Humidity: {city.weather.humidity}%</span>
              <span>Wind: 14 km/h NW</span>
            </div>
            <div className="p-2.5 rounded-xl bg-sky-950/40 border border-sky-500/20 text-[11px] text-sky-200">
              ☔ {city.weather.rainForecast}
            </div>
          </div>
        </div>

        {/* Tile 2: Air Quality Index */}
        <div className="p-6 rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-code uppercase font-bold text-emerald-400 flex items-center gap-1.5">
              <Wind className="w-4 h-4" />
              <span>Air Quality Index (AQI)</span>
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono-code bg-emerald-500/20 text-emerald-400">
              {city.weather.aqiStatus}
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="font-serif-title text-4xl font-extrabold text-white">
              {city.weather.aqi}
            </span>
            <span className="text-xs text-slate-400 font-mono-code">
              PM2.5: 18 µg/m³
            </span>
          </div>

          {/* AQI Bar */}
          <div className="space-y-2 pt-1">
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-lime-500"
                style={{ width: `${Math.min(100, (city.weather.aqi / 200) * 100)}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400">
              Safe for outdoor activities, morning cycling, and open cafe dining.
            </p>
          </div>
        </div>

        {/* Tile 3: Traffic & Congestion Index */}
        <div className="p-6 rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-code uppercase font-bold text-amber-400 flex items-center gap-1.5">
              <Car className="w-4 h-4" />
              <span>Traffic Congestion Index</span>
            </span>
            <span className="text-xs font-mono-code text-slate-400">
              {city.trafficStats.avgSpeedKmh} km/h avg
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="font-serif-title text-4xl font-extrabold text-white">
              {city.trafficStats.congestionLevel}%
            </span>
            <span className="text-xs text-slate-300 font-medium">
              Moderate Flow
            </span>
          </div>

          <div className="space-y-2 pt-1 text-xs">
            <div className="flex items-center justify-between text-slate-400 font-mono-code">
              <span>Active Bottlenecks: {city.trafficStats.activeBottlenecks}</span>
              <span className="text-emerald-400">Metro: 100% On-Time</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500"
                style={{ width: `${city.trafficStats.congestionLevel}%` }}
              />
            </div>
          </div>
        </div>

      </div>

      {/* CITIZEN REPORTS LIVE FEED */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-white/10 shadow-2xl space-y-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-cyan-400 animate-pulse" />
            <h3 className="font-serif-title text-base font-bold text-white">
              Citizen Verified Live Wire
            </h3>
          </div>
          <span className="text-xs font-mono-code text-slate-400">
            Powered by NLP Sentiment & Citizen Upvotes
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reports.map((report) => {
            const hasUpvoted = upvotedMap[report.id];
            return (
              <div
                key={report.id}
                className="p-5 rounded-2xl bg-black/40 border border-white/5 hover:border-cyan-500/30 transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-code font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      {report.category}
                    </span>
                    <span className="text-[10px] font-mono-code text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{report.timestamp}</span>
                    </span>
                  </div>

                  <h4 className="font-serif-title text-sm font-bold text-white leading-snug">
                    {report.title}
                  </h4>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {report.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono-code">
                  <div className="flex items-center gap-1 text-slate-400 text-[11px] truncate max-w-[180px]">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    <span className="truncate">{report.locationName}</span>
                  </div>

                  <button
                    onClick={() => handleUpvote(report.id)}
                    disabled={hasUpvoted}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[11px] transition-all ${
                      hasUpvoted
                        ? "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold"
                        : "bg-white/5 hover:bg-white/10 border-white/10 text-slate-300 hover:text-white"
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{report.upvotes} {hasUpvoted ? "Verified" : "Verify"}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
