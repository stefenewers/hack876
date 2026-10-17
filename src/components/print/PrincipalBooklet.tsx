import Image from "next/image";
import QRCode from "qrcode";
import type { CSSProperties, ReactNode } from "react";
import { FactChips, InviteHero } from "@/components/print/CoverArt";
import type { Person } from "@/data/event";
import { bookletCopy, packSchool, type PrincipalPack } from "@/data/principalPacks";
import { statusLabel } from "@/data/schoolHub";
import "./principal-print.css";

/*
 * The eight-page information booklet for a principal, portrait US Letter.
 * Written for a faculty reader holding paper: the school's own record first,
 * then the day, the people, judging, safety, and what we ask. All copy comes
 * from bookletCopy(). QR codes are rendered to SVG on the server.
 */

type Copy = ReturnType<typeof bookletCopy>;

async function qrSvg(url: string) {
  return QRCode.toString(url, { type: "svg", errorCorrectionLevel: "M", margin: 4, color: { dark: "#000000", light: "#ffffff" } });
}

function Qr({ svg, label, caption }: { svg: string; label: string; caption?: string }) {
  return (
    <figure className="flex w-[1.45in] flex-col items-center">
      {caption && <figcaption className="mb-[3pt] text-center text-[9pt] font-extrabold">{caption}</figcaption>}
      <div className="pp-qr" role="img" aria-label={`QR code for ${label}`} dangerouslySetInnerHTML={{ __html: svg }} />
      <p className="pp-qr-label">
        {/* Domain, then path, so a long school address never breaks mid-word. */}
        {label.split(/(?=\/)/).length > 1 ? (
          <>
            <span className="block">{label.slice(0, label.indexOf("/"))}</span>
            <span className="block">{label.slice(label.indexOf("/"))}</span>
          </>
        ) : (
          label
        )}
      </p>
    </figure>
  );
}

function Page({ n, copy, children }: { n: number; copy: Copy; children: ReactNode }) {
  return (
    <section className={`pp-page ${n % 2 ? "pp-odd" : "pp-even"}`} aria-label={`Booklet page ${n}`}>
      <div className="pp-body">{children}</div>
      <footer className="pp-foot">
        <span>{copy.footer(n)}</span>
      </footer>
    </section>
  );
}

function Head({ kicker, title }: { kicker: string; title: string }) {
  return (
    <header>
      <p className="pp-kicker">{kicker}</p>
      <h2 className="pp-display pp-h2">{title}</h2>
      <div aria-hidden className="pp-rule" />
    </header>
  );
}

/* ------------------------------------------------------------------ 1 Cover */
function Cover({ copy, crest, qr }: { copy: Copy; crest: string; qr: string }) {
  const c = copy.cover;
  return (
    <Page n={1} copy={copy}>
      <InviteHero title={c.title} highlight={copy.name} tagline={c.tagline} crest={crest} kicker="Information booklet for the Principal" minHeight="4.6in" />
      <div className="mt-[10pt]">
        <FactChips facts={c.facts} />
      </div>
      <p className="mt-[12pt] text-[11pt] leading-[1.42]">{c.about}</p>

      <div className="mt-auto flex items-end justify-between gap-[16pt]">
        <div className="max-w-[4.4in]">
          <p className="text-[12pt] font-extrabold">{c.preparedFor}</p>
          <p className="pp-small pp-soft mt-[4pt]">
            Hack 876 is organized independently of {copy.name}. This booklet sets out what the day involves and what we would ask of the school.
          </p>
        </div>
        <Qr svg={qr} label={copy.qr.school.label} caption={copy.qr.school.caption} />
      </div>
    </Page>
  );
}

