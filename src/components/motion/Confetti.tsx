"use client";

import { useState, type CSSProperties } from "react";

const CONFETTI_COLORS = ["#12a150", "#ffc93c", "#ef3b2d", "#2ec4c9", "#ffb3c7", "#8fd3f4", "#141716"];

/** A one-shot confetti burst over the whole screen. Render it only when motion is welcome. */
export function Confetti({ count = 70 }: { count?: number }) {
  const [pieces] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      left: Math.random() * 100,
      dx: (Math.random() - 0.5) * 240,
      spin: 360 + Math.random() * 720,
      delay: Math.random() * 0.6,
      dur: 2.2 + Math.random() * 1.6,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      shape: i % 3,
      size: 8 + Math.random() * 10,
    })),
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      {pieces.map((p, i) => (
        <span
          key={i}
          className="confetti absolute top-0 block border-2 border-ink"
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.shape === 2 ? p.size * 0.5 : p.size,
              borderRadius: p.shape === 0 ? "999px" : "3px",
              background: p.color,
              "--dx": `${p.dx}px`,
              "--spin": `${p.spin}deg`,
              "--delay": `${p.delay}s`,
              "--dur": `${p.dur}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
