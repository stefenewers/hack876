import type { SponsorDeckData } from "./types";

const deck: SponsorDeckData = {
  slug: "ncbfoundation",
  kind: "full",
  sponsor: "N.C.B. Foundation",
  short: "NCB Foundation",
  article: "the",
  accent: "#01529a",
  recipient: {
    name: "Perrin Gayle",
    title: "Chief Executive Officer, N.C.B. Foundation",
    ref: 1,
  },
  preparedFor: "A private partnership proposal prepared for Perrin Gayle, Chief Executive Officer, N.C.B. Foundation. Attention: Thalia Lyn, Chair.",
  hero: {
    headline: "Jamaica's next digital producers have to start somewhere.",
    highlight: "digital producers",
    sub: "The NCB Foundation pays for students to sit IT exams so Jamaica can grow its pool of digital producers. Hack876 gives them one day to actually produce something.",
  },
  brief: {
    fit: "The N.C.B. Foundation pays for students to sit CSEC IT so that Jamaica can grow its pool of digital producers.",
    request: "A Platinum contribution toward the inaugural event, or any level that suits the Foundation this year.",
    enables: "Helps support the prizes, student meals and the running of the day.",
    outcome: "About {students} secondary-school students spend a day turning IT skills into a working prototype. The Foundation receives Platinum recognition and a written recap.",
    next: "A reply on which route the Foundation prefers: a direct grant, or NCB's sponsorship request form.",
  },
  why: {
    headline: "You already invest in the subjects. We add the first build.",
    mission: { label: "N.C.B. Foundation mission", quote: "Empowering minds, strengthening communities and building Jamaica's future.", ref: 1 },
    points: [
      { text: "The Foundation is the philanthropic arm of the NCB Financial Group, funded by 1% of NCB Jamaica's annual profits.", ref: 1 },
      { text: "In 2019 it shifted its focus to digital, with a goal to support the expansion of the pool of digital producers in Jamaica.", ref: 2 },
      {
        text: "Its 2026 CSEC bursary covers Information Technology, Principles of Accounts and Principles of Business, built around access, relevance and preparedness.",
        ref: 3,
      },
      { text: "Its scholarships give preference to technology and computing, software, data science, cybersecurity and digital media.", ref: 4 },
      { text: "Its Level Up Grants Programme offers digital skills training and supports entrepreneurship.", ref: 5 },
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
  },
  linkedSchool: {
    school: "Immaculate Conception High School",
    text: "The Foundation's Chair, Thalia Lyn, is an Immaculate alumna and the school's first Hall of Fame inductee, and has backed a technology scholarship there. Our judge Sheneska Williams is an Immaculate alumna too.",
    ref: 6,
  },
  pathsNote: {
    text: "NCB's sponsorship form asks how an initiative aligns with Empowering People, Unlocking Dreams, Building Communities, and how success will be measured. We have answered both here.",
    ref: 7,
  },
  ask: {
    lead: "band",
    band: "platinum",
    uses: ["overall", "prizes", "meals", "production"],
    why: "Platinum is flexible: it helps support prizes, meals and the day itself in one gift. If a smaller gift fits the Foundation better this year, a contribution at any level is welcome.",
    recognition: "Platinum Partner · Inaugural Hack876",
    tracks: ["Learn", "Business"],
  },
  groundRules: [
    "No banking products, accounts or financial offers are marketed to students. Many participants are minors.",
    "No student data is collected or shared for the Foundation or NCB. Any recap uses group numbers and school-approved photos only.",
    "Volunteers and judges work in open, supervised spaces.",
  ],
  future: [
    "Places for students from CSEC IT bursary schools as Hack876 grows.",
    "A clear signpost from Hack876 to the Foundation's Digital and National Scholarships.",
    "A link to the Level Up Grants Programme for students who want to keep building.",
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
    { id: 7, org: "National Commercial Bank Jamaica", label: "NCB Sponsorships", href: "https://www.jncb.com/about-us/sponsorships/" },
  ],
};

export default deck;
