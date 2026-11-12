import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, Crown, Gift, Sparkles, Check, ShieldCheck } from 'lucide-react';
import { PRIZES } from '../../data/hackathonData';

gsap.registerPlugin(ScrollTrigger);

export default function Chapter5Rewards() {
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
          y: 45,
          stagger: 0.15,
          duration: 0.9,
          ease: "power3.out",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const [second, first, third] = PRIZES.podium;
  const podiumOrder = [second, first, third];

  return (
    <section
      id="chapter-5"
      ref={sectionRef}
      className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full z-10"
    >
      {/* Chapter Header */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F6A43A]/10 border border-[#F6A43A]/30 text-[#F6A43A] text-xs font-serif uppercase tracking-widest mb-3">
          <Trophy className="w-3.5 h-3.5" />
          <span>CHAPTER 05 — THE REWARDS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-display text-[#F3EBDD] tracking-wide">
          THE BOUNTY <span className="bg-gradient-to-r from-[#F6A43A] via-[#FF7138] to-[#8BC9ED] bg-clip-text text-transparent">TREASURY</span>
        </h2>
        <p className="mt-4 text-[#F3EBDD]/80 text-base sm:text-lg font-sans">
          Direct treasury transfers, custom hand-forged ceremonial katanas, cloud compute grants, and angel term sheets.
        </p>
      </div>

      {/* Podium Cards: 2nd, 1st, 3rd */}
      <div ref={podiumRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end mb-24 max-w-5xl mx-auto">
        {podiumOrder.map((prize) => {
          const isFirst = prize.place === "1st";
          return (
            <div
              key={prize.place}
              className={`relative rounded-3xl transition-all duration-300 flex flex-col justify-between p-6 sm:p-8 ${
                isFirst
                  ? 'glass-fantasy-amber border-2 border-[#F6A43A] shadow-[0_0_50px_rgba(246,164,58,0.35)] md:-translate-y-6 z-20'
                  : 'glass-fantasy glass-fantasy-hover border-[#F3EBDD]/15 z-10'
              }`}
            >
              {isFirst && (
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 p-3 bg-gradient-to-r from-[#F6A43A] to-[#FF7138] rounded-full text-[#101A2B] shadow-[0_0_25px_rgba(246,164,58,0.8)] animate-bounce">
                  <Crown className="w-6 h-6 fill-[#101A2B]" />
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-display font-bold px-3 py-1 rounded-full ${isFirst ? 'bg-[#F6A43A]/20 text-[#F6A43A] border border-[#F6A43A]/50' : 'bg-white/5 text-[#8BC9ED]'}`}>
                    RANK {prize.place}
                  </span>
                  <span className="text-xs font-serif tracking-widest text-[#F3EBDD]/70 uppercase">
                    CORONATION
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black font-display text-[#F3EBDD]">
                  {prize.title}
                </h3>

                <div className="my-5">
                  <div className="text-4xl sm:text-5xl font-black font-display tracking-tight text-[#F6A43A] drop-shadow-[0_0_20px_rgba(246,164,58,0.5)]">
                    {prize.cash}
                  </div>
                  <span className="text-[11px] font-sans font-semibold tracking-wider text-[#8BC9ED] uppercase">
                    DIRECT TREASURY GRANT
                  </span>
                </div>

                <div className="space-y-2.5 mt-6 pt-6 border-t border-white/10">
                  {prize.perks.map((perk, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F3EBDD]/85">
                      <Check className={`w-4 h-4 mt-0.5 shrink-0 ${isFirst ? 'text-[#F6A43A]' : 'text-[#8BC9ED]'}`} />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4">
                <a
                  href="#chapter-7"
                  className={`w-full py-3 block text-center rounded-xl font-display font-bold text-xs uppercase tracking-wider transition-all ${
                    isFirst
                      ? 'bg-gradient-to-r from-[#F6A43A] via-[#FF7138] to-[#F6A43A] text-[#101A2B] shadow-[0_0_25px_rgba(246,164,58,0.5)] hover:scale-105'
                      : 'bg-white/10 hover:bg-white/20 text-[#F3EBDD]'
                  }`}
                >
                  QUEST FOR {prize.place}
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Special Quest Bounties */}
      <div className="mb-20">
        <h3 className="text-xl sm:text-2xl font-bold font-display text-[#F3EBDD] text-center mb-8 flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-[#F6A43A]" />
          <span>SPECIAL QUEST BOUNTIES</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PRIZES.specialCategories.map((item) => (
            <div
              key={item.title}
              className="p-5 rounded-2xl glass-fantasy glass-fantasy-hover border-[#F3EBDD]/15"
            >
              <h4 className="text-sm font-bold font-display text-[#F3EBDD]">
                {item.title}
              </h4>
              <div className="mt-2 text-xl font-black font-display text-[#F6A43A]">
                {item.bounty}
              </div>
              <div className="text-[10px] font-sans font-medium text-[#8BC9ED] mt-1 uppercase">
                SPONSORED BY {item.sponsor}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Guaranteed Swag Box */}
      <div className="glass-fantasy p-8 sm:p-10 rounded-3xl border border-[#F6A43A]/30 max-w-4xl mx-auto shadow-[0_0_40px_rgba(246,164,58,0.15)]">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F6A43A] to-[#FF7138] flex items-center justify-center text-[#101A2B] shrink-0 shadow-[0_0_25px_rgba(246,164,58,0.5)]">
            <Gift className="w-8 h-8" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="text-xs font-serif text-[#F6A43A] uppercase tracking-widest">
              GUARANTEED ADVENTURER PACK
            </div>
            <h4 className="text-xl sm:text-2xl font-bold font-display text-[#F3EBDD] mt-1">
              EVERY ACCEPTED PARTICIPANT RECEIVES
            </h4>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              {PRIZES.allParticipants.map((p, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F3EBDD]/85">
                  <ShieldCheck className="w-4 h-4 text-[#F6A43A] shrink-0 mt-0.5" />
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

