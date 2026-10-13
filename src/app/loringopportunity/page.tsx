import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { BirdMark, DoctorBird } from "@/components/art/DoctorBird";
import { Logo } from "@/components/art/Wordmark";
import { DownloadDeck } from "@/components/proposal/DownloadDeck";
import { event, eventWhen } from "@/data/event";
import { Blueprint } from "@/components/proposal/Illustrations";
import { Check, Kicker, Lines, Ref } from "@/components/proposal/primitives";
import { BandStrip, LevelsSection } from "@/components/proposal/Sponsorship";
import "@/components/proposal/proposal.css";
import { DeliverySection, NextSection, OpeningSummary } from "@/components/proposal/PartnershipSections";
import { budgetFollows } from "@/data/partnership";
import { band } from "@/data/sponsorship";

/*
 * Private partnership proposal for Loring Consulting Engineers.
 * Not linked from the public site. noindex/nofollow here and via an
 * X-Robots-Tag header in next.config.ts.
 */

/* The sponsorship level this proposal invites. Name, range and benefits come from sponsorship.ts. */
const PLATINUM = band("platinum");

export const metadata: Metadata = {
  title: { absolute: "Hack876 × Loring Consulting Engineers" },
  description: "A private partnership proposal.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true } },
  openGraph: null,
  twitter: null };

/* A Loring engineer already involved in Hack876 (from the site's people data). */
/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : null);

/* Loring-owned sources for every company claim on this page. */
const SOURCES = [
  {
    id: 1,
    label: "Our History — founded 1956 by Joseph R. Loring",
    href: "https://www.loringengineers.com/about/our-history/" },
  {
    id: 2,
    label: "Loring Consulting Engineers Celebrates Official Launch of Jamaica Office (March 4, 2026)",
    href: "https://www.loringengineers.com/news/loring-consulting-engineers-celebrates-official-launch-of-jamaica-office/" },
  {
    id: 3,
    label: "Oneil Gayle, Chief Executive Officer — leadership biography",
    href: "https://www.loringengineers.com/people/oneil-gayle/" },
  {
    id: 4,
    label: "Loring Consulting Engineers Promotes Oneil Gayle to CEO (December 2023)",
    href: "https://www.loringengineers.com/news/loring-consulting-engineers-promotes-oneil-gayle-to-ceo/" },
] as const;

