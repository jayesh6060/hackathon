import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Layers, ChevronDown, ChevronUp, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { DOMAINS } from '../data/hackathonData';
import { playUiClick } from '../utils/audioSystem';

gsap.registerPlugin(ScrollTrigger);

export default function DomainsSection() {
  const [expandedDomain, setExpandedDomain] = useState(DOMAINS[0].id);
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 40,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleDomain = (id) => {
    playUiClick();
    setExpandedDomain(expandedDomain === id ? null : id);
  };

  return (
    <section
      id="domains"
      ref={sectionRef}
      className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full z-10"
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
          <Layers className="w-3.5 h-3.5" />
          <span>FRONTIER DOMAINS // 開発領域</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-cyber text-white tracking-wide">
          THEMES & <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">PROBLEM STATEMENTS</span>
        </h2>
        <p className="mt-4 text-slate-400 text-base sm:text-lg">
          Choose your track. 6 specialized frontiers engineered to push neural reasoning, spatial worlds, and decentralized protocols.
        </p>
      </div>

      {/* Domain Cards Grid */}
      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DOMAINS.map((domain) => {
          const isExpanded = expandedDomain === domain.id;
          return (
            <div
              key={domain.id}
              className={`relative rounded-2xl p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between cyber-corner-sm ${
                isExpanded
                  ? 'glass-flow-active border-cyan-400/50 shadow-[0_0_30px_rgba(56,189,248,0.2)]'
                  : 'glass-flow glass-flow-hover'
              }`}
            >
              <div>
                {/* Top Bar */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono px-2.5 py-1 rounded bg-white/5 border border-white/10 text-cyan-300 font-bold">
                    {domain.code}
                  </span>
                  <span className="text-lg font-jp font-bold text-indigo-400">
                    {domain.kanji}
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-xl sm:text-2xl font-black font-cyber text-white">
                  {domain.name}
                </h3>
                <p className="mt-1 text-xs font-mono text-cyan-400 tracking-wide">
                  {domain.tagline}
                </p>

                <p className="mt-3 text-slate-300 text-sm leading-relaxed">
                  {domain.desc}
                </p>

                {/* Track Bounty Badge */}
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold">
                  <span>BOUNTY: {domain.bounty}</span>
                </div>

                {/* Problem Statements Accordion */}
                {isExpanded && (
                  <div className="mt-6 pt-5 border-t border-white/10 animate-in fade-in duration-300">
                    <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-1.5 font-bold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>CHALLENGE BRIEFS:</span>
                    </div>
                    <ul className="space-y-2.5">
                      {domain.problemStatements.map((ps, idx) => (
                        <li
                          key={idx}
                          className="p-3 rounded-lg bg-black/40 border border-white/5 text-xs text-slate-300 leading-relaxed flex items-start gap-2.5"
                        >
                          <span className="text-cyan-400 font-mono font-bold mt-0.5">#{idx + 1}</span>
                          <span>{ps}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Bottom Toggle & Select Track */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <button
                  onClick={() => toggleDomain(domain.id)}
                  className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
                >
                  <span>{isExpanded ? "HIDE BRIEFS" : "VIEW CHALLENGES"}</span>
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                <a
                  href="#register"
                  onClick={() => {
                    playUiClick();
                    window.dispatchEvent(new CustomEvent('selectHackathonTrack', { detail: { trackId: domain.id } }));
                  }}
                  className="text-xs font-mono text-indigo-400 hover:text-indigo-300 flex items-center gap-1 group/btn font-bold"
                >
                  <span>SELECT TRACK</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
