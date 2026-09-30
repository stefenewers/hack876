/**
 * Abstract outline of Jamaica, projected from real coastline coordinates and
 * smoothed. Kingston is the solid starting point; the other places named in
 * the proposal are open markers — reach we are building toward, not promises.
 */

const OUTLINE =
  "M30.4 132.0 C24.1 124.0 30.4 114.0 38.0 104.0 C45.6 94.0 64.6 79.3 76.0 72.0 C87.4 64.7 92.5 62.7 106.4 60.0 C120.3 57.3 143.8 58.0 159.6 56.0 C175.4 54.0 186.2 52.0 201.4 48.0 C216.6 44.0 233.7 33.3 250.8 32.0 C267.9 30.7 286.9 37.3 304.0 40.0 C321.1 42.7 337.6 46.0 353.4 48.0 C369.2 50.0 385.1 50.7 399.0 52.0 C412.9 53.3 422.4 53.3 437.0 56.0 C451.6 58.7 473.7 64.7 486.4 68.0 C499.1 71.3 499.1 74.0 513.0 76.0 C526.9 78.0 556.7 77.3 570.0 80.0 C583.3 82.7 581.4 84.0 592.8 92.0 C604.2 100.0 623.8 118.7 638.4 128.0 C653.0 137.3 666.3 142.7 680.2 148.0 C694.1 153.3 708.7 156.7 722.0 160.0 C735.3 163.3 747.3 162.7 760.0 168.0 C772.7 173.3 787.2 182.7 798.0 192.0 C808.8 201.3 814.5 211.3 824.6 224.0 C834.7 236.7 856.9 256.7 858.8 268.0 C860.7 279.3 849.9 288.0 836.0 292.0 C822.1 296.0 794.8 292.0 775.2 292.0 C755.6 292.0 736.6 296.0 718.2 292.0 C699.8 288.0 680.2 272.7 665.0 268.0 C649.8 263.3 637.1 263.3 627.0 264.0 C616.9 264.7 613.7 266.7 604.2 272.0 C594.7 277.3 585.8 293.3 570.0 296.0 C554.2 298.7 522.5 284.0 509.2 288.0 C495.9 292.0 494.6 309.3 490.2 320.0 C485.8 330.7 490.2 350.0 482.6 352.0 C475.0 354.0 458.5 340.0 444.6 332.0 C430.7 324.0 416.7 310.7 399.0 304.0 C381.3 297.3 357.2 292.7 338.2 292.0 C319.2 291.3 297.7 301.3 285.0 300.0 C272.3 298.7 271.7 295.3 262.2 284.0 C252.7 272.7 240.0 246.0 228.0 232.0 C216.0 218.0 201.4 210.0 190.0 200.0 C178.6 190.0 171.0 179.3 159.6 172.0 C148.2 164.7 135.5 159.3 121.6 156.0 C107.7 152.7 91.2 156.0 76.0 152.0 C60.8 148.0 36.7 140.0 30.4 132.0Z";

const KINGSTON: [number, number] = [630.8, 236];

const PLACES: { name: string; at: [number, number]; label: "above" | "below" | "right" | "left" }[] = [
  { name: "Montego Bay", at: [201.4, 56], label: "above" },
  { name: "Ocho Rios", at: [513, 80], label: "above" },
  { name: "Port Antonio", at: [760, 172], label: "above" },
  { name: "Mandeville", at: [357.2, 224], label: "below" },
  { name: "St. Elizabeth", at: [262, 190], label: "above" },
];

const INK = "#141716";

export function JamaicaMap({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 893 380"
      role="img"
      aria-label="Outline map of Jamaica. Kingston is marked as the starting point. Montego Bay, Ocho Rios, Port Antonio, Mandeville and St. Elizabeth are marked as places the programme aims to reach."
      className={className}
    >
      {/* faint survey grid */}
      <defs>
        <pattern id="jm-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke={INK} strokeOpacity="0.07" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="893" height="380" fill="url(#jm-grid)" />

      <path d={OUTLINE} fill="#c9f2da" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />

      {/* reach lines from Kingston */}
      {PLACES.map((p) => (
        <path
          key={`l-${p.name}`}
          d={`M${KINGSTON[0]} ${KINGSTON[1]} Q ${(KINGSTON[0] + p.at[0]) / 2} ${Math.min(KINGSTON[1], p.at[1]) - 60} ${p.at[0]} ${p.at[1]}`}
          fill="none"
          stroke="#0a7a3e"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          strokeLinecap="round"
        />
      ))}

      {PLACES.map((p) => (
        <g key={p.name}>
          <circle cx={p.at[0]} cy={p.at[1]} r="7" fill="#fffaf0" stroke={INK} strokeWidth="2.5" />
          <text
            x={p.at[0]}
            y={p.label === "below" ? p.at[1] + 30 : p.at[1] - 22}
            textAnchor="middle"
            fontSize="17"
            fontWeight="700"
            fill={INK}
            fontFamily="var(--font-sans)"
          >
            {p.name}
          </text>
        </g>
      ))}

      <circle cx={KINGSTON[0]} cy={KINGSTON[1]} r="20" fill="#12a150" fillOpacity="0.18" />
      <circle cx={KINGSTON[0]} cy={KINGSTON[1]} r="10" fill="#12a150" stroke={INK} strokeWidth="2.5" />
      <text x={KINGSTON[0] - 26} y={KINGSTON[1] + 7} textAnchor="end" fontSize="19" fontWeight="800" fill={INK} fontFamily="var(--font-sans)">
        Kingston · 2027
      </text>
    </svg>
  );
}
