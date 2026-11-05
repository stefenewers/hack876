import {
  buildTypes,
  copilotChallenge,
  eligibility,
  event,
  eventWhen,
  foodNote,
  incidentLead,
  judging,
  mlh,
  people,
  photoConsent,
  prizes,
  prizesNote,
  registration,
  schedule,
  tracks,
  venue,
  venueArrivalPending,
} from "./event";
import { organizerAlumniClause } from "./alumni";
import type { SchoolBrief } from "./schoolBriefs";

/*
 * Content for school participation hubs (`/schools/<slug>` once a school has
 * `hub` set). Everything here is generic: a hub for any school is built from
 * event.ts plus that school's entry in schoolBriefs.ts.
 *
 * Rules:
 * - Written for someone who has never heard of Hack 876 or a hackathon, and
 *   who knows nothing about how the school got involved.
 * - Every answer stands on its own. No "as above".
 * - Dates, venue, sizes, prizes and registration links come from event.ts.
 * - `a` holds what is known. `todo` holds what is still to be confirmed.
 *   Never fold an open question into `a` as if it were decided.
 * - No promises of internships, jobs, scholarships, places or approvals.
 */

/**
 * How settled a fact is. Open details also go in `todo`.
 * - "later": decided or in hand, but only sent to registered students and families.
 * - "school": only the school can settle it.
 */
export type HubStatus = "confirmed" | "pending" | "later" | "school";

export const statusLabel: Record<HubStatus, string> = {
  confirmed: "Confirmed",
  pending: "To be confirmed",
  later: "Shared with registered students",
  school: "Awaiting school guidance",
};

/** The one label used for anything not yet decided. */
export const TODO_LABEL = "Still to be confirmed";

export type HubAudience = "students" | "parents" | "teachers";

export const hubCategories = [
  "The basics",
  "Who can take part",
  "Getting ready",
  "Registering",
  "AI tools & consent",
  "The day",
  "Safety & logistics",
  "Costs & equipment",
  "Judging & prizes",
  "After the event",
  "For teachers",
] as const;

export type HubCategory = (typeof hubCategories)[number];

export type HubFaq = {
  id: string;
  q: string;
  /** What is known. Plain text; blank lines split paragraphs. */
  a: string;
  /** What has not been decided yet, in one or two sentences. */
  todo?: string;
  category: HubCategory;
  audience: HubAudience[];
  status?: HubStatus;
  /** Extra words people might type when looking for this, e.g. "fee price pay". */
  keywords?: string;
  /** Anchor on the hub page, or a site path, for more detail. */
  link?: { href: string; label: string };
};

const TEAM = `${eligibility.teamSize.min} to ${eligibility.teamSize.max}`;
const DAY_START = schedule[0]?.time ?? "";
const DAY_END = schedule[schedule.length - 1]?.time ?? "";

/** A prototype, explained once and reused. */
export const PROTOTYPE =
  "A prototype is an early version of an idea that you can show or demonstrate. It does not have to be finished or ready to sell.";

export const PROTOTYPE_EXAMPLES = ["A revision tool for a CSEC subject", "A planner for school events", "A simple game", "An app for a problem in your community"];

/** Organizer names from event data. */
export const organizerNames = people.filter((p) => p.role === "organizer" && p.confirmed).map((p) => p.name);
const ORGANIZERS = organizerNames.join(" and ");

