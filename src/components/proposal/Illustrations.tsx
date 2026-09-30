import { DoctorBird } from "@/components/art/DoctorBird";
import { Icon } from "@/components/art/Icons";

/*
 * Section illustrations for the partnership proposals. Same sticker language
 * as the rest of Hack876: 3px ink outlines, flat palette fills, one highlight,
 * the Doctor Bird's streamers as the connecting line. Decorative only.
 */

const INK = "#141716";
const C = {
  paper: "#fffaf0",
  cream: "#fbf4e6",
  mint: "#c9f2da",
  emerald: "#12a150",
  emeraldDeep: "#0a7a3e",
  emeraldLight: "#4fdc8e",
  sun: "#ffc93c",
  bill: "#ef3b2d",
  aqua: "#2ec4c9",
  sky: "#8fd3f4",
  skyLight: "#d8f0fc",
  peach: "#ffb58a",
  grey: "#dfe3e6",
};

/* -------------------------------------------------------------------------- */
/*  Future paths: one streamer branching into possible futures                */
/* -------------------------------------------------------------------------- */

export function FuturePaths({
  paths,
  className = "",
}: {
  paths: { icon: string; label: string }[];
  className?: string;
}) {
  // Five destination nodes fanned across the upper right.
  const nodes = [
    { x: 300, y: 42 },
    { x: 360, y: 138 },
    { x: 350, y: 250 },
    { x: 210, y: 70 },
    { x: 238, y: 186 },
  ];
  const start = { x: 88, y: 318 };
  return (
    <svg
      viewBox="0 0 440 400"
      aria-hidden
      className={className}
      overflow="visible"
    >
      <circle cx="250" cy="170" r="150" fill={C.mint} />
      {/* faint dotted grid of possibility */}
      {Array.from({ length: 5 }, (_, r) =>
        Array.from({ length: 7 }, (_, c) => (
          <circle
            key={`${r}-${c}`}
            cx={140 + c * 40}
            cy={40 + r * 60}
            r="2"
            fill={INK}
            opacity="0.12"
          />
        )),
      )}
      {paths.slice(0, 5).map((p, i) => {
        const n = nodes[i];
        const cx = start.x + (n.x - start.x) * 0.25;
        const cy = n.y + (start.y - n.y) * 0.85;
        return (
          <g key={p.label}>
            <path
              d={`M${start.x} ${start.y} C ${cx} ${cy}, ${n.x - 60} ${n.y + 40}, ${n.x} ${n.y}`}
              fill="none"
              stroke={INK}
              strokeWidth="2.5"
              strokeDasharray="2 7"
              strokeLinecap="round"
            />
          </g>
        );
      })}
      {/* the chosen streamer, doubled like the bird's tail */}
      <path
        d={`M${start.x} ${start.y} C 150 290, 170 210, 238 186`}
        fill="none"
        stroke={C.emerald}
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d={`M${start.x + 6} ${start.y + 8} C 156 298, 178 222, 238 194`}
        fill="none"
        stroke={INK}
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {paths.slice(0, 5).map((p, i) => {
        const n = nodes[i];
        return (
          <g key={`n-${p.label}`}>
            <circle
              cx={n.x}
              cy={n.y}
              r="34"
              fill={i === 4 ? C.sun : C.paper}
              stroke={INK}
              strokeWidth="3"
            />
            <Icon
              name={p.icon}
              x={n.x - 21}
              y={n.y - 21}
              width="42"
              height="42"
            />
            <text
              x={n.x}
              y={n.y + 52}
              textAnchor="middle"
              fontSize="14"
              fontWeight="800"
              fill={INK} stroke={C.cream} strokeWidth={5} paintOrder="stroke"
              fontFamily="var(--font-sans)"
            >
              {p.label}
            </text>
          </g>
        );
      })}
      <DoctorBird
        flutter={false}
        tail={false}
        x="10"
        y="262"
        width="120"
        height="112"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Blueprint: building cross-section with MEP systems (Loring)               */
/* -------------------------------------------------------------------------- */

export function Blueprint({ className = "" }: { className?: string }) {
  const floors = [260, 200, 140];
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden
      className={className}
      overflow="visible"
    >
      {/* sheet */}
      <g transform="rotate(-3 200 200)">
        <rect
          x="22"
          y="26"
          width="356"
          height="350"
          rx="14"
          fill={C.skyLight}
          stroke={INK}
          strokeWidth="3"
        />
        {Array.from({ length: 11 }, (_, i) => (
          <path
            key={`v${i}`}
            d={`M${52 + i * 30} 30V372`}
            stroke={C.sky}
            strokeWidth="1.2"
          />
        ))}
        {Array.from({ length: 11 }, (_, i) => (
          <path
            key={`h${i}`}
            d={`M26 ${56 + i * 30}H374`}
            stroke={C.sky}
            strokeWidth="1.2"
          />
        ))}
        {/* title block */}
        <rect
          x="262"
          y="330"
          width="100"
          height="32"
          fill={C.paper}
          stroke={INK}
          strokeWidth="2.5"
        />
        <text
          x="312"
          y="351"
          textAnchor="middle"
          fontSize="13"
          fontWeight="900"
          fill={INK}
          fontFamily="var(--font-sans)"
          letterSpacing=".08em"
        >
          MEP · 01
        </text>

        {/* building section */}
        <path
          d="M80 320 V110 L200 70 L320 110 V320 Z"
          fill={C.paper}
          stroke={INK}
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {floors.map((y) => (
          <path key={y} d={`M80 ${y} H320`} stroke={INK} strokeWidth="2.5" />
        ))}
        <path
          d="M60 320 H340"
          stroke={INK}
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* ductwork (supply air) */}
        <path
          d="M112 128 H280 V150"
          fill="none"
          stroke={INK}
          strokeWidth="14"
          strokeLinejoin="round"
        />
        <path
          d="M112 128 H280 V150"
          fill="none"
          stroke={C.grey}
          strokeWidth="9"
          strokeLinejoin="round"
        />
        {[150, 190, 230].map((x) => (
          <path
            key={x}
            d={`M${x} 136 v8 M${x - 5} 144 h10`}
            stroke={INK}
            strokeWidth="2"
          />
        ))}

        {/* plumbing riser */}
        <path
          d="M296 318 V176 H250"
          fill="none"
          stroke={C.aqua}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M284 318 V222 H230"
          fill="none"
          stroke={C.bill}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* electrical riser */}
        <path
          d="M104 318 V168"
          stroke={C.sun}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M112 236 l-14 22 h12 l-6 20 l18 -26 h-12 l6 -16 z"
          fill={C.sun}
          stroke={INK}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* rooftop fan */}
        <rect
          x="178"
          y="80"
          width="44"
          height="18"
          rx="4"
          fill={C.grey}
          stroke={INK}
          strokeWidth="2.5"
          transform="rotate(0)"
        />
        <circle
          cx="200"
          cy="89"
          r="6"
          fill={C.paper}
          stroke={INK}
          strokeWidth="2"
        />

        {/* dimension line */}
        <path
          d="M80 344 H240 M80 338 v12 M240 338 v12"
          stroke={INK}
          strokeWidth="2"
        />
      </g>

      {/* pencil sticker */}
      <g transform="rotate(38 330 70)" className="diecut">
        <rect
          x="290"
          y="58"
          width="92"
          height="22"
          rx="3"
          fill={C.sun}
          stroke={INK}
          strokeWidth="3"
        />
        <path
          d="M382 58 L404 69 L382 80 Z"
          fill={C.peach}
          stroke={INK}
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path d="M398 66 L404 69 L398 72 Z" fill={INK} />
        <rect
          x="280"
          y="58"
          width="12"
          height="22"
          rx="2"
          fill={C.bill}
          stroke={INK}
          strokeWidth="3"
        />
      </g>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Shelter: an umbrella over scholarship books (GraceKennedy)                */
