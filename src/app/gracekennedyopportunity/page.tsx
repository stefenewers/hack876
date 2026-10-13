import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { BirdMark, DoctorBird } from "@/components/art/DoctorBird";
import { Logo } from "@/components/art/Wordmark";
import { DownloadDeck } from "@/components/proposal/DownloadDeck";
import { Shelter } from "@/components/proposal/Illustrations";
import { Check, Kicker, Lines, Ref } from "@/components/proposal/primitives";
import { event, eventWhen } from "@/data/event";
import { BandStrip, LevelsSection } from "@/components/proposal/Sponsorship";
import "@/components/proposal/proposal.css";
import { DeliverySection, NextSection, OpeningSummary } from "@/components/proposal/PartnershipSections";

/*
 * Private partnership proposal for GK General Insurance (GraceKennedy Group).
 * Same system as /loringopportunity. Not linked from the public site;
 * noindex/nofollow here and via an X-Robots-Tag header in next.config.ts.
 *
 * Entity name verified: the regulator (FSC Jamaica) lists "GK General Insurance
 * Company Limited"; GraceKennedy's own releases use "GK General Insurance" / GKGI.
 */

const SPONSOR = "GK General Insurance";
const DECK_LABEL = `Hack876 × ${SPONSOR}`;

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
/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

const SOURCES = [
  {
    id: 1,
    label: "About Us: founded in Jamaica in 1922; purpose and core values",
    href: "https://gracekennedy.com/about/" },
  {
    id: 2,
    label: "The GraceKennedy Foundation: history and scholarships",
    href: "https://gracekennedy.com/gk-foundation-history/" },
  {
    id: 3,
    label: "From GKF Scholar to Senior Leader: Chaluk Richards’ Journey Highlights GKF’s Scholarship Impact (May 12, 2026)",
    href: "https://gracekennedy.com/media-center-press/from-gkf-scholar-to-senior-leader-chaluk-richards-journey-highlights-gkfs-scholarship-impact/" },
  {
    id: 4,
    label: "GraceKennedy Announces Strategic Changes in its Insurance Segment (September 9, 2025)",
    href: "https://gracekennedy.com/media-center-press/gracekennedy-announces-strategic-changes-in-its-insurance-segment/" },
] as const;

