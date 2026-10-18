import { test } from "node:test";
import assert from "node:assert/strict";
import { CAPACITY, validateCrew } from "./crew.ts";

const valid = {
  fullName: "Andre Campbell",
  organization: "Freelance",
  email: "Andre@Example.com ",
  phone: "(876) 555-0123",
  capacity: "steady",
  needle: "I can sort out lunch for the volunteers.",
};

test("accepts a complete sign-up and lowercases the email", () => {
  const r = validateCrew(valid);
  assert.equal(r.ok, true);
  if (r.ok) {
    assert.equal(r.value.email, "andre@example.com");
    assert.equal(r.value.capacity, "steady");
  }
});

test("every capacity key is accepted", () => {
  for (const c of CAPACITY) assert.equal(validateCrew({ ...valid, capacity: c.key }).ok, true, c.key);
});

test("requires every field", () => {
  const r = validateCrew({});
  assert.equal(r.ok, false);
  if (!r.ok) {
    for (const k of ["fullName", "organization", "email", "phone", "capacity", "needle"]) {
      assert.ok(r.errors[k as keyof typeof r.errors], `expected error for ${k}`);
    }
    assert.match(r.errors.organization ?? "", /Freelance/);
  }
});

test("rejects an unknown capacity key", () => {
  const r = validateCrew({ ...valid, capacity: "Steady" });
  assert.equal(r.ok, false);
  if (!r.ok) assert.ok(r.errors.capacity);
});

test("checks lengths", () => {
  const cases: [string, unknown][] = [
    ["fullName", "A"],
    ["fullName", "x".repeat(101)],
    ["organization", "x".repeat(121)],
    ["needle", "Short"],
    ["needle", "x".repeat(601)],
  ];
  for (const [k, v] of cases) {
    const r = validateCrew({ ...valid, [k]: v });
    assert.equal(r.ok, false, `${k} should fail for length ${String(v).length}`);
    if (!r.ok) assert.ok(r.errors[k as keyof typeof r.errors]);
  }
  assert.equal(validateCrew({ ...valid, organization: "X" }).ok, true, "a one-character organization is allowed");
});

test("rejects a bad email", () => {
  for (const email of ["andre", "andre@example", `${"a".repeat(195)}@example.com`]) {
    const r = validateCrew({ ...valid, email });
    assert.equal(r.ok, false, email);
  }
});

test("phone needs 7 to 15 digits and only phone characters", () => {
  for (const phone of ["555 01", "1".repeat(16), "876-555-0123 ext"]) {
    const r = validateCrew({ ...valid, phone });
    assert.equal(r.ok, false, phone);
    if (!r.ok) assert.ok(r.errors.phone);
  }
  assert.equal(validateCrew({ ...valid, phone: "+1 876.555.0123" }).ok, true);
});
