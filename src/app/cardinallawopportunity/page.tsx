import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { BirdMark, DoctorBird } from "@/components/art/DoctorBird";
import { Icon } from "@/components/art/Icons";
import { TailLine } from "@/components/art/Marks";
import { Logo } from "@/components/art/Wordmark";
import { DownloadDeck } from "@/components/proposal/DownloadDeck";
import { IdeaToRealWorld, Seedling } from "@/components/proposal/Illustrations";
import { Check, Kicker, Lines, Ref } from "@/components/proposal/primitives";
import { confirmedSchools, eligibility, event, eventWhen, prizes, schools, schoolsInTalks, schoolStatus, stats } from "@/data/event";
import "@/components/proposal/proposal.css";

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
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  openGraph: null,
  twitter: null,
};

/* Canonical numbers come from the event data. */
const STUDENTS = eligibility.maxHackers;
const PARTNER_SCHOOLS = schools.length;
const CONFIRMED_SCHOOLS = confirmedSchools.length;
const IN_TALKS = schoolsInTalks.length;
const TEAMS = stats.find((s) => s.label === "teams")?.value;
const FORMS = eligibility.formOptions;
const TEAM_SIZE = `${eligibility.teamSize.min} to ${eligibility.teamSize.max}`;
const SPECIAL_AWARDS = prizes.filter((p) => !p.place);
const SPECIAL_TOTAL = SPECIAL_AWARDS.reduce((sum, p) => sum + (p.valueUsd ?? 0), 0);
const SPECIAL_EACH = SPECIAL_AWARDS[0]?.valueUsd ?? 0;
const PODIUM = prizes.filter((p) => p.place).sort((a, b) => a.place! - b.place!);
/* Approximate procurement costs for the podium rewards (same estimates as the other proposals). */
const PODIUM_COST: Record<number, string> = { 1: "Approximately US$1,800", 2: "Approximately US$1,000", 3: "US$600" };
const usd = (n: number) => `US$${n.toLocaleString("en-US")}`;

/* Sources: Cardinal Law's own site first; ecosystem organizations' own sites for what they do. */
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
    href: "https://www.cardinallawja.com/digital-land-titles-jamaicas-e-titles-system-to-transform-property-ownership/",
  },
  { id: 7, org: "First Angels Caribbean", label: "Home", href: "https://firstangelscaribbean.com/" },
] as const;

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

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
          <WhatHappensNext />
        </div>
        <div className="lp-page">
          <WhyCardinal />
          <BuildersBackingBuilders />
        </div>
        <div className="lp-page">
          <SameCorridors />
          <SchoolNetwork />
        </div>
        <div className="lp-page">
          <MoreThanMoney />
          <ResponsibleInnovation />
        </div>
        <div className="lp-page">
          <GoldPartner />
          <GoldBenefits />
        </div>
        <div className="lp-page">
          <WaysToParticipate />
          <Summary />
        </div>
        <div className="lp-page">
          <Relationship />
        </div>
        <div className="lp-page">
          <YearOne />
          <LongerView />
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
            <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: CARDINAL_NAVY }} />
            Private partnership proposal
          </p>
        </div>

        <h1 id="lp-hero-title" className="lp-h1 mt-10 max-w-[15ch] sm:mt-14">
          Every big idea eventually meets{" "}
          <span className="relative inline-block text-emerald-deep">
            the real world.
            <TailLine draw={false} className="absolute -bottom-2 left-0 h-4 w-full" />
          </span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-2 sm:text-xl">
          Hack876 gives Jamaica&rsquo;s next generation of builders a place to start. {SPONSOR} understands what happens when an
          idea is ready to become something more.
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

const QUESTIONS = [
  "Who owns it?",
  "How is it protected?",
  "How should user data be handled?",
  "What agreements are needed?",
  "How could it be financed?",
  "How does it become a company?",
  "How does a company hire people?",
  "What happens when regulation, risk or disputes enter the picture?",
];

