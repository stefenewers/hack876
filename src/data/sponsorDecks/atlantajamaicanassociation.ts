import type { SponsorDeckData } from "./types";

const deck: SponsorDeckData = {
  slug: "atlantajamaicanassociation",
  kind: "prize",
  sponsor: "The Atlanta Jamaican Association, Inc.",
  short: "AJA",
  article: "the",
  accent: "#194F0C",
  recipient: {
    name: "Evette Taylor-Reynolds",
    title: "President, The Atlanta Jamaican Association, Inc.",
    ref: 1,
  },
  preparedFor: "A private partnership proposal prepared for Evette Taylor-Reynolds, President, The Atlanta Jamaican Association.",
  hero: {
    headline: "From Atlanta, a hand back home.",
    highlight: "a hand back home",
    sub: "The AJA has backed students of Jamaican heritage, in Atlanta and in Jamaica, for decades. Hack876 gives Kingston students one day to build something real, and a reason to know the diaspora is cheering them on.",
  },
  brief: {
    fit: "The AJA Scholarship has helped students of Jamaican heritage, in metro Atlanta and in Jamaica, since 1995.",
    request: "A Bronze contribution from the Association, or pooled from its members.",
    enables: "Helps support an existing special award and the student programme on the day.",
    outcome: "Bronze recognition, a written recap the AJA can share with members, and Hack876 organisers reporting back at a monthly meeting.",
    next: "A reply from the President on whether to bring this to the membership, and at which monthly meeting.",
  },
  why: {
    headline: "Roots in Jamaica. Community in Atlanta. Students in both.",
    mission: {
      label: "The Atlanta Jamaican Association, mission",
      quote: "The mission of the Atlanta Jamaican Association, Inc. (AJA) is to foster goodwill and understanding among Jamaicans and all peoples in metro Atlanta, through civic, economic, cultural, and philanthropic programs and activities; and to provide assistance to Jamaicans living in the area and in Jamaica.",
      ref: 2,
    },
    points: [
      {
        text: "Since 1995, the AJA Scholarship has helped graduating seniors of Jamaican heritage, in metro Atlanta and in Jamaica, with first-year college costs. Over 100 students have received awards.",
        ref: 3,
      },
      {
        text: "Since 2016, the AJA has given $200K in scholarships and aid, and more than 150 students have received its help with university studies.",
        ref: 4,
      },
      { text: "Its outreach to Jamaica has included books, supplies and equipment for basic schools.", ref: 5 },
      {
        text: "Through Rep Yuh Parish, members team up to choose, fund and take part in a community project in the parish they are closest to.",
        ref: 5,
      },
    ],
    tie: "Hack876 is a chance for Atlanta's Jamaican community to cheer on students back home on the day they build something of their own.",
  },
  story: {
    kicker: "What the AJA already does",
    headline: "Nearly fifty years of looking after our own.",
    format: "milestones",
    items: [
      {
        label: "1977",
        text: "The Atlanta Jamaican Association is founded on October 8, and is incorporated the next year. Today it is the oldest Jamaican organization in metro Atlanta.",
        ref: 2,
      },
      {
        label: "1995",
        text: "The AJA Scholarship begins, run with the AJ Cultural & Educational Fund, for students of Jamaican heritage in metro Atlanta and in Jamaica.",
        ref: 3,
      },
      { label: "2016", text: "The start of a run that has since reached $200K in scholarships and aid for students.", ref: 4 },
      { label: "2021", text: "Rep Yuh Parish launches, with members funding projects in their home parishes in Jamaica.", ref: 5 },
      {
        label: "2026",
        text: "A sold-out Independence Ball and Scholarship Awards under the theme \"Jamaica 64: A Legacy of Resilience\", and a new Tony Gray Memorial Scholarship.",
        ref: 6,
      },
    ],
    takeaway: "The AJA already invests in students on both sides of the water. Hack876 is one more place where that support shows up for young Jamaicans.",
  },
  linkedSchool: {
    school: "Campion College",
    text: "Evette Taylor-Reynolds began a teaching career at Campion College, according to the 2026 Marcus Garvey Symposium programme. Both Hack876 organisers are Campion alumni.",
    ref: 7,
  },
  pathsNote: {
    text: "The AJA meets on the second Saturday of each month at 6:00 p.m., except August and December, and welcomes all. The President can be reached at president@atlantajamaicanassociation.org.",
    ref: 2,
  },
  ask: {
    lead: "band",
    band: "bronze",
    uses: ["awards", "programming"],
    why: "It is small and concrete, close in spirit to the scholarships the AJA already gives, and it lets members see exactly what their support did.",
    recognition: "Bronze Partner · Inaugural Hack876",
    tracks: ["Culture", "Learn", "Life"],
  },
  groundRules: [
    "No marketing, membership drives or fundraising aimed at students, and no sign-ups on the day.",
    "No collection of student contact details or data by partners. Photos and names only with school and parent consent.",
    "Anyone volunteering in person follows our safeguarding rules and is never alone with students; the judging panel decides every award.",
  ],
  future: [
    "Pointing eligible finalists heading to college toward the AJA Scholarship, on its usual terms.",
    "Rep Yuh Parish teams picking up a student build that could help their parish.",
  ],
  closingLine: "We would love to explore the right first step with Evette and the Atlanta Jamaican Association family.",
  sources: [
    { id: 1, org: "Atlanta Jamaican Association", label: "2026 Board of Directors", href: "https://www.atlantajamaicanassociation.org/board" },
    {
      id: 2,
      org: "Atlanta Jamaican Association",
      label: "About Us: mission, history, lasting impact, meetings and contact",
      href: "https://www.atlantajamaicanassociation.org/about-1",
    },
    { id: 3, org: "Atlanta Jamaican Association", label: "The AJA Scholarship", href: "https://www.atlantajamaicanassociation.org/scholarship" },
    { id: 4, org: "Atlanta Jamaican Association", label: "Home: our impact", href: "https://www.atlantajamaicanassociation.org/" },
    {
      id: 5,
      org: "Atlanta Jamaican Association",
      label: "Our Impact: outreach to Jamaica and Rep Yuh Parish",
      href: "https://www.atlantajamaicanassociation.org/our-impact",
    },
    {
      id: 6,
      org: "Atlanta Jamaican Association",
      label: "News & Events: highlights from the 2026 Independence Ball & Scholarship Awards",
      href: "https://www.atlantajamaicanassociation.org/news",
    },
    {
      id: 7,
      org: "Big Bethel AME Church",
      label: "3rd Annual Atlanta Marcus Garvey Symposium programme (March 25, 2026): AJA President bio",
      href: "https://www.bigbethelame.org/_files/ugd/c3808e_8b54c0820b7d448a902c52ad3ee5df95.pdf",
    },
  ],
};

export default deck;
