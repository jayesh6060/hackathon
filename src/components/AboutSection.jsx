import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Flame, ShieldAlert, Cpu, CheckCircle, Zap } from 'lucide-react';
import { ABOUT_ITEMS, STATS } from '../data/hackathonData';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef(null);
  const statsRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate stats
      if (statsRef.current) {
        gsap.from(statsRef.current.children, {
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 40,
          stagger: 0.12,
          duration: 0.8,
          ease: "back.out(1.4)",
        });
      }

      // Animate about cards with anime-style slide & glow
      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 50,
          scale: 0.95,
          stagger: 0.15,
          duration: 0.9,
          ease: "power3.out",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const iconMap = {
    Sparkles: Sparkles,
    Flame: Flame,
    ShieldAlert: ShieldAlert,
    Cpu: Cpu,
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#070712] overflow-hidden"
    >
      {/* Background Anime Accents */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>MISSION DOSSIER // 新ミッション</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-cyber text-white tracking-wide">
            ABOUT <span className="bg-gradient-to-r from-cyan-400 to-[#ff007a] bg-clip-text text-transparent">SHINRAI HACKS</span>
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Where anime aesthetics meet industrial-grade software engineering. Learn what fuels our rebellion against ordinary technology.
          </p>
        </div>

        {/* Stats Grid */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-20">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="relative p-6 rounded-xl bg-[#0c0a1e]/80 border border-white/10 hover:border-cyan-500/40 transition-all group cyber-cut-sm"
            >
              <div className="absolute top-2 right-3 text-xs font-jp text-pink-400/50">
                {stat.kanji}
              </div>
              <div className="text-3xl sm:text-5xl font-black font-cyber text-white group-hover:text-cyan-400 transition-colors drop-shadow-[0_0_12px_rgba(0,240,255,0.4)]">
                {stat.value}
              </div>
              <div className="mt-2 text-xs sm:text-sm font-mono text-slate-400 uppercase tracking-wider">
                {stat.label}
              </div>
              <div className="mt-3 w-8 h-[2px] bg-gradient-to-r from-[#ff007a] to-cyan-400 group-hover:w-full transition-all duration-300" />
            </div>
          ))}
        </div>

        {/* Core Pillars: What, Why, Special, Experience */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {ABOUT_ITEMS.map((item, idx) => {
            const Icon = iconMap[item.icon] || Sparkles;
            return (
              <div
                key={item.title}
                className="relative p-8 rounded-2xl glass-panel hover:border-pink-500/40 transition-all duration-300 group overflow-hidden"
              >
                {/* Floating Kanji Background */}
                <div className="absolute -bottom-4 -right-4 text-7xl font-jp font-black text-white/[0.03] group-hover:text-pink-500/10 transition-colors pointer-events-none select-none">
                  {item.kanji}
                </div>

                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff007a]/20 to-cyan-500/20 border border-white/10 flex items-center justify-center text-cyan-300 group-hover:scale-110 group-hover:border-cyan-400 transition-all">
                    <Icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <span className="px-2.5 py-1 rounded text-[11px] font-mono tracking-wider bg-white/5 border border-white/10 text-pink-300">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold font-cyber text-white group-hover:text-pink-300 transition-colors">
                  {item.title}
                </h3>
                <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                  {item.description}
                </p>

                {/* Cyber accent line */}
                <div className="mt-6 flex items-center gap-2 text-xs font-mono text-slate-500">
                  <span className="w-2 h-2 rounded-full bg-cyan-400/60" />
                  <span>DECRYPTED PROTOCOL // 0{idx + 1}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

