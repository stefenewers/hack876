import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { BirdMark, DoctorBird } from "@/components/art/DoctorBird";
import { Icon } from "@/components/art/Icons";
import { TailLine } from "@/components/art/Marks";
import { Logo } from "@/components/art/Wordmark";
import { DownloadDeck } from "@/components/proposal/DownloadDeck";
import { Blueprint, Bridge, Compounding, FuturePaths, IdeaToRealWorld, MentorRoom, Seedling, Shelter } from "@/components/proposal/Illustrations";
import { Check, Kicker, Lines, Ref } from "@/components/proposal/primitives";
import { eligibility, event, eventWhen, prizes, schools, stats } from "@/data/event";
import type { SponsorDeckData, TierKey } from "@/data/sponsorDecks/types";
import "@/components/proposal/proposal.css";

/*
 * The shared private sponsor proposal. Same sections, classes and print
 * system as the hand-built JMMB (full) and Norus (prize) decks, driven by one
 * SponsorDeckData entry so every deck in the series stays consistent.
 */

/* Canonical numbers come from the event data. */
const STUDENTS = eligibility.maxHackers;
const PARTNER_SCHOOLS = schools.length;
const TEAMS = stats.find((s) => s.label === "teams")?.value;
const FORMS = eligibility.formOptions;
const TEAM_SIZE = `${eligibility.teamSize.min} to ${eligibility.teamSize.max}`;
const SPECIAL_AWARDS = prizes.filter((p) => !p.place);
const SPECIAL_TOTAL = SPECIAL_AWARDS.reduce((sum, p) => sum + (p.valueUsd ?? 0), 0);
const SPECIAL_EACH = SPECIAL_AWARDS[0]?.valueUsd ?? 0;
const PODIUM = prizes.filter((p) => p.place).sort((a, b) => a.place! - b.place!);
/* Approximate procurement costs for the podium rewards (same estimates as the other proposals). */
const PODIUM_COST: Record<number, string> = { 1: "Approximately US$1,800", 2: "Approximately US$1,000", 3: "US$600" };

/** The short name as it reads mid-sentence, or at the start of one. */
const nm = (deck: SponsorDeckData) => (deck.article ? `the ${deck.short}` : deck.short);
const Nm = (deck: SponsorDeckData) => (deck.article ? `The ${deck.short}` : deck.short);
const aOrAn = (word: string) => (/^[AEIOU]/i.test(word) ? "an" : "a");

const usd = (n: number) => `US$${n.toLocaleString("en-US")}`;
/* Joins list items into one sentence, lowercasing later items unless they start with an acronym. */
const sentence = (items: string[]) =>
  items.map((t, i) => (i && !/^[A-Z]{2}/.test(t) ? t[0].toLowerCase() + t.slice(1) : t)).join(", ") + ".";

const TIERS: Record<TierKey, { name: string; amount: string; text: string }> = {
  gold: { name: "Founding Gold Partner", amount: "J$1,000,000", text: "Flexible support for the inaugural Hack876 and the student experience." },
  prize: { name: "Official Prize Partner", amount: "~US$3,500", text: "The primary competition prizes." },
  special: {
    name: "Special Awards Partner",
    amount: usd(SPECIAL_TOTAL),
    text: `All ${SPECIAL_AWARDS.length} special awards, or ${usd(SPECIAL_EACH)} for one.`,
  },
  food: { name: "Food & Student Experience Partner", amount: "US$1,000", text: "Approximately J$150,000 for meals and refreshments, in cash or in kind." },
  inkind: { name: "In-kind / People Partner", amount: "Time", text: "Judges, mentors, speakers, volunteers and resources." },
};

/** The recommended tier, with any per-sponsor override applied. */
function mainTier(deck: SponsorDeckData) {
  const base = TIERS[deck.ask.tier];
  const c = deck.ask.custom;
  return c ? { name: c.name, amount: c.amount, text: deck.ask.why } : base;
}

export function deckPdf(deck: SponsorDeckData) {
  const brief = deck.kind === "tool";
  return {
    href: `/proposals/hack876-${deck.slug}-partnership-${brief ? "brief" : "proposal"}.pdf`,
    filename: `Hack876 x ${deck.sponsor} - Partnership ${brief ? "Brief" : "Proposal"}.pdf`,
  };
}

export function deckMetadata(deck: SponsorDeckData): Metadata {
  return {
    title: { absolute: `Hack876 × ${deck.sponsor}` },
    description: deck.kind === "tool" ? "A private partnership brief." : "A private partnership proposal.",
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: { index: false, follow: false, noimageindex: true },
    },
    openGraph: null,
    twitter: null,
  };
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

type Section = { key: string; render: (n: string) => ReactNode };

