import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { BirdMark } from "@/components/art/DoctorBird";
import { Logo } from "@/components/art/Wordmark";
import { DownloadDeck } from "@/components/proposal/DownloadDeck";
import { DeliveryAndNext, DeliverySection, NextSection, OpeningSummary, SourcesFooter } from "@/components/proposal/PartnershipSections";
import { Check, Kicker, Lines, Ref } from "@/components/proposal/primitives";
import { BandStrip, BenefitsMatrix } from "@/components/proposal/Sponsorship";
import { schoolStatus } from "@/data/event";
import { budgetFollows, fill, schoolStatusLabel } from "@/data/partnership";
import { deckFormat, docType, isExploratory, pagePlan, showsBands as asksShowBands } from "@/data/sponsorDecks/framing";
import type { SponsorDeckData } from "@/data/sponsorDecks/types";
import { band, benefitNotes, directionNote, inKind, purposes } from "@/data/sponsorship";
import "@/components/proposal/proposal.css";

/*
 * The shared private partnership deck, driven by one SponsorDeckData entry.
 *
 * Reading order (see framing.ts for which pages each format gets):
 *   summary       the whole proposal on page one
 *   why           one or two verified facts, tied to the proposed activity
 *   request       what we ask, what it supports, what the partner receives
 *   delivery      why Hack876 can deliver
 *   next          reporting, the decision asked for, the contact
 *   appendix      contribution levels and sources
 * Shorter formats merge or drop pages. No page renders without content.
 */

/** The short name as it reads mid-sentence, or at the start of one. */
const nm = (deck: SponsorDeckData) => (deck.article ? `the ${deck.short}` : deck.short);
const Nm = (deck: SponsorDeckData) => (deck.article ? `The ${deck.short}` : deck.short);
const aOrAn = (word: string) => (/^[AEIOU]/i.test(word) ? "an" : "a");

/** Gold and Platinum requests wait on an approved budget. */
const needsBudget = (deck: SponsorDeckData) => deck.ask.lead === "band" && (deck.ask.band === "gold" || deck.ask.band === "platinum");

/** Whether a deck shows the cash ladder at all. */
const showsBands = (deck: SponsorDeckData) => asksShowBands(deck.ask);

export function deckPdf(deck: SponsorDeckData) {
  const brief = docType(deck) === "brief";
  return {
    href: `/proposals/hack876-${deck.pdfName ?? deck.slug}-partnership-${brief ? "brief" : "proposal"}.pdf`,
    filename: `Hack876 x ${deck.sponsor} - Partnership ${brief ? "Brief" : "Proposal"}.pdf`,
  };
}

