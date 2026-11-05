"use client";

import { useState } from "react";

/* Copies a ready-made message or link. The text is also shown on the page, so nothing depends on this working. */
export function CopyButton({ text, label = "Copy", context, className = "" }: { text: string; label?: string; context?: string; className?: string }) {
  const [state, setState] = useState<"idle" | "done" | "failed">("idle");
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setState("done");
    } catch {
      setState("failed");
    }
    setTimeout(() => setState("idle"), 2200);
  };
  return (
    <button type="button" onClick={copy} className={`btn btn-secondary btn-sm ${className}`}>
      <svg viewBox="0 0 20 20" aria-hidden className="h-4 w-4">
        <rect x="6.5" y="6.5" width="10" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M13.5 4.5v-.5a1.5 1.5 0 0 0-1.5-1.5H5A1.5 1.5 0 0 0 3.5 4v7A1.5 1.5 0 0 0 5 12.5h.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      </svg>
      <span aria-live="polite">
        {state === "done" ? "Copied" : state === "failed" ? "Select and copy the text" : label}
        {state === "idle" && context && <span className="sr-only"> {context}</span>}
      </span>
    </button>
  );
}
