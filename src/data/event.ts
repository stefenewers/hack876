/**
 * Hack 876 — single source of truth for event content.
 *
 * Everything that changes between now and event day lives here:
 * dates, venue, schools, schedule, people, sponsors, prizes, FAQs,
 * parent info and application status.
 *
 * Rules of thumb:
 * - People and sponsors only render when `confirmed: true`.
 * - Leave a value as `null` when it hasn't been decided. The site shows a
 *   friendly "coming soon" state instead of inventing something.
 */

/* -------------------------------------------------------------------------- */
/*  Event basics                                                              */
/* -------------------------------------------------------------------------- */

export const event = {
  name: "Hack 876",
  year: 2027,
  city: "Kingston, Jamaica",
  tagline: "Build something that should exist.",
  shortDescription:
    "A one-day hackathon for secondary-school students from across Jamaica. Build, experiment, team up, and turn ideas into working prototypes.",
  /** ISO date (YYYY-MM-DD) once confirmed. `null` shows “Date TBA”. */
  date: null as string | null,
  /** Human-readable fallback while the date is unconfirmed. */
  dateLabel: "2027 · Date TBA",
  /** Canonical public website. */
  siteUrl: "https://www.hack876.com",
  /** Public contact email. `null` hides email links until one is set up. */
  contactEmail: null as string | null,
  socials: [] as { label: string; href: string }[],
};

export const stats = [
  { value: 80, label: "hackers", color: "emerald" },
  { value: 20, label: "teams", color: "sun" },
  { value: 8, label: "schools", color: "aqua" },
  { value: 1, label: "day", color: "bill" },
] as const;

/* -------------------------------------------------------------------------- */
/*  Venue                                                                     */
/* -------------------------------------------------------------------------- */

export const venue = {
  name: "Hillel Academy",
  area: "Kingston, Jamaica",
  /** Flip to `true` once the venue is locked in. */
  confirmed: false,
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Hillel+Academy+Kingston+Jamaica",
};

/* -------------------------------------------------------------------------- */
/*  Eligibility                                                               */
/* -------------------------------------------------------------------------- */

export const eligibility = {
  forms: "5th Form through Upper 6th Form",
  formOptions: ["5th Form", "Lower 6th Form", "Upper 6th Form"],
  teamSize: { min: 4, max: 5 },
  maxHackers: 80,
  howToGetIn:
    "Participating schools recommend students, and recommended students apply here.",
};

export const schools = [
  "Hillel Academy",
  "Campion College",
  "Jamaica College",
  "Immaculate Conception High School",
  "Wolmer's",
  "Ardenne High School",
  "American International School of Kingston",
  "St. Andrew High School for Girls",
] as const;

export type School = (typeof schools)[number];

/** Schools that have formally confirmed. Everyone else shows "Pending confirmation". */
export const confirmedSchools: readonly School[] = ["Hillel Academy"];

/** Crest per school (under /public/schools). Missing entries show a lettered badge. */
export const schoolLogos: Partial<Record<School, string>> = {
  "Hillel Academy": "/schools/hillel-academy.png",
  "Campion College": "/schools/campion-college.png",
  "Jamaica College": "/schools/jamaica-college.png",
  "Immaculate Conception High School": "/schools/immaculate-conception.png",
  "Wolmer's": "/schools/wolmers.png",
  "Ardenne High School": "/schools/ardenne-high.png",
  "American International School of Kingston": "/schools/aisk.png",
  "St. Andrew High School for Girls": "/schools/st-andrew-high.png",
};

/* -------------------------------------------------------------------------- */
/*  Applications                                                              */
/* -------------------------------------------------------------------------- */

export type ApplicationStatus = "open" | "coming-soon" | "closed";

export const applications = {
  status: "open" as ApplicationStatus,
  /** e.g. "2027-02-14". `null` hides the deadline line. */
  deadline: null as string | null,
  /** When students hear back. `null` hides it. */
  decisionsBy: null as string | null,
};

/* -------------------------------------------------------------------------- */
/*  The hack                                                                  */
/* -------------------------------------------------------------------------- */

export const buildTypes = [
  { label: "Websites", icon: "browser" },
  { label: "Apps", icon: "phone" },
  { label: "AI tools", icon: "spark" },
  { label: "Games", icon: "controller" },
  { label: "Hardware", icon: "board" },
  { label: "Data projects", icon: "chart" },
  { label: "Automations", icon: "gear" },
  { label: "Agents", icon: "bot-free" },
  { label: "Interactive experiences", icon: "hand" },
] as const;

