import type { SponsorDeckData } from "./types";

/*
 * Tru-Juice is made by Trade Winds Citrus Limited in Bog Walk. Wisynco owns a
 * stake in Trade Winds and distributes Tru-Juice; the WATA proposal also goes to
 * Wisynco. See decisions.ts ("wisynco-family").
 */
const deck: SponsorDeckData = {
  slug: "trujuice",
  kind: "prize",
  sponsor: "Tru-Juice (Trade Winds Citrus Limited)",
  short: "Tru-Juice",
  accent: "#e8771a",
  recipient: { name: "the leadership of Trade Winds Citrus Limited", title: "" },
  preparedFor: "A private partnership proposal prepared for the leadership of Trade Winds Citrus Limited, makers of Tru-Juice.",
  hero: {
    headline: "Real Jamaican juice for a real day of building.",
    highlight: "real day of building",
    sub: "Tru-Juice is made in Bog Walk from fruit grown in Jamaica. Hack876 is a long day where students build something real, and a cold juice at lunch keeps them going.",
  },
  brief: {
    fit: "Tru-Juice is made from locally grown fruit, and Trade Winds Citrus already backs youth development, including a 2026 investment in the Tru-Juice Football Club in Linstead.",
    fitRef: 2,
    request: "Tru-Juice for the students and adults at Hack876, served with lunch, in kind.",
    enables: "A cold Jamaican juice with lunch for everyone in the room, in the middle of a long build day.",
    outcome: "Juice Partner recognition and a written recap.",
    next: "A yes from Trade Winds, and the name of the person on your team who will handle it. Hack876 then confirms the headcount, flavours and delivery date directly with them.",
    logistics: [
      "For about {students} students, plus mentors, judges, teachers and volunteers. We will give a final headcount in writing before anything is ordered.",
      "Served at lunch, {lunch}, at {venue} in Kingston. The venue is confirmed.",
      "Tru-Juice travels chilled. We will confirm cold storage at the venue before a delivery date is set.",
      "The date, {date}, is tentative until schools confirm it.",
    ],
  },
  why: {
    headline: "Jamaican fruit, and a company that invests where it works.",
    mission: {
      label: "Trade Winds Citrus marketing manager, February 2026",
      quote: "We are committed to helping build opportunities right here where we live, where dreams begin, and where teamwork is taught and celebrated.",
      ref: 2,
    },
    points: [
      { text: "Tru-Juice, the flagship brand of Trade Winds Citrus Limited, is made from fruits and vegetables produced locally.", ref: 1 },
      { text: "In February 2026 Trade Winds put J$7 million into the Tru-Juice Football Club in Linstead, describing it as support for structured youth development.", ref: 2 },
      {
        text: "The Tru-Juice 5K, now in its 11th staging and open to schools, raised a record J$8.2 million for Linstead Public Hospital in 2025.",
        ref: 3,
      },
    ],
    tie: "Hack876 asks students to build for their own communities, which is how Tru-Juice already works.",
  },
  story: {
    kicker: "What Tru-Juice already backs",
    headline: "Local fruit, local communities, young people.",
    format: "evidence",
    items: [
      {
        label: "Bog Walk",
        title: "Made from Jamaican produce.",
        text: "Fruits and vegetables produced locally, blended and delivered in refrigerated trucks to stay fresh.",
        ref: 1,
      },
      {
        label: "2020",
        title: "Turning farmers' surplus into juice.",
        text: "Trade Winds worked with the Ministry of Agriculture and RADA to process excess produce into juice, with a view to the national school-feeding programme.",
        ref: 4,
      },
      {
        label: "February 2026",
        title: "J$7 million for youth football.",
        text: "Support for player development and operations at the Tru-Juice Football Club in Linstead.",
        ref: 2,
      },
      {
        label: "Tru-Juice 5K",
        title: "Eleven years of a community run.",
        text: "Jamaica's only off-road 5K, through the Tru-Juice orchards in Bog Walk, raising money for Linstead Public Hospital.",
        ref: 3,
      },
    ],
    takeaway: "Tru-Juice already shows up for young people and the communities around it. Hack876 is one more room where that fits.",
  },
  ask: {
    lead: "inkind",
    band: "bronze",
    uses: ["meals"],
    title: "Juice Partner",
    why: "Juice with lunch is something Tru-Juice already makes better than anyone, and it is something every student in the room will enjoy. Any part of it helps.",
    recognition: "Juice Partner · Inaugural Hack876",
    tracks: ["Wellbeing", "Life", "Business"],
    inkind: [
      "Tru-Juice for the students and adults at the event, served with lunch",
      "A mix of flavours, chilled and delivered to {venue} ahead of lunch",
      "Tru-Juice named as juice partner on stage and in event materials, agreed together",
    ],
  },
  groundRules: [
    "The juice is the contribution: no sampling drives, contests or promotions aimed at students beyond what is served.",
    "No collection of student contact details by sponsors. Photos and names only with school and parent consent.",
    "Dietary needs come first. Hack876 collects allergies and dietary requirements in advance.",
  ],
  future: ["Tru-Juice as the juice partner at every Hack876, growing with the event.", "A Business-track challenge drawn from food processing or distribution, if Trade Winds would like to set one."],
  closingLine: "We would love Tru-Juice to be part of the first Hack876.",
  sources: [
    { id: 1, org: "Wisynco Group", label: "Tru-Juice brand page", href: "https://wisynco.com/tru-juice/" },
    {
      id: 2,
      org: "Jamaica Gleaner",
      label: "Tru-Juice pumps $7 million into football club (February 24, 2026)",
      href: "https://jamaica-gleaner.com/article/sports/20260224/tru-juice-pumps-7-million-football-club",
    },
    {
      id: 3,
      org: "Jamaica Gleaner",
      label: "Tru-Juice 5K targets record support to aid Linstead Public Hospital (May 13, 2026)",
      href: "https://jamaica-gleaner.com/article/20260513/tru-juice-5k-targets-record-support-aid-linstead-public-hospital",
    },
    {
      id: 4,
      org: "Ministry of Agriculture",
      label: "Agri Ministry collaborates with Tru-Juice to process excess produce (April 7, 2020)",
      href: "https://www.moa.gov.jm/content/agri-ministry-collaborates-tru-juice-process-excess-produce",
    },
  ],
};

export default deck;
