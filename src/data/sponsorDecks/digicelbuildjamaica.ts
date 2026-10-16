import type { SponsorDeckData } from "./types";

/*
 * A Build Jamaica grant proposal, separate from /digicelfoundationopportunity.
 * Build Jamaica excludes one-day events unless they are part of an approved
 * programme, and sponsorships, so this is framed as a four-month programme
 * with Hack876 as its capstone. The applicant must be a registered
 * not-for-profit, such as a partner school or NGO, delivering the programme.
 */
const deck: SponsorDeckData = {
  slug: "digicelbuildjamaica",
  kind: "full",
  sponsor: "Digicel Foundation Build Jamaica Grants",
  short: "Digicel Foundation",
  article: "the",
  accent: "#e4002b",
  recipient: { name: "the Digicel Foundation grants team", title: "" },
  preparedFor: "A private grant proposal prepared for the Digicel Foundation, Build Jamaica Grants.",
  hero: {
    headline: "A programme, not just a day.",
    highlight: "a programme",
    sub: "Coding and online-safety workshops in Kingston secondary schools from November, a one-day build at Hack876 in February, and kits and resources that stay with each school afterwards.",
  },
  brief: {
    fit: "Build Jamaica Grants fund Digital Literacy & Inclusion, including STEM, coding and online safety, and the Foundation already runs Girls in ICT hackathons with Kingston schools.",
    fitRef: 1,
    request: "A Build Jamaica grant for a digital literacy programme across participating Kingston schools, applied for through a registered partner school or NGO.",
    enables: "Coding and online-safety workshops from November to February, a one-day build at Hack876 on {date}, and kits and resources that stay with each school.",
    outcome: "Students who learn coding and online safety in school, apply it in a real build, and keep the tools afterwards, with a written report of reach and results.",
    next: "Confirmation that this programme fits Build Jamaica, so the registered applicant can submit when applications open.",
  },
  why: {
    headline: "Digital literacy that leads somewhere.",
    mission: {
      label: "Build Jamaica Grants, Digital Literacy & Inclusion",
      quote: "Help more Jamaicans access technology, learn new skills and navigate the digital world with confidence.",
      ref: 1,
    },
    points: [
      { text: "The Digital Literacy & Inclusion area names digital skills training, online safety and internet awareness, and STEM, coding and digital learning.", ref: 1 },
      { text: "In its first year, the Safer Internet Together programme reached 150 primary and secondary schools and 34,030 students with digital literacy and online safety education.", ref: 3 },
      { text: "In May 2026 the Foundation hosted a Girls in ICT AI and Climate Change Hackathon at Denham Town High School in Kingston.", ref: 2 },
    ],
    tie: "Hack876 gives students somewhere to use what the workshops teach: a real build, judged by people who do this work.",
  },
  story: {
    kicker: "What the Foundation already does",
    headline: "Digital skills, online safety and hackathons.",
    format: "evidence",
    items: [
      { label: "Safer Internet Together", title: "34,030 students.", text: "Digital literacy and online safety education in 150 schools across all 14 parishes in its first year.", ref: 3 },
      { label: "May 2026", title: "A hackathon in Kingston.", text: "Girls from Denham Town High and Tivoli Gardens High spent a full day building with AI, with STEM Spark Solutions.", ref: 2 },
      { label: "April 2026", title: "Girls in ICT Day.", text: "A western parishes hackathon, won by Montego Bay High School with an AI app for hurricane response.", ref: 4 },
      { label: "2025–2026", title: "Coding for young people.", text: "More than 100 young Jamaicans took part in a 12-week digital technology, leadership and coding programme.", ref: 5 },
    ],
    takeaway: "The Foundation already backs hackathons and online safety. This programme joins the two, in schools, over four months.",
  },
  pathsNote: { text: "Build Jamaica applications open on October 22, online through the Foundation's website. Supporting documents may include registration, a project proposal, a budget and a timeline.", ref: 1 },
  ask: {
    lead: "band",
    figure: "J$1,500,000 to J$2,500,000",
    headline: "A Build Jamaica grant for a four-month digital literacy programme.",
    bands: [],
    uses: ["programming", "equipment", "materials", "logistics"],
    restriction:
      "Build Jamaica grants go to registered not-for-profit groups, and one-day events qualify only as part of an approved programme. This is a four-month programme, applied for through a registered partner school or NGO that delivers it with the Hack876 team.",
    why: "The grant would fund a programme in four parts. It ends with Hack876 and leaves tools behind in every participating school.",
    budget: [
      { k: "School workshops", v: "Coding and online-safety sessions at participating schools, November to February: facilitators, materials and session devices." },
      { k: "Hardware kits", v: "Starter electronics and coding kits that stay with each participating school." },
      { k: "Hack876 day", v: "The build on {date}: meals, mentoring, judging and running the day for about {students} students." },
      { k: "Follow-up", v: "Teacher resources, a follow-up session at each school and a written report to the Foundation." },
      { k: "Amounts", v: "Set line by line in the application budget, within the J$2,500,000 cap." },
    ],
    recognition: "Acknowledgement as the Foundation prefers",
    tracks: ["Learn", "Resilience"],
  },
  metrics: [
    { k: "Students", v: "About {students} in the Hack876 build, and more in the school workshops" },
    { k: "Schools", v: "{confirmed} confirmed, from a network of {schools} in Kingston" },
    { k: "Projects", v: "About {teams} working prototypes on the day" },
    { k: "Left behind", v: "Kits and teacher resources in every participating school" },
  ],
  groundRules: [
    "No marketing to students, and no student data shared with partners. Photos and names only with school and parent consent.",
    "Workshops run in school, with school staff present, at times the school agrees.",
    "The judging panel decides every award.",
  ],
  future: ["The programme repeated each school year, building on the kits already in schools.", "More schools joining the workshops before each Hack876."],
  closingLine: "We would love the Digicel Foundation to help build the first Hack876 programme.",
  sources: [
    { id: 1, org: "Digicel Foundation", label: "Build Jamaica Grants (October 2026)", href: "https://digicelfoundation.org/jm/en/apply-for-a-grant/build-jamaica-grants" },
    {
      id: 2,
      org: "Digicel Foundation",
      label: "Digicel Foundation empowers Denham Town and Tivoli High girls with AI skills (May 2026)",
      href: "https://www.digicelfoundation.org/jm/en/news/Digicel-Foundation-Empowers-Denham-Town-and-Tivoli-High-Girls-with-AI-Skills",
    },
    { id: 3, org: "Digicel Foundation", label: "Safer Internet Together", href: "https://digicelfoundation.org/jm/en/portfolio/safer-internet-together" },
    { id: 4, org: "Jamaica Gleaner", label: "Montego Bay High wins hackathon with hurricane response app (April 25, 2026)", href: "https://jamaica-gleaner.com/article/news/20260425/montego-bay-high-wins-hackathon-hurricane-response-app" },
    { id: 5, org: "Jamaica Observer", label: "Digicel Foundation touching lives (October 6, 2026)", href: "https://www.jamaicaobserver.com/2026/10/06/digicel-foundation-touching-lives/" },
  ],
};

export default deck;
