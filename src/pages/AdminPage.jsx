import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Search, 
  Download, 
  CheckCircle2, 
  Clock, 
  Users, 
  Filter, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  RefreshCw,
  Lock
} from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export default function AdminPage({ onNavigate }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPass, setAdminPass] = useState('');
  const [authError, setAuthError] = useState(false);

  // Search and filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedThemeFilter, setSelectedThemeFilter] = useState('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');

  // Sample seed registration teams for demonstration
  const [teams, setTeams] = useState([
    {
      id: "JITD-2026-1042",
      name: "CyberSentinels",
      lead: "Kiran Kumar",
      email: "kiran.cs@gmail.com",
      college: "Jain Institute of Technology, Davanagere",
      theme: "AI & Autonomous Systems",
      membersCount: 4,
      status: "Shortlisted",
      repo: "https://github.com/cybersentinels/agent-guard",
      date: "10 Nov 2026",
      score: 88
    },
    {
      id: "JITD-2026-2189",
      name: "VoltCrafters",
      lead: "Aishwarya Rai",
      email: "aishu.volt@gmail.com",
      college: "Bapuji Institute of Engineering & Technology, DVG",
      theme: "Clean Energy, EV & Sustainability",
      membersCount: 3,
      status: "Submitted",
      repo: "https://github.com/voltcrafters/smart-bms",
      date: "09 Nov 2026",
      score: 74
    },
    {
      id: "JITD-2026-3401",
      name: "NeuroPulse",
      lead: "Sagar Patil",
      email: "sagar.neuro@gmail.com",
      college: "UBDT College of Engineering, Davanagere",
      theme: "HealthTech & Bio-Informatics",
      membersCount: 4,
      status: "Shortlisted",
      repo: "https://github.com/neuropulse/ecg-edge-ml",
      date: "08 Nov 2026",
      score: 91
    },
    {
      id: "JITD-2026-4552",
      name: "ZeroPacket",
      lead: "Tanmay Hegde",
      email: "tanmay.zero@gmail.com",
      college: "RV College of Engineering, Bengaluru",
      theme: "CyberSecurity & Zero-Trust Defense",
      membersCount: 2,
      status: "Under Review",
      repo: "https://github.com/zeropacket/mesh-auth",
      date: "07 Nov 2026",
      score: 69
    },
    {
      id: "JITD-2026-5912",
      name: "CampusSync",
      lead: "Meghana Gowda",
      email: "meghana.g@gmail.com",
      college: "Jain Institute of Technology, Davanagere",
      theme: "Smart Campus & IoT Automation",
      membersCount: 4,
      status: "Submitted",
      repo: "https://github.com/campussync/smart-library",
      date: "06 Nov 2026",
      score: 72
    },
    {
      id: "JITD-2026-6731",
      name: "SwiftPay Mesh",
      lead: "Praveen Rao",
      email: "praveen.pay@gmail.com",
      college: "PES University, Bengaluru",
      theme: "FinTech & Digital Payments",
      membersCount: 3,
      status: "Shortlisted",
      repo: "https://github.com/swiftpay/offline-mesh",
      date: "05 Nov 2026",
      score: 85
    }
  ]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (adminPass.trim().toLowerCase() === 'jitd2026' || adminPass.trim() === 'admin') {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  // Filtered teams list
  const filteredTeams = teams.filter((t) => {
    const matchesSearch = 
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.lead.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.college.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTheme = selectedThemeFilter === 'all' || t.theme === selectedThemeFilter;
    const matchesStatus = selectedStatusFilter === 'all' || t.status === selectedStatusFilter;

    return matchesSearch && matchesTheme && matchesStatus;
  });

  // Export to CSV
  const exportToCSV = () => {
    const headers = ["Team ID", "Team Name", "Leader", "Email", "College", "Theme", "Members", "Status", "Score", "Repo Link", "Date"];
    const rows = filteredTeams.map(t => [
      t.id,
      `"${t.name}"`,
      `"${t.lead}"`,
      t.email,
      `"${t.college}"`,
      `"${t.theme}"`,
      t.membersCount,
      t.status,
      t.score,
      t.repo,
      t.date
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `CLOCKIT_2026_Teams_Export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#fafaf7] text-[#0b0b0f] font-sans py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Back Link */}
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 hover:text-[#F47025] mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Overview</span>
        </button>

        {!isAuthenticated ? (
          /* Admin Login Gate */
          <div className="max-w-md mx-auto p-8 rounded-3xl bg-white border border-neutral-300 shadow-sm mt-8">
            <div className="text-center pb-6 border-b border-neutral-200 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#002B66] text-white flex items-center justify-center mx-auto mb-3">
                <Lock className="w-6 h-6" />
              </div>
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#F47025] block mb-1">
                JITD Admin Portal
              </span>
              <h2 className="font-chakra font-black text-3xl text-[#0b0b0f] uppercase">
                Admin Sign In
              </h2>
              <p className="text-xs text-neutral-600 mt-1 font-sans">
                Protected dashboard for hackathon convenors and student coordinators.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block font-mono text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Passkey (Enter: jitd2026)
                </label>
                <input
                  type="password"
                  value={adminPass}
                  onChange={(e) => setAdminPass(e.target.value)}
                  placeholder="Enter admin passcode"
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:border-[#F47025] text-sm font-mono focus:outline-none"
                  required
                />
              </div>

              {authError && (
                <p className="text-xs font-mono text-red-600">
                  Invalid passcode. Use 'jitd2026' to demo.
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#002B66] hover:bg-[#001f4d] text-white font-chakra font-bold text-sm uppercase tracking-wider transition-all"
              >
                Access Dashboard →
              </button>
            </form>
          </div>
        ) : (
          /* Protected Admin Dashboard */
          <div className="space-y-8">
            
            {/* Header & Quick Stats */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold uppercase tracking-wider">
                    Live Database Connected
                  </span>
                  <span className="text-xs font-mono text-neutral-500">
                    {SITE_CONFIG.orgCode} · {SITE_CONFIG.name}
                  </span>
                </div>
                <h1 className="font-chakra font-black text-3xl sm:text-4xl text-[#0b0b0f] uppercase">
                  Registrations & Submissions Command Center
                </h1>
                <p className="text-xs sm:text-sm text-neutral-600 font-sans">
                  Live stream of Level 1 prototype applications, team leads, GitHub repos, and reviewer shortlist flags.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={exportToCSV}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#002B66] hover:bg-[#001f4d] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Export CSV ({filteredTeams.length})</span>
                </button>
              </div>
            </div>

            {/* Metrics Counter Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-neutral-300">
                <span className="font-mono text-xs text-neutral-500 uppercase tracking-wider block mb-1">
                  Total Registrations
                </span>
                <span className="font-chakra font-black text-3xl sm:text-4xl text-[#0b0b0f]">
                  {teams.length} Teams
                </span>
                <span className="text-[11px] font-mono text-neutral-500 block mt-1">
                  ~{teams.reduce((acc, t) => acc + t.membersCount, 0)} Hackers
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-neutral-300">
                <span className="font-mono text-xs text-neutral-500 uppercase tracking-wider block mb-1">
                  Shortlisted (Level 2)
                </span>
                <span className="font-chakra font-black text-3xl sm:text-4xl text-emerald-700">
                  {teams.filter(t => t.status === 'Shortlisted').length}
                </span>
                <span className="text-[11px] font-mono text-emerald-600 block mt-1">
                  Ready for on-site challenge
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-neutral-300">
                <span className="font-mono text-xs text-neutral-500 uppercase tracking-wider block mb-1">
                  Screening Pipeline
                </span>
                <span className="font-chakra font-black text-3xl sm:text-4xl text-[#F47025]">
                  {teams.filter(t => t.status !== 'Shortlisted').length}
                </span>
                <span className="text-[11px] font-mono text-neutral-500 block mt-1">
                  Under dual-blind review
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-neutral-300">
                <span className="font-mono text-xs text-neutral-500 uppercase tracking-wider block mb-1">
                  Target Prize Pool
                </span>
                <span className="font-chakra font-black text-3xl sm:text-4xl text-[#002B66]">
                  {SITE_CONFIG.stats.prizePool}
                </span>
                <span className="text-[11px] font-mono text-neutral-500 block mt-1">
                  Bestowed 26 Nov 2026
                </span>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="p-4 rounded-2xl bg-white border border-neutral-300 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search team, leader, or college..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-neutral-200 text-xs font-mono focus:border-[#F47025] focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-neutral-500">Theme:</span>
                  <select
                    value={selectedThemeFilter}
                    onChange={(e) => setSelectedThemeFilter(e.target.value)}
                    className="px-3 py-1.5 rounded-lg border border-neutral-200 text-xs font-mono bg-white focus:outline-none"
                  >
                    <option value="all">All Tracks (5)</option>
                    {SITE_CONFIG.themes.map((th) => (
                      <option key={th.id} value={th.title}>
                        {th.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-neutral-500">Status:</span>
                  <select
                    value={selectedStatusFilter}
                    onChange={(e) => setSelectedStatusFilter(e.target.value)}
                    className="px-3 py-1.5 rounded-lg border border-neutral-200 text-xs font-mono bg-white focus:outline-none"
                  >
                    <option value="all">All Statuses</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Submitted">Submitted</option>
                    <option value="Under Review">Under Review</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Teams Data Table */}
            <div className="rounded-2xl bg-white border border-neutral-300 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono border-collapse">
                  <thead>
                    <tr className="bg-neutral-100 border-b border-neutral-200 text-neutral-700 uppercase tracking-wider text-[11px]">
                      <th className="py-3.5 px-4 font-bold">Team ID & Name</th>
                      <th className="py-3.5 px-4 font-bold">Lead & Contact</th>
                      <th className="py-3.5 px-4 font-bold">College</th>
                      <th className="py-3.5 px-4 font-bold">Track</th>
                      <th className="py-3.5 px-4 font-bold">Status</th>
                      <th className="py-3.5 px-4 font-bold">Score</th>
                      <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {filteredTeams.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-neutral-500">
                          No teams found matching search criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredTeams.map((t) => (
                        <tr key={t.id} className="hover:bg-neutral-50/70 transition-colors">
                          <td className="py-3.5 px-4">
                            <span className="font-bold text-neutral-900 block">{t.name}</span>
                            <span className="text-[10px] text-neutral-500">{t.id} · {t.membersCount} members</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="text-neutral-900 font-semibold block">{t.lead}</span>
                            <span className="text-[10px] text-neutral-500">{t.email}</span>
                          </td>
                          <td className="py-3.5 px-4 font-sans text-xs text-neutral-700 max-w-[200px] truncate" title={t.college}>
                            {t.college}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 border border-neutral-200 text-[10px]">
                              {t.theme}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                              t.status === 'Shortlisted'
                                ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                                : t.status === 'Under Review'
                                ? 'bg-amber-100 text-amber-800 border-amber-300'
                                : 'bg-blue-100 text-blue-800 border-blue-300'
                            }`}>
                              {t.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-bold text-neutral-900">
                            {t.score}/100
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <a
                                href={t.repo}
                                target="_blank"
                                rel="noreferrer"
                                className="p-1.5 rounded-lg border border-neutral-200 hover:border-[#F47025] hover:text-[#F47025] transition-colors"
                                title="Open GitHub"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                              <button
                                onClick={() => onNavigate('/panel')}
                                className="px-2.5 py-1 rounded-lg bg-neutral-900 hover:bg-[#002B66] text-white text-[10px] font-bold uppercase tracking-wider transition-colors"
                              >
                                Grade
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Panel Navigation CTA */}
            <div className="p-6 rounded-2xl bg-neutral-900 text-white flex items-center justify-between">
              <div>
                <h4 className="font-chakra font-bold text-lg uppercase">
                  Technical Jury Evaluation Panel
                </h4>
                <p className="text-xs text-neutral-400 font-sans">
                  Ready to evaluate submissions against the 5 rubric criteria? Open the judge scoring console.
                </p>
              </div>
              <button
                onClick={() => onNavigate('/panel')}
                className="px-5 py-2.5 rounded-xl bg-[#F47025] hover:bg-[#e05e15] text-white font-chakra font-bold text-xs uppercase tracking-wider transition-all"
              >
                Open Reviewer Panel →
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

