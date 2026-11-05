import assert from "node:assert/strict";
import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import "../../scripts/ts-resolve.mjs";

/*
 * The school lifecycle: event.ts `confirmedSchools` is the only source of
 * truth, every confirmed school has a working hub, and nothing else can look
 * confirmed. No participant data is used here.
 */

const { confirmedSchools, eligibility, schools } = await import("./event.ts");
const { getSchoolBrief, isHub, schoolBriefs, schoolHubs, schoolRelationship } = await import("./schoolBriefs.ts");
const { formsFor, hubFaqs, hubLiaison, mediaFile, mediaVariants, quickStatus, schoolResources, schoolSheets, shareMessages, ambassadorRole } = await import("./schoolHub.ts");

const hub = (slug: string) => {
  const b = getSchoolBrief(slug);
  assert.ok(b, `no entry "${slug}"`);
  return b;
};

/** Everything a hub (and its sheets and graphics) can show, as one string. */
const hubText = (slug: string) => {
  const b = hub(slug);
  return JSON.stringify([b.hub, hubLiaison(b), b.liaison, hubFaqs(b), quickStatus(b), shareMessages(b), schoolResources(b), ambassadorRole(b)]);
};

test("every confirmed school has an operational hub, in confirmedSchools order", () => {
  assert.deepEqual(
    schoolHubs.map((b) => b.school),
    [...confirmedSchools],
  );
  for (const b of schoolHubs) assert.ok(b.hub && isHub(b), `${b.school} has no hub`);
});

test("only confirmed schools are hubs or can look confirmed", () => {
  for (const b of schoolBriefs) {
    const confirmed = (confirmedSchools as readonly string[]).includes(b.school);
    assert.equal(isHub(b), confirmed && Boolean(b.hub), `${b.slug}: hub state does not match confirmedSchools`);
    assert.equal(schoolRelationship(b) === "confirmed", confirmed, `${b.slug}: relationship does not match confirmedSchools`);
    if (b.hub) assert.ok(confirmed, `${b.slug} has hub data but is not confirmed`);
  }
  for (const s of confirmedSchools) assert.ok((schools as readonly string[]).includes(s), `${s} is not in schools`);
});

test("Campion, Hillel and Wolmer's Girls' are confirmed hubs", () => {
  for (const [slug, school] of [
    ["campion", "Campion College"],
    ["hillel", "Hillel Academy"],
    ["wolmers-girls", "Wolmer's Girls' School"],
  ]) {
    const b = hub(slug);
    assert.equal(b.school, school);
    assert.ok(isHub(b), `${slug} is not a hub`);
    assert.equal(schoolRelationship(b), "confirmed");
  }
});

test("Wolmer's Boys' is not the confirmed Wolmer's school, and none of its details reach the Girls' hub", () => {
  const boys = hub("wolmers");
  assert.equal(boys.school, "Wolmer's Boys' School");
  assert.equal(isHub(boys), false);
  assert.notEqual(schoolRelationship(boys), "confirmed");
  const girls = hubText("wolmers-girls");
  for (const boysOnly of [/Pennycooke/, /Janice Jones/, /Boys/, /Robotics Olympics/, /FTC/, /wbs\./i]) {
    assert.doesNotMatch(girls, boysOnly, `the Wolmer's Girls' hub mentions ${boysOnly}`);
  }
  assert.doesNotMatch(JSON.stringify(hub("wolmers-girls").fit), /Boys|Robotics Olympics|FTC/);
});

test("the /schools page lists the confirmed hubs, not every brief", () => {
  const page = readFileSync("src/app/schools/page.tsx", "utf8");
  assert.match(page, /schoolHubs\.map/);
  assert.doesNotMatch(page, /schoolBriefs\.(map|filter)/);
});

test("hub slugs are unique and every hub has a crest", () => {
  const slugs = schoolBriefs.map((b) => b.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  for (const b of schoolHubs) {
    const crest = join("public", b.crest);
    assert.ok(existsSync(crest) && statSync(crest).size > 0, `${b.slug}: crest ${b.crest} missing`);
  }
});

test("eligibility wording is right for each school", () => {
  assert.equal(formsFor(hub("campion")), eligibility.forms);
  assert.equal(formsFor(hub("hillel")), `${eligibility.forms} (Grades 11 to 13 at Hillel)`);
  assert.equal(formsFor(hub("wolmers-girls")), eligibility.forms);
});

test("every hub download points at a real or generated file", () => {
  for (const b of schoolHubs) {
    const generated = new Set(mediaVariants.map((v) => `/schools/${b.slug}/media/${mediaFile(b, v.key)}`));
    for (const group of schoolResources(b)) {
      for (const it of group.items) {
        if (!it.filename) continue;
        assert.ok(it.filename.includes(b.school) && it.filename.includes("Hack 876"), `${it.filename} does not name the school and Hack 876`);
        if (it.href.startsWith(`/schools/${b.slug}/media/`)) {
          assert.ok(generated.has(it.href), `${it.href} is not generated`);
        } else {
          const file = join("public", it.href);
          assert.ok(existsSync(file) && statSync(file).size > 0, `${b.slug}: ${it.href} is missing. Run npm run print:schools.`);
        }
      }
    }
    for (const s of schoolSheets(b)) assert.ok(existsSync(join("public", s.href)), `${b.slug}: sheet ${s.href} is missing. Run npm run print:schools.`);
  }
});

test("confirmed hubs carry no outreach language", () => {
  for (const b of schoolHubs) {
    assert.equal(b.outreach, undefined, `${b.slug} still has outreach set`);
    const text = hubText(b.slug);
    for (const stale of [/if (the school|[\w’']+) agrees/i, /15-minute call/i, /fifteen minutes/i, /has not confirmed participation/i, /not yet discussed/i]) {
      assert.doesNotMatch(text, stale, `${b.slug} hub contains "${stale}"`);
    }
  }
});

test("pending details stay visibly pending", () => {
  const girls = quickStatus(hub("wolmers-girls"));
  assert.equal(girls.find((f) => f.k === "Faculty liaison")?.v, "To be confirmed");
  assert.equal(girls.find((f) => f.k.endsWith("planning estimate"))?.v, "Not set");
  for (const b of schoolHubs) assert.equal(quickStatus(b)[0].v, "Confirmed participating school");
});
