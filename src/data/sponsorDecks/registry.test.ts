import assert from "node:assert/strict";
import { existsSync, readdirSync } from "node:fs";
import { test } from "node:test";
import { deckCategories, deckRegistry } from "./registry.ts";

/* Every proposal page must be in the registry, and every registry entry must point at real files. */

const routes = readdirSync("src/app")
  .filter((d) => d.endsWith("opportunity"))
  .map((d) => `/${d}`)
  .sort();

test("every opportunity page has a registry entry", () => {
  assert.deepEqual(deckRegistry.map((d) => d.route).sort(), routes);
});

test("every registry entry points at an existing page and PDF", () => {
  for (const d of deckRegistry) {
    assert.ok(existsSync(`src/app${d.route}/page.tsx`), `missing page for ${d.name}`);
    assert.ok(existsSync(`public${d.pdf}`), `missing PDF for ${d.name}`);
    assert.ok(deckCategories.includes(d.category), `unknown category for ${d.name}`);
    assert.ok(d.filename.endsWith(".pdf"));
  }
});

test("routes and PDFs are unique", () => {
  assert.equal(new Set(deckRegistry.map((d) => d.route)).size, deckRegistry.length);
  assert.equal(new Set(deckRegistry.map((d) => d.pdf)).size, deckRegistry.length);
});
