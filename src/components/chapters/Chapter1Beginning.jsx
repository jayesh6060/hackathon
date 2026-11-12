import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Calendar, MapPin, ArrowRight, Sparkles, Trophy } from 'lucide-react';
import CountdownTimer from '../CountdownTimer';
import { HACKATHON_INFO } from '../../data/hackathonData';
import { playUiClick, playFantasyHarpChime } from '../../utils/audioSystem';

export default function Chapter1Beginning() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-element", {
        opacity: 0,
        y: 45,
        stagger: 0.12,
        duration: 1.1,
        ease: "power3.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="chapter-1"
      ref={containerRef}
      className="relative min-h-[92vh] flex flex-col justify-between pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full z-10"
    >
      {/* Chapter Indicator Tag */}
      <div className="hero-element flex items-center justify-between">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#101A2B]/80 border border-[#F6A43A]/40 backdrop-blur-md text-xs font-serif tracking-widest text-[#F6A43A]">
          <Sparkles className="w-3.5 h-3.5 text-[#F6A43A] animate-spin" />
          <span>CHAPTER 01 — THE BEGINNING</span>
        </div>
        <span className="hidden sm:inline-block text-xs font-serif text-[#8BC9ED] tracking-widest uppercase">
          THE GOLDEN SPIRE EXPEDITION
        </span>
      </div>

      {/* Main Title & Hero Messaging */}
      <div className="my-auto py-10 text-center max-w-4xl mx-auto">
        {/* Subtitle Badge */}
        <div className="hero-element inline-block mb-4">
          <span className="text-xs sm:text-sm font-display tracking-[0.25em] text-[#8BC9ED] uppercase font-semibold">
            {HACKATHON_INFO.chapterSubtitle}
          </span>
        </div>

        {/* Grand Title */}
        <h1 className="hero-element text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display tracking-tight leading-none text-[#F3EBDD] drop-shadow-[0_10px_35px_rgba(0,0,0,0.85)]">
          AETHERIA <span className="bg-gradient-to-r from-[#F6A43A] via-[#FF7138] to-[#F6A43A] bg-clip-text text-transparent">HACKS</span>
        </h1>

        {/* Tagline */}
        <p className="hero-element mt-4 sm:mt-6 text-xl sm:text-2xl md:text-3xl font-display font-bold text-[#F6A43A] tracking-wider text-glow-amber">
          {HACKATHON_INFO.tagline}
        </p>

        {/* Introduction */}
        <p className="hero-element mt-4 text-sm sm:text-base md:text-lg text-[#F3EBDD]/90 max-w-2xl mx-auto font-sans leading-relaxed drop-shadow-md">
          {HACKATHON_INFO.subheadline}
        </p>

        {/* Date, Venue & Bounty Badges */}
        <div className="hero-element mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-[#F3EBDD]">
          <div className="flex items-center gap-2.5 glass-fantasy px-4 py-2 rounded-xl border-[#F6A43A]/30">
            <Calendar className="w-4 h-4 text-[#F6A43A]" />
            <span className="font-medium">{HACKATHON_INFO.dates}</span>
          </div>

          <div className="flex items-center gap-2.5 glass-fantasy px-4 py-2 rounded-xl border-[#8BC9ED]/30">
            <MapPin className="w-4 h-4 text-[#8BC9ED]" />
            <span className="font-medium">{HACKATHON_INFO.venue}</span>
          </div>

          <div className="flex items-center gap-2.5 glass-fantasy px-4 py-2 rounded-xl border-[#F6A43A]/40 text-[#F6A43A]">
            <Trophy className="w-4 h-4 text-[#F6A43A]" />
            <span className="font-display font-bold">{HACKATHON_INFO.prizePool}</span>
          </div>
        </div>

        {/* Countdown & Action Buttons */}
        <div className="hero-element mt-10 flex flex-col sm:flex-row items-center justify-center gap-8">
          <CountdownTimer targetDate={HACKATHON_INFO.targetDate} />

          <div className="flex items-center gap-4">
            <a
              href="#chapter-7"
              onClick={() => {
                playUiClick();
                playFantasyHarpChime();
              }}
              className="px-7 py-3.5 bg-gradient-to-r from-[#F6A43A] via-[#FF7138] to-[#F6A43A] text-[#101A2B] font-display font-bold text-xs sm:text-sm tracking-wider uppercase rounded-full shadow-[0_0_25px_rgba(246,164,58,0.5)] hover:shadow-[0_0_40px_rgba(246,164,58,0.8)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <span>REGISTER ADVENTURER</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#chapter-2"
              onClick={playUiClick}
              className="px-6 py-3.5 glass-fantasy hover:border-[#F6A43A]/50 text-[#F3EBDD] font-display text-xs uppercase tracking-wider rounded-full transition-all"
            >
              EXPLORE QUEST
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Down Prompt */}
      <div className="hero-element flex flex-col items-center justify-center text-center pt-6">
        <span className="text-[11px] font-display tracking-widest text-[#F6A43A]/80 uppercase mb-2 animate-pulse">
          SCROLL TO COMMENCE THE ADVENTURE
        </span>
        <div className="w-5 h-8 rounded-full border-2 border-[#F6A43A]/40 flex items-start justify-center p-1">
          <div className="w-1.5 h-2 bg-gradient-to-b from-[#F6A43A] to-[#FF7138] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}

