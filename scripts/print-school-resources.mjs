#!/usr/bin/env node
/*
 * Prints every confirmed school's one-page sheets to PDF: student flyer,
 * parent information, faculty overview and poster.
 *
 *   npm run print:schools                 build, serve, print every sheet
 *   npm run print:schools -- --skip-build reuse the last build
 *
 * Each sheet is printed from /schools/<slug>/sheets/<key> to the `href` the
 * hub links to (public/proposals/hack876-<slug>-<name>.pdf), so a hub never
 * links to a file that was not printed. The PNG graphics and QR codes need no
 * printing: they are generated at build time.
 */
import path from "node:path";
import { root, withPrinter } from "./print-lib.mjs";
import "./ts-resolve.mjs";

const { schoolHubs } = await import(path.join(root, "src/data/schoolBriefs.ts"));
const { schoolSheets } = await import(path.join(root, "src/data/schoolHub.ts"));

await withPrinter(`/schools/${schoolHubs[0].slug}/sheets/students`, async (print) => {
  for (const brief of schoolHubs) {
    for (const sheet of schoolSheets(brief)) print(`/schools/${brief.slug}/sheets/${sheet.key}`, path.join(root, "public", sheet.href));
  }
});
