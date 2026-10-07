import type { SponsorDeckData } from "./types";

const deck: SponsorDeckData = {
  slug: "guardiangroupfoundation",
  kind: "prize",
  sponsor: "Guardian Group Foundation",
  short: "Guardian",
  accent: "#31006f",

  recipient: { name: "Debby Livingstone", title: "Vice President, Corporate Resources, Guardian Life Limited", ref: 1 },
  preparedFor:
    "A private partnership proposal prepared for Debby Livingstone, Vice President, Corporate Resources, Guardian Life Limited, for the Guardian Group Foundation.",

  hero: {
    headline: "Curious is where it starts.",
    highlight: "Curious",
    sub: "Guardian hopes its scholars stay ambitious, curious and committed to excellence. Hack876 gives young Jamaicans one day to be all three, with something real they built to show for it.",
  },

  why: {
    headline: "Innovation and academic development, in one room.",
    mission: {
      label: "Guardian Group, Community Connections",
      quote:
        "We serve and support our communities across the region with specific areas of focus on: Innovation, Leadership Development, Academic Development, Health and Wellness.",
      ref: 2,
    },
    points: [
      {
        text: "In 2026 the Guardian Group Foundation gave a Women in STEM Grant to the St Andrew High School for Girls Robotics Club, for advanced robotics kits and parts and for competition participation.",
        ref: 3,
      },
      {
        text: "Over 20 years, Guardian has invested more than J$70 million in scholarships and grants, supporting more than 200 students.",
        ref: 4,
      },
      {
        text: "Its scholarships reach beyond policyholders and employees, to top national performers and to primary schools in selected communities.",
        ref: 5,
      },
    ],
    tie: "Hack876 is where curious students find out what they can build, and a Guardian award would tell them it was worth the try.",
  },

  story: {
    kicker: "What Guardian already backs",
    headline: "Twenty years of betting on students.",
    format: "evidence",
    items: [
      {
        label: "Women in STEM · 2026",
        title: "Robotics at St Andrew High School for Girls.",
        text: "A J$200,000 grant to the school's Robotics Club for advanced robotics kits and parts, and for competition participation.",
        ref: 3,
      },
      {
        label: "Since 2005",
        title: "A scholarship programme that kept growing.",
        text: "Started in the GSAT era and carried through to PEP, it now supports students at several stages of school.",
        ref: 4,
      },
      {
        label: "20 years",
        title: "More than J$70 million.",
        text: "Invested in scholarships and grants, supporting more than 200 students through their education.",
        ref: 4,
      },
      {
        label: "2026",
        title: "Reaching into communities.",
        text: "Community scholarships go to students from primary schools in selected communities, including Edward Seaga Primary in Denham Town.",
        ref: 5,
      },
    ],
    takeaway: "Guardian already invests in students who are curious about science. Hack876 is one more place for that curiosity to turn into something built.",
    art: "Blueprint",
  },

  linkedSchool: {
    school: "St. Andrew High School for Girls",
    text: "Guardian's 2026 Women in STEM Grant went to the St Andrew High School for Girls Robotics Club. St Andrew is in the Hack876 school network; its participation is not yet confirmed.",
    ref: 3,
  },

  paths: [
    {
      label: "Foundation",
      title: "A Guardian special award",
      points: [
        "Back the special awards, or one award",
        "A proposed Women in STEM award, if it fits",
        "Presented on stage by the Guardian team",
        "Small, specific and easy to report on",
      ],
    },
    {
      label: "People",
      title: "Guardian technologists in the room",
      points: [
        "IT and transformation staff as mentors",
        "A short talk on technology careers in insurance",
        "Help on the day with set check-in windows",
      ],
    },
  ],
  pathsNote: {
    text: "Guardian Group Foundation enquiries go through GuardianGroupFoundation@myguardiangroup.com at Guardian Life Limited, 12 Trafalgar Road, Kingston 5.",
    ref: 6,
  },

  ask: {
    tier: "special",
    fallback: "inkind",
    why: "It is close in size to the Women in STEM Grant Guardian already gives, and it puts a Guardian name on a moment students will remember.",
    recognition: "Special Awards Partner · Inaugural Hack876",
    award: {
      name: "Guardian Women in STEM Award (proposed)",
      text: "A suggestion only: an award for the strongest build from a team where girls led the technical work, with criteria agreed together. It would carry the spirit of the grant Guardian already runs.",
    },
    tracks: ["Wellbeing", "Life", "Learn"],
    inkind: [
      "Mentors from the IT and transformation team",
      "A speaker on technology careers in insurance",
      "Volunteers for check-in and judging logistics",
    ],
  },

  roles: [
    { title: "Mentors", text: "Technologists who help teams get unstuck, without building the project for them." },
    { title: "Award presenters", text: "The Guardian team presents its award on stage at the close." },
    { title: "Speaker", text: "A short, honest talk on what technology work inside an insurer looks like." },
    { title: "Judging support", text: "Guardian staff can advise on the award criteria; the final call sits with the judging panel." },
    { title: "Volunteers", text: "Staff who help with check-in, meals and keeping the day on time." },
  ],

  groundRules: [
    "No marketing of insurance, pensions or other financial products to students, and no sign-ups on the day.",
    "No collection of student contact details or data by sponsors. Photos and names only with school and parent consent.",
    "Sponsor staff mentor and present; the judging panel decides every award.",
  ],

  future: [
    "A recurring Guardian Women in STEM Award at every Hack876.",
    "Introductions between award winners and Guardian's scholarship community.",
    "Girls' robotics clubs Guardian already supports entering as teams.",
    "A Guardian technologist on the mentor bench each year.",
  ],

  questions: [
    "Will St Andrew High School for Girls take part?",
    "How would a Women in STEM award be judged, and who decides?",
    "When and where is it?",
    "What exactly would our contribution pay for?",
    "How are students protected on consent, data and marketing?",
    "How much time would our IT team need to give?",
  ],

  closingLine: "We would love to explore the right first step with Debby and the Guardian Group Foundation team.",

  sources: [
    {
      id: 1,
      org: "Guardian Group",
      label: "Guardian Life Limited: Executive Team",
      href: "https://jamaica.myguardiangroup.com/companies/guardian-life-limited-jamaica::people",
    },
    {
      id: 2,
      org: "Guardian Group",
      label: "Community Connections (CSR vision and focus areas)",
      href: "https://jamaica.myguardiangroup.com/en_BB_community-connections",
    },
    {
      id: 3,
      org: "Jamaica Gleaner",
      label: "Corporate Hands: Guardian Group Foundation makes presentation to St Andrew High School for Girls' Robotics Club (May 21, 2026)",
      href: "https://jamaica-gleaner.com/article/news/20260521/corporate-hands-guardian-group-foundation-makes-presentation-st-andrew-high",
    },
    {
      id: 4,
      org: "Abeng News",
      label: "Guardian Life to celebrate 20 years of investing in Jamaica's young scholars (2026)",
      href: "https://abeng.org/guardian-life-to-celebrate-20-years-of-investing-in-jamaica-s-young-scholars-8de03af",
    },
    {
      id: 5,
      org: "Jamaica Observer",
      label: "PEP star vows to shine at Wolmer's (September 2, 2026)",
      href: "https://www.jamaicaobserver.com/2026/09/02/pep-star-vows-shine-wolmers/",
    },
    {
      id: 6,
      org: "Guardian Runs (Guardian Group Foundation)",
      label: "Contact Us: Guardian Group Foundation & SHINE 5K Secretariat",
      href: "https://run2shineja.com/contact-us/",
    },
  ],
};

export default deck;
