import Image from "next/image";
import type { CSSProperties } from "react";
import { BirdMark } from "@/components/art/DoctorBird";
import { Logo } from "@/components/art/Wordmark";
import { coverCopy, packSchool, type PrincipalPack } from "@/data/principalPacks";
import "./principal-print.css";

/* The front page of the combined principal pack, ahead of the letter. Not part of the letter or booklet files. */

export function PackCover({ pack }: { pack: PrincipalPack }) {
  const c = coverCopy(pack);
  const { brief } = packSchool(pack);
  const vars = { "--pp-school": brief.colors.primary } as CSSProperties;
  return (
    <section className="pp-page pp-cover" style={vars} aria-label="Cover">
      <div className="flex items-center gap-[14pt]">
        <div className="flex items-center gap-[6pt]">
          <BirdMark className="h-[30pt] w-[48pt]" />
          <Logo className="!text-[32pt]" />
        </div>
        <span aria-hidden className="text-[20pt] font-bold text-ink-soft">
          ×
        </span>
        <Image src={brief.crest} alt="" width={400} height={400} unoptimized className="h-[1.15in] w-[1.15in] object-contain" />
      </div>

      <div className="mt-[0.9in]">
        <p className="pp-kicker">{c.kicker}</p>
        <div className="mt-[6pt] text-[15pt] leading-snug">
          {c.recipient.map((l, i) => (
            <p key={l} className={i === 0 ? "font-extrabold" : ""}>
              {l}
            </p>
          ))}
          <p>{c.school}</p>
        </div>
      </div>

      <div className="mt-[0.7in]">
        <h1 className="pp-display pp-h1 max-w-[6in]">{c.title}</h1>
        <div aria-hidden className="pp-rule" />
        <p className="mt-[12pt] text-[16pt] leading-tight font-extrabold">{c.tagline}</p>
        <p className="mt-[14pt] text-[12pt]">{c.when}</p>
        <p className="text-[12pt]">{c.where}</p>
      </div>

      <div className="mt-auto">
        <div className="pp-panel pp-sun">
          <p className="pp-h3">In this pack</p>
          <ol className="mt-[5pt] grid gap-[3pt] text-[11pt]">
            {c.contents.map((x, i) => (
              <li key={x.k} className="flex justify-between gap-[12pt] border-b-[0.75pt] border-ink/20 pb-[3pt] last:border-0">
                <span>
                  <strong>{i + 1}.</strong> {x.k}
                </span>
                <span className="text-ink-soft">{x.v}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="pp-small mt-[10pt] flex justify-between text-ink-soft">
          <span>{c.ref}</span>
          <span>{c.contact}</span>
        </div>
      </div>
    </section>
  );
}
