import {
  buildTypes,
  confirmedSchools,
  event,
  eventWhen,
  eligibility,
  judging,
  people,
  phaseLabels,
  principles,
  prizes,
  prizesNote,
  schedule,
  sponsors,
  tracks,
  venue,
  type Person,
  type SchedulePhase,
} from "./event";
import { getSchoolBrief, type SchoolBrief } from "./schoolBriefs";
import { formsFor, hubFacts, hubFaqs } from "./schoolHub";

/*
 * Print-only mail packs for school principals: a one-page cover letter and an
 * eight-page booklet per school, printed to PDF by scripts/print-principal-packs.mjs
 * and hand-delivered. Private: noindex, and never linked from the site.
 *
 * Only what is specific to the print pack lives here: the recipient, the inside
 * address, the salutation, the reference code and a few print overrides. Every
 * date, time, track, person, school, prize, sponsor and schedule row is read
 * from event.ts, schoolBriefs.ts and schoolHub.ts.
 *
 * Rules (checked in principalPacks.test.ts):
 * - Never a pack for a confirmed school.
 * - An unverified recipient is never named: "Dear Principal," and "Yours faithfully,".
 * - No student names. Never say or imply that the reader's school has agreed.
 */

export type PrincipalPack = {
  key: string;
  /** The schoolBriefs entry this pack draws on. */
  briefSlug: string;
  /** Replaces `brief.school` where the pack goes to one school of a group. */
  displayName?: string;
  /** Replaces `brief.short` in running copy. */
  short?: string;
  /** Inside address, one line each, exactly as it should print. */
  address: string[];
  salutation: string;
  /** `false` prints no name anywhere: "The Principal", "Dear Principal,", "Yours faithfully,". */
  verified: boolean;
  /** Makes the print script warn before printing. Does not change the output. */
  confirmBeforePrint: boolean;
  confirmNote?: string;
  cc?: string;
  /** Letter paragraph 4: when we wrote by email. */
  emailNote: string;
  /** Reference code, printed as "Our ref: H876/PRN/<code>/2026-01". */
  code: string;
  /** Letter paragraph 2: why this school, rephrased from facts already sourced in the brief. */
  why: string;
  /** One extra sentence for paragraph 2. Never a student's name. */
  extraLine?: string;
  /** Replaces the brief's quote attribution on the booklet. */
  quoteBy?: string;
  /** Replaces the brief's `fit` when the brief's examples belong to a different school in the group. */
  fit?: SchoolBrief["fit"];
  /** `false` leaves out people who attended the brief's school, when that school is not this one. */
  connections?: boolean;
};

const SAME_AS_JC = "We wrote to you by email on 16 October 2026 and would be glad to hear from you.";

