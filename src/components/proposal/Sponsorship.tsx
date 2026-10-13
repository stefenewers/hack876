import type { ReactNode } from "react";
import { Check, Kicker } from "@/components/proposal/primitives";
import { prizes } from "@/data/event";
import { bands, benefitNotes, directionNote, inKind, prizeSupport, purposes, type BandKey, type PurposeKey } from "@/data/sponsorship";

/*
 * Shared sponsorship display, used by the SponsorDeck template and by the
 * hand-built opportunity pages. All wording and numbers come from
 * src/data/sponsorship.ts, so every deck states the same structure.
 */

/** A student prize as an item, without its value: "US$150 gift card per student" becomes "Gift card per student". */
export function prizeItem(reward: string | null) {
  if (!reward) return "";
  const item = reward.replace(/US\$[\d,]+\s*/g, "");
  return item[0].toUpperCase() + item.slice(1);
}

/** The contribution ladder in one row. Use at the first sponsorship invitation. */
export function BandStrip({ recommended, show, dark = false, label }: { recommended?: BandKey; show?: BandKey[]; dark?: boolean; label?: string }) {
  const list = bands.filter((b) => !show || show.includes(b.key));
  if (list.length === 0) return null;
  return (
    <div className="lp-keep">
      <p className={`text-xs font-extrabold tracking-[0.16em] uppercase ${dark ? "text-cream/60" : "text-ink-soft"}`}>
        {label ?? "Contribution levels. Any amount within a level is welcome."}
      </p>
      <ol className={`mt-3 grid gap-2 sm:grid-cols-2 print:grid-cols-4 ${list.length > 2 ? "lg:grid-cols-4" : ""}`}>
        {list.map((b) => {
          const on = b.key === recommended;
          return (
            <li
              key={b.key}
              className={`rounded-xl border-2 px-3.5 py-2.5 ${
                on ? "border-sun bg-sun text-ink" : dark ? "border-cream/25 bg-white/[0.04] text-cream" : "border-ink/20 bg-paper text-ink"
              }`}
            >
              <p className="flex flex-wrap items-center justify-between gap-x-2 text-[0.95rem] font-extrabold">
                {b.name}
                {on && <span className="rounded-full bg-ink px-2 py-0.5 text-[0.6rem] font-extrabold tracking-[0.1em] text-cream uppercase">Suggested</span>}
              </p>
              <p className={`mt-0.5 text-[0.86rem] font-semibold ${on ? "text-ink" : dark ? "text-cream/75" : "text-ink-2"}`}>{b.range}</p>
            </li>
          );
        })}
      </ol>
      <p className={`mt-2.5 text-[0.86rem] leading-snug ${dark ? "text-cream/70" : "text-ink-soft"}`}>
        <strong className={dark ? "text-cream" : "text-ink"}>{inKind.name}:</strong> {inKind.examples.join(", ").toLowerCase()}, and contributions below J$50,000.
      </p>
    </div>
  );
}

