import type { SponsorDeckData } from "./types";

const deck: SponsorDeckData = {
  slug: "seprodfoundation",
  kind: "full",
  sponsor: "Seprod Foundation",
  short: "Seprod Foundation",
  article: "the",
  accent: "#00642f",

  recipient: { name: "Lisa D'Oyen", title: "Executive Director, Seprod Foundation", ref: 1 },
  preparedFor: "A private partnership proposal prepared for Lisa D'Oyen, Executive Director, Seprod Foundation.",

  hero: {
    headline: "Real-world problems need young builders.",
    highlight: "young builders",
    sub: "The Seprod Foundation wants Jamaican children equipped to solve real-world problems and lead in science and technology. Hack876 gives secondary students one day to do exactly that, in teams, with a working build to show at the end.",
  },

  futurePaths: [
    { icon: "board", label: "Robotics engineer" },
    { icon: "controller", label: "Game designer" },
    { icon: "laptop", label: "Software developer" },
    { icon: "life", label: "Agritech founder" },
    { icon: "resilience", label: "Resilience planner" },
  ],

  why: {
    headline: "Hack876 is the next step after the code and the robots.",
    mission: {
      label: "The Seprod Foundation",
      quote: "The Seprod Foundation is the philanthropic arm of Seprod Group, dedicated to supporting sustainable community development in Jamaica.",
      ref: 2,
    },
    points: [
      {
        text: "STEAM education is one of the Foundation's three pillars, alongside food security and community upliftment.",
        ref: 2,
      },
      {
        text: "Lisa D'Oyen: \"Our goal is to create opportunities for all Jamaican children to thrive in the digital age.\"",
        ref: 1,
      },
      {
        text: "Since WRO came to Jamaica in 2018, the Foundation has been presenting sponsor of what it calls the first Robotics Competition in Jamaica.",
        ref: 3,
      },
      {
        text: "Lisa D'Oyen has called STEM education \"one of the foundation's primary pillars of focus.\"",
        ref: 4,
      },
      {
        text: "Its food security pillar works to grow interest in agriculture at the secondary and tertiary school levels.",
        ref: 2,
      },
    ],
    tie: "Hack876 is where secondary students take those skills and build something real in a single day.",
  },

  story: {
    kicker: "What the Foundation already does",
    headline: "A portfolio built around young people trying things.",
    format: "initiatives",
    items: [
      {
        label: "Since 2018",
        title: "World Robot Olympiad Jamaica",
        text: "Presenting sponsor of WRO Jamaica from its first year, alongside the national organisers.",
        ref: 3,
      },
      {
        label: "2025",
        title: "A free coding challenge",
        text: "Open to grades 4 to 12 at no cost. 297 students took part in Round 1 and 220 advanced to the in-person finals.",
        ref: 1,
      },
      {
        label: "July 2025",
        title: "Robotics Outreach Day",
        text: "About 100 children tried encryption, 3D printing, coding, engineering and robotics, co-sponsored with AFJ.",
        ref: 1,
      },
      {
        label: "Game design",
        title: "Ubisoft Game Creators' Odyssey scholarships",
        text: "75% scholarships for a 90+ hour game design course. Fellows designed games around education, agriculture or community.",
        ref: 5,
      },
      {
        label: "30+ years",
        title: "Scholarships",
        text: "The Foundation has been providing scholarships for over 30 years.",
        ref: 6,
      },
      {
        label: "2026",
        title: "Seaford Town Community Resilience Hub",
        text: "Structural repairs and a solar energy system so the hub can keep serving the community through power cuts and emergencies.",
        ref: 7,
      },
    ],
    takeaway: "Coding, robotics and game design are already in place. Hack876 adds a day where older students put them together to solve a problem they chose.",
    art: "Blueprint",
  },

  paths: [
    {
      label: "Path 1 · The Foundation",
      title: "A STEAM pillar grant",
      points: [
        "Fits the STEAM education pillar directly",
        "A contained, one-day commitment",
        "Underwrites the podium prizes students compete for",
        "Followed by a written recap with photos and outcomes",
      ],
    },
    {
      label: "Path 2 · People",
      title: "Time and expertise from the Seprod team",
      points: [
        "A Foundation judge for impact and real-world value",
        "Mentors from manufacturing, operations or supply chain",
        "Volunteers on the day",
      ],
    },
  ],

  ask: {
    tier: "prize",
    fallback: "special",
    why: "The Foundation already backs youth competitions, so funding the podium is a familiar, contained ask. It puts the Seprod Foundation name on the moment students remember most.",
    recognition: "Official Prize Partner · Inaugural Hack876",
    award: {
      name: "Seprod Foundation Resilience Award (suggestion)",
      text: "One idea: an award for the best Resilience-track build, in the spirit of the Foundation's community resilience work. A food security award would fit just as well. We would shape it together.",
    },
    tracks: ["Resilience", "Learn", "Life", "Wildcard"],
  },

  roles: [
    { title: "Judge", text: "Lisa D'Oyen or a Foundation colleague on the panel, judging for impact and real-world problem solving." },
    { title: "Mentors", text: "Seprod people from manufacturing, logistics or operations helping teams think through how things really get made and moved." },
    { title: "Volunteers", text: "A small team on the day helping with check-in, lunch and the demo floor." },
    { title: "Speaker", text: "A Foundation scholar or programme alumnus sharing what came after their first build." },
    { title: "Challenge input", text: "A real food security or community resilience problem teams could choose to take on." },
  ],

  groundRules: [
    "Many participants are minors. There is no marketing or product sampling aimed at students, and no student contact details are shared with sponsors.",
    "Recognition stays with the Seprod Foundation name. Students are never asked to promote a brand.",
    "Judging stays independent. A sponsored award is decided by the full judging panel against the published criteria.",
  ],

  future: [
    "A recurring Seprod Foundation award at every edition of Hack876.",
    "Hack876 as the secondary-school build day in a STEAM pathway that already runs from coding to robotics.",
    "A food security challenge co-designed with the Foundation's agriculture work.",
    "Bringing in students from communities the Foundation serves outside Kingston as Hack876 grows.",
  ],

  questions: [
    "How is Hack876 different from the competitions we already support?",
    "When and where will it happen, and which schools are confirmed?",
    "What exactly will our money pay for, and how will we hear about the results?",
    "Can students from the communities we work with take part?",
    "Who is running Hack876, and who is judging?",
    "How are students under 18 kept safe on the day?",
  ],

  closingLine: "We would love to explore the right first step with Lisa and the Seprod Foundation team.",

  sources: [
    {
      id: 1,
      org: "Seprod",
      label: "Seprod Foundation and AFJ Deepen Commitment to STEAM Education Through Code Jamaica (August 11, 2025)",
      href: "https://www.seprod.com/seprod-foundation-and-afj-deepen-commitment-to-steam-education-through-code-jamaica/",
    },
    { id: 2, org: "Seprod", label: "Seprod Foundation", href: "https://www.seprod.com/seprod-foundation/" },
    { id: 3, org: "Seprod Foundation", label: "World Robot Olympiad (WRO)", href: "https://seprodfoundation.org/portfolio/world-robot-olympiad-wro/" },
    {
      id: 4,
      org: "Jamaica Observer",
      label: "St Hugh's Prep's 'Robo Swan' team wins Seprod Foundation powered World Robot Olympiad Jamaica competition (April 14, 2024)",
      href: "https://www.jamaicaobserver.com/2024/04/14/st-hughs-preps-robo-swan-team-wins-seprod-foundation-powered-world-robot-olympiad-jamaica-competition/",
    },
    {
      id: 5,
      org: "Seprod Foundation",
      label: "Ubisoft Game Creators' Odyssey: A Video Game Design Course",
      href: "https://seprodfoundation.org/portfolio/ubisoft-game-creators-odyssey-a-video-game-design-course/",
    },
    { id: 6, org: "Seprod Foundation", label: "Home", href: "https://seprodfoundation.org/" },
    {
      id: 7,
      org: "Jamaica Observer",
      label: "Melissa-hit Seaford Town gets resilience boost (July 20, 2026)",
      href: "https://www.jamaicaobserver.com/2026/07/20/melissa-hit-seaford-town-gets-resilience-boost/",
    },
  ],
};

export default deck;
