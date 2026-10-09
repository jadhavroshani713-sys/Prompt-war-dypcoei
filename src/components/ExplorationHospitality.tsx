"use client";

import React, { useState } from "react";
import { CityData, PlaceItem } from "@/data/citiesData";
import {
  Utensils,
  Hotel,
  Sparkles,
  Search,
  Filter,
  Star,
  Shield,
  Sparkle,
  Clock,
  MapPin,
  Bookmark,
  Check,
  DollarSign,
  Heart,
} from "lucide-react";
import { audioEngine } from "@/lib/audioEngine";

interface ExplorationHospitalityProps {
  city: CityData;
  onSelectPlace?: (place: PlaceItem) => void;
}

export const ExplorationHospitality: React.FC<ExplorationHospitalityProps> = ({
  city,
  onSelectPlace,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<"all" | "food" | "stay" | "attraction">("all");
  const [onlyBudget, setOnlyBudget] = useState(false);
  const [savedPlaces, setSavedPlaces] = useState<Record<string, boolean>>({});

  const toggleSavePlace = (id: string) => {
    setSavedPlaces((prev) => ({ ...prev, [id]: !prev[id] }));
    audioEngine.playChimeNote(880.0);
  };

  const filteredPlaces = city.places.filter((place) => {
    const matchesCategory =
      categoryFilter === "all" || place.category === categoryFilter;
    const matchesSearch =
      place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.subCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBudget = !onlyBudget || place.isBudgetFriendly;

    return matchesCategory && matchesSearch && matchesBudget;
  });

  return (
    <div className="space-y-6">
      
      {/* HEADER HERO */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-amber-500/10 via-rose-500/5 to-slate-900 bg-slate-900/90 backdrop-blur-xl border border-amber-500/20 shadow-2xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center lg:text-left">
            <span className="px-3 py-1 rounded-full text-xs font-mono-code font-bold uppercase tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Hospitality & Gastronomy Radar
            </span>
            <h2 className="font-serif-title text-2xl md:text-3xl font-extrabold text-white">
              Exploration & Local Hospitality
            </h2>
            <p className="text-xs md:text-sm text-slate-300 max-w-xl">
              Discover verified local street food icons, hidden culinary alleys, boutique stay sanctuaries, and budget-friendly retreats in {city.name}.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-black/40 border border-white/10 text-center">
              <span className="block text-lg font-bold text-amber-400 font-mono-code">
                {city.places.filter((p) => p.category === "food").length}+
              </span>
              <span className="text-[10px] text-slate-400 font-mono-code uppercase">
                Curated Food Gems
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-black/40 border border-white/10 text-center">
              <span className="block text-lg font-bold text-emerald-400 font-mono-code">
                {city.places.filter((p) => p.category === "stay").length}+
              </span>
              <span className="text-[10px] text-slate-400 font-mono-code uppercase">
                Safe Stays
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* FILTER & SEARCH TOOLBAR */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search cafe, dish, hotel, area..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-black/40 border border-white/10 rounded-2xl text-xs font-medium">
          <button
            onClick={() => setCategoryFilter("all")}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              categoryFilter === "all"
                ? "bg-amber-500 text-black font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            All Discoveries
          </button>
          <button
            onClick={() => setCategoryFilter("food")}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              categoryFilter === "food"
                ? "bg-amber-500 text-black font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Food & Street Gems
          </button>
          <button
            onClick={() => setCategoryFilter("stay")}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              categoryFilter === "stay"
                ? "bg-amber-500 text-black font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Stays & Sanctuaries
          </button>
        </div>

        {/* Budget Toggle */}
        <button
          onClick={() => setOnlyBudget(!onlyBudget)}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono-code transition-all border ${
            onlyBudget
              ? "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold"
              : "bg-slate-800 border-white/10 text-slate-400 hover:text-slate-200"
          }`}
        >
          <DollarSign className="w-3.5 h-3.5" />
          <span>Budget-Friendly Only (₹/₹₹)</span>
        </button>

      </div>

      {/* PLACES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlaces.map((place) => {
          const isSaved = savedPlaces[place.id];
          return (
            <div
              key={place.id}
              className="rounded-3xl bg-slate-900/90 border border-white/10 hover:border-amber-500/40 shadow-xl overflow-hidden flex flex-col justify-between transition-all group hover:-translate-y-1 duration-300"
            >
              {/* Card Image Banner */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                {/* Rating & Price Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-black/70 backdrop-blur-md text-amber-400 font-bold text-xs border border-white/10">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{place.rating}</span>
                    <span className="text-[10px] text-slate-400">({place.reviewsCount})</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-xl bg-black/70 backdrop-blur-md text-emerald-400 font-mono-code font-bold text-xs border border-white/10">
                    {place.priceLevel} ({place.approxCost})
                  </span>
                </div>

                {/* Bookmark Button */}
                <button
                  onClick={() => toggleSavePlace(place.id)}
                  className="absolute top-3 right-3 p-2 rounded-xl bg-black/70 backdrop-blur-md text-slate-300 hover:text-rose-400 border border-white/10 transition-all"
                  title="Save to Trip Itinerary"
                >
                  <Heart
                    className={`w-4 h-4 transition-all ${
                      isSaved ? "fill-rose-500 text-rose-500" : ""
                    }`}
                  />
                </button>

                {/* Category Pill Bottom Left */}
                <div className="absolute bottom-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-code font-semibold uppercase tracking-wider bg-amber-500 text-black">
                    {place.subCategory}
                  </span>
                </div>
              </div>

              {/* Card Content Body */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif-title text-lg font-bold text-white group-hover:text-amber-300 transition-all">
                    {place.name}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed line-clamp-2">
                    {place.description}
                  </p>
                </div>

                {/* Highlights Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {place.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-lg text-[10px] font-mono-code bg-white/5 text-slate-300 border border-white/5"
                    >
                      {h}
                    </span>
                  ))}
                </div>

                {/* Scores & Metadata */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono-code">
                  <span className="text-amber-400">
                    ✨ Cleanliness: {place.cleanlinessScore}/10
                  </span>
                  <span className="text-emerald-400">
                    🛡️ Safety: {place.safetyScore}/10
                  </span>
                </div>

                {/* Address & Hours */}
                <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1 truncate max-w-[200px]">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    <span className="truncate">{place.address}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px]">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>{place.openHours}</span>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
