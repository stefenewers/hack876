import { DoctorBird } from "./DoctorBird";

const INK = "#141716";

/**
 * Illustrated campus: white arcaded two-storey block, breeze-block wall,
 * lawn and hillside behind. Drawn from reference photos in the Hack 876
 * sticker style rather than using any photo directly.
 */
export function Campus({ className = "" }: { className?: string }) {
  const arches = Array.from({ length: 7 }, (_, i) => 176 + i * 40);
  const cols = Array.from({ length: 8 }, (_, i) => 160 + i * 40);
  const blocks: [number, number][] = [];
  for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) blocks.push([56 + c * 16, 214 + r * 15]);

  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 600 380" className="block h-full w-full" role="img" aria-label="Illustration of a hillside school campus with white arcaded buildings and a lawn">
        <rect width="600" height="380" fill="#d8f0fc" />
        <circle cx="505" cy="72" r="34" fill="#ffe7a3" />

        {/* Hills */}
        <path d="M0 150 C 80 90, 150 70, 230 100 C 300 126, 350 60, 440 56 C 520 52, 560 100, 600 96 V260 H0 Z" fill="#9fd79a" stroke={INK} strokeWidth={3} strokeLinejoin="round" />
        <path d="M0 190 C 90 150, 180 150, 280 170 C 380 190, 460 130, 600 150 V260 H0 Z" fill="#7bc96f" stroke={INK} strokeWidth={3} strokeLinejoin="round" />
        {/* houses dotted on the hill */}
        {[
          [380, 92],
          [410, 84],
          [470, 80],
          [96, 128],
          [520, 112],
        ].map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <rect x={x} y={y} width="16" height="11" fill="#fffaf0" stroke={INK} strokeWidth={2} />
            <path d={`M${x - 2} ${y} L${x + 8} ${y - 7} L${x + 18} ${y}`} fill="#ef3b2d" stroke={INK} strokeWidth={2} strokeLinejoin="round" />
          </g>
        ))}

        {/* Side wing with breeze-block wall */}
        <rect x="40" y="200" width="112" height="84" fill="#fffaf0" stroke={INK} strokeWidth={3} />
        <path d="M32 200 H160 L152 190 H40 Z" fill="#dfe3e6" stroke={INK} strokeWidth={3} strokeLinejoin="round" />
        {blocks.map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <rect x={x - 7} y={y - 6} width="14" height="13" fill="#e9ecee" stroke={INK} strokeWidth={1.4} />
            <circle cx={x} cy={y + 0.5} r="4" fill="#9aa5ab" />
          </g>
        ))}

        {/* Main block */}
        <path d="M140 146 H484 L472 130 H152 Z" fill="#dfe3e6" stroke={INK} strokeWidth={3} strokeLinejoin="round" />
        <rect x="150" y="146" width="326" height="138" fill="#fffaf0" stroke={INK} strokeWidth={3} />
        {/* upper veranda shade + columns */}
        <rect x="150" y="146" width="326" height="58" fill="#e8e2d2" />
        {cols.map((x) => (
          <rect key={x} x={x} y={146} width="10" height="58" fill="#fffaf0" stroke={INK} strokeWidth={2} />
        ))}
        <path d="M150 190 H476" stroke={INK} strokeWidth={3} />
        <path d="M150 204 H476" stroke={INK} strokeWidth={3} />
        {cols.slice(0, -1).map((x) => (
          <path key={x} d={`M${x + 10} 194 V204 M${x + 20} 194 V204 M${x + 30} 194 V204`} stroke={INK} strokeWidth={1.5} />
        ))}
        {/* ground-floor arcade */}
        {arches.map((x) => (
          <path key={x} d={`M${x - 14} 284 V246 C ${x - 14} 226, ${x + 14} 226, ${x + 14} 246 V284 Z`} fill="#3b4a45" stroke={INK} strokeWidth={2.5} />
        ))}
        <rect x="150" y="146" width="326" height="138" fill="none" stroke={INK} strokeWidth={3} />

        {/* Tree (broadleaf, not a palm) */}
        <path d="M530 290 V226" stroke={INK} strokeWidth={8} strokeLinecap="round" />
        <path d="M530 290 V226" stroke="#8a5a36" strokeWidth={4} strokeLinecap="round" />
        <path d="M494 222 C 482 196, 506 176, 526 184 C 536 166, 566 170, 568 192 C 590 196, 588 228, 566 232 C 556 246, 520 246, 510 236 C 494 238, 486 228, 494 222 Z" fill="#12a150" stroke={INK} strokeWidth={3} strokeLinejoin="round" />
        <path d="M512 208 C 520 200, 530 200, 536 204" stroke="#4fdc8e" strokeWidth={3} fill="none" strokeLinecap="round" />

        {/* Lawn + path */}
        <path d="M0 280 H600 V380 H0 Z" fill="#12a150" stroke={INK} strokeWidth={3} />
        <path d="M0 300 C 150 292, 450 292, 600 300" stroke="#4fdc8e" strokeWidth={3} fill="none" opacity={0.7} />
        <path d="M0 330 C 150 320, 450 322, 600 332" stroke="#4fdc8e" strokeWidth={3} fill="none" opacity={0.5} />
        <path d="M300 284 L262 380 H356 L318 284 Z" fill="#f4e9d2" stroke={INK} strokeWidth={3} strokeLinejoin="round" />

        {/* Low shrubs */}
        <path d="M150 290 C 150 272, 186 270, 190 284 C 200 270, 230 276, 228 292 Z" fill="#0a7a3e" stroke={INK} strokeWidth={2.5} />
        <path d="M400 292 C 400 274, 436 272, 440 286 C 452 274, 478 280, 476 294 Z" fill="#0a7a3e" stroke={INK} strokeWidth={2.5} />
      </svg>
      <div className="absolute top-[4%] left-[6%] w-[22%]">
        <div className="bird-bob">
          <DoctorBird className="w-full" />
        </div>
      </div>
    </div>
  );
}
