import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { BirdMark } from "@/components/art/DoctorBird";
import { HackerPass } from "@/components/art/HackerPass";
import { Icon } from "@/components/art/Icons";
import { Logo } from "@/components/art/Wordmark";
import { DownloadDeck } from "@/components/proposal/DownloadDeck";
import { applications, buildTypes, eligibility, event, eventWhen, parents, people, prizes, prizesNote, schedule } from "@/data/event";
import type { SchoolBrief } from "@/data/schoolBriefs";
import "@/components/proposal/proposal.css";
import "./school.css";

/*
 * A school participation brief. Event-wide facts come from event.ts; only the
 * school's own story comes from its SchoolBrief entry. Nothing here may state
 * that the school is participating, has endorsed Hack 876, or has a set
 * number of places.
 */

const TEAM_SIZE = `${eligibility.teamSize.min}–${eligibility.teamSize.max}`;
const DAY_START = schedule[0]?.time;
const DAY_END = schedule[schedule.length - 1]?.time;
/* The site copy ends "apply here", which points nowhere inside a brief. */
const HOW_TO_GET_IN = eligibility.howToGetIn.replace(/ here\.$/, ".");

function Label({ n, children }: { n?: string; children: ReactNode }) {
  return (
    <p className="sb-label flex items-center gap-3">
      {n && <span className="sb-n">{n}</span>}
      <span>{children}</span>
    </p>
  );
}