export const principalPacks: PrincipalPack[] = [
  {
    key: "ardenne",
    briefSlug: "ardenne",
    address: ["Dr. Jacqueline Pinto", "Acting Principal", "Ardenne High School", "10 Ardenne Road", "Kingston 10"],
    salutation: "Dear Dr. Pinto,",
    verified: true,
    confirmBeforePrint: false,
    emailNote: "We wrote to the school by email on 16 October 2026. In case that message did not reach your desk, we wanted you to have this in hand.",
    code: "ARD",
    why: "In March 2026 Ardenne became the pilot site for the UTech and Kiwanis STEM Education Project, and its Robotics Club is already building and demonstrating its work.",
    quoteBy: "Dr. Jacqueline Pinto, Acting Principal, Ardenne High School",
  },
  {
    key: "jamaica-college",
    briefSlug: "jamaica-college",
    address: ["Mr. Wayne Robinson", "Principal", "Jamaica College", "189 Old Hope Road", "Kingston 6"],
    salutation: "Dear Principal Robinson,",
    verified: true,
    confirmBeforePrint: false,
    emailNote: SAME_AS_JC,
    code: "JC",
    why: "In 2023 JC’s Bluebots won Jamaica’s FIRST Tech Challenge championship and became the first Jamaican team to win the MOTIVATE Award at the World Championship, and JC STEAMING UP has brought project-based learning to the whole school since 2021.",
  },
  {
    key: "immaculate",
    briefSlug: "immaculate",
    address: ["Mrs. Stacey Wilson Reynolds", "Principal", "Immaculate Conception High School", "152C Constant Spring Road", "Kingston 8"],
    salutation: "Dear Principal Wilson Reynolds,",
    verified: true,
    confirmBeforePrint: false,
    emailNote: SAME_AS_JC,
    code: "ICHS",
    why: "In April 2024 an Immaculate team won the Crea+Her Girls in ICT Day Hackathon with Auto Farmer, an agriculture app, and took the Digicel Foundation Impact Award as well.",
  },
  {
    key: "st-andrew",
    briefSlug: "st-andrew",
    address: ["Mrs. Keeva Ingram", "Principal", "St Andrew High School for Girls", "10 Cecelio Avenue", "Kingston 10"],
    salutation: "Dear Principal Ingram,",
    verified: true,
    confirmBeforePrint: false,
    emailNote: SAME_AS_JC,
    code: "SAHS",
    why: "In October 2026 two St Andrew sixth formers were on Team Jamaica at the FIRST Global Robotics Olympics in Incheon, one of them as team captain, and in May 2026 the Robotics Club received a Guardian Group Foundation grant.",
  },
  {
    key: "st-georges",
    briefSlug: "st-georges",
    address: ["Mrs. Margaret Campbell", "Principal", "St George's College", "Winchester Park, North Street", "Kingston"],
    salutation: "Dear Principal Campbell,",
    verified: true,
    confirmBeforePrint: true,
    confirmNote: "The 2025–26 staff list shows an Acting Principal. Confirm Principal or Acting Principal on 876-922-2707 before printing.",
    emailNote: SAME_AS_JC,
    code: "STGC",
    why: "In March 2026 St George’s won the People’s Choice Award at the JPS Foundation EcoSpark Innovation Challenge for its sponge city, and both of its robotics teams finished in the top ten at the FIRST Tech Challenge Jamaica championship.",
    /* Off by default. Never add the student's name. */
    // extraLine: "A St George's student has already applied.",
  },
  {
    key: "aisk",
    briefSlug: "aisk",
    address: ["Dr. Christie Powell", "Middle and High School Principal", "American International School of Kingston", "2 College Green Avenue", "Kingston 6"],
    salutation: "Dear Dr. Powell,",
    verified: true,
    confirmBeforePrint: false,
    cc: "Mr. Chris Walker, Head of School",
    emailNote: SAME_AS_JC,
    code: "AISK",
    why: "AISK Hurricane, the school’s FIRST Tech Challenge team, won the Inspire Award at the Jamaica championship in 2023–24 and has competed at the FIRST World Championship two seasons running.",
  },
  {
    key: "wolmers",
    briefSlug: "wolmers",
    displayName: "Wolmer’s Boys’ School",
    address: ["Mr. Dwight Pennycooke", "Principal", "Wolmer's Boys' School", "National Heroes' Circle", "Kingston 4"],
    salutation: "Dear Principal Pennycooke,",
    verified: true,
    confirmBeforePrint: false,
    emailNote: SAME_AS_JC,
    code: "WBS",
    why: "In October 2026 a Wolmer’s Boys’ student was on Team Jamaica at the FIRST Global Robotics Olympics in Incheon, and Wolmer’s 300 is adding expanded ICT labs and a multimedia STEAM centre.",
  },
  {
    key: "wolmers-girls",
    briefSlug: "wolmers",
    displayName: "Wolmer’s High School for Girls",
    short: "Wolmer’s Girls’",
    address: ["The Principal", "Wolmer's High School for Girls", "2A Marescaux Road", "Kingston 5"],
    salutation: "Dear Principal,",
    verified: false,
    confirmBeforePrint: true,
    confirmNote: "The principal's name is not verified, so the letter is addressed to The Principal.",
    emailNote: "We wrote to Wolmer’s by email on 16 October 2026 and would be glad to hear from you.",
    code: "WGS",
    why: "The Wolmer’s Trust is positioning its schools for the next 300 years: Wolmer’s 300 is adding expanded ICT labs, a professional studio and a multimedia STEAM centre.",
    /* The brief's examples are from the Boys' School. Only Wolmer's 300, the solar system and the motto apply here. */
    fit: {
      headline: "Wolmer’s is building for its next 300 years.",
      lead: "The Wolmer’s Trust is positioning its schools for the next 300 years, with new space for technology, media and STEAM.",
      points: [
        { k: "Wolmer’s 300", v: "Expanded ICT labs, a professional studio and a multimedia STEAM centre, being built now." },
        { k: "Solar powered", v: "954 solar panels, installed in 2024, power all three Wolmer’s campuses." },
        { k: "Age Quod Agis", v: "Whatever you do, do it to the best of your ability." },
      ],
      quote: {
        text: "Given the local trends in skills development driven by rapid technology changes, the rise of artificial intelligence as a daily necessity, an investment in our economy, Wolmer’s must now position itself for the next 300 years.",
        by: "Wolmer’s Trust, Wolmer’s 300",
        source: 3,
        cite: "wolmers.org",
      },
      bridge:
        "Hack 876 adds students from other schools, a fixed deadline, industry mentors and judges who ask teams to explain their decisions. It is a single Saturday that asks nothing of the school timetable, and students bring their own devices.",
    },
    connections: false,
  },
];

