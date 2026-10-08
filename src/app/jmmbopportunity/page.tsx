import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { BirdMark, DoctorBird } from "@/components/art/DoctorBird";
import { Icon } from "@/components/art/Icons";
import { TailLine } from "@/components/art/Marks";
import { Logo } from "@/components/art/Wordmark";
import { DownloadDeck } from "@/components/proposal/DownloadDeck";
import { Bridge, Converge, FuturePaths, Seedling } from "@/components/proposal/Illustrations";
import { Check, Kicker, Lines, Ref } from "@/components/proposal/primitives";
import { eligibility, event, eventWhen, prizes, schools, stats } from "@/data/event";
import "@/components/proposal/proposal.css";

/*
 * Private partnership proposal for JMMB / the JMMB Joan Duncan Foundation.
 * Same system as the other proposals. Not linked from the public site;
 * noindex/nofollow here and via X-Robots-Tag in next.config.ts.
 */

const SPONSOR = "JMMB Joan Duncan Foundation";
const SHORT = "JMMB";
const DECK_LABEL = `Hack876 × ${SPONSOR}`;
/* Partner accent, used sparingly. */
const JMMB_ACCENT = "#e4002b";

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
const TEAMS = stats.find((s) => s.label === "teams")?.value;
const FORMS = eligibility.formOptions;
const TEAM_SIZE = `${eligibility.teamSize.min} to ${eligibility.teamSize.max}`;
const SPECIAL_AWARDS = prizes.filter((p) => !p.place);
const SPECIAL_TOTAL = SPECIAL_AWARDS.reduce((sum, p) => sum + (p.valueUsd ?? 0), 0);
const PODIUM = prizes.filter((p) => p.place).sort((a, b) => a.place! - b.place!);
/* Approximate procurement costs for the podium rewards (same estimates as the other proposals). */
const PODIUM_COST: Record<number, string> = { 1: "Approximately US$1,800", 2: "Approximately US$1,000", 3: "US$600" };

