import type { SponsorDeckData } from "./types";

/*
 * A direct partnership request to the Sandals Foundation. Its published project
 * grants run through a two-stage annual cycle and exclude one-off events, so the
 * deck says so plainly and offers to follow the grant route if that is the only
 * way the Foundation can consider it.
 */
const deck: SponsorDeckData = {
  slug: "sandalsfoundation",
  kind: "prize",
  sponsor: "Sandals Foundation",
  short: "Sandals Foundation",
  article: "the",
  accent: "#0b6e8a",
  recipient: { name: "the leadership of the Sandals Foundation", title: "" },
  preparedFor: "A private partnership proposal prepared for the leadership of the Sandals Foundation.",
  hero: {
    headline: "Every computer lab deserves a builder.",
    highlight: "a builder",
    sub: "The Sandals Foundation has helped keep Jamaican school computer labs running. Hack876 gives secondary-school students one day to put that kind of technology to work on a real problem.",
  },
  brief: {
    fit: "The Sandals Foundation names digital literacy as part of its education work, and has kept Jamaican school computer labs running with solar power.",
    fitRef: 2,
    request: "A Silver contribution from the Sandals Foundation toward the inaugural event.",
    enables: "Helps support the equipment teams build with and the student programme on the day.",
    outcome: "Silver recognition, including placement on event signage and acknowledgement in the opening and closing, and a written recap of who took part and what they built.",
    next: "A yes from the Foundation, at Silver or another level, and the name of the person on your team who will handle it. Hack876 takes care of everything from there.",
  },
  why: {
    headline: "Technology in students' hands, and a group that backs education.",
    points: [
      { text: "Education is one of the Foundation's strategic focus areas, covering school infrastructure, teacher training, digital literacy and scholarships.", ref: 4 },
      {
        text: "The Foundation installed solar power at Hague Primary and Infant School and Cove Primary so that their computer labs keep running when the grid does not.",
        ref: 2,
      },
      {
        text: "In 2026 Sandals Resorts International, which funds the Foundation's governance, gave J$6 million to the Jill Stewart MoBay City Run, which has handed over J$45 million toward education since it began.",
        ref: 1,
      },
    ],
    tie: "Hack876 is where secondary-school students put technology to work on a problem they care about, in one day.",
  },
  story: {
    kicker: "What the Foundation already backs",
    headline: "Years of investing in Jamaican students.",
    format: "evidence",
    items: [
      {
        label: "MoBay City Run · 2026",
        title: "J$6 million for a run that funds education.",
        text: "Announced by Adam Stewart, Executive Chairman, for the run's 10th staging.",
        ref: 1,
      },
      {
        label: "Computer labs",
        title: "Solar power for school labs.",
        text: "Solar systems at Hague Primary and Cove Primary keep their computer labs running. Hague also received 20 computers from the Foundation in 2024.",
        ref: 2,
      },
      {
        label: "December 2021",
        title: "Fifty tablets in Above Rocks.",
        text: "Delivered with Rainforest to students at St Mary Primary School, based on a needs assessment.",
        ref: 3,
      },
      {
        label: "Education focus",
        title: "Digital literacy, by design.",
        text: "Education is one of the Foundation's strategic focus areas, covering school infrastructure, teacher training, digital literacy and scholarships.",
        ref: 4,
      },
    ],
    takeaway: "The Foundation has put technology into Jamaican classrooms for years. Hack876 is a day for students to build something with it.",
  },
  ask: {
    lead: "band",
    band: "silver",
    uses: ["equipment", "programming", "overall"],
    restriction:
      "This is a direct partnership request, not an application to the Foundation's annual grant cycle. If it needs to go through that process instead, we will follow it.",
    why: "Silver helps support the technology and programme at the centre of the day. If a different level suits the Foundation better, any of them is welcome.",
    recognition: "Silver Partner · Inaugural Hack876",
    tracks: ["Learn", "Resilience", "Business"],
  },
  groundRules: [
    "No marketing of resorts, travel or other products to students, and no sign-ups on the day.",
    "No collection of student contact details by sponsors. Photos and names only with school and parent consent.",
    "The judging panel decides every award. Sponsorship carries no influence over judging.",
  ],
  pathsNote: { text: "The Sandals Foundation lists foundation@grp.sandals.com and 876-935-0705 for enquiries.", ref: 6 },
  future: ["The Sandals Foundation as a partner at every Hack876, growing with the event.", "A Resilience-track challenge drawn from tourism or energy, if Sandals would like to set one."],
  closingLine: "We would love the Sandals Foundation to be part of the first Hack876.",
  sources: [
    {
      id: 1,
      org: "Jamaica Observer",
      label: "Sandals pumps $6 million into 2026 staging of Jill Stewart MoBay City Run (March 11, 2026)",
      href: "https://www.jamaicaobserver.com/2026/03/11/sandals-pumps-6-million-2026-staging-jill-stewart-mobay-city-run/",
    },
    {
      id: 2,
      org: "Caribbean360",
      label: "Sandals Foundation invests JMD $4M to bring solar power to Western Jamaica schools (2026)",
      href: "https://caribbean360.com/sandals-foundation-invests-jmd-4m-to-bring-solar-power-to-western-jamaica-school",
    },
    {
      id: 3,
      org: "Sandals Foundation",
      label: "Sandals Foundation and Rainforest Open A New World of Learning for Vulnerable Primary School Students (December 2021)",
      href: "https://sandalsfoundation.org/news/sandals-foundation-and-rainforest-open-a-new-world-of-learning-for-vulnerable-primary-school-students",
    },
    {
      id: 4,
      org: "Sandals Foundation",
      label: "Sandals Foundation 2027 Project Guidelines & Selection Criteria (July 2026)",
      href: "https://sandalsfoundation.org/news/sandals-foundation-2027-project-guidelines-and-selection-criteria",
    },
    { id: 5, org: "Sandals Foundation", label: "Get Involved", href: "https://sandalsfoundation.org/get-involved" },
    { id: 6, org: "Sandals Foundation", label: "Contact", href: "https://sandalsfoundation.org/contact" },
  ],
};

export default deck;
