import type { SponsorDeckData } from "./types";

const deck: SponsorDeckData = {
  slug: "sagicorfoundation",
  kind: "prize",
  sponsor: "Sagicor Foundation Jamaica",
  short: "Sagicor Foundation",
  article: "the",
  accent: "#00A9E0",
  recipient: {
    name: "Nicole Campbell Robinson",
    title: "Vice-President, Communications, Social Media and Corporate Social Responsibility, Sagicor Group Jamaica",
    ref: 1,
  },
  preparedFor: "A private partnership proposal prepared for Nicole Campbell Robinson, Vice-President, Communications, Social Media and Corporate Social Responsibility, Sagicor Group Jamaica, for Sagicor Foundation Jamaica.",
  hero: {
    headline: "Where Jamaica's next innovators start.",
    highlight: "innovators",
    sub: "Sagicor already rewards young people who use technology to drive positive change. Hack876 gives secondary-school students one day to try it for the first time.",
  },
  brief: {
    fit: "Since 2024 the Sagicor Foundation's Chairman's Innovation Award has recognised tertiary scholars who use technology to drive positive change.",
    request: "A Bronze contribution toward the student programme and an existing special award.",
    enables: "Helps support mentoring and judging on the day, and one of the three special awards students compete for.",
    outcome: "Bronze recognition, and a written recap of who took part and what they built.",
    next: "A reply on whether the Foundation would consider this, and how it prefers to receive a request.",
  },
  why: {
    headline: "Education, innovation and youth, in one room.",
    mission: {
      label: "Christopher Zacca, Chairman, Sagicor Foundation Jamaica (2026)",
      quote: "Sagicor Foundation Jamaica stands firmly on its mandate to be a key player in the drive to improve the lives of our youth and provide pathways through which each young person can access quality education.",
      ref: 1,
    },
    points: [
      {
        text: "Since 2024, the Chairman's Innovation Award has recognised a tertiary scholar for creativity and originality, particularly in using technology to drive positive change.",
        ref: 2,
      },
      {
        text: "The 2025 Chairman's Innovation Award went to iLern AI, an AI-powered tutoring app built by a Northern Caribbean University student.",
        ref: 3,
      },
      {
        text: "In 2026 the Foundation awarded J$27.8 million in scholarships, grants and renewals, across fields that include engineering and technology.",
        ref: 1,
      },
      { text: "Sagicor scholars commit to at least 40 hours of volunteer service each year.", ref: 2 },
      {
        text: "In October 2026 a J$25 million Sagicor Foundation investment restored the Hope Brooks Painting Studio at Edna Manley College.",
        ref: 4,
      },
    ],
    tie: "Hack876 is where a secondary-school student builds a first idea with technology, years before anyone hands them an innovation award.",
  },
  story: {
    kicker: "What the Sagicor Foundation already backs",
    headline: "Rewarding young people who build.",
    format: "milestones",
    items: [
      {
        label: "2024",
        title: "The Chairman's Innovation Award begins.",
        text: "A new award for scholars who develop new ideas, processes or products, particularly with technology that drives positive change.",
        ref: 2,
      },
      {
        label: "2025",
        title: "An AI tutor wins.",
        text: "The Chairman's Innovation Award goes to iLern AI, an AI-powered tutoring app, in the year 55 scholarships marked the Foundation's 55th anniversary.",
        ref: 3,
      },
      {
        label: "2026",
        title: "J$27.8 million for students.",
        text: "44 new scholarships, grants and special awards, plus 131 renewals, chosen from about 1,400 applicants.",
        ref: 1,
      },
      {
        label: "2026",
        title: "A J$500,000 innovation award.",
        text: "The Chairman's Innovation Award supports a UWI law student's education and a vision for equitable change.",
        ref: 5,
      },
      {
        label: "2026",
        title: "A studio restored.",
        text: "J$25 million from SIGMA Corporate Run proceeds restored the Hope Brooks Painting Studio at Edna Manley College.",
        ref: 4,
      },
    ],
    takeaway: "Sagicor already celebrates young Jamaicans who turn technology into change. Hack876 is where many of them could take the very first step.",
  },
  ask: {
    lead: "band",
    band: "bronze",
    uses: ["awards", "programming"],
    why: "It supports secondary-school students at the stage before the Chairman's Innovation Award, and it is a small, clear commitment that is easy to report on.",
    recognition: "Bronze Partner · Inaugural Hack876",
    tracks: ["Learn", "Wellbeing", "Culture"],
  },
  groundRules: [
    "No marketing of insurance, pensions, investments or other financial products to students, and no sign-ups on the day.",
    "No collection of student contact details or data by sponsors. Photos and names only with school and parent consent.",
  ],
  future: ["A Wellbeing challenge shaped with input from Sagicor's people."],
  closingLine: "We would love to explore the right first step with Nicole and the Sagicor Foundation team.",
  sources: [
    {
      id: 1,
      org: "Jamaica Observer",
      label: "Sagicor Foundation shells out $27.8m in scholarships and grants to Jamaican students (August 21, 2026)",
      href: "https://www.jamaicaobserver.com/2026/08/21/sagicor-foundation-shells-27-8m-scholarships-grants-jamaican-students/",
    },
    {
      id: 2,
      org: "Our Today",
      label: "Sagicor Foundation awards $8 million in scholarships (August 2024; Chairman's Innovation Award launched)",
      href: "https://our.today/sagicor-foundation-awards-8-million-in-scholarships/",
    },
    {
      id: 3,
      org: "Jamaica Observer",
      label: "Sagicor Foundation awards over $10 million in scholarships (August 12, 2025)",
      href: "https://www.jamaicaobserver.com/2025/08/12/sagicor-foundation-awards-10-million-scholarships/",
    },
    {
      id: 4,
      org: "Jamaica Gleaner",
      label: "Hope restored: Sagicor Foundation $25-m investment restores painting studio at Edna Manley College (October 1, 2026)",
      href: "https://jamaica-gleaner.com/article/news/20261001/hope-restored",
    },
    {
      id: 5,
      org: "Jamaica Gleaner",
      label: "Backing big dreams (August 20, 2026; Chairman's Innovation Award)",
      href: "https://jamaica-gleaner.com/article/news/20260820/backing-big-dreams",
    },
  ],
};

export default deck;
