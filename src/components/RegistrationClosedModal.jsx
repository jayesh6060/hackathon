import React, { useEffect } from 'react';
import { X, Heart, Calendar, MapPin, Trophy, Sparkles } from 'lucide-react';

export default function RegistrationClosedModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 select-none"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg bg-[#0c1626]/95 text-[#F3EBDD] rounded-3xl border-2 border-[#F6A43A]/80 shadow-[0_0_60px_rgba(246,164,58,0.45)] overflow-hidden p-6 sm:p-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Luminous Glowing Heart / Sparkles Icon */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-5 rounded-2xl bg-gradient-to-br from-[#F6A43A]/25 to-[#FF7138]/25 border border-[#F6A43A]/60 flex items-center justify-center text-[#F6A43A] shadow-[0_0_35px_rgba(246,164,58,0.5)]">
          <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-[#F6A43A] animate-pulse" />
        </div>

        {/* Title */}
        <h3 className="font-chakra font-black text-2xl sm:text-3xl uppercase tracking-wider text-white">
          Registration Has Been Closed
        </h3>

        {/* Thank You Highlight */}
        <p className="font-chakra font-bold text-base sm:text-lg text-[#F6A43A] mt-2.5 tracking-wide flex items-center justify-center gap-1.5">
          <Sparkles className="w-4 h-4 text-[#F6A43A]" />
          <span>Thank you for your support!</span>
          <Sparkles className="w-4 h-4 text-[#F6A43A]" />
        </p>

        {/* Message */}
        <p className="font-sans text-xs sm:text-sm text-neutral-300 mt-2 leading-relaxed max-w-md mx-auto">
          The registration window for CLOCKIT 2026 has officially concluded. We are deeply thankful to all participating squads, developers, and institutions for the incredible response!
        </p>

        {/* Event Schedule & Campus Details Card */}
        <div className="mt-5 p-4 rounded-2xl bg-[#101A2B]/90 border border-white/10 text-left space-y-2 text-xs font-mono text-neutral-300">
          <div className="flex items-center gap-2 text-white font-semibold">
            <Calendar className="w-4 h-4 text-[#F6A43A]" />
            <span>25 – 26 November 2026</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#38bdf8]" />
            <span>JITD Library & Innovation Hub, Davanagere</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-[#F6A43A]" />
            <span>₹ 30,000 Trophy Pool · 24-Hour Continuous Sprint</span>
          </div>
        </div>

        <p className="text-[11px] font-mono text-neutral-400 mt-3">
          All shortlisted teams will receive orientation, verification, and schedule details via email and WhatsApp.
        </p>

        {/* Dismiss Button */}
        <button
          onClick={onClose}
          className="mt-6 w-full py-3.5 rounded-xl bg-gradient-to-r from-[#F6A43A] to-[#FF7138] hover:from-[#FFB959] hover:to-[#FF8955] text-[#101A2B] font-chakra font-black text-sm uppercase tracking-wider shadow-lg hover:shadow-[0_0_30px_rgba(246,164,58,0.55)] transition-all cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
}
