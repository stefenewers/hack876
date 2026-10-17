import type { SponsorDeckData } from "./types";

/*
 * A donation request. The ComTrust Foundation's mandate covers donations, not
 * sponsorship, so there are no tiers or partner titles here. Local requests
 * come from CIBC Caribbean's budget for each country.
 */
const deck: SponsorDeckData = {
  slug: "cibccomtrust",
  kind: "prize",
  sponsor: "CIBC Caribbean ComTrust Foundation",
  short: "ComTrust Foundation",
  article: "the",
  accent: "#8b1d41",
  recipient: { name: "Ms. Annique Dawkins", title: "Head of Country, CIBC Caribbean Jamaica", ref: 4 },
  preparedFor: "A private donation request prepared for Ms. Annique Dawkins, Head of Country, CIBC Caribbean Jamaica, for the CIBC Caribbean ComTrust Foundation.",
  hero: {
    headline: "A free STEM day for the Caribbean's next builders.",
    highlight: "next builders",
    sub: "The ComTrust Foundation backs youth and education across the Caribbean. Hack876 gives Jamaican secondary-school students a free day to learn by building technology.",
  },
  brief: {
    fit: "Youth and Education is one of the ComTrust Foundation's three focus areas, and CIBC Caribbean has backed coding and robotics programmes for young people across the region.",
    fitRef: 1,
    request: "A donation toward Hack876, a free youth STEM education programme in Kingston.",
    enables: "Meals, materials and mentoring for about {students} secondary-school students, free of charge to them.",
    outcome: "A tangible benefit to young people in a community where CIBC Caribbean works, and a written recap of who took part and what they built.",
    next: "A reply on whether the Foundation would consider a donation from its Jamaica budget, and who should receive the request.",
  },
  why: {
    headline: "Youth, education and the region's own innovators.",
    mission: {
      label: "CIBC Caribbean, Memoranda of Understanding",
      quote: "To advance the development of the economies and people of the entire Caribbean region, educational programmes must be expanded and enriched wherever possible.",
      ref: 2,
    },
    points: [
      { text: "The Foundation is funded with 1% of CIBC Caribbean's post-tax profits, and Youth and Education is one of its three focus areas.", ref: 1 },
      { text: "It has supported the Caribbean Science Foundation, whose programmes include the Caribbean STEM Olympiads, junior robotics camps and coding workshops.", ref: 3 },
      { text: "In Kingston, CIBC Caribbean gave Wolmer's Girls' School 40 chairs for its computer lab in 2024.", ref: 5 },
    ],
    tie: "Hack876 is a free day where Jamaican students stop consuming technology and start building it.",
  },
  story: {
    kicker: "What the Foundation already backs",
    headline: "Technology and learning for young people.",
    format: "evidence",
    items: [
      { label: "2024", title: "Robotics and coding.", text: "Support for the Caribbean Science Foundation's STEM Olympiads, junior robotics camps and coding workshops.", ref: 3 },
      { label: "May 2024", title: "A computer lab in Kingston.", text: "40 ergonomic chairs for the computer lab at Wolmer's Girls' School.", ref: 5 },
      { label: "January 2025", title: "Tablets for learning.", text: "Support for a new computer lab and tablets for special-needs education at the Best Care Foundation in Kingston.", ref: 6 },
      { label: "Across the region", title: "Ten countries.", text: "CIBC Caribbean works in ten Caribbean countries, with local giving managed in each one.", ref: 4 },
    ],
    takeaway: "The Foundation already invests in young people and technology. Hack876 is a free day where they build with it.",
  },
  ask: {
    lead: "band",
    figure: "J$150,000 to J$300,000",
    headline: "A donation toward a free youth STEM programme.",
    bands: [],
    uses: ["meals", "materials", "programming"],
    why: "A donation in this range helps support meals, materials and mentoring for the day. This is a request for a donation, not a sponsorship.",
    recognition: "Acknowledgement as the Foundation prefers",
    tracks: ["Learn", "Create & Hustle"],
  },
  groundRules: [
    "Hack876 is free for every student who takes part.",
    "No marketing to students, and no student data shared with donors. Photos and names only with school and parent consent.",
    "The judging panel decides every award.",
  ],
  future: ["The Foundation's support for Hack876 each year, as the programme grows.", "Students from more Caribbean countries taking part in future years."],
  closingLine: "We would be grateful for the ComTrust Foundation's support for the first Hack876.",
  sources: [
    { id: 1, org: "CIBC Caribbean", label: "About the ComTrust Foundation", href: "https://www.cibccaribbean.com/about-us/community-relations" },
    { id: 2, org: "CIBC Caribbean", label: "Memoranda of Understanding", href: "https://www.cibccaribbean.com/about-us/community-relations/memoranda-of-understanding" },
    { id: 3, org: "CIBC Caribbean", label: "Robotics camp 2024 (August 20, 2024)", href: "https://www.cibccaribbean.com/binaries/content/assets/news-releases/news-releases-2024/press-release-robotics-camp-2024.pdf" },
    {
      id: 4,
      org: "CIBC Caribbean",
      label: "Recovery to resilience: prepaid cards for Jamaica Library Service employees (February 20, 2026)",
      href: "https://www.cibccaribbean.com/binaries/content/assets/news-releases/news-releases-2026/press-release-recovery-to-resilience-cibc-caribbean-prepaid-cards-provide-relief-to-jamaica-library-service-employees_.pdf",
    },
    {
      id: 5,
      org: "CIBC Caribbean",
      label: "Wolmer's Girls receive 40 chairs for computer lab (May 27, 2024)",
      href: "https://www.cibccaribbean.com/binaries/content/assets/news-releases/news-releases-2024/press-release-wolmers-girls-receive-40-chairs-for-computer-lab.pdf",
    },
    {
      id: 6,
      org: "CIBC Caribbean",
      label: "Best Care Foundation computer lab and tablets for special needs education (January 13, 2025)",
      href: "https://www.cibccaribbean.com/binaries/content/assets/news-releases/news-releases-2025/press-release-best-care-foundation-fundraiser-to-support-new-computer-lab-and-tablets-for-special-needs-education-with-support-from-cibc-caribbean.pdf",
    },
  ],
};

export default deck;
