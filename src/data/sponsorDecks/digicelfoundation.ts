import type { SponsorDeckData } from "./types";

const deck: SponsorDeckData = {
  slug: "digicelfoundation",
  kind: "full",
  sponsor: "Digicel Foundation",
  short: "Digicel Foundation",
  article: "the",
  accent: "#e4022b",

  recipient: { name: "Charmaine Daniels", title: "Chief Executive Officer, Digicel Foundation", ref: 1 },
  preparedFor:
    "A private partnership proposal prepared for Charmaine Daniels, Chief Executive Officer, Digicel Foundation.",

  hero: {
    headline: "Every child deserves a turn at building the future.",
    highlight: "building the future",
    sub: "The Digicel Foundation believes every child deserves access to technology and the future it brings. Hack876 gives students one day to take that technology and build something of their own.",
  },

  futurePaths: [
    { icon: "laptop", label: "Software developer" },
    { icon: "plug", label: "Network engineer" },
    { icon: "badge", label: "Cybersecurity analyst" },
    { icon: "spark", label: "AI builder" },
    { icon: "rocket", label: "Founder" },
  ],

  why: {
    headline: "You open the lab doors. We give students a reason to stay and build.",
    mission: {
      label: "Digicel Foundation mission",
      quote:
        "We aim to mobilise and distribute resources across Jamaican communities to improve education at the early childhood, primary, secondary, and tertiary levels, increase access and opportunities for persons with special needs, and stimulate sustainable entrepreneurial activity.",
      ref: 1,
    },
    points: [
      {
        text: "One of the Foundation's goals is To Build Minds: improving literacy and access to technology in schools across Jamaica.",
        ref: 1,
      },
      {
        text: "Its Girls in ICT work aims to narrow the technology gender gap. In May 2026 it hosted a full-day AI hackathon for girls from Denham Town and Tivoli Gardens high schools.",
        ref: 2,
      },
      {
        text: "In April 2026 it sponsored an AI hackathon for secondary-school girls across western Jamaica, themed AI for Development: Girls Shaping the Digital Future.",
        ref: 3,
      },
      {
        text: "Opening a Smart Lab at the NAZ Children Centre, Charmaine Daniels said the Foundation believes digital inclusion is a right.",
        ref: 4,
      },
      {
        text: "It has brought Smart Labs to teachers' colleges, because, in her words, every doctor, engineer or scientist begins with a teacher who believed in them.",
        ref: 5,
      },
    ],
    tie: "Hack876 is a place where that access turns into something a student made with their own hands.",
  },

  story: {
    kicker: "The record",
    headline: "Two decades of putting technology in students' hands.",
    format: "evidence",
    items: [
      {
        label: "Since 2004",
        title: "US$51.6 million. 1,750 projects.",
        text: "Invested across education, community development and special needs, with 889,381 lives impacted.",
        ref: 1,
      },
      {
        label: "Smart Labs",
        title: "28 labs and counting.",
        text: "Smart Labs established in schools and institutions, alongside 34,030 students reached through the Safer Internet Together programme.",
        ref: 1,
      },
      {
        label: "2025 to 2026",
        title: "Labs for the people who teach.",
        text: "Five Smart Labs at teacher training colleges and four in special-needs institutions, plus more than 100 young Jamaicans in a digital technology and coding programme.",
        ref: 6,
      },
      {
        label: "Girls in ICT · 2026",
        title: "A full day of AI, built by girls.",
        text: "Girls from Denham Town and Tivoli Gardens high schools spent a day applying AI to climate challenges, mentored by engineer and board director Antoinette Heirs.",
        ref: 2,
      },
      {
        label: "Summer 2025",
        title: "Hands-on STEM over the holidays.",
        text: "Support for the Captain Altitude Aviation Summer Camp and the STEM Builders Learning Hub STEAM Camp.",
        ref: 7,
      },
    ],
    takeaway: "The Foundation already builds the rooms and runs the days. Hack876 adds a place where students from many schools build side by side.",
    art: "IdeaToRealWorld",
  },

  paths: [
    {
      label: "Path 1 · The Foundation",
      title: "A direct partnership with the Digicel Foundation",
      points: [
        "Fits the To Build Minds goal: technology and learning in schools.",
        "One gift that covers the day itself, not a long programme.",
        "Recognition for the Foundation, not Digicel products.",
        "Reported back in students, schools and working builds.",
      ],
    },
    {
      label: "Path 2 · Girls in ICT",
      title: "An extension of the Foundation's Girls in ICT work",
      points: [
        "A suggested award that carries Girls in ICT into a mixed, multi-school build day.",
        "Complements the Foundation's own girls' hackathons rather than repeating them.",
        "Board and staff mentors on the floor alongside the students.",
      ],
    },
  ],
  pathsNote: {
    text: "The Foundation's formal grant calls open in set windows for community groups, schools and non-profits. We are asking directly because Hack876 is a single day, but we are happy to follow whichever route suits the Foundation.",
    ref: 8,
  },

  ask: {
    tier: "gold",
    fallback: "prize",
    why: "Gold is flexible: it covers prizes, food and the day itself in one gift. If an itemised gift fits the Foundation better this year, the Prize Partner tier is a clean alternative.",
    recognition: "Founding Gold Partner · Inaugural Hack876",
    award: {
      name: "Digicel Foundation Girls in ICT Award (suggested)",
      text: "A suggested award for the strongest build from a team where girls lead the technical work, carrying the Foundation's Girls in ICT commitment into Hack876.",
    },
    tracks: ["Learn", "Wellbeing", "Resilience", "Move"],
  },

  roles: [
    { title: "Staff on the floor", text: "A few Digicel Foundation and Digicel volunteers to help with check-in, timekeeping and keeping teams moving." },
    { title: "Judges", text: "People from Digicel's network, cybersecurity and digital teams to judge alongside our panel." },
    { title: "Mentors who have done it", text: "Engineers such as board director Antoinette Heirs, who already mentors girls on ICT careers, if they are willing." },
    { title: "A word to open the day", text: "Charmaine Daniels or someone from the Foundation on why access to technology matters for every student." },
    { title: "Safer internet, in a minute", text: "A short, practical safer-internet moment drawn from the Safer Internet Together programme." },
  ],

  groundRules: [
    "No phones, SIMs, data plans or other Digicel products or offers are marketed to students. Many participants are minors.",
    "No student data, phone numbers or contact details are collected or shared for the Foundation or Digicel. Any recap uses group numbers and school-approved photos only.",
    "Volunteers, mentors and judges work in open, supervised spaces under the host school's safeguarding rules.",
  ],

  future: [
    "A Girls in ICT award that returns each year.",
    "Teams from Smart Lab schools joining Hack876 as it grows.",
    "Safer Internet Together sessions in participating schools before the day.",
    "Student teachers from Smart Lab colleges volunteering as mentors.",
    "A signpost from Hack876 to the Foundation's own girls' AI hackathons and STEM camps.",
  ],

  questions: [
    "How is this different from the girls' AI hackathons we already support?",
    "Will students without their own laptop be able to take part?",
    "What exactly would a Gold gift pay for, and what will you report back?",
    "When is the date, and when would you need a decision?",
    "Should this come through a grant call or as a direct partnership?",
    "How do you protect students, especially the minors?",
  ],

  closingLine: "We would love to explore the right first step with Charmaine and the Digicel Foundation team.",

  sources: [
    {
      id: 1,
      org: "Digicel Foundation",
      label: "About the Digicel Foundation",
      href: "https://www.digicelfoundation.org/jm/en/about",
    },
    {
      id: 2,
      org: "Jamaica Observer",
      label: "Digicel Foundation empowers Denham Town and Tivoli High girls with AI skills (May 23, 2026)",
      href: "https://www.jamaicaobserver.com/2026/05/23/digicel-foundation-empowers-denham-town-tivoli-high-girls-ai-skills/",
    },
    {
      id: 3,
      org: "Jamaica Gleaner",
      label: "Montego Bay High wins hackathon (April 25, 2026)",
      href: "https://jamaica-gleaner.com/article/news/20260425/montego-bay-high-wins-hackathon-hurricane-response-app",
    },
    {
      id: 4,
      org: "Digicel Foundation",
      label: "Smart Lab at the NAZ Children Centre (June 23, 2025)",
      href: "https://www.digicelfoundation.org/jm/en/news/digicel-foundation-boosts-digital-literacy-for-special-needs-with-new-smart-lab-at-naz-children-centre",
    },
    {
      id: 5,
      org: "Digicel Foundation",
      label: "Digicel Foundation Equips Teachers' Colleges with State-of-the-Art Smart Labs (October 12, 2025)",
      href: "https://www.digicelfoundation.org/jm/en/news/digicel-foundation-equips-teachers-colleges-with-smart-labs",
    },
    {
      id: 6,
      org: "Jamaica Observer",
      label: "Digicel Foundation touching more lives (October 6, 2026)",
      href: "https://www.jamaicaobserver.com/2026/10/06/digicel-foundation-touching-lives/",
    },
    {
      id: 7,
      org: "Digicel Foundation",
      label: "Digicel Foundation Highlights STEM & Special Needs in Camps (August 13, 2025)",
      href: "https://www.digicelfoundation.org/jm/en/news/digicel-foundation-puts-stem-education-and-special-needs-in-focus-through-summer-camps",
    },
    {
      id: 8,
      org: "Digicel Foundation",
      label: "Salute 21 Grants Campaign (August 2, 2025)",
      href: "https://www.digicelfoundation.org/jm/en/news/digicel-foundation-targets-digital-literacy-and-silver-economy-in-new-salute-21-grants-campaign",
    },
  ],
};

export default deck;
