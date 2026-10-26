import { test } from "node:test";
import assert from "node:assert/strict";
import { normalizeUrl, validatePartner } from "./partner.ts";

test("normalizeUrl handles usernames, bare domains and junk", () => {
  assert.equal(normalizeUrl("@jada-b", { githubUsername: true }), "https://github.com/jada-b");
  assert.equal(normalizeUrl("jada.dev"), "https://jada.dev/");
  assert.equal(normalizeUrl(""), "");
  assert.equal(normalizeUrl("not a url"), null);
});

test("partner form validation", () => {
  assert.equal(validatePartner({}).ok, false);
  const r = validatePartner({ name: "Sam", organization: "Acme", email: "sam@acme.com", message: "We'd love to help with food." });
  assert.equal(r.ok, true);
});