export default function LoringOpportunityPage() {
  return (
    <div className="lp" style={{ "--lp-deck-label": '"Hack876 × Loring Consulting Engineers"' } as CSSProperties}>
      <header className="lp-wrap flex items-center justify-between gap-4 py-5">
        <Link href="/" className="flex items-center gap-2 rounded-lg" aria-label="Hack876 home">
          <BirdMark className="h-6 w-10" />
          <Logo className="text-[1.5rem]" />
        </Link>
        <DownloadDeck href="/proposals/hack876-loring-partnership-proposal.pdf" filename="Hack876 x Loring Consulting Engineers - Partnership Proposal.pdf" />
      </header>

      <main id="main">
        <div className="lp-page">
          <OpeningSummary
            label="Hack876 × Loring Consulting Engineers"
            docLabel="Private partnership proposal"
            org="Loring"
            headline={`Invest early in Jamaica’s next engineers and builders.`}
            highlight={`Invest early`}
            sub={`Hack876 is open to hardware, energy and building-systems projects as well as software, the kind of problems Loring solves for a living.`}
            brief={{
              fit: `Loring opened its Kingston office in 2023, and its CEO, Oneil Gayle, was born and raised in Jamaica and began at Loring as a summer intern.`,
              request: `A Platinum contribution toward the inaugural event.`,
              enables: `Helps support the equipment teams build with, the prizes, student meals and the running of the day.`,
              outcome: `Platinum recognition for Loring, and a written recap of what teams built.`,
              next: `A conversation with Johnathan Clarke at Loring, who already works with Hack876, about whether Loring would consider supporting the inaugural event. A detailed budget will follow before any formal commitment.` }}
            requestDetail={`${PLATINUM.name}: ${PLATINUM.range}. Any level is welcome, and the levels are in the appendix. ${budgetFollows}`}
          />
        </div>
        <div className="lp-page">
          <WhyLoring />
        </div>
        <div className="lp-page">
          <GoldPartner />
        </div>
        <div className="lp-page">
          <DeliverySection n="03" />
        </div>
        <div className="lp-page">
          <NextSection n="04" next="A conversation about whether Loring would consider supporting the inaugural event, at Platinum or another level. A detailed budget will follow before any formal commitment." closing="We would love to build the first one with Loring." />
        </div>
        <div className="lp-page">
          <LevelsSection n="05" heading="Contribution levels, and what each receives." lead="Any amount within a level is welcome." recommended="platinum" />
        </div>
        <div className="lp-page">
          <Closing />
        </div>
      </main>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  05 — Why Loring                                                           */
/* -------------------------------------------------------------------------- */

function WhyLoring() {
  return (
    <section aria-labelledby="lp-why" className="lp-section">
      <div className="lp-wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 print:grid-cols-[0.7fr_1.3fr]">
        <div>
          <Kicker n="01">Why Loring</Kicker>
          <h2 id="lp-why" className="lp-h2 mt-6">
            Why Loring?
          </h2>
          <Blueprint className="mt-10 hidden w-full max-w-sm lg:block print:block print:max-w-[3.1in]" />
        </div>
        <div>
          <div className="lp-prose">
            <p className="font-semibold text-ink">Because the alignment goes much deeper than sponsorship.</p>
            <p>
              Loring has spent 70 years solving complex engineering problems.
              <Ref id={1} />
            </p>
            <p>Today, that story increasingly includes Jamaica.</p>
            <p>
              Loring opened its Kingston office in 2023 and formally launched the office in Jamaica in 2026.
              <Ref id={2} />
            </p>
            <p>The reason matters.</p>
            <p>
              CEO <strong className="text-ink">Oneil Gayle</strong>, born and raised in Jamaica, has spoken about wanting
              to help expand career pathways for engineers in Jamaica.
              <Ref id={2} />
            </p>
            <p>Loring is already investing in engineering talent in Jamaica.</p>
            <p className="font-semibold text-ink">Hack876 creates an opportunity to begin that investment even earlier.</p>
          </div>

          <div className="mt-12 space-y-2 print:mt-8" aria-label="Earlier than usual">
            {["Before the internship.", "Before the degree.", "Before the first job application."].map((t, i) => (
              <p
                key={t}
                className="lp-sub"
                style={{ paddingLeft: `${i * 1.5}em`, color: ["var(--color-ink-soft)", "var(--color-ink-2)", "var(--color-emerald-deep)"][i] }}
              >
                {t}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  12 — Platinum Partner                                                         */
/* -------------------------------------------------------------------------- */

const GOLD_AREAS = [
  "Event production",
  "Student experience",
  "Equipment and materials",
  "Food and refreshments",
  "Prizes",
  "Signage and environment",
  "Operational costs",
  "Programming and logistics",
];

function GoldPartner() {
  return (
    <section aria-labelledby="lp-gold" className="lp-section lp-dark relative overflow-hidden">
      <div className="lp-wrap relative">
        <Kicker n="02">Our invitation</Kicker>
        <h2 id="lp-gold" className="lp-h2 mt-6 max-w-[18ch]">
          Become a {PLATINUM.name} of the inaugural Hack876.
        </h2>

        <div className="lp-keep mt-12 border-y lp-rule py-10 print:mt-8 print:py-6">
          <p className="lp-num lp-accent text-[clamp(3.6rem,12vw,9.5rem)] text-sun">{PLATINUM.range}</p>
          <p className="mt-4 text-lg font-bold tracking-[0.14em] uppercase sm:text-xl">{PLATINUM.name} · Inaugural Hack876</p>
        </div>

        <div className="mt-8 print:mt-5">
          <BandStrip dark recommended="platinum" />
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16 print:mt-6 print:grid-cols-2 print:gap-8">
          <div>
            <Lines
              items={[
                "This is a flexible sponsorship contribution supporting the overall production and student experience of the inaugural Hack876.",
                "It is intentionally not restricted to one line item.",
                "The funding gives the Hack876 team the ability to deploy resources where they have the greatest impact across areas such as:",
              ]}
            />
            <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2 print:grid-cols-2">
              {GOLD_AREAS.map((a) => (
                <li key={a} className="flex items-center gap-2.5 font-semibold">
                  <Check className="lp-accent text-sun" />
                  {a}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <figure className="lp-keep rounded-2xl border-2 border-dashed border-cream/40 p-7 sm:p-9">
              <figcaption className="text-xs font-extrabold tracking-[0.16em] text-cream/60 uppercase">Proposed recognition</figcaption>
              <p className="mt-6 text-[clamp(1.6rem,3vw,2.2rem)] leading-tight font-extrabold tracking-tight">Loring Consulting Engineers</p>
              <p className="lp-accent mt-2 text-lg font-bold text-sun">{PLATINUM.name} · Inaugural Hack876</p>
            </figure>
            <Lines
              className="mt-8"
              items={[
                "The goal is not simply to place Loring’s logo around the event.",
                "It is to recognize Loring as one of the organizations that helped make the first Hack876 possible.",
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  13 — Platinum Partner benefits                                                */
/* -------------------------------------------------------------------------- */

function Closing() {
  return (
    <>
      <section aria-labelledby="lp-close" className="lp-section lp-close lp-grid-bg border-t lp-rule text-center">
        <div className="lp-wrap flex flex-col items-center">
          <div aria-hidden className="w-28 sm:w-36">
            <DoctorBird flutter={false} className="w-full" />
          </div>
          <h2 id="lp-close" className="lp-marker mt-8 text-[clamp(3.2rem,10vw,7.5rem)]">
            Plant the seed early.
          </h2>
          <div className="lp-prose mx-auto mt-8 text-center">
            <p>Jamaica already produces extraordinary talent.</p>
            <p>The opportunity is to help more of that talent discover what it can become sooner.</p>
          </div>

          <div className="mt-16 w-full max-w-3xl border-t-2 border-ink pt-10 print:mt-10">
            <p className="text-sm font-extrabold tracking-[0.18em] text-ink-soft uppercase">Hack876 × Loring Consulting Engineers</p>
            <p className="lp-statement mt-4">Let&rsquo;s build the first one together.</p>
            <p className="mt-6 text-lg font-bold">Kingston, Jamaica · {eventWhen.short}
          {eventWhen.note}</p>
            {(SITE_URL || event.contactEmail) && (
              <p className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-1 font-semibold text-emerald-deep">
                {SITE_URL && (
                  <a href={SITE_URL} className="underline decoration-2 underline-offset-4">
                    {SITE_URL.replace(/^https?:\/\//, "")}
                  </a>
                )}
                {event.contactEmail && (
                  <a href={`mailto:${event.contactEmail}`} className="underline decoration-2 underline-offset-4">
                    {event.contactEmail}
                  </a>
                )}
              </p>
            )}
          </div>
        </div>
        <footer className="lp-wrap mt-20 text-left print:mt-auto print:pt-6">
          <h2 className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">Sources</h2>
          <ol className="mt-3 space-y-1.5">
            {SOURCES.map((s) => (
              <li key={s.id} id={`source-${s.id}`} className="lp-note scroll-mt-6">
                <span className="font-bold">{s.id}.</span> Loring Consulting Engineers, &ldquo;{s.label}.&rdquo;{" "}
                <a href={s.href} className="break-all underline decoration-ink/30 underline-offset-2 hover:decoration-ink">
                  {s.href.replace("https://", "")}
                </a>
              </li>
            ))}
          </ol>
          <p className="lp-note mt-6">
            A private partnership proposal prepared for Loring Consulting Engineers.
          </p>
        </footer>
      </section>
    </>
  );
}
