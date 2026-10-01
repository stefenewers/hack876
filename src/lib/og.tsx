import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import type { ReactNode } from "react";
import { eligibility, event } from "@/data/event";

/*
 * Link-preview cards (Open Graph / Twitter), rendered at build time.
 * One look for the whole site: cream paper, the HACK 876 marker wordmark and
 * the Doctor Bird.
 */

export const OG_SIZE = { width: 1200, height: 630 };

const C = {
  cream: "#fbf4e6",
  ink: "#141716",
  soft: "#4a514d",
  emerald: "#12a150",
  aqua: "#2ec4c9",
  bill: "#ef3b2d",
  orange: "#ff7a1a",
};

const asset = (name: string) => readFile(join(process.cwd(), "src/assets/og", name));

async function load() {
  const [marker, extraBold, medium, bird] = await Promise.all([
    asset("PermanentMarker-Regular.ttf"),
    asset("Bricolage-ExtraBold.ttf"),
    asset("Bricolage-Medium.ttf"),
    asset("bird.svg"),
  ]);
  return {
    bird: `data:image/svg+xml;base64,${bird.toString("base64")}`,
    fonts: [
      { name: "Marker", data: marker, weight: 400 as const, style: "normal" as const },
      { name: "Bricolage", data: extraBold, weight: 800 as const, style: "normal" as const },
      { name: "Bricolage", data: medium, weight: 500 as const, style: "normal" as const },
    ],
  };
}

function Wordmark({ size }: { size: number }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", fontFamily: "Marker", fontSize: size, lineHeight: 1, color: C.ink }}>
      <span>HACK</span>
      <span style={{ marginLeft: size * 0.08, color: C.emerald }}>8</span>
      <span style={{ color: C.aqua }}>7</span>
      <span style={{ color: C.bill }}>6</span>
    </div>
  );
}

function Frame({ bird, birdWidth, children }: { bird: string; birdWidth: number; children: ReactNode }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        background: C.cream,
        backgroundImage: "radial-gradient(rgba(20,23,22,0.14) 1.6px, transparent 1.8px)",
        backgroundSize: "28px 28px",
        fontFamily: "Bricolage",
        color: C.ink,
      }}
    >
      {children}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={bird} width={birdWidth} height={(birdWidth * 322) / 344} style={{ position: "absolute", right: 60, top: 70 }} alt="" />
      {/* Doctor Bird streamers, as a footer rule. */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 18, display: "flex" }}>
        <div style={{ flex: 1, background: C.emerald }} />
        <div style={{ flex: 1, background: "#ffc93c" }} />
        <div style={{ flex: 1, background: C.ink }} />
      </div>
    </div>
  );
}

/** The site-wide card. */
export async function siteOgImage() {
  const { bird, fonts } = await load();
  return new ImageResponse(
    (
      <Frame bird={bird} birdWidth={400}>
        <div style={{ display: "flex", flexDirection: "column", padding: "64px 72px", width: 760 }}>
          <div style={{ display: "flex", fontSize: 24, fontWeight: 800, letterSpacing: 4, color: C.soft, textTransform: "uppercase" }}>
            Jamaica · {event.year}
          </div>
          <div style={{ display: "flex", marginTop: 26 }}>
            <Wordmark size={150} />
          </div>
          <div style={{ display: "flex", marginTop: 26, fontSize: 58, fontWeight: 800, lineHeight: 1.04, letterSpacing: -2 }}>
            {event.tagline}
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 30, fontWeight: 500, lineHeight: 1.35, color: C.soft }}>
            A one-day hackathon for Jamaican secondary-school students. ~{eligibility.maxHackers} builders, one day, real prototypes.
          </div>
        </div>
        <div style={{ position: "absolute", right: 72, bottom: 50, display: "flex", fontSize: 28, fontWeight: 800 }}>hack876.com</div>
      </Frame>
    ),
    { ...OG_SIZE, fonts },
  );
}
