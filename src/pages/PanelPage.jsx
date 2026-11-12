import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  ExternalLink, 
  Award, 
  Scale, 
  Terminal, 
  Save, 
  Sparkles, 
  UserCheck, 
  AlertCircle,
  FileCode,
  Sliders
} from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export default function PanelPage({ onNavigate }) {
  const [selectedTeamId, setSelectedTeamId] = useState("JITD-2026-1042");
  const [reviewerName, setReviewerName] = useState("Dr. Vikram Seth (Salutix AI)");
  const [isSaved, setIsSaved] = useState(false);

  // Scores state
  const [scores, setScores] = useState({
    relevance: 23,   // Max 25
    credibility: 22, // Max 25
    feasibility: 18, // Max 20
    clarity: 13,     // Max 15
    originality: 14  // Max 15
  });

  const [recommendation, setRecommendation] = useState("Shortlist for Level 2");
  const [reviewerNotes, setReviewerNotes] = useState(
    "Very clean architecture. Agent orchestration layer handles intermittent connection timeouts well. Repository commit graph confirms consistent human work over 3 weeks. Shortlisted for Level 2 with mandatory on-site challenge to add real-time streaming audio token synthesis."
  );

  const sampleSubmissions = [
    {
      id: "JITD-2026-1042",
      name: "CyberSentinels",
      lead: "Kiran Kumar",
      college: "Jain Institute of Technology, Davanagere",
      theme: "AI & Autonomous Systems",
      prototypeTitle: "AgentGuard: Multi-Agent Autonomous Threat Mitigation Pipeline",
      repo: "https://github.com/cybersentinels/agent-guard",
      demo: "https://youtu.be/sample-clockit-demo",
      desc: "An intelligent autonomous multi-agent defense system that observes incoming container telemetry, predicts DDoS and privilege escalation vectors, and synthesizes dynamic eBPF firewall filters in sub-50ms."
    },
    {
      id: "JITD-2026-3401",
      name: "NeuroPulse",
      lead: "Sagar Patil",
      college: "UBDT College of Engineering, Davanagere",
      theme: "HealthTech & Bio-Informatics",
      prototypeTitle: "EdgeECG: Quantized Arrhythmia Predictor on ESP32",
      repo: "https://github.com/neuropulse/ecg-edge-ml",
      demo: "https://youtu.be/sample-ecg-demo",
      desc: "Sub-1mW wearable ECG monitor leveraging an 8-bit quantized TinyML neural network deployed directly on ESP32 microcontrollers, triggering encrypted alerts over LoRa mesh."
    },
    {
      id: "JITD-2026-6731",
      name: "SwiftPay Mesh",
      lead: "Praveen Rao",
      college: "PES University, Bengaluru",
      theme: "FinTech & Digital Payments",
      prototypeTitle: "OfflineMesh: Zero-Connectivity Micro-Payments",
      repo: "https://github.com/swiftpay/offline-mesh",
      demo: "https://youtu.be/sample-swift-demo",
      desc: "Peer-to-peer micro-payments protocol utilizing cryptographic double-spend proof vouchers over Bluetooth Low Energy (BLE) and Wi-Fi Direct for rural retail booths."
    }
  ];

  const currentSubmission = sampleSubmissions.find(s => s.id === selectedTeamId) || sampleSubmissions[0];
  const totalScore = scores.relevance + scores.credibility + scores.feasibility + scores.clarity + scores.originality;

  const handleScoreChange = (field, val) => {
    setIsSaved(false);
    setScores(prev => ({
      ...prev,
      [field]: parseInt(val) || 0
    }));
  };

  const handleSaveEvaluation = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#fafaf7] text-[#0b0b0f] font-sans py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Back Link */}
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 hover:text-[#F47025] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Overview</span>
        </button>

        {/* Console Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-[#002B66]/10 text-[#002B66] text-xs font-mono font-bold uppercase tracking-wider">
                Technical Jury Console
              </span>
              <span className="text-xs font-mono text-neutral-500">
                Salutix AI · {SITE_CONFIG.orgCode}
              </span>
            </div>
            <h1 className="font-chakra font-black text-3xl sm:text-4xl text-[#0b0b0f] uppercase">
              Prototype Scoring Panel
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 font-sans">
              Score submissions against the 5 standardized criteria and submit official Level 2 shortlist recommendations.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3.5 py-2 rounded-xl bg-white border border-neutral-300 font-mono text-xs">
              <span className="text-neutral-500 block text-[10px]">Active Evaluator</span>
              <span className="font-bold text-neutral-900">{reviewerName}</span>
            </div>
          </div>
        </div>

        {/* Main Grid: Left Queue & Submission Info, Right Rubric Scoring */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Queue & Team Submission (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Team Selector Queue */}
            <div className="p-5 rounded-2xl bg-white border border-neutral-300 shadow-xs space-y-3">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-500 block">
                Assigned Evaluation Queue ({sampleSubmissions.length})
              </span>
              <div className="space-y-2">
                {sampleSubmissions.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => {
                      setSelectedTeamId(sub.id);
                      setIsSaved(false);
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                      selectedTeamId === sub.id
                        ? 'border-[#F47025] bg-orange-50/50 shadow-xs'
                        : 'border-neutral-200 hover:border-neutral-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-chakra font-bold text-sm text-[#0b0b0f]">
                        {sub.name}
                      </span>
                      <span className="font-mono text-[10px] text-neutral-500">
                        {sub.id}
                      </span>
                    </div>
                    <span className="text-xs font-sans text-neutral-600 block truncate mt-0.5">
                      {sub.prototypeTitle}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Prototype Detail Card */}
            <div className="p-6 rounded-2xl bg-white border border-neutral-300 shadow-xs space-y-4">
              <div className="pb-3 border-b border-neutral-200">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#F47025] block mb-1">
                  {currentSubmission.theme}
                </span>
                <h3 className="font-chakra font-bold text-xl text-[#0b0b0f] leading-snug">
                  {currentSubmission.prototypeTitle}
                </h3>
                <span className="text-xs font-mono text-neutral-500 block mt-1">
                  Team: {currentSubmission.name} · Lead: {currentSubmission.lead}
                </span>
                <span className="text-xs font-sans text-neutral-500 block mt-0.5">
                  {currentSubmission.college}
                </span>
              </div>

              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-600 block mb-1">
                  Architecture Summary:
                </span>
                <p className="text-xs text-neutral-700 font-sans leading-relaxed">
                  {currentSubmission.desc}
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-2">
                <a
                  href={currentSubmission.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-mono text-xs font-semibold transition-colors"
                >
                  <FileCode className="w-3.5 h-3.5 text-[#002B66]" />
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-3 h-3 text-neutral-400" />
                </a>

                <a
                  href={currentSubmission.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-mono text-xs font-semibold transition-colors"
                >
                  <Terminal className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Loom Video Walkthrough</span>
                  <ExternalLink className="w-3 h-3 text-neutral-400" />
                </a>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: 5 Rubric Criteria Sliders & Scoring Form (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <form onSubmit={handleSaveEvaluation} className="p-6 sm:p-8 rounded-3xl bg-white border border-neutral-300 shadow-xs space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
                <div>
                  <h2 className="font-chakra font-black text-2xl uppercase text-[#0b0b0f]">
                    Evaluation Rubric
                  </h2>
                  <p className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
                    5 Standardized Criteria · Total: 100 Points
                  </p>
                </div>

                <div className="text-right">
                  <span className="font-mono text-xs text-neutral-500 block">Total Score</span>
                  <span className="font-chakra font-black text-3xl sm:text-4xl text-[#F47025]">
                    {totalScore}<span className="text-sm font-sans text-neutral-400">/100</span>
                  </span>
                </div>
              </div>

              {/* Slider 1: Problem Relevance */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="font-bold text-neutral-800">
                    1. Problem Relevance & Domain Significance
                  </span>
                  <span className="font-bold text-[#002B66]">{scores.relevance} / 25 pts</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="25"
                  value={scores.relevance}
                  onChange={(e) => handleScoreChange('relevance', e.target.value)}
                  className="w-full accent-[#002B66]"
                />
                <p className="text-[11px] text-neutral-500 font-sans">
                  Assessment of problem framing, user need validation, and domain impact.
                </p>
              </div>

              {/* Slider 2: Prototype Credibility */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="font-bold text-neutral-800">
                    2. Prototype Credibility & Code Quality
                  </span>
                  <span className="font-bold text-[#002B66]">{scores.credibility} / 25 pts</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="25"
                  value={scores.credibility}
                  onChange={(e) => handleScoreChange('credibility', e.target.value)}
                  className="w-full accent-[#002B66]"
                />
                <p className="text-[11px] text-neutral-500 font-sans">
                  Working implementation, modular architecture, Git commit authenticity.
                </p>
              </div>

              {/* Slider 3: Technical Feasibility */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="font-bold text-neutral-800">
                    3. Technical Feasibility & Production Readiness
                  </span>
                  <span className="font-bold text-[#002B66]">{scores.feasibility} / 20 pts</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={scores.feasibility}
                  onChange={(e) => handleScoreChange('feasibility', e.target.value)}
                  className="w-full accent-[#002B66]"
                />
                <p className="text-[11px] text-neutral-500 font-sans">
                  Scalability, database latency, API efficiency, and handling edge failures.
                </p>
              </div>

              {/* Slider 4: Clarity & Documentation */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="font-bold text-neutral-800">
                    4. Clarity, Documentation & Video Pitch
                  </span>
                  <span className="font-bold text-[#002B66]">{scores.clarity} / 15 pts</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="15"
                  value={scores.clarity}
                  onChange={(e) => handleScoreChange('clarity', e.target.value)}
                  className="w-full accent-[#002B66]"
                />
                <p className="text-[11px] text-neutral-500 font-sans">
                  Crisp README instructions, API contracts, and high-impact Loom demo.
                </p>
              </div>

              {/* Slider 5: Originality */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="font-bold text-neutral-800">
                    5. Originality & Distinctive Innovation
                  </span>
                  <span className="font-bold text-[#002B66]">{scores.originality} / 15 pts</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="15"
                  value={scores.originality}
                  onChange={(e) => handleScoreChange('originality', e.target.value)}
                  className="w-full accent-[#002B66]"
                />
                <p className="text-[11px] text-neutral-500 font-sans">
                  Unique technological novelty, creative algorithmic choices, or fresh UX.
                </p>
              </div>

              {/* Recommendation Decision */}
              <div className="pt-2 border-t border-neutral-200">
                <label className="block font-mono text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                  Official Recommendation Decision
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Shortlist for Level 2', 'Needs Technical Viva', 'Reject'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setRecommendation(opt)}
                      className={`py-2 px-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider border transition-all ${
                        recommendation === opt
                          ? opt.includes('Shortlist')
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                            : opt.includes('Viva')
                            ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                            : 'bg-red-600 text-white border-red-600 shadow-xs'
                          : 'bg-neutral-50 text-neutral-600 border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Qualitative Reviewer Feedback */}
              <div>
                <label className="block font-mono text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Evaluator Technical Notes & Level 2 Mandatory Enhancement
                </label>
                <textarea
                  rows="3"
                  value={reviewerNotes}
                  onChange={(e) => setReviewerNotes(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-xs font-mono focus:border-[#F47025] focus:outline-none leading-relaxed"
                  placeholder="Specific architectural notes and proposed on-site enhancements..."
                />
              </div>

              {/* Save Button & Feedback State */}
              <div className="pt-2 flex items-center justify-between">
                <div>
                  {isSaved && (
                    <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-700 font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Evaluation Saved & Synchronized to Database!</span>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#F47025] hover:bg-[#e05e15] text-white font-chakra font-bold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Lock & Submit Score ({totalScore}/100)</span>
                </button>
              </div>

            </form>
          </div>

        </div>

      </div>
    </div>
  );
}

