import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { BirdMark, DoctorBird } from "@/components/art/DoctorBird";
import { Logo } from "@/components/art/Wordmark";
import { DownloadDeck } from "@/components/proposal/DownloadDeck";
import { DeviceArt } from "@/components/proposal/Illustrations";
import { Check, Kicker } from "@/components/proposal/primitives";
import { event, eventWhen, prizes } from "@/data/event";
import { inKind } from "@/data/sponsorship";
import "@/components/proposal/proposal.css";
import { OpeningSummary } from "@/components/proposal/PartnershipSections";

/*
 * Private prize-partnership proposal for MacSpot Jamaica (via Jordan Witter).
 * Deliberately short. No sponsorship tiers. Not linked from the public site;
 * noindex/nofollow here and via X-Robots-Tag in next.config.ts.
 */

const SPONSOR = "MacSpot Jamaica";
const DECK_LABEL = `Hack876 × ${SPONSOR}`;

export const metadata: Metadata = {
  title: { absolute: DECK_LABEL },
  description: "A private prize partnership proposal.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  openGraph: null,
  twitter: null,
};

/* Canonical numbers and prizes come from the event data. */
const byName = (n: string) => prizes.find((p) => p.name === n);
const WINNER = prizes.find((p) => p.place === 1)!;
const SECOND = prizes.find((p) => p.place === 2)!;
const THIRD = prizes.find((p) => p.place === 3)!;
const BEST_DESIGN = byName("Best Design");
const PEOPLES_CHOICE = prizes.find((p) => p.name.startsWith("People"));

/* First-party MacSpot source. */
/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

const SOURCES = [{ id: 1, org: "MacSpot Jamaica", label: "Home", href: "https://macspotjamaica.com/" }] as const;

