import type { SponsorDeckData } from "./types";

const deck: SponsorDeckData = {
  slug: "americanfriendsofjamaica",
  kind: "full",
  sponsor: "The American Friends of Jamaica",
  short: "AFJ",
  accent: "#3DB752",
  recipient: {
    name: "Caron Chung",
    title: "Executive Director",
    ref: 1,
  },
  preparedFor: "A private partnership proposal prepared for Caron Chung, Executive Director, The American Friends of Jamaica.",
  hero: {
    headline: "Opportunity needs a first step.",
    highlight: "Opportunity",
    sub: "AFJ's leadership describes education and innovation as a pathway to opportunity. Hack876 gives young Jamaicans one day to take their first step down it.",
  },
  brief: {
    fit: "AFJ funds education and economic development in Jamaica through an annual grant cycle, and its leadership describes education and innovation as a pathway to opportunity.",
    request: "Tell us whether Hack876 would be a suitable applicant in AFJ's next grant cycle, for a programme grant within AFJ's usual range.",
    enables: "Programme costs for the day: student meals, materials, equipment and running the event. Not student prizes, because AFJ does not make grants to individuals.",
    outcome: "A defined project of about {students} students, with reporting every six months in the way AFJ asks of every grantee.",
    next: "A yes or no on whether to apply, and which registered recipient AFJ would need: a partner registered under the Jamaica Charities Act, or a school through its Principal's office.",
  },
  why: {
    headline: "A grant-maker for education in Jamaica, with clear rules.",
    mission: {
      label: "AFJ's mission",
      quote: "The American Friends of Jamaica is a not-for-profit 501(c)(3) organization dedicated to support Jamaican charitable organizations and social initiatives committed to sustainably transforming the lives of Jamaicans.",
      ref: 2,
    },
    points: [
      { text: "AFJ looks for organisations with \"measurable impact, an efficient track record and excellence.\"", ref: 3 },
      { text: "Its education grants already reach tutoring for secondary school students and job training programmes.", ref: 3 },
      { text: "Economic development grants are weighed on their potential for job readiness and job creation.", ref: 3 },
      { text: "In 2025 an AFJ grant made the Coding Challenge 2025 free for students in grades 4 to 12, alongside a robotics outreach day.", ref: 4 },
      {
        text: "\"At AFJ, we believe in investing in education and innovation as a pathway to opportunity, equity, and empowerment for all.\" Monica Ladd, AFJ",
        ref: 4,
      },
    ],
    tie: "Hack876 is one day where tutoring, job readiness and a first working build meet in the same room.",
  },
  story: {
    kicker: "Since 1982",
    headline: "Four decades of believing in Jamaica.",
    format: "milestones",
    items: [
      { label: "1982", text: "Founded by a handful of Jamaicans and Americans who loved Jamaica and wanted to see it prosper.", ref: 2 },
      { label: "Since 1982", text: "About US$20.4 million in grants across education, healthcare and economic development.", ref: 3 },
      { label: "2025", text: "A dedicated grant makes a national coding challenge free for students in grades 4 to 12.", ref: 4 },
      { label: "2026", text: "US$1.3 million to 65 organisations, presented at the United States Embassy.", ref: 5 },
      { label: "Every November", text: "A new grant cycle opens, with applications due the first Friday in February.", ref: 6 },
    ],
    takeaway: "Every cycle, AFJ backs the organisations doing the work. Hack876 would like to earn a place in a coming one.",
  },
  pathsNote: {
    text: "AFJ does not conduct pre-proposal meetings, so this page is a brief interest check, not a request for one.",
    ref: 6,
  },
  ask: {
    lead: "band",
    bands: [],
    uses: ["programming", "equipment", "materials", "logistics", "meals"],
    restriction: "AFJ does not fund grants to individuals, so a contribution would support programme costs and not student prizes.",
    title: "Programme Partner",
    why: "AFJ's grants typically range from US$1,000 to US$20,000. We are suggesting a contribution toward programme costs, at whatever level AFJ considers appropriate. If the timing or eligibility does not fit this cycle, a smaller grant toward food and student experience is a natural place to start.",
    recognition: "Programme Partner · Inaugural Hack876",
    tracks: ["Learn", "Business", "Resilience"],
    figure: "A programme grant",
  },
  groundRules: [
    "No marketing to students. AFJ appears as a supporter, never in anything pitched at them.",
    "No student data is collected for or shared with partners. Names and photos only with school and parental consent.",
    "Grant funds go to programme costs only, never to fundraising activities or indirect costs.",
  ],
  future: [
    "A multi-school grant in a later cycle, once year one has results to report.",
    "Introductions to AFJ's tutoring and job-training grantees, so students have somewhere to go next.",
    "A challenge shaped around a community need AFJ's grantees see every day.",
    "Diaspora supporters giving through AFJ's donor directed route, if they ask.",
  ],
  closingLine: "We would love to explore whether Hack876 fits a coming grant cycle with Caron and the AFJ team.",
  sources: [
    { id: 1, org: "The American Friends of Jamaica", label: "Our Team", href: "https://theafj.org/our-team/" },
    { id: 2, org: "The American Friends of Jamaica", label: "About Us", href: "https://theafj.org/about-us/" },
    { id: 3, org: "The American Friends of Jamaica", label: "Grants", href: "https://theafj.org/grants/" },
    {
      id: 4,
      org: "Seprod",
      label: "Seprod Foundation and AFJ Deepen Commitment to STEAM Education Through Code Jamaica (August 11, 2025)",
      href: "https://www.seprod.com/seprod-foundation-and-afj-deepen-commitment-to-steam-education-through-code-jamaica/",
    },
    {
      id: 5,
      org: "Jamaica Observer",
      label: "Belmont Academy, Newell High get hurricane recovery boost from AFJ (April 16, 2026)",
      href: "https://www.jamaicaobserver.com/2026/04/16/belmont-academy-newell-high-get-hurricane-recovery-boost-afj/",
    },
    { id: 6, org: "The American Friends of Jamaica", label: "FAQs", href: "https://theafj.org/f-a-q/" },
  ],
};

export default deck;
