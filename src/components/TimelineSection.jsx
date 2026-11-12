import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Play, Key, Sparkles, Coffee, Users, Moon, Zap, Sun, Eye, CheckCircle2, Trophy, Award, Flame } from 'lucide-react';
import { TIMELINE } from '../data/hackathonData';

gsap.registerPlugin(ScrollTrigger);

export default function TimelineSection() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.timeline-item-anim');
      items.forEach((item) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          x: -30,
          duration: 0.7,
          ease: "power2.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const iconMap = {
    Key: Key,
    Sparkles: Sparkles,
    Play: Play,
    Coffee: Coffee,
    Users: Users,
    Moon: Moon,
    Zap: Zap,
    Sun: Sun,
    Eye: Eye,
    CheckCircle2: CheckCircle2,
    Trophy: Trophy,
    Award: Award,
    Flame: Flame
  };

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full z-10"
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
          <Clock className="w-3.5 h-3.5" />
          <span>CHRONO SEQUENCE // 36-HOUR FLOW</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-cyber text-white tracking-wide">
          CONTINUOUS <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">TIMELINE</span>
        </h2>
        <p className="mt-4 text-slate-400 text-base sm:text-lg">
          The complete schedule from opening keynote to code freeze and katana trophy distribution.
        </p>
      </div>

      {/* Complete Continuous Timeline - Day 1 followed by Day 2 without tabs */}
      <div ref={containerRef} className="space-y-16">
        {TIMELINE.map((dayGroup, dayIdx) => (
          <div key={dayGroup.day} className="space-y-8">
            {/* Day Header Badge */}
            <div className="flex items-center gap-4">
              <span className="px-4 py-2 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 font-cyber font-bold text-sm tracking-wider shadow-[0_0_20px_rgba(56,189,248,0.2)]">
                {dayGroup.day}
              </span>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-cyan-500/30 via-indigo-500/20 to-transparent" />
            </div>

            {/* Vertical Flow Items for this Day */}
            <div className="relative border-l-2 border-cyan-500/20 ml-4 sm:ml-28 pl-6 sm:pl-10 space-y-8">
              {dayGroup.items.map((item, idx) => {
                const Icon = iconMap[item.icon] || Clock;
                return (
                  <div key={idx} className="timeline-item-anim relative group">
                    {/* Glowing Node on Vertical Line */}
                    <div
                      className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all ${
                        item.highlight
                          ? 'bg-gradient-to-r from-cyan-400 to-indigo-500 shadow-[0_0_15px_rgba(56,189,248,0.8)] scale-110'
                          : 'bg-[#0a0f24] border-2 border-cyan-500/40 text-cyan-400 group-hover:border-cyan-400 group-hover:scale-105'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-white" />
                    </div>

                    {/* Time indicator on desktop left */}
                    <div className="hidden sm:block absolute -left-28 top-1.5 text-right w-20">
                      <span className={`text-xs font-mono font-bold tracking-wider ${item.highlight ? 'text-cyan-300 font-bold' : 'text-slate-400'}`}>
                        {item.time}
                      </span>
                    </div>

                    {/* Event Card */}
                    <div
                      className={`p-6 rounded-2xl transition-all duration-300 ${
                        item.highlight
                          ? 'glass-flow-active border-cyan-400/50 shadow-[0_0_30px_rgba(56,189,248,0.15)]'
                          : 'glass-flow glass-flow-hover'
                      }`}
                    >
                      <div className="flex items-center justify-between sm:hidden mb-2">
                        <span className="px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-xs font-mono text-cyan-400 font-bold">
                          {item.time}
                        </span>
                        {item.highlight && (
                          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                            KEY EVENT
                          </span>
                        )}
                      </div>

                      <div className="flex items-start gap-4">
                        <div
                          className={`p-2.5 rounded-xl border shrink-0 ${
                            item.highlight
                              ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
                              : 'bg-white/5 border-white/10 text-cyan-400'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <h4 className="text-lg sm:text-xl font-bold font-cyber text-white">
                              {item.title}
                            </h4>
                            {item.highlight && (
                              <span className="hidden sm:inline-block text-[10px] font-mono uppercase px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold">
                                CRITICAL MILESTONE
                              </span>
                            )}
                          </div>
                          <p className="mt-2 text-slate-300 text-sm leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
