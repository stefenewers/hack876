import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { BirdMark, DoctorBird } from "@/components/art/DoctorBird";
import { Icon } from "@/components/art/Icons";
import { TailLine } from "@/components/art/Marks";
import { Logo } from "@/components/art/Wordmark";
import { DownloadDeck } from "@/components/proposal/DownloadDeck";
import { Bridge, Compounding, FuturePaths, Seedling } from "@/components/proposal/Illustrations";
import { Check, Kicker, Lines, Ref } from "@/components/proposal/primitives";
import { eligibility, event, eventWhen, prizes, schools, stats } from "@/data/event";
import "@/components/proposal/proposal.css";

/*
 * Private partnership proposal for Scotia Investments Jamaica Limited.
 * Same system as /loringopportunity and /gracekennedyopportunity. Not linked
 * from the public site; noindex/nofollow here and via X-Robots-Tag in next.config.ts.
 */

const SPONSOR = "Scotia Investments Jamaica Limited";
const SHORT = "Scotia Investments";
const DECK_LABEL = `Hack876 × ${SPONSOR}`;
/* Partner accent, used sparingly. */
const SCOTIA_RED = "#ec111a";

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
/* Approximate procurement costs for the podium rewards (not stored on the public site). */
const PODIUM_COST: Record<number, string> = { 1: "Approximately US$1,800", 2: "Approximately US$1,000", 3: "US$600" };

/* First-party Scotia sources for every Scotia claim on this page. */
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

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

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
          <WhyScotia />
          <AlreadyInvests />
        </div>
        <div className="lp-page">
          <PotentialCompounds />
        </div>
        <div className="lp-page">
          <SchoolNetwork />
          <BridgeSection />
        </div>
        <div className="lp-page">
          <MoreThanMoney />
        </div>
        <div className="lp-page">
          <GoldPartner />
          <GoldBenefits />
        </div>
        <div className="lp-page">
          <PrizeAndFood />
          <SpecialAwards />
        </div>
        <div className="lp-page">
          <Summary />
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
            <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: SCOTIA_RED }} />
            Private partnership proposal
          </p>
        </div>

        <h1 id="lp-hero-title" className="lp-h1 mt-10 max-w-[17ch] sm:mt-14">
          The best investments are often made{" "}
          <span className="relative inline-block text-emerald-deep">
            before the potential is obvious.
            <TailLine draw={false} className="absolute -bottom-2 left-0 h-4 w-full" />
          </span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-2 sm:text-xl">
          Hack876 is inviting {SHORT} to back Jamaica&rsquo;s next generation of builders, founders and problem solvers
          before the world knows their names.
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
        <h2 id="lp-idea" className="lp-statement mt-6 max-w-[20ch]" data-reveal>
          Somewhere among the students who walk into Hack876 is a future founder.
        </h2>
        <div className="mt-12 grid gap-10 md:grid-cols-[1fr_1.3fr] md:items-center print:mt-4 print:grid-cols-[0.8fr_1.3fr] print:items-center">
          <div aria-hidden className="hidden md:block print:block">
            <FuturePaths
              paths={[
                { icon: "board", label: "Engineering" },
                { icon: "chart", label: "Capital" },
                { icon: "wildcard", label: "Unnoticed problems" },
                { icon: "phone", label: "Products" },
                { icon: "business", label: "A company" },
              ]}
              className="mx-auto w-full max-w-md print:max-w-[3.1in]"
            />
          </div>
          <div data-reveal>
            <Lines
              items={[
                "Another may become an engineer.",
                "Another may manage capital.",
                "Another may design products used by millions.",
                "Another may build a company that employs hundreds of Jamaicans.",
                "Another may solve a problem none of us has noticed yet.",
                "Most institutions will first meet them later: at university, at a career fair, when a résumé arrives, or after somebody else has already recognized their potential.",
              ]}
            />
            <p className="lp-sub mt-6 text-emerald-deep">Hack876 creates an opportunity to meet them sooner.</p>
          </div>
        </div>
        <p className="lp-marker lp-keep mt-12 text-[clamp(2.4rem,6vw,4.6rem)] print:mt-6">Potential compounds too.</p>
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
                  In this inaugural year, students outside our immediate network may need to make their own transportation and
                  accommodation arrangements.
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
  { label: "A financial tool", icon: "business" },
  { label: "Hardware", icon: "board", physical: true },
  { label: "A robot", icon: "gear", physical: true },
  { label: "A physical prototype", icon: "hand", physical: true },
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
              "Innovation is broader than fintech, and Hack876 is broader than coding.",
              "It is an open build competition. Teams choose the problem and the medium.",
              "No team will be steered toward a finance challenge because of who sponsors the day.",
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
          </div>
        </div>

        <div className="lp-keep mt-14 print:mt-8">
          <p className="lp-statement">The medium does not matter.</p>
          <p className="lp-sub mt-2 text-emerald-deep">The problem-solving mindset does.</p>
        </div>

        <figure className="lp-keep mt-12 print:mt-6">
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
        </figure>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  04 Why Scotia Investments                                                 */
