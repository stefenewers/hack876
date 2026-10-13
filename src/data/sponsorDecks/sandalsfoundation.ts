import type { SponsorDeckData } from "./types";

/*
 * Exploratory brief for the Sandals Foundation. Its 2027 concept window has
 * closed and its guidelines exclude one-off events without sustainable impact,
 * so this asks about fit and makes no funding request.
 */
const deck: SponsorDeckData = {
  slug: "sandalsfoundation",
  kind: "prize",
  sponsor: "Sandals Foundation",
  short: "Sandals Foundation",
  article: "the",
  accent: "#c1e8df",
  recipient: {
    name: "the Sandals Foundation team",
    title: "",
    ref: 3,
  },
  preparedFor: "A private exploratory brief prepared for the team at the Sandals Foundation.",
  hero: {
    headline: "Let the learning continue after the demo.",
    highlight: "after the demo",
    sub: "The Sandals Foundation looks for lasting benefit, not a single day. We would like to introduce Hack876 and ask whether what happens after the event could ever be a fit.",
  },
  brief: {
    fit: "Education is one of the Sandals Foundation's focus areas, including digital literacy, and its guidelines look for lasting benefit.",
    request: "An introduction, and an honest answer on whether the work that follows Hack876 could ever fit the Foundation's guidelines.",
    enables: "It tells us whether to design follow-up resources and mentoring with a future cycle in mind.",
    outcome: "Whether a route exists, what lasting benefit would need to look like, and who to speak with.",
    next: "A short reply through the Foundation's contact page to say whether a conversation is worthwhile.",
  },
  why: {
    headline: "Digital learning that lasts longer than a day.",
    points: [
      {
        text: "Education is one of the Foundation's strategic focus areas, covering school infrastructure, teacher training, digital literacy and scholarships.",
        ref: 1,
      },
      {
        text: "In 2021 the Foundation and Rainforest delivered some fifty digital tablets to students at St Mary Primary School in Above Rocks, St. Catherine.",
        ref: 2,
      },
      { text: "Its Lessons Alive campaign, from August 2020, raised funds for digital tablets for vulnerable primary school students.", ref: 2 },
    ],
    tie: "Hack876 is one day. The question we want to ask is what could stay with students and schools afterwards.",
  },
  story: {
    kicker: "What the Foundation already does",
    headline: "Devices in students' hands, and a clear process for what comes next.",
    format: "evidence",
    items: [
      {
        label: "August 2020",
        title: "Lessons Alive.",
        text: "A campaign that raised funds to buy and distribute digital tablets to vulnerable primary school students.",
        ref: 2,
      },
      {
        label: "December 2021",
        title: "Fifty tablets in Above Rocks.",
        text: "Delivered with Rainforest to students aged 6 to 12 at St Mary Primary School, based on a needs assessment.",
        ref: 2,
      },
      {
        label: "2027 projects",
        title: "A two-stage process.",
        text: "Concept applications were open from July 6 to 27, 2026. Full proposals are by invitation only.",
        ref: 1,
      },
      {
        label: "Guidelines",
        title: "Long-term benefit is required.",
        text: "Projects must include measurable outcomes and long-term benefit. One-off events without sustainable impact are not funded.",
        ref: 1,
      },
    ],
    takeaway: "We have read the guidelines. A one-day event on its own does not meet them, and we are not asking for an exception.",
  },
  paths: [
    {
      label: "To explore",
      title: "Is there a suitable route, now or later?",
      points: [
        "A future cycle, if the lasting part of the work fits",
        "Resources schools could reuse after the day",
        "Mentoring that continues after the event",
        "Or simply an introduction, with nothing asked",
      ],
    },
  ],
  pathsNote: {
    text: "The Foundation takes enquiries through the contact page on its website.",
    ref: 3,
  },
  ask: {
    lead: "exploratory",
    bands: [],
    uses: ["materials", "equipment", "programming"],
    restriction: "The 2027 guidelines require legally registered organisations and long-term benefit. They exclude one-off events without sustainable impact, and sponsorships or prizes without broader community benefit. The concept window closed on July 27, 2026. We do not assume Hack876 is eligible, and this is not a late submission.",
    why: "We would like the Foundation to know Hack876 exists, and to hear honestly whether the part that continues after the day could ever fit its work.",
    recognition: "No funding request in this brief",
    tracks: ["Learn", "Resilience"],
    inkind: [
      "Is there a future or alternative route that could suit work like this?",
      "Would reusable school resources be closer to what the Foundation supports?",
      "Would follow-up mentoring count as lasting benefit?",
      "Who is the right person to speak with, and when?",
    ],
  },
  roles: [
    { title: "A guest at the finals", text: "Someone from the Foundation is welcome to watch the final pitches and meet the students." },
    { title: "Advice", text: "Guidance on what lasting benefit would need to look like for work of this kind." },
    { title: "An introduction", text: "If another organisation is a better home for this, we would be glad to be pointed to it." },
  ],
  groundRules: [
    "No marketing to students and no sign-ups on the day.",
    "No collection of student contact details by partners. Photos and names only with school and parent consent.",
  ],
  future: [
    "Resources from the day that schools could reuse in class.",
    "Follow-up mentoring for teams after the event.",
    "A concept application in a future cycle, if the work fits and Hack876 is eligible.",
  ],
  closingLine: "We would welcome a conversation with the Sandals Foundation team, whatever the answer turns out to be.",
  sources: [
    {
      id: 1,
      org: "Sandals Foundation",
      label: "Sandals Foundation 2027 Project Guidelines & Selection Criteria (July 2026)",
      href: "https://sandalsfoundation.org/news/sandals-foundation-2027-project-guidelines-and-selection-criteria",
    },
    {
      id: 2,
      org: "Sandals Foundation",
      label: "Sandals Foundation and Rainforest Open A New World of Learning for Vulnerable Primary School Students (December 2021)",
      href: "https://sandalsfoundation.org/news/sandals-foundation-and-rainforest-open-a-new-world-of-learning-for-vulnerable-primary-school-students",
    },
    { id: 3, org: "Sandals Foundation", label: "Contact", href: "https://sandalsfoundation.org/contact" },
  ],
};

export default deck;
