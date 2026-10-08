import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { BirdMark, DoctorBird } from "@/components/art/DoctorBird";
import { Icon } from "@/components/art/Icons";
import { TailLine } from "@/components/art/Marks";
import { Logo } from "@/components/art/Wordmark";
import { DownloadDeck } from "@/components/proposal/DownloadDeck";
import { JamaicaMap } from "@/components/proposal/JamaicaMap";
import { FuturePaths, Seedling, Shelter } from "@/components/proposal/Illustrations";
import { Check, Kicker, Lines, Rail, Ref } from "@/components/proposal/primitives";
import { eligibility, event, eventWhen, schools } from "@/data/event";
import "@/components/proposal/proposal.css";

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
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  openGraph: null,
  twitter: null,
};

/* Canonical numbers come from the event data. */
const STUDENTS = eligibility.maxHackers;
const PARTNER_SCHOOLS = schools.length;

/* First-party GraceKennedy sources for every company claim on this page. */
const SOURCES = [
  {
    id: 1,
    label: "About Us: founded in Jamaica in 1922; purpose and core values",
    href: "https://gracekennedy.com/about/",
  },
  {
    id: 2,
    label: "The GraceKennedy Foundation: history and scholarships",
    href: "https://gracekennedy.com/gk-foundation-history/",
  },
  {
    id: 3,
    label: "From GKF Scholar to Senior Leader: Chaluk Richards’ Journey Highlights GKF’s Scholarship Impact (May 12, 2026)",
    href: "https://gracekennedy.com/media-center-press/from-gkf-scholar-to-senior-leader-chaluk-richards-journey-highlights-gkfs-scholarship-impact/",
  },
  {
    id: 4,
    label: "GraceKennedy Announces Strategic Changes in its Insurance Segment (September 9, 2025)",
    href: "https://gracekennedy.com/media-center-press/gracekennedy-announces-strategic-changes-in-its-insurance-segment/",
  },
] as const;

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

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
          <Hero />
        </div>
        <div className="lp-page">
          <BigIdea />
          <MeetHack876 />
        </div>
        <div className="lp-page">
          <NotJustApps />
        </div>
        <div className="lp-page">
          <WhyGraceKennedy />
          <Timeline />
        </div>
        <div className="lp-page">
          <Pipeline />
          <Schools />
        </div>
        <div className="lp-page">
          <WhyKingston />
        </div>
        <div className="lp-page">
          <NationalVision />
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
          <Alternatives />
        </div>
        <div className="lp-page">
          <Summary />
        </div>
        <div className="lp-page">
          <YearOne />
          <FirstOne />
        </div>
        <div className="lp-page">
          <Closing />
        </div>
      </main>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero                                                                      */
/* -------------------------------------------------------------------------- */

