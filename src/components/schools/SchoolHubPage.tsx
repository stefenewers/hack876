import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { BirdMark } from "@/components/art/DoctorBird";
import { Icon } from "@/components/art/Icons";
import { Logo } from "@/components/art/Wordmark";
import { Footer } from "@/components/site/Footer";
import { RegisterLink } from "@/components/site/RegisterLink";
import { buildTypes, eligibility, event, judging, mlh, people, registration, schedule, schools, venue } from "@/data/event";
import { alumniSummary, organizerAlumniClause } from "@/data/alumni";
import { isPitch, schoolAlumni, type SchoolBrief } from "@/data/schoolBriefs";
import {
  ambassadorRole,
  bringList,
  formsFor,
  hubLiaison,
  hubUrl,
  hubUrlShort,
  mediaHref,
  mediaVariants,
  possessive,
  quickStatus,
  registrationState,
  hubCategories,
  hubFaqs,
  organizerNames,
  PROTOTYPE,
  PROTOTYPE_EXAMPLES,
  schoolResources,
  schoolSheets,
  shareMessages,
  statusLabel,
  TODO_LABEL,
  type HubFaq,
  type HubStatus,
} from "@/data/schoolHub";
import { CopyButton } from "./CopyButton";
import { FaqSearch } from "./FaqSearch";
import { statusClass } from "./status";
import "./hub.css";

/*
 * A confirmed school's participation hub: everything a student, parent,
 * teacher or student ambassador needs, in one place. Written for a reader who
 * has never heard of Hack 876 and knows nothing about how the school became
 * involved. Rendered at /schools/<slug> for every school in `confirmedSchools`
 * (see `isHub`). Event facts come from event.ts via schoolHub.ts; only the
 * relationship and community details come from the school's entry. Server
 * rendered; only the FAQ search and copy buttons run in the browser.
 */

const TEAM = `${eligibility.teamSize.min} to ${eligibility.teamSize.max}`;

const DAY_END = schedule[schedule.length - 1]?.time ?? "";

/** What is not yet decided, shown next to the facts it relates to. */
function Todo({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p className={dark ? "mt-3 border-l-[3px] border-cream/40 bg-cream/[0.06] px-3 py-2 text-[0.92rem] leading-snug text-cream/80" : "hub-todo mt-3"}>
      <span className="font-extrabold">{TODO_LABEL}:</span> {children}
    </p>
  );
}

function Status({ s }: { s?: HubStatus }) {
  return s ? <span className={`hub-status ${statusClass[s]}`}>{statusLabel[s]}</span> : null;
}