export type TrackIcon =
  | "life"
  | "learn"
  | "culture"
  | "business"
  | "move"
  | "wellbeing"
  | "resilience"
  | "wildcard";

export const tracks: {
  name: string;
  line: string;
  icon: TrackIcon;
  color: string;
  /** Loose sparks to get teams thinking — not requirements. */
  sparks: string[];
}[] = [
  {
    name: "Life",
    line: "Make everyday life better.",
    icon: "life",
    color: "bill",
    sparks: [
      "Figure out when the bus is actually coming",
      "Stop the group chat from losing the plan",
      "Make the queue less painful",
    ],
  },
  {
    name: "Learn",
    line: "Rethink how people learn.",
    icon: "learn",
    color: "sky",
    sparks: [
      "CSEC revision that doesn’t feel like revision",
      "Explain it like a friend would",
      "Turn past papers into a game",
    ],
  },
  {
    name: "Culture",
    line: "Build around Jamaican stories, creativity, language, or culture.",
    icon: "culture",
    color: "sun",
    sparks: [
      "Patois, preserved and playful",
      "Put local artists on the map",
      "A sound system for the internet",
    ],
  },
  {
    name: "Business",
    line: "Build for entrepreneurs and small businesses.",
    icon: "business",
    color: "emerald",
    sparks: [
      "Help the corner shop take orders",
      "Inventory that fits in a phone",
      "Get the cook shop online in five minutes",
    ],
  },
  {
    name: "Move",
    line: "Rethink transportation, mobility, and getting around.",
    icon: "move",
    color: "aqua",
    sparks: [
      "Route taxi, but predictable",
      "Safer walks home",
      "Map what the maps miss",
    ],
  },
  {
    name: "Wellbeing",
    line: "Create something that supports healthier lives.",
    icon: "wellbeing",
    color: "peach",
    sparks: [
      "Check in on a friend",
      "Sleep, exam season edition",
      "Find help without the awkwardness",
    ],
  },
  {
    name: "Resilience",
    line: "Think climate, infrastructure, emergencies, or community resilience.",
    icon: "resilience",
    color: "leaf",
    sparks: [
      "Ready before the hurricane, not after",
      "Know when the water’s coming back",
      "Neighbours helping neighbours, faster",
    ],
  },
  {
    name: "Wildcard",
    line: "Build something nobody asked for.",
    icon: "wildcard",
    color: "ink",
    sparks: [
      "Weird is welcome",
      "Useful is optional",
      "Make us say “wait, what?”",
    ],
  },
];

export const principles = [
  {
    title: "Solve something real.",
    body: "Start with a problem or moment you actually understand.",
  },
  {
    title: "Make something that works.",
    body: "A rough demo that runs beats a perfect slide deck.",
  },
  {
    title: "Try something bold.",
    body: "Take a swing. Judges notice ambition.",
  },
  {
    title: "Know what you built.",
    body: "Explain how it works, why it matters, and what’s next.",
  },
];

/** Judging lenses — shown in plain language, no point values. */
export const judging = [
  { name: "Problem & Insight", body: "Did you find something worth fixing, and do you get why it matters?" },
  { name: "Product & Solution", body: "Does your idea actually answer the problem?" },
  { name: "Execution", body: "Does it work? How much did you really build today?" },
  { name: "Originality", body: "Is it fresh, or a new take on something familiar?" },
  { name: "Impact", body: "Who would this help, and how much?" },
  { name: "Pitch & Demo", body: "Can you show it and explain it clearly?" },
];

/* -------------------------------------------------------------------------- */
/*  Schedule                                                                  */
/* -------------------------------------------------------------------------- */

export type SchedulePhase = "arrive" | "build" | "show" | "celebrate";

