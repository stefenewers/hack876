"use client";

import type { ReactNode } from "react";

/* Jumps to the sponsor hub and opens it. Without JavaScript it still scrolls there. */
export function OpenHubLink({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <a
      href="#sponsor-hub"
      className={className}
      onClick={() => {
        const hub = document.getElementById("sponsor-hub");
        if (hub instanceof HTMLDetailsElement) hub.open = true;
      }}
    >
      {children}
    </a>
  );
}
