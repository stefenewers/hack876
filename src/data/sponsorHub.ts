import { copilotChallenge, eligibility, event, eventWhen, foodNote, judging, mlh, photoConsent, prizes, prizesNote, registration, schedule, schools, tracks, venue } from "./event";
import { budgetEstimate, budgetTotal, confirmedJudges, contact, jmd, organisers, reporting, reportingNote, safeguards, schoolCountsText, sponsorList } from "./partnership";
import type { HubFaq } from "./schoolHub";
import { band, directionNote, inKind } from "./sponsorship";

/*
 * The sponsor hub: the web-only part of a partnership proposal, below the
 * printed pages. Everything a sponsor might want to know about Hack876, built
 * from event.ts, partnership.ts and sponsorship.ts so it cannot drift from the
 * site or the deck.
 *
 * Rules (as for the school hubs):
 * - `a` holds what is known. `todo` holds what is not decided yet.
 * - Payment, paperwork and logistics depend on each sponsor's preference, so
 *   they are always "to be confirmed with you", never assumed.
 * - No student data, no promises of reach, and no say over judging.
 */

export const sponsorHubCategories = [
  "The event",
  "Students and schools",
  "The day",
  "Your contribution",
  "Recognition",
  "Payment and paperwork",
  "Safeguarding",
  "After the event",
] as const;

export type SponsorFaq = Omit<HubFaq, "category"> & { category: (typeof sponsorHubCategories)[number] };

const TEAM = `${eligibility.teamSize.min} to ${eligibility.teamSize.max}`;
const DAY = `${schedule[0].time} to ${schedule[schedule.length - 1].time}`;
const PREF = "This is agreed with each sponsor, to suit your preference.";

