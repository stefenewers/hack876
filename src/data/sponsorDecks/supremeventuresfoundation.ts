import type { SponsorDeckData } from "./types";

const deck: SponsorDeckData = {
  slug: "supremeventuresfoundation",
  kind: "full",
  sponsor: "Supreme Ventures Foundation",
  short: "SVF",
  article: "the",
  accent: "#00833E",
  recipient: {
    name: "Heather Goldson",
    title: "Executive Director, Supreme Ventures Foundation",
    ref: 1,
  },
  preparedFor: "A private partnership proposal prepared for Heather Goldson, Executive Director, Supreme Ventures Foundation.",
  hero: {
    headline: "Junior Creators, grown up and building the future.",
    highlight: "building the future",
    sub: "The Supreme Ventures Foundation has spent ten summers showing young Jamaicans what STEM can be. Hack876 gives secondary students one day to build a working answer to a problem they care about, in teams, with mentors beside them.",
  },
  brief: {
    fit: "The Supreme Ventures Foundation has run its Junior Creators STEM summer camp for ten years, and funds educational grants for its top campers.",
    request: "A Gold contribution toward the prizes, student meals and the student programme.",
    enables: "Helps support the prizes for the top teams, meals on the day, and mentoring.",
    outcome: "Secondary-school students get a day of taking an idea to a working demo, the step after a camp like Junior Creators. The Foundation receives Gold recognition and a written recap.",
    next: "A reply on whether the Foundation would consider a contribution this year, at Gold or any other level.",
  },
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
      { label: "2016", text: "The Foundation conceptualises the Junior Creators Robotics Camp to expose young Jamaicans to STEM.", ref: 1 },
      { label: "2021", text: "A 20th anniversary scholarship programme sends 20 scholars from State care to university.", ref: 3 },
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
      { label: "2026", text: "A $100 million commitment to put 25 youth ageing out of State care through university.", ref: 3 },
    ],
    takeaway: "The Foundation already rewards young people who build, pitch and grow. Hack876 adds a single day where older students do exactly that, side by side with students from other schools.",
  },
  pathsNote: {
    text: "The Foundation's focus areas include national development through improved access to education.",
    ref: 2,
  },
  ask: {
    lead: "band",
    band: "gold",
    uses: ["prizes", "meals", "programming"],
    why: "The Foundation already funds educational grants for its top campers, so contributing toward the Hack876 prizes is a familiar, contained next step. If a smaller first step fits better, supporting food and the student experience would still mean a great deal.",
    recognition: "Gold Partner · Inaugural Hack876",
    tracks: ["Learn", "Business", "Life", "Wildcard"],
  },
  groundRules: [
    "No gaming or lottery brands, products, games, odds or promotion anywhere near students, at the venue, in materials or online. Recognition uses the Supreme Ventures Foundation name and logo only.",
    "Many participants are minors. Schools approve all sponsor visuals in advance, and no student contact details or data are shared with sponsors.",
    "Judging stays independent. A sponsored award is decided by the full judging panel against the published criteria.",
  ],
  future: [
    "A Junior Creators to Hack876 pathway, so camp alumni hear about Hack876 when they reach upper school.",
    "Working with the Foundation and CPFSA to see whether eligible young people in State care could join a future cohort.",
  ],
  closingLine: "We would love to explore the right first step with Heather and the Supreme Ventures Foundation team.",
  sources: [
    {
      id: 1,
      org: "Jamaica Observer",
      label: "Youngsters code, build, and dream at 10th SVF Robotics Camp (August 22, 2026)",
      href: "https://www.jamaicaobserver.com/2026/08/22/youngsters-code-build-dream-10th-svf-robotics-camp/",
    },
    { id: 2, org: "Supreme Ventures", label: "Supreme Ventures Foundation", href: "https://supremeventures.com/supreme-ventures-foundation/" },
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
