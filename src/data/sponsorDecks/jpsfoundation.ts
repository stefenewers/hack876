import type { SponsorDeckData } from "./types";

const deck: SponsorDeckData = {
  slug: "jpsfoundation",
  kind: "full",
  sponsor: "JPS Foundation",
  short: "JPS Foundation",
  article: "the",
  accent: "#0033A1",

  recipient: { name: "Sophia Lewis", title: "Head, JPS Foundation", ref: 1 },
  preparedFor: "A private partnership proposal prepared for Sophia Lewis, Head, JPS Foundation.",

  hero: {
    headline: "Students can be part of something bigger.",
    highlight: "something bigger",
    sub: "The JPS Foundation wants students to dream big about innovation and energy. Hack876 gives secondary students one day to build a working answer to a problem they care about, in teams, with mentors beside them.",
  },

  futurePaths: [
    { icon: "plug", label: "Grid engineer" },
    { icon: "spark", label: "Renewable energy designer" },
    { icon: "chart", label: "Climate data analyst" },
    { icon: "move", label: "Electric vehicle engineer" },
    { icon: "laptop", label: "Software developer" },
  ],

  why: {
    headline: "From awareness to action, one build at a time.",
    mission: {
      label: "The JPS Foundation",
      quote: "We will empower Jamaicans to be good environmental and community development stewards, through volunteerism, STEM Education, and partnership to contribute to a sustainable and prosperous society",
      ref: 2,
    },
    points: [
      {
        text: "Climate resilience, community empowerment and STEM education are the Foundation's three main pillars.",
        ref: 2,
      },
      {
        text: "Sophia Lewis: \"The future of our country depends on a skilled and innovative workforce. By supporting students in technical disciplines, we are helping to build capacity and create opportunities for the next generation.\"",
        ref: 3,
      },
      {
        text: "Sophia Lewis at the 2026 Climate Action Conference and Expo: \"We don't just want you to be aware of the challenges, we want you to be motivated by the solutions.\"",
        ref: 4,
      },
      {
        text: "On the CAPE/STEM workshops: \"They are also able to dream big to know that, although they are students, they can be part of something bigger when it comes to innovation and when it comes to energy management of our nation.\"",
        ref: 5,
      },
      {
        text: "On mentorship: students \"benefit tremendously from having access to people who have already walked the path they are about to undertake.\"",
        ref: 1,
      },
    ],
    tie: "Hack876 is a day where that motivation turns into something students can switch on and show.",
  },

  story: {
    kicker: "What the Foundation already does",
    headline: "A STEM pathway built around young Jamaicans.",
    format: "initiatives",
    items: [
      {
        label: "2026",
        title: "EcoSpark Innovation Challenge",
        text: "Developed with the Environmental Foundation of Jamaica. Power Up Energy Club finalists and other secondary schools competed in Nature-Based Solutions and Grid Resilience categories, for more than $1.2 million in prizes.",
        ref: 6,
      },
      {
        label: "With UWI Mona",
        title: "CAPE/STEM Workshops",
        text: "A J$16 million, five-year partnership. Sixth-formers study subjects including computing, physics and chemistry, and more than 1,200 students took part in 2026.",
        ref: 5,
      },
      {
        label: "2026",
        title: "CSEC Industrial Technology exam fees",
        text: "Fees covered for more than 300 students across 20 high schools. The programme has now helped over 3,700 students.",
        ref: 3,
      },
      {
        label: "2026",
        title: "Power Up Scholarships and Mentorship",
        text: "About $6 million across four categories, with recipients paired with JPS executives for at least three mentoring sessions.",
        ref: 1,
      },
      {
        label: "Since April 2024",
        title: "Power Up Energy Club debates",
        text: "High school Energy Club teams debating climate change and the future of energy over a five-week competition.",
        ref: 2,
      },
      {
        label: "Project eDrive",
        title: "Hands-on electric car builds",
        text: "Primary-aged students built electric cars from robotics kits in sessions hosted with Project eDrive.",
        ref: 2,
      },
    ],
    takeaway: "Workshops, clubs, a pitch challenge and mentors are already in place. Hack876 adds a single day where students build across every kind of problem, side by side with students from other schools.",
    art: "IdeaToRealWorld",
  },

  linkedSchool: {
    school: "St. George's College",
    text: "St. George's College won the People's Choice Award at the 2026 EcoSpark Innovation Challenge for its Rain Garden within a Miniature Sponge City.",
    ref: 6,
  },

  paths: [
    {
      label: "Path 1 · The Foundation",
      title: "A STEM education grant",
      points: [
        "Fits the STEM education and climate resilience pillars",
        "Complements EcoSpark and the Energy Clubs rather than competing with them",
        "A contained, one-day commitment",
        "Followed by a short written recap with photos and outcomes",
      ],
    },
    {
      label: "Path 2 · People",
      title: "Time and expertise from the JPS team",
      points: [
        "Engineers as judges and mentors",
        "A short talk on how energy careers really work",
        "Volunteers on the day",
      ],
    },
  ],
  pathsNote: {
    text: "The Foundation's mission names STEM Education and partnership as two of the ways it works.",
    ref: 2,
  },

  ask: {
    tier: "prize",
    fallback: "special",
    why: "The Foundation already funds student prizes through EcoSpark, so backing the Hack876 podium is a familiar, contained ask. If a smaller first step fits better, a single special award or JPS people on the day would still mean a great deal.",
    recognition: "Official Prize Partner · Inaugural Hack876",
    award: {
      name: "JPS Foundation Power Up Resilience Award (suggestion)",
      text: "One idea: an award for the best Resilience-track build, in the spirit of EcoSpark's Grid Resilience category. Energy, communities and climate solutions would all count. We would shape the name and criteria together.",
    },
    tracks: ["Resilience", "Move", "Learn", "Wildcard"],
  },

  roles: [
    { title: "Judges", text: "JPS engineers on the panel for the Resilience track, judging how well a build would really work." },
    { title: "Mentors", text: "JPS people moving between teams on the day, in the same spirit as the Foundation's Mentorship Programme." },
    { title: "Speaker", text: "Sophia Lewis or a JPS engineer on what a career in energy actually looks like." },
    { title: "Challenge input", text: "A real energy efficiency or community resilience problem teams could choose to take on." },
    { title: "Volunteers", text: "A small JPS team helping with check-in, lunch and the demo floor." },
  ],

  groundRules: [
    "Many participants are minors. There is no marketing aimed at students, and no student contact details or data are shared with sponsors.",
    "Any hardware or electrical build is supervised by a qualified adult, with safe, low-voltage kits only.",
    "Judging stays independent. A sponsored award is decided by the full judging panel against the published criteria.",
  ],

  future: [
    "A recurring JPS Foundation award at every edition of Hack876.",
    "A showcase slot for top Hack876 Resilience builds at a future Climate Action Conference and Expo.",
    "Inviting Power Up Energy Club members from Hack876 schools to apply.",
    "A hands-on energy hardware table, in the spirit of the Foundation's robotics and electric car sessions.",
    "Sharing Power Up Scholarship information with Hack876 finalists heading to university.",
  ],

  questions: [
    "How is Hack876 different from EcoSpark and the Energy Clubs?",
    "When and where will it happen, and which schools are confirmed?",
    "Will students build hardware, and how is that kept safe?",
    "What exactly will our support pay for, and how will we hear about the results?",
    "How are students under 18 kept safe on the day?",
  ],

  closingLine: "We would love to explore the right first step with Sophia and the JPS Foundation team.",

  sources: [
    {
      id: 1,
      org: "Jamaica Gleaner",
      label: "Built For success: Aspiring civil and medical engineer among JPS Foundation scholars (August 22, 2026)",
      href: "https://jamaica-gleaner.com/article/news/20260822/built-success-aspiring-civil-and-medical-engineer-among-jps-foundation",
    },
    {
      id: 2,
      org: "JPS Foundation",
      label: "2024 Annual Report",
      href: "https://www.jpsco.com/wp-content/uploads/2025/09/JPSF_2024-ANNUAL-REPORT_WEB.pdf",
    },
    {
      id: 3,
      org: "Jamaica Observer",
      label: "JPS Foundation covers industrial technology CSEC exam fee for over 300 students (April 23, 2026)",
      href: "https://www.jamaicaobserver.com/2026/04/23/jps-foundation-covers-industrial-technology-csec-exam-fee-300-students/",
    },
    {
      id: 4,
      org: "Jamaica Observer",
      label: "JPS Foundation's climate conference urges youth to drive Jamaica's road to resilience (March 26, 2026)",
      href: "https://www.jamaicaobserver.com/2026/03/26/jps-foundations-climate-conference-urges-youth-drive-jamaicas-road-resilience/",
    },
    {
      id: 5,
      org: "Jamaica Gleaner",
      label: "JPS Foundation, UWI workshop benefits CAPE/STEM students islandwide (January 19, 2026)",
      href: "https://jamaica-gleaner.com/article/news/20260119/jps-foundation-uwi-workshop-benefits-capestem-students-islandwide",
    },
    {
      id: 6,
      org: "Jamaica Gleaner",
      label: "Students, stakeholders drive climate solutions at JPS Expo (March 28, 2026)",
      href: "https://jamaica-gleaner.com/article/news/20260328/students-stakeholders-drive-climate-solutions-jps-expo",
    },
  ],
};

export default deck;