function BigIdea() {
  return (
    <section aria-labelledby="lp-idea" className="lp-section lp-dense relative">
      <div className="lp-wrap">
        <Kicker n="01">The big idea</Kicker>
        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start print:grid-cols-[1fr_1.1fr] print:gap-10">
          <div>
            <h2 id="lp-idea" className="lp-statement" data-reveal>
              The prototype is only the beginning.
            </h2>
            <Lines
              className="mt-8"
              items={[
                "Hack876 gives a young person one day to turn an idea into something tangible.",
                "But if that idea keeps going, the questions change.",
              ]}
            />
          </div>
          <ol className="grid gap-2.5 sm:grid-cols-2 print:grid-cols-2" data-reveal>
            {QUESTIONS.map((q, i) => (
              <li
                key={q}
                className={`rounded-xl border-2 px-4 py-3 font-extrabold leading-snug ${i === QUESTIONS.length - 1 ? "border-ink bg-sun-light sm:col-span-2 print:col-span-2" : "border-ink/70 bg-paper"}`}
                style={{ rotate: `${[-1, 0.8, -0.6, 1, -0.8, 0.6, -1, 0][i]}deg` }}
              >
                {q}
              </li>
            ))}
          </ol>
        </div>
        <p className="lp-sub mt-10 max-w-[34ch] text-emerald-deep print:mt-6">
          That is where the legal profession becomes part of the innovation ecosystem.
        </p>
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
                schools where the Hack876 team currently has operating relationships. It is not an exclusive eligibility list.
              </p>
            </div>

            <div className="lp-keep my-9 rounded-2xl border-2 border-ink bg-paper p-6 shadow-[4px_5px_0_0_var(--color-emerald)] sm:p-8">
              <h3 className="lp-h3 text-[clamp(1.3rem,2.2vw,1.7rem)]">Hack876 is open to eligible students beyond those schools.</h3>
              <div className="lp-prose mt-4 text-[1.02rem]">
                <p>Students from elsewhere in Kingston or other parts of Jamaica may apply, subject to capacity.</p>
                <p>
                  In this inaugural year, students outside our organized network may need to arrange their own transportation
                  and, where relevant, lodging.
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
              "And building is only one part of the day. Teams also have to explain who their idea is for, why it matters and what it would take to make it real.",
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
          <p className="lp-statement">Innovation is interdisciplinary.</p>
          <p className="lp-sub mt-2 text-emerald-deep">It always has been.</p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  04 What happens next? (signature)                                         */
/* -------------------------------------------------------------------------- */

const REAL_WORLD_QUESTIONS = [
  { label: "Intellectual property", icon: "pen" },
  { label: "Privacy and data", icon: "phone" },
  { label: "Contracts", icon: "notebook" },
  { label: "Capital", icon: "chart" },
  { label: "Governance", icon: "people" },
  { label: "Employment", icon: "badge" },
  { label: "Regulation", icon: "browser" },
  { label: "Risk", icon: "resilience" },
];

function WhatHappensNext() {
  return (
    <section aria-labelledby="lp-next" className="lp-section lp-dense lp-grid-bg">
      <div className="lp-wrap">
        <Kicker n="04">What happens next?</Kicker>
        <h2 id="lp-next" className="lp-h2 mt-6 max-w-[24ch]">
          Somewhere between the prototype and the real world, a new set of questions appears.
        </h2>

        <IdeaToRealWorld
          labels={["Idea", "Prototype", "Product", "Company", "Real world"]}
          className="mx-auto mt-10 w-full max-w-5xl print:mt-4 print:max-w-[8.4in]"
        />

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 print:mt-5 print:grid-cols-8 print:gap-2">
          {REAL_WORLD_QUESTIONS.map((q, i) => (
            <li
              key={q.label}
              className="flex items-center gap-2.5 rounded-xl border-2 border-ink/70 bg-paper px-3 py-2.5 font-extrabold leading-tight print:flex-col print:items-start print:gap-1.5 print:px-2.5"
              style={{ rotate: `${[-1.2, 0.8, -0.6, 1.2, -1, 0.6, -0.8, 1][i]}deg` }}
            >
              <Icon name={q.icon} className="h-7 w-7 shrink-0" />
              {q.label}
            </li>
          ))}
        </ul>

        <div className="mt-10 grid gap-8 md:grid-cols-2 print:mt-6 print:grid-cols-2">
          <p className="lp-prose">
            Hack876 students do not need lawyers to take part. The point is simpler: the people who help ideas become durable
            institutions are part of the ecosystem too, and students should see them early.
          </p>
          <p className="lp-sub text-emerald-deep">Lawyers are part of how ideas last.</p>
        </div>
      </div>
    </section>
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
      ),
    },
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
      ),
    },
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
      ),
    },
  ];
  return (
    <section aria-labelledby="lp-why" className="lp-section lp-dense">
      <div className="lp-wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Kicker n="05">Why Cardinal</Kicker>
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
/*  06 Builders backing builders                                              */
/* -------------------------------------------------------------------------- */

function BuildersBackingBuilders() {
  return (
    <section aria-labelledby="lp-builders" className="lp-section lp-dark lp-grid-bg relative overflow-hidden">
      <div className="lp-wrap">
        <Kicker n="06">Builders backing builders</Kicker>
        <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center print:grid-cols-[1.1fr_0.9fr] print:items-center">
          <div>
            <h2 id="lp-builders" className="lp-h2">
              Cardinal built its own modern practice. Hack876 is building its first version.
            </h2>
            <Lines
              className="mt-8"
              items={[
                "Cardinal is the result of four attorneys coming together to create a practice centred on excellence and diversity of expertise.",
                "Hack876 asks a younger generation to do something similar on a smaller scale: bring different skills to one table and build something that did not exist that morning.",
              ]}
            />
            <p className="mt-6 text-sm text-cream/60">
              Source: Cardinal Law, About Us.
              <Ref id={2} />
            </p>
          </div>
          <div className="lp-keep rounded-3xl border-2 border-cream/25 bg-white/[0.04] p-8">
            <p className="text-sm font-bold tracking-[0.14em] text-cream/60 uppercase">Close to founders already</p>
            <p className="mt-4 text-lg leading-relaxed text-cream/90">
              Abuna serves as company secretary and non-executive director for private entities including First Angels
              Caribbean Limited and Rev Up Jamaica Limited.
              <Ref id={3} />
            </p>
            <p className="mt-4 text-lg leading-relaxed text-cream/90">
              First Angels Caribbean describes itself as a network committed to &ldquo;supporting and accelerating the growth
              of promising Caribbean startups.&rdquo;
              <Ref id={7} />
            </p>
            <p className="lp-marker lp-accent mt-6 text-[clamp(1.8rem,3.6vw,2.6rem)] text-sun">Builders backing builders.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  07 The same corridors                                                     */
/* -------------------------------------------------------------------------- */

function SameCorridors() {
  return (
    <section aria-labelledby="lp-corridors" className="lp-section lp-dense">
      <div className="lp-wrap grid items-center gap-12 lg:grid-cols-[1.3fr_0.7fr] print:grid-cols-[1.35fr_0.65fr] print:gap-10">
        <div>
          <Kicker n="07">The same corridors</Kicker>
          <h2 id="lp-corridors" className="lp-h2 mt-6 max-w-[22ch]">
            Some of the students in this room are walking the same corridors Abuna and D&rsquo;Angello once walked.
          </h2>
          <p className="lp-prose mt-8">
            Abuna Jones Campbell attended Campion College.
            <Ref id={3} /> D&rsquo;Angello G. Foster attended St. George&rsquo;s College.
            <Ref id={4} /> Both schools are part of Hack876&rsquo;s school network.
          </p>
          <Lines
            className="mt-6"
            items={[
              "That is not a reason to sponsor. It is a reason the room matters.",
              "A student should be able to look across a Hack876 table and see not only engineers and technologists, but Jamaican lawyers, investors, executives and founders, and realize how many different careers can exist around a single idea.",
            ]}
          />
        </div>
        <figure aria-hidden className="hidden lg:block print:block">
          <div className="rounded-3xl border-2 border-ink bg-paper p-6 shadow-[5px_6px_0_0_var(--color-ink)]" style={{ rotate: "2deg" }}>
            <p className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">Around one idea</p>
            <ul className="mt-4 space-y-2">
              {[
                { icon: "board", t: "An engineer" },
                { icon: "pen", t: "A designer" },
                { icon: "notebook", t: "A lawyer" },
                { icon: "chart", t: "An investor" },
                { icon: "business", t: "A founder" },
              ].map((r) => (
                <li key={r.t} className="flex items-center gap-3 rounded-xl border lp-rule bg-cream px-3 py-2 font-extrabold">
                  <Icon name={r.icon} className="h-7 w-7" />
                  {r.t}
                </li>
              ))}
            </ul>
          </div>
        </figure>
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
                `These are the schools where Hack876 currently has operating relationships. ${
                  CONFIRMED_SCHOOLS > 0
                    ? `${CONFIRMED_SCHOOLS} of ${PARTNER_SCHOOLS} ${CONFIRMED_SCHOOLS === 1 ? "has" : "have"} formally confirmed so far`
                    : `${IN_TALKS} ${IN_TALKS === 1 ? "is" : "are"} in active talks`
                }, and the list is not an exclusive eligibility boundary.`,
              ]}
            />
            <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2 print:grid-cols-2">
              {schools.map((s) => {
                const status = schoolStatus(s);
                return (
                  <li
                    key={s}
                    className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-2.5 font-semibold ${
                      s === "Campion College" || s === "St. George's College" ? "border-2 border-ink bg-sun-light" : "lp-rule bg-cream"
                    }`}
                  >
                    {s}
                    <span className={`shrink-0 text-[0.65rem] font-extrabold tracking-wide uppercase ${status === "pending" ? "text-ink-soft" : "text-emerald-deep"}`}>
                      {status === "confirmed" ? "Confirmed" : status === "talks" ? "In talks" : "Pending"}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
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
  { title: "An award judge", text: "Helping judge a proposed Responsible Innovation Award." },
];

function MoreThanMoney() {
  return (
    <section aria-labelledby="lp-more" className="lp-section lp-dense bg-paper">
      <div className="lp-wrap">
        <Kicker n="09">More than money</Kicker>
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
/*  10 Proposed Responsible Innovation Award                                  */
/* -------------------------------------------------------------------------- */

const LENSES = ["Privacy", "Trust", "Ownership and IP awareness", "Real-world risk", "Responsible deployment", "Clear thinking about users"];

function ResponsibleInnovation() {
  return (
    <section aria-labelledby="lp-award" className="lp-section lp-dense lp-dark lp-grid-bg relative overflow-hidden">
      <div className="lp-wrap">
        <div className="flex flex-wrap items-center gap-3">
          <Kicker n="10">A proposed custom award</Kicker>
          <span className="rounded-full border border-cream/40 px-3 py-0.5 text-xs font-extrabold tracking-[0.14em] text-cream/80 uppercase">
            Proposed · not yet a Hack876 award
          </span>
        </div>
        <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center print:grid-cols-[1.1fr_0.9fr] print:items-center">
          <div>
            <h2 id="lp-award" className="lp-h2">
              The Cardinal Law Responsible Innovation Award
            </h2>
            <Lines
              className="mt-6"
              items={[
                "For the team that did not only ask “can we build it?” but thought carefully about what happens if people actually use it.",
                "Something to shape together with Cardinal, including the criteria, the judges and the prize.",
              ]}
            />
          </div>
          <div className="lp-keep rounded-3xl border-2 border-cream/25 bg-white/[0.04] p-7">
            <p className="text-xs font-extrabold tracking-[0.16em] text-sun uppercase">What judges might look for</p>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {LENSES.map((l) => (
                <li key={l} className="flex items-center gap-2 font-semibold text-cream">
                  <Check className="lp-accent text-sun" />
                  {l}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-cream/65">
              Or, Cardinal can sponsor one of the existing special awards: {SPECIAL_AWARDS.map((a) => a.name).join(", ")}.
            </p>
          </div>
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
        <Kicker n="11">Our invitation</Kicker>
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
            <p className="lp-accent mt-2 text-lg font-bold text-sun">Gold Partner · Inaugural Hack876</p>
          </figure>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  12 Benefits                                                               */
/* -------------------------------------------------------------------------- */

const BENEFITS = [
  "Founding-year association with the first Hack876",
  "Recognition during opening and closing programming",
  "Cardinal partners and lawyers as judges and mentors",
  "An optional general-education session on what happens after the prototype",
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
        <Kicker n="12">What partnership looks like</Kicker>
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
/*  13 Flexible ways to participate                                           */
/* -------------------------------------------------------------------------- */

function WaysToParticipate() {
  return (
    <section aria-labelledby="lp-ways" className="lp-section lp-dense bg-cream-2">
      <div className="lp-wrap">
        <Kicker n="13">Flexible ways to participate</Kicker>
        <h2 id="lp-ways" className="lp-h2 mt-6 max-w-[24ch]">
          Gold is our first choice. It is not the only one.
        </h2>

        <div className="mt-8 grid gap-5 lg:grid-cols-2 print:mt-5 print:grid-cols-2">
          <article className="lp-keep rounded-2xl border lp-rule bg-paper p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-xl font-extrabold">Official Prize Partner</h3>
              <p className="lp-num text-3xl">~US$3,500</p>
            </div>
            <p className="mt-1 text-ink-2">The primary competition awards.</p>
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

          <article className="lp-keep rounded-2xl border lp-rule bg-paper p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-xl font-extrabold">Special Awards Partner</h3>
              <p className="lp-num text-3xl">{usd(SPECIAL_TOTAL)}</p>
            </div>
            <p className="mt-1 text-ink-2">
              All {SPECIAL_AWARDS.length} existing special awards, or {usd(SPECIAL_EACH)} for one.
            </p>
            <ul className="mt-3 divide-y lp-rule border-y lp-rule text-sm">
              {SPECIAL_AWARDS.map((a) => (
                <li key={a.name} className="flex justify-between gap-3 py-2">
                  <span className="font-extrabold">{a.name}</span>
                  <span className="font-semibold text-ink-2">{a.reward}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="lp-keep rounded-2xl border-2 border-ink bg-sun-light p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-xl font-extrabold">Responsible Innovation Award</h3>
              <p className="text-sm font-extrabold tracking-wide text-ink-soft uppercase">Proposed</p>
            </div>
            <p className="mt-1 text-ink-2">A bespoke award to shape with Cardinal. Not currently an official Hack876 award.</p>
          </article>

          <article className="lp-keep rounded-2xl border lp-rule bg-paper p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-xl font-extrabold">Food &amp; Student Experience Partner</h3>
              <p className="lp-num text-3xl">US$1,000</p>
            </div>
            <p className="mt-1 text-ink-2">Approximately J$150,000 toward meals and refreshments for the day.</p>
          </article>
        </div>
        <p className="lp-note mt-4">Costs are approximate. Final prize configuration may change with team structure, pricing and availability.</p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  14 Summary                                                                */
/* -------------------------------------------------------------------------- */

function Summary() {
  const options = [
    { name: "Official Prize Partner", amount: "~US$3,500", text: "The primary competition awards." },
    { name: "Food & Student Experience", amount: "US$1,000", text: "Approximately J$150,000 for meals and refreshments." },
    { name: "Special Awards Partner", amount: usd(SPECIAL_TOTAL), text: `All ${SPECIAL_AWARDS.length} existing awards, or ${usd(SPECIAL_EACH)} for one.` },
    { name: "Responsible Innovation Award", amount: "Proposed", text: "A bespoke award to shape together." },
    { name: "In-kind / People Partner", amount: "Time", text: "Judges, mentors, speakers and education, with or without a contribution." },
  ];
  return (
    <section aria-labelledby="lp-summary" className="lp-section">
      <div className="lp-wrap">
        <Kicker n="14">Partnership summary</Kicker>
        <h2 id="lp-summary" className="lp-h2 mt-6">
          Every option at a glance.
        </h2>
        <div className="mt-10 grid gap-5 lg:grid-cols-5 print:mt-6 print:grid-cols-5">
          <div className="lp-keep flex flex-col justify-between rounded-3xl bg-night p-8 text-cream lg:col-span-2 print:col-span-2">
            <div>
              <p className="text-sm font-extrabold tracking-[0.18em] text-sun uppercase">Founding Gold Partner</p>
              <p className="lp-num mt-5 text-[clamp(2.8rem,6vw,4.6rem)] text-sun">J$1,000,000</p>
              <p className="mt-2 text-sm font-bold tracking-[0.12em] text-cream/70 uppercase">Our preferred invitation</p>
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
/*  15 Relationship                                                           */
/* -------------------------------------------------------------------------- */

function Relationship() {
  return (
    <section aria-labelledby="lp-rel" className="lp-section lp-grid-bg">
      <div className="lp-wrap">
        <Kicker n="15">A direct line</Kicker>
        <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center print:grid-cols-[1.1fr_0.9fr] print:items-center">
          <div>
            <h2 id="lp-rel" className="lp-h2 max-w-[20ch]">
              There is no faceless sponsorship inbox between Hack876 and Cardinal.
            </h2>
            <Lines
              className="mt-8"
              items={[
                <span key="a">
                  This proposal goes directly to <strong className="text-ink">Abuna Jones Campbell</strong> and{" "}
                  <strong className="text-ink">D&rsquo;Angello G. Foster</strong>, partners at Cardinal Law.
                </span>,
                "If Cardinal is interested, we would love for Abuna, D’Angello, or both to help decide what participation should actually look like from Cardinal’s side.",
              ]}
            />
          </div>
          <div className="lp-keep rounded-2xl border-2 border-ink bg-paper p-6 shadow-[4px_5px_0_0_var(--color-emerald)]">
            <p className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">Questions we would shape together</p>
            <ul className="mt-4 space-y-2.5">
              {[
                "Who from Cardinal should be in the room?",
                "Does a Responsible Innovation Award make sense?",
                "Would a short general-education session be useful?",
                "What level of financial commitment feels right?",
              ].map((t) => (
                <li key={t} className="flex gap-2.5 font-semibold">
                  <Check className="mt-0.5 text-emerald-deep" />
                  {t}
                </li>
              ))}
            </ul>
            <p className="lp-note mt-4">A conversation, not a workload.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  16 Year one + longer view                                                 */
/* -------------------------------------------------------------------------- */

function YearOne() {
  return (
    <section aria-labelledby="lp-year1" className="lp-section bg-paper">
      <div className="lp-wrap grid items-center gap-12 lg:grid-cols-[1.35fr_0.65fr] print:grid-cols-[1.4fr_0.6fr] print:gap-10">
        <div>
          <Kicker n="16">Year one</Kicker>
          <h2 id="lp-year1" className="lp-h2 mt-6">
            Deliberately focused.
          </h2>
          <Lines
            className="mt-6"
            items={[
              `Approximately ${STUDENTS} students${TEAMS ? `, ${TEAMS} teams` : ""}, ${PARTNER_SCHOOLS} existing school relationships and one day in Kingston.`,
              "Our vision is national. This inaugural staging does not have national-event resources, and we will not promise nationwide logistics.",
            ]}
          />
          <ul className="mt-6 space-y-1">
            {["Build the first version well.", "Learn from it.", "Earn the right to make the second one bigger."].map((t, i) => (
              <li key={t} className="lp-sub" style={{ color: ["var(--color-ink)", "var(--color-ink-2)", "var(--color-emerald-deep)"][i] }}>
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div aria-hidden className="hidden lg:block print:block">
          <Seedling className="mx-auto w-full max-w-xs print:max-w-[2.6in]" />
        </div>
      </div>
    </section>
  );
}

function LongerView() {
  return (
    <section aria-labelledby="lp-longer" className="lp-section lp-dense">
      <div className="lp-wrap">
        <Kicker n="17">The longer view</Kicker>
        <h2 id="lp-longer" className="lp-h2 mt-6 max-w-[22ch]">
          No multi-year commitment required.
        </h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] print:mt-5 print:grid-cols-[0.8fr_1.2fr]">
          <div className="lp-keep rounded-2xl border-2 border-ink bg-sun-light p-6">
            <p className="lp-num text-5xl">{event.year}</p>
            <p className="mt-3 text-xl font-extrabold">Help make the first Hack876 possible.</p>
            <p className="mt-2 text-ink-2">That is the whole ask.</p>
          </div>
          <div className="lp-keep rounded-2xl border border-dashed border-ink/40 p-6">
            <p className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">
              Future possibilities, only if both sides find year one valuable. Not commitments.
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {[
                "Cardinal lawyers returning as mentors and judges",
                "A recurring Responsible Innovation Award",
                "A simple legal and innovation workshop for future cohorts",
                "Founder and IP education for older Hack876 alumni",
                "Connections into Jamaica’s wider entrepreneurial ecosystem",
                "Support as Hack876 expands beyond Kingston",
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
