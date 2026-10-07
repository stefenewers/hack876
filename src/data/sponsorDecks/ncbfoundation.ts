import type { SponsorDeckData } from "./types";

const deck: SponsorDeckData = {
  slug: "ncbfoundation",
  kind: "full",
  sponsor: "N.C.B. Foundation",
  short: "NCB Foundation",
  article: "the",
  accent: "#01529a",

  recipient: { name: "Perrin Gayle", title: "Chief Executive Officer, N.C.B. Foundation", ref: 1 },
  preparedFor:
    "A private partnership proposal prepared for Perrin Gayle, Chief Executive Officer, N.C.B. Foundation. Attention: Thalia Lyn, Chair.",

  hero: {
    headline: "Jamaica's next digital producers have to start somewhere.",
    highlight: "digital producers",
    sub: "The NCB Foundation pays for students to sit IT exams so Jamaica can grow its pool of digital producers. Hack876 gives them one day to actually produce something.",
  },

  futurePaths: [
    { icon: "laptop", label: "Software developer" },
    { icon: "chart", label: "Data scientist" },
    { icon: "controller", label: "Animator or game maker" },
    { icon: "board", label: "Robotics engineer" },
    { icon: "business", label: "Founder" },
  ],

  why: {
    headline: "You already invest in the subjects. We add the first build.",
    mission: {
      label: "N.C.B. Foundation mission",
      quote: "Empowering minds, strengthening communities and building Jamaica's future.",
      ref: 1,
    },
    points: [
      {
        text: "The Foundation is the philanthropic arm of the NCB Financial Group, funded by 1% of NCB Jamaica's annual profits.",
        ref: 1,
      },
      {
        text: "In 2019 it shifted its focus to digital, with a goal to support the expansion of the pool of digital producers in Jamaica.",
        ref: 2,
      },
      {
        text: "Its 2026 CSEC bursary covers Information Technology, Principles of Accounts and Principles of Business, built around access, relevance and preparedness.",
        ref: 3,
      },
      {
        text: "Its scholarships give preference to technology and computing, software, data science, cybersecurity and digital media.",
        ref: 4,
      },
      {
        text: "Its Level Up Grants Programme offers digital skills training and supports entrepreneurship.",
        ref: 5,
      },
    ],
    tie: "Hack876 is where students who sit IT get to prove they can build with it.",
  },

  story: {
    kicker: "The record",
    headline: "Years of steady, measurable giving to education.",
    format: "evidence",
    items: [
      {
        label: "Since 2003",
        title: "1% of profits, every year.",
        text: "Funded by 1% of NCB Jamaica's annual profits, with J$1BN+ invested in education and 111,720 students assisted (as at December 2024).",
        ref: 1,
      },
      {
        label: "2019",
        title: "A deliberate turn to digital.",
        text: "The Foundation shifted its focus to digital to grow Jamaica's pool of digital producers, moving its CSEC bursary towards Information Technology.",
        ref: 2,
      },
      {
        label: "2026",
        title: "3,183 students. 36 schools.",
        text: "J$15.9 million in CSEC exam fees for IT, Principles of Accounts and Principles of Business, up from 1,310 students in 2025.",
        ref: 3,
      },
      {
        label: "Scholarships",
        title: "Tech comes first.",
        text: "Undergraduate scholarships give preference to computing, software, data science, cybersecurity and creative technologies.",
        ref: 4,
      },
      {
        label: "Digital Scholarship",
        title: "Up to J$400,000 a year.",
        text: "A dedicated Digital Scholarship for first-year students at accredited local institutions.",
        ref: 5,
      },
    ],
    takeaway: "The Foundation measures what it gives. Hack876 is built to be measured the same way.",
    art: "Compounding",
  },

  linkedSchool: {
    school: "Immaculate Conception High School",
    text: "Thalia Lyn is an Immaculate alumna and the school's first Hall of Fame inductee, and has backed a technology scholarship there. Our judge Sheneska Williams is an Immaculate alumna too.",
    ref: 6,
  },

  paths: [
    {
      label: "Path 1 · The Foundation",
      title: "A grant from the N.C.B. Foundation",
      points: [
        "Fits the Foundation's focus on digital skills and education.",
        "Follows naturally from the CSEC IT bursary.",
        "Reported back in students, schools and builds.",
        "Recognition for the Foundation, not NCB products.",
      ],
    },
    {
      label: "Path 2 · NCB sponsorships",
      title: "Through NCB's sponsorship request",
      points: [
        "Uses NCB's own sponsorship form.",
        "Speaks to Empowering People, Unlocking Dreams, Building Communities.",
        "Includes a clear plan for measuring success.",
      ],
    },
  ],
  pathsNote: {
    text: "NCB's sponsorship form asks how an initiative aligns with Empowering People, Unlocking Dreams, Building Communities, and how success will be measured. We have answered both here.",
    ref: 7,
  },

  ask: {
    tier: "gold",
    fallback: "prize",
    why: "Gold is flexible: it covers prizes, food and the day itself in one gift. If an itemised gift fits the Foundation better, the Prize Partner tier is a clean alternative.",
    recognition: "Founding Gold Partner · Inaugural Hack876",
    award: {
      name: "N.C.B. Foundation Digital Producers Award (suggested)",
      text: "A suggested award for the team with the most complete working build, echoing the Foundation's own goal of growing Jamaica's pool of digital producers.",
    },
    tracks: ["Learn", "Business"],
  },

  roles: [
    { title: "NCBees on the floor", text: "A few NCBees volunteers to help with check-in, timekeeping and keeping teams moving." },
    { title: "Judges", text: "People from NCB's technology, digital and data teams to judge alongside our panel." },
    { title: "Business-track mentors", text: "Finance and business staff to help teams in the Business track test their numbers." },
    { title: "A word to open the day", text: "Perrin Gayle or someone from the Foundation on why digital skills matter for Jamaica." },
    { title: "A scholar's story", text: "A Foundation scholar from a tech discipline, if one is willing, on what came after their first build." },
  ],

  groundRules: [
    "No banking products, accounts or financial offers are marketed to students. Many participants are minors.",
    "No student data is collected or shared for the Foundation or NCB. Any recap uses group numbers and school-approved photos only.",
    "Volunteers and judges work in open, supervised spaces under the host school's safeguarding rules.",
  ],

  future: [
    "A recurring Digital Producers award that returns each year.",
    "Places for students from CSEC IT bursary schools as Hack876 grows.",
    "A clear signpost from Hack876 to the Foundation's Digital and National Scholarships.",
    "A link to the Level Up Grants Programme for students who want to keep building.",
    "NCBees-led prep sessions in schools before the day.",
  ],

  questions: [
    "How will you measure success, and what will you report back to us?",
    "How does this connect to the CSEC IT bursary schools we already support?",
    "What exactly would a Gold gift pay for?",
    "When is the date, and when would you need a decision?",
    "Who else are you asking, including other financial institutions?",
    "How do you protect students, especially the minors?",
  ],

  closingLine: "We would love to explore the right first step with Perrin, Thalia and the N.C.B. Foundation team.",

  sources: [
    {
      id: 1,
      org: "National Commercial Bank Jamaica",
      label: "N.C.B. Foundation: Who We Are",
      href: "https://www.jncb.com/about-us/ncb-foundation/who-we-are/",
    },
    {
      id: 2,
      org: "Jamaica Observer",
      label: "NCB Foundation expands CSEC bursary (March 22, 2024)",
      href: "https://www.jamaicaobserver.com/2024/03/22/ncb-foundation-expands-csec-bursary",
    },
    {
      id: 3,
      org: "Jamaica Information Service",
      label: "NCB Foundation Provides $15.9 Million to Pay Exam Fees for 3,183 Students (April 18, 2026)",
      href: "https://jis.gov.jm/ncb-foundation-provides-15-9-million-to-pay-exam-fees-for-3183-students/",
    },
    {
      id: 4,
      org: "Jamaica Observer",
      label: "'Don't count yourself out' (July 8, 2026)",
      href: "https://www.jamaicaobserver.com/2026/07/08/dont-count-yourself-out/",
    },
    {
      id: 5,
      org: "National Commercial Bank Jamaica",
      label: "N.C.B. Foundation: Explore Opportunities",
      href: "https://www.jncb.com/about-us/ncb-foundation/opportunities/",
    },
    {
      id: 6,
      org: "Jamaica Observer",
      label: "Lyn announces technology scholarship at Immaculate High (March 24, 2024)",
      href: "https://www.jamaicaobserver.com/2024/03/24/lyn-announces-technology-scholarship-immaculate-high/",
    },
    {
      id: 7,
      org: "National Commercial Bank Jamaica",
      label: "NCB Sponsorships",
      href: "https://www.jncb.com/about-us/sponsorships/",
    },
  ],
};

export default deck;
