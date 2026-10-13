"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { readinessHelp, readinessLabel, type DeckCategory, type DeckEntry, type Readiness } from "@/data/sponsorDecks/registry";

/*
 * Search and filter over the deck registry. Everything shown comes from
 * src/data/sponsorDecks/registry.ts.
 *
 * Readiness is about the proposal, not the organisation: no entry says whether
 * anyone has been contacted or has agreed. A held proposal offers no link or
 * PDF here. That is a prompt to the person sharing, not access control.
 */

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9\s]/g, " ");

const READINESS: Readiness[] = ["ready", "intro", "hold"];
const badge: Record<Readiness, string> = {
  ready: "border-ink bg-mint text-emerald-dark",
  intro: "border-ink bg-sun-light text-ink",
  hold: "border-ink/50 bg-transparent text-ink-soft",
};
const chip = (on: boolean) =>
  `shrink-0 rounded-full border-2 px-3.5 py-1.5 text-sm font-bold whitespace-nowrap transition-colors ${on ? "border-ink bg-ink text-cream" : "border-ink/25 bg-paper hover:border-ink"}`;

export function PartnerHub({ decks, categories, siteUrl }: { decks: DeckEntry[]; categories: readonly DeckCategory[]; siteUrl: string }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<DeckCategory | "all">("all");
  /* Opens on what is safe to forward. */
  const [readiness, setReadiness] = useState<Readiness | "all">("ready");
  const [copied, setCopied] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const counts = useMemo(() => Object.fromEntries(READINESS.map((r) => [r, decks.filter((d) => d.readiness === r).length])) as Record<Readiness, number>, [decks]);

  const results = useMemo(() => {
    const words = norm(query).split(/\s+/).filter(Boolean);
    return decks
      .filter((d) => readiness === "all" || d.readiness === readiness)
      .filter((d) => category === "all" || d.category === category)
      .filter((d) => {
        /* Match on the organisation's name and aliases, with dots and spaces ignored ("ncb" finds "N.C.B."). */
        const text = norm(`${d.name} ${d.aka ?? ""}`);
        const squashed = text.replace(/\s+/g, "");
        return words.every((w) => text.includes(w) || squashed.includes(w));
      })
      .sort((a, b) => a.name.replace(/^The /, "").localeCompare(b.name.replace(/^The /, "")));
  }, [decks, query, category, readiness]);

  const copy = async (d: DeckEntry) => {
    if (d.readiness === "hold") return;
    const url = `${siteUrl}${d.route}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(d.route);
      setStatus(`Link to the ${d.name} proposal copied.`);
    } catch {
      setCopied(null);
      setStatus(`Could not copy automatically. The link is ${url}`);
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setCopied(null);
      setStatus("");
    }, 2500);
  };

  const filtered = query.trim() !== "" || category !== "all" || readiness !== "ready";
  const off = "btn btn-secondary btn-sm cursor-not-allowed opacity-45";

  return (
    <div>
      <div className="rounded-2xl border-2 border-ink bg-paper p-4 sm:p-5">
        <label htmlFor="hub-q" className="block text-sm font-extrabold">
          Search by company or organisation
        </label>
        <div className="relative mt-2">
          <svg viewBox="0 0 20 20" aria-hidden className="pointer-events-none absolute top-1/2 left-3.5 h-5 w-5 -translate-y-1/2 text-ink-soft">
            <path d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Zm7.5 13-3.6-3.6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            id="hub-q"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. Sagicor"
            autoComplete="off"
            enterKeyHint="search"
            aria-describedby="hub-count"
            className="input pl-11"
          />
        </div>

        <fieldset className="mt-4 min-w-0">
          <legend className="text-xs font-extrabold tracking-[0.12em] text-ink-soft uppercase">Readiness of the proposal</legend>
          <div className="mt-2 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] sm:flex-wrap sm:overflow-visible [&::-webkit-scrollbar]:hidden">
            {READINESS.map((r) => (
              <button key={r} type="button" data-readiness={r} aria-pressed={readiness === r} onClick={() => setReadiness(r)} className={chip(readiness === r)}>
                {readinessLabel[r]} ({counts[r]})
              </button>
            ))}
            <button type="button" data-readiness="all" aria-pressed={readiness === "all"} onClick={() => setReadiness("all")} className={chip(readiness === "all")}>
              Show all ({decks.length})
            </button>
          </div>
          {readiness !== "all" && <p className="mt-2 text-sm text-ink-2">{readinessHelp[readiness]}</p>}
        </fieldset>

        <fieldset className="mt-4 min-w-0">
          <legend className="text-xs font-extrabold tracking-[0.12em] text-ink-soft uppercase">Category</legend>
          <div className="mt-2 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] sm:flex-wrap sm:overflow-visible [&::-webkit-scrollbar]:hidden">
            {(["all", ...categories] as const).map((c) => (
              <button key={c} type="button" aria-pressed={category === c} onClick={() => setCategory(c)} className={chip(category === c)}>
                {c === "all" ? "All" : c}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <p id="hub-count" role="status" aria-live="polite" className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-semibold text-ink-soft">
        {results.length === 0 ? "No proposals match." : `${results.length} ${results.length === 1 ? "proposal" : "proposals"}${readiness === "all" ? "" : `, ${readinessLabel[readiness].toLowerCase()}`}`}
        {filtered && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("all");
              setReadiness("ready");
            }}
            className="font-bold text-ink underline decoration-ink/30 underline-offset-2 hover:decoration-ink"
          >
            Reset
          </button>
        )}
      </p>
      {/* Copy feedback for screen readers. */}
      <p role="status" aria-live="polite" className="sr-only">
        {status}
      </p>

      {results.length === 0 ? (
        <div className="mt-3 rounded-2xl border-2 border-dashed border-ink/30 p-8 text-center">
          <p className="text-lg font-extrabold">No proposal matches here.</p>
          <p className="mx-auto mt-2 max-w-md text-ink-2">
            Check the spelling, or try &ldquo;Show all&rdquo;: the proposal may be marked introduction only or hold. Only organisations with a prepared proposal are listed.
          </p>
        </div>
      ) : (
        <ul className="mt-3 grid gap-3 md:grid-cols-2">
          {results.map((d) => {
            const held = d.readiness === "hold";
            return (
              <li key={d.route} data-readiness={d.readiness} className={`flex flex-col rounded-2xl border-2 bg-paper p-5 ${held ? "border-ink/40" : "border-ink"}`}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-[0.66rem] font-extrabold tracking-[0.14em] text-emerald-deep uppercase">{d.category}</p>
                  <span className={`rounded-full border-2 px-2.5 py-0.5 text-[0.66rem] font-extrabold tracking-[0.08em] uppercase ${badge[d.readiness]}`}>{readinessLabel[d.readiness]}</span>
                </div>
                <h2 className="mt-1 text-xl leading-tight font-extrabold">{d.name}</h2>
                <p className="mt-1.5 flex-1 text-[0.97rem] leading-snug text-ink-2">{d.focus}</p>
                {d.readiness !== "ready" && <p className="mt-2 text-sm leading-snug font-semibold text-ink">{readinessHelp[d.readiness]}</p>}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <Link href={d.route} className="btn btn-primary btn-sm">
                    {held ? "Review proposal" : "View proposal"}
                  </Link>
                  {held ? (
                    <>
                      <button type="button" disabled className={off}>
                        Download PDF
                      </button>
                      <button type="button" disabled className={off}>
                        Copy proposal link
                      </button>
                    </>
                  ) : (
                    <>
                      <a href={d.pdf} download={d.filename} className="btn btn-secondary btn-sm">
                        Download PDF
                      </a>
                      <button type="button" onClick={() => copy(d)} className="btn btn-secondary btn-sm" aria-label={`Copy link to the ${d.name} proposal`}>
                        {copied === d.route ? "Link copied" : "Copy proposal link"}
                      </button>
                    </>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