function Paras({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {text.split("\n\n").map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
  );
}

function SectionHead({ id, kicker, title, children }: { id: string; kicker: string; title: string; children?: ReactNode }) {
  return (
    <header>
      <p className="hub-kicker">{kicker}</p>
      <h2 id={id} className="hub-h2 mt-2">
        {title}
      </h2>
      {children && <div className="hub-lead mt-3">{children}</div>}
    </header>
  );
}

const NAV = [
  { href: "#about", label: "What it is" },
  { href: "#students", label: "Students" },
  { href: "#register", label: "How to register" },
  { href: "#parents", label: "Parents" },
  { href: "#ai-tools", label: "AI tools" },
  { href: "#teachers", label: "Teachers" },
  { href: "#ambassadors", label: "Ambassadors" },
  { href: "#resources", label: "Resources" },
  { href: "#contact", label: "Contact" },
];

const linkClass = "font-bold text-[var(--sb-primary)] underline decoration-2 underline-offset-4";

function Bullets({ items, dot = "bg-[var(--sb-primary)]" }: { items: ReactNode[]; dot?: string }) {
  return (
    <ul className="mt-3 space-y-2 text-[0.98rem] leading-snug text-ink-2">
      {items.map((t, i) => (
        <li key={i} className="flex gap-2.5">
          <span aria-hidden className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />
          <span className="min-w-0">{t}</span>
        </li>
      ))}
    </ul>
  );
}

const DownloadIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden className="h-4 w-4">
    <path d="M10 3v9m0 0-3.5-3.5M10 12l3.5-3.5M4 14.5V16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-1.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function SchoolHubPage({ brief }: { brief: SchoolBrief }) {
  const faqs = hubFaqs(brief);
  const byId = (id: string) => faqs.find((f) => f.id === id) as HubFaq;
  const vars = { "--sb-primary": brief.colors.primary, "--sb-secondary": brief.colors.secondary, "--sb-ink": brief.colors.ink } as CSSProperties;

  return (
    <div className="hub" style={vars}>
      <header className="hub-wrap flex items-center justify-between gap-4 py-4">
        <Link href="/" className="flex items-center gap-2 rounded-lg" aria-label="Hack 876 home">
          <BirdMark className="h-6 w-10" />
          <Logo className="text-[1.4rem]" />
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/" className="hidden text-sm font-bold text-ink-soft underline-offset-4 hover:underline sm:inline">
            Main Hack 876 website
          </Link>
          <RegisterLink className="btn btn-primary btn-sm" />
        </div>
      </header>

      <main id="main">
        <Hero brief={brief} />

        <nav aria-label="On this page" className="hub-nav">
          <div className="hub-wrap hub-scroll flex items-center gap-1 overflow-x-auto py-2">
            <a href="#questions" className="hub-nav-search mr-1">
              <svg viewBox="0 0 20 20" aria-hidden className="h-4 w-4">
                <path d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Zm7.5 13-3.6-3.6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
              Search questions
            </a>
            {NAV.map((n) => (
              <a key={n.href} href={n.href}>
                {n.label}
              </a>
            ))}
          </div>
        </nav>

        <Paths short={brief.short} />
        <About brief={brief} />
        <Students brief={brief} byId={byId} />
        <Registering brief={brief} byId={byId} />
        <Parents brief={brief} byId={byId} />
        <AiTools />
        <Beyond byId={byId} />
        <Community brief={brief} />
        <Teachers brief={brief} />
        <Ambassadors brief={brief} />
        <Resources brief={brief} />

        <section id="questions" aria-labelledby="hub-questions" className="border-t border-ink/10 bg-cream-2 py-14 sm:py-20">
          <div className="hub-wrap">
            <SectionHead id="hub-questions" kicker="Questions and answers" title="Find an answer.">
              <p>
                Answers about eligibility, registering, preparation, safety, costs and what happens on the day. Type a question in your
                own words, or choose a topic.
              </p>
            </SectionHead>
            <div className="mt-8">
              <FaqSearch faqs={faqs} categories={hubCategories} contactEmail={event.contactEmail} />
            </div>
          </div>
        </section>

        <Contact brief={brief} />
      </main>
      <Footer />

      {/* Always-reachable search on phones. */}
      <a
        href="#questions"
        className="hub-no-print fixed right-4 bottom-4 z-40 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-sun px-4 py-2.5 text-sm font-extrabold shadow-[3px_4px_0_0_var(--color-ink)] sm:hidden"
      >
        <svg viewBox="0 0 20 20" aria-hidden className="h-4 w-4">
          <path d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Zm7.5 13-3.6-3.6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
        Search questions
      </a>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero: the essentials                                                      */
/* -------------------------------------------------------------------------- */

function Hero({ brief }: { brief: SchoolBrief }) {
  const status = quickStatus(brief);
  const guidance = brief.hub?.schoolGuidance ?? [];
  return (
    <section aria-labelledby="hub-title" className="border-t border-ink/10 pt-8 pb-10 sm:pt-12 sm:pb-14">
      <div className="hub-wrap">
        <div className="flex items-center gap-3.5">
          <Image src={brief.crest} alt={`${brief.school} crest`} width={56} height={56} className="h-14 w-14 shrink-0 object-contain" />
          <div className="min-w-0">
            <p className="text-[1.05rem] leading-tight font-extrabold">{brief.school}</p>
            <span className={`hub-status mt-1 ${statusClass.confirmed}`} style={{ whiteSpace: "normal" }}>
              Confirmed participating school
            </span>
          </div>
        </div>
        <h1 id="hub-title" className="mt-6 max-w-[20ch] text-[clamp(2.2rem,6.2vw,4.4rem)] leading-[1] font-extrabold tracking-[-0.04em] text-balance">
          {brief.short} × Hack 876. <span className="hub-under text-[var(--sb-primary)]">Everything you need, in one place.</span>
        </h1>
        <p className="hub-lead mt-5">
          {brief.school} is taking part in Hack 876, {mlh.hackDayBadge.replace(/^An /, "an ")}: a one-day competition where secondary-school
          students build a solution to a real problem in small teams, then present it to judges. It is free, and no coding experience is
          needed. {brief.short} students in {formsFor(brief)} can register.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
          <RegisterLink long className="btn btn-primary" />
          <a href="#paths" className="font-bold underline decoration-2 underline-offset-4">
            Student, parent, teacher or ambassador? Start here
          </a>
        </div>
        <p className="mt-3 text-sm text-ink-soft">
          {registration.accountNote} Hack 876 is organized independently of {brief.school}.
        </p>

        <h2 className="hub-kicker mt-10">At a glance</h2>
        <dl className="mt-3 grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-3">
          {status.map((f, idx) => (
            <div
              key={f.k}
              className={`hub-card px-3 py-3 sm:px-4 sm:py-3.5 ${f.wide ? "col-span-2 sm:col-span-1" : ""}`}
              style={idx === 0 ? { borderColor: "var(--sb-primary)", background: "color-mix(in srgb, var(--sb-secondary) 22%, var(--color-paper))" } : undefined}
            >
              <dt className="flex flex-wrap items-center justify-between gap-2 text-xs font-extrabold tracking-[0.14em] text-ink-soft uppercase">
                <span className="min-w-0 break-words">{f.k}</span>
                <Status s={f.status} />
              </dt>
              <dd className="mt-1 text-[0.98rem] leading-snug font-extrabold sm:text-[1.08rem]">{f.v}</dd>
              {f.note && <dd className="mt-0.5 text-sm leading-snug text-ink-soft">{f.note}</dd>}
            </div>
          ))}
        </dl>
        {guidance.map((g) => (
          <div key={g.k} className="hub-card-soft mt-3 p-4">
            <p className="flex flex-wrap items-center gap-2 font-extrabold">
              {g.k} <Status s="school" />
            </p>
            <p className="mt-1 text-[0.98rem] leading-relaxed text-ink-2">{g.v}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  What is Hack 876?                                                         */
/* -------------------------------------------------------------------------- */

function About({ brief }: { brief: SchoolBrief }) {
  const day = [
    { t: "Morning", d: "Students arrive, meet their teams and are given the challenge for the day." },
    { t: "Most of the day", d: "Teams decide what to make and build it, with mentors on hand to help. Lunch is provided." },
    { t: "Late afternoon", d: "Each team shows its work to the judges. The strongest teams present on stage." },
    { t: "Evening", d: `Prizes are awarded and the day ends at ${DAY_END}.` },
  ];
  return (
    <section id="about" aria-labelledby="hub-about" className="border-t border-ink/10 bg-paper py-14 sm:py-20">
      <div className="hub-wrap">
        <SectionHead id="hub-about" kicker="What is Hack 876?" title="A one-day competition where students build something.">
          <p>
            Events like this are called hackathons. Small teams start with a problem in the morning and, by the evening, show judges
            what they have made. The name has nothing to do with breaking into computers.
          </p>
        </SectionHead>

        <div className="mt-8 grid gap-3 lg:grid-cols-2">
          <div className="hub-card p-5">
            <h3 className="hub-h3">What happens on the day</h3>
            <ol className="mt-3 space-y-2.5">
              {day.map((d) => (
                <li key={d.t} className="grid grid-cols-[7.5rem_1fr] gap-3 text-[0.98rem] leading-snug">
                  <span className="font-extrabold text-[var(--sb-primary)]">{d.t}</span>
                  <span className="text-ink-2">{d.d}</span>
                </li>
              ))}
            </ol>
            <Link href="/#schedule" className="mt-3 inline-block font-bold text-[var(--sb-primary)] underline decoration-2 underline-offset-4">
              See the full schedule
            </Link>
          </div>

          <div className="hub-card p-5">
            <h3 className="hub-h3">What students make</h3>
            <p className="mt-2 text-[0.98rem] leading-relaxed text-ink-2">Each team builds a prototype. {PROTOTYPE}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {PROTOTYPE_EXAMPLES.map((e) => (
                <li key={e} className="rounded-full border border-ink/20 bg-cream px-3 py-1 text-sm font-bold">
                  {e}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm leading-snug text-ink-soft">
              The aim is to have something working to show by the end of the day. Not every team gets all the way there, and that is
              expected.
            </p>
          </div>

          <div className="hub-card p-5">
            <h3 className="hub-h3">What the judges look for</h3>
            <ul className="mt-3 grid gap-x-4 gap-y-2 sm:grid-cols-2">
              {judging.map((j) => (
                <li key={j.name} className="text-[0.95rem] leading-snug">
                  <span className="block font-extrabold">{j.name}</span>
                  <span className="text-ink-2">{j.body}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm leading-snug text-ink-soft">A simple idea that works and is explained clearly can beat a complicated one that does not.</p>
          </div>

          <div className="hub-card p-5">
            <h3 className="hub-h3">Who runs it, and why</h3>
            <p className="mt-2 text-[0.98rem] leading-relaxed text-ink-2">
              Hack 876 is run by an organizing team led by {organizerNames.join(" and ")}
              {organizerAlumniClause(people, brief.school, brief.short)}. It exists to give Jamaican students a chance to build
              something real before university, alongside people who do it for a living.
            </p>
            <p className="mt-2 text-[0.98rem] leading-relaxed text-ink-2">
              About {eligibility.maxHackers} students from several Kingston schools will take part, at the {venue.name}.
            </p>
            <a href="#contact" className="mt-3 inline-block font-bold text-[var(--sb-primary)] underline decoration-2 underline-offset-4">
              Contact the organizers
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Choose your path                                                          */
/* -------------------------------------------------------------------------- */

function Paths({ short }: { short: string }) {
  const paths = [
    { href: "#students", icon: "rocket", title: "I am a student", text: "Whether it is for you, what you will do, what to bring and how to register." },
    { href: "#parents", icon: "heart", title: "I am a parent or guardian", text: "Date, venue, hours, supervision, consent, food, transport and costs." },
    { href: "#teachers", icon: "learn", title: "I am a teacher or staff member", text: "What Hack 876 handles, what the school may handle, and how to share it." },
    { href: "#ambassadors", icon: "badge", title: "I am a student ambassador", text: "Your role, ready-made messages, graphics, a poster and a QR code." },
  ];
  return (
    <section id="paths" aria-label={`Where to start, for the ${short} community`} className="border-t border-ink/10 py-10 sm:py-14">
      <div className="hub-wrap">
        <p className="hub-kicker">Go straight to what you need</p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {paths.map((p) => (
            <li key={p.href}>
              <a href={p.href} className="hub-card group flex h-full flex-col p-5 transition-transform hover:-translate-y-0.5 hover:shadow-[3px_4px_0_0_var(--color-ink)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                <Icon name={p.icon} className="h-11 w-11" />
                <span className="hub-h3 mt-3">{p.title}</span>
                <span className="mt-1.5 flex-1 text-[0.97rem] leading-snug text-ink-2">{p.text}</span>
                <span className="mt-4 inline-flex items-center gap-1.5 font-extrabold text-[var(--sb-primary)]">
                  Read this section <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-ink-2">
          Have a specific question?{" "}
          <a href="#questions" className={linkClass}>
            Search the answers
          </a>
          .
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Students                                                                  */
/* -------------------------------------------------------------------------- */

function Students({ brief, byId }: { brief: SchoolBrief; byId: (id: string) => HubFaq }) {
  const blocks = ["coding", "team", "training", "paid-tools"].map(byId);
  const kinds = [
    { kind: "need" as const, title: "Required", cls: "bg-mint" },
    { kind: "nice" as const, title: "Bring if you have them", cls: "bg-sun-light" },
    { kind: "pending" as const, title: TODO_LABEL, cls: "bg-cream" },
  ];
  const roles = ["Understanding the problem", "Designing how it looks", "Building it", "Researching and testing", "Explaining it to the judges", "Keeping the team organized"];
  return (
    <section id="students" aria-labelledby="hub-students" className="border-t border-ink/10 bg-paper py-14 sm:py-20">
      <div className="hub-wrap">
        <SectionHead id="hub-students" kicker="For students" title="Is it for you, and what will you do?">
          <p>
            If you are in {formsFor(brief)} and you like making things, yes. You will join a team of {TEAM}, choose
            a problem, and spend the day building a solution together. You do not need to have coded before.
          </p>
        </SectionHead>

        <div className="hub-card-soft mt-8 p-5">
          <h3 className="hub-h3">Every team needs different skills</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {roles.map((r) => (
              <li key={r} className="rounded-full border border-ink/20 bg-cream px-3 py-1 text-sm font-bold">
                {r}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-ink-soft">Only one of these is programming. Artists, writers, researchers and confident speakers are needed too.</p>
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {blocks.map((f) => (
            <article key={f.id} className="hub-card p-5">
              <h3 className="hub-h3">{f.q}</h3>
              <Paras text={f.a} className="mt-2.5 text-[1rem] leading-relaxed text-ink-2" />
              {f.todo && <Todo>{f.todo}</Todo>}
            </article>
          ))}
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_1.4fr]">
          <div className="hub-card-soft p-5">
            <h3 className="hub-h3">Kinds of things teams build</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {buildTypes.map((b) => (
                <li key={b.label} className="flex items-center gap-1.5 rounded-full border border-ink/20 bg-cream px-3 py-1 text-sm font-bold">
                  <Icon name={b.icon} className="h-5 w-5" />
                  {b.label}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-ink-soft">Your team chooses the problem and how to solve it.</p>
          </div>

          <div className="hub-card-soft p-5" data-anchor id="bring">
            <h3 className="hub-h3">What to bring</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {kinds.map((k) => (
                <div key={k.kind}>
                  <p className={`inline-block rounded-full border-2 border-ink px-2.5 py-0.5 text-[0.68rem] font-extrabold tracking-wide uppercase ${k.cls}`}>{k.title}</p>
                  <ul className="mt-2 space-y-1.5 text-[0.95rem] leading-snug text-ink-2">
                    {bringList
                      .filter((b) => b.kind === k.kind)
                      .map((b) => (
                        <li key={b.item}>{b.item}</li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-ink-2">
          <span className="font-bold text-ink">Next step:</span>
          <a href="#register" className="font-bold text-ink underline decoration-2 underline-offset-4">
            See how to register
          </a>
          <RegisterLink className="font-bold text-[var(--sb-primary)] underline decoration-2 underline-offset-4">
            or register on MLH now
          </RegisterLink>
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Registration                                                               */
/* -------------------------------------------------------------------------- */

function Registering({ brief, byId }: { brief: SchoolBrief; byId: (id: string) => HubFaq }) {
  const steps: { t: string; d: string; todo?: string }[] = [
    { t: "Check you are eligible", d: `You need to be in ${formsFor(brief)}, at ${brief.short} or another school in the Hack 876 network.` },
    {
      t: "Register yourself on MLH",
      d: `Create a free MyMLH account and register at ${registration.url.replace(/^https?:\/\//, "")}. You can register alone or with friends. Each student registers themselves. There is no school nomination step.`,
    },
    { t: "Tell a teacher, if you like", d: byId("recommendation").a },
    { t: "Get your consent form", d: byId("after-registering").a, todo: byId("after-registering").todo },
    { t: "Teams are formed", d: `Teams are ${TEAM} students. Students without a team are placed in one, which may include students from other schools.`, todo: byId("team").todo },
    { t: "Check in at the door", d: "Check-in is in person only, at the venue on the day. Bring your school ID and the signed consent form." },
  ];
  return (
    <section id="register" aria-labelledby="hub-register" className="border-t border-ink/10 py-14 sm:py-20">
      <div className="hub-wrap">
        <SectionHead id="hub-register" kicker="How to register" title="How to register, and what happens next.">
          <p>
            {registrationState.label}. Places are limited to about {eligibility.maxHackers} students across all schools. Hack 876 is free for students.
          </p>
        </SectionHead>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <ol className="grid gap-2.5">
            {steps.map((s, i) => (
              <li key={s.t} className="hub-card flex gap-4 p-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--sb-primary)] font-extrabold text-white">{i + 1}</span>
                <div className="min-w-0 flex-1">
                  <h3 className="hub-h3">{s.t}</h3>
                  <p className="mt-1 text-[0.98rem] leading-relaxed text-ink-2">{s.d}</p>
                  {s.todo && <Todo>{s.todo}</Todo>}
                </div>
              </li>
            ))}
          </ol>

          <div className="grid h-fit gap-3">
            <div className="hub-card p-5">
              <h3 className="hub-h3">Register on MLH</h3>
              <p className="mt-2 text-[0.98rem] leading-relaxed text-ink-2">
                Hack 876 is {mlh.hackDayBadge.replace(/^An /, "an ")}, so registration and project submission both happen on MLH. {registration.accountNote}
              </p>
              <p className="mt-2 text-sm text-ink-soft">There is no test and no school nomination step.</p>
              <RegisterLink long className="btn btn-primary mt-5 w-full" />
            </div>
            <div className="hub-card-soft p-5">
              <h3 className="hub-h3">How many {brief.short} students?</h3>
              <p className="mt-1.5 text-[0.98rem] leading-relaxed text-ink-2">{byId("guaranteed-place").a.split("\n\n")[1]}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Parents and guardians                                                     */
/* -------------------------------------------------------------------------- */

function Parents({ brief, byId }: { brief: SchoolBrief; byId: (id: string) => HubFaq }) {
  const topics: { title: string; id: string; icon: string }[] = [
    { title: "Who runs Hack 876", id: "organizers", icon: "people" },
    { title: "Hack 876 and MLH", id: "mlh", icon: "badge" },
    { title: "Date", id: "when", icon: "clock" },
    { title: "Venue", id: "where", icon: "pin" },
    { title: "Hours", id: "overnight", icon: "clock" },
    { title: "Arrival and check-in", id: "arrival", icon: "pin" },
    { title: "Supervision and safety", id: "supervision", icon: "people" },
    { title: "Code of Conduct", id: "conduct", icon: "notebook" },
    { title: "Judges and mentors", id: "mentors", icon: "learn" },
    { title: "Consent", id: "consent", icon: "notebook" },
    { title: "Photos", id: "photos", icon: "sticky" },
    { title: "Food", id: "food", icon: "patty" },
    { title: "Getting there and back", id: "transport", icon: "move" },
    { title: "Can parents stay?", id: "parents-stay", icon: "heart" },
    { title: "Costs", id: "cost", icon: "business" },
    { title: "Laptops and devices", id: "laptop", icon: "laptop" },
    { title: "AI tools and age limits", id: "ai-age", icon: "spark" },
    { title: "Contact on the day", id: "emergency", icon: "badge" },
    { title: "Access, medical and dietary needs", id: "access", icon: "wellbeing" },
    { title: `${possessive(brief.short)} permission`, id: "school-permission", icon: "learn" },
  ];
  return (
    <section id="parents" aria-labelledby="hub-parents" className="border-t border-ink/10 bg-paper py-14 sm:py-20">
      <div className="hub-wrap">
        <SectionHead id="hub-parents" kicker="For parents and guardians" title="What parents and guardians need to know.">
          <p>
            Hack 876 is a supervised, single-day event at a hotel in Kingston, run by the Hack 876 organizing team. Each card below gives
            what is known. Where a detail is marked &ldquo;{TODO_LABEL}&rdquo;, families will be told before the event.
          </p>
        </SectionHead>
        <ul className="mt-8 grid gap-3 md:grid-cols-2">
          {topics.map((t) => {
            const f = byId(t.id);
            return (
              <li key={t.id} className="hub-card flex gap-4 p-5">
                <Icon name={t.icon} className="h-10 w-10 shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="hub-h3">{t.title}</h3>
                    <Status s={f.status} />
                  </div>
                  <Paras text={f.a} className="mt-1.5 text-[0.98rem] leading-relaxed text-ink-2" />
                  {f.todo && <Todo>{f.todo}</Todo>}
                  {f.link && (
                    <a
                      href={f.link.href}
                      {...(f.link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="mt-2 inline-block font-bold text-[var(--sb-primary)] underline decoration-2 underline-offset-4"
                    >
                      {f.link.label}
                    </a>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
        <p className="mt-6 text-ink-2">
          <span className="font-bold text-ink">Next step:</span> if your child would like to take part, they{" "}
          <a href="#register" className="font-bold text-ink underline decoration-2 underline-offset-4">
            register on MLH
          </a>{" "}
          themselves. Nothing needs to be signed or paid at that stage, and Hack 876 is free.
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  AI tools, age restrictions and consent                                    */
/* -------------------------------------------------------------------------- */

function AiTools() {
  const points = [
    { t: "Students may use AI, but do not have to.", d: "AI tools are programs that can write text, code or images from instructions. A team can do well without them." },
    { t: "Students under 18 can take part.", d: "Age limits are set for particular tools, not for the event." },
    { t: "Some AI tools are for adults only.", d: "The companies that make them set a minimum age. Students under 18 will not use an adults-only tool at Hack 876." },
    { t: "A parent cannot give permission for an 18+ tool.", d: "A parent\u2019s consent does not change a company\u2019s minimum age." },
    { t: "Students use approved tools only.", d: "The organizers are choosing tools suitable for the ages taking part, so that every team has tools its members may use." },
    { t: "Students do not need to buy anything.", d: "The aim is that no student has to pay for software or an AI subscription." },
  ];
  return (
    <section id="ai-tools" aria-labelledby="hub-ai" className="border-t border-ink/10 bg-night py-14 text-cream sm:py-20">
      <div className="hub-wrap">
        <p className="text-[0.74rem] font-extrabold tracking-[0.16em] text-sun uppercase">AI tools and age limits</p>
        <h2 id="hub-ai" className="hub-h2 mt-2">
          How AI tools are handled for students under 18.
        </h2>
        <p className="mt-3 max-w-2xl text-[1.08rem] leading-relaxed text-cream/80">
          Most students taking part are under 18, and many AI tools have age rules. This is how Hack 876 deals with that.
        </p>
        <ol className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {points.map((p, i) => (
            <li key={p.t} className="rounded-2xl border border-cream/20 bg-cream/[0.05] p-5">
              <p className="text-sm font-extrabold text-sun">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-1.5 text-[1.08rem] leading-snug font-extrabold">{p.t}</p>
              <p className="mt-1.5 text-[0.97rem] leading-relaxed text-cream/75">{p.d}</p>
            </li>
          ))}
        </ol>
        <Todo dark>
          The list of approved tools, the age limit for each, and the consent form. All three will be sent to registered students and
          their families before the event.
        </Todo>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Beyond event day                                                          */
/* -------------------------------------------------------------------------- */

function Beyond({ byId }: { byId: (id: string) => HubFaq }) {
  return (
    <section id="beyond" aria-labelledby="hub-beyond" className="border-t border-ink/10 py-14 sm:py-20">
      <div className="hub-wrap">
        <SectionHead id="hub-beyond" kicker="After the event" title="What students gain beyond the competition." />
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          <div className="hub-card p-5">
            <h3 className="hub-h3">What every participant gets</h3>
            <ul className="mt-3 space-y-2 text-[1rem] leading-snug text-ink-2">
              {[
                "A day working next to engineers, mentors and other professionals.",
                "Practice presenting to judges who work in technology and business.",
                "New contacts among students from other schools.",
                "A project to describe to universities and employers.",
              ].map((t) => (
                <li key={t} className="flex gap-2.5">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="hub-card p-5">
            <h3 className="hub-h3">What is not on offer</h3>
            <p className="mt-3 rounded-xl bg-[color-mix(in_srgb,var(--sb-secondary)_30%,transparent)] px-4 py-3 text-[0.98rem] font-bold">
              Hack 876 does not offer or promise internships, jobs, scholarships, interviews or placements.
            </p>
            <p className="mt-3 text-[0.98rem] leading-relaxed text-ink-2">{byId("careers").a}</p>
            {byId("internships").todo && <Todo>{byId("internships").todo}</Todo>}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  School community: alumni                                                  */
/* -------------------------------------------------------------------------- */

function Community({ brief }: { brief: SchoolBrief }) {
  const alumni = schoolAlumni(brief.school);
  if (alumni.length === 0) return null;
  const tag = { judge: "Judge", organizer: "Organizer" } as const;
  return (
    <section id="community" aria-labelledby="hub-community" className="border-t border-ink/10 bg-paper py-14 sm:py-20">
      <div className="hub-wrap">
        <SectionHead id="hub-community" kicker={`${brief.short} alumni at Hack 876`} title={brief.alumni?.headline ?? `${brief.short} alumni at Hack 876.`}>
          <p>
            {alumniSummary(people, brief.school, brief.short)} Each card shows where they studied and where they work now.
          </p>
        </SectionHead>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {alumni.map((p) => {
            const after = (p.schools ?? []).filter((s) => !(schools as readonly string[]).includes(s));
            return (
              <li key={p.name} className="hub-card flex gap-4 p-4">
                {p.photo && <Image src={p.photo} alt={p.name} width={80} height={80} className="h-20 w-20 shrink-0 rounded-xl border-2 border-ink object-cover" />}
                <div className="min-w-0">
                  <p className="text-[0.66rem] font-extrabold tracking-[0.14em] text-[var(--sb-primary)] uppercase">
                    {p.pending ? `${tag[p.role as "judge" | "organizer"]} · pending` : tag[p.role as "judge" | "organizer"]}
                  </p>
                  <p className="mt-0.5 text-[1.08rem] leading-tight font-extrabold">{p.name}</p>
                  <p className="mt-1 text-sm leading-snug text-ink-soft">
                    {brief.alumni?.paths?.[p.name] ?? [brief.short, ...after].join(" → ")}
                  </p>
                  {p.organization && <p className="mt-0.5 text-sm font-bold">{p.organization}</p>}
                </div>
              </li>
            );
          })}
        </ul>
        <p className="mt-4 text-sm text-ink-soft">
          Workplaces are listed to show each person&rsquo;s career. These companies are not sponsors of Hack 876 unless listed as sponsors on the
          main website.
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Teachers: sharing, liaison, ambassadors                                    */
/* -------------------------------------------------------------------------- */

function Teachers({ brief }: { brief: SchoolBrief }) {
  const hub = brief.hub!;
  const liaison = hubLiaison(brief);
  const short = brief.short;
  const columns: { title: string; items: string[]; dot: string }[] = [
    {
      title: "What Hack 876 handles",
      dot: "bg-emerald",
      items: [
        "Organizing and running the event",
        "Registration and project submission, on MLH",
        "The venue, schedule, food, mentors and judges",
        "Consent forms for parents and guardians",
        "Event Rules, the Code of Conduct and supervision on the day",
        "All communication with registered students and families",
      ],
    },
    {
      title: `What ${short} may want to handle`,
      dot: "bg-[var(--sb-primary)]",
      items: [
        "Sharing the opportunity with eligible students",
        `Any permission ${short} requires for outside activities`,
        "Any message to parents the school wants to send",
        "Any school travel arrangements, if the school wishes",
        "Naming a faculty liaison and student ambassadors",
      ],
    },
    {
      title: `What ${short} is not asked to do`,
      dot: "bg-bill",
      items: [
        "Pay or sponsor anything",
        "Host or organize anything",
        "Teach coding or prepare students",
        "Register students on MLH",
        "Form teams, unless the school would like to help",
        "Attend the event, unless school policy requires it",
      ],
    },
  ];
  return (
    <section id="teachers" aria-labelledby="hub-teachers" className="border-t border-ink/10 py-14 sm:py-20">
      <div className="hub-wrap">
        <SectionHead id="hub-teachers" kicker="For teachers and school staff" title={`How ${short} teachers can support students.`}>
          <p>
            {short} is not asked to pay, host or organize anything. Teachers can help by telling eligible students about Hack 876 and, if
            they wish, helping with parent or guardian consent forms and travel. Students register themselves: participation is open, not
            nomination-only.
          </p>
        </SectionHead>

        <div className="hub-card-soft mt-8 p-5">
          <h3 className="hub-h3">{possessive(short)} involvement</h3>
          <p className="mt-1.5 text-[0.98rem] leading-relaxed text-ink-2">{hub.status}</p>
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-3">
          {columns.map((c) => (
            <div key={c.title} className="hub-card p-5">
              <h3 className="hub-h3">{c.title}</h3>
              <Bullets items={c.items} dot={c.dot} />
            </div>
          ))}
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-2">
          <div className="hub-card p-5">
            <h3 className="hub-h3">How to share it with students</h3>
            <ol className="mt-3 space-y-2.5 text-[0.98rem] leading-snug text-ink-2">
              {hub.faculty.process.map((t, i) => (
                <li key={t} className="flex gap-3">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--sb-primary)] text-xs font-extrabold text-white">{i + 1}</span>
                  {t}
                </li>
              ))}
            </ol>
            <p className="mt-3 text-sm leading-snug text-ink-soft">
              Recommending a student is welcome, but it is never required: any eligible student can register without a teacher&rsquo;s say-so.
            </p>
            <a href="#resources" className={`mt-3 inline-block ${linkClass}`}>
              Download the flyer, poster and information sheets
            </a>
          </div>
          <div className="hub-card p-5">
            <h3 className="hub-h3">Students who tend to do well</h3>
            <Bullets items={hub.faculty.profiles} />
            <p className="mt-3 text-sm text-ink-soft">Programming experience is not required.</p>
          </div>

          <div className="hub-card p-5">
            <p className="flex flex-wrap items-center justify-between gap-2">
              <span className="hub-kicker">Faculty liaison</span>
              <Status s={liaison.pending ? "school" : "confirmed"} />
            </p>
            <p className="mt-1.5 text-xl font-extrabold">{liaison.name}</p>
            <p className="font-bold text-[var(--sb-primary)]">{liaison.title}</p>
            <p className="mt-3 text-[0.98rem] leading-relaxed text-ink-2">{liaison.text}</p>
            {liaison.pending && <Todo>Who acts as {possessive(short)} faculty liaison.</Todo>}
          </div>
          <div className="hub-card p-5">
            <p className="flex flex-wrap items-center justify-between gap-2">
              <span className="hub-kicker">Student ambassadors</span>
              <span className={`hub-status ${statusClass.school}`}>{hub.ambassadors.status}</span>
            </p>
            <p className="mt-2 text-[0.98rem] leading-relaxed text-ink-2">
              A student ambassador is a {short} student who helps classmates find out about Hack 876. {hub.ambassadors.summary}
            </p>
            <a href="#ambassadors" className={`mt-3 inline-block ${linkClass}`}>
              The ambassador role and toolkit
            </a>
          </div>
        </div>

        <div className="hub-card-soft mt-3 flex flex-wrap items-center justify-between gap-3 p-5">
          <div className="min-w-0">
            <h3 className="hub-h3">For school leadership</h3>
            <p className="mt-1 text-[0.97rem] leading-snug text-ink-2">
              {isPitch(brief)
                ? `The participation brief first prepared for ${possessive(short)} leadership is kept for reference. This page replaces it as the place for current information.`
                : `Questions about how ${short} works with Hack 876 can go to the organizing team${event.contactEmail ? ` at ${event.contactEmail}` : ""}.`}
            </p>
          </div>
          {isPitch(brief) && (
            <div className="flex flex-wrap gap-2">
              <Link href={`/schools/${brief.slug}/brief`} className="btn btn-secondary btn-sm">
                Original participation brief
              </Link>
              <a href={brief.pdf.href} download={brief.pdf.filename} className="btn btn-secondary btn-sm">
                <DownloadIcon /> PDF
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Student ambassadors                                                       */
/* -------------------------------------------------------------------------- */

function Ambassadors({ brief }: { brief: SchoolBrief }) {
  const hub = brief.hub!;
  const role = ambassadorRole(brief);
  const messages = shareMessages(brief);
  const url = hubUrl(brief);
  const graphics = mediaVariants.filter((v) => v.key !== "og" && v.key !== "qr");
  const sheets = schoolSheets(brief).filter((x) => x.key === "poster" || x.key === "students");
  return (
    <section id="ambassadors" aria-labelledby="hub-ambassadors" className="border-t border-ink/10 bg-paper py-14 sm:py-20">
      <div className="hub-wrap">
        <SectionHead id="hub-ambassadors" kicker="Student ambassador centre" title="Spread the word. Keep it simple.">
          <p>
            Ambassadors help eligible {brief.short} classmates hear about Hack 876 and find this page. The role is small and voluntary.{" "}
            {hub.ambassadors.summary}
          </p>
        </SectionHead>

        <div className="mt-8 grid gap-3 md:grid-cols-2">
          <div className="hub-card p-5">
            <h3 className="hub-h3">Your job</h3>
            <Bullets items={role.duties} dot="bg-emerald" />
          </div>
          <div className="hub-card p-5">
            <h3 className="hub-h3">What the role is not</h3>
            <Bullets items={role.not} dot="bg-bill" />
          </div>
        </div>

        <h3 className="hub-h3 mt-10">1. Share the link</h3>
        <div className="hub-card mt-3 flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={mediaHref(brief, "qr")} alt={`QR code that opens ${hubUrlShort(brief)}`} width={128} height={128} className="h-32 w-32 shrink-0 rounded-lg border-2 border-ink bg-white" loading="lazy" />
          <div className="min-w-0 flex-1">
            <p className="text-[0.97rem] text-ink-2">Always share this page, not a screenshot. It is kept up to date, and it links to registration.</p>
            <p className="mt-2 rounded-xl border-2 border-ink bg-cream px-4 py-2 font-mono text-sm font-bold break-all select-all">{url}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <CopyButton text={url} label="Copy link" />
              <a href={mediaHref(brief, "qr")} download={`Hack 876 x ${brief.school} - QR code.png`} className="btn btn-secondary btn-sm">
                <DownloadIcon /> QR code
              </a>
            </div>
          </div>
        </div>

        <h3 className="hub-h3 mt-10">2. Post a graphic</h3>
        <ul className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {graphics.map((g) => (
            <li key={g.key} className="hub-card flex flex-col p-3">
              <div className="grid aspect-square place-items-center overflow-hidden rounded-lg bg-cream-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={mediaHref(brief, g.key)} alt={`${g.title} graphic for ${brief.school}`} width={g.width} height={g.height} loading="lazy" className="max-h-full max-w-full object-contain" />
              </div>
              <p className="mt-2 font-extrabold leading-tight">{g.title}</p>
              <p className="text-xs font-bold text-ink-soft">PNG · {g.size}</p>
              <a href={mediaHref(brief, g.key)} download={`Hack 876 x ${brief.school} - ${g.title.replace(/\s*\/\s*/g, " and ")}.png`} className="btn btn-secondary btn-sm mt-2 self-start">
                <DownloadIcon /> Download
              </a>
            </li>
          ))}
        </ul>

        <h3 className="hub-h3 mt-10">3. Send a message</h3>
        <p className="mt-1 text-[0.97rem] text-ink-2">Copy, paste and send. Each message links back to this page.</p>
        <div className="mt-3 grid gap-3 lg:grid-cols-3">
          {messages.map((m) => (
            <div key={m.key} className="hub-card flex min-w-0 flex-col p-5">
              <p className="hub-kicker">{m.title}</p>
              <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed whitespace-pre-line text-ink-2">{m.text}</p>
              <CopyButton text={m.text} label="Copy message" context={`(${m.title})`} className="mt-4 self-start" />
            </div>
          ))}
        </div>

        <h3 className="hub-h3 mt-10">4. Print something</h3>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          {sheets.map((x) => (
            <li key={x.key} className="hub-card-soft flex flex-wrap items-center justify-between gap-3 p-4">
              <div className="min-w-0">
                <p className="font-extrabold">{x.title}</p>
                <p className="text-sm text-ink-soft">{x.blurb}</p>
              </div>
              <a href={x.href} download={x.filename} className="btn btn-secondary btn-sm">
                <DownloadIcon /> PDF
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Downloads                                                                 */
/* -------------------------------------------------------------------------- */

function Resources({ brief }: { brief: SchoolBrief }) {
  const groups = schoolResources(brief);
  return (
    <section id="resources" aria-labelledby="hub-resources" className="border-t border-ink/10 py-14 sm:py-20">
      <div className="hub-wrap">
        <SectionHead id="hub-resources" kicker="Resource library" title="Everything to download or share.">
          <p>Every file names {brief.school} and Hack 876, and is generated from the same information as this page.</p>
        </SectionHead>
        <div className="mt-8 grid gap-3 lg:grid-cols-2">
          {groups.map((g) => (
            <div key={g.key} className="hub-card p-5">
              <h3 className="hub-h3">{g.title}</h3>
              <ul className="mt-3 divide-y divide-ink/10">
                {g.items.map((it) => (
                  <li key={it.href} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-3">
                    <div className="min-w-0 flex-1 basis-56">
                      <p className="font-extrabold leading-tight">{it.title}</p>
                      <p className="mt-0.5 text-sm leading-snug text-ink-soft">
                        <span className="font-bold">{it.kind}</span> · {it.blurb}
                      </p>
                    </div>
                    {it.filename ? (
                      <a href={it.href} download={it.filename} className="btn btn-secondary btn-sm" aria-label={`Download ${it.title}`}>
                        <DownloadIcon /> Download
                      </a>
                    ) : (
                      <a
                        href={it.href}
                        {...(it.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="btn btn-secondary btn-sm"
                        aria-label={`Open ${it.title}${it.external ? " (opens in a new tab)" : ""}`}
                      >
                        Open <span aria-hidden>→</span>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Contact                                                                   */
/* -------------------------------------------------------------------------- */

function Contact({ brief }: { brief: SchoolBrief }) {
  const organizers = people.filter((p) => p.role === "organizer" && p.confirmed);
  return (
    <section id="contact" aria-labelledby="hub-contact" className="border-t border-ink/10 py-14 sm:py-20">
      <div className="hub-wrap">
        <SectionHead id="hub-contact" kicker="Contact" title="Who to ask." />
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          <div className="hub-card p-5">
            <h3 className="hub-h3">Questions about Hack 876</h3>
            <p className="mt-1.5 text-[0.98rem] leading-relaxed text-ink-2">
              For anything about the event, registration, consent, safety or costs, email the organizing team.
            </p>
            {event.contactEmail && (
              <a href={`mailto:${event.contactEmail}`} className="mt-3 inline-block text-lg font-extrabold text-[var(--sb-primary)] underline decoration-2 underline-offset-4">
                {event.contactEmail}
              </a>
            )}
            <div className="mt-4 flex items-center gap-3 border-t border-ink/10 pt-3">
              <div className="flex shrink-0 -space-x-3">
                {organizers.map((o) => (o.photo ? <Image key={o.name} src={o.photo} alt="" width={40} height={40} className="h-10 w-10 rounded-full border-2 border-ink object-cover" /> : null))}
              </div>
              <p className="text-sm leading-snug text-ink-soft">Organized by {organizers.map((o) => o.name).join(" and ")}.</p>
            </div>
          </div>
          <div className="hub-card p-5">
            <h3 className="hub-h3">Questions about {possessive(brief.short)} arrangements</h3>
            <p className="mt-1.5 text-[0.98rem] leading-relaxed text-ink-2">{brief.hub!.schoolChannel}</p>
            <p className="mt-4 border-t border-ink/10 pt-3 text-sm leading-snug text-ink-soft">
              This page is updated as details are confirmed. Registered students and their families are also told directly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
