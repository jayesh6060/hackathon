import React from 'react';
import { ArrowUp, ArrowUpRight, Headphones, Heart } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export default function Footer({ onNavigate }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#0b0b0f] text-[#fafaf7] border-t border-neutral-800 pt-16 pb-12 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-800">
          
          {/* Column 1 & 2 (Span 2): Brand & Details */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#002B66] flex items-center justify-center border border-white/20">
                <span className="font-chakra font-black text-xs text-white">JGI</span>
              </div>
              <div className="font-chakra font-black text-base sm:text-lg tracking-wider uppercase">
                <span className="text-white">JAIN INSTITUTE OF TECHNOLOGY</span>
                <span className="text-[#F47025] mx-1.5 font-black">X</span>
                <span className="text-[#38bdf8]">SALUTIXAI</span>
              </div>
            </div>

            <p className="text-sm text-neutral-400 font-sans max-w-sm leading-relaxed">
              {SITE_CONFIG.heroSummary}
            </p>

            <div className="space-y-1 font-mono text-xs text-neutral-300">
              <p>📅 <span className="font-semibold">{SITE_CONFIG.dates}</span></p>
              <p>📍 <span>{SITE_CONFIG.venue}</span></p>
              <p>🏆 <span className="text-[#F47025] font-bold">{SITE_CONFIG.stats.prizePool} Cash Prize Pool</span></p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('/register')}
                className="px-5 py-2.5 rounded-lg bg-[#F47025] hover:bg-[#e05e15] text-white font-chakra font-bold text-xs uppercase tracking-wider transition-all"
              >
                Register →
              </button>
            </div>
          </div>

          {/* Column 3: Event Links */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#F47025]">
              Event
            </h4>
            <ul className="space-y-2 text-xs font-mono text-neutral-400">
              <li>
                <a href="#themes" className="hover:text-white transition-colors">
                  Themes & Tracks
                </a>
              </li>
              <li>
                <a href="#timeline" className="hover:text-white transition-colors">
                  Timeline
                </a>
              </li>
              <li>
                <button onClick={() => onNavigate('/event')} className="hover:text-white transition-colors text-left">
                  Event Schedule
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/rules')} className="hover:text-white transition-colors text-left">
                  Rules & Eligibility
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/advisory')} className="hover:text-white transition-colors text-left">
                  Advisory Committee
                </button>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Participants Links */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#F47025]">
              Participants
            </h4>
            <ul className="space-y-2 text-xs font-mono text-neutral-400">
              <li>
                <button onClick={() => onNavigate('/register')} className="hover:text-white transition-colors text-left">
                  Register
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/login')} className="hover:text-white transition-colors text-left">
                  Team Login
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/rules#screening')} className="hover:text-white transition-colors text-left">
                  Screening Checklist
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/rules#ownership')} className="hover:text-white transition-colors text-left">
                  Ownership Verification
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/rules#weights')} className="hover:text-white transition-colors text-left">
                  Judging Weights
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Organisers & Help Desk */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#F47025]">
              Organisers
            </h4>
            <ul className="space-y-2 text-xs font-mono text-neutral-400">
              <li>
                <button onClick={() => onNavigate('/admin')} className="hover:text-white transition-colors inline-flex items-center gap-1">
                  <span>Admin Panel</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-500" />
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/panel')} className="hover:text-white transition-colors inline-flex items-center gap-1">
                  <span>Review Panel Login</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-500" />
                </button>
              </li>
            </ul>

            <div className="pt-2">
              <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                Help Desk
              </span>
              <ul className="space-y-1 font-mono text-xs">
                {SITE_CONFIG.helpDesk.map((h, i) => (
                  <li key={i}>
                    <a href={`tel:${h.phone}`} className="text-neutral-300 hover:text-[#F47025] transition-colors">
                      <span className="font-semibold text-white">{h.name}</span> · {h.phone}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Strip: Copyright + Back to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-neutral-500 gap-4">
          <p>
            &copy; {SITE_CONFIG.year} {SITE_CONFIG.universityName}. In collaboration with Salutix AI.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer group"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
