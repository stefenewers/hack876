import type { SponsorDeckData } from "./types";

const deck: SponsorDeckData = {
  slug: "replit",
  kind: "tool",
  sponsor: "Replit",
  short: "Replit",
  accent: "#FF3C00",

  recipient: { name: "Replit Events team", title: "Replit event support program", ref: 2 },
  preparedFor: "A private partnership brief prepared for the Replit Events team.",

  hero: {
    headline: "From idea to live URL in one day.",
    highlight: "live URL",
    sub: "Hack876 gives Jamaican high-school students one day to build something real for their own communities. We would love Replit credits in the hands of the teams that want to ship on Replit.",
  },

  why: {
    headline: "Builders should spend the day building.",
    mission: {
      label: "Replit, About",
      quote: "Our mission is to make turning an idea into working software as intuitive as drawing a picture or writing a story.",
      ref: 1,
    },
    points: [
      {
        text: "Replit supports hackathons and coding events with credits, so participants can build, deploy and ship real projects throughout the event.",
        ref: 2,
      },
      {
        text: "Those credits cover Replit Agent, deployments and compute during the event.",
        ref: 2,
      },
      {
        text: "Replit runs in the browser. Participants sign up, start building and deploy, all in one place.",
        ref: 2,
      },
      {
        text: "Replit for Education equips students and educators to build real apps with AI, with no setup.",
        ref: 3,
      },
    ],
    tie: "Not every Hack876 student owns a strong laptop. A browser and a good idea should be enough to ship something real.",
  },

  story: {
    kicker: "What Replit already does for builders",
    headline: "Built for a room full of teams.",
    format: "evidence",
    items: [
      {
        label: "Any hackathon",
        title: "Big or small.",
        text: "Replit says it is happy to consider any hackathon or coding event, in person or virtual, for credit support.",
        ref: 2,
      },
      {
        label: "Teams",
        title: "Build together, not in turns.",
        text: "Several people can work in the same project at once, each starting their own threads with Agent on a shared board.",
        ref: 4,
      },
      {
        label: "Workspaces",
        title: "One place for a group.",
        text: "A team workspace gives a class or team access to every project inside it, with billing and settings managed by an admin.",
        ref: 5,
      },
      {
        label: "Publishing",
        title: "Live in a few clicks.",
        text: "Publishing lets builders share a Replit App with the world through a simplified process.",
        ref: 6,
      },
    ],
    takeaway: "Replit already backs events where people build fast and ship. Hack876 is one more, in Kingston.",
    art: "IdeaToRealWorld",
  },

  paths: [
    {
      label: "Event support",
      title: "Replit's event credit request",
      points: [
        "We submit Replit's event support request form, with this brief in \"Tell us about your event\"",
        "The form asks for an event date, so we confirm the date with Replit before or as we submit",
        "Replit's team reviews the request and decides whether and how it can help",
      ],
    },
  ],
  pathsNote: {
    text: "Replit's Terms of Service say users must be at least 13, and anyone under 18 must have a parent or guardian's permission to use the Service.",
    ref: 7,
  },

  ask: {
    tier: "inkind",
    /* Replit offers credits, not cash or prize money. */
    hideTiers: ["prize", "special"],
    why: "Replit gives credits, not cash, and that is all we are asking for: credits for the teams that choose to build on Replit, plus anything Replit suggests on how best to use them.",
    recognition: "Build Tools Partner · Inaugural Hack876",
    award: {
      name: "Shipped on Replit (proposed)",
      text: "A suggestion only: a recognition, with no prize money, for the strongest project deployed on Replit. The judging panel makes the call, and every other award stays open to teams whatever tools they used.",
    },
    tracks: ["Learn", "Life", "Business", "Wildcard"],
    inkind: [
      "Replit event credits for teams that opt in",
      "Credits for organiser and mentor accounts to support teams",
      "A short remote session on getting from prompt to published app",
      "Remote help from the Replit community during build hours, if Replit offers it",
    ],
  },

  tool: {
    headline: "Replit credits for every team that wants to ship.",
    what: "Replit event credits for the teams that choose Replit, so they can build with Agent and publish a working app by the end of the day. Teams that prefer other tools build with those instead.",
    structures: [
      "Organiser-held: credits sit with adult organiser and mentor accounts, or an organiser-run team workspace, rather than with students.",
      "Opt-in teams: a student uses Replit only with a parent or guardian's permission, in line with Replit's terms.",
      "Whatever Replit recommends for events with under-18 participants.",
      "If no route fits, Replit stays optional and teams build with other tools.",
    ],
    ageNote:
      "Replit's Terms of Service say users must be at least 13, and anyone under 18 needs a parent or guardian's permission to use the Service. Most Hack876 students are under 18, so any student who uses Replit would do so only with that permission, and Hack876 will not create student accounts or promise any student an account. Replit has not approved access for our students, and we will follow whatever Replit advises.",
  },

  roles: [
    { title: "Pre-event session", text: "A short remote walkthrough from blank prompt to published app, before hacking starts." },
    { title: "Remote mentors", text: "Replit builders on a call during build hours to help teams get unstuck." },
    { title: "Organiser guidance", text: "Advice on setting up credits and workspaces for a one-day event with under-18s." },
    { title: "Award presenter", text: "Someone from Replit presents the proposed Shipped on Replit recognition, by video or in person." },
  ],

  groundRules: [
    "No marketing, sign-up drives or promotions aimed at students. Replit is presented as one option among many, and teams may use any tools they like.",
    "No student data collected for, or shared with, Replit. Any account is between a student, their parent or guardian and Replit, under Replit's own terms.",
    "We follow Replit's age and account terms. Students without a parent or guardian's permission are never asked to work around them.",
  ],

  future: [
    "A recurring credits pool for every Hack876.",
    "A showcase of Hack876 projects published on Replit.",
    "Teacher introductions to Replit for Education at Hack876 schools.",
    "A practice build day before the main event, for students who want a head start.",
  ],

  questions: [
    "What is the event date?",
    "How will under-18 students get permission to use Replit?",
    "Will teams have to use Replit?",
    "Who holds the credits, and how are they shared out?",
    "Will any student data come to Replit?",
    "What would you need from us, and by when?",
  ],

  closingLine: "We would love to explore the right first step with the Replit Events team.",

  sources: [
    {
      id: 1,
      org: "Replit",
      label: "About Replit (mission)",
      href: "https://replit.com/about",
    },
    {
      id: 2,
      org: "Replit",
      label: "Hackathon Support & Replit Credits (event support program)",
      href: "https://replit.com/partners/events",
    },
    {
      id: 3,
      org: "Replit",
      label: "Replit for Education",
      href: "https://replit.com/edu",
    },
    {
      id: 4,
      org: "Replit Docs",
      label: "Invite teammates",
      href: "https://docs.replit.com/build/invite-teammates",
    },
    {
      id: 5,
      org: "Replit Docs",
      label: "Create a team workspace",
      href: "https://docs.replit.com/build/create-a-team-workspace",
    },
    {
      id: 6,
      org: "Replit Docs",
      label: "Publishing",
      href: "https://docs.replit.com/learn/projects-and-artifacts/replit-deployments",
    },
    {
      id: 7,
      org: "Replit",
      label: "Terms of Service (last updated Aug 3, 2026; §1 Registration)",
      href: "https://replit.com/terms-of-service",
    },
  ],
};

export default deck;
