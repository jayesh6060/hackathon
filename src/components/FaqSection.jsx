import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';
import { FAQS } from '../data/hackathonData';
import { playUiClick } from '../utils/audioSystem';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (idx) => {
    playUiClick();
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full z-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>INTEL ARCHIVE // よくある質問</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-cyber text-white tracking-wide">
          FREQUENTLY ASKED <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">QUESTIONS</span>
        </h2>
        <p className="mt-4 text-slate-400 text-base sm:text-lg">
          Clear intel on rules, hardware, accommodations, and the scroll-controlled Google Flow video engine.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl transition-all duration-300 cyber-corner-sm border overflow-hidden ${
                isOpen
                  ? 'glass-flow-active border-cyan-400/50 shadow-[0_0_25px_rgba(56,189,248,0.15)]'
                  : 'glass-flow glass-flow-hover'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleAccordion(idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono font-bold text-cyan-400">
                    0{idx + 1}
                  </span>
                  <h3 className={`text-base sm:text-lg font-bold font-cyber transition-colors ${isOpen ? 'text-cyan-300' : 'text-white'}`}>
                    {faq.q}
                  </h3>
                </div>
                <div className={`p-2 rounded-full transition-transform ${isOpen ? 'bg-cyan-500/20 text-cyan-300 rotate-180' : 'bg-white/5 text-slate-400'}`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-2 text-slate-300 text-sm sm:text-base leading-relaxed border-t border-white/5 animate-in fade-in duration-300">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Discord / Support Prompt */}
      <div className="mt-12 text-center">
        <p className="text-slate-400 text-sm">
          Need additional intel? Connect with mentors on the{' '}
          <a href="#footer" className="text-cyan-400 hover:text-indigo-400 underline transition-colors">
            Shinrai Community Discord
          </a>{' '}
          for 24/7 hacker support.
        </p>
      </div>
    </section>
  );
}
