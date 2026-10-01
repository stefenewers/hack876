import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { BirdMark, DoctorBird } from "@/components/art/DoctorBird";
import { Logo } from "@/components/art/Wordmark";
import { DownloadDeck } from "@/components/proposal/DownloadDeck";
import { eligibility, event, schools } from "@/data/event";
import "@/components/proposal/proposal.css";
import "./mlh.css";

/*
 * Private partnership brief for Major League Hacking, written for Mike Swift.
 * Not a funding ask: swag and gear first, then guidance, presence, ecosystem
 * access and (if eligible) a formal relationship. Not linked from the public
 * site; noindex/nofollow here and via X-Robots-Tag in next.config.ts.
 *
 * This is a proposal. Nothing here should read as MLH support, endorsement or
 * affiliation.
 */

const DECK_LABEL = "Hack 876 × MLH";
const PDF = "/proposals/hack876-mlh-partnership-brief.pdf";
const PDF_NAME = "Hack 876 x MLH - Partnership Brief.pdf";

export const metadata: Metadata = {
  title: { absolute: "Hack 876 × Major League Hacking" },
  description: "A private partnership brief.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  openGraph: null,
  twitter: null,
};

const STUDENTS = eligibility.maxHackers;
/* The MLH brief states teams of up to four. */
const TEAM_MAX = 4;

/* -------------------------------------------------------------------------- */

