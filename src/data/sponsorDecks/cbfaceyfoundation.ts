import type { SponsorDeckData } from "./types";

/*
 * An event sponsorship request within the Foundation's Education mandate,
 * which it accepts by email year-round. Not a grant application: the grant
 * portal runs August 12 to October 12.
 */
const deck: SponsorDeckData = {
  slug: "cbfaceyfoundation",
  kind: "prize",
  sponsor: "C.B. Facey Foundation",
  short: "C.B. Facey Foundation",
  article: "the",
  accent: "#53876b",
  recipient: { name: "Ms. Gayon Douglas", title: "Executive Director, C.B. Facey Foundation", ref: 4 },
  preparedFor: "A private partnership proposal prepared for Ms. Gayon Douglas, Executive Director, C.B. Facey Foundation.",
  hero: {
    headline: "A free day of learning by building, in Kingston.",
    highlight: "learning by building",
    sub: "The C.B. Facey Foundation puts education at the core of its giving. Hack876 gives Kingston secondary-school students a free day to learn by building something real, with mentors and judges beside them.",
  },
  brief: {
    fit: "Education is at the core of the C.B. Facey Foundation's giving, and it welcomes event sponsorship requests within its Education mandate year-round.",
    fitRef: 1,
    request: "Support for Hack876 as an education partner, toward the student programme on the day.",
    enables: "A free day of hands-on learning for about {students} Kingston secondary-school students: mentoring, materials, meals and the running of the day.",
    outcome: "Education Partner recognition, and a written recap of who took part and what they built.",
    next: "A reply on whether the Foundation would support Hack876 as an education partner.",
  },
  why: {
    headline: "Access and quality in education, close to home.",
    mission: {
      label: "C.B. Facey Foundation",
      quote: "We are on a mission to improve access and quality within the education sector and to ensure the preservation of our environmental and cultural treasures.",
      ref: 1,
    },
    points: [
      { text: "Education is the core of the Foundation's giving, through the three schools it partners with, scholarships, grants and projects.", ref: 1 },
      { text: "In 2025 the Foundation awarded 17 tertiary scholarships and 25 grants, and supported three schools it partners with.", ref: 3 },
      { text: "It has supported Boys' Town in Trench Town, Kingston, since it was founded in 1984.", ref: 1 },
    ],
    tie: "Hack876 is a free day of learning in Kingston, open to students whatever their school or background.",
  },
  story: {
    kicker: "What the Foundation already backs",
    headline: "Four decades of investing in Jamaican learners.",
    format: "evidence",
    items: [
      { label: "Since 1984", title: "A family and corporate foundation.", text: "Founded by the Hon. Maurice Facey in memory of his father, to support Pan Jamaica Group's social responsibility goals.", ref: 1 },
      { label: "2025", title: "Scholarships and grants.", text: "17 tertiary scholarships, 25 grants and support for three schools it partners with.", ref: 3 },
      { label: "May 2026", title: "Reading in Kingston.", text: "Read Across Jamaica Day with basic school students, and a grant to the Jamaica Library Service for its national reading competition.", ref: 4 },
      { label: "Education first", title: "Removing barriers.", text: "Scholarships at Edna Manley College and the UTech Caribbean School of Architecture, funded for more than 40 years.", ref: 5 },
    ],
    takeaway: "The Foundation already opens doors for Jamaican learners. Hack876 is a day to walk through one.",
  },
  pathsNote: { text: "The Foundation invites event sponsorship requests within its Education mandate year-round, by email to cbfacey@panjamaica.com.", ref: 2 },
  ask: {
    lead: "band",
    figure: "J$250,000 to J$500,000",
    title: "Education Partner",
    bands: [],
    uses: ["programming", "materials", "meals", "overall"],
    why: "A contribution in this range helps support a free day of hands-on learning for Kingston students. This is an event sponsorship request within the Foundation's Education mandate, not a grant application.",
    recognition: "Education Partner · Inaugural Hack876",
    tracks: ["Learn", "Culture"],
  },
  groundRules: [
    "No marketing to students, and no sign-ups on the day.",
    "No collection of student contact details by partners. Photos and names only with school and parent consent.",
    "The judging panel decides every award. Partnership carries no influence over judging.",
  ],
  future: ["The Foundation as an education partner at every Hack876.", "Students from the schools the Foundation partners with taking part in future years."],
  closingLine: "We would love the C.B. Facey Foundation to be part of the first Hack876.",
  sources: [
    { id: 1, org: "Pan Jamaica Group", label: "About the C.B. Facey Foundation", href: "https://panjamaica.com/foundation/about-cbfacey-foundation/" },
    { id: 2, org: "Pan Jamaica Group", label: "C.B. Facey Foundation: Grants and sponsorship requests", href: "https://panjamaica.com/grants/" },
    { id: 3, org: "Pan Jamaica Group", label: "Annual Report 2025 (C.B. Facey Foundation)", href: "https://panjamaica.com/wp-content/uploads/2026/05/PanJamGroupAnnual2025_eDocument.pdf" },
    { id: 4, org: "Jamaica Observer", label: "C.B. Facey Foundation brings stories to life (May 7, 2026)", href: "https://www.jamaicaobserver.com/2026/05/07/cb-facey-foundation-brings-stories-life/" },
    { id: 5, org: "Jamaica Gleaner", label: "Goodheart: COVID-19 sparked Kimberley Jones' creativity (August 1, 2026)", href: "https://jamaica-gleaner.com/article/lifestyle/20260801/goodheart-covid-19-sparked-kimberley-jones-creativity" },
  ],
};

export default deck;