function Hero() {
  const stats = [
    { n: STUDENTS, label: "students" },
    { n: PARTNER_SCHOOLS, label: "partner schools" },
    { n: 1, label: "day" },
  ];
  return (
    <section aria-labelledby="lp-hero-title" className="lp-hero lp-grid-bg relative flex min-h-[calc(100svh-5rem)] flex-col justify-between overflow-hidden border-y lp-rule">
      <div className="lp-wrap w-full pt-16 sm:pt-24">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm font-bold tracking-[0.16em] text-ink-soft uppercase">{DECK_LABEL}</p>
          <p className="inline-flex items-center gap-2 rounded-full border lp-rule bg-paper px-3 py-1 text-xs font-bold tracking-[0.12em] text-ink-soft uppercase">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-bill" />
            Private partnership proposal
          </p>
        </div>

        <h1 id="lp-hero-title" className="lp-h1 mt-10 max-w-[16ch] sm:mt-14">
          <span className="relative inline-block text-emerald-deep">
            Invest early
            <TailLine draw={false} className="absolute -bottom-2 left-0 h-4 w-full" />
          </span>{" "}
          in the people who will build Jamaica&rsquo;s next chapter.
        </h1>

        <p className="mt-8 text-lg font-bold tracking-wide text-ink-2">Kingston, Jamaica · {eventWhen.short}
          {eventWhen.note}</p>
      </div>

      <div className="lp-wrap relative w-full pt-14 pb-10 sm:pb-14">
        <div aria-hidden className="pointer-events-none absolute -top-24 right-4 hidden w-44 opacity-95 sm:block lg:right-10 lg:w-56 print:block print:-top-36 print:w-64">
          <DoctorBird flutter={false} className="w-full" />
        </div>
        <dl className="grid grid-cols-3 border-t lp-rule">
          {stats.map((s, i) => (
            <div key={s.label} className={`pt-5 ${i ? "border-l lp-rule pl-4 sm:pl-8" : ""}`}>
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="lp-num block text-[clamp(3.4rem,11vw,8rem)]">{s.n}</span>
                <span className="mt-2 block text-sm font-bold tracking-[0.12em] text-ink-soft uppercase sm:text-base">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
        <p className="lp-marker mt-10 text-[clamp(1.6rem,3.4vw,2.6rem)]">One day to build something that should exist.</p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  01 The big idea                                                           */
/* -------------------------------------------------------------------------- */

function BigIdea() {
  return (
    <section aria-labelledby="lp-idea" className="lp-section relative">
      <div className="lp-wrap">
        <Kicker n="01">The big idea</Kicker>
        <h2 id="lp-idea" className="lp-statement mt-6 max-w-[18ch]" data-reveal>
          What if we met Jamaica&rsquo;s most promising young builders before the world did?
        </h2>
        <div className="mt-14 grid gap-10 md:grid-cols-[1fr_1.3fr] md:items-center print:mt-4 print:grid-cols-[0.8fr_1.3fr] print:items-center">
          <div aria-hidden className="hidden md:block print:block">
            <FuturePaths paths={[{ icon: "chart", label: "Finance" }, { icon: "resilience", label: "Resilience" }, { icon: "business", label: "A company" }, { icon: "spark", label: "AI" }, { icon: "phone", label: "Platforms" }]} className="mx-auto w-full max-w-md print:max-w-[3.3in]" />
          </div>
          <div data-reveal>
            <Lines
              items={[
                "Somewhere in Jamaica today is a student who will build the next financial platform.",
                "Another will design technology that helps families prepare for uncertainty.",
                "Another will start a company.",
                "Another will work in AI, insurance, data, product design, operations or a role that does not have a job title yet.",
                "Most large organizations will first meet them later: at university, at an internship fair, or when an application arrives.",
              ]}
            />
            <p className="lp-sub mt-8 text-emerald-deep">Hack876 creates an opportunity to meet their curiosity and potential sooner.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  02 Meet Hack876                                                           */
/* -------------------------------------------------------------------------- */

function MeetHack876() {
  return (
    <section aria-labelledby="lp-meet" className="lp-section lp-dense border-t lp-rule">
      <div className="lp-wrap">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 print:grid-cols-[0.6fr_1.4fr] print:gap-10">
          <div className="lg:sticky lg:top-10 lg:self-start">
            <Kicker n="02">What is Hack876?</Kicker>
            <h2 id="lp-meet" className="lp-h2 mt-6">
              Meet <span className="whitespace-nowrap">Hack876.</span>
            </h2>
            <div aria-hidden className="mt-10 hidden gap-3 lg:flex print:flex">
              {["laptop", "notebook", "sticky", "people"].map((n, i) => (
                <Icon key={n} name={n} className="diecut h-14 w-14" style={{ rotate: `${[-8, 5, -3, 9][i]}deg` }} />
              ))}
            </div>
          </div>

          <div>
            <div className="lp-prose">
              <p>
                Hack876 is a one-day build competition bringing together approximately{" "}
                <strong className="text-ink">{STUDENTS} secondary-school students in Jamaica</strong>, anchored by
                relationships with <strong className="text-ink">{PARTNER_SCHOOLS} partner schools in Kingston</strong>.
              </p>
              <p>
                Students work in teams on open-ended problems, with modern tools including AI, guidance from mentors, and a
                final pitch to judges.
              </p>
              <p>
                The partner schools are the institutions where the Hack876 team currently has relationships and can most
                reliably coordinate the inaugural event. They are not the limit of who can participate.
              </p>
            </div>

            <div className="lp-keep my-9 rounded-2xl border-2 border-ink bg-paper p-6 shadow-[4px_5px_0_0_var(--color-emerald)] sm:p-8">
              <h3 className="lp-h3 text-[clamp(1.3rem,2.2vw,1.7rem)]">
                Hack876 is open to eligible students beyond those partner schools.
              </h3>
              <div className="lp-prose mt-4 text-[1.02rem]">
                <p>
                  Students from elsewhere in Kingston or other parts of Jamaica may apply, subject to event capacity and the
                  application process.
                </p>
                <p>
                  For year one, Hack876 cannot promise transportation, accommodation or other travel support to students
                  outside our immediate network. Students traveling from farther away may need to arrange transportation and
                  lodging independently.
                </p>
                <p className="font-bold text-ink">This is a capacity constraint of year one, not a limit on the long-term vision.</p>
              </div>
            </div>

            <Lines
              items={[
                "Students will arrive with different interests, different skills and different ideas.",
                "By the end of the day, each team will have one objective:",
              ]}
            />
          </div>
        </div>

        <div className="lp-keep mt-14 text-center print:mt-8">
          <p className="lp-marker relative inline-block text-[clamp(2.6rem,7vw,5.6rem)]" data-reveal>
            Build something that should exist.
            <TailLine className="absolute -bottom-4 left-[5%] h-5 w-[90%]" />
          </p>
        </div>
        <div className="mx-auto mt-14 grid max-w-4xl gap-x-10 gap-y-3 text-center text-lg font-semibold text-ink-2 sm:grid-cols-3 print:mt-8">
          <p>No predetermined answer.</p>
          <p>No school assignment.</p>
          <p>No perfect solution waiting in the back of a textbook.</p>
        </div>
        <p className="lp-prose mx-auto mt-8 text-center">
          Just a real problem, a team, limited time and the tools to turn an idea into something tangible.
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  03 Not just apps                                                          */
/* -------------------------------------------------------------------------- */

const BUILDS: { label: string; icon: string; physical?: boolean }[] = [
  { label: "A sensor", icon: "board", physical: true },
  { label: "An AI tool", icon: "spark" },
  { label: "An automation", icon: "bot-free" },
  { label: "A piece of software", icon: "browser" },
  { label: "A data product", icon: "chart" },
  { label: "A physical prototype", icon: "hand", physical: true },
  { label: "A robot", icon: "gear", physical: true },
  { label: "A financial tool", icon: "business" },
  { label: "A transportation solution", icon: "move", physical: true },
  { label: "An energy or monitoring system", icon: "chart", physical: true },
  { label: "A resilience solution", icon: "resilience", physical: true },
];

const PROCESS = ["Identify a problem", "Understand the constraints", "Design a solution", "Build", "Test", "Explain", "Improve"];

function NotJustApps() {
  return (
    <section aria-labelledby="lp-apps" className="lp-section lp-grid-bg border-y lp-rule bg-paper">
      <div className="lp-wrap">
        <Kicker n="03">Not just apps</Kicker>
        <h2 id="lp-apps" className="lp-h2 mt-6 max-w-[16ch]">
          A hackathon is bigger than software.
        </h2>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_1.4fr] print:mt-5 print:grid-cols-[1fr_1.6fr]">
          <Lines
            items={[
              "The word “hackathon” often brings one image to mind:",
              <strong key="s" className="text-ink">A coding contest.</strong>,
              "Hack876 is deliberately broader. It is an open build competition, and teams choose the problem.",
              "A team might build:",
            ]}
          />
          <div>
            <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {BUILDS.map((b) => (
                <li
                  key={b.label}
                  className={`flex items-center gap-3 rounded-xl border px-3.5 py-2.5 font-semibold ${
                    b.physical ? "border-ink/25 bg-mint/60" : "border-ink/15 bg-cream"
                  }`}
                >
                  <Icon name={b.icon} className="h-8 w-8 shrink-0" />
                  {b.label}
                </li>
              ))}
              <li className="flex items-center gap-3 rounded-xl border border-dashed border-ink/30 px-3.5 py-2.5 font-semibold">
                <Icon name="wildcard" className="h-8 w-8 shrink-0" />
                Something none of us expected
              </li>
            </ul>
            <p className="mt-4 flex items-center gap-2 text-sm text-ink-soft">
              <span aria-hidden className="inline-block h-3 w-3 rounded-[4px] border border-ink/25 bg-mint/60" />
              Hardware, physical systems and resilience are first-class Hack876 builds alongside software.
            </p>
          </div>
        </div>

        <div className="lp-keep mt-16 print:mt-10">
          <p className="lp-statement">The medium does not matter.</p>
          <p className="lp-sub mt-2 text-emerald-deep">The problem-solving mindset does.</p>
        </div>

        <figure className="lp-keep mt-14 print:mt-8">
          <figcaption className="sr-only">The Hack876 process: {PROCESS.join(", then ")}. Then the loop repeats.</figcaption>
          <ol className="relative grid gap-0 md:grid-cols-7 print:grid-cols-7">
            {PROCESS.map((step, i) => (
              <li key={step} className="relative flex items-center gap-4 py-2 md:flex-col md:items-start md:gap-3 md:py-0 print:flex-col print:items-start print:gap-3 print:py-0">
                {i < PROCESS.length - 1 && (
                  <span aria-hidden className="absolute top-12 left-[1.2rem] h-full w-px bg-ink/25 md:top-[1.2rem] md:left-10 md:h-px md:w-[calc(100%-2.5rem)] print:top-[1.2rem] print:left-10 print:h-px print:w-[calc(100%-2.5rem)]" />
                )}
                <span className={`relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-ink text-sm font-extrabold ${i === 3 ? "bg-sun" : "bg-paper"}`}>
                  {i + 1}
                </span>
                <span className="pr-2 leading-snug font-bold">{step}</span>
              </li>
            ))}
          </ol>
          <p aria-hidden className="mt-4 flex items-center gap-2 text-sm font-semibold text-ink-soft md:justify-end">
            <svg viewBox="0 0 40 20" className="h-4 w-8">
              <path d="M36 14C30 4 10 4 4 14m0 0 1-6m-1 6 6-1" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Then loop back and improve again.
          </p>
        </figure>

        <p className="lp-sub mt-12">That is Hack876.</p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  04 Why GraceKennedy                                                       */
/* -------------------------------------------------------------------------- */

function WhyGraceKennedy() {
  return (
    <section aria-labelledby="lp-why" className="lp-section lp-dense">
      <div className="lp-wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 print:grid-cols-[0.7fr_1.3fr]">
        <div>
          <Kicker n="04">Why GraceKennedy</Kicker>
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
              Bursary for a St. Andrew High School for Girls 6th Form student. Both schools are among Hack876&rsquo;s partner
              schools.
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
/*  05 Opportunity, compounding (Chaluk Richards)                             */
/* -------------------------------------------------------------------------- */

/* Only official dates are shown as years; the undated stretch is labelled as such. */
const MILESTONES: { year: string; text: string; ref: number; soft?: boolean }[] = [
  { year: "1999", text: "Chaluk Richards receives the GraceKennedy Foundation / Carlton Alexander Scholarship.", ref: 3 },
  { year: "2003", text: "He joins GraceKennedy as an entry-level underwriting associate.", ref: 3 },
  { year: "Over the years", soft: true, text: "Roles across underwriting, human resources and operations, and later General Manager of GK General Insurance.", ref: 4 },
  { year: "2025", text: "He is appointed Head of Life & Health Insurance Business at GraceKennedy.", ref: 4 },
  { year: "2026", text: "He serves on the board of the GraceKennedy Foundation, the institution that invested in him first.", ref: 3 },
];

function Timeline() {
  return (
    <section aria-labelledby="lp-timeline" className="lp-section lp-dense lp-dark lp-grid-bg relative overflow-hidden">
      <div className="lp-wrap">
        <Kicker n="05">Opportunity, compounding</Kicker>
        <h2 id="lp-timeline" className="lp-h2 mt-6 max-w-[18ch]">
          One early opportunity can compound for decades.
        </h2>

        <ol className="mt-14 print:mt-6">
          {MILESTONES.map((m) => (
            <li
              key={m.year}
              className="lp-keep grid grid-cols-[2.5rem_1fr] gap-x-4 sm:grid-cols-[minmax(9rem,15rem)_3rem_1fr] sm:gap-x-8 print:grid-cols-[11rem_3rem_1fr]"
            >
              <p
                className={
                  m.soft
                    ? "col-start-2 row-start-1 text-xl font-bold tracking-[0.1em] text-cream/60 uppercase sm:col-start-1 sm:mt-[clamp(0.75rem,2.1vw,1.85rem)] sm:pb-10 sm:text-right print:col-start-1 print:mt-2 print:pb-3 print:text-right print:text-[1.5rem]"
                    : "lp-num col-start-2 row-start-1 text-[clamp(2.8rem,8vw,6.5rem)] text-cream sm:col-start-1 sm:pb-10 sm:text-right print:col-start-1 print:pb-3 print:text-right print:text-[3.8rem]"
                }
              >
                {m.year}
              </p>
              <Rail />
              <p className="col-start-2 pb-10 text-xl font-semibold text-cream/90 sm:col-start-3 sm:row-start-1 sm:mt-[clamp(0.75rem,2.1vw,1.85rem)] sm:pb-0 sm:text-2xl print:col-start-3 print:row-start-1 print:mt-2 print:pb-0 print:text-[1.7rem]">
                {m.text}
                <Ref id={m.ref} />
              </p>
            </li>
          ))}

          <li className="lp-keep grid grid-cols-[2.5rem_1fr] gap-x-4 sm:grid-cols-[minmax(9rem,15rem)_3rem_1fr] sm:gap-x-8 print:grid-cols-[11rem_3rem_1fr]">
            <p className="lp-num lp-accent col-start-2 row-start-1 text-[clamp(2.8rem,8vw,6.5rem)] text-sun sm:col-start-1 sm:text-right print:col-start-1 print:text-right print:text-[3.8rem]">
              2027
            </p>
            <Rail last />
            <p className="lp-marker lp-accent col-start-2 text-[clamp(2.2rem,5vw,4.4rem)] text-sun sm:col-start-3 sm:row-start-1 sm:self-center print:col-start-3 print:row-start-1">
              Whose journey could begin at Hack876?
            </p>
          </li>
        </ol>

        <div className="print:mt-6 print:grid print:grid-cols-[1fr_2fr] print:items-start print:gap-10 print:border-t print:border-cream/15 print:pt-6">
        <blockquote className="lp-keep mt-14 max-w-3xl border-l-4 border-sun pl-6 print:!mt-0">
          <p className="text-[clamp(1.2rem,2.2vw,1.6rem)] leading-snug font-semibold text-cream">
            &ldquo;The Carlton Alexander scholarship opened doors for me, but it was the exposure, mentorship, and
            opportunities that truly shaped my journey.&rdquo;
          </p>
          <footer className="mt-3 text-sm font-bold tracking-[0.12em] text-cream/60 uppercase">
            Chaluk Richards
            <Ref id={3} />
          </footer>
        </blockquote>

        <div className="mt-14 grid gap-10 border-t lp-rule pt-12 md:grid-cols-2 print:!mt-0 print:gap-6 print:border-0 print:pt-0">
          <Lines
            items={[
              "The proposition is not that every Hack876 student will one day work at GraceKennedy.",
              "It is to create more moments where young Jamaican potential meets an institution willing to take it seriously.",
            ]}
          />
          <div>
            <ul className="space-y-2 text-xl font-semibold text-cream">
              {["One introduction.", "One mentor.", "One conversation.", "One person who sees ability before a résumé exists."].map((t) => (
                <li key={t} className="flex gap-3">
                  <span aria-hidden className="lp-accent mt-2.5 h-2 w-2 shrink-0 rounded-full bg-emerald-light" />
                  {t}
                </li>
              ))}
            </ul>
            <p className="lp-sub lp-accent mt-8 text-sun">GraceKennedy&rsquo;s own history shows how far an early investment can travel.</p>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  06 Talent pipeline                                                        */
/* -------------------------------------------------------------------------- */

const JOURNEY = [
  { when: "Age 16 to 18", text: "A student meets a GraceKennedy professional while demonstrating something she built at Hack876." },
  { when: "University", text: "She studies technology, engineering, business, finance, design, data science or another discipline." },
  { when: "Scholarship and internship years", text: "GraceKennedy is already a name she recognizes as having invested in students like her." },
  {
    when: "Early career",
    text: "GraceKennedy is not simply another logo at a recruitment event. It was part of an earlier chapter.",
  },
];

function Pipeline() {
  return (
    <section aria-labelledby="lp-pipeline" className="lp-section">
      <div className="lp-wrap">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 print:grid-cols-[0.7fr_1.3fr] print:gap-10">
          <div>
            <Kicker n="06">The talent pipeline</Kicker>
            <h2 id="lp-pipeline" className="lp-h2 mt-6">
              Most structured opportunity begins after talent is visible.
            </h2>
          </div>
          <Lines
            items={[
              "By university, students already know certain employers.",
              "Scholarship pathways are underway.",
              "Career preferences are forming, and internships are competitive.",
              "Exceptional students are already being recruited.",
              <strong key="d" className="text-ink">Hack876 allows an organization to show up earlier.</strong>,
            ]}
          />
        </div>

        <p className="lp-statement lp-keep mt-16 max-w-[20ch] print:mt-10">Start the relationship before the résumé exists.</p>

        <ol className="mt-12 grid gap-4 md:grid-cols-4 print:mt-8 print:grid-cols-4">
          {JOURNEY.map((j, i) => (
            <li key={j.when} className="relative">
              <div className={`h-full rounded-2xl border p-5 ${i === 0 ? "border-2 border-ink bg-sun-light" : "lp-rule bg-paper"}`}>
                <p className="text-xs font-bold tracking-[0.14em] text-ink-soft uppercase">Step {i + 1}</p>
                <p className="lp-h3 mt-1">{j.when}</p>
                <p className="mt-3 leading-relaxed text-ink-2">{j.text}</p>
              </div>
              {i < JOURNEY.length - 1 && (
                <span aria-hidden className="absolute -bottom-4 left-6 z-10 grid h-8 w-8 place-items-center rounded-full border lp-rule bg-cream text-ink-soft md:top-1/2 md:-right-4 md:bottom-auto md:left-auto md:-translate-y-1/2 print:top-1/2 print:-right-4 print:bottom-auto print:left-auto print:-translate-y-1/2">
                  <svg viewBox="0 0 16 16" className="h-4 w-4 rotate-90 md:rotate-0 print:rotate-0">
                    <path d="M3 8h10m0 0-4-4m4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              )}
            </li>
          ))}
        </ol>

        <p className="lp-sub mt-12 max-w-[30ch] text-emerald-deep">
          No guarantees and no special access. Just an earlier, more human first impression.
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  07 School relationships                                                   */
/* -------------------------------------------------------------------------- */

const BRIDGE = ["Secondary school", "University", "Internship or scholarship", "Early career", "Leadership"];

function Schools() {
  return (
    <section aria-labelledby="lp-schools" className="lp-section border-t lp-rule bg-paper">
      <div className="lp-wrap">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 print:grid-cols-[0.7fr_1.3fr] print:gap-10">
          <div>
            <Kicker n="07">School relationships</Kicker>
            <h2 id="lp-schools" className="lp-h2 mt-6">
              The opportunity is bigger than individual students.
            </h2>
          </div>
          <div>
            <Lines
              items={[
                "Hack876 also creates relationships with the institutions developing them.",
                `Our inaugural network begins with ${PARTNER_SCHOOLS} schools where we already have relationships.`,
              ]}
            />
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="People connected to each school">
              {["Teachers", "STEM coordinators", "Administrators", "Parents", "Alumni", "Future cohorts"].map((t) => (
                <li key={t} className="rounded-full border lp-rule bg-cream px-3.5 py-1.5 text-sm font-bold">
                  {t}
                </li>
              ))}
            </ul>
            <Lines
              className="mt-6"
              items={[
                "Those relationships are the operating infrastructure for year one. They are not intended as a permanent eligibility boundary.",
                "For GraceKennedy, participation means being visible not simply as a company students meet later as customers or job seekers, but as an institution investing in Jamaican curiosity and potential while those students are still discovering what they can become.",
              ]}
            />
          </div>
        </div>

        <figure className="lp-keep mt-16 print:mt-10">
          <figcaption className="sr-only">A progression: {BRIDGE.join(", then ")}. Hack876 sits at the start.</figcaption>
          <div aria-hidden className="relative hidden h-16 md:block print:block">
            <svg viewBox="0 0 1000 64" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
              <path d="M100 60 C 300 -10, 700 -10, 900 60" fill="none" stroke="#141716" strokeOpacity="0.25" strokeWidth="2" strokeDasharray="5 7" />
            </svg>
          </div>
          <ol className="grid gap-3 md:grid-cols-5 print:grid-cols-5">
            {BRIDGE.map((b, i) => (
              <li key={b} className="flex items-center gap-3 md:flex-col md:text-center print:flex-col print:text-center">
                <span
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-ink text-sm font-extrabold ${
                    i === 0 ? "bg-emerald text-white" : "bg-paper"
                  }`}
                >
                  {i + 1}
                </span>
                <span className="font-bold">
                  {b}
                  {i === 0 && <span className="mt-1 block text-xs font-extrabold tracking-[0.14em] text-emerald-deep uppercase">Hack876</span>}
                </span>
              </li>
            ))}
          </ol>
        </figure>

        <p className="lp-sub mt-12">Hack876 sits at the beginning of that bridge.</p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  08 Why Kingston first                                                     */
/* -------------------------------------------------------------------------- */

const STAIRS = [
  "Start with a model we can deliver exceptionally well.",
  "Test it.",
  "Learn from it.",
  "Strengthen it.",
  "Then expand responsibly.",
];

function WhyKingston() {
  return (
    <section aria-labelledby="lp-kingston" className="lp-section lp-dense lp-grid-bg border-y lp-rule">
      <div className="lp-wrap">
        <Kicker n="08">Why Kingston first</Kicker>
        <h2 id="lp-kingston" className="lp-statement mt-6">
          Why Kingston first?
        </h2>

        <div className="lp-keep mt-10 grid gap-3 sm:grid-cols-2 print:mt-6">
          <p className="lp-sub rounded-2xl border-2 border-ink bg-paper p-6">Our ambition is national.</p>
          <p className="lp-sub rounded-2xl border lp-rule p-6 text-ink-soft">Our operational capacity in year one is not.</p>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16 print:mt-8 print:grid-cols-2 print:gap-8">
          <div>
            <Lines
              items={[
                "Hack876 is being built by a small team using relationships, facilities and resources we can reliably coordinate today.",
                "For the inaugural event, that means our organized school partnerships are concentrated in Kingston.",
              ]}
            />
            <h3 className="lp-h3 lp-keep mt-8 border-l-4 border-emerald pl-4 text-[clamp(1.25rem,2vw,1.6rem)]">
              That does not mean participation is exclusive to those schools.
            </h3>
            <Lines
              className="mt-6"
              items={[
                "Eligible students from other schools and other parts of Jamaica may still apply and participate, subject to event capacity.",
                <strong key="l" className="text-ink">The limitation is logistical.</strong>,
                "At this stage, Hack876 cannot reliably provide or coordinate transportation, accommodation or travel support for students coming from outside the Kingston area or outside our existing school network.",
                "We would rather be transparent about that than overpromise support we do not yet have the resources to provide.",
              ]}
            />
          </div>

          <div>
            <p className="lp-prose">Expanding our organized reach immediately across Jamaica would introduce significantly more:</p>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {["transportation coordination", "accommodation considerations", "student supervision", "safeguarding requirements", "school coordination", "cost"].map((t) => (
                <li key={t} className="rounded-lg border lp-rule bg-paper px-3 py-2 text-sm font-semibold first-letter:uppercase">
                  {t}
                </li>
              ))}
            </ul>
            <p className="lp-prose mt-4">before we have run the model once. So our approach is simple:</p>

            <ol className="lp-keep mt-6 space-y-2">
              {STAIRS.map((s, i) => (
                <li
                  key={s}
                  className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 font-extrabold tracking-tight ${
                    i === STAIRS.length - 1 ? "border-ink bg-emerald text-white" : "border-ink/80 bg-paper"
                  }`}
                  style={{ marginLeft: `${i * 6}%` }}
                >
                  <span className={`text-xs tabular-nums ${i === STAIRS.length - 1 ? "text-white/80" : "text-ink-soft"}`}>0{i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="lp-keep mt-16 border-t-2 border-ink pt-10 print:mt-8 print:pt-6">
          <p className="lp-statement">Kingston is not the boundary of Hack876.</p>
          <p className="lp-sub mt-3 text-emerald-deep">Kingston is where we can responsibly build the first version.</p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  09 National vision                                                        */
/* -------------------------------------------------------------------------- */

function NationalVision() {
  return (
    <section aria-labelledby="lp-vision" className="lp-section lp-dense">
      <div className="lp-wrap">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 print:grid-cols-[0.7fr_1.3fr] print:gap-10">
          <div>
            <Kicker n="09">National vision</Kicker>
            <h2 id="lp-vision" className="lp-h2 mt-6">
              The vision is Jamaica.
            </h2>
          </div>
          <Lines
            items={[
              `The ${PARTNER_SCHOOLS} schools are the beginning of the operating network, not the final reach.`,
              <strong key="s" className="text-ink">They are a starting infrastructure, not an exclusionary boundary.</strong>,
              "We want to reach the point where geography does not create a practical barrier to participation.",
            ]}
          />
        </div>

        <figure className="lp-keep mt-12 print:mx-auto print:mt-2 print:w-[34%]">
          <JamaicaMap className="w-full" />
        </figure>

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16 print:mt-6 print:grid-cols-2 print:gap-8">
          <div>
            <p className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">Current reality</p>
            <p className="lp-prose mt-3">
              Students outside Kingston can participate where capacity allows, but transportation and accommodation may be
              their responsibility.
            </p>
          </div>
          <div className="lp-keep rounded-2xl border border-dashed border-ink/40 p-5">
            <p className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">Future possibilities, not 2027 commitments</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {[
                "Transportation support",
                "Travel stipends",
                "Accommodation partnerships",
                "School-supported travel",
                "Regional qualifying events",
                "Additional event locations",
                "Sponsor-supported access programs",
              ].map((t) => (
                <li key={t} className="rounded-full border lp-rule bg-paper px-3 py-1 text-sm font-semibold">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lp-keep mt-14 print:mt-8">
          <p className="lp-statement max-w-[22ch]">We cannot support every logistical need on day one.</p>
          <p className="lp-sub mt-3 text-emerald-deep">But access across Jamaica is what we are building toward.</p>
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
    <section aria-labelledby="lp-more" className="lp-section lp-dense bg-paper">
      <div className="lp-wrap">
        <Kicker n="10">More than money</Kicker>
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
/*  11 Gold Partner                                                           */
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
        <Kicker n="11">Our invitation</Kicker>
        <h2 id="lp-gold" className="lp-h2 mt-6 max-w-[18ch]">
          Become a Gold Partner of the inaugural Hack876.
        </h2>

        <div className="lp-keep mt-12 border-y lp-rule py-10 print:mt-8 print:py-6">
          <p className="lp-num lp-accent text-[clamp(3.6rem,12vw,9.5rem)] text-sun">J$1,000,000</p>
          <p className="mt-4 text-lg font-bold tracking-[0.14em] uppercase sm:text-xl">Founding Partner · Inaugural Hack876</p>
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
              <p className="lp-accent mt-2 text-lg font-bold text-sun">Gold Partner · Inaugural Hack876</p>
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
/*  12 Gold Partner benefits                                                  */
/* -------------------------------------------------------------------------- */

const BENEFITS = [
  "Prominent Gold Partner recognition across Hack876 event materials and digital experiences",
  "Recognition during opening and closing programming",
  "Opportunity for GraceKennedy leadership to address students",
  "Participation of GraceKennedy professionals as judges, mentors and speakers",
  "Dedicated GraceKennedy presence within the event",
  "Recognition in relevant school and participant communications",
  "Inclusion in Hack876 photography, recap content and post-event storytelling",
  "Opportunity to collaborate on an appropriate challenge, workshop or special award, for example in resilience, customer experience, technology or financial capability",
  "Early conversation around future Hack876 events and expansion",
];

function GoldBenefits() {
  return (
    <section aria-labelledby="lp-benefits" className="lp-section">
      <div className="lp-wrap">
        <Kicker n="12">Gold Partnership</Kicker>
        <h2 id="lp-benefits" className="lp-h2 mt-6">
          What Gold Partnership looks like.
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

/* -------------------------------------------------------------------------- */
/*  13 Alternatives                                                           */
/* -------------------------------------------------------------------------- */

const PRIZES = [
  { place: "1st Place", items: "4 × iPads", cost: "Approximately US$1,800" },
  { place: "2nd Place", items: "4 × AirPods Pro", cost: "Approximately US$1,000" },
  { place: "3rd Place", items: "4 × US$150 gift cards", cost: "US$600" },
];

function Alternatives() {
  return (
    <section aria-labelledby="lp-alt" className="lp-section bg-cream-2">
      <div className="lp-wrap">
        <Kicker n="13">Other ways to participate</Kicker>
        <h2 id="lp-alt" className="lp-h2 mt-6 max-w-[20ch]">
          If Gold Partnership is not the right fit for year one.
        </h2>
        <p className="lp-prose mt-6">There are still meaningful ways for {SPONSOR} to help make the inaugural Hack876 possible.</p>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.25fr_1fr] print:mt-8 print:grid-cols-[1.25fr_1fr]">
          <article aria-labelledby="lp-prize" className="lp-keep rounded-2xl border lp-rule bg-paper p-6 sm:p-8">
            <h3 id="lp-prize" className="text-2xl font-extrabold tracking-tight">
              Official Prize Partner
            </h3>
            <p className="lp-num mt-4 text-[clamp(2.2rem,5vw,3.2rem)]">
              <span className="text-lg font-bold tracking-normal text-ink-soft">Approximately </span>US$3,500
            </p>
            <p className="mt-4 leading-relaxed text-ink-2">Fund the primary awards presented to Hack876&rsquo;s winning teams.</p>

            <p className="mt-6 text-xs font-extrabold tracking-[0.14em] text-ink-soft uppercase">Illustrative prize package for four-student teams</p>
            <dl className="mt-3 divide-y lp-rule border-y lp-rule">
              {PRIZES.map((p) => (
                <div key={p.place} className="grid grid-cols-[6rem_1fr_auto] items-baseline gap-3 py-3 max-sm:grid-cols-[5rem_1fr]">
                  <dt className="font-extrabold">{p.place}</dt>
                  <dd className="font-semibold">{p.items}</dd>
                  <dd className="text-sm text-ink-soft max-sm:col-start-2">{p.cost}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 font-bold">
              Approximate total: <span className="text-emerald-deep">US$3,400 to US$3,500</span>
            </p>

            <div className="mt-6 border-l-4 border-emerald pl-4">
              <p className="text-xs font-extrabold tracking-[0.14em] text-ink-soft uppercase">Recognition</p>
              <p className="mt-1 font-extrabold">Hack876 Official Prize Partner</p>
              <p className="font-semibold text-ink-2">{SPONSOR}</p>
            </div>
            <p className="lp-note mt-5">
              The final prize configuration may be adjusted based on participating team structure, product pricing, product
              availability and overall sponsorship support.
            </p>
          </article>

          <article aria-labelledby="lp-food" className="lp-keep rounded-2xl border lp-rule bg-paper p-6 sm:p-8">
            <h3 id="lp-food" className="text-2xl font-extrabold tracking-tight">
              Food &amp; Hospitality Partner
            </h3>
            <p className="lp-num mt-4 text-[clamp(2.2rem,5vw,3.2rem)]">US$1,000</p>
            <p className="mt-1 font-bold text-ink-soft">Approximately J$150,000</p>
            <div className="mt-4 space-y-3 leading-relaxed text-ink-2">
              <p>A long build day needs fuel.</p>
              <p>
                This partnership helps keep approximately {STUDENTS} students, plus staff, volunteers, judges and guests, fed and
                comfortable throughout the day.
              </p>
            </div>
            <p className="mt-6 text-xs font-extrabold tracking-[0.14em] text-ink-soft uppercase">Funding may support</p>
            <ul className="mt-3 space-y-1.5">
              {["Student meals", "Small eats and snacks", "Water and refreshments", "Serving supplies", "Light event décor and hospitality details"].map((t) => (
                <li key={t} className="flex items-center gap-2.5 font-semibold">
                  <Check className="text-emerald-deep" />
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-6 border-l-4 border-emerald pl-4">
              <p className="text-xs font-extrabold tracking-[0.14em] text-ink-soft uppercase">Recognition</p>
              <p className="mt-1 font-extrabold">Hack876 Food &amp; Hospitality Partner</p>
              <p className="font-semibold text-ink-2">{SPONSOR}</p>
            </div>
            <p className="mt-6 font-semibold text-ink">A smaller commitment with an immediate, visible impact on everyone in the room.</p>
          </article>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  14 Summary                                                                */
/* -------------------------------------------------------------------------- */

function Summary() {
  return (
    <section aria-labelledby="lp-summary" className="lp-section">
      <div className="lp-wrap">
        <Kicker n="14">Partnership summary</Kicker>
        <h2 id="lp-summary" className="sr-only">
          Partnership summary
        </h2>

        <div className="mt-8 grid gap-5 lg:grid-cols-5 print:grid-cols-5">
          <div className="lp-keep flex flex-col justify-between rounded-3xl bg-night p-8 text-cream sm:p-10 lg:col-span-3 print:col-span-3">
            <div>
              <p className="text-sm font-extrabold tracking-[0.18em] text-sun uppercase">Gold Partner</p>
              <p className="lp-num mt-5 text-[clamp(3rem,8vw,5.5rem)] text-sun">J$1,000,000</p>
              <p className="mt-2 text-sm font-bold tracking-[0.12em] text-cream/70 uppercase">Founding Partner · Inaugural Hack876</p>
            </div>
            <p className="mt-10 max-w-md text-lg leading-relaxed text-cream/90">
              Flexible support for the inaugural Hack876 and overall student experience.
            </p>
          </div>

          <div className="grid gap-5 lg:col-span-2 print:col-span-2">
            {[
              { name: "Official Prize Partner", amount: "~US$3,500", text: "Fund the primary competition awards." },
              { name: "Food & Hospitality Partner", amount: "US$1,000", text: "Help feed students and support the hospitality experience throughout the day." },
            ].map((o) => (
              <div key={o.name} className="lp-keep rounded-2xl border lp-rule bg-paper p-6">
                <p className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">{o.name}</p>
                <p className="lp-num mt-3 text-4xl">{o.amount}</p>
                <p className="mt-3 leading-relaxed text-ink-2">{o.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lp-keep mt-16 print:mt-10">
          <p className="lp-statement">Our first choice is simple.</p>
          <p className="lp-sub mt-4 max-w-[32ch]">We would love to build the inaugural Hack876 with {SPONSOR} as a Gold Partner.</p>
          <p className="lp-h3 mt-6 text-[clamp(1.25rem,2vw,1.6rem)] text-emerald-deep">But the larger goal is beginning the relationship.</p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  15 Year one                                                               */
/* -------------------------------------------------------------------------- */

const SUCCESS = [
  `Approximately ${STUDENTS} students.`,
  `${PARTNER_SCHOOLS} core school relationships.`,
  "Ambitious young Jamaicans in one room.",
  "Working prototypes where there were only ideas that morning.",
  "Students meeting professionals they did not know earlier that day.",
  "Teachers returning to their schools with new possibilities.",
  "Companies encountering young talent earlier.",
  "Students leaving with a clearer sense of what they can build.",
  "Enough evidence and learning to improve the next Hack876.",
];

function YearOne() {
  return (
    <section aria-labelledby="lp-year1" className="lp-section bg-paper">
      <div className="lp-wrap">
        <Kicker n="15">Year one</Kicker>
        <h2 id="lp-year1" className="lp-h2 mt-6">
          What success looks like in year one.
        </h2>

        <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 print:mt-6 print:grid-cols-[0.9fr_1.1fr] print:gap-8">
          <div>
            <ul className="space-y-1 text-xl font-semibold text-ink-soft">
              <li>Not thousands of students.</li>
              <li>Not every parish.</li>
              <li>Not a national program overnight.</li>
            </ul>
            <p className="lp-prose mt-6">
              For the first Hack876, success means executing something smaller exceptionally well while leaving the door open to
              ambitious students beyond our immediate network.
            </p>
          </div>
          <ul className="space-y-2.5">
            {SUCCESS.map((s) => (
              <li key={s} className="flex gap-3 text-[1.05rem] font-semibold">
                <Check className="mt-0.5 text-emerald-deep" />
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="lp-keep mt-14 print:mt-8">
          <p className="lp-statement">Year one proves the model.</p>
          <p className="lp-sub mt-3 text-emerald-deep">What comes next is where this gets interesting.</p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  16 The first one                                                          */
/* -------------------------------------------------------------------------- */

function FirstOne() {
  return (
    <section aria-labelledby="lp-first" className="lp-section relative">
      <div className="lp-wrap grid items-center gap-12 lg:grid-cols-[1.35fr_0.65fr] print:grid-cols-[1.4fr_0.6fr] print:gap-10">
        <div>
        <Kicker n="16">The first one</Kicker>
        <h2 id="lp-first" className="lp-h2 mt-6">
          The first one matters.
        </h2>
        <Lines
          className="mt-8"
          items={[
            "Every program that becomes meaningful has a first cohort.",
            "A first room.",
            "A first group of students.",
            "A first group of people willing to support it before there is a long track record.",
            "Hack876 will start small.",
            <strong key="a" className="text-ink">But our ambition is not small.</strong>,
          ]}
        />
        <ul className="lp-prose mt-6 space-y-2 border-l-2 border-emerald pl-5">
          <li>
            We want more Jamaican students to see themselves as technologists, engineers, designers, founders, analysts, builders
            and future leaders.
          </li>
          <li>We want them solving Jamaican problems.</li>
          <li>We want them meeting students they would otherwise never meet.</li>
          <li>We want the relationships created at Hack876 to continue into university, internships and careers.</li>
          <li>
            And eventually, we want geography and travel resources to stop determining which talented Jamaican students can
            realistically take part.
          </li>
        </ul>
        </div>
        <div aria-hidden className="hidden lg:block print:block">
          <Seedling className="mx-auto w-full max-w-xs print:max-w-[2.8in]" />
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Closing                                                                   */
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
