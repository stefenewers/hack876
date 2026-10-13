import { Check, Kicker } from "@/components/proposal/primitives";
import { bands, benefitNotes, inKind, type BandKey } from "@/data/sponsorship";

/*
 * Shared sponsorship display, used by the SponsorDeck template and by the
 * hand-built opportunity pages. All wording and numbers come from
 * src/data/sponsorship.ts, so every deck states the same structure.
 */

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

/** Purpose wording for exploratory briefs, where nothing is being contributed yet. */
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

