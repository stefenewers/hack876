import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { BirdMark, DoctorBird } from "@/components/art/DoctorBird";
import { Logo } from "@/components/art/Wordmark";
import { DownloadDeck } from "@/components/proposal/DownloadDeck";
import { Compounding } from "@/components/proposal/Illustrations";
import { Check, Kicker, Lines, Ref } from "@/components/proposal/primitives";
import { event, eventWhen } from "@/data/event";
import { BandStrip, LevelsSection } from "@/components/proposal/Sponsorship";
import "@/components/proposal/proposal.css";
import { DeliverySection, NextSection, OpeningSummary } from "@/components/proposal/PartnershipSections";
import { budgetFollows } from "@/data/partnership";
import { band } from "@/data/sponsorship";

/*
 * Private partnership proposal for Scotia Investments Jamaica Limited.
 * Same system as /loringopportunity and /gracekennedyopportunity. Not linked
 * from the public site; noindex/nofollow here and via X-Robots-Tag in next.config.ts.
 */

const SPONSOR = "Scotia Investments Jamaica Limited";
const DECK_LABEL = `Hack876 × ${SPONSOR}`;
/* Partner accent, used sparingly. */
const SCOTIA_RED = "#ec111a";

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
/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

const SHORT = "Scotia Investments";
const SOURCES = [
  {
    id: 1,
    org: "Scotia Investments",
    label: "Management Team",
    href: "https://jm.scotiabank.com/scotia-investments/about-us/management-team.html",
  },
  {
    id: 2,
    org: "Scotia Group Jamaica Limited",
    label: "2025 Annual Report, pp. 14–15 (group structure) and pp. 72–77 (youth development and financial literacy)",
    href: "https://jm.scotiabank.com/content/dam/scotiabank/international/jamaica/documents/SGJ_2025_Annual_Report.pdf",
  },
  {
    id: 3,
    org: "Scotia Investments",
    label: "Building Wealth for Generations",
    href: "https://jm.scotiabank.com/scotia-investments/wealth-for-generations.html",
  },
  {
    id: 4,
    org: "Scotia Investments",
    label: "Here for the future. Invested in you.",
    href: "https://jm.scotiabank.com/scotia-investments/here-for-the-future-invested-in-you.html",
  },
  {
    id: 5,
    org: "Scotia Investments",
    label: "Home: collaborative advisory approach; Research and insights",
    href: "https://jm.scotiabank.com/scotia-investments.html",
  },
  {
    id: 6,
    org: "Scotia Investments",
    label: "Investments 101",
    href: "https://jm.scotiabank.com/scotia-investments/research-and-insights/investments-101.html",
  },
  {
    id: 7,
    org: "Scotiabank",
    label: "ScotiaRISE: community and social impact",
    href: "https://jm.scotiabank.com/content/scotiabank/corporate/en/home/sponsorship-and-community/community.html",
  },
  {
    id: 8,
    org: "Scotiabank Jamaica",
    label: "SOS Children’s Villages Canada and Scotiabank’s ScotiaRISE initiative create brighter futures for nearly 800 youth in Jamaica and Mexico (October 8, 2024)",
    href: "https://jm.scotiabank.com/about-scotiabank/media-centre/news-releases/sos-childrens-villages-canada-and-scotiabanks-scotiarise-initiative-create-brighter-futures-for-nearly-800-youth-in-jamaica-and-mexico.html",
  },
] as const;

