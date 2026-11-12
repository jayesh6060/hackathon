import React, { useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Trophy, 
  Sparkles, 
  Code2, 
  Cpu, 
  ShieldCheck, 
  ExternalLink,
  ChevronDown,
  Building2,
  Users,
  Compass,
  Zap,
  Bed,
  Package,
  Award,
  Phone,
  MessageSquare,
  Lock
} from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import HeroCountdown from '../components/HeroCountdown';

export default function HomePage({ onNavigate }) {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="w-full bg-[#fafaf7] text-[#0b0b0f] font-sans antialiased">
      
      {/* ======================================================== */}
      {/* HERO SECTION                                             */}
      {/* ======================================================== */}
      <section className="relative overflow-hidden border-b border-neutral-200 bg-[#fafaf7] pt-12 sm:pt-20 pb-16 sm:pb-24">
        {/* Subtle geometric grid background */}
        <div 
          aria-hidden="true" 
          className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(11,11,15,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(11,11,15,0.04)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" 
        />
        {/* Ambient warm orange blur */}
        <div 
          aria-hidden="true" 
          className="pointer-events-none absolute -right-20 -top-20 h-[450px] w-[450px] rounded-full bg-[radial-gradient(circle,rgba(244,112,37,0.12),transparent_70%)]" 
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Top Tag Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono font-semibold uppercase tracking-[0.22em] text-neutral-600 mb-6 sm:mb-8">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F47025] animate-pulse" />
              <span>{SITE_CONFIG.edition} · {SITE_CONFIG.orgCode} · {SITE_CONFIG.year}</span>
            </div>
            <div className="px-2.5 py-1 rounded-full bg-neutral-200/80 text-[#0b0b0f] font-bold">
              Level 1 → Level 2
            </div>
          </div>

          {/* Institutional Presenter */}
          <div className="mb-2">
            <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#F47025] block">
              {SITE_CONFIG.universityName} PRESENTS
            </span>
          </div>

          {/* Giant Title */}
          <h1 className="font-chakra font-black text-6xl sm:text-8xl md:text-9xl tracking-tight leading-[0.92] text-[#0b0b0f] uppercase">
            {SITE_CONFIG.name}
          </h1>

          {/* Tagline */}
          <p className="mt-4 sm:mt-6 text-xl sm:text-3xl font-chakra font-bold text-neutral-700 tracking-tight max-w-3xl">
            {SITE_CONFIG.subTagline} <span className="text-[#F47025]">{SITE_CONFIG.tagline}</span>
          </p>

          {/* Stat Counters & Timeline Strip */}
          <div className="mt-8 sm:mt-10 p-5 sm:p-6 rounded-2xl bg-white border border-neutral-300 shadow-xs max-w-4xl">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-left">
              <div>
                <span className="font-chakra font-black text-3xl sm:text-4xl text-[#F47025] block tabular-nums">
                  {SITE_CONFIG.stats.themes}
                </span>
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-500">
                  Innovation Tracks
                </span>
              </div>
              <div>
                <span className="font-chakra font-black text-3xl sm:text-4xl text-[#0b0b0f] block tabular-nums">
                  {SITE_CONFIG.stats.levels}
                </span>
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-500">
                  Two Challenge Levels
                </span>
              </div>
              <div>
                <span className="font-chakra font-black text-3xl sm:text-4xl text-[#0b0b0f] block tabular-nums">
                  {SITE_CONFIG.stats.hours}H
                </span>
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-500">
                  On-Campus Sprint
                </span>
              </div>
              <div>
                <span className="font-chakra font-black text-3xl sm:text-4xl text-[#F47025] block tabular-nums">
                  {SITE_CONFIG.stats.prizePool}
                </span>
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-500">
                  Cash Prize Pool
                </span>
              </div>
            </div>

            {/* Timeline Progress Bar Graphic */}
            <div className="mt-5 pt-4 border-t border-neutral-200">
              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 mb-1.5 font-bold">
                <span>00H (Kickoff)</span>
                <span className="text-[#F47025]">12H (Midnight Sprint)</span>
                <span>24H (Code Freeze)</span>
              </div>
              <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden border border-neutral-200 relative">
                <div className="h-full w-full bg-gradient-to-r from-neutral-300 via-[#F47025] to-[#F47025] rounded-full" />
              </div>
            </div>
          </div>

          {/* Details Bar & Sponsor Row */}
          <div className="mt-6 flex flex-wrap items-center gap-y-3 gap-x-6 text-xs sm:text-sm font-mono text-neutral-700">
            <span className="font-semibold">{SITE_CONFIG.datesBadge}</span>
            <span className="hidden sm:inline text-neutral-300">•</span>
            <span>📍 {SITE_CONFIG.venue}</span>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3 sm:gap-6 text-xs font-mono text-neutral-500 pt-3 border-t border-neutral-200">
            <span>In Association With: <strong className="text-[#0b0b0f]">{SITE_CONFIG.partners.inAssociationWith}</strong></span>
            <span>•</span>
            <span>In Collaboration With: <strong className="text-[#0b0b0f]">{SITE_CONFIG.partners.inCollaborationWith}</strong></span>
          </div>

          {/* CTA & LIVE COUNTDOWN */}
          <div className="mt-10 sm:mt-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pt-6 border-t border-neutral-300">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => onNavigate('/register')}
                className="px-8 py-4 rounded-xl bg-[#F47025] hover:bg-[#e05e15] text-white font-chakra font-black text-sm uppercase tracking-wider shadow-sm hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Register for Level 1</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('/login')}
                className="px-6 py-4 rounded-xl bg-white border border-neutral-300 hover:border-neutral-900 text-[#0b0b0f] font-mono text-xs font-bold uppercase tracking-wider transition-all text-center cursor-pointer"
              >
                Team Login
              </button>
            </div>

            {/* Countdown Container */}
            <div className="flex flex-col items-start sm:items-end">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-500 mb-1.5">
                Level 1 Submissions Close In
              </span>
              <HeroCountdown />
            </div>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 01 THEMES SECTION                                        */}
      {/* ======================================================== */}
      <section id="themes" className="py-20 sm:py-28 border-b border-neutral-200 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 sm:mb-16">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#F47025] block mb-2">
            01 Themes
          </span>
          <h2 className="font-chakra font-black text-4xl sm:text-6xl text-[#0b0b0f] uppercase tracking-tight">
            Five tracks. One grand champion.
          </h2>
          <p className="mt-3 text-sm sm:text-base font-sans text-neutral-600 max-w-2xl leading-relaxed">
            Every team selects exactly one innovation theme during Level 1 registration. Problem statements are locked and will be revealed on 25 Nov at 10:00 AM.
          </p>
        </div>

        {/* 5 Themes Grid */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
          {SITE_CONFIG.themes.map((theme) => (
            <div 
              key={theme.id}
              className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-md p-6 rounded-2xl bg-white border border-neutral-300 shadow-xs hover:border-[#F47025] hover:-translate-y-1 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-neutral-400 group-hover:text-[#F47025] transition-colors">
                    {theme.number}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-neutral-100 text-neutral-600">
                    Track
                  </span>
                </div>
                <h3 className="font-chakra font-bold text-lg text-[#0b0b0f] mb-2 leading-snug group-hover:text-[#F47025] transition-colors">
                  {theme.title}
                </h3>
                <p className="text-xs text-neutral-600 font-sans leading-relaxed mb-4">
                  {theme.desc}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {theme.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 text-neutral-700">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Locked Problem Statement Indicator */}
                <div className="mb-4 p-3 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
                    <Lock className="w-3.5 h-3.5 text-[#F47025]" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-chakra font-bold text-[11px] text-[#0b0b0f] uppercase tracking-wide">
                      Problem Statement Locked
                    </span>
                    <span className="font-mono text-[10px] text-neutral-500">
                      Revealing on 25 Nov at 10:00 AM
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onNavigate(`/register?theme=${theme.slug}`)}
                className="w-full py-2.5 rounded-lg border border-neutral-300 hover:bg-[#F47025] hover:border-[#F47025] hover:text-white font-mono text-xs font-semibold uppercase tracking-wider text-neutral-800 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Select & Register</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 02 HOW IT WORKS (ONE REGISTRATION. TWO LEVELS)           */}
      {/* ======================================================== */}
      <section id="how-it-works" className="py-20 sm:py-28 border-b border-neutral-200 bg-neutral-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 sm:mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#F47025] block mb-2">
              02 How it works
            </span>
            <h2 className="font-chakra font-black text-4xl sm:text-6xl text-[#0b0b0f] uppercase tracking-tight">
              One registration. Two levels.
            </h2>
            <p className="mt-3 text-sm sm:text-base font-sans text-neutral-600 max-w-2xl leading-relaxed">
              Registration fee is ₹650 per team. You confirm Level 2 attendance if your prototype is selected for the on-campus finale.
            </p>
          </div>

          {/* 3 Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { num: "01", title: "Form your team", desc: "Assemble a squad of 2 to 4 members. Inter-college and multi-department teams are permitted." },
              { num: "02", title: "Submit for Level 1", desc: "Submit your existing working prototype via GitHub repository link and a 3-minute video demo. Registration fee: ₹650." },
              { num: "03", title: "Build at Level 2", desc: "Shortlisted teams attend the 24-hour on-campus residential hackathon at JITD to build live feature enhancements." }
            ].map((step, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-neutral-300 shadow-xs">
                <span className="font-chakra font-black text-2xl text-[#F47025] block mb-3">
                  Step {step.num}
                </span>
                <h3 className="font-chakra font-bold text-lg text-[#0b0b0f] mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Level 01 vs Level 02 Side-by-Side Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            
            {/* Level 01: Prototype Screening (₹650) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-neutral-300 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-200">
                  <div>
                    <span className="font-mono text-xs font-bold text-[#F47025] uppercase tracking-wider block">
                      {SITE_CONFIG.levels.level1.name}
                    </span>
                    <h3 className="font-chakra font-black text-2xl sm:text-3xl text-[#0b0b0f] uppercase">
                      {SITE_CONFIG.levels.level1.title}
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-mono text-xs font-bold">
                    {SITE_CONFIG.levels.level1.fee}
                  </span>
                </div>

                <ul className="space-y-3 mb-6">
                  {SITE_CONFIG.levels.level1.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-neutral-700 font-sans leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => onNavigate('/register')}
                className="w-full py-3.5 rounded-xl bg-[#0b0b0f] hover:bg-[#F47025] text-white font-chakra font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{SITE_CONFIG.levels.level1.cta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Level 02: Enhancement Challenge */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-[#F47025] shadow-md flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#F47025] text-white text-[10px] font-mono font-bold uppercase tracking-widest px-4 py-1 rounded-bl-xl">
                Finale Stage
              </div>

              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-200">
                  <div>
                    <span className="font-mono text-xs font-bold text-[#F47025] uppercase tracking-wider block">
                      {SITE_CONFIG.levels.level2.name}
                    </span>
                    <h3 className="font-chakra font-black text-2xl sm:text-3xl text-[#0b0b0f] uppercase">
                      {SITE_CONFIG.levels.level2.title}
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-orange-100 text-[#F47025] font-mono text-xs font-bold">
                    {SITE_CONFIG.levels.level2.fee}
                  </span>
                </div>

                <ul className="space-y-3 mb-6">
                  {SITE_CONFIG.levels.level2.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-neutral-700 font-sans leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#F47025] flex-shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => onNavigate('/rules#level2')}
                className="w-full py-3.5 rounded-xl bg-[#F47025] hover:bg-[#e05e15] text-white font-chakra font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{SITE_CONFIG.levels.level2.cta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 03 IMPORTANT DATES / TIMELINE                            */}
      {/* ======================================================== */}
      <section id="timeline" className="py-20 sm:py-28 border-b border-neutral-200 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 sm:mb-16">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#F47025] block mb-2">
            03 Important dates
          </span>
          <h2 className="font-chakra font-black text-4xl sm:text-6xl text-[#0b0b0f] uppercase tracking-tight">
            Two levels. One road.
          </h2>
          <p className="mt-3 text-sm sm:text-base font-sans text-neutral-600 max-w-2xl leading-relaxed">
            From prototype submission to the grand finale trophy ceremony. Keep track of all essential milestones.
          </p>
        </div>

        <div className="space-y-10">
          {SITE_CONFIG.timelinePhases.map((phase, pIdx) => (
            <div key={pIdx} className="p-6 sm:p-8 rounded-3xl bg-white border border-neutral-300 shadow-xs">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#F47025] block mb-6">
                {phase.phaseName}
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {phase.events.map((ev, eIdx) => (
                  <div key={eIdx} className="border-l-2 border-[#F47025] pl-4 space-y-2">
                    <span className="inline-block px-2 py-0.5 rounded bg-neutral-100 text-[#0b0b0f] font-mono text-[11px] font-bold">
                      {ev.date}
                    </span>
                    <h4 className="font-chakra font-bold text-base text-[#0b0b0f]">
                      {ev.title}
                    </h4>
                    <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                      {ev.desc}
                    </p>
                    <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-wider text-[#F47025]">
                      {ev.deadlineTag}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 04 WHAT YOU GET (LEVEL 2 INCLUSIONS)                     */}
      {/* ======================================================== */}
      <section className="py-20 sm:py-28 border-b border-neutral-200 bg-neutral-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 sm:mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#F47025] block mb-2">
              04 What you get
            </span>
            <h2 className="font-chakra font-black text-4xl sm:text-6xl text-[#0b0b0f] uppercase tracking-tight">
              Everything's covered.
            </h2>
            <p className="mt-3 text-sm sm:text-base font-sans text-neutral-600 max-w-2xl leading-relaxed">
              For all shortlisted squads attending Level 2 on campus: hospitality, nourishment, and gear are fully taken care of.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {SITE_CONFIG.inclusions.map((item, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white border border-neutral-300 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#F47025] flex items-center justify-center mb-4">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="font-chakra font-bold text-lg text-[#0b0b0f] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Shuttle announcement strip */}
          <div className="p-4 rounded-xl bg-white border border-neutral-300 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 text-neutral-700">
              <Compass className="w-4 h-4 text-[#F47025]" />
              <span><strong>Station Shuttle:</strong> Continuous transit from Davanagere Railway Station (DVG) on 25 Nov morning.</span>
            </div>
            <a href="#venue" className="text-[#F47025] hover:underline font-bold uppercase tracking-wider">
              View Venue & Travel →
            </a>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 05 PRIZES SECTION                                        */}
      {/* ======================================================== */}
      <section id="prizes" className="py-20 sm:py-28 border-b border-neutral-200 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 sm:mb-16">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#F47025] block mb-2">
            05 Prizes
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-chakra font-black text-6xl sm:text-7xl text-[#F47025] block leading-none">
                {SITE_CONFIG.prizes.total}
              </span>
              <h2 className="font-chakra font-black text-4xl sm:text-6xl text-[#0b0b0f] uppercase tracking-tight mt-1">
                On the line.
              </h2>
            </div>
            <p className="text-xs sm:text-sm font-mono text-neutral-600 max-w-md">
              Top 8 finalist squads showcase 4-minute live demonstrations before the grand technical jury from Salutix AI.
            </p>
          </div>
        </div>

        {/* Podium Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {SITE_CONFIG.prizes.podium.map((p, idx) => (
            <div 
              key={idx}
              className={`p-6 sm:p-8 rounded-3xl bg-white border-2 shadow-sm flex flex-col justify-between ${
                idx === 0 ? 'border-[#F47025] shadow-md md:-translate-y-2' : 'border-neutral-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-neutral-100 text-[#0b0b0f]">
                    {p.place} Place
                  </span>
                  {idx === 0 && (
                    <span className="text-xs font-mono font-bold text-[#F47025] uppercase tracking-wider">
                      👑 Grand Trophy
                    </span>
                  )}
                </div>
                <span className="font-chakra font-black text-4xl sm:text-5xl text-[#0b0b0f] block mb-2 tabular-nums">
                  {p.amount}
                </span>
                <h3 className="font-chakra font-bold text-base text-neutral-800 uppercase mb-3">
                  {p.category}
                </h3>
                <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                  {p.perks}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Fun Awards Chips */}
        <div className="p-6 rounded-2xl bg-white border border-neutral-300 shadow-xs mb-8">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#F47025] block mb-3">
            Special & Fun Awards
          </span>
          <div className="flex flex-wrap gap-2">
            {SITE_CONFIG.prizes.funAwards.map((award, i) => (
              <span key={i} className="px-3 py-1.5 rounded-lg bg-neutral-100 text-neutral-800 text-xs font-mono font-semibold">
                ✨ {award}
              </span>
            ))}
          </div>
        </div>

        {/* Banner CTA */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0b0b0f] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-chakra font-bold text-lg sm:text-xl uppercase">
              Registration Fee: ₹650 Per Team.
            </h3>
            <p className="text-xs font-mono text-neutral-400 mt-0.5">
              Get shortlisted and compete for ₹30,000 in cash prizes on campus.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/register')}
            className="px-6 py-3 rounded-xl bg-[#F47025] hover:bg-[#e05e15] text-white font-chakra font-bold text-xs uppercase tracking-wider whitespace-nowrap transition-colors"
          >
            Register Team Now →
          </button>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 06 STARTUPS & CAREERS                                    */}
      {/* ======================================================== */}
      <section className="py-20 sm:py-28 border-b border-neutral-200 bg-neutral-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 sm:mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#F47025] block mb-2">
              06 Startups & careers
            </span>
            <h2 className="font-chakra font-black text-4xl sm:text-6xl text-[#0b0b0f] uppercase tracking-tight">
              {SITE_CONFIG.startupsCareers.heading}
            </h2>
            <p className="mt-3 text-xs font-mono text-neutral-500 max-w-xl">
              {SITE_CONFIG.startupsCareers.disclaimer}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Featured Card */}
            <div className="p-8 rounded-3xl bg-[#0b0b0f] text-white flex flex-col justify-between">
              <div>
                <span className="px-2.5 py-1 rounded bg-[#F47025] text-white text-[10px] font-mono font-bold uppercase tracking-wider mb-4 inline-block">
                  Featured Event
                </span>
                <h3 className="font-chakra font-bold text-2xl uppercase mb-2">
                  {SITE_CONFIG.startupsCareers.featured.title}
                </h3>
                <span className="text-xs font-mono text-[#F47025] block mb-3">
                  {SITE_CONFIG.startupsCareers.featured.time}
                </span>
                <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                  {SITE_CONFIG.startupsCareers.featured.desc}
                </p>
              </div>
            </div>

            {/* 4 Cards Grid */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SITE_CONFIG.startupsCareers.cards.map((c, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white border border-neutral-300 shadow-xs">
                  <h4 className="font-chakra font-bold text-base text-[#0b0b0f] mb-2">
                    {c.title}
                  </h4>
                  <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                    {c.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 07 COMMUNITY (WEEKEND OFF THE CLOCK)                     */}
      {/* ======================================================== */}
      <section className="py-20 sm:py-28 border-b border-neutral-200 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 sm:mb-16">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#F47025] block mb-2">
            07 Community
          </span>
          <h2 className="font-chakra font-black text-4xl sm:text-6xl text-[#0b0b0f] uppercase tracking-tight">
            {SITE_CONFIG.community.heading}
          </h2>
          <p className="mt-2 text-xs font-mono text-neutral-500 uppercase tracking-wider">
            {SITE_CONFIG.community.tagline}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SITE_CONFIG.community.columns.map((col, cIdx) => (
            <div key={cIdx} className="p-6 sm:p-8 rounded-3xl bg-white border border-neutral-300 shadow-xs">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#F47025] block pb-3 mb-4 border-b border-neutral-200">
                {col.category}
              </span>
              <div className="space-y-4">
                {col.items.map((item, iIdx) => (
                  <div key={iIdx}>
                    <strong className="block font-chakra font-bold text-sm text-[#0b0b0f]">
                      {item.title}
                    </strong>
                    <p className="text-xs text-neutral-600 font-sans mt-0.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 08 PARTNERS                                              */}
      {/* ======================================================== */}
      <section className="py-20 sm:py-28 border-b border-neutral-200 bg-neutral-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#F47025] block mb-2">
              08 Partners
            </span>
            <h2 className="font-chakra font-black text-4xl sm:text-5xl text-[#0b0b0f] uppercase tracking-tight">
              Backed by the builders.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-6 rounded-2xl bg-white border border-neutral-300 shadow-xs flex flex-col items-center justify-center text-center">
              <span className="text-[10px] font-mono uppercase text-neutral-500 mb-2">Presented By</span>
              <div className="w-12 h-12 rounded-full bg-[#002B66] text-white flex items-center justify-center font-chakra font-black text-sm mb-2">
                JGI
              </div>
              <strong className="font-chakra font-bold text-sm text-[#0b0b0f]">
                Jain Institute of Technology
              </strong>
              <span className="text-[10px] font-mono text-neutral-500 mt-0.5">Davanagere, Karnataka</span>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-neutral-300 shadow-xs flex flex-col items-center justify-center text-center">
              <span className="text-[10px] font-mono uppercase text-neutral-500 mb-2">In Association With</span>
              <div className="w-12 h-12 rounded-full bg-blue-900 text-white flex items-center justify-center font-chakra font-black text-sm mb-2">
                JGI
              </div>
              <strong className="font-chakra font-bold text-sm text-[#0b0b0f]">
                JGI Group
              </strong>
              <span className="text-[10px] font-mono text-neutral-500 mt-0.5">Academic Network</span>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-neutral-300 shadow-xs flex flex-col items-center justify-center text-center">
              <span className="text-[10px] font-mono uppercase text-neutral-500 mb-2">In Collaboration With</span>
              <div className="w-12 h-12 rounded-xl bg-[#0b0b0f] text-white flex items-center justify-center font-chakra font-bold text-sm mb-2">
                ⚡
              </div>
              <strong className="font-chakra font-bold text-sm text-[#0b0b0f]">
                Salutix AI
              </strong>
              <span className="text-[10px] font-mono text-neutral-500 mt-0.5">Build fast. Commit to it.</span>
            </div>

            <div className="p-6 rounded-2xl bg-white/60 border border-dashed border-neutral-300 flex flex-col items-center justify-center text-center">
              <span className="text-xs font-mono text-neutral-400">
                More partners announced soon
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 09 VENUE & TRAVEL (BOARDING PASS)                        */}
      {/* ======================================================== */}
      <section id="venue" className="py-20 sm:py-28 border-b border-neutral-200 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 sm:mb-16">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#F47025] block mb-2">
            09 Venue & travel
          </span>
          <h2 className="font-chakra font-black text-4xl sm:text-6xl text-[#0b0b0f] uppercase tracking-tight">
            Getting there.
          </h2>
          <p className="mt-3 text-sm sm:text-base font-sans text-neutral-600 max-w-2xl leading-relaxed">
            Travel instructions, station shuttle coordination, and campus coordinates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Boarding Pass Style Card */}
          <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-white border-2 border-neutral-300 shadow-sm relative overflow-hidden font-mono">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-dashed border-neutral-300">
              <span className="text-xs font-bold uppercase tracking-wider text-[#F47025]">
                CAMPUS EXPEDITION BOARDING PASS
              </span>
              <span className="text-xs font-bold text-neutral-500">
                {SITE_CONFIG.venueTravel.passCode}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-4 font-chakra">
              <div>
                <span className="text-[10px] font-mono text-neutral-400 block uppercase">ORIGIN STATION</span>
                <strong className="text-base sm:text-lg text-[#0b0b0f] block mt-0.5">
                  {SITE_CONFIG.venueTravel.from}
                </strong>
                <span className="text-xs font-mono text-neutral-500">{SITE_CONFIG.venueTravel.distance}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-neutral-400 block uppercase">DESTINATION CAMPUS</span>
                <strong className="text-base sm:text-lg text-[#F47025] block mt-0.5">
                  {SITE_CONFIG.venueTravel.to}
                </strong>
                <span className="text-xs font-mono text-neutral-500">JITD Library & Tech Complex</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-orange-50 border border-orange-200 text-xs text-neutral-700 font-sans leading-relaxed mt-4">
              🚌 <strong>Shuttle Service:</strong> {SITE_CONFIG.venueTravel.shuttle}
            </div>
          </div>

          {/* Travel Info Cards */}
          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-white border border-neutral-300 shadow-xs">
              <strong className="font-chakra font-bold text-base text-[#0b0b0f] block mb-1">
                On-site, residential
              </strong>
              <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                Level 2 squads reside on campus during the 24-hour sprint. Accommodation and all meals are provided inside JITD hostel quarters.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-neutral-300 shadow-xs">
              <strong className="font-chakra font-bold text-base text-[#0b0b0f] block mb-1">
                Travel expenses
              </strong>
              <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                Travel costs to Davanagere are participant responsibility. Station-to-campus local shuttles are complimentary.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 10 FAQ SECTION + HELP DESK CONTACTS                      */}
      {/* ======================================================== */}
      <section id="faq" className="py-20 sm:py-28 border-b border-neutral-200 bg-neutral-50/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#F47025] block mb-2">
              10 FAQ
            </span>
            <h2 className="font-chakra font-black text-4xl sm:text-6xl text-[#0b0b0f] uppercase tracking-tight">
              Everything you need to know.
            </h2>
          </div>

          {/* Help Desk Callout Strip */}
          <div className="p-5 rounded-2xl bg-white border border-neutral-300 shadow-xs mb-8 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <div>
              <span className="font-bold text-[#0b0b0f] block">Still stuck after reading these?</span>
              <span className="text-neutral-500">Call our coordinators at the Help Desk:</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {SITE_CONFIG.helpDesk.map((h, i) => (
                <a 
                  key={i}
                  href={`tel:${h.phone}`}
                  className="px-2.5 py-1 rounded bg-neutral-100 hover:bg-[#F47025] hover:text-white transition-colors"
                >
                  <span className="font-bold">{h.name}:</span> {h.phone}
                </a>
              ))}
            </div>
          </div>

          {/* 8 Accordion Questions */}
          <div className="space-y-3">
            {SITE_CONFIG.faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div 
                  key={i}
                  className="rounded-2xl bg-white border border-neutral-300 overflow-hidden shadow-xs transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-chakra font-bold text-base sm:text-lg text-[#0b0b0f]">
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-neutral-400 transition-transform ${isOpen ? 'rotate-180 text-[#F47025]' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-0 text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed border-t border-neutral-100 mt-1">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* FINAL CALL TO ACTION                                     */}
      {/* ======================================================== */}
      <section className="py-24 sm:py-32 bg-[#0b0b0f] text-white select-none text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#F47025] block mb-3">
            CLOCKIT 2026 // JITD
          </span>
          <h2 className="font-chakra font-black text-5xl sm:text-7xl md:text-8xl uppercase tracking-tight leading-none mb-6">
            Your team. Your code. Your moment.
          </h2>
          <p className="text-sm sm:text-base font-sans text-neutral-400 max-w-xl mx-auto mb-10 leading-relaxed">
            Level 1 registration closes strictly on 20 November 2026. Submit your prototype and secure your chance at the ₹30,000 cash prize pool.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('/register')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#F47025] hover:bg-[#e05e15] text-white font-chakra font-black text-sm uppercase tracking-wider shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Register Now (₹650)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('/login')}
              className="w-full sm:w-auto px-6 py-4 rounded-xl border border-neutral-700 hover:border-white text-white font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              Team Login
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

