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
  /** ISO date (YYYY-MM-DD). Final. `null` shows `dateLabel` instead. */
  date: "2027-02-20" as string | null,
  /** Human-readable fallback when there is no date at all. */
  dateLabel: "2027 · Date TBA",
  /** Canonical public website. */
  siteUrl: "https://www.hack876.com",
  /** Public contact email. `null` hides email links until one is set up. */
  contactEmail: "info@hack876.com" as string | null,
  /** Where schools and partners book a 15-minute call with the organizers (Calendly event "15 Min Hack Meeting"). `null` hides it. */
  bookingUrl: "https://calendly.com/hack876-info/30min" as string | null,
  /** Every time on the site is local Jamaica time. */
  timeZone: "Jamaica time (UTC-5)",
  socials: [{ label: "@hack876ja", href: "https://www.instagram.com/hack876ja", icon: "instagram" }] as { label: string; href: string; icon?: "instagram" }[],
};


/** The event date, formatted once for every page, in Jamaican (day month year) order. */
export const eventWhen = (() => {
  const d = event.date ? new Date(`${event.date}T12:00:00Z`) : null;
  const fmt = (o: Intl.DateTimeFormatOptions) => (d ? d.toLocaleDateString("en-GB", { ...o, timeZone: "UTC" }) : event.dateLabel);
  return {
    /** "Saturday 20 February 2027" */
    long: d ? `${fmt({ weekday: "long" })} ${fmt({ day: "numeric", month: "long", year: "numeric" })}` : event.dateLabel,
    /** "20 Feb 2027" */
    short: fmt({ day: "numeric", month: "short", year: "numeric" }),
  };
})();

/* -------------------------------------------------------------------------- */
/*  Registration and MLH                                                      */
/* -------------------------------------------------------------------------- */

/**
 * Hack 876 is an official MLH Hack Day. Students register on MLH (a free
 * MyMLH account) and submit projects there. MLH's OrganizerHQ holds all
 * registration, check-in and submission data; this site never collects it.
 * `/apply` redirects to `registration.url` (next.config.ts).
 */
export const registration = {
  /** Where students register. Replaces the old /apply flow. */
  url: "https://mlh.link/hack-876",
  /** MLH's public event page for Hack 876. */
  eventPageUrl: "https://events.mlh.com/events/15649-hack-876",
  /** Where teams submit projects. */
  challengesUrl: "https://www.mlh.com/events/hack-876/challenges",
  label: "Register",
  labelLong: "Register on MLH",
  requiresMyMLH: true,
  /** Shown near every register button. */
  accountNote: "You will need a MyMLH account to register. It is free.",
  // TODO(owner): registration close date, if any. Nothing on the site states a deadline until this is set.
  closes: null as string | null,
} as const;

export const mlh = {
  name: "Major League Hacking (MLH)",
  siteUrl: "https://mlh.com",
  codeOfConductUrl: "https://mlh.io/code-of-conduct",
  incidentEmail: "incidents@mlh.io",
  standardRulesUrl: "https://github.com/MLH/mlh-policies/blob/main/standard-hackathon-rules.md",
  /** The only wording used for the event's MLH status. Never "member event", "sanctioned" or "powered by". */
  hackDayBadge: "An official MLH Hack Day",
  /** The official, unaltered MLH logo. Never recolor, crop or place it on a dark or busy background. */
  logo: "/sponsors/mlh-logo-color.svg",
} as const;

/** The "Best Use of Cloudflare" partner challenge. Details and anything on offer live on the MLH Challenges page. */
export const cloudflareChallenge = {
  name: "Best Use of Cloudflare",
  summary: "Build and deploy on Cloudflare Workers and use Workers AI in a meaningful way. Details are on the MLH Challenges page.",
  docs: [
    { label: "Cloudflare Workers", href: "https://developers.cloudflare.com/workers/" },
    { label: "Workers: get started", href: "https://developers.cloudflare.com/workers/get-started/guide/" },
    { label: "Workers AI", href: "https://developers.cloudflare.com/workers-ai/" },
    { label: "Workers AI: get started", href: "https://developers.cloudflare.com/workers-ai/get-started/" },
    { label: "Workers AI models", href: "https://developers.cloudflare.com/workers-ai/models/" },
  ],
  // TODO(owner): confirm in writing with MLH that minors are eligible for the Cloudflare challenge and what, if anything, it offers. State neither until confirmed.
} as const;

