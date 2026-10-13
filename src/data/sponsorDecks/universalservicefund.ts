import type { SponsorDeckData } from "./types";

const deck: SponsorDeckData = {
  slug: "universalservicefund",
  kind: "prize",
  sponsor: "Universal Service Fund",
  short: "USF",
  article: "the",
  accent: "#17265A",
  recipient: {
    name: "Charlton McFarlane",
    title: "Chief Executive Officer, Universal Service Fund",
    ref: 1,
  },
  preparedFor: "A private partnership proposal prepared for Charlton McFarlane, Chief Executive Officer, Universal Service Fund.",
  hero: {
    headline: "Connectivity, put to work by young Jamaicans.",
    highlight: "put to work",
    sub: "The USF connects Jamaicans and invests in the skills to use that access. Hack876 is one day where secondary-school students do exactly that, building real things on a reliable connection.",
  },
  brief: {
    fit: "The USF connects Jamaicans and funds the skills to use that access, including through its ICT Education Grant.",
    request: "Information on the ICT Education Grant that we can pass to older students. We are testing the venue's Wi-Fi first, and would ask about temporary connectivity only if that shows a gap.",
    enables: "Students who could use the grant hear about it, and every team can work online if the venue needs help.",
    outcome: "In-kind recognition and a written recap.",
    next: "A reply on what grant information we may share. If the venue test shows a gap, we will write formally to the CEO with the details.",
    logistics: [
      "Grant information: whatever the USF already publishes, for us to hand to students and teachers.",
      "Connectivity: the venue is a hotel with its own network. We will test it for about {students} students working at once before asking for anything.",
      "No funding and no staff time on the day are requested.",
    ],
  },
  why: {
    headline: "Connectivity matched with capacity.",
    mission: {
      label: "Charlton McFarlane, Chief Executive Officer, Universal Service Fund (2026)",
      quote: "These grants are important because connectivity must be matched with capacity. By investing in education and digital skills we are helping to ensure that more Jamaicans can participate in, contribute to, and shape Jamaica's digital transformation.",
      ref: 2,
    },
    points: [
      {
        text: "The USF, an agency under the Ministry of Energy, Transport and Telecommunications, is mandated to bridge the digital divide by ensuring Jamaicans have access to ICT.",
        ref: 2,
      },
      {
        text: "For 25 years the USF has run the ICT Education Grant Programme, including an Emerging Digital Leaders Grant for people aged 17 to 28.",
        ref: 2,
      },
      { text: "The USF supports ICT clubs in more than 35 secondary schools, alongside free public Wi-Fi and Community Access Points.", ref: 3 },
      { text: "In 2024 the USF ran Crack the Code, a youth coding competition for Jamaicans 21 and under, with a laptop for first place.", ref: 4 },
      {
        text: "The USF has served as Official Connectivity Partner for a JISA schools event, describing its belief in \"powering opportunities through connectivity\".",
        ref: 5,
      },
    ],
    tie: "Hack876 is where secondary-school students turn access into something they built themselves.",
  },
  story: {
    kicker: "What the USF already does for young Jamaicans",
    headline: "From access to ability.",
    format: "initiatives",
    items: [
      {
        label: "Skills",
        title: "ICT clubs in schools",
        text: "USF ICT clubs launched in 16 high schools in 2023, focused on coding, robotics and machine learning, with Ministry of Education endorsement.",
        ref: 6,
      },
      {
        label: "Competition",
        title: "Crack the Code",
        text: "A November 2024 challenge where young Jamaicans fixed HTML and CSS until they had working web pages.",
        ref: 4,
      },
      {
        label: "Devices",
        title: "Connect-a-Child",
        text: "630 students across Jamaica received free tablets at the 2026 Connect-a-Child Awards Ceremony.",
        ref: 3,
      },
      {
        label: "Talent",
        title: "ICT Education Grants",
        text: "Twelve Jamaicans received grants in 2026, chosen from more than 130 applicants.",
        ref: 2,
      },
      { label: "Access", title: "Public Wi-Fi", text: "Plans for 126 new Wi-Fi sites in 2026/27 to complement Community Access Points.", ref: 7 },
      {
        label: "Events",
        title: "Official Connectivity Partner",
        text: "The USF has sponsored connectivity for a youth schools event, the JISA meet.",
        ref: 5,
      },
    ],
    takeaway: "The USF already builds the access and the skills. Hack876 is a place to see both at work in one room.",
  },
  ask: {
    lead: "inkind",
    bands: [],
    uses: ["equipment", "programming"],
    why: "This keeps the request simple for a public agency. Connectivity support would follow only if the venue needs it.",
    recognition: "In-kind Partner · Inaugural Hack876",
    tracks: ["Learn", "Life"],
    inkind: ["Information on the ICT Education Grant for older students", "Temporary event connectivity, only if the venue test shows a gap"],
  },
  groundRules: [
    "No marketing to students and no sign-ups on the day. Grant information goes out through schools only.",
    "No collection of student contact details or data by sponsors. Photos and names only with school and parent consent.",
    "Any devices or connectivity are used under adult supervision, and the judging panel decides every award.",
  ],
  future: [
    "A Hack876 edition hosted with USF ICT club schools in other parishes.",
    "A Crack the Code style online challenge that leads into Hack876.",
    "A past ICT Education Grant recipient speaking to students, if the USF would like to make the introduction.",
  ],
  closingLine: "We would welcome a conversation with Mr. McFarlane and the USF team about the right first step.",
  sources: [
    { id: 1, org: "Universal Service Fund", label: "Management Team", href: "https://usf.gov.jm/management-team/" },
    {
      id: 2,
      org: "Jamaica Observer",
      label: "USF puts $3m behind Jamaica's next generation of digital talent (September 26, 2026)",
      href: "https://www.jamaicaobserver.com/2026/09/26/usf-puts-3m-behind-jamaicas-next-generation-digital-talent/",
    },
    {
      id: 3,
      org: "Jamaica Information Service",
      label: "Young People Encouraged to Leverage Technology to Develop Innovative Solutions (September 16, 2026)",
      href: "https://jis.gov.jm/young-people-encouraged-to-leverage-technology-to-develop-innovative-solutions/",
    },
    {
      id: 4,
      org: "Jamaica Observer",
      label: "Winners announced for USF's Crack the Code competition (December 18, 2024)",
      href: "https://www.jamaicaobserver.com/2024/12/18/winners-announced-usfs-crack-code-competition/",
    },
    {
      id: 5,
      org: "Universal Service Fund (LinkedIn)",
      label: "Official Connectivity Partner for the JISA event",
      href: "https://www.linkedin.com/posts/usfjamaica_usf-connect2progress-jisa-activity-7453084003647217665-FWdh",
    },
    {
      id: 6,
      org: "Jamaica Information Service",
      label: "Sixteen Schools Launch USF ICT Clubs (November 11, 2023)",
      href: "https://jis.gov.jm/sixteen-schools-launch-usf-ict-clubs/",
    },
    {
      id: 7,
      org: "Jamaica Observer",
      label: "USF to expand Jamaica's digital infrastructure in 2026/27 (March 3, 2026)",
      href: "https://www.jamaicaobserver.com/2026/03/03/usf-expand-jamaicas-digital-infrastructure-2026-27/",
    },
  ],
};

export default deck;
