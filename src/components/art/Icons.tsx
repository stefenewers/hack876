import type { ReactNode, SVGProps } from "react";

/**
 * Hack 876 sticker icon set. One visual language for everything:
 * 64×64 grid, 3px ink outline, flat palette fills, one highlight.
 * Designed so each can be cut straight out as a vinyl sticker.
 */

const INK = "#141716";
const C = {
  paper: "#fffaf0",
  cream: "#fbf4e6",
  emerald: "#12a150",
  emeraldLight: "#4fdc8e",
  emeraldDeep: "#0a7a3e",
  bill: "#ef3b2d",
  orange: "#ff7a1a",
  peach: "#ffb58a",
  pink: "#ffb3c7",
  aqua: "#2ec4c9",
  sky: "#8fd3f4",
  sun: "#ffc93c",
  sunLight: "#ffe7a3",
  leaf: "#7bc96f",
  lilac: "#9d8df1",
};

const icons: Record<string, ReactNode> = {
  /* ---------- build types ---------- */
  browser: (
    <>
      <rect x="6" y="11" width="52" height="42" rx="7" fill={C.paper} />
      <path d="M6 22 H58" />
      <circle cx="13" cy="16.5" r="1.8" fill={C.bill} stroke="none" />
      <circle cx="19" cy="16.5" r="1.8" fill={C.sun} stroke="none" />
      <circle cx="25" cy="16.5" r="1.8" fill={C.emerald} stroke="none" />
      <rect x="13" y="29" width="18" height="16" rx="3" fill={C.sky} />
      <path d="M37 31 H51 M37 37 H48 M37 43 H44" />
    </>
  ),
  phone: (
    <>
      <rect x="17" y="5" width="30" height="54" rx="7" fill={C.paper} />
      <path d="M28 10 H36" />
      <rect x="22" y="16" width="20" height="10" rx="3" fill={C.emeraldLight} />
      <rect x="22" y="30" width="9" height="9" rx="2.5" fill={C.sun} />
      <rect x="33" y="30" width="9" height="9" rx="2.5" fill={C.bill} />
      <rect x="22" y="42" width="9" height="9" rx="2.5" fill={C.aqua} />
      <rect x="33" y="42" width="9" height="9" rx="2.5" fill={C.pink} />
    </>
  ),
  spark: (
    <>
      <path d="M30 6 C 32 20, 36 26, 50 30 C 36 34, 32 40, 30 56 C 28 40, 24 34, 10 30 C 24 26, 28 20, 30 6 Z" fill={C.sun} />
      <path d="M50 8 C 51 13, 52 14, 57 15 C 52 16, 51 17, 50 22 C 49 17, 48 16, 43 15 C 48 14, 49 13, 50 8 Z" fill={C.aqua} />
      <path d="M48 42 C 49 46, 50 47, 54 48 C 50 49, 49 50, 48 54 C 47 50, 46 49, 42 48 C 46 47, 47 46, 48 42 Z" fill={C.bill} />
    </>
  ),
  controller: (
    <>
      <path d="M14 20 H50 C 58 20, 62 34, 60 44 C 58 52, 50 52, 46 46 L 42 40 H22 L18 46 C 14 52, 6 52, 4 44 C 2 34, 6 20, 14 20 Z" fill={C.emerald} />
      <path d="M16 28 V38 M11 33 H21" stroke={C.paper} strokeWidth={4} />
      <circle cx="44" cy="30" r="3" fill={C.sun} />
      <circle cx="51" cy="35" r="3" fill={C.bill} />
    </>
  ),
  board: (
    <>
      <rect x="8" y="12" width="48" height="40" rx="5" fill={C.emeraldDeep} />
      <rect x="22" y="24" width="18" height="16" rx="2" fill={INK} />
      <path d="M22 28 H16 M22 32 H16 M22 36 H16 M40 28 H48 M40 32 H48 M40 36 H48" stroke={C.sun} />
      <circle cx="14" cy="18" r="2" fill={C.sun} />
      <circle cx="50" cy="46" r="2.5" fill={C.bill} />
      <path d="M8 18 H2 M8 26 H2" />
    </>
  ),
  chart: (
    <>
      <rect x="6" y="8" width="52" height="48" rx="7" fill={C.paper} />
      <rect x="14" y="34" width="8" height="14" rx="2" fill={C.aqua} />
      <rect x="28" y="24" width="8" height="24" rx="2" fill={C.emerald} />
      <rect x="42" y="16" width="8" height="32" rx="2" fill={C.bill} />
    </>
  ),
  gear: (
    <>
      <path
        d="M28 4 H36 L38 12 L44 15 L51 10 L56 16 L51 22 L54 28 L62 30 V36 L54 38 L51 44 L56 50 L50 56 L44 51 L38 54 L36 62 H28 L26 54 L20 51 L14 56 L8 50 L13 44 L10 38 L2 36 V30 L10 28 L13 22 L8 16 L14 10 L20 15 L26 12 Z"
        fill={C.sun}
      />
      <circle cx="32" cy="33" r="9" fill={C.paper} />
    </>
  ),
  /** "Agents" without a robot: a cursor running down a checklist on its own. */
  "bot-free": (
    <>
      <rect x="8" y="6" width="38" height="50" rx="6" fill={C.paper} />
      <path d="M15 17 l3 3 l6 -6" stroke={C.emerald} strokeWidth={3.5} />
      <path d="M15 30 l3 3 l6 -6" stroke={C.emerald} strokeWidth={3.5} />
      <path d="M29 18 H39 M29 31 H39 M16 44 H39" />
      <path d="M40 36 L58 44 L50 47 L55 56 L51 58 L46 49 L40 54 Z" fill={C.bill} />
    </>
  ),
  hand: (
    <>
      <path
        d="M22 58 C 14 52, 8 44, 10 38 C 12 34, 16 36, 20 40 V16 C 20 11, 27 11, 27 16 V30 V10 C 27 5, 34 5, 34 10 V30 V13 C 34 8, 41 8, 41 13 V32 V20 C 41 15, 48 15, 48 20 V40 C 48 50, 44 56, 40 58 Z"
        fill={C.peach}
      />
      <path d="M52 8 l4 -4 M56 16 h6 M12 10 l-4 -4" stroke={C.bill} strokeWidth={3} />
    </>
  ),

  /* ---------- tracks ---------- */
  life: (
    <>
      <path d="M8 30 L32 10 L56 30" fill="none" />
      <path d="M14 26 V54 H50 V26" fill={C.paper} />
      <path d="M32 48 C 20 40, 22 30, 28 30 C 30 30, 32 32, 32 34 C 32 32, 34 30, 36 30 C 42 30, 44 40, 32 48 Z" fill={C.bill} />
      <path d="M42 8 V18" strokeWidth={4} />
    </>
  ),
  learn: (
    <>
      <path d="M4 14 C 14 10, 24 12, 32 18 C 40 12, 50 10, 60 14 V52 C 50 48, 40 50, 32 56 C 24 50, 14 48, 4 52 Z" fill={C.paper} />
      <path d="M32 18 V56" />
      <path d="M11 24 C 16 22, 21 23, 25 25 M11 32 C 16 30, 21 31, 25 33 M39 25 C 44 23, 48 22, 53 24" />
      <path d="M40 33 l4 4 l8 -9" stroke={C.emerald} strokeWidth={3.5} />
    </>
  ),
  /** A sound system speaker box. */
  culture: (
    <>
      <rect x="12" y="6" width="40" height="52" rx="5" fill={INK} />
      <circle cx="32" cy="20" r="7" fill={C.sun} />
      <circle cx="32" cy="20" r="2.5" fill={INK} />
      <circle cx="32" cy="41" r="11" fill={C.emerald} />
      <circle cx="32" cy="41" r="4" fill={INK} />
      <path d="M58 16 C 62 22, 62 30, 58 36 M4 16 C 0 22, 0 30, 4 36" stroke={C.bill} strokeWidth={3} />
    </>
  ),
  /** A little shop with an awning. */
  business: (
    <>
      <rect x="10" y="26" width="44" height="30" fill={C.paper} />
      <path d="M6 14 H58 L56 26 H8 Z" fill={C.bill} />
      <path d="M17 14 L16 26 M28 14 V26 M38 14 L39 26 M48 14 L50 26" />
      <path d="M6 26 C 8 32, 14 32, 16 26 C 18 32, 26 32, 28 26 C 30 32, 38 32, 39 26 C 41 32, 48 32, 50 26 C 52 32, 57 32, 58 26" fill={C.sun} />
      <rect x="18" y="38" width="12" height="18" fill={C.aqua} />
      <rect x="36" y="38" width="12" height="10" rx="2" fill={C.sky} />
    </>
  ),
  /** A minibus, route-taxi energy. */
  move: (
    <>
      <path d="M6 44 V20 C 6 15, 10 12, 15 12 H46 C 52 12, 56 18, 58 26 L60 34 V44 Z" fill={C.sun} />
      <path d="M12 18 H24 V28 H12 Z M28 18 H40 V28 H28 Z M44 18 H48 C 51 18, 53 22, 54 28 H44 Z" fill={C.sky} />
      <path d="M6 36 H60" stroke={C.bill} strokeWidth={4} />
      <circle cx="18" cy="46" r="6" fill={INK} />
      <circle cx="46" cy="46" r="6" fill={INK} />
      <circle cx="18" cy="46" r="2" fill={C.paper} stroke="none" />
      <circle cx="46" cy="46" r="2" fill={C.paper} stroke="none" />
    </>
  ),
  wellbeing: (
    <>
      <path d="M32 56 C 8 42, 4 26, 12 16 C 18 9, 28 10, 32 18 C 36 10, 46 9, 52 16 C 60 26, 56 42, 32 56 Z" fill={C.pink} />
      <path d="M10 32 H22 L26 24 L32 42 L37 30 H54" stroke={INK} strokeWidth={3.5} />
    </>
  ),
  /** Hurricane swirl over a sturdy little house. */
  resilience: (
    <>
      <path d="M32 6 C 46 6, 54 16, 50 26 C 58 18, 56 6, 44 2" fill="none" stroke={C.aqua} strokeWidth={3.5} />
      <path d="M32 26 C 24 26, 20 18, 26 12 C 20 20, 28 24, 34 20" fill="none" stroke={C.aqua} strokeWidth={3.5} />
      <path d="M10 40 L32 24 L54 40" fill={C.bill} />
      <path d="M15 38 V58 H49 V38" fill={C.paper} />
      <rect x="27" y="44" width="10" height="14" fill={C.emerald} />
      <path d="M4 58 H60" />
    </>
  ),
  wildcard: (
    <>
      <rect x="10" y="12" width="40" height="40" rx="8" fill={C.paper} transform="rotate(-10 30 32)" />
      <circle cx="21" cy="24" r="3.2" fill={INK} />
      <circle cx="31" cy="33" r="3.2" fill={C.bill} />
      <circle cx="40" cy="42" r="3.2" fill={INK} />
      <path d="M52 6 C 53 11, 54 12, 59 13 C 54 14, 53 15, 52 20 C 51 15, 50 14, 45 13 C 50 12, 51 11, 52 6 Z" fill={C.sun} />
    </>
  ),

  /* ---------- prizes ---------- */
  trophy: (
    <>
      <path d="M18 8 H46 V22 C 46 32, 40 38, 32 38 C 24 38, 18 32, 18 22 Z" fill={C.sun} />
      <path d="M18 14 H9 C 9 24, 12 28, 19 29 M46 14 H55 C 55 24, 52 28, 45 29" fill="none" />
      <path d="M32 38 V46" />
      <path d="M20 56 V50 C 20 47, 22 46, 25 46 H39 C 42 46, 44 47, 44 50 V56 Z" fill={INK} />
      <path d="M26 14 C 25 20, 26 26, 30 30" stroke="#fff" strokeWidth={3} />
      <text x="32" y="54.5" textAnchor="middle" fontSize="7" fontWeight="900" fill={C.sun} stroke="none" fontFamily="system-ui">876</text>
    </>
  ),
  "medal-2": (
    <>
      <path d="M20 4 L28 28 M44 4 L36 28" stroke={C.aqua} strokeWidth={7} />
      <circle cx="32" cy="40" r="16" fill="#dfe3e6" />
      <text x="32" y="47" textAnchor="middle" fontSize="20" fontWeight="900" fill={INK} stroke="none" fontFamily="system-ui">2</text>
    </>
  ),
  "medal-3": (
    <>
      <path d="M20 4 L28 28 M44 4 L36 28" stroke={C.bill} strokeWidth={7} />
      <circle cx="32" cy="40" r="16" fill="#e7a36f" />
      <text x="32" y="47" textAnchor="middle" fontSize="20" fontWeight="900" fill={INK} stroke="none" fontFamily="system-ui">3</text>
    </>
  ),
  pen: (
    <>
      <path d="M44 6 L58 20 L24 54 L8 58 L12 42 Z" fill={C.pink} />
      <path d="M38 12 L52 26" />
      <path d="M12 42 L24 54" />
      <path d="M8 58 L12 50 L16 54 Z" fill={INK} />
    </>
  ),
  rocket: (
    <>
      <path d="M40 6 C 54 6, 58 10, 58 24 L36 46 L18 28 Z" fill={C.paper} />
      <circle cx="42" cy="22" r="5" fill={C.sky} />
      <path d="M18 28 L8 30 L4 40 L14 38 M36 46 L34 56 L24 60 L26 50" fill={C.bill} />
      <path d="M20 44 C 14 46, 10 52, 8 58 C 14 56, 20 52, 22 46" fill={C.sun} />
    </>
  ),
  heart: (
    <>
      <path d="M32 56 C 8 42, 4 26, 12 16 C 18 9, 28 10, 32 18 C 36 10, 46 9, 52 16 C 60 26, 56 42, 32 56 Z" fill={C.bill} />
      <path d="M18 22 C 16 26, 17 30, 20 33" stroke="#fff" strokeWidth={3} />
    </>
  ),

  /* ---------- scene stickers ---------- */
  laptop: (
    <>
      <path d="M12 12 H52 C 54 12, 55 13, 55 15 V42 H9 V15 C 9 13, 10 12, 12 12 Z" fill="#dfe3e6" />
      <path d="M2 42 H62 L58 50 H6 Z" fill="#b9c0c4" />
      <circle cx="22" cy="24" r="6" fill={C.emerald} />
      <rect x="32" y="18" width="16" height="8" rx="3" fill={C.sun} transform="rotate(8 40 22)" />
      <path d="M36 32 L46 36 L38 40 Z" fill={C.bill} />
    </>
  ),
  headphones: (
    <>
      <path d="M10 38 V32 C 10 18, 20 8, 32 8 C 44 8, 54 18, 54 32 V38" fill="none" strokeWidth={5} />
      <path d="M10 38 V32 C 10 18, 20 8, 32 8 C 44 8, 54 18, 54 32 V38" fill="none" stroke={C.aqua} strokeWidth={1.8} />
      <rect x="4" y="34" width="14" height="22" rx="5" fill={C.bill} />
      <rect x="46" y="34" width="14" height="22" rx="5" fill={C.bill} />
    </>
  ),
  sticky: (
    <>
      <path d="M8 8 H56 V44 L44 56 H8 Z" fill={C.sun} />
      <path d="M44 56 V44 H56" fill="#e6ad24" />
      <path d="M16 22 C 22 20, 30 24, 38 20 M16 32 C 22 30, 28 33, 34 31" />
    </>
  ),
  /** Jamaican beef patty — the official hackathon fuel. */
  patty: (
    <>
      <path d="M6 44 C 6 30, 20 20, 32 20 C 44 20, 58 30, 58 44 Z" fill="#f2b233" />
      <path d="M8 44 C 12 48, 16 40, 20 44 C 24 48, 28 40, 32 44 C 36 48, 40 40, 44 44 C 48 48, 52 40, 56 44" fill="none" />
      <path d="M22 30 C 24 32, 22 34, 24 36 M34 28 C 36 30, 34 32, 36 34" stroke="#c9861d" strokeWidth={2.5} />
      <path d="M24 14 C 20 10, 28 8, 24 4 M34 14 C 30 10, 38 8, 34 4 M44 16 C 40 12, 48 10, 44 6" strokeWidth={2.5} stroke={INK} />
    </>
  ),
  /** Bag juice with a straw. */
  bagjuice: (
    <>
      <path d="M16 16 H48 L44 58 C 36 60, 28 60, 20 58 Z" fill={C.bill} />
      <path d="M16 16 C 22 20, 42 20, 48 16" fill="none" />
      <path d="M20 30 C 28 34, 38 34, 45 30" stroke="#fff" strokeWidth={3} />
      <path d="M36 18 L42 2" strokeWidth={4} />
      <path d="M36 18 L42 2" stroke={C.sun} strokeWidth={1.5} />
    </>
  ),
  /** Ackee pod, open, with seeds. Jamaica's national fruit. */
  ackee: (
    <>
      <path d="M32 8 C 50 10, 58 28, 52 44 C 48 54, 40 58, 32 58 C 24 58, 16 54, 12 44 C 6 28, 14 10, 32 8 Z" fill={C.bill} />
      <path d="M32 18 C 44 20, 48 34, 42 46 C 38 52, 26 52, 22 46 C 16 34, 20 20, 32 18 Z" fill="#fff1c4" />
      <circle cx="27" cy="30" r="5" fill={INK} />
      <circle cx="37" cy="36" r="5" fill={INK} />
      <path d="M32 8 V2 L38 4" fill="none" stroke={C.emeraldDeep} strokeWidth={3} />
    </>
  ),
  /** Lignum vitae blossom sprig. National flower. */
  lignum: (
    <>
      <path d="M8 58 C 20 44, 30 36, 44 30" fill="none" stroke={C.emeraldDeep} strokeWidth={3.5} />
      <path d="M24 44 C 20 36, 24 30, 30 32 C 32 38, 30 42, 24 44 Z" fill={C.leaf} />
      <path d="M36 36 C 40 44, 48 44, 50 40 C 46 34, 40 34, 36 36 Z" fill={C.leaf} />
      <g fill={C.lilac}>
        <path d="M44 12 C 48 6, 54 8, 52 14 C 58 14, 58 20, 52 22 C 54 28, 48 30, 44 24 C 40 30, 34 28, 36 22 C 30 20, 30 14, 36 14 C 34 8, 40 6, 44 12 Z" />
      </g>
      <circle cx="44" cy="18" r="3" fill={C.sun} />
    </>
  ),
  notebook: (
    <>
      <rect x="12" y="6" width="42" height="52" rx="5" fill={C.paper} />
      <path d="M12 16 H6 M12 26 H6 M12 36 H6 M12 46 H6" strokeWidth={3.5} />
      <path d="M22 18 H46" stroke={C.aqua} />
      <rect x="22" y="26" width="10" height="10" rx="2" fill="none" />
      <path d="M32 31 H38 L38 44 H44" fill="none" strokeDasharray="3 3" />
      <circle cx="44" cy="44" r="3" fill={C.bill} />
    </>
  ),
  plug: (
    <>
      <path d="M4 50 C 16 50, 16 34, 28 34" fill="none" strokeWidth={4} />
      <rect x="28" y="24" width="18" height="20" rx="4" fill={C.emerald} />
      <path d="M46 29 H58 M46 39 H58" strokeWidth={4} />
    </>
  ),
  badge: (
    <>
      <path d="M26 2 V14 M38 2 V14" stroke={C.emerald} strokeWidth={5} />
      <rect x="12" y="12" width="40" height="48" rx="6" fill={C.paper} />
      <rect x="24" y="10" width="16" height="6" rx="2" fill="#b9c0c4" />
      <rect x="12" y="22" width="40" height="11" fill={INK} />
      <text x="32" y="30.5" textAnchor="middle" fontSize="7.2" fontWeight="900" fill={C.sun} stroke="none" fontFamily="system-ui" letterSpacing=".04em">HACKER</text>
      <circle cx="32" cy="44" r="6" fill={C.sky} />
      <path d="M22 56 C 24 50, 40 50, 42 56" fill="none" />
    </>
  ),
  pin: (
    <>
      <path d="M32 60 C 32 60, 12 38, 12 24 C 12 12, 21 4, 32 4 C 43 4, 52 12, 52 24 C 52 38, 32 60, 32 60 Z" fill={C.bill} />
      <circle cx="32" cy="24" r="8" fill={C.paper} />
    </>
  ),
  clock: (
    <>
      <circle cx="32" cy="34" r="24" fill={C.paper} />
      <path d="M32 20 V34 L42 40" strokeWidth={3.5} />
      <path d="M22 6 H42" strokeWidth={4} />
    </>
  ),
  people: (
    <>
      <circle cx="22" cy="22" r="9" fill={C.sun} />
      <circle cx="44" cy="24" r="8" fill={C.aqua} />
      <path d="M6 56 C 6 42, 14 36, 22 36 C 30 36, 38 42, 38 56 Z" fill={C.emerald} />
      <path d="M38 50 C 38 44, 40 38, 44 38 C 52 38, 58 44, 58 56 H40" fill={C.bill} />
    </>
  ),
  arrow: <path d="M8 32 H54 M40 18 L54 32 L40 46" strokeWidth={5} />,
};

export type IconName = keyof typeof icons;

type IconProps = SVGProps<SVGSVGElement> & { name: string; title?: string };

export function Icon({ name, title, ...rest }: IconProps) {
  const art = icons[name];
  if (!art) return null;
  return (
    <svg
      viewBox="0 0 64 64"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      overflow="visible"
      {...rest}
    >
      <g fill="none" stroke={INK} strokeWidth={3} strokeLinejoin="round" strokeLinecap="round">
        {art}
      </g>
    </svg>
  );
}
