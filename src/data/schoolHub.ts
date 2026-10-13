import { applications, buildTypes, eligibility, event, eventWhen, faqs, prizes, prizesNote, schedule, venue } from "./event";
import type { SchoolBrief } from "./schoolBriefs";

/*
 * Content for school participation hubs (`/schools/<slug>` once a school has
 * `hub` set). Everything here is generic: a hub for any school is built from
 * event.ts plus that school's entry in schoolBriefs.ts.
 *
 * Rules:
 * - Dates, venue, sizes, prizes and application state come from event.ts.
 * - Nothing unresolved is stated as decided. Use `status` instead.
 * - No promises of internships, jobs, scholarships, places or approvals.
 */

/** Used sparingly: only where a reader could otherwise assume more than is true. */
export type HubStatus = "confirmed" | "tentative" | "pending";

export const statusLabel: Record<HubStatus, string> = {
  confirmed: "Confirmed",
  tentative: "Tentative",
  pending: "Details forthcoming",
};

export type HubAudience = "students" | "parents" | "teachers";

export const hubCategories = [
  "Eligibility",
  "Getting ready",
  "Applying",
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
  /** Plain text. Blank lines split paragraphs. */
  a: string;
  category: HubCategory;
  audience: HubAudience[];
  status?: HubStatus;
  /** Anchor on the hub page, or a site path, for more detail. */
  link?: { href: string; label: string };
};

const TEAM = `${eligibility.teamSize.min} to ${eligibility.teamSize.max}`;
const DAY_START = schedule[0]?.time ?? "";
const DAY_END = schedule[schedule.length - 1]?.time ?? "";
const HOW = eligibility.howToGetIn.replace(/ here\.$/, ".");
const publicFaq = (q: string) => faqs.find((f) => f.q === q)?.a ?? "";
const appsOpen = applications.status === "open";

/** Facts shown at the top of every hub. */
export function hubFacts() {
  return [
    { k: "Date", v: eventWhen.long, status: (eventWhen.tentative ? "tentative" : "confirmed") as HubStatus },
    { k: "Venue", v: `${venue.name}, ${venue.area.split(",")[0]}`, status: (venue.confirmed ? "confirmed" : "tentative") as HubStatus },
    { k: "Format", v: `One day, ${DAY_START} to ${DAY_END}. Not overnight.` },
    { k: "Who", v: `Students in ${eligibility.forms}` },
    { k: "Size", v: `About ${eligibility.maxHackers} students across all schools` },
    { k: "Teams", v: `${TEAM} students per team` },
  ];
}

export const applicationState = {
  open: appsOpen,
  label: appsOpen ? "Applications are open" : applications.status === "closed" ? "Applications are closed" : "Applications open soon",
};

/** What to bring. `need` is required, `nice` is recommended, `pending` is not yet decided. */
export const bringList: { item: string; kind: "need" | "nice" | "pending" }[] = [
  { item: "A laptop and charger, if you have one", kind: "need" },
  { item: "Your school ID", kind: "need" },
  { item: "A signed parent or guardian consent form, once it is issued", kind: "need" },
  { item: "A water bottle", kind: "nice" },
  { item: "Headphones", kind: "nice" },
  { item: "A notebook and pen for sketching ideas", kind: "nice" },
  { item: "What happens if you do not have a laptop", kind: "pending" },
  { item: "The full packing list, sent to accepted students", kind: "pending" },
];

/** What the application form actually asks. Mirrors src/components/forms/ApplyForm.tsx. */
export const applicationAsks = [
  "Your name, email, phone, school, form and age",
  "Four short written answers about what you enjoy making and why you want to come",
  "The role you see yourself playing on a team",
  "Whether you already have a team, and whether you are open to teammates from another school",
  "Optional links: GitHub, a portfolio, or a project you are proud of",
];