export function SchoolBriefPage({ brief }: { brief: SchoolBrief }) {
  const vars = {
    "--lp-deck-label": `"Hack 876 × ${brief.short}"`,
    "--sb-primary": brief.colors.primary,
    "--sb-secondary": brief.colors.secondary,
    "--sb-ink": brief.colors.ink,
  } as CSSProperties;

  return (
    <div className="lp sb" style={vars}>
      <header className="lp-wrap flex items-center justify-between gap-4 py-5">
        <Link href="/schools" className="flex items-center gap-2 rounded-lg" aria-label="Hack 876 school resources">
          <BirdMark className="h-6 w-10" />
          <Logo className="text-[1.4rem]" />
        </Link>
        <DownloadDeck href={brief.pdf.href} filename={brief.pdf.filename} label="Download brief (PDF)" />
      </header>

      <main id="main">
        <div className="lp-page">
          <Hero brief={brief} />
        </div>
        <div className="lp-page">
          <Fit brief={brief} />
        </div>
        <div className="lp-page">
          <TheEvent />
        </div>
        <div className="lp-page">
          <Gains />
        </div>
        <div className="lp-page">
          <BeforeUniversity />
        </div>
        <div className="lp-page">
          <Participation brief={brief} />
        </div>
        <div className="lp-page">
          <Prizes />
        </div>
        <div className="lp-page">
          <Bridge brief={brief} />
        </div>
        <div className="lp-page">
          <Next brief={brief} />
        </div>
        <div className="lp-page">
          <Closing brief={brief} />
        </div>
      </main>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  1 · Hero                                                                  */
/* -------------------------------------------------------------------------- */

function Hero({ brief }: { brief: SchoolBrief }) {
  const meta = [event.city.split(",")[0], `${eventWhen.short}${eventWhen.note}`, `~${eligibility.maxHackers} builders`, `Teams of ${TEAM_SIZE}`];
  return (
    <section aria-labelledby="sb-hero" className="lp-hero relative flex min-h-[calc(100svh-5rem)] flex-col justify-between overflow-hidden border-y lp-rule">
      <div className="lp-wrap w-full pt-12 sm:pt-16">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="sb-label">
            {brief.school} · Participation brief
          </p>
          <div className="flex items-center gap-3 text-sm font-extrabold">
            <Logo className="text-[1.15rem]" />
            <span aria-hidden className="text-ink-soft">×</span>
            <Image src={brief.crest} alt="" width={44} height={44} className="h-11 w-11 object-contain" />
            <span>{brief.short}</span>
          </div>
        </div>

        <div className="mt-12 grid items-center gap-12 sm:mt-14 lg:grid-cols-[1.5fr_1fr] print:grid-cols-[1.6fr_1fr]">
          <div>
            <h1 id="sb-hero" className="sb-h max-w-[22ch] text-[clamp(2.4rem,5.2vw,4.6rem)] print:text-[5rem]">
              {brief.hero.lead}{" "}
              <span className="sb-under text-[var(--sb-primary)]">{brief.hero.line}</span>
            </h1>
            <div className="lp-prose mt-9">
              <p>
                Hack 876 is a one-day build competition bringing about {eligibility.maxHackers} Jamaican secondary-school students
                together to turn ideas into working prototypes.
              </p>
            </div>
            <div className="lp-no-print mt-9 flex flex-wrap items-center gap-4">
              <a href="#fit" className="btn btn-primary">
                Explore {brief.short} × Hack 876 <span aria-hidden>↓</span>
              </a>
              <a href={brief.pdf.href} download={brief.pdf.filename} className="btn btn-secondary">
                Download school brief
              </a>
            </div>
          </div>
          <HackerPass lanyard={brief.colors.primary} className="hidden max-w-[16rem] lg:flex print:flex print:max-w-[19rem]" />
        </div>
      </div>

      <div className="lp-wrap w-full pt-12 pb-10">
        <ul className="flex flex-wrap gap-x-5 gap-y-2 border-t lp-rule pt-5 text-[0.8rem] font-extrabold tracking-[0.14em] text-ink-soft uppercase">
          {meta.map((m, i) => (
            <li key={m} className="flex items-center gap-5">
              {i > 0 && <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[var(--sb-secondary)]" />}
              {m}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  2 · Why this school                                                       */
/* -------------------------------------------------------------------------- */

function Fit({ brief }: { brief: SchoolBrief }) {
  const { fit } = brief;
  const src = fit.quote ? brief.sources[fit.quote.source - 1] : undefined;
  return (
    <section id="fit" aria-labelledby="sb-fit" className="lp-section scroll-mt-6 bg-paper">
      <div className="lp-wrap grid gap-12 lg:grid-cols-[1fr_1.1fr] print:grid-cols-[1fr_1.1fr] print:gap-12">
        <div>
          <Label n="01">Why {brief.short}</Label>
          <h2 id="sb-fit" className="sb-h sb-lg mt-6 max-w-[14ch]" data-reveal>
            {fit.headline}
          </h2>
          <div className="lp-prose mt-7" data-reveal>
            <p>{fit.lead}</p>
            <p>{fit.bridge}</p>
          </div>
          {brief.motto && (
            <div className="mt-8 flex items-center gap-4" data-reveal>
              <span aria-hidden className="sb-steps">
                <span />
                <span />
                <span />
                <span />
              </span>
              <p>
                <span className="block font-extrabold tracking-wide text-[var(--sb-primary)] italic">{brief.motto.original}</span>
                <span className="block text-sm text-ink-soft">{brief.motto.translation}</span>
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <ul className="grid gap-3 sm:grid-cols-2 print:grid-cols-2" data-reveal>
            {fit.points.map((p) => (
              <li key={p.k} className="sb-card border-t-[6px] border-t-[var(--sb-primary)] p-4">
                <p className="text-lg font-extrabold">{p.k}</p>
                <p className="mt-1 text-[0.98rem] leading-snug text-ink-2 print:text-[1.25rem]">{p.v}</p>
              </li>
            ))}
          </ul>
          {fit.quote && (
            <figure className="rounded-2xl border-l-[6px] border-[var(--sb-secondary)] bg-[color-mix(in_srgb,var(--sb-primary)_7%,transparent)] px-5 py-4" data-reveal>
              <blockquote className="text-[1.08rem] leading-snug font-semibold text-[var(--sb-ink)] print:text-[1.35rem]">
                &ldquo;{fit.quote.text}&rdquo;
              </blockquote>
              <figcaption className="mt-2 text-sm text-ink-soft">
                {fit.quote.by}
                {src && (
                  <>
                    {" · "}
                    <a href={src.href} target="_blank" rel="noopener noreferrer" className="underline decoration-ink/30 underline-offset-2 hover:decoration-ink">
                      UTech Jamaica, March 2026
                    </a>
                  </>
                )}
              </figcaption>
            </figure>
          )}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  3 · The event                                                             */
/* -------------------------------------------------------------------------- */

const VERBS = [
  { v: "Think", d: "Find a real problem worth solving." },
  { v: "Build", d: "Turn the idea into a working prototype." },
  { v: "Ship", d: "Get it running before the clock stops." },
  { v: "Present", d: "Demo it to judges and explain the decisions." },
];

function TheEvent() {
  const numbers = [
    { v: `~${eligibility.maxHackers}`, l: "Total builders", c: "bg-emerald text-white", r: "-2deg" },
    { v: TEAM_SIZE, l: "Per team", c: "bg-sun", r: "1.5deg" },
    { v: "1", l: "Day", c: "bg-[var(--sb-primary)] text-white", r: "-1deg" },
  ];
  return (
    <section aria-labelledby="sb-event" className="lp-section">
      <div className="lp-wrap">
        <Label n="02">The event</Label>
        <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end print:grid-cols-[1.1fr_1fr] print:items-end">
          <h2 id="sb-event" className="sb-h sb-lg max-w-[14ch]" data-reveal>
            One day. Build something real.
          </h2>
          <ul className="grid grid-cols-3 gap-3 sm:gap-4">
            {numbers.map((n, i) => (
              <li
                key={n.l}
                data-reveal="pop"
                style={{ rotate: n.r, "--reveal-rot": n.r, "--reveal-delay": `${i * 80}ms` } as CSSProperties}
                className={`sticker grid place-items-center px-2 py-5 text-center ${n.c}`}
              >
                <span className="lp-num text-[clamp(2.2rem,5.5vw,3.8rem)] print:text-[4.6rem]">{n.v}</span>
                <span className="mt-1 text-[0.68rem] font-extrabold tracking-[0.12em] uppercase sm:text-xs print:text-[1rem]">{n.l}</span>
              </li>
            ))}
          </ul>
        </div>

        <ol className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 print:grid-cols-4">
          {VERBS.map((s, i) => (
            <li key={s.v} className="sb-card relative p-5" data-reveal style={{ "--reveal-delay": `${i * 70}ms` } as CSSProperties}>
              <p className="text-xs font-extrabold tracking-[0.16em] text-[var(--sb-primary)] uppercase print:text-[0.95rem]">Step {i + 1}</p>
              <p className="display mt-2 text-[2.2rem] leading-none">{s.v}</p>
              <p className="mt-2 text-[1rem] leading-snug text-ink-2 print:text-[1.3rem]">{s.d}</p>
              {i < VERBS.length - 1 && (
                <span aria-hidden className="absolute top-1/2 -right-3 z-10 hidden h-6 w-6 -translate-y-1/2 place-items-center rounded-full border-2 border-ink bg-sun text-sm font-extrabold lg:grid print:grid">
                  →
                </span>
              )}
            </li>
          ))}
        </ol>

        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
          <ul className="flex flex-wrap gap-2">
            {buildTypes.map((b) => (
              <li key={b.label} className="rounded-full border-2 border-ink/70 bg-paper px-3 py-1 text-sm font-bold print:text-[1.1rem]">
                {b.label}
              </li>
            ))}
          </ul>
          <p className="text-sm font-semibold text-ink-soft print:text-[1.1rem]">Not an AI-only hackathon. Teams build whatever the problem needs.</p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  4 · What students gain                                                    */
/* -------------------------------------------------------------------------- */

const GAINS = [
  { k: "Teamwork", v: "Working with people who think differently.", i: "people" },
  { k: "Scoping", v: "Learning what can really be built in a day.", i: "clock" },
  { k: "Technical problem solving", v: "Turning a concept into something that works.", i: "gear" },
  { k: "Decision making", v: "Choosing between ideas under real constraints.", i: "sticky" },
  { k: "Communication", v: "Explaining what they built to judges and peers.", i: "badge" },
  { k: "Resilience", v: "Shipping something even when it isn’t perfect.", i: "rocket" },
  { k: "Exposure", v: "Meeting students and professionals beyond their usual circle.", i: "pin" },
  { k: "Confidence", v: "Moving from using technology to making it.", i: "spark" },
];

function Gains() {
  return (
    <section aria-labelledby="sb-gain" className="lp-section bg-cream-2">
      <div className="lp-wrap">
        <Label n="03">What students gain</Label>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <h2 id="sb-gain" className="sb-h sb-lg" data-reveal>
            More than a project.
          </h2>
          <p className="lp-prose max-w-md" data-reveal>
            It won&rsquo;t decide anyone&rsquo;s career. It gives students a useful early signal about whether building technology
            excites them.
          </p>
        </div>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 print:grid-cols-4">
          {GAINS.map((g, i) => (
            <li key={g.k} className="sb-card flex gap-3 p-4" data-reveal style={{ "--reveal-delay": `${(i % 4) * 60}ms` } as CSSProperties}>
              <Icon name={g.i} className="h-10 w-10 shrink-0" />
              <div>
                <p className="font-extrabold leading-tight print:text-[1.35rem]">{g.k}</p>
                <p className="mt-1 text-[0.95rem] leading-snug text-ink-2 print:text-[1.2rem]">{g.v}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  5 · Before university                                                     */
/* -------------------------------------------------------------------------- */

const TASTE = [
  "University hackathons",
  "Engineering teamwork",
  "Product building",
  "Software development",
  "Pitching an idea",
  "Talking through a project in an interview",
  "Portfolio work",
  "Working across disciplines",
];

function BeforeUniversity() {
  return (
    <section aria-labelledby="sb-before" className="lp-section lp-dark lp-grid-bg">
      <div className="lp-wrap grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:items-center print:grid-cols-[1.2fr_1fr] print:items-center">
        <div>
          <Label n="04">Before university</Label>
          <h2 id="sb-before" className="sb-h sb-lg mt-6" data-reveal>
            Before the internship.
            <br />
            Before university.
            <br />
            Before the first job.
          </h2>
          <p className="display mt-6 text-[clamp(2rem,4.4vw,3.4rem)] leading-none text-sun print:text-[3.6rem]" data-reveal>
            Give them the first build.
          </p>
        </div>
        <div data-reveal>
          <div className="lp-prose">
            <p>
              University programs increasingly expect collaboration, coding, product thinking, research and fast prototyping.
              Most students meet all of that at once for the first time in their first year.
            </p>
            <p>Hack 876 gives them an early taste of:</p>
          </div>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2 print:grid-cols-2">
            {TASTE.map((t) => (
              <li key={t} className="flex items-baseline gap-2.5 font-semibold text-cream print:text-[1.25rem]">
                <span aria-hidden className="h-2 w-2 shrink-0 translate-y-[-0.1em] rounded-full bg-sun" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  6 · Participation                                                         */
/* -------------------------------------------------------------------------- */

function Participation({ brief }: { brief: SchoolBrief }) {
  const asks = [
    "Share the opportunity with relevant students.",
    `Encourage interested ${eligibility.forms} students to apply.`,
    "Point us to students from Computer Science, IT, Maths, the Sciences, Robotics, Design, Business or anywhere else they shine.",
    "Recommend especially promising students, if you’d like to.",
    "Name a school-side contact for coordination.",
    "Help students and parents understand the opportunity as the event approaches.",
  ];
  return (
    <section aria-labelledby="sb-part" className="lp-section bg-paper">
      <div className="lp-wrap grid gap-12 lg:grid-cols-[1fr_1fr] print:grid-cols-[1fr_1fr] print:gap-12">
        <div>
          <Label n="05">Participation</Label>
          <h2 id="sb-part" className="sb-h sb-lg mt-6" data-reveal>
            {brief.short} in the room.
          </h2>
          <div className="lp-prose mt-6" data-reveal>
            <p>
              Hack 876 is for students in {eligibility.forms}. {HOW_TO_GET_IN} No place is assumed until applications and
              selection happen.
            </p>
          </div>
          <div className="sb-card mt-6 flex flex-wrap items-center gap-5 p-5" data-reveal>
            <div>
              <p className="lp-num text-[3.4rem] text-[var(--sb-primary)] print:text-[4rem]">
                {brief.planningRange.min}–{brief.planningRange.max}
              </p>
              <span className="sb-tag mt-1 border-2 border-dashed border-ink/40 text-ink-soft">Planning range · not guaranteed</span>
            </div>
            <p className="min-w-[14rem] flex-1 text-[0.98rem] leading-snug text-ink-2 print:text-[1.2rem]">
              For early planning, a cohort of roughly {brief.planningRange.min}–{brief.planningRange.max} {brief.short} students
              fits the scale we&rsquo;re considering. With about {eligibility.maxHackers} places across participating schools, final
              representation depends on applications and overall capacity.
            </p>
          </div>
          <p className="mt-4 text-[0.98rem] leading-snug text-ink-2 print:text-[1.2rem]">
            Teams of {TEAM_SIZE}. Students can apply solo or with friends, and teams may mix schools. Final team-formation rules are
            still being finalized.
          </p>
        </div>

        <div data-reveal>
          <p className="sb-label">What we&rsquo;d like from {brief.short}</p>
          <ol className="mt-4 grid gap-2.5">
            {asks.map((a, i) => (
              <li key={a} className="flex gap-3 border-b lp-rule pb-2.5 text-[1.02rem] leading-snug print:text-[1.25rem]">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--sb-primary)] text-sm font-extrabold text-white">{i + 1}</span>
                <span className="pt-0.5">{a}</span>
              </li>
            ))}
          </ol>
          <p className="mt-5 rounded-xl bg-[color-mix(in_srgb,var(--sb-secondary)_28%,transparent)] px-4 py-3 text-[0.98rem] font-semibold print:text-[1.2rem]">
            We&rsquo;re not asking {brief.short} for financial support, and the school doesn&rsquo;t need to run its own selection
            competition unless it wants to.
          </p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  7 · Prizes                                                                */
/* -------------------------------------------------------------------------- */

function Prizes() {
  const podium = prizes.filter((p) => p.place).sort((a, b) => (a.place ?? 0) - (b.place ?? 0));
  const special = prizes.filter((p) => !p.place);
  return (
    <section aria-labelledby="sb-prizes" className="lp-section">
      <div className="lp-wrap">
        <Label n="06">Competition</Label>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <h2 id="sb-prizes" className="sb-h sb-lg max-w-[16ch]" data-reveal>
            Build it. Present it. Compete for it.
          </h2>
          <p className="lp-prose max-w-md" data-reveal>
            Prizes across overall placement and special categories. The exact package will keep developing as sponsors are
            finalized, and participating schools will get updates.
          </p>
        </div>
        <div className="mt-10 grid gap-4 lg:grid-cols-2 print:grid-cols-2">
          {[
            { title: "Overall placement", list: podium },
            { title: "Special awards", list: special },
          ].map((g) => (
            <div key={g.title} data-reveal>
              <p className="sb-label">{g.title}</p>
              <ul className="mt-3 grid gap-2.5">
                {g.list.map((p) => (
                  <li key={p.name} className="sb-card flex items-center gap-4 px-4 py-3">
                    <Icon name={p.icon} className="h-10 w-10 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="font-extrabold print:text-[1.35rem]">{p.name}</p>
                      <p className="text-sm text-ink-soft print:text-[1.1rem]">{p.line}</p>
                    </div>
                    {p.reward && <span className="shrink-0 text-right text-sm font-bold print:text-[1.1rem]">{p.reward}</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-5 text-sm text-ink-soft print:text-[1.05rem]">
          Categories are set. Prize items are {prizesNote ? "tentative and may change" : "confirmed"}. Prizes are a bonus, not the
          reason to come.
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  8 · The bridge                                                            */
/* -------------------------------------------------------------------------- */

function Bridge({ brief }: { brief: SchoolBrief }) {
  const { liaison } = brief;
  const organizers = people.filter((p) => p.role === "organizer" && p.confirmed);
  return (
    <section aria-labelledby="sb-bridge" className="lp-section bg-cream-2">
      <div className="lp-wrap grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center print:grid-cols-[1fr_1.1fr] print:items-center">
        <div>
          <Label n="07">Your bridge to Hack 876</Label>
          <h2 id="sb-bridge" className="sb-h sb-lg mt-6 max-w-[13ch]" data-reveal>
            One relationship at a time.
          </h2>
          <div className="lp-prose mt-7" data-reveal>
            <p>
              Hack 876 grows through people who care about both their school and what students could build. For {brief.short},
              that starts with {liaison.name.split(" ")[0]}.
            </p>
          </div>
        </div>

        <div className="grid gap-4" data-reveal>
          <div className="sb-card overflow-hidden">
            <div className="flex items-center gap-5 p-5">
              {liaison.photo && (
                <Image src={liaison.photo} alt={liaison.name} width={96} height={96} className="h-24 w-24 shrink-0 rounded-2xl border-2 border-ink object-cover" />
              )}
              <div>
                <p className="text-2xl font-extrabold print:text-[2.1rem]">{liaison.name}</p>
                <p className="mt-0.5 font-bold text-[var(--sb-primary)] print:text-[1.2rem]">{liaison.title}</p>
                <p className="mt-1 text-sm text-ink-soft print:text-[1.05rem]">{liaison.credentials}</p>
              </div>
            </div>
            <p className="border-t-2 border-ink/10 px-5 py-4 text-[1rem] leading-snug text-ink-2 print:text-[1.25rem]">{liaison.role}</p>
          </div>
          <div className="sb-card flex items-center gap-4 p-5">
            <div className="flex shrink-0 -space-x-3">
              {organizers.map((o) =>
                o.photo ? (
                  <Image key={o.name} src={o.photo} alt={o.name} width={48} height={48} className="h-12 w-12 rounded-full border-2 border-ink object-cover" />
                ) : null,
              )}
            </div>
            <p className="text-[1rem] leading-snug text-ink-2 print:text-[1.2rem]">
              <strong className="text-ink">The Hack 876 organizing team</strong> runs event operations, applications and all
              official communication with students and parents.
            </p>
          </div>
          <p className="text-sm text-ink-soft print:text-[1rem]">{liaison.note}</p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  9 · What happens next                                                     */
/* -------------------------------------------------------------------------- */

function Next({ brief }: { brief: SchoolBrief }) {
  const steps = [
    { k: "Now", v: `Build the relationship with ${brief.short}.` },
    { k: "Next", v: "Confirm a school contact and a student outreach path." },
    { k: "Then", v: "Confirm the date and venue, then applications and logistics." },
    { k: "Before the event", v: "Student and parent briefing, preparation and requirements." },
    { k: "Event day", v: "Hack 876." },
  ];
  const pendingTopics = parents.filter((p) => p.pending).map((p) => p.topic.toLowerCase());
  const board = [
    {
      k: "Decided",
      c: "bg-mint",
      items: [
        "One-day build competition",
        eligibility.forms,
        `About ${eligibility.maxHackers} places`,
        "Schools recommend, students apply",
        ...(applications.status === "open" ? ["Applications are open"] : []),
      ],
    },
    {
      k: "Planned",
      c: "bg-sun-light",
      items: [
        ...(eventWhen.tentative ? [`Tentative date: ${eventWhen.long}`] : []),
        DAY_START && DAY_END ? `A ${DAY_START} to ${DAY_END} day` : "A full-day schedule",
        "Lunch on the day",
        "Overall and special prize categories",
        "Industry judges and mentors",
      ],
    },
    {
      k: "Being finalized",
      c: "bg-cream",
      items: [
        eventWhen.tentative ? "Confirming the date, and the venue" : "Venue",
        "School-level allocations and team rules",
        "Cost and transport",
        "Prize items",
        ...(pendingTopics.length ? [`Family details: ${pendingTopics.slice(0, 3).join(", ")}`] : []),
      ],
    },
  ];
  return (
    <section aria-labelledby="sb-next" className="lp-section bg-paper">
      <div className="lp-wrap">
        <Label n="08">What happens next</Label>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <h2 id="sb-next" className="sb-h sb-lg max-w-[16ch]" data-reveal>
            We&rsquo;ll fill in the details together.
          </h2>
          <p className="max-w-sm text-lg font-bold text-[var(--sb-primary)] print:text-[1.4rem]" data-reveal>
            {brief.short} doesn&rsquo;t need every answer today to join the conversation.
          </p>
        </div>

        <ol className="mt-9 grid gap-3 sm:grid-cols-5 print:grid-cols-5">
          {steps.map((s, i) => (
            <li key={s.k} className="relative border-t-[5px] pt-3" style={{ borderColor: i === steps.length - 1 ? "var(--sb-secondary)" : "var(--sb-primary)" }}>
              <p className="text-xs font-extrabold tracking-[0.14em] text-[var(--sb-primary)] uppercase print:text-[0.95rem]">{s.k}</p>
              <p className="mt-1 text-[0.98rem] leading-snug font-semibold print:text-[1.2rem]">{s.v}</p>
            </li>
          ))}
        </ol>

        <div className="mt-8 grid gap-3 md:grid-cols-3 print:grid-cols-3">
          {board.map((b) => (
            <div key={b.k} className="sb-card p-4">
              <span className={`sb-tag border-2 border-ink ${b.c}`}>{b.k}</span>
              <ul className="mt-3 grid gap-1.5">
                {b.items.map((it) => (
                  <li key={it} className="text-[0.95rem] leading-snug text-ink-2 print:text-[1.15rem]">
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-5 text-sm text-ink-soft print:text-[1.05rem]">
          Participating schools and applicants will receive detailed information as each part of the event is finalized.
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  10 · Closing                                                              */
/* -------------------------------------------------------------------------- */

function Closing({ brief }: { brief: SchoolBrief }) {
  return (
    <section aria-labelledby="sb-close" className="lp-section">
      <div className="lp-wrap flex flex-col items-center text-center">
        {brief.motto && (
          <p className="sb-label">
            {brief.motto.original} · {brief.motto.translation}
          </p>
        )}
        <h2 id="sb-close" className="sb-h sb-lg mt-7 max-w-[20ch]" data-reveal>
          {brief.closing.lead} <span className="sb-under text-[var(--sb-primary)]">{brief.closing.line}</span>
        </h2>
        <p className="mt-7 font-extrabold tracking-[0.14em] text-ink-soft uppercase">
          Hack 876 · {event.city} · {eventWhen.short}
          {eventWhen.note}
        </p>
        <div className="lp-no-print mt-9 flex flex-wrap justify-center gap-4">
          <Link href="/partner" className="btn btn-primary">
            Start the conversation <span aria-hidden>→</span>
          </Link>
          <a href={brief.pdf.href} download={brief.pdf.filename} className="btn btn-secondary">
            Download brief
          </a>
        </div>

        <div className="mt-12 max-w-2xl text-left">
          <p className="sb-label">About {brief.short}: sources</p>
          <ol className="mt-2 grid gap-1 text-sm text-ink-soft print:text-[1rem]">
            {brief.sources.map((s, i) => (
              <li key={s.href}>
                {i + 1}.{" "}
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="underline decoration-ink/25 underline-offset-2 hover:decoration-ink">
                  {s.label}
                </a>
              </li>
            ))}
          </ol>
          <p className="lp-note mt-5">
            Prepared by Hack 876 for the {brief.short} community. This is not an official {brief.school} publication, and{" "}
            {brief.short}&rsquo;s participation has not been confirmed. Dates, venue, allocations and prizes are provisional.
          </p>
        </div>
      </div>
    </section>
  );
}
