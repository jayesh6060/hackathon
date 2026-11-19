import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';
import {
  Calendar, MapPin, Trophy, Crown, ArrowRight, ArrowUp, ArrowUpRight, Sparkles, Check,
  Clock, ShieldCheck, QrCode, Download, Share2, Copy, RefreshCw,
  Compass, ChevronRight, ChevronDown, HelpCircle, Building,
  ExternalLink, Layers, Award, Play, Users, Star, Phone, MessageSquare,
  Flame, Terminal, Zap, BookOpen, Send, CheckCircle2, AlertCircle, Lock
} from 'lucide-react';
import CountdownTimer from './CountdownTimer';
import CanvasVideoBackground from './CanvasVideoBackground';
import ParticleCanvas from './ParticleCanvas';
import HelpDeskModal from './HelpDeskModal';
import {
  HACKATHON_INFO,
  ADVISORY_COMMITTEE,
  FACULTY_COORDINATORS,
  STUDENT_COORDINATORS,
  DEPARTMENT_LEADERS,
  GUILD_TRACKS,
  PRIZES,
  CONTINUOUS_SCHEDULE,
  CHECKPOINT_TIMELINE,
  FAQS
} from '../data/hackathonData';
import { playUiClick, playFantasyHarpChime, toggleBgmSoundtrack } from '../utils/audioSystem';

gsap.registerPlugin(ScrollTrigger);

