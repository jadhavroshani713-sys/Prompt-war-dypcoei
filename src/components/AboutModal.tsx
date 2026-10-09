"use client";

import React from "react";
import { X, Sparkles, Globe, Brain, Home, Heart, Shield, Compass } from "lucide-react";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl bg-[#0b0f19] border border-amber-500/30 p-6 md:p-8 shadow-2xl space-y-6">
        
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* HEADER */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono-code font-bold uppercase tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curator's Manifesto & Philosophy</span>
          </div>
          <h2 className="font-serif-title text-2xl md:text-3xl font-extrabold text-white">
            The Chaos We Call Home
          </h2>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            A philosophical and sensory digital sanctuary designed for the theme:
            <span className="italic text-amber-300"> &ldquo;Exploring, Experiencing & Navigating the Chaos We Call Home&rdquo;</span>.
          </p>
        </div>

        {/* TRI-FOLD FRAMEWORK */}
        <div className="space-y-3 pt-2">
          <h3 className="font-serif-title text-sm font-bold text-slate-200 uppercase tracking-wider">
            The Three Concentric Spheres of Belonging
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/20 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
                <Globe className="w-4 h-4" />
                <span>1. The Cosmos</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-snug">
                Earth as a fragile pale blue dot floating through turbulent space.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/20 space-y-2">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-xs">
                <Brain className="w-4 h-4" />
                <span>2. The Mind</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-snug">
                The mental palace where memory, anxiety, and self-compassion reside.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/20 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                <Home className="w-4 h-4" />
                <span>3. The Living Quarters</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-snug">
                The warm hearth, tea rituals, and beloved clutter that anchor daily comfort.
              </p>
            </div>
          </div>
        </div>

        {/* CORE INTENTIONS */}
        <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-3">
          <h4 className="font-serif-title text-xs font-bold uppercase text-slate-300 tracking-wider">
            Interactive Experience Guide
          </h4>
          <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside leading-relaxed">
            <li><strong className="text-cyan-300">🧭 Explore:</strong> Rotate and inspect interactive 3D spheres, uncovering poetic lore and grounding prompts.</li>
            <li><strong className="text-amber-300">🌀 Experience:</strong> Blend 6 procedural atmospheric audio generators with live frequency visualization.</li>
            <li><strong className="text-purple-300">⚓ Navigate:</strong> Practice Box Breathing, pin personal memories in the Constellation Vault, solve the Clutter Hunt, and reveal your Home Archetype.</li>
          </ul>
        </div>

        {/* FOOTER */}
        <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400 font-mono-code">
          <div className="flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>Built with Next.js, Three.js & Web Audio API</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 text-white font-bold transition-all shadow-lg shadow-amber-500/20"
          >
            Enter Sanctuary
          </button>
        </div>

      </div>
    </div>
  );
};
