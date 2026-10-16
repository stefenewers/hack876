import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { BirdMark, DoctorBird } from "@/components/art/DoctorBird";
import { Icon } from "@/components/art/Icons";
import { Mark } from "@/components/art/Marks";
import { Logo } from "@/components/art/Wordmark";

/*
 * The colourful opening for the pack cover and the booklet cover: a light,
 * warm panel with the Doctor Bird, a few sticker icons and the title, then
 * colour-coded fact chips. Light fills only, ink text, so it holds up in
 * greyscale and leaves the 0.5in no-print border clear.
 */

/** Sticker icons scattered round the panel edge: name, position, size, tilt. */
const stickers: { name: string; style: CSSProperties }[] = [
  { name: "laptop", style: { top: "0.28in", right: "2.55in", width: "0.62in", rotate: "-10deg" } },
  { name: "trophy", style: { bottom: "0.3in", right: "0.3in", width: "0.6in", rotate: "8deg" } },
  { name: "spark", style: { top: "1.3in", right: "0.28in", width: "0.5in", rotate: "12deg" } },
  { name: "rocket", style: { bottom: "0.3in", right: "1.15in", width: "0.5in", rotate: "-14deg" } },
  { name: "lignum", style: { top: "0.3in", right: "0.35in", width: "0.55in", rotate: "6deg" } },
];

export function InviteHero({
  title,
  highlight,
  tagline,
  crest,
  kicker,
  minHeight,
}: {
  title: string;
  highlight?: string;
  tagline: string;
  crest: string;
  kicker: string;
  minHeight?: string;
}) {
  const i = highlight ? title.lastIndexOf(highlight) : -1;
  /* A short highlight ("Hack 876") never splits; a school name may wrap. */
  const keep = highlight && highlight.length <= 12 ? "whitespace-nowrap" : "";
  return (
    <div className="pp-hero" style={minHeight ? { minHeight } : undefined}>
      {/* Soft colour blobs behind everything. */}
      <span aria-hidden className="pp-blob" style={{ width: "2.6in", height: "2.6in", right: "0.6in", top: "0.9in", background: "var(--color-sun-light)" }} />
      <span aria-hidden className="pp-blob" style={{ width: "1.6in", height: "1.6in", right: "-0.2in", top: "-0.3in", background: "var(--color-sky-light)" }} />
      <span aria-hidden className="pp-blob" style={{ width: "1.5in", height: "1.5in", left: "-0.4in", bottom: "-0.5in", background: "var(--color-mint)" }} />

      {stickers.map((s) => (
        <Icon key={s.name} name={s.name} className="pp-sticker" style={s.style} />
      ))}
      <Mark name="star" color="var(--color-sun)" className="pp-sticker" style={{ top: "0.95in", right: "1.2in", width: "0.32in" }} />
      <Mark name="spark" color="var(--color-bill)" className="pp-sticker" style={{ top: "0.95in", right: "2.45in", width: "0.36in" }} />
      <Mark name="burst" color="var(--color-aqua)" className="pp-sticker" style={{ bottom: "1.25in", right: "0.45in", width: "0.38in" }} />

      <div aria-hidden className="pp-hero-bird">
        <DoctorBird flutter={false} mood="happy" className="h-full w-full" />
      </div>

      <div className="relative">
        <div className="inline-flex items-center gap-[10pt] rounded-[99pt] border-[1.25pt] border-ink bg-white py-[5pt] pr-[8pt] pl-[12pt]">
          <BirdMark className="h-[20pt] w-[32pt]" />
          <Logo className="!text-[22pt]" />
          <span aria-hidden className="text-[14pt] font-bold text-ink-soft">
            ×
          </span>
          <Image src={crest} alt="" width={400} height={400} unoptimized className="h-[0.62in] w-[0.62in] object-contain" />
        </div>

        <p className="pp-kicker mt-[0.42in]">{kicker}</p>
        <h1 className="pp-display mt-[6pt] max-w-[3.95in] text-[32pt] leading-[1.02]">
          {i >= 0 && highlight ? (
            <>
              {title.slice(0, i)}
              <span className={`text-emerald-deep ${keep}`}>{highlight}</span>
              {title.slice(i + highlight.length)}
            </>
          ) : (
            title
          )}
        </h1>
        <div aria-hidden className="mt-[8pt] flex gap-[4pt]">
          {["var(--color-emerald)", "var(--color-aqua)", "var(--color-bill)", "var(--color-sun)"].map((c) => (
            <span key={c} className="h-[4pt] w-[0.32in] rounded-[2pt]" style={{ background: c }} />
          ))}
        </div>
        <p className="mt-[12pt] max-w-[3.95in] text-[15pt] leading-tight font-extrabold">{tagline}</p>
      </div>
    </div>
  );
}

const chipColors = ["var(--color-sun-light)", "var(--color-sky-light)", "var(--color-mint)", "#ffd9e4"];
const chipIcons = ["clock", "clock", "pin", "heart"];

/** Colour-coded facts: date, hours, venue, cost. */
export function FactChips({ facts }: { facts: { k: string; v: string }[] }) {
  return (
    <dl className="grid grid-cols-2 gap-[7pt]">
      {facts.map((f, n) => (
        <div key={f.k} className="pp-chip" style={{ background: chipColors[n % chipColors.length] }}>
          <Icon name={f.k === "Date" ? "notebook" : chipIcons[n % chipIcons.length]} className="h-[0.42in] w-[0.42in] shrink-0" />
          <div>
            <dt className="pp-kicker !text-ink">{f.k}</dt>
            <dd className="text-[11.5pt] leading-snug font-bold">{f.v}</dd>
          </div>
        </div>
      ))}
    </dl>
  );
}

export function CoverCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-[10pt] border-[1.25pt] border-ink bg-white p-[12pt] ${className}`}>{children}</div>;
}
