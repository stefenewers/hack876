import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { BirdMark } from "@/components/art/DoctorBird";
import { HackerPass } from "@/components/art/HackerPass";
import { Logo } from "@/components/art/Wordmark";
import { DownloadDeck } from "@/components/proposal/DownloadDeck";
import { eligibility, event, prizes } from "@/data/event";
import "@/components/proposal/proposal.css";
import "./obvious.css";

/*
 * Private partnership brief for Obvious (obvious.ai). The core ask is API /
 * token credits for teams that opt in, then light prize support and people.
 * Not a funding ask. Not linked from the public site; noindex/nofollow here
 * and via X-Robots-Tag in next.config.ts.
 *
 * This is a proposal. Nothing here should read as an existing partnership,
 * an agreed access policy for minors, or committed prizes or staff.
 */

const DECK_LABEL = "Hack 876 × Obvious";
const PDF = "/proposals/hack876-obvious-partnership-brief.pdf";
const PDF_NAME = "Hack 876 x Obvious - Partnership Brief.pdf";

export const metadata: Metadata = {
  title: { absolute: DECK_LABEL },
  description: "A private partnership brief.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  openGraph: null,
  twitter: null,
};

const STUDENTS = eligibility.maxHackers;
const TEAM_MAX = eligibility.teamSize.max;
const TEAMS = Math.ceil(STUDENTS / TEAM_MAX);
/* Special awards only. Reward amounts stay off this page. */
const AWARDS = prizes.filter((p) => !p.place);

/* Stefen's Frontier Build numbers, as published on stefenewers.com/hackathons. */
const FRONTIER = [
  { v: "39", l: "PRs created" },
  { v: "636.8M", l: "Tokens" },
  { v: "83.1K", l: "Lines added" },
  { v: "Solo", l: "Team" },
];

/* -------------------------------------------------------------------------- */