export default function MacSpotOpportunityPage() {
  return (
    <div className="lp" style={{ "--lp-deck-label": `"${DECK_LABEL}"` } as CSSProperties}>
      <header className="lp-wrap flex items-center justify-between gap-4 py-5">
        <Link href="/" className="flex items-center gap-2 rounded-lg" aria-label="Hack876 home">
          <BirdMark className="h-6 w-10" />
          <Logo className="text-[1.5rem]" />
        </Link>
        <DownloadDeck href="/proposals/hack876-macspot-partnership-proposal.pdf" filename={`Hack876 x ${SPONSOR} - Prize Partnership Proposal.pdf`} />
      </header>

      <main id="main">
        <div className="lp-page">
          <OpeningSummary
            label={DECK_LABEL}
            docLabel="Private partnership proposal"
            org="MacSpot Jamaica"
            headline={`Put the tools in the hands of Jamaica’s next builders.`}
            highlight={`in the hands`}
            sub={`The strongest Hack876 teams should leave with technology that helps them keep building.`}
            brief={{
              fit: `MacSpot Jamaica sells the iPads, AirPods and accessories that are already on the Hack876 prize list.`,
              request: `Help with one prize: donating it, donating part of it, gift cards or store credit, a discount, or a contribution toward buying it.`,
              enables: `Winning students take home technology they can keep building with.`,
              outcome: `Recognition beside the specific prize MacSpot provides, a thank-you at the awards, and a place in the written recap.`,
              next: `A reply from Jordan on which prize, if any, makes sense for MacSpot.`,
            }}
          />
        </div>
        <div className="lp-page">
          <PrizeBoard />
        </div>
        <div className="lp-page">
          <NotFree />
        </div>
        <div className="lp-page">
          <WhatMacSpotGets />
        </div>
        <div className="lp-page">
          <Closing />
        </div>
      </main>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  02 The prize board (centrepiece)                                          */
/* -------------------------------------------------------------------------- */

type Slot = {
  option: string;
  title: string;
  art: "tablet" | "earbuds" | "card" | "ribbon";
  planned: string;
  proposed?: string;
  ways: string;
  recognition: string;
  tone: string;
};

function PrizeBoard() {
  const slots: Slot[] = [
    {
      option: "A",
      title: `${WINNER.name} Prize Partner`,
      art: "tablet",
      planned: WINNER.reward ?? "",
      ways: "Donate all four, contribute toward them, or supply them at partner pricing.",
      recognition: `${WINNER.name} prizes provided by ${SPONSOR}`,
      tone: "bg-sun-light",
    },
    {
      option: "B",
      title: `${SECOND.name} Prize Partner`,
      art: "earbuds",
      planned: SECOND.reward ?? "",
      ways: "Fully donated, partly subsidised, or supplied at partner pricing.",
      recognition: `${SECOND.name} prizes provided by ${SPONSOR}`,
      tone: "bg-sky-light",
    },
    {
      option: "C",
      title: `${THIRD.name} Gift Card Partner`,
      art: "card",
      planned: THIRD.reward ?? "",
      proposed: `${SPONSOR} gift cards or store credit, one per student, so each student picks something useful to them.`,
      ways: "",
      recognition: `${THIRD.name} prizes provided by ${SPONSOR}`,
      tone: "bg-paper",
    },
    {
      option: "D",
      title: "Special Award Partner",
      art: "ribbon",
      planned: BEST_DESIGN?.reward ?? "",
      proposed: `${BEST_DESIGN?.name ?? "Best Design"} or ${PEOPLES_CHOICE?.name ?? "People’s Choice"}, as ${SPONSOR} gift cards or store credit. The easiest, smallest way in.`,
      ways: "",
      recognition: `${BEST_DESIGN?.name ?? "Best Design"} presented by ${SPONSOR}`,
      tone: "bg-mint/70",
    },
  ];
  return (
    <section aria-labelledby="lp-board" className="lp-section lp-dense lp-center lp-grid-bg">
      <div className="lp-wrap">
        <Kicker n="01">The prize board</Kicker>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <h2 id="lp-board" className="lp-h2 max-w-[20ch]">
            Pick the slot that works for {SPONSOR}.
          </h2>
          <p className="max-w-sm text-ink-2">Planned prizes come straight from Hack876&rsquo;s current prize list. Every option is a real yes.</p>
        </div>

        <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4 print:mt-6 print:grid-cols-4 print:gap-4">
          {slots.map((s, i) => (
            <li
              key={s.option}
              className={`lp-keep sticker flex flex-col p-5 ${s.tone}`}
              style={{ rotate: `${[-1.2, 1, -0.8, 1.2][i]}deg` } as CSSProperties}
            >
              <div className="flex items-center justify-between">
                <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-ink bg-paper text-sm font-extrabold">{s.option}</span>
                <span className="text-xs font-extrabold tracking-[0.14em] text-ink-soft uppercase">Option {s.option}</span>
              </div>
              <DeviceArt kind={s.art} className="mx-auto mt-3 h-24 w-32 print:h-20" />
              <h3 className="lp-h3 mt-3">{s.title}</h3>
              <p className="mt-2 text-xs font-extrabold tracking-[0.14em] text-ink-soft uppercase">Currently planned</p>
              <p className="text-lg font-extrabold">{s.planned}</p>
              {s.proposed && <p className="mt-2 text-[0.95rem] leading-snug font-semibold text-ink-2">{s.proposed}</p>}
              {s.ways && <p className="mt-2 text-[0.95rem] leading-snug text-ink-2">{s.ways}</p>}
              <p className="mt-auto border-t-2 border-dashed border-ink/25 pt-3 text-sm font-extrabold">{s.recognition}</p>
            </li>
          ))}
        </ol>
        <p className="lp-note mt-6">
          Prize configuration can shift with pricing, availability and final team structure.
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  03 It doesn't have to be free                                             */
/* -------------------------------------------------------------------------- */

function NotFree() {
  return (
    <section aria-labelledby="lp-free" className="lp-section bg-paper">
      <div className="lp-wrap grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start print:grid-cols-2 print:gap-10">
        <div>
          <Kicker n="02">Another way to help</Kicker>
          <h2 id="lp-free" className="lp-h2 mt-6">
            It doesn&rsquo;t have to be free.
          </h2>
          <p className="lp-prose mt-8">
            If four iPads is too much, that is completely fine. One device helps. A discount helps. Four gift cards help. We
            would rather build something sensible with {SPONSOR} than force the partnership into a predetermined tier.
          </p>
          <p className="lp-note mt-4">{inKind.recognition}</p>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2 print:grid-cols-2">
          {[
            "Discounted devices",
            "Partner or wholesale-style pricing, where available",
            "Partly underwriting a device",
            "One or two devices instead of a whole team’s prizes",
            "Accessories bundled into another prize",
            "Gift cards or store credit",
            "A monetary contribution toward buying a prize",
            "Repair credits",
            "Another prize package MacSpot thinks makes sense",
          ].map((t) => (
            <li key={t} className="lp-keep flex gap-2.5 rounded-xl border-2 border-ink/70 bg-cream px-4 py-3 font-semibold">
              <Check className="mt-0.5 text-emerald-deep" />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  04 What MacSpot gets                                                      */
/* -------------------------------------------------------------------------- */

function WhatMacSpotGets() {
  const every = [
    "Recognition beside the specific prize you provide",
    "A thank-you during the awards ceremony",
    "A social media thank-you or prize reveal",
    "Inclusion in post-event recap material",
    "Your logo in the Hack876 partner section once confirmed",
  ];
  const major = [
    "Stronger visual recognition across event-day signage",
    "“Prizes provided by MacSpot Jamaica” wherever that prize appears",
    "Jordan or a MacSpot representative invited to present the award on stage",
  ];
  return (
    <section aria-labelledby="lp-gets" className="lp-section lp-dense lp-center">
      <div className="lp-wrap">
        <Kicker n="03">What MacSpot gets</Kicker>
        <h2 id="lp-gets" className="lp-h2 mt-6 max-w-[22ch]">
          Recognition that matches the contribution.
        </h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-2 print:mt-6 print:grid-cols-2">
          <div className="lp-keep rounded-2xl border-2 border-ink/70 bg-paper p-6">
            <p className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">Every prize partner</p>
            <ul className="mt-4 space-y-2.5">
              {every.map((t) => (
                <li key={t} className="flex gap-2.5 font-semibold">
                  <Check className="mt-0.5 text-emerald-deep" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="lp-keep rounded-2xl border-2 border-ink bg-ink p-6 text-cream shadow-[5px_6px_0_0_var(--color-emerald)]">
            <p className="text-xs font-extrabold tracking-[0.16em] text-sun uppercase">Plus, for a major device contribution</p>
            <p className="mt-1 text-sm text-cream/70">Such as the {WINNER.name} {WINNER.reward?.split(" per ")[0]}s</p>
            <ul className="mt-4 space-y-2.5">
              {major.map((t) => (
                <li key={t} className="flex gap-2.5 font-semibold">
                  <Check className="mt-0.5 text-sun" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="lp-note mt-5">No booths, activations or corporate programming required. The point is the prize in a student&rsquo;s hands.</p>
      </div>
    </section>
  );
}

function Closing() {
  return (
    <section aria-labelledby="lp-close" className="lp-section lp-close lp-grid-bg border-t lp-rule">
      <div className="lp-wrap grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center print:grid-cols-[1.25fr_0.75fr]">
        <div>
          <h2 id="lp-close" className="lp-marker text-[clamp(2.8rem,7vw,5.2rem)] leading-[1]">
            Pick a prize. Help a young builder take it home.
          </h2>
          <div className="lp-prose mt-8">
            <p className="font-bold text-ink">Jordan,</p>
            <p>We are not asking MacSpot to take on the event. We would simply love to find one piece of Hack876 that makes sense for you to own.</p>
            <p>
              That could be four iPads. It could be four AirPods. It could be a few gift cards. It could simply be helping us
              source the devices at a better price.
            </p>
            <p className="font-semibold text-ink">If there is a version that works for MacSpot, we would love to build it with you.</p>
          </div>
          <p className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-sun px-5 py-2.5 text-lg font-extrabold shadow-[3px_4px_0_0_var(--color-ink)]">
            Let&rsquo;s find the right prize. <span aria-hidden>→</span>
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div aria-hidden className="w-36 sm:w-44">
            <DoctorBird flutter={false} className="w-full" />
          </div>
          <Logo className="mt-4 text-[2.6rem]" />
          <p className="lp-marker mt-2 text-2xl">Build something that should exist.</p>
          <p className="mt-4 font-bold">Kingston, Jamaica · {eventWhen.short}
          {eventWhen.note}</p>
          <a href={event.siteUrl} className="mt-1 font-semibold text-emerald-deep underline decoration-2 underline-offset-4">
            {event.siteUrl.replace(/^https?:\/\/(www\.)?/, "")}
          </a>
          {event.contactEmail && (
            <a href={`mailto:${event.contactEmail}`} className="mt-1 font-semibold text-emerald-deep underline decoration-2 underline-offset-4">
              {event.contactEmail}
            </a>
          )}
        </div>
      </div>
      <footer className="lp-wrap mt-14 text-left print:mt-auto print:pt-6">
        <h2 className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">Source</h2>
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
        <p className="lp-note mt-4">A private prize partnership proposal prepared for {SPONSOR}, via Jordan Witter.</p>
      </footer>
    </section>
  );
}
