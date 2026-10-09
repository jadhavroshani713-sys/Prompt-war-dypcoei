"use client";

import React, { useState } from "react";
import { RealmType } from "./ThreeCanvas";
import {
  Globe,
  Brain,
  Home,
  Sparkles,
  BookOpen,
  Compass,
  ArrowRight,
  Flame,
  Wind,
  CloudRain,
  Eye,
  CheckCircle2,
} from "lucide-react";
import { audioEngine } from "@/lib/audioEngine";

interface ExploreRealmProps {
  realm: RealmType;
  selectedNode: { id: string; title: string; desc: string } | null;
  onClearNode: () => void;
  onJumpToNavigate: () => void;
}

export const ExploreRealm: React.FC<ExploreRealmProps> = ({
  realm,
  selectedNode,
  onClearNode,
  onJumpToNavigate,
}) => {
  const [activeStoryIndex, setActiveStoryIndex] = useState<number>(0);
  const [completedReflections, setCompletedReflections] = useState<Record<string, boolean>>({});

  const toggleReflection = (id: string) => {
    setCompletedReflections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    audioEngine.playChimeNote(783.99);
  };

  const realmData = {
    earth: {
      title: "The Cosmic Nest",
      subtitle: "Pale Blue Dot in the Turbulent Dark",
      icon: Globe,
      accentColor: "text-cyan-400",
      bgGradient: "from-cyan-500/10 via-blue-500/5 to-transparent",
      borderColor: "border-cyan-500/20",
      quote: {
        text: "Look again at that dot. That's here. That's home. That's us. On it everyone you love, everyone you know, everyone you ever heard of, every human being who ever was, lived out their lives.",
        author: "Carl Sagan, Pale Blue Dot",
      },
      stories: [
        {
          title: "The Fine Margin of Breath",
          summary: "Between the freezing void of outer space and molten planetary mantle, we thrive within a razor-thin onion skin of breathable air.",
          content:
            "Earth is not a tranquil museum piece; it is a raging engine of tectonic shifts, seasonal monsoons, ocean gyres, and solar storms. Yet in the heart of this thermodynamic turbulence, life learned to breathe. When we call Earth 'home', we celebrate the improbable miracle that chaos here is balanced enough to hold our fragile dreams.",
          badge: "Cosmology & Ecology",
          audioChime: 523.25,
        },
        {
          title: "The Constellation of Human Lanterns",
          summary: "From satellite orbits, our chaotic cities look like shimmering nerve clusters of warmth against the oceanic dark.",
          content:
            "Every illuminated window is someone preparing dinner, writing a letter, comforting a crying child, or falling in love. The collective hum of 8 billion souls navigating their day is Earth's living soundtrack. It reminds us that solitude is an illusion — we are all crewmates on this solitary blue spaceship.",
          badge: "Human Connectivity",
          audioChime: 659.25,
        },
        {
          title: "Ecological Sanctuary in Motion",
          summary: "Rivers carving canyons, forests regulating clouds — nature's relentless cycle of destruction and rebirth.",
          content:
            "We often desire our homes to be permanent and unchanging. Yet nature teaches us that true stability is dynamic. To live on Earth is to embrace the seasons: the storms that clear the air, the autumns that shed the old, and the spring that rises from composted pasts.",
          badge: "Planetary Wisdom",
          audioChime: 880.0,
        },
      ],
      prompts: [
        {
          id: "earth-p1",
          title: "Planetary Grounding",
          text: "Step outside or look out a window. Take a deep breath of the air circulating across continents. Feel your feet anchored to a world spinning through the void.",
        },
        {
          id: "earth-p2",
          title: "Cosmic Perspective",
          text: "Notice a problem that felt massive today. Zoom out 100,000 kilometers. How does it look from the orbit of the Moon?",
        },
      ],
    },
    mind: {
      title: "The Thought Sanctuary",
      subtitle: "The Mental Architecture of Belonging",
      icon: Brain,
      accentColor: "text-purple-400",
      bgGradient: "from-purple-500/10 via-pink-500/5 to-transparent",
      borderColor: "border-purple-500/20",
      quote: {
        text: "The mind is its own place, and in itself can make a heaven of hell, a hell of heaven.",
        author: "John Milton, Paradise Lost",
      },
      stories: [
        {
          title: "The Architecture of Memory",
          summary: "Our minds build internal rooms filled with childhood smells, old songs, and the voices of loved ones.",
          content:
            "Long before physical brick and mortar, our sense of home lives in the hippocampus. We carry nostalgic coordinates everywhere we go: the sound of rain on our childhood roof, the smell of roasted spices, the comfort of an old lullaby. When external life becomes tumultuous, we retreat inward to these psychological chambers.",
          badge: "Internal Geography",
          audioChime: 587.33,
        },
        {
          title: "Dancing with the Overthinking Tempest",
          summary: "Why anxiety and restless thoughts are not enemies, but over-protective guardians seeking safety.",
          content:
            "The chaotic flurry of thoughts we experience before sleep is simply the mind trying to solve tomorrow before it arrives. Instead of fighting the storm, the practice of sanctuary is learning to be the spacious sky in which the weather happens. Chaos softens the moment you stop resisting it.",
          badge: "Mindfulness & Peace",
          audioChime: 659.25,
        },
        {
          title: "The Hearth of Self-Compassion",
          summary: "Building an inner sanctuary where you are always welcomed, forgiven, and accepted.",
          content:
            "If your mind is a home you inhabit 24 hours a day, what kind of host are you to yourself? Developing an internal sanctuary means lighting a warm fire for your own flaws, offering quiet hospitality to your grief, and celebrating your small daily courage.",
          badge: "Self-Belonging",
          audioChime: 1046.5,
        },
      ],
      prompts: [
        {
          id: "mind-p1",
          title: "Inner Room Cleansing",
          text: "Identify one recurring anxious thought from this week. Mentally fold it into a paper boat and watch it float down a calm river.",
        },
        {
          id: "mind-p2",
          title: "Gratitude Hearth",
          text: "Name three unspoken micro-moments today that gave you quiet comfort (e.g. a sip of warm water, a gentle breeze, a solved puzzle).",
        },
      ],
    },
    domestic: {
      title: "The Living Quarters",
      subtitle: "The Sacred Mess and Comfort of Domestic Life",
      icon: Home,
      accentColor: "text-amber-400",
      bgGradient: "from-amber-500/10 via-orange-500/5 to-transparent",
      borderColor: "border-amber-500/20",
      quote: {
        text: "Our house is our corner of the world. It is our first universe, a real cosmos in every sense of the word.",
        author: "Gaston Bachelard, The Poetics of Space",
      },
      stories: [
        {
          title: "The Holy Clutter of Belonging",
          summary: "The unwashed favorite coffee mug, the stack of unread books, the keys on the side table — the fingerprint of life.",
          content:
            "Pristine show-homes in magazines feel cold because they lack life's messy texture. A true home is alive: shoes kicked off at the door after a long trek, the aroma of garlic sizzling in olive oil, mismatched ceramic bowls, and cats sleeping across computer keyboards. Chaos is evidence that people love, dream, and live here.",
          badge: "Domestic Poetics",
          audioChime: 523.25,
        },
        {
          title: "The Sanctuary of Small Rituals",
          summary: "Boiling water for morning brew, watering the windowsill basil, and fluffing the evening pillows.",
          content:
            "When the world outside feels unpredictable and overwhelming, our domestic micro-rituals restore order. Lighting a single candle or washing a plate becomes an act of quiet rebellion against global noise. In the micro, we reclaim our autonomy and peace.",
          badge: "Daily Anchors",
          audioChime: 783.99,
        },
        {
          title: "The Sheltering Roof",
          summary: "Listening to howling gales outside while tucked safely inside a warm blanket.",
          content:
            "Home derives its deepest sweetness from contrast. Without the chill of winter wind, the fireplace is merely hot; without the chaotic city streets, the bedroom is merely silent. Home is the fortress where we disarm our armor and let ourselves rest.",
          badge: "Haven & Rest",
          audioChime: 880.0,
        },
      ],
      prompts: [
        {
          id: "domestic-p1",
          title: "Sacred Corner Check",
          text: "Look around your current space. Find one object with sentimental history. Hold it for 10 seconds and honor the memory it carries.",
        },
        {
          id: "domestic-p2",
          title: "The Tea Pause",
          text: "Commit to making your next beverage with 100% presence — listening to the water pour, smelling the aroma, savoring the warmth.",
        },
      ],
    },
  };

  const current = realmData[realm];
  const IconComponent = current.icon;

  return (
    <div className="space-y-6">
      
      {/* 3D NODE INSPECTOR MODAL BANNER (If a node was clicked on the 3D globe) */}
      {selectedNode && (
        <div className="relative p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-amber-500/40 shadow-2xl shadow-amber-500/10 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400">
                <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: "10s" }} />
              </div>
              <div>
                <span className="text-[11px] font-mono-code uppercase tracking-wider text-amber-400">
                  Interactive Node Discovered
                </span>
                <h4 className="font-serif-title text-lg font-bold text-white">
                  {selectedNode.title}
                </h4>
              </div>
            </div>
            <button
              onClick={onClearNode}
              className="text-xs px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
            >
              Dismiss
            </button>
          </div>
          <p className="mt-3 text-sm text-slate-300 leading-relaxed">
            {selectedNode.desc}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3 pt-3 border-t border-white/10">
            <button
              onClick={() => audioEngine.playChimeNote(659.25)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Resonate Chime</span>
            </button>
            <button
              onClick={onJumpToNavigate}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30 transition-all"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Navigate In Sanctuary Rituals</span>
            </button>
          </div>
        </div>
      )}

      {/* REALM BANNER */}
      <div className={`p-6 rounded-3xl bg-gradient-to-br ${current.bgGradient} bg-slate-900/80 backdrop-blur-xl border ${current.borderColor} shadow-2xl`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 ${current.accentColor}`}>
              <IconComponent className="w-7 h-7" />
            </div>
            <div>
              <span className={`text-xs font-mono-code font-bold uppercase tracking-widest ${current.accentColor}`}>
                Dimension Exploration
              </span>
              <h2 className="font-serif-title text-2xl md:text-3xl font-extrabold text-white tracking-wide">
                {current.title}
              </h2>
              <p className="text-xs md:text-sm text-slate-400 mt-0.5">
                {current.subtitle}
              </p>
            </div>
          </div>

          {/* DIMENSION PHILOSOPHY QUOTE */}
          <div className="max-w-md p-3.5 rounded-2xl bg-black/40 border border-white/5 text-xs text-slate-300 italic">
            &ldquo;{current.quote.text}&rdquo;
            <div className="mt-1 text-[11px] font-mono-code font-medium text-slate-400 not-italic">
              — {current.quote.author}
            </div>
          </div>
        </div>
      </div>

      {/* STORY CHAPTERS & INTERACTIVE TABS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Interactive Narrative Reader */}
        <div className="lg:col-span-2 space-y-4">
          {/* Chapter Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {current.stories.map((story, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveStoryIndex(idx);
                  audioEngine.playChimeNote(story.audioChime);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs md:text-sm font-medium whitespace-nowrap transition-all border ${
                  activeStoryIndex === idx
                    ? "bg-slate-800 text-white border-white/20 shadow-lg shadow-black/40"
                    : "bg-slate-900/60 text-slate-400 border-white/5 hover:bg-slate-800/60 hover:text-slate-200"
                }`}
              >
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>Chapter 0{idx + 1}</span>
              </button>
            ))}
          </div>

          {/* Active Story Card */}
          <div className="p-6 md:p-8 rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-white/10 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-[11px] font-mono-code uppercase font-semibold bg-white/5 text-slate-300 border border-white/10">
                {current.stories[activeStoryIndex].badge}
              </span>
              <span className="text-xs text-slate-500 font-mono-code">
                Reading Time: 2 min
              </span>
            </div>

            <h3 className="font-serif-title text-xl md:text-2xl font-bold text-white">
              {current.stories[activeStoryIndex].title}
            </h3>

            <p className="text-sm font-medium text-amber-300/90 italic border-l-2 border-amber-400/50 pl-3">
              {current.stories[activeStoryIndex].summary}
            </p>

            <div className="text-sm md:text-base text-slate-300 leading-relaxed pt-2">
              {current.stories[activeStoryIndex].content}
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-white/10">
              <button
                onClick={() => audioEngine.playChimeNote(current.stories[activeStoryIndex].audioChime)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Listen to Chapter Frequency</span>
              </button>

              <button
                onClick={() => {
                  const next = (activeStoryIndex + 1) % current.stories.length;
                  setActiveStoryIndex(next);
                  audioEngine.playChimeNote(current.stories[next].audioChime);
                }}
                className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-medium"
              >
                <span>Next Chapter</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Col: Grounding Prompts & Sanctuaries */}
        <div className="space-y-4">
          <div className="p-6 rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-white/10 shadow-xl space-y-4">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-emerald-400" />
              <h3 className="font-serif-title text-base font-bold text-white">
                Sensory Anchors & Prompts
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              Micro-actions to anchor your awareness and find tranquility in everyday chaos.
            </p>

            <div className="space-y-3 pt-1">
              {current.prompts.map((prompt) => {
                const isDone = completedReflections[prompt.id];
                return (
                  <div
                    key={prompt.id}
                    onClick={() => toggleReflection(prompt.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer select-none ${
                      isDone
                        ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-200"
                        : "bg-slate-800/60 border-white/5 hover:border-white/20 text-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold font-mono-code uppercase tracking-wider">
                        {prompt.title}
                      </h4>
                      <CheckCircle2
                        className={`w-4 h-4 transition-all ${
                          isDone ? "text-emerald-400" : "text-slate-600"
                        }`}
                      />
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-slate-300">
                      {prompt.text}
                    </p>
                    <div className="mt-3 text-[10px] font-mono-code text-slate-400">
                      {isDone ? "✓ Practiced & Anchored" : "Click to complete reflection"}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Nav Trigger Card */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-purple-900/40 to-slate-900 border border-purple-500/20 shadow-xl">
            <h4 className="text-sm font-serif-title font-bold text-white">
              Ready to tame your inner turbulence?
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Try the Resonance Breathing Circle or visit the Memory Constellation Vault.
            </p>
            <button
              onClick={onJumpToNavigate}
              className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium text-xs shadow-lg shadow-purple-600/30 transition-all"
            >
              <span>Enter Sanctuary Navigation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
