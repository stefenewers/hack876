/*
 * Shared plumbing for the print scripts: find Chrome, build and serve the
 * site on a free port, and print a page to PDF with headless Chrome.
 */
import { spawn, spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, rmSync, statSync } from "node:fs";
import { createServer } from "node:net";
import { tmpdir } from "node:os";
import path from "node:path";

export const root = path.resolve(import.meta.dirname, "..");

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
  ].filter(Boolean);
  for (const c of candidates) if (existsSync(c)) return c;
  for (const name of ["google-chrome", "google-chrome-stable", "chromium", "chromium-browser"]) {
    const which = spawnSync("which", [name], { encoding: "utf8" });
    if (which.status === 0 && which.stdout.trim()) return which.stdout.trim();
  }
  return null;
}

async function playwrightChrome() {
  try {
    const { chromium } = await import("playwright");
    const p = chromium.executablePath();
    return existsSync(p) ? p : null;
  } catch {
    return null;
  }
}

const freePort = () =>
  new Promise((resolve, reject) => {
    const srv = createServer();
    srv.unref();
    srv.on("error", reject);
    srv.listen(0, () => {
      const { port } = srv.address();
      srv.close(() => resolve(port));
    });
  });

async function waitFor(url, ms = 60000) {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 400));
  }
  throw new Error(`Server did not respond at ${url}`);
}

/**
 * Builds (unless --skip-build), serves the site, and calls `run(print, base)`.
 * `print(urlPath, outFile)` prints one page to PDF and returns whether it worked.
 * Exits non-zero if any PDF failed.
 */
export async function withPrinter(firstPath, run) {
  const chrome = findChrome() ?? (await playwrightChrome());
  if (!chrome) {
    console.error("Chrome not found. Install Google Chrome, set CHROME_PATH, or install Playwright's Chromium.");
    process.exit(1);
  }
  if (!process.argv.includes("--skip-build")) {
    const build = spawnSync("npm", ["run", "build"], { cwd: root, stdio: "inherit", env: process.env });
    if (build.status !== 0) process.exit(build.status ?? 1);
  }
  const port = await freePort();
  const base = `http://localhost:${port}`;
  const server = spawn(path.join(root, "node_modules/.bin/next"), ["start", "-p", String(port)], { cwd: root, stdio: ["ignore", "ignore", "inherit"], env: process.env });
  const profile = mkdtempSync(path.join(tmpdir(), "hack876-print-"));
  let failed = 0;
  const print = (urlPath, out) => {
    rmSync(out, { force: true });
    const res = spawnSync(
      chrome,
      [
        "--headless=new",
        "--disable-gpu",
        "--no-pdf-header-footer",
        "--run-all-compositor-stages-before-draw",
        "--virtual-time-budget=15000",
        `--user-data-dir=${profile}`,
        `--print-to-pdf=${out}`,
        `${base}${urlPath}`,
      ],
      { encoding: "utf8" },
    );
    const ok = res.status === 0 && existsSync(out) && statSync(out).size > 0;
    if (!ok) failed++;
    console.log(`${ok ? "ok  " : "FAIL"} ${path.relative(root, out)}`);
    return ok;
  };
  try {
    await waitFor(`${base}${firstPath}`);
    await run(print, base);
  } finally {
    server.kill("SIGTERM");
    rmSync(profile, { recursive: true, force: true });
  }
  if (failed) {
    console.error(`${failed} PDF(s) failed.`);
    process.exit(1);
  }
}
