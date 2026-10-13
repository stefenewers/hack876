import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { test } from "node:test";
import { eligibility, prizes } from "../event.ts";
import { band, bands, benefitNotes } from "../sponsorship.ts";
import { awardOffers } from "./awards.ts";
import { decisions } from "./decisions.ts";
import { deckFormat, isExploratory, pagePlan } from "./framing.ts";
import { deckRegistry, readinessHelp, readinessLabel } from "./registry.ts";
import type { SponsorDeckData } from "./types.ts";

/* Maintenance checks across every partnership deck, template-driven or hand-built. */

const dir = "src/data/sponsorDecks";
const notDecks = new Set(["types.ts", "registry.ts", "framing.ts", "awards.ts", "decisions.ts"]);
const files = readdirSync(dir).filter((f) => f.endsWith(".ts") && !f.endsWith(".test.ts") && !notDecks.has(f));
const decks: SponsorDeckData[] = await Promise.all(files.map(async (f) => (await import(`./${f}`)).default));
const text = (d: SponsorDeckData) => JSON.stringify({ ...d, sources: [] });

const pages = readdirSync("src/app")
  .filter((d) => d.endsWith("opportunity"))
  .map((d) => ({ slug: d.replace(/opportunity$/, ""), src: readFileSync(`src/app/${d}/page.tsx`, "utf8") }));

test("contribution levels are contiguous and do not overlap", () => {
  assert.deepEqual(bands.map((b) => b.key), ["bronze", "silver", "gold", "platinum"]);
  const edges = bands.map((b) => [...b.range.matchAll(/J\$([\d,]+)/g)].map((m) => Number(m[1].replace(/,/g, ""))));
  assert.deepEqual(edges, [[50000, 200000], [200000, 500000], [500000, 1000000], [1000000]]);
  for (const b of bands.slice(0, 3)) assert.match(b.range, /to below/);
  assert.match(bands[3].range, /\+$/);
});

test("every deck opens with a complete summary", () => {
  for (const d of decks) {
    for (const k of ["fit", "request", "enables", "outcome", "next"] as const) {
      assert.ok(d.brief[k] && d.brief[k].length > 20, `${d.slug} brief.${k} is missing or too thin`);
    }
    assert.doesNotMatch(JSON.stringify(d.brief), /J\$\s?\d/, `${d.slug} quotes an amount in its brief`);
  }
  for (const p of pages) {
    assert.ok(/<SponsorDeck |<OpeningSummary/.test(p.src), `${p.slug} has no opening summary`);
    if (p.src.includes("<OpeningSummary")) assert.ok(/<NextSection|<DeliveryAndNext|ContactLine|contactEmail/.test(p.src), `${p.slug} names no Hack876 contact`);
  }
});

test("no page in a deck's plan can render empty", () => {
  for (const d of decks) {
    const plan = pagePlan(d);
    assert.equal(new Set(plan).size, plan.length, `${d.slug} repeats a page`);
    assert.equal(plan[0], "summary");
    if (plan.includes("why") || plan.includes("supply") || plan.includes("explore")) assert.ok(d.why.points.length > 0, `${d.slug} has no why points`);
    if (plan.includes("why")) assert.ok(d.story.items.length > 0, `${d.slug} has no story items`);
    if (plan.includes("supply")) assert.ok(d.ask.inkind?.length, `${d.slug} asks for nothing on its request page`);
    if (plan.includes("terms")) assert.ok(d.tool, `${d.slug} has a terms page but no tool`);
    if (plan.includes("explore")) assert.ok(d.ask.inkind?.length && d.ask.restriction, `${d.slug} has an empty explore page`);
    assert.ok(d.sources.length > 0, `${d.slug} has no sources`);
    if (deckFormat(d) === "exploratory") assert.equal(plan.length, 2);
    if (deckFormat(d) === "supplier") assert.ok(plan.length <= 5);
  }
});

test("exploratory briefs carry no cash ask", () => {
  for (const d of decks.filter((d) => isExploratory(d.ask))) {
    assert.equal(d.ask.band, undefined);
    assert.equal(d.ask.figure, undefined);
    assert.ok(!pagePlan(d).includes("request") && !pagePlan(d).includes("appendix"));
    assert.doesNotMatch(JSON.stringify(d.brief), /contribution|sponsor|partner level|bronze|silver|gold|platinum/i, `${d.slug} reads like a cash ask`);
  }
});