/* -------------------------------------------------------------------------- */

function WhyScotia() {
  return (
    <section aria-labelledby="lp-why" className="lp-section lp-dense">
      <div className="lp-wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 print:grid-cols-[0.7fr_1.3fr]">
        <div>
          <Kicker n="04">Why Scotia Investments</Kicker>
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
    ref: 7,
  },
  {
    kicker: "YouthRISE · announced 2024",
    title: "Nearly 800 young people in Jamaica and Mexico.",
    text: "A three-year project with SOS Children’s Villages Canada, with J$106 million from Scotiabank, providing digital skills, entrepreneurship training, career coaching, mentorship and internship opportunities.",
    ref: 8,
  },
  {
    kicker: "2025",
    title: "Financial literacy with Jamaican youth.",
    text: "Scotia Group reports financial literacy sessions for young people in Kingston and Montego Bay, delivered with SOS Children’s Villages, covering budgeting, saving and investing.",
    ref: 2,
  },
];

function AlreadyInvests() {
  return (
    <section aria-labelledby="lp-already" className="lp-section lp-dark lp-grid-bg relative overflow-hidden">
      <div className="lp-wrap">
        <Kicker n="05">Already in motion</Kicker>
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
/*  06 Potential compounds                                                    */
/* -------------------------------------------------------------------------- */

const CHAIN = [
  "Curiosity",
  "Access",
  "A first build",
  "Confidence",
  "University or training",
  "A career or a company",
  "Economic contribution",
  "Someone else gets an opportunity",
];

function PotentialCompounds() {
  return (
    <section aria-labelledby="lp-compound" className="lp-section">
      <div className="lp-wrap">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 print:grid-cols-[0.7fr_1.3fr] print:gap-10">
          <div>
            <Kicker n="06">Potential compounds</Kicker>
            <h2 id="lp-compound" className="lp-h2 mt-6">
              The earliest investment is access.
            </h2>
          </div>
          <Lines
            items={[
              "Talent is everywhere. Access to the room where talent gets noticed is not.",
              "Hack876 puts ambitious students in that room earlier: with real problems, real tools and people who take their ideas seriously.",
              <strong key="s" className="text-ink">What happens next can travel a long way.</strong>,
            ]}
          />
        </div>

        {/* The chain, rising like a compounding curve */}
        <figure className="lp-keep mt-14 print:mt-8">
          <figcaption className="sr-only">A progression: {CHAIN.join(", then ")}.</figcaption>
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-8 lg:items-end print:grid-cols-8 print:items-end">
            {CHAIN.map((c, i) => (
              <li key={c} className="relative">
                <div
                  className={`flex h-full flex-col justify-end rounded-2xl border-2 p-4 ${
                    i === CHAIN.length - 1 ? "border-ink bg-emerald text-white" : i === 1 ? "border-ink bg-sun" : "border-ink/70 bg-paper"
                  }`}
                  style={{ minHeight: `${4.5 + i * 1.1}rem` }}
                >
                  <span className={`text-xs font-extrabold tabular-nums ${i === CHAIN.length - 1 ? "text-white/80" : "text-ink-soft"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-1 leading-tight font-extrabold">{c}</span>
                </div>
              </li>
            ))}
          </ol>
          <TailLine draw={false} className="mt-4 hidden h-6 w-full lg:block print:block" />
        </figure>

        <p className="lp-sub mt-10 max-w-[34ch] text-emerald-deep">The return does not have to show up this quarter to matter.</p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  07 School network                                                         */
/* -------------------------------------------------------------------------- */

function SchoolNetwork() {
  return (
    <section aria-labelledby="lp-schools" className="lp-section lp-dense bg-paper">
      <div className="lp-wrap">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 print:grid-cols-[0.7fr_1.3fr] print:gap-10">
          <div>
            <Kicker n="07">The school network</Kicker>
            <h2 id="lp-schools" className="lp-h2 mt-6">
              {PARTNER_SCHOOLS} schools. One room.
            </h2>
          </div>
          <div>
            <Lines
              items={[
                "Hack876 begins with the schools where we already have relationships and can coordinate most reliably. Formal confirmations are still in progress for most of them, and the network is not an exclusive eligibility list.",
              ]}
            />
            <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2 print:grid-cols-2">
              {schools.map((s) => (
                <li
                  key={s}
                  className={`rounded-xl border px-4 py-2.5 font-semibold ${s === "Jamaica College" ? "border-2 border-ink bg-sun-light" : "lp-rule bg-cream"}`}
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="lp-keep mt-10 max-w-3xl border-l-4 border-emerald pl-5 print:mt-6">
          <p className="lp-prose">
            <strong className="text-ink">Jamaica College</strong> matters to this conversation for a simple reason: a
            relationship already connects Scotia Investments, Jamaica College and Hack876. JC does not own or host Hack876,
            and Hack876 remains a multi-school event. But it is why this introduction feels natural.
          </p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  08 A bridge already exists                                                */
/* -------------------------------------------------------------------------- */

function BridgeSection() {
  return (
    <section aria-labelledby="lp-bridge" className="lp-section lp-dense lp-grid-bg border-t lp-rule">
      <div className="lp-wrap">
        <Kicker n="08">A bridge already exists</Kicker>
        <h2 id="lp-bridge" className="lp-h2 mt-6 max-w-[22ch]">
          Partnerships work better when someone carries the context.
        </h2>

        <Bridge labels={[SHORT, "Jamaica College", "Hack876"]} className="mx-auto mt-10 w-full max-w-3xl print:mt-4 print:max-w-[6in]" />

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16 print:mt-6 print:grid-cols-2 print:gap-8">
          <Lines
            items={[
              "Hack876 is not looking for a cheque and a logo followed by silence. We want a relationship Scotia understands internally and Hack876 can execute well externally.",
              <span key="p">
                <strong className="text-ink">Padrique Duncan</strong> is the person making this introduction possible.
              </span>,
              "If Padrique is open to it, we would love for him to help steward the relationship on Scotia’s side: carrying context in both directions, helping identify the right people to involve, and helping us build something useful over time.",
            ]}
          />
          <div className="lp-keep rounded-2xl border-2 border-ink bg-paper p-6 shadow-[4px_5px_0_0_var(--color-emerald)]">
            <p className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">What stewardship could look like</p>
            <ul className="mt-4 space-y-2.5">
              {[
                "Carrying feedback between both sides",
                "Helping coordinate internal Scotia conversations",
                "Helping identify Scotia judges, mentors or speakers",
                "Keeping the relationship focused and useful",
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
/*  09 More than money                                                        */
/* -------------------------------------------------------------------------- */

const ROLES = [
  { title: "Judges", text: "Evaluating problem selection, execution and communication." },
  { title: "Mentors", text: "Business-model, finance and product thinking for teams that want it." },
  { title: "Speakers", text: "Showing students the range of careers inside a modern financial institution." },
  { title: "Founder sounding board", text: "Helping students pressure-test an idea like a first-time founder." },
  { title: "Careers conversation", text: "Honest, informal conversations about paths into finance and business." },
  { title: "Financial-literacy touchpoint", text: "An optional, general-education session if it fits the programme." },
];

function MoreThanMoney() {
  return (
    <section aria-labelledby="lp-more" className="lp-section lp-dense bg-paper">
      <div className="lp-wrap">
        <Kicker n="09">More than money</Kicker>
        <h2 id="lp-more" className="lp-h2 mt-6 max-w-[24ch]">
          The most valuable thing Scotia can bring is not necessarily the cheque.
        </h2>
        <p className="lp-marker lp-keep mt-8 text-[clamp(3rem,9vw,6.5rem)] text-emerald-deep print:mt-5">People in the room.</p>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 print:mt-6 print:grid-cols-3">
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
              "No selling of investment products to students.",
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
/*  10 Gold Partner                                                           */
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
        <Kicker n="10">Our invitation</Kicker>
        <h2 id="lp-gold" className="lp-h2 mt-6 max-w-[18ch]">
          Become a Gold Partner of the inaugural Hack876.
        </h2>

        <div className="lp-keep mt-10 border-y lp-rule py-8 print:mt-6 print:py-5">
          <p className="lp-num lp-accent text-[clamp(3.6rem,12vw,9.5rem)] text-sun">J$1,000,000</p>
          <p className="mt-4 text-lg font-bold tracking-[0.14em] uppercase sm:text-xl">Founding Partner · Inaugural Hack876</p>
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
            <p className="lp-accent mt-2 text-lg font-bold text-sun">Gold Partner · Inaugural Hack876</p>
          </figure>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  11 Benefits                                                               */
/* -------------------------------------------------------------------------- */

const BENEFITS = [
  "Founding-year association with the first Hack876",
  "Meaningful participation for Scotia professionals as judges, mentors and speakers",
  "Proximity to emerging Jamaican talent before it is widely visible",
  "Relationships with the schools in the Hack876 network",
  "A youth-development story Scotia can tell with substance",
  "Photo and video storytelling from the event",
  "Visibility across event materials, appropriate to the level selected",
  "Invitation to the finals and awards",
  "A post-event recap, and the option to explore a longer relationship after year one",
];

function GoldBenefits() {
  return (
    <section aria-labelledby="lp-benefits" className="lp-section">
      <div className="lp-wrap">
        <Kicker n="11">What partnership looks like</Kicker>
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
        <p className="lp-note mt-6">
          We will not promise media reach, impressions, press coverage or data we cannot substantiate. Everything above is
          deliverable by the Hack876 team.
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  12 Prize and hospitality                                                  */
/* -------------------------------------------------------------------------- */

function PrizeAndFood() {
  return (
    <section aria-labelledby="lp-alt" className="lp-section bg-cream-2">
      <div className="lp-wrap">
        <Kicker n="12">Other ways to participate</Kicker>
        <h2 id="lp-alt" className="lp-h2 mt-6 max-w-[22ch]">
          The size of the commitment can change.
        </h2>
        <p className="lp-sub mt-3 text-emerald-deep">The invitation to be part of the first Hack876 does not.</p>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.25fr_1fr] print:mt-6 print:grid-cols-[1.25fr_1fr]">
          <article aria-labelledby="lp-prize" className="lp-keep rounded-2xl border lp-rule bg-paper p-6 sm:p-8">
            <h3 id="lp-prize" className="text-2xl font-extrabold tracking-tight">
              Official Prize Partner
            </h3>
            <p className="lp-num mt-4 text-[clamp(2.2rem,5vw,3.2rem)]">
              <span className="text-lg font-bold tracking-normal text-ink-soft">Approximately </span>US$3,500
            </p>
            <p className="mt-3 leading-relaxed text-ink-2">Fund the primary awards presented to Hack876&rsquo;s winning teams.</p>
            <dl className="mt-5 divide-y lp-rule border-y lp-rule">
              {PODIUM.map((p) => (
                <div key={p.name} className="grid grid-cols-[8.5rem_1fr_auto] items-baseline gap-3 py-3 max-sm:grid-cols-[7rem_1fr]">
                  <dt className="font-extrabold">{p.name}</dt>
                  <dd className="font-semibold">{p.reward}</dd>
                  <dd className="text-sm text-ink-soft max-sm:col-start-2">{PODIUM_COST[p.place!]}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 border-l-4 border-emerald pl-4">
              <p className="text-xs font-extrabold tracking-[0.14em] text-ink-soft uppercase">Recognition</p>
              <p className="mt-1 font-extrabold">Hack876 Official Prize Partner · {SHORT}</p>
            </div>
            <p className="lp-note mt-4">
              Costs are approximate. The final prize configuration may change with team structure, pricing and availability.
            </p>
          </article>

          <article aria-labelledby="lp-food" className="lp-keep rounded-2xl border lp-rule bg-paper p-6 sm:p-8">
            <h3 id="lp-food" className="text-2xl font-extrabold tracking-tight">
              Food &amp; Hospitality Partner
            </h3>
            <p className="lp-num mt-4 text-[clamp(2.2rem,5vw,3.2rem)]">US$1,000</p>
            <p className="mt-1 font-bold text-ink-soft">Approximately J$150,000</p>
            <p className="mt-4 leading-relaxed text-ink-2">
              A long build day needs fuel. This helps keep approximately {STUDENTS} students, plus staff, volunteers, judges and
              guests, fed and comfortable.
            </p>
            <ul className="mt-4 space-y-1.5">
              {["Student meals", "Small eats and snacks", "Water and refreshments", "Light hospitality details"].map((t) => (
                <li key={t} className="flex items-center gap-2.5 font-semibold">
                  <Check className="text-emerald-deep" />
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-5 border-l-4 border-emerald pl-4">
              <p className="text-xs font-extrabold tracking-[0.14em] text-ink-soft uppercase">Recognition</p>
              <p className="mt-1 font-extrabold">Hack876 Food &amp; Hospitality Partner · {SHORT}</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  13 Special awards                                                         */
/* -------------------------------------------------------------------------- */

const AWARD_ICON: Record<string, string> = { pen: "pen", rocket: "rocket", heart: "heart" };
const AWARD_BG: Record<string, string> = { pink: "bg-pink", bill: "bg-bill text-white", aqua: "bg-aqua" };

function SpecialAwards() {
  return (
    <section aria-labelledby="lp-awards" className="lp-section">
      <div className="lp-wrap">
        <Kicker n="13">Special awards</Kicker>
        <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:items-end print:grid-cols-2 print:items-end">
          <div>
            <h2 id="lp-awards" className="lp-h2">
              Special Awards Partner
            </h2>
            <p className="lp-num mt-4 text-[clamp(2.6rem,6vw,4rem)]">US${SPECIAL_TOTAL.toLocaleString("en-US")}</p>
            <p className="lp-prose mt-3">Fund all {SPECIAL_AWARDS.length} Hack876 special awards.</p>
            <p className="mt-3 font-extrabold">Recognition: Hack876 Special Awards presented by {SHORT}</p>
          </div>
          <div className="lp-keep rounded-2xl border-2 border-ink bg-sun-light p-6">
            <p className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">Or, an Individual Special Award</p>
            <p className="lp-num mt-3 text-4xl">US$200</p>
            <p className="mt-3 leading-relaxed text-ink-2">
              Support just one award, recognized as, for example, <strong className="text-ink">Best Design presented by {SHORT}</strong>. A
              meaningful way in, with your name on a moment students will remember.
            </p>
          </div>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-3 print:mt-6 print:grid-cols-3">
          {SPECIAL_AWARDS.map((p, i) => (
            <li
              key={p.name}
              className={`sticker flex items-center gap-4 p-5 ${AWARD_BG[p.color] ?? "bg-paper"}`}
              style={{ rotate: `${[1.5, -1, 1][i % 3]}deg` }}
            >
              <Icon name={AWARD_ICON[p.icon] ?? p.icon} className="h-14 w-14 shrink-0" />
              <div>
                <h3 className="text-xl font-extrabold">{p.name}</h3>
                <p className="mt-1 text-sm font-semibold opacity-90">{p.reward}</p>
                {p.valueUsd && <p className="mt-1 text-sm font-extrabold">US${p.valueUsd}</p>}
              </div>
            </li>
          ))}
        </ul>
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
    { name: "Food & Hospitality Partner", amount: "US$1,000", text: "Meals and refreshments for the day." },
    { name: "Special Awards Partner", amount: `US$${SPECIAL_TOTAL.toLocaleString("en-US")}`, text: `All ${SPECIAL_AWARDS.length} special awards.` },
    { name: "Individual Special Award", amount: "US$200", text: "One award, presented by Scotia." },
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
              <p className="text-sm font-extrabold tracking-[0.18em] text-sun uppercase">Gold Partner</p>
              <p className="lp-num mt-5 text-[clamp(2.8rem,6vw,4.6rem)] text-sun">J$1,000,000</p>
              <p className="mt-2 text-sm font-bold tracking-[0.12em] text-cream/70 uppercase">Founding Partner · Inaugural Hack876</p>
            </div>
            <p className="mt-8 text-lg leading-relaxed text-cream/90">Flexible support for the inaugural Hack876 and the student experience.</p>
          </div>
          <ul className="grid gap-3 lg:col-span-3 print:col-span-3">
            {options.map((o) => (
              <li key={o.name} className="lp-keep flex flex-wrap items-center justify-between gap-x-6 gap-y-1 rounded-2xl border lp-rule bg-paper px-5 py-4">
                <div>
                  <p className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">{o.name}</p>
                  <p className="mt-1 text-ink-2">{o.text}</p>
                </div>
                <p className="lp-num text-3xl">{o.amount}</p>
              </li>
            ))}
          </ul>
        </div>

        <p className="lp-prose mt-8">
          Independently of any sponsorship, Scotia professionals are welcome as judges, mentors or speakers, subject to
          Hack876&rsquo;s final programming.
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  15 Year one                                                               */
/* -------------------------------------------------------------------------- */

function YearOne() {
  return (
    <section aria-labelledby="lp-year1" className="lp-section bg-paper">
      <div className="lp-wrap grid items-center gap-12 lg:grid-cols-[1.35fr_0.65fr] print:grid-cols-[1.4fr_0.6fr] print:gap-10">
        <div>
          <Kicker n="15">Year one</Kicker>
          <h2 id="lp-year1" className="lp-h2 mt-6">
            Deliberately focused.
          </h2>
          <Lines
            className="mt-8"
            items={[
              "Our vision is national. This inaugural staging does not have national-event resources, and we will not pretend it does.",
              `Approximately ${STUDENTS} students. A school network of ${PARTNER_SCHOOLS} in Kingston. One day, done properly.`,
            ]}
          />
          <ul className="mt-8 space-y-1">
            {["Build the first one well.", "Learn from it.", "Earn the right to make the second one bigger."].map((t, i) => (
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

/* -------------------------------------------------------------------------- */
/*  16 The longer view                                                        */
/* -------------------------------------------------------------------------- */

function LongerView() {
  return (
    <section aria-labelledby="lp-longer" className="lp-section lp-dense">
      <div className="lp-wrap">
        <Kicker n="16">The longer view</Kicker>
        <h2 id="lp-longer" className="lp-h2 mt-6 max-w-[22ch]">
          No multi-year commitment required.
        </h2>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] print:mt-6 print:grid-cols-[0.8fr_1.2fr]">
          <div className="lp-keep rounded-2xl border-2 border-ink bg-sun-light p-6">
            <p className="lp-num text-5xl">{event.year}</p>
            <p className="mt-3 text-xl font-extrabold">Support the first Hack876.</p>
            <p className="mt-2 text-ink-2">That is the whole ask.</p>
          </div>
          <div className="lp-keep rounded-2xl border border-dashed border-ink/40 p-6">
            <p className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">
              Future possibilities, only if both sides find it valuable. Not commitments.
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {[
                "Recurring event partnership",
                "Scotia colleagues returning as mentors and judges",
                "Deeper entrepreneurship or financial-literacy programming",
                "Support for students from outside Kingston",
                "Career exposure once participants reach an appropriate age",
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
