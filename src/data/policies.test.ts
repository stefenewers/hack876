import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import "../../scripts/ts-resolve.mjs";

/*
 * The Rules and Code of Conduct pages read every MLH URL and email from
 * event.ts, so the page source names the constant and the constant holds the
 * exact value. Both halves are checked here.
 */

const { copilotChallenge, event, mlh, registration } = await import("./event.ts");
const rules = readFileSync("src/app/rules/page.tsx", "utf8");
const conduct = readFileSync("src/app/code-of-conduct/page.tsx", "utf8");

test("the MLH constants hold the exact program URLs and emails", () => {
  assert.equal(registration.url, "https://mlh.link/hack-876");
  assert.equal(registration.eventPageUrl, "https://events.mlh.com/events/15649-hack-876");
  assert.equal(registration.challengesUrl, "https://www.mlh.com/events/hack-876/challenges");
  assert.equal(mlh.codeOfConductUrl, "https://mlh.io/code-of-conduct");
  assert.equal(mlh.incidentEmail, "incidents@mlh.io");
  assert.equal(mlh.standardRulesUrl, "https://github.com/MLH/mlh-policies/blob/main/standard-hackathon-rules.md");
  assert.equal(event.contactEmail, "info@hack876.com");
  assert.deepEqual(
    copilotChallenge.docs.map((d) => d.href),
    [
      "https://docs.github.com/en/copilot",
      "https://docs.github.com/en/copilot/get-started/quickstart-for-using-github-copilot-on-github-com",
      "https://education.github.com/pack",
      "https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository",
    ],
  );
});

test("the Rules page links the Challenges page, MLH rules, MLH Code of Conduct and GitHub Copilot docs", () => {
  for (const ref of ["registration.challengesUrl", "mlh.standardRulesUrl", "mlh.codeOfConductUrl", "copilotChallenge.docs"]) {
    assert.ok(rules.includes(ref), `rules page does not use ${ref}`);
  }
  assert.match(rules, /id: "submitting"/);
  assert.match(rules, /id: "copilot"/);
  assert.doesNotMatch(rules, /devpost/i);
});

test("the Code of Conduct page shows both report contacts and links the MLH Code of Conduct", () => {
  for (const ref of ["mlh.incidentEmail", "event.contactEmail", "mlh.codeOfConductUrl"]) {
    assert.ok(conduct.includes(ref), `code of conduct page does not use ${ref}`);
  }
  assert.doesNotMatch(conduct, /devpost/i);
});

test("the event date is final", async () => {
  const { eventWhen } = await import("./event.ts");
  assert.deepEqual(Object.keys(eventWhen).sort(), ["long", "short"], "eventWhen still carries a tentative flag or note");
  assert.equal(eventWhen.long, "Saturday 20 February 2027");
  assert.ok(!("dateTentative" in event));
});

test("/apply redirects to MLH registration with a 301", async () => {
  const { default: config } = await import("../../next.config.ts");
  const redirects = await config.redirects!();
  for (const source of ["/apply", "/apply/:path*"]) {
    const r = redirects.find((x) => x.source === source);
    assert.ok(r, `no redirect for ${source}`);
    assert.equal(r.destination, registration.url);
    assert.equal((r as { statusCode?: number }).statusCode, 301);
  }
});
