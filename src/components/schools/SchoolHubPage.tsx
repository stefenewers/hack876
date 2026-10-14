import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { BirdMark } from "@/components/art/DoctorBird";
import { Icon } from "@/components/art/Icons";
import { Logo } from "@/components/art/Wordmark";
import { Footer } from "@/components/site/Footer";
import { buildTypes, eligibility, event, judging, people, schedule, schools, venue } from "@/data/event";
import { alumniSummary, organizerAlumniClause } from "@/data/alumni";
import { schoolAlumni, type SchoolBrief } from "@/data/schoolBriefs";
import {
  applicationAsks,
  applicationState,
  bringList,
  formsFor,
  hubCategories,
  hubFacts,
  hubFaqs,
  organizerNames,
  PROTOTYPE,
  PROTOTYPE_EXAMPLES,
  schoolSheets,
  statusLabel,
  TODO_LABEL,
  type HubFaq,
  type HubStatus,
} from "@/data/schoolHub";
import { FaqSearch } from "./FaqSearch";
import "./hub.css";

/*
 * A school's participation hub: everything a student, parent or teacher needs
 * to take part, in one place. Written for a reader who has never heard of
 * Hack 876 and knows nothing about how the school became involved. Rendered at /schools/<slug> for any school whose
 * brief has `hub` set. Event facts come from event.ts via schoolHub.ts; only
 * the relationship and community details come from the school's entry.
 */

const TEAM = `${eligibility.teamSize.min} to ${eligibility.teamSize.max}`;

const DAY_END = schedule[schedule.length - 1]?.time ?? "";