export function SponsorDeck({ deck }: { deck: SponsorDeckData }) {
  const label = `Hack876 × ${deck.sponsor}`;
  const pdf = deckPdf(deck);
  const full = deck.kind === "full";
  const tool = deck.kind === "tool";

  const sections: (Section | false)[] = [
    full && { key: "idea", render: (n) => <BigIdea n={n} deck={deck} /> },
    { key: "meet", render: (n) => <MeetHack876 n={n} /> },
    full && { key: "apps", render: (n) => <NotJustApps n={n} /> },
    { key: "why", render: (n) => <Why n={n} deck={deck} /> },
    { key: "story", render: (n) => <Story n={n} deck={deck} /> },
    { key: "schools", render: (n) => <SchoolNetwork n={n} deck={deck} /> },
    !!deck.bridge && { key: "bridge", render: (n) => <BridgeSection n={n} deck={deck} /> },
    { key: "paths", render: (n) => <WaysIn n={n} deck={deck} /> },
    { key: "people", render: (n) => <MoreThanMoney n={n} deck={deck} /> },
    full && { key: "audience", render: (n) => <AudienceValue n={n} deck={deck} /> },
    tool ? { key: "tool", render: (n) => <ToolAsk n={n} deck={deck} /> } : { key: "invite", render: (n) => <Invitation n={n} deck={deck} /> },
    deck.ask.tier === "gold" && { key: "benefits", render: (n) => <GoldBenefits n={n} deck={deck} /> },
    !tool && { key: "ways", render: (n) => <WaysToParticipate n={n} deck={deck} /> },
    { key: "summary", render: (n) => <Summary n={n} deck={deck} /> },
    { key: "direct", render: (n) => <DirectLine n={n} deck={deck} /> },
    { key: "future", render: (n) => <YearOneAndBeyond n={n} deck={deck} /> },
  ];
  const visible = sections.filter((s): s is Section => !!s);

  return (
    <div
      /* Long emails and URLs in sponsor copy must wrap on phones. */
      className="lp [overflow-wrap:anywhere]"
      style={{ "--lp-deck-label": `"${label}"`, "--deck-accent": deck.accent } as CSSProperties}
    >
      <header className="lp-wrap flex items-center justify-between gap-4 py-5">
        <Link href="/" className="flex items-center gap-2 rounded-lg" aria-label="Hack876 home">
          <BirdMark className="h-6 w-10" />
          <Logo className="text-[1.5rem]" />
        </Link>
        <DownloadDeck href={pdf.href} filename={pdf.filename} label={tool ? "Download Brief (PDF)" : undefined} />
      </header>

      <main id="main">
        <div className="lp-page">
          <Hero deck={deck} label={label} />
        </div>
        {visible.map((s, i) => (
          <div key={s.key} className="lp-page">
            {s.render(String(i + 1).padStart(2, "0"))}
          </div>
        ))}
        <div className="lp-page">
          <Closing deck={deck} label={label} />
        </div>
      </main>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero                                                                      */
/* -------------------------------------------------------------------------- */

function Highlighted({ text, highlight }: { text: string; highlight: string }) {
  const i = highlight ? text.indexOf(highlight) : -1;
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <span className="relative inline-block text-emerald-deep">
        {highlight}
        <TailLine draw={false} className="absolute -bottom-2 left-0 h-4 w-full" />
      </span>
      {text.slice(i + highlight.length)}
    </>
  );
}

function Hero({ deck, label }: { deck: SponsorDeckData; label: string }) {
  const heroStats = [
    { n: STUDENTS, label: "students" },
    { n: PARTNER_SCHOOLS, label: "school network" },
    { n: 1, label: "day" },
  ];
  return (
    <section aria-labelledby="lp-hero-title" className="lp-hero lp-grid-bg relative flex min-h-[calc(100svh-5rem)] flex-col justify-between overflow-hidden border-y lp-rule">
      <div className="lp-wrap w-full pt-16 sm:pt-24">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm font-bold tracking-[0.16em] text-ink-soft uppercase">{label}</p>
          <p className="inline-flex items-center gap-2 rounded-full border lp-rule bg-paper px-3 py-1 text-xs font-bold tracking-[0.12em] text-ink-soft uppercase">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[var(--deck-accent)]" />
            Private partnership {deck.kind === "tool" ? "brief" : "proposal"}
          </p>
        </div>

        <h1 id="lp-hero-title" className="lp-h1 mt-10 max-w-[16ch] sm:mt-14">
          <Highlighted text={deck.hero.headline} highlight={deck.hero.highlight} />
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-2 sm:text-xl">{deck.hero.sub}</p>
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
/*  Shared Hack876 sections                                                   */
/* -------------------------------------------------------------------------- */

function BigIdea({ n, deck }: { n: string; deck: SponsorDeckData }) {
  return (
    <section aria-labelledby="lp-idea" className="lp-section lp-dense relative">
      <div className="lp-wrap">
        <Kicker n={n}>The big idea</Kicker>
        <h2 id="lp-idea" className="lp-statement mt-6 max-w-[22ch]" data-reveal>
          What if young Jamaicans experienced themselves as builders before anyone told them what career they should have?
        </h2>
        <div className="mt-12 grid gap-10 md:grid-cols-[1fr_1.3fr] md:items-center print:mt-4 print:grid-cols-[0.8fr_1.3fr] print:items-center">
          {deck.futurePaths && (
            <div aria-hidden className="hidden md:block print:block">
              <FuturePaths paths={deck.futurePaths} className="mx-auto w-full max-w-md print:max-w-[3.1in]" />
            </div>
          )}
          <div data-reveal>
            <Lines items={["Before the degree.", "Before the first job.", "Before anyone hands them a title."]} className="font-semibold text-ink" />
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

function MeetHack876({ n }: { n: string }) {
  return (
    <section aria-labelledby="lp-meet" className="lp-section lp-dense border-t lp-rule">
      <div className="lp-wrap">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 print:grid-cols-[0.6fr_1.4fr] print:gap-10">
          <div className="lg:sticky lg:top-10 lg:self-start">
            <Kicker n={n}>What is Hack876?</Kicker>
            <h2 id="lp-meet" className="lp-h2 mt-6">
              Meet <span className="whitespace-nowrap">Hack876.</span>
            </h2>
            <div aria-hidden className="mt-10 hidden gap-3 lg:flex print:flex">
              {["laptop", "notebook", "sticky", "people"].map((name, i) => (
                <Icon key={name} name={name} className="diecut h-14 w-14" style={{ rotate: `${[-8, 5, -3, 9][i]}deg` }} />
              ))}
            </div>
          </div>

          <div>
            <div className="lp-prose">
              <p>
                Hack876 is a one-day build competition for approximately{" "}
                <strong className="text-ink">{STUDENTS} secondary-school students</strong> from {FORMS[0]} through{" "}
                {FORMS[FORMS.length - 1]}, working in teams of {TEAM_SIZE}
                {TEAMS ? `, roughly ${TEAMS} teams in all` : ""}, on {eventWhen.long}
                {eventWhen.note}.
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

function NotJustApps({ n }: { n: string }) {
  return (
    <section aria-labelledby="lp-apps" className="lp-section lp-grid-bg border-y lp-rule bg-paper">
      <div className="lp-wrap">
        <Kicker n={n}>Not just apps</Kicker>
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
                className={`flex items-center gap-3 rounded-xl border px-3.5 py-2.5 font-semibold ${b.physical ? "border-ink/25 bg-mint/60" : "border-ink/15 bg-cream"}`}
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
/*  Why the sponsor + their story                                             */
/* -------------------------------------------------------------------------- */

function Why({ n, deck }: { n: string; deck: SponsorDeckData }) {
  const { why } = deck;
  return (
    <section aria-labelledby="lp-why" className="lp-section lp-dense">
      <div className="lp-wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 print:grid-cols-[0.7fr_1.3fr]">
        <div>
          <Kicker n={n}>Why {nm(deck)}</Kicker>
          <h2 id="lp-why" className="lp-h2 mt-6">
            {why.headline}
          </h2>
          <div aria-hidden className="mt-3 h-1 w-16 rounded-full bg-[var(--deck-accent)]" />
          <p className="lp-sub mt-8 text-emerald-deep">{why.tie}</p>
        </div>
        <div>
          {why.mission && (
            <blockquote className="lp-keep rounded-2xl border-2 border-ink bg-paper p-6 shadow-[4px_5px_0_0_var(--color-emerald)] sm:p-8">
              <p className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">{why.mission.label}</p>
              <p className="mt-3 text-[clamp(1.4rem,2.6vw,2rem)] leading-snug font-extrabold tracking-tight">
                &ldquo;{why.mission.quote}&rdquo;
                <Ref id={why.mission.ref} />
              </p>
            </blockquote>
          )}
          <div className={`lp-prose ${why.mission ? "mt-8" : ""}`}>
            {why.points.map((p) => (
              <p key={p.text}>
                {p.text}
                <Ref id={p.ref} />
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StoryArt({ art }: { art: SponsorDeckData["story"]["art"] }) {
  const cls = "mx-auto w-full max-w-xs print:max-w-[2.7in]";
  switch (art) {
    case "Seedling":
      return <Seedling className={cls} />;
    case "Shelter":
      return <Shelter className={cls} />;
    case "Blueprint":
      return <Blueprint className={cls} />;
    case "Compounding":
      return <Compounding className={cls} />;
    case "IdeaToRealWorld":
      return <IdeaToRealWorld labels={["Idea", "Team", "Prototype", "Pitch", "Real world"]} className={cls} />;
    case "MentorRoom":
      return <MentorRoom teams={TEAMS ?? 20} mentors={6} className={cls} />;
    default:
      return null;
  }
}

function Story({ n, deck }: { n: string; deck: SponsorDeckData }) {
  const { story } = deck;
  const hasArt = story.art !== "none";
  return (
    <section aria-labelledby="lp-story" className="lp-section lp-dense bg-paper">
      <div className={`lp-wrap grid gap-12 ${hasArt ? "lg:grid-cols-[1.35fr_0.65fr] lg:items-center print:grid-cols-[1.4fr_0.6fr] print:items-center print:gap-10" : ""}`}>
        <div>
          <Kicker n={n}>{story.kicker}</Kicker>
          <h2 id="lp-story" className="lp-h2 mt-6 max-w-[22ch]">
            {story.headline}
          </h2>

          {story.format === "milestones" ? (
            <ol className="mt-8 border-t lp-rule">
              {story.items.map((it) => (
                <li key={it.text} className="lp-keep grid grid-cols-[5.5rem_1fr] gap-4 border-b lp-rule py-4 sm:grid-cols-[7rem_1fr]">
                  <span className="lp-num text-2xl text-emerald-deep">{it.label}</span>
                  <span className="text-[1.02rem] leading-snug">
                    {it.title && <strong className="block font-extrabold">{it.title}</strong>}
                    <span className="text-ink-2">{it.text}</span>
                    <Ref id={it.ref} />
                  </span>
                </li>
              ))}
            </ol>
          ) : (
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 print:grid-cols-2">
              {story.items.map((it) => (
                <li key={it.text} className="lp-keep rounded-2xl border lp-rule border-t-4 border-t-[var(--deck-accent)] bg-cream p-5">
                  <p className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">{it.label}</p>
                  {it.title && <h3 className="lp-h3 mt-1.5">{it.title}</h3>}
                  <p className="mt-1.5 text-[0.98rem] leading-relaxed text-ink-2">
                    {it.text}
                    <Ref id={it.ref} />
                  </p>
                </li>
              ))}
            </ul>
          )}

          <p className="lp-sub mt-8 text-emerald-deep">{story.takeaway}</p>
        </div>
        {hasArt && (
          <div aria-hidden className="hidden lg:block print:block">
            <StoryArt art={story.art} />
          </div>
        )}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Schools + bridge                                                          */
/* -------------------------------------------------------------------------- */

function SchoolNetwork({ n, deck }: { n: string; deck: SponsorDeckData }) {
  const linked = deck.linkedSchool;
  return (
    <section aria-labelledby="lp-schools" className="lp-section lp-dense">
      <div className="lp-wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 print:grid-cols-[0.7fr_1.3fr] print:gap-10">
        <div>
          <Kicker n={n}>The school network</Kicker>
          <h2 id="lp-schools" className="lp-h2 mt-6">
            {PARTNER_SCHOOLS} schools. One room.
          </h2>
          {linked && (
            <p className="lp-prose mt-6">
              {linked.text}
              {linked.ref && <Ref id={linked.ref} />}
            </p>
          )}
        </div>
        <div>
          <Lines
            items={[
              "Hack876 begins with the schools where we already have relationships and can coordinate most reliably for the inaugural staging. Formal confirmations are still in progress, and the network is not an exclusive eligibility list.",
            ]}
          />
          <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2 print:grid-cols-2">
            {schools.map((s) => (
              <li key={s} className={`rounded-xl border px-4 py-2.5 font-semibold ${linked?.school === s ? "border-2 border-ink bg-sun-light" : "lp-rule bg-cream"}`}>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function BridgeSection({ n, deck }: { n: string; deck: SponsorDeckData }) {
  const b = deck.bridge!;
  return (
    <section aria-labelledby="lp-bridge" className="lp-section lp-dense lp-grid-bg border-t lp-rule">
      <div className="lp-wrap">
        <Kicker n={n}>A bridge already exists</Kicker>
        <h2 id="lp-bridge" className="lp-h2 mt-6 max-w-[22ch]">
          Partnerships work better when someone carries the context.
        </h2>
        <Bridge labels={[deck.short, b.name, "Hack876"]} className="mx-auto mt-10 hidden w-full max-w-3xl sm:block print:mt-4 print:block print:max-w-[6in]" />
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16 print:mt-6 print:grid-cols-[1.2fr_0.8fr] print:gap-8">
          <Lines items={b.lines} />
          <div className="lp-keep h-fit rounded-2xl border-2 border-ink bg-paper p-6 shadow-[4px_5px_0_0_var(--color-emerald)]">
            <p className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">The bridge</p>
            <p className="mt-3 text-2xl font-extrabold">{b.name}</p>
            <p className="mt-1 font-semibold text-ink-2">{b.role}</p>
            <p className="lp-note mt-4">An invitation, not an obligation.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Ways in + people                                                          */
/* -------------------------------------------------------------------------- */

function WaysIn({ n, deck }: { n: string; deck: SponsorDeckData }) {
  const two = deck.paths.length > 1;
  return (
    <section aria-labelledby="lp-paths" className="lp-section lp-dense">
      <div className="lp-wrap">
        <Kicker n={n}>{two ? "Two ways in" : "The way in"}</Kicker>
        <h2 id="lp-paths" className="lp-h2 mt-6 max-w-[24ch]">
          {two ? `There are two natural homes for this inside ${nm(deck)}.` : `Where this fits inside ${nm(deck)}.`}
        </h2>
        {deck.pathsNote && (
          <p className="lp-prose mt-4">
            {deck.pathsNote.text}
            <Ref id={deck.pathsNote.ref} />
          </p>
        )}
        <div className={`mt-10 grid gap-5 print:mt-6 ${two ? "md:grid-cols-2 print:grid-cols-2" : "max-w-3xl"}`}>
          {deck.paths.map((p, i) => (
            <article key={p.title} className={`lp-keep rounded-2xl border-2 border-ink p-6 ${i ? "bg-sun-light" : "bg-mint/60"}`}>
              <p className={`text-xs font-extrabold tracking-[0.16em] uppercase ${i ? "text-ink-soft" : "text-emerald-deep"}`}>{p.label}</p>
              <h3 className="lp-h3 mt-2 text-[clamp(1.3rem,2.2vw,1.7rem)]">{p.title}</h3>
              <ul className="mt-4 space-y-2">
                {p.points.map((t) => (
                  <li key={t} className="flex gap-2.5 font-semibold">
                    <Check className={`mt-0.5 ${i ? "text-ink" : "text-emerald-deep"}`} />
                    {t}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function MoreThanMoney({ n, deck }: { n: string; deck: SponsorDeckData }) {
  return (
    <section aria-labelledby="lp-more" className="lp-section lp-dense bg-paper">
      <div className="lp-wrap">
        <Kicker n={n}>More than money</Kicker>
        <div className="mt-6 grid gap-10 lg:grid-cols-[1.4fr_0.6fr] lg:items-end print:grid-cols-[1.5fr_0.5fr] print:items-end">
          <div>
            <h2 id="lp-more" className="lp-h2 max-w-[24ch]">
              {Nm(deck)}&rsquo;s contribution does not have to be purely financial.
            </h2>
            <p className="lp-marker lp-keep mt-6 text-[clamp(2.8rem,8vw,6rem)] text-emerald-deep print:mt-4">People in the room.</p>
          </div>
          <div aria-hidden className="hidden lg:block print:block">
            <MentorRoom teams={8} mentors={3} mentorColor={deck.accent} className="mx-auto w-full max-w-[16rem] print:max-w-[2.4in]" />
          </div>
        </div>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 print:mt-5 print:grid-cols-3">
          {deck.roles.map((r, i) => (
            <li key={r.title} className="rounded-2xl border lp-rule bg-cream p-5">
              <p className="lp-num text-3xl text-emerald-deep">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="lp-h3 mt-2">{r.title}</h3>
              <p className="mt-1.5 text-[0.98rem] leading-relaxed text-ink-2">{r.text}</p>
            </li>
          ))}
        </ul>

        <div className="lp-keep mt-8 rounded-2xl border-2 border-dashed border-ink/40 p-5 print:mt-5">
          <p className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">Ground rules we will hold ourselves to</p>
          <ul className={`mt-3 grid gap-2 ${deck.groundRules.length > 2 ? "sm:grid-cols-3 print:grid-cols-3" : "sm:grid-cols-2 print:grid-cols-2"}`}>
            {deck.groundRules.map((t) => (
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

function AudienceValue({ n, deck }: { n: string; deck: SponsorDeckData }) {
  const audience = [
    { title: "Ambitious secondary-school students", text: `Approximately ${STUDENTS} of them, from ${FORMS[0]} through ${FORMS[FORMS.length - 1]}.` },
    { title: "Parents and families", text: "Who see who showed up for their children." },
    { title: "Teachers and school communities", text: `Across our network of ${PARTNER_SCHOOLS} schools in Kingston.` },
    { title: "Future university students", text: "Making choices about what to study and where." },
    { title: "Future founders and professionals", text: `Meeting ${nm(deck)} early, and in the right way.` },
  ];
  return (
    <section aria-labelledby="lp-audience" className="lp-section">
      <div className="lp-wrap">
        <Kicker n={n}>Audience and brand value</Kicker>
        <div className="mt-6 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] print:grid-cols-[0.9fr_1.1fr] print:gap-8">
          <div>
            <h2 id="lp-audience" className="lp-h2">
              The honest answer to the visibility questions.
            </h2>
            <Lines
              className="mt-6"
              items={[
                `Will ${nm(deck)} be visible? Yes, across event materials, programming and post-event storytelling, at a level that matches the partnership.`,
                "Is the audience relevant? It is the next generation of Jamaican builders, professionals and leaders, met early.",
                "Can it build longer relationships? Yes, through people, schools and a second year, not through leads.",
              ]}
            />
          </div>
          <div>
            <p className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">Who is in and around the room</p>
            <ul className="mt-4 space-y-3">
              {audience.map((a) => (
                <li key={a.title} className="rounded-2xl border lp-rule bg-paper px-5 py-4">
                  <p className="font-extrabold">{a.title}</p>
                  <p className="mt-0.5 text-ink-2">{a.text}</p>
                </li>
              ))}
            </ul>
            <p className="lp-note mt-4">Many participants are minors. We will not promise leads, reach, impressions or data.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  The ask                                                                   */
/* -------------------------------------------------------------------------- */

const GOLD_AREAS = ["Event production", "Student experience", "Equipment and materials", "Food", "Prizes", "Signage", "Programming and logistics", "Operational costs"];

function Invitation({ n, deck }: { n: string; deck: SponsorDeckData }) {
  const { ask } = deck;
  const tier = mainTier(deck);
  const list = ask.custom
    ? ask.custom.covers
    : ask.tier === "gold"
      ? GOLD_AREAS
      : ask.tier === "prize"
        ? PODIUM.map((p) => `${p.name}: ${p.reward}`)
        : ask.tier === "special"
          ? SPECIAL_AWARDS.map((a) => `${a.name}, ${usd(a.valueUsd ?? 0)}`)
          : ask.tier === "food"
            ? ["Student meals", "Snacks", "Water and refreshments", "Serving supplies", "Light hospitality"]
            : (ask.inkind ?? []);
  return (
    <section aria-labelledby="lp-invite" className="lp-section lp-dark relative overflow-hidden">
      <div className="lp-wrap relative">
        <Kicker n={n}>Our invitation</Kicker>
        <h2 id="lp-invite" className="lp-h2 mt-6 max-w-[20ch]">
          Become {aOrAn(tier.name)} {tier.name} of the inaugural Hack876.
        </h2>

        <div className="lp-keep mt-10 border-y lp-rule py-8 print:mt-6 print:py-5">
          <p className="lp-num lp-accent text-[clamp(3.2rem,10vw,8rem)] text-sun">{tier.amount === "Time" ? "Time + expertise" : tier.amount}</p>
          <p className="mt-4 text-lg font-bold tracking-[0.14em] uppercase sm:text-xl">{ask.recognition}</p>
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-16 print:mt-6 print:grid-cols-2 print:gap-8">
          <div>
            <Lines items={[ask.why, ask.tier === "gold" ? "It may support areas such as:" : "What it covers:"]} />
            <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2 print:grid-cols-2">
              {list.map((a) => (
                <li key={a} className="flex items-center gap-2.5 font-semibold">
                  <Check className="lp-accent shrink-0 text-sun" />
                  {a}
                </li>
              ))}
            </ul>
            {ask.tier === "gold" && (
              <p className="lp-note mt-5">A flexible, discretionary contribution. It is not a title sponsorship, and it carries no naming rights.</p>
            )}
          </div>
          <figure className="lp-keep h-fit rounded-2xl border-2 border-dashed border-cream/40 p-7 sm:p-9">
            <figcaption className="text-xs font-extrabold tracking-[0.16em] text-cream/60 uppercase">Proposed recognition</figcaption>
            <p className="mt-6 text-[clamp(1.5rem,2.8vw,2rem)] leading-tight font-extrabold tracking-tight">{deck.sponsor}</p>
            <p className="lp-accent mt-2 text-lg font-bold text-sun">{ask.recognition}</p>
            {ask.tracks.length > 0 && (
              <p className="mt-6 text-sm font-semibold text-cream/70">Closest Hack876 tracks: {ask.tracks.join(", ")}</p>
            )}
          </figure>
        </div>
      </div>
    </section>
  );
}

const BENEFITS = [
  "Founding-year association with the first Hack876",
  "Recognition during opening and closing programming",
  "Opportunity for leadership to address students",
  "People in the room as judges, mentors and speakers",
  "Relationships with the schools in the Hack876 network",
  "Visibility across event materials, appropriate to the level selected",
  "Photo and video storytelling from the event",
  "Invitation to the finals and awards",
  "A post-event recap, and an early conversation about year two",
];

function GoldBenefits({ n }: { n: string; deck: SponsorDeckData }) {
  return (
    <section aria-labelledby="lp-benefits" className="lp-section">
      <div className="lp-wrap">
        <Kicker n={n}>What partnership looks like</Kicker>
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

function TierCard({ k, deck, recommended }: { k: TierKey; deck: SponsorDeckData; recommended: boolean }) {
  const t = TIERS[k];
  return (
    <article className={`lp-keep rounded-2xl p-6 ${recommended ? "border-2 border-ink bg-sun-light" : "border lp-rule bg-paper"}`}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-xl font-extrabold">{t.name}</h3>
        <p className={t.amount === "Time" ? "text-sm font-extrabold tracking-wide text-emerald-deep uppercase" : "lp-num text-3xl"}>
          {t.amount === "Time" ? "Time and expertise" : t.amount}
        </p>
      </div>
      {recommended && <p className="mt-1 text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">Our suggestion for {nm(deck)}</p>}
      {k === "prize" ? (
        <dl className="mt-3 divide-y lp-rule border-y lp-rule text-sm">
          {PODIUM.map((p) => (
            <div key={p.name} className="grid grid-cols-[8rem_1fr_auto] gap-2 py-2 max-sm:grid-cols-[7rem_1fr]">
              <dt className="font-extrabold">{p.name}</dt>
              <dd className="font-semibold">{p.reward}</dd>
              <dd className="text-ink-soft max-sm:col-start-2">{PODIUM_COST[p.place!]}</dd>
            </div>
          ))}
        </dl>
      ) : k === "special" ? (
        <p className="mt-2 text-ink-2">
          {SPECIAL_AWARDS.map((a) => a.name).join(", ")}: {usd(SPECIAL_TOTAL)} for all {SPECIAL_AWARDS.length}, or {usd(SPECIAL_EACH)} for one, presented by{" "}
          {nm(deck)}.
        </p>
      ) : k === "inkind" && deck.ask.inkind?.length ? (
        <p className="mt-2 text-ink-2">{sentence(deck.ask.inkind)}</p>
      ) : (
        <p className="mt-2 text-ink-2">{t.text}</p>
      )}
    </article>
  );
}

function WaysToParticipate({ n, deck }: { n: string; deck: SponsorDeckData }) {
  const order: TierKey[] = ["prize", "special", "food", "inkind"];
  const hidden = new Set([...(deck.ask.hideTiers ?? []), ...(deck.ask.custom ? [deck.ask.tier] : [])]);
  const shown = order.filter((k) => !hidden.has(k));
  const custom = deck.ask.custom;
  return (
    <section aria-labelledby="lp-ways" className="lp-section lp-dense bg-cream-2">
      <div className="lp-wrap">
        <Kicker n={n}>Flexible ways to participate</Kicker>
        <h2 id="lp-ways" className="lp-h2 mt-6 max-w-[24ch]">
          Choose the level that fits.
        </h2>
        <div className="mt-8 grid gap-5 lg:grid-cols-2 print:mt-5 print:grid-cols-2">
          {custom && (
            <article className="lp-keep rounded-2xl border-2 border-ink bg-sun-light p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-xl font-extrabold">{custom.name}</h3>
                <p className="lp-num text-3xl">{custom.amount}</p>
              </div>
              <p className="mt-1 text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">Our suggestion for {nm(deck)}</p>
              <p className="mt-2 text-ink-2">{sentence(custom.covers)}</p>
            </article>
          )}
          {shown.map((k) => (
            <TierCard key={k} k={k} deck={deck} recommended={deck.ask.tier === k || deck.ask.fallback === k} />
          ))}
        </div>
        {deck.ask.award && (
          <div className="lp-keep mt-5 rounded-2xl border-2 border-dashed border-ink/40 p-5">
            <p className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">An idea, not yet a Hack876 award</p>
            <p className="mt-2 text-lg font-extrabold">{deck.ask.award.name}</p>
            <p className="mt-1 text-ink-2">{deck.ask.award.text}</p>
          </div>
        )}
        <p className="lp-note mt-4">Costs are approximate. Final prize configuration may change with team structure, pricing and availability.</p>
      </div>
    </section>
  );
}

function ToolAsk({ n, deck }: { n: string; deck: SponsorDeckData }) {
  const t = deck.tool!;
  return (
    <section aria-labelledby="lp-tool" className="lp-section lp-dark lp-grid-bg relative overflow-hidden">
      <div className="lp-wrap">
        <Kicker n={n}>The ask</Kicker>
        <h2 id="lp-tool" className="lp-h2 mt-6 max-w-[20ch]">
          {t.headline}
        </h2>
        <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-16 print:mt-6 print:grid-cols-2 print:gap-8">
          <div>
            <Lines items={[t.what, "Possible structures:"]} />
            <ul className="mt-5 space-y-2">
              {t.structures.map((s) => (
                <li key={s} className="flex items-center gap-2.5 font-semibold">
                  <Check className="lp-accent shrink-0 text-sun" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <figure className="lp-keep h-fit rounded-2xl border-2 border-dashed border-cream/40 p-7">
            <figcaption className="text-xs font-extrabold tracking-[0.16em] text-cream/60 uppercase">Age and account terms</figcaption>
            <p className="mt-4 text-lg leading-relaxed text-cream/90">{t.ageNote}</p>
            <p className="lp-accent mt-5 font-bold text-sun">{deck.ask.recognition}</p>
          </figure>
        </div>
      </div>
    </section>
  );
}

function Summary({ n, deck }: { n: string; deck: SponsorDeckData }) {
  const main = mainTier(deck);
  const hidden = new Set([...(deck.ask.hideTiers ?? []), deck.ask.tier, "gold"]);
  const tool = deck.kind === "tool";
  const others: { name: string; amount: string; text: string }[] = tool
    ? [
        ...(deck.ask.award ? [{ name: deck.ask.award.name, amount: "Proposed", text: "One award, shaped together." }] : []),
        ...(deck.ask.hideTiers?.includes("special") ? [] : [{ name: "One special award", amount: usd(SPECIAL_EACH), text: "Your pick of the existing special awards." }]),
        { name: "People in the room", amount: "Time", text: sentence(deck.roles.map((r) => r.title)) },
      ]
    : (["gold", "prize", "special", "food", "inkind"] as TierKey[])
        .filter((k) => !hidden.has(k))
        .map((k) => TIERS[k])
        .concat(deck.ask.award ? [{ name: deck.ask.award.name, amount: "Proposed", text: "A custom award shaped together." }] : []);
  return (
    <section aria-labelledby="lp-summary" className="lp-section">
      <div className="lp-wrap">
        <Kicker n={n}>Partnership summary</Kicker>
        <h2 id="lp-summary" className="lp-h2 mt-6">
          Every option at a glance.
        </h2>
        <div className="mt-10 grid gap-5 lg:grid-cols-5 print:mt-6 print:grid-cols-5">
          <div className="lp-keep flex flex-col justify-between rounded-3xl bg-night p-8 text-cream lg:col-span-2 print:col-span-2">
            <div>
              <p className="text-sm font-extrabold tracking-[0.18em] text-sun uppercase">{tool ? "The ask" : main.name}</p>
              <p className="lp-num mt-5 text-[clamp(2.4rem,5vw,4.2rem)] text-sun">{tool ? "Access" : main.amount === "Time" ? "Time" : main.amount}</p>
              <p className="mt-2 text-sm font-bold tracking-[0.12em] text-cream/70 uppercase">Inaugural Hack876</p>
            </div>
            <p className="mt-8 text-lg leading-relaxed text-cream/90">{tool ? deck.tool!.what : deck.ask.why}</p>
          </div>
          <ul className="grid gap-3 lg:col-span-3 print:col-span-3">
            {others.map((o) => (
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
/*  Direct line + future + closing                                            */
/* -------------------------------------------------------------------------- */

function DirectLine({ n, deck }: { n: string; deck: SponsorDeckData }) {
  const r = deck.recipient;
  return (
    <section aria-labelledby="lp-direct" className="lp-section lp-grid-bg">
      <div className="lp-wrap grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center print:grid-cols-[1.1fr_0.9fr] print:items-center">
        <div>
          <Kicker n={n}>A direct line</Kicker>
          <h2 id="lp-direct" className="lp-h2 mt-6 max-w-[20ch]">
            There is no faceless sponsorship process here.
          </h2>
          <Lines
            className="mt-6"
            items={[
              <span key="r">
                This proposal is for{" "}
                <strong className="text-ink">
                  {r.name}, {r.title}
                </strong>
                .{r.ref ? <Ref id={r.ref} /> : null}
              </span>,
              `If ${nm(deck)} is interested, we can decide together what involvement should actually look like.`,
            ]}
          />
        </div>
        <div className="lp-keep rounded-2xl border-2 border-ink bg-paper p-6 shadow-[4px_5px_0_0_var(--color-emerald)]">
          <p className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">Questions we would answer together</p>
          <ul className="mt-4 space-y-2.5">
            {deck.questions.map((t) => (
              <li key={t} className="flex gap-2.5 font-semibold">
                <Check className="mt-0.5 shrink-0 text-emerald-deep" />
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-4 font-extrabold text-emerald-deep">A conversation, not a workload.</p>
        </div>
      </div>
    </section>
  );
}

function YearOneAndBeyond({ n, deck }: { n: string; deck: SponsorDeckData }) {
  return (
    <section aria-labelledby="lp-future" className="lp-section bg-paper">
      <div className="lp-wrap">
        <Kicker n={n}>Year one, and what {nm(deck)} could make possible</Kicker>
        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_1fr] print:grid-cols-[1fr_1fr] print:gap-8">
          <div>
            <h2 id="lp-future" className="lp-h2">
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
          <div className="flex flex-col gap-5">
            <div className="lp-keep rounded-2xl border-2 border-ink bg-sun-light p-6">
              <p className="lp-num text-5xl">{event.year}</p>
              <p className="mt-3 text-xl font-extrabold">Help make the first Hack876 happen.</p>
              <p className="mt-2 text-ink-2">No multi-year commitment required.</p>
            </div>
            <div className="lp-keep rounded-2xl border border-dashed border-ink/40 p-6">
              <p className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">
                Future possibilities, only if both sides find it valuable. Not commitments.
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {deck.future.map((t) => (
                  <li key={t} className="rounded-full border lp-rule bg-cream px-3.5 py-1.5 text-sm font-semibold">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Closing({ deck, label }: { deck: SponsorDeckData; label: string }) {
  return (
    <section aria-labelledby="lp-close" className="lp-section lp-close lp-grid-bg border-t lp-rule text-center">
      <div className="lp-wrap flex flex-col items-center">
        <div aria-hidden className="w-28 sm:w-36">
          <DoctorBird flutter={false} className="w-full" />
        </div>
        <p className="mt-6 text-sm font-extrabold tracking-[0.18em] text-ink-soft uppercase">{label}</p>
        <div className="lp-prose mx-auto mt-6 max-w-2xl text-center">
          <p>Somewhere in that room may be a future founder, engineer, designer or leader.</p>
          <p>They do not need us to decide who they become.</p>
          <p className="font-semibold text-ink">They need an opportunity to begin.</p>
        </div>
        <h2 id="lp-close" className="lp-marker mt-8 text-[clamp(3rem,9vw,6.8rem)]">
          Help us build that opportunity.
        </h2>
        <p className="lp-prose mx-auto mt-6 max-w-2xl text-center">{deck.closingLine}</p>
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
          {deck.sources.map((s) => (
            <li key={s.id} id={`source-${s.id}`} className="lp-note scroll-mt-6">
              <span className="font-bold">{s.id}.</span> {s.org}, &ldquo;{s.label}.&rdquo;{" "}
              <a href={s.href} className="break-all underline decoration-ink/30 underline-offset-2 hover:decoration-ink">
                {s.href.replace("https://", "")}
              </a>
            </li>
          ))}
        </ol>
        <p className="lp-note mt-6">{deck.preparedFor}</p>
      </footer>
    </section>
  );
}
