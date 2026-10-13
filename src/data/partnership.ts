import { confirmedSchools, eligibility, event, eventWhen, people, prizes, schedule, schools, schoolsInTalks, stats, venue, type SchoolStatus } from "./event";

/*
 * Facts every partnership deck shares, derived from event.ts so a deck can
 * never drift from the public site. Sponsorship levels live in sponsorship.ts.
 *
 * Nothing here is specific to one organisation, and nothing here is a promise
 * Hack876 has not already made. Open organiser decisions live in
 * src/data/sponsorDecks/decisions.ts and are never shown to a recipient.
 */

/** The accountable Hack876 organisers. Every deck names them as the contact. */
export const organisers = people.filter((p) => p.role === "organizer" && p.confirmed);

/** Judges who have confirmed. */
export const confirmedJudges = people.filter((p) => p.role === "judge" && p.confirmed);

export const contact = {
  names: organisers.map((p) => p.name),
  email: event.contactEmail,
  site: event.siteUrl,
};

/** How a school's status is worded in a deck. An outreach list is not confirmed participation. */
export const schoolStatusLabel: Record<SchoolStatus, string> = {
  confirmed: "Confirmed",
  talks: "In talks",
  pending: "Not yet confirmed",
};

export const schoolCounts = {
  total: schools.length,
  confirmed: confirmedSchools.length,
  talks: schoolsInTalks.length,
  pending: schools.length - confirmedSchools.length - schoolsInTalks.length,
};

const TEAMS = stats.find((s) => s.label === "teams")?.value;
const FORMS = eligibility.formOptions;

/** One sentence on what Hack876 is, for the opening page of every deck. */
export const whatItIs = `A one-day build competition in Kingston for about ${eligibility.maxHackers} secondary-school students, ${FORMS[0]} through ${FORMS[FORMS.length - 1]}, working in teams of ${eligibility.teamSize.min} to ${eligibility.teamSize.max}. Teams pick a real problem and finish the day with a working prototype and a pitch to judges.`;

/** The event at a glance. Tentative and confirmed are labelled as event.ts has them. */
export const eventFacts: { label: string; value: string }[] = [
  { label: "When", value: `${eventWhen.long}${eventWhen.note}` },
  { label: "Where", value: `${venue.name}, Kingston${venue.confirmed ? " (confirmed)" : " (to be confirmed)"}` },
  { label: "Who", value: `About ${eligibility.maxHackers} students${TEAMS ? `, roughly ${TEAMS} teams` : ""}` },
  { label: "Organisers", value: contact.names.join(" and ") },
];

/** Doors to wrap, from the published schedule. */
export const dayHours = `${schedule[0].time} to ${schedule[schedule.length - 1].time}`;

/** The special awards that exist today. Decks may not invent others. See sponsorDecks/awards.ts. */
export const specialAwardNames = prizes.filter((p) => !p.place).map((p) => p.name);

/**
 * What the written recap after the event covers. Every contribution level
 * already includes a post-event recap (see sponsorship.ts).
 */
export const reporting = [
  "How many students, teams and schools took part",
  "What the teams built, with the finalist projects described",
  "How your contribution was used",
  "Photos, only where schools and parents have consented",
];
export const reportingNote = "We will document the recognition delivered and report the results we have. Audience reach and commercial outcomes are not guaranteed. Student contact details are not shared.";

/** No approved event budget exists yet. Shown on every Gold and Platinum request until one does. See decisions.ts. */
export const budgetFollows = "A detailed event budget will follow before any formal commitment is asked for.";

/** Why a first-year event can be trusted to happen as described. */
export const deliveryFacts: { label: string; text: string }[] = [
  {
    label: "Organisers",
    text: `${organisers.map((p) => (p.organization ? `${p.name} (${p.organization})` : p.name)).join(" and ")} lead the event and are the contacts for this proposal.`,
  },
  {
    label: "Venue",
    text: venue.confirmed ? `${venue.name} in Kingston is confirmed as the venue.` : "The venue is still being confirmed.",
  },
  {
    label: "Date",
    text: eventWhen.tentative ? `${eventWhen.long} is the working date. It is tentative until confirmed with schools.` : `${eventWhen.long}.`,
  },
  {
    label: "Judges",
    text: `${confirmedJudges.length} judges have confirmed, from ${[...new Set(confirmedJudges.map((p) => (p.organization ?? "").replace(/ \(.*\)$/, "")).filter(Boolean))].join(", ")}.`,
  },
  {
    label: "The day",
    text: `One day, ${dayHours}: an opening, a build period with mentors, judging, finals and awards.`,
  },
];

/** Standard safeguards. Many participants are minors. */
export const safeguards = [
  "Sponsors do not receive student contact details, and there are no sign-ups or selling on the day.",
  "Photos and names are used only with school and parent consent.",
  "Mentors and volunteers work in open, supervised spaces.",
  "The judging panel decides every award. Sponsorship carries no influence over judging and no naming rights.",
];

/**
 * Fills shared facts into deck copy, so a deck never hardcodes the student
 * count, venue, date or times. Tokens: {students} {teams} {venue} {date}
 * {lunch} {doors} {wrap}.
 */
const tokens: Record<string, string> = {
  students: String(eligibility.maxHackers),
  teams: String(TEAMS ?? ""),
  venue: venue.name,
  date: `${eventWhen.long}`,
  lunch: schedule.find((s) => s.title === "Lunch")?.time ?? "midday",
  doors: schedule[0].time,
  wrap: schedule[schedule.length - 1].time,
};
export const fill = (text: string) => text.replace(/\{(\w+)\}/g, (m, k: string) => tokens[k] ?? m);