export function sponsorFaqs(org: string): SponsorFaq[] {
  const special = prizes.filter((p) => !p.place).map((p) => p.name);
  return [
    /* ------------------------------------------------------------- The event */
    {
      id: "what",
      q: "What is Hack876?",
      a: `A one-day build competition for Jamaican secondary-school students. In teams of ${TEAM}, students choose a real problem, build a working prototype and present it to a panel of judges. It is ${mlh.hackDayBadge.replace(/^An /, "an ")}, and it is free for students.`,
      category: "The event",
      audience: ["sponsors"],
      keywords: "about hackathon explain overview",
    },
    {
      id: "when-where",
      q: "When and where is it?",
      a: `${eventWhen.long}, ${DAY} (${event.timeZone}), at the ${venue.name}, ${venue.address}. The date and venue are confirmed.`,
      status: "confirmed",
      category: "The event",
      audience: ["sponsors"],
      keywords: "date venue location time hotel",
    },
    {
      id: "who-runs",
      q: "Who runs Hack876?",
      a: `${organisers.map((p) => (p.organization ? `${p.name} (${p.organization})` : p.name)).join(" and ")} lead the event and are your contacts. Registration and project submission run on MLH (Major League Hacking), which lists Hack876 as an official Hack Day.`,
      category: "The event",
      audience: ["sponsors"],
      keywords: "organisers organizers team behind mlh legitimate",
    },
    {
      id: "first-year",
      q: "Is this the first Hack876?",
      a: "Yes. This is the inaugural event. Sponsors this year are among the organisations that make the first one possible.",
      category: "The event",
      audience: ["sponsors"],
      keywords: "inaugural first new track record history",
    },
    {
      id: "budget",
      q: "What does the event cost to run?",
      a: `The organisers estimate about ${jmd(budgetTotal)}. The largest lines are ${budgetEstimate
        .filter((l) => l.amount)
        .slice(0, 3)
        .map((l) => `${l.k.toLowerCase()} (${jmd(l.amount)})`)
        .join(", ")}. The venue is hosted in kind.`,
      todo: "The final budget, which will be shared before any commitment.",
      category: "The event",
      audience: ["sponsors"],
      keywords: "budget cost total money spend",
      link: { href: "#hub-budget", label: "See the budget" },
    },
    {
      id: "other-sponsors",
      q: "Who else is supporting Hack876?",
      a: `Confirmed sponsors: ${sponsorList}. Major League Hacking (MLH) and GitHub are event partners. They support the programme and are not funders.`,
      category: "The event",
      audience: ["sponsors"],
      keywords: "sponsors partners companies brands supporting already",
    },

    /* --------------------------------------------------- Students and schools */
    {
      id: "students",
      q: "Who are the students?",
      a: `About ${eligibility.maxHackers} secondary-school students in ${eligibility.forms}, from schools in Kingston. Most are under 18. Each student registers individually on MLH.`,
      category: "Students and schools",
      audience: ["sponsors"],
      keywords: "students age audience how many participants forms",
    },
    {
      id: "schools",
      q: "Which schools are involved?",
      a: `Schools: ${schoolCountsText}, from a network of ${schools.length} in Kingston. A school's status is shown exactly as it stands; we never present a school in talks as confirmed.`,
      category: "Students and schools",
      audience: ["sponsors"],
      keywords: "schools campion hillel wolmers confirmed network",
      link: { href: "#hub-glance", label: "See every school's status" },
    },
    {
      id: "cost-students",
      q: "Do students pay anything?",
      a: "No. Hack876 is free for students. Food is provided on the day. Students bring their own laptops.",
      status: "confirmed",
      category: "Students and schools",
      audience: ["sponsors"],
      keywords: "free fee cost students pay",
    },

    /* ---------------------------------------------------------------- The day */
    {
      id: "build",
      q: "What do students build?",
      a: `Working prototypes: websites, apps, AI tools, games, hardware and more. Every team builds for one of ${tracks.length} tracks: ${tracks.map((t) => t.name).join(", ")}. Teams can also enter the optional partner challenge, ${copilotChallenge.name}.`,
      category: "The day",
      audience: ["sponsors"],
      keywords: "projects tracks build make resilience",
      link: { href: "#hub-day", label: "See the tracks and schedule" },
    },
    {
      id: "judging",
      q: "How are winners chosen? Can sponsors influence judging?",
      a: `A panel of ${confirmedJudges.length} confirmed judges scores each team on ${judging.map((j) => j.name.toLowerCase()).join(", ")}. Sponsors have no influence over judging, and no contribution level carries naming rights.`,
      status: "confirmed",
      category: "The day",
      audience: ["sponsors"],
      keywords: "judges judging influence winners criteria fair",
    },
    {
      id: "prizes",
      q: "What are the prizes?",
      a: `${prizes
        .filter((p) => p.place)
        .map((p) => `${p.name}: ${p.reward ?? "to be announced"}`)
        .join(". ")}. Special awards: ${special.join(", ")}.`,
      todo: prizesNote ? "Prize items are provisional and may change." : undefined,
      category: "The day",
      audience: ["sponsors"],
      keywords: "prizes awards win ipad",
    },
    {
      id: "attend",
      q: "Can our team attend on the day?",
      a: "Hack876 has its own organisers, judges, mentors and crew, so sponsors are not asked to provide people. Whether sponsor representatives can attend the finals and awards is agreed with each sponsor.",
      todo: "Attendance for sponsor representatives, and at which part of the day.",
      category: "The day",
      audience: ["sponsors"],
      keywords: "attend visit staff employees come watch awards finals volunteer",
    },
    {
      id: "food",
      q: "Is food provided?",
      a: foodNote,
      category: "The day",
      audience: ["sponsors"],
      keywords: "food lunch meals snacks water",
    },

    /* ------------------------------------------------------ Your contribution */
    {
      id: "amount",
      q: `What are you asking ${org} for?`,
      a: `A ${band("platinum").name} contribution (${band("platinum").range}) toward the inaugural Hack876, or whatever amount your budget allows. Every level is welcome, as is support in kind.`,
      category: "Your contribution",
      audience: ["sponsors"],
      keywords: "ask amount how much contribution platinum level",
      link: { href: "#hub-recognition", label: "See every level" },
    },
    {
      id: "direct",
      q: "Can we choose what our contribution supports?",
      a: `${directionNote} For example: prizes, food, shirts and materials, production or equipment.`,
      category: "Your contribution",
      audience: ["sponsors"],
      keywords: "direct choose restrict earmark use spend line item",
    },
    {
      id: "inkind",
      q: "Can we contribute in kind instead of cash?",
      a: `Yes. ${inKind.text} Examples: ${inKind.examples.join(", ").toLowerCase()}. ${inKind.recognition}`,
      category: "Your contribution",
      audience: ["sponsors"],
      keywords: "in kind goods products services donate items",
    },
    {
      id: "deadline",
      q: "When do you need a decision?",
      a: `As early as you can. Some recognition, such as a logo on event shirts, depends on production deadlines before ${eventWhen.long}.`,
      todo: PREF.replace("This is", "The timing is"),
      category: "Your contribution",
      audience: ["sponsors"],
      keywords: "deadline timeline when decide commit date",
    },

    /* ------------------------------------------------------------ Recognition */
    {
      id: "recognition",
      q: "What does our company receive?",
      a: `It depends on the level. ${band("platinum").name} includes everything in Gold, Silver and Bronze, with the most prominent placement on the website and event signage. Every level is named in the post-event recap.`,
      category: "Recognition",
      audience: ["sponsors"],
      keywords: "benefits recognition logo receive get visibility",
      link: { href: "#hub-recognition", label: "See every level" },
    },
    {
      id: "logo",
      q: "What logo files do you need?",
      a: "A vector logo (SVG, EPS or PDF) is best, or a high-resolution PNG with a transparent background, plus any brand guidelines. We use your logo unaltered.",
      todo: "Artwork deadlines for signage and shirts.",
      category: "Recognition",
      audience: ["sponsors"],
      keywords: "logo artwork files brand guidelines vector png",
    },
    {
      id: "merch",
      q: "Can we hand out branded items or run activities?",
      a: "There is no selling, marketing to students or sign-ups on the day. Whether a sponsor can include branded items, such as in a participant bag, is agreed with each sponsor.",
      todo: PREF,
      category: "Recognition",
      audience: ["sponsors"],
      keywords: "merchandise merch swag giveaway booth stand marketing samples",
    },
    {
      id: "social",
      q: "Can we announce our support publicly?",
      a: "Yes, once your support is confirmed. Every level includes recognition on the Hack876 website.",
      todo: "Wording and timing of any announcement, and whether Hack876 also shares it on social media, agreed together.",
      category: "Recognition",
      audience: ["sponsors"],
      keywords: "announce press release social media instagram publicity",
    },

    /* -------------------------------------------------- Payment and paperwork */
    {
      id: "pay",
      q: "How do we pay?",
      a: "Payment method and timing are arranged with each sponsor once a contribution is agreed.",
      todo: PREF,
      status: "pending",
      category: "Payment and paperwork",
      audience: ["sponsors"],
      keywords: "pay payment bank transfer cheque how method",
    },
    {
      id: "invoice",
      q: "Can you issue an invoice or receipt?",
      a: "We will provide the paperwork your finance team needs.",
      todo: `Which documents, and from which entity. ${PREF}`,
      status: "pending",
      category: "Payment and paperwork",
      audience: ["sponsors"],
      keywords: "invoice receipt paperwork finance accounts documentation",
    },
    {
      id: "recipient",
      q: "Who receives the funds?",
      a: "This is confirmed with each sponsor before any commitment.",
      todo: "The receiving entity and account.",
      status: "pending",
      category: "Payment and paperwork",
      audience: ["sponsors"],
      keywords: "entity recipient account bank who receives registered",
    },
    {
      id: "tax",
      q: "Is a contribution tax-deductible?",
      a: "We cannot confirm this yet. Please check with your own advisers.",
      todo: "Tax treatment, which depends on the receiving entity.",
      status: "pending",
      category: "Payment and paperwork",
      audience: ["sponsors"],
      keywords: "tax deductible charity donation write off",
    },
    {
      id: "agreement",
      q: "Is there a sponsorship agreement?",
      a: "Benefits are proposed and agreed when a sponsorship is confirmed. We are happy to put them in writing.",
      todo: PREF,
      category: "Payment and paperwork",
      audience: ["sponsors"],
      keywords: "agreement contract terms letter sign",
    },

    /* ------------------------------------------------------------ Safeguarding */
    {
      id: "data",
      q: "Will we receive student contact details?",
      a: `No. ${safeguards[0]}`,
      status: "confirmed",
      category: "Safeguarding",
      audience: ["sponsors"],
      keywords: "data contact details email leads privacy students",
    },
    {
      id: "photos",
      q: "Can we use photos of the students?",
      a: `${photoConsent} Sponsors may use event photos only where that consent covers it.`,
      category: "Safeguarding",
      audience: ["sponsors"],
      keywords: "photos images pictures media consent minors",
    },
    {
      id: "conduct",
      q: "What rules does everyone follow?",
      a: `Everyone at Hack876 follows the MLH Code of Conduct and the Hack876 Code of Conduct. ${safeguards[2]}`,
      category: "Safeguarding",
      audience: ["sponsors"],
      keywords: "code of conduct rules safety minors safeguarding",
      link: { href: "/code-of-conduct", label: "Read the Code of Conduct" },
    },

    /* --------------------------------------------------------- After the event */
    {
      id: "recap",
      q: "What will we see afterwards?",
      a: `A written recap covering: ${reporting.map((r) => r.charAt(0).toLowerCase() + r.slice(1)).join("; ")}. ${reportingNote}`,
      todo: "When the recap is sent.",
      category: "After the event",
      audience: ["sponsors"],
      keywords: "recap report results impact afterwards measure",
    },
    {
      id: "next-year",
      q: "Is there a chance to continue next year?",
      a: "We hope Hack876 becomes annual. Any longer relationship is discussed separately and only if both sides find it valuable.",
      category: "After the event",
      audience: ["sponsors"],
      keywords: "future next year annual long term relationship renew",
    },
  ];
}

/** Quick facts at the top of the hub. */
export function sponsorGlance() {
  return [
    { k: "Date", v: eventWhen.long },
    { k: "Hours", v: `${DAY}, one day` },
    { k: "Venue", v: `${venue.name}, Kingston` },
    { k: "Students", v: `About ${eligibility.maxHackers}, in teams of ${TEAM}` },
    { k: "Forms", v: eligibility.forms },
    { k: "Cost to students", v: "Free" },
    { k: "Status", v: mlh.hackDayBadge },
    { k: "Registration", v: `On MLH: ${registration.url.replace(/^https?:\/\//, "")}` },
    { k: "Organisers", v: contact.names.join(" and ") },
    { k: "Estimated budget", v: jmd(budgetTotal) },
  ];
}