export const schedule: {
  time: string;
  title: string;
  note: string;
  phase: SchedulePhase;
  highlight?: boolean;
}[] = [
  { time: "8:00 AM", title: "Doors open", note: "Check in, grab your lanyard, find your table.", phase: "arrive" },
  { time: "9:00 AM", title: "Opening", note: "Welcome to Hack 876. Let’s go.", phase: "arrive" },
  { time: "9:20 AM", title: "Keynote", note: "A little inspiration before the chaos.", phase: "arrive" },
  { time: "9:35 AM", title: "Challenge reveal", note: "The prompt drops. Start scheming.", phase: "arrive", highlight: true },
  { time: "9:45 AM", title: "Hacking begins", note: "Clock’s running. Build.", phase: "build", highlight: true },
  { time: "12:00 PM", title: "Lunch", note: "Refuel. Talk to other teams. Steal nothing.", phase: "build" },
  { time: "3:00 PM", title: "Submissions open", note: "Start wrapping up and write your submission.", phase: "build" },
  { time: "4:00 PM", title: "Hacking ends", note: "Hands off keyboards.", phase: "build", highlight: true },
  { time: "4:15 PM", title: "Judging", note: "Demo to the judges. Show what works.", phase: "show" },
  { time: "5:30 PM", title: "Finalists announced", note: "Hearts racing.", phase: "show" },
  { time: "5:45 PM", title: "Finals", note: "Top teams demo on the main stage.", phase: "show", highlight: true },
  { time: "6:45 PM", title: "Awards", note: "Trophies, cheering, probably some screaming.", phase: "celebrate", highlight: true },
  { time: "7:00 PM", title: "Photos + hangout", note: "Get the photo. Swap socials.", phase: "celebrate" },
  { time: "7:30 PM", title: "That’s a wrap", note: "Go home and sleep. You earned it.", phase: "celebrate" },
];

export const phaseLabels: Record<SchedulePhase, string> = {
  arrive: "Arrive",
  build: "Build",
  show: "Show",
  celebrate: "Celebrate",
};

/* -------------------------------------------------------------------------- */
/*  People — judges, speakers, mentors                                        */
/* -------------------------------------------------------------------------- */

/** "tbd" = involved, but judge vs speaker not decided yet. */
export type PersonRole = "judge" | "speaker" | "mentor" | "partner" | "tbd";

export type Person = {
  name: string;
  /** Omit when it shouldn't be shown publicly. */
  organization?: string;
  /** Schools they attended, secondary first. Shown under their name. */
  schools?: string[];
  /** Their day-job title, e.g. "Software Engineer". Optional. */
  title?: string;
  role: PersonRole;
  /** One or two sentences max. */
  bio?: string;
  /** Path under /public, e.g. "/people/jane-doe.jpg" (square, ≥ 600px). */
  photo?: string;
  url?: string;
  /** Only confirmed people are shown on the site. */
  confirmed: boolean;
  /** Listed, but participation not finalized: faded photo + "Pending confirmation" tag. */
  pending?: boolean;
};

/**
 * Add people here. Leave `confirmed: false` until they have said yes
 * publicly. Unconfirmed entries never render.
 *
 * Example:
 * {
 *   name: "Firstname Lastname",
 *   organization: "Company",
 *   title: "Software Engineer",
 *   role: "judge",
 *   bio: "Builds things for millions of people. Grew up in Mandeville.",
 *   photo: "/people/firstname-lastname.jpg",
 *   confirmed: true,
 * },
 */
/**
 * Local preview: during `npm run dev`, unconfirmed people also render (tagged
 * "Preview") so the section can be reviewed. Production builds never show them.
 */
export const previewUnconfirmedPeople = process.env.NODE_ENV === "development";

export const people: Person[] = [
  // Confirmed judges.
  { name: "Dominic Saunders", organization: "Tesla", schools: ["Campion College", "Princeton"], role: "judge", photo: "/people/dominic-saunders.jpg", confirmed: true },
  { name: "Jordan Howell", organization: "Microsoft", schools: ["Campion College", "Kettering"], role: "judge", photo: "/people/jordan-howell.jpg", confirmed: true },
  { name: "Joshua Ardito", organization: "Meta", schools: ["Campion College", "Carnegie Mellon"], role: "judge", photo: "/people/joshua-ardito.jpg", confirmed: true, pending: true },
  { name: "Tahj Atkinson", organization: "Google", schools: ["Campion College", "Illinois Tech"], role: "judge", photo: "/people/tahj-atkinson.jpg", confirmed: true },
  { name: "Nadani Dixon", organization: "Redfin", schools: ["Campion College", "Middlebury", "Georgia Tech"], role: "judge", photo: "/people/nadani-dixon.jpg", confirmed: true },
  { name: "Stefen Ewers", organization: "Anthropic", schools: ["Campion College", "Hillel Academy", "Georgia Tech"], role: "judge", photo: "/people/stefen-ewers.jpg", confirmed: true },
  { name: "Kendall Todd", organization: "Accenture", schools: ["Hillel Academy", "UF"], role: "judge", photo: "/people/kendall-todd.jpg", confirmed: true },
  { name: "Netania Mundell", organization: "Diageo", schools: ["St. Andrew High School for Girls", "UWI", "NYU"], role: "judge", photo: "/people/netania-mundell.jpg", confirmed: true },
  { name: "Johnathan Clarke", organization: "Loring Consulting Engineers", schools: ["Wolmer's", "Hillel Academy", "USF"], role: "judge", photo: "/people/johnathan-clarke.jpg", confirmed: true },
  // Relationship partner (bridge to Scotia Investments).
  { name: "Padrique Duncan", organization: "Scotia Investments", role: "partner", schools: ["Jamaica College", "UWI"], photo: "/people/padrique-duncan.jpg", confirmed: true },
];

