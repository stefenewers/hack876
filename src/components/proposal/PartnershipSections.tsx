import type { ReactNode } from "react";
import { DoctorBird } from "@/components/art/DoctorBird";
import { TailLine } from "@/components/art/Marks";
import { Check, Kicker } from "@/components/proposal/primitives";
import { schools, schoolStatus, type School } from "@/data/event";
import { contact, deliveryFacts, eventFacts, reporting, reportingNote, safeguards, schoolCounts, schoolStatusLabel, whatItIs } from "@/data/partnership";

/*
 * Sections every partnership deck shares, whether it is rendered by the
 * SponsorDeck template or hand-built. Each one is a single print page.
 *
 *   OpeningSummary   the whole proposal on page one
 *   DeliverySection  why Hack876 can deliver
 *   NextSection      what we report, the decision asked for, who to contact
 *   DeliveryAndNext  the two above on one page, for shorter decks
 *   SourcesFooter    numbered sources, kept small
 *
 * Shared facts come from src/data/partnership.ts, never from a deck.
 */

export type Brief = {
  fit: ReactNode;
  request: ReactNode;
  enables: ReactNode;
  outcome: ReactNode;
  next: ReactNode;
};

function Highlighted({ text, highlight }: { text: string; highlight?: string }) {
  const i = highlight ? text.indexOf(highlight) : -1;
  if (i < 0 || !highlight) return <>{text}</>;
  /* Punctuation right after the highlight stays on its line. */
  const rest = text.slice(i + highlight.length);
  const punct = /^[.,!?]/.test(rest) ? rest[0] : "";
  return (
    <>
      {text.slice(0, i)}
      <span className="whitespace-nowrap">
        <span className="relative inline-block text-emerald-deep">
          {highlight}
          <TailLine draw={false} className="absolute -bottom-1.5 left-0 h-3 w-full" />
        </span>
        {punct}
      </span>
      {rest.slice(punct.length)}
    </>
  );
}

function ContactLine({ dark = false }: { dark?: boolean }) {
  const link = `font-bold underline decoration-2 underline-offset-2 ${dark ? "text-sun" : "text-emerald-deep"}`;
  return (
    <>
      {contact.names.join(" and ")}, Hack876 organisers
      {contact.email && (
        <>
          {" · "}
          <a href={`mailto:${contact.email}`} className={link}>
            {contact.email}
          </a>
        </>
      )}
    </>
  );
}

