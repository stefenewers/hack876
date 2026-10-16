import type { CSSProperties } from "react";
import { CoverCard, FactChips, InviteHero } from "@/components/print/CoverArt";
import { coverCopy, packSchool, type PrincipalPack } from "@/data/principalPacks";
import "./principal-print.css";

/* The front page of the combined principal pack, ahead of the letter. Not part of the letter or booklet files. */

export function PackCover({ pack }: { pack: PrincipalPack }) {
  const c = coverCopy(pack);
  const { brief } = packSchool(pack);
  const vars = { "--pp-school": brief.colors.primary } as CSSProperties;
  return (
    <section className="pp-page pp-cover" style={vars} aria-label="Cover">
      <InviteHero title={c.title} highlight="Hack 876" tagline={c.tagline} crest={brief.crest} kicker={`For ${c.school}`} minHeight="5.15in" />

      <div className="mt-[12pt]">
        <FactChips facts={c.facts} />
      </div>

      <div className="mt-[12pt] grid flex-1 grid-cols-[1fr_1.25fr] gap-[10pt]">
        <CoverCard className="border-l-[5pt] !border-l-[var(--pp-school)]">
          <p className="pp-kicker">{c.kicker}</p>
          <div className="mt-[6pt] text-[13pt] leading-snug">
            {c.recipient.map((l, i) => (
              <p key={l} className={i === 0 ? "font-extrabold" : ""}>
                {l}
              </p>
            ))}
            <p>{c.school}</p>
          </div>
        </CoverCard>
        <CoverCard>
          <p className="pp-kicker">In this pack</p>
          <ol className="mt-[6pt] grid gap-[4pt] text-[11pt]">
            {c.contents.map((x, i) => (
              <li key={x.k} className="flex justify-between gap-[10pt] border-b-[0.75pt] border-ink/15 pb-[4pt] last:border-0">
                <span>
                  <strong>{i + 1}.</strong> {x.k}
                </span>
                <span className="shrink-0 text-ink-soft">{x.v}</span>
              </li>
            ))}
          </ol>
        </CoverCard>
      </div>

      <div className="pp-small mt-[10pt] flex justify-between text-ink-soft">
        <span>{c.ref}</span>
        <span>{c.contact}</span>
      </div>
    </section>
  );
}
