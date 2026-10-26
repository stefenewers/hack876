import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { BirdMark, DoctorBird } from "@/components/art/DoctorBird";
import { Logo } from "@/components/art/Wordmark";
import { DownloadDeck } from "@/components/proposal/DownloadDeck";
import { Check, Kicker, Lines, Ref } from "@/components/proposal/primitives";
import { eligibility, event, eventWhen } from "@/data/event";
import { BandStrip, LevelsSection } from "@/components/proposal/Sponsorship";
import "@/components/proposal/proposal.css";
import { DeliverySection, NextSection, OpeningSummary } from "@/components/proposal/PartnershipSections";
import { budgetFollows } from "@/data/partnership";
import { band } from "@/data/sponsorship";

/*
 * Private partnership proposal for JMMB / the JMMB Joan Duncan Foundation.
 * Same system as the other proposals. Not linked from the public site;
 * noindex/nofollow here and via X-Robots-Tag in next.config.ts.
 */

const SPONSOR = "JMMB Joan Duncan Foundation";
const DECK_LABEL = `Hack876 × ${SPONSOR}`;
/* Partner accent, used sparingly. */
const JMMB_ACCENT = "#e4002b";

/* The sponsorship level this proposal invites. Name, range and benefits come from sponsorship.ts. */
const PLATINUM = band("platinum");

export const metadata: Metadata = {
  title: { absolute: DECK_LABEL },
  description: "A private partnership proposal.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true } },
  openGraph: null,
  twitter: null };

/* Canonical numbers come from the event data. */
const STUDENTS = eligibility.maxHackers;
/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

const SOURCES = [
  {
    id: 1,
    org: "JMMB Joan Duncan Foundation",
    label: "Home: mission and vision",
    href: "https://www.joanduncanfoundation.org/" },
  {
    id: 2,
    org: "JMMB Group Jamaica",
    label: "JMMB Joan Duncan Foundation",
    href: "https://jm.jmmb.com/jmmb-joan-duncan-foundation" },
  {
    id: 3,
    org: "JMMB Group Jamaica",
    label: "Our Cofounders",
    href: "https://jm.jmmb.com/our-cofounders" },
  {
    id: 4,
    org: "JMMB Group Jamaica",
    label: "Sponsorship, Advertising and Media Requests",
    href: "https://jm.jmmb.com/requests" },
  {
    id: 5,
    org: "JMMB Group Jamaica",
    label: "JMMB Joan Duncan Foundation Sparks Innovation and Inclusion for Youth, Islandwide (August 26, 2025)",
    href: "https://jm.jmmb.com/jmmb-joan-duncan-foundation-sparks-innovation-and-inclusion-youth-islandwide" },
] as const;

