import assert from "node:assert/strict";
import { test } from "node:test";
import "../../scripts/ts-resolve.mjs";

/* Content rules for the principal print packs. The copy tested here is exactly what prints. */

const { bookletCopy, confirmedLine, letterCopy, principalPacks, signatories } = await import("./principalPacks.ts");
const { confirmedSchools, event, people } = await import("./event.ts");
const { schoolBriefs } = await import("./schoolBriefs.ts");

const KEYS = ["ardenne", "jamaica-college", "immaculate", "st-andrew", "st-georges", "aisk", "wolmers", "wolmers-girls"];
const brief = (slug: string) => schoolBriefs.find((b) => b.slug === slug);
const DATE = "2026-10-16";

const copyFor = (key: string) => {
  const pack = principalPacks.find((p) => p.key === key)!;
  const letter = letterCopy(pack, DATE);
  const booklet = bookletCopy(pack);
  return { pack, letter, booklet, text: JSON.stringify(letter) + JSON.stringify(booklet) };
};

test("packs exist for exactly the target schools", () => {
  assert.deepEqual(
    principalPacks.map((p) => p.key),
    KEYS,
  );
});

test("no pack goes to a confirmed school", () => {
  for (const p of principalPacks) {
    const b = brief(p.briefSlug);
    assert.ok(b, `${p.key}: no school brief "${p.briefSlug}"`);
    assert.ok(!confirmedSchools.includes(b.school), `${p.key} maps to ${b.school}, which has confirmed`);
    assert.ok(!/campion|hillel/i.test(p.address.join(" ")), `${p.key} is addressed to a confirmed school`);
  }
});

test("an unverified recipient is never named", () => {
  for (const p of principalPacks.filter((p) => !p.verified)) {
    const { letter, booklet } = copyFor(p.key);
    assert.equal(letter.salutation, "Dear Principal,");
    assert.equal(letter.address[0], "The Principal");
    assert.equal(letter.close, "Yours faithfully,");
    assert.equal(booklet.cover.preparedFor, "Prepared for the Principal");
  }
  for (const p of principalPacks.filter((p) => p.verified)) assert.equal(copyFor(p.key).letter.close, "Yours sincerely,");
});

test("every letter carries the email address and both organizers", () => {
  const organizers = people.filter((p) => p.role === "organizer" && p.confirmed).map((p) => p.name);
  assert.deepEqual([...signatories.map((s) => s.name)].sort(), [...organizers].sort());
  for (const s of signatories) assert.equal(s.title, "Co-organizer, Hack 876");
  for (const key of KEYS) {
    const { letter } = copyFor(key);
    const all = JSON.stringify(letter);
    assert.ok(event.contactEmail && all.includes(event.contactEmail), `${key} letter has no email address`);
    for (const name of organizers) assert.ok(all.includes(name), `${key} letter does not name ${name}`);
    assert.match(letter.ref, /^Our ref: H876\/PRN\/[A-Z]+\/2026-01$/);
    assert.equal(letter.date, "16 October 2026");
  }
});

test("the copy follows the wording rules", () => {
  for (const key of KEYS) {
    const { booklet, text } = copyFor(key);
    assert.doesNotMatch(text, /claude|anthropic/i, `${key} mentions Claude or Anthropic`);
    assert.doesNotMatch(text, /\bmost\b[^.]*first hackathon/i, `${key} says "most" about first hackathons`);
    assert.match(text, /[Mm]any students will be at their first hackathon/);
    /* Only Campion and Hillel are ever described as having confirmed. */
    const rest = text.replaceAll(confirmedLine(booklet.short), "");
    assert.doesNotMatch(rest, /(has|have) (agreed|confirmed|partnered)/i, `${key} says a school has agreed or confirmed`);
    assert.doesNotMatch(text, /partner school|participating school/i, `${key} calls the reader's school a partner or participating school`);
    assert.doesNotMatch(text, /Walker Cup|death|died/i, `${key} mentions a school controversy`);
    assert.doesNotMatch(text, /—/, `${key} uses an em dash`);
  }
});

test("the St George's applicant line is off, and never names a student", () => {
  const p = principalPacks.find((p) => p.key === "st-georges")!;
  assert.equal(p.extraLine, undefined);
  assert.doesNotMatch(JSON.stringify(letterCopy(p, DATE)), /applied/);
});

test("Wolmer's Girls' does not reuse the Boys' School examples", () => {
  const { text } = copyFor("wolmers-girls");
  assert.doesNotMatch(text, /Boys|Robotics Olympics|FTC Jamaica/);
});
