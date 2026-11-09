import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import QRCode from "qrcode";
import type { CSSProperties } from "react";
import { BirdMark } from "@/components/art/DoctorBird";
import { Logo } from "@/components/art/Wordmark";
import { DownloadDeck } from "@/components/proposal/DownloadDeck";
import { Check, Kicker, Ref } from "@/components/proposal/primitives";
import { BandStrip } from "@/components/proposal/Sponsorship";
import "@/components/proposal/proposal.css";
import { OpeningSummary, SourcesFooter } from "@/components/proposal/PartnershipSections";
import { OpenHubLink } from "@/components/proposal/OpenHubLink";
import { BudgetTable, SponsorHub } from "@/components/proposal/SponsorHub";
import { event, eventPartners, eventWhen, localSponsors } from "@/data/event";
import { budgetTotal, contact, jmd, reporting, safeguards } from "@/data/partnership";
import { band, benefitNotes } from "@/data/sponsorship";

/*
 * Private partnership proposal for GK General Insurance (GraceKennedy Group).
 * The short version: three pages. The opening summary, the estimated budget
 * with who is already on board, and the ask. Online, the sponsor hub follows
 * (web only, hidden in print). Not linked from the public site;
 * noindex/nofollow here and via an X-Robots-Tag header in next.config.ts.
 *
 * The budget is the organisers' estimate (partnership.ts) and is always
 * labelled as one. Sponsors come from event.ts, so the list cannot drift.
 *
 * Entity name verified: the regulator (FSC Jamaica) lists "GK General Insurance
 * Company Limited"; GraceKennedy's own releases use "GK General Insurance" / GKGI.
 */

const SPONSOR = "GK General Insurance";
const DECK_LABEL = `Hack876 × ${SPONSOR}`;

/* This proposal online, opened at the sponsor hub. Printed on the PDF with a QR code. */
const HUB_URL = `${event.siteUrl}/gracekennedyopportunity#sponsor-hub`;

/* The level this proposal suggests. Name, range and benefits come from sponsorship.ts. */
const PLATINUM = band("platinum");

/* Confirmed sponsors only. GK General Insurance itself is never shown as on board. */
const onBoard = localSponsors.filter((s) => s.confirmed);
const partners = eventPartners.filter((s) => s.confirmed);

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

const SOURCES = [
  { id: 1, org: "GraceKennedy", label: "About Us: founded in Jamaica in 1922; purpose and core values", href: "https://gracekennedy.com/about/" },
  {
    id: 2,
    org: "GraceKennedy",
    label: "From GKF Scholar to Senior Leader: Chaluk Richards’ Journey Highlights GKF’s Scholarship Impact (May 12, 2026)",
    href: "https://gracekennedy.com/media-center-press/from-gkf-scholar-to-senior-leader-chaluk-richards-journey-highlights-gkfs-scholarship-impact/",
  },
  {
    id: 3,
    org: "GraceKennedy",
    label: "GraceKennedy Announces Strategic Changes in its Insurance Segment (September 9, 2025)",
    href: "https://gracekennedy.com/media-center-press/gracekennedy-announces-strategic-changes-in-its-insurance-segment/",
  },
] as const;