/* -------------------------------------------------------------------------- */
/*  Venue                                                                     */
/* -------------------------------------------------------------------------- */

export const venue = {
  name: "Spanish Court Hotel",
  area: "Kingston, Jamaica",
  address: "1 St Lucia Avenue, Kingston 5, Jamaica",
  // TODO(owner): room and arrival instructions. While null, the site says they will be shared before the event.
  room: null as string | null,
  arrival: null as string | null,
  /** Flip to `true` once the venue is locked in. */
  confirmed: true,
  /** `null` hides the Maps button. */
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Spanish+Court+Hotel+Kingston+Jamaica" as string | null,
};

/** Shown wherever `venue.room` or `venue.arrival` is not set yet. */
export const venueArrivalPending = "Room and arrival instructions will be shared with registered students and posted here before the event.";

/**
 * The on-site incident lead. MLH requires a named lead before the event.
 * One edit here fills it in everywhere.
 */
// TODO(owner): name and contact (phone/WhatsApp) of the on-site incident lead.
export const incidentLead = null as null | { name: string; contact: string };

/** Venue safety details for the Code of Conduct page. `null` shows a neutral "to be shared" line. */
// TODO(owner): exits, assembly point, first-aid location and first aider, accessibility arrangements (step-free entry, accessible toilets), nearest hospital.
export const venueSafety = {
  exits: null as string | null,
  assemblyPoint: null as string | null,
  firstAid: null as string | null,
  accessibility: null as string | null,
  nearestHospital: null as string | null,
};

/* -------------------------------------------------------------------------- */
/*  Eligibility                                                               */
/* -------------------------------------------------------------------------- */

export const eligibility = {
  forms: "5th Form through Upper 6th Form",
  formOptions: ["5th Form", "Lower 6th Form", "Upper 6th Form"],
  teamSize: { min: 3, max: 4 },
  maxHackers: 80,
  // TODO(owner): confirm whether registration is open to all Jamaican secondary students or only to the listed participating schools. Until then, keep the participating-schools wording.
  // TODO(owner): what happens past 80 registrations (waitlist, close registration). Do not state a rule until decided.
  howToGetIn:
    "Students at participating schools register directly on MLH with a free MyMLH account. Schools can recommend Hack 876 and support their students. There is no school nomination step.",
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
  "St. George's College",
] as const;

export type School = (typeof schools)[number];

/** Schools that have formally confirmed. */
export const confirmedSchools: readonly School[] = ["Campion College", "Hillel Academy"];

/** Schools in active talks. Everyone not confirmed or in talks shows "Pending confirmation". */
export const schoolsInTalks: readonly School[] = ["Ardenne High School"];

export type SchoolStatus = "confirmed" | "talks" | "pending";

export function schoolStatus(s: School): SchoolStatus {
  if (confirmedSchools.includes(s)) return "confirmed";
  if (schoolsInTalks.includes(s)) return "talks";
  return "pending";
}

/* Headline numbers. School count follows the list above. */
export const stats = [
  { value: 80, label: "hackers", color: "emerald" },
  { value: 20, label: "teams", color: "sun" },
  { value: schools.length, label: "schools", color: "aqua" },
  { value: 1, label: "day", color: "bill" },
] as const;

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
  "St. George's College": "/schools/st-georges-college.png",
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

export type TrackIcon = "learn" | "life" | "business" | "resilience" | "wildcard";

