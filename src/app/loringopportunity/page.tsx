import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { BirdMark, DoctorBird } from "@/components/art/DoctorBird";
import { Icon } from "@/components/art/Icons";
import { TailLine } from "@/components/art/Marks";
import { Logo } from "@/components/art/Wordmark";
import { JamaicaMap } from "@/components/proposal/JamaicaMap";
import { DownloadDeck } from "@/components/proposal/DownloadDeck";
import { event, eligibility, people, schools } from "@/data/event";
import { Blueprint, FuturePaths, Seedling } from "@/components/proposal/Illustrations";
import { Check, Kicker, Lines, Rail, Ref } from "@/components/proposal/primitives";
import "@/components/proposal/proposal.css";

/*
 * Private partnership proposal for Loring Consulting Engineers.
 * Not linked from the public site. noindex/nofollow here and via an
 * X-Robots-Tag header in next.config.ts.
 */

export const metadata: Metadata = {
  title: { absolute: "Hack876 × Loring Consulting Engineers" },
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

/* A Loring engineer already confirmed as a Hack876 judge (from the site's people data). */
const LORING_JUDGE = people.find((p) => p.confirmed && p.organization === "Loring Consulting Engineers");

/* Canonical numbers come from the event data. */
const STUDENTS = eligibility.maxHackers;
const PARTNER_SCHOOLS = schools.length;

/** Public site URL, only when one is actually configured (never invented). */
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : null);

/* Loring-owned sources for every company claim on this page. */
const SOURCES = [
  {
    id: 1,
    label: "Our History — founded 1956 by Joseph R. Loring",
    href: "https://www.loringengineers.com/about/our-history/",
  },
  {
    id: 2,
    label: "Loring Consulting Engineers Celebrates Official Launch of Jamaica Office (March 4, 2026)",
    href: "https://www.loringengineers.com/news/loring-consulting-engineers-celebrates-official-launch-of-jamaica-office/",
  },
  {
    id: 3,
    label: "Oneil Gayle, Chief Executive Officer — leadership biography",
    href: "https://www.loringengineers.com/people/oneil-gayle/",
  },
  {
    id: 4,
    label: "Loring Consulting Engineers Promotes Oneil Gayle to CEO (December 2023)",
    href: "https://www.loringengineers.com/news/loring-consulting-engineers-promotes-oneil-gayle-to-ceo/",
  },
] as const;

