#!/usr/bin/env node
/*
 * Prints the principal packs to PDF.
 *
 *   npm run print:principals                 build, serve, print every pack
 *   npm run print:principals -- --skip-build reuse the last build
 *   PRINT_DATE=2026-10-20 npm run print:principals
 *
 * Builds the site, starts the production server on a free port, prints each
 * pack's letter (1 page), booklet (8 pages) and combined pack (10 pages: a
 * cover, the letter, the booklet) with headless Chrome, writes the PDFs to
 * public/print/principals/<key>/, then stops the server.
 */
import { mkdirSync } from "node:fs";
import path from "node:path";
import { root, withPrinter } from "./print-lib.mjs";
import "./ts-resolve.mjs";

const { principalPacks } = await import(path.join(root, "src/data/principalPacks.ts"));

const views = [
  { view: "letter", route: "/letter", file: "principal-letter" },
  { view: "booklet", route: "/booklet", file: "principal-booklet" },
  { view: "pack", route: "", file: "principal-pack" },
];

for (const p of principalPacks.filter((p) => p.confirmBeforePrint)) {
  console.warn(`⚠  ${p.key}: confirm before printing. ${p.confirmNote ?? ""}`);
}

await withPrinter(`/print/principals/${principalPacks[0].key}/letter`, async (print) => {
  for (const pack of principalPacks) {
    const dir = path.join(root, "public/print/principals", pack.key);
    mkdirSync(dir, { recursive: true });
    for (const v of views) print(`/print/principals/${pack.key}${v.route}`, path.join(dir, `hack876-${pack.key}-${v.file}.pdf`));
  }
});
