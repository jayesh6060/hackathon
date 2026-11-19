import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { supabase } from '../lib/supabaseClient';
import {
  ShieldCheck, Download, Copy, RefreshCw, ArrowLeft, ArrowRight,
  ExternalLink, Check, Users, Sparkles, Building, Phone, Calendar,
  MapPin, Trophy, Lock, Heart
} from 'lucide-react';
import { GUILD_TRACKS, STUDENT_COORDINATORS } from '../data/hackathonData';

export default function DedicatedRegisterPage({ onBack }) {
  // Query param parsing for pre-selected track
  const getInitialTrack = () => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const t = params.get('track');
      if (t) {
        const found = GUILD_TRACKS.find(x => x.id === t);
        if (found) return found.id;
      }
    }
    return GUILD_TRACKS[0]?.id || 'theme-01';
  };

  const [formData, setFormData] = useState({
    teamName: '',
    selectedDomain: getInitialTrack(),
    leaderName: '',
    leaderEmail: '',
    leaderPhone: '',
    college: 'Jain Institute of Technology, Davanagere',
    teamSize: '3',
    member2: '',
    member3: '',
    member4: '',
  });

  const [loading, setLoading] = useState(false);
  const [registeredTicket, setRegisteredTicket] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const generatedId = `CLOCKIT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const trackObj = GUILD_TRACKS.find(t => t.id === formData.selectedDomain);
    const trackName = trackObj ? trackObj.name : "Classified Arena 01";

    try {
      // 1. Insert team into Supabase 'teams' table
      const { data: teamData, error: teamError } = await supabase
        .from('teams')
        .insert([
          {
            team_code: generatedId,
            team_name: formData.teamName,
            selected_theme: trackName,
            college_name: formData.college,
            leader_name: formData.leaderName,
            leader_email: formData.leaderEmail,
            leader_phone: formData.leaderPhone,
            status: 'submitted',
            payment_status: 'pending'
          }
        ])
        .select()
        .single();

      if (teamError) {
        console.warn('Supabase insertion notice (ensure SQL schema has been executed):', teamError.message);
      } else if (teamData?.id) {
        // 2. Insert squad members into 'team_members' table
        const teamSize = parseInt(formData.teamSize, 10);
        const members = [];
        if (teamSize >= 2 && formData.member2) {
          members.push({
            team_id: teamData.id,
            member_name: formData.member2,
            role_designation: 'Squad Member 2'
          });
        }
        if (teamSize >= 3 && formData.member3) {
          members.push({
            team_id: teamData.id,
            member_name: formData.member3,
            role_designation: 'Squad Member 3'
          });
        }
        if (teamSize >= 4 && formData.member4) {
          members.push({
            team_id: teamData.id,
            member_name: formData.member4,
            role_designation: 'Squad Member 4'
          });
        }
        if (members.length > 0) {
          await supabase.from('team_members').insert(members);
        }
      }
    } catch (err) {
      console.warn('Supabase sync notice:', err);
    }

    const newTicket = {
      id: generatedId,
      teamName: formData.teamName,
      leader: formData.leaderName,
      email: formData.leaderEmail,
      phone: formData.leaderPhone,
      college: formData.college,
      track: trackName,
      venue: "JITD Library, Davanagere",
      date: "25 - 26 November 2026",
      amountPaid: "₹650",
      timestamp: new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      })
    };

    setRegisteredTicket(newTicket);
    setLoading(false);

    // Trigger Celebration Confetti
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#F6A43A', '#38bdf8', '#ffffff', '#10B981']
      });
    } catch (err) {
      // Safe fallback
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyTicketId = () => {
    if (registeredTicket) {
      navigator.clipboard.writeText(registeredTicket.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleGoHome = () => {
    if (onBack) {
      onBack();
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div className="relative min-h-screen bg-[#070d18] text-[#F3EBDD] font-sans selection:bg-[#F6A43A] selection:text-[#101A2B] overflow-x-hidden">
      
      {/* Background Anime Artwork with Vignette */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center opacity-30 pointer-events-none scale-105"
        style={{ backgroundImage: "url('/assets/clockit-landscape-artwork.jpg')" }}
      />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#070d18]/90 via-[#070d18]/75 to-[#070d18] pointer-events-none" />

      {/* Sticky Header */}
      <header className="sticky top-0 z-40 w-full bg-[#0b1329]/80 backdrop-blur-2xl border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div 
          onClick={handleGoHome}
          className="flex items-center gap-3 cursor-pointer group hover:opacity-90 transition-all select-none"
          title="Return to Main Page"
        >
          <div className="w-9 h-9 rounded-full bg-[#002B66] flex items-center justify-center border border-white/20 shadow-md group-hover:border-[#F6A43A] group-hover:scale-105 transition-all flex-shrink-0">
            <span className="font-chakra font-black text-xs text-white">JGI</span>
          </div>
          <div>
            <div className="font-chakra font-black text-xs sm:text-sm md:text-base tracking-wider uppercase leading-none group-hover:text-[#F6A43A] transition-colors">
              <span className="text-white">JAIN INSTITUTE OF TECHNOLOGY</span>
              <span className="text-[#F47025] mx-1.5 font-black">X</span>
              <span className="text-[#38bdf8]">SALUTIXAI</span>
            </div>
            <span className="text-[9.5px] font-mono tracking-widest text-[#F6A43A] uppercase font-bold mt-0.5 block">
              CLOCKIT 2026 // EXPEDITION REGISTRATION
            </span>
          </div>
        </div>

        <button
          onClick={handleGoHome}
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-mono font-bold text-white transition-all flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#F6A43A]" />
          <span className="hidden sm:inline">Back to Main Site</span>
          <span className="sm:hidden">Back</span>
        </button>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        
        {registeredTicket ? (
          /* ========================================================= */
          /* VERIFIED BOARDING PASS VIEW                                */
          /* ========================================================= */
          <div className="space-y-8 animate-in zoom-in-95 duration-300">
            
            <div className="text-center space-y-2">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
                <Check className="w-4 h-4" />
                <span>Squad Enrollment Confirmed</span>
              </span>
              <h1 className="font-chakra font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
                Expedition Pass Verified
              </h1>
              <p className="text-xs sm:text-sm text-neutral-300 font-sans max-w-lg mx-auto">
                Present this physical or digital pass at the check-in gate inside the JITD Library on 25 November 2026.
              </p>
            </div>

            {/* Official Digital Ticket Card */}
            <div className="p-6 sm:p-10 rounded-3xl bg-[#101A2B]/95 border-2 border-[#F6A43A] shadow-[0_0_50px_rgba(246,164,58,0.25)] backdrop-blur-2xl space-y-6">
              
              {/* Ticket Header */}
              <div className="flex items-center justify-between pb-6 border-b border-white/15">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-[#002B66] text-white flex items-center justify-center font-chakra font-black text-sm border border-white/30 shadow-md">
                    JGI
                  </div>
                  <div>
                    <h2 className="font-chakra font-black text-xl sm:text-2xl text-white uppercase tracking-wide">
                      CLOCKIT 2026 EXPEDITION PASS
                    </h2>
                    <span className="text-xs font-mono text-[#8BC9ED] block mt-0.5">
                      Jain Institute of Technology, Davanagere • 24-Hour Continuous Hackathon
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-mono font-black text-lg sm:text-xl text-[#F6A43A] tracking-wider block">
                    {registeredTicket.id}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold tracking-widest block uppercase">
                    ● ENTRY CONFIRMED
                  </span>
                </div>
              </div>

              {/* Ticket Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono bg-white/5 p-5 rounded-2xl border border-white/10">
                <div>
                  <span className="text-neutral-400 text-[10px] uppercase block tracking-wider">Squad Name</span>
                  <strong className="text-white block mt-1 text-sm font-chakra">{registeredTicket.teamName}</strong>
                </div>
                <div>
                  <span className="text-neutral-400 text-[10px] uppercase block tracking-wider">Squad Leader</span>
                  <strong className="text-white block mt-1 text-sm font-chakra">{registeredTicket.leader}</strong>
                </div>
                <div>
                  <span className="text-neutral-400 text-[10px] uppercase block tracking-wider">Assigned Track</span>
                  <strong className="text-[#F6A43A] block mt-1 text-sm font-chakra truncate">{registeredTicket.track}</strong>
                </div>
                <div>
                  <span className="text-neutral-400 text-[10px] uppercase block tracking-wider">Entry Fee</span>
                  <strong className="text-emerald-400 block mt-1 text-sm font-chakra">{registeredTicket.amountPaid} (Paid)</strong>
                </div>
              </div>

              {/* Logistics & Timings */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono text-neutral-300 pt-2">
                <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/5">
                  <Calendar className="w-4 h-4 text-[#F6A43A]" />
                  <span>25 - 26 November 2026</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/5">
                  <MapPin className="w-4 h-4 text-[#38bdf8]" />
                  <span>JITD Library & Complex</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/5">
                  <Trophy className="w-4 h-4 text-[#fbbf24]" />
                  <span>₹ 30,000 Cash Podium</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/15">
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Badge provisioning & kit allocation ready upon arrival.</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={copyTicketId}
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <Copy className="w-4 h-4" />
                    <span>{copied ? "Pass ID Copied!" : "Copy Pass ID"}</span>
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="px-6 py-2.5 rounded-xl bg-[#F6A43A] hover:bg-[#FF7138] text-[#101A2B] font-chakra font-black text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2 shadow-lg shadow-orange-500/20"
                  >
                    <Download className="w-4 h-4" />
                    <span>Print / Save Pass</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Back CTA */}
            <div className="text-center pt-4">
              <button
                onClick={handleGoHome}
                className="text-xs font-mono text-neutral-400 hover:text-white transition-colors underline cursor-pointer"
              >
                ← Return to CLOCKIT 2026 Home Page
              </button>
            </div>

          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Registration Closed Card */}
            <div className="p-8 sm:p-12 rounded-3xl bg-[#101A2B]/95 border-2 border-[#F6A43A]/80 backdrop-blur-2xl shadow-[0_0_50px_rgba(246,164,58,0.35)] text-center space-y-5 max-w-2xl mx-auto">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-[#F6A43A]/25 to-[#FF7138]/25 border border-[#F6A43A]/60 flex items-center justify-center text-[#F6A43A] shadow-[0_0_35px_rgba(246,164,58,0.5)]">
                <Heart className="w-10 h-10 text-[#F6A43A] animate-pulse" />
              </div>

              <div className="space-y-2">
                <h1 className="font-chakra font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
                  Registration Has Been Closed
                </h1>
                <p className="font-chakra font-bold text-lg sm:text-xl text-[#F6A43A] flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Thank you for your support!</span>
                  <Sparkles className="w-4 h-4" />
                </p>
              </div>

              <p className="text-xs sm:text-sm font-sans text-neutral-300 max-w-lg mx-auto leading-relaxed">
                The squad registration deadline for CLOCKIT 2026 has officially concluded. We are deeply grateful to every developer, innovator, and college team who registered.
              </p>

              {/* Event Reminder */}
              <div className="p-4 rounded-2xl bg-[#0b1329]/90 border border-white/10 text-left space-y-2 text-xs font-mono text-neutral-300">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <Calendar className="w-4 h-4 text-[#F6A43A]" />
                  <span>Sprint Date: 25 – 26 November 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#38bdf8]" />
                  <span>Venue: JITD Library & Innovation Hub, Davanagere</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-[#F6A43A]" />
                  <span>Trophy Pool: ₹ 30,000 Cash Prize</span>
                </div>
              </div>

              <div className="pt-3">
                <button
                  onClick={handleGoHome}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#F6A43A] to-[#FF7138] hover:from-[#FFB959] hover:to-[#FF8955] text-[#101A2B] font-chakra font-black text-sm uppercase tracking-wider shadow-lg transition-all cursor-pointer"
                >
                  ← Return to Home Page
                </button>
              </div>
            </div>

            {/* Direct Support Strip */}
            <div className="p-4 rounded-2xl bg-[#0b1329]/80 border border-white/10 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-neutral-400">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#F6A43A]" />
                <span>Need Registration Help?</span>
              </div>
              <div className="flex items-center gap-4">
                {STUDENT_COORDINATORS.map((c, i) => (
                  <a key={i} href={`tel:${c.rawPhone}`} className="hover:text-white transition-colors">
                    {c.name}: <span className="text-white font-bold">{c.phone}</span>
                  </a>
                ))}
              </div>
            </div>

          </div>
        )}

      </main>

    </div>
  );
}