/* -------------------------------------------------------------------------- */
/*  Shared print facts                                                        */
/* -------------------------------------------------------------------------- */

/**
 * Hack 876 is free for schools and students. The organizers have confirmed this
 * for the principal packs. The cost FAQ in schoolHub.ts still lists a
 * participation fee as undecided; update it there when the website catches up.
 */
export const COST_STATEMENT = "Hack 876 is free. There is no fee for the school or for students.";

/** Signatures, in the order they print. Both are organizers in event.ts. */
export const signatories = [
  { name: "Stefen Ewers", title: "Co-organizer, Hack 876" },
  { name: "Nadani Dixon", title: "Co-organizer, Hack 876" },
];

const EMAIL = event.contactEmail ?? "";
const SITE = event.siteUrl;
const siteLabel = (url: string) => url.replace(/^https?:\/\//, "");
const DOORS = schedule[0]?.time ?? "";
const WRAP = schedule[schedule.length - 1]?.time ?? "";
const TEAM = `${eligibility.teamSize.min} to ${eligibility.teamSize.max}`;
export const BOOKLET_PAGES = 8;

/** "Saturday 20 February 2027 (tentative)", in en-GB order, with the tentative note while it applies. */
export const eventDate = (() => {
  if (!event.date) return event.dateLabel;
  const d = new Date(`${event.date}T12:00:00Z`);
  const o = { timeZone: "UTC" } as const;
  const weekday = d.toLocaleDateString("en-GB", { ...o, weekday: "long" });
  const rest = d.toLocaleDateString("en-GB", { ...o, day: "numeric", month: "long", year: "numeric" });
  return `${weekday} ${rest}${eventWhen.note}`;
})();

/** The letter date: PRINT_DATE (YYYY-MM-DD, or text used as is) if set, otherwise today in Kingston. */
export function letterDate(printDate = process.env.PRINT_DATE) {
  const fmt = (d: Date, timeZone: string) => d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone });
  if (printDate && /^\d{4}-\d{2}-\d{2}$/.test(printDate)) return fmt(new Date(`${printDate}T12:00:00Z`), "UTC");
  if (printDate) return printDate;
  return fmt(new Date(), "America/Jamaica");
}

export const getPrincipalPack = (key: string) => principalPacks.find((p) => p.key === key);

/** The brief, name and short name a pack prints with. */
export function packSchool(pack: PrincipalPack) {
  const brief = getSchoolBrief(pack.briefSlug);
  if (!brief) throw new Error(`No school brief "${pack.briefSlug}" for pack "${pack.key}"`);
  return { brief, name: pack.displayName ?? brief.school, short: pack.short ?? brief.short };
}