export default function ScotiaInvestmentsOpportunityPage() {
  return (
    <div className="lp" style={{ "--lp-deck-label": `"${DECK_LABEL}"` } as CSSProperties}>
      <header className="lp-wrap flex items-center justify-between gap-4 py-5">
        <Link href="/" className="flex items-center gap-2 rounded-lg" aria-label="Hack876 home">
          <BirdMark className="h-6 w-10" />
          <Logo className="text-[1.5rem]" />
        </Link>
        <DownloadDeck
          href="/proposals/hack876-scotia-investments-partnership-proposal.pdf"
          filename={`Hack876 x ${SPONSOR} - Partnership Proposal.pdf`}
        />
      </header>

      <main id="main">
        <div className="lp-page">
          <OpeningSummary
            label={DECK_LABEL}
            docLabel="Private partnership proposal"
            org="Scotia Investments"
            headline={`The best investments are often made before the potential is obvious.`}
            highlight={`obvious`}
            sub={`Hack876 gives secondary-school students one day to build something real. It is a small, early investment in young Jamaicans, in line with what ScotiaRISE already supports.`}
            brief={{
              fit: `Scotiabank’s ScotiaRISE programme is a 10-year commitment to economic resilience with a focus on youth and education, and Scotia Investments advises clients to invest early and for the long haul.`,
              request: `A Platinum contribution toward the inaugural event.`,
              enables: `Helps support the equipment teams build with, the prizes, student meals and the running of the day.`,
              outcome: `Platinum recognition, and a written recap of what teams built, including any business and money projects.`,
              next: `A conversation with Padrique Duncan, who knows both Scotia Investments and Hack876, about whether Scotia Investments would consider supporting the inaugural event. A detailed budget will follow before any formal commitment.`,
            }}
            requestDetail={`${PLATINUM.name}: ${PLATINUM.range}. Any level is welcome, and the levels are in the appendix. ${budgetFollows}`}
          />
        </div>
        <div className="lp-page">
          <WhyScotia />
        </div>
        <div className="lp-page">
          <AlreadyInvests />
        </div>
        <div className="lp-page">
          <GoldPartner />
        </div>
        <div className="lp-page">
          <DeliverySection n="04" linked="Jamaica College" />
        </div>
        <div className="lp-page">
          <NextSection n="05" next="A conversation about whether Scotia Investments would consider supporting the inaugural event, at Platinum or another level. A detailed budget will follow before any formal commitment." route="Padrique Duncan of Scotia Investments is a Hack876 partner and can give context internally." closing="We would love to explore the right first step with the Scotia Investments team." />
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
/*  04 Why Scotia Investments                                                 */
/* -------------------------------------------------------------------------- */

function WhyScotia() {
  return (
    <section aria-labelledby="lp-why" className="lp-section lp-dense lp-center">
      <div className="lp-wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 print:grid-cols-[0.7fr_1.3fr]">
        <div>
          <Kicker n="01">Why Scotia Investments</Kicker>
          <h2 id="lp-why" className="lp-h2 mt-6">
            Scotia already believes in long horizons.
          </h2>
          <div aria-hidden className="mt-3 h-1 w-16 rounded-full" style={{ background: SCOTIA_RED }} />
          <Compounding className="mt-10 hidden w-full max-w-sm lg:block print:block print:max-w-[2.9in]" />
        </div>
        <div>
          <div className="lp-prose">
            <p>
              {SPONSOR}, wholly owned by Scotia Group Jamaica,
              <Ref id={2} /> uses the line <strong className="text-ink">Building Wealth for Generations</strong>.
              <Ref id={3} />
            </p>
            <p>
              Its own guidance encourages investing early, contributing regularly and investing for the long haul.
              <Ref id={3} /> Its promise to clients is <em>&ldquo;Here for the future. Invested in you.&rdquo;</em>, and it
              speaks about opening doors for the next generation.
              <Ref id={4} />
            </p>
            <p>
              It publishes research and investment education, including Investments 101,
              <Ref id={6} /> and describes a collaborative advisory approach.
              <Ref id={5} />
            </p>
            <p className="font-semibold text-ink">
              Hack876 is an opportunity to apply that same long-term instinct to Jamaican human potential.
            </p>
          </div>

          <div className="lp-keep mt-8 rounded-2xl border-2 border-dashed border-ink/40 bg-paper p-6">
            <p className="text-lg leading-relaxed text-ink-2">
              To be clear: Hack876 is not an investment product, and these students are not prospective clients. The overlap is
              more fundamental. Both ideas begin with <strong className="text-ink">seeing potential, creating access and taking the long view.</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  05 Scotia already invests in young people                                 */
/* -------------------------------------------------------------------------- */

const EVIDENCE = [
  {
    kicker: "ScotiaRISE",
    title: "A 10-year, $500 million commitment to economic resilience.",
    text: "Scotiabank’s social impact initiative focuses on youth and education, among other areas: increasing employment prospects, life opportunities and full participation in the economy.",
    ref: 7 },
  {
    kicker: "YouthRISE · announced 2024",
    title: "Nearly 800 young people in Jamaica and Mexico.",
    text: "A three-year project with SOS Children’s Villages Canada, with J$106 million from Scotiabank, providing digital skills, entrepreneurship training, career coaching, mentorship and internship opportunities.",
    ref: 8 },
  {
    kicker: "2025",
    title: "Financial literacy with Jamaican youth.",
    text: "Scotia Group reports financial literacy sessions for young people in Kingston and Montego Bay, delivered with SOS Children’s Villages, covering budgeting, saving and investing.",
    ref: 2 },
];

function AlreadyInvests() {
  return (
    <section aria-labelledby="lp-already" className="lp-section lp-dark lp-grid-bg relative overflow-hidden">
      <div className="lp-wrap">
        <Kicker n="02">Already in motion</Kicker>
        <h2 id="lp-already" className="lp-h2 mt-6 max-w-[20ch]">
          This would extend a story Scotia is already telling.
        </h2>

        <ol className="mt-12 grid gap-5 md:grid-cols-3 print:mt-8 print:grid-cols-3">
          {EVIDENCE.map((e) => (
            <li key={e.kicker} className="lp-keep rounded-2xl border border-cream/20 bg-white/[0.04] p-6">
              <p className="text-xs font-extrabold tracking-[0.16em] text-sun uppercase">{e.kicker}</p>
              <p className="mt-3 text-[clamp(1.3rem,2vw,1.6rem)] leading-snug font-extrabold tracking-tight text-cream">{e.title}</p>
              <p className="mt-3 leading-relaxed text-cream/80">
                {e.text}
                <Ref id={e.ref} />
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-14 grid gap-10 border-t lp-rule pt-10 md:grid-cols-2 print:mt-8 print:pt-6">
          <Lines
            items={[
              "Education. Digital skills. Entrepreneurship. Employability. Mentorship. Financial literacy.",
              "Those are Scotia’s themes, and they are also what a day at Hack876 looks like in practice.",
            ]}
          />
          <div>
            <p className="lp-sub text-sun">The point is alignment, not affiliation.</p>
            <p className="mt-4 leading-relaxed text-cream/75">
              Hack876 is independent of ScotiaRISE and YouthRISE. How Scotia chooses to frame any support internally is
              entirely Scotia&rsquo;s decision.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  10 Platinum Partner                                                           */
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
                "A flexible, discretionary contribution toward making the inaugural Hack876 possible and improving the student experience. It is not a prize fund.",
                "It is intentionally not restricted to one line item, and may support areas such as:",
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
        <h2 id="lp-close" className="lp-marker mt-6 text-[clamp(3rem,9vw,6.8rem)]">
          Invest early. See what compounds.
        </h2>
        <p className="lp-prose mx-auto mt-8 max-w-2xl text-center">
          We would love to explore what the right first step looks like with Sabrina, Padrique and the {SHORT} team.
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
          A private partnership proposal prepared for {SPONSOR}, Attention: Sabrina Cooper, Head of Wealth Management &amp; CEO.
          <Ref id={1} />
        </p>
      </footer>
    </section>
  );
}
