import { test } from "node:test";
import assert from "node:assert/strict";
import { normalizeUrl, validateApplication, validatePartner } from "./application.ts";

const opts = { schools: ["Hillel Academy", "Campion College"], forms: ["5th Form", "Lower 6th Form", "Upper 6th Form"] };

const valid = {
  fullName: "Jada Brown",
  email: "Jada@Example.com ",
  phone: "(876) 555-0123",
  school: "Hillel Academy",
  form: "Lower 6th Form",
  age: "17",
  enjoy: "I like fixing things that annoy people every day.",
  built: "I built a tiny bot that reminds my class about homework.",
  why: "I want to build something real with people from other schools.",
  jamaica: "Knowing when the bus is actually coming to my stop.",
  role: "Design",
  hasTeam: "no",
  teammates: "",
  openToMatch: "yes",
  github: "",
  portfolio: "",
  projectLink: "",
};

test("accepts a complete application and normalizes fields", () => {
  const r = validateApplication(valid, opts);
  assert.equal(r.ok, true);
  if (r.ok) {
    assert.equal(r.value.email, "jada@example.com");
    assert.equal(r.value.age, 17);
  }
});

test("GitHub, portfolio and project links are optional", () => {
  const r = validateApplication({ ...valid, github: "", portfolio: "", projectLink: "" }, opts);
  assert.equal(r.ok, true);
});

test("requires every core field", () => {
  const r = validateApplication({}, opts);
  assert.equal(r.ok, false);
  if (!r.ok) {
    for (const k of ["fullName", "email", "phone", "school", "form", "age", "enjoy", "built", "why", "jamaica", "role", "hasTeam", "openToMatch"]) {
      assert.ok(r.errors[k as keyof typeof r.errors], `expected error for ${k}`);
    }
    assert.equal(r.errors.github, undefined);
  }
});

test("rejects schools and forms outside the list", () => {
  const r = validateApplication({ ...valid, school: "Somewhere Else", form: "3rd Form" }, opts);
  assert.equal(r.ok, false);
  if (!r.ok) {
    assert.ok(r.errors.school);
    assert.ok(r.errors.form);
  }
});

test("teammates required only when the applicant has a team", () => {
  const withTeam = validateApplication({ ...valid, hasTeam: "yes", teammates: "" }, opts);
  assert.equal(withTeam.ok, false);
  const withNames = validateApplication({ ...valid, hasTeam: "yes", teammates: "Ali, Bree, Chris" }, opts);
  assert.equal(withNames.ok, true);
  const noTeam = validateApplication({ ...valid, hasTeam: "no", teammates: "leftover" }, opts);
  assert.equal(noTeam.ok && noTeam.value.teammates, "");
});

test("age must be a sensible whole number", () => {
  for (const age of ["abc", "9", "30", "16.5"]) {
    assert.equal(validateApplication({ ...valid, age }, opts).ok, false, age);
  }
});

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
