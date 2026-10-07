import type { SponsorDeckData } from "./types";

const deck: SponsorDeckData = {
  slug: "islandgrill",
  kind: "prize",
  sponsor: "Island Grill",
  short: "Island Grill",
  accent: "#d42222",

  recipient: { name: "Thalia Lyn", title: "Founder and Deputy Chairman, Island Grill", ref: 1 },
  preparedFor:
    "A private partnership proposal prepared for Thalia Lyn, Founder and Deputy Chairman, Island Grill, with Tania Waldron-Gooden, Chief Executive Officer.",

  hero: {
    headline: "Eat good. Live good. Build something.",
    highlight: "Build something.",
    sub: "Island Grill has always reached beyond the restaurant walls. Hack876 is a long day of building for young Jamaicans, and a good Jamaican lunch keeps the ideas coming.",
  },

  why: {
    headline: "Real food, and a real skill set, for young Jamaicans.",
    mission: {
      label: "Island Grill",
      quote:
        "We create value for all stakeholders by delighting our customers, each and every time, with excellent food and service, with ease, grace and joy; making it possible for all to Eat Good and Live Good.",
      ref: 2,
    },
    points: [
      {
        text: "In 2024 Thalia Lyn announced the Lyn Family/Island Grill Scholarship in Technology for a deserving student at Immaculate Conception High School, her alma mater.",
        ref: 3,
      },
      {
        text: "By 2016 Island Grill's Soupaah Pot of Love had run over 180 projects and donated more than 10,000 cups of soup, including to schools across the country.",
        ref: 4,
      },
      {
        text: "In 2017 Island Grill launched its Supaah Food menu of locally grown foods, in line with the country's mandate to encourage Jamaicans to eat local and healthier.",
        ref: 5,
      },
      {
        text: "Island Grill grew by trying new things: jerk seasoning on grilled chicken, then callaloo rice and festival with chicken instead of the usual dinner roll.",
        ref: 6,
      },
    ],
    tie: "Hack876 asks students to try something new and see it through, which is exactly how Island Grill was built.",
  },

  story: {
    kicker: "What Island Grill already does",
    headline: "A Jamaican brand that feeds more than its customers.",
    format: "milestones",
    items: [
      {
        label: "1991",
        title: "Founded by Thalia Lyn.",
        text: "Island Grill begins its life as one of the few authentic Jamaican quick service restaurants.",
        ref: 2,
      },
      {
        label: "2016",
        title: "Soupaah Pot of Love.",
        text: "Over 180 projects and more than 10,000 cups of soup donated, with staff serving schools and communities in person.",
        ref: 4,
      },
      {
        label: "2017",
        title: "Supaah Food.",
        text: "A menu of locally grown foods with good nutritional value, to encourage Jamaicans to eat local and healthier.",
        ref: 5,
      },
      {
        label: "2024",
        title: "A scholarship in technology.",
        text: "The Lyn Family/Island Grill Scholarship in Technology is announced at Immaculate Conception High School.",
        ref: 3,
      },
      {
        label: "2026",
        title: "Still growing.",
        text: "Eighteen restaurants, with a plan to reach 30 by 2030.",
        ref: 1,
      },
    ],
    takeaway: "Island Grill already feeds communities and backs young people in technology. One lunch at Hack876 puts both in the same room.",
    art: "Seedling",
  },

  linkedSchool: {
    school: "Immaculate Conception High School",
    text: "Thalia Lyn is an Immaculate alumna, the first inductee of its Hall of Fame in 2013, and announced a technology scholarship there in 2024. Our judge Sheneska Williams is an Immaculate alumna too. Immaculate is in the Hack876 school network; its participation is not yet confirmed.",
    ref: 3,
  },

  paths: [
    {
      label: "Food",
      title: "Feed the room for one day",
      points: [
        "One sponsored lunch, in kind, on the day",
        "Not a catering or canteen arrangement",
        "Plates from the regular menu, vegetarian included",
        "Island Grill team members serving, if they would like to",
      ],
    },
    {
      label: "People",
      title: "Island Grill people in the room",
      points: [
        "A short founder talk on starting small and trying new things",
        "Mentors for Business track teams",
        "A proposed award, presented on stage",
      ],
    },
  ],

  ask: {
    tier: "food",
    fallback: "special",
    why: "Lunch is the one moment every student shares. A one-day, in-kind Island Grill lunch is simple, concrete and close to how Island Grill already serves communities.",
    recognition: "Food & Student Experience Partner · Inaugural Hack876",
    award: {
      name: "Island Grill Business Builder Award (proposed)",
      text: "A suggestion only: an award for the build that would most help a small Jamaican business, with criteria agreed together and the final call left to the judging panel.",
    },
    tracks: ["Business", "Culture", "Wellbeing"],
    inkind: [
      "Lunch for students, mentors, judges and volunteers, delivered to the venue",
      "Grilled chicken, fried fish and vegetarian meals with rice and peas or festival",
      "Island Grill team members to help serve, as they do on community projects",
    ],
  },

  roles: [
    { title: "Lunch team", text: "Island Grill staff who serve the meal and keep the line moving." },
    { title: "Speaker", text: "A short, honest talk on building a Jamaican brand by trying new things." },
    { title: "Mentors", text: "Innovation and marketing staff who help Business track teams think like operators." },
    { title: "Award presenters", text: "The Island Grill team presents its award on stage at the close." },
    { title: "Judging support", text: "Island Grill can advise on award criteria; the judging panel decides." },
  ],

  groundRules: [
    "The lunch is the contribution: no promotions, coupons, sign-ups or marketing campaigns aimed at students beyond the meal itself.",
    "No collection of student contact details or data by sponsors. Photos and names only with school and parent consent.",
    "Dietary needs come first. Hack876 collects allergies and dietary requirements in advance and shares only the meal counts Island Grill needs.",
  ],

  future: [
    "A recurring Island Grill lunch at every Hack876.",
    "A Supaah Food lunch built around local produce.",
    "A Business track challenge built on a real Island Grill problem, if the team wants one.",
    "A Hack876 pathway toward the Lyn Family/Island Grill Scholarship in Technology, only if the family wishes.",
  ],

  questions: [
    "Is this a one-day lunch or a catering arrangement?",
    "How many plates, where and when?",
    "How much notice would our team get?",
    "How are allergies and dietary needs handled?",
    "Will Immaculate Conception take part?",
    "Could our people do more than serve lunch?",
  ],

  closingLine: "We would love to explore the right first step with Thalia and the Island Grill team.",

  sources: [
    {
      id: 1,
      org: "Jamaica Gleaner",
      label: "Island Grill targets 30 stores by 2030 in stepped-up expansion (September 16, 2026)",
      href: "https://jamaica-gleaner.com/article/business/20260916/island-grill-targets-30-stores-2030-stepped-expansion",
    },
    {
      id: 2,
      org: "Island Grill",
      label: "Despite COVID-19, the NEW King Street Island Grill Will Open (About Island Grill, May 10, 2020)",
      href: "https://www.islandgrillja.com/blog/post/despite-covid19-the-new-king-street-island-grill-will-open",
    },
    {
      id: 3,
      org: "Jamaica Observer",
      label: "Lyn announces technology scholarship at Immaculate High (March 24, 2024)",
      href: "https://www.jamaicaobserver.com/2024/03/24/lyn-announces-technology-scholarship-immaculate-high/",
    },
    {
      id: 4,
      org: "Jamaica Gleaner",
      label: "Island Grill serving up soup to those in need (June 19, 2016)",
      href: "https://jamaica-gleaner.com/article/news/20160624/island-grill-serving-soup-those-need",
    },
    {
      id: 5,
      org: "Island Grill",
      label: "Press: Island Grill Launches Supaah Foods (July 26, 2017)",
      href: "https://www.islandgrillja.com/press",
    },
    {
      id: 6,
      org: "Jamaica Observer",
      label: "A taste of perseverance: The Island Grill Story (August 21, 2024)",
      href: "https://www.jamaicaobserver.com/2024/08/21/taste-perseverance-island-grill-story/",
    },
  ],
};

export default deck;
