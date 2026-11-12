import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Users, 
  Sparkles, 
  Award, 
  Building2, 
  ExternalLink, 
  GraduationCap, 
  Phone,
  Briefcase
} from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export default function AdvisoryPage({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('all');

  const industryMentors = [
    {
      name: "Dr. Vikram Seth",
      role: "Chief AI Scientist · Salutix AI",
      track: "AI & Autonomous Systems",
      bio: "Ex-Google Brain researcher focusing on multi-agent cognitive architectures and on-device neural quantization.",
      badge: "Jury Chair"
    },
    {
      name: "Karthik Subramanian",
      role: "VP of Engineering · CloudSphere",
      track: "Cloud & Web Architecture",
      bio: "Distributed systems architect with 14+ years scaling Kubernetes microservices to 10M+ daily active requests.",
      badge: "Technical Jury"
    },
    {
      name: "Pooja Venkatesh",
      role: "Principal Product Director · CyberShield",
      track: "CyberSecurity & FinTech",
      bio: "Pioneering zero-trust authentication protocols and automated threat containment for global banking infrastructure.",
      badge: "Industry Mentor"
    },
    {
      name: "Rohan Deshmukh",
      role: "Hardware & IoT Systems Lead · GreenVolt",
      track: "IoT, CleanTech & Robotics",
      bio: "Specializing in low-power firmware, edge sensor telemetry, and EV battery health telemetry algorithms.",
      badge: "Hardware Jury"
    }
  ];

  return (
    <div className="min-h-screen bg-[#fafaf7] text-[#0b0b0f] font-sans">
      
      {/* Header Banner */}
      <section className="border-b border-neutral-200 bg-white pt-12 pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <button
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 hover:text-[#F47025] mb-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Hackathon Overview</span>
          </button>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#F47025]/10 text-[#F47025] text-xs font-mono font-bold uppercase tracking-wider">
                  Advisory Committee & Mentors
                </span>
                <span className="text-xs font-mono text-neutral-500">
                  {SITE_CONFIG.edition} · {SITE_CONFIG.orgCode}
                </span>
              </div>
              <h1 className="font-chakra font-black text-4xl sm:text-6xl text-[#0b0b0f] uppercase tracking-tight">
                Leadership, Mentors & Jury
              </h1>
              <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-2xl font-sans">
                Guided by the visionary academic leadership of <span className="font-semibold text-neutral-900">{SITE_CONFIG.universityName}</span> and industry innovators from <span className="font-semibold text-neutral-900">Salutix AI</span>.
              </p>
            </div>

            {/* Quick Stats Pill */}
            <div className="p-4 rounded-2xl bg-[#fafaf7] border border-neutral-300 font-mono text-xs text-neutral-700 space-y-1">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#002B66]" />
                <span className="font-bold">{SITE_CONFIG.partners.presentedBy}</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#F47025]" />
                <span>3 Organizers · 6 Coordinators</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-emerald-600" />
                <span>Salutix AI Technical Jury</span>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="mt-8 flex items-center gap-2 border-b border-neutral-200 pb-px">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-5 py-2.5 rounded-t-xl font-mono text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
                activeTab === 'all'
                  ? 'border-[#F47025] text-[#F47025] bg-white'
                  : 'border-transparent text-neutral-600 hover:text-neutral-900'
              }`}
            >
              All Committees
            </button>
            <button
              onClick={() => setActiveTab('organizers')}
              className={`px-5 py-2.5 rounded-t-xl font-mono text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
                activeTab === 'organizers'
                  ? 'border-[#F47025] text-[#F47025] bg-white'
                  : 'border-transparent text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Organizers & HODs
            </button>
            <button
              onClick={() => setActiveTab('mentors')}
              className={`px-5 py-2.5 rounded-t-xl font-mono text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
                activeTab === 'mentors'
                  ? 'border-[#F47025] text-[#F47025] bg-white'
                  : 'border-transparent text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Technical Jury (Salutix AI)
            </button>
            <button
              onClick={() => setActiveTab('coordinators')}
              className={`px-5 py-2.5 rounded-t-xl font-mono text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
                activeTab === 'coordinators'
                  ? 'border-[#F47025] text-[#F47025] bg-white'
                  : 'border-transparent text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Faculty & Student Coordinators
            </button>
          </div>

        </div>
      </section>

      {/* Main Committee Listings */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* SECTION 1: ORGANIZERS & DEPARTMENT HEADS */}
          {(activeTab === 'all' || activeTab === 'organizers') && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#002B66] text-white font-chakra font-black flex items-center justify-center text-sm">
                  01
                </span>
                <div>
                  <h2 className="font-chakra font-black text-2xl sm:text-3xl uppercase text-[#0b0b0f]">
                    Organizers & Department Heads
                  </h2>
                  <p className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
                    Jain Institute of Technology, Davanagere
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {SITE_CONFIG.advisoryCommittee.departmentLeaders.map((d, idx) => (
                  <div 
                    key={`hod-${idx}`}
                    className="p-6 rounded-2xl bg-white border border-neutral-300 shadow-xs hover:border-emerald-500 transition-all text-center space-y-2"
                  >
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto font-chakra font-black text-base border border-emerald-200">
                      {d.hod.replace('Dr. ', '').slice(0, 2).toUpperCase()}
                    </div>
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-700 block">
                      {d.role}
                    </span>
                    <h3 className="font-chakra font-black text-lg text-[#0b0b0f]">
                      {d.hod}
                    </h3>
                    <p className="text-xs font-sans text-neutral-500">
                      {d.department}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 3: TECHNICAL JURY & MENTORS FROM SALUTIX AI */}
          {(activeTab === 'all' || activeTab === 'mentors') && (
            <div className="space-y-6 pt-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-chakra font-black flex items-center justify-center text-sm">
                  03
                </span>
                <div>
                  <h2 className="font-chakra font-black text-2xl sm:text-3xl uppercase text-[#0b0b0f]">
                    Industry Jury & Technical Mentors
                  </h2>
                  <p className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
                    In Collaboration With Salutix AI & Partner Tech Founders
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {industryMentors.map((mentor, idx) => (
                  <div 
                    key={idx}
                    className="p-6 rounded-2xl bg-white border border-neutral-300 shadow-xs hover:border-emerald-500 transition-all space-y-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-neutral-900 text-white flex items-center justify-center font-chakra font-black text-base flex-shrink-0">
                          {mentor.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="font-chakra font-bold text-lg text-[#0b0b0f]">
                            {mentor.name}
                          </h3>
                          <span className="font-mono text-xs text-neutral-600 block">
                            {mentor.role}
                          </span>
                        </div>
                      </div>

                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold uppercase tracking-wider border border-emerald-200">
                        {mentor.badge}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                      {mentor.bio}
                    </p>

                    <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-mono">
                      <span className="text-neutral-500">Track: <span className="text-neutral-900 font-semibold">{mentor.track}</span></span>
                      <span className="text-[#F47025] font-semibold">Salutix AI Evaluator</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 4: STUDENT COORDINATORS & HELP DESK LEADS */}
          {(activeTab === 'all' || activeTab === 'coordinators') && (
            <div className="space-y-6 pt-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-neutral-900 text-white font-chakra font-black flex items-center justify-center text-sm">
                  04
                </span>
                <div>
                  <h2 className="font-chakra font-black text-2xl sm:text-3xl uppercase text-[#0b0b0f]">
                    Student Organizing Leads
                  </h2>
                  <p className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
                    Direct Contact for Registration, Logistics & Hackathon Operations
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {SITE_CONFIG.helpDesk.map((coord, idx) => (
                  <div 
                    key={idx}
                    className="p-6 rounded-2xl bg-white border border-neutral-300 shadow-xs hover:border-[#F47025] transition-all space-y-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#F47025]/10 text-[#F47025] flex items-center justify-center font-chakra font-black text-sm">
                        {coord.name.slice(0, 1)}
                      </div>
                      <div>
                        <h3 className="font-chakra font-bold text-lg text-[#0b0b0f]">
                          {coord.name}
                        </h3>
                        <span className="font-mono text-[11px] text-neutral-500 block">
                          {coord.role}
                        </span>
                      </div>
                    </div>

                    <a 
                      href={`tel:${coord.phone.replace(/\s+/g, '')}`}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-100 hover:bg-[#F47025]/10 text-neutral-800 hover:text-[#F47025] font-mono text-xs font-bold transition-all w-full justify-center"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{coord.phone}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Banner */}
          <div className="p-8 rounded-3xl bg-neutral-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#F47025]">
                Have questions or need assistance?
              </span>
              <h3 className="font-chakra font-black text-2xl sm:text-3xl uppercase">
                Connect with our organizing desk
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-sans max-w-lg">
                Reach out directly via phone or WhatsApp for help with registration, team pairing, or campus travel.
              </p>
            </div>
            <button
              onClick={() => onNavigate('/register')}
              className="px-6 py-3 rounded-xl bg-[#F47025] hover:bg-[#e05e15] text-white font-chakra font-bold text-sm uppercase tracking-wider transition-all text-center flex-shrink-0"
            >
              Register Team (₹650) →
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}

