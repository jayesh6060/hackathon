import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, Crown, Award, Gift, Sparkles, Check, ShieldCheck, Heart, Palette, Rocket, Code2 } from 'lucide-react';
import { PRIZES } from '../data/hackathonData';

gsap.registerPlugin(ScrollTrigger);

export default function PrizesSection() {
  const sectionRef = useRef(null);
  const podiumRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (podiumRef.current) {
        gsap.from(podiumRef.current.children, {
          scrollTrigger: {
            trigger: podiumRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 50,
          stagger: 0.15,
          duration: 0.9,
          ease: "back.out(1.4)",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const [second, first, third] = PRIZES.top3;
  const podiumOrder = [second, first, third];

  const iconMap = {
    Heart: Heart,
    Palette: Palette,
    Rocket: Rocket,
    Code2: Code2
  };

  return (
    <section
      id="prizes"
      ref={sectionRef}
      className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full z-10"
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
          <Trophy className="w-3.5 h-3.5" />
          <span>BOUNTY VAULT // 賞金プール</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-cyber text-white tracking-wide">
          CHAMPION'S <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">BOUNTIES</span>
        </h2>
        <p className="mt-4 text-slate-400 text-base sm:text-lg">
          Over ₹3,00,000 in cash awards, custom-forged ceremonial katanas, cloud compute credits, and investor pitch allocations.
        </p>
      </div>

      {/* Podium Grid */}
      <div ref={podiumRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end mb-24 max-w-5xl mx-auto">
        {podiumOrder.map((prize) => {
          const isFirst = prize.place === "1st";
          return (
            <div
              key={prize.place}
              className={`relative rounded-3xl transition-all duration-300 flex flex-col justify-between cyber-corner p-6 sm:p-8 ${
                isFirst
                  ? 'glass-flow-active border-2 border-cyan-400 shadow-[0_0_50px_rgba(56,189,248,0.3)] md:-translate-y-6 z-20'
                  : 'glass-flow glass-flow-hover z-10'
              }`}
            >
              {isFirst && (
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 p-3 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full text-black shadow-[0_0_25px_rgba(56,189,248,0.8)] animate-bounce">
                  <Crown className="w-6 h-6 fill-black" />
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full ${isFirst ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50' : 'bg-white/5 text-slate-300'}`}>
                    RANK {prize.place}
                  </span>
                  <span className="text-base font-jp font-bold text-slate-400">
                    {prize.kanji}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black font-cyber text-white">
                  {prize.title}
                </h3>

                <div className="my-5">
                  <div className="text-4xl sm:text-5xl font-black font-cyber tracking-tight text-white drop-shadow-[0_0_20px_rgba(56,189,248,0.4)]">
                    {prize.cash}
                  </div>
                  <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider">
                    DIRECT CASH TRANSFER
                  </span>
                </div>

                <div className="space-y-2.5 mt-6 pt-6 border-t border-white/10">
                  {prize.perks.map((perk, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <Check className={`w-4 h-4 mt-0.5 shrink-0 ${isFirst ? 'text-cyan-400' : 'text-indigo-400'}`} />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4">
                <a
                  href="#register"
                  className={`w-full py-3 block text-center rounded-xl font-cyber font-bold text-xs uppercase tracking-wider transition-all ${
                    isFirst
                      ? 'bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-600 text-black shadow-[0_0_25px_rgba(56,189,248,0.5)] hover:scale-105'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  COMPETE FOR {prize.place}
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Special Category Awards */}
      <div className="mb-20">
        <h3 className="text-xl sm:text-2xl font-bold font-cyber text-white text-center mb-8 flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <span>SPECIAL CATEGORY BOUNTIES</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PRIZES.specialCategories.map((item) => {
            const Icon = iconMap[item.icon] || Award;
            return (
              <div
                key={item.title}
                className="p-5 rounded-2xl glass-flow glass-flow-hover cyber-corner-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold font-cyber text-white">
                  {item.title}
                </h4>
                <div className="mt-2 text-xl font-black font-cyber text-cyan-300">
                  {item.bounty}
                </div>
                <div className="text-[10px] font-mono text-slate-400 mt-1">
                  SPONSORED BY {item.sponsor}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* All Participants Swag & Certificates */}
      <div className="glass-flow p-8 sm:p-10 rounded-3xl border border-cyan-500/30 max-w-4xl mx-auto shadow-[0_0_40px_rgba(56,189,248,0.1)]">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-[0_0_25px_rgba(56,189,248,0.5)]">
            <Gift className="w-8 h-8" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
              GUARANTEED REWARDS // 参加者全員特典
            </div>
            <h4 className="text-xl sm:text-2xl font-bold font-cyber text-white mt-1">
              EVERY PARTICIPANT RECEIVES
            </h4>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              {PRIZES.allParticipants.map((p, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
