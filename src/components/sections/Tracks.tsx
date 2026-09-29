"use client";

import { useState, type CSSProperties } from "react";
import { Icon } from "@/components/art/Icons";
import { Mark } from "@/components/art/Marks";
import { tracks } from "@/data/event";

/* Each track gets its own colour, shape, tilt and size — a sticker sheet, not a SaaS grid. */
const look: Record<string, { bg: string; fg: string; shape: string }> = {
  bill: { bg: "bg-bill", fg: "text-white", shape: "rounded-[2rem]" },
  sky: { bg: "bg-sky", fg: "text-ink", shape: "rounded-[2.5rem_1rem_2.5rem_1rem]" },
  sun: { bg: "bg-sun", fg: "text-ink", shape: "rounded-[1.25rem]" },
  emerald: { bg: "bg-emerald", fg: "text-white", shape: "rounded-[1rem_2.75rem_1rem_2.75rem]" },
  aqua: { bg: "bg-aqua", fg: "text-ink", shape: "rounded-[2.75rem]" },
  peach: { bg: "bg-pink", fg: "text-ink", shape: "rounded-[1.5rem_1.5rem_3rem_1.5rem]" },
  leaf: { bg: "bg-leaf", fg: "text-ink", shape: "rounded-[2rem_0.75rem_2rem_2rem]" },
  ink: { bg: "bg-ink", fg: "text-cream", shape: "rounded-[1.25rem]" },
};

const tilt = [-2.5, 1.5, -1, 2.5, 1.5, -2, 2, -1.5];
const offset = ["", "lg:translate-y-8", "", "lg:translate-y-4", "lg:-translate-y-2", "lg:translate-y-6", "", "lg:translate-y-3"];

export function Tracks() {
  return (
    <section id="tracks" aria-labelledby="tracks-title" className="relative overflow-hidden bg-cream-2 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-end" data-reveal>
          <div>
            <p className="eyebrow text-emerald-deep">Ideas / Tracks</p>
            <h2 id="tracks-title" className="display mt-3 text-[clamp(2.6rem,7vw,4.6rem)]">
              Where will your
              <br />
              idea take you?
            </h2>
          </div>
          <div className="relative lg:pb-2">
            <p className="max-w-md text-lg leading-relaxed text-ink-2">
              Explore a track, or blend a few. They&rsquo;re here to inspire you, not to box you in.
            </p>
            <p className="hand mt-3 flex items-center gap-2 text-xl text-ink-soft">
              <Mark name="arrow" className="h-6 w-12 rotate-[20deg]" />
              tap one for idea sparks
            </p>
          </div>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-7">
          {tracks.map((t, i) => (
            <li
              key={t.name}
              data-reveal="pop"
              className={offset[i]}
              style={{ "--reveal-delay": `${(i % 4) * 70}ms`, "--reveal-rot": `${tilt[i] * 2}deg` } as CSSProperties}
            >
              <TrackCard track={t} index={i} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function TrackCard({ track, index }: { track: (typeof tracks)[number]; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const l = look[track.color] ?? look.sun;
  const backId = `track-${index}-sparks`;

  return (
    <div
      className="flip relative h-full transition-[rotate,translate] duration-300 ease-[var(--ease-pop)] hover:!rotate-0 hover:-translate-y-1.5"
      data-flipped={flipped}
      style={{ rotate: `${tilt[index]}deg` }}
    >
      <div className="flip-inner h-full">
        {/* Front */}
        <div
          className={`flip-front sticker relative flex min-h-[210px] flex-col p-4 transition-opacity sm:min-h-[240px] sm:p-6 ${l.bg} ${l.fg} ${l.shape}`}
          aria-hidden={flipped}
        >
          <Icon name={track.icon} className="h-14 w-14 drop-shadow-[2px_3px_0_rgba(20,23,22,0.25)] sm:h-20 sm:w-20" />
          <h3 className="display mt-auto pt-4 text-3xl sm:text-4xl">{track.name}</h3>
          <p className="mt-1 text-[0.95rem] leading-snug font-semibold opacity-90 sm:text-base">{track.line}</p>
        </div>

        {/* Back */}
        <div
          id={backId}
          className={`flip-back sticker flex min-h-[210px] flex-col bg-paper p-4 text-ink transition-opacity sm:min-h-[240px] sm:p-6 ${l.shape}`}
          aria-hidden={!flipped}
        >
          <p className="eyebrow text-[0.7rem] text-ink-soft">{track.name} · sparks</p>
          <ul className="mt-3 space-y-2.5">
            {track.sparks.map((s) => (
              <li key={s} className="flex gap-2 text-[0.95rem] leading-snug font-semibold sm:text-base">
                <span aria-hidden className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-emerald" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        aria-expanded={flipped}
        aria-controls={backId}
        className="absolute inset-0 z-10 cursor-pointer rounded-[1.5rem]"
      >
        <span className="sr-only">
          {flipped ? `Hide ${track.name} idea sparks` : `Show ${track.name} idea sparks`}
        </span>
      </button>
      <span
        aria-hidden
        className="pointer-events-none absolute top-3 right-3 z-20 grid h-8 w-8 place-items-center rounded-full border-[2.5px] border-ink bg-paper text-ink shadow-[2px_2px_0_0_var(--color-ink)] transition-transform duration-500"
        style={{ rotate: flipped ? "180deg" : "0deg" }}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4">
          <path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 3v4h-4M6 21v-4h4" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  );
}