/* -------------------------------------------------------------------------- */

export function Shelter({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden
      className={className}
      overflow="visible"
    >
      <circle cx="200" cy="220" r="160" fill={C.mint} />
      {/* rain outside the canopy */}
      {[
        [30, 60],
        [60, 120],
        [22, 190],
        [350, 70],
        [372, 140],
        [340, 200],
        [90, 40],
        [318, 30],
      ].map(([x, y]) => (
        <path
          key={`${x}-${y}`}
          d={`M${x} ${y} l-8 18`}
          stroke={C.aqua}
          strokeWidth="4"
          strokeLinecap="round"
        />
      ))}

      {/* umbrella canopy */}
      <path
        d="M52 176 C 60 90, 130 44, 200 44 C 270 44, 340 90, 348 176 C 330 160, 304 160, 290 178 C 272 158, 244 158, 230 178 C 214 158, 186 158, 170 178 C 156 158, 128 158, 110 178 C 96 160, 70 160, 52 176 Z"
        fill={C.bill}
        stroke={INK}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M200 44 C 180 90, 172 130, 170 178 M200 44 C 220 90, 228 130, 230 178 M200 44 C 150 80, 120 130, 110 178 M200 44 C 250 80, 280 130, 290 178"
        fill="none"
        stroke={INK}
        strokeWidth="2"
        opacity="0.5"
      />
      <path
        d="M96 110 C 110 86, 132 70, 156 62"
        fill="none"
        stroke="#fff"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.8"
      />
      <circle cx="200" cy="40" r="6" fill={INK} />
      {/* shaft + handle */}
      <path
        d="M200 176 V252"
        fill="none"
        stroke={INK}
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* stack of books */}
      <g transform="translate(92 250)">
        <rect
          x="0"
          y="54"
          width="150"
          height="26"
          rx="4"
          fill={C.emerald}
          stroke={INK}
          strokeWidth="3"
        />
        <rect
          x="12"
          y="28"
          width="132"
          height="26"
          rx="4"
          fill={C.sun}
          stroke={INK}
          strokeWidth="3"
        />
        <rect
          x="4"
          y="2"
          width="124"
          height="26"
          rx="4"
          fill={C.sky}
          stroke={INK}
          strokeWidth="3"
        />
        <path
          d="M14 62 H136 M24 36 H132 M16 10 H116"
          stroke={INK}
          strokeWidth="1.5"
          opacity="0.35"
        />
        {/* graduation cap */}
        <path
          d="M66 -22 L106 -36 L146 -22 L106 -8 Z"
          fill={INK}
          stroke={INK}
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path d="M84 -16 V-2 C 96 6, 116 6, 128 -2 V-16" fill={INK} />
        <path
          d="M146 -22 V2"
          stroke={C.sun}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle
          cx="146"
          cy="6"
          r="4"
          fill={C.sun}
          stroke={INK}
          strokeWidth="1.5"
        />
      </g>

      {/* scholarship scroll */}
      <g transform="rotate(-10 300 300)">
        <rect
          x="258"
          y="270"
          width="92"
          height="56"
          rx="6"
          fill={C.paper}
          stroke={INK}
          strokeWidth="3"
        />
        <path
          d="M272 288 H336 M272 300 H326 M272 312 H316"
          stroke={INK}
          strokeWidth="2"
          opacity="0.4"
        />
        <circle
          cx="336"
          cy="320"
          r="12"
          fill={C.sun}
          stroke={INK}
          strokeWidth="2.5"
        />
        <path
          d="M330 330 l-4 16 l10 -6 l10 6 l-4 -16"
          fill={C.bill}
          stroke={INK}
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Seedling: the first cohort, growing                                       */
/* -------------------------------------------------------------------------- */

export function Seedling({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 360 420"
      aria-hidden
      className={className}
      overflow="visible"
    >
      <circle cx="180" cy="210" r="150" fill={C.mint} />
      {/* sparkles */}
      {[
        [60, 90, C.sun],
        [300, 70, C.aqua],
        [312, 220, C.bill],
      ].map(([x, y, f]) => (
        <path
          key={`${x}`}
          d={`M${x} ${Number(y) - 16} C ${Number(x) + 2} ${Number(y) - 4}, ${Number(x) + 4} ${Number(y) - 2}, ${Number(x) + 16} ${y} C ${Number(x) + 4} ${Number(y) + 2}, ${Number(x) + 2} ${Number(y) + 4}, ${x} ${Number(y) + 16} C ${Number(x) - 2} ${Number(y) + 4}, ${Number(x) - 4} ${Number(y) + 2}, ${Number(x) - 16} ${y} C ${Number(x) - 4} ${Number(y) - 2}, ${Number(x) - 2} ${Number(y) - 4}, ${x} ${Number(y) - 16} Z`}
          fill={String(f)}
          stroke={INK}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      ))}

      {/* stem + leaves */}
      <path
        d="M180 270 C 176 220, 190 180, 182 120"
        fill="none"
        stroke={C.emeraldDeep}
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M182 176 C 130 180, 104 146, 110 118 C 150 116, 176 138, 182 176 Z"
        fill={C.emerald}
        stroke={INK}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M184 150 C 230 158, 262 126, 256 96 C 214 94, 188 116, 184 150 Z"
        fill={C.emeraldLight}
        stroke={INK}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M182 124 C 170 96, 180 70, 198 60 C 208 82, 200 108, 182 124 Z"
        fill={C.emerald}
        stroke={INK}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M120 128 C 140 136, 160 150, 176 170 M248 104 C 228 110, 206 126, 188 146"
        fill="none"
        stroke={INK}
        strokeWidth="1.8"
        opacity="0.4"
      />

      {/* pot */}
      <path
        d="M112 262 H248 L234 366 C 232 378, 222 384, 210 384 H150 C 138 384, 128 378, 126 366 Z"
        fill={C.peach}
        stroke={INK}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <rect
        x="102"
        y="248"
        width="156"
        height="30"
        rx="8"
        fill="#f09a6a"
        stroke={INK}
        strokeWidth="3"
      />
      <path
        d="M118 256 C 150 246, 210 246, 242 256"
        fill="none"
        stroke="#5b3a24"
        strokeWidth="8"
        strokeLinecap="round"
      />
      {/* 01 label */}
      <rect
        x="146"
        y="298"
        width="68"
        height="44"
        rx="8"
        fill={C.paper}
        stroke={INK}
        strokeWidth="3"
        transform="rotate(-4 180 320)"
      />
      <text
        x="180"
        y="330"
        textAnchor="middle"
        fontSize="28"
        fontWeight="900"
        fill={INK}
        fontFamily="var(--font-sans)"
        transform="rotate(-4 180 320)"
      >
        01
      </text>

      {/* notebook underneath */}
      <rect
        x="70"
        y="382"
        width="220"
        height="24"
        rx="5"
        fill={C.paper}
        stroke={INK}
        strokeWidth="3"
      />
      <path d="M86 394 H274" stroke={C.aqua} strokeWidth="2" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Compounding: small beginnings rising along the streamer (Scotia)          */
/* -------------------------------------------------------------------------- */

export function Compounding({ className = "" }: { className?: string }) {
  // Growth stages sit on an accelerating curve.
  const stages = [
    { x: 70, y: 318, r: 10, fill: C.sun },
    { x: 150, y: 296, r: 14, fill: C.emeraldLight },
    { x: 228, y: 248, r: 19, fill: C.emerald },
    { x: 296, y: 170, r: 25, fill: C.emeraldDeep },
  ];
  return (
    <svg viewBox="0 0 400 400" aria-hidden className={className} overflow="visible">
      <circle cx="220" cy="210" r="160" fill={C.mint} />
      {/* axes on graph paper */}
      <g opacity="0.5">
        {Array.from({ length: 8 }, (_, i) => (
          <path key={`g${i}`} d={`M${50 + i * 44} 60 V340`} stroke={INK} strokeOpacity="0.12" strokeWidth="1.2" />
        ))}
        {Array.from({ length: 7 }, (_, i) => (
          <path key={`h${i}`} d={`M40 ${80 + i * 40} H370`} stroke={INK} strokeOpacity="0.12" strokeWidth="1.2" />
        ))}
      </g>
      <path d="M40 340 H372 M40 340 V52" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      <path d="M362 332 L374 340 L362 348 M32 62 L40 50 L48 62" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

      {/* doubled streamer curve */}
      <path d="M44 330 C 150 322, 250 290, 356 70" fill="none" stroke={C.emerald} strokeWidth="7" strokeLinecap="round" />
      <path d="M50 338 C 156 330, 258 298, 364 80" fill="none" stroke={INK} strokeWidth="3.5" strokeLinecap="round" />

      {/* sprout stages */}
      {stages.map((s, i) => (
        <g key={i}>
          <path d={`M${s.x} ${s.y} v-${s.r * 1.6}`} stroke={C.emeraldDeep} strokeWidth="3.5" strokeLinecap="round" />
          <path
            d={`M${s.x} ${s.y - s.r * 1.2} C ${s.x - s.r * 1.6} ${s.y - s.r * 1.3}, ${s.x - s.r * 1.8} ${s.y - s.r * 2.6}, ${s.x - s.r * 1.4} ${s.y - s.r * 2.9} C ${s.x - s.r * 0.4} ${s.y - s.r * 2.6}, ${s.x} ${s.y - s.r * 2}, ${s.x} ${s.y - s.r * 1.2} Z`}
            fill={s.fill}
            stroke={INK}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path
            d={`M${s.x} ${s.y - s.r * 1.5} C ${s.x + s.r * 1.6} ${s.y - s.r * 1.6}, ${s.x + s.r * 1.8} ${s.y - s.r * 2.9}, ${s.x + s.r * 1.4} ${s.y - s.r * 3.2} C ${s.x + s.r * 0.4} ${s.y - s.r * 2.9}, ${s.x} ${s.y - s.r * 2.3}, ${s.x} ${s.y - s.r * 1.5} Z`}
            fill={s.fill}
            stroke={INK}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <circle cx={s.x} cy={s.y} r="6" fill={C.paper} stroke={INK} strokeWidth="2.5" />
        </g>
      ))}

      {/* spark at the top of the curve */}
      <path d="M356 26 C 358 40, 362 44, 376 46 C 362 48, 358 52, 356 66 C 354 52, 350 48, 336 46 C 350 44, 354 40, 356 26 Z" fill={C.sun} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      <text x="58" y="378" fontSize="15" fontWeight="800" fill={INK} fontFamily="var(--font-sans)">
        early
      </text>
      <text x="300" y="378" fontSize="15" fontWeight="800" fill={INK} fontFamily="var(--font-sans)">
        long view
      </text>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Bridge: three pillars joined by one span                                  */
/* -------------------------------------------------------------------------- */

export function Bridge({ labels, className = "" }: { labels: [string, string, string]; className?: string }) {
  const pillars = [90, 300, 510];
  return (
    <svg viewBox="0 0 600 300" aria-hidden className={className} overflow="visible">
      {/* water */}
      <path d="M0 250 C 60 240, 120 260, 180 250 C 240 240, 300 260, 360 250 C 420 240, 480 260, 540 250 C 570 245, 590 250, 600 252 V300 H0 Z" fill={C.skyLight} stroke={INK} strokeWidth="2.5" />
      <path d="M40 272 h40 M200 278 h60 M420 274 h50" stroke={C.sky} strokeWidth="3" strokeLinecap="round" />

      {/* arches */}
      {[0, 1].map((i) => (
        <path
          key={i}
          d={`M${pillars[i] + 24} 236 C ${pillars[i] + 60} 150, ${pillars[i + 1] - 60} 150, ${pillars[i + 1] - 24} 236`}
          fill="none"
          stroke={INK}
          strokeWidth="4"
        />
      ))}
      {/* deck: the streamer as the span */}
      <path d="M20 120 H580" stroke={C.emerald} strokeWidth="10" strokeLinecap="round" />
      <path d="M20 132 H580" stroke={INK} strokeWidth="4" strokeLinecap="round" />
      {/* hangers */}
      {Array.from({ length: 13 }, (_, i) => 60 + i * 40)
        .filter((x) => !pillars.some((p) => Math.abs(p - x) < 26))
        .map((x) => (
          <path key={x} d={`M${x} 134 V${150 + Math.abs(Math.sin((x / 600) * Math.PI * 2)) * 30}`} stroke={INK} strokeWidth="2" opacity="0.5" />
        ))}

      {pillars.map((x, i) => (
        <g key={x}>
          <rect x={x - 24} y="96" width="48" height="152" rx="6" fill={i === 1 ? C.sun : C.paper} stroke={INK} strokeWidth="3" />
          <rect x={x - 88} y="30" width="176" height="44" rx="10" fill={C.paper} stroke={INK} strokeWidth="3" />
          <text x={x} y="58" textAnchor="middle" fontSize="15" fontWeight="900" fill={INK} fontFamily="var(--font-sans)">
            {labels[i]}
          </text>
          <path d={`M${x} 74 V96`} stroke={INK} strokeWidth="3" />
        </g>
      ))}
      <DoctorBird flutter={false} tail={false} x="258" y="178" width="88" height="82" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Converge: two streams (education, entrepreneurship) meeting at Hack876    */
/* -------------------------------------------------------------------------- */

export function Converge({ left, right, className = "" }: { left: string; right: string; className?: string }) {
  return (
    <svg viewBox="0 0 600 340" aria-hidden className={className} overflow="visible">
      <ellipse cx="300" cy="230" rx="210" ry="110" fill={C.mint} />
      {/* left stream: education (books) */}
      <path d="M40 60 C 140 60, 200 120, 262 206" fill="none" stroke={C.sky} strokeWidth="18" strokeLinecap="round" />
      <path d="M40 60 C 140 60, 200 120, 262 206" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" strokeDasharray="1 16" />
      {/* right stream: entrepreneurship (spark) */}
      <path d="M560 60 C 460 60, 400 120, 338 206" fill="none" stroke={C.sun} strokeWidth="18" strokeLinecap="round" />
      <path d="M560 60 C 460 60, 400 120, 338 206" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" strokeDasharray="1 16" />

      {/* left badge */}
      <g>
        <circle cx="62" cy="62" r="44" fill={C.paper} stroke={INK} strokeWidth="3" />
        <rect x="36" y="64" width="54" height="14" rx="3" fill={C.emerald} stroke={INK} strokeWidth="2.5" />
        <rect x="40" y="50" width="48" height="14" rx="3" fill={C.sun} stroke={INK} strokeWidth="2.5" />
        <rect x="36" y="36" width="52" height="14" rx="3" fill={C.sky} stroke={INK} strokeWidth="2.5" />
        <text x="62" y="130" textAnchor="middle" fontSize="17" fontWeight="900" fill={INK} fontFamily="var(--font-sans)" stroke={C.cream} strokeWidth="5" paintOrder="stroke">
          {left}
        </text>
      </g>
      {/* right badge */}
      <g>
        <circle cx="538" cy="62" r="44" fill={C.paper} stroke={INK} strokeWidth="3" />
        <path d="M538 30 C 541 52, 548 58, 568 62 C 548 66, 541 72, 538 94 C 535 72, 528 66, 508 62 C 528 58, 535 52, 538 30 Z" fill={C.sun} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
        <text x="538" y="130" textAnchor="middle" fontSize="17" fontWeight="900" fill={INK} fontFamily="var(--font-sans)" stroke={C.cream} strokeWidth="5" paintOrder="stroke">
          {right}
        </text>
      </g>

      {/* the meeting point: a laptop with the bird's streamers rising out */}
      <path d="M300 214 C 290 150, 330 120, 318 70" fill="none" stroke={C.emerald} strokeWidth="7" strokeLinecap="round" />
      <path d="M308 216 C 300 156, 344 126, 332 76" fill="none" stroke={INK} strokeWidth="3.5" strokeLinecap="round" />
      <g transform="translate(236 196)">
        <path d="M10 0 H118 C 122 0, 124 2, 124 6 V70 H4 V6 C 4 2, 6 0, 10 0 Z" fill={C.grey} stroke={INK} strokeWidth="3" />
        <path d="M-12 70 H140 L130 88 H-2 Z" fill="#b9c0c4" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <text x="64" y="44" textAnchor="middle" fontSize="20" fontWeight="900" fill={INK} fontFamily="var(--font-sans)">
          HACK876
        </text>
      </g>
      <DoctorBird flutter={false} tail={false} x="296" y="18" width="84" height="78" />
    </svg>
  );
}