const statusClass: Record<HubStatus, string> = {
  confirmed: "border-ink bg-mint text-emerald-dark",
  tentative: "border-ink bg-sun-light text-ink",
};

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
  { href: "#apply", label: "How to apply" },
  { href: "#parents", label: "Parents" },
  { href: "#ai-tools", label: "AI tools" },
  { href: "#teachers", label: "Teachers" },
  { href: "#resources", label: "Downloads" },
  { href: "#contact", label: "Contact" },
];

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
          {applicationState.open && (
            <Link href="/apply" className="btn btn-primary btn-sm">
              Apply <span aria-hidden>→</span>
            </Link>
          )}
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

        <About brief={brief} />
        <Paths short={brief.short} />
        <Students brief={brief} byId={byId} />
        <Applying brief={brief} byId={byId} />
        <Parents byId={byId} />
        <AiTools />
        <Beyond byId={byId} />
        <Community brief={brief} />
        <Teachers brief={brief} />
        <Resources brief={brief} />

        <section id="questions" aria-labelledby="hub-questions" className="border-t border-ink/10 bg-cream-2 py-14 sm:py-20">
          <div className="hub-wrap">
            <SectionHead id="hub-questions" kicker="Questions and answers" title="Find an answer.">
              <p>
                Answers about eligibility, applying, preparation, safety, costs and what happens on the day. Type a question in your
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
  const facts = hubFacts(brief);
  return (
    <section aria-labelledby="hub-title" className="border-t border-ink/10 pt-8 pb-10 sm:pt-12 sm:pb-14">
      <div className="hub-wrap">
        <div className="flex items-center gap-3">
          <Image src={brief.crest} alt="" width={44} height={44} className="h-11 w-11 object-contain" />
          <p className="hub-kicker">Information for {brief.school} students, parents and teachers</p>
        </div>
        <h1 id="hub-title" className="mt-5 max-w-[20ch] text-[clamp(2.3rem,6.2vw,4.4rem)] leading-[1] font-extrabold tracking-[-0.04em] text-balance">
          {brief.short} × Hack 876. <span className="hub-under text-[var(--sb-primary)]">Everything you need to know.</span>
        </h1>
        <p className="hub-lead mt-5">
          Hack 876 is a one-day competition where secondary-school students work in small teams to build a solution to a real problem,
          then present it to judges who work in technology and business. No coding experience is needed. {brief.short} students in {formsFor(brief)} can apply.
        </p>

        <dl className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {facts.map((f) => (
            <div key={f.k} className="hub-card px-4 py-3.5">
              <dt className="flex items-center justify-between gap-2 text-xs font-extrabold tracking-[0.14em] text-ink-soft uppercase">
                {f.k}
                <Status s={f.status} />
              </dt>
              <dd className="mt-1 text-[1.08rem] leading-snug font-extrabold">{f.v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
          {applicationState.open ? (
            <Link href="/apply" className="btn btn-primary">
              Apply now <span aria-hidden>→</span>
            </Link>
          ) : (
            <span className="rounded-full border-2 border-dashed border-ink/40 px-4 py-2 font-bold text-ink-soft">{applicationState.label}</span>
          )}
          <a href="#about" className="font-bold underline decoration-2 underline-offset-4">
            New to this? Start with what Hack 876 is
          </a>
        </div>
        <p className="mt-4 text-sm text-ink-soft">
          Hack 876 is organized independently of {brief.school}. It costs nothing to apply, and applying does not guarantee a place.
        </p>
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
    { href: "#students", icon: "rocket", title: "I am a student", text: "Whether it is for you, what you will do, what to bring and how to apply." },
    { href: "#parents", icon: "heart", title: "I am a parent or guardian", text: "Date, venue, hours, food, supervision, consent, transport and costs." },
    { href: "#teachers", icon: "learn", title: "I am a teacher", text: "How to share it, which students suit it, and what the school is asked to do." },
    { href: "#questions", icon: "sticky", title: "I have a question", text: "Search the answers, or browse them by topic." },
  ];
  return (
    <section aria-label={`Where to start, for the ${short} community`} className="border-t border-ink/10 py-10 sm:py-14">
      <div className="hub-wrap">
        <p className="hub-kicker">Go straight to what you need</p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {paths.map((p) => (
            <li key={p.href}>
              <a href={p.href} className="hub-card group flex h-full flex-col p-5 transition-transform hover:-translate-y-0.5 hover:shadow-[3px_4px_0_0_var(--color-ink)]">
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
          <a href="#apply" className="font-bold text-ink underline decoration-2 underline-offset-4">
            See how to apply
          </a>
          {applicationState.open && (
            <Link href="/apply" className="font-bold text-[var(--sb-primary)] underline decoration-2 underline-offset-4">
              or start your application now
            </Link>
          )}
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Applications and selection                                                */
/* -------------------------------------------------------------------------- */

function Applying({ brief, byId }: { brief: SchoolBrief; byId: (id: string) => HubFaq }) {
  const steps: { t: string; d: string; todo?: string }[] = [
    { t: "Check you are eligible", d: `You need to be in ${formsFor(brief)}, at ${brief.short} or another school in the Hack 876 network.` },
    {
      t: "Complete the application yourself",
      d: "It is an online form on the Hack 876 website. You can apply alone or with friends. Each student fills in their own form.",
    },
    {
      t: "Tell a teacher, if you like",
      d: byId("recommendation").a,
      todo: byId("recommendation").todo,
    },
    { t: "The organizing team reviews applications", d: byId("selection").a, todo: byId("selection").todo },
    {
      t: "You receive a decision",
      d: "Accepted students are sent a consent form for a parent or guardian to sign, and the details for the day.",
      todo: byId("deadline").todo,
    },
    { t: "Teams are confirmed", d: `Teams are ${TEAM} students. Students without a team are placed in one, which may include students from other schools.`, todo: byId("team").todo },
  ];
  return (
    <section id="apply" aria-labelledby="hub-apply" className="border-t border-ink/10 py-14 sm:py-20">
      <div className="hub-wrap">
        <SectionHead id="hub-apply" kicker="How to apply" title="How to apply, and what happens next.">
          <p>
            {applicationState.label}. Places are limited to about {eligibility.maxHackers} students across all schools, so applying
            does not guarantee a place.
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
              <h3 className="hub-h3">What the application asks for</h3>
              <ul className="mt-3 space-y-2 text-[0.98rem] leading-snug text-ink-2">
                {applicationAsks.map((a) => (
                  <li key={a} className="flex gap-2.5">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--sb-primary)]" />
                    {a}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-ink-soft">There is no test. The written answers show what a student is curious about.</p>
              {applicationState.open ? (
                <Link href="/apply" className="btn btn-primary mt-5 w-full">
                  Start the application <span aria-hidden>→</span>
                </Link>
              ) : (
                <p className="mt-5 rounded-xl border-2 border-dashed border-ink/40 px-4 py-3 text-center font-bold text-ink-soft">{applicationState.label}</p>
              )}
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

function Parents({ byId }: { byId: (id: string) => HubFaq }) {
  const topics: { title: string; id: string; icon: string }[] = [
    { title: "Date", id: "when", icon: "clock" },
    { title: "Venue", id: "where", icon: "pin" },
    { title: "Hours", id: "overnight", icon: "clock" },
    { title: "Supervision and safety", id: "supervision", icon: "people" },
    { title: "Consent", id: "consent", icon: "notebook" },
    { title: "Food", id: "food", icon: "patty" },
    { title: "Getting there and back", id: "transport", icon: "move" },
    { title: "Costs", id: "cost", icon: "business" },
    { title: "Laptops and devices", id: "laptop", icon: "laptop" },
    { title: "Contact on the day", id: "emergency", icon: "badge" },
    { title: "Access, medical and dietary needs", id: "access", icon: "wellbeing" },
  ];
  return (
    <section id="parents" aria-labelledby="hub-parents" className="border-t border-ink/10 bg-paper py-14 sm:py-20">
      <div className="hub-wrap">
        <SectionHead id="hub-parents" kicker="For parents and guardians" title="What parents and guardians need to know.">
          <p>
            Hack 876 is a supervised, single-day event at a hotel in Kingston. Each card below gives what is known. Where a detail is
            marked &ldquo;{TODO_LABEL}&rdquo;, families will be told before a student is asked to accept a place.
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
          <span className="font-bold text-ink">Next step:</span> if your child would like to take part, they complete{" "}
          <a href="#apply" className="font-bold text-ink underline decoration-2 underline-offset-4">
            the application
          </a>{" "}
          themselves. Nothing needs to be signed or paid at that stage.
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
    { t: "Students under 18 can take part.", d: "Age limits apply to particular tools, not to the event." },
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
          The list of approved tools, the age limit for each, and the consent form. All three will be sent to accepted students and
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
                "A project to describe on a university or job application.",
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
/*  Teachers: recommendations, liaison, ambassadors                           */
/* -------------------------------------------------------------------------- */

function Teachers({ brief }: { brief: SchoolBrief }) {
  const hub = brief.hub!;
  const liaison = hub.liaison ?? { name: brief.liaison.name, title: brief.liaison.title, text: brief.liaison.role, pending: false };
  const split = [
    {
      title: "What Hack 876 handles",
      items: ["Applications and selecting participants", "Consent forms for parents and guardians", "The venue, schedule, food, mentors and judges", "All communication with students and families"],
    },
    {
      title: `What stays with ${brief.short}`,
      items: ["Sharing the opportunity with eligible students", "Recommending students, if teachers wish to", `Any school permission ${brief.short} requires for outside activities`],
    },
  ];
  return (
    <section id="teachers" aria-labelledby="hub-teachers" className="border-t border-ink/10 py-14 sm:py-20">
      <div className="hub-wrap">
        <SectionHead id="hub-teachers" kicker="For teachers" title={`How ${brief.short} teachers can support students.`}>
          <p>
            {brief.short} is not asked to pay, host or organize anything. Teachers can help by telling eligible students about Hack 876 and,
            if they wish, recommending students who would enjoy it.
          </p>
        </SectionHead>

        <div className="hub-card-soft mt-8 p-5">
          <h3 className="hub-h3">{brief.short}&rsquo;s involvement</h3>
          <p className="mt-1.5 text-[0.98rem] leading-relaxed text-ink-2">{hub.status}</p>
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-2">
          <div className="hub-card p-5">
            <h3 className="hub-h3">How to share it and recommend students</h3>
            <ol className="mt-3 space-y-2.5 text-[0.98rem] leading-snug text-ink-2">
              {hub.faculty.process.map((t, i) => (
                <li key={t} className="flex gap-3">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--sb-primary)] text-xs font-extrabold text-white">{i + 1}</span>
                  {t}
                </li>
              ))}
            </ol>
            <a href="#resources" className="mt-3 inline-block font-bold text-[var(--sb-primary)] underline decoration-2 underline-offset-4">
              Download the flyer and information sheets
            </a>
          </div>
          <div className="hub-card p-5">
            <h3 className="hub-h3">Students who are a good fit</h3>
            <ul className="mt-3 space-y-2 text-[0.98rem] leading-snug text-ink-2">
              {hub.faculty.profiles.map((t) => (
                <li key={t} className="flex gap-2.5">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--sb-primary)]" />
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-ink-soft">Programming experience is not required.</p>
          </div>

          {split.map((b) => (
            <div key={b.title} className="hub-card p-5">
              <h3 className="hub-h3">{b.title}</h3>
              <ul className="mt-3 space-y-2 text-[0.98rem] leading-snug text-ink-2">
                {b.items.map((t) => (
                  <li key={t} className="flex gap-2.5">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--sb-primary)]" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="hub-card p-5">
            <p className="hub-kicker">Faculty liaison</p>
            <p className="mt-1.5 text-xl font-extrabold">{liaison.name}</p>
            <p className="font-bold text-[var(--sb-primary)]">{liaison.title}</p>
            <p className="mt-3 text-[0.98rem] leading-relaxed text-ink-2">{liaison.text}</p>
            {liaison.pending && <Todo>Who acts as {brief.short}&rsquo;s faculty liaison.</Todo>}
          </div>
          <div className="hub-card p-5">
            <p className="hub-kicker">Student ambassadors</p>
            <p className="mt-1.5 text-[0.98rem] leading-relaxed text-ink-2">
              A student ambassador is a {brief.short} student who helps classmates find out about Hack 876. {hub.ambassadors.summary}
            </p>
            <ul className="mt-3 space-y-2 text-[0.98rem] leading-snug text-ink-2">
              {hub.ambassadors.duties.map((t) => (
                <li key={t} className="flex gap-2.5">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--sb-primary)]" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Downloads                                                                 */
/* -------------------------------------------------------------------------- */

function Resources({ brief }: { brief: SchoolBrief }) {
  const sheets = schoolSheets(brief);
  const link = `${event.siteUrl.replace(/^https?:\/\/(www\.)?/, "")}/schools/${brief.slug}`;
  const items = [
    ...sheets.map((s) => ({ title: s.title, blurb: s.blurb, href: s.href, filename: s.filename, kind: "PDF · 1 page" })),
    { title: `Presentation for ${brief.short} staff`, blurb: `A slide presentation introducing Hack 876 to ${brief.short} staff and leadership.`, href: brief.pdf.href, filename: brief.pdf.filename, kind: "PDF · slides" },
  ];
  return (
    <section id="resources" aria-labelledby="hub-resources" className="border-t border-ink/10 bg-paper py-14 sm:py-20">
      <div className="hub-wrap">
        <SectionHead id="hub-resources" kicker="Downloads" title="Flyers and information sheets to share.">
          <p>One-page PDFs to print, pin to a noticeboard or send in a class or parent group.</p>
        </SectionHead>
        <ul className="mt-8 grid gap-3 md:grid-cols-2">
          {items.map((it) => (
            <li key={it.href} className="hub-card flex flex-col p-5">
              <p className="text-xs font-extrabold tracking-[0.14em] text-ink-soft uppercase">{it.kind}</p>
              <h3 className="hub-h3 mt-1">{it.title}</h3>
              <p className="mt-1.5 flex-1 text-[0.97rem] leading-snug text-ink-2">{it.blurb}</p>
              <a href={it.href} download={it.filename} className="btn btn-secondary btn-sm mt-4 self-start">
                <svg viewBox="0 0 20 20" aria-hidden className="h-4 w-4">
                  <path d="M10 3v9m0 0-3.5-3.5M10 12l3.5-3.5M4 14.5V16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-1.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Download PDF
              </a>
            </li>
          ))}
        </ul>
        <div className="hub-card-soft mt-3 flex flex-wrap items-center justify-between gap-3 p-5">
          <div>
            <h3 className="hub-h3">Link to this page</h3>
            <p className="mt-1 text-[0.97rem] text-ink-2">Copy and send this address to students, parents or colleagues.</p>
          </div>
          <p className="rounded-xl border-2 border-ink bg-cream px-4 py-2 font-mono text-sm font-bold break-all select-all">{link}</p>
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
              For anything about the event, applications, consent, safety or costs, email the organizing team.
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
            <h3 className="hub-h3">Questions about {brief.short}&rsquo;s arrangements</h3>
            <p className="mt-1.5 text-[0.98rem] leading-relaxed text-ink-2">{brief.hub!.schoolChannel}</p>
            <p className="mt-4 border-t border-ink/10 pt-3 text-sm leading-snug text-ink-soft">
              This page is updated as details are confirmed. Accepted students and their families are also told directly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
