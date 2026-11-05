import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import QRCode from "qrcode";
import { eligibility, eventWhen, mlh, venue } from "@/data/event";
import type { SchoolBrief } from "@/data/schoolBriefs";
import { hubUrl, hubUrlShort, mediaVariants, type MediaKey } from "@/data/schoolHub";
import { C, load, Wordmark } from "./og";

/*
 * Share graphics for a school hub, rendered at build time from the school's
 * entry and event.ts. One template, laid out for each size, so a newly
 * confirmed school gets every graphic without new code. Hack 876 leads; the
 * school's crest and colour are accents. Only the essentials, plus a QR code
 * to the school's hub, which stays the source of truth.
 */

const crestData = async (brief: SchoolBrief) => `data:image/png;base64,${(await readFile(join(process.cwd(), "public", brief.crest))).toString("base64")}`;

const qrData = (brief: SchoolBrief, width: number) =>
  QRCode.toDataURL(hubUrl(brief), { margin: 1, width, errorCorrectionLevel: "M", color: { dark: C.ink, light: "#ffffff" } });

/** The QR code alone, as a PNG. */
export async function schoolQrPng(brief: SchoolBrief) {
  const png = await QRCode.toBuffer(hubUrl(brief), { margin: 2, width: 1024, errorCorrectionLevel: "M", color: { dark: C.ink, light: "#ffffff" } });
  return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png", "Cache-Control": "public, max-age=3600" } });
}

/* Per-size type and spacing, in units of 1/1080 of the short side. */
const LAYOUT = {
  feed: { pad: [72, 76, 84], word: 150, bird: 180, crest: 168, headline: 70, facts: 38, qr: 230, gap: 30 },
  square: { pad: [60, 64, 76], word: 118, bird: 150, crest: 146, headline: 0, facts: 34, qr: 190, gap: 26 },
  story: { pad: [130, 76, 150], word: 172, bird: 190, crest: 210, headline: 92, facts: 44, qr: 300, gap: 60 },
} as const;

