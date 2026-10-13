import { applications, buildTypes, eligibility, event, eventWhen, judging, people, prizes, prizesNote, schedule, venue } from "./event";
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
 * - Dates, venue, sizes, prizes and application state come from event.ts.
 * - `a` holds what is known. `todo` holds what is still to be confirmed.
 *   Never fold an open question into `a` as if it were decided.
 * - No promises of internships, jobs, scholarships, places or approvals.
 */

/** Only for facts that are firmly one or the other. Open details go in `todo`. */
export type HubStatus = "confirmed" | "tentative";

export const statusLabel: Record<HubStatus, string> = { confirmed: "Confirmed", tentative: "Tentative" };

/** The one label used for anything not yet decided. */
export const TODO_LABEL = "Still to be confirmed";

export type HubAudience = "students" | "parents" | "teachers";

export const hubCategories = [
  "The basics",
  "Who can take part",
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
const appsOpen = applications.status === "open";

/** A prototype, explained once and reused. */
export const PROTOTYPE =
  "A prototype is an early version of an idea that you can show or demonstrate. It does not have to be finished or ready to sell.";

export const PROTOTYPE_EXAMPLES = ["A revision tool for a CSEC subject", "A planner for school events", "A simple game", "An app for a problem in your community"];

/** Organizer names from event data. */
export const organizerNames = people.filter((p) => p.role === "organizer" && p.confirmed).map((p) => p.name);
const ORGANIZERS = organizerNames.join(" and ");

/** Facts shown at the top of every hub. */
export function hubFacts() {
  return [
    { k: "Date", v: eventWhen.long, status: (eventWhen.tentative ? "tentative" : "confirmed") as HubStatus },
    { k: "Venue", v: `${venue.name}, ${venue.area.split(",")[0]}`, status: (venue.confirmed ? "confirmed" : "tentative") as HubStatus },
    { k: "Hours", v: `${DAY_START} to ${DAY_END}. One day, not overnight.` },
    { k: "Who", v: `Students in ${eligibility.forms}` },
    { k: "Size", v: `About ${eligibility.maxHackers} students from several schools` },
    { k: "Teams", v: `${TEAM} students per team` },
  ];
}

export const applicationState = {
  open: appsOpen,
  label: appsOpen ? "Applications are open" : applications.status === "closed" ? "Applications are closed" : "Applications open soon",
};

/** What to bring. Only what is truly required is marked `need`. */
export const bringList: { item: string; kind: "need" | "nice" | "pending" }[] = [
  { item: "Your school ID", kind: "need" },
  { item: "A signed parent or guardian consent form (sent to accepted students)", kind: "need" },
  { item: "A laptop and charger, if you have one", kind: "nice" },
  { item: "A water bottle", kind: "nice" },
  { item: "Headphones", kind: "nice" },
  { item: "A notebook and pen for sketching ideas", kind: "nice" },
  { item: "Whether laptops can be provided for students without one", kind: "pending" },
  { item: "The final packing list, sent to accepted students", kind: "pending" },
];

/** What the application form asks. Mirrors src/components/forms/ApplyForm.tsx. */
export const applicationAsks = [
  "Your name, email, phone number, school, form and age",
  "Four short written answers, such as what you enjoy creating and why you want to come",
  "The role you see yourself playing on a team. \u201cNot sure yet\u201d is an option.",
  "Whether you already have a team, and whether you are open to teammates from another school",
  "Optional links to a GitHub page, portfolio or project",
];

export function hubFaqs(brief: SchoolBrief): HubFaq[] {
  const { short } = brief;
  const range = `${brief.planningRange.min} to ${brief.planningRange.max}`;
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
      a: `Hack 876 is run by an organizing team led by ${ORGANIZERS}${brief.alumni ? `, who both attended ${short}` : ""}. It is not run by ${brief.school}.\n\nThe organizing team handles applications, consent forms, the event itself and all communication with students and families.`,
      category: "The basics",
      audience: ["parents", "teachers", "students"],
      keywords: "who runs behind legitimate organisers organisation company",
      link: { href: "#contact", label: "Contact the organizers" },
    },

    /* ---------------------------------------------------------- Who can take part */
    {
      id: "who-can-apply",
      q: "Who can take part?",
      a: `Students in ${eligibility.forms} at a participating school, including ${short}. About ${eligibility.maxHackers} students from several schools will take part.`,
      category: "Who can take part",
      audience: ["students", "parents", "teachers"],
      keywords: "eligible eligibility allowed grade year age form fifth sixth",
      link: { href: "#apply", label: "How to apply" },
    },
    {
      id: "under-18",
      q: "Can students under 18 take part?",
      a: "Yes. Any student in the eligible forms can apply, whatever their age. A parent or guardian must sign a consent form before the event.\n\nSome AI tools made by other companies have their own minimum ages. That affects which tools a student may use on the day. It does not affect whether they can take part.",
      category: "Who can take part",
      audience: ["students", "parents"],
      keywords: "age minor 16 17 young old enough",
      link: { href: "#ai-tools", label: "AI tools and age limits" },
    },
    {
      id: "guaranteed-place",
      q: `Is a place guaranteed for ${short} students?`,
      a: `No. Every student applies individually, and places are limited. A teacher\u2019s recommendation does not guarantee a place.\n\nFor planning, the organizers have roughly ${range} ${short} students in mind. That figure is an estimate. It is not a quota and not a promise.`,
      category: "Who can take part",
      audience: ["students", "parents", "teachers"],
      keywords: "how many spots spaces quota chance accepted",
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

    /* -------------------------------------------------------------- Getting ready */
    {
      id: "coding",
      q: "Do I need to know how to code?",
      a: "No. You do not need Python, C, JavaScript or any other programming language, and you do not need to have built anything before.\n\nTeams need different skills. Someone has to understand the problem, design how the solution looks, build it, and explain it to the judges. Students who draw, write, research, organize or present are as useful as students who code.",
      category: "Getting ready",
      audience: ["students", "parents", "teachers"],
      keywords: "programming python javascript experience beginner never coded computer science skills",
      link: { href: "#students", label: "For students" },
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
      a: "No training sessions have been arranged. Students do not need to prepare anything in order to apply.",
      todo: "Whether optional workshops or preparation materials will be offered. Any that are arranged will be announced on this page.",
      category: "Getting ready",
      audience: ["students", "teachers"],
      keywords: "prepare preparation workshop practice lessons learn before study",
    },
    {
      id: "team",
      q: "Do I need a team before I apply?",
      a: `No. You can apply on your own, or with friends. If you apply with friends, each of you fills in your own application and lists the others.\n\nTeams are ${TEAM} students. Students without a team are placed in one, and the application asks whether you are happy to be matched with students from another school. Hack 876 is not ${short} against other schools: teams can be mixed.`,
      todo: "The final rules for how teams are formed.",
      category: "Getting ready",
      audience: ["students", "teachers"],
      keywords: "group friends alone solo partner teammates join match other schools",
    },
    {
      id: "bring",
      q: "What should students bring?",
      a: "Required: your school ID and a signed parent or guardian consent form.\n\nBring if you have them: a laptop and charger, a water bottle, headphones, and a notebook and pen.",
      todo: "Whether laptops can be provided for students who do not have one. The final packing list will be sent to accepted students.",
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

    /* ------------------------------------------------------------------- Applying */
    {
      id: "how-apply",
      q: "How does a student apply?",
      a: `Each student completes the application on the Hack 876 website. ${applicationState.label}.\n\nThe student fills it in themselves. A parent or teacher does not need to do anything at this stage.`,
      category: "Applying",
      audience: ["students", "parents", "teachers"],
      keywords: "sign up register registration join enter form submit",
      link: { href: "/apply", label: "Go to the application" },
    },
    {
      id: "recommendation",
      q: "Does a teacher have to recommend me before I apply?",
      a: `The application form does not ask for a recommendation, so a student at ${short} can submit one directly. Participating schools are also asked to recommend students they think would enjoy it.`,
      todo: "Whether a school recommendation will be required for a place, and how recommendations are weighed. If you are unsure, apply and let your teacher know.",
      category: "Applying",
      audience: ["students", "parents", "teachers"],
      keywords: "recommended nominate nomination teacher permission referral required first",
    },
    {
      id: "application-asks",
      q: "What does the application ask for?",
      a: `${applicationAsks.map((a) => a.replace(/\.$/, "")).join(". ")}.\n\nThere is no test. The written answers are there to show what a student is curious about.`,
      category: "Applying",
      audience: ["students", "parents"],
      keywords: "questions essay information details personal data",
    },
    {
      id: "selection",
      q: "How are students chosen?",
      a: "The Hack 876 organizing team reads each application. The written answers matter more than grades or past achievements: the team is looking for curiosity and a willingness to build with other people.",
      todo: "The detailed selection criteria.",
      category: "Applying",
      audience: ["students", "parents", "teachers"],
      keywords: "selected selection criteria picked accepted chosen grades marks",
    },
    {
      id: "deadline",
      q: "When do applications close, and when will students hear back?",
      a: applications.deadline
        ? `Applications close on ${applications.deadline}.${applications.decisionsBy ? ` Decisions go out by ${applications.decisionsBy}.` : ""}`
        : `${applicationState.label}.`,
      todo: applications.deadline && applications.decisionsBy ? undefined : "The closing date and the date decisions are sent. Both will be posted on this page.",
      category: "Applying",
      audience: ["students", "parents", "teachers"],
      keywords: "deadline due date last day results decision reply response",
    },
    {
      id: "after-applying",
      q: "What happens after a student applies?",
      a: "The student gets a confirmation on screen. The organizing team then reviews applications and contacts each student with a decision. Accepted students receive a consent form for a parent or guardian to sign, plus the details for the day.",
      todo: "When decisions will be sent.",
      category: "Applying",
      audience: ["students", "parents"],
      keywords: "next steps then afterwards accepted confirmation email",
    },

    /* -------------------------------------------------------- AI tools & consent */
    {
      id: "ai-allowed",
      q: "Can students use AI tools?",
      a: "Yes. Using AI is allowed but not required, and a team can do well without it. Whatever a team uses, its members must be able to explain what they built.\n\nStudents will only use tools the organizers have approved for the event.",
      todo: "The list of approved tools.",
      category: "AI tools & consent",
      audience: ["students", "parents", "teachers"],
      keywords: "artificial intelligence chatgpt claude gemini copilot chatbot allowed",
      link: { href: "#ai-tools", label: "AI tools and age limits" },
    },
    {
      id: "ai-age",
      q: "Can students under 18 use AI tools?",
      a: "Not every AI tool is open to students under 18. Many AI tools are made by companies that set a minimum age for users, and some are for adults only. Students under 18 will not be asked or allowed to use an adults-only tool at Hack 876.\n\nThe organizers are choosing tools that are appropriate for the ages taking part.",
      todo: "Which tools are approved, and the age limit for each.",
      category: "AI tools & consent",
      audience: ["students", "parents", "teachers"],
      keywords: "age restriction limit minor 13 16 18 appropriate child",
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
      a: "No. The organizers\u2019 aim is that no student has to buy software or an AI subscription to take part. Students do not need to own or pay for any tool in order to apply.",
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
      a: "Every participant needs a consent form signed by a parent or guardian. The form is sent to accepted students, so there is nothing to sign at the application stage.",
      todo: "The exact wording of the form and how it is returned.",
      category: "AI tools & consent",
      audience: ["parents", "students"],
      keywords: "permission slip form sign signature guardian approve",
    },

    /* -------------------------------------------------------------------- The day */
    {
      id: "when",
      q: "When is Hack 876?",
      a: eventWhen.tentative ? `${eventWhen.long}. This date is tentative. Please do not make firm plans around it until it is confirmed on this page.` : `${eventWhen.long}.`,
      category: "The day",
      audience: ["students", "parents", "teachers"],
      status: eventWhen.tentative ? "tentative" : "confirmed",
      keywords: "date day what time month february saturday",
    },
    {
      id: "where",
      q: "Where is it held?",
      a: `At the ${venue.name} in ${venue.area}.`,
      category: "The day",
      audience: ["students", "parents", "teachers"],
      status: venue.confirmed ? "confirmed" : "tentative",
      keywords: "location venue address place hotel directions map",
      link: venue.mapsUrl ? { href: venue.mapsUrl, label: "View on Maps" } : undefined,
    },
    {
      id: "overnight",
      q: "Is it overnight? What are the hours?",
      a: `It is not overnight. Hack 876 runs for a single day, from ${DAY_START} to ${DAY_END}, and every student goes home that evening.`,
      todo: "Times may shift slightly. The final schedule is sent to accepted students.",
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
        .map((s) => `${s.title.toLowerCase()} at ${s.time}`)
        .join(", ")}.`,
      category: "The day",
      audience: ["students", "parents", "teachers"],
      keywords: "schedule agenda timetable programme itinerary plan activities",
      link: { href: "/#schedule", label: "See the full schedule" },
    },

    /* --------------------------------------------------------- Safety & logistics */
    {
      id: "food",
      q: "Is food provided?",
      a: "Yes. Food is provided on the day, and the schedule includes a lunch break. Accepted students will be asked about allergies and dietary needs in advance.",
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
      keywords: "safe safety safeguarding secure security adults chaperone teachers present watch protect trust",
    },
    {
      id: "transport",
      q: "How do students get there and back?",
      a: `No transport has been arranged, so families should plan to bring students to the ${venue.name} for ${DAY_START} and collect them at ${DAY_END}.`,
      todo: "Drop-off and pick-up procedures, and whether any transport will be arranged.",
      category: "Safety & logistics",
      audience: ["parents", "students", "teachers"],
      keywords: "transport transportation travel bus drive drop off pick up collect ride taxi parking how get",
    },
    {
      id: "emergency",
      q: "Who do I contact on the day or in an emergency?",
      a: `Every family will be given an on-site contact and the emergency procedure before the event.${event.contactEmail ? ` Before the day, the organizers can be reached at ${event.contactEmail}.` : ""}`,
      todo: "The on-site contact details.",
      category: "Safety & logistics",
      audience: ["parents"],
      keywords: "phone number call reach urgent accident medical sick",
    },
    {
      id: "access",
      q: "What if a student has access, medical or dietary needs?",
      a: `Tell the organizers as early as possible${event.contactEmail ? `, at ${event.contactEmail}` : ""}, so arrangements can be made with the venue. Accepted students will also be asked directly.`,
      category: "Safety & logistics",
      audience: ["parents", "students"],
      keywords: "disability wheelchair accessible medication condition special needs support",
    },

    /* ---------------------------------------------------------- Costs & equipment */
    {
      id: "cost",
      q: "Does it cost anything to take part?",
      a: "It costs nothing to apply. The organizers\u2019 aim is that no student has to buy software or tools to build a project, and food is provided on the day.",
      todo: "Whether there is any participation fee. If there is one, it will be published on this page before any student is asked to accept a place.",
      category: "Costs & equipment",
      audience: ["parents", "students", "teachers"],
      keywords: "fee fees price pay payment money free charge expensive how much",
    },
    {
      id: "laptop",
      q: "Does every student need a laptop?",
      a: "Students who have a laptop should bring it. Owning one is not a condition of applying, so a student without a laptop can still apply.",
      todo: "Whether laptops can be provided for students who do not have one.",
      category: "Costs & equipment",
      audience: ["students", "parents"],
      keywords: "computer device tablet phone own borrow equipment",
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

    /* ------------------------------------------------------------ After the event */
    {
      id: "internships",
      q: "Does taking part lead to internships, jobs or scholarships?",
      a: "No. Hack 876 does not offer or promise internships, jobs, scholarships, interviews or placements.\n\nWhat students do get is a day working next to engineers, mentors and other professionals, a chance to present to judges who work in technology and business, and a project they can describe on a university or job application.",
      todo: "The organizers hope to develop longer-term links with companies, universities and mentors. None are in place.",
      category: "After the event",
      audience: ["students", "parents", "teachers"],
      keywords: "career careers job work opportunity opportunities university college cv resume",
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
      q: "How do teachers recommend students?",
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
      a: `${short} is not asked to pay anything, host anything or run anything. Teachers are asked to share this page with eligible students and, if they wish, recommend students.\n\nPermission for students to take part in an outside activity remains a matter for ${short} and for families.`,
      category: "For teachers",
      audience: ["teachers", "parents"],
      keywords: "school responsibility cost budget obligation commitment workload",
    },
    {
      id: "ambassadors",
      q: "What is a student ambassador?",
      a: brief.hub
        ? `A student ambassador is a ${short} student who helps classmates find out about Hack 876. ${brief.hub.ambassadors.summary}\n\nThe role is small: ${brief.hub.ambassadors.duties.map((d) => d.replace(/\.$/, "").replace(/^./, (c) => c.toLowerCase())).join("; ")}.`
        : "",
      category: "For teachers",
      audience: ["teachers", "students"],
      keywords: "representative rep student leader prefect volunteer role",
    },
    {
      id: "materials",
      q: "Is there a flyer or information sheet to share?",
      a: "Yes. A student flyer, a parent and guardian information sheet and an overview for teachers can each be downloaded from this page as a one-page PDF.",
      category: "For teachers",
      audience: ["teachers", "parents"],
      keywords: "poster handout print pdf download advertisement advert notice whatsapp share",
      link: { href: "#resources", label: "Downloads" },
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
      blurb: "What Hack 876 is, who can apply and how. For noticeboards and class groups.",
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
  ];
}

export type SheetKey = ReturnType<typeof schoolSheets>[number]["key"];