export const roleLabels: Record<PersonRole, { singular: string; plural: string }> = {
  judge: { singular: "Judge", plural: "Judges" },
  speaker: { singular: "Speaker", plural: "Speakers" },
  mentor: { singular: "Mentor", plural: "Mentors" },
  partner: { singular: "Partner", plural: "Partners" },
  tbd: { singular: "Judge / Speaker", plural: "Judges & speakers" },
};

/* -------------------------------------------------------------------------- */
/*  Prizes                                                                    */
/* -------------------------------------------------------------------------- */

export type Prize = {
  name: string;
  line: string;
  icon: "trophy" | "medal-2" | "medal-3" | "pen" | "rocket" | "heart";
  color: string;
  /** What's actually won. `null` until finalized. Never invent this. */
  reward: string | null;
  /** 1–3 puts the prize on the podium. Everything else is a special award. */
  place?: 1 | 2 | 3;
  /** Total value in US$, when known exactly. Used for sponsorship sums. */
  valueUsd?: number;
};

/** Shown under the prizes while rewards aren't locked in. `null` hides it. */
export const prizesNote: string | null = "Prizes are tentative and subject to change.";

export const prizes: Prize[] = [
  { name: "Hack 876 Winner", line: "The whole thing. Best overall build.", icon: "trophy", color: "sun", reward: "4 × iPad", place: 1 },
  { name: "Second Place", line: "So close. Still brilliant.", icon: "medal-2", color: "sky", reward: "4 × AirPods Pro", place: 2 },
  { name: "Third Place", line: "On the podium.", icon: "medal-3", color: "peach", reward: "4 × US$150 gift cards", place: 3 },
  { name: "Best Design", line: "Looks great. Feels even better.", icon: "pen", color: "pink", reward: "4 × US$50 gift cards", valueUsd: 200 },
  { name: "Boldest Idea", line: "The swing nobody else took.", icon: "rocket", color: "bill", reward: "US$200 team project grant", valueUsd: 200 },
  { name: "People’s Choice", line: "Voted by the room.", icon: "heart", color: "aqua", reward: "4 × US$50 gift cards", valueUsd: 200 },
];

/* -------------------------------------------------------------------------- */
/*  Sponsors                                                                  */
/* -------------------------------------------------------------------------- */

export type Sponsor = {
  name: string;
  /** Path under /public, e.g. "/sponsors/company.svg". */
  logo: string;
  url: string;
  /** Free-form for now, e.g. "presenting", "partner", "community". */
  level: string;
  /** Only confirmed sponsors render. */
  confirmed: boolean;
};

/**
 * Potential sponsors are listed with `confirmed: false` so they're ready to
 * switch on. Nothing renders until `confirmed: true`.
 */
/**
 * Local preview: during `npm run dev`, unconfirmed sponsors also render (tagged
 * "Preview") so the section can be reviewed. Production builds never show them.
 */
export const previewUnconfirmedSponsors = process.env.NODE_ENV === "development";

export const sponsors: Sponsor[] = [
  { name: "GraceKennedy General Insurance", logo: "/sponsors/gk-general-insurance.jpeg", url: "", level: "partner", confirmed: false },
  { name: "Lev Beauty", logo: "/sponsors/lev-beauty.jpeg", url: "", level: "partner", confirmed: true },
  { name: "Vault Motors", logo: "/sponsors/vault-motors.jpeg", url: "", level: "partner", confirmed: true },
];

