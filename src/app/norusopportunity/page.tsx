import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { BirdMark, DoctorBird } from "@/components/art/DoctorBird";
import { Icon } from "@/components/art/Icons";
import { TailLine } from "@/components/art/Marks";
import { Logo } from "@/components/art/Wordmark";
import { DownloadDeck } from "@/components/proposal/DownloadDeck";
import { MentorRoom, Seedling } from "@/components/proposal/Illustrations";
import { Check, Kicker, Lines, Ref } from "@/components/proposal/primitives";
import { eligibility, event, eventWhen, prizes, schools, stats } from "@/data/event";
import "@/components/proposal/proposal.css";

/*
 * Private partnership proposal for Jermaine Henry / Norus Technologies.
 * Same system as the other proposals. Not linked from the public site;
 * noindex/nofollow here and via X-Robots-Tag in next.config.ts.
 *
 * Deliberately has NO Founding Gold Partner tier. Mentorship is the lead ask.
 */

const SPONSOR = "Norus Technologies";
const SHORT = "Norus";
const DECK_LABEL = `Hack876 × ${SPONSOR}`;
/* Partner accents from Norus's own site: its yellow and charcoal. Used sparingly. */
const NORUS_YELLOW = "#ffca42";
const NORUS_INK = "#292d32";

export const metadata: Metadata = {
  title: { absolute: DECK_LABEL },
  description: "A private partnership proposal.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  openGraph: null,
  twitter: null,
};

/* Canonical numbers come from the event data. */
const STUDENTS = eligibility.maxHackers;
const PARTNER_SCHOOLS = schools.length;
const TEAMS = stats.find((s) => s.label === "teams")?.value ?? 20;
const FORMS = eligibility.formOptions;
const TEAM_SIZE = `${eligibility.teamSize.min} to ${eligibility.teamSize.max}`;
const SPECIAL_AWARDS = prizes.filter((p) => !p.place);
const SPECIAL_TOTAL = SPECIAL_AWARDS.reduce((sum, p) => sum + (p.valueUsd ?? 0), 0);
const SPECIAL_EACH = SPECIAL_AWARDS[0]?.valueUsd ?? 0;
const PODIUM = prizes.filter((p) => p.place).sort((a, b) => a.place! - b.place!);
/* Approximate procurement costs for the podium rewards (same estimates as the other proposals). */
const PODIUM_COST: Record<number, string> = { 1: "Approximately US$1,800", 2: "Approximately US$1,000", 3: "US$600" };
const usd = (n: number) => `US$${n.toLocaleString("en-US")}`;

