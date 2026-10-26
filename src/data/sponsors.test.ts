import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import "../../scripts/ts-resolve.mjs";

/* Event partners (MLH, Cloudflare): exact wording, official logos, and never listed as funders. */

const { eventPartners, localSponsors, mlh, sponsors } = await import("./event.ts");
const { sponsorList } = await import("./partnership.ts");
const { bookletCopy, principalPacks } = await import("./principalPacks.ts");

const MLH = sponsors.find((s) => s.name === "Major League Hacking (MLH)");
const CF = sponsors.find((s) => s.name === "Cloudflare");

test("MLH and Cloudflare are confirmed event partners with the exact wording", () => {
  assert.ok(MLH && CF);
  assert.deepEqual(
    { url: MLH.url, level: MLH.level, role: MLH.role, confirmed: MLH.confirmed },
    { url: "https://mlh.com", level: "program", role: "Official MLH Hack Day", confirmed: true },
  );
  assert.deepEqual(
    { url: CF.url, level: CF.level, role: CF.role, confirmed: CF.confirmed },
    { url: "https://www.cloudflare.com", level: "challenge", role: "Challenge partner: Best Use of Cloudflare", confirmed: true },
  );
  assert.ok(MLH.alt && CF.alt);
  assert.equal(mlh.hackDayBadge, "An official MLH Hack Day");
  assert.equal(MLH.logo, mlh.logo);
});

test("partner logos are the official, unaltered files", () => {
  const mlhFile = join("public", MLH!.logo);
  assert.ok(existsSync(mlhFile) && statSync(mlhFile).size > 0, "MLH logo missing");
  assert.ok(readFileSync(mlhFile, "utf8").startsWith("<svg"), "MLH logo is not the SVG");
  // Cloudflare's press-kit logo, used with its written permission.
  assert.equal(CF!.logo, "/sponsors/cloudflare-logo.png");
  const cfFile = join("public", CF!.logo);
  assert.ok(existsSync(cfFile) && statSync(cfFile).size > 0, "Cloudflare logo missing");
  assert.deepEqual([...readFileSync(cfFile).subarray(1, 4)], [0x50, 0x4e, 0x47], "Cloudflare logo is not a PNG");
});

test("display order: organizing, then program, then challenge, then local sponsors", () => {
  const rank = { organizing: 0, program: 1, challenge: 2, partner: 3 } as const;
  const ranks = sponsors.map((s) => rank[s.level]);
  assert.deepEqual(ranks, [...ranks].sort((a, b) => a - b));
  assert.deepEqual(
    eventPartners.map((s) => s.name),
    ["Major League Hacking (MLH)", "Cloudflare"],
  );
});

test("event partners never appear in a list of funders", () => {
  const partnerNames = eventPartners.map((s) => s.name);
  for (const name of partnerNames) {
    assert.ok(!localSponsors.some((s) => s.name === name), `${name} is in localSponsors`);
    assert.ok(!sponsorList.includes(name), `${name} is in the deck sponsor phrase`);
    for (const pack of principalPacks) {
      assert.ok(!bookletCopy(pack).room.sponsors.some((s) => s.name === name), `${name} is in the ${pack.key} booklet's sponsors`);
    }
  }
  assert.ok(!/MLH|Cloudflare/.test(sponsorList));
});

test("no MLH Trust Badge anywhere", () => {
  assert.doesNotMatch(JSON.stringify(sponsors), /trust badge/i);
  const files = (dir: string): string[] => readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? files(join(dir, e.name)) : [join(dir, e.name)]));
  for (const f of files("public")) assert.doesNotMatch(f, /trust[-_ ]?badge/i, `${f} looks like a trust badge`);
  for (const f of files("src").filter((f) => /\.(ts|tsx|css)$/.test(f) && !f.endsWith(".test.ts"))) {
    assert.doesNotMatch(readFileSync(f, "utf8"), /trust badge/i, `${f} mentions a trust badge`);
  }
});