/* -------------------------------------------------------------------------- */
/*  FAQ                                                                       */
/* -------------------------------------------------------------------------- */

export type Faq = {
  q: string;
  /** Plain text. Blank lines split paragraphs. */
  a: string;
  /** Marks an answer that depends on a policy that isn't final yet. */
  pending?: boolean;
};

export const faqs: Faq[] = [
  {
    q: "What is a hackathon?",
    a: "An event where you team up and build something from scratch in a short amount of time. At Hack 876 that's one day.\n\nYou don't have to hack into anything. It's about making things: apps, games, tools, gadgets, whatever you can pull off before the clock runs out.",
  },
  {
    q: "Who can attend?",
    a: "Students in 5th Form through Upper 6th Form at participating schools. Schools recommend students, and recommended students then apply. There are 80 spots.",
  },
  {
    q: "Do I need to know how to code?",
    a: "No. Great teams need designers, researchers, storytellers and people who can pitch. If you've never built anything before, that's fine. Come curious.",
  },
  {
    q: "Do I need a team before applying?",
    a: "No. Apply solo or with friends. If you don't have a team, we'll help you find one, possibly with students from other schools.",
  },
  {
    q: "How big can my team be?",
    a: "4 to 5 students.",
  },
  {
    q: "What can I build?",
    a: "Websites, apps, AI tools, games, hardware, data projects, automations, interactive experiences. Whatever brings your idea to life. The tracks are there for inspiration, not to box you in.",
  },
  {
    q: "Can I use AI tools?",
    a: "Yes, use whatever tech fits your idea. Just be ready to explain what you built and how it works. Judges will ask.",
    pending: true,
  },
  {
    q: "What should I bring?",
    a: "A laptop and charger if you have one, a water bottle, and your school ID. A full packing list will be shared with accepted hackers before the event.",
    pending: true,
  },
  {
    q: "Is Hack 876 free?",
    a: "Details on cost will be shared here soon.",
    pending: true,
  },
  {
    q: "Will food be provided?",
    a: "There's a lunch break on the schedule. Details on meals and dietary needs will be shared with accepted hackers.",
    pending: true,
  },
  {
    q: "Where is Hack 876?",
    a: "Kingston, Jamaica. The proposed venue is Hillel Academy. We'll confirm the final location here.",
  },
  {
    q: "How does judging work?",
    a: "Teams demo to judges, who look at the problem you picked, your solution, how well it works, originality, impact, and your pitch. Finalists then demo on the main stage.\n\nComplexity alone does not win Hack 876.",
  },
  {
    q: "Can I start my project before the event?",
    a: "Brainstorm all you want, but building starts when hacking begins on the day. Full rules on pre-existing work will be posted before the event.",
    pending: true,
  },
];

/* -------------------------------------------------------------------------- */
/*  For parents & guardians                                                   */
/* -------------------------------------------------------------------------- */

export const parents: {
  topic: string;
  body: string;
  /** `true` = still being finalized; shows a small "details coming" tag. */
  pending?: boolean;
}[] = [
  {
    topic: "Supervision",
    body: "Students are supervised by event staff and volunteers throughout the day. Details on staffing and ratios will be shared with families before the event.",
    pending: true,
  },
  {
    topic: "Schedule",
    body: "Doors open at 8:00 AM and the event wraps at 7:30 PM. Pick-up details will be shared ahead of time.",
  },
  {
    topic: "Venue",
    body: "The proposed venue is Hillel Academy in Kingston. We'll confirm the final location here.",
  },
  {
    topic: "Food",
    body: "Lunch is part of the day. Information on meals and dietary requirements will be collected from accepted students.",
    pending: true,
  },
  {
    topic: "Emergency contacts",
    body: "An on-site contact and emergency procedures will be shared with every family before the event.",
    pending: true,
  },
  {
    topic: "Permission & consent",
    body: "A signed parent or guardian consent form will be required for every participant. Forms will be sent to accepted students.",
    pending: true,
  },
];

/* -------------------------------------------------------------------------- */
/*  Navigation                                                                */
/* -------------------------------------------------------------------------- */

export const nav = [
  { label: "About", href: "/#about" },
  { label: "Hack", href: "/#hack" },
  { label: "Schedule", href: "/#schedule" },
  { label: "People", href: "/#people" },
  { label: "FAQ", href: "/#faq" },
  { label: "Sponsors", href: "/#sponsors" },
];
