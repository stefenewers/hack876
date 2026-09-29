import type { CSSProperties, SVGProps } from "react";

const INK = "#141716";

/* -------------------------------------------------------------------------- */
/*  Tail line — the Doctor Bird's two streamers as a graphic device.           */
/*  Emerald ribbon + ink ribbon running side by side, loosely waving.          */
/* -------------------------------------------------------------------------- */

type TailLineProps = SVGProps<SVGSVGElement> & {
  /** Draw in when revealed (needs a [data-reveal] ancestor or is-in class). */
  draw?: boolean;
  colors?: [string, string];
  variant?: "underline" | "swoop" | "divider";
};

const TAIL_PATHS: Record<NonNullable<TailLineProps["variant"]>, { vb: string; a: string; b: string }> = {
  underline: {
    vb: "0 0 300 30",
    a: "M4 18 C 60 6, 120 10, 170 14 C 220 18, 260 12, 296 6",
    b: "M10 25 C 70 14, 130 18, 180 21 C 225 24, 262 18, 292 13",
  },
  swoop: {
    vb: "0 0 300 80",
    a: "M4 60 C 60 70, 110 20, 160 28 C 210 36, 240 60, 296 10",
    b: "M4 70 C 64 78, 116 32, 164 38 C 212 44, 246 70, 290 24",
  },
  divider: {
    vb: "0 0 1200 60",
    a: "M0 30 C 200 5, 360 55, 600 28 C 840 2, 1000 50, 1200 24",
    b: "M0 42 C 210 18, 370 66, 610 40 C 850 14, 1010 60, 1200 36",
  },
};

export function TailLine({ draw = true, colors = ["#12a150", INK], variant = "underline", className, ...rest }: TailLineProps) {
  const p = TAIL_PATHS[variant];
  const cls = draw ? "tail-draw" : undefined;
  return (
    <svg viewBox={p.vb} preserveAspectRatio="none" aria-hidden className={className} {...rest}>
      <path d={p.a} pathLength={1} className={cls} fill="none" stroke={colors[0]} strokeWidth={6} strokeLinecap="round" />
      <path
        d={p.b}
        pathLength={1}
        className={cls}
        style={{ "--draw-delay": "120ms" } as CSSProperties}
        fill="none"
        stroke={colors[1]}
        strokeWidth={4}
        strokeLinecap="round"
       
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Brush edge — torn/painted edge for dark bands.                             */
/* -------------------------------------------------------------------------- */

export function BrushEdge({
  side = "top",
  color = INK,
  className = "",
}: {
  side?: "top" | "bottom";
  color?: string;
  className?: string;
}) {
  const d =
    "M0 40 L0 22 C 40 18, 60 30, 110 20 C 160 10, 190 26, 250 18 C 300 12, 330 24, 380 16 C 430 8, 470 22, 530 20 C 580 18, 600 8, 660 14 C 720 20, 750 10, 800 12 C 860 14, 880 26, 940 18 C 990 12, 1030 22, 1080 14 C 1120 8, 1160 18, 1200 12 L1200 40 Z";
  return (
    <svg
      viewBox="0 0 1200 40"
      preserveAspectRatio="none"
      aria-hidden
      className={`pointer-events-none absolute left-0 h-6 w-full sm:h-10 ${side === "top" ? "-top-[23px] sm:-top-[39px]" : "-bottom-[23px] rotate-180 sm:-bottom-[39px]"} ${className}`}
    >
      <path d={d} fill={color} />
      <path d="M140 30 C 150 26, 170 28, 180 24 M700 30 C 720 26, 736 30, 760 26" stroke={color} strokeWidth={3} fill="none" opacity={0.6} />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Little hand-drawn marks                                                    */
/* -------------------------------------------------------------------------- */

type MarkName = "spark" | "burst" | "arrow" | "loop" | "zig" | "dots" | "star" | "ticks";

const MARKS: Record<MarkName, { vb: string; d: string; fill?: boolean }> = {
  spark: { vb: "0 0 40 40", d: "M20 2 V12 M20 28 V38 M2 20 H12 M28 20 H38 M8 8 L13 13 M27 27 L32 32 M32 8 L27 13 M13 27 L8 32" },
  burst: { vb: "0 0 40 40", d: "M6 30 L14 22 M4 16 L14 16 M10 4 L16 12" },
  arrow: { vb: "0 0 120 60", d: "M4 44 C 30 52, 70 44, 104 18 M88 14 L106 16 L100 34" },
  loop: { vb: "0 0 120 50", d: "M4 38 C 20 36, 30 10, 44 12 C 58 14, 48 40, 38 34 C 28 28, 60 8, 80 18 C 94 26, 104 30, 116 22" },
  zig: { vb: "0 0 80 20", d: "M2 14 L12 6 L22 14 L32 6 L42 14 L52 6 L62 14 L72 6" },
  dots: { vb: "0 0 40 12", d: "M4 6 h0.1 M20 6 h0.1 M36 6 h0.1" },
  star: { vb: "0 0 40 40", d: "M20 2 C 22 14, 26 18, 38 20 C 26 22, 22 26, 20 38 C 18 26, 14 22, 2 20 C 14 18, 18 14, 20 2 Z", fill: true },
  ticks: { vb: "0 0 40 40", d: "M6 34 L14 20 M16 36 L22 24 M28 30 L32 18" },
};

export function Mark({
  name,
  color = INK,
  strokeWidth = 3.5,
  ...rest
}: SVGProps<SVGSVGElement> & { name: MarkName; color?: string }) {
  const m = MARKS[name];
  return (
    <svg viewBox={m.vb} aria-hidden overflow="visible" {...rest}>
      <path
        d={m.d}
        fill={m.fill ? color : "none"}
        stroke={m.fill ? INK : color}
        strokeWidth={m.fill ? 2.5 : name === "dots" ? 7 : strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
