import type { SponsorDeckData } from "./types";

/*
 * A J$300,000 request within the Foundation's Education & Youth Development
 * pillar. The Foundation publishes no sponsorship form or criteria; it invites
 * partnership enquiries at foundation@barita.com. scholarships@barita.com is
 * for scholarship applications only.
 *
 * The Create & Hustle track prize carrying the Foundation's name is an option the
 * organisers chose to offer. It is not yet an award in event.ts.
 */
const deck: SponsorDeckData = {
  slug: "baritafoundation",
  pdfName: "barita",
  kind: "prize",
  sponsor: "Barita Foundation",
  short: "Barita Foundation",
  article: "the",
  accent: "#05B3A7",
  recipient: { name: "Tanketa Chance-Wilson", title: "Executive Director, Barita Foundation", ref: 1 },
  preparedFor: "A private partnership proposal prepared for Tanketa Chance-Wilson, Executive Director, Barita Foundation.",
  hero: {
    headline: "Tomorrow's leaders, building today.",
    highlight: "building today",
    sub: "Hack876 is a free day in Kingston for students from 5th Form to Upper 6th, many at their first hackathon. Campion College and Hillel Academy are confirmed, and volunteer judges who work at Tesla, Microsoft, Meta and Google will see what the teams build.",
  },
  brief: {
    fit: "Education and youth development is one of the Barita Foundation's three pillars, and its scholarships support Jamaican students at CSEC and CAPE level.",
    fitRef: 1,
    request: "Support for Hack876 toward the student programme on the day, with the option of the Foundation's name on the Create & Hustle track prize.",
    enables: "A free day of hands-on learning for about {students} students from 5th Form to Upper 6th, many at their first hackathon: mentoring, materials, meals and the running of the day.",
    outcome: "The Foundation's logo on hack876.com and on stage, a thank-you in the programme, a feature on Instagram @hack876ja, and a recap with photos.",
    next: "A reply on whether the Foundation would support Hack876, and whether it would like its name on the Create & Hustle track prize.",
  },
  why: {
    headline: "Education, opportunity and access.",
    mission: {
      label: "Barita Foundation",
      quote: "Building the future is the bedrock of Barita's vision. That means more than wealth. It means education, opportunity and access to the resources that make it all possible.",
      ref: 1,
    },
    points: [
      { text: "Education and youth development is one of the Foundation's three pillars, alongside entrepreneurship and health and wellbeing.", ref: 1 },
      { text: "Its scholarships support Jamaican students at PEP, CSEC, CAPE, early childhood and tertiary level.", ref: 1 },
      { text: "In 2024 it awarded J$9.5 million in scholarships and bursaries, from more than 220 applications.", ref: 4 },
    ],
    tie: "Hack876 turns education, opportunity and access into one free day: students build real technology, and many find out for the first time that they can.",
  },
  story: {
    kicker: "What the Foundation already backs",
    headline: "Scholarships for Jamaican students, every year since 2022.",
    format: "evidence",
    items: [
      { label: "August 2022", title: "A first cohort.", text: "23 scholarships and 10 bursaries at the Foundation's first scholarship ceremony.", ref: 2 },
      { label: "2023", title: "44 scholars.", text: "34 full scholarships and 10 bursaries for the 2023/24 school year.", ref: 3 },
      { label: "2024", title: "Over 220 applications.", text: "J$9.5 million in scholarships and bursaries.", ref: 4 },
      { label: "2025", title: "A new UWI scholarship.", text: "The Paul Simpson Scholarship: J$5 million for three Chancellor Hall students at UWI Mona over five years.", ref: 5 },
    ],
    takeaway: "The Foundation already opens doors through education. Hack876 is a day for students to see what is on the other side.",
  },
  pathsNote: { text: "The Foundation invites partnership enquiries by email to foundation@barita.com.", ref: 1 },
  ask: {
    lead: "band",
    figure: "J$300,000",
    headline: "J$300,000 toward a free day of learning by building.",
    bands: [],
    uses: ["programming", "materials", "meals", "overall"],
    why: "J$300,000 helps support a free day of hands-on learning for students from 5th Form to Upper 6th, alongside {sponsors}. As an option, the Create & Hustle track prize could carry the Barita Foundation's name. The Create & Hustle track asks teams to build for entrepreneurs, small businesses and creators, from helping a corner shop keep track of its money to tools that help young people budget and save. The judging panel still decides the winner.",
    receives: [
      "Logo on hack876.com and on stage",
      "A thank-you in the event programme",
      "A feature on Instagram, @hack876ja",
      "A post-event recap with photos",
      "Optional: the Foundation's name on the Create & Hustle track prize",
    ],
    recognition: "Education support · Inaugural Hack876",
    tracks: ["Learn", "Create & Hustle"],
  },
  groundRules: [
    "No marketing to students, and no sign-ups on the day.",
    "No collection of student contact details by partners. Photos and names only with school and parent consent.",
    "The judging panel decides every prize, including a named one. Support carries no influence over judging.",
  ],
  future: ["The Foundation as an education partner at every Hack876.", "A financial literacy challenge on the Create & Hustle track, if the Foundation would like one."],
  closingLine: "We would love the Barita Foundation to be part of the first Hack876.",
  sources: [
    { id: 1, org: "Barita", label: "Barita Foundation", href: "https://www.barita.com/foundation" },
    { id: 2, org: "Jamaica Information Service", label: "Barita Foundation awards $10 million in scholarships and bursaries (August 11, 2022)", href: "https://jis.gov.jm/barita-foundation-awards-10-million-in-scholarships-and-bursaries/" },
    { id: 3, org: "Jamaica Observer", label: "Barita Foundation awards 44 outstanding scholars (September 2, 2023)", href: "https://jamaicaobserver.com/2023/09/02/barita-foundation-awards-44-outstanding-scholars-in-scholarship-programme" },
    { id: 4, org: "Jamaica Gleaner", label: "Scholarships To Go 2025: Barita Foundation (May 15, 2025)", href: "https://go-jamaica.com/supplement/pdf/scholarships-to-go-2025/9" },
    { id: 5, org: "Jamaica Observer", label: "Barita Foundation opens doors for Chancellorites with new Paul Simpson Scholarship (August 29, 2025)", href: "https://www.jamaicaobserver.com/2025/08/29/barita-foundation-opens-doors-chancellorities-new-paul-simpson-scholarship/" },
  ],
};

export default deck;
