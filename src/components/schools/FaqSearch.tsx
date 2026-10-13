"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { TODO_LABEL, type HubAudience, type HubFaq, type HubStatus } from "@/data/schoolHub";

/*
 * Deterministic search over the hub's authored answers. Works on whole
 * questions typed naturally ("how much does it cost?"): filler words are
 * ignored, the rest are matched against each answer's question, text and
 * keywords, and the best matches are listed first. No network, no inference.
 */

const AUDIENCES: { key: HubAudience | "all"; label: string }[] = [
  { key: "all", label: "Everyone" },
  { key: "students", label: "Students" },
  { key: "parents", label: "Parents" },
  { key: "teachers", label: "Teachers" },
];

const statusText: Record<HubStatus, string> = { confirmed: "Confirmed", tentative: "Tentative" };
const statusClass: Record<HubStatus, string> = {
  confirmed: "border-ink bg-mint text-emerald-dark",
  tentative: "border-ink bg-sun-light text-ink",
};

/* Words that carry no meaning in a question. */
const STOP = new Set(
  "a an and are as at be by can could do does for from get have how i if in is it its me much my of on or our should so that the their there they this to up us was we what when where which who will with would you your about any child kid son daughter student students need".split(
    " ",
  ),
);

const tokens = (q: string) =>
  norm(q)
    .split(/\s+/)
    .filter((w) => w && !STOP.has(w))
    .map((w) => (w.length > 4 && w.endsWith("s") ? w.slice(0, -1) : w));

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9+\s]/g, " ");