export default function JmmbOpportunityPage() {
  return (
    <div className="lp" style={{ "--lp-deck-label": `"${DECK_LABEL}"` } as CSSProperties}>
      <header className="lp-wrap flex items-center justify-between gap-4 py-5">
        <Link href="/" className="flex items-center gap-2 rounded-lg" aria-label="Hack876 home">
          <BirdMark className="h-6 w-10" />
          <Logo className="text-[1.5rem]" />
        </Link>
        <DownloadDeck href="/proposals/hack876-jmmb-partnership-proposal.pdf" filename={`Hack876 x ${SPONSOR} - Partnership Proposal.pdf`} />
      </header>

      <main id="main">
        <div className="lp-page">
          <OpeningSummary
            label={DECK_LABEL}
            docLabel="Private partnership proposal"
            org="the JMMB Joan Duncan Foundation"
            headline={`Greatness needs somewhere to begin.`}
            highlight={`somewhere to begin`}
            sub={`For one day, students do not learn about entrepreneurship. They choose a problem, build a prototype and pitch it.`}
            brief={{
              fit: `The JMMB Joan Duncan Foundation’s mission is to develop, steward and support transformational initiatives in education and entrepreneurship.`,
              request: `A Platinum contribution from the JMMB Joan Duncan Foundation, as support for education and entrepreneurship.`,
              enables: `Helps support the equipment teams build with, the prizes, student meals and the running of the day.`,
              outcome: `About ${STUDENTS} students practise entrepreneurship for a day. The Foundation receives Platinum recognition and a written recap of what they built.`,
              next: `A conversation about whether the Foundation will consider this as a grant request. If it is not the right home, we would ask JMMB’s sponsorship team instead. A detailed budget will follow before any formal commitment.` }}
            requestDetail={`${PLATINUM.name}: ${PLATINUM.range}. Any level is welcome, and the levels are in the appendix. ${budgetFollows}`}
            outcomeLabel="What the Foundation achieves"
          />
        </div>
        <div className="lp-page">
          <WhyJmmb />
        </div>
        <div className="lp-page">
          <TwoWaysIn />
        </div>
        <div className="lp-page">
          <GoldPartner />
        </div>
        <div className="lp-page">
          <DeliverySection n="04" />
        </div>
        <div className="lp-page">
          <NextSection n="05" next="A conversation about whether the Foundation would consider supporting the inaugural event, at Platinum or another level. A detailed budget will follow before any formal commitment." route="Jonathan Bair at JMMB knows Hack876 and can give context internally." closing="We would love to explore the right first step with the JMMB Joan Duncan Foundation." />
        </div>
        <div className="lp-page">
          <LevelsSection n="06" heading="Contribution levels, and what each receives." lead="Any amount within a level is welcome." recommended="platinum" />
        </div>
        <div className="lp-page">
          <Closing />
        </div>
      </main>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  05 Why JMMB                                                               */
/* -------------------------------------------------------------------------- */

function WhyJmmb() {
  return (
    <section aria-labelledby="lp-why" className="lp-section lp-dense lp-center">
      <div className="lp-wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 print:grid-cols-[0.7fr_1.3fr]">
        <div>
          <Kicker n="01">Why JMMB</Kicker>
          <h2 id="lp-why" className="lp-h2 mt-6">
            You already told us what you care about.
          </h2>
          <div aria-hidden className="mt-3 h-1 w-16 rounded-full" style={{ background: JMMB_ACCENT }} />
          <p className="lp-sub mt-8 text-emerald-deep">We built something that sits right in the middle of it.</p>
        </div>
        <div>
          <blockquote className="lp-keep rounded-2xl border-2 border-ink bg-paper p-6 shadow-[4px_5px_0_0_var(--color-emerald)] sm:p-8">
            <p className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">The Foundation&rsquo;s mission</p>
            <p className="mt-3 text-[clamp(1.4rem,2.6vw,2rem)] leading-snug font-extrabold tracking-tight">
              &ldquo;To develop, steward and support transformational initiatives in education and entrepreneurship.&rdquo;
              <Ref id={1} />
            </p>
          </blockquote>
          <div className="lp-prose mt-8">
            <p>
              The Foundation says it sponsors scholarships because education is &ldquo;one of the most powerful weapons we have
              to combat poverty.&rdquo;
              <Ref id={2} />
            </p>
            <p>
              It also says it sponsors and provides tangible support to <strong className="text-ink">entrepreneurial
              competitions among our nation&rsquo;s youth</strong>, awarding prizes to the top competitors.
              <Ref id={2} />
            </p>
            <p>
              Through its partnership with UTech, JMMB supports the Joan Duncan School of Entrepreneurship, Ethics and
              Leadership, and its Conversations for Greatness work with the Ministry of Education reached the staff of 88
              schools.
              <Ref id={2} />
            </p>
            <p>
              In 2025 alone, the Foundation sponsored eleven youth summer camps, including STEM programmes.
              <Ref id={5} />
            </p>
            <p className="font-semibold text-ink">
              Hack876 is a youth competition built on exactly those two ideas: education and entrepreneurship, happening in the
              same room, on the same day.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  10 Two ways in                                                            */
/* -------------------------------------------------------------------------- */

function TwoWaysIn() {
  return (
    <section aria-labelledby="lp-paths" className="lp-section lp-dense lp-center">
      <div className="lp-wrap">
        <Kicker n="02">The route we are asking for</Kicker>
        <h2 id="lp-paths" className="lp-h2 mt-6 max-w-[24ch]">
          We are asking the Foundation first.
        </h2>
        <p className="lp-prose mt-4">
          JMMB routes sponsorship and brand partnerships separately from charitable and grant requests to the Joan Duncan
          Foundation.
          <Ref id={4} /> We are asking the Foundation, because Hack876 is education and entrepreneurship in practice. Sponsorship is the alternative if the Foundation is not the right home.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-2 print:mt-6 print:grid-cols-2">
          <article className="lp-keep rounded-2xl border-2 border-ink bg-mint/60 p-6">
            <p className="text-xs font-extrabold tracking-[0.16em] text-emerald-deep uppercase">Path 1 · The Foundation</p>
            <h3 className="lp-h3 mt-2 text-[clamp(1.3rem,2.2vw,1.7rem)]">Mission alignment</h3>
            <ul className="mt-4 space-y-2">
              {[
                "The practical intersection of education and entrepreneurship",
                "A youth competition, which the Foundation already supports",
                "Students behaving like founders, not just learning about them",
                "Nation building through young people who believe they can create",
              ].map((t) => (
                <li key={t} className="flex gap-2.5 font-semibold">
                  <Check className="mt-0.5 text-emerald-deep" />
                  {t}
                </li>
              ))}
            </ul>
          </article>
          <article className="lp-keep rounded-2xl border-2 border-ink bg-sun-light p-6">
            <p className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">The alternative · Marketing and sponsorship</p>
            <h3 className="lp-h3 mt-2 text-[clamp(1.3rem,2.2vw,1.7rem)]">Recognition at the level agreed</h3>
            <ul className="mt-4 space-y-2">
              {[
                "Recognition at the level agreed",
                "Association with entrepreneurship, technology and youth opportunity",
                "Content and storytelling around Jamaican innovation",
              ].map((t) => (
                <li key={t} className="flex gap-2.5 font-semibold">
                  <Check className="mt-0.5 text-ink" />
                  {t}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  13 Platinum Partner                                                           */
/* -------------------------------------------------------------------------- */

const GOLD_AREAS = [
  "Event production",
  "Student experience",
  "Equipment and materials",
  "Food",
  "Prizes",
  "Signage",
  "Programming and logistics",
  "Operational costs",
];

function GoldPartner() {
  return (
    <section aria-labelledby="lp-gold" className="lp-section lp-dark relative overflow-hidden">
      <div className="lp-wrap relative">
        <Kicker n="03">Our invitation</Kicker>
        <h2 id="lp-gold" className="lp-h2 mt-6 max-w-[18ch]">
          Become a {PLATINUM.name} of the inaugural Hack876.
        </h2>

        <div className="lp-keep mt-10 border-y lp-rule py-8 print:mt-6 print:py-5">
          <p className="lp-num lp-accent text-[clamp(3.6rem,12vw,9.5rem)] text-sun">{PLATINUM.range}</p>
          <p className="mt-4 text-lg font-bold tracking-[0.14em] uppercase sm:text-xl">{PLATINUM.name} · Inaugural Hack876</p>
        </div>

        <div className="mt-8 print:mt-5">
          <BandStrip dark recommended="platinum" />
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-16 print:mt-6 print:grid-cols-2 print:gap-8">
          <div>
            <Lines
              items={[
                "A flexible, discretionary contribution toward the inaugural event and the student experience. It is not a title sponsorship, and it carries no naming rights.",
                "It may support areas such as:",
              ]}
            />
            <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2 print:grid-cols-2">
              {GOLD_AREAS.map((a) => (
                <li key={a} className="flex items-center gap-2.5 font-semibold">
                  <Check className="lp-accent text-sun" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <figure className="lp-keep h-fit rounded-2xl border-2 border-dashed border-cream/40 p-7 sm:p-9">
            <figcaption className="text-xs font-extrabold tracking-[0.16em] text-cream/60 uppercase">Proposed recognition</figcaption>
            <p className="mt-6 text-[clamp(1.5rem,2.8vw,2rem)] leading-tight font-extrabold tracking-tight">{SPONSOR}</p>
            <p className="lp-accent mt-2 text-lg font-bold text-sun">{PLATINUM.name} · Inaugural Hack876</p>
          </figure>
        </div>
      </div>
    </section>
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
        <div className="lp-prose mx-auto mt-6 max-w-2xl text-center">
          <p>Somewhere in that room may be a future founder, engineer, investor, designer or leader.</p>
          <p>They do not need us to decide who they become.</p>
          <p className="font-semibold text-ink">They need an opportunity to begin.</p>
        </div>
        <h2 id="lp-close" className="lp-marker mt-8 text-[clamp(3rem,9vw,6.8rem)]">
          Help us build that opportunity.
        </h2>
        <p className="lp-prose mx-auto mt-6 max-w-2xl text-center">
          We would love to explore what the right first step looks like with Jon and the JMMB team.
        </p>
        <p className="mt-6 text-lg font-bold">Kingston, Jamaica · {eventWhen.short}</p>
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
        <p className="lp-note mt-6">A private partnership proposal prepared for the {SPONSOR} and JMMB.</p>
      </footer>
    </section>
  );
}
