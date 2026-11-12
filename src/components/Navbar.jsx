import React, { useState } from 'react';
import { Menu, X, Headphones, ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import HelpDeskModal from './HelpDeskModal';

export default function Navbar({ currentPath = '/', onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [helpDeskOpen, setHelpDeskOpen] = useState(false);

  const navLinks = [
    { label: "Themes", href: "/#themes", page: "/" },
    { label: "Timeline", href: "/#timeline", page: "/" },
    { label: "Schedule", href: "/event", page: "/event" },
    { label: "Rules", href: "/rules", page: "/rules" },
    { label: "Advisory", href: "/advisory", page: "/advisory" },
    { label: "FAQ", href: "/#faq", page: "/" },
  ];

  const handleLinkClick = (e, item) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (item.href.startsWith('/#')) {
      if (currentPath !== '/') {
        onNavigate('/');
        setTimeout(() => {
          const el = document.querySelector(item.href.replace('/', ''));
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.querySelector(item.href.replace('/', ''));
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      onNavigate(item.page);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#fafaf7]/95 backdrop-blur-md border-b border-[#0b0b0f]/10 transition-all select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Left Brand: JGI Blue Badge + Jain Institute of Technology */}
          <div 
            onClick={() => onNavigate('/')}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group"
          >
            {/* JGI Blue Circular Badge */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#002B66] flex items-center justify-center shadow-xs border border-[#002B66]/30 flex-shrink-0">
              <span className="font-chakra font-black text-[11px] sm:text-xs text-white tracking-tighter">
                JGI
              </span>
            </div>

            <div className="h-5 w-[1px] bg-neutral-300 hidden sm:block" />

            {/* University & Hackathon Identity */}
            <div className="flex flex-col text-left leading-tight">
              <span className="font-chakra font-bold text-xs sm:text-sm tracking-wider text-[#0b0b0f] uppercase group-hover:text-[#F47025] transition-colors whitespace-nowrap flex items-center gap-1.5">
                <span>Jain Institute of Technology</span>
                <span className="text-[#F47025] font-black">X</span>
                <span className="text-sky-600">Salutixai</span>
              </span>
              <span className="text-[8.5px] sm:text-[9.5px] font-mono tracking-[0.16em] text-neutral-500 uppercase">
                {SITE_CONFIG.location} · {SITE_CONFIG.name}
              </span>
            </div>
          </div>

          {/* Desktop Center Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-neutral-700">
            {navLinks.map((item, idx) => {
              const isActive = currentPath === item.page && !item.href.includes('#');
              return (
                <a
                  key={idx}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item)}
                  className={`hover:text-[#F47025] transition-colors relative py-1 ${
                    isActive ? 'text-[#F47025] font-bold' : ''
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute inset-x-0 -bottom-1 h-[2px] bg-[#F47025] rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Cluster: Help Desk + Team Login + Register */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Help desk modal trigger */}
            <button
              onClick={() => setHelpDeskOpen(true)}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs font-medium text-neutral-700 hover:text-[#F47025] hover:bg-neutral-200/60 transition-colors cursor-pointer"
            >
              <Headphones className="w-3.5 h-3.5 text-[#F47025]" />
              <span>Help desk</span>
            </button>

            {/* Team login button */}
            <button
              onClick={() => onNavigate('/login')}
              className="hidden sm:inline-block px-3.5 py-1.5 rounded-lg border border-neutral-300 hover:border-neutral-800 text-[#0b0b0f] font-mono text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
            >
              Team login
            </button>

            {/* Register button (Primary CTA) */}
            <button
              onClick={() => onNavigate('/register')}
              className="px-4 sm:px-5 py-2 rounded-lg bg-[#0b0b0f] hover:bg-[#F47025] text-white font-chakra font-bold text-xs uppercase tracking-wider shadow-sm hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Register (₹650)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg border border-neutral-300 text-neutral-700 hover:text-black lg:hidden"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-neutral-200 bg-[#fafaf7] px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-2 font-mono text-xs font-semibold uppercase tracking-wider text-neutral-700">
              {navLinks.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item)}
                  className="px-3 py-2 rounded-lg hover:bg-neutral-200/60 hover:text-[#F47025] transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setHelpDeskOpen(true);
                }}
                className="text-left px-3 py-2 rounded-lg hover:bg-neutral-200/60 text-[#F47025] flex items-center gap-2"
              >
                <Headphones className="w-3.5 h-3.5" />
                <span>Help Desk & Coordinator Numbers</span>
              </button>
            </div>

            <div className="pt-3 border-t border-neutral-200 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('/login');
                }}
                className="w-full py-2.5 rounded-lg border border-neutral-300 text-center font-mono text-xs font-bold uppercase tracking-wider text-[#0b0b0f]"
              >
                Team Login
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('/register');
                }}
                className="w-full py-2.5 rounded-lg bg-[#F47025] hover:bg-[#e05e15] text-white text-center font-chakra font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5"
              >
                <span>Register Now (₹650)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Help Desk Modal */}
      <HelpDeskModal 
        isOpen={helpDeskOpen}
        onClose={() => setHelpDeskOpen(false)}
      />
    </>
  );
}