export function FaqSearch({ faqs, categories, contactEmail }: { faqs: HubFaq[]; categories: readonly string[]; contactEmail: string | null }) {
  const [query, setQuery] = useState("");
  const [audience, setAudience] = useState<HubAudience | "all">("all");
  const [category, setCategory] = useState<string>("all");
  const input = useRef<HTMLInputElement>(null);

  const index = useMemo(
    () =>
      faqs.map((f) => ({
        f,
        title: norm(`${f.q} ${f.keywords ?? ""}`).split(/\s+/),
        body: norm(`${f.a} ${f.todo ?? ""} ${f.category}`).split(/\s+/),
      })),
    [faqs],
  );

  const results = useMemo(() => {
    const words = tokens(query);
    const pool = index.filter(({ f }) => (audience === "all" || f.audience.includes(audience)) && (category === "all" || f.category === category));
    if (words.length === 0) return pool.map(({ f }) => f);
    /* A word matches when some word in the text starts with it (short words must match exactly). */
    const hit = (list: string[], w: string) => list.some((t) => (w.length < 3 ? t === w : t.startsWith(w)));
    const scored = pool
      .map(({ f, title, body }) => {
        let matched = 0;
        let score = 0;
        for (const w of words) {
          const inTitle = hit(title, w);
          const inBody = !inTitle && hit(body, w);
          if (inTitle || inBody) matched++;
          score += inTitle ? 3 : inBody ? 1 : 0;
        }
        return { f, matched, score };
      })
      .filter((r) => r.matched > 0);
    /* Keep answers that match most of what was asked, best first. */
    const best = Math.max(0, ...scored.map((r) => r.matched));
    return scored
      .filter((r) => r.matched >= Math.max(1, best - (words.length > 2 ? 1 : 0)))
      .sort((a, b) => b.matched - a.matched || b.score - a.score)
      .slice(0, 12)
      .map((r) => r.f);
  }, [index, query, audience, category]);

  /* "/" jumps to search from anywhere on the page; arriving at #questions focuses it too. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      e.preventDefault();
      input.current?.focus();
      input.current?.scrollIntoView({ block: "center" });
    };
    const onHash = () => {
      if (window.location.hash === "#questions") input.current?.focus({ preventScroll: true });
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("hashchange", onHash);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  const shownCategories = categories.filter((c) => faqs.some((f) => f.category === c && (audience === "all" || f.audience.includes(audience))));
  const filtered = query.trim() !== "" || audience !== "all" || category !== "all";
  const reset = () => {
    setQuery("");
    setAudience("all");
    setCategory("all");
    input.current?.focus();
  };

  return (
    <div>
      <div className="hub-card p-4 sm:p-5">
        <label htmlFor="hub-search" className="block text-sm font-extrabold">
          Search for an answer
        </label>
        <div className="relative mt-2">
          <svg viewBox="0 0 20 20" aria-hidden className="pointer-events-none absolute top-1/2 left-3.5 h-5 w-5 -translate-y-1/2 text-ink-soft">
            <path d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Zm7.5 13-3.6-3.6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            ref={input}
            id="hub-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. Do I need to know how to code?"
            autoComplete="off"
            enterKeyHint="search"
            aria-describedby="hub-search-count"
            className="input pl-11"
          />
        </div>

        <fieldset className="mt-4 min-w-0">
          <legend className="text-xs font-extrabold tracking-[0.12em] text-ink-soft uppercase">Show answers for</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {AUDIENCES.map((a) => (
              <button
                key={a.key}
                type="button"
                aria-pressed={audience === a.key}
                onClick={() => {
                  setAudience(a.key);
                  setCategory("all");
                }}
                className={`hub-chip ${audience === a.key ? "hub-chip-on" : ""}`}
              >
                {a.label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-3 min-w-0">
          <legend className="text-xs font-extrabold tracking-[0.12em] text-ink-soft uppercase">Topic</legend>
          <div className="hub-scroll mt-2 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
            <button type="button" aria-pressed={category === "all"} onClick={() => setCategory("all")} className={`hub-chip shrink-0 ${category === "all" ? "hub-chip-on" : ""}`}>
              All topics
            </button>
            {shownCategories.map((c) => (
              <button key={c} type="button" aria-pressed={category === c} onClick={() => setCategory(c)} className={`hub-chip shrink-0 ${category === c ? "hub-chip-on" : ""}`}>
                {c}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <p id="hub-search-count" role="status" aria-live="polite" className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-semibold text-ink-soft">
        {results.length === 0 ? "No matching answers." : filtered ? `${results.length} ${results.length === 1 ? "answer" : "answers"} found` : `${results.length} questions answered`}
        {filtered && (
          <button type="button" onClick={reset} className="font-bold text-ink underline decoration-ink/30 underline-offset-2 hover:decoration-ink">
            Clear search
          </button>
        )}
      </p>

      {results.length === 0 ? (
        <div className="hub-card mt-3 p-6 text-center">
          <p className="text-lg font-extrabold">No answer found for that.</p>
          <p className="mx-auto mt-2 max-w-md text-ink-2">
            Try a single word such as &ldquo;food&rdquo;, &ldquo;cost&rdquo; or &ldquo;laptop&rdquo;.
            {contactEmail && (
              <>
                {" "}
                Or email the organizers at{" "}
                <a href={`mailto:${contactEmail}`} className="font-bold text-ink underline decoration-2 underline-offset-2">
                  {contactEmail}
                </a>
                .
              </>
            )}
          </p>
        </div>
      ) : (
        <ul className="mt-3 grid gap-2.5">
          {results.map((f) => (
            <li key={f.id}>
              <details id={`q-${f.id}`} className="hub-faq group">
                <summary>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[0.68rem] font-extrabold tracking-[0.12em] text-ink-soft uppercase">{f.category}</span>
                    <span className="mt-0.5 block text-[1.05rem] leading-snug font-extrabold">{f.q}</span>
                  </span>
                  <svg viewBox="0 0 20 20" aria-hidden className="mt-1 h-5 w-5 shrink-0 transition-transform group-open:rotate-180">
                    <path d="m5 7.5 5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <div className="px-4 pb-4 sm:px-5">
                  {f.status && <span className={`hub-status ${statusClass[f.status]}`}>{statusText[f.status]}</span>}
                  <div className="mt-2 space-y-2 text-[1rem] leading-relaxed text-ink-2">
                    {f.a.split("\n\n").map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                  {f.todo && (
                    <p className="hub-todo mt-3">
                      <span className="font-extrabold">{TODO_LABEL}:</span> {f.todo}
                    </p>
                  )}
                  {f.link && (
                    <a
                      href={f.link.href}
                      {...(f.link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="mt-3 inline-flex items-center gap-1.5 font-bold text-[var(--sb-primary)] underline decoration-2 underline-offset-4"
                    >
                      {f.link.label} <span aria-hidden>→</span>
                    </a>
                  )}
                </div>
              </details>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