/** Decisions the organizers have not made yet. Shown openly on the hub. */
export const openItems = [
  "The exact parent and guardian consent process",
  "Which AI tools are permitted, and their age limits",
  "Whether optional training or workshops will be offered beforehand",
  "Application closing date, and when decisions go out",
  "Drop-off, pick-up and any transport arrangements",
  "Detailed supervision and safeguarding procedures",
  "Meal specifics and how dietary needs are handled",
  "Any participation cost, and support for students without a laptop",
  "Longer-term opportunities after the event",
];

export function hubFaqs(brief: SchoolBrief): HubFaq[] {
  const { short } = brief;
  const range = `${brief.planningRange.min} to ${brief.planningRange.max}`;
  const special = prizes.filter((p) => !p.place).map((p) => p.name);

  return [
    /* ---------------------------------------------------------------- Eligibility */
    {
      id: "who-can-apply",
      q: "Who can take part?",
      a: `Students in ${eligibility.forms}. ${HOW}\n\nThere are about ${eligibility.maxHackers} places across all schools.`,
      category: "Eligibility",
      audience: ["students", "parents", "teachers"],
      status: "confirmed",
      link: { href: "#apply", label: "How applications work" },
    },
    {
      id: "under-18",
      q: "Can I apply if I am under 18?",
      a: "Yes. Students in the eligible forms can apply whatever their age.\n\nSome third-party AI tools have their own minimum ages. That affects which tools you can use, not whether you can take part.",
      category: "Eligibility",
      audience: ["students", "parents"],
      link: { href: "#ai-tools", label: "AI tools and age limits" },
    },
    {
      id: "guaranteed-place",
      q: `Is a place guaranteed for ${short} students?`,
      a: `No. A school recommendation does not guarantee admission. Every student applies and is selected individually.\n\nFor planning, we have a range of roughly ${range} ${short} students in mind. That is provisional, not a quota or a promise.`,
      category: "Eligibility",
      audience: ["students", "parents", "teachers"],
      status: "tentative",
    },
    {
      id: "school-approval",
      q: `Is ${short} officially taking part?`,
      a: brief.hub?.status ?? "",
      category: "Eligibility",
      audience: ["parents", "teachers"],
      status: "tentative",
      link: { href: "#teachers", label: "Faculty liaison and ambassadors" },
    },

    /* -------------------------------------------------------------- Getting ready */
    {
      id: "coding",
      q: "Do I need to know Python, C, JavaScript or another programming language?",
      a: "No. Prior programming experience is not required.\n\nTeams need more than code. You can contribute through design, researching the problem, product thinking, prototyping, storytelling, presenting, technical work and teamwork.",
      category: "Getting ready",
      audience: ["students", "parents", "teachers"],
      link: { href: "#students", label: "Student preparation" },
    },
    {
      id: "what-build",
      q: "What do students actually build?",
      a: `A working prototype or a solution you can demonstrate. For example: ${buildTypes.map((b) => (/^[A-Z]{2}/.test(b.label) ? b.label : b.label.toLowerCase())).join(", ")}.\n\nThis is not a day of lectures. Expect to build something and present it.`,
      category: "Getting ready",
      audience: ["students", "parents", "teachers"],
    },
    {
      id: "training",
      q: "Is there training before the competition?",
      a: "Nothing has been arranged yet. If preparatory resources or workshops are planned, they will be announced here once confirmed.",
      category: "Getting ready",
      audience: ["students", "teachers"],
      status: "pending",
    },
    {
      id: "team",
      q: "Do I need a team before applying?",
      a: `No. Apply on your own or with friends. Teams are ${TEAM} students, and if you do not have one we will help you find one.\n\nTeams can mix schools. This is not ${short} against everyone else. Final team-formation rules are still being settled.`,
      category: "Getting ready",
      audience: ["students", "teachers"],
      status: "tentative",
    },
    {
      id: "bring",
      q: "What should I bring?",
      a: `${publicFaq("What should I bring?")}\n\nIf you do not have a laptop, tell us. How we support that has not been decided yet.`,
      category: "Getting ready",
      audience: ["students", "parents"],
      status: "pending",
      link: { href: "#students", label: "The full checklist" },
    },
    {
      id: "start-early",
      q: "Can I start my project before the event?",
      a: publicFaq("Can I start my project before the event?"),
      category: "Getting ready",
      audience: ["students"],
      status: "pending",
    },

    /* ------------------------------------------------------------------- Applying */
    {
      id: "how-apply",
      q: "How do I apply?",
      a: `Your school introduces or recommends you, then you apply yourself on the Hack 876 website. ${applicationState.label}.`,
      category: "Applying",
      audience: ["students", "parents", "teachers"],
      link: { href: "/apply", label: "Go to the application" },
    },
    {
      id: "application-asks",
      q: "What does the application ask for?",
      a: `${applicationAsks.join(". ")}.\n\nThere are no trick questions and no test. We want to know what you like making.`,
      category: "Applying",
      audience: ["students", "parents"],
    },
    {
      id: "selection",
      q: "How are participants selected?",
      a: "The Hack 876 organizing team reviews every application. We are looking for curiosity and a willingness to build with other people, not a list of achievements.\n\nThe detailed selection criteria have not been published yet.",
      category: "Applying",
      audience: ["students", "parents", "teachers"],
      status: "pending",
    },
    {
      id: "deadline",
      q: "When do applications close, and when will I hear back?",
      a: applications.deadline
        ? `Applications close on ${applications.deadline}.${applications.decisionsBy ? ` Decisions go out by ${applications.decisionsBy}.` : " The decision date has not been set."}`
        : "The closing date and the decision date have not been set. Both will be posted here and sent through your school.",
      category: "Applying",
      audience: ["students", "parents", "teachers"],
      status: applications.deadline ? "confirmed" : "pending",
    },

    /* -------------------------------------------------------- AI tools & consent */
    {
      id: "ai-allowed",
      q: "Can students use AI tools?",
      a: "Yes, within the tools organizers approve for the event. Using AI is allowed, not required, and teams must be able to explain what they built.\n\nThe list of permitted tools has not been finalized.",
      category: "AI tools & consent",
      audience: ["students", "parents", "teachers"],
      status: "pending",
      link: { href: "#ai-tools", label: "AI tools, age limits and consent" },
    },
    {
      id: "ai-age",
      q: "Are all AI tools open to students under 18?",
      a: "No. Some third-party AI tools set a minimum age, and some are for adults only. Not every AI product is approved for use by minors.\n\nOrganizers are still choosing age-appropriate tools and will tell participants which ones they may use.",
      category: "AI tools & consent",
      audience: ["students", "parents", "teachers"],
      status: "pending",
    },
    {
      id: "consent-override",
      q: "Can a parent give permission for an 18+ tool?",
      a: "No. Parental consent does not override a provider's hard minimum age. If a tool is for adults only, students under 18 will not be asked or allowed to use it at Hack 876.",
      category: "AI tools & consent",
      audience: ["parents", "students"],
    },
    {
      id: "team-18",
      q: "Does a team need a member who is 18 or older?",
      a: "No such rule has been set. Teams should have suitable options without every student needing an age-restricted product.\n\nFinal consent, permitted-tool and account-access procedures will be shared before the event.",
      category: "AI tools & consent",
      audience: ["students", "parents", "teachers"],
      status: "pending",
    },
    {
      id: "consent",
      q: "What consent is needed from parents or guardians?",
      a: "A signed parent or guardian consent form will be required for every participant. The exact form and process are still being prepared and will be sent to accepted students.",
      category: "AI tools & consent",
      audience: ["parents", "students"],
      status: "pending",
    },

    /* -------------------------------------------------------------------- The day */
    {
      id: "when",
      q: "When is Hack 876?",
      a: eventWhen.tentative ? `${eventWhen.long}. The date is tentative and will be confirmed here.` : `${eventWhen.long}.`,
      category: "The day",
      audience: ["students", "parents", "teachers"],
      status: eventWhen.tentative ? "tentative" : "confirmed",
    },
    {
      id: "where",
      q: "Where is it?",
      a: `At the ${venue.name} in ${venue.area}.`,
      category: "The day",
      audience: ["students", "parents", "teachers"],
      status: venue.confirmed ? "confirmed" : "tentative",
      link: venue.mapsUrl ? { href: venue.mapsUrl, label: "View on Maps" } : undefined,
    },
    {
      id: "overnight",
      q: "Is it an overnight event?",
      a: `No. Hack 876 is a single day. Doors open at ${DAY_START} and the event wraps at ${DAY_END}. Nobody stays overnight.`,
      category: "The day",
      audience: ["parents", "students", "teachers"],
      link: { href: "/#schedule", label: "See the full schedule" },
    },
    {
      id: "schedule",
      q: "What does the day look like?",
      a: `${schedule
        .filter((s) => s.highlight)
        .map((s) => `${s.time}: ${s.title}`)
        .join(". ")}.\n\nTimes may shift a little. The final run-of-show goes to accepted students.`,
      category: "The day",
      audience: ["students", "parents", "teachers"],
      link: { href: "/#schedule", label: "See the full schedule" },
    },

    /* --------------------------------------------------------- Safety & logistics */
    {
      id: "food",
      q: "Is food provided?",
      a: "Yes, food is provided on the day. Meal specifics and how dietary needs are handled are still being finalized, and dietary requirements will be collected from accepted students.",
      category: "Safety & logistics",
      audience: ["parents", "students"],
      status: "pending",
    },
    {
      id: "supervision",
      q: "How are students supervised?",
      a: "Students are supervised by event staff and volunteers throughout the day. Staffing, ratios and safeguarding procedures will be shared with families before the event.",
      category: "Safety & logistics",
      audience: ["parents", "teachers"],
      status: "pending",
    },
    {
      id: "transport",
      q: "How do students get there and home?",
      a: "Drop-off, pick-up and any transport arrangements have not been finalized. Until they are, please do not assume transport is provided. Procedures will be shared with families ahead of time.",
      category: "Safety & logistics",
      audience: ["parents", "students", "teachers"],
      status: "pending",
    },
    {
      id: "emergency",
      q: "Who do I contact in an emergency on the day?",
      a: "An on-site contact and emergency procedures will be shared with every family before the event.",
      category: "Safety & logistics",
      audience: ["parents"],
      status: "pending",
    },
    {
      id: "access",
      q: "What if my child has access, medical or dietary needs?",
      a: `Tell us early${event.contactEmail ? ` at ${event.contactEmail}` : ""} so we can plan with the venue. We will ask accepted students about this directly as well.`,
      category: "Safety & logistics",
      audience: ["parents", "students"],
    },

    /* ---------------------------------------------------------- Costs & equipment */
    {
      id: "cost",
      q: "Does it cost anything?",
      a: "Our goal is that students do not need to buy any technology tools to build their projects.\n\nWhether there is any participation cost has not been confirmed. It will be stated here before anyone is asked to commit.",
      category: "Costs & equipment",
      audience: ["parents", "students", "teachers"],
      status: "pending",
    },
    {
      id: "laptop",
      q: "Does every student need their own laptop?",
      a: "Bring one if you have one. What is available for students without a laptop has not been decided, so tell us on your application or by email if this applies to you.",
      category: "Costs & equipment",
      audience: ["students", "parents"],
      status: "pending",
    },

    /* ----------------------------------------------------------- Judging & prizes */
    {
      id: "judging",
      q: "How does judging work?",
      a: publicFaq("How does judging work?"),
      category: "Judging & prizes",
      audience: ["students", "teachers", "parents"],
    },
    {
      id: "prizes",
      q: "What are the prizes?",
      a: `There are prizes for first, second and third place, plus special awards: ${special.join(", ")}.${prizesNote ? " The prize items are tentative and may change." : ""}\n\nPrizes are a bonus. They are not the reason to come.`,
      category: "Judging & prizes",
      audience: ["students", "parents", "teachers"],
      status: prizesNote ? "tentative" : "confirmed",
      link: { href: "/#prizes", label: "See the prizes" },
    },

    /* ------------------------------------------------------------ After the event */
    {
      id: "internships",
      q: "Can strong participants get internships or jobs?",
      a: "Hack 876 does not promise internships, jobs, scholarships, interviews or placements.\n\nWhat the day does offer is real exposure: students build alongside and present to engineers, technical professionals, mentors and judges. We hope to grow longer-term pathways with companies, universities and mentors, and will say so clearly if any are confirmed.",
      category: "After the event",
      audience: ["students", "parents", "teachers"],
      link: { href: "#beyond", label: "Beyond event day" },
    },
    {
      id: "careers",
      q: "Will students get career advice?",
      a: "Students will meet working technologists on the day and can ask them how they got there. No formal career-development programme has been arranged.",
      category: "After the event",
      audience: ["students", "parents", "teachers"],
      status: "pending",
    },

    /* --------------------------------------------------------------- For teachers */
    {
      id: "recommend",
      q: "How do teachers recommend students?",
      a: brief.hub ? brief.hub.faculty.process.join(" ") : "",
      category: "For teachers",
      audience: ["teachers"],
      link: { href: "#teachers", label: "For teachers" },
    },
    {
      id: "who-recommend",
      q: "Which students should we recommend?",
      a: brief.hub ? brief.hub.faculty.profiles.join(" ") : "",
      category: "For teachers",
      audience: ["teachers"],
    },
    {
      id: "school-effort",
      q: `What does ${short} need to do or pay?`,
      a: `Nothing financial, and nothing to organize. Hack 876 runs the event and supplies the information and materials. The school's part is sharing the opportunity and recommending students.`,
      category: "For teachers",
      audience: ["teachers", "parents"],
    },
    {
      id: "ambassadors",
      q: "What do student ambassadors do?",
      a: brief.hub ? `${brief.hub.ambassadors.summary}\n\nThe role is light: ${brief.hub.ambassadors.duties.map((d) => d.replace(/\.$/, "").toLowerCase()).join("; ")}.` : "",
      category: "For teachers",
      audience: ["teachers", "students"],
      status: "tentative",
    },
    {
      id: "materials",
      q: "Are there flyers or materials we can share?",
      a: "Yes. There is a student flyer, a parent and guardian information sheet and a faculty overview, all downloadable from this page, plus this link itself.",
      category: "For teachers",
      audience: ["teachers"],
      link: { href: "#resources", label: "Downloads" },
    },
    {
      id: "contact",
      q: "Who do I ask if my question is not here?",
      a: `${event.contactEmail ? `Email ${event.contactEmail}. ` : ""}${brief.hub?.schoolChannel ?? ""}`,
      category: "For teachers",
      audience: ["students", "parents", "teachers"],
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
      blurb: "One page for noticeboards and class groups: what it is, who can apply and how.",
      href: file("student-flyer"),
      filename: `Hack 876 x ${brief.school} - Student Flyer.pdf`,
    },
    {
      key: "parents" as const,
      title: "Parent and guardian information sheet",
      blurb: "Date, venue, hours, food, supervision, consent and costs, with what is still being finalized.",
      href: file("parent-information"),
      filename: `Hack 876 x ${brief.school} - Parent Information.pdf`,
    },
    {
      key: "faculty" as const,
      title: "Faculty participation overview",
      blurb: "How recommendations work, who tends to do well, and what the school is and is not asked to do.",
      href: file("faculty-overview"),
      filename: `Hack 876 x ${brief.school} - Faculty Overview.pdf`,
    },
  ];
}

export type SheetKey = ReturnType<typeof schoolSheets>[number]["key"];