/* First-party Norus sources. */
const SOURCES = [
  { id: 1, org: "Norus Technologies", label: "Home", href: "https://norustech.com/" },
  { id: 2, org: "Norus Technologies", label: "Who We Are", href: "https://norustech.com/who-we-are/" },
  { id: 3, org: "Norus Technologies", label: "Our Initiatives", href: "https://norustech.com/our-initiatives/" },
  { id: 4, org: "Norus Technologies", label: "What We Do", href: "https://norustech.com/what-we-do/" },
] as const;

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function NorusOpportunityPage() {
  return (
    <div className="lp" style={{ "--lp-deck-label": `"${DECK_LABEL}"` } as CSSProperties}>
      <header className="lp-wrap flex items-center justify-between gap-4 py-5">
        <Link href="/" className="flex items-center gap-2 rounded-lg" aria-label="Hack876 home">
          <BirdMark className="h-6 w-10" />
          <Logo className="text-[1.5rem]" />
        </Link>
        <DownloadDeck href="/proposals/hack876-norus-technologies-partnership-proposal.pdf" filename={`Hack876 x ${SPONSOR} - Partnership Proposal.pdf`} />
      </header>

      <main id="main">
        <div className="lp-page">
          <Hero />
        </div>
        <div className="lp-page">
          <MeetHack876 />
          <WhatTheyBuild />
        </div>
        <div className="lp-page">
          <WhyNorus />
          <AlreadyDoingThis />
        </div>
        <div className="lp-page">
          <Pipeline />
        </div>
        <div className="lp-page">
          <BringTheBench />
          <WhatAMentorDoes />
        </div>
        <div className="lp-page">
          <FlexibleBench />
          <NorusInTheRoom />
        </div>
        <div className="lp-page">
          <PrizeAndFood />
          <AwardsAndElbowGrease />
        </div>
        <div className="lp-page">
          <Summary />
        </div>
        <div className="lp-page">
          <DirectLine />
        </div>
        <div className="lp-page">
          <YearOne />
          <LongerView />
        </div>
        <div className="lp-page">
          <Closing />
        </div>
      </main>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero                                                                      */
/* -------------------------------------------------------------------------- */

function Hero() {
  const heroStats = [
    { n: STUDENTS, label: "young builders" },
    { n: TEAMS, label: "teams" },
    { n: 1, label: "build day" },
  ];
  return (
    <section aria-labelledby="lp-hero-title" className="lp-hero lp-grid-bg relative flex min-h-[calc(100svh-5rem)] flex-col justify-between overflow-hidden border-y lp-rule">
      <div className="lp-wrap w-full pt-16 sm:pt-24">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm font-bold tracking-[0.16em] text-ink-soft uppercase">{DECK_LABEL}</p>
          <p className="inline-flex items-center gap-2 rounded-full border lp-rule bg-paper px-3 py-1 text-xs font-bold tracking-[0.12em] text-ink-soft uppercase">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full border border-ink/40" style={{ background: NORUS_YELLOW }} />
            Private partnership proposal · for Jermaine Henry
          </p>
        </div>

        <h1 id="lp-hero-title" className="lp-h1 mt-10 max-w-[16ch] sm:mt-14">
          The most valuable thing {SHORT} could bring to Hack876 is{" "}
          <span className="relative inline-block text-emerald-deep">
            {SHORT}.
            <TailLine draw={false} className="absolute -bottom-2 left-0 h-4 w-full" />
          </span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-2 sm:text-xl">
          Hack876 will put approximately {STUDENTS} of Jamaica&rsquo;s young makers in one room and give them a day to turn
          ideas into working prototypes. For the first one, we would love to put some of Jamaica&rsquo;s working builders
          beside them.
        </p>
        <p className="mt-6 text-lg font-bold tracking-wide text-ink-2">Kingston, Jamaica · {eventWhen.short}
          {eventWhen.note}</p>
      </div>

      <div className="lp-wrap relative w-full pt-12 pb-10 sm:pb-14">
        <div aria-hidden className="pointer-events-none absolute -top-24 right-4 hidden w-44 opacity-95 sm:block lg:right-10 lg:w-56 print:block print:-top-32 print:w-60">
          <DoctorBird flutter={false} className="w-full" />
        </div>
        <dl className="grid grid-cols-3 border-t lp-rule">
          {heroStats.map((s, i) => (
            <div key={s.label} className={`pt-5 ${i ? "border-l lp-rule pl-4 sm:pl-8" : ""}`}>
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="lp-num block text-[clamp(3.4rem,11vw,8rem)]">{s.n}</span>
                <span className="mt-2 block text-sm font-bold tracking-[0.12em] text-ink-soft uppercase sm:text-base">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
        <p className="lp-marker mt-10 text-[clamp(1.6rem,3.4vw,2.6rem)]">Bring the bench.</p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  01 Meet Hack876                                                           */
/* -------------------------------------------------------------------------- */

function MeetHack876() {
  return (
    <section aria-labelledby="lp-meet" className="lp-section lp-dense">
      <div className="lp-wrap">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 print:grid-cols-[0.6fr_1.4fr] print:gap-10">
          <div className="lg:sticky lg:top-10 lg:self-start">
            <Kicker n="01">What is Hack876?</Kicker>
            <h2 id="lp-meet" className="lp-h2 mt-6">
              Meet <span className="whitespace-nowrap">Hack876.</span>
            </h2>
            <div aria-hidden className="mt-10 hidden gap-3 lg:flex print:flex">
              {["laptop", "notebook", "sticky", "people"].map((n, i) => (
                <Icon key={n} name={n} className="diecut h-14 w-14" style={{ rotate: `${[-8, 5, -3, 9][i]}deg` }} />
              ))}
            </div>
          </div>

          <div>
            <div className="lp-prose">
              <p>
                Hack876 is a one-day build competition for approximately{" "}
                <strong className="text-ink">{STUDENTS} secondary-school students</strong> from {FORMS[0]} through{" "}
                {FORMS[FORMS.length - 1]}, working in teams of {TEAM_SIZE}, roughly {TEAMS} teams in all.
              </p>
              <p>
                Teams pick a real problem, use modern tools including AI, get guidance from mentors, and finish the day with a
                working prototype and a pitch to judges. It is not a school assignment and there is no answer key.
              </p>
              <p>
                Our organized inaugural network is the {PARTNER_SCHOOLS} Kingston schools where Hack876 already has
                relationships. It is not intended to be exclusive to them.
              </p>
            </div>

            <div className="lp-keep my-8 rounded-2xl border-2 border-ink bg-paper p-6 shadow-[4px_5px_0_0_var(--color-emerald)] sm:p-7">
              <h3 className="lp-h3 text-[clamp(1.25rem,2.1vw,1.6rem)]">Open to eligible students beyond those schools.</h3>
              <p className="lp-prose mt-3 text-[1.02rem]">
                Students elsewhere in Jamaica may take part, subject to capacity. In this first year, Hack876 cannot provide
                transportation, lodging or travel coordination for students coming from farther away.{" "}
                <strong className="text-ink">That is a year-one constraint, not the long-term vision.</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  02 What students will build                                               */
/* -------------------------------------------------------------------------- */

const BUILDS: { label: string; icon: string; physical?: boolean }[] = [
  { label: "A web app", icon: "browser" },
  { label: "A mobile app", icon: "phone" },
  { label: "An AI tool", icon: "spark" },
  { label: "An automation", icon: "bot-free" },
  { label: "A data product", icon: "chart" },
  { label: "A tool for a community group", icon: "people" },
  { label: "Hardware", icon: "board", physical: true },
  { label: "A physical prototype", icon: "hand", physical: true },
];

function WhatTheyBuild() {
  return (
    <section aria-labelledby="lp-build" className="lp-section lp-grid-bg border-y lp-rule bg-paper">
      <div className="lp-wrap">
        <Kicker n="02">What they will actually build</Kicker>
        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_1.3fr] print:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 id="lp-build" className="lp-h2">
              Real software, by teenagers, against the clock.
            </h2>
            <Lines
              className="mt-6"
              items={[
                "Most teams will build something with a screen. Some will wire something up. All of them will have to scope, build, test and demo it by the end of the day.",
                "In other words: the whole software lifecycle, compressed into one very long day.",
              ]}
            />
          </div>
          <div>
            <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {BUILDS.map((b) => (
                <li
                  key={b.label}
                  className={`flex items-center gap-3 rounded-xl border px-3.5 py-2.5 font-semibold ${
                    b.physical ? "border-ink/25 bg-mint/60" : "border-ink/15 bg-cream"
                  }`}
                >
                  <Icon name={b.icon} className="h-8 w-8 shrink-0" />
                  {b.label}
                </li>
              ))}
            </ul>
            <div className="lp-keep mt-5 rounded-xl border-2 border-ink px-4 py-3 font-mono text-sm" style={{ background: NORUS_INK, color: "#e9edf2" }}>
              <span style={{ color: NORUS_YELLOW }}>$</span> git commit -m &ldquo;it works on my laptop, demo at 4&rdquo;
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  03 Why Norus                                                              */
/* -------------------------------------------------------------------------- */

function WhyNorus() {
  return (
    <section aria-labelledby="lp-why" className="lp-section lp-dense">
      <div className="lp-wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 print:grid-cols-[0.7fr_1.3fr]">
        <div>
          <Kicker n="03">Why Norus</Kicker>
          <h2 id="lp-why" className="lp-h2 mt-6">
            Builder to builder.
          </h2>
          <div aria-hidden className="mt-3 h-1.5 w-16 rounded-full border border-ink/30" style={{ background: NORUS_YELLOW }} />
        </div>
        <div>
          <div className="lp-prose">
            <p>
              Jermaine, Norus is a Jamaican-founded company that builds software for a living: custom web and mobile
              applications, AI development, UI/UX and website design,
              <Ref id={1} /> run through a process of discovery, design, development and delivery.
              <Ref id={4} />
            </p>
            <p>
              Your team spans the people a hackathon needs most: developers from junior to lead, project managers, a head of
              projects, a web designer, and a CTO and CEO who co-founded the company.
              <Ref id={2} />
            </p>
            <p>
              And Norus builds for impact. Its own site describes design, software development and product management
              support for non-profits, social enterprises and impact-driven startups.
              <Ref id={2} />
            </p>
            <p className="font-semibold text-ink">
              Hack876 students will spend the day doing a miniature version of what Norus does every week: understand a
              problem, scope it, design it, build it and ship something people can use.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  04 You're already doing this                                              */
/* -------------------------------------------------------------------------- */

const INITIATIVES = [
  {
    name: "Norus Internship Programme",
    stage: "Early career",
    text: "Mentor pairing and comprehensive training to prepare junior developers for professional work.",
  },
  {
    name: "JamCoders",
    stage: "High school",
    text: "Norus is a partner and sponsor of this summer camp teaching algorithms and programming to high-school students, first launched in 2022 at UWI Mona.",
  },
  {
    name: "Norus Technologies Education Grant",
    stage: "University",
    text: "Each semester, funds for four computer science students in Jamaica, with mentorship and guidance.",
  },
  {
    name: "Project Calico",
    stage: "University",
    text: "Jamaican university students work on open-source projects with an experienced mentor and a stipend for meeting project goals.",
  },
  {
    name: "Kingston Beta",
    stage: "Community",
    text: "Curation of the long-running Caribbean tech community brand was handed over to Norus in 2022.",
  },
];

function AlreadyDoingThis() {
  return (
    <section aria-labelledby="lp-already" className="lp-section lp-dense lp-dark lp-grid-bg relative overflow-hidden">
      <div className="lp-wrap">
        <Kicker n="04">You&rsquo;re already doing this</Kicker>
        <h2 id="lp-already" className="lp-h2 mt-6 max-w-[24ch]">
          Hack876 is not asking Norus to discover youth tech. You are already in it.
        </h2>
        <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5 print:mt-6 print:grid-cols-5">
          {INITIATIVES.map((x) => (
            <li key={x.name} className="lp-keep flex flex-col rounded-2xl border border-cream/20 bg-white/[0.04] p-5">
              <span className="w-fit rounded-full px-2.5 py-0.5 text-[0.7rem] font-extrabold tracking-wide uppercase" style={{ background: NORUS_YELLOW, color: NORUS_INK }}>
                {x.stage}
              </span>
              <p className="mt-3 text-lg leading-snug font-extrabold text-cream">{x.name}</p>
              <p className="mt-2 text-sm leading-relaxed text-cream/80">
                {x.text}
                <Ref id={3} />
              </p>
            </li>
          ))}
        </ul>
        <p className="lp-sub lp-accent mt-10 max-w-[36ch] text-sun print:mt-6">
          You already know what happens when experienced builders sit beside emerging talent.
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  05 Pipeline                                                               */
/* -------------------------------------------------------------------------- */

const PIPE = [
  { stage: "Secondary school", norus: "JamCoders (partner and sponsor)", hack: true },
  { stage: "University", norus: "Education Grant · Project Calico", hack: false },
  { stage: "Internship", norus: "Norus Internship Programme", hack: false },
  { stage: "Software engineer", norus: "Teams like Norus", hack: false },
  { stage: "Tech leadership", norus: "Kingston Beta and the wider ecosystem", hack: false },
];

function Pipeline() {
  return (
    <section aria-labelledby="lp-pipe" className="lp-section lp-grid-bg">
      <div className="lp-wrap">
        <Kicker n="05">The talent pipeline</Kicker>
        <h2 id="lp-pipe" className="lp-h2 mt-6 max-w-[26ch]">
          What if Norus met the next great Jamaican software engineer before they had written a university application?
        </h2>

        <ol className="mt-12 grid gap-3 lg:grid-cols-5 lg:items-end print:mt-8 print:grid-cols-5 print:items-end">
          {PIPE.map((p, i) => (
            <li key={p.stage} className="lp-keep flex flex-col">
              {p.hack && (
                <span className="mb-2 w-fit rounded-full border-2 border-ink bg-emerald px-3 py-0.5 text-xs font-extrabold tracking-wide text-white uppercase">
                  Hack876 sits here
                </span>
              )}
              <div
                className={`flex flex-col justify-end rounded-2xl border-2 p-4 ${p.hack ? "border-ink bg-sun-light" : "border-ink/70 bg-paper"}`}
                style={{ minHeight: `${6 + i * 1.4}rem` }}
              >
                <span className="lp-num text-2xl text-emerald-deep">{String(i + 1).padStart(2, "0")}</span>
                <span className="mt-1 text-lg leading-tight font-extrabold">{p.stage}</span>
                <span className="mt-2 text-sm leading-snug font-semibold text-ink-soft">{p.norus}</span>
              </div>
            </li>
          ))}
        </ol>
        <TailLine draw={false} className="mt-4 hidden h-6 w-full lg:block print:block" />

        <p className="lp-note mt-6 max-w-3xl">
          Norus programmes as described on its own site.
          <Ref id={3} /> Taking part in Hack876 does not imply access to any Norus programme, internship, grant or hiring.
        </p>
        <p className="lp-sub mt-6 max-w-[34ch] text-emerald-deep">An earlier hello, not a transaction.</p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  06 Bring the bench (signature)                                            */
/* -------------------------------------------------------------------------- */

function BringTheBench() {
  return (
    <section aria-labelledby="lp-bench" className="lp-section lp-dense">
      <div className="lp-wrap">
        <div className="flex flex-wrap items-center gap-3">
          <Kicker n="06">The marquee invitation</Kicker>
          <span className="rounded-full border-2 border-ink px-3 py-0.5 text-xs font-extrabold tracking-[0.14em] uppercase" style={{ background: NORUS_YELLOW, color: NORUS_INK }}>
            Norus Mentor Corps
          </span>
        </div>
        <div className="mt-6 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center print:grid-cols-[0.95fr_1.05fr] print:items-center print:gap-8">
          <div>
            <h2 id="lp-bench" className="lp-marker text-[clamp(3.2rem,9vw,6.4rem)]">Bring the bench.</h2>
            <Lines
              className="mt-6"
              items={[
                "Hack876 can provide the room, the young builders, the problems, the energy and the clock.",
                <strong key="n" className="text-ink">
                  Norus can provide something we cannot: people who build software for a living.
                </strong>,
                `We would love Norus to bring as many of its team as it can reasonably make available, circulating among the ${TEAMS} teams through the hacking period.`,
              ]}
            />
            <p className="lp-sub mt-6 text-emerald-deep">Not building the projects for students. Helping students get unstuck.</p>
          </div>
          <figure className="lp-keep">
            <MentorRoom teams={TEAMS} mentors={6} mentorColor={NORUS_YELLOW} className="w-full print:mx-auto print:max-w-[4.6in]" />
            <figcaption className="mt-3 flex items-center gap-2 text-sm font-semibold text-ink-soft">
              <span aria-hidden className="inline-block h-4 w-4 rounded-full border-2 border-ink" style={{ background: NORUS_YELLOW }} />
              {TEAMS} teams, and a handful of Norus mentors moving between them.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  07 What a Norus mentor actually does                                      */
/* -------------------------------------------------------------------------- */

const MOMENTS = [
  "Cutting an impossible scope into something buildable by 4 PM",
  "Debugging a blocker without taking over the keyboard",
  "Reasoning through architecture, APIs and integrations",
  "Reviewing a data model before it becomes a problem",
  "Asking whether a feature is actually necessary",
  "UX and product thinking when the screen makes no sense",
  "Helping a team recover when its first idea fails",
  "Reviewing a demo before the judges see it",
  "Telling a student who thinks they are “not technical enough” that they are",
  "Translating professional habits into language a teenager can use",
];

function WhatAMentorDoes() {
  return (
    <section aria-labelledby="lp-mentor" className="lp-section lp-dense bg-paper">
      <div className="lp-wrap">
        <Kicker n="07">What a Norus mentor actually does</Kicker>
        <h2 id="lp-mentor" className="lp-h2 mt-6 max-w-[24ch]">
          Ten small interventions that change a team&rsquo;s whole day.
        </h2>
        <ol className="mt-10 grid border-t lp-rule sm:grid-cols-2 lg:grid-cols-5 print:mt-6 print:grid-cols-5">
          {MOMENTS.map((m, i) => (
            <li key={m} className="flex gap-3 border-b lp-rule py-4 pr-4">
              <span className="lp-num text-xl text-emerald-deep">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-[0.98rem] leading-snug font-semibold">{m}</span>
            </li>
          ))}
        </ol>
        <p className="lp-note mt-4">Students keep ownership of their work. Mentors guide; teams build.</p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  08 Flexible bench + recognition                                           */
/* -------------------------------------------------------------------------- */

function FlexibleBench() {
  const ratios = [4, 8, 12].map((m) => ({ m, per: (TEAMS / m).toFixed(1).replace(/\.0$/, "") }));
  return (
    <section aria-labelledby="lp-flex" className="lp-section lp-dense">
      <div className="lp-wrap grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center print:grid-cols-[1.1fr_0.9fr] print:items-center">
        <div>
          <Kicker n="08">No mandatory headcount</Kicker>
          <h2 id="lp-flex" className="lp-h2 mt-6 max-w-[20ch]">
            Bring as many builders as you reasonably can.
          </h2>
          <p className="lp-prose mt-4">We will put them to work helping the next generation build. Norus does not need to commit its whole team for the whole day.</p>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2 print:grid-cols-2">
            {[
              "A core group for the whole hacking period",
              "Rotating team members in shifts",
              "Specialists who drop in for set windows",
              "Developers who circulate for a few hours",
              "Jermaine and senior staff to mentor, judge or speak",
              "Any mix that is operationally realistic",
            ].map((t) => (
              <li key={t} className="flex gap-2.5 font-semibold">
                <Check className="mt-0.5 text-emerald-deep" />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="lp-keep rounded-3xl border-2 border-ink bg-paper p-6 shadow-[5px_6px_0_0_var(--color-ink)]">
          <p className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">Across {TEAMS} teams</p>
          <ul className="mt-4 space-y-3">
            {ratios.map((r) => (
              <li key={r.m} className="flex items-baseline justify-between gap-4 border-b lp-rule pb-3 last:border-0 last:pb-0">
                <span className="lp-num text-4xl">{r.m} mentors</span>
                <span className="font-semibold text-ink-2">≈ {r.per} teams each</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-ink-soft">Even a handful of Norus mentors could materially change the day. More is even better.</p>
        </div>
      </div>
    </section>
  );
}

function NorusInTheRoom() {
  return (
    <section aria-labelledby="lp-room" className="lp-section lp-dense lp-dark lp-grid-bg relative overflow-hidden">
      <div className="lp-wrap">
        <Kicker n="09">Recognition</Kicker>
        <h2 id="lp-room" className="lp-statement mt-6 max-w-[22ch]">
          We do not just want the Norus logo in the room.
        </h2>
        <p className="lp-marker lp-accent mt-4 text-[clamp(2.4rem,6vw,4.6rem)] text-sun">We want Norus in the room.</p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.1fr] print:mt-6 print:grid-cols-[1fr_1.1fr]">
          <figure className="lp-keep h-fit rounded-2xl border-2 border-dashed border-cream/40 p-7">
            <figcaption className="text-xs font-extrabold tracking-[0.16em] text-cream/60 uppercase">Proposed recognition</figcaption>
            <p className="mt-5 text-[clamp(1.5rem,2.8vw,2rem)] leading-tight font-extrabold tracking-tight">{SPONSOR}</p>
            <p className="lp-accent mt-2 text-lg font-bold text-sun">Mentorship Partner · Inaugural Hack876</p>
          </figure>
          <ul className="grid gap-2 sm:grid-cols-2 print:grid-cols-2">
            {[
              "“Norus Mentor Corps” identification on-site",
              "Mentor badges or lanyard designation",
              "A small Norus mentor help station",
              "Recognition in opening and closing remarks",
              "Recognition on the partner page once confirmed",
              "Photography and recap content",
              "Students knowing exactly who Norus mentors are and where to find them",
            ].map((t) => (
              <li key={t} className="flex gap-2.5 font-semibold text-cream">
                <Check className="lp-accent mt-0.5 text-sun" />
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
/*  10 Other ways: prize + food                                               */
/* -------------------------------------------------------------------------- */

function PrizeAndFood() {
  return (
    <section aria-labelledby="lp-alt" className="lp-section lp-dense bg-cream-2">
      <div className="lp-wrap">
        <Kicker n="10">All the other ways to say yes</Kicker>
        <h2 id="lp-alt" className="lp-h2 mt-6 max-w-[24ch]">
          Mentors first. Everything else is welcome too.
        </h2>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_1fr] print:mt-5 print:grid-cols-[1.2fr_1fr]">
          <article className="lp-keep rounded-2xl border lp-rule bg-paper p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-xl font-extrabold">Official Prize Partner</h3>
              <p className="lp-num text-3xl">US$3,400 to US$3,500</p>
            </div>
            <p className="mt-1 text-ink-2">Underwrite the primary competition prizes.</p>
            <dl className="mt-3 divide-y lp-rule border-y lp-rule text-sm">
              {PODIUM.map((p) => (
                <div key={p.name} className="grid grid-cols-[8rem_1fr_auto] gap-2 py-2 max-sm:grid-cols-[7rem_1fr]">
                  <dt className="font-extrabold">{p.name}</dt>
                  <dd className="font-semibold">{p.reward}</dd>
                  <dd className="text-ink-soft max-sm:col-start-2">{PODIUM_COST[p.place!]}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 font-extrabold">Hack876 Official Prize Partner · {SPONSOR}</p>
            <p className="lp-note mt-2">Exact cost and configuration can move with pricing, availability and final team structure.</p>
          </article>

          <article className="lp-keep rounded-2xl border lp-rule bg-paper p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-xl font-extrabold">Food &amp; Student Experience Partner</h3>
              <p className="lp-num text-3xl">US$1,000</p>
            </div>
            <p className="mt-1 font-bold text-ink-soft">Approximately J$150,000</p>
            <p className="mt-2 text-ink-2">
              Keeping approximately {STUDENTS} teenagers, and the people supporting them, going through a full build day.
            </p>
            <ul className="mt-3 grid grid-cols-2 gap-1.5 text-sm">
              {["Student meals", "Snacks", "Water and refreshments", "Serving supplies", "Light hospitality"].map((t) => (
                <li key={t} className="flex items-center gap-2 font-semibold">
                  <Check className="text-emerald-deep" />
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-3 font-extrabold">Hack876 Food &amp; Student Experience Partner · {SPONSOR}</p>
          </article>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  11 Special awards + elbow grease                                          */
/* -------------------------------------------------------------------------- */

function AwardsAndElbowGrease() {
  return (
    <section aria-labelledby="lp-awards" className="lp-section lp-dense">
      <div className="lp-wrap grid gap-8 lg:grid-cols-2 print:grid-cols-2 print:gap-8">
        <div>
          <Kicker n="11">Special awards</Kicker>
          <h2 id="lp-awards" className="lp-h2 mt-6">
            A low-friction yes.
          </h2>
          <p className="lp-prose mt-4">
            Sponsor one special award for {usd(SPECIAL_EACH)}, or all {SPECIAL_AWARDS.length} for {usd(SPECIAL_TOTAL)}.
          </p>
          <ul className="mt-5 space-y-2">
            {SPECIAL_AWARDS.map((a) => (
              <li key={a.name} className="flex items-center justify-between gap-3 rounded-xl border lp-rule bg-paper px-4 py-2.5">
                <span className="font-extrabold">{a.name} presented by {SHORT}</span>
                <span className="lp-num text-xl">{usd(a.valueUsd ?? 0)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="lp-keep rounded-3xl border-2 border-ink p-6 shadow-[5px_6px_0_0_var(--color-ink)]" style={{ background: NORUS_YELLOW }}>
          <p className="text-xs font-extrabold tracking-[0.16em] uppercase" style={{ color: NORUS_INK }}>
            Elbow grease · a real partnership option
          </p>
          <p className="mt-3 text-2xl leading-tight font-extrabold" style={{ color: NORUS_INK }}>
            &ldquo;I can&rsquo;t write a big cheque, but I can give you eight people for the day.&rdquo;
          </p>
          <p className="mt-2 font-semibold" style={{ color: NORUS_INK }}>
            That is a major win for us.
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {[
              "Mentors",
              "Judges",
              "Technical volunteers",
              "A speaker",
              "Project-management support",
              "UX and design guidance",
              "Day-of tech troubleshooting",
              "Event volunteers",
              "Challenge ideation",
              "Pre-event technical feedback",
              "Tech-community connections",
            ].map((t) => (
              <li key={t} className="rounded-full border-2 border-ink/70 bg-paper px-3 py-1 text-sm font-bold text-ink">
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
/*  12 Summary                                                                */
/* -------------------------------------------------------------------------- */

function Summary() {
  const options = [
    { name: "Official Prize Partner", amount: "~US$3,500", text: "The primary competition prizes." },
    { name: "Food & Student Experience", amount: "US$1,000", text: "Approximately J$150,000 for meals and refreshments." },
    { name: "All special awards", amount: usd(SPECIAL_TOTAL), text: SPECIAL_AWARDS.map((a) => a.name).join(", ") + "." },
    { name: "One special award", amount: usd(SPECIAL_EACH), text: "Your pick, presented by Norus." },
    { name: "Other in-kind / elbow grease", amount: "Time", text: "Expertise, volunteers, connections, resources." },
  ];
  return (
    <section aria-labelledby="lp-summary" className="lp-section">
      <div className="lp-wrap">
        <Kicker n="12">Every option at a glance</Kicker>
        <h2 id="lp-summary" className="lp-h2 mt-6">
          Mix and match. There is no fixed package.
        </h2>
        <div className="mt-10 grid gap-5 lg:grid-cols-5 print:mt-6 print:grid-cols-5">
          <div className="lp-keep flex flex-col justify-between rounded-3xl border-2 border-ink p-8 lg:col-span-2 print:col-span-2" style={{ background: NORUS_INK, color: "#fbf4e6" }}>
            <div>
              <p className="text-sm font-extrabold tracking-[0.18em] uppercase" style={{ color: NORUS_YELLOW }}>
                Our preferred collaboration
              </p>
              <p className="mt-4 text-[clamp(2rem,4vw,3rem)] leading-none font-extrabold tracking-tight">Norus Mentor Corps</p>
              <p className="mt-3 text-lg font-bold" style={{ color: NORUS_YELLOW }}>
                Contribution: time + expertise
              </p>
            </div>
            <p className="mt-8 leading-relaxed text-cream/85">Norus builders circulating among the teams, helping students get unstuck and ship.</p>
          </div>
          <ul className="grid gap-3 lg:col-span-3 print:col-span-3">
            {options.map((o) => (
              <li key={o.name} className="lp-keep flex flex-wrap items-center justify-between gap-x-6 gap-y-1 rounded-2xl border lp-rule bg-paper px-5 py-3.5">
                <div>
                  <p className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">{o.name}</p>
                  <p className="mt-1 text-ink-2">{o.text}</p>
                </div>
                <p className="lp-num text-3xl">{o.amount}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="lp-keep mt-6 rounded-2xl border border-dashed border-ink/40 p-5">
          <p className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">Combinations welcome</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {[
              "Mentors only",
              `Mentors + one ${usd(SPECIAL_EACH)} award`,
              "Mentors + food",
              "Mentors + the full prize pool",
              "A financial contribution without staffing",
            ].map((t) => (
              <li key={t} className="rounded-full border lp-rule bg-paper px-3.5 py-1.5 text-sm font-semibold">
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
/*  13 A direct line                                                          */
/* -------------------------------------------------------------------------- */

function DirectLine() {
  return (
    <section aria-labelledby="lp-direct" className="lp-section lp-grid-bg">
      <div className="lp-wrap grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center print:grid-cols-[1.1fr_0.9fr] print:items-center">
        <div>
          <Kicker n="13">A direct line</Kicker>
          <h2 id="lp-direct" className="lp-h2 mt-6 max-w-[20ch]">
            There is no faceless sponsorship process here.
          </h2>
          <Lines
            className="mt-6"
            items={[
              <span key="s">
                Stefen is asking <strong className="text-ink">Jermaine Henry, CoFounder &amp; CEO of Norus</strong>, directly.
                <Ref id={2} />
              </span>,
              "We would especially love you in the room yourself, as a judge, mentor, speaker or just someone students get to meet. But Norus taking part does not depend on it.",
              "If Norus is interested, we can decide together what involvement should actually look like.",
            ]}
          />
        </div>
        <div className="lp-keep rounded-2xl border-2 border-ink bg-paper p-6 shadow-[4px_5px_0_0_var(--color-emerald)]">
          <p className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">Questions we would answer together</p>
          <ul className="mt-4 space-y-2.5">
            {[
              "How many Norus team members can take part?",
              "Who should mentor, and when?",
              "Would Norus also like to cover prizes or food?",
              "Does one of the special awards fit?",
              "Would Jermaine like to judge or speak?",
              "Is there a contribution Norus thinks would be more useful?",
            ].map((t) => (
              <li key={t} className="flex gap-2.5 font-semibold">
                <Check className="mt-0.5 text-emerald-deep" />
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-4 font-extrabold text-emerald-deep">A conversation, not a workload.</p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  14 Year one + longer view                                                 */
/* -------------------------------------------------------------------------- */

function YearOne() {
  return (
    <section aria-labelledby="lp-year1" className="lp-section bg-paper">
      <div className="lp-wrap grid items-center gap-12 lg:grid-cols-[1.35fr_0.65fr] print:grid-cols-[1.4fr_0.6fr] print:gap-10">
        <div>
          <Kicker n="14">Year one</Kicker>
          <h2 id="lp-year1" className="lp-h2 mt-6">
            We are building the first one.
          </h2>
          <Lines
            className="mt-6"
            items={[
              `Approximately ${STUDENTS} students, ${TEAMS} teams, a ${PARTNER_SCHOOLS}-school organized network and one day in Kingston.`,
              "Deliberately focused. We will not promise national logistics we cannot deliver yet.",
            ]}
          />
          <ul className="mt-6 space-y-1">
            {["Build it well.", "Learn.", "Earn the right to make it larger."].map((t, i) => (
              <li key={t} className="lp-sub" style={{ color: ["var(--color-ink)", "var(--color-ink-2)", "var(--color-emerald-deep)"][i] }}>
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div aria-hidden className="hidden lg:block print:block">
          <Seedling className="mx-auto w-full max-w-xs print:max-w-[2.6in]" />
        </div>
      </div>
    </section>
  );
}

function LongerView() {
  return (
    <section aria-labelledby="lp-longer" className="lp-section lp-dense">
      <div className="lp-wrap">
        <Kicker n="15">The longer view</Kicker>
        <h2 id="lp-longer" className="lp-h2 mt-6 max-w-[22ch]">
          No multi-year commitment required.
        </h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] print:mt-5 print:grid-cols-[0.8fr_1.2fr]">
          <div className="lp-keep rounded-2xl border-2 border-ink bg-sun-light p-6">
            <p className="lp-num text-5xl">{event.year}</p>
            <p className="mt-3 text-xl font-extrabold">Come help these kids ship.</p>
            <p className="mt-2 text-ink-2">That is the whole ask.</p>
          </div>
          <div className="lp-keep rounded-2xl border border-dashed border-ink/40 p-6">
            <p className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">
              Future possibilities, only if both sides find year one valuable. Not commitments.
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {[
                "The Norus Mentor Corps returning each year",
                "Pre-event build workshops for teams",
                "Connections for Hack876 alumni into Jamaica’s tech community",
                "Mentoring students from beyond Kingston as Hack876 grows",
                "Norus judges on the finals panel",
              ].map((t) => (
                <li key={t} className="rounded-full border lp-rule bg-paper px-3.5 py-1.5 text-sm font-semibold">
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
/*  Closing                                                                   */
/* -------------------------------------------------------------------------- */

function Closing() {
  return (
    <section aria-labelledby="lp-close" className="lp-section lp-close lp-grid-bg border-t lp-rule text-center">
      <div className="lp-wrap flex flex-col items-center">
        <div aria-hidden className="w-28 sm:w-36">
          <DoctorBird flutter={false} className="w-full" />
        </div>
        <p className="mt-6 text-sm font-extrabold tracking-[0.18em] text-ink-soft uppercase">{DECK_LABEL}</p>
        <h2 id="lp-close" className="lp-h2 mx-auto mt-6 max-w-[26ch]">
          A student may forget whose logo was on the wall.
        </h2>
        <p className="lp-marker mt-4 max-w-[24ch] text-[clamp(2.4rem,6vw,4.4rem)] text-emerald-deep">
          They will remember the engineer who sat beside them when their project broke.
        </p>
        <p className="lp-prose mx-auto mt-8 max-w-2xl text-center">
          Hack876 gives young Jamaicans one day to discover what they can build. Jermaine, we would love {SPONSOR} to put some
          of Jamaica&rsquo;s working builders in the room with them.
        </p>
        <p className="mt-4 font-extrabold">That is the invitation.</p>
        <p className="mt-6 text-lg font-bold">Kingston, Jamaica · {eventWhen.short}
          {eventWhen.note}</p>
        <p className="mt-3 flex flex-wrap justify-center gap-x-6 gap-y-1 font-semibold text-emerald-deep">
          <a href={event.siteUrl} className="underline decoration-2 underline-offset-4">
            {event.siteUrl.replace(/^https?:\/\/(www\.)?/, "")}
          </a>
          {event.contactEmail && (
            <a href={`mailto:${event.contactEmail}`} className="underline decoration-2 underline-offset-4">
              {event.contactEmail}
            </a>
          )}
        </p>
      </div>
      <footer className="lp-wrap mt-16 text-left print:mt-auto print:pt-6">
        <h2 className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">Sources</h2>
        <ol className="mt-3 space-y-1.5">
          {SOURCES.map((s) => (
            <li key={s.id} id={`source-${s.id}`} className="lp-note scroll-mt-6">
              <span className="font-bold">{s.id}.</span> {s.org}, &ldquo;{s.label}.&rdquo;{" "}
              <a href={s.href} className="break-all underline decoration-ink/30 underline-offset-2 hover:decoration-ink">
                {s.href.replace("https://", "")}
              </a>
            </li>
          ))}
        </ol>
        <p className="lp-note mt-6">A private partnership proposal prepared for Jermaine Henry, CoFounder &amp; CEO, {SPONSOR}.</p>
      </footer>
    </section>
  );
}
