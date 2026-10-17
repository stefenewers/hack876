import type { SponsorDeckData } from "./types";

const deck: SponsorDeckData = {
  slug: "jnfoundation",
  kind: "prize",
  sponsor: "JN Foundation",
  short: "JN Foundation",
  article: "the",
  accent: "#004B91",
  recipient: {
    name: "Claudine Allen",
    title: "General Manager, JN Foundation",
    ref: 1,
  },
  preparedFor: "A private partnership proposal prepared for Claudine Allen, General Manager, JN Foundation.",
  hero: {
    headline: "Innovation is a must. Let's start it early.",
    highlight: "Innovation",
    sub: "The JN Foundation names innovation as a guiding principle. Hack876 gives secondary-school students one day to build their first idea.",
  },
  brief: {
    fit: "The JN Foundation names innovation as a guiding principle and runs youth and education programmes.",
    request: "A Bronze contribution toward the student programme and an existing special award.",
    enables: "Helps support mentoring and judging on the day, and one of the three special awards students compete for.",
    outcome: "Bronze recognition, and a written recap of who took part and what they built.",
    next: "A reply on whether the Foundation would consider this, and whether Youth and Education Programmes is the right team.",
  },
  why: {
    headline: "Youth, education and innovation, in one room.",
    mission: {
      label: "JN Foundation mission",
      quote: "The JN Foundation works with internal and external partners to identify, develop and provide technical and financial support to projects and programmes that focus on issues relating to rural development, health, housing, education, youth, community, crime and safety.",
      ref: 2,
    },
    points: [
      {
        text: "\"Innovation is a must\" is one of the JN Foundation's four guiding principles, and its mantra begins \"Innovating, Inspiring, Impacting\".",
        ref: 2,
      },
      {
        text: "In 2023, the \"Building Future FinTech Innovators: Skills for Life\" camp drew about 300 participants and focused on \"careers and other opportunities in tech\".",
        ref: 3,
      },
      {
        text: "Science Genius Jamaica, with Columbia University's Professor Christopher Emdin, used dancehall to get high-school students and teachers excited about science.",
        ref: 4,
      },
      {
        text: "The JN scholarship programme began 43 years ago and now adds summer camps, leadership workshops and a new mentorship programme.",
        ref: 5,
      },
      {
        text: "In September 2026, young Jamaicans spent time with JN Group professionals, including Information Technology staff, alongside the US-based Valda Mae Care Foundation.",
        ref: 6,
      },
    ],
    tie: "Hack876 is where a secondary-school student first turns an idea into something that works, with technology and a team beside them.",
  },
  story: {
    kicker: "What the JN Foundation already backs",
    headline: "Young people, culture and tech.",
    format: "initiatives",
    items: [
      {
        label: "Culture meets STEM",
        title: "Science Genius Jamaica",
        text: "Dancehall lyric-writing as a way into high-school science, ending in the B.A.T.T.L.E.S. finals in July 2017.",
        ref: 4,
      },
      {
        label: "Tech careers",
        title: "Building Future FinTech Innovators",
        text: "A 2023 camp of about 300 participants, with speakers from Microsoft, JN Bank and JN Group cyber security.",
        ref: 3,
      },
      {
        label: "43 years",
        title: "JN Scholars",
        text: "Scholarships plus summer camps, leadership and financial literacy workshops, and a new mentorship programme.",
        ref: 5,
      },
      {
        label: "2026",
        title: "NextGen leaders at JN",
        text: "Young people met JN Group CEO Earl Jarrett and teams across the Group, from IT to Business Strategy.",
        ref: 6,
      },
    ],
    takeaway: "The JN Foundation already brings culture, technology and careers to young Jamaicans. Hack876 is a place for them to build.",
  },
  pathsNote: {
    text: "Sydoney Preddie leads Youth and Education Programmes at the JN Foundation, and would be a natural colleague to include.",
    ref: 7,
  },
  ask: {
    lead: "band",
    band: "bronze",
    uses: ["awards", "programming"],
    why: "It turns \"Innovation is a must\" into a day of practice for students, and it is a small, clear commitment that is easy to report on.",
    recognition: "Bronze Partner · Inaugural Hack876",
    tracks: ["Create & Hustle", "Learn", "Resilience"],
  },
  groundRules: [
    "No marketing of bank accounts, loans, insurance or other financial products to students, and no sign-ups on the day.",
    "No collection of student contact details or data by sponsors. Photos and names only with school and parent consent.",
  ],
  future: ["A Hack876-style challenge inside the JN Scholars summer camp.", "A Culture and code challenge in the spirit of Science Genius Jamaica."],
  closingLine: "We would love to explore the right first step with Claudine and the JN Foundation team.",
  sources: [
    { id: 1, org: "JN Foundation", label: "Claudine Allen, General Manager (profile)", href: "https://www.jnfoundation.com/claudine-allen/" },
    { id: 2, org: "JN Foundation", label: "About Us (mission, vision, guiding principles, mantra)", href: "https://www.jnfoundation.com/about-us/" },
    {
      id: 3,
      org: "JN Foundation",
      label: "AI in Fintech Can Address Financial Inclusion, Claudine Allen (August 14, 2023)",
      href: "https://www.jnfoundation.com/ai-in-fintech-can-address-financial-inclusion-claudine-allen/",
    },
    { id: 4, org: "JN Foundation", label: "Science Genius Jamaica", href: "https://www.jnfoundation.com/science-genius-jamaica/" },
    {
      id: 5,
      org: "JN Foundation",
      label: "JN Foundation Opens Applications for 2026 PEP Scholarships and Grants (July 13, 2026)",
      href: "https://www.jnfoundation.com/jn-foundation-opens-applications-for-2026-pep-scholarships-and-grants/",
    },
    {
      id: 6,
      org: "JN Foundation",
      label: "NextGen Leaders Gain Firsthand Lessons from JN Group Professionals (September 30, 2026)",
      href: "https://www.jnfoundation.com/nextgen-leaders-gain-firsthand-lessons-from-jn-group-professionals/",
    },
    { id: 7, org: "JN Foundation", label: "Our Team", href: "https://www.jnfoundation.com/our-team/" },
  ],
};

export default deck;
