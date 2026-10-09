"use client";

import React, { useState } from "react";
import { CityData, SafetyZone, CitizenReport } from "@/data/citiesData";
import {
  Shield,
  ShieldAlert,
  PhoneCall,
  Share2,
  Mic,
  Camera,
  AlertTriangle,
  CheckCircle2,
  X,
  Phone,
  Radio,
  Sparkles,
  MapPin,
  Eye,
  Send,
  Volume2,
} from "lucide-react";
import { audioEngine } from "@/lib/audioEngine";

interface SafetyNavigatorProps {
  city: CityData;
  onAddReport?: (report: CitizenReport) => void;
}

export const SafetyNavigator: React.FC<SafetyNavigatorProps> = ({
  city,
  onAddReport,
}) => {
  const [isFakeCallActive, setIsFakeCallActive] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isCopiedLocation, setIsCopiedLocation] = useState(false);

  // New report form state
  const [repCategory, setRepCategory] = useState<CitizenReport["category"]>("Broken Streetlight");
  const [repTitle, setRepTitle] = useState("");
  const [repDesc, setRepDesc] = useState("");
  const [repLocation, setRepLocation] = useState("");
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [hasVoiceNote, setHasVoiceNote] = useState(false);
  const [hasPhoto, setHasPhoto] = useState(false);

  const handleShareLocation = () => {
    navigator.clipboard.writeText(
      `URGENT LOCATION ANCHOR: I am near ${city.name} Center [Lat: ${city.center[0]}, Lng: ${city.center[1]}]. City Life Safety Alert.`
    );
    setIsCopiedLocation(true);
    audioEngine.playChimeNote(880.0);
    setTimeout(() => setIsCopiedLocation(false), 3000);
  };

  const handleVoiceRecord = () => {
    setIsRecordingVoice(true);
    audioEngine.playChimeNote(659.25);
    setTimeout(() => {
      setIsRecordingVoice(false);
      setHasVoiceNote(true);
      audioEngine.playChimeNote(1046.5);
    }, 2500);
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!repTitle.trim() || !repDesc.trim()) return;

    const newReport: CitizenReport = {
      id: `rep-${Date.now()}`,
      category: repCategory,
      title: repTitle.trim(),
      description: repDesc.trim() + (hasVoiceNote ? " [Attached 0:14s Voice Note]" : ""),
      locationName: repLocation.trim() || `${city.name} Central`,
      timestamp: "Just Now",
      upvotes: 1,
      status: "Investigating",
      nlpSentiment: repCategory === "Community Event" ? "Positive" : "Alert",
      lat: city.center[0] + (Math.random() - 0.5) * 0.04,
      lng: city.center[1] + (Math.random() - 0.5) * 0.04,
    };

    if (onAddReport) onAddReport(newReport);

    setRepTitle("");
    setRepDesc("");
    setRepLocation("");
    setHasVoiceNote(false);
    setHasPhoto(false);
    setIsReportModalOpen(false);
    audioEngine.playChimeNote(880.0);
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER HERO */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-rose-500/10 via-amber-500/5 to-slate-900 bg-slate-900/90 backdrop-blur-xl border border-rose-500/20 shadow-2xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center lg:text-left">
            <span className="px-3 py-1 rounded-full text-xs font-mono-code font-bold uppercase tracking-widest bg-rose-500/10 text-rose-400 border border-rose-500/20">
              Urban Safety & Security Radar
            </span>
            <h2 className="font-serif-title text-2xl md:text-3xl font-extrabold text-white">
              Safety, Security & Safe Routing
            </h2>
            <p className="text-xs md:text-sm text-slate-300 max-w-xl">
              Real-time monitoring of reported hazard zones, night lighting indices, emergency SOS triggers, and crowd-verified incident reporting for {city.name}.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setIsReportModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-600/30 transition-all"
            >
              <Radio className="w-4 h-4" />
              <span>Submit Incident Report</span>
            </button>

            <button
              onClick={() => setIsFakeCallActive(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 text-xs font-medium transition-all"
              title="Discreet Escape Tool"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Simulate Fake Call</span>
            </button>
          </div>
        </div>
      </div>

      {/* SOS EMERGENCY ACTION STRIP */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-rose-950/60 via-slate-900 to-slate-900 border border-rose-500/40 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-6 h-6 text-rose-400 animate-pulse" />
            <div>
              <h3 className="font-serif-title text-base font-bold text-white">
                Emergency Rapid Response Console
              </h3>
              <p className="text-[11px] text-slate-300">
                Instant verified hotlines and automated distress coordinate dispatch.
              </p>
            </div>
          </div>

          <button
            onClick={handleShareLocation}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono-code transition-all border ${
              isCopiedLocation
                ? "bg-emerald-500/20 border-emerald-500 text-emerald-300"
                : "bg-black/40 border-white/10 text-slate-300 hover:text-white"
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{isCopiedLocation ? "✓ Coordinates Copied!" : "Broadcast My GPS"}</span>
          </button>
        </div>

        {/* Rapid Dial Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          <a
            href={`tel:${city.emergencyContacts.police.split(" ")[0]}`}
            className="p-3 rounded-2xl bg-rose-900/30 border border-rose-500/30 hover:bg-rose-900/50 transition-all flex items-center gap-2.5 group"
          >
            <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 group-hover:scale-110 transition-all">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-[10px] font-mono-code uppercase text-rose-300">
                Police Emergency
              </span>
              <span className="font-bold text-xs text-white">
                {city.emergencyContacts.police.split(" ")[0]}
              </span>
            </div>
          </a>

          <a
            href={`tel:${city.emergencyContacts.womenHelpline.split(" ")[0]}`}
            className="p-3 rounded-2xl bg-pink-900/30 border border-pink-500/30 hover:bg-pink-900/50 transition-all flex items-center gap-2.5 group"
          >
            <div className="p-2 rounded-xl bg-pink-500/20 text-pink-400 group-hover:scale-110 transition-all">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-[10px] font-mono-code uppercase text-pink-300">
                Women Helpline
              </span>
              <span className="font-bold text-xs text-white">
                {city.emergencyContacts.womenHelpline.split(" ")[0]}
              </span>
            </div>
          </a>

          <a
            href={`tel:${city.emergencyContacts.ambulance}`}
            className="p-3 rounded-2xl bg-emerald-900/30 border border-emerald-500/30 hover:bg-emerald-900/50 transition-all flex items-center gap-2.5 group"
          >
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-all">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-[10px] font-mono-code uppercase text-emerald-300">
                Ambulance Medical
              </span>
              <span className="font-bold text-xs text-white">
                {city.emergencyContacts.ambulance}
              </span>
            </div>
          </a>

          <a
            href={`tel:${city.emergencyContacts.touristSupport}`}
            className="p-3 rounded-2xl bg-cyan-900/30 border border-cyan-500/30 hover:bg-cyan-900/50 transition-all flex items-center gap-2.5 group"
          >
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 group-hover:scale-110 transition-all">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-[10px] font-mono-code uppercase text-cyan-300">
                Tourist Support
              </span>
              <span className="font-bold text-xs text-white">
                {city.emergencyContacts.touristSupport}
              </span>
            </div>
          </a>
        </div>
      </div>

      {/* REPORTED HAZARDS & CAUTION CORRIDORS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif-title text-lg font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <span>Reported Hazard Zones & Safer Detour Guide</span>
          </h3>
          <span className="text-xs font-mono-code text-slate-400">
            {city.safetyZones.length} Active Monitored Corridors
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {city.safetyZones.map((zone) => (
            <div
              key={zone.id}
              className={`rounded-3xl p-6 border backdrop-blur-xl shadow-xl space-y-4 flex flex-col justify-between ${
                zone.riskLevel === "High Alert"
                  ? "bg-rose-950/30 border-rose-500/30"
                  : zone.riskLevel === "Moderate"
                  ? "bg-amber-950/30 border-amber-500/30"
                  : "bg-emerald-950/30 border-emerald-500/30"
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-mono-code font-bold uppercase ${
                      zone.riskLevel === "High Alert"
                        ? "bg-rose-500 text-white"
                        : zone.riskLevel === "Moderate"
                        ? "bg-amber-500 text-black"
                        : "bg-emerald-500 text-black"
                    }`}
                  >
                    {zone.riskLevel} Risk
                  </span>
                  <span className="font-mono-code text-xs font-bold text-slate-200">
                    Safety Score: {zone.safetyIndex}/100
                  </span>
                </div>

                <h4 className="font-serif-title text-base font-bold text-white">
                  {zone.name}
                </h4>

                {/* Hazards list */}
                <ul className="space-y-1 text-xs text-slate-300 list-disc list-inside">
                  {zone.reportedHazards.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3 pt-2">
                {/* Safer Alternative Recommendation */}
                <div className="p-3 rounded-2xl bg-black/50 border border-white/10 text-xs text-emerald-300">
                  <strong className="block text-[10px] font-mono-code uppercase text-emerald-400 mb-0.5">
                    ✓ Recommended Safe Alternative:
                  </strong>
                  {zone.saferAlternative}
                </div>

                {/* Lighting & Patrol Scores */}
                <div className="flex items-center justify-between text-[11px] font-mono-code text-slate-400 pt-1">
                  <span>Lighting: {zone.lightingScore}/10</span>
                  <span>Patrol: {zone.policePatrolScore}/10</span>
                  <span>CCTV: {zone.cctvCoverage.split(" ")[0]}</span>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* FAKE CALL SIMULATOR MODAL */}
      {isFakeCallActive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl animate-in zoom-in-95 duration-200">
          <div className="w-full max-w-sm rounded-3xl bg-[#090d16] border border-emerald-500/40 p-8 text-center space-y-8 shadow-2xl">
            <div className="space-y-2">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 mx-auto flex items-center justify-center animate-pulse">
                <Phone className="w-10 h-10 text-emerald-400 animate-bounce" />
              </div>
              <h3 className="font-serif-title text-xl font-bold text-white">
                Incoming Call
              </h3>
              <p className="text-sm font-medium text-slate-300">
                Home / Family Security Dispatch
              </p>
              <span className="text-xs font-mono-code text-slate-500">
                +91 98220 01100
              </span>
            </div>

            <p className="text-xs text-slate-400 italic">
              Use this screen to excuse yourself safely from uncomfortable surroundings.
            </p>

            <div className="flex items-center justify-center gap-6">
              <button
                onClick={() => {
                  audioEngine.playChimeNote(523.25);
                  setIsFakeCallActive(false);
                }}
                className="p-5 rounded-full bg-rose-600 hover:bg-rose-500 text-white shadow-xl shadow-rose-600/40 transition-all"
                title="Decline / Dismiss"
              >
                <Phone className="w-6 h-6 rotate-[135deg]" />
              </button>
              <button
                onClick={() => {
                  audioEngine.playChimeNote(783.99);
                  setIsFakeCallActive(false);
                }}
                className="p-5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-600/40 transition-all"
                title="Accept Call"
              >
                <Phone className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUBMIT CITIZEN INCIDENT REPORT MODAL */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#0d121f] border border-cyan-500/30 p-6 md:p-8 shadow-2xl space-y-5">
            <button
              onClick={() => setIsReportModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-xl bg-white/5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-mono-code uppercase font-bold text-cyan-400">
                Citizen Reporting & NLP Sentiment Engine
              </span>
              <h3 className="font-serif-title text-xl font-bold text-white">
                Submit Urban Incident / Hazard
              </h3>
            </div>

            <form onSubmit={handleSubmitReport} className="space-y-3 pt-1">
              <div>
                <label className="block text-xs font-mono-code text-slate-300 mb-1">
                  Incident Category
                </label>
                <select
                  value={repCategory}
                  onChange={(e) =>
                    setRepCategory(e.target.value as CitizenReport["category"])
                  }
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
                >
                  <option value="Broken Streetlight">Broken Streetlight / Dark Alley</option>
                  <option value="Traffic Congestion">Traffic Congestion / Bottleneck</option>
                  <option value="Waterlogging">Waterlogging / Flooding</option>
                  <option value="Safety Concern">Safety Concern / Suspicious Activity</option>
                  <option value="Accident">Accident / Hazard</option>
                  <option value="Community Event">Community Event / Celebration</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono-code text-slate-300 mb-1">
                  Incident Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2 dark streetlights on FC road lane 3"
                  value={repTitle}
                  onChange={(e) => setRepTitle(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono-code text-slate-300 mb-1">
                  Location / Nearest Landmark
                </label>
                <input
                  type="text"
                  placeholder="e.g. Opposite Goodluck Cafe"
                  value={repLocation}
                  onChange={(e) => setRepLocation(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono-code text-slate-300 mb-1">
                  Description & Details
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe the condition so fellow citizens and municipal officials can verify..."
                  value={repDesc}
                  onChange={(e) => setRepDesc(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none resize-none"
                  required
                />
              </div>

              {/* Multimedia attachments simulation */}
              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleVoiceRecord}
                  disabled={isRecordingVoice}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-xs font-mono-code transition-all ${
                    hasVoiceNote
                      ? "bg-emerald-950/40 border-emerald-500 text-emerald-300"
                      : isRecordingVoice
                      ? "bg-rose-900/50 border-rose-500 text-rose-300 animate-pulse"
                      : "bg-black/30 border-white/10 text-slate-300 hover:text-white"
                  }`}
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span>
                    {isRecordingVoice
                      ? "Recording 0:02..."
                      : hasVoiceNote
                      ? "✓ Voice Note Attached"
                      : "Record Voice Note"}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setHasPhoto(!hasPhoto)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-xs font-mono-code transition-all ${
                    hasPhoto
                      ? "bg-emerald-950/40 border-emerald-500 text-emerald-300"
                      : "bg-black/30 border-white/10 text-slate-300 hover:text-white"
                  }`}
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>{hasPhoto ? "✓ Photo Attached" : "Attach Photo"}</span>
                </button>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-xs shadow-lg shadow-cyan-600/30 transition-all pt-3"
              >
                <Send className="w-4 h-4" />
                <span>Publish Verified Report to Smart City Mesh</span>
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