function Label({ n, children }: { n?: string; children: ReactNode }) {
  return (
    <p className="ob-label flex items-center gap-3">
      {n && <span className="ob-n">{n}</span>}
      <span>{children}</span>
    </p>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function ObviousOpportunityPage() {
  return (
    <div className="lp ob" style={{ "--lp-deck-label": `"${DECK_LABEL}"` } as CSSProperties}>
      <header className="lp-wrap flex items-center justify-between gap-4 py-5">
        <Link href="/" className="flex items-center gap-2 rounded-lg" aria-label="Hack 876 home">
          <BirdMark className="h-6 w-10" />
          <Logo className="text-[1.4rem]" />
        </Link>
        <DownloadDeck href={PDF} filename={PDF_NAME} label="Download brief (PDF)" />
      </header>

      <main id="main">
        <div className="lp-page">
          <Hero />
        </div>
        <div className="lp-page">
          <Personal />
        </div>
        <div className="lp-page">
          <WhyFits />
        </div>
        <div className="lp-page">
          <TheBuild />
        </div>
        <div className="lp-page">
          <Credits />
        </div>
        <div className="lp-page">
          <Prizes />
        </div>
        <div className="lp-page">
          <ShowUp />
        </div>
        <div className="lp-page">
          <Closing />
        </div>
      </main>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  1 · Hero                                                                  */
/* -------------------------------------------------------------------------- */

function Hero() {
  const meta = ["Jamaica", `~${STUDENTS} builders`, `Teams ≤${TEAM_MAX}`, "1 day", String(event.year)];
  return (
    <section aria-labelledby="ob-hero" className="lp-hero ob-sec ob-grid relative flex min-h-[calc(100svh-5rem)] flex-col justify-between border-y lp-rule">
      <div className="lp-wrap w-full pt-14 sm:pt-20">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="ob-label flex items-center gap-2.5">
            <span aria-hidden className="inline-block h-2 w-2 bg-[var(--ob-orange)]" />
            Private partnership brief
          </p>
          <p className="ob-label">Hack 876 × Obvious</p>
        </div>

        <div className="mt-12 grid items-end gap-12 sm:mt-16 lg:grid-cols-[1.45fr_1fr] print:grid-cols-[1.5fr_1fr]">
          <div>
            <h1 id="ob-hero" className="ob-h max-w-[17ch] text-[clamp(2.5rem,5.6vw,5rem)] print:text-[5.6rem]">
              Obvious already knows Jamaican builders.{" "}
              <span className="text-[var(--ob-orange)]">Help us reach the next ones.</span>
            </h1>
            <div className="ob-body mt-9">
              <p>
                Hack 876 is bringing about {STUDENTS} Jamaican secondary-school students together for one day to build, ship and
                present something real.
              </p>
              <p>
                We&rsquo;d love Obvious to help put real tools, not toy demos, in the hands of the teams that want them.
              </p>
            </div>
            <div className="lp-no-print mt-9 flex flex-wrap items-center gap-3">
              <a href="#the-ask" className="ob-btn ob-btn-solid">
                See the opportunity <span aria-hidden>↓</span>
              </a>
              <a href={PDF} download={PDF_NAME} className="ob-btn ob-btn-ghost">
                Download brief
              </a>
            </div>
          </div>

          <StatusCard />
        </div>
      </div>

      <div className="lp-wrap w-full pt-14 pb-10">
        <ul className="ob-mono flex flex-wrap gap-x-5 gap-y-2 border-t lp-rule pt-5 text-[0.78rem] font-semibold tracking-[0.12em] text-[var(--ob-muted)] uppercase">
          {meta.map((m, i) => (
            <li key={m} className="flex items-center gap-5">
              {i > 0 && <span aria-hidden className="text-[var(--ob-line)]">/</span>}
              {m}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function StatusCard() {
  const rows: [string, string, string?][] = [
    ["builders", `~${STUDENTS}`],
    ["teams", `${TEAMS} × ≤${TEAM_MAX}`],
    ["clock", "1 day"],
    ["stack", "open"],
    ["obvious credits", "proposed", "text-[var(--ob-orange)]"],
  ];
  return (
    <div aria-hidden className="ob-card ob-panel ob-mono w-full max-w-md justify-self-end overflow-hidden text-[0.82rem] print:text-[1.15rem]">
      <div className="flex items-center justify-between border-b border-[var(--ob-line)] px-4 py-3">
        <span className="flex items-center gap-2 font-semibold">
          <BirdMark className="h-4 w-7" />
          hack876 / {event.year}
        </span>
        <span className="flex items-center gap-2 text-[var(--ob-muted)]">
          <span className="ob-live" /> planning
        </span>
      </div>
      <dl className="px-4 py-3">
        {rows.map(([k, v, c]) => (
          <div key={k} className="flex justify-between gap-4 border-b border-dashed border-[var(--ob-line)] py-2 last:border-0">
            <dt className="text-[var(--ob-muted)]">{k}</dt>
            <dd className={`font-semibold ${c ?? ""}`}>{v}</dd>
          </div>
        ))}
      </dl>
      <p className="border-t border-[var(--ob-line)] px-4 py-3 text-[var(--ob-muted)]">
        <span className="text-[var(--ob-ink)]">$</span> think build ship present
        <span className="ob-caret" />
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  2 · Why this is personal                                                  */
/* -------------------------------------------------------------------------- */

function Personal() {
  return (
    <section aria-labelledby="ob-personal" className="lp-section ob-panel">
      <div className="lp-wrap grid items-center gap-12 lg:grid-cols-[1fr_1.15fr] print:grid-cols-[1fr_1.15fr] print:gap-14">
        <div>
          <Label n="01">Why this is personal</Label>
          <h2 id="ob-personal" className="ob-h ob-lg mt-6 max-w-[14ch]" data-reveal>
            From Frontier to Hack 876.
          </h2>
          <div className="ob-body mt-8" data-reveal>
            <p>
              I first got to know Obvious by showing up as a builder. At Frontier Build in Atlanta, I built YardToonz Reactive
              solo, a production pipeline for a Jamaican claymation comedy brand, and got to experience the team and the
              community firsthand.
            </p>
            <p>
              Now I&rsquo;m helping organize Hack 876 for secondary-school students in Jamaica. Obvious has its own Jamaican ties,
              so this felt like a very natural conversation to have.
            </p>
          </div>
          <p className="mt-6 font-bold" data-reveal>
            Stefen O. Ewers Jr. <span className="font-normal text-[var(--ob-muted)]">· Organizing Team, Hack 876</span>
          </p>
        </div>

        <div data-reveal>
          <figure className="ob-frame">
            <Image
              src="/proposals/obvious-frontier-build-station.jpg"
              alt="Stefen's laptop at Frontier Build Atlanta showing the YardToonz Reactive pipeline, with his Frontier badge and Obvious lanyard on the keyboard."
              width={1400}
              height={788}
              sizes="(min-width: 1024px) 40rem, 100vw"
              className="block h-auto w-full"
            />
            <figcaption className="ob-mono flex flex-wrap items-center justify-between gap-2 border-t border-[var(--ob-line)] px-4 py-3 text-[0.72rem] tracking-[0.08em] text-[var(--ob-muted)] uppercase print:text-[0.95rem]">
              <span>Frontier Build · Atlanta · Sep 2026</span>
              <span>YardToonz Reactive</span>
            </figcaption>
          </figure>
          <dl className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 print:grid-cols-4">
            {FRONTIER.map((s) => (
              <div key={s.l} className="ob-card px-3 py-3">
                <dt className="ob-label text-[0.6rem] print:text-[0.85rem]">{s.l}</dt>
                <dd className="ob-mono mt-1 text-[clamp(1rem,2vw,1.35rem)] font-semibold tracking-tight print:text-[1.7rem]">{s.v}</dd>
              </div>
            ))}
          </dl>
          <div className="ob-card mt-4 border-l-[3px] border-l-[var(--ob-orange)] px-5 py-4">
            <p className="ob-label">A familiar face</p>
            <p className="mt-2 text-[1.02rem] leading-snug text-[var(--ob-ink-2)] print:text-[1.3rem]">
              <strong className="text-[var(--ob-ink)]">Saran Duncan</strong> on the Obvious team went to St. Andrew High School
              for Girls, one of the schools we&rsquo;re already talking with. If she&rsquo;s open to it, we&rsquo;d love her to be
              Obvious&rsquo;s point of contact for Hack 876.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  3 · Why this fits                                                         */
/* -------------------------------------------------------------------------- */

const LAYER = [
  { k: "Credits", d: "API or token credits for teams that choose to build with Obvious.", href: "#the-ask" },
  { k: "Prizes", d: "A few lightweight awards for the smaller categories.", href: "#prizes" },
  { k: "People", d: "Anyone from the team who wants to judge, mentor or speak.", href: "#show-up" },
];

function WhyFits() {
  return (
    <section aria-labelledby="ob-fits" className="lp-section ob-sec">
      <div className="lp-wrap grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-center print:grid-cols-[1.1fr_1fr] print:items-center">
        <div>
          <Label n="02">Why this fits</Label>
          <h2 id="ob-fits" className="ob-h ob-lg mt-6 max-w-[14ch]" data-reveal>
            Hackathons are where tools become real.
          </h2>
          <div className="ob-body mt-8" data-reveal>
            <p>Students don&rsquo;t need another AI demo.</p>
            <p>
              They need a problem, a clock, a team and tools strong enough to help them move. Hack 876 builds that room. Obvious
              can add leverage inside it.
            </p>
            <p>
              We&rsquo;re not looking for Obvious to bankroll the event. Local sponsors are helping us with the core costs. What
              would matter most from Obvious is the builder layer.
            </p>
          </div>
        </div>

        <ol className="grid gap-3" data-reveal>
          {LAYER.map((l, i) => (
            <li key={l.k}>
              <a href={l.href} className="ob-card group flex items-start gap-5 p-5 transition-colors hover:border-[var(--ob-ink)] print:p-6">
                <span className="ob-mono pt-1 text-sm font-semibold text-[var(--ob-orange)] print:text-[1.1rem]">0{i + 1}</span>
                <span className="flex-1">
                  <span className="block text-xl font-extrabold tracking-tight print:text-[2rem]">{l.k}</span>
                  <span className="mt-1 block text-[1.02rem] leading-snug text-[var(--ob-ink-2)] print:text-[1.35rem]">{l.d}</span>
                </span>
                <span aria-hidden className="lp-no-print pt-1 text-[var(--ob-muted)] transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  4 · The build                                                             */
/* -------------------------------------------------------------------------- */

const VERBS = [
  { v: "Think", d: "Find a real problem worth a day." },
  { v: "Build", d: "Turn it into a working prototype." },
  { v: "Ship", d: "Get it running. Real beats polished." },
  { v: "Present", d: "Demo it and defend the decisions." },
];
const CATEGORIES = ["Web", "Mobile", "AI", "Hardware", "Games", "Fintech", "Education", "Civic tech", "Design-led"];

function TheBuild() {
  const numbers = [
    { v: `~${STUDENTS}`, l: "Students" },
    { v: `≤${TEAM_MAX}`, l: "Per team" },
    { v: "1", l: "Day" },
  ];
  return (
    <section aria-labelledby="ob-build" className="lp-section ob-sec ob-grid border-y lp-rule">
      <div className="lp-wrap">
        <Label n="03">The build</Label>
        <div className="mt-6 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end print:grid-cols-[1.2fr_1fr] print:items-end">
          <h2 id="ob-build" className="ob-h ob-lg max-w-[14ch]" data-reveal>
            Think. Build. Ship. Present.
          </h2>
          <dl className="grid grid-cols-3 border-t border-[var(--ob-ink)]" data-reveal>
            {numbers.map((n) => (
              <div key={n.l} className="pt-4">
                <dd className="ob-h text-[clamp(2.6rem,6vw,4.4rem)] tabular-nums print:text-[5rem]">{n.v}</dd>
                <dt className="ob-label mt-2">{n.l}</dt>
              </div>
            ))}
          </dl>
        </div>

        <ol className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 print:grid-cols-4">
          {VERBS.map((s, i) => (
            <li key={s.v} className="ob-card p-5" data-reveal style={{ "--reveal-delay": `${i * 70}ms` } as CSSProperties}>
              <p className="ob-mono text-xs font-semibold text-[var(--ob-orange)] print:text-[1rem]">
                {String(i + 1).padStart(2, "0")} / {s.v.toLowerCase()}
              </p>
              <p className="mt-3 text-2xl font-extrabold tracking-tight print:text-[2.2rem]">{s.v}</p>
              <p className="mt-1 text-[1rem] leading-snug text-[var(--ob-ink-2)] print:text-[1.3rem]">{s.d}</p>
            </li>
          ))}
        </ol>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <ul className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <li key={c} className="ob-mono rounded-md border border-[var(--ob-line)] bg-[var(--ob-panel)] px-2.5 py-1 text-[0.8rem] font-semibold print:text-[1.1rem]">
                {c}
              </li>
            ))}
          </ul>
          <p className="ob-mono text-[0.8rem] font-semibold text-[var(--ob-muted)] print:text-[1.1rem]">
            <span className="text-[var(--ob-orange)]">{"//"}</span> AI is allowed, not required.
          </p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  5 · The main ask: credits                                                 */
/* -------------------------------------------------------------------------- */

const STRUCTURES = ["Team-level credits", "One event-level pool", "Shared, controlled access", "Whatever Obvious recommends"];
/* Fill levels for the allocation grid: teams use different amounts. */
const FILL = [1, 0.7, 0.9, 0.5, 1, 0.8, 0.6, 1, 0.75, 0.9, 0.55, 1, 0.85, 0.65, 1, 0.7, 0.95, 0.6, 0.8, 1];

function Credits() {
  return (
    <section id="the-ask" aria-labelledby="ob-ask" className="lp-section ob-dark ob-grid scroll-mt-6">
      <div className="lp-wrap grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:items-center print:grid-cols-[1.15fr_1fr] print:items-center">
        <div>
          <Label n="04">The main ask</Label>
          <h2 id="ob-ask" className="ob-h mt-6 max-w-[12ch] text-[clamp(2.8rem,7vw,6rem)] print:text-[6.4rem]" data-reveal>
            Give the teams <span className="text-[var(--ob-orange)]">credits.</span>
          </h2>
          <div className="ob-body mt-8" data-reveal>
            <p>
              We&rsquo;re asking Obvious for API or token credits for Hack 876 teams that want to build with Obvious during the
              event.
            </p>
            <p className="font-semibold text-[#f2f1ed]">No sponsorship package. No tiers. Just meaningful access to the tool.</p>
          </div>
          <ul className="mt-8 flex flex-wrap gap-2" data-reveal>
            {STRUCTURES.map((s) => (
              <li key={s} className="ob-mono rounded-md border border-[rgb(242_241_237/0.2)] px-3 py-1.5 text-[0.8rem] font-semibold text-[#f2f1ed] print:text-[1.1rem]">
                {s}
              </li>
            ))}
          </ul>
          <div className="lp-no-print mt-9">
            <Link href="/partner" className="ob-btn ob-btn-orange">
              Explore access <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        <div data-reveal>
          <div className="ob-card p-5 sm:p-6">
            <div className="ob-mono flex items-center justify-between text-[0.78rem] text-[rgb(242_241_237/0.6)] print:text-[1.05rem]">
              <span>credits / {TEAMS} teams</span>
              <span className="flex items-center gap-2">
                <span className="ob-live" /> proposed
              </span>
            </div>
            <div aria-hidden className="mx-auto mt-5 grid max-w-[19rem] grid-cols-5 gap-2 sm:gap-2.5 print:max-w-[24rem]">
              {FILL.slice(0, TEAMS).map((f, i) => (
                <span key={i} className="ob-cell" style={{ "--f": f, "--d": `${(i % 5) * 0.12 + Math.floor(i / 5) * 0.2}s` } as CSSProperties} />
              ))}
            </div>
            <p className="sr-only">An illustration of credits spread across {TEAMS} teams.</p>
            <p className="ob-mono mt-5 border-t border-[rgb(242_241_237/0.14)] pt-4 text-[0.78rem] leading-relaxed text-[rgb(242_241_237/0.7)] print:text-[1.05rem]">
              <span className="text-[var(--ob-orange)]">access</span>: opt-in, per team
              <br />
              <span className="text-[var(--ob-orange)]">structure</span>: set by Obvious
            </p>
          </div>
          <p className="mt-5 text-[1rem] leading-relaxed text-[rgb(242_241_237/0.75)] print:text-[1.3rem]">
            Many participants are under 18. We&rsquo;re happy to structure access around Obvious&rsquo;s account and age
            requirements. Where a tool needs an adult account holder, Hack 876 can require an 18+ member on that team.
          </p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  6 · Small prizes                                                          */
/* -------------------------------------------------------------------------- */

const PRIZE_OPTIONS = ["Gift cards", "Obvious credits", "Developer gear", "Small hardware or accessories"];

function Prizes() {
  return (
    <section id="prizes" aria-labelledby="ob-prizes" className="lp-section ob-sec scroll-mt-6">
      <div className="lp-wrap grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center print:grid-cols-[1fr_1.1fr] print:items-center">
        <div>
          <Label n="05">Small prize support</Label>
          <h2 id="ob-prizes" className="ob-h ob-lg mt-6 max-w-[14ch]" data-reveal>
            A little extra goes a long way.
          </h2>
          <div className="ob-body mt-8" data-reveal>
            <p>Local funding is covering the core event. If Obvious wants to add something, the smaller awards are where it would show most.</p>
          </div>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2" data-reveal>
            {PRIZE_OPTIONS.map((p) => (
              <li key={p} className="flex items-center gap-3 text-[1.02rem] font-semibold print:text-[1.3rem]">
                <span aria-hidden className="inline-block h-1.5 w-1.5 bg-[var(--ob-orange)]" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        <ul className="grid gap-3" data-reveal>
          {AWARDS.map((a) => (
            <li key={a.name} className="ob-card flex items-center justify-between gap-4 px-5 py-5 print:py-6">
              <span>
                <span className="block text-xl font-extrabold tracking-tight print:text-[2rem]">{a.name}</span>
                <span className="mt-0.5 block text-[var(--ob-muted)] print:text-[1.25rem]">{a.line}</span>
              </span>
              <span className="ob-mono shrink-0 rounded-md border border-dashed border-[var(--ob-line)] px-2.5 py-1 text-[0.72rem] font-semibold text-[var(--ob-muted)] uppercase print:text-[0.95rem]">
                Open
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  7 · If Obvious wants to show up                                           */
/* -------------------------------------------------------------------------- */

const ROLES = [
  { k: "Judge", d: "Help evaluate what students build." },
  { k: "Mentor", d: "Spend part of the day helping teams get unblocked." },
  { k: "Speaker", d: "Share how modern AI products actually get built." },
  { k: "Challenge", d: "Recognize the best agentic or Obvious-built project." },
];

function ShowUp() {
  return (
    <section id="show-up" aria-labelledby="ob-show" className="lp-section ob-panel scroll-mt-6">
      <div className="lp-wrap">
        <Label n="06">If Obvious wants to show up</Label>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <h2 id="ob-show" className="ob-h ob-lg max-w-[16ch]" data-reveal>
            The door is very open.
          </h2>
          <p className="ob-mono text-[0.85rem] font-semibold text-[var(--ob-muted)] print:text-[1.15rem]">remote | in person</p>
        </div>
        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 print:grid-cols-4">
          {ROLES.map((r, i) => (
            <li key={r.k} className="ob-card ob-sec p-6" data-reveal style={{ "--reveal-delay": `${i * 70}ms` } as CSSProperties}>
              <p className="ob-mono text-xs font-semibold tracking-[0.14em] text-[var(--ob-orange)] uppercase print:text-[1rem]">{r.k}</p>
              <p className="mt-3 text-[1.05rem] leading-snug text-[var(--ob-ink-2)] print:text-[1.4rem]">{r.d}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10 grid gap-6 border-t lp-rule pt-8 lg:grid-cols-2 print:grid-cols-2">
          <p className="ob-body">
            If someone from Obvious wants to spend a few hours with Jamaica&rsquo;s next generation of builders, we&rsquo;d love to
            have them. Saran, that very much includes you.
          </p>
          <p className="ob-body text-[var(--ob-muted)]">
            A &ldquo;Best Use of Obvious&rdquo; or &ldquo;Best Agentic Build&rdquo; award is possible if you want it. It&rsquo;s
            optional, and the event stays platform-neutral.
          </p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  8 · Closing                                                               */
/* -------------------------------------------------------------------------- */

function Closing() {
  return (
    <section aria-labelledby="ob-close" className="lp-section lp-close ob-sec ob-grid">
      <div className="lp-wrap grid items-center gap-12 lg:grid-cols-[1.4fr_1fr] print:grid-cols-[1.5fr_1fr]">
        <div>
          <Label>Let&rsquo;s build something useful together</Label>
          <h2 id="ob-close" className="ob-h ob-lg mt-6 max-w-[18ch]" data-reveal>
            The next builder shouldn&rsquo;t have to wait until university to use serious tools.
          </h2>
          <div className="ob-body mt-8" data-reveal>
            <p>Hack 876 is building the room. We&rsquo;d love Obvious to help put more capability inside it.</p>
          </div>
          <div className="lp-no-print mt-9 flex flex-wrap gap-3">
            <Link href="/partner" className="ob-btn ob-btn-solid">
              Let&rsquo;s talk <span aria-hidden>→</span>
            </Link>
            <a href={PDF} download={PDF_NAME} className="ob-btn ob-btn-ghost">
              Download brief
            </a>
          </div>
          <div className="mt-12 grid gap-1">
            <p className="text-lg font-extrabold">Stefen O. Ewers Jr.</p>
            <p className="text-[var(--ob-muted)]">Organizing Team, Hack 876</p>
            <p className="ob-label mt-3">Hack 876 · Jamaica · {event.year}</p>
          </div>
          <p className="lp-note mt-10 max-w-xl">
            This is a proposal. Hack 876 is not currently sponsored by, partnered with or endorsed by Obvious, and no credits,
            prizes, staff time or access arrangements have been agreed.
          </p>
        </div>

        <div className="relative hidden lg:block print:block">
          <HackerPass lanyard="var(--ob-orange)" className="max-w-[16rem] print:max-w-[22rem]" />
        </div>
      </div>
    </section>
  );
}
