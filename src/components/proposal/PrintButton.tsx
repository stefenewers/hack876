"use client";

/** Opens the browser print dialog (Save as PDF). Hidden in printed output. */
export function PrintButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={`lp-no-print inline-flex items-center gap-2 rounded-full border-2 border-ink/80 bg-paper px-4 py-2 text-sm font-bold text-ink transition-colors hover:bg-ink hover:text-cream ${className}`}
    >
      <svg viewBox="0 0 20 20" aria-hidden className="h-4 w-4">
        <path d="M10 3v9m0 0-3.5-3.5M10 12l3.5-3.5M4 14.5V16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-1.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Download / Print Proposal
    </button>
  );
}
