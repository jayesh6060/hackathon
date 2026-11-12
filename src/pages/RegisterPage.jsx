import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Plus, Trash2, CheckCircle2, ShieldCheck, Download, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export default function RegisterPage({ onNavigate }) {
  // Query param parsing for pre-selected theme
  const getInitialTheme = () => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const t = params.get('theme');
      if (t) {
        const found = SITE_CONFIG.themes.find(x => x.slug === t || x.id === t);
        if (found) return found.title;
      }
    }
    return SITE_CONFIG.themes[0].title;
  };

  const [formData, setFormData] = useState({
    teamName: '',
    selectedTheme: getInitialTheme(),
    leaderName: '',
    leaderEmail: '',
    leaderPhone: '',
    college: '',
    prototypeTitle: '',
    prototypeDesc: '',
    githubRepo: '',
    demoUrl: '',
    members: [
      { name: '', email: '', phone: '', role: 'Developer / ML Engineer' }
    ]
  });

  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [confirmedTeam, setConfirmedTeam] = useState(null);

  // Add a team member
  const addMember = () => {
    if (formData.members.length < 3) {
      setFormData({
        ...formData,
        members: [...formData.members, { name: '', email: '', phone: '', role: 'Full-Stack Developer' }]
      });
    }
  };

  // Remove a team member
  const removeMember = (idx) => {
    if (formData.members.length > 1) {
      setFormData({
        ...formData,
        members: formData.members.filter((_, i) => i !== idx)
      });
    }
  };

  // Update a team member's field
  const updateMember = (idx, field, val) => {
    const updated = [...formData.members];
    updated[idx][field] = val;
    setFormData({ ...formData, members: updated });
  };

  // Step 1 Validation
  const validateStep1 = () => {
    const errs = {};
    if (!formData.teamName.trim()) errs.teamName = "Squad/Team Name is required";
    if (!formData.leaderName.trim()) errs.leaderName = "Team Leader name is required";
    if (!formData.leaderEmail.trim() || !formData.leaderEmail.includes('@')) errs.leaderEmail = "Valid email is required";
    if (!formData.leaderPhone.trim()) errs.leaderPhone = "Phone number is required";
    if (!formData.college.trim()) errs.college = "College / Institution name is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Step 2 Validation
  const validateStep2 = () => {
    const errs = {};
    if (!formData.prototypeTitle.trim()) errs.prototypeTitle = "Prototype title is required";
    if (!formData.prototypeDesc.trim()) errs.prototypeDesc = "Short architecture description is required";
    if (!formData.githubRepo.trim() || !formData.githubRepo.includes('github.com')) {
      errs.githubRepo = "Valid GitHub repository URL is required for Level 1 screening";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep2()) {
      const generatedId = `JITD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const result = {
        teamId: generatedId,
        teamName: formData.teamName,
        leaderName: formData.leaderName,
        leaderEmail: formData.leaderEmail,
        college: formData.college,
        theme: formData.selectedTheme,
        prototypeTitle: formData.prototypeTitle,
        membersCount: formData.members.length + 1,
        submittedAt: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
      };
      setConfirmedTeam(result);

      // Save to local storage for login demonstration
      try {
        const existing = JSON.parse(localStorage.getItem('clockit_teams') || '[]');
        existing.push(result);
        localStorage.setItem('clockit_teams', JSON.stringify(existing));
      } catch (err) {}
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf7] text-[#0b0b0f] font-sans py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Back Link */}
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 hover:text-[#F47025] mb-6 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Overview</span>
        </button>

        {/* Confirmation State (Success) */}
        {confirmedTeam ? (
          <div className="p-8 sm:p-10 rounded-3xl bg-white border-2 border-emerald-500 shadow-xl animate-in zoom-in-95 duration-300">
            <div className="text-center pb-6 border-b border-neutral-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-emerald-600 block mb-1">
                LEVEL 1 SUBMISSION CONFIRMED
              </span>
              <h2 className="font-chakra font-black text-3xl sm:text-4xl text-[#0b0b0f] uppercase">
                Welcome to CLOCKIT 2026
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 mt-2 font-sans max-w-md mx-auto">
                Your prototype has entered the Level 1 screening queue. Our technical evaluators will review your GitHub commits and viva submission.
              </p>
            </div>

            {/* Boarding Pass Card */}
            <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-300 my-6 font-mono text-xs space-y-3">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                <span className="text-neutral-500 uppercase">OFFICIAL TEAM ID</span>
                <strong className="text-base text-[#F47025] font-black">{confirmedTeam.teamId}</strong>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-neutral-500 block">SQUAD NAME</span>
                  <strong className="text-sm text-[#0b0b0f] font-chakra">{confirmedTeam.teamName}</strong>
                </div>
                <div>
                  <span className="text-neutral-500 block">SELECTED TRACK</span>
                  <strong className="text-sm text-[#0b0b0f] font-chakra">{confirmedTeam.theme}</strong>
                </div>
                <div>
                  <span className="text-neutral-500 block">TEAM LEADER</span>
                  <span className="text-neutral-800">{confirmedTeam.leaderName} ({confirmedTeam.leaderEmail})</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">INSTITUTION</span>
                  <span className="text-neutral-800">{confirmedTeam.college}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-neutral-200">
              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#0b0b0f] hover:bg-[#F47025] text-white font-chakra font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Print Confirmation Pass</span>
              </button>
              <button
                onClick={() => onNavigate('/login')}
                className="text-xs font-mono font-bold text-[#F47025] hover:underline cursor-pointer"
              >
                Go to Team Dashboard Login →
              </button>
            </div>
          </div>
        ) : (
          /* Multi-Step Registration Form */
          <div className="p-6 sm:p-10 rounded-3xl bg-white border border-neutral-300 shadow-sm">
            
            {/* Step Header */}
            <div className="pb-6 mb-6 border-b border-neutral-200 flex items-center justify-between">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#F47025] block mb-1">
                  Level 1 Registration · ₹650 Per Team
                </span>
                <h2 className="font-chakra font-black text-2xl sm:text-3xl text-[#0b0b0f] uppercase">
                  {step === 1 ? "Squad & Leader Information" : "Prototype & Architecture Submission"}
                </h2>
              </div>
              <span className="font-mono text-xs font-bold text-neutral-400">
                Step {step} of 2
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* STEP 1: SQUAD & MEMBERS */}
              {step === 1 && (
                <div className="space-y-5">
                  
                  {/* Squad Name & Theme Dropdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                        Squad / Team Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Spire Synthetics"
                        value={formData.teamName}
                        onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm font-sans focus:outline-none transition-colors ${
                          errors.teamName ? 'border-red-500 bg-red-50/30' : 'border-neutral-300 focus:border-[#F47025]'
                        }`}
                      />
                      {errors.teamName && <p className="text-red-500 text-[11px] font-mono mt-1">{errors.teamName}</p>}
                    </div>

                    <div>
                      <label className="block font-mono text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                        Selected Innovation Theme *
                      </label>
                      <select
                        value={formData.selectedTheme}
                        onChange={(e) => setFormData({ ...formData, selectedTheme: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:border-[#F47025] text-sm font-sans focus:outline-none bg-white"
                      >
                        {SITE_CONFIG.themes.map((t) => (
                          <option key={t.id} value={t.title}>
                            {t.number} — {t.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Team Leader Details */}
                  <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-4">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#F47025] block">
                      Team Leader (Primary Contact)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-mono text-neutral-600 mb-1">Full Name *</label>
                        <input
                          type="text"
                          placeholder="e.g. Kishan R"
                          value={formData.leaderName}
                          onChange={(e) => setFormData({ ...formData, leaderName: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-xs font-sans focus:outline-none focus:border-[#F47025]"
                        />
                        {errors.leaderName && <p className="text-red-500 text-[10px] font-mono mt-1">{errors.leaderName}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-neutral-600 mb-1">Email *</label>
                        <input
                          type="email"
                          placeholder="leader@college.edu"
                          value={formData.leaderEmail}
                          onChange={(e) => setFormData({ ...formData, leaderEmail: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-xs font-sans focus:outline-none focus:border-[#F47025]"
                        />
                        {errors.leaderEmail && <p className="text-red-500 text-[10px] font-mono mt-1">{errors.leaderEmail}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-neutral-600 mb-1">Phone / WhatsApp *</label>
                        <input
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.leaderPhone}
                          onChange={(e) => setFormData({ ...formData, leaderPhone: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-xs font-sans focus:outline-none focus:border-[#F47025]"
                        />
                        {errors.leaderPhone && <p className="text-red-500 text-[10px] font-mono mt-1">{errors.leaderPhone}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-neutral-600 mb-1">College / University Name *</label>
                      <input
                        type="text"
                        placeholder="e.g. Jain Institute of Technology, Davanagere"
                        value={formData.college}
                        onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-xs font-sans focus:outline-none focus:border-[#F47025]"
                      />
                      {errors.college && <p className="text-red-500 text-[10px] font-mono mt-1">{errors.college}</p>}
                    </div>
                  </div>

                  {/* Additional Members */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-700">
                        Additional Members ({formData.members.length} of max 3)
                      </span>
                      {formData.members.length < 3 && (
                        <button
                          type="button"
                          onClick={addMember}
                          className="inline-flex items-center gap-1 font-mono text-xs text-[#F47025] hover:underline font-bold cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Member</span>
                        </button>
                      )}
                    </div>

                    {formData.members.map((member, idx) => (
                      <div key={idx} className="p-4 rounded-xl border border-neutral-200 bg-white grid grid-cols-1 sm:grid-cols-4 gap-2.5 items-end">
                        <div>
                          <label className="block text-[11px] font-mono text-neutral-500 mb-1">Member #{idx + 2} Name</label>
                          <input
                            type="text"
                            placeholder="Full Name"
                            value={member.name}
                            onChange={(e) => updateMember(idx, 'name', e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded border border-neutral-300 text-xs font-sans focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-mono text-neutral-500 mb-1">Email</label>
                          <input
                            type="email"
                            placeholder="member@college.edu"
                            value={member.email}
                            onChange={(e) => updateMember(idx, 'email', e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded border border-neutral-300 text-xs font-sans focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-mono text-neutral-500 mb-1">Phone</label>
                          <input
                            type="tel"
                            placeholder="+91..."
                            value={member.phone}
                            onChange={(e) => updateMember(idx, 'phone', e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded border border-neutral-300 text-xs font-sans focus:outline-none"
                          />
                        </div>
                        <div className="flex items-center justify-end">
                          {formData.members.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeMember(idx)}
                              className="p-2 text-neutral-400 hover:text-red-500 transition-colors"
                              title="Remove Member"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-6 py-3 rounded-xl bg-[#F47025] hover:bg-[#e05e15] text-white font-chakra font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Continue to Prototype Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: PROTOTYPE DETAILS */}
              {step === 2 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  
                  <div>
                    <label className="block font-mono text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                      Working Prototype Title *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Decentralized Campus Microgrid Optimizer"
                      value={formData.prototypeTitle}
                      onChange={(e) => setFormData({ ...formData, prototypeTitle: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:border-[#F47025] text-sm font-sans focus:outline-none"
                    />
                    {errors.prototypeTitle && <p className="text-red-500 text-[11px] font-mono mt-1">{errors.prototypeTitle}</p>}
                  </div>

                  <div>
                    <label className="block font-mono text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                      Brief Problem & Architectural Description *
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Outline the core socio-technical bottleneck, technical stack, and current working stage of your prototype..."
                      value={formData.prototypeDesc}
                      onChange={(e) => setFormData({ ...formData, prototypeDesc: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:border-[#F47025] text-sm font-sans focus:outline-none"
                    />
                    {errors.prototypeDesc && <p className="text-red-500 text-[11px] font-mono mt-1">{errors.prototypeDesc}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                        GitHub Repository Link *
                      </label>
                      <input
                        type="url"
                        placeholder="https://github.com/team/prototype"
                        value={formData.githubRepo}
                        onChange={(e) => setFormData({ ...formData, githubRepo: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:border-[#F47025] text-sm font-sans focus:outline-none"
                      />
                      {errors.githubRepo && <p className="text-red-500 text-[11px] font-mono mt-1">{errors.githubRepo}</p>}
                    </div>

                    <div>
                      <label className="block font-mono text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                        Loom / YouTube Video Demo (Optional)
                      </label>
                      <input
                        type="url"
                        placeholder="https://loom.com/share/..."
                        value={formData.demoUrl}
                        onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:border-[#F47025] text-sm font-sans focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Level 1 Declarations */}
                  <div className="p-4 rounded-xl bg-orange-50 border border-orange-200 text-xs text-neutral-700 font-sans space-y-1">
                    <p className="font-bold text-[#F47025] uppercase font-mono">
                      Level 1 Submission Checklist:
                    </p>
                    <p>• Repository is public or read-access granted for screening viva.</p>
                    <p>• Code commits must reflect team member ownership.</p>
                    <p>• No payment required at Level 1. Shortlisted squads pay ₹300 per member only upon invitation to Level 2.</p>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-5 py-2.5 rounded-xl border border-neutral-300 font-mono text-xs font-bold text-neutral-600 hover:text-black cursor-pointer"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3 rounded-xl bg-[#0b0b0f] hover:bg-[#F47025] text-white font-chakra font-black text-sm uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow-md"
                    >
                      <span>Submit Prototype for Level 1</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              )}

            </form>
          </div>
        )}

      </div>
    </div>
  );
}

