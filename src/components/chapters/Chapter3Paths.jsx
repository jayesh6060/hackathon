import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Layers, ChevronDown, ChevronUp, Sparkles, ArrowRight, Compass, Lock } from 'lucide-react';
import { GUILD_TRACKS } from '../../data/hackathonData';
import { playUiClick } from '../../utils/audioSystem';

gsap.registerPlugin(ScrollTrigger);

export default function Chapter3Paths() {
  const [activePath, setActivePath] = useState(GUILD_TRACKS[0].id);
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (gridRef.current) {
        gsap.from(gridRef.current.children, {
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 40,
          stagger: 0.1,
          duration: 0.85,
          ease: "power2.out",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const togglePath = (id) => {
    playUiClick();
    setActivePath(activePath === id ? null : id);
  };

  return (
    <section
      id="chapter-3"
      ref={sectionRef}
      className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full z-10"
    >
      {/* Chapter Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8BC9ED]/10 border border-[#8BC9ED]/30 text-[#8BC9ED] text-xs font-serif uppercase tracking-widest mb-3">
          <Layers className="w-3.5 h-3.5" />
          <span>CHAPTER 03 — CHOOSE YOUR PATH</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-display text-[#F3EBDD] tracking-wide">
          THE FIVE <span className="bg-gradient-to-r from-[#F6A43A] via-[#FF7138] to-[#8BC9ED] bg-clip-text text-transparent">GUILD PATHS</span>
        </h2>
        <p className="mt-4 text-[#F3EBDD]/80 text-base sm:text-lg font-sans">
          Select your calling. Problem statements are locked under encryption seal and will open on 25 Nov at 10:00 AM.
        </p>
      </div>

      {/* Grid of 5 Paths */}
      <div ref={gridRef} className="flex flex-wrap justify-center gap-6 sm:gap-8">
        {GUILD_TRACKS.map((track) => {
          const isOpen = activePath === track.id;
          return (
            <div
              key={track.id}
              className={`w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)] max-w-md p-7 rounded-3xl transition-all duration-300 flex flex-col justify-between ${
                isOpen
                  ? 'glass-fantasy-amber border-[#F6A43A]/50 shadow-[0_0_35px_rgba(246,164,58,0.2)]'
                  : 'glass-fantasy glass-fantasy-hover border-white/10'
              }`}
            >
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-display px-3 py-1 rounded-full bg-[#101A2B] border border-[#F6A43A]/40 text-[#F6A43A] font-bold">
                    {track.badge}
                  </span>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 font-bold flex items-center gap-1">
                    <Lock className="w-3 h-3 text-red-400" />
                    <span>LOCKED</span>
                  </span>
                </div>

                {/* Path Title */}
                <h3 className="text-xl sm:text-2xl font-black font-display text-[#F3EBDD] mb-1">
                  {track.name}
                </h3>
                <p className="text-xs font-serif text-[#F6A43A] uppercase tracking-widest mb-3">
                  {track.category}
                </p>

                <p className="text-sm text-[#F3EBDD]/85 leading-relaxed font-sans mb-4">
                  {track.desc}
                </p>

                {/* Locked Problem Statement Indicator */}
                <div className="mb-4 p-3 rounded-2xl bg-black/50 border border-[#F6A43A]/30 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#F6A43A]/20 border border-[#F6A43A]/40 flex items-center justify-center flex-shrink-0">
                    <Lock className="w-4 h-4 text-[#F6A43A] animate-pulse" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[11px] font-display text-[#F6A43A] font-bold uppercase tracking-wider">
                      Problem Statement Locked
                    </span>
                    <span className="text-[10px] font-mono text-slate-300">
                      Unlocks on 25 Nov 2026 at 10:00 AM
                    </span>
                  </div>
                </div>

                {/* Challenge Briefs Accordion */}
                {isOpen && (
                  <div className="mt-5 pt-4 border-t border-white/10 animate-in fade-in duration-300">
                    <div className="p-4 rounded-2xl bg-black/60 border border-[#F6A43A]/40 text-center">
                      <Lock className="w-6 h-6 text-[#F6A43A] mx-auto mb-2 animate-bounce" />
                      <span className="text-xs font-display text-[#F6A43A] tracking-wider uppercase block mb-1 font-bold">
                        ENCRYPTED PROBLEM BRIEF
                      </span>
                      <p className="text-xs text-white font-mono mb-2">
                        Revealing on 25 Nov 2026 at 10:00 AM
                      </p>
                      <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                        The live challenge tasks and dataset requirements for this guild path will be unlocked during the opening ceremony. Register your squad to lock in your spot.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => togglePath(track.id)}
                  className="text-xs font-display font-bold text-[#8BC9ED] hover:text-[#F3EBDD] flex items-center gap-1.5 transition-colors"
                >
                  <span>{isOpen ? "CLOSE STATUS" : "VIEW STATUS"}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                <a
                  href="#chapter-7"
                  onClick={() => {
                    playUiClick();
                    window.dispatchEvent(new CustomEvent('selectHackathonTrack', { detail: { trackId: track.id } }));
                  }}
                  className="text-xs font-display font-bold text-[#F6A43A] hover:text-[#FF7138] flex items-center gap-1 group/btn"
                >
                  <span>CHOOSE PATH</span>
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