/** "Campion’s", but "Wolmer’s Girls’" stays as it is. */
export const possessive = (s: string) => (/[’']s?$/.test(s) ? s : `${s}’s`);

/** The hub's public address, e.g. "https://www.hack876.com/schools/campion". */
export const hubUrl = (brief: SchoolBrief) => `${event.siteUrl}/schools/${brief.slug}`;
/** The same address without the scheme, for print and graphics. */
export const hubUrlShort = (brief: SchoolBrief) => hubUrl(brief).replace(/^https?:\/\//, "");

/** The eligible forms, with the school's own year names when it uses different ones. */
export function formsFor(brief: SchoolBrief) {
  return brief.localForms ? `${eligibility.forms} (${brief.localForms} at ${brief.short})` : eligibility.forms;
}

/** Facts shown at the top of every hub. */
export function hubFacts(brief?: SchoolBrief) {
  return [
    { k: "Date", v: eventWhen.long, status: "confirmed" as HubStatus },
    { k: "Venue", v: `${venue.name}, ${venue.address}`, status: (venue.confirmed ? "confirmed" : "pending") as HubStatus },
    { k: "Hours", v: `${DAY_START} to ${DAY_END}, ${event.timeZone}. One day, not overnight.` },
    { k: "Who", v: `Students in ${brief ? formsFor(brief) : eligibility.forms}` },
    { k: "Size", v: `About ${eligibility.maxHackers} students from several schools` },
    { k: "Teams", v: `${TEAM} students per team` },
  ];
}

/** Registration runs on MLH. There is no deadline on the site unless `registration.closes` is set. */
export const registrationState = {
  open: true,
  label: "Registration is open on MLH",
  url: registration.url,
  deadline: registration.closes,
};

/** The faculty liaison as shown on a hub: the hub's own, or the brief's addressee. */
export function hubLiaison(brief: SchoolBrief) {
  return brief.hub?.liaison ?? { name: brief.liaison.name, title: brief.liaison.title, text: brief.liaison.role, pending: false };
}

/** The ten-second answer to "is my school in, can I go, when, where, what next". */
/** `wide` facts take the full width on phones, where the rest sit two to a row. */
export function quickStatus(brief: SchoolBrief): { k: string; v: string; status?: HubStatus; note?: string; wide?: boolean }[] {
  const liaison = hubLiaison(brief);
  const range = brief.planningRange;
  return [
    { k: brief.school, v: "Confirmed participating school", note: "Students register individually on MLH", wide: true },
    { k: "Date", v: eventWhen.long, status: "confirmed" },
    { k: "Venue", v: `${venue.name}, ${venue.address}`, status: venue.confirmed ? "confirmed" : "pending", note: venue.room ? venue.room : "Room and arrival details to follow", wide: true },
    { k: "Hours", v: `${DAY_START} to ${DAY_END}`, note: "One day, not overnight" },
    { k: "Registration", v: registrationState.label, note: registrationState.deadline ? `Closes ${registrationState.deadline}` : "No deadline set yet. Places are limited.", wide: true },
    { k: "Cost", v: "Free for students", status: "confirmed" },
    { k: "Who can register", v: formsFor(brief), wide: true },
    { k: "Places", v: `About ${eligibility.maxHackers} students across all schools`, note: `Teams of ${TEAM}` },
    range
      ? { k: `${brief.short} planning estimate`, v: `Roughly ${range.min} to ${range.max} students`, note: "Provisional. Not a quota or a promise.", wide: true }
      : { k: `${brief.short} planning estimate`, v: "Not set", status: "pending", note: "No quota. Every student registers individually.", wide: true },
    { k: "Faculty liaison", v: liaison.pending ? "To be confirmed" : liaison.name, status: liaison.pending ? "school" : "confirmed", note: liaison.pending ? undefined : liaison.title, wide: true },
    { k: "Student ambassadors", v: brief.hub?.ambassadors.status ?? "To be nominated", status: "school", wide: true },
  ];
}

/** What a student ambassador does, and does not do. The same for every school. */
export function ambassadorRole(brief: SchoolBrief) {
  const liaison = hubLiaison(brief);
  const askTo = liaison.pending ? "the Hack 876 organizing team" : `${liaison.name}, the faculty liaison, or the Hack 876 organizing team`;
  return {
    duties: [
      "Tell eligible classmates about Hack 876.",
      "Share the link to this page, the QR code and the approved graphics and messages.",
      "Answer simple questions using this page.",
      `Pass on anything you are not sure about to ${askTo}.`,
      "Remind classmates to register early, because places are limited.",
    ],
    not: [
      "Ambassadors are not event organizers.",
      "They do not decide or approve who takes part.",
      "They never handle money. Hack 876 is free.",
      "They do not collect classmates’ personal details, registrations or consent forms.",
      "They are not expected to answer policy, safety or permission questions.",
      `They do not speak for ${brief.school}, unless the school says otherwise.`,
    ],
  };
}

/** Ready-to-send messages for ambassadors and teachers. Only facts from event.ts. */
export function shareMessages(brief: SchoolBrief) {
  const url = hubUrl(brief);
  const forms = formsFor(brief);
  return [
    {
      key: "whatsapp",
      title: "WhatsApp message",
      text: `${brief.school} is taking part in Hack 876, ${mlh.hackDayBadge.replace(/^An /, "an ")}.\n\nOne day to build something real in a team of ${TEAM}, on ${eventWhen.long} at the ${venue.name}, Kingston. It is free for students in ${forms}, and you do not need to know how to code.\n\nEverything you need, including how to register: ${url}`,
    },
    {
      key: "classroom",
      title: "Class or group-chat announcement",
      text: `Hack 876 is a one-day build competition for secondary-school students, and ${brief.school} is taking part. Students in ${forms} can register for free on MLH. Teams of ${TEAM} build a prototype and present it to judges. No coding experience needed, and places are limited to about ${eligibility.maxHackers} students. Details and registration: ${url}`,
    },
    {
      key: "instagram",
      title: "Instagram caption",
      text: `${brief.school} is in. Hack 876 is ${mlh.hackDayBadge.replace(/^An /, "an ")}: one day to build something that should exist.\n\n${eventWhen.long}\n${venue.name}, Kingston\nFree for students in ${forms}\nNo coding experience needed\n\nLearn more and register: ${hubUrlShort(brief)}\n\n#Hack876`,
    },
  ];
}

/* -------------------------------------------------------------------------- */
/*  Generated media: PNG graphics and a QR code for every hub                  */
/* -------------------------------------------------------------------------- */

export const mediaVariants = [
  { key: "feed", title: "Feed post", size: "1080 × 1350", width: 1080, height: 1350, blurb: "Instagram or Facebook feed (4:5)." },
  { key: "square", title: "Square post", size: "1080 × 1080", width: 1080, height: 1080, blurb: "Square post for any feed or group chat." },
  { key: "story", title: "Story / WhatsApp Status", size: "1080 × 1920", width: 1080, height: 1920, blurb: "Instagram Story or WhatsApp Status (9:16)." },
  { key: "landscape", title: "Classroom screen", size: "1920 × 1080", width: 1920, height: 1080, blurb: "Projector, TV or classroom screen (16:9)." },
  { key: "qr", title: "QR code", size: "1024 × 1024", width: 1024, height: 1024, blurb: "Opens this page. For posters, slides and noticeboards." },
  /* Link preview only. Not listed for download. */
  { key: "og", title: "Link preview", size: "1200 × 630", width: 1200, height: 630, blurb: "" },
] as const;

export type MediaKey = (typeof mediaVariants)[number]["key"];

export const mediaFile = (brief: SchoolBrief, key: MediaKey) => `hack876-${brief.slug}-${key}.png`;
export const mediaHref = (brief: SchoolBrief, key: MediaKey) => `/schools/${brief.slug}/media/${mediaFile(brief, key)}`;

/** What to bring. Only what is truly required is marked `need`. */
export const bringList: { item: string; kind: "need" | "nice" | "pending" }[] = [
  { item: "Your own laptop or other device, and its charger. Hack 876 does not provide devices.", kind: "need" },
  { item: "Your school ID", kind: "need" },
  { item: "A signed parent or guardian consent form (you receive it after you register)", kind: "need" },
  { item: "A water bottle", kind: "nice" },
  { item: "Headphones", kind: "nice" },
  { item: "A notebook and pen for sketching ideas", kind: "nice" },
  { item: "The final packing list, sent to registered students", kind: "pending" },
];

export function hubFaqs(brief: SchoolBrief): HubFaq[] {
  const { short } = brief;
  const range = brief.planningRange ? `${brief.planningRange.min} to ${brief.planningRange.max}` : null;
  const liaison = hubLiaison(brief);
  const guidance = brief.hub?.schoolGuidance ?? [];
  const special = prizes.filter((p) => !p.place).map((p) => p.name);
  const builds = buildTypes.map((b) => (/^[A-Z]{2}/.test(b.label) ? b.label : b.label.toLowerCase())).join(", ");

  return [
    /* ----------------------------------------------------------------- The basics */
    {
      id: "what-is",
      q: "What is Hack 876?",
      a: `Hack 876 is a one-day build competition for Jamaican secondary-school students. In teams of ${TEAM}, students choose a real problem, build a prototype that addresses it, and present it to a panel of judges.\n\nIt takes place in person at the ${venue.name} in ${venue.area}.`,
      category: "The basics",
      audience: ["students", "parents", "teachers"],
      keywords: "about explain event competition",
      link: { href: "#about", label: "What is Hack 876?" },
    },
    {
      id: "hackathon",
      q: "What is a hackathon?",
      a: "A hackathon is an event where small teams build something from scratch in a short, fixed time, then show it to judges. The word comes from \u201chack\u201d in the sense of putting something together quickly. It has nothing to do with breaking into computers.",
      category: "The basics",
      audience: ["students", "parents", "teachers"],
      keywords: "hacking hackers meaning definition legal",
    },
    {
      id: "why",
      q: "Why should I take part?",
      a: `Because you get to build something real in a single day, with a team, and show it to people who build things for a living. You practise skills that school rarely tests together: finding a problem, working with people you have just met, making something that works and explaining it under time pressure.\n\nIt is free, no coding experience is needed, and you leave with a project you can talk about.`,
      category: "The basics",
      audience: ["students", "parents"],
      keywords: "benefit benefits worth point reason gain learn fun",
      link: { href: "#beyond", label: "What students gain" },
    },
    {
      id: "mlh",
      q: "What is MLH, and how is it involved?",
      a: `Major League Hacking (MLH) is a global community that supports student hackathons. Hack 876 is ${mlh.hackDayBadge.replace(/^An /, "an ")}. Students register and submit their projects on MLH, and everyone at the event follows the MLH Code of Conduct.\n\nThe Hack 876 organizing team runs the event itself.`,
      category: "The basics",
      audience: ["parents", "teachers", "students"],
      keywords: "major league hacking mlh hack day official partner who what",
      link: { href: "/code-of-conduct", label: "Code of Conduct" },
    },
    {
      id: "prototype",
      q: "What is a prototype?",
      a: `${PROTOTYPE}\n\nFor example: ${PROTOTYPE_EXAMPLES.map((e) => e[0].toLowerCase() + e.slice(1)).join(", ")}. The aim is to have something working to show by the end of the day. Not every team gets all the way there, and judges know that.`,
      category: "The basics",
      audience: ["students", "parents", "teachers"],
      keywords: "project demo product finished working",
    },
    {
      id: "organizers",
      q: "Who organizes Hack 876?",
      a: `Hack 876 is run by an organizing team led by ${ORGANIZERS}${organizerAlumniClause(people, brief.school, short)}. It is not run by ${brief.school}.\n\nThe organizing team handles consent forms, the event itself and all communication with students and families. Registration and project submission run on MLH, which Hack 876 is an official Hack Day of.`,
      category: "The basics",
      audience: ["parents", "teachers", "students"],
      keywords: "who runs behind legitimate organisers organisation company",
      link: { href: "#contact", label: "Contact the organizers" },
    },

    /* ---------------------------------------------------------- Who can take part */
    {
      id: "who-can-register",
      q: "Who can take part?",
      a: `Students in ${formsFor(brief)} at one of the schools in the Hack 876 school network, which includes ${short}. Each student registers themselves on MLH with a free MyMLH account. About ${eligibility.maxHackers} students from several schools will take part.`,
      category: "Who can take part",
      audience: ["students", "parents", "teachers"],
      keywords: "eligible eligibility allowed grade year age form fifth sixth",
      link: { href: "#register", label: "How to register" },
    },
    {
      id: "under-18",
      q: "Can students under 18 take part?",
      a: "Yes. Any student in the eligible forms can register, whatever their age. A parent or guardian must sign a consent form before the event.\n\nSome AI tools made by other companies have their own minimum ages. That affects which tools a student may use on the day. It does not affect whether they can take part.",
      category: "Who can take part",
      audience: ["students", "parents"],
      keywords: "age minor 16 17 young old enough",
      link: { href: "#ai-tools", label: "AI tools and age limits" },
    },
    {
      id: "guaranteed-place",
      q: `Is a place guaranteed for ${short} students?`,
      a: `No school has reserved places. Places are limited to about ${eligibility.maxHackers} students, and every student registers individually on MLH.\n\n${range ? `For planning, the organizers have roughly ${range} ${short} students in mind. That figure is an estimate. It is not a quota and not a promise.` : `No planning estimate has been set for ${short}, and there is no quota for any school.`}`,
      todo: `What happens if more than ${eligibility.maxHackers} students register.`,
      category: "Who can take part",
      audience: ["students", "parents", "teachers"],
      keywords: "how many spots spaces quota chance full capacity waitlist waiting list limit",
    },
    {
      id: "school-approval",
      q: `What is ${short}\u2019s involvement?`,
      a: brief.hub?.status ?? "",
      category: "Who can take part",
      audience: ["parents", "teachers"],
      keywords: "official approved endorsed school permission principal administration",
      link: { href: "#teachers", label: `For ${short} teachers` },
    },
    {
      id: "school-choose",
      q: `Does ${short} choose who attends?`,
      a: `No. There is no school selection or nomination step for Hack 876. Every eligible student registers themselves on MLH, and teachers can recommend it to anyone.\n\nAny permission ${short} requires for students to take part in an outside activity is separate, and is a matter for the school and families.`,
      category: "Who can take part",
      audience: ["students", "parents", "teachers"],
      keywords: "choose chosen select selected pick decides decide nominate nomination who attends selection",
    },
    {
      id: "school-permission",
      q: "Do I need permission from my school?",
      a: `Hack 876 does not need anything from ${short} for you to register. Some schools have their own rules about outside activities, so check with ${short} if you are unsure. ${brief.hub?.schoolChannel ?? ""}`.trim(),
      todo: `Whether ${short} has its own permission step for this event.`,
      status: "school",
      category: "Who can take part",
      audience: ["students", "parents", "teachers"],
      keywords: "permission approve approval allowed school rules office principal letter",
    },
    ...guidance.map((g, i) => ({
      id: `school-guidance-${i}`,
      q: `${g.k}: what applies at ${short}?`,
      a: g.v,
      status: "school" as const,
      category: "Who can take part" as const,
      audience: ["students", "parents", "teachers"] as HubAudience[],
      keywords: `${g.k.toLowerCase()} sixth lower upper form`,
    })),

    /* -------------------------------------------------------------- Getting ready */
    {
      id: "coding",
      q: "Do I need to know how to code?",
      a: "No. You do not need Python, C, JavaScript or any other programming language, and you do not need to have built anything before.\n\nTeams need different skills. Someone has to understand the problem, design how the solution looks, build it, and explain it to the judges. Students who draw, write, research, organize or present are as useful as students who code.",
      category: "Getting ready",
      audience: ["students", "parents", "teachers"],
      keywords: "programming python javascript java scratch experience beginner never coded computer science know",
      link: { href: "#students", label: "For students" },
    },
    {
      id: "skills",
      q: "What skills are useful besides coding?",
      a: "Teams need people who can understand a problem and the people it affects, design how a solution looks and works, research and test ideas, keep the team organized and to time, and explain the project clearly to judges.\n\nStudents who draw, write, debate, organize events or run a business are as useful as students who code.",
      category: "Getting ready",
      audience: ["students", "parents", "teachers"],
      keywords: "skills design art writing presenting business research roles non technical",
    },
    {
      id: "tracks",
      q: "What are the tracks and challenges?",
      a: `Every team builds for one of ${tracks.length} tracks: ${tracks.map((t) => `${t.name} (${t.line.replace(/\.$/, "").toLowerCase()})`).join(", ")}.\n\nTeams can also enter the optional partner challenge, ${copilotChallenge.name}, on top of their track. The challenge for the day is revealed at the opening.`,
      category: "Getting ready",
      audience: ["students", "teachers"],
      keywords: "track tracks category categories theme themes challenge prompt topic",
      link: { href: "/#hack", label: "See the tracks" },
    },
    {
      id: "what-build",
      q: "What do students build?",
      a: `Each team builds a prototype. ${PROTOTYPE}\n\nTeams choose their own problem and how to tackle it. Past hackathon projects include ${builds}. Hack 876 is hands-on: students spend the day building and then presenting, not sitting in lectures.`,
      category: "Getting ready",
      audience: ["students", "parents", "teachers"],
      keywords: "make create project app website game ideas examples",
    },
    {
      id: "training",
      q: "Is there training before the event?",
      a: "No training sessions have been arranged. Students do not need to prepare anything in order to register.",
      todo: "Whether optional workshops or preparation materials will be offered. Any that are arranged will be announced on this page.",
      category: "Getting ready",
      audience: ["students", "teachers"],
      keywords: "prepare preparation workshop practice lessons learn before study",
    },
    {
      id: "team",
      q: "Do I need a team before I register?",
      a: `No. You can register on your own, or with friends. Each of you registers yourself on MLH.\n\nTeams are ${TEAM} students. Students without a team are placed in one, which may include students from another school. Hack 876 is not ${short} against other schools: teams can be mixed.`,
      todo: "The final rules for how teams are formed.",
      category: "Getting ready",
      audience: ["students", "teachers"],
      keywords: "group friends alone solo partner teammates join match other schools mix mixed size how many",
    },
    {
      id: "setup",
      q: "What should I set up before the day?",
      a: "A free MyMLH account, which you create when you register and use to submit your team’s project. Make sure your laptop is charged and you can sign in to it.\n\nProject code must be public for prizes, for example in a public GitHub repository, so a free GitHub account is useful. GitHub accounts are for people aged 13 and over.",
      todo: "The list of approved tools and any accounts to create in advance. It will be sent to registered students.",
      category: "Getting ready",
      audience: ["students"],
      keywords: "account accounts software install setup set up download github mymlh prepare before",
      link: { href: "/rules#submitting", label: "Event Rules: submitting" },
    },
    {
      id: "wear",
      q: "What should I wear?",
      a: "No dress code has been announced. Wear something comfortable: you will spend most of the day sitting, building and moving around a hotel conference space.",
      todo: `Whether ${short} would like its students in school uniform.`,
      status: "school",
      category: "Getting ready",
      audience: ["students", "parents"],
      keywords: "wear clothes clothing uniform dress code outfit",
    },
    {
      id: "bring",
      q: "What should students bring?",
      a: "Required: your own laptop or other device to build on, with its charger, your school ID and a signed parent or guardian consent form. Hack 876 is not providing laptops or other hardware.\n\nBring if you have them: a water bottle, headphones, and a notebook and pen.",
      todo: "The final packing list, which will be sent to registered students.",
      category: "Getting ready",
      audience: ["students", "parents"],
      keywords: "pack packing equipment laptop computer charger carry need",
      link: { href: "#bring", label: "What to bring" },
    },
    {
      id: "start-early",
      q: "Can a team start its project before the event?",
      a: "Teams can think about ideas beforehand, but building starts on the day, when the clock starts for everyone.",
      todo: "The full rules on work done before the event.",
      category: "Getting ready",
      audience: ["students"],
      keywords: "early advance head start existing project rules cheating",
    },

    /* ---------------------------------------------------------------- Registering */
    {
      id: "how-register",
      q: "How does a student register?",
      a: `On MLH, at ${registration.url}. Each student registers themselves with a free MyMLH account, which they also use to submit their team’s project on the day.\n\nA parent or teacher does not need to do anything at this stage, and there is no school nomination step.`,
      category: "Registering",
      audience: ["students", "parents", "teachers"],
      keywords: "sign up register registration join enter form submit mlh mymlh account",
      link: { href: registration.url, label: registration.labelLong },
    },
    {
      id: "deadline",
      q: "Is there a registration deadline?",
      a: registration.closes
        ? `Registration closes on ${registration.closes}. Places are limited to about ${eligibility.maxHackers} students, so register early.`
        : `No deadline has been set yet. Places are limited to about ${eligibility.maxHackers} students across all schools, so register early.`,
      todo: registration.closes ? undefined : `The registration close date, and what happens if more than ${eligibility.maxHackers} students register.`,
      status: registration.closes ? "confirmed" : "pending",
      category: "Registering",
      audience: ["students", "parents", "teachers"],
      keywords: "deadline close closes closing date last day late when by full",
    },
    {
      id: "recommendation",
      q: "Does a teacher have to recommend me?",
      a: `No. Students register directly on MLH. Teachers at ${short} can recommend Hack 876 to students and support them, for example with parent or guardian consent forms and travel, but there is no nomination step.`,
      category: "Registering",
      audience: ["students", "parents", "teachers"],
      keywords: "recommended nominate nomination teacher permission referral required first",
    },
    {
      id: "after-registering",
      q: "What happens after a student registers?",
      a: "Registered students receive the parent or guardian consent form and the details for the day. The signed form is collected at the door at check-in, where the student’s school ID is also checked.",
      todo: "Who sends the consent form, and when.",
      category: "Registering",
      audience: ["students", "parents"],
      keywords: "next steps then afterwards confirmation email consent",
    },

    /* -------------------------------------------------------- AI tools & consent */
    {
      id: "ai-allowed",
      q: "Can students use AI tools?",
      a: "Yes. Using AI is allowed but not required, and a team can do well without it. Teams must say in their submission which AI tools they used and how, and its members must be able to explain and demo what they built.\n\nStudents will only use tools the organizers have approved for the event.",
      todo: "The list of approved tools.",
      category: "AI tools & consent",
      audience: ["students", "parents", "teachers"],
      keywords: "artificial intelligence ai assistant chatbot allowed disclose",
      link: { href: "#ai-tools", label: "AI tools and age limits" },
    },
    {
      id: "ai-age",
      q: "Can students under 18 use AI tools?",
      a: "Not every AI tool is open to students under 18. Many AI tools are made by companies that set a minimum age for users, and some are for adults only. Students under 18 will not be asked or allowed to use an adults-only tool at Hack 876.\n\nThe organizers are choosing tools that are appropriate for the ages taking part.",
      todo: "Which tools are approved, and the age limit for each.",
      category: "AI tools & consent",
      audience: ["students", "parents", "teachers"],
      keywords: "age restriction limit minor 13 14 15 16 17 18 year old appropriate child chatgpt gemini claude copilot chatbot",
    },
    {
      id: "consent-override",
      q: "Can a parent give permission for a child to use an 18+ tool?",
      a: "No. When a company sets a minimum age for its product, a parent\u2019s permission does not change it. Students under 18 will not use adults-only tools at Hack 876, with or without permission.",
      category: "AI tools & consent",
      audience: ["parents", "students"],
      keywords: "waive waiver permission override sign allow adult",
    },
    {
      id: "paid-tools",
      q: "Do students need to pay for AI tools or software?",
      a: "No. The organizers\u2019 aim is that no student has to buy software or an AI subscription to take part. Students do not need to own or pay for any tool in order to register.",
      todo: "How approved tools will be provided on the day.",
      category: "AI tools & consent",
      audience: ["students", "parents"],
      keywords: "subscription buy purchase paid premium account free",
    },
    {
      id: "team-18",
      q: "Does a team need a member who is 18 or older?",
      a: "No. There is no such rule. The aim is for every team to have tools its members are old enough to use.",
      todo: "The final rules on accounts and access to tools.",
      category: "AI tools & consent",
      audience: ["students", "parents", "teachers"],
      keywords: "adult eighteen requirement account",
    },
    {
      id: "consent",
      q: "What consent is needed from a parent or guardian?",
      a: "Every participant needs a consent form signed by a parent or guardian. Students receive the form after they register, and it is collected at the door at check-in.",
      todo: "The exact wording of the form and how it is returned.",
      category: "AI tools & consent",
      audience: ["parents", "students"],
      keywords: "permission slip form sign signature guardian approve",
    },

    /* -------------------------------------------------------------------- The day */
    {
      id: "when",
      q: "When is Hack 876?",
      a: `${eventWhen.long}, from ${DAY_START} to ${DAY_END} (${event.timeZone}). The date is confirmed.`,
      category: "The day",
      audience: ["students", "parents", "teachers"],
      status: "confirmed",
      keywords: "date day what time month february saturday",
    },
    {
      id: "arrival",
      q: "What happens when I arrive?",
      a: `Doors open at ${DAY_START}. Check in at the door in person: bring your school ID and your signed parent or guardian consent form. Check-in is only possible at the venue, on the day.\n\nThe opening starts at ${schedule.find((x) => x.title === "Opening")?.time ?? ""}, so arrive in good time. The day ends at ${DAY_END}.`,
      todo: venue.room && venue.arrival ? undefined : "The room and arrival instructions.",
      category: "The day",
      audience: ["students", "parents"],
      keywords: "arrive arrival check in check-in id identification doors time start late morning",
    },
    {
      id: "where",
      q: "Where is it held?",
      a: `At the ${venue.name}, ${venue.address}. ${venue.room && venue.arrival ? `${venue.room}. ${venue.arrival}` : venueArrivalPending}`,
      todo: venue.room && venue.arrival ? undefined : "Room and arrival instructions.",
      category: "The day",
      audience: ["students", "parents", "teachers"],
      status: venue.confirmed ? "confirmed" : "pending",
      keywords: "location venue address place hotel directions map",
      link: venue.mapsUrl ? { href: venue.mapsUrl, label: "View on Maps" } : undefined,
    },
    {
      id: "overnight",
      q: "Is it overnight? What are the hours?",
      a: `It is not overnight. Hack 876 runs for a single day, from ${DAY_START} to ${DAY_END}, and every student goes home that evening.`,
      todo: "Times may shift slightly. The final schedule is sent to registered students.",
      category: "The day",
      audience: ["parents", "students", "teachers"],
      keywords: "sleep stay night hours start end finish time long late",
      link: { href: "/#schedule", label: "See the full schedule" },
    },
    {
      id: "schedule",
      q: "What happens during the day?",
      a: `Students arrive, form into teams and are given the challenge. They spend most of the day building, with a break for lunch. In the late afternoon each team shows its work to the judges, the best teams present on stage, and prizes are awarded.\n\nKey times: ${schedule
        .filter((s) => s.highlight)
        .map((s) => `${s.title.replace(/\.\s+/g, ", ").replace(/\.$/, "").toLowerCase()} at ${s.time}`)
        .join(", ")}.`,
      category: "The day",
      audience: ["students", "parents", "teachers"],
      keywords: "schedule agenda timetable programme itinerary plan activities",
      link: { href: "/#schedule", label: "See the full schedule" },
    },

    {
      id: "in-person",
      q: "Is Hack 876 online?",
      a: "No. Hack 876 is entirely in person, at the venue. There is no remote participation, and check-in happens at the doors on the day, in person only.",
      category: "The day",
      audience: ["students", "parents", "teachers"],
      keywords: "online remote virtual zoom in person attend check in",
    },

    /* --------------------------------------------------------- Safety & logistics */
    {
      id: "food",
      q: "Is food provided?",
      a: foodNote,
      todo: "The menu.",
      category: "Safety & logistics",
      audience: ["parents", "students"],
      keywords: "lunch meal meals eat snacks drinks allergy allergies vegetarian halal dietary hungry",
    },
    {
      id: "supervision",
      q: "Who supervises the students?",
      a: `Students are supervised by Hack 876 staff and volunteers for the whole day, at the ${venue.name}.`,
      todo: "The number of supervising adults and the written safeguarding procedures. Both will be sent to families before the event.",
      category: "Safety & logistics",
      audience: ["parents", "teachers"],
      keywords: "safe safety safeguarding secure security adults chaperone teachers present watch protect trust supervise supervises",
    },
    {
      id: "conduct",
      q: "What are the safety rules and the Code of Conduct?",
      a: `Everyone at Hack 876, including students, mentors, judges and organizers, follows the MLH Code of Conduct and the Hack 876 Code of Conduct. Harassment of any kind is not tolerated, and anyone can report a concern to the organizers or to MLH at ${mlh.incidentEmail}.`,
      category: "Safety & logistics",
      audience: ["parents", "teachers", "students"],
      keywords: "code of conduct rules behaviour behavior harassment bullying report concern safeguarding",
      link: { href: "/code-of-conduct", label: "Read the Code of Conduct" },
    },
    {
      id: "mentors",
      q: "Who are the judges and mentors?",
      a: "Judges and mentors are professionals who work in technology and business. Mentors help teams during the day. Judges watch each team’s demo and score it. They follow the same Code of Conduct as everyone else.",
      category: "Safety & logistics",
      audience: ["parents", "teachers", "students"],
      keywords: "judges mentors adults professionals who volunteers",
      link: { href: "/#people", label: "See the judges" },
    },
    {
      id: "parents-stay",
      q: "Can parents stay at the event?",
      a: "Hack 876 is planned as a student event, with students supervised by Hack 876 staff and volunteers. Families drop students off in the morning and collect them at the end of the day.",
      todo: "Whether parents and teachers can attend or watch the final presentations.",
      category: "Safety & logistics",
      audience: ["parents"],
      keywords: "parents stay watch attend visit spectators guests family audience",
    },
    {
      id: "photos",
      q: "Will students be photographed?",
      a: photoConsent,
      category: "Safety & logistics",
      audience: ["parents", "students"],
      keywords: "photo photos photograph pictures media social video filming consent images",
    },
    {
      id: "transport",
      q: "How do students get there and back?",
      a: `No transport has been arranged by Hack 876, so families should plan to bring students to the ${venue.name} for ${DAY_START} and collect them at ${DAY_END}.`,
      todo: `Drop-off and pick-up procedures, and whether ${short} will arrange any transport.`,
      category: "Safety & logistics",
      audience: ["parents", "students", "teachers"],
      keywords: "transport transportation travel bus drive drop off pick up pickup collect ride taxi parking how get provided leave departure",
    },
    {
      id: "emergency",
      q: "Who do I contact on the day or in an emergency?",
      a: `${incidentLead ? `The on-site lead on the day is ${incidentLead.name}, ${incidentLead.contact}.` : "Every family will be given an on-site contact and the emergency procedure before the event."}${event.contactEmail ? ` Before the day, the organizers can be reached at ${event.contactEmail}.` : ""}`,
      todo: incidentLead ? undefined : "The on-site contact details.",
      category: "Safety & logistics",
      audience: ["parents"],
      keywords: "phone number call reach urgent accident medical sick",
    },
    {
      id: "access",
      q: "What if a student has access, medical or dietary needs?",
      a: `Tell the organizers as early as possible${event.contactEmail ? `, at ${event.contactEmail}` : ""}, so arrangements can be made with the venue. You can also tell us when you register.`,
      category: "Safety & logistics",
      audience: ["parents", "students"],
      keywords: "disability wheelchair accessible medication condition special needs support",
    },

    /* ---------------------------------------------------------- Costs & equipment */
    {
      id: "cost",
      q: "Does it cost anything to take part?",
      a: "No. Hack 876 is free for students. Food is provided on the day.",
      category: "Costs & equipment",
      audience: ["parents", "students", "teachers"],
      keywords: "fee fees price pay payment money free charge expensive how much",
      status: "confirmed",
    },
    {
      id: "laptop",
      q: "Does every student need a laptop?",
      a: "Yes. Every student needs to bring their own laptop and its charger. Hack 876 does not provide laptops; please bring your own.",
      category: "Costs & equipment",
      audience: ["students", "parents"],
      keywords: "computer device tablet own equipment charger",
    },

    /* ----------------------------------------------------------- Judging & prizes */
    {
      id: "judging",
      q: "How are projects judged?",
      a: `Each team demonstrates its project to the judges. They look at ${judging.length} things: ${judging
        .map((j) => j.name.toLowerCase())
        .join(", ")}.\n\nA simple idea that works and is explained clearly can beat a complicated one that does not.`,
      category: "Judging & prizes",
      audience: ["students", "teachers", "parents"],
      keywords: "judges criteria score marks win winning evaluate assessed",
      link: { href: "#about", label: "How judging works" },
    },
    {
      id: "prizes",
      q: "What are the prizes?",
      a: `There are prizes for first, second and third place, and special awards for ${special.join(", ")}.\n\nPrizes are a bonus. The main reason to take part is the experience of building something.`,
      todo: prizesNote ? "The prize items listed on the Hack 876 website are provisional and may change." : undefined,
      category: "Judging & prizes",
      audience: ["students", "parents", "teachers"],
      keywords: "win award awards reward gift trophy money",
      link: { href: "/#prizes", label: "See the prizes" },
    },
    {
      id: "receive",
      q: "What does every participant get?",
      a: "A day building with a team, help from mentors who work in industry, food on the day, the chance to present to judges, and a project of your own to talk about afterwards.",
      todo: "Whether there will be certificates, swag or other items for every participant. Nothing beyond the above is promised.",
      category: "Judging & prizes",
      audience: ["students", "parents"],
      keywords: "certificate swag shirt t-shirt gift participation everyone receive get",
    },

    {
      id: "submit",
      q: "How do teams submit their project?",
      a: `Only on the MLH Challenges page: ${registration.challengesUrl}. Each team makes one submission and selects every challenge it is eligible for. One team member signs in with their MyMLH account to submit, after checking in at the venue. Submissions close before demos start.`,
      category: "Judging & prizes",
      audience: ["students", "teachers"],
      keywords: "submit submission hand in upload project mlh challenges deadline",
      link: { href: "/rules#submitting", label: "Event Rules: submitting" },
    },
    {
      id: "copilot",
      q: `What is “${copilotChallenge.name}”?`,
      a: `An optional partner challenge any team can enter, on top of its track. ${copilotChallenge.summary}`,
      category: "Judging & prizes",
      audience: ["students", "teachers"],
      keywords: "github copilot ai open source challenge partner bonus",
      link: { href: "/rules#copilot", label: "Event Rules: Best Hack Built with GitHub Copilot" },
    },

    /* ------------------------------------------------------------ After the event */
    {
      id: "internships",
      q: "Does taking part lead to internships, jobs or scholarships?",
      a: "No. Hack 876 does not offer or promise internships, jobs, scholarships, interviews or placements.\n\nWhat students do get is a day working next to engineers, mentors and other professionals, a chance to present to judges who work in technology and business, and a project they can describe to universities and employers.",
      todo: "The organizers hope to develop longer-term links with companies, universities and mentors. None are in place.",
      category: "After the event",
      audience: ["students", "parents", "teachers"],
      keywords: "career careers job work opportunity opportunities university college cv resume after afterwards",
      link: { href: "#beyond", label: "What students gain" },
    },
    {
      id: "careers",
      q: "Will students get career advice?",
      a: "Students meet people who work in technology and can ask them about their studies and careers. There is no formal career programme attached to Hack 876.",
      category: "After the event",
      audience: ["students", "parents", "teachers"],
      keywords: "mentor mentorship mentoring guidance advice professional network",
    },

    /* --------------------------------------------------------------- For teachers */
    {
      id: "recommend",
      q: "How do teachers share Hack 876 with students?",
      a: brief.hub ? brief.hub.faculty.process.join(" ") : "",
      category: "For teachers",
      audience: ["teachers"],
      keywords: "nominate suggest put forward refer staff",
      link: { href: "#teachers", label: `For ${short} teachers` },
    },
    {
      id: "who-recommend",
      q: "Which students are a good fit?",
      a: brief.hub ? brief.hub.faculty.profiles.join(" ") : "",
      category: "For teachers",
      audience: ["teachers", "parents"],
      keywords: "suitable right kind type profile candidates ideal",
    },
    {
      id: "school-effort",
      q: `What is ${short} asked to do or pay?`,
      a: `${short} is not asked to pay anything, host anything or run anything. Teachers are not asked to teach coding, register students, form teams or attend the event. Teachers are asked to share this page with eligible students and, if they wish, recommend Hack 876 to them and help with consent forms and travel.\n\nPermission for students to take part in an outside activity remains a matter for ${short} and for families.`,
      category: "For teachers",
      audience: ["teachers", "parents"],
      keywords: "school responsibility cost budget obligation commitment workload pay sponsor attend teachers",
    },
    {
      id: "ambassadors",
      q: "What is a student ambassador?",
      a: brief.hub
        ? `A student ambassador is a ${short} student who helps classmates find out about Hack 876. ${brief.hub.ambassadors.summary}\n\nThe role is small: ${ambassadorRole(brief)
            .duties.map((d) => d.replace(/\.$/, "").replace(/^./, (c) => c.toLowerCase()))
            .join("; ")}. Ambassadors never handle money, registrations or consent forms.`
        : "",
      category: "For teachers",
      audience: ["teachers", "students"],
      keywords: "representative rep student leader prefect volunteer role",
    },
    {
      id: "materials",
      q: "Is there a flyer or information sheet to share?",
      a: "Yes. A student flyer, a parent and guardian information sheet, an overview for teachers and a printable poster can each be downloaded from this page as a one-page PDF. There are also graphics for social media and WhatsApp, a QR code and ready-to-send messages.",
      category: "For teachers",
      audience: ["teachers", "parents"],
      keywords: "poster handout print pdf download advertisement advert notice whatsapp share graphic graphics instagram qr",
      link: { href: "#resources", label: "Downloads" },
    },
    {
      id: "liaison",
      q: `Who is ${possessive(short)} faculty liaison?`,
      a: liaison.pending ? `${liaison.text}` : `${liaison.name}, ${liaison.title}. ${liaison.text}`,
      status: liaison.pending ? "school" : "confirmed",
      category: "For teachers",
      audience: ["teachers", "parents", "students"],
      keywords: "liaison teacher contact staff coordinator point person",
      link: { href: "#teachers", label: `For ${short} teachers` },
    },
    {
      id: "contact",
      q: "Who do I ask if my question is not answered here?",
      a: `${event.contactEmail ? `Email the Hack 876 organizing team at ${event.contactEmail}. ` : ""}${brief.hub?.schoolChannel ?? ""}`,
      category: "For teachers",
      audience: ["students", "parents", "teachers"],
      keywords: "contact email phone help support speak talk reach question",
      link: { href: "#contact", label: "Contact" },
    },
  ].filter((f) => f.a) as HubFaq[];
}

/** Printable one-page sheets generated for every hub school, plus the original brief. */
export function schoolSheets(brief: SchoolBrief) {
  const file = (name: string) => `/proposals/hack876-${brief.slug}-${name}.pdf`;
  return [
    {
      key: "students" as const,
      title: "Student flyer",
      blurb: "What Hack 876 is, who can register and how. For noticeboards and class groups.",
      href: file("student-flyer"),
      filename: `Hack 876 x ${brief.school} - Student Flyer.pdf`,
    },
    {
      key: "parents" as const,
      title: "Parent and guardian information sheet",
      blurb: "Date, venue, hours, supervision, consent, food, transport and costs on one page.",
      href: file("parent-information"),
      filename: `Hack 876 x ${brief.school} - Parent Information.pdf`,
    },
    {
      key: "faculty" as const,
      title: "Overview for teachers",
      blurb: "How to share Hack 876, which students are a good fit, and what the school is and is not asked to do.",
      href: file("faculty-overview"),
      filename: `Hack 876 x ${brief.school} - Faculty Overview.pdf`,
    },
    {
      key: "poster" as const,
      title: "Printable poster",
      blurb: "The essentials and a QR code to this page, for noticeboards. Fits US Letter and A4.",
      href: file("poster"),
      filename: `Hack 876 x ${brief.school} - Poster.pdf`,
    },
  ];
}

export type SheetKey = ReturnType<typeof schoolSheets>[number]["key"];

export type HubResource = { title: string; blurb: string; href: string; kind: string; filename?: string; external?: boolean };

/**
 * The hub's resource library, grouped by reader. Files are generated from the
 * same data as the hub: PDFs by `npm run print:schools`, PNGs at build time.
 */
export function schoolResources(brief: SchoolBrief): { key: string; title: string; items: HubResource[] }[] {
  const sheet = (k: SheetKey): HubResource => {
    const s = schoolSheets(brief).find((x) => x.key === k)!;
    return { title: s.title, blurb: s.blurb, href: s.href, filename: s.filename, kind: "PDF · 1 page" };
  };
  const png = (k: MediaKey): HubResource => {
    const m = mediaVariants.find((x) => x.key === k)!;
    return { title: m.title, blurb: m.blurb, href: mediaHref(brief, k), filename: `Hack 876 x ${brief.school} - ${m.title.replace(/\s*\/\s*/g, " and ")}.png`, kind: `PNG · ${m.size}` };
  };
  const link = (title: string, blurb: string, href: string): HubResource => ({ title, blurb, href, kind: "Web page", external: href.startsWith("http") });
  return [
    {
      key: "students",
      title: "Students",
      items: [
        sheet("students"),
        link("Register on MLH", "Create a free MyMLH account and register. Each student registers themselves.", registration.url),
        link("Event Rules", "Teams, building, submitting and judging.", "/rules"),
      ],
    },
    {
      key: "parents",
      title: "Parents and guardians",
      items: [
        sheet("parents"),
        link("Code of Conduct", "The rules everyone at Hack 876 follows, and how to report a concern.", "/code-of-conduct"),
      ],
    },
    {
      key: "faculty",
      title: "Teachers and school staff",
      items: [
        sheet("faculty"),
        sheet("poster"),
        ...(brief.pdf
          ? [{ title: "Original participation brief", blurb: `The presentation first prepared for ${possessive(brief.short)} leadership. Kept for reference.`, href: brief.pdf.href, filename: brief.pdf.filename, kind: "PDF · slides" }]
          : []),
      ],
    },
    {
      key: "ambassadors",
      title: "Student ambassadors",
      items: [png("feed"), png("square"), png("story"), png("landscape"), png("qr")],
    },
  ];
}
