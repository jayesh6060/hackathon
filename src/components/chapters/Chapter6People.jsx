import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Sparkles, Building } from 'lucide-react';
import { JUDGES_MENTORS, SPONSORS } from '../../data/hackathonData';

gsap.registerPlugin(ScrollTrigger);

export default function Chapter6People() {
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
          duration: 0.85,
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
          scale: 0.96,
          stagger: 0.08,
          duration: 0.7,
          ease: "power2.out",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="chapter-6"
      ref={sectionRef}
      className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full z-10"
    >
      {/* Chapter Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8064A8]/15 border border-[#8064A8]/30 text-[#8064A8] text-xs font-serif uppercase tracking-widest mb-3">
          <Users className="w-3.5 h-3.5" />
          <span>CHAPTER 06 — THE PEOPLE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-display text-[#F3EBDD] tracking-wide">
          THE HIGH COUNCIL & <span className="bg-gradient-to-r from-[#F6A43A] via-[#FF7138] to-[#8BC9ED] bg-clip-text text-transparent">PATRONS</span>
        </h2>
        <p className="mt-4 text-[#F3EBDD]/80 text-base sm:text-lg font-sans">
          Learn from masters of autonomous intelligence, spatial worldcraft, and venture capital syndicates.
        </p>
      </div>

      {/* Profile Cards */}
      <div ref={peopleGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-28">
        {JUDGES_MENTORS.map((person) => (
          <div
            key={person.name}
            className="p-6 rounded-3xl glass-fantasy glass-fantasy-hover border-[#F3EBDD]/15 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-[11px] font-display font-bold tracking-wider bg-[#F6A43A]/10 text-[#F6A43A] border border-[#F6A43A]/30">
                  {person.guild}
                </span>
                <span className="text-xs font-serif text-[#8BC9ED]">
                  {person.specialty}
                </span>
              </div>

              <div className="flex items-center gap-4 mb-3">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#F6A43A]/40 p-0.5 shrink-0 shadow-md">
                  <img
                    src={person.avatar}
                    alt={person.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>

                <div>
                  <h3 className="text-lg font-bold font-display text-[#F3EBDD]">
                    {person.name}
                  </h3>
                  <p className="text-xs text-[#F3EBDD]/80 font-sans">
                    {person.role}
                  </p>
                  <p className="text-[11px] text-[#F6A43A] font-serif flex items-center gap-1 mt-0.5">
                    <Building className="w-3 h-3" />
                    {person.company}
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full h-[1px] bg-white/10 mt-3" />
          </div>
        ))}
      </div>

      {/* GUILD PATRONS (SPONSORS) */}
      <div className="pt-8 border-t border-white/10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F6A43A]/10 border border-[#F6A43A]/30 text-[#F6A43A] text-xs font-serif uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>GUILD PATRONS</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-black font-display text-[#F3EBDD]">
            TITAN & PLATINUM <span className="bg-gradient-to-r from-[#F6A43A] via-[#FF7138] to-[#8BC9ED] bg-clip-text text-transparent">ALLIANCES</span>
          </h3>
          <p className="mt-2 text-[#F3EBDD]/70 text-sm font-sans">
            Endowing the expedition with high-performance compute clusters, tooling grants, and bounties.
          </p>
        </div>

        {/* Sponsor Grid */}
        <div ref={sponsorGridRef} className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {SPONSORS.map((sp) => (
            <div
              key={sp.name}
              className="p-6 rounded-2xl glass-fantasy glass-fantasy-hover flex flex-col items-center justify-center text-center border-[#F3EBDD]/15"
            >
              <span className="text-[10px] font-serif tracking-widest px-2.5 py-0.5 rounded-full bg-white/5 text-[#8BC9ED] mb-3 border border-white/10 uppercase">
                {sp.tier}
              </span>
              <span className="text-base sm:text-lg font-black font-display text-[#F3EBDD] drop-shadow-[0_0_12px_rgba(246,164,58,0.3)]">
                {sp.name}
              </span>
              <p className="text-[11px] text-[#F3EBDD]/70 mt-2 font-sans">
                {sp.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

