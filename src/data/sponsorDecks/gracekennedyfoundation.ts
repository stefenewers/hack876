import type { SponsorDeckData } from "./types";

/*
 * Exploratory brief for the GraceKennedy Foundation. Separate from
 * /gracekennedyopportunity, which is addressed to GK General Insurance.
 * The Foundation's published grant call is closed and does not cover Hack876,
 * so this asks about fit and makes no funding request.
 */
const deck: SponsorDeckData = {
  slug: "gracekennedyfoundation",
  kind: "prize",
  sponsor: "GraceKennedy Foundation",
  short: "GraceKennedy Foundation",
  article: "the",
  accent: "#e30613",

  recipient: { name: "the GraceKennedy Foundation team", title: "", ref: 1 },
  preparedFor: "A private exploratory brief prepared for the team at the GraceKennedy Foundation.",

  hero: {
    headline: "An introduction to Hack876 and a conversation about educational fit.",
    highlight: "educational fit",
    sub: "The GraceKennedy Foundation has worked on access to education in Jamaica since 1982. We would like to introduce Hack876 and ask whether there is a suitable way to work together, now or later.",
  },

  why: {
    headline: "Access to quality education is the shared ground.",
    mission: {
      label: "GraceKennedy Foundation, Information on Grants",
      quote:
        "Its mission is to support GraceKennedy's practice and ethos of 'We Care' by creating environmentally sustainable programmes, promoting healthy lifestyles and increasing access to quality education.",
      ref: 1,
    },
    points: [
      { text: "The Foundation was established in 1982 to mark the 60th anniversary of GraceKennedy & Company Limited.", ref: 3 },
      { text: "Over three decades it has invested some US$1 million in scholarships, at institutions including the University of the West Indies and the University of Technology.", ref: 2 },
      { text: "In 2016 it funded an early childhood education STEAM pilot project.", ref: 3 },
    ],
    tie: "Hack876 is a free day of learning by building for secondary-school students. Whether that fits the Foundation's work is the question we are asking.",
  },

  story: {
    kicker: "What the Foundation already does",
    headline: "Four decades of investing in education.",
    format: "evidence",
    items: [
      { label: "1982", title: "Established.", text: "Set up to mark GraceKennedy's 60th anniversary. Its first grants were issued the following year.", ref: 3 },
      { label: "1984", title: "A national scholarship.", text: "The Foundation took full responsibility for the GraceKennedy/Jamaica Scholarship.", ref: 3 },
      { label: "Scholarships", title: "Some US$1 million over three decades.", text: "Scholarships and bursaries for secondary and tertiary study.", ref: 2 },
      {
        label: "2026 grant call",
        title: "Closed, and narrowly focused.",
        text: "The published call was for early childhood and special needs institutions, with a deadline of April 30, 2026. Hack876 does not fall within it and is not applying to it.",
        ref: 1,
      },
    ],
    takeaway: "We have read the published criteria. We are asking about fit, not asking for an exception.",
    art: "Seedling",
  },

  paths: [
    {
      label: "To explore",
      title: "Is there a suitable route, now or later?",
      points: [
        "A future grant cycle, if its focus is ever a fit",
        "A separate route for a school-linked educational activity",
        "Educational materials students and schools keep using",
        "Or simply an introduction, with nothing asked",
      ],
    },
  ],
  pathsNote: { text: "The Foundation lists gkfoundation@gkco.com for enquiries about its grants.", ref: 1 },

  ask: {
    lead: "exploratory",
    bands: [],
    uses: ["materials", "equipment", "programming"],
    restriction:
      "The Foundation's criteria require a registered non-governmental organisation or educational institution. Grants are not made in response to general appeals or for the hosting of conferences. The 2026 call closed on April 30, 2026. We do not assume Hack876 is eligible.",
    why: "We would like the Foundation to know Hack876 exists, and to hear honestly whether it could ever fit the Foundation's education work.",
    recognition: "No funding request in this brief",
    tracks: ["Learn"],
    inkind: [
      "Is there a future or separate route that could suit an event like this?",
      "Would a school-linked activity, led with a partner school, be a better fit?",
      "Are educational materials something the Foundation would consider?",
      "Who is the right person to speak with, and when?",
    ],
  },

  roles: [
    { title: "A guest at the finals", text: "Someone from the Foundation is welcome to watch the final pitches and meet the students." },
    { title: "Advice", text: "Guidance on what would make a project like this a fit for the Foundation, in this year or a later one." },
    { title: "An introduction", text: "If another part of the education community is a better home for this, we would be glad to be pointed to it." },
  ],

  groundRules: [
    "No marketing to students and no sign-ups on the day.",
    "No collection of student contact details by partners. Photos and names only with school and parent consent.",
  ],

  future: [
    "A school-linked activity designed with a partner school.",
    "Educational materials that stay with schools after the day.",
    "An application in a future cycle, if the focus fits and Hack876 is eligible.",
  ],

  questions: [
    "Is Hack876 the kind of work the Foundation could ever support?",
    "Would it need to come through a school or a registered organisation?",
    "When does the Foundation next review its focus areas?",
    "When and where is Hack876?",
    "How are students protected on consent, data and marketing?",
  ],

  closingLine: "We would welcome a conversation with the GraceKennedy Foundation team, whatever the answer turns out to be.",

  sources: [
    { id: 1, org: "GraceKennedy Group", label: "GK Foundation: Information on Grants", href: "https://gracekennedy.com/information-on-grants/" },
    { id: 2, org: "GraceKennedy Group", label: "GK Foundation: Contribution to Education", href: "https://gracekennedy.com/gk-foundation-contribution-to-education/" },
    { id: 3, org: "GraceKennedy Group", label: "GK Foundation: History", href: "https://gracekennedy.com/gk-foundation-history/" },
  ],
};

export default deck;
