"use client";

import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { audioEngine } from "@/lib/audioEngine";
import {
  Wind,
  Star,
  Search,
  Compass,
  Sparkles,
  Heart,
  Plus,
  Trash2,
  CheckCircle2,
  Trophy,
  RotateCcw,
  Share2,
  Coffee,
  Key,
  Music,
  Book,
  Camera,
  Sun,
  Shield,
  Smile,
} from "lucide-react";

export interface MemoryItem {
  id: string;
  title: string;
  category: "Family" | "Childhood" | "Solitude" | "Nature" | "Daily Ritual";
  emotion: string;
  story: string;
  date: string;
  color: string;
}

export const NavigateSanctuary: React.FC = () => {
  const [activeRitual, setActiveRitual] = useState<
    "breath" | "constellation" | "clutterHunt" | "oracle"
  >("breath");

  // ================= RITUAL 1: BREATHING CIRCLE =================
  const [breathPhase, setBreathPhase] = useState<"Inhale" | "Hold" | "Exhale" | "Rest">("Inhale");
  const [breathCount, setBreathCount] = useState<number>(4);
  const [cyclesCompleted, setCyclesCompleted] = useState<number>(0);
  const [isBreathingActive, setIsBreathingActive] = useState<boolean>(false);

  useEffect(() => {
    if (!isBreathingActive) return;

    const phases: Array<{ phase: "Inhale" | "Hold" | "Exhale" | "Rest"; duration: number; chime: number }> = [
      { phase: "Inhale", duration: 4, chime: 523.25 },
      { phase: "Hold", duration: 4, chime: 659.25 },
      { phase: "Exhale", duration: 4, chime: 440.0 },
      { phase: "Rest", duration: 4, chime: 392.0 },
    ];

    let currentPhaseIdx = 0;
    let timer = phases[0].duration;

    const interval = window.setInterval(() => {
      timer -= 1;
      setBreathCount(timer);

      if (timer <= 0) {
        currentPhaseIdx = (currentPhaseIdx + 1) % phases.length;
        const next = phases[currentPhaseIdx];
        setBreathPhase(next.phase);
        timer = next.duration;
        setBreathCount(next.duration);
        audioEngine.playChimeNote(next.chime);

        if (currentPhaseIdx === 0) {
          setCyclesCompleted((prev) => {
            const updated = prev + 1;
            if (updated === 4) {
              confetti({
                particleCount: 80,
                spread: 70,
                origin: { y: 0.6 },
              });
            }
            return updated;
          });
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isBreathingActive]);

  const toggleBreathing = () => {
    if (!isBreathingActive) {
      audioEngine.resume();
      audioEngine.playChimeNote(523.25);
    }
    setIsBreathingActive(!isBreathingActive);
  };

  // ================= RITUAL 2: MEMORY CONSTELLATION =================
  const [memories, setMemories] = useState<MemoryItem[]>([
    {
      id: "mem-1",
      title: "Rain on the Attic Window",
      category: "Childhood",
      emotion: "Peaceful Nostalgia",
      story: "Lying under a thick wool blanket while thunder rolled across the hills, feeling completely safe.",
      date: "Autumn 2018",
      color: "#38bdf8",
    },
    {
      id: "mem-2",
      title: "Late Night Kitchen Conversations",
      category: "Family",
      emotion: "Deep Belonging",
      story: "Brewing chai at 1:00 AM with old friends, laughing until our stomachs hurt about nothing in particular.",
      date: "Winter 2023",
      color: "#f59e0b",
    },
    {
      id: "mem-3",
      title: "The Solitary Morning Balcony",
      category: "Solitude",
      emotion: "Grounded Clarity",
      story: "Watching the sun hit the treetops with a steaming cup of coffee before the city woke up.",
      date: "Spring 2024",
      color: "#10b981",
    },
  ]);

  const [newMemTitle, setNewMemTitle] = useState("");
  const [newMemStory, setNewMemStory] = useState("");
  const [newMemCategory, setNewMemCategory] = useState<MemoryItem["category"]>("Daily Ritual");
  const [newMemEmotion, setNewMemEmotion] = useState("Warm Gratitude");
  const [selectedMemoryCard, setSelectedMemoryCard] = useState<MemoryItem | null>(null);

  const addMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemTitle.trim() || !newMemStory.trim()) return;

    const colors = ["#38bdf8", "#f59e0b", "#ec4899", "#10b981", "#a855f7"];
    const newItem: MemoryItem = {
      id: `mem-${Date.now()}`,
      title: newMemTitle.trim(),
      category: newMemCategory,
      emotion: newMemEmotion,
      story: newMemStory.trim(),
      date: "Just Now",
      color: colors[Math.floor(Math.random() * colors.length)],
    };

    setMemories([newItem, ...memories]);
    setNewMemTitle("");
    setNewMemStory("");
    audioEngine.playChimeNote(880.0);
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
  };

  const deleteMemory = (id: string) => {
    setMemories(memories.filter((m) => m.id !== id));
    if (selectedMemoryCard?.id === id) setSelectedMemoryCard(null);
  };

  // ================= RITUAL 3: DOMESTIC CLUTTER HUNT =================
  interface ClutterItem {
    id: string;
    name: string;
    icon: string;
    hint: string;
    x: number;
    y: number;
    found: boolean;
  }

  const initialClutter: ClutterItem[] = [
    { id: "c1", name: "Grandma's Ceramic Mug", icon: "☕", hint: "Perched near the stack of old journals", x: 18, y: 35, found: false },
    { id: "c2", name: "The Brass Skeleton Key", icon: "🗝️", hint: "Tucked beside the vintage vinyl player", x: 74, y: 22, found: false },
    { id: "c3", name: "Sleeping Calico Cat", icon: "🐱", hint: "Curled peacefully upon the sunlit wool rug", x: 48, y: 72, found: false },
    { id: "c4", name: "The Nostalgic Mixtape", icon: "📼", hint: "Resting on the cluttered wooden desk shelf", x: 82, y: 68, found: false },
    { id: "c5", name: "Lucky Potted Fern", icon: "🌿", hint: "Bathed in the warm windowsill afternoon light", x: 26, y: 78, found: false },
  ];

  const [clutterList, setClutterList] = useState<ClutterItem[]>(initialClutter);
  const [huntWon, setHuntWon] = useState(false);

  const handleFindItem = (id: string) => {
    setClutterList((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, found: true } : item
      );
      const remaining = updated.filter((item) => !item.found).length;
      if (remaining === 0) {
        setHuntWon(true);
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
        audioEngine.playChimeNote(1046.5);
      } else {
        audioEngine.playChimeNote(659.25);
      }
      return updated;
    });
  };

  const resetClutterHunt = () => {
    setClutterList(initialClutter.map((item) => ({ ...item, found: false })));
    setHuntWon(false);
  };

  // ================= RITUAL 4: ARCHETYPE ORACLE =================
  const [oracleStep, setOracleStep] = useState(0);
  const [oracleAnswers, setOracleAnswers] = useState<number[]>([]);
  const [calculatedArchetype, setCalculatedArchetype] = useState<number | null>(null);

  const oracleQuestions = [
    {
      q: "When external chaos threatens your equilibrium, where is your first instinct to seek refuge?",
      options: [
        { text: "In a cozy room with tea, blankets, and a favorite book.", type: 0 },
        { text: "Under the open night sky, walking through quiet streets.", type: 1 },
        { text: "Inward, through meditation, journaling, and silent contemplation.", type: 2 },
        { text: "By creating, building, or putting physical things in orderly harmony.", type: 3 },
      ],
    },
    {
      q: "What defines the essential sensory soul of 'home' for you?",
      options: [
        { text: "The aroma of home-cooked spices and gentle conversations.", type: 0 },
        { text: "The feeling of limitless freedom and stargazing from anywhere on Earth.", type: 1 },
        { text: "The spacious peace inside my own mind that no noise can shake.", type: 2 },
        { text: "A curated sanctuary of treasured artifacts, music, and craftsmanship.", type: 3 },
      ],
    },
    {
      q: "How do you view life's unavoidable clutter and unexpected surprises?",
      options: [
        { text: "Proof that life is richly lived and full of warmth.", type: 0 },
        { text: "A cosmic dance of stardust and fleeting moments.", type: 1 },
        { text: "Weather passing through the expansive sky of awareness.", type: 2 },
        { text: "Raw material waiting to be sculpted into creative order.", type: 3 },
      ],
    },
  ];

  const archetypes = [
    {
      title: "The Warm Hearthkeeper",
      icon: "🔥",
      tagline: "Guardian of Domestic Grace & Gentle Hospitality",
      description:
        "You understand that home is not merely four walls, but the warmth generated between people. Your sanctuary is fueled by small rituals: brewing tea, lighting candles, and offering comforting reassurance when storms rage outside.",
      mantra: "In the smallest cup of tea, I find the stillness of the universe.",
      badgeColor: "from-amber-500 to-rose-600",
    },
    {
      title: "The Starlit Nomad",
      icon: "🌌",
      tagline: "Planetary Stargazer & Cosmic Voyager",
      description:
        "Your home is the entire pale blue dot. You feel an expansive sense of belonging wherever there is fresh air, starlight, and the open horizon. You carry your sanctuary effortlessly within your chest.",
      mantra: "Wherever the night sky opens, I am already home.",
      badgeColor: "from-cyan-500 to-blue-600",
    },
    {
      title: "The Mindful Architect",
      icon: "🧠",
      tagline: "Master of Internal Sanctuary & Stillness",
      description:
        "You recognize that external turbulence is inevitable, but internal sanctuary is a choice. You build psychological chambers of peace, meeting every thought with spacious compassion and wisdom.",
      mantra: "I am not the storm; I am the vast sky in which the weather unfolds.",
      badgeColor: "from-purple-500 to-indigo-600",
    },
    {
      title: "The Resilient Lighthouse",
      icon: "⚓",
      tagline: "Pillar of Equilibrium & Harmonious Craft",
      description:
        "You take life's scattered chaos and gently organize it into enduring beauty. You serve as a steadfast anchor for those around you, turning messy corners into spaces of deep inspiration.",
      mantra: "I stand firm against the surging waves, casting light into the mist.",
      badgeColor: "from-emerald-500 to-teal-600",
    },
  ];

  const handleAnswerOracle = (type: number) => {
    const nextAnswers = [...oracleAnswers, type];
    setOracleAnswers(nextAnswers);

    if (oracleStep + 1 < oracleQuestions.length) {
      setOracleStep(oracleStep + 1);
      audioEngine.playChimeNote(659.25);
    } else {
      // Calculate most frequent
      const counts: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0 };
      nextAnswers.forEach((a) => (counts[a] = (counts[a] || 0) + 1));
      let maxType = 0;
      let maxCount = -1;
      Object.entries(counts).forEach(([t, count]) => {
        if (count > maxCount) {
          maxCount = count;
          maxType = parseInt(t);
        }
      });
      setCalculatedArchetype(maxType);
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
      audioEngine.playChimeNote(880.0);
    }
  };

  const resetOracle = () => {
    setOracleStep(0);
    setOracleAnswers([]);
    setCalculatedArchetype(null);
  };

  return (
    <div className="space-y-6">
      
      {/* NAVIGATION TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveRitual("breath")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs md:text-sm font-medium whitespace-nowrap transition-all border ${
            activeRitual === "breath"
              ? "bg-purple-600 text-white border-purple-400/50 shadow-lg shadow-purple-600/30"
              : "bg-slate-900/80 text-slate-400 border-white/5 hover:bg-slate-800 hover:text-slate-200"
          }`}
        >
          <Wind className="w-4 h-4" />
          <span>1. Taming the Tempest (Breathing Circle)</span>
        </button>

        <button
          onClick={() => setActiveRitual("constellation")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs md:text-sm font-medium whitespace-nowrap transition-all border ${
            activeRitual === "constellation"
              ? "bg-amber-600 text-white border-amber-400/50 shadow-lg shadow-amber-600/30"
              : "bg-slate-900/80 text-slate-400 border-white/5 hover:bg-slate-800 hover:text-slate-200"
          }`}
        >
          <Star className="w-4 h-4" />
          <span>2. Memory Constellation Vault</span>
        </button>

        <button
          onClick={() => setActiveRitual("clutterHunt")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs md:text-sm font-medium whitespace-nowrap transition-all border ${
            activeRitual === "clutterHunt"
              ? "bg-cyan-600 text-white border-cyan-400/50 shadow-lg shadow-cyan-600/30"
              : "bg-slate-900/80 text-slate-400 border-white/5 hover:bg-slate-800 hover:text-slate-200"
          }`}
        >
          <Search className="w-4 h-4" />
          <span>3. Zen Clutter Hunt Game</span>
        </button>

        <button
          onClick={() => setActiveRitual("oracle")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs md:text-sm font-medium whitespace-nowrap transition-all border ${
            activeRitual === "oracle"
              ? "bg-emerald-600 text-white border-emerald-400/50 shadow-lg shadow-emerald-600/30"
              : "bg-slate-900/80 text-slate-400 border-white/5 hover:bg-slate-800 hover:text-slate-200"
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>4. Sanctuary Archetype Oracle</span>
        </button>
      </div>

      {/* RITUAL 1: BREATHING CIRCLE */}
      {activeRitual === "breath" && (
        <div className="p-6 md:p-10 rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-purple-500/20 shadow-2xl space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono-code font-bold uppercase tracking-widest bg-purple-500/10 text-purple-400 border border-purple-500/20">
              Somatic Grounding Ritual
            </span>
            <h2 className="font-serif-title text-2xl md:text-3xl font-extrabold text-white">
              Taming the Tempest: 4-4-4 Box Breathing
            </h2>
            <p className="text-xs md:text-sm text-slate-300">
              When domestic or mental chaos peaks, sync your breath with the pulsing sacred geometry.
              Transform racing thoughts into calm, grounded presence.
            </p>
          </div>

          {/* Glowing Animated Sacred Breathing Mandala */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto flex items-center justify-center">
            {/* Outer expanding halo */}
            <div
              className={`absolute inset-0 rounded-full border-2 border-purple-500/30 transition-all duration-1000 ${
                isBreathingActive && (breathPhase === "Inhale" || breathPhase === "Hold")
                  ? "scale-110 opacity-80 border-purple-400 shadow-2xl shadow-purple-500/40"
                  : "scale-90 opacity-30 border-purple-700"
              }`}
            />

            {/* Inner pulsating orb */}
            <div
              className={`w-48 h-48 md:w-56 md:h-56 rounded-full flex flex-col items-center justify-center p-6 text-center transition-all duration-1000 ${
                breathPhase === "Inhale"
                  ? "scale-105 bg-gradient-to-tr from-cyan-600/50 via-purple-600/50 to-rose-600/50 shadow-2xl shadow-cyan-500/30"
                  : breathPhase === "Hold"
                  ? "scale-105 bg-gradient-to-tr from-amber-600/50 to-purple-600/50 shadow-2xl shadow-amber-500/30"
                  : breathPhase === "Exhale"
                  ? "scale-90 bg-gradient-to-tr from-purple-800/40 to-slate-900 shadow-inner"
                  : "scale-85 bg-slate-950/80"
              } border border-white/20`}
            >
              <span className="font-mono-code text-xs uppercase tracking-widest text-purple-300">
                {isBreathingActive ? breathPhase : "Ready"}
              </span>
              <span className="font-serif-title text-4xl md:text-5xl font-extrabold text-white my-1">
                {isBreathingActive ? breathCount : "4"}
              </span>
              <span className="text-[11px] text-slate-300">
                {breathPhase === "Inhale"
                  ? "Draw in Sanctuary"
                  : breathPhase === "Hold"
                  ? "Rest in Stillness"
                  : breathPhase === "Exhale"
                  ? "Release Chaos"
                  : "Quiet Space"}
              </span>
            </div>
          </div>

          {/* Controls & Metrics */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={toggleBreathing}
              className={`px-8 py-3.5 rounded-2xl font-bold text-sm tracking-wide transition-all shadow-xl ${
                isBreathingActive
                  ? "bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30"
                  : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-600/30"
              }`}
            >
              {isBreathingActive ? "Pause Breathing Guide" : "Begin Resonant Breathing"}
            </button>
            <div className="px-5 py-3 rounded-2xl bg-black/40 border border-white/10 text-xs font-mono-code text-slate-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Completed Cycles: {cyclesCompleted}</span>
            </div>
          </div>
        </div>
      )}

      {/* RITUAL 2: MEMORY CONSTELLATION VAULT */}
      {activeRitual === "constellation" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left 5 Cols: Add New Memory Form */}
          <div className="lg:col-span-5 p-6 md:p-8 rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-amber-500/20 shadow-2xl space-y-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-400" />
              <h3 className="font-serif-title text-lg font-bold text-white">
                Pin a Home Memory Star
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              Preserve meaningful domestic micro-moments that anchor your sense of belonging.
            </p>

            <form onSubmit={addMemory} className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-mono-code text-slate-300 mb-1">
                  Memory Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sunday Morning Cinnamon Rolls"
                  value={newMemTitle}
                  onChange={(e) => setNewMemTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-mono-code text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={newMemCategory}
                    onChange={(e) =>
                      setNewMemCategory(e.target.value as MemoryItem["category"])
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
                  >
                    <option value="Family">Family</option>
                    <option value="Childhood">Childhood</option>
                    <option value="Solitude">Solitude</option>
                    <option value="Nature">Nature</option>
                    <option value="Daily Ritual">Daily Ritual</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono-code text-slate-300 mb-1">
                    Emotion
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Warm Comfort"
                    value={newMemEmotion}
                    onChange={(e) => setNewMemEmotion(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono-code text-slate-300 mb-1">
                  Sensory Story / Detail
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe the smell, the sounds, or the quiet magic of that moment..."
                  value={newMemStory}
                  onChange={(e) => setNewMemStory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-white font-bold text-xs shadow-lg shadow-amber-500/20 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Anchor Star to Constellation</span>
              </button>
            </form>
          </div>

          {/* Right 7 Cols: Interactive Constellation Cards */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-code text-slate-400">
                {memories.length} Anchored Constellation Memories
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-1">
              {memories.map((mem) => (
                <div
                  key={mem.id}
                  onClick={() => setSelectedMemoryCard(mem)}
                  className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 hover:border-amber-400/50 hover:bg-slate-800/80 transition-all cursor-pointer space-y-3 relative group"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-code font-bold uppercase tracking-wider text-slate-950"
                      style={{ backgroundColor: mem.color }}
                    >
                      {mem.category}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteMemory(mem.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-rose-400 transition-all"
                      title="Delete memory"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h4 className="font-serif-title text-sm font-bold text-white leading-snug">
                    {mem.title}
                  </h4>

                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    {mem.story}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-white/5">
                    <span className="italic">{mem.emotion}</span>
                    <span className="font-mono-code text-[10px]">{mem.date}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Memory Keepsake Modal / Drawer */}
            {selectedMemoryCard && (
              <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/40 shadow-xl flex items-start justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono-code uppercase text-amber-400 font-bold">
                    Keepsake Polaroid
                  </span>
                  <h4 className="font-serif-title text-base font-bold text-white mt-0.5">
                    {selectedMemoryCard.title}
                  </h4>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    &ldquo;{selectedMemoryCard.story}&rdquo;
                  </p>
                  <div className="mt-3 flex items-center gap-3 text-xs text-amber-300">
                    <span>✨ {selectedMemoryCard.emotion}</span>
                    <span>• {selectedMemoryCard.category}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMemoryCard(null)}
                  className="text-xs px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400"
                >
                  Close
                </button>
              </div>
            )}
          </div>

        </div>
      )}

      {/* RITUAL 3: ZEN CLUTTER HUNT MINI-GAME */}
      {activeRitual === "clutterHunt" && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-cyan-500/20 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="px-3 py-1 rounded-full text-xs font-mono-code font-bold uppercase tracking-widest bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                Playful Mindfulness Challenge
              </span>
              <h3 className="font-serif-title text-xl md:text-2xl font-bold text-white">
                The Domestic Scramble: Find Peace in the Clutter
              </h3>
              <p className="text-xs text-slate-300">
                Click scattered anchors hidden within the cozy domestic chaos to restore harmony!
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono-code px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-cyan-300">
                Found: {clutterList.filter((i) => i.found).length} / {clutterList.length}
              </span>
              <button
                onClick={resetClutterHunt}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
                title="Reset Hunt"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Room Canvas Stage */}
          <div className="relative w-full h-80 md:h-96 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-[#121824] border border-cyan-500/30 overflow-hidden shadow-inner flex items-center justify-center">
            
            {/* Background Room Atmosphere Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

            {/* Victory Overlay if Won */}
            {huntWon && (
              <div className="absolute inset-0 z-20 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-3 animate-in fade-in duration-300">
                <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
                  <Trophy className="w-8 h-8 animate-bounce" />
                </div>
                <h4 className="font-serif-title text-2xl font-bold text-white">
                  Domestic Equilibrium Restored!
                </h4>
                <p className="text-xs text-slate-300 max-w-md">
                  You discovered every beloved anchor tucked inside the living space.
                  Chaos embraced becomes cozy sanctuary.
                </p>
                <button
                  onClick={resetClutterHunt}
                  className="mt-2 px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-lg shadow-cyan-600/30 transition-all"
                >
                  Play Again
                </button>
              </div>
            )}

            {/* Interactive Scattered Items */}
            {clutterList.map((item) => (
              <button
                key={item.id}
                onClick={() => handleFindItem(item.id)}
                disabled={item.found}
                style={{ top: `${item.y}%`, left: `${item.x}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 p-3 rounded-2xl text-2xl md:text-3xl transition-all duration-300 ${
                  item.found
                    ? "bg-emerald-500/20 border-2 border-emerald-400 scale-90 opacity-70 shadow-lg shadow-emerald-500/30"
                    : "bg-slate-800/80 hover:bg-cyan-500/20 hover:scale-125 border border-white/20 hover:border-cyan-400 shadow-xl cursor-pointer animate-float"
                }`}
                title={item.found ? `Found: ${item.name}` : item.hint}
              >
                <span>{item.icon}</span>
                {item.found && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full flex items-center justify-center text-[9px] text-black font-bold">
                    ✓
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Checklist Hints */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {clutterList.map((item) => (
              <div
                key={item.id}
                className={`p-3 rounded-xl border text-xs transition-all ${
                  item.found
                    ? "bg-emerald-950/30 border-emerald-500/30 text-emerald-300"
                    : "bg-slate-800/40 border-white/5 text-slate-400"
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold">
                  <span>{item.icon}</span>
                  <span className="truncate">{item.name}</span>
                </div>
                <p className="text-[10px] mt-1 text-slate-500 truncate">
                  {item.hint}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* RITUAL 4: SANCTUARY ARCHETYPE ORACLE */}
      {activeRitual === "oracle" && (
        <div className="p-6 md:p-10 rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-emerald-500/20 shadow-2xl space-y-6">
          
          {calculatedArchetype === null ? (
            <div className="max-w-xl mx-auto space-y-6">
              <div className="text-center space-y-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono-code font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Philosophical Alignment Test
                </span>
                <h3 className="font-serif-title text-2xl font-bold text-white">
                  Discover Your Home Sanctuary Archetype
                </h3>
                <p className="text-xs text-slate-300">
                  Question {oracleStep + 1} of {oracleQuestions.length}
                </p>
              </div>

              {/* Question Card */}
              <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                <h4 className="font-medium text-sm md:text-base text-white">
                  {oracleQuestions[oracleStep].q}
                </h4>

                <div className="space-y-2.5 pt-2">
                  {oracleQuestions[oracleStep].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswerOracle(opt.type)}
                      className="w-full p-4 rounded-xl text-left bg-slate-800/60 hover:bg-emerald-500/20 hover:border-emerald-500/40 border border-white/5 text-xs md:text-sm text-slate-200 transition-all flex items-center justify-between group"
                    >
                      <span>{opt.text}</span>
                      <span className="opacity-0 group-hover:opacity-100 text-emerald-400 transition-all">
                        →
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-xl mx-auto text-center space-y-6 animate-in zoom-in-95 duration-300">
              <div className="inline-flex p-4 rounded-3xl bg-emerald-500/20 border border-emerald-500/40 text-4xl shadow-2xl shadow-emerald-500/30">
                {archetypes[calculatedArchetype].icon}
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono-code uppercase font-bold tracking-widest text-emerald-400">
                  Your Home Sanctuary Archetype
                </span>
                <h3 className="font-serif-title text-3xl font-extrabold text-white">
                  {archetypes[calculatedArchetype].title}
                </h3>
                <p className="text-xs font-medium text-amber-300 italic">
                  {archetypes[calculatedArchetype].tagline}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-black/50 border border-white/10 text-left space-y-4">
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                  {archetypes[calculatedArchetype].description}
                </p>

                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 text-xs italic">
                  &ldquo;{archetypes[calculatedArchetype].mantra}&rdquo;
                </div>
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={resetOracle}
                  className="px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-mono-code transition-all"
                >
                  Retake Reflection
                </button>
                <button
                  onClick={() => {
                    audioEngine.playChimeNote(1046.5);
                    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
                  }}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 transition-all"
                >
                  Celebrate Alignment
                </button>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
