"use client";

import React from "react";
import { RealmType } from "./ThreeCanvas";
import {
  Compass,
  Headphones,
  Anchor,
  Globe,
  Brain,
  Home,
  Volume2,
  VolumeX,
  Sparkles,
  Info,
} from "lucide-react";

export type ViewMode = "explore" | "experience" | "navigate";

interface NavbarProps {
  currentMode: ViewMode;
  onSelectMode: (mode: ViewMode) => void;
  currentRealm: RealmType;
  onSelectRealm: (realm: RealmType) => void;
  isAudioMuted: boolean;
  onToggleMute: () => void;
  onOpenAbout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentMode,
  onSelectMode,
  currentRealm,
  onSelectRealm,
  isAudioMuted,
  onToggleMute,
  onOpenAbout,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full px-4 py-3 bg-[#07090e]/80 backdrop-blur-xl border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* LOGO & THEME TAG */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-cyan-500 p-[1px] shadow-lg shadow-amber-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif-title text-base md:text-lg font-bold tracking-wider text-slate-100">
                THE CHAOS WE CALL HOME
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono-code font-semibold tracking-widest uppercase rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                v2.0
              </span>
            </div>
            <p className="text-[11px] text-slate-400 tracking-wide">
              Exploring, Experiencing & Navigating the Orbit of Belonging
            </p>
          </div>
        </div>

        {/* PRIMARY MODE TABS */}
        <nav className="flex items-center gap-1 p-1 bg-slate-900/90 border border-white/10 rounded-2xl shadow-inner">
          <button
            onClick={() => onSelectMode("explore")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs md:text-sm font-medium transition-all ${
              currentMode === "explore"
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25"
                : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Explore</span>
          </button>

          <button
            onClick={() => onSelectMode("experience")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs md:text-sm font-medium transition-all ${
              currentMode === "experience"
                ? "bg-gradient-to-r from-amber-500 to-rose-600 text-white shadow-md shadow-amber-500/25"
                : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
            }`}
          >
            <Headphones className="w-4 h-4" />
            <span>Experience</span>
          </button>

          <button
            onClick={() => onSelectMode("navigate")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs md:text-sm font-medium transition-all ${
              currentMode === "navigate"
                ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md shadow-purple-500/25"
                : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
            }`}
          >
            <Anchor className="w-4 h-4" />
            <span>Navigate</span>
          </button>
        </nav>

        {/* REALM PILLS & SOUND CONTROLLER */}
        <div className="flex items-center gap-2">
          {/* Sphere Realm Switcher */}
          <div className="flex items-center p-1 bg-slate-900/80 border border-white/10 rounded-xl">
            <button
              onClick={() => onSelectRealm("earth")}
              title="Earth: Pale Blue Dot"
              className={`p-2 rounded-lg transition-all ${
                currentRealm === "earth"
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Globe className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSelectRealm("mind")}
              title="Mind: Thought Sanctuary"
              className={`p-2 rounded-lg transition-all ${
                currentRealm === "mind"
                  ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Brain className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSelectRealm("domestic")}
              title="Domestic: The Warm Hearth"
              className={`p-2 rounded-lg transition-all ${
                currentRealm === "domestic"
                  ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Home className="w-4 h-4" />
            </button>
          </div>

          {/* Sound Mute Toggle */}
          <button
            onClick={onToggleMute}
            title={isAudioMuted ? "Unmute Ambient Soundscape" : "Mute Soundscape"}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono-code transition-all border ${
              !isAudioMuted
                ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400 shadow-sm shadow-emerald-500/20"
                : "bg-slate-900 border-white/10 text-slate-400 hover:text-slate-200"
            }`}
          >
            {isAudioMuted ? (
              <>
                <VolumeX className="w-4 h-4 text-rose-400" />
                <span className="hidden sm:inline">Muted</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span className="hidden sm:inline">Audio On</span>
              </>
            )}
          </button>

          {/* Philosophy / About Modal */}
          <button
            onClick={onOpenAbout}
            title="About Theme & Manifesto"
            className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-all"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
};
