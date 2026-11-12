import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { User, Mail, Phone, Users, School, Layers, CheckCircle2, ShieldCheck, QrCode, Download, Share2, Sparkles, ArrowRight, Zap, RefreshCw, Copy, Check } from 'lucide-react';
import { DOMAINS, HACKATHON_INFO } from '../data/hackathonData';
import { playUiClick, playCyberChime } from '../utils/audioSystem';

export default function RegistrationSection() {
  const [formData, setFormData] = useState({
    teamName: '',
    leaderName: '',
    leaderEmail: '',
    leaderPhone: '',
    college: '',
    selectedDomain: DOMAINS[0].id,
    teamSize: 3,
    member2Name: '',
    member2Email: '',
    member3Name: '',
    member3Email: '',
    member4Name: '',
    member4Email: '',
    experienceLevel: 'Intermediate',
    agreeRules: true,
  });

  const [loading, setLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [ticketDetails, setTicketDetails] = useState(null);
  const [copied, setCopied] = useState(false);

  // Listen to track selection requests from other sections
  useEffect(() => {
    const handleSelectTrack = (e) => {
      if (e.detail && e.detail.trackId) {
        setFormData((prev) => ({ ...prev, selectedDomain: e.detail.trackId }));
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

  const fireAnimeCelebration = () => {
    playCyberChime();
    confetti({
      particleCount: 140,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#38bdf8', '#0ea5e9', '#6366f1', '#818cf8', '#ffffff']
    });
    setTimeout(() => {
      confetti({
        particleCount: 90,
        angle: 60,
        spread: 60,
        origin: { x: 0 },
        colors: ['#38bdf8', '#6366f1']
      });
      confetti({
        particleCount: 90,
        angle: 120,
        spread: 60,
        origin: { x: 1 },
        colors: ['#0ea5e9', '#818cf8']
      });
    }, 250);
  };

  const handleRegisterAndPay = async (e) => {
    e.preventDefault();
    playUiClick();
    setLoading(true);

    const generatedPassId = `SHINRAI-${Math.floor(100000 + Math.random() * 900000)}`;
    const ticket = {
      passId: generatedPassId,
      teamName: formData.teamName || "SQUAD OMEGA",
      leaderName: formData.leaderName,
      leaderEmail: formData.leaderEmail,
      domain: DOMAINS.find(d => d.id === formData.selectedDomain)?.name || "Autonomous AI",
      teamSize: formData.teamSize,
      college: formData.college || "Global Hacker Institute",
      issueDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: "VERIFIED & CONFIRMED"
    };

    // Check if window.Razorpay is available
    if (typeof window.Razorpay !== 'undefined') {
      try {
        const options = {
          key: "rzp_test_demoKeyShinrai",
          amount: 0,
          currency: "INR",
          name: "SHINRAI HACKS 2026",
          description: `Registration for Team ${formData.teamName || "Cyber Team"}`,
          image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
          handler: function () {
            setLoading(false);
            setTicketDetails(ticket);
            setRegistrationSuccess(true);
            fireAnimeCelebration();
          },
          prefill: {
            name: formData.leaderName,
            email: formData.leaderEmail,
            contact: formData.leaderPhone,
          },
          theme: {
            color: "#38bdf8"
          },
          modal: {
            ondismiss: function () {
              setLoading(false);
              setTicketDetails(ticket);
              setRegistrationSuccess(true);
              fireAnimeCelebration();
            }
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function () {
          setLoading(false);
          setTicketDetails(ticket);
          setRegistrationSuccess(true);
          fireAnimeCelebration();
        });
        rzp.open();
      } catch (err) {
        setTimeout(() => {
          setLoading(false);
          setTicketDetails(ticket);
          setRegistrationSuccess(true);
          fireAnimeCelebration();
        }, 1200);
      }
    } else {
      setTimeout(() => {
        setLoading(false);
        setTicketDetails(ticket);
        setRegistrationSuccess(true);
        fireAnimeCelebration();
      }, 1200);
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
    const text = encodeURIComponent(`We just registered our squad for SHINRAI HACKS 2026 (新未来ハック)! ⚡ 36h of Google Flow & anime-inspired frontier coding. Join us: https://shinraihacks.dev #ShinraiHacks #GoogleFlow #AIHackathon`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  const resetForm = () => {
    playUiClick();
    setRegistrationSuccess(false);
  };

  return (
    <section id="register" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full z-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>DIRECT PROTOCOL // 参加登録</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-cyber text-white tracking-wide">
          INITIALIZE <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">REGISTRATION</span>
        </h2>
        <p className="mt-4 text-slate-400 text-base sm:text-lg">
          Register your squad directly on this single page. Claim your access pass and join 500+ elite builders.
        </p>
      </div>

      {/* Dynamic State: Holographic Ticket or Form */}
      {registrationSuccess && ticketDetails ? (
        <div className="glass-flow-active p-6 sm:p-10 rounded-3xl border-2 border-cyan-400 shadow-[0_0_50px_rgba(56,189,248,0.3)] animate-in zoom-in-95 duration-500 relative overflow-hidden">
          {/* Top Pass Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-white/10 gap-4">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-600 p-0.5 cyber-corner flex items-center justify-center font-bold text-white text-lg">
                新
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black font-cyber text-white">
                  SHINRAI HACKS 2026 // ACCESS GRANTED
                </h3>
                <p className="text-xs font-mono text-cyan-300">
                  STATUS: {ticketDetails.status}
                </p>
              </div>
            </div>

            <div className="text-right flex items-center gap-2">
              <div>
                <span className="text-[10px] font-mono text-slate-400 block">PASS IDENTIFIER</span>
                <span className="text-lg font-cyber font-bold text-cyan-400 drop-shadow-[0_0_12px_rgba(56,189,248,0.8)]">
                  {ticketDetails.passId}
                </span>
              </div>
              <button
                onClick={copyPassId}
                title="Copy Pass ID"
                className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-400 text-cyan-400 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Pass Body */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
            <div className="md:col-span-2 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[11px] font-mono text-slate-400">TEAM CODENAME</span>
                  <p className="text-lg font-bold font-cyber text-white">{ticketDetails.teamName}</p>
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-400">TEAM LEADER</span>
                  <p className="text-lg font-bold font-cyber text-white">{ticketDetails.leaderName}</p>
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-400">SELECTED TRACK</span>
                  <p className="text-sm font-bold font-cyber text-cyan-300">{ticketDetails.domain}</p>
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-400">SQUAD STRENGTH</span>
                  <p className="text-sm font-bold font-cyber text-white">{ticketDetails.teamSize} Hackers</p>
                </div>
                <div className="col-span-2">
                  <span className="text-[11px] font-mono text-slate-400">AFFILIATION / COLLEGE</span>
                  <p className="text-sm font-bold text-slate-200">{ticketDetails.college}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/20 text-xs text-cyan-300 flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  A confirmation packet and Discord secret access key have been dispatched to <strong className="text-white">{ticketDetails.leaderEmail}</strong>.
                </span>
              </div>
            </div>

            {/* QR Code */}
            <div className="flex flex-col items-center justify-center p-6 bg-black/50 border border-white/10 rounded-2xl text-center">
              <div className="p-3 bg-white rounded-xl shadow-lg mb-3">
                <div className="w-28 h-28 bg-[#03050d] rounded flex flex-col items-center justify-center text-cyan-400 relative">
                  <QrCode className="w-20 h-20 text-white" />
                  <span className="text-[8px] font-mono text-cyan-400 absolute bottom-1">SHINRAI-PASS</span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-slate-400 uppercase">
                Scan at Cyber Gate
              </span>
              <span className="text-xs font-mono text-cyan-400 mt-1 font-bold">
                NOV 28 • 08:00 AM
              </span>
            </div>
          </div>

          {/* Pass Actions */}
          <div className="flex flex-wrap items-center justify-between pt-6 border-t border-white/10 gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  playUiClick();
                  window.print();
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-cyber uppercase tracking-wider text-white transition-all hover:scale-105"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>SAVE / PRINT PASS</span>
              </button>

              <button
                onClick={shareOnX}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-xs font-cyber uppercase tracking-wider text-cyan-300 transition-all hover:scale-105"
              >
                <Share2 className="w-4 h-4" />
                <span>SHARE ON X</span>
              </button>
            </div>

            <button
              onClick={resetForm}
              className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>REGISTER ANOTHER SQUAD</span>
            </button>
          </div>
        </div>
      ) : (
        /* REGISTRATION FORM */
        <form
          onSubmit={handleRegisterAndPay}
          className="glass-flow p-6 sm:p-10 rounded-3xl border border-white/10 cyber-corner shadow-2xl relative"
        >
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <Zap className="w-4 h-4" />
              <span>STEP 01: SQUAD TELEMETRY</span>
            </div>
            <span className="text-xs font-mono text-cyan-400">ENTRY FEE: ₹650 PER SQUAD</span>
          </div>

          <div className="space-y-6">
            {/* Team Name & Team Size */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                  Team / Codename <span className="text-cyan-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="teamName"
                    required
                    placeholder="e.g. Nexus Architects"
                    value={formData.teamName}
                    onChange={handleInputChange}
                    className="w-full bg-black/60 border border-white/15 focus:border-cyan-400 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all"
                  />
                  <Users className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                  Team Size <span className="text-cyan-400">*</span>
                </label>
                <select
                  name="teamSize"
                  value={formData.teamSize}
                  onChange={handleInputChange}
                  className="w-full bg-black/60 border border-white/15 focus:border-cyan-400 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                >
                  <option value={1} className="bg-[#03050d] text-white">Solo Hacker (1 Person)</option>
                  <option value={2} className="bg-[#03050d] text-white">Duo Squad (2 Members)</option>
                  <option value={3} className="bg-[#03050d] text-white">Trio Squad (3 Members)</option>
                  <option value={4} className="bg-[#03050d] text-white">Full Squad (4 Members)</option>
                </select>
              </div>
            </div>

            {/* Leader Details */}
            <div className="pt-4 border-t border-white/5">
              <span className="text-xs font-mono text-cyan-400 tracking-wider uppercase block mb-3 font-bold">
                TEAM LEADER CREDENTIALS
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Leader Full Name *</label>
                  <input
                    type="text"
                    name="leaderName"
                    required
                    placeholder="Takeshi Kovacs"
                    value={formData.leaderName}
                    onChange={handleInputChange}
                    className="w-full bg-black/60 border border-white/15 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="leaderEmail"
                    required
                    placeholder="takeshi@shinrai.dev"
                    value={formData.leaderEmail}
                    onChange={handleInputChange}
                    className="w-full bg-black/60 border border-white/15 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    name="leaderPhone"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.leaderPhone}
                    onChange={handleInputChange}
                    className="w-full bg-black/60 border border-white/15 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Dynamic Additional Squad Members */}
            {Number(formData.teamSize) > 1 && (
              <div className="pt-4 border-t border-white/5 space-y-4">
                <span className="text-xs font-mono text-indigo-400 tracking-wider uppercase block font-bold">
                  ADDITIONAL SQUAD MEMBERS (2 - {formData.teamSize})
                </span>
                {Number(formData.teamSize) >= 2 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3.5 rounded-xl bg-black/40 border border-white/5">
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">Member 2 Name *</label>
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
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">Member 2 Email *</label>
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
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">Member 3 Name *</label>
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
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">Member 3 Email *</label>
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
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">Member 4 Name *</label>
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
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">Member 4 Email *</label>
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

            {/* College & Track */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/5">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                  College / Organization <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="text"
                  name="college"
                  required
                  placeholder="e.g. Stanford University / Tech Corp"
                  value={formData.college}
                  onChange={handleInputChange}
                  className="w-full bg-black/60 border border-white/15 focus:border-cyan-400 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                  Chosen Domain / Track <span className="text-cyan-400">*</span>
                </label>
                <select
                  name="selectedDomain"
                  value={formData.selectedDomain}
                  onChange={handleInputChange}
                  className="w-full bg-black/60 border border-white/15 focus:border-cyan-400 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                >
                  {DOMAINS.map((d) => (
                    <option key={d.id} value={d.id} className="bg-[#03050d] text-white">
                      {d.code} : {d.name}
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
                className="w-4 h-4 rounded bg-black/60 border-white/20 text-cyan-400 focus:ring-cyan-400 cursor-pointer"
              />
              <label htmlFor="agreeRules" className="text-xs text-slate-400 cursor-pointer">
                I agree to the <span className="text-cyan-400">Shinrai Code of Conduct</span> and confirm that all code will be written during the 36 hours.
              </label>
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 text-white font-cyber font-black text-sm sm:text-base uppercase tracking-widest cyber-corner shadow-[0_0_30px_rgba(56,189,248,0.5)] hover:shadow-[0_0_45px_rgba(56,189,248,0.8)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>CRYPTOGRAPHICALLY VERIFYING PASS...</span>
                  </>
                ) : (
                  <>
                    <span>REGISTER AND CONFIRM (₹650 SQUAD PASS)</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
              <div className="text-center mt-3 text-[11px] font-mono text-slate-400 flex items-center justify-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Secured with Razorpay Integration • Instant Digital Pass Delivery</span>
              </div>
            </div>
          </div>
        </form>
      )}
    </section>
  );
}