/* -------------------------------------------------------------------------- */
/*  Small building blocks                                                     */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

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
        {/* ============================ PAGE 1 — HERO ============================ */}
        <div className="lp-page">
          <Hero />
        </div>

        {/* ===================== PAGE 2 — BIG IDEA + MEET HACK876 ===================== */}
        <div className="lp-page">
          <BigIdea />
          <MeetHack876 />
        </div>

        {/* ====================== PAGE 3 — NOT JUST APPS ====================== */}
        <div className="lp-page">
          <NotJustApps />
        </div>

        {/* ================= PAGE 4 — WHY LORING + TIMELINE ================= */}
        <div className="lp-page">
          <WhyLoring />
          <Timeline />
        </div>

        {/* ============== PAGE 5 — PIPELINE + SCHOOL RELATIONSHIPS ============== */}
        <div className="lp-page">
          <Pipeline />
          <Schools />
        </div>

        {/* ============== PAGE 6 — WHY KINGSTON + NATIONAL VISION ============== */}
        <div className="lp-page">
          <WhyKingston />
        </div>
        <div className="lp-page">
          <NationalVision />
        </div>

        {/* ===================== PAGE 7 — ENGINEERS IN THE ROOM ===================== */}
        <div className="lp-page">
          <MoreThanMoney />
        </div>

        {/* ========================== PAGE 8 — GOLD PARTNER ========================== */}
        <div className="lp-page">
          <GoldPartner />
        </div>

        {/* ======================= PAGE 9 — GOLD BENEFITS ======================= */}
        <div className="lp-page">
          <GoldBenefits />
        </div>

        {/* ================== PAGE 10 — PRIZE + HOSPITALITY ================== */}
        <div className="lp-page">
          <Alternatives />
        </div>

        {/* ===================== PAGE 11 — SUMMARY ===================== */}
        <div className="lp-page">
          <Summary />
        </div>

        {/* ================= PAGE 12 — YEAR ONE + THE FIRST ONE ================= */}
        <div className="lp-page">
          <YearOne />
          <FirstOne />
        </div>

        {/* ========================= PAGE 13 — CLOSING ========================= */}
        <div className="lp-page">
          <Closing />
        </div>
      </main>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  01 — Hero                                                                 */
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
          <p className="text-sm font-bold tracking-[0.16em] text-ink-soft uppercase">Hack876 × Loring Consulting Engineers</p>
          <p className="inline-flex items-center gap-2 rounded-full border lp-rule bg-paper px-3 py-1 text-xs font-bold tracking-[0.12em] text-ink-soft uppercase">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-bill" />
            Private partnership proposal
          </p>
        </div>

        <h1 id="lp-hero-title" className="lp-h1 mt-10 max-w-[17ch] sm:mt-14">
          <span className="relative inline-block text-emerald-deep">
            Invest early
            <TailLine draw={false} className="absolute -bottom-2 left-0 h-4 w-full" />
          </span>{" "}
          in Jamaica&rsquo;s next generation of engineers, builders and problem solvers.
        </h1>

        <p className="mt-8 text-lg font-bold tracking-wide text-ink-2">Kingston, Jamaica · {event.year}</p>
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
/*  02 — The big idea                                                         */
/* -------------------------------------------------------------------------- */

