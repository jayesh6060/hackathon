import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  MapPin, 
  Calendar, 
  Coffee, 
  Code2, 
  Users, 
  Trophy, 
  Sparkles, 
  Download, 
  CheckCircle2, 
  ChevronRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export default function EventPage({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'day1', 'day2'

  const scheduleDay1 = [
    {
      time: "08:30 AM – 10:00 AM",
      phase: "Arrival & Welcome",
      title: "Participant Arrival, Physical Check-in & Hardware Setup",
      location: "JITD Innovation Hub & Central Library",
      type: "Milestone",
      typeColor: "bg-blue-100 text-blue-800 border-blue-200",
      desc: "Report at the registration desk. Collect your physical hacker badges, official CLOCKIT 2026 t-shirts, NFC credentials, and WiFi authentication tokens. Settle into designated team pods.",
      icon: Users
    },
    {
      time: "10:00 AM – 10:45 AM",
      phase: "Ceremony",
      title: "Inaugural Ceremony & Welcome Address",
      location: "Main Auditorium, JITD Campus",
      type: "Keynote",
      typeColor: "bg-purple-100 text-purple-800 border-purple-200",
      desc: "Opening address by JITD Leadership, JGI Dignitaries, and keynote address by Salutix AI engineering leaders on the future of autonomous intelligence and AI-driven products.",
      icon: Sparkles
    },
    {
      time: "10:00 AM – 10:45 AM",
      phase: "Briefing",
      title: "Level 2 Enhancement Problem Statements Release",
      location: "Main Auditorium & Hacker Arena",
      type: "Briefing",
      typeColor: "bg-amber-100 text-amber-800 border-amber-200",
      desc: "Unveiling of the mandatory enhancement problem statements for each of the 5 tracks. Teams receive live API keys, test datasets, and evaluation rubrics.",
      icon: ShieldCheck
    },
    {
      time: "11:30 AM",
      phase: "Sprint Launch",
      title: "CLOCKIT 24-Hour Countdown Clock Starts",
      location: "Arena 1 & 2 (24H Build Hall)",
      type: "Key Milestone",
      typeColor: "bg-orange-100 text-[#F47025] border-orange-200",
      desc: "Repositories are unsealed. Code commits for Level 2 begin. The 24-hour sprint clock is live on the big arena projection displays.",
      icon: Code2
    },
    {
      time: "01:30 PM – 02:30 PM",
      phase: "Meal Break",
      title: "Hot Buffet Lunch & Power Break",
      location: "Campus Dining Hall",
      type: "Food & Social",
      typeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      desc: "South & North Indian vegetarian lunch. Casual networking with peer teams and mentors.",
      icon: Coffee
    },
    {
      time: "03:30 PM – 06:00 PM",
      phase: "Mentorship",
      title: "Mentorship Round 01: Architecture & Feasibility Check",
      location: "Team Pods (On-Desk Mentoring)",
      type: "Mentoring",
      typeColor: "bg-indigo-100 text-indigo-800 border-indigo-200",
      desc: "Salutix AI architects and faculty mentors visit each squad for 10-minute reviews. Feedback on tech stack, API rate limits, user flows, and code structure.",
      icon: Users
    },
    {
      time: "05:00 PM – 05:30 PM",
      phase: "Snack Sprint",
      title: "Evening Hi-Tea, Coffee & Fresh Bakes",
      location: "Arena Refreshment Counter",
      type: "Food & Social",
      typeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      desc: "Filter coffee, tea, fruit juices, and savoury snacks served directly inside the build arena.",
      icon: Coffee
    },
    {
      time: "08:30 PM – 09:45 PM",
      phase: "Dinner",
      title: "Gourmet Dinner & Campus Courtyard Walk",
      location: "Dining Hall & Campus Courtyard",
      type: "Food & Social",
      typeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      desc: "Re-energize with hot dinner. Take a breather on the illuminated green lawns before the overnight marathon begins.",
      icon: Coffee
    },
    {
      time: "10:30 PM – 12:30 AM",
      phase: "Mentorship",
      title: "Mentorship Round 02: Code Review & Feature Verification",
      location: "Team Pods",
      type: "Mentoring",
      typeColor: "bg-indigo-100 text-indigo-800 border-indigo-200",
      desc: "Deep-dive code inspection. Mentors verify that teams are genuinely integrating their required Level 2 mandatory enhancements rather than recycling static mockups.",
      icon: ShieldCheck
    },
    {
      time: "12:00 Midnight",
      phase: "After Dark Fun",
      title: "Midnight Maggi Sprint & Open Mic Jam",
      location: "Student Activity Center & Arena Lawn",
      type: "Community Event",
      typeColor: "bg-rose-100 text-rose-800 border-rose-200",
      desc: "Steaming hot Maggi, energy drinks, and casual music jam. 100% optional, 0% scoring impact. Take 20 minutes to relax!",
      icon: Sparkles
    }
  ];

  const scheduleDay2 = [
    {
      time: "06:30 AM – 07:30 AM",
      phase: "Dawn Revival",
      title: "Morning Sunrise Yoga / Lawn Jog & Showers",
      location: "Campus Sports Complex & Hostels",
      type: "Wellness",
      typeColor: "bg-teal-100 text-teal-800 border-teal-200",
      desc: "Fresh morning air, stretch sessions, and shower access to reset your mind for the final sprint.",
      icon: Sparkles
    },
    {
      time: "07:30 AM – 08:30 AM",
      phase: "Breakfast",
      title: "Hearty Karnataka Breakfast & Fresh Filter Coffee",
      location: "Campus Dining Hall",
      type: "Food & Social",
      typeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      desc: "Idli, Vada, Kesari Bath, and hot filter coffee to fuel the final 3 hours.",
      icon: Coffee
    },
    {
      time: "09:00 AM – 10:30 AM",
      phase: "Dry Run",
      title: "Audio-Visual Dry Runs & Pitch Polishing",
      location: "Presentation Pods",
      type: "Prep",
      typeColor: "bg-amber-100 text-amber-800 border-amber-200",
      desc: "Finalize your 4-minute slide deck and test HDMI screen sharing, microphone inputs, and live deployment staging URLs.",
      icon: Users
    },
    {
      time: "11:30 AM SHARP",
      phase: "Sprint Climax",
      title: "FINAL CODE FREEZE (24-Hour Timer Ends)",
      location: "Build Hall Projection Screens",
      type: "Critical Deadline",
      typeColor: "bg-red-100 text-red-800 border-red-200 font-bold",
      desc: "Strict automated Git push freeze. GitHub repositories lock. No further commits are accepted. Live deployment URLs submitted via portal.",
      icon: AlertCircle
    },
    {
      time: "12:00 PM – 02:00 PM",
      phase: "Final Judging",
      title: "Grand Technical Jury Showcase (Top Finalist Demos)",
      location: "Main Auditorium & Jury Stage",
      type: "Jury Evaluation",
      typeColor: "bg-[#002B66]/10 text-[#002B66] border-[#002B66]/30 font-bold",
      desc: "Shortlisted squads present a 4-minute live demo + 2-minute Q&A in front of industry judges from Salutix AI, JITD Academic Board, and founder guests.",
      icon: Trophy
    },
    {
      time: "02:00 PM – 02:45 PM",
      phase: "Lunch",
      title: "Jury Deliberation & Celebration Lunch",
      location: "Dining Hall",
      type: "Food & Social",
      typeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      desc: "Buffet lunch while the jury tallies final scores across the 5 evaluation criteria.",
      icon: Coffee
    },
    {
      time: "02:45 PM – 04:00 PM",
      phase: "Awards Ceremony",
      title: "Grand Valedictory Ceremony & Cash Prize Bestowal",
      location: "Main Auditorium",
      type: "Grand Finale",
      typeColor: "bg-amber-100 text-[#F47025] border-amber-300 font-bold",
      desc: "Distribution of ₹30,000 cash prizes, trophies, runner-up awards, Salutix AI internship announcements, and commemorative participation certificates.",
      icon: Trophy
    },
    {
      time: "04:30 PM Onwards",
      phase: "Departure",
      title: "Campus Shuttle to Davanagere Railway Station",
      location: "JITD Main Gate Departure Bay",
      type: "Logistics",
      typeColor: "bg-neutral-100 text-neutral-800 border-neutral-200",
      desc: "Complimentary shuttle transport back to Davanagere Railway Station (DVG). Have a safe journey home!",
      icon: MapPin
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
                  Hour-By-Hour Schedule
                </span>
                <span className="text-xs font-mono text-neutral-500">
                  {SITE_CONFIG.edition} · {SITE_CONFIG.orgCode}
                </span>
              </div>
              <h1 className="font-chakra font-black text-4xl sm:text-6xl text-[#0b0b0f] uppercase tracking-tight">
                24-Hour Continuous Sprint
              </h1>
              <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-2xl font-sans">
                Detailed timeline for Level 2 on-campus finals at <span className="font-semibold text-neutral-900">{SITE_CONFIG.universityName}</span>. 
                From arrival and hardware unsealing to midnight coffee and grand cash prize bestowal.
              </p>
            </div>

            {/* Quick Meta Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#fafaf7] border border-neutral-300 space-y-2 font-mono text-xs text-neutral-700 min-w-[260px]">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#F47025]" />
                <span className="font-bold text-neutral-900">{SITE_CONFIG.dates}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#F47025]" />
                <span>24 Hours Continuous</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#F47025]" />
                <span>{SITE_CONFIG.venue}</span>
              </div>
              <div className="flex items-center gap-2 pt-1 border-t border-neutral-200">
                <Trophy className="w-4 h-4 text-[#F47025]" />
                <span className="font-bold text-[#F47025]">{SITE_CONFIG.stats.prizePool} Prize Pool</span>
              </div>
            </div>
          </div>

          {/* Day Filter Tabs */}
          <div className="mt-8 flex items-center gap-2 border-b border-neutral-200 pb-px">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-5 py-2.5 rounded-t-xl font-mono text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
                activeTab === 'all'
                  ? 'border-[#F47025] text-[#F47025] bg-white'
                  : 'border-transparent text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Full 24H Sprint (All)
            </button>
            <button
              onClick={() => setActiveTab('day1')}
              className={`px-5 py-2.5 rounded-t-xl font-mono text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
                activeTab === 'day1'
                  ? 'border-[#F47025] text-[#F47025] bg-white'
                  : 'border-transparent text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Day 01 (25 Nov · Launch & Build)
            </button>
            <button
              onClick={() => setActiveTab('day2')}
              className={`px-5 py-2.5 rounded-t-xl font-mono text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
                activeTab === 'day2'
                  ? 'border-[#F47025] text-[#F47025] bg-white'
                  : 'border-transparent text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Day 02 (26 Nov · Freeze & Demos)
            </button>
          </div>

        </div>
      </section>

      {/* Schedule Timeline Content */}
      <section className="py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* DAY 1 SECTION */}
          {(activeTab === 'all' || activeTab === 'day1') && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#002B66] text-white font-chakra font-black flex items-center justify-center text-sm">
                  D1
                </span>
                <div>
                  <h2 className="font-chakra font-black text-2xl uppercase text-[#0b0b0f]">
                    Day 01 · Wednesday, 25 November 2026
                  </h2>
                  <p className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
                    Registration · Opening Ceremony · Problem Statements · Continuous Build
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {scheduleDay1.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={idx}
                      className="p-5 sm:p-6 rounded-2xl bg-white border border-neutral-300 shadow-xs hover:border-[#F47025]/50 transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-700 flex-shrink-0">
                            <Icon className="w-5 h-5 text-[#F47025]" />
                          </div>
                          <div>
                            <span className="font-mono text-xs font-bold text-neutral-500 block">
                              {item.time}
                            </span>
                            <h3 className="font-chakra font-bold text-lg sm:text-xl text-[#0b0b0f] leading-snug">
                              {item.title}
                            </h3>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-start sm:self-auto">
                          <span className={`px-2.5 py-0.5 rounded-full border text-[11px] font-mono font-semibold uppercase tracking-wider ${item.typeColor}`}>
                            {item.type}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed mt-2 pl-0 sm:pl-[52px]">
                        {item.desc}
                      </p>

                      <div className="mt-3 pl-0 sm:pl-[52px] flex items-center gap-1.5 text-[11px] font-mono text-neutral-500">
                        <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* DAY 2 SECTION */}
          {(activeTab === 'all' || activeTab === 'day2') && (
            <div className="space-y-6 pt-6">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#F47025] text-white font-chakra font-black flex items-center justify-center text-sm">
                  D2
                </span>
                <div>
                  <h2 className="font-chakra font-black text-2xl uppercase text-[#0b0b0f]">
                    Day 02 · Thursday, 26 November 2026
                  </h2>
                  <p className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
                    Dry Run · 11:30 AM Code Freeze · Live Jury Demos · Valedictory Bestowal
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {scheduleDay2.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={idx}
                      className="p-5 sm:p-6 rounded-2xl bg-white border border-neutral-300 shadow-xs hover:border-[#F47025]/50 transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-700 flex-shrink-0">
                            <Icon className="w-5 h-5 text-[#F47025]" />
                          </div>
                          <div>
                            <span className="font-mono text-xs font-bold text-neutral-500 block">
                              {item.time}
                            </span>
                            <h3 className="font-chakra font-bold text-lg sm:text-xl text-[#0b0b0f] leading-snug">
                              {item.title}
                            </h3>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-start sm:self-auto">
                          <span className={`px-2.5 py-0.5 rounded-full border text-[11px] font-mono font-semibold uppercase tracking-wider ${item.typeColor}`}>
                            {item.type}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed mt-2 pl-0 sm:pl-[52px]">
                        {item.desc}
                      </p>

                      <div className="mt-3 pl-0 sm:pl-[52px] flex items-center gap-1.5 text-[11px] font-mono text-neutral-500">
                        <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Bottom Action Card */}
          <div className="p-8 rounded-3xl bg-neutral-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#F47025]">
                Ready to take the challenge?
              </span>
              <h3 className="font-chakra font-black text-2xl sm:text-3xl uppercase">
                Submit your prototype for Level 1
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-sans max-w-lg">
                Registration fee is ₹650 per team. Form your squad of 2–4 members, select one of the 5 tracks, and upload your GitHub repo.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button
                onClick={() => onNavigate('/register')}
                className="px-6 py-3 rounded-xl bg-[#F47025] hover:bg-[#e05e15] text-white font-chakra font-bold text-sm uppercase tracking-wider transition-all text-center"
              >
                Register Team (₹650) →
              </button>
              <button
                onClick={() => onNavigate('/rules')}
                className="px-6 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-chakra font-bold text-sm uppercase tracking-wider transition-all text-center"
              >
                View Rules
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

