import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass, Sparkles, Flame, Shield, Award } from 'lucide-react';
import { ABOUT_PILLARS, STATS } from '../../data/hackathonData';

gsap.registerPlugin(ScrollTrigger);

export default function Chapter2Adventure() {
  const sectionRef = useRef(null);
  const statsRef = useRef(null);
  const pillarsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (statsRef.current) {
        gsap.from(statsRef.current.children, {
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 35,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
        });
      }

      if (pillarsRef.current) {
        gsap.from(pillarsRef.current.children, {
          scrollTrigger: {
            trigger: pillarsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 40,
          stagger: 0.15,
          duration: 0.9,
          ease: "power3.out",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="chapter-2"
      ref={sectionRef}
      className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full z-10"
    >
      {/* Chapter Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F6A43A]/10 border border-[#F6A43A]/30 text-[#F6A43A] text-xs font-serif uppercase tracking-widest mb-3">
          <Compass className="w-3.5 h-3.5" />
          <span>CHAPTER 02 — THE ADVENTURE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-display text-[#F3EBDD] tracking-wide">
          BENEATH THE <span className="bg-gradient-to-r from-[#F6A43A] via-[#FF7138] to-[#8BC9ED] bg-clip-text text-transparent">GOLDEN SPIRE</span>
        </h2>
        <p className="mt-4 text-[#F3EBDD]/80 text-base sm:text-lg font-sans">
          Discover the mythical convergence where creators, worldbuilders, and engineers forge the future of intelligent systems.
        </p>
      </div>

      {/* Stats Counter Strip */}
      <div
        ref={statsRef}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-20"
      >
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="p-6 rounded-2xl glass-fantasy border-[#F6A43A]/20 hover:border-[#F6A43A]/50 transition-all text-center group"
          >
            <div className="text-3xl sm:text-5xl font-black font-display text-[#F6A43A] drop-shadow-[0_0_15px_rgba(246,164,58,0.35)] group-hover:scale-105 transition-transform">
              {stat.value}
            </div>
            <div className="mt-2 text-xs sm:text-sm font-display font-bold tracking-wider text-[#F3EBDD] uppercase">
              {stat.label}
            </div>
            <div className="text-[11px] text-[#8BC9ED] font-serif mt-1">
              {stat.detail}
            </div>
          </div>
        ))}
      </div>

      {/* 4 Pillars Layout */}
      <div
        ref={pillarsRef}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {ABOUT_PILLARS.map((pillar) => (
          <div
            key={pillar.title}
            className="relative p-8 rounded-3xl glass-fantasy glass-fantasy-hover border-[#F3EBDD]/15 flex flex-col justify-between overflow-hidden"
          >
            {/* Top Chapter Roman Numeral Badge */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-display px-3 py-1 rounded-full bg-[#101A2B] border border-[#F6A43A]/30 text-[#F6A43A] font-bold">
                CANON {pillar.chapter}
              </span>
              <span className="text-xs font-serif text-[#8BC9ED] tracking-wider uppercase">
                {pillar.tag}
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-black font-display text-[#F3EBDD] mb-1">
                {pillar.title}
              </h3>
              <p className={`text-xs font-serif tracking-widest uppercase mb-4 ${pillar.color}`}>
                {pillar.subtitle}
              </p>
              <p className="text-[#F3EBDD]/85 text-sm sm:text-base leading-relaxed font-sans">
                {pillar.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-[#8BC9ED]">
              <span>Citadel Chronicle Entry</span>
              <Sparkles className="w-3.5 h-3.5 text-[#F6A43A]" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
