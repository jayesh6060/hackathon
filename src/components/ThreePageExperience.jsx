import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import confetti from 'canvas-confetti';
import {
  Calendar, MapPin, Trophy, Crown, ArrowRight, Sparkles, Check,
  Clock, ShieldCheck, QrCode, Download, Share2, Copy, RefreshCw,
  Compass, ChevronRight, ChevronDown, HelpCircle, Building,
  ExternalLink, Layers, Award, Play, Users, Star, Phone, MessageSquare, Lock
} from 'lucide-react';
import CountdownTimer from './CountdownTimer';
import CanvasVideoBackground from './CanvasVideoBackground';
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

export default function ThreePageExperience() {
  const [activePage, setActivePage] = useState(0); // Exactly 3 pages: 0 = Home, 1 = Prizes, 2 = Register
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [scene2Tab, setScene2Tab] = useState('prizes'); // 'prizes', 'tracks'
  const [selectedTrack, setSelectedTrack] = useState(GUILD_TRACKS[0].id);
  const [inspectedTrack, setInspectedTrack] = useState(null);

  const isAnimatingRef = useRef(false);
  const progressTweenRef = useRef({ val: 0 });

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

  // Exact 1-Scroll = 1-Page Transition Function
  const goToPage = (targetIndex, optionalTab = null) => {
    if (targetIndex < 0 || targetIndex > 2) return;
    if (optionalTab) setScene2Tab(optionalTab);
    if (isAnimatingRef.current && activePage === targetIndex) return;

    isAnimatingRef.current = true;
    setActivePage(targetIndex);
    playUiClick();

    const targetProgress = targetIndex === 0 ? 0.0 : targetIndex === 1 ? 0.5 : 1.0;

    gsap.to(progressTweenRef.current, {
      val: targetProgress,
      duration: 0.85,
      ease: "power2.out",
      onUpdate: () => {
        setScrollProgress(progressTweenRef.current.val);
      },
      onComplete: () => {
        setTimeout(() => {
          isAnimatingRef.current = false;
        }, 220); // cooldown prevents duplicate wheel trigger
      }
    });
  };

  // Wheel Event Listener: Exactly ONE Scroll flick transitions ONE page
  useEffect(() => {
    let wheelAccumulator = 0;
    let wheelTimeout = null;

    const handleWheel = (e) => {
      // If cursor is inside a scrollable card (like form or prizes), allow internal scroll if not at boundary
      const target = e.target;
      const scrollableParent = target.closest('.overflow-y-auto');
      if (scrollableParent) {
        const { scrollTop, scrollHeight, clientHeight } = scrollableParent;
        const canScrollDown = scrollTop + clientHeight < scrollHeight - 4;
        const canScrollUp = scrollTop > 4;
        if ((e.deltaY > 0 && canScrollDown) || (e.deltaY < 0 && canScrollUp)) {
          return;
        }
      }

      e.preventDefault();

      if (isAnimatingRef.current) return;

      wheelAccumulator += e.deltaY;

      // Threshold to trigger page change
      if (Math.abs(wheelAccumulator) >= 28) {
        if (wheelAccumulator > 0) {
          // Scroll down: exactly 1 page forward
          if (activePage < 2) {
            goToPage(activePage + 1);
          }
        } else {
          // Scroll up: exactly 1 page backward
          if (activePage > 0) {
            goToPage(activePage - 1);
          }
        }
        wheelAccumulator = 0;
      }

      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => {
        wheelAccumulator = 0;
      }, 180);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (wheelTimeout) clearTimeout(wheelTimeout);
    };
  }, [activePage]);

  // Touch Swipe Listener for Mobile: Exactly ONE Swipe transitions ONE page
  useEffect(() => {
    let touchStartY = 0;

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (isAnimatingRef.current) return;
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;

      // Swipe threshold: 35px
      if (Math.abs(diff) > 35) {
        if (diff > 0 && activePage < 2) {
          // Swipe up: advance 1 page
          goToPage(activePage + 1);
        } else if (diff < 0 && activePage > 0) {
          // Swipe down: previous 1 page
          goToPage(activePage - 1);
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [activePage]);

  // Keyboard navigation: ArrowDown / ArrowUp / PageDown / PageUp
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        if (activePage < 2) {
          e.preventDefault();
          goToPage(activePage + 1);
        }
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        if (activePage > 0) {
          e.preventDefault();
          goToPage(activePage - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePage]);

  const handleRegister = (e) => {
    e.preventDefault();
    playUiClick();
    setLoading(true);

    const ticketId = `CLOCKIT-${Math.floor(100000 + Math.random() * 900000)}`;
    const pass = {
      id: ticketId,
      team: formData.teamName || "CLOCKIT SQUAD",
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
      setRegisteredTicket(pass);
      playFantasyHarpChime();
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#F6A43A', '#FF7138', '#8BC9ED', '#ffffff']
      });
    }, 850);
  };

  const copyPassId = () => {
    if (!registeredTicket) return;
    playUiClick();
    navigator.clipboard.writeText(registeredTicket.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Discrete, Non-Overlapping Vertical Slide Transition
  // Scene 0: 0% -> -100%
  // Scene 1: +100% -> 0% -> -100%
  // Scene 2: +100% -> 0%
  const getSceneStyle = (pageIndex) => {
    // Current virtual page float: 0.0 (Page 0), 1.0 (Page 1), 2.0 (Page 2)
    const currentPageFloat = scrollProgress * 2;
    const diff = pageIndex - currentPageFloat;
    const offset = diff * 100; // in %
    const isVisible = Math.abs(diff) < 1.05;

    return {
      transform: `translate3d(0, ${offset}%, 0)`,
      opacity: isVisible ? Math.max(0, 1 - Math.abs(diff) * 0.35) : 0,
      pointerEvents: Math.abs(diff) < 0.25 ? 'auto' : 'none',
      visibility: isVisible ? 'visible' : 'hidden',
    };
  };

  return (
    <div className="fixed inset-0 w-full h-screen overflow-hidden bg-[#101A2B] select-none">
      {/* 60FPS Hardware-Accelerated Canvas Video Scrub Engine */}
      <CanvasVideoBackground scrollProgress={scrollProgress} />

      {/* Main Full-Screen Layout */}
      <div className="relative w-full h-full flex flex-col justify-between overflow-hidden">
        
        {/* Top Header: Floating Island Glassmorphism Capsule */}
        <header className="relative z-40 w-full pt-3 sm:pt-4 px-3 sm:px-6 max-w-7xl mx-auto pointer-events-auto select-none">
          <div className="w-full h-15 sm:h-16 px-3.5 sm:px-5 md:px-6 rounded-2xl sm:rounded-3xl bg-[#0b1329]/55 backdrop-blur-2xl backdrop-saturate-150 border border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.45),inset_0_1px_1px_0_rgba(255,255,255,0.22)] flex items-center justify-between gap-2 sm:gap-4 transition-all duration-300">
            
            {/* Left Brand Identity: JGI Logo + JAIN INSTITUTE OF TECHNOLOGY */}
            <div className="flex items-center gap-2 sm:gap-3 cursor-pointer group flex-shrink-0" onClick={() => goToPage(0)}>
              {/* JGI Circular Logo Badge with Luminous Glass Ring */}
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#002B66]/90 flex items-center justify-center shadow-[0_0_15px_rgba(0,43,102,0.8),inset_0_1px_1px_rgba(255,255,255,0.3)] border border-white/30 flex-shrink-0 group-hover:scale-105 transition-transform">
                <span className="font-chakra font-black text-[11px] sm:text-xs text-white tracking-tighter">JGI</span>
              </div>

              <div className="h-6 w-[1px] bg-gradient-to-b from-white/30 via-white/15 to-transparent hidden sm:block" />

              {/* JAIN INSTITUTE OF TECHNOLOGY X SALUTIXAI */}
              <div className="flex flex-col text-left leading-tight">
                <span className="font-chakra font-bold text-[11px] sm:text-xs xl:text-sm tracking-wide text-white uppercase group-hover:text-[#F6A43A] transition-colors whitespace-nowrap flex items-center gap-1 sm:gap-1.5">
                  <span className="hidden xl:inline">Jain Institute of Technology</span>
                  <span className="xl:hidden">JIT Davanagere</span>
                  <span className="text-[#F6A43A] font-black">X</span>
                  <span className="text-[#38bdf8]">Salutixai</span>
                </span>
                <span className="text-[7.5px] sm:text-[9.5px] font-mono tracking-[0.14em] text-[#8BC9ED] uppercase font-semibold">
                  DAVANAGERE, KARNATAKA · CLOCKIT 2026
                </span>
              </div>
            </div>

            {/* Center Navbar Links from Mockup (Frosted Capsule Track) */}
            <nav className="hidden xl:flex items-center gap-0.5 p-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(0,0,0,0.2)] text-[11px] font-chakra font-bold tracking-wider uppercase text-[#F3EBDD]/80 flex-shrink-0">
              {[
                { label: "THEMES", tab: "themes" },
                { label: "TIMELINE", tab: "timeline" },
                { label: "SCHEDULE", tab: "timeline" },
                { label: "RULES", tab: "rules" },
                { label: "ADVISORY", tab: "advisory" },
                { label: "FAQ", tab: "faq" },
              ].map((item, idx) => {
                const isCurrent = activePage === 1 && scene2Tab === item.tab;
                return (
                  <button
                    key={idx}
                    onClick={() => goToPage(1, item.tab)}
                    className={`px-3 py-1 rounded-full transition-all cursor-pointer relative hover:text-white hover:bg-white/10 ${
                      isCurrent ? 'text-[#F6A43A] bg-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]' : ''
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Right Action Cluster: Help Desk, Team Login, Register Free Button */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 text-xs font-chakra font-semibold tracking-wider flex-shrink-0">
              {/* Help Desk Link (Frosted Glass) */}
              <button
                onClick={() => goToPage(1, 'advisory')}
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/15 bg-white/5 backdrop-blur-xl hover:bg-white/10 hover:border-[#F6A43A]/40 text-neutral-200 hover:text-[#F6A43A] transition-colors cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5 text-[#8BC9ED]" />
                <span>HELP DESK</span>
              </button>

              {/* Team Login */}
              <button
                onClick={() => goToPage(2)}
                className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white uppercase cursor-pointer transition-colors"
              >
                TEAM LOGIN
              </button>

              {/* Register Button */}
              <button
                onClick={() => goToPage(2)}
                className="px-3.5 sm:px-5 py-2 rounded-xl bg-gradient-to-r from-[#F6A43A] via-[#FF7138] to-[#F6A43A] hover:from-[#FFB959] hover:to-[#FF8955] text-[#101A2B] font-chakra font-black text-[11px] sm:text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(246,164,58,0.45),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:shadow-[0_0_30px_rgba(246,164,58,0.7)] hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <span>REGISTER (₹650)</span>
                <span className="text-xs">➔</span>
              </button>
            </div>
          </div>
        </header>

        {/* ======================================================== */}
        {/* MAIN CINEMATIC STAGE: 3 SMOOTHLY TRANSLATING SCENES     */}
        {/* ======================================================== */}
        <main className="relative z-20 flex-1 flex items-center justify-center px-4 sm:px-6 max-w-7xl mx-auto w-full">
          
          {/* ======================================================= */}
          {/* SCENE 0: EXACT REPLICA OF OFFICIAL POSTER MOCKUP        */}
          {/* ======================================================= */}
          <div
            style={getSceneStyle(0)}
            className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-8 py-3 will-change-transform will-change-opacity flex flex-col justify-between items-center pointer-events-auto"
          >
            {/* FLOATING HUD DIAL (UPPER-LEFT) */}
            <div className="hidden lg:flex absolute top-3 left-6 xl:left-8 items-center justify-center pointer-events-none">
              <div className="relative w-28 h-28 xl:w-32 xl:h-32 flex items-center justify-center">
                {/* Rotating Circular Text Ring */}
                <svg viewBox="0 0 120 120" className="w-full h-full animate-[spin_32s_linear_infinite]">
                  <path
                    id="dialCirclePath"
                    d="M 60, 60 m -44, 0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
                    fill="none"
                  />
                  <text className="font-mono text-[8.5px] font-bold fill-[#8BC9ED] tracking-[0.24em] uppercase opacity-90">
                    <textPath href="#dialCirclePath" startOffset="0%">
                      • COMPETE • CONQUER • CODE • CREATE
                    </textPath>
                  </text>
                </svg>

                {/* Outer Dashed Orbit */}
                <div className="absolute inset-1 rounded-full border border-dashed border-[#F6A43A]/40" />

                {/* Cyber Brackets */}
                <span className="absolute -left-1 top-1/2 -translate-y-1/2 text-sm font-mono text-[#F6A43A]/70 font-bold">[</span>
                <span className="absolute -right-1 top-1/2 -translate-y-1/2 text-sm font-mono text-[#F6A43A]/70 font-bold">]</span>

                {/* Center Core: 24 HOURS */}
                <div className="absolute inset-4 rounded-full bg-[#101A2B]/85 border border-[#F6A43A]/70 backdrop-blur-md flex flex-col items-center justify-center shadow-[0_0_20px_rgba(246,164,58,0.35)]">
                  <span className="font-chakra font-black text-2xl xl:text-3xl text-white leading-none">24</span>
                  <span className="font-chakra font-bold text-[9px] xl:text-[10px] tracking-widest text-[#F6A43A] uppercase mt-0.5">HOURS</span>
                </div>
              </div>
            </div>

            {/* FLOATING TIMELINE AXIS (UPPER-RIGHT) */}
            <div className="hidden lg:flex absolute top-5 right-6 xl:right-8 flex-col items-end text-[10px] font-mono text-slate-400 pointer-events-none">
              <div className="flex items-center gap-1.5">
                <span className="text-white font-bold tracking-wider">00H</span>
                <span className="w-2.5 h-[1px] bg-white/40" />
              </div>
              <div className="h-5 w-[1px] bg-white/20 my-1 mr-1" />
              <div className="flex items-center gap-1.5">
                <span className="text-[#F6A43A] font-bold tracking-wider">24H</span>
                <span className="w-3.5 h-[1.5px] bg-[#F6A43A]" />
              </div>
              <div className="h-5 w-[1px] bg-white/20 my-1 mr-1" />
              <div className="flex items-center gap-1.5">
                <span className="text-white font-bold tracking-wider">24H</span>
                <span className="w-2.5 h-[1px] bg-white/40" />
              </div>
            </div>

            {/* CENTER HERO CONTENT */}
            <div className="w-full flex-1 flex flex-col items-center justify-center text-center my-auto">
              
              {/* Institution Title & Presents Line */}
              <div className="text-center">
                <h2 className="font-chakra font-bold text-sm sm:text-xl md:text-2xl tracking-[0.14em] text-white uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                  JAIN INSTITUTE OF TECHNOLOGY, DAVANAGERE
                </h2>

                <div className="flex items-center justify-center gap-3 my-1">
                  <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent via-[#FF453A] to-[#F6A43A]" />
                  <span className="font-chakra text-[10px] sm:text-xs font-bold tracking-[0.3em] text-[#F6A43A] uppercase">
                    PRESENTS
                  </span>
                  <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent via-[#FF453A] to-[#F6A43A]" />
                </div>
              </div>

              {/* The Grand 3D Gold CLOCKIT Title & 2026 */}
              <div className="relative mt-1">
                <h1 className="text-gold-3d font-chakra font-black text-5xl sm:text-7xl md:text-8xl lg:text-[9.5rem] tracking-tight leading-none uppercase select-none">
                  CLOCKIT
                </h1>
                
                {/* 2026: Clean Non-Glowing Gold Outline matching official mockup */}
                <div className="relative -mt-2 sm:-mt-4 select-none flex items-center justify-center pl-[0.24em]">
                  <div className="text-outline-gold font-chakra font-black text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.2rem] select-none">
                    2026
                  </div>
                </div>
              </div>

              {/* Tagline */}
              <div className="mt-2.5 px-4 py-2 rounded-xl bg-[#070e1f]/75 backdrop-blur-xl border border-white/15 shadow-lg max-w-xl">
                <p className="text-xs sm:text-sm font-chakra font-bold tracking-[0.14em] uppercase text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  <span>DREAM IT. </span>
                  <span className="text-[#F6A43A]">BUILD IT. </span>
                  <span className="text-[#F6A43A]">CONQUER IT. </span>
                  <span>CODE BEYOND LIMITS.</span>
                </p>
              </div>

              {/* Date & Location Pill Badge */}
              <div className="mt-2.5 inline-flex items-center px-4 sm:px-6 py-1 rounded-full bg-black/60 border border-white/20 backdrop-blur-md shadow-lg">
                <span className="text-[10px] sm:text-xs font-mono font-semibold tracking-wider text-[#F3EBDD] uppercase">
                  25–26 NOVEMBER 2026 &bull; 24 HOURS &bull; ON-SITE, CAMPUS
                </span>
              </div>

              {/* Sponsors: IN ASSOCIATION WITH & IN COLLABORATION WITH */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-10">
                {/* Sponsor 1: IN ASSOCIATION WITH */}
                <div className="flex flex-col items-center">
                  <span className="text-[9px] font-chakra font-bold uppercase tracking-[0.2em] text-[#F6A43A] mb-1">
                    IN ASSOCIATION WITH
                  </span>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/50 border border-white/10 backdrop-blur-md">
                    <div className="w-6 h-6 rounded-full bg-[#002B66] border border-white/30 flex items-center justify-center">
                      <span className="font-chakra font-black text-[9px] text-white">JGI</span>
                    </div>
                    <span className="font-chakra font-black text-xs sm:text-sm tracking-wider text-white">SALUTIX AI</span>
                  </div>
                </div>

                {/* Sponsor 2: IN COLLABORATION WITH */}
                <div className="flex flex-col items-center">
                  <span className="text-[9px] font-chakra font-bold uppercase tracking-[0.2em] text-[#F6A43A] mb-1">
                    IN COLLABORATION WITH
                  </span>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/50 border border-white/10 backdrop-blur-md">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-none stroke-current stroke-[2.2]">
                      <path d="M16 6 L9 10 L15 14 L8 18" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="font-chakra font-black text-xs sm:text-sm tracking-wider text-white">SALUTIX AI</span>
                  </div>
                </div>
              </div>
            </div>

            {/* BOTTOM STATS & ACTIONS ROW (FROM MOCKUP) */}
            <div className="w-full flex items-end justify-between pt-2 pb-1 text-xs">
              {/* Bottom-Left: 05 THEMES / 02 LEVELS */}
              <div
                onClick={() => goToPage(1, 'themes')}
                className="flex flex-col gap-0.5 text-left font-chakra cursor-pointer group"
                title="Explore Themes & Levels"
              >
                <div className="flex items-baseline gap-2">
                  <span className="text-xl sm:text-2xl font-black text-[#F6A43A] tabular-nums group-hover:scale-105 transition-transform">05</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#F3EBDD] group-hover:text-[#F6A43A] transition-colors">THEMES</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl sm:text-2xl font-black text-[#F6A43A] tabular-nums group-hover:scale-105 transition-transform">02</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#F3EBDD] group-hover:text-[#F6A43A] transition-colors">LEVELS</span>
                </div>
              </div>

              {/* Bottom-Center: PRIZE POOL & REGISTER NOW */}
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                {/* Prize Pool Chamfered Chip: ₹ 30,000 */}
                <div
                  onClick={() => goToPage(1, 'prizes')}
                  className="px-4 sm:px-6 py-2 rounded-xl bg-black/70 border-gold-glow flex items-center gap-2.5 backdrop-blur-md cursor-pointer hover:scale-105 transition-all"
                  title="View Prize Breakdown"
                >
                  <div className="text-left font-chakra leading-tight">
                    <span className="text-[9px] font-bold tracking-widest text-slate-300 uppercase block">PRIZE</span>
                    <span className="text-[9px] font-bold tracking-widest text-slate-300 uppercase block">POOL</span>
                  </div>
                  <div className="h-6 w-[1px] bg-white/20" />
                  <span className="font-chakra font-black text-xl sm:text-2xl text-[#F6A43A] tabular-nums tracking-tight drop-shadow-[0_0_12px_rgba(246,164,58,0.7)]">
                    ₹ 30,000
                  </span>
                </div>

                {/* Big REGISTER NOW Button with Lightning Bolt */}
                <button
                  onClick={() => goToPage(2)}
                  className="px-6 sm:px-8 py-3 rounded-full bg-black/85 border-2 border-[#F6A43A] hover:bg-[#F6A43A] hover:text-[#101A2B] text-white font-chakra font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 shadow-[0_0_30px_rgba(246,164,58,0.4)] hover:shadow-[0_0_40px_rgba(246,164,58,0.8)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <span className="text-sm">⚡</span>
                  <span>REGISTER NOW</span>
                </button>
              </div>

              {/* Bottom-Right: Golden Sparkle 4-Point Star */}
              <div className="hidden sm:flex items-center justify-end text-[#F6A43A]/80">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current animate-pulse">
                  <path d="M12 0 L14 9 L23 12 L14 15 L12 24 L10 15 L1 12 L10 9 Z" />
                </svg>
              </div>
            </div>
          </div>

          {/* ======================================================= */}
          {/* SCENE 1: INTERACTIVE EXPLORATION & GUILD TREASURY       */}
          {/* ======================================================= */}
          <div
            style={getSceneStyle(1)}
            className="absolute inset-x-2 sm:inset-x-4 max-w-5xl mx-auto will-change-transform will-change-opacity"
          >
            <div className="glass-fantasy-amber p-5 sm:p-7 rounded-3xl border border-[#F6A43A]/40 max-h-[82vh] overflow-y-auto shadow-2xl backdrop-blur-xl">
              
              {/* Scene 1 Header */}
              <div className="text-center mb-4">
                <span className="text-xs font-chakra text-[#F6A43A] tracking-widest uppercase font-bold block mb-1">
                  CLOCKIT 2026 // EXPEDITION ARCHIVES
                </span>
                <h2 className="text-2xl sm:text-3xl font-black font-chakra text-[#F3EBDD] uppercase">
                  EXPLORE <span className="text-[#F6A43A]">THEMES, TIMELINE & REWARDS</span>
                </h2>
                <p className="text-xs text-[#8BC9ED] font-inter mt-0.5">
                  Organized by Jain Institute of Technology, Davanagere &bull; In Association with Salutix AI
                </p>
              </div>

              {/* Multi-Tab Navigation for Scene 1 */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-5 border-b border-white/10 pb-3">
                {[
                  { id: 'themes', label: 'THEMES (05)', icon: Compass },
                  { id: 'timeline', label: 'TIMELINE & SCHEDULE', icon: Clock },
                  { id: 'prizes', label: 'PRIZES (₹30K)', icon: Trophy },
                  { id: 'rules', label: 'RULES & ELIGIBILITY', icon: ShieldCheck },
                  { id: 'advisory', label: 'ADVISORY & TEAM', icon: Users },
                  { id: 'faq', label: 'FAQ', icon: HelpCircle },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isTabActive = scene2Tab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        playUiClick();
                        setScene2Tab(tab.id);
                      }}
                      className={`relative px-3.5 sm:px-5 py-1.5 rounded-xl text-xs font-chakra tracking-wider uppercase transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                        isTabActive
                          ? 'bg-[#F6A43A]/25 text-[#F6A43A] border border-[#F6A43A]/70 shadow-[0_0_15px_rgba(246,164,58,0.35)] font-black'
                          : 'text-[#F3EBDD]/70 hover:text-white hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isTabActive ? 'text-[#F6A43A]' : 'text-slate-400'}`} />
                      <span>{tab.label}</span>
                      {isTabActive && (
                        <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 w-6 h-[2px] bg-[#F6A43A] shadow-[0_0_8px_#F6A43A]" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* TAB 1: THEMES (ALL 5 HACKATHON THEMES) */}
              {scene2Tab === 'themes' && (
                <div className="animate-in fade-in duration-300">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    {GUILD_TRACKS.map((t) => (
                      <div
                        key={t.id}
                        onClick={() => setInspectedTrack(t)}
                        className="p-4 rounded-xl bg-black/60 border border-white/10 hover:border-[#F6A43A] cursor-pointer transition-all text-left group hover:scale-[1.01] relative"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-chakra text-[#F6A43A] font-bold block">{t.badge}</span>
                          <span className="text-[9px] text-red-400 font-mono font-bold flex items-center gap-1">
                            <Lock className="w-2.5 h-2.5" /> LOCKED
                          </span>
                        </div>
                        <h4 className="text-sm font-bold font-chakra text-[#F3EBDD] group-hover:text-[#F6A43A] transition-colors mt-0.5">{t.name}</h4>
                        <p className="text-xs text-slate-300 mt-1 font-inter leading-relaxed">{t.desc}</p>

                        <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center gap-1.5 text-[10px] font-mono text-[#F6A43A]">
                          <Lock className="w-3 h-3 text-[#F6A43A] animate-pulse" />
                          <span>Problem Statement Unlocks 25 Nov 10:00 AM</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/50 border border-white/10 text-xs text-[#F3EBDD]/90 flex flex-wrap items-center justify-between gap-3 font-chakra">
                    <span>Selected your domain? Register your squad for the 24H battle at JITD Library.</span>
                    <button
                      onClick={() => goToPage(2)}
                      className="px-5 py-2 bg-[#F6A43A] text-[#101A2B] rounded-full font-black text-xs uppercase tracking-wider hover:bg-[#FF7138] transition-colors cursor-pointer"
                    >
                      REGISTER SQUAD ➔
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: TIMELINE & SCHEDULE (EXACT CHECKPOINT DESIGN) */}
              {scene2Tab === 'timeline' && (
                <div className="animate-in fade-in duration-300 py-6 px-2 sm:px-4">
                  <div className="relative">
                    {/* Glowing Vertical Line */}
                    <div 
                      aria-hidden="true"
                      className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-2 bottom-2 w-[2px] bg-gradient-to-b from-[#F6A43A] via-[#38bdf8] to-[#fbbf24] shadow-[0_0_10px_rgba(56,189,248,0.4)]"
                    />

                    <div className="space-y-8 sm:space-y-12">
                      {CHECKPOINT_TIMELINE.map((item, idx) => {
                        const isLeft = idx % 2 === 0;
                        return (
                          <div 
                            key={item.id}
                            className="relative flex flex-col sm:flex-row items-start sm:items-center w-full group"
                          >
                            {/* Checkpoint Node */}
                            <div 
                              className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[#101A2B] border-2 flex items-center justify-center z-20 shadow-md group-hover:scale-125 transition-transform"
                              style={{ 
                                borderColor: item.color,
                                boxShadow: `0 0 10px ${item.glowColor}`
                              }}
                            >
                              <div 
                                className="w-1.5 h-1.5 rounded-full" 
                                style={{ backgroundColor: item.color }} 
                              />
                            </div>

                            {/* Desktop Alternating */}
                            <div className="hidden sm:flex items-center justify-between w-full">
                              <div className={`w-[45%] ${isLeft ? 'text-right' : 'flex justify-end'}`}>
                                {isLeft ? (
                                  <div className="p-3.5 rounded-xl bg-[#0b1424]/90 border border-white/15 backdrop-blur-xl shadow-lg">
                                    <span className="font-mono text-[11px] font-bold tracking-wider uppercase block" style={{ color: item.color }}>
                                      {item.time}
                                    </span>
                                    <h4 className="font-chakra font-black text-sm md:text-base text-[#FFE8A3] uppercase leading-snug mt-0.5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                                      {item.title}
                                    </h4>
                                    <p className="text-[11px] text-[#E2E8F0] font-sans mt-0.5 leading-relaxed font-medium">
                                      {item.desc}
                                    </p>
                                  </div>
                                ) : (
                                  <div className="pr-4">
                                    <span 
                                      className="px-3 py-1 rounded-lg border text-[11px] font-mono font-bold tracking-wider backdrop-blur-md bg-[#0b1424]/90"
                                      style={{ borderColor: item.color, color: item.color }}
                                    >
                                      {item.phase}
                                    </span>
                                  </div>
                                )}
                              </div>

                              <div className="w-[10%]" />

                              <div className={`w-[45%] ${isLeft ? 'flex justify-start' : 'text-left'}`}>
                                {isLeft ? (
                                  <div className="pl-4">
                                    <span 
                                      className="px-3 py-1 rounded-lg border text-[11px] font-mono font-bold tracking-wider backdrop-blur-md bg-[#0b1424]/90"
                                      style={{ borderColor: item.color, color: item.color }}
                                    >
                                      {item.phase}
                                    </span>
                                  </div>
                                ) : (
                                  <div className="p-3.5 rounded-xl bg-[#0b1424]/90 border border-white/15 backdrop-blur-xl shadow-lg">
                                    <span className="font-mono text-[11px] font-bold tracking-wider uppercase block" style={{ color: item.color }}>
                                      {item.time}
                                    </span>
                                    <h4 className="font-chakra font-black text-sm md:text-base text-[#FFE8A3] uppercase leading-snug mt-0.5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                                      {item.title}
                                    </h4>
                                    <p className="text-[11px] text-[#E2E8F0] font-sans mt-0.5 leading-relaxed font-medium">
                                      {item.desc}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Mobile Single Column */}
                            <div className="sm:hidden pl-10 pr-2 w-full">
                              <div className="p-3 rounded-xl bg-[#0b1424]/90 border border-white/15 backdrop-blur-xl shadow-lg space-y-1">
                                <span 
                                  className="inline-block px-2.5 py-0.5 rounded-md border text-[10px] font-mono font-bold tracking-wider"
                                  style={{ borderColor: item.color, color: item.color }}
                                >
                                  {item.phase}
                                </span>
                                <span className="font-mono text-[11px] font-bold tracking-wider uppercase block" style={{ color: item.color }}>
                                  {item.time}
                                </span>
                                <h4 className="font-chakra font-black text-sm text-[#FFE8A3] uppercase">
                                  {item.title}
                                </h4>
                                <p className="text-[11px] text-[#E2E8F0] font-sans leading-relaxed font-medium">
                                  {item.desc}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: PRIZES & PODIUM (₹ 22,000 / ₹ 30,000) */}
              {scene2Tab === 'prizes' && (
                <div className="animate-in fade-in duration-300 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    {/* 1st Champion */}
                    <div className="p-4 rounded-2xl bg-[#101A2B]/90 border-2 border-[#F6A43A] text-center flex flex-col justify-between shadow-[0_0_30px_rgba(246,164,58,0.3)] order-1 md:order-2">
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#F6A43A]/20 text-[#F6A43A] text-xs font-chakra font-bold mb-2">
                          <Crown className="w-3.5 h-3.5" /> 1ST CHAMPION
                        </div>
                        <div className="text-3xl sm:text-4xl font-black font-chakra text-[#F6A43A] tabular-nums tracking-tight">₹ 15,000</div>
                        <p className="text-xs text-[#F3EBDD] font-chakra font-bold mt-1">Clockit 2026 Champion Trophy</p>
                        <p className="text-[11px] text-[#8BC9ED] font-inter mt-1.5">Salutix AI Fast-Track Internship + Certificate</p>
                      </div>
                      <div className="text-[10px] text-[#F6A43A] font-chakra mt-3 pt-2 border-t border-white/10 uppercase tracking-wider font-bold">
                        GRAND CONQUEST
                      </div>
                    </div>

                    {/* 2nd Runner Up */}
                    <div className="p-4 rounded-2xl bg-[#101A2B]/90 border border-[#8BC9ED]/50 text-center flex flex-col justify-between order-2 md:order-1">
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#8BC9ED]/20 text-[#8BC9ED] text-xs font-chakra font-bold mb-2">
                          <Award className="w-3.5 h-3.5" /> 2ND RUNNER-UP
                        </div>
                        <div className="text-3xl sm:text-4xl font-black font-chakra text-[#F3EBDD] tabular-nums tracking-tight">₹ 10,000</div>
                        <p className="text-xs text-[#8BC9ED] font-chakra mt-1">Silver Spire Trophy</p>
                        <p className="text-[11px] text-slate-300 font-inter mt-1.5">Salutix AI Tech Mentorship + Certificate</p>
                      </div>
                      <div className="text-[10px] text-[#8BC9ED] font-chakra mt-3 pt-2 border-t border-white/10 uppercase tracking-wider font-bold">
                        HIGH PODIUM
                      </div>
                    </div>

                    {/* 3rd Runner Up */}
                    <div className="p-4 rounded-2xl bg-[#101A2B]/90 border border-[#FF7138]/50 text-center flex flex-col justify-between order-3">
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FF7138]/20 text-[#FF7138] text-xs font-chakra font-bold mb-2">
                          <Award className="w-3.5 h-3.5" /> 3RD RUNNER-UP
                        </div>
                        <div className="text-3xl sm:text-4xl font-black font-chakra text-[#FF7138] tabular-nums tracking-tight">₹ 5,000</div>
                        <p className="text-xs text-[#8BC9ED] font-chakra mt-1">Bronze Spire Trophy</p>
                        <p className="text-[11px] text-slate-300 font-inter mt-1.5">Distinction Certificate + Swag Kit</p>
                      </div>
                      <div className="text-[10px] text-[#FF7138] font-chakra mt-3 pt-2 border-t border-white/10 uppercase tracking-wider font-bold">
                        BRONZE PODIUM
                      </div>
                    </div>
                  </div>

                  {/* Institution Leadership Strip */}
                  <div className="p-3.5 rounded-2xl bg-black/50 border border-white/10 font-chakra">
                    <span className="text-[10px] text-[#F6A43A] uppercase tracking-widest block font-bold mb-2 text-center">
                      DEPARTMENT LEADERSHIP // JAIN INSTITUTE OF TECHNOLOGY, DAVANAGERE
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center text-xs">
                      <div className="p-2 rounded bg-white/5">
                        <span className="text-[10px] text-[#8BC9ED] block">HOD – COMPUTER SCIENCE & ENG.</span>
                        <strong className="text-[#F3EBDD]">Dr. Latha B.M.</strong>
                      </div>
                      <div className="p-2 rounded bg-white/5">
                        <span className="text-[10px] text-[#8BC9ED] block">HOD – INFORMATION SCIENCE</span>
                        <strong className="text-[#F3EBDD]">Department Lead</strong>
                      </div>
                      <div className="p-2 rounded bg-white/5">
                        <span className="text-[10px] text-[#8BC9ED] block">HOD – ARTIFICIAL INTELLIGENCE</span>
                        <strong className="text-[#F3EBDD]">Department Lead</strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: RULES & ELIGIBILITY */}
              {scene2Tab === 'rules' && (
                <div className="animate-in fade-in duration-300 space-y-3 font-inter">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-4 rounded-xl bg-black/60 border border-white/10">
                      <h4 className="font-chakra font-bold text-sm text-[#F6A43A] uppercase mb-2 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#F6A43A]" /> SQUAD ELIGIBILITY
                      </h4>
                      <ul className="text-xs text-slate-300 space-y-1.5 leading-relaxed list-disc list-inside">
                        <li>Open to all enrolled undergraduate engineering students nationwide.</li>
                        <li>Squad size: Exactly 2 to 4 adventurers per registered team.</li>
                        <li>Inter-departmental and inter-college team members are permitted.</li>
                        <li>Valid college student ID cards required at check-in.</li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl bg-black/60 border border-white/10">
                      <h4 className="font-chakra font-bold text-sm text-[#F6A43A] uppercase mb-2 flex items-center gap-2">
                        <Flame className="w-4 h-4 text-[#F6A43A]" /> 24H SPRINT CODE
                      </h4>
                      <ul className="text-xs text-slate-300 space-y-1.5 leading-relaxed list-disc list-inside">
                        <li>All prototype code must be written during the 24-hour sprint window.</li>
                        <li>Open-source libraries and APIs (Gemini, OpenAI, HuggingFace) allowed.</li>
                        <li>Pre-built complete projects will be strictly disqualified.</li>
                        <li>Final evaluation based on originality, technical depth, and demo pitch.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: ADVISORY COMMITTEE & COORDINATORS */}
              {scene2Tab === 'advisory' && (
                <div className="animate-in fade-in duration-300 space-y-4">
                  {/* Faculty Coordinators */}
                  <div className="p-4 rounded-xl bg-black/60 border border-white/10">
                    <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
                      <h4 className="font-chakra font-bold text-sm text-[#8BC9ED] uppercase">
                        FACULTY COORDINATORS
                      </h4>
                      <span className="text-[10px] font-mono text-[#8BC9ED] uppercase">ACADEMIC SUPERVISION</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {FACULTY_COORDINATORS.map((coord, i) => (
                        <div key={i} className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between">
                          <div className="mb-2">
                            <span className="font-chakra font-bold text-sm text-[#F3EBDD] block">{coord.name}</span>
                            <span className="text-[10px] text-[#8BC9ED] font-inter block mt-0.5">{coord.role}</span>
                            <span className="text-xs font-mono text-slate-300 block mt-1">{coord.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 font-mono text-xs mt-2 pt-2 border-t border-white/10">
                            <a
                              href={`tel:${coord.phone}`}
                              className="flex-1 text-center py-1 rounded bg-[#002B66] text-white hover:bg-[#003980] transition-colors"
                            >
                              Call
                            </a>
                            <a
                              href={coord.whatsapp}
                              target="_blank"
                              rel="noreferrer"
                              className="flex-1 text-center py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500 hover:text-white transition-colors"
                            >
                              WhatsApp
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Student Coordination & Help Desk Hotlines */}
                  <div className="p-4 rounded-xl bg-black/60 border border-white/10">
                    <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
                      <h4 className="font-chakra font-bold text-sm text-[#F6A43A] uppercase">
                        HELP DESK // STUDENT COORDINATORS
                      </h4>
                      <span className="text-[10px] font-mono text-[#8BC9ED] uppercase">24H DEDICATED SUPPORT</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {STUDENT_COORDINATORS.map((coord, i) => (
                        <div key={i} className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between">
                          <div className="mb-2">
                            <span className="font-chakra font-bold text-sm text-[#F3EBDD] block">{coord.name}</span>
                            <span className="text-[10px] text-[#8BC9ED] font-inter block mt-0.5">{coord.role}</span>
                            <span className="text-xs font-mono text-slate-300 block mt-1">{coord.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 font-mono text-xs mt-2 pt-2 border-t border-white/10">
                            <a
                              href={`tel:${coord.phone}`}
                              className="flex-1 text-center py-1 rounded bg-[#F6A43A]/20 text-[#F6A43A] border border-[#F6A43A]/40 hover:bg-[#F6A43A] hover:text-[#101A2B] transition-colors"
                            >
                              Call
                            </a>
                            <a
                              href={coord.whatsapp}
                              target="_blank"
                              rel="noreferrer"
                              className="flex-1 text-center py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500 hover:text-white transition-colors"
                            >
                              WhatsApp
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Organizers & Department Heads */}
                  <div className="p-4 rounded-xl bg-black/60 border border-white/10">
                    <h4 className="font-chakra font-bold text-xs uppercase tracking-[0.2em] text-emerald-400 mb-3 text-left">
                      ORGANIZERS & DEPARTMENT HEADS
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {DEPARTMENT_LEADERS.map((d, i) => (
                        <div key={i} className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-left">
                          <span className="text-[10px] font-mono text-emerald-400 block uppercase tracking-wider">{d.role}</span>
                          <span className="text-xs font-chakra font-bold text-[#F3EBDD] block mt-0.5">{d.hod}</span>
                          <span className="text-[10px] text-slate-400 block truncate">{d.department}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: FAQ ACCORDION */}
              {scene2Tab === 'faq' && (
                <div className="animate-in fade-in duration-300 space-y-2.5 font-inter">
                  {FAQS.map((faq, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-black/60 border border-white/10 text-left">
                      <strong className="block text-xs font-chakra font-bold text-[#F6A43A] mb-1">
                        Q: {faq.q}
                      </strong>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ======================================================= */}
          {/* SCENE 3: SQUAD REGISTRATION & PASS (JITD CLOCKIT 2026)  */}
          {/* ======================================================= */}
          <div
            style={getSceneStyle(2)}
            className="absolute inset-x-2 sm:inset-x-4 max-w-4xl mx-auto will-change-transform will-change-opacity"
          >
            {registeredTicket ? (
              /* Verified Clockit 2026 Boarding Pass */
              <div className="printable-guild-pass glass-fantasy-amber p-6 sm:p-8 rounded-3xl border-2 border-[#F6A43A] shadow-2xl animate-in zoom-in-95 duration-300 backdrop-blur-xl">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">⚔️</span>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold font-display text-[#F3EBDD]">CLOCKIT 2026 EXPEDITION PASS</h3>
                      <p className="text-xs text-[#8BC9ED]">JAIN INSTITUTE OF TECHNOLOGY, DAVANAGERE • JITD LIBRARY</p>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-2">
                    <span className="text-base sm:text-lg font-mono font-bold text-[#F6A43A] tracking-wider">{registeredTicket.id}</span>
                    <button
                      onClick={copyPassId}
                      className="p-1.5 rounded-lg bg-white/10 hover:border-[#F6A43A] text-[#F6A43A] cursor-pointer"
                      title="Copy Pass ID"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5 text-xs">
                  <div>
                    <span className="text-slate-400 block font-display">SQUAD</span>
                    <strong className="text-sm text-[#F3EBDD] font-display">{registeredTicket.team}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-display">LEADER</span>
                    <strong className="text-sm text-[#F3EBDD] font-display">{registeredTicket.leader}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-display">TRACK</span>
                    <strong className="text-xs text-[#F6A43A] font-display">{registeredTicket.track}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-display">COLLEGE</span>
                    <strong className="text-xs text-[#F3EBDD] font-display">{registeredTicket.college}</strong>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between pt-4 border-t border-white/10 gap-3">
                  <div className="flex items-center gap-2 text-xs text-[#8BC9ED]">
                    <ShieldCheck className="w-4 h-4 text-[#F6A43A]" />
                    <span>Entry Confirmed. Report to JITD Library on 25 Nov 2026.</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => window.print()}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F6A43A] text-[#101A2B] font-display font-bold text-xs uppercase hover:bg-[#FF7138] transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Print Pass</span>
                    </button>
                    <button
                      onClick={() => setRegisteredTicket(null)}
                      className="text-xs font-sans text-slate-300 hover:text-white underline underline-offset-4 cursor-pointer"
                    >
                      Register Another
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* High-Efficiency In-Page Registration Form */
              <form
                onSubmit={handleRegister}
                className="glass-fantasy-amber p-5 sm:p-7 rounded-3xl border border-[#F6A43A]/40 max-h-[82vh] overflow-y-auto shadow-2xl backdrop-blur-xl"
              >
                <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-white/10">
                  <div>
                    <span className="text-xs font-display text-[#F6A43A] uppercase tracking-wider block font-bold">
                      SCENE 03 // SEAL YOUR BATTLE ENTRY
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black font-display text-[#F3EBDD]">
                      REGISTER FOR CLOCKIT 2026
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-serif text-[#8BC9ED] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 block">
                      ₹30K PRIZE POOL • ₹650 PER TEAM
                    </span>
                  </div>
                </div>

                <div className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-display text-[#F3EBDD] mb-1">Squad Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Spire Conquerors"
                        value={formData.teamName}
                        onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                        className="w-full bg-black/60 border border-white/15 focus:border-[#F6A43A] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-display text-[#F3EBDD] mb-1">Squad Size *</label>
                      <select
                        value={formData.teamSize}
                        onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                        className="w-full bg-black/60 border border-white/15 focus:border-[#F6A43A] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none"
                      >
                        <option value={2} className="bg-[#101A2B]">Duo Squad (2 Members)</option>
                        <option value={3} className="bg-[#101A2B]">Trio Squad (3 Members)</option>
                        <option value={4} className="bg-[#101A2B]">Full Squad (4 Members)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div>
                      <label className="block text-[11px] font-sans text-[#8BC9ED] mb-1">Leader Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Kishan R"
                        value={formData.leaderName}
                        onChange={(e) => setFormData({ ...formData, leaderName: e.target.value })}
                        className="w-full bg-black/60 border border-white/15 focus:border-[#F6A43A] rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-sans text-[#8BC9ED] mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="leader@jitd.in"
                        value={formData.leaderEmail}
                        onChange={(e) => setFormData({ ...formData, leaderEmail: e.target.value })}
                        className="w-full bg-black/60 border border-white/15 focus:border-[#F6A43A] rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-sans text-[#8BC9ED] mb-1">Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 8073008036"
                        value={formData.leaderPhone}
                        onChange={(e) => setFormData({ ...formData, leaderPhone: e.target.value })}
                        className="w-full bg-black/60 border border-white/15 focus:border-[#F6A43A] rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-display text-[#F3EBDD] mb-1">College / Organization *</label>
                      <input
                        type="text"
                        required
                        placeholder="Jain Institute of Technology, Davanagere"
                        value={formData.college}
                        onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                        className="w-full bg-black/60 border border-white/15 focus:border-[#F6A43A] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-display text-[#F3EBDD] mb-1">Chosen Track *</label>
                      <select
                        value={formData.selectedDomain}
                        onChange={(e) => setFormData({ ...formData, selectedDomain: e.target.value })}
                        className="w-full bg-black/60 border border-white/15 focus:border-[#F6A43A] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none"
                      >
                        {GUILD_TRACKS.map((t) => (
                          <option key={t.id} value={t.id} className="bg-[#101A2B]">
                            {t.badge} : {t.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Register and Pay Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-6 mt-2 bg-gradient-to-r from-[#D08428] via-[#F6A43A] to-[#C6751C] text-[#101A2B] font-display font-black text-sm uppercase tracking-wider rounded-full shadow-[0_0_25px_rgba(246,164,58,0.5)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {loading ? (
                      <span className="animate-spin w-4 h-4 border-2 border-[#101A2B] border-t-transparent rounded-full" />
                    ) : (
                      <>
                        <span>REGISTER AND PAY (₹650 PER TEAM)</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  {/* Student Coordinator Quick Hotlines */}
                  <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-[#8BC9ED] gap-2">
                    <span className="text-[#F6A43A] font-display font-bold">HELPLINE:</span>
                    <a href="tel:+916361747047" className="hover:text-white transition-colors">
                      Jayesh: +91 63617 47047
                    </a>
                    <span>•</span>
                    <a href="tel:+919945985494" className="hover:text-white transition-colors">
                      Arpit: +91 99459 85494
                    </a>
                    <span>•</span>
                    <a href="tel:+919663084464" className="hover:text-white transition-colors">
                      Kishore: +91 96630 84464
                    </a>
                  </div>
                </div>
              </form>
            )}
          </div>
        </main>

        {/* Bottom Floating Status Bar */}
        <footer className="relative z-30 pb-3 sm:pb-4 px-4 sm:px-8 max-w-7xl mx-auto w-full flex items-center justify-between text-xs font-serif text-[#F3EBDD]/80 pointer-events-auto border-t border-white/5 pt-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-display text-[11px] text-[#F6A43A]">CLOCKIT 2026 // SCENE 0{activePage + 1} OF 03</span>
            <span className="hidden sm:inline text-[#F3EBDD]/50">• JITD LIBRARY, DAVANAGERE</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden md:inline text-[11px] text-[#8BC9ED]">SPONSORED BY SALUTIX AI</span>
            <div className="flex items-center gap-1.5 text-[11px] text-[#F6A43A]">
              <span>1-SCROLL</span>
              <div className="w-3.5 h-5 rounded-full border border-[#F6A43A]/50 flex items-start justify-center p-0.5">
                <div className="w-1 h-1 bg-[#F6A43A] rounded-full animate-bounce" />
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Quest Inspection Modal (When user clicks a domain) */}
      {inspectedTrack && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="glass-fantasy-amber max-w-xl w-full p-6 sm:p-8 rounded-3xl border border-[#F6A43A] shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div>
                <span className="text-[10px] font-display text-[#F6A43A] uppercase tracking-widest block font-bold">{inspectedTrack.badge}</span>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-[#F3EBDD]">{inspectedTrack.name}</h3>
                <span className="text-xs text-[#8BC9ED]">{inspectedTrack.category}</span>
              </div>
              <button
                onClick={() => setInspectedTrack(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#F6A43A] hover:text-[#101A2B] text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs sm:text-sm text-[#F3EBDD]/90 mb-4 font-sans leading-relaxed">
              {inspectedTrack.desc}
            </p>

            <div className="mb-4 p-4 rounded-2xl bg-black/70 border border-[#F6A43A]/40 text-center relative overflow-hidden">
              <div className="w-10 h-10 rounded-full bg-[#F6A43A]/20 border border-[#F6A43A] flex items-center justify-center mx-auto mb-2">
                <Lock className="w-5 h-5 text-[#F6A43A] animate-pulse" />
              </div>
              <span className="text-xs font-chakra text-[#F6A43A] uppercase tracking-widest block font-bold mb-1">
                PROBLEM STATEMENTS LOCKED
              </span>
              <p className="text-xs text-[#F3EBDD] font-mono mb-2">
                Unlocks on 25 Nov 2026 at 10:00 AM
              </p>
              <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                The mandatory problem statements for this track are sealed until the opening keynote at 10:00 AM on 25 November. Squads may enlist and build their foundational prototypes right away.
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/10">
              <span className="text-xs text-red-400 font-mono font-bold flex items-center gap-1">
                <Lock className="w-3.5 h-3.5" /> PROBLEM STATEMENT LOCKED
              </span>
              <button
                onClick={() => {
                  setSelectedTrack(inspectedTrack.id);
                  setFormData(prev => ({ ...prev, selectedDomain: inspectedTrack.id }));
                  setInspectedTrack(null);
                  goToPage(2);
                }}
                className="px-5 py-2 rounded-full bg-[#F6A43A] text-[#101A2B] font-display font-bold text-xs uppercase hover:bg-[#FF7138] transition-colors cursor-pointer"
              >
                Select Track & Register ➔
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