/** Page one. A recipient who reads only this page knows what is being asked and why. */
export function OpeningSummary({
  label,
  docLabel,
  org,
  headline,
  highlight,
  sub,
  brief,
  requestDetail,
  outcomeLabel,
}: {
  /** "Hack876 × Sponsor" */
  label: string;
  /** e.g. "Private partnership proposal" */
  docLabel: string;
  /** The organisation as it reads mid-sentence, e.g. "the JN Foundation". */
  org: string;
  headline: string;
  highlight?: string;
  sub?: string;
  brief: Brief;
  /** A short line under the request, such as the level's range. */
  requestDetail?: ReactNode;
  /** Defaults to "What {org} receives". Foundations usually "achieve" something instead. */
  outcomeLabel?: string;
}) {
  const card = "lp-keep rounded-2xl border lp-rule bg-paper p-5 print:p-[1.25rem]";
  const cap = "text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase";
  const body = "mt-2 text-[1.02rem] leading-snug text-ink-2 print:text-[1.45rem]";
  return (
    <section aria-labelledby="lp-hero-title" className="lp-hero lp-summary lp-grid-bg relative overflow-hidden border-y lp-rule">
      <div className="lp-wrap w-full pt-10 pb-10 sm:pt-14 print:flex print:min-h-[7.3in] print:flex-col print:justify-center print:py-0">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-bold tracking-[0.16em] text-ink-soft uppercase">{label}</p>
          <p className="inline-flex items-center gap-2 rounded-full border lp-rule bg-paper px-3 py-1 text-xs font-bold tracking-[0.12em] text-ink-soft uppercase">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[var(--deck-accent,var(--color-emerald))]" />
            {docLabel}
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-12 print:mt-[1.8rem] print:grid-cols-[0.92fr_1.08fr] print:gap-[2.6rem]">
          <div className="relative">
            <h1 id="lp-hero-title" className="lp-h2 max-w-[20ch] print:!text-[3.3rem]">
              <Highlighted text={headline} highlight={highlight} />
            </h1>
            {sub && <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-2 print:mt-[1.4rem] print:text-[1.55rem] print:leading-snug">{sub}</p>}

            <div className="lp-keep mt-7 rounded-2xl border-2 border-ink bg-cream p-5 print:mt-[1.8rem] print:p-[1.25rem]">
              <p className={cap}>What Hack876 is</p>
              <p className={body}>{whatItIs}</p>
              <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-1.5 sm:grid-cols-2 print:grid-cols-2">
                {eventFacts.map((f) => (
                  <div key={f.label} className="text-[0.95rem] leading-snug print:text-[1.32rem]">
                    <dt className="inline font-extrabold">{f.label}: </dt>
                    <dd className="inline text-ink-2">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div aria-hidden className="pointer-events-none absolute -bottom-14 right-2 hidden w-20 opacity-90 print:block print:w-[5.2rem]">
              <DoctorBird flutter={false} className="w-full" />
            </div>
          </div>

          <div className="grid gap-3 print:gap-[1rem]">
            <div className={card}>
              <p className={cap}>Why {org}</p>
              <p className={body}>{brief.fit}</p>
            </div>
            <div className="lp-keep rounded-2xl border-2 border-ink bg-night p-5 text-cream print:p-[1.25rem]">
              <p className="text-xs font-extrabold tracking-[0.16em] text-sun uppercase">What we are asking</p>
              <p className="mt-2 text-[1.12rem] leading-snug font-bold print:text-[1.66rem]">{brief.request}</p>
              {requestDetail && <p className="mt-1.5 text-[0.95rem] font-semibold text-cream/75 print:text-[1.32rem]">{requestDetail}</p>}
            </div>
            <div className="grid gap-3 sm:grid-cols-2 print:grid-cols-2 print:gap-[1rem]">
              <div className={card}>
                <p className={cap}>What it makes possible</p>
                <p className={body}>{brief.enables}</p>
              </div>
              <div className={card}>
                <p className={cap}>{outcomeLabel ?? `What ${org} receives`}</p>
                <p className={body}>{brief.outcome}</p>
              </div>
            </div>
            <div className="lp-keep rounded-2xl border-2 border-ink bg-sun-light p-5 print:p-[1.25rem]">
              <p className={cap}>The next step</p>
              <p className="mt-2 text-[1.02rem] leading-snug font-semibold print:text-[1.45rem]">{brief.next}</p>
              <p className="mt-2 text-[0.92rem] leading-snug text-ink-2 print:text-[1.27rem]">
                <ContactLine />
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const pill: Record<ReturnType<typeof schoolStatus>, string> = {
  confirmed: "border-ink bg-mint text-emerald-dark",
  talks: "border-ink/60 bg-sun-light text-ink",
  pending: "border-ink/25 bg-transparent text-ink-soft",
};

/** The school network with an honest status on every school. */
export function SchoolStatusList({ linked, compact = false }: { linked?: School; compact?: boolean }) {
  return (
    <div>
      <ul className={`grid grid-cols-1 gap-1.5 sm:grid-cols-2 print:grid-cols-1 ${compact ? "print:gap-[0.4rem]" : ""}`}>
        {schools.map((s) => {
          const st = schoolStatus(s);
          return (
            <li
              key={s}
              className={`flex items-center justify-between gap-2 rounded-xl border px-3.5 py-2 text-[0.95rem] font-semibold print:px-[1rem] print:py-[0.4rem] print:text-[1.25rem] ${linked === s ? "border-2 border-ink bg-paper" : "lp-rule bg-cream"}`}
            >
              <span className="min-w-0 [overflow-wrap:normal]">{s}</span>
              <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[0.62rem] font-extrabold tracking-[0.08em] uppercase print:text-[0.98rem] ${pill[st]}`}>{schoolStatusLabel[st]}</span>
            </li>
          );
        })}
      </ul>
      <p className="lp-note mt-3">
        {schoolCounts.confirmed} confirmed, {schoolCounts.talks} in talks, {schoolCounts.pending} not yet confirmed. This is the network where the Hack876 team has
        relationships. It is not a list of confirmed participants, and it is not an exclusive eligibility list.
      </p>
    </div>
  );
}

function Facts({ items }: { items: { label: string; text: string }[] }) {
  return (
    <dl className="border-t lp-rule">
      {items.map((f) => (
        <div key={f.label} className="lp-keep grid grid-cols-[7.2rem_1fr] gap-3 border-b lp-rule py-2.5 print:grid-cols-[11.5rem_1fr] print:py-[0.75rem]">
          <dt className="text-xs font-extrabold tracking-[0.14em] text-emerald-deep uppercase print:text-[1.2rem]">{f.label}</dt>
          <dd className="text-[0.98rem] leading-snug text-ink-2 print:text-[1.5rem]">{f.text}</dd>
        </div>
      ))}
    </dl>
  );
}

function Safeguards() {
  return (
    <div className="lp-keep rounded-2xl border-2 border-dashed border-ink/40 p-5 print:p-[1.3rem]">
      <p className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">Safeguards. Many participants are minors.</p>
      <ul className="mt-2.5 grid gap-x-6 gap-y-1.5 sm:grid-cols-2 print:grid-cols-2">
        {safeguards.map((t) => (
          <li key={t} className="text-[0.92rem] leading-snug font-semibold print:text-[1.34rem]">
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Why Hack876 can deliver. A full page, for longer proposals. */
export function DeliverySection({ n, linked, linkedNote }: { n: string; linked?: School; linkedNote?: ReactNode }) {
  return (
    <section aria-labelledby="lp-delivery" className="lp-section lp-dense lp-center">
      <div className="lp-wrap">
        <Kicker n={n}>Why Hack876 can deliver</Kicker>
        <h2 id="lp-delivery" className="lp-h2 mt-6 max-w-[24ch]">
          A first-year event, with the essentials in place.
        </h2>
        <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-12 print:grid-cols-2 print:gap-[2.4rem]">
          <Facts items={deliveryFacts} />
          <div>
            <p className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">School network and status</p>
            <div className="mt-3">
              <SchoolStatusList linked={linked} compact />
            </div>
            {linkedNote && <p className="mt-3 text-[0.95rem] leading-snug text-ink-2 print:text-[1.38rem]">{linkedNote}</p>}
          </div>
        </div>
        <div className="mt-6">
          <Safeguards />
        </div>
      </div>
    </section>
  );
}

function ReportList() {
  return (
    <div>
      <p className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">What you would receive afterwards: a written recap</p>
      <ul className="mt-3 space-y-1.5">
        {reporting.map((t) => (
          <li key={t} className="flex gap-2.5 text-[0.98rem] leading-snug font-semibold print:text-[1.5rem]">
            <Check className="mt-0.5 h-4 w-4 text-emerald-deep" />
            {t}
          </li>
        ))}
      </ul>
      <p className="lp-note mt-3">{reportingNote}</p>
    </div>
  );
}

function DecisionCard({ next, route }: { next: ReactNode; route?: ReactNode }) {
  return (
    <div className="lp-keep rounded-2xl border-2 border-ink bg-night p-6 text-cream print:p-[1.6rem]">
      <p className="text-xs font-extrabold tracking-[0.16em] text-sun uppercase">The decision we are asking for</p>
      <p className="mt-2.5 text-[1.12rem] leading-snug font-bold print:text-[1.8rem]">{next}</p>
      {route && <p className="mt-3 text-[0.95rem] leading-snug text-cream/80 print:text-[1.42rem]">{route}</p>}
      <p className="mt-4 border-t border-cream/20 pt-3 text-[0.95rem] leading-snug text-cream/90 print:text-[1.42rem]">
        <span className="font-extrabold">Your contact: </span>
        <ContactLine dark />
      </p>
    </div>
  );
}

/** What we report, the decision requested and the contact. A full page, for longer proposals. */
export function NextSection({
  n,
  next,
  route,
  future,
  closing,
  children,
}: {
  n: string;
  next: ReactNode;
  /** How this organisation takes requests, if it has said. */
  route?: ReactNode;
  /** Possibilities for later years. Shown as possibilities, never commitments. */
  future?: string[];
  closing?: string;
  children?: ReactNode;
}) {
  return (
    <section aria-labelledby="lp-next" className="lp-section lp-dense lp-center lp-grid-bg">
      <div className="lp-wrap">
        <Kicker n={n}>Evidence and next decision</Kicker>
        <h2 id="lp-next" className="lp-h2 mt-6 max-w-[24ch]">
          What you would see afterwards, and what we need from you now.
        </h2>
        <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-12 print:grid-cols-2 print:gap-[2.4rem]">
          <div>
            <ReportList />
            {future && future.length > 0 && (
              <div className="lp-keep mt-6 rounded-2xl border border-dashed border-ink/40 p-5 print:p-[1.3rem]">
                <p className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">Possible later, only if both sides find it valuable. Not commitments.</p>
                <ul className="mt-2.5 space-y-1">
                  {future.slice(0, 4).map((t) => (
                    <li key={t} className="text-[0.92rem] leading-snug text-ink-2 print:text-[1.34rem]">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div>
            <DecisionCard next={next} route={route} />
            {closing && <p className="mt-5 text-[1.05rem] leading-snug font-bold text-emerald-deep print:text-[1.68rem]">{closing}</p>}
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}

/** Delivery, reporting and the next decision on one page, for shorter decks. `children` carries the sources. */
export function DeliveryAndNext({
  n,
  next,
  route,
  linkedNote,
  children,
}: {
  n: string;
  next: ReactNode;
  route?: ReactNode;
  /** A documented tie between the organisation and one school in the network. */
  linkedNote?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section aria-labelledby="lp-next" className="lp-section lp-dense lp-center lp-grid-bg">
      <div className="lp-wrap">
        <Kicker n={n}>Delivery and next decision</Kicker>
        <h2 id="lp-next" className="lp-h2 mt-6 max-w-[26ch]">
          Who is running it, and what we need from you.
        </h2>
        <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-12 print:grid-cols-2 print:gap-[2.4rem]">
          <div>
            <Facts items={deliveryFacts.slice(0, 4)} />
            <p className="lp-note mt-3">
              Schools: {schoolCounts.confirmed} confirmed, {schoolCounts.talks} in talks, {schoolCounts.pending} not yet confirmed, from a network of {schoolCounts.total} in
              Kingston. {safeguards[0]} {safeguards[1]}
            </p>
            {linkedNote && <p className="mt-3 text-[0.95rem] leading-snug text-ink-2 print:text-[1.3rem]">{linkedNote}</p>}
          </div>
          <div>
            <DecisionCard next={next} route={route} />
            <div className="mt-5">
              <ReportList />
            </div>
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}

export type Source = { id: number; org: string; label: string; href: string };

/** Numbered sources, subordinate to the proposal. */
export function SourcesFooter({ sources, preparedFor }: { sources: readonly Source[]; preparedFor?: string }) {
  return (
    <footer className="mt-8 border-t lp-rule pt-4 print:!mt-[0.7rem] print:pt-[0.5rem]">
      <h3 className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">Sources</h3>
      <ol className="mt-2 grid gap-x-8 gap-y-1 lg:grid-cols-2 print:grid-cols-3 print:gap-x-[1.6rem]">
        {sources.map((s) => (
          <li key={s.id} id={`source-${s.id}`} className="scroll-mt-6 text-[0.8rem] leading-snug text-ink-soft print:text-[1.1rem]">
            <span className="font-bold">{s.id}.</span> {s.org}, &ldquo;{s.label}.&rdquo;{" "}
            <a href={s.href} className="break-all underline decoration-ink/30 underline-offset-2 hover:decoration-ink">
              {s.href.replace("https://", "")}
            </a>
          </li>
        ))}
      </ol>
      {preparedFor && <p className="mt-3 text-[0.8rem] text-ink-soft print:text-[1.1rem]">{preparedFor}</p>}
    </footer>
  );
}
