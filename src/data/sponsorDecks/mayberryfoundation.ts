import type { SponsorDeckData } from "./types";

const deck: SponsorDeckData = {
  slug: "mayberryfoundation",
  kind: "prize",
  sponsor: "Mayberry Foundation",
  short: "Mayberry",
  accent: "#0257FF",

  recipient: { name: "Kayree Berry-Teape", title: "CEO, Mayberry Foundation", ref: 1 },
  preparedFor:
    "A private partnership proposal prepared for Kayree Berry-Teape, Chief Executive Officer, Mayberry Foundation.",

  hero: {
    headline: "A full day, fed and focused.",
    highlight: "fed and focused",
    sub: "Mayberry has already given students a full day of meals and transport so they could simply learn. Hack876 hopes for a day like that, built around students making their first real things.",
  },

  why: {
    headline: "Youth, education and financial literacy, in one room.",
    mission: {
      label: "Christopher Berry, Chairman, Mayberry",
      quote:
        "Mayberry is committed to giving back to our community. We are especially focused on youth. We reach out to them by helping to build capacity in the key areas of Health, Education, Environment, Youth and Community Development as well as Financial Literacy.",
      ref: 1,
    },
    points: [
      {
        text: "The Mayberry Foundation donated J$7,650,000 to the St. George's College Scholarship Fund, saying it is committed to supporting our future leaders.",
        ref: 1,
      },
      {
        text: "In 2026 Christel House Jamaica named a visit Mayberry Day, in thanks for Mayberry's sponsorship of a full day of nutrition and transportation for its students.",
        ref: 2,
      },
      {
        text: "In 2022 the Foundation backed the St. George's College Enrichment Program for fifth-formers working through English Language and Mathematics.",
        ref: 3,
      },
      {
        text: "Kayree Berry-Teape has called youth programmes \"a direct investment in national development\", shaping \"the future leaders, innovators, and productive citizens of Jamaica.\"",
        ref: 5,
      },
    ],
    tie: "Hack876 is a day where fifth-formers turn ideas into working tools, and a Mayberry Day would let them spend all of it learning.",
  },

  story: {
    kicker: "What Mayberry already backs",
    headline: "Students first, again and again.",
    format: "evidence",
    items: [
      {
        label: "Scholarships",
        title: "J$7.65 million for St. George's College.",
        text: "The Mayberry Foundation's gift to the St. George's College Scholarship Fund.",
        ref: 1,
      },
      {
        label: "Fifth form · 2022",
        title: "A boot camp before CSEC.",
        text: "J$1 million to St. George's College for its Boot Camp Initiative, preparing fifth-formers for regional exams in about 20 subject areas.",
        ref: 4,
      },
      {
        label: "Fifth form · 2022",
        title: "Help with English and Maths.",
        text: "Support for the St. George's College Enrichment Program, for fifth-formers facing challenges in English Language and Mathematics.",
        ref: 3,
      },
      {
        label: "A full day, covered · 2026",
        title: "Mayberry Day at Christel House.",
        text: "A full day of nutrition and transportation for Christel House Jamaica students, marked with a visit and a tour of the school.",
        ref: 2,
      },
      {
        label: "Youth platforms · 2026",
        title: "About 1,000 young swimmers.",
        text: "The Mayberry High Performance Swim Classic gave primary and secondary athletes a stage of their own.",
        ref: 5,
      },
      {
        label: "Access",
        title: "A computer lab in Naggo Head.",
        text: "As Foundation CEO, Kayree Berry-Teape raised funds to refurbish a computer lab in Naggo Head, St Catherine.",
        ref: 6,
      },
    ],
    takeaway: "Mayberry already shows up for fifth-formers and for the days that help them learn. Hack876 is one more of those days.",
    art: "Compounding",
  },

  linkedSchool: {
    school: "St. George's College",
    text: "The Mayberry Foundation gave J$7,650,000 to the St. George's College Scholarship Fund and has supported its fifth-formers. St. George's is in the Hack876 school network; its participation is not yet confirmed.",
    ref: 1,
  },

  paths: [
    {
      label: "Foundation",
      title: "A Mayberry Day at Hack876",
      points: [
        "Lunch and the day's meals for every student",
        "Help with transport for students who need it",
        "A short thank-you moment on stage",
        "A simple report after: meals served, photos, highlights",
      ],
    },
    {
      label: "People",
      title: "Mayberry people in the room",
      points: [
        "Business-track mentors on pricing and pitch realism",
        "Volunteer lunch hosts from the Mayberry team",
        "A Mayberry presenter for a proposed award",
      ],
    },
  ],
  pathsNote: {
    text: "Mayberry's CSR policy asks for requests in writing, with the organisation's details, the purpose and the amount, at least 30 days before the event. We will follow it.",
    ref: 7,
  },

  ask: {
    tier: "food",
    fallback: "inkind",
    /* Mayberry's CSR policy excludes contributions to individuals, so no per-student prize tiers. */
    hideTiers: ["prize", "special"],
    why: "It is the same kind of support Mayberry gave Christel House Jamaica: a full day of meals and transport, so students can focus on learning. As a cash gift, it is concrete and easy to report on.",
    recognition: "Food & Student Experience Partner · Inaugural Hack876",
    award: {
      name: "Mayberry Young Entrepreneur Award (proposed)",
      text: "A suggestion only: an award for the Business-track build with the clearest path to helping a real small business, with criteria agreed together and the final call left to the judging panel.",
    },
    tracks: ["Business", "Learn", "Life"],
    inkind: [
      "Mentors for the Business track",
      "Volunteer lunch hosts",
      "A presenter for the proposed award",
    ],
  },

  roles: [
    { title: "Business mentors", text: "Advisors who ask the honest questions: who pays, how much, and could this really work?" },
    { title: "Lunch hosts", text: "Mayberry volunteers who help serve lunch and talk with students about their builds." },
    { title: "Award presenter", text: "A Mayberry representative presents the proposed award on stage at the close." },
    { title: "Money-smart minute", text: "A short, general talk on budgeting and pricing an idea, with no products named." },
    { title: "Judging support", text: "Mayberry can advise on its award's criteria; the judging panel decides the winner." },
  ],

  groundRules: [
    "No marketing of investment products, accounts, trading apps or other financial services to students, and no sign-ups on the day.",
    "No collection of student contact details or data by sponsors. Photos and names only with school and parent consent.",
    "Sponsor staff mentor and present; the judging panel decides every award.",
  ],

  future: [
    "A Mayberry Day at every Hack876, alongside its other annual youth commitments.",
    "A recurring Mayberry Young Entrepreneur Award for the Business track.",
    "A pre-event build session at St. George's College for fifth-formers.",
    "Mayberry mentors returning to the Business track each year.",
  ],

  questions: [
    "Which registered charity or school would receive the funds?",
    "Will St. George's College take part?",
    "When is it, and will we have the date at least 30 days ahead?",
    "What exactly would our contribution pay for?",
    "How will we see the impact afterwards?",
    "How are students protected on consent, data and marketing?",
  ],

  closingLine: "We would love to explore the right first step with Kayree and the Mayberry Foundation team.",

  sources: [
    {
      id: 1,
      org: "Mayberry Investments Limited",
      label: "Corporate Social Responsibility (Chairman's philosophy, CEO statement, St. George's College Scholarship Fund)",
      href: "https://www.mayberryinv.com/who-we-are/corporate-social-responsibility/",
    },
    {
      id: 2,
      org: "Christel House Jamaica (LinkedIn)",
      label: "Mayberry Day at Christel House Jamaica (April 2026)",
      href: "https://www.linkedin.com/posts/christelhousejamaica_fromclassroomstolife-mayberryday-mayberryinvestmentslimited-activity-7446194038434586624-0-mw",
    },
    {
      id: 3,
      org: "Mayberry Investments Limited",
      label: "Mayberry supports academic growth through S.T.G.C. Enrichment Program (March 19, 2022)",
      href: "https://www.mayberryinv.com/mayberry-supports-academic-growth-through-s-t-g-c-enrichment-program/",
    },
    {
      id: 4,
      org: "Mayberry Investments Limited",
      label: "Mayberry assists S.T.G.C. students preparing for CSEC Examinations (March 1, 2022)",
      href: "https://www.mayberryinv.com/mayberry-assists-s-t-g-c-students-preparing-for-csec-examinations/",
    },
    {
      id: 5,
      org: "Our Today",
      label: "Mayberry Investments launches 2026 High Performance Swim Classic (March 2026)",
      href: "https://our.today/mayberry-investments-launches-2026-high-performance-swim-classic/",
    },
    {
      id: 6,
      org: "Jamaica Observer (All Woman)",
      label: "Up close with Kayree Berry-Teape (August 16, 2020)",
      href: "https://www.jamaicaobserver.com/allwoman/2020/08/16/up-close-with-kayree-berry-teape/",
    },
    {
      id: 7,
      org: "Mayberry Investments Limited",
      label: "Corporate Social Responsibility Policy (revised May 31, 2017; approved February 17, 2018)",
      href: "https://www.mayberryinv.com/wp-content/uploads/2019/02/Corporate-Social-Responsibility-Policy.pdf",
    },
  ],
};

export default deck;
