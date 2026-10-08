import type { SponsorDeckData } from "./types";

const deck: SponsorDeckData = {
  slug: "seeedstudio",
  kind: "tool",
  sponsor: "Seeed Studio",
  short: "Seeed",
  accent: "#8DC21F",

  recipient: { name: "Meshtastic Community Sponsorship team", title: "Seeed Studio", ref: 1 },
  preparedFor: "A private hardware partnership brief prepared for the Seeed Studio Meshtastic Community Sponsorship team.",

  hero: {
    headline: "Give students a network they build themselves.",
    highlight: "a network they build themselves",
    sub: "Hack876 gives Jamaican high-school students one day to turn an idea into something real. We would love Seeed hardware on the table when they do.",
  },

  why: {
    headline: "Technology is for everyone who builds.",
    mission: {
      label: "Seeed Studio mission",
      quote: "Making Technology Accessible",
      ref: 2,
    },
    points: [
      {
        text: "Seeed opened its Meshtastic Hardware Sponsorship Program to lower the barrier for technical workshops and community-led infrastructure projects.",
        ref: 3,
      },
      {
        text: "Approved workshops get a standard hardware package so participants can build a complete Meshtastic network and have a hands-on experience.",
        ref: 1,
      },
      {
        text: "Seeed's sponsorship application lists STEM students and educators as a target audience.",
        ref: 4,
      },
      {
        text: "Through Seeed for SDGs, Seeed supports projects with positive social impact that apply open technology to real-world issues.",
        ref: 2,
      },
    ],
    tie: "Hack876 students spend the day building for their own communities. A mesh network they can hold in their hands is a great place to start.",
  },

  story: {
    kicker: "What Seeed already does for builders",
    headline: "Hardware where communities learn.",
    format: "initiatives",
    items: [
      {
        label: "Program",
        title: "Meshtastic Community Sponsorship",
        text: "10 Meshtastic DIY kits, a SenseCAP T1000-E and a Wio Tracker L1 for approved workshops, with upgrades for larger events or richer content.",
        ref: 1,
      },
      {
        label: "Education",
        title: "Seeed Education",
        text: "Seeed's education team takes requests for free samples or collaboration from educators.",
        ref: 5,
      },
      {
        label: "Partnership",
        title: "Global Workshop Partnership",
        text: "City co-hosts run workshops, hackathons or bootcamps with Seeed hardware kits, workshop guides and engineering assistance.",
        ref: 6,
      },
      {
        label: "Community",
        title: "Chaihuo Makerspace",
        text: "Shenzhen's first makerspace, powered by Seeed since 2011.",
        ref: 2,
      },
      {
        label: "Community",
        title: "Maker Faire Shenzhen",
        text: "Now the Greater Bay Area International Maker Summit, with over 500,000 participants since 2012.",
        ref: 2,
      },
    ],
    takeaway: "Seeed already backs makers who learn by building together. Hack876 would be one more room full of them, in Kingston.",
    art: "Blueprint",
  },

  paths: [
    {
      label: "Community program",
      title: "Meshtastic Community Sponsorship",
      points: [
        "We apply through Seeed's Meshtastic Sponsorship Application once the Hack876 date is confirmed",
        "At least 3 weeks before the event, plus extra time for shipping and customs into Jamaica",
        "We commit to the standard deliverables, and to a higher-quality one if we ask for more kits",
      ],
    },
    {
      label: "Education",
      title: "Seeed Education",
      points: [
        "Seeed's educator form, or the education team at education@seeed.cc",
        "A good fit for Grove sensor kits for teams on the Hardware build type",
        "Teachers in our schools keep building with Seeed after the day",
      ],
    },
  ],
  pathsNote: {
    text: "Seeed asks organisers to apply at least 3 weeks before the event date, with a shipping address and phone number.",
    ref: 4,
  },

  ask: {
    tier: "inkind",
    why: "We are asking for hardware, not cash. Seeed's standard Meshtastic package is a great start, and we would ask Seeed whether an upgrade fits an event of our size.",
    recognition: "Hardware Partner · Inaugural Hack876",
    award: {
      name: "Best Off-Grid Build, powered by Seeed Studio (proposed)",
      text: "A suggestion only: an award for the team whose working device best connects people without the usual infrastructure, with Seeed kits as the prize. The judging panel makes the final call, and teams can win it with any hardware.",
    },
    tracks: ["Resilience", "Move", "Life", "Wildcard"],
    inkind: [
      "Seeed's standard Meshtastic package: 10 DIY kits, a SenseCAP T1000-E and a Wio Tracker L1",
      "An upgraded quantity, if Seeed thinks our event and content justify it",
      "Grove sensor kits for teams building other kinds of hardware",
      "A short remote walkthrough of the kits for our hardware mentors",
    ],
  },

  tool: {
    headline: "Real radios. Real networks. Built in a day.",
    what: "Seeed's Meshtastic kits for teams on the Hardware build type: small LoRa boards that join up into an off-grid mesh network. Teams that want them use them, nothing about the event depends on them, and every kit is used under adult supervision.",
    structures: [
      "Shared hardware table: kits live at one supervised station, and teams sign them out and return them at the end of the day.",
      "Kits per team: each hardware team builds its own node, and every node joins one shared mesh across the room.",
      "Prizes: kits go home with winning teams, through their schools, so they keep building.",
      "Whatever Seeed recommends instead, including the mix of kits, trackers and Grove sensors that works best.",
    ],
    ageNote:
      "Every kit is low-voltage and used only at supervised stations with an adult hardware mentor. Students do not open, modify or swap batteries. Seeed's wiki recommends a qualified 3.7V lithium battery with a protection circuit for these kits, and we would follow that and every other Seeed safety note. Meshtastic devices need the right LoRa region set, so before the day we will confirm with Seeed which frequency variant suits Jamaica and that its use here is permitted. Seeed's standard shipping terms are DAP, with duties and clearance fees paid by the receiver, so Hack876 would plan for those and allow extra time for customs. Seeed has not agreed to any of this, and we will follow its advice.",
  },

  roles: [
    { title: "Kit walkthrough", text: "A short call before the day so our hardware mentors know the kits inside out." },
    { title: "Engineering Q&A", text: "Someone from Seeed reachable for a tricky setup question during the build." },
    { title: "Award presenter", text: "Someone from Seeed presents the proposed award, by video." },
    { title: "Judging adviser", text: "A Seeed engineer helps shape the hardware criteria. The judging panel makes the final call." },
    { title: "Content partner", text: "Seeed shares our recap and project write-ups on its own channels, with student photos only where parents or guardians have consented." },
  ],

  groundRules: [
    "Low-voltage hardware only, always under adult supervision. No mains wiring, and no opening or modifying batteries.",
    "No student data shared with Seeed. Photos of students go out only with parent or guardian consent, and attendee feedback is shared without names.",
    "No marketing to students. Seeed's name appears on our slides and printed materials as its program asks, never in sign-up or sales drives aimed at students.",
  ],

  future: [
    "A pre-event Meshtastic workshop for teachers and students in our schools.",
    "A student-built mesh linking Hack876 schools across the year.",
    "Public write-ups of winning hardware projects for Seeed's community.",
    "Hack876 workshops through Seeed's Global Workshop Partnership as we grow.",
    "Grove sensor kits in school clubs that build all year, not just on the day.",
  ],

  questions: [
    "How many teams will use hardware, and how many kits do you need?",
    "Who supervises the hardware, and what experience do they have?",
    "Which deliverables will you commit to, and how will you handle photos of minors?",
    "Who receives the shipment in Kingston and clears customs?",
    "Which LoRa frequency variant is right for Jamaica?",
    "Have you run an event like this before?",
  ],

  closingLine: "We would love to explore the right first step with the Seeed Studio team.",

  sources: [
    {
      id: 1,
      org: "Seeed Studio",
      label: "Seeed Studio Meshtastic Community Sponsorship Program (guidelines)",
      href: "https://docs.google.com/document/d/1COYCyPbz-u93tiv7InJWEPGZuYfKsqq3cSaayvt0tak/edit",
    },
    {
      id: 2,
      org: "Seeed Studio",
      label: "About Seeed (vision, mission, Chaihuo Makerspace, Maker Faire Shenzhen, Seeed for SDGs)",
      href: "https://www.seeedstudio.com/about-us/",
    },
    {
      id: 3,
      org: "Seeed Studio",
      label: "LinkedIn: Hardware Sponsorship Program for Meshtastic workshops and meetups (2026)",
      href: "https://www.linkedin.com/feed/update/urn:li:activity:7465371333653172224",
    },
    {
      id: 4,
      org: "Seeed Studio",
      label: "Meshtastic Sponsorship Application",
      href: "https://forms.gle/jQLoDWUxsYa3i2if9",
    },
    {
      id: 5,
      org: "Seeed Studio",
      label: "Seeed Education (education@seeed.cc)",
      href: "https://education.seeedstudio.com/",
    },
    {
      id: 6,
      org: "Seeed Studio",
      label: "LinkedIn: Global Workshop Partnership Program (2026)",
      href: "https://www.linkedin.com/posts/seeedstudio_theaihardwarepartner-physicalai-embodiedai-activity-7470708933112918016-NZyQ",
    },
    {
      id: 7,
      org: "Seeed Studio Wiki",
      label: "Get Started with XIAO ESP32-S3 & Wio-SX1262 Kit (Meshtastic)",
      href: "https://wiki.seeedstudio.com/xiao_esp32s3_&_wio_SX1262_kit_for_meshtastic/",
    },
    {
      id: 8,
      org: "Seeed Studio Support",
      label: "Shipping (worldwide shipping, DAP terms, customs)",
      href: "https://support.seeed.cc/portal/en/kb/bazaar-service/shipping",
    },
  ],
};

export default deck;
