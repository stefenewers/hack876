import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { BirdMark, DoctorBird } from "@/components/art/DoctorBird";
import { Logo } from "@/components/art/Wordmark";
import { DownloadDeck } from "@/components/proposal/DownloadDeck";
import { MentorRoom } from "@/components/proposal/Illustrations";
import { Check, Kicker, Lines } from "@/components/proposal/primitives";
import { eligibility, event, eventWhen, stats } from "@/data/event";
import { LevelsSection } from "@/components/proposal/Sponsorship";
import "@/components/proposal/proposal.css";
import { DeliveryAndNext, OpeningSummary } from "@/components/proposal/PartnershipSections";

/*
 * Private partnership proposal for Jermaine Henry / Norus Technologies.
 * Same system as the other proposals. Not linked from the public site;
 * noindex/nofollow here and via X-Robots-Tag in next.config.ts.
 *
 * Deliberately has NO Founding Gold Partner tier. Mentorship is the lead ask.
 */

const SPONSOR = "Norus Technologies";
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
const TEAMS = stats.find((s) => s.label === "teams")?.value ?? 20;
/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

const SOURCES = [
  { id: 1, org: "Norus Technologies", label: "Home", href: "https://norustech.com/" },
  { id: 2, org: "Norus Technologies", label: "Who We Are", href: "https://norustech.com/who-we-are/" },
  { id: 3, org: "Norus Technologies", label: "Our Initiatives", href: "https://norustech.com/our-initiatives/" },
  { id: 4, org: "Norus Technologies", label: "What We Do", href: "https://norustech.com/what-we-do/" },
] as const;

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
          <OpeningSummary
            label={DECK_LABEL}
            docLabel="Private partnership proposal"
            org="Norus"
            headline={`The most valuable thing Norus could bring to Hack876 is Norus.`}
            highlight={`is Norus`}
            sub={`Hack876 gives about ${STUDENTS} students one day to turn ideas into working prototypes. They will get further with people who build software for a living beside them.`}
            brief={{
              fit: `Norus is a Jamaican-founded software company that already supports young developers through its internship programme and as a partner and sponsor of JamCoders.`,
              request: `Norus developers, designers and product people as mentors during the build period, in whatever number and shifts Norus can spare.`,
              enables: `Teams get unblocked by working builders: cutting scope, debugging, checking a data model, rehearsing a demo.`,
              outcome: `Mentorship Partner recognition, a Norus mentor help station and badges on the day, and a written recap.`,
              next: `A reply from Jermaine on roughly how many people could come, and for which part of the day. Hack876 provides the venue, the schedule and a briefing beforehand.`,
            }}
            requestDetail={`No funding is requested. A contribution at any level is welcome and never expected.`}
          />
        </div>
        <div className="lp-page">
          <BringTheBench />
        </div>
        <div className="lp-page">
          <WhatAMentorDoes />
        </div>
        <div className="lp-page">
          <FlexibleBench />
        </div>
        <div className="lp-page">
          <NorusInTheRoom />
        </div>
        <div className="lp-page">
          <DeliveryAndNext n="05" next="A reply on roughly how many Norus people could come, and for which part of the day." route="Hack876 provides the venue, the schedule and a mentor briefing beforehand. Mentors can come for the whole build period or in shifts." />
        </div>
        <div className="lp-page">
          <PrizeAndFood />
        </div>
        <div className="lp-page">
          <Closing />
        </div>
      </main>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  06 Bring the bench (signature)                                            */
/* -------------------------------------------------------------------------- */

function BringTheBench() {
  return (
    <section aria-labelledby="lp-bench" className="lp-section lp-dense lp-center">
      <div className="lp-wrap">
        <div className="flex flex-wrap items-center gap-3">
          <Kicker n="01">The marquee invitation</Kicker>
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
    <section aria-labelledby="lp-mentor" className="lp-section lp-dense lp-center bg-paper">
      <div className="lp-wrap">
        <Kicker n="02">What a Norus mentor actually does</Kicker>
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
    <section aria-labelledby="lp-flex" className="lp-section lp-dense lp-center">
      <div className="lp-wrap grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center print:grid-cols-[1.1fr_0.9fr] print:items-center">
        <div>
          <Kicker n="03">No mandatory headcount</Kicker>
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
    <section aria-labelledby="lp-room" className="lp-section lp-dense lp-center lp-dark lp-grid-bg relative overflow-hidden">
      <div className="lp-wrap">
        <Kicker n="04">Recognition</Kicker>
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
    <LevelsSection
      n="05"
      heading="Mentors first. Everything else is welcome too."
      lead="If Norus would also like to contribute financially, these are the levels. Any amount within a level is welcome, and none of it is expected."
      show={["bronze", "silver", "gold"]}
    />
  );
}

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