export const tracks: {
  name: string;
  line: string;
  icon: TrackIcon;
  color: string;
  /** Loose sparks to get teams thinking — not requirements. */
  sparks: string[];
}[] = [
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
    name: "Everyday Jamaica",
    line: "Make daily life, getting around and staying well easier.",
    icon: "life",
    color: "bill",
    sparks: [
      "Figure out when the bus is actually coming",
      "Safer walks home",
      "Find help without the awkwardness",
    ],
  },
  {
    name: "Create & Hustle",
    line: "Build for small businesses, creators and Jamaican culture.",
    icon: "business",
    color: "sun",
    sparks: [
      "Help the corner shop take orders",
      "Put local artists and stories on the map",
      "Money in, money out, for any hustle",
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
  // TODO(owner): reconcile these times with the schedule in MLH OrganizerHQ, including the submission window.
  { time: "8:00 AM", title: "Doors open + check-in", note: "Doors open and in-person check-in at the entrance. Check-in is only possible at the venue, in person.", phase: "arrive" },
  { time: "9:00 AM", title: "Opening", note: "Welcome, the Code of Conduct, MLH, the Best Use of Cloudflare challenge, and how to submit.", phase: "arrive" },
  { time: "9:20 AM", title: "Keynote", note: "A little inspiration before the chaos.", phase: "arrive" },
  { time: "9:35 AM", title: "Challenge reveal", note: "The prompt drops. Start scheming.", phase: "arrive", highlight: true },
  { time: "9:45 AM", title: "Hacking begins", note: "Clock’s running. Build.", phase: "build", highlight: true },
  { time: "12:00 PM", title: "Lunch", note: "Refuel. Talk to other teams. Steal nothing.", phase: "build" },
  { time: "3:00 PM", title: "Submissions open", note: "Submit on the MLH Challenges page. Start wrapping up.", phase: "build" },
  { time: "4:00 PM", title: "Hacking ends. Submissions close.", note: "Hands off keyboards. Every presenting team has submitted.", phase: "build", highlight: true },
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
export type PersonRole = "judge" | "speaker" | "mentor" | "partner" | "organizer" | "tbd";

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

/**
 * The keynote speaker is a surprise. While `revealed` is false the site shows a
 * mystery card. To reveal: add them to `people` with role "speaker" and set
 * `revealed: true`.
 */
export const keynote = { revealed: false };

export const people: Person[] = [
  // Confirmed judges.
  { name: "Dominic Saunders", organization: "Tesla", schools: ["Campion College", "Princeton"], role: "judge", photo: "/people/dominic-saunders.jpg", url: "https://www.linkedin.com/in/dominicsaunders/", confirmed: true },
  { name: "Jordan Howell", organization: "Microsoft", schools: ["Campion College", "Kettering"], role: "judge", photo: "/people/jordan-howell.jpg", url: "https://www.linkedin.com/in/jordan-howell-995a03129/", confirmed: true },
  { name: "Joshua Ardito", organization: "Meta", schools: ["Campion College", "Carnegie Mellon"], role: "judge", photo: "/people/joshua-ardito.jpg", url: "https://www.linkedin.com/in/jardito/", confirmed: true },
  { name: "Tahj Atkinson", organization: "Google", schools: ["Campion College", "Illinois Tech"], role: "judge", photo: "/people/tahj-atkinson.jpg", url: "https://www.linkedin.com/in/tahjatkinson/", confirmed: true },
  { name: "Pierre Gordon", organization: "1Password", schools: ["Campion College", "UTech"], role: "judge", photo: "/people/pierre-gordon.jpg", url: "https://www.linkedin.com/in/pierre-gordon", confirmed: true },
  { name: "Nadani Dixon", organization: "Redfin", schools: ["Campion College", "Middlebury", "Georgia Tech"], role: "organizer", photo: "/people/nadani-dixon.jpg", url: "https://www.linkedin.com/in/nadani-dixon/", confirmed: true },
  { name: "Stefen Ewers", organization: "Georgia Tech", schools: ["Campion College", "Hillel Academy", "Georgia Tech"], role: "organizer", photo: "/people/stefen-ewers.jpg", url: "https://www.linkedin.com/in/stefen-ewers/", confirmed: true },
  { name: "Kendall Todd", organization: "Accenture", schools: ["Hillel Academy", "UF"], role: "judge", photo: "/people/kendall-todd.jpg", url: "https://www.linkedin.com/in/kendallmtodd/", confirmed: true },
  { name: "Netania Mundell", organization: "Diageo", schools: ["St. Andrew High School for Girls", "UWI", "NYU"], role: "judge", photo: "/people/netania-mundell.jpg", url: "https://www.linkedin.com/in/netaniamundell/", confirmed: true },
  { name: "Sheneska Williams", organization: "HashiCorp (Terraform)", schools: ["Immaculate Conception High School", "USF"], role: "judge", photo: "/people/sheneska-williams.jpg", url: "https://www.linkedin.com/in/sheneska-williams-04829a1a6/", confirmed: true },
  { name: "Johnathan Clarke", organization: "Loring Consulting Engineers", schools: ["Wolmer's", "Hillel Academy", "USF"], role: "partner", photo: "/people/johnathan-clarke.jpg", url: "https://www.linkedin.com/in/johnathan-clarke-469a43224/", confirmed: true },
  // Relationship partner (bridge to Scotia Investments).
  { name: "Padrique Duncan", organization: "Scotia Investments", role: "partner", schools: ["Jamaica College", "UWI"], photo: "/people/padrique-duncan.jpg", url: "https://www.linkedin.com/in/padriqueduncan/", confirmed: true },
  { name: "Kyle Freeman", organization: "HydroGro Farms", role: "partner", schools: ["UWI"], photo: "/people/kyle-freeman.jpg", url: "https://www.linkedin.com/in/kyle-freeman-9b8b32120/", confirmed: true },
  // Venue host: Spanish Court Hotel.
  { name: "Thomas Issa", organization: "S Hotel", role: "partner", schools: ["Campion College", "Notre Dame"], photo: "/people/thomas-issa.jpg", url: "https://www.linkedin.com/in/thomas-issa/", confirmed: true },
  // Ardenne Community Ambassador (bridge to Ardenne High School).
  { name: "Diandra McPherson", organization: "Earle & Wilson", role: "partner", schools: ["Ardenne High School", "UWI"], photo: "/people/diandra-mcpherson.jpg", url: "https://www.linkedin.com/in/diandra-mcpherson-4095a0213/", confirmed: true },
];

export const roleLabels: Record<PersonRole, { singular: string; plural: string }> = {
  judge: { singular: "Judge", plural: "Judges" },
  speaker: { singular: "Speaker", plural: "Speakers" },
  mentor: { singular: "Mentor", plural: "Mentors" },
  partner: { singular: "Partner", plural: "Partners" },
  organizer: { singular: "Organizer", plural: "Organizers & hosts" },
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

/** Shown under the prizes. `null` hides it. */
export const prizesNote: string | null =
  "Prizes listed here are provided by Hack 876 organizers and local sponsors. They are tentative and may change. Any additional challenge prizes will be announced once confirmed.";

export const prizes: Prize[] = [
  { name: "Hack 876 Winner", line: "The whole thing. Best overall build.", icon: "trophy", color: "sun", reward: "iPad per student (up\u00a0to\u00a04)", place: 1 },
  { name: "Second Place", line: "So close. Still brilliant.", icon: "medal-2", color: "sky", reward: "AirPods Pro per student (up\u00a0to\u00a04)", place: 2 },
  { name: "Third Place", line: "On the podium.", icon: "medal-3", color: "peach", reward: "US$150 gift card per student (up\u00a0to\u00a04)", place: 3 },
  { name: "Best Design", line: "Looks great. Feels even better.", icon: "pen", color: "pink", reward: "US$50 gift card per student (up\u00a0to\u00a04)", valueUsd: 200 },
  { name: "Boldest Idea", line: "The swing nobody else took.", icon: "rocket", color: "bill", reward: "US$200 team project grant", valueUsd: 200 },
  { name: "People’s Choice", line: "Voted by the room.", icon: "heart", color: "aqua", reward: "US$50 gift card per student (up\u00a0to\u00a04)", valueUsd: 200 },
];

/* -------------------------------------------------------------------------- */
/*  Sponsors                                                                  */
/* -------------------------------------------------------------------------- */

export type Sponsor = {
  name: string;
  /** Path under /public, e.g. "/sponsors/company.svg". Empty shows the name as a text wordmark. */
  logo: string;
  url: string;
  /**
   * "organizing": shown on its own above the others.
   * "program": the MLH Hack Day program. "challenge": a partner challenge.
   * Both are event partners, never paying sponsors. "partner": a local sponsor.
   */
  level: "organizing" | "program" | "challenge" | "partner";
  /** Only confirmed sponsors render. */
  confirmed: boolean;
  /** Shown, but not final: faded logo + "Pending confirmation" tag. */
  pending?: boolean;
  /** Caption shown with the logo. */
  role?: string;
  /** Accessible name for the logo image. Defaults to `name`. */
  alt?: string;
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
  { name: "P237 Labs", logo: "/sponsors/p237-labs.png", url: "", level: "organizing", confirmed: true },
  // Event partners: shown in their own group, never in a list of funders.
  { name: "Major League Hacking (MLH)", logo: "/sponsors/mlh-logo-color.svg", url: "https://mlh.com", level: "program", role: "Official MLH Hack Day", alt: "Major League Hacking (MLH) logo", confirmed: true },
  // Official press-kit logo, unaltered. Used with Cloudflare's written permission (its trademark guidelines require it).
  { name: "Cloudflare", logo: "/sponsors/cloudflare-logo.png", url: "https://www.cloudflare.com", level: "challenge", role: "Challenge partner: Best Use of Cloudflare", alt: "Cloudflare logo", confirmed: true },
  { name: "GraceKennedy General Insurance", logo: "/sponsors/gk-general-insurance.jpeg", url: "", level: "partner", confirmed: false },
  { name: "Vault Motors", logo: "/sponsors/vault-motors.jpeg", url: "", level: "partner", confirmed: true },
  { name: "Norus Technologies", logo: "/sponsors/norus-technologies.png", url: "https://norustech.com/", level: "partner", confirmed: true },
  { name: "Frankies", logo: "/sponsors/frankies.jpg", url: "", level: "partner", confirmed: true },
  { name: ".xyz", logo: "/sponsors/xyz.png", url: "https://gen.xyz", level: "partner", confirmed: true },
  { name: "Big Media Ja", logo: "/sponsors/big-media.jpg", url: "https://www.instagram.com/bigmediaja/", level: "partner", confirmed: true },
  // In-kind: stationery for every student.
  { name: "SOS Ltd", logo: "/sponsors/sos-ltd.png", url: "https://www.sosjm.com", level: "partner", confirmed: true },
];

/** Event partners (MLH, Cloudflare), in display order. Never listed as funders. */
export const eventPartners = sponsors.filter((s) => s.level === "program" || s.level === "challenge");

/**
 * The organizing sponsor and local sponsors: the people funding or supplying
 * the event. Use this, never `sponsors`, for any list that reads as "sponsors".
 */
export const localSponsors = sponsors.filter((s) => s.level === "partner" || s.level === "organizing");

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

const DOORS = schedule[0]?.time ?? "";
const WRAP = schedule[schedule.length - 1]?.time ?? "";
const LUNCH = schedule.find((s) => s.title === "Lunch")?.time ?? "midday";

/** One wording for photo consent, used in the FAQ, the Parents section and the Code of Conduct. */
export const photoConsent =
  "We only publish photos of students when their school and a parent or guardian have consented. We never publish a student’s name with their photo without permission. If a student should not be photographed, tell us at registration or check-in.";

/** Food on the day. */
// TODO(owner): confirm the menu and snacks, and that the MLH registration form asks about dietary needs and accessibility.
export const foodNote = `Food is provided on the day, including lunch at ${LUNCH}, with snacks and water. No alcohol. Tell us about allergies and dietary needs when you register, or email ${event.contactEmail}.`;

export const faqs: Faq[] = [
  {
    q: "What is a hackathon?",
    a: "An event where you team up and build something from scratch in a short amount of time. At Hack 876 that's one day.\n\nYou don't have to hack into anything. It's about making things: apps, games, tools, gadgets, whatever you can pull off before the clock runs out.",
  },
  {
    q: "How do I register?",
    a: `On MLH, at ${registration.url}. You need a free MyMLH account to register and to submit your project. You register yourself: there is no school nomination step.`,
  },
  {
    q: "Who can take part?",
    a: `Students in ${eligibility.forms} at participating schools. Most participants are under 18, so a parent or guardian must give consent. There are ${eligibility.maxHackers} spots.`,
  },
  {
    q: "Can my school sign me up?",
    a: "You register yourself on MLH. Schools can recommend Hack 876 to students and support them, for example by helping with parent or guardian consent and transport.",
  },
  {
    q: "Is Hack 876 free?",
    a: "Yes. Hack 876 is free for students.",
  },
  {
    q: "Is it online?",
    a: "No. Hack 876 is entirely in person. There is no remote participation, and check-in happens at the doors on the day.",
  },
  {
    q: "Do I need to know how to code?",
    a: "No. Great teams need designers, researchers, storytellers and people who can pitch. If you've never built anything before, that's fine. Come curious.",
  },
  {
    q: "Do I need a team before registering?",
    a: "No. Register solo or with friends. If you don't have a team, we'll help you find one, possibly with students from other schools.",
  },
  {
    q: "How big can my team be?",
    a: `${eligibility.teamSize.min} to ${eligibility.teamSize.max} students.`,
  },
  {
    q: "What can I build?",
    a: "Websites, apps, AI tools, games, hardware, data projects, automations, interactive experiences. Whatever brings your idea to life. The tracks are there for inspiration, not to box you in.",
  },
  {
    q: "Can I use AI tools?",
    a: "Yes. Say in your submission which AI tools you used and how, and be ready to explain and demo what you built. Judges will ask.\n\nSome AI tools have minimum ages, and a few are 18 and over, so we'll publish which tools participants may use before the event.",
    pending: true,
  },
  {
    q: "Do I need a laptop?",
    a: "Yes. Bring your own laptop and its charger. Hack 876 does not provide laptops.",
  },
  {
    q: "What should I bring?",
    a: "Your own laptop and charger, your school ID, a water bottle and your signed parent or guardian consent form. Hack 876 does not provide laptops; please bring your own.",
  },
  {
    q: "Will food be provided?",
    a: foodNote,
  },
  {
    q: "When is Hack 876?",
    a: `${eventWhen.long}, from ${DOORS} to ${WRAP} (${event.timeZone}). The date is confirmed.`,
  },
  {
    q: "Where is Hack 876?",
    a: `At the ${venue.name}, ${venue.address}.`,
  },
  {
    q: "How do we submit our project?",
    a: `Only on the MLH Challenges page: ${registration.challengesUrl}. Each team makes one submission and selects every challenge it is eligible for. One team member signs in with their MyMLH account to submit, after checking in at the venue.`,
  },
  {
    q: `What is “${cloudflareChallenge.name}”?`,
    a: `An optional partner challenge any team can enter, on top of its track. ${cloudflareChallenge.summary} The requirements are on the Event Rules page.`,
  },
  {
    q: "Who are the judges?",
    a: "Jamaican tech professionals. They see every demo and ask how your project works.",
  },
  {
    q: "How does judging work?",
    a: "Teams demo to judges, who look at the problem you picked, your solution, how well it works, originality, impact, and your pitch. Finalists then demo on the main stage.\n\nComplexity alone does not win Hack 876.",
  },
  {
    q: "Will there be photos?",
    a: photoConsent,
  },
  {
    q: "Can I start my project before the event?",
    a: "Brainstorm and plan all you want, but building starts on the day, once hacking begins. The full rules are on the Event Rules page.",
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
    body: `Hack 876 is on ${eventWhen.long}, from ${DOORS} to ${WRAP} (${event.timeZone}). It is a one-day event, not overnight. Students stay at the venue for the whole event unless they are collected or signed out in line with their school’s rules.`,
  },
  {
    topic: "Venue",
    body: `Hack 876 takes place at the ${venue.name}, ${venue.address}.${venue.room && venue.arrival ? ` ${venue.room}. ${venue.arrival}` : ` ${venueArrivalPending}`}`,
    pending: !(venue.room && venue.arrival),
  },
  {
    topic: "Food",
    body: foodNote,
  },
  {
    topic: "Laptops & devices",
    body: "Every student needs to bring their own laptop and charger. Hack 876 does not provide laptops.",
  },
  {
    topic: "Emergency contacts",
    body: "An on-site contact and emergency procedures will be shared with every family before the event.",
    pending: true,
  },
  {
    // TODO(owner): define who sends the consent form and when; it is collected at the door at check-in. It should cover guardian permission for the student's MyMLH account and data sharing, and photo consent.
    topic: "Permission & consent",
    body: "Students need a parent or guardian’s consent to attend. After you register, you will receive the parent/guardian consent form. Bring it signed on the day: it is collected at the door at check-in, where the student’s school ID is also checked.",
    pending: true,
  },
  {
    topic: "Photos",
    body: photoConsent,
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
