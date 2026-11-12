import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, AlertCircle, FileText, Upload, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export default function LoginPage({ onNavigate }) {
  const [teamId, setTeamId] = useState('JITD-2026-7842');
  const [accessCode, setAccessCode] = useState('pass123');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dashboardTab, setDashboardTab] = useState('shortlisted'); // 'submitted', 'shortlisted', 'not-shortlisted'

  const handleLogin = (e) => {
    e.preventDefault();
    if (teamId.trim()) {
      setIsLoggedIn(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf7] text-[#0b0b0f] font-sans py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Back Link */}
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 hover:text-[#F47025] mb-6 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Overview</span>
        </button>

        {!isLoggedIn ? (
          /* Login Card */
          <div className="max-w-md mx-auto p-8 rounded-3xl bg-white border border-neutral-300 shadow-sm">
            <div className="text-center pb-6 border-b border-neutral-200 mb-6">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#F47025] block mb-1">
                Participant Portal
              </span>
              <h2 className="font-chakra font-black text-3xl text-[#0b0b0f] uppercase">
                Team Login
              </h2>
              <p className="text-xs text-neutral-600 mt-1 font-sans">
                Track your prototype screening status and unlock Level 2 documentation.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block font-mono text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Team ID *
                </label>
                <input
                  type="text"
                  placeholder="e.g. JITD-2026-XXXX"
                  value={teamId}
                  onChange={(e) => setTeamId(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:border-[#F47025] text-sm font-mono focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-mono text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Leader Email or Passcode *
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:border-[#F47025] text-sm font-sans focus:outline-none"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#0b0b0f] hover:bg-[#F47025] text-white font-chakra font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Access Team Dashboard →
                </button>
              </div>

              <div className="text-center pt-3 border-t border-neutral-200">
                <p className="text-xs font-mono text-neutral-500">
                  Haven't registered your team yet?{' '}
                  <button
                    type="button"
                    onClick={() => onNavigate('/register')}
                    className="text-[#F47025] font-bold hover:underline cursor-pointer"
                  >
                    Register now
                  </button>
                </p>
              </div>
            </form>
          </div>
        ) : (
          /* Logged In Dashboard with 3 States */
          <div className="space-y-6 animate-in fade-in duration-300">
            
            {/* Top Squad Header */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-neutral-300 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#F47025] block mb-1">
                  OFFICIAL SQUAD DASHBOARD · {teamId}
                </span>
                <h2 className="font-chakra font-black text-3xl text-[#0b0b0f] uppercase">
                  Spire Synthetics
                </h2>
                <p className="text-xs font-mono text-neutral-600 mt-1">
                  Track: Track 01 (Classified) · Institution: Jain Institute of Technology, Davanagere
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="px-3.5 py-1.5 rounded-lg border border-neutral-300 font-mono text-xs text-neutral-600 hover:text-black"
                >
                  Sign Out
                </button>
              </div>
            </div>

            {/* State Simulation Tabs (Allows reviewing all 3 requested spec states) */}
            <div className="flex items-center gap-2 p-1.5 rounded-xl bg-neutral-200/80 font-mono text-xs font-bold max-w-fit">
              <button
                onClick={() => setDashboardTab('shortlisted')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  dashboardTab === 'shortlisted' ? 'bg-white text-[#F47025] shadow-xs' : 'text-neutral-600'
                }`}
              >
                State: Shortlisted for Level 2
              </button>
              <button
                onClick={() => setDashboardTab('submitted')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  dashboardTab === 'submitted' ? 'bg-white text-[#0b0b0f] shadow-xs' : 'text-neutral-600'
                }`}
              >
                State: Level 1 Under Screening
              </button>
            </div>

            {/* STATE 1: SHORTLISTED FOR LEVEL 2 */}
            {dashboardTab === 'shortlisted' && (
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-emerald-600 text-white flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-chakra font-bold text-lg text-emerald-950 uppercase">
                      Congratulations! Squad Shortlisted for Level 2 On-Campus Finale
                    </h3>
                    <p className="text-xs text-emerald-800 font-sans mt-1 leading-relaxed">
                      Your prototype "Decentralized Microgrid Optimizer" has passed the Level 1 screening criteria. Complete your document upload and lock in your on-campus residential pass for 25–26 November.
                    </p>
                  </div>
                </div>

                {/* Level 2 Payment & Document Checklist */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Document Upload */}
                  <div className="p-6 rounded-2xl bg-white border border-neutral-300 shadow-xs">
                    <h4 className="font-chakra font-bold text-base text-[#0b0b0f] uppercase mb-2">
                      Upload Required Credentials
                    </h4>
                    <p className="text-xs text-neutral-600 font-sans mb-4">
                      Upload college endorsement letters and student ID scans for all squad members.
                    </p>

                    <div className="border-2 border-dashed border-neutral-300 rounded-xl p-6 text-center hover:border-[#F47025] transition-colors cursor-pointer bg-neutral-50/50">
                      <Upload className="w-6 h-6 text-neutral-400 mx-auto mb-2" />
                      <span className="font-mono text-xs font-bold text-[#0b0b0f] block">
                        Drag & Drop PDF or Browse
                      </span>
                      <span className="text-[10px] font-mono text-neutral-500">Max size: 15MB (.pdf, .zip)</span>
                    </div>

                    <div className="mt-4 pt-3 border-t border-neutral-200 text-xs font-mono text-neutral-500 flex items-center justify-between">
                      <span>Status: Pending Upload</span>
                      <span className="text-orange-600 font-bold">Action Needed</span>
                    </div>
                  </div>

                  {/* Level 2 Payment */}
                  <div className="p-6 rounded-2xl bg-white border border-neutral-300 shadow-xs flex flex-col justify-between">
                    <div>
                      <h4 className="font-chakra font-bold text-base text-[#0b0b0f] uppercase mb-1">
                        Level 2 Entry & Stay Inclusions
                      </h4>
                      <p className="text-xs text-neutral-600 font-sans mb-4">
                        ₹300 per member (Total: ₹900 for 3 members). Covers campus hostel accommodation, 4 hot meals, midnight coffee, T-shirt, and hacker kit.
                      </p>

                      <div className="p-4 rounded-xl bg-neutral-100 font-mono text-xs space-y-1.5">
                        <div className="flex justify-between text-neutral-600">
                          <span>3 Members × ₹300:</span>
                          <span>₹ 900.00</span>
                        </div>
                        <div className="flex justify-between text-neutral-600">
                          <span>Station Shuttle Access:</span>
                          <span className="text-emerald-600 font-bold">Complimentary</span>
                        </div>
                        <div className="flex justify-between text-neutral-900 font-bold pt-1.5 border-t border-neutral-300 text-sm">
                          <span>Total Amount:</span>
                          <span className="text-[#F47025]">₹ 900.00</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <button
                        onClick={() => alert("Payment gateway simulated: Payment marked as verified for Level 2 attendance.")}
                        className="w-full py-3 rounded-xl bg-[#F47025] hover:bg-[#e05e15] text-white font-chakra font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Confirm & Pay ₹900 →
                      </button>
                    </div>
                  </div>

                </div>

                {/* Technical Review Scores */}
                <div className="p-6 rounded-2xl bg-white border border-neutral-300 shadow-xs">
                  <h4 className="font-chakra font-bold text-base text-[#0b0b0f] uppercase mb-4">
                    Level 1 Technical Jury Evaluation
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 font-mono text-xs text-center">
                    <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200">
                      <span className="text-[10px] text-neutral-500 block">Problem Relevance</span>
                      <strong className="text-base text-[#0b0b0f] mt-1 block">9.2 / 10</strong>
                    </div>
                    <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200">
                      <span className="text-[10px] text-neutral-500 block">Prototype Credibility</span>
                      <strong className="text-base text-[#0b0b0f] mt-1 block">8.8 / 10</strong>
                    </div>
                    <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200">
                      <span className="text-[10px] text-neutral-500 block">Technical Feasibility</span>
                      <strong className="text-base text-[#0b0b0f] mt-1 block">9.5 / 10</strong>
                    </div>
                    <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200">
                      <span className="text-[10px] text-neutral-500 block">Clarity & Architecture</span>
                      <strong className="text-base text-[#0b0b0f] mt-1 block">9.0 / 10</strong>
                    </div>
                    <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200">
                      <span className="text-[10px] text-neutral-500 block">Originality Score</span>
                      <strong className="text-base text-[#F47025] mt-1 block">9.6 / 10</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STATE 2: UNDER SCREENING */}
            {dashboardTab === 'submitted' && (
              <div className="p-8 rounded-3xl bg-white border border-neutral-300 shadow-xs space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-neutral-200">
                  <div className="w-10 h-10 rounded-full bg-orange-100 text-[#F47025] flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-chakra font-bold text-xl text-[#0b0b0f] uppercase">
                      Level 1 Prototype Screening in Progress
                    </h3>
                    <p className="text-xs text-neutral-600 font-sans">
                      Submitted on 10 Nov 2026. Queue position #14 of 82.
                    </p>
                  </div>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 border border-neutral-200">
                    <span>1. Repository Commit Verification</span>
                    <span className="text-emerald-600 font-bold">Passed ✓</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 border border-neutral-200">
                    <span>2. Plagiarism & Originality Scan</span>
                    <span className="text-emerald-600 font-bold">Passed (0% overlap) ✓</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 border border-neutral-200">
                    <span>3. Technical Jury Viva Review</span>
                    <span className="text-orange-600 font-bold animate-pulse">In Review...</span>
                  </div>
                </div>

                <p className="text-xs text-neutral-600 font-sans">
                  The official shortlist announcement is scheduled for <strong>23 November 2026</strong>. You will receive an SMS and email notification once evaluation concludes.
                </p>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}