export default function GraceKennedyOpportunityPage() {
  return (
    <div className="lp" style={{ "--lp-deck-label": `"${DECK_LABEL}"` } as CSSProperties}>
      <header className="lp-wrap flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-5">
        <Link href="/" className="flex items-center gap-2 rounded-lg" aria-label="Hack876 home">
          <BirdMark className="h-6 w-10" />
          <Logo className="text-[1.5rem]" />
        </Link>
        <div className="flex items-center gap-4">
          <OpenHubLink className="lp-no-print hidden text-sm font-bold underline decoration-2 underline-offset-4 sm:inline">
            Sponsor hub <span aria-hidden>↓</span>
          </OpenHubLink>
          <DownloadDeck href="/proposals/hack876-gracekennedy-partnership-proposal.pdf" filename={`Hack876 x ${SPONSOR} - Partnership Proposal.pdf`} />
        </div>
      </header>

      <main id="main">
        <div className="lp-page">
          <OpeningSummary
            label={DECK_LABEL}
            docLabel="Private partnership proposal"
            org="GK General Insurance"
            headline="Help young Jamaicans build for a riskier world."
            highlight="riskier world"
            sub="Hack876 has a Resilience track, where teams build for storms, outages and the things families need to prepare for. Risk is what an insurer understands best."
            brief={{
              fit: (
                <>
                  GK General Insurance&rsquo;s own leadership story began with a GraceKennedy Foundation scholarship in 1999 and an entry-level
                  underwriting role in 2003.
                  <Ref id={2} />
                </>
              ),
              request: `A Platinum contribution toward the inaugural Hack876, or whatever amount GK General Insurance’s budget allows.`,
              enables: `Goes toward the estimated ${jmd(budgetTotal)} event budget: prizes, food, shirts and materials, production and equipment. The venue is already hosted in kind.`,
              outcome: "Platinum recognition, and a written recap of what teams built and how the contribution was used.",
              next: "A reply on whether GK General Insurance can contribute, and at what level its budget allows.",
            }}
            requestDetail={`${PLATINUM.name}: ${PLATINUM.range}. Every level is welcome, from in-kind support upward.`}
          />
        </div>
        <div className="lp-page">
          <Budget />
        </div>
        <div className="lp-page">
          <Ask />
        </div>
        <SponsorHub org={SPONSOR} recommended="platinum" />
      </main>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  01 The budget, and who is already on board                                */
/* -------------------------------------------------------------------------- */

function Budget() {
  return (
    <section aria-labelledby="lp-budget" className="lp-section lp-dense lp-center lp-grid-bg">
      <div className="lp-wrap">
        <Kicker n="01">The budget</Kicker>
        <h2 id="lp-budget" className="lp-h2 mt-6 max-w-[24ch]">
          What the first Hack876 costs, and who is already on board.
        </h2>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12 print:mt-6 print:grid-cols-[1.15fr_1fr] print:gap-[2.4rem]">
          <div className="lp-keep rounded-2xl border-2 border-ink bg-paper p-5 print:p-[1.3rem]">
            <p className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">Estimated event budget</p>
            <BudgetTable className="mt-3" />
          </div>

          <div>
            <div className="lp-keep rounded-2xl border lp-rule bg-paper p-5 print:p-[1.3rem]">
              <p className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">Sponsors already on board</p>
              <ul className="mt-3 grid grid-cols-3 gap-2.5 sm:grid-cols-4 print:grid-cols-4">
                {onBoard.map((s) => (
                  <li key={s.name} className="flex flex-col items-center gap-1.5 text-center">
                    <span className="relative block h-14 w-full rounded-xl border border-ink/15 bg-white print:h-[4rem]">
                      <Image src={s.logo} alt="" fill sizes="120px" className="object-contain p-1.5" />
                    </span>
                    <span className="text-[0.78rem] leading-tight font-bold print:text-[1.02rem]">{s.name}</span>
                  </li>
                ))}
              </ul>
              <p className="lp-note mt-3">Each sponsor&rsquo;s support is agreed individually, in cash or in kind.</p>
            </div>

            <div className="lp-keep mt-4 rounded-2xl border lp-rule bg-paper p-5 print:mt-[1rem] print:p-[1.3rem]">
              <p className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">Event partners</p>
              <p className="mt-2 text-[0.98rem] leading-snug text-ink-2 print:text-[1.3rem]">
                {partners.map((p) => p.name).join(" and ")}. Hack876 is an official MLH Hack Day. Event partners support the programme and
                are not funders.
              </p>
            </div>

            <p className="mt-5 text-[1.05rem] leading-snug font-bold text-emerald-deep print:text-[1.5rem]">
              The venue, {onBoard.length} sponsors and two event partners are in place. GK General Insurance&rsquo;s contribution would go
              toward the costs above.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  02 The ask                                                                */
/* -------------------------------------------------------------------------- */

async function Ask() {
  const qr = await QRCode.toString(HUB_URL, { type: "svg", margin: 1, errorCorrectionLevel: "M", color: { dark: "#141716", light: "#ffffff" } });
  return (
    <section aria-labelledby="lp-ask" className="lp-section lp-dense lp-center">
      <div className="lp-wrap">
        <Kicker n="02">Our ask</Kicker>
        <h2 id="lp-ask" className="lp-h2 mt-6 max-w-[24ch]">
          A Platinum contribution, or whatever your budget allows.
        </h2>

        <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-12 print:mt-6 print:grid-cols-2 print:gap-[2.4rem]">
          <div>
            <div className="lp-keep rounded-2xl border-2 border-ink bg-night p-6 text-cream print:p-[1.5rem]">
              <p className="text-xs font-extrabold tracking-[0.16em] text-sun uppercase">Suggested</p>
              <p className="lp-num mt-2 text-[clamp(2.6rem,7vw,4.4rem)] leading-none text-sun">{PLATINUM.range}</p>
              <p className="mt-2 font-bold tracking-[0.12em] uppercase">{PLATINUM.name} · Inaugural Hack876</p>
              <p className="mt-4 text-[1rem] leading-snug text-cream/85 print:text-[1.32rem]">
                We would be grateful for any amount. If Platinum is beyond this year&rsquo;s budget, every level below it is welcome, as is support
                in kind such as prizes, meals or shirts.
              </p>
            </div>
            <div className="mt-5">
              <BandStrip recommended="platinum" />
            </div>
            {/* Said in the card above; dropped from the PDF to make room for the hub link. */}
            <p className="lp-note mt-3 print:hidden">{benefitNotes[0]}</p>

            {/* PDF only: the online version carries the hub itself. */}
            <div className="lp-keep mt-4 hidden items-center gap-[1rem] rounded-2xl border-2 border-ink bg-paper px-[1rem] py-[0.8rem] print:flex">
              <span aria-hidden className="block h-[5.6rem] w-[5.6rem] shrink-0 rounded-md bg-white" dangerouslySetInnerHTML={{ __html: qr }} />
              <div className="min-w-0">
                <p className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">Online sponsor hub</p>
                <p className="mt-0.5 text-[1.15rem] leading-snug font-bold">
                  Schedule, schools, budget, recognition, payment, safeguarding and 30+ answered questions.
                </p>
                <p className="mt-0.5 text-[1.1rem] font-extrabold break-all">
                  <a href={HUB_URL} className="text-emerald-deep underline decoration-2 underline-offset-2">
                    {HUB_URL.replace(/^https?:\/\/(www\.)?/, "")}
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="lp-keep rounded-2xl border lp-rule bg-paper p-5 print:p-[1.3rem]">
              <p className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">What GK General Insurance receives</p>
              <ul className="mt-3 space-y-1.5">
                {["Recognition on the Hack876 website and event signage", "Acknowledgement at the opening and closing", "A dedicated sponsor feature, agreed together", "Logo on event shirts, if shirts are produced", ...reporting.slice(1, 3).map((r) => `A recap: ${r.toLowerCase()}`)].map((t) => (
                  <li key={t} className="flex gap-2.5 text-[0.98rem] leading-snug print:text-[1.3rem]">
                    <Check className="mt-1 shrink-0 text-emerald" />
                    {t}
                  </li>
                ))}
              </ul>
              <p className="lp-note mt-3">
                {safeguards[0]} {safeguards[3]}
              </p>
            </div>

            <div className="lp-keep mt-4 rounded-2xl border-2 border-ink bg-sun-light p-5 print:mt-[1rem] print:p-[1.3rem]">
              <p className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">The next step</p>
              <p className="mt-2 text-[1.05rem] leading-snug font-bold print:text-[1.45rem]">
                A reply on whether GK General Insurance can contribute, and at what level. We will send a final budget before any commitment.
              </p>
              <p className="mt-2 text-[0.95rem] leading-snug text-ink-2 print:text-[1.27rem]">
                {contact.names.join(" and ")}, Hack876 organisers
                {event.contactEmail && (
                  <>
                    {" · "}
                    <a href={`mailto:${event.contactEmail}`} className="font-bold text-emerald-deep underline decoration-2 underline-offset-2">
                      {event.contactEmail}
                    </a>
                  </>
                )}
                {" · "}
                {eventWhen.long}
              </p>
            </div>
          </div>
        </div>

        <SourcesFooter sources={SOURCES} preparedFor={`A private partnership proposal prepared for ${SPONSOR}. Separate from any conversation with the GraceKennedy Foundation.`} />
      </div>
    </section>
  );
}
