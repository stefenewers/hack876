import type { SVGProps } from "react";

/**
 * The Hack 876 Doctor Bird (red-billed streamertail), drawn as a sticker-style
 * mascot. Faces right. Pure SVG so it scales from favicon to stage screen.
 *
 * Coordinates live in a 320×300 box. The tail streamers attach at TAIL_BASE,
 * which callers can use to connect longer streamers drawn elsewhere.
 */

export const BIRD_VIEWBOX = { w: 320, h: 300 };
/** Where the streamers leave the body, in viewBox units. */
export const TAIL_BASE = { x: 132, y: 178 };

type Props = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Draw the two long streamers. Turn off when the host draws its own. */
  tail?: boolean;
  /** Animate wing flutter (respects reduced motion via CSS). */
  flutter?: boolean;
  /** Streamer colours — second is also used as the outline on dark backgrounds. */
  tailColors?: [string, string];
  /** Accessible label. Omit for decorative use. */
  title?: string;
  mood?: "sly" | "happy";
};

const INK = "#141716";

export function DoctorBird({
  tail = true,
  flutter = true,
  tailColors = ["#141716", "#12a150"],
  title,
  mood = "sly",
  ...rest
}: Props) {
  const wingClass = flutter ? "wing" : undefined;
  return (
    <svg
      viewBox={`0 0 ${BIRD_VIEWBOX.w} ${BIRD_VIEWBOX.h}`}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      overflow="visible"
      {...rest}
    >
      <g stroke={INK} strokeWidth={4} strokeLinejoin="round" strokeLinecap="round">
        {tail && (
          <>
            <path
              d="M128 176 C 112 214, 70 214, 46 236 C 26 254, 30 280, 8 292"
              fill="none"
              stroke={tailColors[0]}
              strokeWidth={5.5}
            />
            <path
              d="M136 180 C 150 222, 120 238, 84 244 C 50 250, 50 276, 30 296"
              fill="none"
              stroke={tailColors[1]}
              strokeWidth={5.5}
            />
          </>
        )}
        {/* tail fan */}
        <path d="M142 162 L 116 172 L 128 176 L 118 190 L 142 178 Z" fill="#0a5c33" />

        {/* back wing — same feather shape as the front wing, swung forward and shaded */}
        <g className={wingClass ? `${wingClass} wing-back` : undefined} style={{ transformOrigin: "186px 106px" }}>
          <g transform="rotate(34 186 106)">
            <path
              d="M186 106 C 166 82, 140 44, 98 16 C 104 32, 102 36, 112 46 C 102 48, 106 56, 120 64 C 110 68, 116 74, 130 82 C 124 88, 136 94, 148 100 C 160 110, 176 114, 186 106 Z"
              fill="#0a7a3e"
            />
          </g>
        </g>
        {/* body */}
        <path
          d="M200 84 C 228 98, 226 144, 192 166 C 172 180, 150 184, 132 178 C 134 150, 148 118, 170 96 C 178 88, 190 80, 200 84 Z"
          fill="#12a150"
        />
        {/* iridescent sheen */}
        <path d="M210 110 C 214 134, 200 156, 178 168 C 194 150, 204 130, 210 110 Z" fill="#4fdc8e" stroke="none" />
        <path d="M172 104 C 180 98, 190 96, 196 98" fill="none" stroke="#2ec4c9" strokeWidth={3} />
        <path d="M160 130 q 8 -6 14 -2 M150 148 q 8 -6 14 -2" fill="none" stroke="#0a7a3e" strokeWidth={3} />

        {/* feet */}
        <path d="M176 172 l -3 10 M186 168 l -1 10" fill="none" strokeWidth={3.5} />

        {/* front wing */}
        <g className={wingClass} style={{ transformOrigin: "180px 112px" }}>
          <path
            d="M180 112 C 160 88, 134 50, 92 22 C 98 38, 96 42, 106 52 C 96 54, 100 62, 114 70 C 104 74, 110 80, 124 88 C 118 94, 130 100, 142 106 C 154 116, 170 120, 180 112 Z"
            fill="#17b35c"
          />
          <path d="M170 110 C 154 94, 138 74, 112 50" fill="none" stroke="#0a7a3e" strokeWidth={3} />
        </g>

        {/* head + crest */}
        <path d="M188 82 C 180 60, 196 42, 218 44 C 240 46, 248 66, 242 82 C 236 98, 208 102, 188 82 Z" fill={INK} />
        <path d="M194 58 L 170 48 L 186 62 L 168 66 L 190 72 Z" fill={INK} />
        {/* throat */}
        <path d="M204 94 C 222 100, 238 94, 242 82 C 232 86, 220 88, 204 94 Z" fill="#1fd07a" strokeWidth={3} />

        {/* bill — red with a dark tip */}
        <path d="M240 68 C 262 70, 290 74, 312 78 C 290 80, 262 81, 240 80 Z" fill="#ef3b2d" strokeWidth={3.5} />
        <path d="M296 76 L 312 78 L 296 80 Z" fill={INK} strokeWidth={2} />

        {/* eye */}
        <circle cx={224} cy={66} r={8.5} fill="#fff" stroke="none" />
        {mood === "happy" ? (
          <path d="M217 68 Q 224 60 231 68" fill="none" stroke={INK} strokeWidth={3.5} />
        ) : (
          <>
            <circle cx={227} cy={66.5} r={4.8} fill={INK} stroke="none" />
            <circle cx={228.6} cy={64.4} r={1.7} fill="#fff" stroke="none" />
            {/* the brow does all the personality work */}
            <path d="M213 55 C 220 57, 228 58, 235 58" fill="none" stroke={INK} strokeWidth={5} />
          </>
        )}
      </g>
    </svg>
  );
}

/** Tiny bird head used for favicons, bullets and the logo lockup. */
export function BirdMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 40" aria-hidden {...props}>
      <g stroke={INK} strokeWidth={3} strokeLinejoin="round" strokeLinecap="round">
        <path d="M6 12 L -2 6 L 4 16 L -3 20 L 8 21 Z" fill={INK} transform="translate(6 0)" />
        <circle cx={22} cy={20} r={13} fill={INK} />
        <path d="M16 30 C 24 34, 32 31, 35 24 C 28 27, 22 28, 16 30 Z" fill="#1fd07a" strokeWidth={2} />
        <path d="M33 16 L 62 20 L 33 23 Z" fill="#ef3b2d" strokeWidth={2.5} />
        <circle cx={25} cy={17} r={4.5} fill="#fff" stroke="none" />
        <circle cx={26.5} cy={17.4} r={2.4} fill={INK} stroke="none" />
        <path d="M18 10.5 L 30 12" fill="none" strokeWidth={3.5} />
      </g>
    </svg>
  );
}