test("decks do not contradict or duplicate shared facts", () => {
  for (const d of decks) {
    const t = text(d);
    assert.doesNotMatch(t, /host school|school campus|partner schools|Spanish Court/i, `${d.slug} hardcodes or contradicts the venue or school wording`);
    assert.doesNotMatch(t, /not yet confirmed|has confirmed its participation/i, `${d.slug} states a school status. Statuses come from event.ts`);
    assert.doesNotMatch(t, /—/, `${d.slug} uses an em dash`);
    for (const m of t.matchAll(/\b(\d{2,3}) (?:secondary-school )?students\b/g)) {
      if (!/Sources|ref/.test(m[0]) && Number(m[1]) === 80) assert.equal(Number(m[1]), eligibility.maxHackers);
    }
    assert.doesNotMatch(JSON.stringify(d.brief) + JSON.stringify(d.ask.inkind ?? []), /\b80\b/, `${d.slug} hardcodes the student count. Use {students}`);
  }
  for (const p of pages) {
    assert.doesNotMatch(p.src.replace(/\s+/g, " "), /partner schools|host school/i, `${p.slug} calls the school network partner schools`);
    assert.doesNotMatch(p.src, /\btitle sponsor\b/i);
  }
});

test("decks only mention awards that exist, and the register matches", () => {
  const real = prizes.filter((p) => !p.place).map((p) => p.name);
  for (const o of awardOffers) assert.ok(real.includes(o.award), `${o.award} is not an award in event.ts`);
  for (const d of decks) {
    assert.doesNotMatch(text(d), /(proposed|suggested|recurring)[^.]{0,60}\baward\b/i, `${d.slug} proposes a new award`);
    if (d.ask.presents) {
      assert.ok(real.includes(d.ask.presents), `${d.slug} names an award that does not exist`);
      assert.ok(awardOffers.find((o) => o.award === d.ask.presents)?.mentionedIn.includes(d.slug), `${d.slug} is missing from awards.ts`);
    }
  }
  for (const o of awardOffers) {
    for (const slug of o.mentionedIn) {
      const d = decks.find((x) => x.slug === slug);
      if (d) assert.equal(d.ask.presents, o.award, `awards.ts lists ${slug} for ${o.award} but the deck does not`);
    }
  }
});

test("no deck asks a partner for people, except Norus", () => {
  const ask = /\b(as|their|your|our) (mentors?|judges?|speakers?|volunteers?)\b|\b(mentors?|judges?|speakers?|volunteers?) (from|on the day|in the room)\b|people in the room/i;
  for (const d of decks) {
    const t = JSON.stringify({ hero: d.hero, brief: { ...d.brief, logistics: [] }, ask: d.ask, future: d.future });
    assert.doesNotMatch(t, ask, `${d.slug} asks for people`);
  }
  for (const p of pages.filter((p) => p.slug !== "norus")) {
    assert.doesNotMatch(p.src, /MoreThanMoney|People in the room|ShowUp/, `${p.slug} still has a people-in-the-room section`);
  }
});

test("the decision register stays internal and points at real decks", () => {
  const slugs = new Set(deckRegistry.map((d) => d.route.replace(/^\/|opportunity$/g, "")));
  for (const d of decisions) for (const s of d.affects) assert.ok(slugs.has(s), `${d.id} points at unknown deck ${s}`);
  const read = (p: string): string[] => readdirSync(p, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? read(`${p}/${e.name}`) : [`${p}/${e.name}`]));
  for (const f of [...read("src/app"), ...read("src/components")].filter((f) => /\.tsx?$/.test(f))) {
    assert.doesNotMatch(readFileSync(f, "utf8"), /sponsorDecks\/(decisions|awards)/, `${f} imports an internal register`);
  }
});

/* ---------- Finishing-pass checks ---------- */

const CUSTOM_PLATINUM = ["loring", "gracekennedy", "scotiainvestments", "jmmb", "cardinallaw"];
const slugOf = (route: string) => route.replace(/^\/|opportunity$/g, "");

