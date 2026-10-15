import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
import { test } from "node:test";
import { docType, isExploratory, showsBands } from "./framing.ts";
import type { SponsorDeckData } from "./types.ts";

/* Loads every deck data file and checks how each one frames its ask. */

const skip = new Set(["types.ts", "registry.ts", "framing.ts", "awards.ts", "decisions.ts"]);
const files = readdirSync("src/data/sponsorDecks").filter((f) => f.endsWith(".ts") && !f.endsWith(".test.ts") && !skip.has(f));
const decks: SponsorDeckData[] = await Promise.all(files.map(async (f) => (await import(`./${f}`)).default));

const exploratory = decks.filter((d) => isExploratory(d.ask));

test("the two foundation briefs are exploratory", () => {
  assert.deepEqual(exploratory.map((d) => d.slug).sort(), ["gracekennedyfoundation"]);
});

test("an exploratory brief shows no amount, no ladder and no partner title", () => {
  for (const d of exploratory) {
    assert.equal(d.ask.band, undefined, `${d.slug} suggests a level`);
    assert.deepEqual(d.ask.bands, [], `${d.slug} lists levels`);
    assert.equal(showsBands(d.ask), false);
    assert.equal(docType(d), "brief");
    assert.ok(d.ask.restriction, `${d.slug} needs the published restriction`);
    assert.doesNotMatch(`${d.ask.recognition} ${d.ask.title ?? ""}`, /partner|sponsor|bronze|silver|gold|platinum/i);
    assert.doesNotMatch(JSON.stringify(d), /J\$\s?\d/, `${d.slug} quotes an amount`);
  }
});

test("an exploratory brief never shows the ladder, even if levels are listed by mistake", () => {
  assert.equal(showsBands({ ...exploratory[0].ask, bands: undefined }), false);
  assert.equal(showsBands({ ...exploratory[0].ask, bands: ["bronze"] }), false);
});

test("existing band and in-kind decks behave as before", () => {
  for (const d of decks.filter((d) => !isExploratory(d.ask))) {
    assert.ok(d.ask.lead === "band" || d.ask.lead === "inkind");
    if (d.ask.lead === "band") assert.ok(d.ask.band || d.ask.figure, `${d.slug} leads with a level but names none`);
    assert.equal(showsBands(d.ask), !d.ask.bands || d.ask.bands.length > 0);
    assert.equal(docType(d), d.kind === "tool" ? "brief" : "proposal");
  }
});

test("every sourced claim points at a listed source", () => {
  for (const d of decks) {
    const ids = new Set(d.sources.map((s) => s.id));
    const refs = [d.recipient.ref, d.why.mission?.ref, ...d.why.points.map((p) => p.ref), ...d.story.items.map((i) => i.ref), d.pathsNote?.ref, d.linkedSchool?.ref];
    for (const r of refs) if (r !== undefined) assert.ok(ids.has(r), `${d.slug} cites missing source ${r}`);
  }
});
