import type { ReactNode } from "react";

/* Shared building blocks for the private partnership proposals. */

export function Kicker({ n, children }: { n: string; children: ReactNode }) {
  return (
    <p className="lp-kicker">
      <span className="lp-kicker-n">{n}</span>
      <span>{children}</span>
    </p>
  );
}

export function Lines({ items, className = "" }: { items: ReactNode[]; className?: string }) {
  return (
    <div className={`lp-prose ${className}`}>
      {items.map((t, i) => (
        <p key={i}>{t}</p>
      ))}
    </div>
  );
}

export function Ref({ id }: { id: number }) {
  return (
    <a href={`#source-${id}`} className="lp-footref" aria-label={`Source ${id}`}>
      {id}
    </a>
  );
}

export function Check({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={`h-5 w-5 shrink-0 ${className}`}>
      <path d="M4 12.5 9.5 18 20 6.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** The Doctor Bird's two streamers, run vertically as the timeline spine. */
export function Rail({ last = false }: { last?: boolean }) {
  return (
    <span aria-hidden className="relative col-start-1 row-span-2 row-start-1 flex justify-center self-stretch sm:col-start-2 sm:row-span-1 print:col-start-2 print:row-span-1">
      {!last && (
        <>
          <span className="lp-print-line absolute top-10 -bottom-3 left-[calc(50%-3px)] w-[3px] rounded-full bg-emerald-light/80" />
          <span className="lp-print-line absolute top-10 -bottom-3 left-[calc(50%+3px)] w-[2px] rounded-full bg-cream/45" />
        </>
      )}
      {last ? (
        <span className="relative mt-[clamp(0.6rem,2vw,1.6rem)] h-9 w-9 rounded-full border-2 border-ink bg-sun shadow-[0_0_0_7px_rgb(255_201_60/0.22)]" />
      ) : (
        <span className="relative mt-[clamp(0.8rem,2.2vw,1.9rem)] grid h-7 w-7 place-items-center rounded-full border-2 border-cream bg-night">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-light" />
        </span>
      )}
    </span>
  );
}
