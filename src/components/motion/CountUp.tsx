"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./hooks";

/** Counts from 0 to `to` once, when scrolled into view. Renders the final value for SSR/no-JS. */
export function CountUp({ to, duration = 1100 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const [value, setValue] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced || to <= 1) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setValue(Math.round(eased * to));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        setValue(0);
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration, reduced]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
    </span>
  );
}
