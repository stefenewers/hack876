import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { alumniSummary, judgeAlumniLine, organizerAlumniClause } from "./alumni.ts";
import { people } from "./event.ts";

/* Organizer and judge wording must follow event.ts, never assume both organizers attended a school. */

test("Campion: both organizers attended", () => {
  assert.equal(organizerAlumniClause(people, "Campion College", "Campion"), ", who both attended Campion");
  assert.match(alumniSummary(people, "Campion College", "Campion"), /both organizers/);
});

test("Hillel: only Stefen attended, and one judge", () => {
  const clause = organizerAlumniClause(people, "Hillel Academy", "Hillel");
  assert.equal(clause, ". Stefen Ewers attended Hillel");
  assert.doesNotMatch(clause, /both/);
  assert.equal(alumniSummary(people, "Hillel Academy", "Hillel"), "One of the judges and one of the two organizers of Hack 876 are former Hillel students.");
  assert.equal(judgeAlumniLine(people, "Hillel Academy", "Hillel"), "One of the judges is a former Hillel student. ");
});

test("a school no organizer attended gets no organizer wording", () => {
  assert.equal(organizerAlumniClause(people, "Wolmer's", "Wolmer's"), "");
  assert.doesNotMatch(alumniSummary(people, "Wolmer's", "Wolmer's"), /organizer/);
});

test("hub and sheet components no longer hardcode the both-attended wording", () => {
  for (const f of ["src/components/schools/SchoolHubPage.tsx", "src/components/schools/SchoolSheet.tsx", "src/data/schoolHub.ts"]) {
    assert.doesNotMatch(readFileSync(f, "utf8"), /who both attended \$\{|Several of the judges are former/, `${f} assumes alumni wording`);
  }
});