/* ---------------------------------------------------------------- 2 Why */
function Why({ copy }: { copy: Copy }) {
  const { fit, quote } = copy.why;
  return (
    <Page n={2} copy={copy}>
      <Head kicker={copy.why.kicker} title={fit.headline} />
      <p className="pp-lead mt-[10pt]">{fit.lead}</p>
      <dl className="mt-[12pt] grid grid-cols-2 gap-[8pt]">
        {fit.points.map((p) => (
          <div key={p.k} className="pp-panel pp-line">
            <dt className="pp-h3" style={{ color: "var(--pp-school)" }}>
              {p.k}
            </dt>
            <dd className="mt-[2pt]">{p.v}</dd>
          </div>
        ))}
      </dl>
      {quote && (
        <blockquote className="mt-[14pt] border-l-[3pt] border-[var(--pp-school)] pl-[12pt]">
          <p className="text-[12pt] leading-snug font-semibold">&ldquo;{quote.text}&rdquo;</p>
          <footer className="pp-small pp-soft mt-[4pt]">
            {quote.by} · {quote.cite}
          </footer>
        </blockquote>
      )}
      <p className="mt-[12pt]">{fit.bridge}</p>
      <div className="pp-panel pp-mint mt-auto">
        <p className="pp-h3">What students practise</p>
        <ul className="pp-list mt-[5pt] grid-cols-2">
          {copy.why.practise.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <p className="pp-small mt-[6pt]">{copy.why.relevance}</p>
      </div>
    </Page>
  );
}

/* ---------------------------------------------------------------- 3 The day */
function Day({ copy }: { copy: Copy }) {
  const d = copy.day;
  return (
    <Page n={3} copy={copy}>
      <Head kicker="The day" title="One day, from first idea to working demo." />
      <p className="mt-[10pt]">{d.intro}</p>
      <p className="mt-[6pt] font-extrabold">{d.first}</p>
      <dl className="mt-[10pt] grid grid-cols-3 gap-[6pt]">
        {d.facts.map((f) => (
          <div key={f.k} className="pp-panel pp-line !px-[9pt] !py-[7pt]">
            <dt className="pp-kicker !text-ink-soft">
              {f.k}
              {f.status && <span className={`pp-pill ${f.status === "confirmed" ? "pp-mint" : "pp-sun"}`}>{statusLabel[f.status]}</span>}
            </dt>
            <dd className="mt-[2pt] font-semibold">{f.v}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-[12pt] flex items-baseline justify-between">
        <p className="pp-h3">The full schedule</p>
        <p className="pp-small pp-soft">{d.oneDay}</p>
      </div>
      <div className="mt-[6pt] grid grid-cols-2 gap-x-[16pt] gap-y-[8pt]">
        {d.phases.map((ph) => (
          <div key={ph.label} className="break-inside-avoid">
            <p className="pp-kicker">{ph.label}</p>
            <table className="mt-[2pt] w-full border-collapse">
              <tbody>
                {ph.rows.map((r) => (
                  <tr key={r.time} className="border-b-[0.75pt] border-[#dcdcd6]">
                    <td className="w-[0.85in] py-[2.5pt] font-extrabold tabular-nums">{r.time}</td>
                    <td className="py-[2.5pt]">{r.title}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </Page>
  );
}

/* --------------------------------------------------------- 4 What students build */
function Build({ copy }: { copy: Copy }) {
  const b = copy.build;
  return (
    <Page n={4} copy={copy}>
      <Head kicker="What students build" title="Real problems, working prototypes." />
      <p className="mt-[10pt]">Each team picks a track for inspiration, chooses a real problem within it, and builds a working prototype. The tracks guide ideas. They do not limit them.</p>
      <ul className="mt-[10pt] grid grid-cols-2 gap-[6pt]">
        {b.tracks.map((t, i) => (
          <li key={t.name} className={`pp-panel pp-line flex gap-[9pt] !py-[8pt] ${i === b.tracks.length - 1 && b.tracks.length % 2 ? "col-span-2" : ""}`}>
            <span aria-hidden className="mt-[2pt] h-[24pt] w-[5pt] shrink-0 rounded-[3pt]" style={{ background: `var(--color-${t.color})` }} />
            <span>
              <span className="pp-h3 block">{t.name}</span>
              <span className="block">{t.line}</span>
            </span>
          </li>
        ))}
      </ul>
      <div className="pp-panel pp-sky mt-[12pt]">
        <p className="pp-h3">What teams can make</p>
        <p className="mt-[3pt]">{b.buildTypes.join(" · ")}</p>
      </div>
      <p className="pp-h3 mt-[14pt]">What we ask every team to do</p>
      <ol className="mt-[6pt] grid grid-cols-2 gap-[8pt]">
        {b.principles.map((p, i) => (
          <li key={p.title} className="pp-panel pp-line">
            <span className="pp-kicker">0{i + 1}</span>
            <span className="pp-h3 mt-[2pt] block">{p.title}</span>
            <span className="mt-[2pt] block">{p.body}</span>
          </li>
        ))}
      </ol>
    </Page>
  );
}

/* ------------------------------------------------------- 5 Who will be in the room */
function PersonCard({ p, role, ours, tag }: { p: Person; role: string; ours: boolean; tag: string }) {
  return (
    <li className={`pp-person ${ours ? "pp-person-ours" : ""}`}>
      {p.photo && <Image src={p.photo} alt="" width={600} height={600} unoptimized />}
      <div className="min-w-0">
        <p className="text-[11pt] leading-tight font-extrabold">{p.name}</p>
        <p className="pp-small font-semibold">
          {role}
          {p.organization ? ` · ${p.organization}` : ""}
        </p>
        {p.schools && <p className="pp-small pp-soft mt-[1pt]">{p.schools.join(" · ")}</p>}
        {ours && <span className="pp-tag">{tag}</span>}
      </div>
    </li>
  );
}

function Room({ copy }: { copy: Copy }) {
  const r = copy.room;
  return (
    <Page n={5} copy={copy}>
      <Head kicker="Who will be in the room" title="Judges and organizers." />
      <ul className="mt-[10pt] grid grid-cols-3 gap-[6pt]">
        {r.judges.map((p) => (
          <PersonCard key={p.name} p={p} role="Judge" ours={r.attended(p)} tag={r.pastTag} />
        ))}
      </ul>
      <p className="pp-kicker mt-[12pt]">Organizers</p>
      <ul className="mt-[5pt] grid grid-cols-3 gap-[6pt]">
        {r.organizers.map((p) => (
          <PersonCard key={p.name} p={p} role="Organizer" ours={r.attended(p)} tag={r.pastTag} />
        ))}
      </ul>
      <p className="pp-small pp-soft mt-[8pt]">{r.note}</p>

      <div className="mt-auto">
        <div className="pp-panel pp-line">
          <p className="font-extrabold">{r.confirmedSchools}</p>
          <p className="pp-kicker mt-[8pt]">Confirmed sponsors</p>
          <ul className="mt-[6pt] flex flex-wrap items-center gap-x-[18pt] gap-y-[8pt]">
            {r.sponsors.map((s) => (
              <li key={s.name} className="flex flex-col items-center">
                <Image src={s.logo} alt={s.name} width={300} height={150} unoptimized className="h-[0.5in] w-auto max-w-[1.2in] object-contain" />
                <span className="pp-small mt-[2pt] font-semibold">
                  {s.name}
                  {s.level === "organizing" ? " · organizing partner" : ""}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Page>
  );
}

/* ---------------------------------------------------------- 6 How work is judged */
function Judging({ copy }: { copy: Copy }) {
  const j = copy.judging;
  return (
    <Page n={6} copy={copy}>
      <Head kicker="How work is judged" title="How the judges decide." />
      <p className="mt-[10pt]">Each team demonstrates its project to the judges. These are the lenses they use, in plain language. There are no point values.</p>
      <dl className="mt-[10pt] grid grid-cols-2 gap-[6pt]">
        {j.lenses.map((l) => (
          <div key={l.name} className="pp-panel pp-line">
            <dt className="pp-h3">{l.name}</dt>
            <dd className="mt-[2pt]">{l.body}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-[10pt] text-[12pt] font-extrabold text-emerald-deep">{j.complexity}</p>

      <p className="pp-h3 mt-[14pt]">Prizes</p>
      <table className="mt-[4pt] w-full border-collapse">
        <tbody>
          {j.prizes.map((p) => (
            <tr key={p.name} className="border-b-[0.75pt] border-[#dcdcd6]">
              <td className="w-[2.1in] py-[3pt] font-extrabold">{p.name}</td>
              <td className="py-[3pt]">{p.reward ?? "To be confirmed"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {j.prizesNote && <p className="pp-panel pp-sun mt-[8pt] font-extrabold">{j.prizesNote}</p>}
      <div className="mt-auto grid gap-[6pt]">
        <p className="font-semibold">{j.bonus}</p>
        <p className="pp-small pp-soft">{j.noPromises}</p>
      </div>
    </Page>
  );
}

/* ------------------------------------------------- 7 Safety, supervision and cost */
function Safety({ copy }: { copy: Copy }) {
  const s = copy.safety;
  return (
    <Page n={7} copy={copy}>
      <Head kicker="Safety, supervision and cost" title="What families and the school can rely on." />
      <dl className="mt-[10pt] grid grid-cols-2 gap-x-[14pt] gap-y-[6pt]">
        {s.provided.map((i) => (
          <div key={i.k} className="break-inside-avoid border-b-[0.75pt] border-[#dcdcd6] pb-[5pt]">
            <dt className="pp-h3 !text-[10.5pt]">{i.k}</dt>
            <dd className="mt-[1pt]">{i.v}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-[10pt] grid grid-cols-[1.35fr_1fr] gap-[8pt]">
        <div className="pp-panel pp-ink-border">
          <p className="pp-h3">Not provided</p>
          <dl className="mt-[4pt] grid gap-[4pt]">
            {s.notProvided.map((i) => (
              <div key={i.k}>
                <dt className="inline font-extrabold">{i.k}: </dt>
                <dd className="inline">{i.v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="pp-panel pp-mint">
          <p className="pp-h3">Cost</p>
          <p className="mt-[2pt] font-semibold">{s.cost}</p>
        </div>
      </div>
      <div className="pp-panel pp-sun mt-[8pt]">
        <p className="pp-h3">Being finalised, shared with families before the event</p>
        <ul className="pp-list mt-[4pt] grid-cols-2 gap-x-[14pt]">
          {s.pending.map((i) => (
            <li key={i.k}>
              <strong>{i.k}:</strong> {i.v}
            </li>
          ))}
        </ul>
      </div>
    </Page>
  );
}

/* ------------------------------------------------------- 8 What we ask, next steps */
function Next({ copy, qrSite, qrSchool }: { copy: Copy; qrSite: string; qrSchool: string }) {
  const x = copy.next;
  return (
    <Page n={8} copy={copy}>
      <Head kicker="Next steps" title={`What we ask of ${copy.short}.`} />
      <div className="mt-[10pt] grid grid-cols-[1.15fr_1fr] gap-[14pt]">
        <div>
          <ol className="pp-list">
            {x.asks.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ol>
          <p className="mt-[6pt] font-extrabold">{x.notAsked}</p>
          <p className="pp-small pp-soft mt-[6pt]">{x.planning}</p>
        </div>
        <ol className="grid gap-[4pt]">
          {x.steps.map((s) => (
            <li key={s.k} className="grid grid-cols-[1.05in_1fr] gap-[6pt] border-b-[0.75pt] border-[#dcdcd6] pb-[3pt]">
              <span className="font-extrabold" style={{ color: "var(--pp-school)" }}>
                {s.k}
              </span>
              <span>{s.v}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="pp-panel pp-sky mt-[14pt] !p-[14pt]">
        <p className="text-[17pt] leading-tight font-extrabold">{x.cta}</p>
        <p className="mt-[5pt]">{x.ctaNote}</p>
      </div>

      <div className="mt-[14pt] flex items-start justify-between gap-[14pt]">
        <div className="max-w-[3.9in]">
          <p className="font-extrabold">{x.organizers}</p>
          {x.booking && <p className="pp-small pp-soft mt-[3pt]">{x.booking}</p>}
          <p className="pp-display mt-[14pt] text-[18pt]">{x.closing.lead}</p>
          <p className="mt-[4pt] text-[12pt] font-semibold">{x.closing.line}</p>
        </div>
        <div className="flex gap-[10pt]">
          <Qr svg={qrSite} label={copy.qr.site.label} caption="Hack 876" />
          <Qr svg={qrSchool} label={copy.qr.school.label} caption={copy.qr.school.caption} />
        </div>
      </div>
    </Page>
  );
}

export async function PrincipalBooklet({ pack }: { pack: PrincipalPack }) {
  const copy = bookletCopy(pack);
  const { brief } = packSchool(pack);
  const [qrSite, qrSchool] = await Promise.all([qrSvg(copy.qr.site.url), qrSvg(copy.qr.school.url)]);
  const vars = { "--pp-school": brief.colors.primary } as CSSProperties;
  return (
    <div style={vars}>
      <Cover copy={copy} crest={brief.crest} qr={qrSchool} />
      <Why copy={copy} />
      <Day copy={copy} />
      <Build copy={copy} />
      <Room copy={copy} />
      <Judging copy={copy} />
      <Safety copy={copy} />
      <Next copy={copy} qrSite={qrSite} qrSchool={qrSchool} />
    </div>
  );
}