/** Typographic apostrophes for display ("Wolmer’s Girls’ School"). */
const pretty = (s: string) => s.replace(/'/g, "’");

export async function schoolGraphic(brief: SchoolBrief, key: Exclude<MediaKey, "qr">) {
  const v = mediaVariants.find((m) => m.key === key)!;
  const { width: W, height: H } = v;
  const wide = W > H;
  /* Everything is sized from the short side, so each layout keeps its proportions. */
  const og = key === "og";
  /* The link preview is short but wide, so it keeps full-size type. */
  const u = og ? 1 : Math.min(W, H) / 1080;
  const px = (n: number) => Math.round(n * u);
  const [{ bird, fonts }, crest, qr] = await Promise.all([load(), crestData(brief), qrData(brief, px(wide ? 400 : 360))]);
  const primary = brief.colors.primary;

  const Crest = ({ size }: { size: number }) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        borderRadius: size * 0.2,
        background: "#ffffff",
        border: `${px(5)}px solid ${C.ink}`,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={crest} alt="" style={{ width: size * 0.78, height: size * 0.78, objectFit: "contain" }} />
    </div>
  );

  const Badge = () => (
    <div
      style={{
        display: "flex",
        alignSelf: "flex-start",
        background: primary,
        color: "#ffffff",
        borderRadius: 999,
        padding: `${px(10)}px ${px(26)}px`,
        fontSize: px(og ? 26 : 27),
        fontWeight: 800,
        letterSpacing: px(2),
        textTransform: "uppercase",
      }}
    >
      Confirmed participating school
    </div>
  );

  const School = ({ size }: { size: number }) => (
    <div style={{ display: "flex", alignItems: "center", gap: px(28) }}>
      <Crest size={size} />
      <div style={{ display: "flex", flexDirection: "column", gap: px(12), flex: 1 }}>
        <div style={{ display: "flex", fontSize: px(og ? 58 : size > px(180) ? 72 : 60), fontWeight: 800, lineHeight: 1.02, letterSpacing: -px(1.5) }}>{pretty(brief.school)}</div>
        <Badge />
      </div>
    </div>
  );

  const facts = [eventWhen.long, `${venue.name}, Kingston`, `Open to ${brief.localForms ?? eligibility.forms}`, "Free · No coding experience needed"];
  const Headline = ({ size }: { size: number }) => (
    <div style={{ display: "flex", flexDirection: "column", fontSize: size, fontWeight: 800, lineHeight: 1.04, letterSpacing: -px(2.5) }}>
      <span>Build something</span>
      <span>that should exist.</span>
    </div>
  );

  const Facts = ({ size }: { size: number }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: px(12) }}>
      {facts.map((f, i) => (
        <div key={f} style={{ display: "flex", alignItems: "center", gap: px(18), fontSize: size, fontWeight: i < 2 ? 800 : 500, lineHeight: 1.2 }}>
          <div style={{ display: "flex", width: px(18), height: px(18), borderRadius: 999, background: [C.emerald, "#ffc93c", C.bill, C.aqua][i], border: `${px(3)}px solid ${C.ink}` }} />
          <div style={{ display: "flex", flex: 1 }}>{f}</div>
        </div>
      ))}
    </div>
  );

  const Cta = ({ qrSize }: { qrSize: number }) => (
    <div style={{ display: "flex", alignItems: "center", gap: px(32), background: "#ffffff", border: `${px(5)}px solid ${C.ink}`, borderRadius: px(36), padding: px(26) }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={qr} alt="" width={qrSize} height={qrSize} />
      <div style={{ display: "flex", flexDirection: "column", gap: px(10), flex: 1 }}>
        <div style={{ display: "flex", fontSize: px(46), fontWeight: 800, lineHeight: 1.05, letterSpacing: -px(1) }}>Learn more & register</div>
        <div style={{ display: "flex", fontSize: px(30), fontWeight: 800, color: primary }}>{hubUrlShort(brief)}</div>
        <div style={{ display: "flex", fontSize: px(26), fontWeight: 500, color: C.soft }}>Scan the code or visit the link</div>
      </div>
    </div>
  );

  const Streamers = () => (
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: px(26), display: "flex" }}>
      <div style={{ flex: 1, background: C.emerald }} />
      <div style={{ flex: 1, background: "#ffc93c" }} />
      <div style={{ flex: 1, background: C.ink }} />
    </div>
  );

  const Mlh = () => <div style={{ display: "flex", fontSize: px(30), fontWeight: 800, color: C.emerald }}>{mlh.hackDayBadge}</div>;

  const frame = {
    width: "100%",
    height: "100%",
    display: "flex",
    position: "relative" as const,
    background: C.cream,
    backgroundImage: "radial-gradient(rgba(20,23,22,0.12) 1.6px, transparent 1.8px)",
    backgroundSize: `${px(30)}px ${px(30)}px`,
    fontFamily: "Bricolage",
    color: C.ink,
    /* A thin band of the school's colour down the left edge. */
    borderLeft: `${px(22)}px solid ${primary}`,
  };

  let body;
  if (og) {
    body = (
      <div style={{ display: "flex", flexDirection: "column", padding: `${px(56)}px ${px(64)}px`, width: "100%", gap: px(30) }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Wordmark size={px(120)} />
          <Mlh />
        </div>
        <School size={px(190)} />
        <div style={{ display: "flex", fontSize: px(40), fontWeight: 800, marginTop: px(6) }}>
          {eventWhen.long} · {venue.name}, Kingston
        </div>
      </div>
    );
  } else if (wide) {
    body = (
      <div style={{ display: "flex", width: "100%", padding: `${px(80)}px ${px(90)}px`, gap: px(80) }}>
        <div style={{ display: "flex", flexDirection: "column", flex: 1.25, gap: px(40) }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Wordmark size={px(150)} />
          </div>
          <School size={px(190)} />
          <Headline size={px(66)} />
          <Mlh />
        </div>
        <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: px(44), justifyContent: "center" }}>
          <Facts size={px(40)} />
          <Cta qrSize={px(250)} />
        </div>
      </div>
    );
  } else {
    const L = LAYOUT[key as keyof typeof LAYOUT];
    body = (
      <div style={{ display: "flex", flexDirection: "column", width: "100%", padding: `${px(L.pad[0])}px ${px(L.pad[1])}px ${px(L.pad[2])}px`, gap: px(L.gap) }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: px(6) }}>
            <Wordmark size={px(L.word)} />
            <Mlh />
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={bird} width={px(L.bird)} height={px(L.bird) * (322 / 344)} alt="" />
        </div>
        <School size={px(L.crest)} />
        {L.headline > 0 && <Headline size={px(L.headline)} />}
        <Facts size={px(L.facts)} />
        <div style={{ display: "flex", flex: 1 }} />
        <Cta qrSize={px(L.qr)} />
      </div>
    );
  }

  return new ImageResponse(
    (
      <div style={frame}>
        {body}
        <Streamers />
      </div>
    ),
    { width: W, height: H, fonts },
  );
}
