import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, MapPin, Clock, AlertTriangle, Users, DollarSign, Award, CheckCircle2, ChevronRight } from 'lucide-react';
import { HACKATHON_INFO } from '../data/hackathonData';

gsap.registerPlugin(ScrollTrigger);

export default function EventDetails() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (gridRef.current) {
        gsap.from(gridRef.current.children, {
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 45,
          scale: 0.95,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);
  const details = [
    {
      title: "EVENT DATES",
      kanji: "開催日程",
      value: HACKATHON_INFO.dates,
      sub: "36 Hours Continuous Sprint",
      icon: Calendar,
      color: "text-cyan-400",
      border: "border-cyan-500/30",
      bg: "from-cyan-500/10 to-transparent",
    },
    {
      title: "CYBER ARENA (VENUE)",
      kanji: "会場",
      value: HACKATHON_INFO.venue,
      sub: "Tokyo Cyber Arena & Virtual Metaverse Access",
      icon: MapPin,
      color: "text-pink-400",
      border: "border-pink-500/30",
      bg: "from-pink-500/10 to-transparent",
    },
    {
      title: "HACK DURATION",
      kanji: "期間",
      value: HACKATHON_INFO.duration,
      sub: "Non-stop code, mentoring & workshops",
      icon: Clock,
      color: "text-yellow-400",
      border: "border-yellow-500/30",
      bg: "from-yellow-500/10 to-transparent",
    },
    {
      title: "REGISTRATION DEADLINE",
      kanji: "応募締切",
      value: HACKATHON_INFO.registrationDeadline,
      sub: "Late submissions will not be processed",
      icon: AlertTriangle,
      color: "text-rose-400",
      border: "border-rose-500/30",
      bg: "from-rose-500/10 to-transparent",
    },
    {
      title: "TEAM FORMATION",
      kanji: "チーム編成",
      value: HACKATHON_INFO.teamSize,
      sub: "Solo hackers can auto-match on Discord",
      icon: Users,
      color: "text-purple-400",
      border: "border-purple-500/30",
      bg: "from-purple-500/10 to-transparent",
    },
    {
      title: "REGISTRATION FEE",
      kanji: "参加費",
      value: HACKATHON_INFO.fee,
      sub: "Zero entry cost. 100% sponsored by titans",
      icon: DollarSign,
      color: "text-emerald-400",
      border: "border-emerald-500/30",
      bg: "from-emerald-500/10 to-transparent",
    },
  ];

  return (
    <section
      id="details"
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#06060e] overflow-hidden"
    >
      {/* Anime Background Lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-mono uppercase tracking-widest mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>OPERATIONAL PARAMETERS // 規約要件</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-cyber text-white tracking-wide">
            EVENT <span className="bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent">DETAILS</span>
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Everything you need to calibrate your team for peak performance during the 36-hour sprint.
          </p>
        </div>

        {/* Animated Cards Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {details.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`relative p-6 sm:p-8 rounded-2xl bg-gradient-to-b ${item.bg} bg-[#0c0a1c]/80 border ${item.border} hover:scale-[1.02] transition-all duration-300 group cyber-cut-sm shadow-lg`}
              >
                {/* Kanji watermarked */}
                <div className="absolute top-4 right-4 text-xs font-jp text-slate-500 group-hover:text-slate-300 transition-colors">
                  {item.kanji}
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${item.color} group-hover:rotate-6 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase">
                      {item.title}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold font-cyber text-white">
                      {item.value}
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-400">
                  {item.sub}
                </p>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>SPEC-{idx + 1}</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> VERIFIED
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Eligibility Banner */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_30px_rgba(0,240,255,0.1)]">
          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#ff007a] to-[#00f0ff] text-white">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                UNIVERSAL ACCESS CLAUSE // 参加資格
              </div>
              <h4 className="text-lg sm:text-xl font-cyber font-bold text-white mt-1">
                ELIGIBILITY & PARTICIPANT CRITERIA
              </h4>
              <p className="text-slate-300 text-sm mt-1 max-w-2xl">
                {HACKATHON_INFO.eligibility} Beginners are fully embraced with dedicated mentor tracks, while veterans compete for the grand Shogun trophy.
              </p>
            </div>
          </div>
          <a
            href="#register"
            className="whitespace-nowrap px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-cyber font-bold text-xs uppercase tracking-wider text-white transition-all hover:scale-105"
          >
            CLAIM SQUAD PASS
          </a>
        </div>
      </div>
    </section>
  );
}

