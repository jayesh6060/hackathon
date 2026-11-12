import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';
import { FAQS } from '../../data/hackathonData';
import { playUiClick } from '../../utils/audioSystem';

export default function Chapter8Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (idx) => {
    playUiClick();
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="chapter-8" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full z-10">
      {/* Chapter Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8BC9ED]/10 border border-[#8BC9ED]/30 text-[#8BC9ED] text-xs font-serif uppercase tracking-widest mb-3">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>CHAPTER 08 — FREQUENT QUESTIONS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-display text-[#F3EBDD] tracking-wide">
          CITADEL <span className="bg-gradient-to-r from-[#F6A43A] via-[#FF7138] to-[#8BC9ED] bg-clip-text text-transparent">LORE & FAQ</span>
        </h2>
        <p className="mt-4 text-[#F3EBDD]/80 text-base sm:text-lg font-sans">
          Clear answers regarding accommodations, eligibility, judging rubrics, and the Google Flow visual canvas.
        </p>
      </div>

      {/* Accordion Cards */}
      <div className="space-y-4">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl transition-all duration-300 border overflow-hidden ${
                isOpen
                  ? 'glass-fantasy-amber border-[#F6A43A]/50 shadow-[0_0_25px_rgba(246,164,58,0.15)]'
                  : 'glass-fantasy glass-fantasy-hover border-white/10'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleAccordion(idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs font-display font-bold text-[#F6A43A]">
                    QUEST 0{idx + 1}
                  </span>
                  <h3 className={`text-base sm:text-lg font-bold font-display transition-colors ${isOpen ? 'text-[#F6A43A]' : 'text-[#F3EBDD]'}`}>
                    {faq.q}
                  </h3>
                </div>
                <div className={`p-2 rounded-full transition-transform ${isOpen ? 'bg-[#F6A43A]/20 text-[#F6A43A] rotate-180' : 'bg-white/5 text-[#8BC9ED]'}`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-2 text-[#F3EBDD]/85 text-sm sm:text-base leading-relaxed border-t border-white/5 animate-in fade-in duration-300 font-sans">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Support Prompt */}
      <div className="mt-12 text-center">
        <p className="text-[#F3EBDD]/70 text-sm font-sans">
          Have an unaddressed question? Join the fellow adventurers in the{' '}
          <a href="#chapter-9" className="text-[#F6A43A] hover:underline transition-colors font-medium">
            Citadel Discord Tavern
          </a>{' '}
          for round-the-clock guidance.
        </p>
      </div>
    </section>
  );
}

