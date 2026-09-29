import type { CSSProperties } from "react";

const DIGITS = [
  { d: "8", color: "var(--color-emerald)", rot: -4 },
  { d: "7", color: "var(--color-aqua)", rot: 3 },
  { d: "6", color: "var(--color-bill)", rot: -2 },
];

/**
 * HACK 876 lockup. Real text (so it's readable by screen readers and search),
 * styled as marker lettering with outlined, coloured digits.
 */
export function Wordmark({
  animate = false,
  className = "",
  as: Tag = "span",
  id,
}: {
  id?: string;
  animate?: boolean;
  className?: string;
  as?: "span" | "h1";
}) {
  return (
    <Tag id={id} className={`display inline-flex items-baseline whitespace-nowrap ${className}`} aria-label="Hack 876">
      <span aria-hidden className={animate ? "hero-wipe" : undefined} style={{ "--d": "0.35s" } as CSSProperties}>
        HACK
      </span>
      <span aria-hidden className="ml-[0.08em] inline-flex">
        {DIGITS.map(({ d, color, rot }, i) => (
          <span
            key={d}
            className={`${animate ? "digit-pop" : ""} wordmark-digit inline-block`}
            style={
              {
                "--d": `${0.75 + i * 0.12}s`,
                color,
                rotate: `${rot}deg`,
              } as CSSProperties
            }
          >
            {d}
          </span>
        ))}
      </span>
    </Tag>
  );
}

/** Compact logo for nav/footer. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`display inline-flex items-baseline text-[1.6rem] leading-none ${className}`}>
      HACK
      <span className="ml-0.5 text-emerald">8</span>
      <span className="text-aqua">7</span>
      <span className="text-bill">6</span>
    </span>
  );
}
