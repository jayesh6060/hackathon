import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, MapPin, ChevronDown, Play, Pause, Flame, Zap, ArrowRight, ShieldCheck, Terminal, Compass, Sliders, Volume2 } from 'lucide-react';
import CountdownTimer from './CountdownTimer';
import { HACKATHON_INFO, STORY_BEATS } from '../data/hackathonData';
import { playUiClick, playCyberChime } from '../utils/audioSystem';

gsap.registerPlugin(ScrollTrigger);

export default function HeroScrollVideo() {
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const videoRef = useRef(null);
  const [videoDuration, setVideoDuration] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentTimeFormatted, setCurrentTimeFormatted] = useState("00:00.00");
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [activeBeat, setActiveBeat] = useState(0);
  const [showScrubberControls, setShowScrubberControls] = useState(false);
  const [manualScrubValue, setManualScrubValue] = useState(0);

  // Format seconds to mm:ss.ms
  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds < 0) return "00:00.00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 100);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${String(ms).padStart(2, '0')}`;
  };

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    let targetTime = 0;
    let isSeeking = false;
    let rafId = null;

    // Smooth RAF loop to seek video without micro-stuttering
    const renderLoop = () => {
      if (video && video.duration && !isSeeking) {
        const diff = targetTime - video.currentTime;
        if (Math.abs(diff) > 0.02) {
          video.currentTime = Math.min(Math.max(video.currentTime + diff * 0.35, 0), video.duration - 0.02);
          setCurrentTimeFormatted(formatTime(video.currentTime));
        }
      }
      rafId = requestAnimationFrame(renderLoop);
    };
    rafId = requestAnimationFrame(renderLoop);

    const onMetadata = () => {
      if (video.duration && !isNaN(video.duration)) {
        setVideoDuration(video.duration);
        setVideoLoaded(true);
        video.pause();
      }
    };

    video.addEventListener('loadedmetadata', onMetadata);
    video.addEventListener('loadeddata', onMetadata);
    video.addEventListener('canplay', onMetadata);
    if (video.readyState >= 1) {
      onMetadata();
    }

    let prevBeat = 0;

    // ScrollTrigger controlling the video frame position
    const st = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
      onUpdate: (self) => {
        const prog = self.progress;
        setScrollProgress(prog);
        setManualScrubValue(prog);

        // Determine which narrative beat is active
        let currentBeat = 0;
        if (prog < 0.22) {
          currentBeat = 0;
        } else if (prog < 0.50) {
          currentBeat = 1;
        } else if (prog < 0.78) {
          currentBeat = 2;
        } else {
          currentBeat = 3;
        }

        if (currentBeat !== prevBeat) {
          prevBeat = currentBeat;
          setActiveBeat(currentBeat);
          // Play subtle sci-fi beat transition cue
          playCyberChime();
        }

        // Direct time target calculation
        if (video && video.duration && !isNaN(video.duration)) {
          targetTime = prog * video.duration;
        }
      }
    });

    return () => {
      st.kill();
      if (rafId) cancelAnimationFrame(rafId);
      video.removeEventListener('loadedmetadata', onMetadata);
      video.removeEventListener('loadeddata', onMetadata);
      video.removeEventListener('canplay', onMetadata);
    };
  }, []);

  const jumpToAct = (index) => {
    playUiClick();
    if (!containerRef.current) return;
    const scrollPositions = [0, 0.32, 0.62, 0.92];
    const targetScroll = containerRef.current.offsetTop + (containerRef.current.offsetHeight - window.innerHeight) * scrollPositions[index];
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  const handleManualSlider = (e) => {
    const val = parseFloat(e.target.value);
    setManualScrubValue(val);
    const video = videoRef.current;
    if (video && video.duration) {
      video.currentTime = val * video.duration;
      setCurrentTimeFormatted(formatTime(video.currentTime));
    }
  };

  return (
    <section
      id="hero-flow"
      ref={containerRef}
      className="relative w-full h-[400vh] bg-[#06060c]"
    >
      {/* Pinned Sticky Viewport */}
      <div
        ref={stickyRef}
        className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between"
      >
        {/* Background Video Element */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <video
            ref={videoRef}
            playsInline
            muted
            preload="auto"
            className="w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.12]"
          >
            <source src="/assets/flow-video.mp4" type="video/mp4" />
            <source src="/5011f6a6-9575-4bf1-a612-03867b03c695.mp4" type="video/mp4" />
          </video>

          {/* Cinematic Overlays to Guarantee Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#06060c] via-transparent to-black/60 pointer-events-none" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#06060c]/40 to-[#06060c]/90 pointer-events-none" />
          <div className="absolute inset-0 scanlines opacity-20 pointer-events-none" />

          {/* Anime Glow Spotlights */}
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#ff007a]/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#00f0ff]/20 rounded-full blur-[120px] pointer-events-none" />
        </div>

        {/* Top HUD Status Bar */}
        <div className="relative z-20 pt-24 px-4 sm:px-8 max-w-7xl mx-auto w-full flex flex-wrap items-center justify-between gap-4 pointer-events-none">
          {/* Scroll-Video Telemetry */}
          <div className="flex items-center gap-3 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-cyan-500/30 shadow-[0_0_15px_rgba(0,240,255,0.2)] pointer-events-auto">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-[11px] font-mono text-cyan-300 tracking-wider">
              FLOW VIDEO SCRUBBER: {Math.round(scrollProgress * 100)}%
            </span>
            <span className="text-[10px] font-mono text-slate-400 border-l border-white/20 pl-2">
              TIME {currentTimeFormatted}
            </span>
            <button
              onClick={() => {
                playUiClick();
                setShowScrubberControls(!showScrubberControls);
              }}
              title="Toggle Manual Scrubber Drawer"
              className="p-1 rounded hover:bg-white/10 text-cyan-400 transition-colors"
            >
              <Sliders className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Act Jump Pills */}
          <div className="hidden md:flex items-center gap-2 bg-black/70 backdrop-blur-md p-1 rounded-full border border-white/10 pointer-events-auto">
            {["ACT 01", "ACT 02", "ACT 03", "ACT 04"].map((act, i) => (
              <button
                key={act}
                onClick={() => jumpToAct(i)}
                className={`px-3 py-1 rounded-full text-[11px] font-mono transition-all ${
                  activeBeat === i
                    ? 'bg-gradient-to-r from-[#ff007a] to-[#00f0ff] text-white font-bold shadow-[0_0_12px_rgba(0,240,255,0.5)]'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {act}
              </button>
            ))}
          </div>
        </div>

        {/* Collapsible Manual Scrubber Drawer */}
        {showScrubberControls && (
          <div className="relative z-30 mx-auto max-w-xl w-full px-4 animate-in slide-in-from-top-2 duration-200 pointer-events-auto">
            <div className="glass-panel p-4 rounded-xl border border-cyan-500/40 shadow-2xl flex items-center gap-4">
              <span className="text-[10px] font-mono text-cyan-300 whitespace-nowrap">MANUAL SCRUB</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.001"
                value={manualScrubValue}
                onChange={handleManualSlider}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <span className="text-[10px] font-mono text-slate-300 whitespace-nowrap">{currentTimeFormatted}</span>
            </div>
          </div>
        )}

        {/* Main Content Area - Synchronized Narrative Beats */}
        <div className="relative z-20 flex-1 flex items-center justify-center px-4 sm:px-8 max-w-6xl mx-auto w-full">
          {/* BEAT 0: Initial Hero Landing (0% - 22%) */}
          <div
            className={`absolute inset-x-4 max-w-4xl mx-auto text-center transition-all duration-700 transform ${
              activeBeat === 0
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 -translate-y-8 pointer-events-none'
            }`}
          >
            {/* Japanese Accent Banner */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#120f2c]/80 border border-pink-500/40 text-pink-300 text-xs sm:text-sm font-jp tracking-widest mb-4 shadow-[0_0_20px_rgba(255,0,122,0.2)]">
              <Zap className="w-4 h-4 text-cyan-400 animate-spin" />
              <span>新未来ハック 2026 • THE ULTIMATE ANIME HACKATHON</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-cyber tracking-tight leading-none text-white drop-shadow-[0_5px_25px_rgba(0,0,0,0.8)]">
              SHINRAI <span className="bg-gradient-to-r from-[#00f0ff] via-[#8b5cf6] to-[#ff007a] bg-clip-text text-transparent">HACKS</span>
            </h1>

            {/* Powerful Headline */}
            <p className="mt-3 sm:mt-5 text-lg sm:text-2xl md:text-3xl font-bold font-cyber text-cyan-300 tracking-wider neon-glow-cyan">
              {HACKATHON_INFO.tagline}
            </p>

            {/* Short Introduction */}
            <p className="mt-3 text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-md">
              {HACKATHON_INFO.subheadline}
            </p>

            {/* Meta badges: Date, Venue, Prize */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-2 bg-black/60 px-3.5 py-1.5 rounded-lg border border-white/10 backdrop-blur-sm">
                <Calendar className="w-4 h-4 text-[#ff007a]" />
                <span className="font-semibold">{HACKATHON_INFO.dates}</span>
              </div>
              <div className="flex items-center gap-2 bg-black/60 px-3.5 py-1.5 rounded-lg border border-white/10 backdrop-blur-sm">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span className="font-semibold">{HACKATHON_INFO.venue}</span>
              </div>
              <div className="flex items-center gap-2 bg-black/60 px-3.5 py-1.5 rounded-lg border border-yellow-400/30 backdrop-blur-sm text-yellow-300">
                <Flame className="w-4 h-4 text-yellow-400" />
                <span className="font-cyber font-bold">{HACKATHON_INFO.prizePool} BOUNTY</span>
              </div>
            </div>

            {/* Countdown & CTA */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
              <CountdownTimer targetDate={HACKATHON_INFO.targetDate} />
              
              <div className="flex items-center gap-3">
                <a
                  href="#register"
                  onClick={playUiClick}
                  className="px-6 py-3.5 bg-gradient-to-r from-[#ff007a] via-[#7928ca] to-[#00f0ff] text-white font-cyber font-bold text-sm tracking-wider uppercase cyber-cut shadow-[0_0_25px_rgba(255,0,122,0.6)] hover:shadow-[0_0_40px_rgba(0,240,255,0.9)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <span>REGISTER NOW</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* BEAT 1: Act I - The Awakening (22% - 50%) */}
          <div
            className={`absolute inset-x-4 max-w-3xl mx-auto text-center transition-all duration-700 transform ${
              activeBeat === 1
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-8 pointer-events-none'
            }`}
          >
            <div className="glass-panel-pink p-8 sm:p-10 rounded-2xl cyber-cut border-pink-500/40 relative">
              <div className="absolute top-4 right-4 text-4xl sm:text-5xl font-jp font-black text-pink-500/20 select-none">
                覚醒
              </div>
              <span className="px-3 py-1 bg-pink-500/20 text-pink-400 border border-pink-500/40 text-xs font-mono uppercase tracking-widest rounded-full">
                {STORY_BEATS[0].act} // {STORY_BEATS[0].kanji}
              </span>
              <h2 className="mt-4 text-3xl sm:text-5xl font-black font-cyber text-white">
                {STORY_BEATS[0].title}
              </h2>
              <p className="mt-2 text-cyan-300 font-mono text-sm sm:text-base tracking-wide">
                {STORY_BEATS[0].subtitle}
              </p>
              <p className="mt-4 text-slate-300 text-sm sm:text-lg leading-relaxed">
                {STORY_BEATS[0].desc}
              </p>
              <div className="mt-6 flex items-center justify-center gap-4 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5"><Terminal className="w-4 h-4 text-cyan-400" /> 36H NON-STOP</span>
                <span>•</span>
                <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-yellow-400" /> ZERO LATENCY COMPUTE</span>
              </div>
            </div>
          </div>

          {/* BEAT 2: Act II - Neural Resonance (50% - 78%) */}
          <div
            className={`absolute inset-x-4 max-w-3xl mx-auto text-center transition-all duration-700 transform ${
              activeBeat === 2
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-8 pointer-events-none'
            }`}
          >
            <div className="glass-panel-neon p-8 sm:p-10 rounded-2xl cyber-cut border-cyan-500/40 relative">
              <div className="absolute top-4 right-4 text-4xl sm:text-5xl font-jp font-black text-cyan-500/20 select-none">
                共鳴
              </div>
              <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 text-xs font-mono uppercase tracking-widest rounded-full">
                {STORY_BEATS[1].act} // {STORY_BEATS[1].kanji}
              </span>
              <h2 className="mt-4 text-3xl sm:text-5xl font-black font-cyber text-white">
                {STORY_BEATS[1].title}
              </h2>
              <p className="mt-2 text-pink-400 font-mono text-sm sm:text-base tracking-wide">
                {STORY_BEATS[1].subtitle}
              </p>
              <p className="mt-4 text-slate-300 text-sm sm:text-lg leading-relaxed">
                {STORY_BEATS[1].desc}
              </p>
              <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-4 text-left">
                <div className="p-3 bg-black/40 rounded border border-cyan-500/20">
                  <div className="text-cyan-400 font-cyber font-bold text-xs sm:text-sm">AI AGENTS</div>
                  <div className="text-[10px] text-slate-400">Autonomous Reasoners</div>
                </div>
                <div className="p-3 bg-black/40 rounded border-pink-500/20">
                  <div className="text-pink-400 font-cyber font-bold text-xs sm:text-sm">SPATIAL XR</div>
                  <div className="text-[10px] text-slate-400">Vision Pro & WebXR</div>
                </div>
                <div className="p-3 bg-black/40 rounded border-purple-500/20">
                  <div className="text-purple-400 font-cyber font-bold text-xs sm:text-sm">ZK CRYPTO</div>
                  <div className="text-[10px] text-slate-400">Zero-Knowledge Proofs</div>
                </div>
              </div>
            </div>
          </div>

          {/* BEAT 3: Act III - Transcendence (78% - 100%) */}
          <div
            className={`absolute inset-x-4 max-w-3xl mx-auto text-center transition-all duration-700 transform ${
              activeBeat === 3
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-8 pointer-events-none'
            }`}
          >
            <div className="glass-panel p-8 sm:p-10 rounded-2xl cyber-cut border-purple-500/40 relative shadow-[0_0_35px_rgba(121,40,202,0.3)]">
              <div className="absolute top-4 right-4 text-4xl sm:text-5xl font-jp font-black text-purple-500/20 select-none">
                限界突破
              </div>
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-mono uppercase tracking-widest rounded-full">
                {STORY_BEATS[2].act} // {STORY_BEATS[2].kanji}
              </span>
              <h2 className="mt-4 text-3xl sm:text-5xl font-black font-cyber text-white">
                {STORY_BEATS[2].title}
              </h2>
              <p className="mt-2 text-yellow-300 font-mono text-sm sm:text-base tracking-wide">
                {STORY_BEATS[2].subtitle}
              </p>
              <p className="mt-4 text-slate-300 text-sm sm:text-lg leading-relaxed">
                {STORY_BEATS[2].desc}
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <a
                  href="#about"
                  onClick={playUiClick}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-cyber text-xs uppercase tracking-wider rounded-lg transition-all"
                >
                  DISCOVER MISSION
                </a>
                <a
                  href="#register"
                  onClick={playUiClick}
                  className="px-6 py-3 bg-gradient-to-r from-[#ff007a] to-[#00f0ff] text-white font-cyber font-bold text-xs uppercase tracking-wider cyber-cut shadow-[0_0_20px_rgba(255,0,122,0.6)] hover:scale-105 transition-all"
                >
                  CLAIM YOUR PASS
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Scroll Indicator */}
        <div className="relative z-20 pb-6 px-4 flex flex-col items-center justify-center text-center pointer-events-none">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400/80 uppercase tracking-widest mb-1.5 animate-pulse">
            <span>SCROLL TO PROGRESS CINEMATIC FLOW</span>
          </div>
          <div className="w-5 h-8 rounded-full border-2 border-cyan-400/50 flex items-start justify-center p-1">
            <div className="w-1.5 h-2 bg-gradient-to-b from-[#ff007a] to-[#00f0ff] rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
