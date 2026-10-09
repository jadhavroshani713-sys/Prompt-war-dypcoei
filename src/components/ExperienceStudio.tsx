"use client";

import React, { useState } from "react";
import { AudioMixerState, audioEngine } from "@/lib/audioEngine";
import { AudioVisualizerCanvas } from "./AudioVisualizerCanvas";
import {
  Flame,
  CloudRain,
  Radio,
  Building2,
  Bell,
  Wind,
  Sparkles,
  Play,
  RotateCcw,
  Sliders,
  Activity,
  Layers,
  Zap,
} from "lucide-react";

interface ExperienceStudioProps {
  mixerState: AudioMixerState;
  onUpdateMixer: (state: AudioMixerState) => void;
}

export const ExperienceStudio: React.FC<ExperienceStudioProps> = ({
  mixerState,
  onUpdateMixer,
}) => {
  const [visualizerStyle, setVisualizerStyle] = useState<"radial" | "wave" | "bars">("radial");
  const [activePreset, setActivePreset] = useState<string>("custom");

  const handleSliderChange = (channel: keyof AudioMixerState, val: number) => {
    const next = { ...mixerState, [channel]: val };
    onUpdateMixer(next);
    setActivePreset("custom");
  };

  const presets: Record<
    string,
    { name: string; icon: string; desc: string; values: Partial<AudioMixerState> }
  > = {
    rainCabin: {
      name: "Rain on Tin Roof",
      icon: "🌧️",
      desc: "Warm hearth crackles alongside soothing continuous rainfall.",
      values: {
        hearthFire: 0.65,
        stormRain: 0.85,
        cosmicDrone: 0.15,
        urbanEcho: 0.0,
        zenChimes: 0.2,
        forestWind: 0.35,
      },
    },
    cosmicVoid: {
      name: "Cosmic Solitude",
      icon: "🌌",
      desc: "Deep harmonic sub-oscillations mirroring planetary orbits.",
      values: {
        hearthFire: 0.0,
        stormRain: 0.1,
        cosmicDrone: 0.9,
        urbanEcho: 0.0,
        zenChimes: 0.5,
        forestWind: 0.4,
      },
    },
    urbanLoft: {
      name: "Urban Night Loft",
      icon: "☕",
      desc: "Metropolitan resonance blended with indoor shelter.",
      values: {
        hearthFire: 0.4,
        stormRain: 0.3,
        cosmicDrone: 0.3,
        urbanEcho: 0.7,
        zenChimes: 0.3,
        forestWind: 0.1,
      },
    },
    zenTemple: {
      name: "Zen Garden Chimes",
      icon: "🎐",
      desc: "Gentle forest breezes and intermittent harmonic bell chimes.",
      values: {
        hearthFire: 0.2,
        stormRain: 0.2,
        cosmicDrone: 0.2,
        urbanEcho: 0.0,
        zenChimes: 0.85,
        forestWind: 0.75,
      },
    },
    blizzardHaven: {
      name: "Winter Blizzard Haven",
      icon: "🔥",
      desc: "A raging outer storm contrasted with maximum hearth heat.",
      values: {
        hearthFire: 0.95,
        stormRain: 0.5,
        cosmicDrone: 0.2,
        urbanEcho: 0.0,
        zenChimes: 0.1,
        forestWind: 0.85,
      },
    },
  };

  const applyPreset = (key: string) => {
    const p = presets[key];
    if (!p) return;
    const next: AudioMixerState = {
      ...mixerState,
      ...p.values,
    };
    onUpdateMixer(next);
    setActivePreset(key);
    audioEngine.playChimeNote(659.25);
  };

  const randomizeSoundscape = () => {
    const next: AudioMixerState = {
      ...mixerState,
      hearthFire: Math.random() * 0.8,
      stormRain: Math.random() * 0.8,
      cosmicDrone: Math.random() * 0.7,
      urbanEcho: Math.random() * 0.5,
      zenChimes: Math.random() * 0.7,
      forestWind: Math.random() * 0.8,
    };
    onUpdateMixer(next);
    setActivePreset("random");
    audioEngine.playChimeNote(880.0);
  };

  // Compute Sanctuary vs Chaos Balance Ratio
  const totalVolume =
    mixerState.hearthFire +
    mixerState.stormRain +
    mixerState.cosmicDrone +
    mixerState.urbanEcho +
    mixerState.zenChimes +
    mixerState.forestWind;

  const sanctuaryScore =
    (mixerState.hearthFire * 1.2 + mixerState.zenChimes * 1.1 + mixerState.forestWind * 0.9) /
    (totalVolume || 1);
  const chaosScore =
    (mixerState.stormRain * 1.1 + mixerState.urbanEcho * 1.2 + mixerState.cosmicDrone * 0.8) /
    (totalVolume || 1);

  const sanctuaryPercent = Math.min(
    100,
    Math.max(0, Math.round((sanctuaryScore / (sanctuaryScore + chaosScore || 1)) * 100))
  );

  return (
    <div className="space-y-6">
      
      {/* HEADER HERO */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-amber-500/10 via-rose-500/5 to-slate-900 bg-slate-900/90 backdrop-blur-xl border border-amber-500/20 shadow-2xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono-code font-bold uppercase tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Generative Web Audio Synthesizer</span>
            </div>
            <h2 className="font-serif-title text-2xl md:text-3xl font-extrabold text-white">
              The Chaos & Sanctuary Synthesizer
            </h2>
            <p className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Synthesize your personalized atmospheric balance. Mix natural tempest storms,
              urban rumblings, harmonic cosmic drones, and cozy hearth fires in real-time.
            </p>
          </div>

          {/* BALANCE METER */}
          <div className="w-full lg:w-80 p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono-code">
              <span className="text-amber-400 font-bold">Sanctuary: {sanctuaryPercent}%</span>
              <span className="text-cyan-400 font-bold">Chaos: {100 - sanctuaryPercent}%</span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden flex">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-rose-500 transition-all duration-300"
                style={{ width: `${sanctuaryPercent}%` }}
              />
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
                style={{ width: `${100 - sanctuaryPercent}%` }}
              />
            </div>
            <div className="text-[11px] text-slate-400 text-center italic">
              {sanctuaryPercent > 65
                ? "✨ Deep Inner Shelter & Grounded Equilibrium"
                : sanctuaryPercent < 35
                ? "⚡ High Dynamic Energy & Cosmic Turbulence"
                : "⚖️ Balanced Harmonization of Inner & Outer Worlds"}
            </div>
          </div>
        </div>
      </div>

      {/* VISUALIZER & PRESETS BAR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 5 Cols: Live Waveform Visualizer & Style Picker */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-white/10 shadow-xl flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="font-mono-code text-xs font-bold uppercase tracking-wider text-slate-200">
                Live Frequency Waveform
              </span>
            </div>
            <div className="flex items-center gap-1 p-1 bg-black/40 border border-white/10 rounded-xl text-xs font-mono-code">
              <button
                onClick={() => setVisualizerStyle("radial")}
                className={`px-2 py-1 rounded-lg transition-all ${
                  visualizerStyle === "radial"
                    ? "bg-amber-500/20 text-amber-400 font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Radial
              </button>
              <button
                onClick={() => setVisualizerStyle("wave")}
                className={`px-2 py-1 rounded-lg transition-all ${
                  visualizerStyle === "wave"
                    ? "bg-cyan-500/20 text-cyan-400 font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Wave
              </button>
              <button
                onClick={() => setVisualizerStyle("bars")}
                className={`px-2 py-1 rounded-lg transition-all ${
                  visualizerStyle === "bars"
                    ? "bg-purple-500/20 text-purple-400 font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Bars
              </button>
            </div>
          </div>

          {/* Visualizer Canvas Area */}
          <div className="h-44 w-full flex items-center justify-center relative rounded-2xl bg-black/50 border border-white/5 overflow-hidden">
            <AudioVisualizerCanvas
              styleType={visualizerStyle}
              colorAccent={
                visualizerStyle === "radial"
                  ? "#f59e0b"
                  : visualizerStyle === "wave"
                  ? "#38bdf8"
                  : "#c084fc"
              }
            />
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => audioEngine.playChimeNote(783.99)}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono-code text-slate-200 transition-all"
            >
              <Bell className="w-3.5 h-3.5 text-amber-400" />
              <span>Trigger Bell Chime</span>
            </button>
            <button
              onClick={randomizeSoundscape}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono-code text-slate-200 transition-all"
              title="Randomize Atmosphere"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Randomize</span>
            </button>
          </div>
        </div>

        {/* Right 7 Cols: Atmospheric Presets */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-400" />
            <h3 className="font-serif-title text-sm font-bold text-white uppercase tracking-wider">
              Curated Soundscape Presets
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(presets).map(([key, p]) => (
              <button
                key={key}
                onClick={() => applyPreset(key)}
                className={`p-3.5 rounded-2xl text-left border transition-all ${
                  activePreset === key
                    ? "bg-amber-500/15 border-amber-500/40 shadow-lg shadow-amber-500/10 text-white"
                    : "bg-slate-800/40 border-white/5 hover:border-white/20 hover:bg-slate-800/80 text-slate-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{p.icon}</span>
                  <span className="font-bold text-xs">{p.name}</span>
                </div>
                <p className="mt-1.5 text-[11px] text-slate-400 leading-snug line-clamp-2">
                  {p.desc}
                </p>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* SOUND CHANNELS MIXER CONSOLE */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-white/10 shadow-2xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-amber-400" />
            <h3 className="font-serif-title text-base font-bold text-white">
              Acoustic Channel Mixer
            </h3>
          </div>
          <span className="text-xs font-mono-code text-slate-400">
            6 Synthesized Frequency Generators
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Channel 1: Hearth Fire */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-400">
                <Flame className="w-4 h-4" />
                <span className="text-xs font-bold font-mono-code uppercase">Hearth Fire</span>
              </div>
              <span className="text-xs font-mono-code text-slate-400">
                {Math.round(mixerState.hearthFire * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={mixerState.hearthFire}
              onChange={(e) => handleSliderChange("hearthFire", parseFloat(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <p className="text-[11px] text-slate-400 leading-snug">
              Crackling warm low-frequency embers for domestic shelter.
            </p>
          </div>

          {/* Channel 2: Storm Rain */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-cyan-400">
                <CloudRain className="w-4 h-4" />
                <span className="text-xs font-bold font-mono-code uppercase">Storm Rain</span>
              </div>
              <span className="text-xs font-mono-code text-slate-400">
                {Math.round(mixerState.stormRain * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={mixerState.stormRain}
              onChange={(e) => handleSliderChange("stormRain", parseFloat(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
            <p className="text-[11px] text-slate-400 leading-snug">
              Filtered atmospheric droplet noise tapping the outer glass.
            </p>
          </div>

          {/* Channel 3: Cosmic Drone */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-purple-400">
                <Radio className="w-4 h-4" />
                <span className="text-xs font-bold font-mono-code uppercase">Cosmic Drone</span>
              </div>
              <span className="text-xs font-mono-code text-slate-400">
                {Math.round(mixerState.cosmicDrone * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={mixerState.cosmicDrone}
              onChange={(e) => handleSliderChange("cosmicDrone", parseFloat(e.target.value))}
              className="w-full accent-purple-500 cursor-pointer"
            />
            <p className="text-[11px] text-slate-400 leading-snug">
              Binaural sub-bass sine waves tuned to 55Hz harmonic resonance.
            </p>
          </div>

          {/* Channel 4: Urban Echo */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-rose-400">
                <Building2 className="w-4 h-4" />
                <span className="text-xs font-bold font-mono-code uppercase">Urban Echo</span>
              </div>
              <span className="text-xs font-mono-code text-slate-400">
                {Math.round(mixerState.urbanEcho * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={mixerState.urbanEcho}
              onChange={(e) => handleSliderChange("urbanEcho", parseFloat(e.target.value))}
              className="w-full accent-rose-500 cursor-pointer"
            />
            <p className="text-[11px] text-slate-400 leading-snug">
              Deep distant rumble of night trains and urban vibration.
            </p>
          </div>

          {/* Channel 5: Zen Chimes */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-400">
                <Bell className="w-4 h-4" />
                <span className="text-xs font-bold font-mono-code uppercase">Zen Chimes</span>
              </div>
              <span className="text-xs font-mono-code text-slate-400">
                {Math.round(mixerState.zenChimes * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={mixerState.zenChimes}
              onChange={(e) => handleSliderChange("zenChimes", parseFloat(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <p className="text-[11px] text-slate-400 leading-snug">
              Procedural pentatonic bell strikes triggering at organic intervals.
            </p>
          </div>

          {/* Channel 6: Forest Wind */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sky-400">
                <Wind className="w-4 h-4" />
                <span className="text-xs font-bold font-mono-code uppercase">Forest Wind</span>
              </div>
              <span className="text-xs font-mono-code text-slate-400">
                {Math.round(mixerState.forestWind * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={mixerState.forestWind}
              onChange={(e) => handleSliderChange("forestWind", parseFloat(e.target.value))}
              className="w-full accent-sky-500 cursor-pointer"
            />
            <p className="text-[11px] text-slate-400 leading-snug">
              Sweeping bandpass filter imitating pines whispering in the breeze.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};
