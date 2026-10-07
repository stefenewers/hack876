import type { SponsorDeckData } from "./types";

const deck: SponsorDeckData = {
  slug: "supremeventuresfoundation",
  kind: "full",
  sponsor: "Supreme Ventures Foundation",
  short: "SVF",
  article: "the",
  // Elementor global primary colour on supremeventures.com (group site; no separate SVF palette found).
  accent: "#00833E",

  recipient: { name: "Heather Goldson", title: "Executive Director, Supreme Ventures Foundation", ref: 1 },
  preparedFor: "A private partnership proposal prepared for Heather Goldson, Executive Director, Supreme Ventures Foundation.",

  hero: {
    headline: "Junior Creators, grown up and building the future.",
    highlight: "building the future",
    sub: "The Supreme Ventures Foundation has spent ten summers showing young Jamaicans what STEM can be. Hack876 gives secondary students one day to build a working answer to a problem they care about, in teams, with mentors beside them.",
  },

  futurePaths: [
    { icon: "board", label: "Robotics engineer" },
    { icon: "spark", label: "AI builder" },
    { icon: "laptop", label: "Software developer" },
    { icon: "business", label: "Community founder" },
    { icon: "chart", label: "Data analyst" },
  ],

  why: {
    headline: "Imagination, innovation and collaboration, one step further.",
    mission: {
      label: "The Supreme Ventures Foundation",
      quote: "Our mission goes beyond corporate responsibility, it’s about compassion in action, legacy through impact, and standing in the gap for at risk and vulnerable communities.",
      ref: 2,
    },
    points: [
      {
        text: "Heather Goldson on the Junior Creators Robotics Camp: \"When we first conceptualised this camp in 2016, our vision was simple but powerful: to expose young Jamaicans to the exciting world of STEM in a creative environment that encourages imagination, innovation and collaboration.\"",
        ref: 1,
      },
      {
        text: "\"It is a pleasure to see the growth in these children over just five days, and to know that some of them will carry these experiences forward into real careers is exactly the kind of impact we set out to create.\"",
        ref: 1,
      },
      {
        text: "At the 2026 camp, children worked on AI pattern recognition, coding, robotics, sensor-based contraptions and wearable technology, and pitched their ideas.",
        ref: 1,
      },
      {
        text: "Through Supreme Community Heroes, the Foundation backs people already creating change in their communities, with grants, a laptop and business development training.",
        ref: 4,
      },
    ],
    tie: "Hack876 is the next rung: the same spirit of building and pitching, for students old enough to take an idea all the way to a working demo.",
  },

  story: {
    kicker: "What the Foundation already does",
    headline: "A decade of backing young Jamaicans.",
    format: "milestones",
    items: [
      {
        label: "2016",
        text: "The Foundation conceptualises the Junior Creators Robotics Camp to expose young Jamaicans to STEM.",
        ref: 1,
      },
      {
        label: "2021",
        text: "A 20th anniversary scholarship programme sends 20 scholars from State care to university.",
        ref: 3,
      },
      {
        label: "2026",
        text: "The Supreme Community Heroes cohort is named, with project grants and capacity-building training for community entrepreneurs.",
        ref: 4,
      },
      {
        label: "2026",
        text: "The 10th Junior Creators camp, themed \"Build the Future\", ends with educational grants for the top four campers. Two former campers have returned as facilitators.",
        ref: 1,
      },
      {
        label: "2026",
        text: "A $100 million commitment to put 25 youth ageing out of State care through university.",
        ref: 3,
      },
    ],
    takeaway: "The Foundation already rewards young people who build, pitch and grow. Hack876 adds a single day where older students do exactly that, side by side with students from other schools.",
    art: "Seedling",
  },

  paths: [
    {
      label: "Path 1 · The Foundation",
      title: "A Foundation prize grant",
      points: [
        "Fits the Foundation's focus on education and national development",
        "A natural next step for students who grew up with camps like Junior Creators",
        "Recognition in the Foundation's name only",
        "Followed by a short written recap with photos and outcomes",
      ],
    },
    {
      label: "Path 2 · People",
      title: "Time and expertise from the Foundation team",
      points: [
        "Technology and innovation staff as judges or mentors",
        "A short talk on where building things can lead",
        "Volunteers on the day",
      ],
    },
  ],
  pathsNote: {
    text: "The Foundation's focus areas include national development through improved access to education.",
    ref: 2,
  },

  ask: {
    tier: "prize",
    fallback: "food",
    why: "The Foundation already funds educational grants for its top campers, so backing the Hack876 podium is a familiar, contained next step. If a smaller first step fits better, supporting food and the student experience would still mean a great deal.",
    recognition: "Official Prize Partner · Inaugural Hack876",
    award: {
      name: "SVF Build the Future Award (suggestion)",
      text: "One idea: an award for the boldest working prototype, borrowing the 2026 camp theme. We would shape the name and criteria together.",
    },
    tracks: ["Learn", "Business", "Life", "Wildcard"],
  },

  roles: [
    { title: "Judges", text: "Technology and innovation staff on the panel, judging how well a build really works." },
    { title: "Mentors", text: "Foundation people moving between teams on the day, helping students get unstuck." },
    { title: "Speaker", text: "Heather Goldson or a colleague on the road from a first robot to a real career." },
    { title: "Alumni voices", text: "Older Junior Creators alumni sharing what building early meant to them, if the Foundation feels it fits." },
    { title: "Volunteers", text: "A small team helping with check-in, lunch and the demo floor." },
  ],

  groundRules: [
    "No gaming or lottery brands, products, games, odds or promotion anywhere near students, at the venue, in materials or online. Recognition uses the Supreme Ventures Foundation name and logo only.",
    "Many participants are minors. Schools approve all sponsor visuals in advance, and no student contact details or data are shared with sponsors.",
    "Judging stays independent. A sponsored award is decided by the full judging panel against the published criteria.",
  ],

  future: [
    "A recurring Supreme Ventures Foundation award at every edition of Hack876.",
    "A Junior Creators to Hack876 pathway, so camp alumni hear about Hack876 when they reach upper school.",
    "Working with the Foundation and CPFSA to see whether eligible young people in State care could join a future cohort.",
    "A Business-track award in the spirit of Supreme Community Heroes, for builds that serve a community.",
  ],

  questions: [
    "How will the Foundation appear at an event for students under 18, given the group's business?",
    "How is Hack876 different from the Junior Creators camp?",
    "Which schools are confirmed, and are they comfortable with a Foundation partnership?",
    "When and where will it happen?",
    "What exactly will our support pay for, and how will we hear about the results?",
  ],

  closingLine: "We would love to explore the right first step with Heather and the Supreme Ventures Foundation team.",

  sources: [
    {
      id: 1,
      org: "Jamaica Observer",
      label: "Youngsters code, build, and dream at 10th SVF Robotics Camp (August 22, 2026)",
      href: "https://www.jamaicaobserver.com/2026/08/22/youngsters-code-build-dream-10th-svf-robotics-camp/",
    },
    {
      id: 2,
      org: "Supreme Ventures",
      label: "Supreme Ventures Foundation",
      href: "https://supremeventures.com/supreme-ventures-foundation/",
    },
    {
      id: 3,
      org: "Jamaica Observer",
      label: "SVF commits $100 million to send 25 youth from State care through university (September 15, 2026)",
      href: "https://www.jamaicaobserver.com/2026/09/15/svf-commits-100-million-send-25-youth-state-care-university/",
    },
    {
      id: 4,
      org: "Jamaica Gleaner",
      label: "SVF names finalists for 2026 Supreme Heroes cohort (May 23, 2026)",
      href: "https://jamaica-gleaner.com/article/lifestyle/20260522/goodheart-svf-names-finalists-2026-supreme-heroes-cohort",
    },
  ],
};

export default deck;
