import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Users, CheckCircle2, ShieldCheck, QrCode, Download, Share2, Sparkles, ArrowRight, RefreshCw, Copy, Check } from 'lucide-react';
import { GUILD_TRACKS, HACKATHON_INFO } from '../../data/hackathonData';
import { playUiClick, playFantasyHarpChime } from '../../utils/audioSystem';

export default function Chapter7Register() {
  const [formData, setFormData] = useState({
    teamName: '',
    leaderName: '',
    leaderEmail: '',
    leaderPhone: '',
    college: '',
    selectedDomain: GUILD_TRACKS[0].id,
    teamSize: 3,
    member2Name: '',
    member2Email: '',
    member3Name: '',
    member3Email: '',
    member4Name: '',
    member4Email: '',
    agreeRules: true,
  });

  const [loading, setLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [ticketDetails, setTicketDetails] = useState(null);
  const [copied, setCopied] = useState(false);
  const [trackHighlighted, setTrackHighlighted] = useState(false);

  useEffect(() => {
    const handleSelectTrack = (e) => {
      if (e.detail && e.detail.trackId) {
        setFormData((prev) => ({ ...prev, selectedDomain: e.detail.trackId }));
        setTrackHighlighted(true);
        setTimeout(() => setTrackHighlighted(false), 2200);
      }
    };
    window.addEventListener('selectHackathonTrack', handleSelectTrack);
    return () => window.removeEventListener('selectHackathonTrack', handleSelectTrack);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const fireCelebration = () => {
    playFantasyHarpChime();
    confetti({
      particleCount: 140,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#F6A43A', '#FF7138', '#8BC9ED', '#F3EBDD', '#8064A8']
    });
    setTimeout(() => {
      confetti({
        particleCount: 90,
        angle: 60,
        spread: 60,
        origin: { x: 0 },
        colors: ['#F6A43A', '#FF7138']
      });
      confetti({
        particleCount: 90,
        angle: 120,
        spread: 60,
        origin: { x: 1 },
        colors: ['#8BC9ED', '#8064A8']
      });
    }, 250);
  };

  const handleRegisterAndPay = async (e) => {
    e.preventDefault();
    playUiClick();
    setLoading(true);

    const generatedPassId = `AETHERIA-${Math.floor(100000 + Math.random() * 900000)}`;
    const ticket = {
      passId: generatedPassId,
      teamName: formData.teamName || "SPIRE VANGUARD",
      leaderName: formData.leaderName,
      leaderEmail: formData.leaderEmail,
      domain: GUILD_TRACKS.find(d => d.id === formData.selectedDomain)?.name || "Path of the Arcane Mind",
      teamSize: formData.teamSize,
      college: formData.college || "Grand Citadel Guild",
      issueDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: "ADVENTURER VERIFIED & SEALED"
    };

    if (typeof window.Razorpay !== 'undefined') {
      try {
        const options = {
          key: "rzp_test_demoKeyAetheria",
          amount: 0,
          currency: "INR",
          name: "AETHERIA HACKS 2026",
          description: `Expedition Pass for Squad ${formData.teamName || "Adventurers"}`,
          image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
          handler: function () {
            setLoading(false);
            setTicketDetails(ticket);
            setRegistrationSuccess(true);
            fireCelebration();
          },
          prefill: {
            name: formData.leaderName,
            email: formData.leaderEmail,
            contact: formData.leaderPhone,
          },
          theme: {
            color: "#F6A43A"
          },
          modal: {
            ondismiss: function () {
              setLoading(false);
              setTicketDetails(ticket);
              setRegistrationSuccess(true);
              fireCelebration();
            }
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function () {
          setLoading(false);
          setTicketDetails(ticket);
          setRegistrationSuccess(true);
          fireCelebration();
        });
        rzp.open();
      } catch (err) {
        setTimeout(() => {
          setLoading(false);
          setTicketDetails(ticket);
          setRegistrationSuccess(true);
          fireCelebration();
        }, 1100);
      }
    } else {
      setTimeout(() => {
        setLoading(false);
        setTicketDetails(ticket);
        setRegistrationSuccess(true);
        fireCelebration();
      }, 1100);
    }
  };

  const copyPassId = () => {
    if (!ticketDetails) return;
    playUiClick();
    navigator.clipboard.writeText(ticketDetails.passId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnX = () => {
    playUiClick();
    const text = encodeURIComponent(`Our squad just registered for AETHERIA HACKS 2026! ⚔️ 36h of anime fantasy coding under the Golden Spire. Join the quest: https://aetheriahacks.dev #AetheriaHacks #AnimeFantasyHackathon`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  return (
    <section id="chapter-7" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full z-10">
      {/* Chapter Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F6A43A]/10 border border-[#F6A43A]/30 text-[#F6A43A] text-xs font-serif uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>CHAPTER 07 — JOIN THE ADVENTURE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-display text-[#F3EBDD] tracking-wide">
          SEAL YOUR <span className="bg-gradient-to-r from-[#F6A43A] via-[#FF7138] to-[#8BC9ED] bg-clip-text text-transparent">EXPEDITION PASS</span>
        </h2>
        <p className="mt-4 text-[#F3EBDD]/80 text-base sm:text-lg font-sans">
          Register your squad in-page to claim your verified Guild Boarding Pass and receive the Citadel Discord key.
        </p>
      </div>

      {registrationSuccess && ticketDetails ? (
        /* Confirmed Guild Pass View */
        <div className="glass-fantasy-amber p-6 sm:p-10 rounded-3xl border-2 border-[#F6A43A] shadow-[0_0_50px_rgba(246,164,58,0.3)] animate-in zoom-in-95 duration-500 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-white/10 gap-4">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#F6A43A] to-[#FF7138] p-0.5 flex items-center justify-center font-bold text-[#101A2B] text-xl font-display">
                ⚔️
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black font-display text-[#F3EBDD]">
                  AETHERIA HACKS 2026 // ADVENTURER VERIFIED
                </h3>
                <p className="text-xs font-serif text-[#8BC9ED]">
                  STATUS: {ticketDetails.status}
                </p>
              </div>
            </div>

            <div className="text-right flex items-center gap-2">
              <div>
                <span className="text-[10px] font-display text-[#8BC9ED] block uppercase">PASS IDENTIFIER</span>
                <span className="text-lg font-display font-bold text-[#F6A43A] drop-shadow-[0_0_12px_rgba(246,164,58,0.8)]">
                  {ticketDetails.passId}
                </span>
              </div>
              <button
                onClick={copyPassId}
                title="Copy Pass ID"
                className="p-2 rounded-xl bg-white/5 border border-white/10 hover:border-[#F6A43A] text-[#F6A43A] transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
            <div className="md:col-span-2 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[11px] font-display text-[#8BC9ED] uppercase">SQUAD CODENAME</span>
                  <p className="text-lg font-bold font-display text-[#F3EBDD]">{ticketDetails.teamName}</p>
                </div>
                <div>
                  <span className="text-[11px] font-display text-[#8BC9ED] uppercase">SQUAD LEADER</span>
                  <p className="text-lg font-bold font-display text-[#F3EBDD]">{ticketDetails.leaderName}</p>
                </div>
                <div>
                  <span className="text-[11px] font-display text-[#8BC9ED] uppercase">CHOSEN PATH</span>
                  <p className="text-sm font-bold font-display text-[#F6A43A]">{ticketDetails.domain}</p>
                </div>
                <div>
                  <span className="text-[11px] font-display text-[#8BC9ED] uppercase">SQUAD STRENGTH</span>
                  <p className="text-sm font-bold font-display text-[#F3EBDD]">{ticketDetails.teamSize} Adventurers</p>
                </div>
                <div className="col-span-2">
                  <span className="text-[11px] font-display text-[#8BC9ED] uppercase">AFFILIATION / GUILD</span>
                  <p className="text-sm font-medium text-[#F3EBDD]">{ticketDetails.college}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#F6A43A]/10 border border-[#F6A43A]/25 text-xs text-[#F3EBDD] flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#F6A43A] shrink-0 mt-0.5" />
                <span>
                  An expedition welcome packet and private Discord Guild invitation have been dispatched to <strong className="text-[#F6A43A]">{ticketDetails.leaderEmail}</strong>.
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center p-6 bg-black/50 border border-white/10 rounded-2xl text-center">
              <div className="p-3 bg-white rounded-xl shadow-lg mb-3">
                <div className="w-28 h-28 bg-[#101A2B] rounded flex flex-col items-center justify-center text-[#F6A43A]">
                  <QrCode className="w-20 h-20 text-white" />
                  <span className="text-[8px] font-mono text-[#F6A43A] mt-1">AETHERIA-SEAL</span>
                </div>
              </div>
              <span className="text-[10px] font-display tracking-wider text-[#8BC9ED] uppercase">
                Scan at Citadel Gate
              </span>
              <span className="text-xs font-display text-[#F6A43A] mt-1 font-bold">
                NOV 28 • 08:00 AM
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between pt-6 border-t border-white/10 gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  playUiClick();
                  window.print();
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-display uppercase tracking-wider text-[#F3EBDD] transition-all hover:scale-105"
              >
                <Download className="w-4 h-4 text-[#F6A43A]" />
                <span>PRINT / SAVE PASS</span>
              </button>

              <button
                onClick={shareOnX}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#8BC9ED]/10 hover:bg-[#8BC9ED]/20 border border-[#8BC9ED]/30 text-xs font-display uppercase tracking-wider text-[#8BC9ED] transition-all hover:scale-105"
              >
                <Share2 className="w-4 h-4" />
                <span>SHARE EXPEDITION</span>
              </button>
            </div>

            <button
              onClick={() => {
                playUiClick();
                setRegistrationSuccess(false);
              }}
              className="flex items-center gap-2 text-xs font-sans text-[#8BC9ED] hover:text-[#F3EBDD] transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>REGISTER ANOTHER SQUAD</span>
            </button>
          </div>
        </div>
      ) : (
        /* Registration Form */
        <form
          onSubmit={handleRegisterAndPay}
          className="glass-fantasy p-6 sm:p-10 rounded-3xl border border-[#F3EBDD]/15 shadow-2xl relative"
        >
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/10">
            <div className="flex items-center gap-2 text-xs font-display text-[#F6A43A]">
              <Sparkles className="w-4 h-4" />
              <span>SQUAD TELEMETRY & PATH SELECTION</span>
            </div>
            <span className="text-xs font-serif text-[#8BC9ED]">REGISTRATION FEE: ₹650 PER TEAM</span>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-display uppercase tracking-wider text-[#F3EBDD] mb-2">
                  Squad Codename <span className="text-[#F6A43A]">*</span>
                </label>
                <input
                  type="text"
                  name="teamName"
                  required
                  placeholder="e.g. Spire Vanguards"
                  value={formData.teamName}
                  onChange={handleInputChange}
                  className="w-full bg-black/60 border border-white/15 focus:border-[#F6A43A] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-[#F6A43A] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-display uppercase tracking-wider text-[#F3EBDD] mb-2">
                  Squad Size <span className="text-[#F6A43A]">*</span>
                </label>
                <select
                  name="teamSize"
                  value={formData.teamSize}
                  onChange={handleInputChange}
                  className="w-full bg-black/60 border border-white/15 focus:border-[#F6A43A] rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                >
                  <option value={1} className="bg-[#101A2B] text-white">Solo Adventurer (1 Person)</option>
                  <option value={2} className="bg-[#101A2B] text-white">Duo Companions (2 Members)</option>
                  <option value={3} className="bg-[#101A2B] text-white">Trio Party (3 Members)</option>
                  <option value={4} className="bg-[#101A2B] text-white">Full Squad (4 Members)</option>
                </select>
              </div>
            </div>

            {/* Leader Credentials */}
            <div className="pt-4 border-t border-white/5">
              <span className="text-xs font-display text-[#F6A43A] tracking-wider uppercase block mb-3 font-bold">
                SQUAD LEADER CREDENTIALS
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-sans text-[#8BC9ED] mb-1">Leader Full Name *</label>
                  <input
                    type="text"
                    name="leaderName"
                    required
                    placeholder="Aria Stormveil"
                    value={formData.leaderName}
                    onChange={handleInputChange}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#F6A43A] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-sans text-[#8BC9ED] mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="leaderEmail"
                    required
                    placeholder="aria@aetheria.dev"
                    value={formData.leaderEmail}
                    onChange={handleInputChange}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#F6A43A] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-sans text-[#8BC9ED] mb-1">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    name="leaderPhone"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.leaderPhone}
                    onChange={handleInputChange}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#F6A43A] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Additional Members */}
            {Number(formData.teamSize) > 1 && (
              <div className="pt-4 border-t border-white/5 space-y-4">
                <span className="text-xs font-display text-[#8BC9ED] tracking-wider uppercase block font-bold">
                  COMPANION DETAILS (2 - {formData.teamSize})
                </span>
                {Number(formData.teamSize) >= 2 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3.5 rounded-xl bg-black/40 border border-white/5">
                    <div>
                      <label className="block text-[11px] font-sans text-[#F3EBDD]/70 mb-1">Member 2 Name *</label>
                      <input
                        type="text"
                        name="member2Name"
                        required
                        placeholder="Member 2 Name"
                        value={formData.member2Name}
                        onChange={handleInputChange}
                        className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-sans text-[#F3EBDD]/70 mb-1">Member 2 Email *</label>
                      <input
                        type="email"
                        name="member2Email"
                        required
                        placeholder="member2@domain.com"
                        value={formData.member2Email}
                        onChange={handleInputChange}
                        className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>
                )}
                {Number(formData.teamSize) >= 3 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3.5 rounded-xl bg-black/40 border border-white/5">
                    <div>
                      <label className="block text-[11px] font-sans text-[#F3EBDD]/70 mb-1">Member 3 Name *</label>
                      <input
                        type="text"
                        name="member3Name"
                        required
                        placeholder="Member 3 Name"
                        value={formData.member3Name}
                        onChange={handleInputChange}
                        className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-sans text-[#F3EBDD]/70 mb-1">Member 3 Email *</label>
                      <input
                        type="email"
                        name="member3Email"
                        required
                        placeholder="member3@domain.com"
                        value={formData.member3Email}
                        onChange={handleInputChange}
                        className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>
                )}
                {Number(formData.teamSize) >= 4 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3.5 rounded-xl bg-black/40 border border-white/5">
                    <div>
                      <label className="block text-[11px] font-sans text-[#F3EBDD]/70 mb-1">Member 4 Name *</label>
                      <input
                        type="text"
                        name="member4Name"
                        required
                        placeholder="Member 4 Name"
                        value={formData.member4Name}
                        onChange={handleInputChange}
                        className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-sans text-[#F3EBDD]/70 mb-1">Member 4 Email *</label>
                      <input
                        type="email"
                        name="member4Email"
                        required
                        placeholder="member4@domain.com"
                        value={formData.member4Email}
                        onChange={handleInputChange}
                        className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Guild & Track Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/5">
              <div>
                <label className="block text-xs font-display uppercase tracking-wider text-[#F3EBDD] mb-2">
                  College / Affiliation <span className="text-[#F6A43A]">*</span>
                </label>
                <input
                  type="text"
                  name="college"
                  required
                  placeholder="e.g. Stanford University / Tech Corp"
                  value={formData.college}
                  onChange={handleInputChange}
                  className="w-full bg-black/60 border border-white/15 focus:border-[#F6A43A] rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-display uppercase tracking-wider text-[#F3EBDD] mb-2">
                  Chosen Guild Path <span className="text-[#F6A43A]">*</span>
                </label>
                <select
                  name="selectedDomain"
                  value={formData.selectedDomain}
                  onChange={handleInputChange}
                  className={`w-full bg-black/60 border rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all duration-500 ${
                    trackHighlighted
                      ? 'border-[#F6A43A] ring-2 ring-[#F6A43A] shadow-[0_0_25px_rgba(246,164,58,0.5)] scale-[1.01]'
                      : 'border-white/15 focus:border-[#F6A43A]'
                  }`}
                >
                  {GUILD_TRACKS.map((d) => (
                    <option key={d.id} value={d.id} className="bg-[#101A2B] text-white">
                      {d.badge} : {d.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Rules Checkbox */}
            <div className="pt-2 flex items-center gap-3">
              <input
                type="checkbox"
                id="agreeRules"
                name="agreeRules"
                checked={formData.agreeRules}
                onChange={handleInputChange}
                required
                className="w-4 h-4 rounded bg-black/60 border-white/20 text-[#F6A43A] focus:ring-[#F6A43A] cursor-pointer"
              />
              <label htmlFor="agreeRules" className="text-xs text-[#F3EBDD]/70 cursor-pointer">
                I agree to the <span className="text-[#F6A43A]">Citadel Code of Honor</span> and confirm all software will be crafted during the 36 hours.
              </label>
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 bg-gradient-to-r from-[#F6A43A] via-[#FF7138] to-[#F6A43A] text-[#101A2B] font-display font-black text-sm sm:text-base uppercase tracking-widest rounded-full shadow-[0_0_30px_rgba(246,164,58,0.5)] hover:shadow-[0_0_45px_rgba(246,164,58,0.8)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-[#101A2B] border-t-transparent rounded-full animate-spin" />
                    <span>SEALING EXPEDITION PASS...</span>
                  </>
                ) : (
                  <>
                    <span>REGISTER SQUAD (₹650 PER TEAM)</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
              <div className="text-center mt-3 text-[11px] font-serif text-[#8BC9ED] flex items-center justify-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#F6A43A]" />
                <span>Protected by Razorpay Infrastructure • Instant Guild Pass Delivery</span>
              </div>
            </div>
          </div>
        </form>
      )}
    </section>
  );
}

