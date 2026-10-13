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

/*
 * Private partnership proposal for Cardinal Law (Kingston, Jamaica).
 * Same system as the other proposals. Not linked from the public site;
 * noindex/nofollow here and via X-Robots-Tag in next.config.ts.
 *
 * Note: Cardinal's own site lists D'Angello G. Foster's secondary school as
 * St. George's College (now in the Hack876 network). Do not describe him as a
 * Campion alumnus.
 */

const SPONSOR = "Cardinal Law";
const DECK_LABEL = `Hack876 × ${SPONSOR}`;
/* Partner accent: the navy used across Cardinal Law's own website. Used sparingly. */
const CARDINAL_NAVY = "#064068";

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
const FORMS = eligibility.formOptions;
/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

const SOURCES = [
  { id: 1, org: "Cardinal Law", label: "Home", href: "https://www.cardinallawja.com/" },
  { id: 2, org: "Cardinal Law", label: "About Us", href: "https://www.cardinallawja.com/about-us/" },
  { id: 3, org: "Cardinal Law", label: "Abuna Jones Campbell, Partner", href: "https://www.cardinallawja.com/team/abuna-jones-campbell/" },
  { id: 4, org: "Cardinal Law", label: "D’Angello G. Foster, Partner", href: "https://www.cardinallawja.com/team/dangello-g-foster/" },
  { id: 5, org: "Cardinal Law", label: "Intellectual Property Law", href: "https://www.cardinallawja.com/services/intellectual-property-law/" },
  {
    id: 6,
    org: "Cardinal Law",
    label: "Digital Land Titles: Jamaica’s E-Titles System to Transform Property Ownership (Abuna Jones Campbell, September 25, 2025)",
    href: "https://www.cardinallawja.com/digital-land-titles-jamaicas-e-titles-system-to-transform-property-ownership/" },
  { id: 7, org: "First Angels Caribbean", label: "Home", href: "https://firstangelscaribbean.com/" },
] as const;

