import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { BirdMark, DoctorBird } from "@/components/art/DoctorBird";
import { Logo } from "@/components/art/Wordmark";
import { DownloadDeck } from "@/components/proposal/DownloadDeck";
import { JamaicaMap } from "@/components/proposal/JamaicaMap";
import { eligibility, event, schools, stats } from "@/data/event";
import "@/components/proposal/proposal.css";
import "./anthropic.css";

/*
 * Private partnership brief for Anthropic. The only core ask is Claude API
 * credits for student teams. Not linked from the public site; noindex/nofollow
 * here and via X-Robots-Tag in next.config.ts.
 *
 * This is a proposal. Nothing here should read as an existing partnership.
 */

const DECK_LABEL = "Hack 876 × Anthropic";

export const metadata: Metadata = {
  title: { absolute: "Hack 876 × Anthropic" },
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

/* Canonical numbers come from the event data. */
const STUDENTS = eligibility.maxHackers;
const PARTNER_SCHOOLS = schools.length;
const TEAMS = stats.find((s) => s.label === "teams")?.value;
const TEAM_SIZE = `${eligibility.teamSize.min}–${eligibility.teamSize.max}`;
const FORMS = eligibility.formOptions;

/* Anthropic's own sources. */
const SRC = {
  education: "https://www.anthropic.com/news/introducing-claude-for-education",
  teachers: "https://www.anthropic.com/news/claude-for-teachers",
  learning: "https://www.anthropic.com/research/economic-index-march-2026-report",
  primitives: "https://www.anthropic.com/research/economic-index-primitives",
};

/* -------------------------------------------------------------------------- */

function Label({ n, children }: { n?: string; children: ReactNode }) {
  return (
    <p className="ap-label flex items-center gap-3">
      {n && <span className="text-[var(--ap-accent)]">{n}</span>}
      <span>{children}</span>
    </p>
  );
}

function Src({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="ap-mono ap-link text-[0.72rem] tracking-wide text-[var(--ap-muted)]" target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function AnthropicOpportunityPage() {
  return (
    <div className="lp ap" style={{ "--lp-deck-label": `"${DECK_LABEL}"` } as CSSProperties}>
      <header className="lp-wrap flex items-center justify-between gap-4 py-5">
        <Link href="/" className="flex items-center gap-2 rounded-lg" aria-label="Hack 876 home">
          <BirdMark className="h-6 w-10" />
          <Logo className="text-[1.4rem]" />
        </Link>
        <DownloadDeck href="/proposals/hack876-anthropic-partnership-brief.pdf" filename="Hack 876 x Anthropic - Partnership Brief.pdf" />
      </header>

      <main id="main">
        <div className="lp-page">
          <Hero />
        </div>
        <div className="lp-page">
          <TheIdea />
        </div>
        <div className="lp-page">
          <WhyClaude />
        </div>
        <div className="lp-page">
          <ExperienceCompounds />
        </div>
        <div className="lp-page">
          <TheRoom />
        </div>
        <div className="lp-page">
          <WhatClaudeEnables />
        </div>
        <div className="lp-page">
          <TheAsk />
        </div>
        <div className="lp-page">
          <DoMore />
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
  const meta = ["Jamaica", String(event.year), `~${STUDENTS} student builders`, `Teams of ${TEAM_SIZE}`, "1 day"];
  return (
    <section aria-labelledby="ap-hero" className="lp-hero ap-sec relative flex min-h-[calc(100svh-5rem)] flex-col justify-between border-y ap-rule">
      <div className="lp-wrap w-full pt-16 sm:pt-24">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="ap-label">Hack 876 × Anthropic</p>
          <p className="ap-label flex items-center gap-2">
            <span aria-hidden className="ap-dot" />
            Private partnership brief
          </p>
        </div>

        <h1 id="ap-hero" className="ap-display ap-xl mt-14 max-w-[16ch] sm:mt-20">
          Put Claude in the hands of Jamaica&rsquo;s next generation of builders.
        </h1>

        <div className="ap-body mt-10">
          <p>
            Hack 876 is bringing secondary-school students across Jamaica together for one day to turn ideas into working
            prototypes.
          </p>
          <p>
            We&rsquo;re asking Anthropic for one thing:{" "}
            <strong className="font-semibold text-[var(--ap-ink)]">Claude API credits for the student teams building them.</strong>
          </p>
        </div>

        <div className="lp-no-print mt-10 flex flex-wrap items-center gap-3">
          <a href="#the-idea" className="ap-btn ap-btn-solid">
            Explore the opportunity <span aria-hidden>↓</span>
          </a>
          <a href="/proposals/hack876-anthropic-partnership-brief.pdf" download="Hack 876 x Anthropic - Partnership Brief.pdf" className="ap-btn ap-btn-ghost">
            Download brief
          </a>
        </div>
      </div>

      <div className="lp-wrap w-full pt-14 pb-10">
        <ul className="ap-mono flex flex-wrap gap-x-6 gap-y-2 border-t ap-rule pt-5 text-[0.78rem] tracking-wide text-[var(--ap-muted)] uppercase">
          {meta.map((m, i) => (
            <li key={m} className="flex items-center gap-6">
              {i > 0 && <span aria-hidden className="text-[var(--ap-rule)]">/</span>}
              {m}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  2 · The idea                                                              */
/* -------------------------------------------------------------------------- */

const VERBS = [
  { v: "Think", d: "Find a problem worth solving and decide what matters." },
  { v: "Build", d: "Turn the idea into a working prototype in a single day." },
  { v: "Explain", d: "Defend what they made, and why, in front of judges." },
];

function TheIdea() {
  return (
    <section id="the-idea" aria-labelledby="ap-idea" className="lp-section ap-sec scroll-mt-10">
      <div className="lp-wrap">
        <Label n="01">The idea</Label>
        <div className="mt-8 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-end print:grid-cols-[1.2fr_1fr] print:items-end">
          <h2 id="ap-idea" className="ap-display ap-lg max-w-[14ch]" data-reveal>
            They shouldn&rsquo;t have to wait until university.
          </h2>
          <div className="ap-body" data-reveal>
            <p>
              The students entering Jamaica&rsquo;s universities in 2028, 2029 and 2030 will enter a world where building
              software with AI is ordinary.
            </p>
            <p>Hack 876 gives them a head start. Claude can be part of how they learn to build.</p>
          </div>
        </div>

        <ol className="mt-16 grid border-t ap-rule sm:grid-cols-3 print:mt-12 print:grid-cols-3">
          {VERBS.map((x, i) => (
            <li key={x.v} className={`py-8 sm:pr-8 ${i ? "border-t ap-rule sm:border-t-0 sm:border-l sm:pl-8 print:border-t-0 print:border-l print:pl-8" : ""}`}>
              <p className="ap-label">0{i + 1}</p>
              <p className="ap-display mt-3 text-[clamp(2.2rem,4vw,3.4rem)] print:text-[3.6rem]">{x.v}</p>
              <p className="mt-3 max-w-[26ch] text-[var(--ap-muted)]">{x.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  3 · Why Claude                                                            */
/* -------------------------------------------------------------------------- */

function WhyClaude() {
  return (
    <section aria-labelledby="ap-why" className="lp-section ap-paper">
      <div className="lp-wrap">
        <Label n="02">Why Claude</Label>
        <h2 id="ap-why" className="ap-display ap-lg mt-8 max-w-[22ch]">
          <span className="text-[var(--ap-muted)]">Not because it can give them answers.</span>
          <br />
          Because it can help them think.
        </h2>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1fr] print:mt-10 print:grid-cols-2">
          <div>
            <blockquote className="border-l-2 border-[var(--ap-accent)] pl-5">
              <p className="ap-md">&ldquo;Guiding rather than answering.&rdquo;</p>
              <footer className="mt-3">
                <Src href={SRC.education}>Anthropic · Introducing Claude for Education · April 2025</Src>
              </footer>
            </blockquote>
            <p className="ap-body mt-8">
              Anthropic has positioned Claude in education as a tool that develops independent thinking rather than replacing
              it, and in July 2026 extended that work to verified US K-12 educators with{" "}
              <a href={SRC.teachers} className="ap-link" target="_blank" rel="noopener noreferrer">
                Claude for Teachers
              </a>
              . That is the behaviour Hack 876 wants to encourage.
            </p>
          </div>
          <div>
            <ul className="border-t ap-rule">
              {[
                "Students still choose the problem.",
                "Students still make the decisions.",
                "Students still build.",
                "Students still explain why their solution deserves to exist.",
              ].map((t) => (
                <li key={t} className="border-b ap-rule py-4 text-lg font-medium">
                  {t}
                </li>
              ))}
            </ul>
            <p className="ap-md mt-8">
              Claude becomes a collaborator. <span className="text-[var(--ap-muted)]">Not the project.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  4 · Experience compounds                                                  */
/* -------------------------------------------------------------------------- */

function ExperienceCompounds() {
  return (
    <section aria-labelledby="ap-exp" className="lp-section ap-sec">
      <div className="lp-wrap">
        <Label n="03">Why early access matters</Label>
        <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start print:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 id="ap-exp" className="ap-display ap-xl">
              Experience compounds.
            </h2>
            <div className="ap-body mt-8">
              <p>Anthropic&rsquo;s Economic Index has explored a simple pattern: people appear to get better at working with AI through experience.</p>
              <p>
                The implication for education is simple. A student&rsquo;s first meaningful work with frontier AI should not
                have to wait for university or the workforce.
              </p>
            </div>
          </div>
          <div className="lg:pt-4">
            <div className="grid grid-cols-2 border-t ap-rule">
              <div className="py-6 pr-6">
                <p className="ap-num text-[clamp(3.4rem,7vw,5.6rem)] print:text-[5.6rem]">10%</p>
                <p className="mt-3 text-[0.95rem] text-[var(--ap-muted)]">higher conversation success rate among higher-tenure Claude users</p>
              </div>
              <div className="border-l ap-rule py-6 pl-6">
                <p className="ap-num text-[clamp(3.4rem,7vw,5.6rem)] print:text-[5.6rem]">48%</p>
                <p className="mt-3 text-[0.95rem] text-[var(--ap-muted)]">of per-capita usage is concentrated in the top 20 countries</p>
              </div>
            </div>
            <blockquote className="mt-6 border-l-2 border-[var(--ap-accent)] pl-5">
              <p className="text-lg leading-relaxed">
                &ldquo;&hellip;it could also be evidence of learning-by-doing, where people get better at using Claude through
                experience.&rdquo;
              </p>
              <footer className="mt-3">
                <Src href={SRC.learning}>Anthropic Economic Index · Learning curves · March 2026</Src>
              </footer>
            </blockquote>
            <p className="mt-6 text-[0.95rem] text-[var(--ap-muted)]">
              Anthropic has already paired AI literacy with access elsewhere, through its partnership with Rwanda&rsquo;s
              government and ALX. <Src href={SRC.primitives}>Economic Index · January 2026</Src>
            </p>
          </div>
        </div>
        <p className="ap-md mt-14 print:mt-10">Let Jamaica&rsquo;s young builders start learning now.</p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  5 · The room (colour arrives)                                             */
/* -------------------------------------------------------------------------- */

function TheRoom() {
  const metrics = [
    { n: `~${STUDENTS}`, l: "Secondary-school students", c: "text-emerald-deep" },
    { n: TEAM_SIZE, l: "Students per team", c: "text-[var(--ap-accent)]" },
    { n: "1", l: "Day to build", c: "text-bill-deep" },
  ];
  return (
    <section aria-labelledby="ap-room" className="lp-section lp-dense lp-grid-bg relative overflow-hidden bg-cream">
      <div aria-hidden className="pointer-events-none absolute top-10 right-8 hidden w-36 sm:block print:block print:w-32">
        <DoctorBird flutter={false} className="w-full" />
      </div>
      <div className="lp-wrap">
        <Label n="04">The room</Label>
        <h2 id="ap-room" className="display mt-6 text-[clamp(3rem,8vw,6rem)] leading-[0.95] print:text-[5.6rem]">
          One room. ~{STUDENTS} builders.
        </h2>

        <dl className="mt-10 grid grid-cols-3 gap-4 print:mt-6">
          {metrics.map((m) => (
            <div key={m.l} className="sticker bg-paper p-5">
              <dd className={`ap-num text-[clamp(2.8rem,7vw,5rem)] print:text-[4.4rem] ${m.c}`}>{m.n}</dd>
              <dt className="ap-label mt-3 !text-ink-soft">{m.l}</dt>
            </div>
          ))}
        </dl>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center print:mt-6 print:grid-cols-[1.25fr_0.75fr] print:items-center">
          <div>
            <p className="ap-body !max-w-none">
              Hack 876 is being built through relationships across Jamaica&rsquo;s secondary-school community, for students in{" "}
              {FORMS[0]} through {FORMS[FORMS.length - 1]}
              {TEAMS ? `, about ${TEAMS} teams in all` : ""}.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {schools.map((s, i) => (
                <li
                  key={s}
                  className="rounded-full border-2 border-ink bg-paper px-3 py-1 text-sm font-bold"
                  style={{ rotate: `${[-1, 1, -0.6, 0.8][i % 4]}deg` }}
                >
                  {s}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[0.95rem] text-ink-soft">
              Participation is not restricted to these {PARTNER_SCHOOLS} schools. Students from outside supported arrangements may
              need to arrange their own transportation and lodging.
            </p>
          </div>
          <JamaicaMap className="w-full print:mx-auto print:max-w-[3.4in]" />
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  6 · What Claude enables                                                   */
/* -------------------------------------------------------------------------- */

const USES = [
  { k: "Code", d: "Debug, prototype and understand unfamiliar code." },
  { k: "Product", d: "Pressure-test ideas, scope features and structure solutions." },
  { k: "Research", d: "Explore a problem quickly and challenge assumptions." },
  { k: "Design", d: "Turn rough concepts into clearer product experiences." },
  { k: "Communication", d: "Explain what they built, and why it matters." },
];

function WhatClaudeEnables() {
  return (
    <section aria-labelledby="ap-uses" className="lp-section ap-paper">
      <div className="lp-wrap">
        <Label n="05">What Claude enables</Label>
        <h2 id="ap-uses" className="ap-display ap-lg mt-8 max-w-[18ch]">
          Give every team a frontier AI collaborator.
        </h2>
        <ol className="mt-14 grid border-t ap-rule sm:grid-cols-2 lg:grid-cols-5 print:mt-10 print:grid-cols-5">
          {USES.map((u, i) => (
            <li key={u.k} className={`border-b ap-rule py-6 pr-6 lg:border-b-0 print:border-b-0 ${i ? "lg:border-l lg:pl-6 print:border-l print:pl-6" : ""}`}>
              <p className="ap-label !text-[var(--ap-accent)]">{u.k}</p>
              <p className="mt-3 text-lg leading-snug font-medium">{u.d}</p>
            </li>
          ))}
        </ol>
        <p className="mt-10 text-[var(--ap-muted)]">Augmentation and learning. Not a shortcut past either.</p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  7 · The ask                                                               */
/* -------------------------------------------------------------------------- */

function TheAsk() {
  return (
    <section aria-labelledby="ap-ask" className="lp-section ap-ink-band">
      <div className="lp-wrap">
        <Label n="06">The partnership</Label>
        <h2 id="ap-ask" className="ap-display mt-8 text-[clamp(3.4rem,9vw,8rem)] print:text-[7.6rem]">
          Give the builders credits.
        </h2>
        <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] print:mt-10 print:grid-cols-[1.1fr_0.9fr]">
          <div className="ap-body">
            <p className="text-[var(--ap-ivory)]">We&rsquo;re asking Anthropic to provide Claude API credits for teams participating in Hack 876.</p>
            <p>
              Claude for Education already invites student builders to apply for API credits.{" "}
              <Src href={SRC.education}>Anthropic · April 2025</Src> This is the same idea, for a room of them.
            </p>
            <ul className="ap-mono mt-6 space-y-1 text-[0.95rem] tracking-wide text-[var(--ap-ivory)]">
              <li>No sponsorship fee.</li>
              <li>No tier.</li>
              <li>No oversized branding requirement.</li>
            </ul>
            <p className="ap-md !mt-6 text-[var(--ap-ivory)]">Just access to the tool.</p>
          </div>
          <div className="rounded-2xl border border-[rgb(244_241_234/0.18)] p-6">
            <p className="ap-label">Structure, left open on purpose</p>
            <ul className="mt-4 space-y-3 text-[var(--ap-ivory)]">
              {["Credits allocated to Hack 876", "Team-level access through an event account", "Any other structure Anthropic recommends"].map((t) => (
                <li key={t} className="flex gap-3">
                  <span aria-hidden className="ap-dot mt-2 shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[0.95rem] leading-relaxed text-[rgb(244_241_234/0.7)]">
              Many participants are minors. We will work with Anthropic to structure access in whatever way is appropriate for
              student safety, platform policy and responsible API use. We do not assume students can hold individual API
              accounts.
            </p>
            <Link href="/partner" className="lp-no-print ap-btn ap-btn-solid mt-6">
              Let&rsquo;s make Claude available <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  8 · If Anthropic wants to do more                                         */
/* -------------------------------------------------------------------------- */

const MORE = [
  { k: "Mentor", d: "Spend part of the build day helping teams think through problems." },
  { k: "Judge", d: "Help evaluate what Jamaica’s young builders create." },
  { k: "Speaker", d: "Give students a short glimpse inside frontier AI building." },
  { k: "Challenge", d: "Recognize an exceptional use of Claude." },
];

function DoMore() {
  return (
    <section aria-labelledby="ap-more" className="lp-section ap-sec">
      <div className="lp-wrap">
        <Label n="07">If Anthropic wants to do more</Label>
        <h2 id="ap-more" className="ap-display ap-md mt-8 max-w-[28ch]">
          And if you want to show up too, the door is open.
        </h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 print:grid-cols-4">
          {MORE.map((m) => (
            <li key={m.k} className="rounded-2xl border ap-rule bg-[var(--ap-paper)] p-5">
              <p className="ap-label">{m.k}</p>
              <p className="mt-3 leading-relaxed">{m.d}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-[var(--ap-muted)]">
          None of these are required. Remote participation, or educational material and responsible-use guidance, would be just
          as welcome.
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  9 · Closing                                                               */
/* -------------------------------------------------------------------------- */

function Closing() {
  return (
    <section aria-labelledby="ap-close" className="lp-section lp-close ap-sec">
      <div className="lp-wrap">
        <h2 id="ap-close" className="ap-display ap-xl max-w-[18ch]">
          The next great AI builder may already be sitting in a classroom in Kingston.
        </h2>
        <p className="ap-md mt-6 text-[var(--ap-muted)]">Let&rsquo;s give them something worth building with.</p>

        <div className="mt-14 grid gap-10 border-t ap-rule pt-10 lg:grid-cols-[1fr_1fr] print:mt-10 print:grid-cols-2 print:pt-8">
          <div className="flex items-start gap-5">
            <div aria-hidden className="w-20 shrink-0">
              <DoctorBird flutter={false} className="w-full" />
            </div>
            <div>
              <Logo className="text-[2rem]" />
              <p className="ap-label mt-2">Jamaica · {event.year}</p>
              <a href={event.siteUrl} className="ap-link mt-2 inline-block text-[0.95rem]">
                {event.siteUrl.replace(/^https?:\/\/(www\.)?/, "")}
              </a>
            </div>
          </div>
          <div>
            <p className="text-lg font-semibold">Stefen O. Ewers Jr.</p>
            <p className="text-[var(--ap-muted)]">Organizer, Hack 876</p>
            <p className="mt-2 text-[0.95rem] text-[var(--ap-muted)]">Georgia Tech graduate student · Claude Campus Ambassador, Georgia Tech</p>
            <Link href="/partner" className="lp-no-print ap-btn ap-btn-solid mt-6">
              Start a conversation <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        <footer className="mt-14 space-y-3 border-t ap-rule pt-6 print:mt-auto">
          <p className="text-[0.85rem] text-[var(--ap-muted)]">
            Hack 876 is independently organized by Stefen Ewers and is not an Anthropic or Claude Campus Ambassador program event.
            Stefen is a Claude Campus Ambassador at Georgia Tech, but this project sits outside the scope of that role. This brief
            is a proposal; no partnership currently exists.
          </p>
          <p className="ap-mono flex flex-wrap gap-x-5 gap-y-1 text-[0.7rem] tracking-wide text-[var(--ap-muted)]">
            <span>Sources:</span>
            <a className="ap-link" href={SRC.education}>anthropic.com/news/introducing-claude-for-education</a>
            <a className="ap-link" href={SRC.teachers}>anthropic.com/news/claude-for-teachers</a>
            <a className="ap-link" href={SRC.learning}>anthropic.com/research/economic-index-march-2026-report</a>
            <a className="ap-link" href={SRC.primitives}>anthropic.com/research/economic-index-primitives</a>
          </p>
        </footer>
      </div>
    </section>
  );
}
