// Central Configuration for CLOCKIT 2026 (JITD)
// Styled & Structured after the HackWithAditya Architecture

export const SITE_CONFIG = {
  name: "CLOCKIT 2026",
  shortName: "CLOCKIT",
  year: "2026",
  edition: "Edition 01",
  orgCode: "JITD",
  universityName: "Jain Institute of Technology, Davanagere",
  universityShort: "JITD",
  location: "Davanagere, Karnataka",
  venue: "JITD Library & Innovation Hub, Davanagere Campus",
  nearestStation: "Davanagere Railway Station (DVG)",
  dates: "25 – 26 November 2026",
  duration: "24 Hours Continuous Sprint",
  datesBadge: "25–26 Nov 2026 · 24 hours · On-site, residential",
  targetDeadline: "2026-11-25T09:00:00+05:30",
  tagline: "Code · Create · Compete · Conquer",
  subTagline: "Great builds start before the hackathon.",
  heroSummary: "A two-level, prototype-based, 24-hour residential hackathon at Jain Institute of Technology, Davanagere. Registration fee: ₹650 per team of 2–4.",
  
  // Stats strip
  stats: {
    themes: "05",
    levels: "02",
    hours: "24",
    prizePool: "₹ 30,000",
    prizePoolFormatted: "30 Thousand INR",
  },

  // Sponsors & Collaboration
  partners: {
    presentedBy: "Jain Institute of Technology, Davanagere",
    inAssociationWith: "JGI (Jain Group of Institutions)",
    inCollaborationWith: "Salutix AI",
  },

  // Level 1 & Level 2 Details
  levels: {
    level1: {
      name: "Level 01",
      title: "Prototype screening",
      fee: "₹650",
      type: "Online Submission",
      bullets: [
        "Submit existing working prototype via GitHub repository & Loom/YouTube video.",
        "Team size: 2 to 4 members from recognized engineering colleges.",
        "5 Screening criteria: Problem Relevance, Prototype Credibility, Technical Feasibility, Clarity & Structure, Originality.",
        "Ownership verification: Short technical viva, commit history review, and similarity check.",
      ],
      cta: "Submit prototype",
      ctaHref: "/register?level=1",
    },
    level2: {
      name: "Level 02",
      title: "Enhancement challenge",
      fee: "₹ 300 per member (Shortlisted only)",
      type: "On-site 24H Grand Finale",
      bullets: [
        "Invite-only for top shortlisted teams passing Level 1 prototype review.",
        "Includes residential AC accommodation, all meals, midnight snacks, and hacker kit.",
        "24-hour on-site build against mandatory real-time enhancements and optional stretch goals.",
        "Live presentation and demo judging before industry jury from Salutix AI.",
      ],
      cta: "Shortlist details",
      ctaHref: "/rules#level2",
    }
  },

  // 01 Themes (5 Tracks)
  themes: [
    {
      id: "theme-01",
      number: "01",
      slug: "theme-01",
      title: "Classified Track 01",
      category: "Confidential Theme · Unseals 25 Nov",
      desc: "Problem statements and challenge briefs are strictly locked under encryption seal until 25 Nov at 10:00 AM.",
      tags: ["Classified", "Locked", "Unlocks 25 Nov"],
      isLocked: true,
      unlockDate: "25 Nov 2026, 10:00 AM",
    },
    {
      id: "theme-02",
      number: "02",
      slug: "theme-02",
      title: "Classified Track 02",
      category: "Confidential Theme · Unseals 25 Nov",
      desc: "Problem statements and challenge briefs are strictly locked under encryption seal until 25 Nov at 10:00 AM.",
      tags: ["Classified", "Locked", "Unlocks 25 Nov"],
      isLocked: true,
      unlockDate: "25 Nov 2026, 10:00 AM",
    },
    {
      id: "theme-03",
      number: "03",
      slug: "theme-03",
      title: "Classified Track 03",
      category: "Confidential Theme · Unseals 25 Nov",
      desc: "Problem statements and challenge briefs are strictly locked under encryption seal until 25 Nov at 10:00 AM.",
      tags: ["Classified", "Locked", "Unlocks 25 Nov"],
      isLocked: true,
      unlockDate: "25 Nov 2026, 10:00 AM",
    },
    {
      id: "theme-04",
      number: "04",
      slug: "theme-04",
      title: "Classified Track 04",
      category: "Confidential Theme · Unseals 25 Nov",
      desc: "Problem statements and challenge briefs are strictly locked under encryption seal until 25 Nov at 10:00 AM.",
      tags: ["Classified", "Locked", "Unlocks 25 Nov"],
      isLocked: true,
      unlockDate: "25 Nov 2026, 10:00 AM",
    },
    {
      id: "theme-05",
      number: "05",
      slug: "theme-05",
      title: "Classified Track 05",
      category: "Confidential Theme · Unseals 25 Nov",
      desc: "Problem statements and challenge briefs are strictly locked under encryption seal until 25 Nov at 10:00 AM.",
      tags: ["Classified", "Locked", "Unlocks 25 Nov"],
      isLocked: true,
      unlockDate: "25 Nov 2026, 10:00 AM",
    }
  ],

  // 03 Important Dates / Timeline
  timelinePhases: [
    {
      phaseName: "PHASE 01: LEVEL 1 (ONLINE PROTOTYPE)",
      events: [
        { date: "01 Nov 2026", title: "Registration & Level 1 Portal Opens", desc: "Submit your team of 2–4 and link your working prototype repository.", deadlineTag: "Open" },
        { date: "20 Nov 2026", title: "Level 1 Submissions Close (11:59 PM IST)", desc: "Strict deadline for prototype links, demo video, and architecture documentation.", deadlineTag: "Key Deadline" },
        { date: "21–22 Nov 2026", title: "Technical Screening & Ownership Viva", desc: "Virtual 10-minute code review and commit history verification by technical evaluators.", deadlineTag: "Review" },
        { date: "23 Nov 2026", title: "Shortlist Announcement", desc: "Selected squads receive official invitations for the On-Campus Grand Finale.", deadlineTag: "Milestone" }
      ]
    },
    {
      phaseName: "PHASE 02: LEVEL 2 PREPARATION",
      events: [
        { date: "23 Nov 2026", title: "Documentation & Travel Confirmation", desc: "Confirm attendance, submit college consent letters, and lock travel plans.", deadlineTag: "Action Required" },
        { date: "24 Nov 2026", title: "Baseline Code Freeze & Mentor Briefing", desc: "Virtual orientation on Level 2 mandatory enhancements and API credentials.", deadlineTag: "Freeze" }
      ]
    },
    {
      phaseName: "PHASE 03: THE 24H RESIDENTIAL SPRINT",
      events: [
        { date: "25 Nov 2026 (09:00 AM)", title: "Arrival, Check-in & Hardware Setup", desc: "Report to JITD Library, collect physical guild pass & hacker kit.", deadlineTag: "Check-in" },
        { date: "25 Nov 2026 (11:30 AM)", title: "CLOCKIT 24H Sprint Commences", desc: "Repositories unsealed. 24-hour countdown clock starts ticking.", deadlineTag: "Sprint Start" },
        { date: "26 Nov 2026 (11:30 AM)", title: "Final Code Freeze & Demo Submissions", desc: "All repository commits locked. Prepare for live evaluation pitches.", deadlineTag: "Code Freeze" },
        { date: "26 Nov 2026 (02:30 PM)", title: "Grand Valedictory & Cash Prize Bestowal", desc: "Jury results declared; ₹30,000 cash prizes, trophies, and internship offers awarded.", deadlineTag: "Awards" }
      ]
    }
  ],

  // 04 What You Get (Inclusions)
  inclusions: [
    {
      title: "Stay & Meals",
      icon: "Bed",
      desc: "Clean residential campus accommodation, hot meals, late-night tea/coffee, and midnight snack counters inside the build arena."
    },
    {
      title: "Hacker Event Kit",
      icon: "Package",
      desc: "Official CLOCKIT 2026 T-shirt, personalized guild badge, stickers, NFC access tag, and commemorative hackathon journal."
    },
    {
      title: "Accredited Certificate",
      icon: "Award",
      desc: "Nationally recognized Certificate of Participation endorsed by JITD & Salutix AI, with category distinction for finalists."
    },
    {
      title: "1:1 Industry Mentorship",
      icon: "Users",
      desc: "Direct architectural reviews and pitch practice with senior AI architects, engineering leads, and startup founders."
    }
  ],

  // 05 Prizes Breakdown
  prizes: {
    total: "₹ 30,000",
    podium: [
      {
        place: "1st",
        category: "Grand Overall Champion",
        amount: "₹ 15,000",
        perks: "Champion Trophy + Direct Salutix AI Fast-Track Internship + Certificate",
        color: "#F6A43A"
      },
      {
        place: "2nd",
        category: "1st Runner-Up (Strongest Engineering)",
        amount: "₹ 10,000",
        perks: "Silver Trophy + Salutix AI Tech Mentorship + Certificate",
        color: "#8BC9ED"
      },
      {
        place: "3rd",
        category: "2nd Runner-Up (Best User Impact)",
        amount: "₹ 5,000",
        perks: "Bronze Trophy + Swag Kit + Certificate",
        color: "#FF7138"
      }
    ],
    funAwards: [
      "Best Team Name",
      "Night Owl Hacker",
      "Best Bug Story",
      "Team Spirit",
      "Best Clean Code",
      "Community Choice"
    ]
  },

  // 06 Startups & Careers
  startupsCareers: {
    heading: "Meet the room. Find your next move.",
    disclaimer: "Opportunities to connect, demo, and learn with founders and engineers — not a contractual promise of employment.",
    featured: {
      title: "Startup Discovery Walk",
      time: "Day 02 · 12:30 PM",
      desc: "A 45-minute interactive showcase where shortlisted teams pitch directly to founders, technical directors, and technology scouts."
    },
    cards: [
      { title: "Hiring & Mentoring Partners Wall", desc: "Discover active internship openings, remote software roles, and open-source bounties posted by partner firms." },
      { title: "Roles Board", desc: "Drop your GitHub profile and resume directly into the shared talent database accessible to startup CTOs." },
      { title: "Reverse Pitches", desc: "Partner engineers take the stage for 3 minutes to pitch the difficult open engineering bottlenecks they are trying to solve." },
      { title: "Startup Talent Walk", desc: "Direct informal networking with early-stage builders looking for high-ownership founding engineers." }
    ]
  },

  // 07 Community / Weekend Off The Clock
  community: {
    heading: "The weekend, off the clock.",
    tagline: "24H build hall open · 100% optional · 0 scoring impact",
    columns: [
      {
        category: "ANYTIME",
        items: [
          { title: "Hackathon Bingo", desc: "Cross off funny hackathon occurrences to win instant spot stickers." },
          { title: "QR Quest", desc: "Scattered QR puzzle clues hidden across the library tech stacks." },
          { title: "Chill & Gaming Zone", desc: "Recharge with retro games, foosball, and quiet bean-bag pods." }
        ]
      },
      {
        category: "CHALLENGES",
        items: [
          { title: "Rubber Duck Challenge", desc: "Explain your hardest architectural bug to a yellow rubber duck." },
          { title: "Debug Relay", desc: "A lightning 15-minute speed code fixing relay for spot prizes." },
          { title: "Mentors vs Students Quiz", desc: "Fast-paced trivia showdown on obscure tech history and memes." }
        ]
      },
      {
        category: "AFTER DARK",
        items: [
          { title: "Open Mic & Acoustics", desc: "Show off guitar, poetry, or stand-up comedy when your build is compiling." },
          { title: "Midnight Maggi & Coffee", desc: "Steaming hot midnight noodles and freshly brewed filter coffee." },
          { title: "Stargazing Lawn Walk", desc: "Clear your head on the quiet campus courtyard under the stars." }
        ]
      }
    ]
  },

  // 09 Venue & Travel (Boarding Pass Card)
  venueTravel: {
    from: "Davanagere Railway Station (DVG)",
    to: "Jain Institute of Technology, Davanagere",
    distance: "Approx. 4.5 km (10-15 mins drive)",
    shuttle: "Shuttle bus service runs between Davanagere Station and JITD Campus every hour on 25 Nov morning.",
    address: "Jain Institute of Technology, Davanagere – 577003, Karnataka, India",
    passCode: "CLOCKIT-2026-CAMPUS-PASS",
    googleMapQuery: "Jain+Institute+of+Technology+Davanagere",
  },

  // 10 FAQ (8 Accordion Questions)
  faqs: [
    {
      q: "Who can participate in CLOCKIT 2026?",
      a: "The hackathon is open to undergraduate and graduate engineering and technology students across India. Both beginner and experienced builders are encouraged to apply."
    },
    {
      q: "What is the squad/team size?",
      a: "Teams must consist of 2 to 4 members. Inter-college and inter-departmental teams are fully permitted and welcomed."
    },
    {
      q: "What are Level 1 and Level 2?",
      a: "Level 1 is an online prototype screening phase where you submit an existing working prototype. Shortlisted squads advance to Level 2: a 24-hour on-campus residential hackathon to build feature enhancements."
    },
    {
      q: "What is the registration fee?",
      a: "Registration fee is ₹650 per team of 2–4 members. Shortlisted teams attending Level 2 on campus receive accommodation, food, kit, and certificates."
    },
    {
      q: "Is the final event online or in person?",
      a: "Level 2 is strictly in-person at the JITD Library & Innovation Hub, Davanagere Campus. All members of the shortlisted team must be physically present."
    },
    {
      q: "What is included with Level 2 on-campus attendance?",
      a: "Your Level 2 pass includes campus hostel accommodation, 4 hot meals + midnight coffee sprints, an official hacker kit (T-shirt, badge, stickers), WiFi provisioning, and accredited certificates."
    },
    {
      q: "Can we use AI tools, APIs, and open-source libraries?",
      a: "Yes! Modern AI assistants, APIs (Gemini, Claude, OpenAI), open-source frameworks, and boilerplates are permitted. However, pre-built complete turnkey projects are strictly prohibited; work must demonstrate fresh on-site enhancements."
    },
    {
      q: "How do we reach the venue from Davanagere Station?",
      a: "Complimentary JITD shuttle buses will pick up participants from Davanagere Railway Station on the morning of 25 November. Auto-rickshaws and cabs are also readily available."
    }
  ],

  // Help Desk Contacts (Direct tap-to-call)
  helpDesk: [
    { name: "Jayesh Suthar", role: "Student Coordinator", phone: "+91 63617 47047", raw: "6361747047" },
    { name: "Arpit Patil", role: "Student Coordinator", phone: "+91 99459 85494", raw: "9945985494" },
    { name: "Kishore K.", role: "Student Coordinator", phone: "+91 96630 84464", raw: "9663084464" },
    { name: "Mrs. Archana K.N.", role: "Faculty Coordinator", phone: "+91 63634 97831", raw: "6363497831" },
    { name: "Ms. Vaishnavi C.S.", role: "Faculty Coordinator", phone: "+91 63625 99025", raw: "6362599025" },
    { name: "Mr. Pavan Kumar T.H.", role: "Faculty Coordinator", phone: "+91 77952 94984", raw: "7795294984" },
  ],

  // Advisory Committee & Leadership
  advisoryCommittee: {
    departmentLeaders: [
      { department: "Computer Science & Engineering", hod: "Dr. Latha B.M.", role: "Organizer (Dept of CS&E)" },
      { department: "Information Science & Engineering", hod: "Dr. H.S. Saraswathi", role: "Organizer (Dept of IS&E)" },
      { department: "Artificial Intelligence & Machine Learning", hod: "Dr. Azizkhan F. Pathan", role: "Organizer (Dept of AI&ML)" }
    ],
    facultyCoordinators: [
      { name: "Mrs. Archana K.N.", role: "Faculty Coordinator", phone: "+91 63634 97831", raw: "6363497831" },
      { name: "Ms. Vaishnavi C.S.", role: "Faculty Coordinator", phone: "+91 63625 99025", raw: "6362599025" },
      { name: "Mr. Pavan Kumar T.H.", role: "Faculty Coordinator", phone: "+91 77952 94984", raw: "7795294984" }
    ],
    studentCoordinators: [
      { name: "Jayesh Suthar", role: "Student Coordinator", phone: "+91 63617 47047", raw: "6361747047" },
      { name: "Arpit Patil", role: "Student Coordinator", phone: "+91 99459 85494", raw: "9945985494" },
      { name: "Kishore K.", role: "Student Coordinator", phone: "+91 96630 84464", raw: "9663084464" }
    ]
  }
};