export function deckMetadata(deck: SponsorDeckData): Metadata {
  return {
    title: { absolute: `Hack876 × ${deck.sponsor}` },
    description: docType(deck) === "brief" ? "A private partnership brief." : "A private partnership proposal.",
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

/** Shared facts ({students}, {venue}...) are filled into the copy that carries them. */
function filled(deck: SponsorDeckData): SponsorDeckData {
  const b = deck.brief;
  return {
    ...deck,
    hero: { ...deck.hero, sub: fill(deck.hero.sub) },
    why: { ...deck.why, tie: fill(deck.why.tie) },
    brief: { ...b, fit: fill(b.fit), request: fill(b.request), enables: fill(b.enables), outcome: fill(b.outcome), next: fill(b.next), logistics: b.logistics?.map(fill) },
    ask: { ...deck.ask, why: fill(deck.ask.why), receives: deck.ask.receives?.map(fill), inkind: deck.ask.inkind?.map(fill), budget: deck.ask.budget?.map((b) => ({ ...b, v: fill(b.v) })) },
    metrics: deck.metrics?.map((m) => ({ k: m.k, v: fill(m.v) })),
  };
}

export function SponsorDeck({ deck: raw }: { deck: SponsorDeckData }) {
  const deck = filled(raw);
  const label = `Hack876 × ${deck.sponsor}`;
  const pdf = deckPdf(deck);
  const plan = pagePlan(deck);
  const last = plan[plan.length - 1];
  const exploring = isExploratory(deck.ask);
  const cash = deck.ask.lead === "band" && deck.ask.band ? band(deck.ask.band) : null;
  const sources = <SourcesFooter sources={deck.sources} preparedFor={deck.preparedFor} />;
  const route = deck.pathsNote ? (
    <>
      {deck.pathsNote.text}
      <Ref id={deck.pathsNote.ref} />
    </>
  ) : undefined;
  const linked = deck.linkedSchool;
  const linkedNote = linked ? (
    <>
      {linked.text}
      {linked.ref && <Ref id={linked.ref} />} Status with Hack876: {schoolStatusLabel[schoolStatus(linked.school)].toLowerCase()}.
    </>
  ) : undefined;

  const pages: Record<string, (n: string) => ReactNode> = {
    why: (n) => <Why n={n} deck={deck} />,
    request: (n) => <Request n={n} deck={deck} />,
    supply: (n) => <Supply n={n} deck={deck} />,
    terms: (n) => <Terms n={n} deck={deck} />,
    explore: (n) => <Explore n={n} deck={deck} sources={sources} />,
    delivery: (n) => <DeliverySection n={n} linked={linked?.school} linkedNote={linkedNote} />,
    next: (n) => (
      <NextSection n={n} next={deck.brief.next} route={route} future={deck.future} closing={deck.closingLine} metrics={deck.metrics}>
        <div className="mt-6">
          <GroundRules rules={deck.groundRules.slice(0, 3)} />
        </div>
      </NextSection>
    ),
    deliverynext: (n) => (
      <DeliveryAndNext n={n} next={deck.brief.next} route={route} linkedNote={linkedNote} metrics={deck.metrics}>
        {last === "deliverynext" && sources}
      </DeliveryAndNext>
    ),
    appendix: (n) => <Appendix n={n} deck={deck} sources={sources} />,
  };

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
        <DownloadDeck href={pdf.href} filename={pdf.filename} label={docType(deck) === "brief" ? "Download Brief (PDF)" : undefined} />
      </header>

      <main id="main">
        <div className="lp-page">
          <OpeningSummary
            label={label}
            docLabel={exploring ? "Private exploratory brief" : `Private partnership ${docType(deck)}`}
            org={nm(deck)}
            headline={deck.hero.headline}
            highlight={deck.hero.highlight}
            sub={deck.hero.sub}
            brief={{
              ...deck.brief,
              fit: (
                <>
                  {deck.brief.fit}
                  {deck.brief.fitRef && <Ref id={deck.brief.fitRef} />}
                </>
              ),
            }}
            requestDetail={cash ? `${cash.name}: ${cash.range}. Any amount within the level is welcome.` : exploring ? deck.ask.recognition : undefined}
            outcomeLabel={exploring ? "What we hope to learn" : undefined}
            international={deck.audience === "international"}
          />
        </div>
        {plan.slice(1).map((key, i) => (
          <div key={key} className="lp-page">
            {pages[key](String(i + 1).padStart(2, "0"))}
          </div>
        ))}
      </main>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Why this partnership                                                      */
/* -------------------------------------------------------------------------- */

function Why({ n, deck }: { n: string; deck: SponsorDeckData }) {
  const { why, story } = deck;
  return (
    <section aria-labelledby="lp-why" className="lp-section lp-dense lp-center">
      <div className="lp-wrap">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14 print:grid-cols-[0.75fr_1.25fr] print:gap-[2.6rem]">
          <div>
            <Kicker n={n}>Why {nm(deck)}</Kicker>
            <h2 id="lp-why" className="lp-h2 mt-6">
              {why.headline}
            </h2>
            <div aria-hidden className="mt-3 h-1 w-16 rounded-full bg-[var(--deck-accent)]" />
            <p className="mt-6 text-[1.15rem] leading-snug font-bold text-emerald-deep print:text-[1.89rem]">{why.tie}</p>
          </div>
          <div>
            {why.mission && (
              <blockquote className="lp-keep rounded-2xl border-2 border-ink bg-paper p-5 print:p-[1.4rem]">
                <p className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">{why.mission.label}</p>
                <p className="mt-2 text-[1.12rem] leading-snug font-extrabold tracking-tight print:text-[1.77rem]">
                  &ldquo;{why.mission.quote}&rdquo;
                  <Ref id={why.mission.ref} />
                </p>
              </blockquote>
            )}
            <div className={`lp-prose ${why.mission ? "mt-5" : ""}`}>
              {why.points.slice(0, 3).map((p) => (
                <p key={p.text}>
                  {p.text}
                  <Ref id={p.ref} />
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t lp-rule pt-5 print:pt-[1.2rem]">
          <p className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">{story.kicker}</p>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 print:grid-cols-4 print:gap-[1rem]">
            {story.items.slice(0, 4).map((it) => (
              <li key={it.text} className="lp-keep rounded-2xl border lp-rule border-t-4 border-t-[var(--deck-accent)] bg-paper p-4 print:p-[1.1rem]">
                <p className="text-[0.68rem] font-extrabold tracking-[0.14em] text-ink-soft uppercase print:text-[1.06rem]">{it.label}</p>
                {it.title && <h3 className="mt-1 text-[1rem] leading-tight font-extrabold print:text-[1.47rem]">{it.title}</h3>}
                <p className="mt-1 text-[0.9rem] leading-snug text-ink-2 print:text-[1.27rem]">
                  {it.text}
                  <Ref id={it.ref} />
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  The request                                                               */
/* -------------------------------------------------------------------------- */

function UsesList({ deck, dark = false }: { deck: SponsorDeckData; dark?: boolean }) {
  return (
    <ul className="mt-2.5 space-y-1.5">
      {deck.ask.uses.map((u) => (
        <li key={u} className="flex gap-2.5 text-[0.98rem] leading-snug print:text-[1.44rem]">
          <Check className={`mt-0.5 h-4 w-4 ${dark ? "lp-accent text-sun" : "text-emerald-deep"}`} />
          <span>
            <strong>{purposes[u].label}.</strong> {purposes[u].text}
          </span>
        </li>
      ))}
    </ul>
  );
}

/** The partner's recognition, line by line, when the deck sets it. */
function Receives({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return (
    <ul className="mt-3 space-y-1.5">
      {items.map((b) => (
        <li key={b} className="flex gap-2.5 text-[0.98rem] leading-snug font-semibold print:text-[1.47rem]">
          <Check className={`mt-0.5 h-4 w-4 shrink-0 ${dark ? "lp-accent text-sun" : "text-emerald-deep"}`} />
          {b}
        </li>
      ))}
    </ul>
  );
}

function Presents({ deck, dark = false }: { deck: SponsorDeckData; dark?: boolean }) {
  if (!deck.ask.presents) return null;
  return (
    <p className={`mt-3 text-[0.92rem] leading-snug print:text-[1.32rem] ${dark ? "text-cream/80" : "text-ink-2"}`}>
      {Nm(deck)}&rsquo;s support could be recognised alongside the existing {deck.ask.presents} award, if it is still available. The judging panel decides the winner, and the
      award keeps its name.
    </p>
  );
}

function Request({ n, deck }: { n: string; deck: SponsorDeckData }) {
  const { ask } = deck;
  const cash = ask.band ? band(ask.band) : null;
  const name = ask.title ?? cash?.name;
  return (
    <section aria-labelledby="lp-invite" className="lp-section lp-dense lp-center lp-dark relative overflow-hidden">
      <div className="lp-wrap relative">
        <Kicker n={n}>Our request</Kicker>
        <h2 id="lp-invite" className="lp-h2 mt-6 max-w-[24ch]">
          {ask.headline ?? (name ? `Become ${aOrAn(name)} ${name} of the inaugural Hack876.` : ask.figure ? `${ask.figure}, through ${nm(deck)}\u2019s own process.` : deck.brief.request)}
        </h2>

        <div className="lp-keep mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-1 border-y lp-rule py-4 print:py-[1.1rem]">
          <p className="lp-num lp-accent text-[clamp(2rem,5.5vw,3.6rem)] text-sun print:text-[4.2rem]">{ask.figure ?? cash?.range ?? "In kind"}</p>
          <p className="text-sm font-bold tracking-[0.14em] uppercase sm:text-base print:text-[1.53rem]">{ask.recognition}</p>
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12 print:grid-cols-2 print:gap-[2.4rem]">
          <div>
            <Lines items={[ask.why]} />
            {!ask.budget?.length && (
              <>
                <p className="mt-5 text-xs font-extrabold tracking-[0.16em] text-cream/60 uppercase">What it helps support</p>
                <UsesList deck={deck} dark />
              </>
            )}
            {!ask.figure && <p className="lp-note mt-3">{directionNote} No contribution has to cover a whole cost.</p>}
            {needsBudget(deck) && <p className="mt-3 text-[0.95rem] leading-snug font-semibold text-cream print:text-[1.3rem]">{budgetFollows}</p>}
            {ask.restriction && (
              <p className="mt-3 rounded-xl border border-dashed border-cream/40 px-3.5 py-2.5 text-[0.92rem] leading-snug font-semibold print:text-[1.36rem]">{ask.restriction}</p>
            )}
            {ask.budget && ask.budget.length > 0 && (
              <div className="lp-keep mt-4">
                <p className="text-xs font-extrabold tracking-[0.16em] text-cream/60 uppercase">Proposed use of the grant</p>
                <dl className="mt-2 border-t border-cream/20">
                  {ask.budget.map((b) => (
                    <div key={b.k} className="grid grid-cols-[9rem_1fr] gap-3 border-b border-cream/20 py-1.5 print:grid-cols-[12rem_1fr]">
                      <dt className="text-[0.92rem] font-extrabold text-sun print:text-[1.2rem]">{b.k}</dt>
                      <dd className="text-[0.92rem] leading-snug text-cream/85 print:text-[1.2rem]">{b.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
          <figure className="lp-keep h-fit rounded-2xl border-2 border-dashed border-cream/40 p-6 print:p-[1.6rem]">
            <figcaption className="text-xs font-extrabold tracking-[0.16em] text-cream/60 uppercase">What {nm(deck)} would receive</figcaption>
            {ask.receives?.length ? (
              <Receives items={ask.receives} dark />
            ) : cash && !ask.figure ? (
              <ul className="mt-3 space-y-1.5">
                {cash.benefits.map((b) => (
                  <li key={b} className="flex gap-2.5 text-[0.98rem] leading-snug font-semibold print:text-[1.47rem]">
                    <Check className="lp-accent mt-0.5 h-4 w-4 text-sun" />
                    {b}
                  </li>
                ))}
                <li className="flex gap-2.5 text-[0.98rem] leading-snug font-semibold print:text-[1.47rem]">
                  <Check className="lp-accent mt-0.5 h-4 w-4 text-sun" />A written recap after the event
                </li>
              </ul>
            ) : (
              <p className="mt-3 text-[0.98rem] leading-snug font-semibold print:text-[1.47rem]">
                {showsBands(deck) ? "Recognition that matches the level agreed, set out in the appendix, and a written recap after the event." : `Recognition agreed with ${nm(deck)}, and a written recap after the event.`}
              </p>
            )}
            <Presents deck={deck} dark />
            {showsBands(deck) && <p className="lp-note mt-3">{benefitNotes[0]}</p>}
            {(ask.title || !ask.figure) && <p className="lp-note mt-1.5">{benefitNotes[benefitNotes.length - 1]}</p>}
          </figure>
        </div>

        {showsBands(deck) && (
          <div className="mt-6">
            <BandStrip dark recommended={ask.band} show={ask.bands} />
          </div>
        )}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  How it would work                                                         */
/* -------------------------------------------------------------------------- */

function GroundRules({ rules }: { rules: string[] }) {
  if (rules.length === 0) return null;
  return (
    <div className="lp-keep rounded-2xl border-2 border-dashed border-ink/40 p-5 print:p-[1.3rem]">
      <p className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">Ground rules we will hold ourselves to</p>
      <ul className={`mt-2.5 grid gap-x-6 gap-y-1.5 ${rules.length > 2 ? "sm:grid-cols-3 print:grid-cols-3" : "sm:grid-cols-2 print:grid-cols-2"}`}>
        {rules.map((t) => (
          <li key={t} className="text-[0.92rem] leading-snug font-semibold print:text-[1.32rem]">
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Supplier and tool requests                                                */
/* -------------------------------------------------------------------------- */

function WhyCompact({ deck }: { deck: SponsorDeckData }) {
  return (
    <div>
      <p className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">Why {nm(deck)}</p>
      <ul className="mt-2.5 space-y-2">
        {deck.why.points.slice(0, 3).map((p) => (
          <li key={p.text} className="text-[0.95rem] leading-snug text-ink-2 print:text-[1.39rem]">
            {p.text}
            <Ref id={p.ref} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Supply({ n, deck }: { n: string; deck: SponsorDeckData }) {
  const { ask, brief } = deck;
  const items = ask.inkind ?? [];
  return (
    <section aria-labelledby="lp-supply" className="lp-section lp-dense lp-center bg-paper">
      <div className="lp-wrap">
        <Kicker n={n}>The request</Kicker>
        <h2 id="lp-supply" className="lp-h2 mt-6 max-w-[32ch] print:!text-[3.4rem]">
          {ask.title ? `What ${aOrAn(ask.title)} ${ask.title} would provide.` : "What we are asking for, and how it would be used."}
        </h2>


        <div className="mt-7 grid gap-8 lg:grid-cols-2 lg:gap-12 print:grid-cols-2 print:gap-[2.4rem]">
          <div>
            <Lines items={[ask.why]} />
            {items.length > 0 && (
              <ul className="mt-4 space-y-2">
                {items.map((a) => (
                  <li key={a} className="flex items-start gap-2.5 text-[1rem] leading-snug font-semibold print:text-[1.53rem]">
                    <Check className="mt-0.5 shrink-0 text-emerald-deep" />
                    {a}
                  </li>
                ))}
              </ul>
            )}
            {brief.logistics && brief.logistics.length > 0 && (
              <div className="lp-keep mt-5 rounded-2xl border-2 border-ink bg-sun-light p-5 print:p-[1.3rem]">
                <p className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">Quantities, timing and delivery</p>
                <ul className="mt-2.5 space-y-1.5">
                  {brief.logistics.map((t) => (
                    <li key={t} className="text-[0.95rem] leading-snug font-semibold print:text-[1.39rem]">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="grid h-fit gap-5 print:gap-[1.3rem]">
            <WhyCompact deck={deck} />
            <div className="lp-keep rounded-2xl border-2 border-ink bg-mint/60 p-5 print:p-[1.3rem]">
              <p className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">What {nm(deck)} would receive</p>
              <p className="mt-2 text-[1.05rem] leading-snug font-extrabold print:text-[1.59rem]">{ask.recognition}</p>
              {ask.receives?.length ? <Receives items={ask.receives} /> : <p className="mt-1.5 text-[0.92rem] leading-snug text-ink-2 print:text-[1.32rem]">{inKind.recognition}</p>}
              <Presents deck={deck} />
              {showsBands(deck) && <p className="mt-2 text-[0.92rem] leading-snug text-ink-2 print:text-[1.32rem]">A monetary contribution is welcome instead. The levels are on the last page.</p>}
            </div>
            {ask.restriction && <p className="rounded-xl border border-dashed border-ink/40 px-3.5 py-2.5 text-[0.92rem] leading-snug font-semibold print:text-[1.36rem]">{ask.restriction}</p>}
          </div>
        </div>

        {deck.kind !== "tool" && !brief.logistics?.length && (
          <div className="mt-6">
            <GroundRules rules={deck.groundRules.slice(0, 2)} />
          </div>
        )}
      </div>
    </section>
  );
}

function Terms({ n, deck }: { n: string; deck: SponsorDeckData }) {
  const t = deck.tool;
  if (!t) return null;
  return (
    <section aria-labelledby="lp-terms" className="lp-section lp-dense lp-center">
      <div className="lp-wrap">
        <Kicker n={n}>Access, age and safeguards</Kicker>
        <h2 id="lp-terms" className="lp-h2 mt-6 max-w-[24ch]">
          {t.headline}
        </h2>
        <div className="mt-7 grid gap-8 lg:grid-cols-2 lg:gap-12 print:grid-cols-2 print:gap-[2.4rem]">
          <div>
            <Lines items={[t.what]} />
            <p className="mt-5 text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">Possible structures</p>
            <ul className="mt-2.5 space-y-2">
              {t.structures.map((s) => (
                <li key={s} className="flex items-start gap-2.5 text-[0.95rem] leading-snug print:text-[1.39rem]">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-deep" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <figure className="lp-keep h-fit rounded-2xl border-2 border-ink bg-paper p-6 print:p-[1.5rem]">
            <figcaption className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">Age and account terms</figcaption>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-2 print:text-[1.36rem] print:leading-snug">{t.ageNote}</p>
          </figure>
        </div>
        <div className="mt-6">
          <GroundRules rules={deck.groundRules} />
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Exploratory briefs                                                        */
/* -------------------------------------------------------------------------- */

/** An invitation to discuss fit. No amount, no ladder, no partner title. */
function Explore({ n, deck, sources }: { n: string; deck: SponsorDeckData; sources: ReactNode }) {
  const { ask } = deck;
  const asks = ask.inkind ?? [];
  return (
    <section aria-labelledby="lp-invite" className="lp-section lp-dense lp-center">
      <div className="lp-wrap">
        <Kicker n={n}>What we understand, and what we would ask</Kicker>
        <h2 id="lp-invite" className="lp-h2 mt-6 max-w-[24ch]">
          {ask.title ?? "An introduction, and a question about fit."}
        </h2>
        <div className="mt-7 grid gap-8 lg:grid-cols-2 lg:gap-12 print:grid-cols-2 print:gap-[2.4rem]">
          <div className="grid h-fit gap-5 print:gap-[1.3rem]">
            {ask.restriction && (
              <div className="lp-keep rounded-2xl border-2 border-ink bg-mint/60 p-5 print:p-[1.4rem]">
                <p className="text-xs font-extrabold tracking-[0.16em] text-ink-soft uppercase">What we understand from the published guidelines</p>
                <p className="mt-2 text-[0.98rem] leading-snug font-semibold print:text-[1.44rem]">{ask.restriction}</p>
              </div>
            )}
            <WhyCompact deck={deck} />
          </div>
          <div>
            <div className="lp-keep rounded-2xl border-2 border-ink bg-night p-6 text-cream print:p-[1.5rem]">
              <p className="text-xs font-extrabold tracking-[0.16em] text-sun uppercase">What we would like to ask</p>
              <ul className="mt-3 space-y-2">
                {asks.map((a) => (
                  <li key={a} className="flex items-start gap-2.5 text-[1rem] leading-snug font-semibold print:text-[1.51rem]">
                    <Check className="lp-accent mt-0.5 h-4 w-4 shrink-0 text-sun" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-4 text-[0.95rem] leading-snug text-ink-2 print:text-[1.39rem]">
              Areas a conversation could cover: {ask.uses.map((u) => purposes[u].label.toLowerCase()).join(", ")}. These are ideas to explore. None is an agreed activity or a
              funding request.
            </p>
            <p className="lp-note mt-3">This brief is not an application and does not assume Hack876 is eligible for funding. It asks whether a suitable route exists.</p>
          </div>
        </div>
        {sources}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Appendix                                                                  */
/* -------------------------------------------------------------------------- */

function Appendix({ n, deck, sources }: { n: string; deck: SponsorDeckData; sources: ReactNode }) {
  const levels = showsBands(deck);
  const supplier = deckFormat(deck) === "supplier";
  return (
    <section aria-labelledby="lp-appendix" className="lp-section lp-dense lp-center bg-cream-2">
      <div className="lp-wrap">
        <Kicker n={n}>Appendix</Kicker>
        <h2 id="lp-appendix" className="mt-4 text-[clamp(1.5rem,2.6vw,2.1rem)] leading-tight font-extrabold tracking-tight print:text-[2.2rem]">
          {levels ? (supplier ? "If a monetary contribution suits better: the levels." : "Contribution levels, and what each receives.") : "Sources."}
        </h2>
        {levels && (
          <div className="mt-6">
            <BenefitsMatrix recommended={deck.ask.band} show={deck.ask.bands} />
            <p className="lp-note mt-2">
              <strong>{inKind.name}:</strong> {inKind.text} {inKind.recognition}
            </p>
          </div>
        )}
        {sources}
      </div>
    </section>
  );
}
