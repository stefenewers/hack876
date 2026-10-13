import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { BirdMark, DoctorBird } from "@/components/art/DoctorBird";
import { Logo } from "@/components/art/Wordmark";
import { DownloadDeck } from "@/components/proposal/DownloadDeck";
import { Shelter } from "@/components/proposal/Illustrations";
import { Check, Kicker, Lines, Ref } from "@/components/proposal/primitives";
import { eligibility, event, eventWhen } from "@/data/event";
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
const STUDENTS = eligibility.maxHackers;
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
              request: `A Platinum contribution toward the inaugural event, with GK General Insurance professionals mentoring teams on risk and resilience.`,
              enables: `Helps support the equipment teams build with, the prizes, student meals and the running of the day. Mentors help teams think about risk the way an insurer does.`,
              outcome: `GK people work directly with about ${STUDENTS} students for a day. GK General Insurance receives Platinum recognition and a written recap of what teams built, including any resilience projects.`,
              next: `A reply on whether GK General Insurance would consider Platinum or another level, and who should coordinate mentors.` }}
            requestDetail={`Platinum Partner: J$1,000,000+. Any level is welcome, and the levels are set out in the appendix.`}
          />
        </div>
        <div className="lp-page">
          <WhyGraceKennedy />
        </div>
        <div className="lp-page">
          <MoreThanMoney />
        </div>
        <div className="lp-page">
          <GoldPartner />
        </div>
        <div className="lp-page">
          <GoldBenefits />
        </div>
        <div className="lp-page">
          <DeliverySection n="05" />
        </div>
        <div className="lp-page">
          <NextSection n="06" next="A reply on whether GK General Insurance would consider Platinum or another level, and who should coordinate mentors." closing="This proposal is for GK General Insurance. It is separate from any conversation with the GraceKennedy Foundation." />
        </div>
        <div className="lp-page">
          <LevelsSection n="07" heading="Contribution levels, and what each receives." lead="Any amount within a level is welcome." recommended="platinum" />
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
/*  10 More than money                                                        */
/* -------------------------------------------------------------------------- */

const ROLES = [
  { title: "Mentors", text: "Helping teams reason through real constraints." },
  { title: "Judges", text: "Evaluating problem selection, creativity, execution and communication." },
  { title: "Speakers", text: "Showing students the variety of careers inside a modern Jamaican company." },
  { title: "Challenge partners", text: "Optionally offering a real-world problem around resilience, customer experience, technology, data or risk." },
  { title: "Long-term connectors", text: "Continuing appropriate relationships with schools, students and future Hack876 events." },
];

function MoreThanMoney() {
  return (
    <section aria-labelledby="lp-more" className="lp-section lp-dense lp-center bg-paper">
      <div className="lp-wrap">
        <Kicker n="02">More than money</Kicker>
        <h2 id="lp-more" className="lp-h2 mt-6 max-w-[22ch]">
          What {SPONSOR} brings cannot be measured only in dollars.
        </h2>
        <Lines className="mt-8" items={["Funding makes Hack876 possible.", "But GraceKennedy can contribute something equally valuable:"]} />

        <p className="lp-marker lp-keep mt-10 text-[clamp(3rem,9vw,7rem)] text-emerald-deep print:mt-6">People in the room.</p>

        <div className="mt-8 grid gap-10 md:grid-cols-[1fr_1.3fr] print:mt-5 print:grid-cols-[1fr_1.3fr]">
          <div>
            <p className="font-bold">People who understand:</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {["Trust", "Risk", "Customers", "Technology", "Data", "Finance", "Operations", "Resilience", "Businesses that last"].map((t) => (
                <li key={t} className="rounded-full border lp-rule bg-cream px-3 py-1 text-sm font-bold">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <ul className="grid gap-y-3 text-lg font-semibold text-ink-2">
            {[
              "People who can take a 17-year-old’s idea seriously.",
              "People who can ask sharper questions.",
              "People who can show students careers and problems they have never encountered.",
            ].map((t) => (
              <li key={t} className="border-l-2 border-emerald pl-4">
                {t}
              </li>
            ))}
          </ul>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5 print:mt-6 print:grid-cols-5">
          {ROLES.map((r, i) => (
            <li key={r.title} className="rounded-2xl border lp-rule bg-cream p-5">
              <p className="lp-num text-3xl text-emerald-deep">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="lp-h3 mt-3">{r.title}</h3>
              <p className="mt-2 text-[0.98rem] leading-relaxed text-ink-2">{r.text}</p>
            </li>
          ))}
        </ul>
        <p className="lp-note mt-3">Any sponsor challenge is optional and sits alongside the open competition. Hack876 stays open.</p>

        <div className="lp-keep mt-12 print:mt-6">
          <p className="lp-statement max-w-[24ch]">We do not simply want GraceKennedy&rsquo;s logo in the room.</p>
          <p className="lp-sub mt-3 text-emerald-deep">We want GraceKennedy people in the room.</p>
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
        <Kicker n="03">Our invitation</Kicker>
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

const BENEFITS = [
  "Prominent Platinum Partner recognition across Hack876 event materials and digital experiences",
  "Recognition during opening and closing programming",
  "Opportunity for GraceKennedy leadership to address students",
  "Participation of GraceKennedy professionals as judges, mentors and speakers",
  "Dedicated GraceKennedy presence within the event",
  "Recognition in relevant school and participant communications",
  "Inclusion in Hack876 photography, recap content and post-event storytelling",
  "Opportunity to collaborate on an appropriate challenge, workshop, for example in resilience, customer experience, technology or financial capability",
  "Early conversation around future Hack876 events and expansion",
];

function GoldBenefits() {
  return (
    <section aria-labelledby="lp-benefits" className="lp-section">
      <div className="lp-wrap">
        <Kicker n="04">Platinum Partnership</Kicker>
        <h2 id="lp-benefits" className="lp-h2 mt-6">
          What Platinum Partnership looks like.
        </h2>
        <p className="lp-prose mt-4">Potential integration includes:</p>

        <ol className="mt-10 grid border-t lp-rule sm:grid-cols-2 lg:grid-cols-3 print:mt-6 print:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <li key={b} className="flex gap-4 border-b lp-rule py-6 pr-6">
              <span className="lp-num text-2xl text-emerald-deep">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-[1.05rem] leading-snug font-semibold">{b}</span>
            </li>
          ))}
        </ol>

        <div className="lp-keep mt-14 rounded-3xl bg-night p-8 text-cream sm:p-12 print:mt-8">
          <p className="lp-sub max-w-[38ch]">
            <span className="text-sun">Most importantly:</span> direct participation in the experience of approximately{" "}
            {STUDENTS} young Jamaicans at a formative point in their education and career thinking.
          </p>
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
