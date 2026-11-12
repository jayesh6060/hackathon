import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Sparkles, Building } from 'lucide-react';
import { JUDGES_MENTORS, SPONSORS } from '../data/hackathonData';

gsap.registerPlugin(ScrollTrigger);

export default function JudgesSponsors() {
  const sectionRef = useRef(null);
  const peopleGridRef = useRef(null);
  const sponsorGridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (peopleGridRef.current) {
        gsap.from(peopleGridRef.current.children, {
          scrollTrigger: {
            trigger: peopleGridRef.current,
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

      if (sponsorGridRef.current) {
        gsap.from(sponsorGridRef.current.children, {
          scrollTrigger: {
            trigger: sponsorGridRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          scale: 0.95,
          stagger: 0.08,
          duration: 0.6,
          ease: "power2.out",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="judges"
      ref={sectionRef}
      className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full z-10"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono uppercase tracking-widest mb-3">
          <Users className="w-3.5 h-3.5" />
          <span>THE HIGH COUNCIL // 審判団・協賛</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-cyber text-white tracking-wide">
          JUDGES & <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">MENTORS</span>
        </h2>
        <p className="mt-4 text-slate-400 text-base sm:text-lg">
          Learn from architects of frontier intelligence systems, spatial pioneers, and venture capital partners.
        </p>
      </div>

      {/* Profile Cards Grid */}
      <div ref={peopleGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-28">
        {JUDGES_MENTORS.map((person) => (
          <div
            key={person.name}
            className="p-6 rounded-2xl glass-flow glass-flow-hover cyber-corner-sm flex flex-col justify-between"
          >
            <div>
              {/* Top Banner with Tag & Kanji */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono tracking-wider bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  {person.tag} • {person.badge}
                </span>
                <span className="text-sm font-jp font-bold text-slate-400">
                  {person.kanji}
                </span>
              </div>

              {/* Avatar + Info */}
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden border-2 border-cyan-500/40 p-0.5">
                  <img
                    src={person.avatar}
                    alt={person.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                </div>

                <div>
                  <h3 className="text-lg font-bold font-cyber text-white">
                    {person.name}
                  </h3>
                  <p className="text-xs text-slate-300 font-medium">
                    {person.role}
                  </p>
                  <p className="text-[11px] text-cyan-400 font-mono flex items-center gap-1 mt-0.5">
                    <Building className="w-3 h-3" />
                    {person.company}
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full h-[1px] bg-white/10 mt-2" />
          </div>
        ))}
      </div>

      {/* SPONSORS SECTION */}
      <div className="pt-8 border-t border-white/10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ECOSYSTEM BACKERS // 公式協賛企業</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-black font-cyber text-white">
            TITAN & PLATINUM <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">PARTNERS</span>
          </h3>
          <p className="mt-2 text-slate-400 text-sm">
            Empowering hackers with world-class cloud infrastructure, developer tools, and bounties.
          </p>
        </div>

        {/* Sponsors Grid */}
        <div ref={sponsorGridRef} className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {SPONSORS.map((sp) => (
            <div
              key={sp.name}
              className="p-6 rounded-2xl glass-flow glass-flow-hover flex flex-col items-center justify-center text-center cyber-corner-sm"
            >
              <span className="text-[10px] font-mono tracking-widest px-2 py-0.5 rounded bg-white/5 text-cyan-300 mb-3 border border-white/5">
                {sp.tier} PARTNER
              </span>
              <span className="text-base sm:text-lg font-black font-cyber text-white drop-shadow-[0_0_12px_rgba(56,189,248,0.4)]">
                {sp.logo}
              </span>
              <p className="text-[11px] text-slate-400 mt-2 font-mono">
                {sp.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
