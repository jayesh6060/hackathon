import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, MapPin, Clock, Users, ShieldAlert, DollarSign, Award, Compass, Sparkles } from 'lucide-react';
import { HACKATHON_INFO, CONTINUOUS_SCHEDULE } from '../../data/hackathonData';

gsap.registerPlugin(ScrollTrigger);

export default function Chapter4Journey() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.schedule-item');
      items.forEach((item) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          x: -30,
          duration: 0.75,
          ease: "power2.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const parameters = [
    { label: "EXPEDITION DATES", value: HACKATHON_INFO.dates, sub: "36 Continuous Hours", icon: Calendar, color: "text-[#F6A43A]" },
    { label: "CITADEL ARENA (VENUE)", value: HACKATHON_INFO.venue, sub: "Physical & Global Virtual Guild", icon: MapPin, color: "text-[#8BC9ED]" },
    { label: "REGISTRATION DEADLINE", value: HACKATHON_INFO.registrationDeadline, sub: "Guild Gate Locks Promptly", icon: ShieldAlert, color: "text-[#FF7138]" },
    { label: "ADVENTURER SQUAD", value: HACKATHON_INFO.teamSize, sub: "Solo matching available", icon: Users, color: "text-[#8064A8]" },
    { label: "TRIBUTE / FEE", value: HACKATHON_INFO.fee, sub: "Standard Squad Entry", icon: DollarSign, color: "text-[#4D8060]" },
    { label: "ELIGIBILITY", value: "Universal Realm Access", sub: "Students, coders & artists", icon: Award, color: "text-[#F6A43A]" },
  ];

  return (
    <section
      id="chapter-4"
      ref={sectionRef}
      className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full z-10"
    >
      {/* Chapter Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F6A43A]/10 border border-[#F6A43A]/30 text-[#F6A43A] text-xs font-serif uppercase tracking-widest mb-3">
          <Clock className="w-3.5 h-3.5" />
          <span>CHAPTER 04 — THE JOURNEY</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-display text-[#F3EBDD] tracking-wide">
          EXPEDITION <span className="bg-gradient-to-r from-[#F6A43A] via-[#FF7138] to-[#8BC9ED] bg-clip-text text-transparent">PARAMETERS & TIMELINE</span>
        </h2>
        <p className="mt-4 text-[#F3EBDD]/80 text-base sm:text-lg font-sans">
          The laws of the realm and the chronological progression from initial gathering to final crowning.
        </p>
      </div>

      {/* Parameters Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        {parameters.map((p) => {
          const Icon = p.icon;
          return (
            <div
              key={p.label}
              className="p-6 rounded-2xl glass-fantasy glass-fantasy-hover border-[#F3EBDD]/15 flex items-start gap-4"
            >
              <div className={`p-3 rounded-xl bg-[#101A2B] border border-white/10 ${p.color} shrink-0`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-display font-bold tracking-widest text-[#8BC9ED] uppercase block">
                  {p.label}
                </span>
                <h4 className="text-base sm:text-lg font-bold font-display text-[#F3EBDD] mt-0.5">
                  {p.value}
                </h4>
                <p className="text-xs text-[#F3EBDD]/70 font-sans mt-0.5">
                  {p.sub}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Complete Continuous Timeline */}
      <div className="space-y-16 max-w-4xl mx-auto">
        {CONTINUOUS_SCHEDULE.map((phaseGroup) => (
          <div key={phaseGroup.day} className="space-y-6">
            {/* Phase Banner */}
            <div className="flex items-center gap-4">
              <span className="px-4 py-2 rounded-xl bg-[#101A2B] border border-[#F6A43A]/40 text-[#F6A43A] font-display font-bold text-xs sm:text-sm tracking-wider shadow-md">
                {phaseGroup.phase}
              </span>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-[#F6A43A]/40 via-[#FF7138]/20 to-transparent" />
            </div>

            {/* Milestones Flow */}
            <div className="relative border-l-2 border-[#F6A43A]/30 ml-4 sm:ml-28 pl-6 sm:pl-10 space-y-7">
              {phaseGroup.milestones.map((item, idx) => (
                <div key={idx} className="schedule-item relative group">
                  {/* Glowing Node */}
                  <div
                    className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all ${
                      item.highlight
                        ? 'bg-gradient-to-r from-[#F6A43A] to-[#FF7138] shadow-[0_0_15px_rgba(246,164,58,0.8)] scale-110'
                        : 'bg-[#101A2B] border-2 border-[#F6A43A]/50 text-[#F6A43A]'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-white" />
                  </div>

                  {/* Time label on left */}
                  <div className="hidden sm:block absolute -left-28 top-1.5 text-right w-20">
                    <span className={`text-xs font-display font-bold tracking-wider ${item.highlight ? 'text-[#F6A43A]' : 'text-[#8BC9ED]'}`}>
                      {item.time}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div
                    className={`p-6 rounded-2xl transition-all duration-300 ${
                      item.highlight
                        ? 'glass-fantasy-amber border-[#F6A43A]/60 shadow-[0_0_30px_rgba(246,164,58,0.2)]'
                        : 'glass-fantasy glass-fantasy-hover border-[#F3EBDD]/15'
                    }`}
                  >
                    <div className="flex items-center justify-between sm:hidden mb-2">
                      <span className="px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-xs font-display text-[#F6A43A] font-bold">
                        {item.time}
                      </span>
                      {item.highlight && (
                        <span className="text-[10px] font-display uppercase px-2 py-0.5 rounded bg-[#F6A43A]/20 text-[#F6A43A] border border-[#F6A43A]/40 font-bold">
                          CRITICAL MILESTONE
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <h4 className="text-lg sm:text-xl font-bold font-display text-[#F3EBDD]">
                        {item.title}
                      </h4>
                      {item.highlight && (
                        <span className="hidden sm:inline-block text-[10px] font-display uppercase px-2.5 py-0.5 rounded bg-[#F6A43A]/20 text-[#F6A43A] border border-[#F6A43A]/40 font-bold">
                          KEY MILESTONE
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-[#F3EBDD]/85 text-sm leading-relaxed font-sans">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