function BigIdea() {
  return (
    <section aria-labelledby="lp-idea" className="lp-section relative">
      <div className="lp-wrap">
        <Kicker n="01">The big idea</Kicker>
        <h2 id="lp-idea" className="lp-statement mt-6 max-w-[18ch]" data-reveal>
          What if we met Jamaica&rsquo;s best young builders before the world did?
        </h2>
        <div className="mt-14 grid gap-10 md:grid-cols-[1fr_1.3fr] md:items-center print:mt-4 print:grid-cols-[0.8fr_1.3fr] print:items-center">
          <div aria-hidden className="hidden md:block print:block">
            <FuturePaths paths={[{ icon: "board", label: "Electrical" }, { icon: "resilience", label: "Buildings" }, { icon: "spark", label: "Energy" }, { icon: "gear", label: "Robotics" }, { icon: "browser", label: "Software" }]} className="mx-auto w-full max-w-md print:max-w-[3.3in]" />
          </div>
          <div data-reveal>
            <Lines
              items={[
                "Somewhere in Jamaica today is a student who will become an electrical engineer.",
                "Another will design smarter buildings.",
                "Another will work in energy.",
                "Another will build robots, infrastructure, software or systems we have not imagined yet.",
                "Most companies will meet them when they are looking for an internship or their first job.",
              ]}
            />
            <p className="lp-sub mt-8 text-emerald-deep">Hack876 creates an opportunity to meet them earlier.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  03 — Meet Hack876                                                         */
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
              {["board", "laptop", "notebook", "sticky"].map((n, i) => (
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
                Those schools represent the institutions with which the Hack876 team currently has direct relationships and
                can coordinate most effectively for the inaugural event.
              </p>
              <p>They are not the limit of who can participate.</p>
            </div>

            <div className="lp-keep my-9 rounded-2xl border-2 border-ink bg-paper p-6 shadow-[4px_5px_0_0_var(--color-emerald)] sm:p-8">
              <h3 className="lp-h3 text-[clamp(1.3rem,2.2vw,1.7rem)]">
                Hack876 is open to eligible students beyond those partner schools.
              </h3>
              <div className="lp-prose mt-4 text-[1.02rem]">
                <p>
                  Students from elsewhere in Kingston or other parts of Jamaica may participate, subject to available
                  capacity and the event&rsquo;s application process.
                </p>
                <p>
                  For this inaugural staging, however, Hack876 does not yet have the resources to coordinate transportation,
                  accommodation or other travel logistics for students coming from outside our immediate network.
                </p>
                <p>
                  Students participating from farther away would therefore need to arrange their own transportation and,
                  where necessary, lodging.
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
/*  04 — Not just apps                                                        */
/* -------------------------------------------------------------------------- */

const BUILDS: { label: string; icon: string; physical?: boolean }[] = [
  { label: "A sensor", icon: "board", physical: true },
  { label: "A physical prototype", icon: "hand", physical: true },
  { label: "A robot", icon: "gear", physical: true },
  { label: "An energy monitoring system", icon: "chart", physical: true },
  { label: "An AI tool", icon: "spark" },
  { label: "A transportation solution", icon: "move", physical: true },
  { label: "A new approach to disaster resilience", icon: "resilience", physical: true },
  { label: "A data product", icon: "chart" },
  { label: "An automation", icon: "bot-free" },
  { label: "A piece of software", icon: "browser" },
];

const PROCESS = [
  "Identify a problem",
  "Understand the constraints",
  "Design a solution",
  "Build",
  "Test",
  "Explain",
  "Improve",
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
              "The word “hackathon” often brings one image to mind:",
              <strong key="s" className="text-ink">Students building apps.</strong>,
              "Hack876 is deliberately broader.",
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
            </ul>
            <p className="mt-4 flex items-center gap-2 text-sm text-ink-soft">
              <span aria-hidden className="inline-block h-3 w-3 rounded-[4px] border border-ink/25 bg-mint/60" />
              Hardware, energy, infrastructure and physical systems are first-class Hack876 builds.
            </p>
            <p className="lp-prose mt-6 font-semibold">Or something none of us expected.</p>
          </div>
        </div>

        <div className="lp-keep mt-16 print:mt-10">
          <p className="lp-statement">The medium does not matter.</p>
          <p className="lp-sub mt-2 text-emerald-deep">The engineering mindset does.</p>
        </div>

        {/* Process diagram — a loop, because engineering iterates. */}
        <figure className="lp-keep mt-14 print:mt-8">
          <figcaption className="sr-only">
            The Hack876 process: {PROCESS.join(", then ")}. Then the loop repeats.
          </figcaption>
          <ol className="relative grid gap-0 md:grid-cols-7 print:grid-cols-7">
            {PROCESS.map((step, i) => (
              <li key={step} className="relative flex items-center gap-4 py-2 md:flex-col md:items-start md:gap-3 md:py-0 print:flex-col print:items-start print:gap-3 print:py-0">
                {/* connector */}
                {i < PROCESS.length - 1 && (
                  <span aria-hidden className="absolute top-12 left-[1.2rem] h-full w-px bg-ink/25 md:top-[1.2rem] md:left-10 md:h-px md:w-[calc(100%-2.5rem)] print:top-[1.2rem] print:left-10 print:h-px print:w-[calc(100%-2.5rem)]" />
                )}
                <span className={`relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-ink text-sm font-extrabold ${i === 3 ? "bg-sun" : "bg-paper"}`}>
                  {i + 1}
                </span>
                <span className="pr-2 font-bold leading-snug">{step}</span>
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
/*  05 — Why Loring                                                           */
/* -------------------------------------------------------------------------- */

function WhyLoring() {
  return (
    <section aria-labelledby="lp-why" className="lp-section">
      <div className="lp-wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 print:grid-cols-[0.7fr_1.3fr]">
        <div>
          <Kicker n="04">Why Loring</Kicker>
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
/*  06 — Timeline                                                             */
/* -------------------------------------------------------------------------- */

const MILESTONES = [
  { year: "2002", text: "Oneil Gayle joins Loring as a summer intern.", ref: 3 },
  { year: "2016", text: "He becomes Chief Operating Officer.", ref: 4 },
  { year: "2023", text: "He becomes Chief Executive Officer.", ref: 4 },
  { year: "2026", text: "Loring formally launches its Jamaica office.", ref: 2 },
];

function Timeline() {
  return (
    <section aria-labelledby="lp-timeline" className="lp-section lp-dark lp-grid-bg relative overflow-hidden">
      <div className="lp-wrap">
        <Kicker n="05">A career, compounding</Kicker>
        <h2 id="lp-timeline" className="lp-h2 mt-6 max-w-[16ch]">
          One relationship can compound for decades.
        </h2>

        <ol className="mt-14 print:mt-8">
          {MILESTONES.map((m) => (
            <li
              key={m.year}
              className="lp-keep grid grid-cols-[2.5rem_1fr] gap-x-4 sm:grid-cols-[minmax(9rem,15rem)_3rem_1fr] sm:gap-x-8 print:grid-cols-[11rem_3rem_1fr]"
            >
              <p className="lp-num col-start-2 row-start-1 text-[clamp(2.8rem,8vw,6.5rem)] text-cream sm:col-start-1 sm:pb-10 sm:text-right print:col-start-1 print:pb-5 print:text-right print:text-[4.4rem]">
                {m.year}
              </p>
              <Rail />
              <p className="col-start-2 pb-10 text-xl font-semibold text-cream/90 sm:col-start-3 sm:row-start-1 sm:mt-[clamp(0.75rem,2.1vw,1.85rem)] sm:pb-0 sm:text-2xl print:col-start-3 print:row-start-1 print:mt-3 print:pb-0">
                {m.text}
                <Ref id={m.ref} />
              </p>
            </li>
          ))}

          <li className="lp-keep grid grid-cols-[2.5rem_1fr] gap-x-4 sm:grid-cols-[minmax(9rem,15rem)_3rem_1fr] sm:gap-x-8 print:grid-cols-[11rem_3rem_1fr]">
            <p className="lp-num lp-accent col-start-2 row-start-1 text-[clamp(2.8rem,8vw,6.5rem)] text-sun sm:col-start-1 sm:text-right print:col-start-1 print:text-right print:text-[4.4rem]">
              2027
            </p>
            <Rail last />
            <p className="lp-marker lp-accent col-start-2 text-[clamp(2.2rem,5vw,4.4rem)] text-sun sm:col-start-3 sm:row-start-1 sm:self-center print:col-start-3 print:row-start-1">
              Whose journey could begin at Hack876?
            </p>
          </li>
        </ol>

        <div className="mt-16 grid gap-10 border-t lp-rule pt-12 md:grid-cols-2 print:mt-8 print:pt-8">
          <Lines
            items={[
              "The point is not that every Hack876 student will work for Loring.",
              "The opportunity is to create the conditions for meaningful relationships to begin.",
            ]}
          />
          <div>
            <ul className="space-y-2 text-xl font-semibold text-cream">
              {[
                "One introduction.",
                "One mentor.",
                "One engineer who takes a student’s idea seriously.",
                "One experience that makes an engineering career feel possible.",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <span aria-hidden className="lp-accent mt-2.5 h-2 w-2 shrink-0 rounded-full bg-emerald-light" />
                  {t}
                </li>
              ))}
            </ul>
            <p className="lp-sub lp-accent mt-8 text-sun">Sometimes that is enough to change the direction of a life.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  07 — Talent pipeline                                                      */
/* -------------------------------------------------------------------------- */

const JOURNEY = [
  { when: "Age 17", text: "A student meets a Loring engineer while presenting a prototype at Hack876." },
  { when: "University", text: "She studies electrical, mechanical, civil, computer or another engineering discipline." },
  { when: "Internship years", text: "She already knows Loring." },
  {
    when: "Graduation",
    text: "Loring is not simply another employer she discovers at a career fair. It is a company that has been part of her story for years.",
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
              Recruiting usually begins late.
            </h2>
          </div>
          <Lines
            items={[
              "By university graduation, the competition for exceptional engineering talent is already underway.",
              "Students are comparing employers.",
              "Companies are competing for attention.",
              "Recruiters are meeting many of the same candidates at the same career fairs.",
              <strong key="d" className="text-ink">Hack876 creates a different kind of opportunity.</strong>,
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

        <p className="lp-sub mt-12 max-w-[26ch] text-emerald-deep">
          That is the kind of return that does not fit neatly into a sponsorship spreadsheet.
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  08 — School relationships                                                 */
/* -------------------------------------------------------------------------- */

const BRIDGE = ["Secondary school", "University", "Internship", "Early career", "Leadership"];

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
                "Our inaugural network begins with eight schools where we already have relationships.",
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
                "Those relationships make the first staging operationally possible, but Hack876 participation is not intended to be permanently confined to those institutions.",
                "The broader ambition is to create an opportunity that talented students can access regardless of which Jamaican secondary school they attend.",
                "For Loring, participating in Hack876 means becoming visible not simply as an engineering consultancy, but as an organization actively investing in Jamaica’s engineering pipeline.",
              ]}
            />
          </div>
        </div>

        {/* The bridge */}
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
                  {i === 0 && (
                    <span className="mt-1 block text-xs font-extrabold tracking-[0.14em] text-emerald-deep uppercase">Hack876</span>
                  )}
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
/*  09 — Why Kingston first                                                   */
/* -------------------------------------------------------------------------- */

const STAIRS = [
  "Build a version we can execute exceptionally well.",
  "Test it.",
  "Learn from it.",
  "Make it repeatable.",
  "Then expand the infrastructure around it.",
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
                "Students traveling from farther away would need to make those arrangements independently.",
                "We want to be transparent about that rather than overpromise support we do not yet have the resources to provide.",
              ]}
            />
          </div>

          <div>
            <p className="lp-prose">
              Expanding our organized reach immediately across Jamaica would introduce significantly more:
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {[
                "transportation coordination",
                "accommodation considerations",
                "student supervision",
                "safeguarding requirements",
                "school coordination",
                "logistics",
                "cost",
              ].map((t) => (
                <li key={t} className="rounded-lg border lp-rule bg-paper px-3 py-2 text-sm font-semibold first-letter:uppercase">
                  {t}
                </li>
              ))}
            </ul>
            <p className="lp-prose mt-4">before we have run the model once.</p>
            <p className="lp-prose mt-8 font-semibold text-ink">
              So we are approaching Hack876 the same way an engineering team approaches a new system:
            </p>

            {/* A literal staircase */}
            <ol className="lp-keep mt-6 space-y-2">
              {STAIRS.map((s, i) => (
                <li
                  key={s}
                  className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 font-extrabold tracking-tight ${
                    i === STAIRS.length - 1 ? "border-ink bg-emerald text-white" : "border-ink/80 bg-paper"
                  }`}
                  style={{ marginLeft: `${i * 6}%` }}
                >
                  <span className={`text-xs tabular-nums ${i === STAIRS.length - 1 ? "text-white/80" : "text-ink-soft"}`}>
                    0{i + 1}
                  </span>
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
/*  10 — National vision                                                      */
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
              "From the beginning, Hack876 is intended to be an opportunity for Jamaican students, not simply students from a specific list of schools.",
              "The eight schools in our inaugural network are where our strongest operating relationships exist today.",
              <strong key="s" className="text-ink">They are a starting infrastructure, not an exclusionary boundary.</strong>,
              "We want to reach the point where geography does not create a practical barrier to participation.",
            ]}
          />
        </div>

        <figure className="lp-keep mt-12 print:mx-auto print:mt-2 print:w-[34%]">
          <JamaicaMap className="w-full" />
        </figure>

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16 print:mt-6 print:grid-cols-2 print:gap-8">
          <ul className="space-y-1.5 text-lg font-semibold print:grid print:grid-cols-2 print:gap-x-6 print:space-y-0">
            {["Montego Bay", "Mandeville", "Ocho Rios", "Port Antonio", "St. Elizabeth"].map((p) => (
              <li key={p}>A student in {p}.</li>
            ))}
            <li className="pt-1 text-emerald-deep">A student anywhere on the island who wants to build.</li>
          </ul>
          <Lines
            items={[
              "Today, an ambitious student outside Kingston may technically be able to participate but still face the real burden of arranging transportation, accommodation or both.",
              "In the future, we want Hack876 to have the partnerships and resources to remove more of those barriers.",
            ]}
          />
        </div>

        <div className="lp-keep mt-12 rounded-2xl border border-dashed border-ink/40 p-6 sm:p-8 print:mt-6">
          <p className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">
            That could eventually mean · future possibilities, not 2027 commitments
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {[
              "Transportation support",
              "Travel stipends",
              "Accommodation partnerships",
              "Regional qualifying events",
              "Additional event locations",
              "School-supported travel",
              "Sponsor-supported access programs",
            ].map((t) => (
              <li key={t} className="rounded-full border lp-rule bg-paper px-3.5 py-1.5 text-sm font-semibold">
                {t}
              </li>
            ))}
          </ul>
        </div>

        <p className="lp-prose mt-10">
          The long-term opportunity is a national platform connecting Jamaica&rsquo;s most ambitious young problem solvers
          with one another, with universities and with companies capable of helping them turn talent into careers.
        </p>

        <div className="lp-keep mt-14 print:mt-8">
          <p className="lp-statement max-w-[22ch]">We cannot support every logistical need on day one.</p>
          <p className="lp-sub mt-3 text-emerald-deep">But access across Jamaica is what we are building toward.</p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  11 — More than money                                                      */
/* -------------------------------------------------------------------------- */

const ROLES = [
  { title: "Mentors", text: "Helping teams think through technical problems." },
  { title: "Judges", text: "Evaluating creativity, execution and engineering thinking." },
  { title: "Speakers", text: "Showing students where engineering can take them." },
  { title: "Challenge partners", text: "Introducing a real-world engineering problem for students to explore." },
  { title: "Long-term connectors", text: "Continuing relationships with students and participating schools where appropriate." },
];

function MoreThanMoney() {
  return (
    <section aria-labelledby="lp-more" className="lp-section lp-dense bg-paper">
      <div className="lp-wrap">
        <Kicker n="10">More than money</Kicker>
        <h2 id="lp-more" className="lp-h2 mt-6 max-w-[20ch]">
          What Loring brings cannot be measured only in dollars.
        </h2>
        <Lines className="mt-8" items={["Funding makes Hack876 possible.", "But Loring can contribute something equally valuable:"]} />

        <p className="lp-marker lp-keep mt-10 text-[clamp(3rem,9vw,7rem)] text-emerald-deep print:mt-6">Engineers in the room.</p>

        <ul className="mt-10 grid gap-x-10 gap-y-3 text-lg font-semibold text-ink-2 md:grid-cols-2 print:mt-6 print:grid-cols-2">
          {[
            "People who understand how ideas become systems.",
            "People who have solved problems where the constraints are real.",
            "People who can ask better questions.",
            "People who can show a 17-year-old what an engineering career actually looks like.",
          ].map((t) => (
            <li key={t} className="border-l-2 border-emerald pl-4">
              {t}
            </li>
          ))}
        </ul>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5 print:mt-8 print:grid-cols-5">
          {ROLES.map((r, i) => (
            <li key={r.title} className="rounded-2xl border lp-rule bg-cream p-5">
              <p className="lp-num text-3xl text-emerald-deep">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="lp-h3 mt-3">{r.title}</h3>
              <p className="mt-2 text-[0.98rem] leading-relaxed text-ink-2">{r.text}</p>
            </li>
          ))}
        </ul>

        {LORING_JUDGE && (
          <figure className="lp-keep mt-12 flex flex-col gap-6 rounded-3xl border-2 border-ink bg-mint/70 p-6 shadow-[5px_6px_0_0_var(--color-ink)] sm:flex-row sm:items-center sm:p-8 print:mt-6 print:flex-row print:items-center print:p-5">
            {LORING_JUDGE.photo && (
              <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl border-2 border-ink sm:h-32 sm:w-32 print:h-24 print:w-24">
                <Image src={LORING_JUDGE.photo} alt={`Portrait of ${LORING_JUDGE.name}`} fill sizes="128px" className="object-cover" />
              </div>
            )}
            <figcaption>
              <p className="text-xs font-extrabold tracking-[0.16em] text-emerald-deep uppercase">Already in the room</p>
              <p className="mt-2 text-[clamp(1.3rem,2.4vw,1.8rem)] leading-snug font-extrabold tracking-tight">
                {LORING_JUDGE.name} of Loring Consulting Engineers is already a Hack876 judge.
              </p>
              <p className="mt-2 text-lg text-ink-2">
                A long-standing friend of the Hack876 organizers, he is already part of the first cohort of people
                willing to believe in it before the proof exists.
              </p>
            </figcaption>
          </figure>
        )}

        <div className="lp-keep mt-16 print:mt-8">
          <p className="lp-statement max-w-[22ch]">We do not simply want Loring&rsquo;s logo in the room.</p>
          <p className="lp-sub mt-3 text-emerald-deep">We want Loring&rsquo;s engineers in the room.</p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  12 — Gold Partner                                                         */
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
              <p className="lp-accent mt-2 text-lg font-bold text-sun">Gold Partner · Inaugural Hack876</p>
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
/*  13 — Gold Partner benefits                                                */
/* -------------------------------------------------------------------------- */

const BENEFITS = [
  "Prominent Gold Partner recognition across Hack876 event materials and digital experiences",
  "Recognition during opening and closing programming",
  "Opportunity for Loring leadership to address students",
  "Participation of Loring engineers as judges, mentors and speakers",
  "Dedicated Loring presence within the event",
  "Recognition in relevant school and participant communications",
  "Inclusion in Hack876 photography, recap content and post-event storytelling",
  "Opportunity to collaborate on an engineering-focused challenge or special award",
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
          <p className="lp-sub max-w-[36ch]">
            <span className="text-sun">Most importantly:</span> direct participation in the
            experience of approximately {STUDENTS} young Jamaicans at the moment they are deciding what they might become.
          </p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  14–15 — Alternatives                                                      */
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
        <p className="lp-prose mt-6">
          There are still meaningful ways for Loring to help make the inaugural Hack876 possible.
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.25fr_1fr] print:mt-8 print:grid-cols-[1.25fr_1fr]">
          {/* Prize Partner */}
          <article aria-labelledby="lp-prize" className="lp-keep rounded-2xl border lp-rule bg-paper p-6 sm:p-8">
            <h3 id="lp-prize" className="text-2xl font-extrabold tracking-tight">
              Official Prize Partner
            </h3>
            <p className="lp-num mt-4 text-[clamp(2.2rem,5vw,3.2rem)]">
              <span className="text-lg font-bold tracking-normal text-ink-soft">Approximately </span>US$3,500
            </p>
            <p className="mt-4 leading-relaxed text-ink-2">Fund the primary awards presented to Hack876&rsquo;s winning teams.</p>

            <p className="mt-6 text-xs font-extrabold tracking-[0.14em] text-ink-soft uppercase">
              Illustrative prize package for four-student teams
            </p>
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
              <p className="font-semibold text-ink-2">Loring Consulting Engineers</p>
            </div>
            <p className="lp-note mt-5">
              The final prize configuration may be adjusted based on participating team structure, product pricing and
              availability.
            </p>
          </article>

          {/* Food & Hospitality */}
          <article aria-labelledby="lp-food" className="lp-keep rounded-2xl border lp-rule bg-paper p-6 sm:p-8">
            <h3 id="lp-food" className="text-2xl font-extrabold tracking-tight">
              Food &amp; Hospitality Partner
            </h3>
            <p className="lp-num mt-4 text-[clamp(2.2rem,5vw,3.2rem)]">US$1,000</p>
            <p className="mt-1 font-bold text-ink-soft">Approximately J$150,000</p>
            <div className="mt-4 space-y-3 leading-relaxed text-ink-2">
              <p>A long build day needs fuel.</p>
              <p>
                This partnership helps provide meals, small eats, refreshments and a welcoming event environment for Hack876
                students, volunteers and guests.
              </p>
            </div>
            <p className="mt-6 text-xs font-extrabold tracking-[0.14em] text-ink-soft uppercase">Funding may support</p>
            <ul className="mt-3 space-y-1.5">
              {["Student meals", "Snacks and small eats", "Water and refreshments", "Serving supplies", "Light event décor and hospitality details"].map(
                (t) => (
                  <li key={t} className="flex items-center gap-2.5 font-semibold">
                    <Check className="text-emerald-deep" />
                    {t}
                  </li>
                ),
              )}
            </ul>
            <div className="mt-6 border-l-4 border-emerald pl-4">
              <p className="text-xs font-extrabold tracking-[0.14em] text-ink-soft uppercase">Recognition</p>
              <p className="mt-1 font-extrabold">Hack876 Food &amp; Hospitality Partner</p>
              <p className="font-semibold text-ink-2">Loring Consulting Engineers</p>
            </div>
            <p className="mt-6 font-semibold text-ink">
              A smaller commitment with an immediate, visible impact on everyone in the room.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  16 — Summary                                                              */
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
              <p className="mt-2 text-sm font-bold tracking-[0.12em] text-cream/70 uppercase">
                Founding Partner · Inaugural Hack876
              </p>
            </div>
            <p className="mt-10 max-w-md text-lg leading-relaxed text-cream/90">
              Flexible support for the inaugural Hack876 and overall student experience.
            </p>
          </div>

          <div className="grid gap-5 lg:col-span-2 print:col-span-2">
            {[
              { name: "Official Prize Partner", amount: "~US$3,500", text: "Fund the primary competition awards." },
              {
                name: "Food & Hospitality Partner",
                amount: "US$1,000",
                text: "Help feed students and support the hospitality experience throughout the day.",
              },
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
          <p className="lp-sub mt-4 max-w-[30ch]">We would love to build the inaugural Hack876 with Loring as a Gold Partner.</p>
          <p className="lp-h3 mt-6 text-[clamp(1.25rem,2vw,1.6rem)] text-emerald-deep">But the larger goal is beginning the relationship.</p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  17 — Year one success                                                     */
/* -------------------------------------------------------------------------- */

const SUCCESS = [
  `Approximately ${STUDENTS} students.`,
  "Eight core school relationships.",
  "A room full of ambitious young people.",
  "Working prototypes where there were only ideas that morning.",
  "Students meeting engineers they did not know twelve hours earlier.",
  "Teachers returning to their schools with new possibilities.",
  "Companies discovering talent earlier.",
  "Students leaving with a clearer picture of what they are capable of building.",
  "And enough evidence to make the next Hack876 bigger and more accessible.",
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
              For the first Hack876, success means doing something smaller exceptionally well while leaving the door open to
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
/*  18 — The first one matters                                                */
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
            "Every program that eventually becomes important has a first cohort.",
            "A first room.",
            "A first group of students.",
            "A first group of people willing to believe in it before the proof exists.",
            "Hack876 will start small.",
            <strong key="a" className="text-ink">But our ambition is not small.</strong>,
          ]}
        />
        <ul className="lp-prose mt-6 space-y-2 border-l-2 border-emerald pl-5">
          <li>We want more Jamaican students to see themselves as engineers, technologists, designers, founders and builders.</li>
          <li>We want them solving Jamaican problems.</li>
          <li>We want them building alongside students they would otherwise never meet.</li>
          <li>We want the relationships created at Hack876 to continue into university, internships and careers.</li>
          <li>
            And eventually, we want geography and travel resources to stop determining which Jamaican students can
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
/*  19 — Closing                                                              */
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
            <p className="mt-6 text-lg font-bold">Kingston, Jamaica · {event.year}</p>
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
