"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { HubAudience, HubFaq, HubStatus } from "@/data/schoolHub";

/*
 * Deterministic search over the hub's authored answers. Every word typed must
 * appear in the question, answer or category. No network, no inference.
 */

const AUDIENCES: { key: HubAudience | "all"; label: string }[] = [
  { key: "all", label: "Everyone" },
  { key: "students", label: "Students" },
  { key: "parents", label: "Parents" },
  { key: "teachers", label: "Teachers" },
];

const statusText: Record<HubStatus, string> = { confirmed: "Confirmed", tentative: "Tentative", pending: "Details forthcoming" };
const statusClass: Record<HubStatus, string> = {
  confirmed: "border-ink bg-mint text-emerald-dark",
  tentative: "border-ink bg-sun-light text-ink",
  pending: "border-dashed border-ink/40 bg-cream text-ink-soft",
};

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

  const index = useMemo(() => faqs.map((f) => ({ f, text: norm(`${f.q} ${f.a} ${f.category}`) })), [faqs]);

  const results = useMemo(() => {
    const words = norm(query).split(/\s+/).filter(Boolean);
    return index
      .filter(({ f, text }) => (audience === "all" || f.audience.includes(audience)) && (category === "all" || f.category === category) && words.every((w) => text.includes(w)))
      .map(({ f }) => f);
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
          Search every question
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
            placeholder="Try “coding”, “food”, “consent”, “AI”…"
            autoComplete="off"
            enterKeyHint="search"
            aria-describedby="hub-search-count"
            className="input pl-11"
          />
        </div>

        <fieldset className="mt-4 min-w-0">
          <legend className="text-xs font-extrabold tracking-[0.12em] text-ink-soft uppercase">I am asking as</legend>
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
        {results.length === 0 ? "No matching questions." : `${results.length} ${results.length === 1 ? "question" : "questions"}${filtered ? " match" : ""}`}
        {filtered && (
          <button type="button" onClick={reset} className="font-bold text-ink underline decoration-ink/30 underline-offset-2 hover:decoration-ink">
            Clear filters
          </button>
        )}
      </p>

      {results.length === 0 ? (
        <div className="hub-card mt-3 p-6 text-center">
          <p className="text-lg font-extrabold">We don&rsquo;t have an answer to that yet.</p>
          <p className="mx-auto mt-2 max-w-md text-ink-2">
            Try a shorter word, or clear the filters.
            {contactEmail && (
              <>
                {" "}
                If it still isn&rsquo;t here, email{" "}
                <a href={`mailto:${contactEmail}`} className="font-bold text-ink underline decoration-2 underline-offset-2">
                  {contactEmail}
                </a>{" "}
                and we&rsquo;ll answer and add it.
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
