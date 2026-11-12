import React from 'react';
import { X, Phone, MessageSquare, Headphones } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export default function HelpDeskModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-[#fafaf7] text-[#0b0b0f] rounded-2xl border border-neutral-300 shadow-2xl overflow-hidden p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-[#F47025]/10 text-[#F47025]">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-chakra font-bold text-base uppercase tracking-wider text-[#0b0b0f]">
                CLOCKIT HELP DESK
              </h3>
              <p className="text-[11px] font-mono text-neutral-500 uppercase">
                Direct hotline & inquiries
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-neutral-200 text-neutral-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Note */}
        <p className="text-xs text-neutral-600 mt-3 font-sans leading-relaxed">
          Need assistance with team registration, prototype screening, or traveling to JITD? Call or message our student coordinators directly:
        </p>

        {/* Contacts List */}
        <div className="mt-4 space-y-2.5">
          {SITE_CONFIG.helpDesk.map((contact, i) => (
            <div 
              key={i}
              className="p-3 rounded-xl bg-white border border-neutral-200 flex items-center justify-between shadow-xs hover:border-[#F47025]/50 transition-colors"
            >
              <div>
                <strong className="block font-chakra font-bold text-sm text-[#0b0b0f]">
                  {contact.name}
                </strong>
                <span className="block text-[10px] font-mono text-neutral-500 uppercase">
                  {contact.role}
                </span>
                <span className="block text-xs font-mono font-semibold text-[#F47025] mt-0.5">
                  {contact.phone}
                </span>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-xs">
                <a
                  href={`tel:${contact.phone}`}
                  className="px-2.5 py-1.5 rounded-lg bg-[#0b0b0f] hover:bg-[#F47025] text-white transition-colors flex items-center gap-1"
                >
                  <Phone className="w-3 h-3" />
                  <span>Call</span>
                </a>
                <a
                  href={`https://wa.me/${contact.raw}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors flex items-center gap-1"
                >
                  <MessageSquare className="w-3 h-3" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="mt-4 pt-3 border-t border-neutral-200 text-[11px] font-mono text-neutral-500 text-center">
          Jain Institute of Technology, Davanagere · Karnataka
        </div>
      </div>
    </div>
  );
}

