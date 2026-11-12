import React from 'react';
import { Mail, Phone, MapPin, ArrowUp, ArrowRight, Compass, Sparkles } from 'lucide-react';
import { HACKATHON_INFO } from '../../data/hackathonData';
import { playUiClick, playFantasyHarpChime } from '../../utils/audioSystem';

export default function Chapter9Final() {
  const scrollToTop = () => {
    playUiClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="chapter-9" className="relative pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full z-10">
      {/* Final Call to Action Hero Card */}
      <div className="mb-24 p-8 sm:p-14 rounded-3xl glass-fantasy-amber border-2 border-[#F6A43A]/50 text-center relative overflow-hidden shadow-[0_0_60px_rgba(246,164,58,0.25)]">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#101A2B] border border-[#F6A43A]/40 text-[#F6A43A] text-xs font-serif uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>CHAPTER 09 — THE FINAL CALL</span>
        </div>

        <h3 className="text-3xl sm:text-5xl font-black font-display text-[#F3EBDD] tracking-tight">
          THE GATES OF THE SPIRE <span className="bg-gradient-to-r from-[#F6A43A] to-[#FF7138] bg-clip-text text-transparent">STAND OPEN</span>
        </h3>
        <p className="mt-4 text-[#F3EBDD]/85 text-base sm:text-lg max-w-2xl mx-auto font-sans">
          Only 500 adventurer seats are endowed for the 2026 expedition. Assemble your companions, select your path, and begin your ascent.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#chapter-7"
            onClick={() => {
              playUiClick();
              playFantasyHarpChime();
            }}
            className="px-8 py-4 bg-gradient-to-r from-[#F6A43A] via-[#FF7138] to-[#F6A43A] text-[#101A2B] font-display font-bold text-sm uppercase tracking-wider rounded-full shadow-[0_0_30px_rgba(246,164,58,0.6)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <span>JOIN THE EXPEDITION NOW</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Citadel Contact & Fellowship Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-16 border-b border-white/10 text-xs">
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F6A43A] to-[#FF7138] p-[1.5px]">
              <div className="w-full h-full bg-[#101A2B] rounded-full flex items-center justify-center text-[#F6A43A]">
                <Compass className="w-5 h-5" />
              </div>
            </div>
            <span className="font-display font-black tracking-widest text-lg text-[#F3EBDD]">
              AETHERIA <span className="text-[#F6A43A]">HACKS</span>
            </span>
          </div>
          <p className="text-[#F3EBDD]/70 font-sans leading-relaxed">
            The premier anime fantasy single-page hackathon expedition, set against the golden spire and floating isles of Google Flow.
          </p>
        </div>

        {/* Contact Guild */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold font-display text-[#F3EBDD] uppercase tracking-wider">
            CITADEL HEADQUARTERS
          </h4>
          <ul className="space-y-3 font-sans text-[#F3EBDD]/80">
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#F6A43A] shrink-0" />
              <a href="mailto:guild@aetheriahacks.dev" className="hover:text-[#F6A43A] transition-colors">
                guild@aetheriahacks.dev
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#8BC9ED] shrink-0" />
              <a href="tel:+919876543210" className="hover:text-[#8BC9ED] transition-colors">
                +91 (0) 98765 43210
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#FF7138] shrink-0 mt-0.5" />
              <span>Grand Citadel Hall & Skyrealm Metaverse Guild</span>
            </li>
          </ul>
        </div>

        {/* Chapters Directory */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold font-display text-[#F3EBDD] uppercase tracking-wider">
            CHAPTERS DIRECTORY
          </h4>
          <div className="grid grid-cols-2 gap-2 font-display text-[#F3EBDD]/70">
            <a href="#chapter-1" onClick={playUiClick} className="hover:text-[#F6A43A] transition-colors">Ch. 1 Beginning</a>
            <a href="#chapter-2" onClick={playUiClick} className="hover:text-[#F6A43A] transition-colors">Ch. 2 Adventure</a>
            <a href="#chapter-3" onClick={playUiClick} className="hover:text-[#F6A43A] transition-colors">Ch. 3 Paths</a>
            <a href="#chapter-4" onClick={playUiClick} className="hover:text-[#F6A43A] transition-colors">Ch. 4 Journey</a>
            <a href="#chapter-5" onClick={playUiClick} className="hover:text-[#F6A43A] transition-colors">Ch. 5 Rewards</a>
            <a href="#chapter-6" onClick={playUiClick} className="hover:text-[#F6A43A] transition-colors">Ch. 6 People</a>
            <a href="#chapter-7" onClick={playUiClick} className="hover:text-[#F6A43A] font-bold transition-colors">Ch. 7 Register</a>
            <a href="#chapter-8" onClick={playUiClick} className="hover:text-[#F6A43A] transition-colors">Ch. 8 FAQ</a>
          </div>
        </div>

        {/* Transmission & Fellowship */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold font-display text-[#F3EBDD] uppercase tracking-wider">
            FELLOWSHIP TRANSMISSION
          </h4>
          <p className="text-[#F3EBDD]/70 font-sans">
            Connect with 4,000+ builders in the official Citadel Discord.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {['Discord Guild', 'X / Twitter', 'GitHub', 'LinkedIn', 'YouTube'].map((social) => (
              <a
                key={social}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  playUiClick();
                }}
                className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-[#F6A43A] hover:text-[#F6A43A] text-xs font-sans transition-all hover:scale-105 text-[#F3EBDD]"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-serif text-[#F3EBDD]/60">
        <div>
          <span>© 2026 AETHERIA HACKS. ALL RIGHTS RESERVED UNDER THE GOLDEN SPIRE.</span>
        </div>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:border-[#F6A43A] text-[#F3EBDD] hover:text-[#F6A43A] transition-all hover:scale-105 group font-display"
        >
          <span>ASCEND TO SUMMIT</span>
          <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
    </footer>
  );
}