export default function ContinuousAnimeExperience() {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [helpDeskOpen, setHelpDeskOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(GUILD_TRACKS[0].id);
  const [activeFaq, setActiveFaq] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const lenisRef = useRef(null);

  // Initialize Lenis Momentum Smooth Scrolling Engine
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
    });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    let lastProgress = -1;
    lenis.on('scroll', (e) => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        const current = e.scroll / maxScroll;
        // Throttle React state update to avoid jank from 120fps component re-renders
        if (Math.abs(current - lastProgress) > 0.008) {
          lastProgress = current;
          setScrollProgress(Math.min(Math.max(current, 0), 1));
        }
      }
    });

    // Fallback native scroll listener for high reliability
    const handleNativeScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        const current = window.scrollY / maxScroll;
        if (Math.abs(current - lastProgress) > 0.008) {
          lastProgress = current;
          setScrollProgress(Math.min(Math.max(current, 0), 1));
        }
      }
    };
    window.addEventListener('scroll', handleNativeScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleNativeScroll);
      lenis.destroy();
    };
  }, []);

  // Registration Form State
  const [formData, setFormData] = useState({
    teamName: '',
    leaderName: '',
    leaderEmail: '',
    leaderPhone: '',
    college: 'Jain Institute of Technology, Davanagere',
    selectedDomain: GUILD_TRACKS[0].id,
    teamSize: 3,
  });
  const [loading, setLoading] = useState(false);
  const [registeredTicket, setRegisteredTicket] = useState(null);
  const [copied, setCopied] = useState(false);

  // Audio Toggle
  const handleToggleAudio = () => {
    const newState = toggleBgmSoundtrack();
    setIsAudioPlaying(newState);
  };

  // Smooth scroll to anchor using Lenis
  const scrollToAnchor = (id) => {
    playUiClick();
    const elem = document.getElementById(id);
    if (elem) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(elem, { offset: -70, duration: 1.2 });
      } else {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Form submit
  const handleRegister = (e) => {
    e.preventDefault();
    if (!formData.teamName || !formData.leaderName || !formData.leaderEmail) {
      alert("Please complete required guild fields.");
      return;
    }

    setLoading(true);
    playFantasyHarpChime();

    const randomId = "JITD-" + Math.floor(1000 + Math.random() * 9000);
    const newPass = {
      id: randomId,
      teamName: formData.teamName,
      leader: formData.leaderName,
      email: formData.leaderEmail,
      phone: formData.leaderPhone,
      track: GUILD_TRACKS.find(t => t.id === formData.selectedDomain)?.name || "Classified Arena 01",
      size: formData.teamSize,
      college: formData.college || "JITD Davanagere",
      date: "25 – 26 Nov 2026",
      venue: "JITD Library",
    };

    setTimeout(() => {
      setLoading(false);
      setRegisteredTicket(newPass);

      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#F6A43A', '#8BC9ED', '#FF7138', '#ffffff']
      });
    }, 900);
  };

  const copyTicketId = () => {
    if (!registeredTicket) return;
    navigator.clipboard.writeText(registeredTicket.id);
    setCopied(true);
    playUiClick();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative min-h-screen bg-[#101A2B] text-[#F3EBDD] font-sans overflow-x-hidden selection:bg-[#F6A43A] selection:text-[#101A2B]">
      
      {/* 1. Full Canvas Anime Video & Dynamic Glow Backdrop (Zero Overlap) */}
      <CanvasVideoBackground scrollProgress={scrollProgress} />

      {/* Floating Golden/Cyan Anime Ember Particles */}
      <ParticleCanvas />

      {/* 2. Floating Island Glassmorphism Navigation Bar */}
      <header className="sticky top-2 sm:top-4 z-50 w-full px-2 sm:px-4 md:px-6 max-w-7xl mx-auto select-none">
        <div className="w-full h-16 sm:h-18 px-3.5 sm:px-5 md:px-6 rounded-2xl sm:rounded-3xl bg-[#0b1329]/55 backdrop-blur-2xl backdrop-saturate-150 border border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.45),inset_0_1px_1px_0_rgba(255,255,255,0.22)] flex items-center justify-between gap-2 sm:gap-4 transition-all duration-300">
          
          {/* Left Brand: JGI Blue Badge + Jain Institute of Technology X Salutixai */}
          <div 
            onClick={() => scrollToAnchor('hero')}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group flex-shrink-0"
          >
            {/* JGI Blue Circular Badge with Luminous Glass Ring */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-[#002B66]/90 flex items-center justify-center shadow-[0_0_15px_rgba(0,43,102,0.8),inset_0_1px_1px_rgba(255,255,255,0.3)] border border-white/30 flex-shrink-0 group-hover:scale-105 transition-transform">
              <span className="font-chakra font-black text-[11px] sm:text-xs md:text-[13px] text-white tracking-tighter">
                JGI
              </span>
            </div>

            <div className="h-6 w-[1px] bg-gradient-to-b from-white/30 via-white/15 to-transparent hidden sm:block" />

            <div className="flex flex-col text-left leading-tight">
              <span className="font-chakra font-bold text-xs sm:text-[13px] xl:text-sm tracking-wide text-white uppercase group-hover:text-[#F6A43A] transition-colors whitespace-nowrap drop-shadow-sm flex items-center gap-1 sm:gap-1.5">
                <span className="hidden xl:inline">Jain Institute of Technology</span>
                <span className="xl:hidden">JIT Davanagere</span>
                <span className="text-[#F6A43A] font-black">X</span>
                <span className="text-[#38bdf8]">Salutixai</span>
              </span>
              <span className="text-[8.5px] sm:text-[9.5px] font-mono tracking-[0.14em] text-[#8BC9ED] uppercase font-semibold">
                Davanagere · CLOCKIT 2026
              </span>
            </div>
          </div>

          {/* Desktop Nav Links (Frosted Capsule Track) */}
          <nav className="hidden xl:flex items-center gap-0.5 p-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(0,0,0,0.2)] font-mono text-[11px] font-semibold uppercase tracking-wider flex-shrink-0">
            <button 
              onClick={() => scrollToAnchor('hero')} 
              className="px-2.5 xl:px-3 py-1.5 rounded-full text-neutral-300 hover:text-white hover:bg-white/10 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] transition-all cursor-pointer"
            >
              Overview
            </button>
            <button 
              onClick={() => scrollToAnchor('tracks')} 
              className="px-2.5 xl:px-3 py-1.5 rounded-full text-neutral-300 hover:text-white hover:bg-white/10 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] transition-all cursor-pointer"
            >
              Tracks
            </button>
            <button 
              onClick={() => scrollToAnchor('prizes')} 
              className="px-2.5 xl:px-3 py-1.5 rounded-full text-neutral-300 hover:text-white hover:bg-white/10 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] transition-all cursor-pointer"
            >
              Prizes
            </button>
            <button 
              onClick={() => scrollToAnchor('schedule')} 
              className="px-2.5 xl:px-3 py-1.5 rounded-full text-neutral-300 hover:text-white hover:bg-white/10 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] transition-all cursor-pointer"
            >
              Schedule
            </button>
            <button 
              onClick={() => scrollToAnchor('advisory')} 
              className="px-2.5 xl:px-3 py-1.5 rounded-full text-neutral-300 hover:text-white hover:bg-white/10 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] transition-all cursor-pointer"
            >
              Advisory
            </button>
            <button 
              onClick={() => scrollToAnchor('faq')} 
              className="px-2.5 xl:px-3 py-1.5 rounded-full text-neutral-300 hover:text-white hover:bg-white/10 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] transition-all cursor-pointer"
            >
              FAQ
            </button>
          </nav>

          {/* Right Action Cluster (Frosted Glass Interactive Elements) */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">

            {/* Help Desk Modal Trigger (Frosted Glass Capsule) */}
            <button
              onClick={() => setHelpDeskOpen(true)}
              className="hidden 2xl:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl font-mono text-[11px] text-neutral-200 hover:text-[#F6A43A] bg-white/5 hover:bg-white/10 border border-white/15 hover:border-[#F6A43A]/50 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)] transition-all cursor-pointer flex-shrink-0"
            >
              <Phone className="w-3.5 h-3.5 text-[#F6A43A]" />
              <span>Help desk</span>
            </button>

            {/* Register CTA Button (Direct link to Google Form in new tab) */}
            <a
              href="https://forms.gle/4UKxifNAgwn1NUri7"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 sm:px-4 xl:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#F6A43A] via-[#FF7138] to-[#F6A43A] hover:from-[#FFB959] hover:to-[#FF8955] text-[#101A2B] font-chakra font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(246,164,58,0.45),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:shadow-[0_0_30px_rgba(246,164,58,0.7)] hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap flex-shrink-0"
            >
              <span>Register Squad</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* 3. HERO SECTION (THE GOLDEN SPIRE & CLOCKIT 2026)          */}
      {/* ========================================================= */}
      <section id="hero" className="relative min-h-[85vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 z-10">
        
        {/* 3D Gold Title & Clean Non-Glowing 2026 */}
        <div className="relative select-none max-w-5xl mx-auto">
          <h1 className="text-gold-3d font-chakra font-black text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] tracking-tight leading-none uppercase">
            CLOCKIT
          </h1>
          
          {/* 2026: Clean Non-Glowing Gold Outline */}
          <div className="relative -mt-2 sm:-mt-5 select-none flex items-center justify-center pl-[0.24em]">
            <div className="text-outline-gold font-chakra font-black text-4xl sm:text-6xl md:text-7xl lg:text-[6rem] select-none">
              2026
            </div>
          </div>
        </div>

        {/* Tagline & Subheadline Sleek Compact Capsule (Legible, Balanced & Proportionate) */}
        <div className="mt-4 max-w-xl w-full mx-auto px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-2xl bg-[#070e1f]/75 backdrop-blur-xl border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all">
          <p className="font-chakra font-bold text-xs sm:text-sm md:text-base text-white tracking-[0.18em] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] flex items-center justify-center flex-wrap gap-1.5 sm:gap-2">
            <span>BUILD</span>
            <span className="text-[#F6A43A] text-xs drop-shadow-[0_0_8px_rgba(246,164,58,0.8)]">✦</span>
            <span>BATTLE</span>
            <span className="text-[#F6A43A] text-xs drop-shadow-[0_0_8px_rgba(246,164,58,0.8)]">✦</span>
            <span>CONQUER</span>
          </p>
          <p className="mt-1 text-[11px] sm:text-xs font-sans text-neutral-200 font-medium leading-relaxed drop-shadow-[0_1px_5px_rgba(0,0,0,0.85)] max-w-lg mx-auto">
            {HACKATHON_INFO.subheadline}
          </p>
        </div>

        {/* Event Date & Campus Pill */}
        <div className="mt-4 inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-4 sm:px-5 py-1.5 rounded-xl bg-[#070e1f]/80 border border-white/15 backdrop-blur-md text-[11px] sm:text-xs font-mono text-[#F3EBDD] shadow-md">
          <span>📅 <strong className="text-white">25 – 26 Nov 2026</strong></span>
          <span className="text-white/30">•</span>
          <span>⚡ <strong className="text-[#F6A43A]">24H Continuous Sprint</strong></span>
          <span className="text-white/30">•</span>
          <span>📍 <strong className="text-[#38bdf8]">JITD Library, Davanagere</strong></span>
        </div>

        {/* Sponsors Row: JITD, JGI, Salutix AI */}
        <div className="mt-3 inline-flex flex-wrap items-center justify-center gap-2.5 sm:gap-5 px-4 py-1.5 rounded-xl bg-[#070e1f]/70 border border-white/10 backdrop-blur-md text-[10px] sm:text-[11px] font-mono text-neutral-300 shadow-md">
          <span>Presented by: <strong className="text-white">JITD</strong></span>
          <span className="text-white/20">•</span>
          <span>In Association With: <strong className="text-[#8BC9ED]">JGI Group</strong></span>
          <span className="text-white/20">•</span>
          <span>In Collaboration With: <strong className="text-[#F6A43A]">Salutix AI</strong></span>
        </div>

        {/* Giant Prize Pool Callout & Live Countdown Timer */}
        <div className="mt-6 sm:mt-8 p-5 sm:p-6 rounded-3xl bg-[#101A2B]/85 border-2 border-[#F6A43A]/50 shadow-2xl backdrop-blur-xl max-w-4xl w-full flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="text-left space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#F6A43A] block">
              Official Trophy Pool
            </span>
            <div className="font-chakra font-black text-4xl sm:text-5xl text-[#F6A43A] tabular-nums tracking-tight">
              ₹ 30,000 <span className="text-xs sm:text-sm font-mono text-neutral-300 font-semibold uppercase">CASH PRIZE</span>
            </div>
            <p className="text-xs text-neutral-400 font-sans">
              1st: ₹15,000 + Salutix AI Internship · 2nd: ₹10,000 · 3rd: ₹5,000
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <span className="text-[11px] font-mono text-[#8BC9ED] uppercase tracking-wider mb-2 font-bold">
              Countdown to Sprint Kickoff
            </span>
            <CountdownTimer targetDate={HACKATHON_INFO.targetDate} />
          </div>
        </div>

        {/* Action CTAs */}
        <div className="mt-5 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <a
            href="https://forms.gle/4UKxifNAgwn1NUri7"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#F6A43A] to-[#FF7138] hover:scale-105 text-[#101A2B] font-chakra font-black text-sm uppercase tracking-wider shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Register Squad (₹650)</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <button
            onClick={() => scrollToAnchor('tracks')}
            className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-[#F3EBDD] font-chakra font-bold text-sm uppercase tracking-wider transition-all cursor-pointer"
          >
            Explore 5 Tracks
          </button>
        </div>

        {/* Registration Closed Notification Pill (Pure Notification - Not a Link) */}
        <div className="mt-6 inline-flex items-center gap-3 sm:gap-3.5 px-6 py-3 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl bg-[#070e1f]/90 border sm:border-2 border-[#F6A43A]/70 backdrop-blur-xl shadow-[0_6px_35px_rgba(246,164,58,0.35)] select-none">
          <span className="relative flex h-3 w-3 sm:h-3.5 sm:w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F6A43A] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 sm:h-3.5 sm:w-3.5 bg-[#F6A43A] shadow-[0_0_8px_#F6A43A]"></span>
          </span>
          <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#F6A43A]" />
          <span className="font-mono text-xs sm:text-sm md:text-base font-bold uppercase tracking-wider text-[#F6A43A]">
            Registration
          </span>
          <span className="font-mono text-xs sm:text-sm md:text-base font-black text-white uppercase tracking-wide">
            Has Been Closed
          </span>
        </div>

      </section>

      {/* ========================================================= */}
      {/* 4. SECTION 01: ABOUT & PILLARS                            */}
      {/* ========================================================= */}
      <section id="about" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-white/10">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#F6A43A] block mb-2">
            01 About The Expedition
          </span>
          <h2 className="font-chakra font-black text-3xl sm:text-5xl text-[#F3EBDD] uppercase">
            A 24-Hour Continuous Engineering Sprint
          </h2>
          <p className="mt-3 text-xs sm:text-sm font-sans text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            Hosted live inside the spacious, fully equipped JITD Library. Fast network, round-the-clock power, mentorship, and hot meals provided.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#101A2B]/80 border border-white/15 backdrop-blur-xl space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F6A43A]/20 text-[#F6A43A] flex items-center justify-center mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-chakra font-bold text-xl text-[#F3EBDD] uppercase">
              24H Continuous Build
            </h3>
            <p className="text-xs text-neutral-300 font-sans leading-relaxed">
              Unseal your code at 11:30 AM on Day 01. Build overnight under high-speed connectivity and push commits until the 11:30 AM freeze on Day 02.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-[#101A2B]/80 border border-[#8BC9ED]/30 backdrop-blur-xl space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#8BC9ED]/20 text-[#8BC9ED] flex items-center justify-center mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-chakra font-bold text-xl text-[#F3EBDD] uppercase">
              Salutix AI Mentors & Jury
            </h3>
            <p className="text-xs text-neutral-300 font-sans leading-relaxed">
              Receive 1:1 architectural feedback from industry AI engineers and startup founders. Two dedicated mentorship checkpoints during the marathon.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-[#101A2B]/80 border border-[#FF7138]/30 backdrop-blur-xl space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FF7138]/20 text-[#FF7138] flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-chakra font-bold text-xl text-[#F3EBDD] uppercase">
              100% Student IP Retained
            </h3>
            <p className="text-xs text-neutral-300 font-sans leading-relaxed">
              Every line of code and architecture you build remains 100% your squad's intellectual property. Registration fee: ₹650 per team.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. SECTION 02: THE 5 GUILD TRACKS                         */}
      {/* ========================================================= */}
      <section id="tracks" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-white/10">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#F6A43A] block mb-2">
            02 Guild Innovation Tracks
          </span>
          <h2 className="font-chakra font-black text-3xl sm:text-5xl text-[#F3EBDD] uppercase">
            Five Arenas. One Grand Champion.
          </h2>
          <p className="mt-3 text-xs sm:text-sm font-sans text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            Choose your specialization. Problem statements are strictly locked under seal and will unlock on 25 Nov at 10:00 AM.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {GUILD_TRACKS.map((track, idx) => (
            <div 
              key={track.id}
              className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-md p-6 sm:p-7 rounded-3xl bg-[#101A2B]/85 border border-white/15 hover:border-[#F6A43A] backdrop-blur-xl transition-all flex flex-col justify-between group shadow-xl hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#F6A43A]/20 text-[#F6A43A] font-bold border border-[#F6A43A]/30">
                    {track.badge}
                  </span>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 font-bold flex items-center gap-1">
                    <Lock className="w-3 h-3 text-red-400" />
                    <span>LOCKED</span>
                  </span>
                </div>

                <h3 className="font-chakra font-bold text-xl text-[#F3EBDD] group-hover:text-[#F6A43A] transition-colors leading-snug mb-1">
                  {track.name}
                </h3>
                <span className="text-[11px] font-mono text-[#8BC9ED] block mb-4">
                  {track.category}
                </span>

                {/* Completely Locked Problem Statement Container */}
                <div className="mb-5 p-5 rounded-2xl bg-[#0b1329]/90 border border-[#F6A43A]/40 text-center relative overflow-hidden shadow-inner group-hover:border-[#F6A43A] transition-all">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#F6A43A]/10 via-transparent to-transparent pointer-events-none" />
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-12 h-12 rounded-2xl bg-[#F6A43A]/15 border border-[#F6A43A]/50 flex items-center justify-center mb-2.5 shadow-[0_0_20px_rgba(246,164,58,0.25)]">
                      <Lock className="w-6 h-6 text-[#F6A43A] animate-pulse" />
                    </div>
                    <span className="font-chakra font-black text-xs sm:text-sm text-[#F6A43A] uppercase tracking-widest block mb-1">
                      Problem Statement Completely Locked
                    </span>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-200 font-mono text-[11px] font-bold mb-3">
                      <Clock className="w-3 h-3 text-[#8BC9ED]" />
                      <span>Unlocks on 25 Nov at 10:00 AM</span>
                    </div>
                    {/* Encrypted Visual Bars */}
                    <div className="w-full space-y-1.5 my-1 opacity-60">
                      <div className="h-2 w-4/5 mx-auto rounded bg-gradient-to-r from-white/10 via-white/25 to-white/10 animate-pulse" />
                      <div className="h-2 w-3/5 mx-auto rounded bg-gradient-to-r from-white/10 via-white/25 to-white/10 animate-pulse" />
                    </div>
                    <p className="text-[11px] text-neutral-400 font-sans leading-relaxed mt-2">
                      Live challenge brief, dataset requirements, and evaluation rubrics will be revealed at the opening keynote.
                    </p>
                  </div>
                </div>
              </div>

              <a
                href="https://forms.gle/4UKxifNAgwn1NUri7"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl border border-[#F6A43A]/40 bg-[#F6A43A]/10 hover:bg-[#F6A43A] hover:text-[#101A2B] text-neutral-100 font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer group-hover:shadow-[0_0_20px_rgba(246,164,58,0.3)]"
              >
                <span>Enlist Squad</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. SECTION 03: CASH PRIZES & PODIUM                       */}
      {/* ========================================================= */}
      <section id="prizes" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-white/10">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#F6A43A] block mb-2">
            03 Spoils & Bounties
          </span>
          <h2 className="font-chakra font-black text-4xl sm:text-6xl text-[#F6A43A] uppercase">
            ₹ 30,000 Cash Prize Pool
          </h2>
          <p className="mt-2 text-xs sm:text-sm font-mono text-neutral-300 uppercase tracking-widest">
            Bestowed Live At The Valedictory Coronation On 26 Nov 2026
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {PRIZES.podium.map((p, idx) => (
            <div 
              key={idx}
              className={`p-6 sm:p-8 rounded-3xl bg-[#101A2B]/85 border-2 shadow-2xl backdrop-blur-xl flex flex-col justify-between ${
                idx === 0 ? 'border-[#F6A43A] md:-translate-y-3' : 'border-white/15'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-white/10 text-white">
                    {p.place} Place
                  </span>
                  {idx === 0 && (
                    <span className="text-xs font-mono font-bold text-[#F6A43A] uppercase tracking-wider">
                      👑 Grand Trophy
                    </span>
                  )}
                </div>
                <div className="font-chakra font-black text-4xl sm:text-5xl text-[#F6A43A] mb-2 tabular-nums">
                  {p.cash}
                </div>
                <h3 className="font-chakra font-bold text-base text-neutral-200 uppercase mb-4">
                  {p.title}
                </h3>
                <ul className="space-y-2 mb-6">
                  {p.perks.map((perk, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-neutral-300 font-sans leading-relaxed">
                      <Check className="w-3.5 h-3.5 text-[#F6A43A] flex-shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. SECTION 04: 24-HOUR CHECKPOINT TIMELINE (HIGH CONTRAST) */}
      {/* ========================================================= */}
      <section id="schedule" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10 border-t border-white/10">
        <div className="text-center mb-16 sm:mb-24 relative z-10">
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#0c1626]/90 border border-[#F6A43A]/40 shadow-[0_0_20px_rgba(246,164,58,0.25)] backdrop-blur-xl mb-3">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#F6A43A]">
              04 The 24-Hour Timeline
            </span>
          </div>
          <h2 className="font-chakra font-black text-3xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-[#FFF2B2] via-[#F6A43A] to-[#FF8B3D] uppercase filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] tracking-wide">
            Continuous Sprint Checkpoints
          </h2>
          <div className="mt-3 inline-block px-5 py-2 rounded-2xl bg-[#0b1320]/85 border border-white/15 backdrop-blur-xl shadow-[0_8px_24px_rgba(0,0,0,0.6)] max-w-xl mx-auto">
            <p className="text-xs sm:text-sm font-sans font-medium text-[#FFECC7] leading-relaxed">
              From arrival & kit distribution to midnight pitch reviews and the final grand award gala.
            </p>
          </div>
        </div>

        {/* Checkpoint Timeline Container */}
        <div className="relative">
          
          {/* Continuous Glowing Center Line (Desktop center, Mobile left-6) */}
          <div 
            aria-hidden="true"
            className="absolute left-6 md:left-1/2 -translate-x-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#F6A43A] via-[#38bdf8] to-[#fbbf24] shadow-[0_0_12px_rgba(56,189,248,0.5)]"
          />

          {/* Timeline Checkpoints */}
          <div className="space-y-12 md:space-y-20">
            {CHECKPOINT_TIMELINE.map((item, idx) => {
              const isLeft = idx % 2 === 0;

              return (
                <div 
                  key={item.id}
                  className="relative flex flex-col md:flex-row items-start md:items-center w-full group"
                >
                  {/* Central Node Circle (Desktop: centered on line, Mobile: at left-6) */}
                  <div 
                    className="absolute left-6 md:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#101A2B] border-2 flex items-center justify-center z-20 transition-transform duration-300 group-hover:scale-125"
                    style={{ 
                      borderColor: item.color,
                      boxShadow: `0 0 14px ${item.glowColor}`
                    }}
                  >
                    <div 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: item.color }} 
                    />
                  </div>

                  {/* DESKTOP LAYOUT (Alternating Left & Right) */}
                  <div className="hidden md:flex items-center justify-between w-full">
                    {/* Left Column (44% width) */}
                    <div className={`w-[44%] ${isLeft ? 'text-right' : 'flex justify-end'}`}>
                      {isLeft ? (
                        /* Content on the Left inside high-contrast dark frosted card */
                        <div className="p-5 rounded-2xl bg-[#0b1424]/90 border border-white/15 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.7)] transition-all duration-300 group-hover:border-[#F6A43A]/50 group-hover:shadow-[0_15px_45px_rgba(0,0,0,0.9)] space-y-1.5 text-right">
                          <span 
                            className="font-mono text-xs font-bold tracking-wider uppercase block"
                            style={{ color: item.color }}
                          >
                            {item.time}
                          </span>
                          <h3 className="font-chakra font-black text-xl sm:text-2xl text-[#FFE8A3] tracking-wide uppercase leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] group-hover:text-white transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-[#E2E8F0] font-sans leading-relaxed font-medium">
                            {item.desc}
                          </p>
                        </div>
                      ) : (
                        /* Phase Badge on the Left (for Right-aligned content) */
                        <div className="flex justify-end pr-6">
                          <span 
                            className="px-4 py-1.5 rounded-xl border text-xs font-mono font-bold tracking-wider backdrop-blur-xl bg-[#0b1424]/90 shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover:scale-105"
                            style={{ 
                              borderColor: item.color, 
                              color: item.color,
                              boxShadow: `0 0 12px ${item.glowColor}`
                            }}
                          >
                            {item.phase}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Spacer for center line (12% width) */}
                    <div className="w-[12%]" />

                    {/* Right Column (44% width) */}
                    <div className={`w-[44%] ${isLeft ? 'flex justify-start' : 'text-left'}`}>
                      {isLeft ? (
                        /* Phase Badge on the Right (for Left-aligned content) */
                        <div className="flex justify-start pl-6">
                          <span 
                            className="px-4 py-1.5 rounded-xl border text-xs font-mono font-bold tracking-wider backdrop-blur-xl bg-[#0b1424]/90 shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover:scale-105"
                            style={{ 
                              borderColor: item.color, 
                              color: item.color,
                              boxShadow: `0 0 12px ${item.glowColor}`
                            }}
                          >
                            {item.phase}
                          </span>
                        </div>
                      ) : (
                        /* Content on the Right inside high-contrast dark frosted card */
                        <div className="p-5 rounded-2xl bg-[#0b1424]/90 border border-white/15 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.7)] transition-all duration-300 group-hover:border-[#F6A43A]/50 group-hover:shadow-[0_15px_45px_rgba(0,0,0,0.9)] space-y-1.5 text-left">
                          <span 
                            className="font-mono text-xs font-bold tracking-wider uppercase block"
                            style={{ color: item.color }}
                          >
                            {item.time}
                          </span>
                          <h3 className="font-chakra font-black text-xl sm:text-2xl text-[#FFE8A3] tracking-wide uppercase leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] group-hover:text-white transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-[#E2E8F0] font-sans leading-relaxed font-medium">
                            {item.desc}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* MOBILE LAYOUT (< md screens: Single Column on right of vertical line) */}
                  <div className="md:hidden pl-14 pr-2 w-full">
                    <div className="p-4 rounded-2xl bg-[#0b1424]/90 border border-white/15 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.7)] space-y-2">
                      {/* Phase Badge */}
                      <span 
                        className="inline-block px-3 py-1 rounded-md border text-[11px] font-mono font-bold tracking-wider backdrop-blur-md bg-[#101A2B]/80"
                        style={{ 
                          borderColor: item.color, 
                          color: item.color,
                          boxShadow: `0 0 8px ${item.glowColor}`
                        }}
                      >
                        {item.phase}
                      </span>

                      {/* Time Tag */}
                      <span 
                        className="font-mono text-xs font-bold tracking-wider uppercase block"
                        style={{ color: item.color }}
                      >
                        {item.time}
                      </span>

                      {/* Title */}
                      <h3 className="font-chakra font-black text-lg text-[#FFE8A3] tracking-wide uppercase leading-snug drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-[#E2E8F0] font-sans leading-relaxed font-medium">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Secondary Detail Strip: 24H Hall Open & Amenities */}
        <div className="mt-16 p-6 rounded-3xl bg-[#101A2B]/85 border border-white/10 backdrop-blur-xl flex flex-wrap items-center justify-around gap-6 text-center max-w-xl mx-auto">
          <div>
            <span className="font-chakra font-black text-2xl sm:text-3xl text-[#F6A43A] block">24 HOURS</span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Continuous Sprints</span>
          </div>
          <div className="h-8 w-[1px] bg-white/10 hidden sm:block" />
          <div>
            <span className="font-chakra font-black text-2xl sm:text-3xl text-amber-400 block">₹ 30,000</span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Valedictory Cash Podium</span>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. SECTION 05: ORGANIZERS & DEPARTMENT HEADS              */}
      {/* ========================================================= */}
      <section id="advisory" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative z-10 border-t border-white/10">
        <div className="text-center mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#F6A43A] block mb-2">
            05 Organizing Committee
          </span>
          <h2 className="font-chakra font-black text-3xl sm:text-5xl text-[#F3EBDD] uppercase">
            Organizers & Department Heads
          </h2>
          <p className="mt-2 text-xs sm:text-sm font-sans text-neutral-300">
            Jain Institute of Technology, Davanagere
          </p>
        </div>

        {/* 3 Organizers Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {DEPARTMENT_LEADERS.map((d, i) => (
            <div 
              key={`hod-${i}`} 
              className="p-6 sm:p-7 rounded-3xl bg-[#101A2B]/85 border border-emerald-500/30 hover:border-emerald-400 backdrop-blur-xl transition-all text-center space-y-2.5 shadow-xl group hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400 font-chakra font-black text-base shadow-sm">
                {d.hod.replace('Dr. ', '').slice(0, 1)}
              </div>
              <span className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-wider block">
                {d.role}
              </span>
              <strong className="font-chakra font-black text-lg text-white block">
                {d.hod}
              </strong>
              <span className="text-xs font-sans text-neutral-300 block">
                {d.department}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 9. SECTION 06: FACULTY & STUDENT COORDINATORS             */}
      {/* ========================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10 border-t border-white/10">
        <div className="p-8 rounded-3xl bg-[#101A2B]/90 border border-white/20 backdrop-blur-xl">
          <div className="text-center mb-8">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#F6A43A] block mb-1">
              Need Assistance?
            </span>
            <h3 className="font-chakra font-black text-2xl sm:text-3xl uppercase text-white">
              Faculty & Student Coordinators
            </h3>
            <p className="text-xs text-neutral-300 font-sans mt-1">
              Direct tap-to-call or WhatsApp for inquiries, logistics, team pairing, or campus arrivals.
            </p>
          </div>

          {/* Faculty Coordinators */}
          <div className="mb-8">
            <h4 className="font-mono text-xs font-bold text-[#8BC9ED] uppercase tracking-wider mb-3 text-center sm:text-left">
              Faculty Coordinators
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {FACULTY_COORDINATORS.map((coord, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center space-y-2 hover:border-[#8BC9ED]/50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-[#8BC9ED]/20 text-[#8BC9ED] flex items-center justify-center mx-auto font-chakra font-black text-sm">
                    {coord.name.slice(0, 1)}
                  </div>
                  <strong className="font-chakra font-bold text-base text-white block">
                    {coord.name}
                  </strong>
                  <span className="text-[10px] font-mono text-[#8BC9ED] block font-semibold">
                    {coord.role}
                  </span>
                  <div className="pt-2 flex items-center justify-center gap-2">
                    <a
                      href={`tel:${coord.rawPhone}`}
                      className="px-3 py-1.5 rounded-lg bg-[#002B66] hover:bg-[#003980] text-white font-mono text-xs font-bold transition-colors flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3" />
                      <span>Call</span>
                    </a>
                    <a
                      href={coord.whatsapp}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs font-bold transition-colors flex items-center gap-1"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Student Coordinators */}
          <div>
            <h4 className="font-mono text-xs font-bold text-[#F6A43A] uppercase tracking-wider mb-3 text-center sm:text-left">
              Student Coordinators
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {STUDENT_COORDINATORS.map((coord, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center space-y-2 hover:border-[#F6A43A]/50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-[#F6A43A]/20 text-[#F6A43A] flex items-center justify-center mx-auto font-chakra font-black text-sm">
                    {coord.name.slice(0, 1)}
                  </div>
                  <strong className="font-chakra font-bold text-base text-white block">
                    {coord.name}
                  </strong>
                  <span className="text-[10px] font-mono text-neutral-400 block">
                    {coord.role}
                  </span>
                  <div className="pt-2 flex items-center justify-center gap-2">
                    <a
                      href={`tel:${coord.rawPhone}`}
                      className="px-3 py-1.5 rounded-lg bg-[#002B66] hover:bg-[#003980] text-white font-mono text-xs font-bold transition-colors flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3" />
                      <span>Call</span>
                    </a>
                    <a
                      href={coord.whatsapp}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs font-bold transition-colors flex items-center gap-1"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 10. SECTION 07: FAQ ACCORDION                             */}
      {/* ========================================================= */}
      <section id="faq" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto relative z-10 border-t border-white/10">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#F6A43A] block mb-2">
            07 Questions & Answers
          </span>
          <h2 className="font-chakra font-black text-3xl sm:text-5xl text-[#F3EBDD] uppercase">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div 
                key={idx}
                className="rounded-2xl bg-[#101A2B]/80 border border-white/15 overflow-hidden backdrop-blur-xl transition-colors"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-chakra font-bold text-base sm:text-lg text-white">
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-[#F6A43A] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-0 text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed border-t border-white/5 mt-1">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 08. FOOTER (RESPONSIVE COMPACT MOBILE & RICH DESKTOP)     */}
      {/* ========================================================= */}
      <footer className="w-full bg-[#0b0b0f] text-[#fafaf7] border-t border-white/10 pt-10 sm:pt-14 pb-8 sm:pb-12 relative z-10 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Grid: On Mobile 1 col (Brand on top, then 2-col Links Grid); on Desktop 5 cols */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 pb-8 sm:pb-10 border-b border-white/10 text-left">
            
            {/* Brand & Details (Span 2 on Desktop) */}
            <div className="lg:col-span-2 space-y-3.5">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#002B66] flex items-center justify-center border border-white/20 flex-shrink-0">
                  <span className="font-chakra font-black text-[11px] sm:text-xs text-white">JGI</span>
                </div>
                <div className="font-chakra font-black text-xs sm:text-sm md:text-base tracking-wide uppercase leading-tight">
                  <span className="text-white">JAIN INSTITUTE OF TECHNOLOGY</span>
                  <span className="text-[#F47025] mx-1 sm:mx-1.5 font-black">X</span>
                  <span className="text-[#38bdf8]">SALUTIXAI</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-neutral-400 font-sans max-w-sm leading-relaxed">
                A two-level, prototype-based, 24-hour residential hackathon at Jain Institute of Technology, Davanagere. Registration fee is ₹650; register your team of 2–4.
              </p>

              <div className="space-y-1 font-mono text-[11px] sm:text-xs text-neutral-300">
                <p>📅 <span className="font-semibold text-white">25 - 26 November 2026</span></p>
                <p>📍 <span>JITD Library & Innovation Hub, Davanagere Campus</span></p>
                <p>🏆 <span className="text-[#F47025] font-bold">₹ 30,000 Cash Prize Pool</span></p>
              </div>

              <div className="pt-1 sm:pt-2">
                <a
                  href="https://forms.gle/4UKxifNAgwn1NUri7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#F47025] hover:bg-[#e05e15] text-white font-chakra font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md inline-flex items-center justify-center gap-1.5"
                >
                  <span>REGISTER →</span>
                </a>
              </div>
            </div>

            {/* Links Section: On Mobile 2-column grid; on Desktop 3 columns */}
            <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
              
              {/* Column A: Event Links */}
              <div className="space-y-2.5">
                <h4 className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#F47025]">
                  EVENT
                </h4>
                <ul className="space-y-1.5 text-[11px] sm:text-xs font-mono text-neutral-400">
                  <li>
                    <button onClick={() => scrollToAnchor('tracks')} className="hover:text-white transition-colors cursor-pointer text-left">
                      Themes & Tracks
                    </button>
                  </li>
                  <li>
                    <button onClick={() => scrollToAnchor('schedule')} className="hover:text-white transition-colors cursor-pointer text-left">
                      Timeline
                    </button>
                  </li>
                  <li>
                    <button onClick={() => scrollToAnchor('schedule')} className="hover:text-white transition-colors cursor-pointer text-left">
                      Event Schedule
                    </button>
                  </li>
                  <li>
                    <button onClick={() => scrollToAnchor('about')} className="hover:text-white transition-colors cursor-pointer text-left">
                      Rules & Eligibility
                    </button>
                  </li>
                  <li>
                    <button onClick={() => scrollToAnchor('advisory')} className="hover:text-white transition-colors cursor-pointer text-left">
                      Advisory Committee
                    </button>
                  </li>
                  <li>
                    <button onClick={() => scrollToAnchor('faq')} className="hover:text-white transition-colors cursor-pointer text-left">
                      FAQ
                    </button>
                  </li>
                </ul>
              </div>

              {/* Column B: Participants Links */}
              <div className="space-y-2.5">
                <h4 className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#F47025]">
                  PARTICIPANTS
                </h4>
                <ul className="space-y-1.5 text-[11px] sm:text-xs font-mono text-neutral-400">
                  <li>
                    <a href="https://forms.gle/4UKxifNAgwn1NUri7" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-pointer text-left block">
                      Register
                    </a>
                  </li>
                  <li>
                    <a href="https://forms.gle/4UKxifNAgwn1NUri7" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-pointer text-left block">
                      Team Login
                    </a>
                  </li>
                  <li>
                    <button onClick={() => scrollToAnchor('about')} className="hover:text-white transition-colors cursor-pointer text-left">
                      Screening Checklist
                    </button>
                  </li>
                  <li>
                    <button onClick={() => scrollToAnchor('about')} className="hover:text-white transition-colors cursor-pointer text-left">
                      Ownership Verification
                    </button>
                  </li>
                  <li>
                    <button onClick={() => scrollToAnchor('prizes')} className="hover:text-white transition-colors cursor-pointer text-left">
                      Judging Weights
                    </button>
                  </li>
                </ul>
              </div>

              {/* Column C: Organisers & Help Desk */}
              <div className="col-span-2 sm:col-span-1 space-y-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
                <div>
                  <h4 className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#F47025] mb-2">
                    ORGANISERS
                  </h4>
                  <ul className="space-y-1.5 text-[11px] sm:text-xs font-mono text-neutral-400">
                    <li>
                      <button onClick={() => setHelpDeskOpen(true)} className="hover:text-white transition-colors inline-flex items-center gap-1 cursor-pointer">
                        <span>Admin Panel</span>
                        <ArrowUpRight className="w-3 h-3 text-neutral-500" />
                      </button>
                    </li>
                    <li>
                      <button onClick={() => setHelpDeskOpen(true)} className="hover:text-white transition-colors inline-flex items-center gap-1 cursor-pointer">
                        <span>Review Panel Login</span>
                        <ArrowUpRight className="w-3 h-3 text-neutral-500" />
                      </button>
                    </li>
                  </ul>
                </div>

                <div className="pt-1">
                  <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                    HELP DESK
                  </span>
                  <div className="grid grid-cols-1 gap-1 font-mono text-[11px] sm:text-xs">
                    {STUDENT_COORDINATORS.map((h, i) => (
                      <a key={i} href={`tel:${h.rawPhone || h.phone}`} className="text-neutral-300 hover:text-[#F47025] transition-colors truncate">
                        <span className="font-semibold text-white">{h.name}:</span> {h.phone}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Strip: Copyright + Back to top */}
          <div className="pt-6 sm:pt-8 flex flex-col-reverse sm:flex-row items-center justify-between text-[11px] sm:text-xs font-mono text-neutral-500 gap-3 sm:gap-4 text-center sm:text-left">
            <p>
              &copy; 2026 Jain Institute of Technology, Davanagere. In collaboration with Salutix AI.
            </p>
            <button
              onClick={() => scrollToAnchor('hero')}
              className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer group"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

        </div>
      </footer>

      {/* Help Desk Modal */}
      <HelpDeskModal 
        isOpen={helpDeskOpen}
        onClose={() => setHelpDeskOpen(false)}
      />

    </div>
  );
}