/** "JC’s", but "St George’s" and "Wolmer’s Girls’" stay as they are. */
const possessive = (s: string) => (/’s?$|'s?$/.test(s) ? s : `${s}’s`);
const article = (s: string) => (/^[AEIOU]/i.test(s) ? "an" : "a");
/** Employer as listed, without product names in brackets. */
const employer = (p: Person) => (p.organization ?? "").replace(/ \(.*\)$/, "");

/** Confirmed people who attended the school, as sentences. Never a student. */
export function connectionLines(pack: PrincipalPack) {
  if (pack.connections === false) return [];
  const { brief, short } = packSchool(pack);
  return people
    .filter((p) => p.confirmed && !p.pending && p.schools?.includes(brief.school))
    .map((p) => {
      const past = `${article(short)} ${short} past student`;
      if (p.role === "judge") return `${p.name} of ${employer(p)}, ${past}, is one of our judges.`;
      if (p.role === "organizer") return `${p.name} of ${employer(p)}, ${past}, is one of the two organizers of Hack 876.`;
      if (p.role === "partner") return `${p.name}, ${past} who works at ${employer(p)}, is helping Hack 876 as a community partner.`;
      return "";
    })
    .filter(Boolean);
}

/** The sentence about the confirmed schools. The only place "confirmed" may describe a school. */
export const confirmedLine = (short: string) =>
  `${confirmedSchools.join(" and ")} have confirmed their participation, and we would be honoured to welcome ${short} students alongside them.`;

/** The call to action used everywhere. */
export const callToAction = (short: string) => `To confirm ${possessive(short)} participation, please email ${EMAIL}, or ask a member of staff to do so.`;

/* -------------------------------------------------------------------------- */
/*  Letter                                                                    */
/* -------------------------------------------------------------------------- */

export function letterCopy(pack: PrincipalPack, printDate?: string) {
  const { brief, name, short } = packSchool(pack);
  return {
    ref: `Our ref: H876/PRN/${pack.code}/2026-01`,
    date: letterDate(printDate),
    address: pack.address,
    salutation: pack.salutation,
    subject: `Re: Invitation for ${name} to take part in Hack 876, ${eventDate}`,
    paragraphs: [
      `We write to invite students of ${name} to take part in Hack 876, a free, one-day hackathon on ${eventDate} at the ${venue.name}, ${venue.area}. Students in ${formsFor(brief)} from schools across Kingston will work in teams of ${TEAM} to build a working prototype of an idea, then present it to judges from industry.`,
      [pack.why, ...connectionLines(pack), pack.extraLine ?? ""].filter(Boolean).join(" "),
      `Taking part asks very little of ${short}. There is no cost to the school or to students, nothing for the school to host, organize or transport, and no class time, because the event is on a Saturday. We ask only for a member of staff to act as our contact, and for teachers to share the opportunity with eligible students and recommend those who would enjoy it. The organizers handle consent forms and the event itself, and families receive safety details before the day. Whether students take part remains a decision for the school and for families.`,
      `${pack.emailNote} ${callToAction(short)} ${confirmedLine(short)}`,
    ],
    close: pack.verified ? "Yours sincerely," : "Yours faithfully,",
    signatories,
    enc: `Enc.: Hack 876 information booklet for ${name}`,
    cc: pack.cc ? `cc: ${pack.cc}` : null,
  };
}

/* -------------------------------------------------------------------------- */
/*  Pack cover                                                                */
/* -------------------------------------------------------------------------- */

/** Page 1 of the combined pack only. The letter and booklet files have no cover of their own. */
export function coverCopy(pack: PrincipalPack) {
  const { name } = packSchool(pack);
  return {
    kicker: "By hand · For the attention of",
    /* An unverified recipient is never named. */
    recipient: pack.verified ? [pack.address[0], pack.address[1]] : ["The Principal"],
    school: name,
    title: "An invitation to take part in Hack 876",
    tagline: event.tagline,
    facts: [
      { k: "Date", v: eventDate },
      { k: "Hours", v: `${DOORS} to ${WRAP}` },
      { k: "Venue", v: `${venue.name}, ${venue.area}` },
      { k: "Cost", v: "Free for schools and students" },
    ],
    contents: [
      { k: "Letter to the Principal", v: "1 page" },
      { k: `Information booklet for ${name}`, v: `${BOOKLET_PAGES} pages` },
    ],
    ref: `Our ref: H876/PRN/${pack.code}/2026-01`,
    contact: `${siteLabel(SITE).replace(/^www\./, "")} · ${EMAIL}`,
  };
}

/* -------------------------------------------------------------------------- */
/*  Booklet                                                                   */
/* -------------------------------------------------------------------------- */

const firstPara = (s: string) => s.split("\n\n")[0];
/* Splits on a full stop followed by a space, so "info@hack876.com" stays whole. */
const sentences = (s: string) => s.split(/(?<=\.)\s+/);
const firstSentence = (s: string) => sentences(s)[0];
const lastSentence = (s: string) => sentences(s).at(-1) ?? s;

export function bookletCopy(pack: PrincipalPack) {
  const { brief, name, short } = packSchool(pack);
  const forms = formsFor(brief);
  const faq = Object.fromEntries(hubFaqs(brief).map((f) => [f.id, f]));
  const fit = pack.fit ?? brief.fit;
  const quote = fit.quote ? { ...fit.quote, by: pack.quoteBy ?? fit.quote.by, cite: fit.quote.cite } : null;
  const recipient = pack.verified ? `${pack.address[0]}, ${pack.address[1]}` : "the Principal";
  const schoolUrl = `${SITE}/schools/${pack.briefSlug}`;

  /* This school's people first, then the order in event.ts. */
  const attended = (p: Person) => pack.connections !== false && (p.schools?.includes(brief.school) ?? false);
  const shown = (p: Person) => p.confirmed && !p.pending;
  const judges = people.filter((p) => p.role === "judge" && shown(p));
  const organizers = people.filter((p) => p.role === "organizer" && shown(p));
  const first = (list: Person[]) => [...list.filter(attended), ...list.filter((p) => !attended(p))];

  const phases = (Object.keys(phaseLabels) as SchedulePhase[]).map((phase) => ({
    label: phaseLabels[phase],
    rows: schedule.filter((s) => s.phase === phase).map((s) => ({ time: s.time, title: s.title })),
  }));

  const steps = brief.nextSteps?.slice(1) ?? [
    { k: "Then", v: "Teachers share the opportunity, and students apply." },
    { k: "Before the event", v: "Accepted students and their families receive consent forms." },
    { k: "Event day", v: "Hack 876." },
  ];

  return {
    name,
    short,
    footer: (n: number) => `Hack 876 × ${name} · page ${n} of ${BOOKLET_PAGES} · ${siteLabel(SITE).replace(/^www\./, "")}`,
    qr: {
      site: { url: SITE, label: siteLabel(SITE) },
      /* Named for the page the code opens, which is the brief's school page. */
      school: { url: schoolUrl, label: siteLabel(schoolUrl), caption: `The ${brief.short} page` },
    },
    cover: {
      title: `An invitation for ${name}`,
      tagline: event.tagline,
      facts: [
        { k: "Date", v: eventDate },
        { k: "Hours", v: `${DOORS} to ${WRAP}` },
        { k: "Venue", v: `${venue.name}, ${venue.area}` },
        { k: "Cost", v: "Free for schools and students" },
      ],
      about: firstPara(faq["what-is"].a),
      preparedFor: `Prepared for ${recipient}`,
    },
    why: {
      kicker: `Why ${short}`,
      fit,
      quote,
      practise: [
        "Defining a real problem",
        "Designing, building and testing a solution",
        "Teamwork with students from other schools",
        "Explaining their work to judges",
      ],
      relevance:
        "These are among the skills assessed in CSEC Information Technology and in CAPE Computer Science and Digital Media. Hack 876 is independent of CXC and the Ministry, and taking part does not count toward any SBA.",
    },
    day: {
      intro: brief.eventIntro ?? faq.hackathon.a,
      /* hubFacts formats the date for the website; the packs use en-GB. */
      facts: hubFacts(brief).map((f) => (f.k === "Date" ? { ...f, v: eventDate } : f)),
      phases,
      oneDay: `One day, from ${DOORS} to ${WRAP}. Not overnight.`,
      first: "Many students will be at their first hackathon, and no coding experience is needed.",
    },
    build: {
      tracks: tracks.map((t) => ({ name: t.name, line: t.line, color: t.color })),
      buildTypes: buildTypes.map((b) => b.label),
      principles,
    },
    room: {
      judges: first(judges),
      organizers: first(organizers),
      attended,
      pastTag: `${short} past student`,
      note: "Organisations are each person’s employer, listed for context. They are not event sponsors unless stated.",
      confirmedSchools: `Confirmed schools: ${confirmedSchools.join(", ")}`,
      sponsors: sponsors.filter((s) => s.confirmed && !s.pending),
    },
    judging: {
      lenses: judging,
      complexity: "Complexity alone does not win Hack 876.",
      prizes: prizes.map((p) => ({ name: p.name, reward: p.reward })),
      prizesNote,
      bonus: "Prizes are a bonus; the experience of building is the point.",
      noPromises: firstPara(faq.internships.a),
    },
    safety: {
      provided: [
        { k: "Supervision", v: faq.supervision.a },
        { k: "Consent", v: `${firstSentence(faq.consent.a)} This applies whatever the student’s age.` },
        { k: "One day", v: faq.overnight.a },
        { k: "Food", v: faq.food.a.replace(/^Yes\. /, "") },
        { k: "Access and medical needs", v: firstSentence(faq.access.a) },
        { k: "Emergencies", v: firstSentence(faq.emergency.a) },
        { k: "AI tools", v: `Students use only organizer-approved, age-appropriate tools. ${lastSentence(faq["consent-override"].a)}` },
        { k: "Conduct", v: `The Code of Conduct and Event Rules are at ${siteLabel(SITE)}/code-of-conduct and ${siteLabel(SITE)}/rules.` },
      ],
      notProvided: [
        { k: "Transport", v: faq.transport.a },
        { k: "Devices", v: firstPara(faq.laptop.a) },
      ],
      cost: COST_STATEMENT,
      /* Everything the repo still marks pending or to-do. Never filled in here. */
      pending: [
        { k: "Supervision", v: firstSentence(faq.supervision.todo ?? "") },
        { k: "Consent form", v: faq.consent.todo },
        { k: "On-site contact", v: faq.emergency.todo },
        { k: "Arrival and collection", v: faq.transport.todo },
        { k: "AI tools", v: faq["ai-age"].todo },
        { k: "Food", v: faq.food.todo },
      ].filter((i): i is { k: string; v: string } => !!i.v),
    },
    next: {
      asks: [
        `Confirm ${possessive(short)} participation by email to ${EMAIL}.`,
        "Name a member of staff as our contact.",
        `Share the opportunity with eligible students in ${forms}, and recommend those who would enjoy it.`,
        "Advise us on school permissions and on communication with parents.",
      ],
      notAsked: `${short} is not asked to pay, host, organize, transport or supervise anything.`,
      steps: [
        { k: "First", v: `An email to ${EMAIL} confirming ${possessive(short)} participation and naming a staff contact.` },
        ...steps.map((s) => ({
          k: s.k.replace(brief.short, short),
          v: s.v === "Hack 876." ? `Hack 876, ${eventDate}.` : s.v.replace(brief.short, short),
        })),
      ],
      cta: `Email ${EMAIL} to confirm ${possessive(short)} participation`,
      ctaNote: pack.emailNote,
      planning: `For planning, we have roughly ${brief.planningRange.min} to ${brief.planningRange.max} ${short} students in mind: an estimate, not a quota or a promise.`,
      organizers: `${signatories.map((s) => s.name).join(" and ")}, co-organizers · ${EMAIL}`,
      booking: event.bookingUrl ? `Prefer to talk first? Book 15 minutes: ${siteLabel(event.bookingUrl)}` : null,
      closing: brief.closing,
    },
  };
}
