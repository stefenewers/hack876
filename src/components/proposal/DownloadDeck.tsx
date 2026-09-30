/**
 * Downloads the pre-built landscape PDF deck. The PDF is generated from this
 * page's print styles and committed to /public/proposals — regenerate it
 * whenever the proposal copy changes so the two stay in sync.
 */
export const DECK_URL = "/proposals/hack876-loring-partnership-proposal.pdf";
const DECK_FILENAME = "Hack876 x Loring Consulting Engineers - Partnership Proposal.pdf";

export function DownloadDeck({ className = "" }: { className?: string }) {
  return (
    <a
      href={DECK_URL}
      download={DECK_FILENAME}
      className={`lp-no-print inline-flex items-center gap-2 rounded-full border-2 border-ink/80 bg-paper px-4 py-2 text-sm font-bold text-ink transition-colors hover:bg-ink hover:text-cream ${className}`}
    >
      <svg viewBox="0 0 20 20" aria-hidden className="h-4 w-4">
        <path d="M10 3v9m0 0-3.5-3.5M10 12l3.5-3.5M4 14.5V16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-1.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Download Proposal (PDF)
    </a>
  );
}
