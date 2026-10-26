import { HackerPass } from "@/components/art/HackerPass";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { BirdMark } from "@/components/art/DoctorBird";
import { Logo } from "@/components/art/Wordmark";
import { DownloadDeck } from "@/components/proposal/DownloadDeck";
import { eligibility, event, eventWhen } from "@/data/event";
import "@/components/proposal/proposal.css";
import "./obvious.css";
import { OpeningSummary } from "@/components/proposal/PartnershipSections";

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
    googleBot: { index: false, follow: false, noimageindex: true } },
  openGraph: null,
  twitter: null };

const STUDENTS = eligibility.maxHackers;
const TEAM_MAX = eligibility.teamSize.max;
const TEAMS = Math.ceil(STUDENTS / TEAM_MAX);
/* Special awards only. Reward amounts stay off this page. */
const FRONTIER = [
  { v: "39", l: "PRs created" },
  { v: "636.8M", l: "Tokens" },
  { v: "83.1K", l: "Lines added" },
  { v: "Solo", l: "Team" },
];

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
          <OpeningSummary
            label={DECK_LABEL}
            docLabel="Private partnership brief"
            org="Obvious"
            headline={`Obvious already knows Jamaican builders. Help us reach the next ones.`}
            highlight={`reach the next ones`}
            sub={`Hack 876 brings about ${STUDENTS} Jamaican secondary-school students together for one day to build, ship and present something real.`}
            brief={{
              fit: `One of our organisers built at Obvious’s Frontier Build in Atlanta and saw the team and its community firsthand.`,
              request: `API or token credits for the Hack 876 teams that choose to build with Obvious during the event.`,
              enables: `Teams can build with a serious AI tool for a day, under whatever access structure Obvious recommends.`,
              outcome: `Recognition as a tools partner, and a written recap of what teams built with Obvious.`,
              next: `A reply on whether credits are possible, and how Obvious would want access set up.` }}
            requestDetail={`No sponsorship package and no tiers. No funding is requested.`}
          />
        </div>
        <div className="lp-page">
          <Personal />
        </div>
        <div className="lp-page">
          <Credits />
        </div>
        <div className="lp-page">
          <Closing />
        </div>
      </main>
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
          <Label n="02">The main ask</Label>
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
/*  7 · If Obvious wants to show up                                           */
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
            {event.contactEmail && (
              <a href={`mailto:${event.contactEmail}`} className="ob-mono text-sm font-semibold underline decoration-[var(--ob-line)] underline-offset-4 hover:decoration-[var(--ob-ink)]">
                {event.contactEmail}
              </a>
            )}
            <p className="ob-label mt-3">
            Hack 876 · Jamaica · {eventWhen.short}
          </p>
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
function Label({ n, children }: { n?: string; children: ReactNode }) {
  return (
    <p className="ob-label flex items-center gap-3">
      {n && <span className="ob-n">{n}</span>}
      <span>{children}</span>
    </p>
  );
}