function Label({ n, children }: { n?: string; children: ReactNode }) {
  return (
    <p className="mh-label flex items-center gap-3">
      {n && <span className="mh-label-n">{n}</span>}
      <span>{children}</span>
    </p>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function MlhOpportunityPage() {
  return (
    <div className="lp mh" style={{ "--lp-deck-label": `"${DECK_LABEL}"` } as CSSProperties}>
      <header className="lp-wrap flex items-center justify-between gap-4 py-5">
        <Link href="/" className="flex items-center gap-2 rounded-lg" aria-label="Hack 876 home">
          <BirdMark className="h-6 w-10" />
          <Logo className="text-[1.4rem]" />
        </Link>
        <DownloadDeck href={PDF} filename={PDF_NAME} label="Download brief (PDF)" />
      </header>

      <main id="main">
        <div className="lp-page">
          <Hero />
        </div>
        <div className="lp-page">
          <Note />
        </div>
        <div className="lp-page">
          <Numbers />
          <TheDay />
        </div>
        <div className="lp-page">
          <WhyMlh />
        </div>
        <div className="lp-page">
          <BiggestAsk />
        </div>
        <div className="lp-page">
          <ElseWhere />
        </div>
        <div className="lp-page">
          <NotFunding />
        </div>
        <div className="lp-page">
          <Closing />
        </div>
      </main>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  1 · Hero                                                                  */
/* -------------------------------------------------------------------------- */

function Hero() {
  const meta = ["Jamaica", `~${STUDENTS} student builders`, `Teams ≤${TEAM_MAX}`, "1 day", String(event.year)];
  return (
    <section aria-labelledby="mh-hero" className="lp-hero relative flex min-h-[calc(100svh-5rem)] flex-col justify-between overflow-hidden border-y lp-rule">
      <div className="lp-wrap relative w-full pt-14 sm:pt-20">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="mh-label flex items-center gap-2.5">
            <span aria-hidden className="mh-px" />
            Private partnership brief
          </p>
          <p className="mh-label">Hack 876 × Major League Hacking</p>
        </div>

        <h1 id="mh-hero" className="mh-h mh-xl mt-12 max-w-[18ch] sm:mt-16">
          Jamaica has the students.
          <br />
          We&rsquo;re building the room.
          <br />
          <span className="mh-mark">Help us build the hackathon right.</span>
        </h1>

        <div className="lp-prose mt-10">
          <p>
            Hack 876 is bringing about {STUDENTS} Jamaican secondary-school students together for one day to build, ship and
            present something real.
          </p>
          <p>
            We&rsquo;re not primarily looking for financial sponsorship.{" "}
            <strong className="font-bold text-ink">We&rsquo;re looking for the things MLH knows how to do best.</strong>
          </p>
        </div>

        <div className="lp-no-print mt-10 flex flex-wrap items-center gap-4">
          <a href="#where-mlh-fits" className="btn btn-primary">
            See where MLH fits <span aria-hidden>↓</span>
          </a>
          <a href={PDF} download={PDF_NAME} className="btn btn-secondary">
            Download brief
          </a>
        </div>

        <div aria-hidden className="pointer-events-none absolute top-24 right-6 hidden w-44 xl:block print:hidden">
          <DoctorBird className="w-full" mood="happy" />
        </div>
      </div>

      <div className="lp-wrap w-full pt-14 pb-10">
        <ul className="mh-mono flex flex-wrap gap-x-5 gap-y-2 border-t lp-rule pt-5 text-[0.8rem] font-semibold tracking-[0.12em] text-ink-soft uppercase">
          {meta.map((m, i) => (
            <li key={m} className="flex items-center gap-5">
              {i > 0 && <span aria-hidden className="mh-px opacity-70" />}
              {m}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  2 · A note for Mike                                                       */
/* -------------------------------------------------------------------------- */

function Note() {
  return (
    <section aria-labelledby="mh-note" className="lp-section mh-paper bg-paper">
      <div className="lp-wrap grid items-center gap-14 lg:grid-cols-[1.25fr_1fr] print:grid-cols-[1.35fr_1fr] print:gap-16">
        <div>
          <Label n="01">A note for Mike</Label>
          <h2 id="mh-note" className="mh-h mh-lg mt-6" data-reveal>
            From hacker to organizer.
          </h2>
          <div className="lp-prose mt-8" data-reveal>
            <p>
              Mike, we met at HackGT while my teammate and I were building Thinketh. You spent some time with us, liked what we
              were building, and even snapped a photo of our Grokbot to share with the Grok team.
            </p>
            <p>A few days later, I&rsquo;m reaching out from the other side of the table.</p>
            <p className="font-bold text-ink">I&rsquo;m helping build a hackathon.</p>
            <p>Hack 876 is the event I wish more Jamaican students could experience before university.</p>
          </div>
          <p className="hand mt-8 text-4xl text-ink print:mt-6" data-reveal>
            Stefen
          </p>
        </div>

        <figure className="mx-auto w-full max-w-[20rem] sm:max-w-[22rem] print:max-w-[27rem]" data-reveal>
          <div className="mh-polaroid">
            <span aria-hidden className="mh-tape" />
            <Image
              src="/proposals/mlh-thinketh-grokbot.png"
              alt="Thinketh's playground at HackGT: Grokbot, the visiting challenger, flags a missing qualification in a claim."
              width={780}
              height={1150}
              sizes="(min-width: 640px) 22rem, 20rem"
              className="block h-auto w-full border border-ink/10"
            />
            <figcaption className="hand absolute right-4 bottom-3 left-4 text-center text-xl leading-tight text-ink-2">
              Grokbot at HackGT
            </figcaption>
          </div>
        </figure>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  3 · The event: numbers                                                    */
/* -------------------------------------------------------------------------- */

const NUMBERS = [
  { v: `~${STUDENTS}`, l: "Student builders", bg: "bg-emerald text-white", r: "-3deg" },
  { v: `≤${TEAM_MAX}`, l: "Per team", bg: "bg-sun text-ink", r: "2deg" },
  { v: "1", l: "Day", bg: "bg-[var(--mh-orange)] text-ink", r: "-1.5deg" },
];

function Numbers() {
  return (
    <section aria-labelledby="mh-event" className="lp-section mh-dots">
      <div className="lp-wrap grid items-center gap-14 lg:grid-cols-[1.4fr_1fr] print:grid-cols-[1.5fr_1fr]">
        <div>
          <Label n="02">The event</Label>
          <h2 id="mh-event" className="mh-h mh-lg mt-6 max-w-[16ch]" data-reveal>
            One day. One room. Build something real.
          </h2>
          <ul className="mt-12 grid grid-cols-3 gap-4 sm:gap-6">
            {NUMBERS.map((n, i) => (
              <li
                key={n.l}
                data-reveal="pop"
                style={{ "--reveal-rot": n.r, "--reveal-delay": `${i * 90}ms`, rotate: n.r } as CSSProperties}
                className={`sticker grid place-items-center px-2 py-5 text-center sm:py-7 print:py-9 ${n.bg}`}
              >
                <span className="lp-num text-[clamp(2.6rem,7vw,4.6rem)] print:text-[6.4rem]">{n.v}</span>
                <span className="mh-mono mt-2 text-[0.66rem] font-bold tracking-[0.14em] uppercase sm:text-xs print:text-[1.1rem]">{n.l}</span>
              </li>
            ))}
          </ul>
          <p className="lp-prose mt-10">
            Secondary-school students, mostly 5th Form through Upper 6th, in Kingston for one day in {event.year}.
          </p>
        </div>

        <HackerPass />
      </div>
    </section>
  );
}

function HackerPass() {
  return (
    <div aria-hidden className="mx-auto flex w-full max-w-[17rem] flex-col items-center print:max-w-[27rem]">
      {/* Lanyard */}
      <div className="flex h-24 w-full justify-center print:h-20">
        <span className="h-full w-4 skew-x-[18deg] border-x-2 border-ink bg-emerald" />
        <span className="h-full w-4 -skew-x-[18deg] border-x-2 border-ink bg-emerald" />
      </div>
      <div className="mh-pass -mt-2 w-full">
        <div className="mx-auto h-5 w-10 rounded-t-md border-2 border-b-0 border-ink bg-[#c9ccca]" />
        <div className="overflow-hidden rounded-2xl border-[3px] border-ink bg-paper shadow-[5px_6px_0_0_var(--color-ink)]">
          <div className="flex items-center justify-between bg-ink px-4 py-3 text-cream">
            <Logo className="text-[1.35rem]" />
            <span className="mh-mono text-[0.62rem] font-bold tracking-[0.16em]">KINGSTON · {event.year}</span>
          </div>
          <div className="px-5 pt-5 pb-4">
            <p className="mh-mono text-[0.62rem] font-bold tracking-[0.18em] text-ink-soft">PASS TYPE</p>
            <p className="display mt-1 text-[2.6rem] leading-none text-[var(--mh-orange-deep)]">Hacker</p>
            <div className="mt-4 flex items-end justify-between gap-3">
              <div>
                <p className="mh-mono text-[0.62rem] font-bold tracking-[0.18em] text-ink-soft">HACKATHONS</p>
                <p className="lp-num mt-1 text-3xl">#001</p>
              </div>
              <DoctorBird flutter={false} tail={false} className="h-14 w-16" />
            </div>
            <div className="mh-barcode mt-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  4 · The day                                                               */
/* -------------------------------------------------------------------------- */

const STEPS = [
  { v: "Think", d: "Find a real problem worth a day.", c: "bg-sky-light" },
  { v: "Build", d: "Turn it into a working prototype.", c: "bg-mint" },
  { v: "Ship", d: "Get it running. Imperfect is fine. Real is the rule.", c: "bg-sun-light" },
  { v: "Present", d: "Demo it. Explain the decisions.", c: "bg-peach" },
];

const BUILDS = ["Web apps", "Mobile apps", "Games", "Hardware", "AI products", "Education tools", "Fintech", "Civic tools", "Design-led products"];

function TheDay() {
  return (
    <section aria-labelledby="mh-day" className="lp-section mh-dense mh-dots pt-0 print:pt-[0.55in]">
      <div className="lp-wrap">
        <h3 id="mh-day" className="mh-label">
          <span className="mh-label-n">The day</span>
        </h3>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 print:grid-cols-4">
          {STEPS.map((s, i) => (
            <li
              key={s.v}
              data-reveal
              style={{ "--reveal-delay": `${i * 80}ms` } as CSSProperties}
              className={`sticker sticker-hover p-5 ${s.c}`}
            >
              <p className="mh-mono text-xs font-bold text-ink-soft">0{i + 1}</p>
              <p className="mh-h mt-2 text-[2.1rem] print:text-[2.8rem]">{s.v}</p>
              <p className="mt-2 text-[1.02rem] leading-snug text-ink-2 print:text-[1.35rem]">{s.d}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 print:grid-cols-2 print:gap-12">
          <div>
            <p className="mh-h text-[clamp(1.5rem,2.6vw,2.1rem)] tracking-[-0.03em] print:text-[2.6rem]">Not a talent gap. An exposure gap.</p>
            <div className="lp-prose mt-4">
              <p>
                Jamaica already produces excellent engineers, designers and founders. Most of its secondary-school students will
                not meet a hackathon until university, if at all.
              </p>
              <p>Hack 876 moves that first one earlier. It is not an AI hackathon. Teams build whatever the problem needs.</p>
            </div>
            <ul className="mt-5 flex flex-wrap gap-2">
              {BUILDS.map((b) => (
                <li key={b} className="rounded-full border-2 border-ink/70 bg-paper px-3 py-1 text-sm font-bold print:text-[1.15rem]">
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mh-label">Schools we&rsquo;re already talking with</p>
            <ul className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2 print:grid-cols-2">
              {schools.map((s) => (
                <li key={s} className="flex items-baseline gap-2.5 border-b lp-rule pb-2 text-[1.02rem] font-semibold print:text-[1.3rem]">
                  <span aria-hidden className="mh-px translate-y-[-0.1em]" />
                  {s}
                </li>
              ))}
            </ul>
            <p className="lp-note mt-4">Participation isn&rsquo;t limited to these schools.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  5 · Why MLH                                                               */
/* -------------------------------------------------------------------------- */

const LITTLE_THINGS = ["Structure.", "Culture.", "Tools.", "Mentorship.", "The little things hackers remember."];
const LEARN = ["Work as a team", "Scope", "Make tradeoffs", "Build against a clock", "Demo", "Explain their decisions", "Ship something imperfect but real"];

function WhyMlh() {
  return (
    <section aria-labelledby="mh-why" className="lp-section lp-dark lp-grid-bg">
      <div className="lp-wrap grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:items-center print:grid-cols-[1.2fr_1fr] print:items-center">
        <div>
          <Label n="03">Why MLH</Label>
          <h2 id="mh-why" className="mh-h mh-lg mt-6 max-w-[17ch]" data-reveal>
            You already know what makes a hackathon feel real.
          </h2>
          <div className="lp-prose mt-8" data-reveal>
            <p>Hack 876 doesn&rsquo;t need another logo on the wall.</p>
            <p>
              It would benefit from an organization that has spent years helping student hackathons build the right room for
              builders.
            </p>
          </div>
          <div className="mt-8 rounded-xl border border-cream/15 bg-cream/[0.04] p-5" data-reveal>
            <p className="mh-label">In one day, students learn to</p>
            <p className="mt-3 text-[1.05rem] leading-relaxed text-cream/85 print:text-[1.35rem]">{LEARN.join(" · ")}</p>
          </div>
        </div>

        <div data-reveal>
          <ul className="space-y-3 sm:space-y-4">
            {LITTLE_THINGS.map((t, i) => (
              <li
                key={t}
                className={`mh-h flex items-baseline gap-4 text-[clamp(1.7rem,3.4vw,2.8rem)] tracking-[-0.03em] print:text-[3.6rem] ${i === LITTLE_THINGS.length - 1 ? "text-sun" : "text-cream"}`}
              >
                <span aria-hidden className="mh-px translate-y-[-0.2em]" />
                {t}
              </li>
            ))}
          </ul>
          <p className="mh-mono mt-10 text-[1rem] font-semibold text-cream/80 print:text-[1.4rem]">
            <span className="text-emerald-light">&gt;</span> That&rsquo;s where we think MLH can matter.
            <span aria-hidden className="mh-cursor" />
          </p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  6 · The biggest ask: swag + gear                                          */
/* -------------------------------------------------------------------------- */

const TAGS = [
  { t: "Swag", c: "bg-sun", r: "-3deg" },
  { t: "Gear", c: "bg-paper", r: "2deg" },
  { t: "Hacker packs", c: "bg-mint", r: "-1deg" },
  { t: "Stickers", c: "bg-pink", r: "3deg" },
  { t: "Shirts", c: "bg-sky-light", r: "-2deg" },
  { t: "Lanyards", c: "bg-peach", r: "1.5deg" },
  { t: "Partner goodies", c: "bg-sun-light", r: "-2.5deg" },
];

function BiggestAsk() {
  return (
    <section id="where-mlh-fits" aria-labelledby="mh-swag" className="lp-section mh-dense mh-dots scroll-mt-6 bg-cream-2">
      <div className="lp-wrap grid items-center gap-14 lg:grid-cols-[1fr_1.1fr] print:grid-cols-[1fr_1.15fr] print:gap-12">
        <div>
          <Label n="04">The biggest ask</Label>
          <h2 id="mh-swag" className="mh-h mh-lg mt-6 max-w-[15ch]" data-reveal>
            Help us give them the hacker experience.
          </h2>
          <div className="lp-prose mt-8" data-reveal>
            <p>For many Hack 876 students, this will be their first hackathon. We want them to leave with more than a project.</p>
            <p>
              The stickers on their laptop. The shirt they still wear months later. The lanyard in a drawer. The feeling that
              they joined a global builder community for a day.
            </p>
          </div>
          <p className="mt-8 inline-block rounded-xl border-[3px] border-ink bg-ink px-5 py-3 text-lg font-extrabold text-cream shadow-[4px_5px_0_0_var(--mh-orange)] print:text-[1.6rem]" data-reveal>
            This is our biggest tangible ask from MLH.
          </p>
          <p className="lp-note mt-4 print:text-[1.15rem]">Not luxury prizes. Just the things that make it feel legit.</p>
        </div>

        <div data-reveal>
          <Laptop />
          <ul className="mt-9 flex flex-wrap justify-center gap-2.5 sm:gap-3">
            {TAGS.map((t) => (
              <li key={t.t} className={`mh-tag ${t.c}`} style={{ "--r": t.r } as CSSProperties}>
                {t.t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Laptop() {
  const s = (x: string, y: string, r: string) => ({ "--x": x, "--y": y, "--r": r }) as CSSProperties;
  return (
    <div className="mx-auto w-full max-w-[34rem] print:max-w-[44rem]" role="img" aria-label="A laptop lid covered in hackathon stickers, with an empty spot waiting for one more.">
      <div className="mh-lid overflow-hidden">
        {/* Hack 876 */}
        <span className="mh-stk rounded-xl border-[2.5px] border-ink bg-paper px-3 py-2 shadow-[2px_3px_0_0_#000]" style={s("6%", "8%", "-7deg")}>
          <Logo className="text-[clamp(1rem,2.6vw,1.5rem)]" />
        </span>
        {/* Doctor bird */}
        <span className="mh-stk grid aspect-square w-[22%] place-items-center rounded-full border-[2.5px] border-ink bg-sun" style={s("60%", "6%", "8deg")}>
          <DoctorBird flutter={false} tail={false} className="w-[80%]" />
        </span>
        {/* Ship it */}
        <span className="mh-stk rounded-full border-[2.5px] border-ink bg-bill px-3 py-1 text-[clamp(0.7rem,1.8vw,1rem)] font-extrabold tracking-wide text-white uppercase" style={s("31%", "46%", "-4deg")}>
          Ship it
        </span>
        {/* </> */}
        <span className="mh-stk grid aspect-square w-[14%] place-items-center rounded-lg border-[2.5px] border-ink bg-aqua text-[clamp(0.8rem,2vw,1.2rem)] font-extrabold" style={s("6%", "33%", "6deg")}>
          <span className="mh-mono">&lt;/&gt;</span>
        </span>
        {/* 876 hex */}
        <span
          className="mh-stk grid aspect-[1/0.9] w-[17%] place-items-center bg-ink"
          style={{ ...s("78%", "44%", "-10deg"), clipPath: "polygon(25% 0, 75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%)" }}
        >
          <span
            className="grid h-[calc(100%-6px)] w-[calc(100%-6px)] place-items-center bg-emerald text-[clamp(0.8rem,2vw,1.2rem)] font-extrabold text-white"
            style={{ clipPath: "polygon(25% 0, 75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%)" }}
          >
            876
          </span>
        </span>
        {/* First hackathon */}
        <span className="mh-stk grid aspect-square w-[21%] place-items-center rounded-full border-[2.5px] border-ink bg-[var(--mh-orange)] p-2 text-center text-[clamp(0.55rem,1.3vw,0.78rem)] leading-tight font-extrabold uppercase" style={s("11%", "59%", "-12deg")}>
          My first hackathon
        </span>
        {/* Pixel heart */}
        <span className="mh-stk w-[10%]" style={s("45%", "66%", "0deg")}>
          <svg viewBox="0 0 7 6" className="w-full" shapeRendering="crispEdges" aria-hidden>
            <path d="M1 0h2v1h1V0h2v1h1v2H6v1H5v1H4v1H3V5H2V4H1V3H0V1h1z" fill="#ef3b2d" />
          </svg>
        </span>
        {/* Kingston */}
        <span className="mh-stk rounded-md border-[2.5px] border-ink bg-sky-light px-2.5 py-1 text-[clamp(0.6rem,1.4vw,0.85rem)] font-extrabold tracking-wide uppercase" style={s("62%", "78%", "3deg")}>
          Kingston ✦ {event.year}
        </span>
        {/* The empty slot */}
        <span className="mh-stk mh-slot grid aspect-square w-[20%] place-items-center rounded-2xl p-2 text-center text-[clamp(0.55rem,1.3vw,0.78rem)] leading-tight font-bold" style={s("40%", "6%", "-3deg")}>
          your sticker here?
        </span>
      </div>
      <div className="mh-base" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  7 · Where else MLH can help                                               */
/* -------------------------------------------------------------------------- */

const HELP = [
  {
    k: "Guide",
    d: "Share what works: judging, rules, code of conduct, submissions, team formation, demos, pacing and student safety.",
    c: "bg-sun",
  },
  { k: "Show up", d: "Send a coach, mentor, judge or speaker. Remote or in person.", c: "bg-mint" },
  {
    k: "Connect",
    d: "Where it fits, help us reach the developer tools, credits and partner resources MLH brings into hackathons.",
    c: "bg-sky-light",
  },
  {
    k: "Affiliate",
    d: "Help us understand whether there is an MLH structure that fits a secondary-school hackathon in Jamaica.",
    c: "bg-peach",
  },
];

function ElseWhere() {
  return (
    <section aria-labelledby="mh-else" className="lp-section bg-paper mh-paper">
      <div className="lp-wrap">
        <Label n="05">Where else MLH can help</Label>
        <h2 id="mh-else" className="mh-h mh-lg mt-6 max-w-[20ch]" data-reveal>
          We&rsquo;re doing the work. We&rsquo;d love the experience.
        </h2>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 print:grid-cols-4">
          {HELP.map((h, i) => (
            <li
              key={h.k}
              data-reveal="pop"
              style={{ "--reveal-delay": `${i * 80}ms`, "--reveal-rot": "0deg", "--hover-rot": i % 2 ? "1.5deg" : "-1.5deg" } as CSSProperties}
              className="sticker sticker-hover flex flex-col bg-cream p-6"
            >
              <span className={`mh-mono self-start rounded-md border-2 border-ink px-2.5 py-1 text-sm font-extrabold tracking-[0.14em] uppercase print:text-[1.15rem] ${h.c}`}>
                {h.k}
              </span>
              <p className="mt-4 text-[1.05rem] leading-snug text-ink-2 print:text-[1.4rem]">{h.d}</p>
            </li>
          ))}
        </ul>

        {/* The "not a funding gap" section is web-only; the PDF carries it here. */}
        <p className="hidden print:mt-10 print:block print:border-t print:border-[var(--lp-rule)] print:pt-5 print:text-[1.35rem] print:leading-snug">
          <strong>Not a funding ask.</strong> Hack 876 is already in active conversations with Jamaican companies about financial
          support. We&rsquo;re coming to MLH for expertise, culture, resources and a connection to the wider hackathon community.
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  8 · What we are not asking for (web only)                                 */
/* -------------------------------------------------------------------------- */

function NotFunding() {
  return (
    <section aria-labelledby="mh-not" className="lp-section lp-no-print border-y lp-rule">
      <div className="lp-wrap grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
        <div>
          <Label n="06">What we&rsquo;re not asking for</Label>
          <h2 id="mh-not" className="mh-h mh-lg mt-6 max-w-[16ch]" data-reveal>
            We&rsquo;re not coming to MLH with a funding gap.
          </h2>
        </div>
        <div className="lp-prose" data-reveal>
          <p>Hack 876 is already in active conversations with Jamaican companies about financial support for the event.</p>
          <p>Our reason for approaching MLH is different.</p>
          <p className="font-bold text-ink">Expertise. Culture. Resources. A connection to the wider hackathon community.</p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  9 · Closing                                                               */
/* -------------------------------------------------------------------------- */

function Closing() {
  return (
    <section aria-labelledby="mh-close" className="lp-section lp-close">
      <div className="lp-wrap flex flex-col items-center text-center">
        <DoctorBird className="w-28 sm:w-32 print:w-28" mood="happy" />
        <h2 id="mh-close" className="mh-h mh-lg mt-8 max-w-[20ch]" data-reveal>
          Help us give {STUDENTS} Jamaican students their first great hackathon.
        </h2>
        <div className="lp-prose mx-auto mt-8" data-reveal>
          <p>If there&rsquo;s a way for MLH to be part of Hack 876, we&rsquo;d love to figure out what that looks like.</p>
          <p>Mike, if Jamaica sounds like a good place to judge a hackathon, the door is very open.</p>
        </div>

        <div className="lp-no-print mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/partner" className="btn btn-primary">
            Let&rsquo;s talk <span aria-hidden>→</span>
          </Link>
          <a href={PDF} download={PDF_NAME} className="btn btn-secondary">
            Download brief
          </a>
        </div>

        <div className="mt-12 grid gap-1">
          <p className="text-lg font-extrabold">Stefen O. Ewers Jr.</p>
          <p className="text-ink-soft">Organizing Team, Hack 876</p>
          <p className="mh-label mt-3">Jamaica · {event.year}</p>
        </div>

        <p className="lp-note mx-auto mt-12 max-w-xl">
          This is a proposal. Hack 876 is not currently sponsored by, affiliated with or endorsed by Major League Hacking.
        </p>
      </div>
    </section>
  );
}
