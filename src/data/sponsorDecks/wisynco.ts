import type { SponsorDeckData } from "./types";

const deck: SponsorDeckData = {
  slug: "wisynco",
  kind: "prize",
  sponsor: "Wisynco Group Limited (WATA)",
  short: "WATA",
  // Theme "primary" colour on WATA's own Hydrate to Educate site (educate.wisynco.com).
  accent: "#253aba",

  recipient: { name: "Brittany Thwaites", title: "Brand Manager, WATA Portfolio, Wisynco Group Limited", ref: 1 },
  preparedFor:
    "A private partnership proposal prepared for Brittany Thwaites, Brand Manager, WATA Portfolio, Wisynco Group Limited.",

  hero: {
    headline: "A long day of building runs on WATA.",
    highlight: "WATA",
    sub: "WATA already keeps students going at school sports days. Hack876 is a different kind of school day, and every team in the room will need water to get through it.",
  },

  why: {
    headline: "Water, wellbeing and school days.",
    mission: {
      label: "Brittany Thwaites, Brand Manager, WATA Portfolio",
      quote:
        "Hydrate to Educate is rooted in the belief that every young person deserves the opportunity to pursue their education with the support they need.",
      ref: 1,
    },
    points: [
      {
        text: "In 2026, WATA set up hydration stations at school sports days for students, teachers and spectators, as the first phase of Hydrate to Educate.",
        ref: 2,
      },
      {
        text: "Wisynco says the WATA School Tour engaged thousands of students island wide on hydration, wellness and positive lifestyle habits.",
        ref: 3,
      },
      {
        text: "For 2026, Hydrate to Educate set out to invest more than J$12 million in students and schools.",
        ref: 1,
      },
      {
        text: "Now in its fourth year, the initiative is supporting 31 students and 14 schools.",
        ref: 4,
      },
    ],
    tie: "A day of building is thirsty work, and WATA already knows how to show up for students on days like this.",
  },

  story: {
    kicker: "What WATA already backs",
    headline: "Years of showing up for students.",
    format: "milestones",
    items: [
      {
        label: "2022",
        text: "WATA directed J$1 from each bottle sold toward a J$12 million education fund for 120 students and 80 teachers.",
        ref: 5,
      },
      {
        label: "2023",
        text: "Hydrate to Educate launched, with grants for 42 students, three from each parish, and support for 14 schools, funded by limited-edition yellow-label bottles.",
        ref: 6,
      },
      {
        label: "2024/25",
        text: "J$17 million through the WATA brand behind ISSA Schoolboy Football and the DaCosta Cup, supporting student-athletes across Jamaica.",
        ref: 3,
      },
      {
        label: "2026",
        text: "Hydration stations at school sports days, then Hydrate to Educate support for 31 students and 14 schools.",
        ref: 4,
      },
    ],
    takeaway: "WATA already shows up for students on the field and in the classroom. Hack876 is one more room where that fits.",
    art: "Seedling",
  },

  paths: [
    {
      label: "Brand",
      title: "WATA as the hydration partner for the day",
      points: [
        "Bottled WATA for everyone in the room, all day",
        "A WATA hydration station, like the sports day setup",
        "Recognition on stage and in event materials",
        "Small, practical and quick to say yes or no to",
      ],
    },
    {
      label: "People",
      title: "The WATA team in the room",
      points: [
        "The brand team runs the hydration station",
        "A short welcome or award moment on stage",
        "Staff who help with set-up and keeping the day moving",
      ],
    },
  ],
  pathsNote: {
    text: "Wisynco lists admin@wisynco.com and 876-665-9000 at Lakespen, St Catherine. We would address the request to Brittany Thwaites and the WATA team.",
    ref: 7,
  },

  ask: {
    tier: "inkind",
    fallback: "food",
    why: "Water is what WATA already brings to school days, and it is the one thing every student will reach for. It keeps the ask small and close to the work the School Tour already does.",
    recognition: "Hydration Partner · Inaugural Hack876",
    award: {
      name: "WATA Wellbeing Award (proposed)",
      text: "A suggestion only: recognition for the build that best helps young people look after their health and wellbeing, with criteria agreed together and the judging panel making the call.",
    },
    tracks: ["Wellbeing", "Learn", "Resilience"],
    inkind: [
      "Cases of bottled WATA for students, mentors, judges and volunteers across the full day",
      "Delivery to the host school ahead of the day, once the venue and date are set",
      "A WATA hydration station, staffed by the brand team if that suits",
      "WATA presence on stage and in event materials, agreed together",
    ],
  },

  roles: [
    { title: "Hydration station", text: "The WATA team keeps the station stocked, the way it does at school sports days." },
    { title: "Welcome", text: "A short hello from WATA at the opening, kept to a minute or two." },
    { title: "Award presenter", text: "Someone from WATA presents an award on stage at the close." },
    { title: "Brand mentor", text: "A marketer who helps teams think about how they name, pitch and present what they built." },
    { title: "Volunteers", text: "Staff who help with set-up, meals and keeping the day on time." },
  ],

  groundRules: [
    "No alcohol brands anywhere: not at the venue, on signage, in photos or in any Hack876 material. WATA water only.",
    "No marketing campaigns aimed at students beyond the water provided and the hydration station: no sampling drives, contests, surveys or social pushes to students.",
    "No student data: no sign-ups or contact details collected by sponsors. Photos and names only with school and parent consent.",
  ],

  future: [
    "Hack876 as a stop on the WATA Hydrate to Educate School Tour.",
    "Pointing Hack876 students and teachers to Hydrate to Educate nominations when they open.",
    "A recycling challenge on the Resilience track, building on Wisynco's work with Recycling Partners of Jamaica.",
    "WATA as the hydration partner at every Hack876, growing with the event.",
  ],

  questions: [
    "How much water do you need, and when and where should it be delivered?",
    "What does WATA's recognition look like on the day and in materials?",
    "Which schools are taking part, and where is it being held?",
    "Will any other beverage brand be at the event?",
    "How are students protected on consent, data and marketing?",
    "Can our team run a hydration station on site?",
  ],

  closingLine: "We would love to explore the right first step with Brittany and the WATA team.",

  sources: [
    {
      id: 1,
      org: "Jamaica Observer",
      label: "Nominations now open for WATA Hydrate to Educate initiative (May 6, 2026)",
      href: "https://www.jamaicaobserver.com/2026/05/06/nominations-now-open-wata-hydrate-educate-initiative/",
    },
    {
      id: 2,
      org: "Jamaica Observer",
      label: "WATA supports student hydration and wellness during sports day season (March 18, 2026)",
      href: "https://www.jamaicaobserver.com/2026/03/18/wata-supports-student-hydration-wellness-sports-day-season/",
    },
    {
      id: 3,
      org: "Wisynco Group",
      label: "Report to Stockholders for the year ended June 30, 2025 (Corporate Social Responsibility Report)",
      href: "https://wisynco.com/wp-content/uploads/2025/08/Wisynco-Group-Limited-Report-to-Stockholders-for-year-ended-June-30-2025-Final.pdf",
    },
    {
      id: 4,
      org: "Jamaica Observer",
      label: "31 students, 14 schools to benefit from WATA initiative this year (August 18, 2026)",
      href: "https://www.jamaicaobserver.com/2026/08/18/31-students-14-schools-benefit-wata-initiative-year/",
    },
    {
      id: 5,
      org: "Jamaica Gleaner",
      label: "WATA awards education grant to students and teachers (December 12, 2022)",
      href: "https://past.jamaica-gleaner.com/article/news/20221212/wata-awards-education-grant-students-and-teachers",
    },
    {
      id: 6,
      org: "Wisynco Group",
      label: "Schools, students to receive $12 million in grants: Wisynco Give Back Programme (2023)",
      href: "https://wisynco.com/students-to-receive-12-million-in-grants/",
    },
    {
      id: 7,
      org: "Wisynco Group",
      label: "Contact Us",
      href: "https://wisynco.com/contact-us-2/",
    },
  ],
};

export default deck;
