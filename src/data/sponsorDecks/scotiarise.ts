import type { SponsorDeckData } from "./types";

/*
 * Scotiabank Jamaica, through ScotiaRISE. Separate from the Scotia Investments
 * proposal. The donations and sponsorship form asks for budget, outcomes and
 * defined metrics, needs a registered charity or non-profit applicant (not a
 * school), and allows at least 90 days for a response.
 */
const deck: SponsorDeckData = {
  slug: "scotiarise",
  kind: "prize",
  sponsor: "Scotiabank Jamaica (ScotiaRISE)",
  short: "Scotiabank",
  accent: "#ec111a",
  recipient: { name: "Ms. Yanique Forbes-Patrick", title: "Head, Caribbean Corporate Affairs, Scotiabank", ref: 5 },
  preparedFor: "A private partnership proposal prepared for Ms. Yanique Forbes-Patrick, Head, Caribbean Corporate Affairs, Scotiabank, for ScotiaRISE in Jamaica.",
  hero: {
    headline: "Job-ready digital skills start before the first job.",
    highlight: "digital skills",
    sub: "ScotiaRISE helps young people build the skills to take part in the economy. Hack876 gives Jamaican secondary-school students a free day to build technology, with industry mentors and judges.",
  },
  brief: {
    fit: "ScotiaRISE's Education pillar equips young people with the skills to thrive, and in Jamaica it already backs digital skills through CyberNauts.",
    fitRef: 1,
    request: "Support for Hack876 as an education and prize partner.",
    enables: "The prizes for the top teams, and the mentoring and judging that turn a first build into a skill students can show.",
    outcome: "Education Partner recognition, and a written report against the measures set out in this proposal.",
    next: "A reply on whether ScotiaRISE would consider this. We will apply through Scotiabank's form with a registered non-profit partner.",
  },
  why: {
    headline: "Economic resilience starts with skills.",
    mission: {
      label: "Audrey Tugwell Henry, President and CEO, Scotiabank Jamaica",
      quote: "Protection for the most vulnerable among us means equipping them with the required skills and resources to be resilient.",
      ref: 3,
    },
    points: [
      { text: "ScotiaRISE is Scotiabank's 10-year community investment to help create economic resilience, so people can access opportunities, adapt to change and take part in the economy.", ref: 1 },
      { text: "From 2026 its Education pillar focuses on equipping young people with the knowledge, skills and attitudes to thrive.", ref: 1 },
      { text: "Its CyberNauts programme trained Jamaicans for entry-level cybersecurity careers and was significantly oversubscribed.", ref: 4 },
    ],
    tie: "Hack876 is where a secondary-school student first builds something real with technology, years before a first job.",
  },
  story: {
    kicker: "What ScotiaRISE already backs in Jamaica",
    headline: "Skills for young people, and digital careers.",
    format: "evidence",
    items: [
      { label: "2024", title: "YouthRISE.", text: "With SOS Children's Villages Canada, nearly 800 young people in Jamaica and Mexico, including digital skills for emerging careers.", ref: 3 },
      { label: "2025", title: "CyberNauts.", text: "Free cybersecurity career training across the Caribbean, with 60 Jamaican learners, and strong national demand.", ref: 4 },
      { label: "2025", title: "Financial skills.", text: "YouthRISE financial literacy workshops for young men in Kingston, Montego Bay and Lilliput.", ref: 4 },
      { label: "2026", title: "A refreshed framework.", text: "Four pillars: Education, Employment, Community Needs and Cohesion, and Resilient Economy.", ref: 1 },
    ],
    takeaway: "ScotiaRISE already builds skills for work. Hack876 is the earliest step: a first build, in secondary school.",
  },
  pathsNote: {
    text: "Scotiabank's form asks for a budget, outcomes, defined metrics and a recognition plan, and allows 90 days for a response.",
    ref: 2,
  },
  ask: {
    lead: "band",
    figure: "J$550,000",
    title: "Education Partner",
    bands: [],
    uses: ["prizes", "programming", "materials"],
    restriction: "Scotiabank's form needs a registered charity or non-profit applicant, so we will apply through a registered non-profit partner, not a school.",
    why: "J$550,000 helps support the prizes for the top teams and the programme for the day, with clear measures of what it achieved.",
    recognition: "Education Partner · Inaugural Hack876",
    tracks: ["Create & Hustle", "Learn"],
  },
  metrics: [
    { k: "Students reached", v: "About {students}, 5th Form to Upper 6th" },
    { k: "Schools", v: "{confirmed} confirmed, from a network of {schools} in Kingston" },
    { k: "Projects built", v: "About {teams} working prototypes, one per team" },
    { k: "Follow-up", v: "A short participant survey, reported in the recap" },
  ],
  groundRules: [
    "No marketing of financial products to students, and no sign-ups on the day.",
    "No student contact details shared with partners. Photos and names only with school and parent consent.",
    "The judging panel decides every award. Partnership carries no influence over judging.",
  ],
  future: ["ScotiaRISE as an education partner at every Hack876.", "Pointing interested students to ScotiaRISE skills programmes as they get older."],
  closingLine: "We would love Scotiabank to be part of the first Hack876.",
  sources: [
    { id: 1, org: "Scotiabank", label: "ScotiaRISE", href: "https://www.scotiabank.com/ca/en/about/responsibility-impact/scotiarise.html" },
    {
      id: 2,
      org: "Scotiabank",
      label: "ScotiaRISE funding guidelines and application",
      href: "https://www.scotiabank.com/ca/en/about/responsibility-impact/scotiarise/funding-guidelines-application.html",
    },
    {
      id: 3,
      org: "Scotiabank Jamaica",
      label: "SOS Children's Villages Canada and ScotiaRISE create brighter futures for nearly 800 youth (October 8, 2024)",
      href: "https://jm.scotiabank.com/about-scotiabank/media-centre/news-releases/sos-childrens-villages-canada-and-scotiabanks-scotiarise-initiative-create-brighter-futures-for-nearly-800-youth-in-jamaica-and-mexico.html",
    },
    { id: 4, org: "Scotia Group Jamaica", label: "Annual Report 2025", href: "https://jm.scotiabank.com/content/dam/scotiabank/international/jamaica/documents/SGJ_2025_Annual_Report.pdf" },
    {
      id: 5,
      org: "Jamaica Observer",
      label: "Yanique Forbes-Patrick appointed Scotiabank's Caribbean corporate affairs head (July 24, 2025)",
      href: "https://www.jamaicaobserver.com/2025/07/24/yanique-forbes-patrick-appointed-scotiabanks-caribbean-corporate-affairs-head/",
    },
  ],
};

export default deck;
