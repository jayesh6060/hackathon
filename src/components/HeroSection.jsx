import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Calendar, MapPin, ArrowRight, Sparkles, Terminal, Flame, ChevronDown } from 'lucide-react';
import CountdownTimer from './CountdownTimer';
import { HACKATHON_INFO } from '../data/hackathonData';
import { playUiClick } from '../utils/audioSystem';

export default function HeroSection({ scrollProgress = 0 }) {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-anim-item", {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out"
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full z-10"
    >
      {/* Top Telemetry HUD */}
      <div className="hero-anim-item flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-950/70 border border-cyan-500/30 backdrop-blur-md text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-cyan-300 font-bold tracking-wider">FLOW VIDEO LINKED:</span>
          <span className="text-slate-300">{Math.round(scrollProgress * 100)}% SCROLLED</span>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs font-mono text-slate-400">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span>KAIZEN ENGINE V2.6 // ZERO LATENCY</span>
        </div>
      </div>

      {/* Main Center Headline */}
      <div className="my-auto py-12 text-center max-w-4xl mx-auto">
        {/* Japanese Accent Tag */}
        <div className="hero-anim-item inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-950/50 border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-jp tracking-widest mb-6 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
          <span>新未来ハック 2026 // NEURAL SINGULARITY</span>
        </div>

        {/* Title */}
        <h1 className="hero-anim-item text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-cyber tracking-tight leading-none text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
          SHINRAI <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">HACKS</span>
        </h1>

        {/* Powerful Tagline */}
        <p className="hero-anim-item mt-4 sm:mt-6 text-xl sm:text-2xl md:text-3xl font-bold font-cyber text-cyan-300 tracking-wider text-glow-cyan">
          {HACKATHON_INFO.tagline}
        </p>

        {/* Subtitle */}
        <p className="hero-anim-item mt-4 text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
          {HACKATHON_INFO.subheadline}
        </p>

        {/* Event Meta Badges */}
        <div className="hero-anim-item mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-slate-300">
          <div className="flex items-center gap-2.5 glass-flow px-4 py-2 rounded-xl border-cyan-500/20">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold">{HACKATHON_INFO.dates}</span>
          </div>

          <div className="flex items-center gap-2.5 glass-flow px-4 py-2 rounded-xl border-indigo-500/20">
            <MapPin className="w-4 h-4 text-indigo-400" />
            <span className="font-semibold">{HACKATHON_INFO.venue}</span>
          </div>

          <div className="flex items-center gap-2.5 glass-flow px-4 py-2 rounded-xl border-cyan-500/30 text-cyan-300">
            <Flame className="w-4 h-4 text-cyan-400" />
            <span className="font-cyber font-bold">{HACKATHON_INFO.prizePool} BOUNTY</span>
          </div>
        </div>

        {/* Countdown & Action Buttons */}
        <div className="hero-anim-item mt-10 flex flex-col sm:flex-row items-center justify-center gap-8">
          <CountdownTimer targetDate={HACKATHON_INFO.targetDate} />

          <div className="flex items-center gap-4">
            <a
              href="#register"
              onClick={playUiClick}
              className="px-7 py-3.5 bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 text-white font-cyber font-bold text-xs sm:text-sm tracking-wider uppercase cyber-corner shadow-[0_0_25px_rgba(56,189,248,0.5)] hover:shadow-[0_0_40px_rgba(56,189,248,0.8)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <span>REGISTER SQUAD</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#about"
              onClick={playUiClick}
              className="px-6 py-3.5 glass-flow hover:border-cyan-400/50 text-slate-200 hover:text-white font-cyber text-xs uppercase tracking-wider rounded-xl transition-all"
            >
              MISSION BRIEF
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="hero-anim-item flex flex-col items-center justify-center text-center pt-8">
        <span className="text-[11px] font-mono tracking-widest text-cyan-400/80 uppercase mb-2 animate-pulse">
          SCROLL DOWN TO PROGRESS THE GOOGLE FLOW VIDEO
        </span>
        <div className="w-5 h-8 rounded-full border-2 border-cyan-400/40 flex items-start justify-center p-1">
          <div className="w-1.5 h-2 bg-gradient-to-b from-cyan-400 to-indigo-500 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}

