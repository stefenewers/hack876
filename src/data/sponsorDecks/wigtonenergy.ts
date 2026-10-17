import type { SponsorDeckData } from "./types";

/*
 * A J$400,000 request written to Wigton's CSR Policy (January 2025): requests go
 * in writing to the Deputy CEO, copied to the Human Resources Officer, and are
 * scored against its areas of focus (education and environmental advocacy,
 * youth development, climate change mitigation). The policy dropped sports and
 * crime prevention, so the deck leads with young people building real tech.
 *
 * The Resilience track prize carrying Wigton's name is an option the organisers
 * chose to offer. It is not yet an award in event.ts.
 */
const deck: SponsorDeckData = {
  slug: "wigtonenergy",
  pdfName: "wigton",
  kind: "prize",
  sponsor: "Wigton Energy",
  short: "Wigton",
  accent: "#0165B9",
  recipient: { name: "Michelle Chin Lenn", title: "Deputy Chief Executive Officer, Wigton Energy", ref: 2 },
  preparedFor: "A private partnership proposal prepared for Michelle Chin Lenn, Deputy Chief Executive Officer, Wigton Energy.",
  hero: {
    headline: "Young Jamaicans, building real tech.",
    highlight: "real tech",
    sub: "Hack876 is a free day in Kingston for students from 5th Form to Upper 6th, many at their first hackathon. Campion College and Hillel Academy are confirmed, and volunteer judges who work at Tesla, Microsoft, Meta and Google will see what the teams build.",
  },
  brief: {
    fit: "Wigton's CSR policy names education and environmental advocacy and youth development among its areas of focus, alongside climate change mitigation.",
    fitRef: 1,
    request: "Support for Hack876 toward the student programme on the day, with the option of Wigton's name on the Resilience track prize.",
    enables: "A free day of building for about {students} students from 5th Form to Upper 6th, many at their first hackathon: mentoring, materials, meals and the running of the day.",
    outcome: "Wigton's logo on hack876.com and on stage, a thank-you in the programme, a feature on Instagram @hack876ja, and a recap with photos.",
    next: "A reply on whether Wigton would support Hack876, and whether it would like its name on the Resilience track prize.",
  },
  why: {
    headline: "A clean energy future needs young builders.",
    mission: {
      label: "Wigton Energy mission",
      quote: "We champion the transition to clean energy across the Caribbean, delivering accessible, reliable, and sustainable clean power solutions that empower communities and secure a resilient future for the region.",
      ref: 2,
    },
    points: [
      { text: "Wigton's CSR policy names climate change mitigation, education and environmental advocacy, and youth development among its areas of focus.", ref: 1 },
      { text: "Its scholarship supports engineering students at UWI Mona and NCU with J$1,000,000 a year for two years.", ref: 3 },
      { text: "Wigton operates the Wigton Renewable Energy Training Lab at Rose Hill to build local capacity in engineering and renewable energy.", ref: 4 },
    ],
    tie: "Hack876 puts young Jamaicans in front of real problems for a day. Some teams will take on climate and infrastructure, and every team will build something that works.",
  },
  story: {
    kicker: "What Wigton already backs",
    headline: "Investing in the people who build Jamaica's energy future.",
    format: "evidence",
    items: [
      { label: "Since 2000", title: "Jamaica's renewable energy partner.", text: "Incorporated in April 2000, and now listed on the Jamaica Stock Exchange.", ref: 2 },
      { label: "Wind and solar", title: "62.7MW of wind.", text: "Utility-scale wind at Rose Hill, Manchester, with about 70.53MW of solar PV being implemented.", ref: 2 },
      { label: "2016", title: "A training lab.", text: "The Wigton Renewable Energy Training Lab opened at Rose Hill.", ref: 5 },
      { label: "2025", title: "Engineering scholarships.", text: "The first Wigton Energy scholarship went to a UWI civil engineering student.", ref: 6 },
    ],
    takeaway: "Wigton already invests in the engineers who will build Jamaica's energy future. Hack876 reaches them a few years earlier.",
  },
  pathsNote: { text: "Wigton's CSR policy asks for sponsorship requests in writing to the Deputy Chief Executive Officer, with a copy to the Human Resources Officer.", ref: 1 },
  ask: {
    lead: "band",
    figure: "J$400,000",
    headline: "J$400,000 toward a free day of young Jamaicans building real tech.",
    bands: [],
    uses: ["programming", "prizes", "materials", "overall"],
    why: "J$400,000 helps support a free day of building for students from 5th Form to Upper 6th, alongside {sponsors}. As an option, the Resilience track prize could carry Wigton's name. The Resilience track asks teams to think about climate, infrastructure, emergencies or community resilience. The judging panel still decides the winner.",
    receives: [
      "Logo on hack876.com and on stage",
      "A thank-you in the event programme",
      "A feature on Instagram, @hack876ja",
      "A post-event recap with photos",
      "Optional: Wigton's name on the Resilience track prize",
    ],
    recognition: "Youth and STEM support · Inaugural Hack876",
    tracks: ["Resilience", "Everyday Jamaica"],
  },
  groundRules: [
    "No marketing to students, and no sign-ups on the day.",
    "No collection of student contact details by partners. Photos and names only with school and parent consent.",
    "The judging panel decides every prize, including a named one. Support carries no influence over judging.",
  ],
  future: ["Wigton as a partner at every Hack876.", "A visit to the Wigton Renewable Energy Training Lab for winning teams, if Wigton would like one."],
  closingLine: "We would love Wigton Energy to be part of the first Hack876.",
  sources: [
    { id: 1, org: "Wigton Energy", label: "Corporate Social Responsibility Policy (January 2025)", href: "https://wigtonenergy.com/wp-content/uploads/2025/09/Corporate-Social-Responsibility-Policy-January-2025.pdf" },
    { id: 2, org: "Wigton Energy", label: "Annual Report 2025-2026", href: "https://wigtonenergy.com/wp-content/uploads/2026/07/WIGTON-ENERGY-LIMITED-ANNUAL-REPORT-2025-2026.pdf" },
    { id: 3, org: "Wigton Energy", label: "Corporate Social Responsibility", href: "https://wigtonenergy.com/corporate-social-responsibility/" },
    { id: 4, org: "Wigton Energy", label: "Annual Report 2024-2025", href: "https://wigtonenergy.com/wp-content/uploads/2025/09/WIGTON-ENERGY-LIMITED-ANNUAL-REPORT-2024-2025.pdf" },
    { id: 5, org: "Jamaica Gleaner", label: "Wigton Windfarm opens renewable energy training lab (November 4, 2016)", href: "https://jamaica-gleaner.com/article/news/20161104/wigton-windfarm-opens-renewable-energy-training-lab" },
    { id: 6, org: "Jamaica Observer", label: "UWI student cops inaugural Wigton Energy $1-m scholarship (April 3, 2025)", href: "https://www.jamaicaobserver.com/2025/04/03/uwi-student-cops-inaugural-wigton-energy-1-m-scholarship/" },
  ],
};

export default deck;
