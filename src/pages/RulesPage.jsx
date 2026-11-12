import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  BookOpen, 
  Code2, 
  Sparkles, 
  Scale, 
  Award, 
  Terminal, 
  FileText,
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export default function RulesPage({ onNavigate }) {
  const [activeSection, setActiveSection] = useState('all');

  const screeningCriteria = [
    {
      title: "Problem Relevance & Domain Significance",
      weight: "25%",
      color: "border-blue-500",
      desc: "How effectively does the prototype address a genuine, pressing industry or societal challenge within the chosen theme? Is the problem statement well-scoped and validated with real user insights?"
    },
    {
      title: "Prototype Credibility & Code Quality",
      weight: "25%",
      color: "border-emerald-500",
      desc: "Is there a working implementation rather than just Figma mockups or landing pages? Clean repository structure, sensible Git commit history, modular code, and verifiable runnable instructions."
    },
    {
      title: "Technical Feasibility & Architecture",
      weight: "20%",
      color: "border-purple-500",
      desc: "Soundness of the technical architecture, database schemas, latency considerations, API usage, and resilience to edge cases. Feasibility of deploying in real production."
    },
    {
      title: "Clarity, Documentation & Demo Pitch",
      weight: "15%",
      color: "border-amber-500",
      desc: "Clarity of the Loom/YouTube video walkthrough and README documentation. How crisply does the team articulate their architecture, tech decisions, and user flows?"
    },
    {
      title: "Originality & Distinctive Innovation",
      weight: "15%",
      color: "border-rose-500",
      desc: "Novelty of approach compared to commodity open-source templates. Unique UX touchpoints, smart algorithm design, or unexpected combination of emerging technologies."
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
                <span className="px-2.5 py-0.5 rounded-full bg-[#002B66]/10 text-[#002B66] text-xs font-mono font-bold uppercase tracking-wider">
                  Official Regulations
                </span>
                <span className="text-xs font-mono text-neutral-500">
                  {SITE_CONFIG.edition} · {SITE_CONFIG.orgCode}
                </span>
              </div>
              <h1 className="font-chakra font-black text-4xl sm:text-6xl text-[#0b0b0f] uppercase tracking-tight">
                Rules & Eligibility
              </h1>
              <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-2xl font-sans">
                Clear, transparent guidelines governing Level 1 prototype submissions, ownership verification viva, 
                and the Level 2 on-campus 24-hour enhancement sprint.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#fafaf7] border border-neutral-300 font-mono text-xs text-neutral-700 space-y-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#F47025]" />
                <span className="font-bold">100% IP Retained by Teams</span>
              </div>
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-[#002B66]" />
                <span>Double-Blind Review Stage</span>
              </div>
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-600" />
                <span>AI Accelerated · Human Owned</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Main Content Sections */}
      <section className="py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Section 1: Eligibility & Team Formation */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-neutral-300 shadow-xs space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-neutral-200">
              <span className="w-7 h-7 rounded-lg bg-[#002B66] text-white font-mono font-bold text-xs flex items-center justify-center">
                01
              </span>
              <div>
                <h2 className="font-chakra font-bold text-2xl uppercase text-[#0b0b0f]">
                  Eligibility & Team Structure
                </h2>
                <p className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
                  Squad Requirements · Verification · Multi-College Guidelines
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-neutral-700">
              <div className="space-y-3">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#F47025]">
                  Team Composition
                </h4>
                <ul className="space-y-2 text-xs font-sans leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Teams must consist of exactly <strong>2 to 4 registered members</strong>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>All members must be currently enrolled undergraduate or postgraduate students (B.E., B.Tech, M.Tech, BCA, MCA, B.Sc, M.Sc).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Inter-college and inter-departmental teams are explicitly permitted</strong> and celebrated.</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#F47025]">
                  Documentation & IDs
                </h4>
                <ul className="space-y-2 text-xs font-sans leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Valid Student College Identity Card is mandatory for on-campus verification at Level 2.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>One member must be designated as Team Lead for official communication and logistics.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>A student may not register under more than one squad. Duplicate memberships trigger auto-disqualification.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 2: Level 1 Screening Criteria & Viva */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-neutral-300 shadow-xs space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-neutral-200">
              <span className="w-7 h-7 rounded-lg bg-[#F47025] text-white font-mono font-bold text-xs flex items-center justify-center">
                02
              </span>
              <div>
                <h2 className="font-chakra font-bold text-2xl uppercase text-[#0b0b0f]">
                  Level 1: Evaluation Rubric & Screening Viva
                </h2>
                <p className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
                  The 5 Screening Criteria · Weightages · Ownership Viva
                </p>
              </div>
            </div>

            <p className="text-sm text-neutral-600 font-sans leading-relaxed">
              Every prototype is evaluated by a dual-reviewer technical panel based on the following weighted rubric:
            </p>

            <div className="space-y-3">
              {screeningCriteria.map((item, idx) => (
                <div key={idx} className={`p-4 rounded-xl bg-[#fafaf7] border-l-4 ${item.color} border border-neutral-200`}>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="font-chakra font-bold text-base text-[#0b0b0f]">
                      {item.title}
                    </h3>
                    <span className="font-mono text-xs font-bold text-[#F47025] bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                      {item.weight}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Ownership Viva Note */}
            <div className="p-4 rounded-xl bg-neutral-900 text-white space-y-2">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#F47025]" />
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#F47025]">
                  Mandatory Ownership Viva (Anti-Plagiarism)
                </h4>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                To guarantee genuine craftsmanship, top-ranking submissions undergo a 10-minute virtual technical viva. 
                Evaluators review commit authorship, require a line-by-line explanation of core algorithmic routines, and test edge cases. 
                Turnkey projects downloaded from internet repos or completely generated by LLMs without student understanding will be disqualified.
              </p>
            </div>
          </div>

          {/* Section 3: Level 2 On-Site 24H Sprint Regulations */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-neutral-300 shadow-xs space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-neutral-200">
              <span className="w-7 h-7 rounded-lg bg-[#002B66] text-white font-mono font-bold text-xs flex items-center justify-center">
                03
              </span>
              <div>
                <h2 className="font-chakra font-bold text-2xl uppercase text-[#0b0b0f]">
                  Level 2: The 24-Hour Enhancement Challenge
                </h2>
                <p className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
                  Baseline Code Freeze · Live Enhancement Problems · Code Freeze
                </p>
              </div>
            </div>

            <div className="space-y-4 text-xs font-sans text-neutral-700 leading-relaxed">
              <div className="p-4 rounded-xl bg-[#fafaf7] border border-neutral-200 space-y-1">
                <span className="font-mono font-bold text-[#002B66] uppercase tracking-wider block">
                  1. Baseline Code Freeze (24 Nov)
                </span>
                <p>
                  Teams must freeze their Level 1 prototype branch prior to arriving on campus. 
                  A Git tag <code>v1.0-baseline</code> must be created. All commits evaluated during Level 2 must occur after the official 11:30 AM start whistle.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#fafaf7] border border-neutral-200 space-y-1">
                <span className="font-mono font-bold text-[#002B66] uppercase tracking-wider block">
                  2. Mandatory Enhancement Challenge
                </span>
                <p>
                  At 10:45 AM on Day 01, each track releases specific surprise enhancement requirements (e.g. real-time sync, multi-agent integration, hardware telemetry, edge ML deployment). 
                  Judges will grade teams strictly on how effectively these enhancements were implemented during the 24 hours.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#fafaf7] border border-neutral-200 space-y-1">
                <span className="font-mono font-bold text-[#002B66] uppercase tracking-wider block">
                  3. Hardware & Equipment
                </span>
                <p>
                  Participants must bring their own laptops, chargers, extension cords, and test devices (smartphones, IoT sensors, microcontrollers if working on Track 03). 
                  High-speed campus WiFi, power outlets, and hardware debug stations are provided by JITD.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#fafaf7] border border-neutral-200 space-y-1">
                <span className="font-mono font-bold text-red-600 uppercase tracking-wider block">
                  4. Strict Code Freeze (Day 02, 11:30 AM)
                </span>
                <p>
                  At 11:30 AM sharp on Day 02, the GitHub repository must be locked. Any commits pushed after 11:30 AM will invalidate the submission. 
                  Teams are given 30 minutes to prepare demo screens and slides.
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: AI Tools & IP Policy */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-neutral-300 shadow-xs space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-neutral-200">
              <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                04
              </span>
              <div>
                <h2 className="font-chakra font-bold text-2xl uppercase text-[#0b0b0f]">
                  AI Tools Policy & Intellectual Property
                </h2>
                <p className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
                  Permitted Tooling · LLM Usage · 100% IP Ownership
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-neutral-700">
              <div className="p-4 rounded-xl bg-[#fafaf7] border border-neutral-200 space-y-2">
                <span className="font-mono font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  What is Allowed
                </span>
                <p className="leading-relaxed">
                  You are actively encouraged to use modern developer tools: GitHub Copilot, Cursor, OpenAI/Claude/Gemini APIs, 
                  Tailwind CSS, Next.js templates, and open-source packages. Modern developers build with AI; we want you to ship fast!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#fafaf7] border border-neutral-200 space-y-2">
                <span className="font-mono font-bold text-red-600 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  What is NOT Allowed
                </span>
                <p className="leading-relaxed">
                  Submitting existing turnkey applications created by other authors, cloning commercial SaaS platforms, 
                  or generating 100% synthetic mock repositories without the team being able to explain, modify, or debug code on stage.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-neutral-100 text-neutral-800 font-mono text-xs space-y-1">
              <span className="font-bold text-[#002B66]">Intellectual Property Guarantee:</span>
              <p className="font-sans text-neutral-600 text-xs">
                All code, design, architectures, and prototypes built during CLOCKIT 2026 remain 100% the intellectual property 
                of the participating students. Neither JITD, JGI, nor Salutix AI claim any ownership or equity over your prototypes.
              </p>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="p-8 rounded-3xl bg-neutral-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#F47025]">
                Ready to register?
              </span>
              <h3 className="font-chakra font-black text-2xl sm:text-3xl uppercase">
                Registration Fee is ₹650 Per Team
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-sans max-w-lg">
                Submit your prototype before 20 November 2026. Stand a chance to compete on-site for ₹30,000 in cash prizes.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => onNavigate('/register')}
                className="px-6 py-3 rounded-xl bg-[#F47025] hover:bg-[#e05e15] text-white font-chakra font-bold text-sm uppercase tracking-wider transition-all text-center"
              >
                Register Squad Now →
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