/** What each level receives. Proposed, not confirmed. */
export function BenefitsMatrix({ recommended, show }: { recommended?: BandKey; show?: BandKey[] }) {
  const list = bands.filter((b) => !show || show.includes(b.key));
  return (
    <div>
      <ul className={`grid gap-3 sm:grid-cols-2 print:grid-cols-4 ${list.length > 2 ? "lg:grid-cols-4" : ""}`}>
        {list.map((b) => {
          const on = b.key === recommended;
          return (
            <li key={b.key} className={`lp-keep flex flex-col rounded-2xl p-5 ${on ? "border-2 border-ink bg-sun-light" : "border lp-rule bg-paper"}`}>
              <p className="text-lg font-extrabold">{b.name}</p>
              <p className="mt-0.5 text-[0.92rem] font-bold text-ink-2">{b.range}</p>
              {on && <p className="mt-1 text-[0.66rem] font-extrabold tracking-[0.14em] text-ink-soft uppercase">Our suggestion</p>}
              <ul className="mt-3 space-y-1.5 text-[0.94rem] leading-snug">
                {b.benefits.map((t) => (
                  <li key={t} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-emerald-deep" />
                    {t}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
      <div className="lp-note mt-4 space-y-1">
        {benefitNotes.map((n) => (
          <p key={n}>{n}</p>
        ))}
      </div>
    </div>
  );
}

/** What a contribution could help support, and how to help with a physical prize. */
export function SupportUses({ uses, restriction, children }: { uses: PurposeKey[]; restriction?: string; children?: ReactNode }) {
  const showPrizes = uses.includes("prizes");
  const podium = prizes.filter((p) => p.place).sort((a, b) => a.place! - b.place!);
  return (
    <div className="grid gap-5 lg:grid-cols-2 print:grid-cols-2">
      <div className="lp-keep rounded-2xl border lp-rule bg-paper p-6">
        <p className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">What a contribution could support</p>
        <ul className="mt-3 space-y-2">
          {uses.map((u) => (
            <li key={u} className="flex gap-2.5 text-[0.98rem] leading-snug">
              <Check className="mt-0.5 h-4 w-4 text-emerald-deep" />
              <span>
                <strong>{purposes[u].label}.</strong> {purposes[u].text}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[0.95rem] leading-snug text-ink-2">{directionNote} No contribution has to cover a whole cost.</p>
        {restriction && <p className="mt-3 rounded-xl border border-dashed border-ink/40 px-3.5 py-2.5 text-[0.92rem] leading-snug font-semibold">{restriction}</p>}
      </div>

      <div className="flex flex-col gap-5">
        {showPrizes && (
          <div className="lp-keep rounded-2xl border lp-rule bg-paper p-6">
            <p className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">Ways to help with a prize</p>
            <p className="mt-2 text-[0.95rem] leading-snug text-ink-2">
              The planned prizes are {podium.map((p) => prizeItem(p.reward).toLowerCase().replace("ipad", "iPad").replace("airpods pro", "AirPods Pro")).join("; ")}. Any of these helps:
            </p>
            <ul className="mt-3 grid gap-1.5 sm:grid-cols-2 print:grid-cols-2">
              {prizeSupport.map((t) => (
                <li key={t} className="flex gap-2 text-[0.94rem] leading-snug font-semibold">
                  <Check className="mt-0.5 h-4 w-4 text-emerald-deep" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="lp-keep rounded-2xl border-2 border-ink bg-mint/60 p-6">
          <p className="text-lg font-extrabold">{inKind.name}</p>
          <p className="mt-1 text-[0.95rem] leading-snug text-ink-2">
            For {inKind.examples.join(", ").toLowerCase()}, and for contributions below J$50,000.
          </p>
          <p className="mt-2 text-[0.88rem] leading-snug text-ink-soft">{inKind.recognition}</p>
        </div>
        {children}
      </div>
    </div>
  );
}

/** A full "levels and recognition" slide. */
export function LevelsSection({ n, heading, lead, recommended, show }: { n: string; heading: string; lead?: string; recommended?: BandKey; show?: BandKey[] }) {
  return (
    <section aria-labelledby="lp-levels" className="lp-section bg-cream-2">
      <div className="lp-wrap">
        <Kicker n={n}>Contribution levels</Kicker>
        <h2 id="lp-levels" className="lp-h2 mt-6 max-w-[24ch]">
          {heading}
        </h2>
        {lead && <p className="lp-prose mt-4">{lead}</p>}
        <div className="mt-8 print:mt-5">
          <BenefitsMatrix recommended={recommended} show={show} />
        </div>
      </div>
    </section>
  );
}

/** A full "what it supports" slide. `children` adds a sponsor-specific card, such as a proposed award. */
export function SupportSection({ n, heading, uses, restriction, children }: { n: string; heading: string; uses: PurposeKey[]; restriction?: string; children?: ReactNode }) {
  return (
    <section aria-labelledby="lp-support" className="lp-section">
      <div className="lp-wrap">
        <Kicker n={n}>Where a contribution goes</Kicker>
        <h2 id="lp-support" className="lp-h2 mt-6 max-w-[24ch]">
          {heading}
        </h2>
        <div className="mt-8 print:mt-5">
          <SupportUses uses={uses} restriction={restriction}>
            {children}
          </SupportUses>
        </div>
      </div>
    </section>
  );
}

/** The levels below Platinum, plus in-kind, as rows for a partnership summary. */
export function lowerLevels(extra: { name: string; amount: string; text: string }[] = []) {
  return [
    ...bands
      .filter((b) => b.key !== "platinum")
      .reverse()
      .map((b) => ({ name: b.name, amount: b.short, text: "Any amount within this level." })),
    ...extra,
    { name: inKind.name, amount: "In kind", text: `${inKind.examples.join(", ")}, and contributions below J$50,000.` },
  ];
}

/** A proposed, sponsor-specific award. Always labelled as an idea. */
export function AwardIdea({ name, text }: { name: string; text: string }) {
  return (
    <div className="lp-keep rounded-2xl border-2 border-dashed border-ink/40 p-5">
      <p className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">An idea, not yet a Hack876 award</p>
      <p className="mt-2 text-lg font-extrabold">{name}</p>
      <p className="mt-1 text-[0.95rem] leading-snug text-ink-2">{text}</p>
    </div>
  );
}