export default function CardinalLawOpportunityPage() {
  return (
    <div className="lp" style={{ "--lp-deck-label": `"${DECK_LABEL}"` } as CSSProperties}>
      <header className="lp-wrap flex items-center justify-between gap-4 py-5">
        <Link href="/" className="flex items-center gap-2 rounded-lg" aria-label="Hack876 home">
          <BirdMark className="h-6 w-10" />
          <Logo className="text-[1.5rem]" />
        </Link>
        <DownloadDeck href="/proposals/hack876-cardinal-law-partnership-proposal.pdf" filename={`Hack876 x ${SPONSOR} - Partnership Proposal.pdf`} />
      </header>

      <main id="main">
        <div className="lp-page">
          <OpeningSummary
            label={DECK_LABEL}
            docLabel="Private partnership proposal"
            org="Cardinal Law"
            headline={`Every big idea eventually meets the real world.`}
            highlight={`meets the real world`}
            sub={`When a prototype works, new questions appear: who owns it, whose data it uses, and what you have promised. Cardinal answers those for a living.`}
            brief={{
              fit: `Cardinal Law is a Jamaican firm formed by four attorneys. Two of its partners attended Campion College and St. George’s College, both in the Hack876 school network.`,
              request: `One short session from Cardinal’s lawyers on what happens after a prototype works: ownership, privacy and contracts. Lawyers as mentors or judges are welcome too.`,
              enables: `Students learn that ownership, privacy and trust are part of building something real, from people who advise on exactly that.`,
              outcome: `Cardinal’s lawyers in front of about ${STUDENTS} students and their teachers for a day, recognition that matches any contribution, and a written recap.`,
              next: `A reply from Abuna Jones Campbell or D’Angello G. Foster on whether a session is possible, and whether Cardinal would also consider a contribution.` }}
            requestDetail={`A monetary contribution is welcome and optional. Platinum is our invitation, and every level is set out in the appendix.`}
          />
        </div>
        <div className="lp-page">
          <WhyCardinal />
        </div>
        <div className="lp-page">
          <MoreThanMoney />
        </div>
        <div className="lp-page">
          <GoldPartner />
        </div>
        <div className="lp-page">
          <DeliverySection n="04" />
        </div>
        <div className="lp-page">
          <NextSection n="05" next="A reply on whether a session is possible, who would lead it, and whether Cardinal would also consider a contribution at any level." closing="We would love Cardinal Law to help make that first room possible." />
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
/*  05 Why Cardinal                                                           */
/* -------------------------------------------------------------------------- */

function WhyCardinal() {
  const pillars = [
    {
      n: "01",
      title: "A modern Jamaican legal practice.",
      body: (
        <>
          Cardinal describes itself as experienced, modern and professional,
          <Ref id={1} /> a &ldquo;dynamic and innovative law firm&rdquo; formed by four attorneys, committed to
          &ldquo;pragmatic, innovative, and client-focused legal services.&rdquo;
          <Ref id={2} /> Its own line: &ldquo;your partner in innovation in Kingston, Jamaica.&rdquo;
          <Ref id={1} />
        </>
      ) },
    {
      n: "02",
      title: "Close to the innovation lifecycle.",
      body: (
        <>
          Its intellectual property practice covers trademarks, patents, copyrights and &ldquo;rights related to new
          technologies.&rdquo;
          <Ref id={5} /> Its corporate work spans private equity, corporate finance, capital markets, M&amp;A and data
          protection and privacy.
          <Ref id={3} /> And it has written publicly about Jamaica&rsquo;s move to digital land titles, including the data
          security and privacy questions it raises.
          <Ref id={6} />
        </>
      ) },
    {
      n: "03",
      title: "People students can actually learn from.",
      body: (
        <>
          D&rsquo;Angello was called to the Bar in 2018
          <Ref id={4} /> and Abuna in 2019,
          <Ref id={3} /> and both have already built serious practices. Their careers are close enough to feel imaginable to a
          student in {FORMS[FORMS.length - 1]}.
        </>
      ) },
  ];
  return (
    <section aria-labelledby="lp-why" className="lp-section lp-dense lp-center">
      <div className="lp-wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Kicker n="01">Why Cardinal</Kicker>
            <h2 id="lp-why" className="lp-h2 mt-6">
              Why Cardinal?
            </h2>
            <div aria-hidden className="mt-3 h-1 w-16 rounded-full" style={{ background: CARDINAL_NAVY }} />
          </div>
          <p className="max-w-md text-lg text-ink-2">
            This is not a traditional law firm being awkwardly attached to a technology event.
          </p>
        </div>
        <ol className="mt-10 grid gap-5 lg:grid-cols-3 print:mt-6 print:grid-cols-3">
          {pillars.map((p) => (
            <li key={p.n} className="lp-keep rounded-2xl border lp-rule bg-paper p-6">
              <p className="lp-num text-3xl" style={{ color: CARDINAL_NAVY }}>
                {p.n}
              </p>
              <h3 className="lp-h3 mt-3">{p.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-2">{p.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  09 More than money                                                        */
/* -------------------------------------------------------------------------- */

const ROLES = [
  { title: "Judges", text: "Weighing the problem, the build and the thinking behind it." },
  { title: "Mentors", text: "Bringing commercial and real-world thinking to teams during the day." },
  { title: "A short session", text: "“Your prototype worked. Now what?” IP, privacy, contracts and business structure, age-appropriately." },
  { title: "Finals and awards", text: "Cardinal people in the room when the finalists pitch." },
];

function MoreThanMoney() {
  return (
    <section aria-labelledby="lp-more" className="lp-section lp-dense lp-center bg-paper">
      <div className="lp-wrap">
        <Kicker n="02">More than money</Kicker>
        <h2 id="lp-more" className="lp-h2 mt-6 max-w-[24ch]">
          We are not looking for Cardinal&rsquo;s logo alone.
        </h2>
        <p className="lp-marker lp-keep mt-6 text-[clamp(2.4rem,7vw,5rem)] text-emerald-deep print:mt-4">
          We would like Cardinal&rsquo;s thinking in the room.
        </p>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5 print:mt-5 print:grid-cols-5">
          {ROLES.map((r, i) => (
            <li key={r.title} className="rounded-2xl border lp-rule bg-cream p-5">
              <p className="lp-num text-3xl text-emerald-deep">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="lp-h3 mt-2">{r.title}</h3>
              <p className="mt-1.5 text-[0.98rem] leading-relaxed text-ink-2">{r.text}</p>
            </li>
          ))}
        </ul>

        <div className="lp-keep mt-8 rounded-2xl border-2 border-dashed border-ink/40 p-5 print:mt-5">
          <p className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">Boundaries we will hold to</p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4 print:grid-cols-4">
            {[
              "Any legal content is general education, not individual legal advice.",
              "No solicitor-client relationship with students is created or implied.",
              "No sensitive legal information is collected from students.",
              "Many participants are minors, and every session is designed with that in mind.",
            ].map((t) => (
              <li key={t} className="font-semibold">
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
/*  11 Platinum Partner                                                           */
/* -------------------------------------------------------------------------- */

const GOLD_AREAS = [
  "Event production",
  "Student experience",
  "Equipment and materials",
  "Food",
  "Prizes",
  "Signage",
  "Programming and logistics",
  "Operating costs",
];

function GoldPartner() {
  return (
    <section aria-labelledby="lp-gold" className="lp-section lp-dark relative overflow-hidden">
      <div className="lp-wrap relative">
        <Kicker n="03">Our invitation</Kicker>
        <h2 id="lp-gold" className="lp-h2 mt-6 max-w-[18ch]">
          Become a Platinum Partner of the inaugural Hack876.
        </h2>

        <div className="lp-keep mt-10 border-y lp-rule py-8 print:mt-6 print:py-5">
          <p className="lp-num lp-accent text-[clamp(3.6rem,12vw,9.5rem)] text-sun">J$1,000,000</p>
          <p className="mt-4 text-lg font-bold tracking-[0.14em] uppercase sm:text-xl">Founding Partner · Inaugural Hack876</p>
        </div>

        <div className="mt-8 print:mt-5">
          <BandStrip dark recommended="platinum" />
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-16 print:mt-6 print:grid-cols-2 print:gap-8">
          <div>
            <Lines
              items={[
                "A flexible, discretionary contribution supporting the inaugural event and the student experience. It is not a title sponsorship, there are no naming rights, and it is not restricted to prizes.",
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
            <p className="lp-accent mt-2 text-lg font-bold text-sun">Platinum Partner · Inaugural Hack876</p>
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
          <p>The first version of something important usually looks small.</p>
          <p className="font-semibold text-ink">A student. A team. A problem. A prototype.</p>
        </div>
        <h2 id="lp-close" className="lp-marker mt-8 text-[clamp(3rem,9vw,6.4rem)]">
          Every institution was once an idea.
        </h2>
        <p className="lp-prose mx-auto mt-6 max-w-2xl text-center">
          Hack876 gives young Jamaicans a place to begin. We would love {SPONSOR} to help make that first room possible.
        </p>
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
        <p className="lp-note mt-6">
          A private partnership proposal prepared for Abuna Jones Campbell and D&rsquo;Angello G. Foster, Cardinal Law.
        </p>
      </footer>
    </section>
  );
}