test("hand-built decks take tier names and amounts from sponsorship.ts", () => {
  for (const p of pages) {
    assert.doesNotMatch(p.src, /J\$\s?\d{1,3}(,\d{3})+/, `${p.slug} hardcodes a JMD amount`);
    assert.doesNotMatch(p.src, /Founding (Gold |Platinum )?Partner ·/, `${p.slug} uses a Founding Partner tier label`);
  }
  for (const slug of CUSTOM_PLATINUM) {
    const src = pages.find((p) => p.slug === slug)!.src;
    assert.match(src, /band\("platinum"\)/, `${slug} does not read the Platinum level from sponsorship.ts`);
    assert.match(src, /\{PLATINUM\.range\}/);
    assert.match(src, /recommended="platinum"/, `${slug} appendix does not agree with its request`);
  }
});

test("Platinum includes Gold, and no level offers a role in the programme", () => {
  assert.ok(band("platinum").benefits.includes("Everything in Gold"));
  assert.ok(band("gold").benefits.includes("Everything in Silver"));
  assert.ok(band("silver").benefits.includes("Everything in Bronze"));
  const shared = JSON.stringify([bands.map((b) => b.benefits), benefitNotes]);
  assert.doesNotMatch(shared, /speak|mentor|take part in the programme|address students|present(ing)? an award|judging opportunit/i);
  assert.match(shared, /does not buy influence over judging/);
  assert.match(shared, /naming rights/);
  assert.match(shared, /if shirts are produced/);
  for (const p of pages.filter((p) => p.slug !== "norus")) {
    assert.doesNotMatch(p.src, /address students|opportunity to (speak|take part in the programme)|present the award on stage/i, `${p.slug} offers a speaking or programme role`);
  }
});

test("grant and exploratory briefs carry no sponsorship-tier language", () => {
  const grants = decks.filter((d) => d.ask.figure || isExploratory(d.ask));
  assert.ok(grants.some((d) => d.slug === "americanfriendsofjamaica"));
  for (const d of grants) {
    assert.deepEqual(d.ask.bands, [], `${d.slug} shows the levels`);
    assert.equal(d.ask.band, undefined);
    assert.equal(d.ask.title, undefined, `${d.slug} carries a partner title`);
    assert.doesNotMatch(JSON.stringify({ brief: d.brief, ask: d.ask }), /within a (band|level)|\b(Bronze|Silver|Gold|Platinum)\b|Partner ·|smaller grant/, `${d.slug} uses tier language`);
  }
});

test("every deck has an editorial readiness, in step with the decision register", () => {
  for (const d of deckRegistry) {
    assert.ok(d.readiness in readinessLabel && d.readiness in readinessHelp, `${d.name} has no readiness`);
  }
  const state = (slug: string) => deckRegistry.find((d) => slugOf(d.route) === slug)!.readiness;
  for (const dec of decisions) {
    for (const slug of dec.affects) {
      if (dec.neededBefore === "introduction") assert.equal(state(slug), "hold", `${slug} is blocked by ${dec.id} but not held`);
      if (dec.id === "budget-basis" || dec.id === "registered-recipient" || dec.id === "date-dependent-applications") assert.notEqual(state(slug), "ready", `${slug} is marked ready despite ${dec.id}`);
    }
  }
  for (const d of decks.filter((d) => isExploratory(d.ask))) assert.equal(state(d.slug), "intro");
  for (const d of decks.filter((d) => d.ask.lead === "band" && (d.ask.band === "gold" || d.ask.band === "platinum"))) assert.notEqual(state(d.slug), "ready", `${d.slug} asks at Gold or Platinum without a budget`);
  /* Readiness wording shown in the browser must not carry internal reasoning. */
  assert.doesNotMatch(JSON.stringify(readinessHelp), /budget|lunch|recipient|decision/i);
});

test("the hub offers no link or PDF for a held proposal", () => {
  const hub = readFileSync("src/components/partnerhub/PartnerHub.tsx", "utf8");
  assert.match(hub, /if \(d\.readiness === "hold"\) return;/, "copy is not blocked for held proposals");
  const held = hub.slice(hub.indexOf("{held ? ("), hub.indexOf(") : (", hub.indexOf("{held ? (")));
  assert.equal((held.match(/<button type="button" disabled/g) ?? []).length, 2, "held proposals need both actions disabled");
  assert.doesNotMatch(held, /href=|download=|onClick=/, "a held proposal still exposes a link, download or copy");
  assert.doesNotMatch(hub, /sponsorDecks\/decisions/);
  assert.match(hub, /useState<Readiness \| "all">\("ready"\)/, "the hub should open on ready proposals");
});