/* First-party JMMB sources for every JMMB claim on this page. */
const SOURCES = [
  {
    id: 1,
    org: "JMMB Joan Duncan Foundation",
    label: "Home: mission and vision",
    href: "https://www.joanduncanfoundation.org/",
  },
  {
    id: 2,
    org: "JMMB Group Jamaica",
    label: "JMMB Joan Duncan Foundation",
    href: "https://jm.jmmb.com/jmmb-joan-duncan-foundation",
  },
  {
    id: 3,
    org: "JMMB Group Jamaica",
    label: "Our Cofounders",
    href: "https://jm.jmmb.com/our-cofounders",
  },
  {
    id: 4,
    org: "JMMB Group Jamaica",
    label: "Sponsorship, Advertising and Media Requests",
    href: "https://jm.jmmb.com/requests",
  },
  {
    id: 5,
    org: "JMMB Group Jamaica",
    label: "JMMB Joan Duncan Foundation Sparks Innovation and Inclusion for Youth, Islandwide (August 26, 2025)",
    href: "https://jm.jmmb.com/jmmb-joan-duncan-foundation-sparks-innovation-and-inclusion-youth-islandwide",
  },
] as const;

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

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
          <EduEntrepreneurship />
        </div>
        <div className="lp-page">
          <WhyJmmb />
          <GreatnessInPractice />
        </div>
        <div className="lp-page">
          <StartsBeforeTheCompany />
        </div>
        <div className="lp-page">
          <SchoolNetwork />
          <BridgeSection />
        </div>
        <div className="lp-page">
          <TwoWaysIn />
          <MoreThanMoney />
        </div>
        <div className="lp-page">
          <AudienceValue />
        </div>
        <div className="lp-page">
          <GoldPartner />
          <GoldBenefits />
        </div>
        <div className="lp-page">
          <WaysToParticipate />
        </div>
        <div className="lp-page">
          <Summary />
        </div>
        <div className="lp-page">
          <YearOne />
          <MakePossible />
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
  const heroStats = [
    { n: STUDENTS, label: "students" },
    { n: PARTNER_SCHOOLS, label: "school network" },
    { n: 1, label: "day" },
  ];
  return (
    <section aria-labelledby="lp-hero-title" className="lp-hero lp-grid-bg relative flex min-h-[calc(100svh-5rem)] flex-col justify-between overflow-hidden border-y lp-rule">
      <div className="lp-wrap w-full pt-16 sm:pt-24">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm font-bold tracking-[0.16em] text-ink-soft uppercase">{DECK_LABEL}</p>
          <p className="inline-flex items-center gap-2 rounded-full border lp-rule bg-paper px-3 py-1 text-xs font-bold tracking-[0.12em] text-ink-soft uppercase">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: JMMB_ACCENT }} />
            Private partnership proposal
          </p>
        </div>

        <h1 id="lp-hero-title" className="lp-h1 mt-10 max-w-[14ch] sm:mt-14">
          <span className="relative inline-block text-emerald-deep">
            Greatness
            <TailLine draw={false} className="absolute -bottom-2 left-0 h-4 w-full" />
          </span>{" "}
          needs somewhere to begin.
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-2 sm:text-xl">
          {SHORT} has spent years telling Jamaicans that greatness already exists within them. Hack876 gives {STUDENTS} young
          people one day to prove it to themselves.
        </p>
        <p className="mt-6 text-lg font-bold tracking-wide text-ink-2">Kingston, Jamaica · {eventWhen.short}
          {eventWhen.note}</p>
      </div>

      <div className="lp-wrap relative w-full pt-12 pb-10 sm:pb-14">
        <div aria-hidden className="pointer-events-none absolute -top-24 right-4 hidden w-44 opacity-95 sm:block lg:right-10 lg:w-56 print:block print:-top-32 print:w-60">
          <DoctorBird flutter={false} className="w-full" />
        </div>
        <dl className="grid grid-cols-3 border-t lp-rule">
          {heroStats.map((s, i) => (
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
    <section aria-labelledby="lp-idea" className="lp-section lp-dense relative">
      <div className="lp-wrap">
        <Kicker n="01">The big idea</Kicker>
        <h2 id="lp-idea" className="lp-statement mt-6 max-w-[22ch]" data-reveal>
          What if young Jamaicans experienced themselves as builders before anyone told them what career they should have?
        </h2>
        <div className="mt-12 grid gap-10 md:grid-cols-[1fr_1.3fr] md:items-center print:mt-4 print:grid-cols-[0.8fr_1.3fr] print:items-center">
          <div aria-hidden className="hidden md:block print:block">
            <FuturePaths
              paths={[
                { icon: "business", label: "Founder" },
                { icon: "board", label: "Engineer" },
                { icon: "chart", label: "Investor" },
                { icon: "pen", label: "Designer" },
                { icon: "people", label: "Leader" },
              ]}
              className="mx-auto w-full max-w-md print:max-w-[3.1in]"
            />
          </div>
          <div data-reveal>
            <Lines items={["Before the business plan.", "Before the degree.", "Before the first job."]} className="font-semibold text-ink" />
            <Lines
              className="mt-5"
              items={[
                "There is usually a first moment when someone realizes: I can build this.",
                "For most young people, that moment arrives late, if it arrives at all.",
              ]}
            />
            <p className="lp-sub mt-6 text-emerald-deep">Hack876 is designed to create more of those moments.</p>
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
                Hack876 is a one-day build competition for approximately{" "}
                <strong className="text-ink">{STUDENTS} secondary-school students</strong> from {FORMS[0]} through{" "}
                {FORMS[FORMS.length - 1]}, working in teams of {TEAM_SIZE}
                {TEAMS ? `, roughly ${TEAMS} teams in all` : ""}.
              </p>
              <p>
                Teams pick a real problem, use modern tools including AI, get guidance from mentors, and finish the day with a
                working prototype and a pitch to judges. It is not a school assignment and there is no answer key.
              </p>
              <p>
                Our <strong className="text-ink">{PARTNER_SCHOOLS}-school network</strong> in Kingston is made up of the
                schools where the Hack876 team currently has relationships and can coordinate most reliably. It is not an
                exclusive eligibility list.
              </p>
            </div>

            <div className="lp-keep my-9 rounded-2xl border-2 border-ink bg-paper p-6 shadow-[4px_5px_0_0_var(--color-emerald)] sm:p-8">
              <h3 className="lp-h3 text-[clamp(1.3rem,2.2vw,1.7rem)]">Hack876 is open to eligible students beyond those schools.</h3>
              <div className="lp-prose mt-4 text-[1.02rem]">
                <p>Students from elsewhere in Kingston or other parts of Jamaica may apply, subject to capacity.</p>
                <p>
                  In this inaugural year, students outside our organized network may need to arrange their own transportation
                  and, where relevant, lodging. Hack876 does not yet have the resources to provide those universally.
                </p>
                <p className="font-bold text-ink">That is a year-one capacity constraint, not a limit on the long-term vision.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lp-keep mt-10 text-center print:mt-6">
          <p className="lp-marker relative inline-block text-[clamp(2.6rem,7vw,5.6rem)]" data-reveal>
            Build something that should exist.
            <TailLine className="absolute -bottom-4 left-[5%] h-5 w-[90%]" />
          </p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  03 Not just apps                                                          */
/* -------------------------------------------------------------------------- */

const BUILDS: { label: string; icon: string; physical?: boolean }[] = [
  { label: "A piece of software", icon: "browser" },
  { label: "An AI tool", icon: "spark" },
  { label: "An automation", icon: "bot-free" },
  { label: "A data product", icon: "chart" },
  { label: "A tool for small businesses", icon: "business" },
  { label: "Hardware", icon: "board", physical: true },
  { label: "A robot", icon: "gear", physical: true },
  { label: "A physical prototype", icon: "hand", physical: true },
  { label: "A resilience solution", icon: "resilience", physical: true },
];

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
              "Hack876 is an open build competition. Teams choose the problem and the medium.",
              "Some will write code. Some will wire circuits. Some will design a service, a business or a tool nobody has thought of yet.",
              "A team might build:",
            ]}
          />
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
        </div>

        <div className="lp-keep mt-14 print:mt-8">
          <p className="lp-statement">The medium does not matter.</p>
          <p className="lp-sub mt-2 text-emerald-deep">The instinct to create does.</p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  04 Education × Entrepreneurship                                           */
/* -------------------------------------------------------------------------- */

const FOUNDER_LOOP = [
  "Find a problem",
  "Understand users and constraints",
  "Decide what matters",
  "Create something",
  "Test assumptions",
  "Explain the idea",
  "Receive feedback",
  "Improve",
];

function EduEntrepreneurship() {
  return (
    <section aria-labelledby="lp-edu" className="lp-section lp-dense lp-grid-bg">
      <div className="lp-wrap">
        <Kicker n="04">Education × Entrepreneurship</Kicker>
        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center print:grid-cols-[1fr_1.1fr] print:items-center print:gap-8">
          <div>
            <h2 id="lp-edu" className="lp-h2">
              Education gives a young person tools. Entrepreneurship teaches them what they can do with them.
            </h2>
            <p className="lp-prose mt-6">
              A hackathon may be one of the few environments where education and entrepreneurship happen at exactly the same
              time. Students are not learning <em>about</em> entrepreneurship. For one day, they behave like founders.
            </p>
          </div>
          <Converge left="Education" right="Entrepreneurship" className="mx-auto w-full max-w-xl print:max-w-[5in]" />
        </div>

        <figure className="lp-keep mt-12 print:mt-6">
          <figcaption className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">A founder&rsquo;s day, in eight steps</figcaption>
          <ol className="mt-4 grid gap-3 sm:grid-cols-4 lg:grid-cols-8 print:grid-cols-8">
            {FOUNDER_LOOP.map((s, i) => (
              <li
                key={s}
                className={`flex min-h-[6.5rem] flex-col justify-between rounded-2xl border-2 p-4 ${
                  i === FOUNDER_LOOP.length - 1 ? "border-ink bg-emerald text-white" : i === 3 ? "border-ink bg-sun" : "border-ink/70 bg-paper"
                }`}
              >
                <span className={`lp-num text-2xl ${i === FOUNDER_LOOP.length - 1 ? "text-white/80" : "text-emerald-deep"}`}>{i + 1}</span>
                <span className="leading-tight font-extrabold">{s}</span>
              </li>
            ))}
          </ol>
          <p aria-hidden className="mt-3 flex items-center gap-2 text-sm font-semibold text-ink-soft lg:justify-end">
            <svg viewBox="0 0 40 20" className="h-4 w-8">
              <path d="M36 14C30 4 10 4 4 14m0 0 1-6m-1 6 6-1" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Then do it again, better.
          </p>
        </figure>

        <p className="lp-sub mt-8 text-emerald-deep">That is not just STEM exposure. That is early entrepreneurial formation.</p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  05 Why JMMB                                                               */
/* -------------------------------------------------------------------------- */

function WhyJmmb() {
  return (
    <section aria-labelledby="lp-why" className="lp-section lp-dense">
      <div className="lp-wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 print:grid-cols-[0.7fr_1.3fr]">
        <div>
          <Kicker n="05">Why JMMB</Kicker>
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
/*  06 Greatness, in practice                                                 */
/* -------------------------------------------------------------------------- */

function GreatnessInPractice() {
  return (
    <section aria-labelledby="lp-great" className="lp-section lp-dark lp-grid-bg relative overflow-hidden">
      <div className="lp-wrap">
        <Kicker n="06">Greatness, in practice</Kicker>
        <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center print:grid-cols-[1.1fr_0.9fr] print:items-center">
          <div>
            <p className="text-lg font-semibold text-cream/70">The Foundation&rsquo;s belief:</p>
            <p className="lp-h2 mt-3">
              &ldquo;Every individual possesses inherent greatness.&rdquo;
              <Ref id={2} />
            </p>
            <Lines
              className="mt-8"
              items={[
                "Belief matters. But most people first believe it about themselves after they have done something.",
                "A working prototype at 4pm that was only an idea at 10am. A pitch that lands. A judge who takes the idea seriously.",
              ]}
            />
          </div>
          <div className="lp-keep rounded-3xl border-2 border-cream/25 bg-white/[0.04] p-8">
            <p className="lp-marker lp-accent text-[clamp(2.4rem,5vw,4rem)] text-sun">I can build this.</p>
            <p className="mt-6 text-lg leading-relaxed text-cream/85">
              Hack876 gives {STUDENTS} young Jamaicans one day to discover that sentence is true.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  07 Every company starts before the company                                */
/* -------------------------------------------------------------------------- */

function StartsBeforeTheCompany() {
  return (
    <section aria-labelledby="lp-start" className="lp-section">
      <div className="lp-wrap grid items-center gap-12 lg:grid-cols-[1.3fr_0.7fr] print:grid-cols-[1.35fr_0.65fr] print:gap-10">
        <div>
          <Kicker n="07">The company itself began with an idea</Kicker>
          <h2 id="lp-start" className="lp-h2 mt-6 max-w-[20ch]">
            Every company starts before the company.
          </h2>
          <div className="lp-prose mt-8">
            <p>
              JMMB&rsquo;s own history describes Joan Duncan as a single mother of five who built her way up, and who in 1992
              &ldquo;virtually created the Jamaican money market&rdquo; with Jamaica Money Market Brokers, co-founded with Dr.
              Noel Lyon.
              <Ref id={3} />
            </p>
            <p>
              Her dream, in JMMB&rsquo;s words, was a company where &ldquo;any Jamaican could walk in off the street, take a few
              hundred dollars from their pocket, and invest it.&rdquo;
              <Ref id={3} />
            </p>
            <p className="font-semibold text-ink">JMMB exists because someone saw the possibility of building something Jamaica did not yet have.</p>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4 print:grid-cols-4">
            {["A problem.", "An observation.", "A conviction.", "A first attempt."].map((t, i) => (
              <li key={t} className="rounded-xl border-2 border-ink/70 bg-paper px-4 py-3 font-extrabold" style={{ rotate: `${[-1.5, 1, -1, 1.5][i]}deg` }}>
                {t}
              </li>
            ))}
          </ul>
          <p className="lp-sub mt-8 text-emerald-deep">Hack876 asks students one question: what should exist that does not exist yet?</p>
        </div>
        <div aria-hidden className="hidden lg:block print:block">
          <Seedling className="mx-auto w-full max-w-xs print:max-w-[2.7in]" />
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  08 School network                                                         */
/* -------------------------------------------------------------------------- */

function SchoolNetwork() {
  return (
    <section aria-labelledby="lp-schools" className="lp-section lp-dense bg-paper">
      <div className="lp-wrap">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 print:grid-cols-[0.7fr_1.3fr] print:gap-10">
          <div>
            <Kicker n="08">The school network</Kicker>
            <h2 id="lp-schools" className="lp-h2 mt-6">
              {PARTNER_SCHOOLS} schools. One room.
            </h2>
          </div>
          <div>
            <Lines
              items={[
                "Hack876 begins with the schools where we already have relationships and can coordinate most reliably for the inaugural staging. Formal confirmations are still in progress for most of them, and the network is not an exclusive eligibility list.",
              ]}
            />
            <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2 print:grid-cols-2">
              {schools.map((s) => (
                <li
                  key={s}
                  className={`rounded-xl border px-4 py-2.5 font-semibold ${s === "St. George's College" ? "border-2 border-ink bg-sun-light" : "lp-rule bg-cream"}`}
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  09 A bridge already exists                                                */
/* -------------------------------------------------------------------------- */

function BridgeSection() {
  return (
    <section aria-labelledby="lp-bridge" className="lp-section lp-dense lp-grid-bg border-t lp-rule">
      <div className="lp-wrap">
        <Kicker n="09">A bridge already exists</Kicker>
        <h2 id="lp-bridge" className="lp-h2 mt-6 max-w-[22ch]">
          Partnerships work better when someone carries the context.
        </h2>

        <Bridge labels={[SHORT, "Jon Bair", "Hack876"]} className="mx-auto mt-10 w-full max-w-3xl print:mt-4 print:max-w-[6in]" />

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16 print:mt-6 print:grid-cols-2 print:gap-8">
          <Lines
            items={[
              "Hack876 is not looking for a cheque and a logo followed by silence. We want a relationship JMMB understands internally and Hack876 can execute well externally.",
              <span key="j">
                <strong className="text-ink">Jonathan Bair</strong>, Corporate Manager, Private Equity at JMMB Securities, is the
                person making this introduction possible.
              </span>,
              "Jon is also a St. George’s College alumnus, and St. George’s College is part of Hack876’s school network.",
              "If Jon is open to it, we would love for him to help steward the relationship on JMMB’s side: carrying context in both directions, helping identify the right people to involve, and helping us build something genuinely useful over time.",
            ]}
          />
          <div className="lp-keep rounded-2xl border-2 border-ink bg-paper p-6 shadow-[4px_5px_0_0_var(--color-emerald)]">
            <p className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">What stewardship could look like</p>
            <ul className="mt-4 space-y-2.5">
              {[
                "Carrying feedback between Hack876 and JMMB",
                "Helping coordinate conversations with the Foundation and/or marketing",
                "Helping identify JMMB judges, mentors or speakers",
                "Helping find the most natural sponsorship structure",
                "Helping both sides decide what a second year could look like",
              ].map((t) => (
                <li key={t} className="flex gap-2.5 font-semibold">
                  <Check className="mt-0.5 text-emerald-deep" />
                  {t}
                </li>
              ))}
            </ul>
            <p className="lp-note mt-4">An invitation, not an obligation.</p>
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
    <section aria-labelledby="lp-paths" className="lp-section lp-dense">
      <div className="lp-wrap">
        <Kicker n="10">Two ways in</Kicker>
        <h2 id="lp-paths" className="lp-h2 mt-6 max-w-[24ch]">
          There are two natural homes for this inside JMMB.
        </h2>
        <p className="lp-prose mt-4">
          JMMB routes sponsorship and brand partnerships separately from charitable and grant requests to the Joan Duncan
          Foundation.
          <Ref id={4} /> Hack876 fits either, for different reasons.
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
            <p className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">Path 2 · Marketing and sponsorship</p>
            <h3 className="lp-h3 mt-2 text-[clamp(1.3rem,2.2vw,1.7rem)]">Audience, visibility and relationships</h3>
            <ul className="mt-4 space-y-2">
              {[
                "Visible alongside ambitious Jamaican students, their families and schools",
                "Association with entrepreneurship, technology and youth opportunity",
                "JMMB people in the room as judges, mentors and speakers",
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
/*  11 More than money                                                        */
/* -------------------------------------------------------------------------- */

const ROLES = [
  { title: "Judges", text: "Evaluating problem selection, execution and the pitch." },
  { title: "Mentors", text: "Business-model and customer thinking for teams that want it." },
  { title: "Speakers", text: "Showing students what a path into finance and business can look like." },
  { title: "Founder coaching", text: "Helping teams pressure-test an idea like a first-time founder." },
  { title: "Volunteers", text: "JMMB team members helping the day run well." },
  { title: "General business education", text: "An optional, non-commercial touchpoint where it fits the programme." },
];

function MoreThanMoney() {
  return (
    <section aria-labelledby="lp-more" className="lp-section lp-dense bg-paper">
      <div className="lp-wrap">
        <Kicker n="11">More than money</Kicker>
        <h2 id="lp-more" className="lp-h2 mt-6 max-w-[24ch]">
          JMMB&rsquo;s contribution does not have to be purely financial.
        </h2>
        <p className="lp-marker lp-keep mt-6 text-[clamp(2.8rem,8vw,6rem)] text-emerald-deep print:mt-4">People in the room.</p>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 print:mt-5 print:grid-cols-3">
          {ROLES.map((r, i) => (
            <li key={r.title} className="rounded-2xl border lp-rule bg-cream p-5">
              <p className="lp-num text-3xl text-emerald-deep">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="lp-h3 mt-2">{r.title}</h3>
              <p className="mt-1.5 text-[0.98rem] leading-relaxed text-ink-2">{r.text}</p>
            </li>
          ))}
        </ul>

        <div className="lp-keep mt-8 rounded-2xl border-2 border-dashed border-ink/40 p-5 print:mt-5">
          <p className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">Ground rules we will hold ourselves to</p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-3 print:grid-cols-3">
            {[
              "No marketing of investment products to students.",
              "No collection of students’ financial information.",
              "No implied employment, internships or accounts unless separately agreed.",
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
/*  12 Audience and brand value                                               */
/* -------------------------------------------------------------------------- */

const AUDIENCE = [
  { title: "Ambitious secondary-school students", text: `Approximately ${STUDENTS} of them, from ${FORMS[0]} through ${FORMS[FORMS.length - 1]}.` },
  { title: "Parents and families", text: "Who see who showed up for their children." },
  { title: "Teachers and school communities", text: `Across our network of ${PARTNER_SCHOOLS} schools in Kingston.` },
  { title: "Future university students", text: "Making choices about what to study and where." },
  { title: "Future founders and professionals", text: "Meeting JMMB before they meet anyone else." },
];

function AudienceValue() {
  return (
    <section aria-labelledby="lp-audience" className="lp-section">
      <div className="lp-wrap">
        <Kicker n="12">Audience and brand value</Kicker>
        <div className="mt-6 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] print:grid-cols-[0.9fr_1.1fr] print:gap-8">
          <div>
            <h2 id="lp-audience" className="lp-h2">
              The honest answer to the marketing questions.
            </h2>
            <Lines
              className="mt-6"
              items={[
                "Will JMMB be visible? Yes, across event materials, programming and post-event storytelling, at a level that matches the partnership.",
                "Is the audience relevant? It is the next generation of Jamaican founders, professionals and clients, met early and in the right way.",
                "Can it build longer relationships? Yes, through people, schools and a second year, not through leads.",
              ]}
            />
          </div>
          <div>
            <p className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">Who is in and around the room</p>
            <ul className="mt-4 space-y-3">
              {AUDIENCE.map((a) => (
                <li key={a.title} className="rounded-2xl border lp-rule bg-paper px-5 py-4">
                  <p className="font-extrabold">{a.title}</p>
                  <p className="mt-0.5 text-ink-2">{a.text}</p>
                </li>
              ))}
            </ul>
            <p className="lp-note mt-4">
              Many participants are minors. We will not promise leads, reach, impressions or data, and we will not position JMMB
              products to students.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  13 Gold Partner                                                           */
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
        <Kicker n="13">Our invitation</Kicker>
        <h2 id="lp-gold" className="lp-h2 mt-6 max-w-[18ch]">
          Become a Founding Gold Partner of the inaugural Hack876.
        </h2>

        <div className="lp-keep mt-10 border-y lp-rule py-8 print:mt-6 print:py-5">
          <p className="lp-num lp-accent text-[clamp(3.6rem,12vw,9.5rem)] text-sun">J$1,000,000</p>
          <p className="mt-4 text-lg font-bold tracking-[0.14em] uppercase sm:text-xl">Founding Partner · Inaugural Hack876</p>
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
            <p className="lp-accent mt-2 text-lg font-bold text-sun">Gold Partner · Inaugural Hack876</p>
          </figure>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  14 Benefits                                                               */
/* -------------------------------------------------------------------------- */

const BENEFITS = [
  "Founding-year association with the first Hack876",
  "Recognition during opening and closing programming",
  "Opportunity for JMMB leadership to address students",
  "JMMB people as judges, mentors, speakers and founder coaches",
  "Relationships with the schools in the Hack876 network",
  "Visibility across event materials, appropriate to the level selected",
  "Photo and video storytelling from the event",
  "Invitation to the finals and awards",
  "A post-event recap, and an early conversation about year two",
];

function GoldBenefits() {
  return (
    <section aria-labelledby="lp-benefits" className="lp-section">
      <div className="lp-wrap">
        <Kicker n="14">What partnership looks like</Kicker>
        <h2 id="lp-benefits" className="lp-h2 mt-6">
          More than a logo placement.
        </h2>
        <ol className="mt-10 grid border-t lp-rule sm:grid-cols-2 lg:grid-cols-3 print:mt-6 print:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <li key={b} className="flex gap-4 border-b lp-rule py-6 pr-6">
              <span className="lp-num text-2xl text-emerald-deep">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-[1.05rem] leading-snug font-semibold">{b}</span>
            </li>
          ))}
        </ol>
        <p className="lp-note mt-6">Everything above is deliverable by the Hack876 team. We will not promise media reach we cannot substantiate.</p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  15 Flexible ways to participate                                           */
/* -------------------------------------------------------------------------- */

function WaysToParticipate() {
  return (
    <section aria-labelledby="lp-ways" className="lp-section lp-dense bg-cream-2">
      <div className="lp-wrap">
        <Kicker n="15">Flexible ways to participate</Kicker>
        <h2 id="lp-ways" className="lp-h2 mt-6 max-w-[24ch]">
          Choose the level that fits the Foundation or marketing budget.
        </h2>

        <div className="mt-8 grid gap-5 lg:grid-cols-2 print:mt-5 print:grid-cols-2">
          <article className="lp-keep rounded-2xl border lp-rule bg-paper p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-xl font-extrabold">Prize Partner</h3>
              <p className="lp-num text-3xl">~US$3,500</p>
            </div>
            <p className="mt-1 text-ink-2">Underwrite some or all of the primary awards.</p>
            <dl className="mt-3 divide-y lp-rule border-y lp-rule text-sm">
              {PODIUM.map((p) => (
                <div key={p.name} className="grid grid-cols-[8rem_1fr_auto] gap-2 py-2 max-sm:grid-cols-[7rem_1fr]">
                  <dt className="font-extrabold">{p.name}</dt>
                  <dd className="font-semibold">{p.reward}</dd>
                  <dd className="text-ink-soft max-sm:col-start-2">{PODIUM_COST[p.place!]}</dd>
                </div>
              ))}
            </dl>
          </article>

          <article className="lp-keep rounded-2xl border-2 border-ink bg-sun-light p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-xl font-extrabold">Entrepreneurship Award Partner</h3>
              <p className="text-sm font-extrabold tracking-wide text-ink-soft uppercase">Proposed</p>
            </div>
            <p className="mt-1 text-ink-2">
              A possible custom award, such as <strong className="text-ink">Most Entrepreneurial Solution</strong> or{" "}
              <strong className="text-ink">Best Path to Impact</strong>, shaped with JMMB. Not yet a Hack876 award.
            </p>
            <p className="mt-3 text-sm font-semibold text-ink-soft">
              Or support the existing special awards: {SPECIAL_AWARDS.map((a) => a.name).join(", ")} (US${SPECIAL_TOTAL.toLocaleString("en-US")} for all{" "}
              {SPECIAL_AWARDS.length}, or US$200 each).
            </p>
          </article>

          <article className="lp-keep rounded-2xl border lp-rule bg-paper p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-xl font-extrabold">Food &amp; Student Experience Partner</h3>
              <p className="lp-num text-3xl">US$1,000</p>
            </div>
            <p className="mt-1 text-ink-2">
              Approximately J$150,000 toward meals and refreshments for approximately {STUDENTS} students, plus staff,
              volunteers, judges and guests.
            </p>
          </article>

          <article className="lp-keep rounded-2xl border lp-rule bg-paper p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-xl font-extrabold">In-kind / People Partner</h3>
              <p className="text-sm font-extrabold tracking-wide text-emerald-deep uppercase">Time and expertise</p>
            </div>
            <p className="mt-1 text-ink-2">
              Judges, mentors, speakers, volunteers and founder coaching, with or without a financial contribution.
            </p>
          </article>
        </div>
        <p className="lp-note mt-4">Costs are approximate. Final prize configuration may change with team structure, pricing and availability.</p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  16 Summary                                                                */
/* -------------------------------------------------------------------------- */

function Summary() {
  const options = [
    { name: "Prize Partner", amount: "~US$3,500", text: "The primary competition awards." },
    { name: "Special Awards Partner", amount: `US$${SPECIAL_TOTAL.toLocaleString("en-US")}`, text: `All ${SPECIAL_AWARDS.length} existing special awards, or US$200 for one.` },
    { name: "Entrepreneurship Award", amount: "Proposed", text: "A custom award shaped with JMMB." },
    { name: "Food & Student Experience", amount: "US$1,000", text: "Meals and refreshments for the day." },
    { name: "In-kind / People Partner", amount: "Time", text: "Judges, mentors, speakers, coaches." },
  ];
  return (
    <section aria-labelledby="lp-summary" className="lp-section">
      <div className="lp-wrap">
        <Kicker n="16">Partnership summary</Kicker>
        <h2 id="lp-summary" className="lp-h2 mt-6">
          Every option at a glance.
        </h2>
        <div className="mt-10 grid gap-5 lg:grid-cols-5 print:mt-6 print:grid-cols-5">
          <div className="lp-keep flex flex-col justify-between rounded-3xl bg-night p-8 text-cream lg:col-span-2 print:col-span-2">
            <div>
              <p className="text-sm font-extrabold tracking-[0.18em] text-sun uppercase">Founding Gold Partner</p>
              <p className="lp-num mt-5 text-[clamp(2.8rem,6vw,4.6rem)] text-sun">J$1,000,000</p>
              <p className="mt-2 text-sm font-bold tracking-[0.12em] text-cream/70 uppercase">Inaugural Hack876</p>
            </div>
            <p className="mt-8 text-lg leading-relaxed text-cream/90">Flexible support for the inaugural Hack876 and the student experience.</p>
          </div>
          <ul className="grid gap-3 lg:col-span-3 print:col-span-3">
            {options.map((o) => (
              <li key={o.name} className="lp-keep flex flex-wrap items-center justify-between gap-x-6 gap-y-1 rounded-2xl border lp-rule bg-paper px-5 py-3.5">
                <div>
                  <p className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">{o.name}</p>
                  <p className="mt-1 text-ink-2">{o.text}</p>
                </div>
                <p className="lp-num text-3xl">{o.amount}</p>
              </li>
            ))}
          </ul>
        </div>
        <p className="lp-sub mt-8 max-w-[34ch] text-emerald-deep">The size of the commitment can change. The invitation to be part of the first one does not.</p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  17 Year one + what JMMB could make possible                               */
/* -------------------------------------------------------------------------- */

function YearOne() {
  return (
    <section aria-labelledby="lp-year1" className="lp-section bg-paper">
      <div className="lp-wrap">
        <Kicker n="17">Year one</Kicker>
        <h2 id="lp-year1" className="lp-h2 mt-6">
          Deliberately focused.
        </h2>
        <Lines
          className="mt-6"
          items={[
            "Our vision is national. This inaugural staging does not have national-event resources, and we will not pretend it does.",
            `Approximately ${STUDENTS} students. A school network of ${PARTNER_SCHOOLS} in Kingston. One day, done properly.`,
          ]}
        />
        <ul className="mt-6 space-y-1">
          {["Build the first one well.", "Learn from it.", "Earn the right to make the second one bigger."].map((t, i) => (
            <li key={t} className="lp-sub" style={{ color: ["var(--color-ink)", "var(--color-ink-2)", "var(--color-emerald-deep)"][i] }}>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function MakePossible() {
  return (
    <section aria-labelledby="lp-possible" className="lp-section lp-dense">
      <div className="lp-wrap">
        <Kicker n="18">What JMMB could make possible</Kicker>
        <h2 id="lp-possible" className="lp-h2 mt-6 max-w-[22ch]">
          No multi-year commitment required.
        </h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] print:mt-5 print:grid-cols-[0.8fr_1.2fr]">
          <div className="lp-keep rounded-2xl border-2 border-ink bg-sun-light p-6">
            <p className="lp-num text-5xl">{event.year}</p>
            <p className="mt-3 text-xl font-extrabold">Help make the first Hack876 happen.</p>
            <p className="mt-2 text-ink-2">That is the whole ask.</p>
          </div>
          <div className="lp-keep rounded-2xl border border-dashed border-ink/40 p-6">
            <p className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">
              Future possibilities, only if both sides find it valuable. Not commitments.
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {[
                "A recurring entrepreneurship award",
                "JMMB people returning as mentors and judges",
                "Founder coaching for promising teams",
                "Support for students from outside Kingston",
                "Reaching more schools",
                "A Hack876 alumni network",
              ].map((t) => (
                <li key={t} className="rounded-full border lp-rule bg-paper px-3.5 py-1.5 text-sm font-semibold">
                  {t}
                </li>
              ))}
            </ul>
          </div>
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
        <p className="lp-note mt-6">A private partnership proposal prepared for the {SPONSOR} and JMMB.</p>
      </footer>
    </section>
  );
}