export default function GraceKennedyOpportunityPage() {
  return (
    <div className="lp" style={{ "--lp-deck-label": `"${DECK_LABEL}"` } as CSSProperties}>
      <header className="lp-wrap flex items-center justify-between gap-4 py-5">
        <Link href="/" className="flex items-center gap-2 rounded-lg" aria-label="Hack876 home">
          <BirdMark className="h-6 w-10" />
          <Logo className="text-[1.5rem]" />
        </Link>
        <DownloadDeck
          href="/proposals/hack876-gracekennedy-partnership-proposal.pdf"
          filename={`Hack876 x ${SPONSOR} - Partnership Proposal.pdf`}
        />
      </header>

      <main id="main">
        <div className="lp-page">
          <OpeningSummary
            label={DECK_LABEL}
            docLabel="Private partnership proposal"
            org="GK General Insurance"
            headline={`Help young Jamaicans build for a riskier world.`}
            highlight={`riskier world`}
            sub={`Hack876 has a Resilience track, where teams build for storms, outages and the things families need to prepare for. Risk is what an insurer understands best.`}
            brief={{
              fit: `GK General Insurance’s own leadership story began with a GraceKennedy Foundation scholarship in 1999 and an entry-level underwriting role in 2003.`,
              request: `A Platinum contribution toward the inaugural event.`,
              enables: `Helps support the equipment teams build with, the prizes, student meals and the running of the day.`,
              outcome: `Platinum recognition, and a written recap of what teams built, including any resilience projects.`,
              next: `A reply on whether GK General Insurance would consider Platinum or another level.` }}
            requestDetail={`Platinum Partner: J$1,000,000+. Any level is welcome, and the levels are set out in the appendix.`}
          />
        </div>
        <div className="lp-page">
          <WhyGraceKennedy />
        </div>
        <div className="lp-page">
          <GoldPartner />
        </div>
        <div className="lp-page">
          <DeliverySection n="03" />
        </div>
        <div className="lp-page">
          <NextSection n="04" next="A reply on whether GK General Insurance would consider Platinum or another level." closing="This proposal is for GK General Insurance. It is separate from any conversation with the GraceKennedy Foundation." />
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
/*  04 Why GraceKennedy                                                       */
/* -------------------------------------------------------------------------- */

function WhyGraceKennedy() {
  return (
    <section aria-labelledby="lp-why" className="lp-section lp-dense lp-center">
      <div className="lp-wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 print:grid-cols-[0.7fr_1.3fr]">
        <div>
          <Kicker n="01">Why GraceKennedy</Kicker>
          <h2 id="lp-why" className="lp-h2 mt-6">
            Why GraceKennedy?
          </h2>
          <Shelter className="mt-10 hidden w-full max-w-sm lg:block print:block print:max-w-[3.1in]" />
        </div>
        <div>
          <div className="lp-prose">
            <p className="font-semibold text-ink">Because the alignment goes much deeper than sponsorship.</p>
            <p>
              GraceKennedy was founded in Jamaica in 1922 and today operates across Food and Financial Services, with a
              stated purpose of enriching lives through trusted Food and Financial Services.
              <Ref id={1} />
            </p>
            <p>
              For more than four decades, it has also invested in young Jamaicans. The GraceKennedy Foundation was established
              in 1982, and its scholarship history reaches back to 1980.
              <Ref id={2} />
            </p>
            <p>
              That history includes the Carlton Alexander Scholarships for graduates of Jamaica College and the Faustine Sharp
              Bursary for a St. Andrew High School for Girls 6th Form student. Both schools are in the Hack876 school network.
              <Ref id={2} />
            </p>
            <p>
              Within the Group, GraceKennedy describes insurance as one of its most exciting areas of growth, and GK General
              Insurance has already been through a digital transformation that introduced GKGOnline.
              <Ref id={4} />
            </p>
            <p>
              Trust, judgment, preparation and decisions made under uncertainty sit at the center of that business. At
              Hack876, students spend the day practicing exactly those skills.
            </p>
            <p className="font-semibold text-ink">
              GraceKennedy already invests in young Jamaican talent. Hack876 creates an opportunity to begin that relationship
              even earlier.
            </p>
          </div>

          <div className="mt-12 space-y-2 print:mt-6" aria-label="Earlier than usual">
            {["Before the scholarship.", "Before the degree.", "Before the first job application."].map((t, i) => (
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
/*  11 Platinum Partner                                                           */
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
          Become a Platinum Partner of the inaugural Hack876.
        </h2>

        <div className="lp-keep mt-12 border-y lp-rule py-10 print:mt-8 print:py-6">
          <p className="lp-num lp-accent text-[clamp(3.6rem,12vw,9.5rem)] text-sun">J$1,000,000</p>
          <p className="mt-4 text-lg font-bold tracking-[0.14em] uppercase sm:text-xl">Founding Partner · Inaugural Hack876</p>
        </div>

        <div className="mt-8 print:mt-5">
          <BandStrip dark recommended="platinum" />
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16 print:mt-6 print:grid-cols-2 print:gap-8">
          <div>
            <Lines
              items={[
                "This is a flexible sponsorship contribution supporting the overall production and student experience of the inaugural Hack876. It is not a prize fund.",
                "It is intentionally not restricted to one line item. The funding lets the Hack876 team deploy resources where they have the greatest impact, across areas such as:",
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
              <p className="mt-6 text-[clamp(1.6rem,3vw,2.2rem)] leading-tight font-extrabold tracking-tight">{SPONSOR}</p>
              <p className="lp-accent mt-2 text-lg font-bold text-sun">Platinum Partner · Inaugural Hack876</p>
            </figure>
            <Lines
              className="mt-8"
              items={[
                "We are not simply selling logo inventory.",
                `We are inviting ${SPONSOR} to be one of the organizations that made the first Hack876 possible.`,
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  12 Platinum Partner benefits                                                  */
/* -------------------------------------------------------------------------- */

function Closing() {
  return (
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
          <p>GraceKennedy&rsquo;s own history shows what can happen when that talent meets opportunity early.</p>
          <p>The opportunity is to create more of those moments.</p>
        </div>

        <div className="mt-16 w-full max-w-3xl border-t-2 border-ink pt-10 print:mt-8">
          <p className="text-sm font-extrabold tracking-[0.18em] text-ink-soft uppercase">{DECK_LABEL}</p>
          <p className="lp-statement mt-4">Let&rsquo;s build the first one together.</p>
          <p className="mt-6 text-lg font-bold">Kingston, Jamaica · {eventWhen.short}
          {eventWhen.note}</p>
          <p className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-1 font-semibold text-emerald-deep">
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
      </div>
      <footer className="lp-wrap mt-20 text-left print:mt-auto print:pt-6">
        <h2 className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">Sources</h2>
        <ol className="mt-3 space-y-1.5">
          {SOURCES.map((s) => (
            <li key={s.id} id={`source-${s.id}`} className="lp-note scroll-mt-6">
              <span className="font-bold">{s.id}.</span> GraceKennedy, &ldquo;{s.label}.&rdquo;{" "}
              <a href={s.href} className="break-all underline decoration-ink/30 underline-offset-2 hover:decoration-ink">
                {s.href.replace("https://", "")}
              </a>
            </li>
          ))}
        </ol>
        <p className="lp-note mt-6">A private partnership proposal prepared for {SPONSOR}.</p>
      </footer>
    </section>
  );
}
