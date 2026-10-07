import type { SponsorDeckData } from "./types";

const deck: SponsorDeckData = {
  slug: "microsoft",
  kind: "prize",
  sponsor: "Microsoft",
  short: "Microsoft",
  accent: "#0078D4",

  recipient: {
    name: "Shane Patterson",
    title: "Principal Technical Program Manager, Microsoft, and Executive Director, Project Blue Mountain",
    ref: 1,
  },
  preparedFor:
    "A private partnership proposal prepared for Shane Patterson, Principal Technical Program Manager, Microsoft, and Executive Director, Project Blue Mountain, with Yamile Bustamante, Country Representative, Microsoft Jamaica.",

  hero: {
    headline: "Pour into the students, one build at a time.",
    highlight: "Pour into the students",
    sub: "Microsoft already invests in young Jamaicans who want to build with technology. Hack876 is one day where high-school students get to do exactly that, with Microsoft people in the room.",
  },

  why: {
    headline: "Young Jamaicans, real skills, real builds.",
    mission: {
      label: "Microsoft, About",
      quote: "Microsoft's mission is to empower every person and every organization on the planet to achieve more.",
      ref: 2,
    },
    points: [
      {
        text: "Microsoft piloted Project Blue Mountain in 2024 to help make Jamaica the premier hub for STEAM talent development in the Caribbean, reaching secondary and tertiary institutions.",
        ref: 3,
      },
      {
        text: "Shane Patterson on leading it: \"Coming back home and being able to pour into the students the way I would've wanted for myself is priceless.\"",
        ref: 4,
      },
      {
        text: "Tech Wave 2025 was set to open to high-school students for the first time, alongside university teams, with more than 30 teams mentored by technical experts.",
        ref: 4,
      },
      {
        text: "In 2021 Microsoft Jamaica and the Ministry of Education agreed a five-year plan to train 155,000 Jamaicans in digital skills, with a focus on young audiences.",
        ref: 5,
      },
      {
        text: "Through Microsoft Elevate, Microsoft has pledged more than $4 billion in cash and AI and cloud technology to K-12 schools, colleges and nonprofits over five years.",
        ref: 6,
      },
    ],
    tie: "Hack876 reaches students a few years before university, and a Microsoft award would tell them their first build counts.",
  },

  story: {
    kicker: "What Microsoft already backs in Jamaica",
    headline: "Five years of building talent at home.",
    format: "milestones",
    items: [
      {
        label: "2021",
        title: "A national skills agreement.",
        text: "Microsoft Jamaica and the Ministry of Education sign a five-year agreement to train 155,000 Jamaicans in digital skills.",
        ref: 5,
      },
      {
        label: "2022",
        title: "Microsoft Day begins.",
        text: "Microsoft Day starts at the University of Technology, Jamaica.",
        ref: 7,
      },
      {
        label: "2024",
        title: "Project Blue Mountain is piloted.",
        text: "Launched at the third Microsoft Day. Student teams pitch solutions to sustainable-development challenges in the PBM Hackathon finale.",
        ref: 3,
      },
      {
        label: "2025",
        title: "AI reaches Grades 8 to 11.",
        text: "A week-long AI and entrepreneurship bootcamp at UWI Mona, run with AIM Educational Services in collaboration with Project Blue Mountain.",
        ref: 8,
      },
      {
        label: "2025",
        title: "High schoolers invited in.",
        text: "Tech Wave, powered by Microsoft, expands to include high-school students, with a three-place cash podium for the hackathon.",
        ref: 4,
      },
    ],
    takeaway: "Microsoft keeps reaching younger students in Jamaica. Hack876 is a natural next step: a build day for fifth and sixth formers.",
    art: "MentorRoom",
  },

  bridge: {
    name: "Jordan Howell",
    role: "Hack876 judge · Microsoft",
    lines: [
      "Jordan is a confirmed Hack876 judge who works at Microsoft.",
      "Jordan is also a Campion College alumnus, one of the schools in our network.",
      "If open to it, Jordan could be a friendly first point of contact on the Microsoft side.",
      "Because Jordan judges, any Microsoft-funded award would be decided by a judge who does not work at Microsoft.",
    ],
  },

  linkedSchool: {
    school: "Campion College",
    text: "Our judge Jordan Howell, who works at Microsoft, is a Campion College alumnus. Campion is in the Hack876 school network; its participation is not yet confirmed.",
  },

  paths: [
    {
      label: "Prize",
      title: "A Microsoft-backed podium",
      points: [
        "Fund the podium prizes, or a proposed Microsoft award",
        "Presented on stage by the Microsoft team",
        "Open to any tools, so the best build wins",
        "Decided by a judge who does not work at Microsoft",
      ],
    },
    {
      label: "People",
      title: "Microsoft people in the room",
      points: [
        "Three to five mentors for AI, cloud and data",
        "A short talk on building a tech career from Jamaica",
        "Remote mentoring works too",
      ],
    },
  ],

  ask: {
    tier: "prize",
    fallback: "special",
    why: "Microsoft already funds student hackathon prizes in Jamaica. Backing the Hack876 podium extends that to students a few years younger.",
    recognition: "Official Prize Partner · Inaugural Hack876",
    award: {
      name: "Microsoft AI for Good Award (proposed)",
      text: "A suggestion only: an award for the build that best uses technology to solve a real problem for a Jamaican community. Teams could use any tools, and criteria would be agreed together.",
    },
    tracks: ["Resilience", "Learn", "Business", "Life"],
    inkind: [
      "Microsoft mentors for AI, cloud and data, in person or remote",
      "A short pre-event AI fundamentals session for teams",
      "Cloud credits held by organisers to host team demos, with no student accounts required",
      "A speaker from Microsoft in Jamaica",
    ],
  },

  roles: [
    { title: "Mentors", text: "Engineers who help teams get unstuck, without building the project for them." },
    { title: "Award presenters", text: "The Microsoft team presents its award on stage at the close." },
    { title: "Speaker", text: "A short, honest talk on coming home to build and give back." },
    { title: "Workshop lead", text: "A short AI fundamentals session before the day, open to every team." },
    { title: "Judge", text: "Jordan already judges. Microsoft-funded awards go to a judge outside Microsoft." },
  ],

  groundRules: [
    "No marketing, product sign-ups or account creation pushed to students, before, during or after the day.",
    "No collection of student contact details or data by sponsors. Photos and names only with school and parent consent.",
    "A judge who does not work at Microsoft decides any Microsoft-funded award, and teams may use any tools they choose.",
  ],

  future: [
    "A recurring Microsoft award at every Hack876.",
    "Hack876 finalists invited to a future Tech Wave, if the Project Blue Mountain team would welcome them.",
    "A Microsoft mentor bench each year, growing as more alumni join.",
    "Support for network schools exploring Microsoft's education tools with their own IT teams.",
    "A pathway into Microsoft's university-level skills programmes once students leave school.",
  ],

  questions: [
    "How is this different from the Project Blue Mountain hackathon?",
    "What exactly would our contribution pay for, and where would Microsoft's name appear?",
    "Can students use Azure or Copilot on the day, given their ages?",
    "How do you keep judging fair when one judge works at Microsoft?",
    "How are students protected on consent, data and marketing?",
    "How much time would our mentors need to give?",
  ],

  closingLine: "We would love to explore the right first step with Shane, Yamile and the Microsoft team in Jamaica.",

  sources: [
    {
      id: 1,
      org: "LinkedIn",
      label: "Shane Patterson: Tech Wave 2025 post (shares a UTech note listing his titles)",
      href: "https://www.linkedin.com/posts/shane-patterson-56316925_techwave-caribbeantalent-globalimpact-activity-7387955450841018369-Q4Xq",
    },
    {
      id: 2,
      org: "Microsoft",
      label: "About Microsoft (mission)",
      href: "https://www.microsoft.com/en-us/about",
    },
    {
      id: 3,
      org: "Canada Caribbean Institute",
      label: "NCU students showcase waste management app (October 27, 2024)",
      href: "https://canadacaribbeaninstitute.org/2024/10/27/ncu-students-showcase-waste-management-app/",
    },
    {
      id: 4,
      org: "Jamaica Observer",
      label: "Project Blue Mountain's Tech Wave Conference set to stir talent, drive innovation (October 22, 2025)",
      href: "https://www.jamaicaobserver.com/2025/10/22/project-blue-mountains-tech-wave-conference-set-stir-talent-drive-innovation/",
    },
    {
      id: 5,
      org: "Microsoft News Center",
      label: "MoEYI and Microsoft Jamaica target 155,000 persons for employability in new skills training agreement (July 30, 2021)",
      href: "https://news.microsoft.com/es-xl/moeyi-and-microsoft-jamaica-target-155000-persons-for-employability-in-new-skills-training-agreement/",
    },
    {
      id: 6,
      org: "Microsoft On the Issues",
      label: "Microsoft Elevate: Putting people first, Brad Smith (July 9, 2025)",
      href: "https://blogs.microsoft.com/on-the-issues/2025/07/09/elevate/",
    },
    {
      id: 7,
      org: "Jamaica Gleaner",
      label: "UTech to host Microsoft Day 2024 (October 1, 2024)",
      href: "https://past.jamaica-gleaner.com/article/news/20241001/utech-host-microsoft-day-2024",
    },
    {
      id: 8,
      org: "Jamaica Observer",
      label: "AIM Educational Services and Microsoft empower youth with AI bootcamp (July 24, 2025)",
      href: "https://www.jamaicaobserver.com/2025/07/24/aim-educational-services-microsoft-empower-youth-ai-bootcamp/",
    },
  ],
};

export default deck;
