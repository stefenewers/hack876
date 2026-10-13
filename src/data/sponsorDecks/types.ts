import type { School } from "../event";
import type { BandKey, PurposeKey } from "../sponsorship";

/*
 * One private sponsor proposal = one SponsorDeckData entry, rendered by
 * src/components/proposal/SponsorDeck.tsx at /<slug>opportunity.
 *
 * Event numbers, prizes and schools come from event.ts. Contribution levels,
 * benefits and purposes come from src/data/sponsorship.ts. Never restate them
 * here, and never quote a sponsorship amount in a deck's own copy. Every sponsor-specific claim carries a
 * `ref` that points at an entry in `sources` (first-party wherever possible).
 *
 * Copy rules: no em dashes; never "Title Sponsor" or naming rights; never
 * imply the sponsor has agreed to anything; no invented people, quotes,
 * titles or numbers.
 */

export type DeckKind =
  /** Full foundation / corporate proposal (modelled on jmmbopportunity). */
  | "full"
  /** Prize, people or in-kind ask (modelled on norusopportunity). */
  | "prize"
  /** Access to a tool or product, no tiers (modelled on mlh / obvious). */
  | "tool";

export type DeckSource = { id: number; org: string; label: string; href: string };

/** A sourced sentence. `ref` must exist in `sources`. */
export type Sourced = { text: string; ref: number };

export type Illustration = "Seedling" | "Shelter" | "Blueprint" | "Compounding" | "IdeaToRealWorld" | "MentorRoom" | "none";

export type SponsorDeckData = {
  /** Lowercase, no separators. Route is /<slug>opportunity. */
  slug: string;
  kind: DeckKind;
  /** Full name, used in recognition lines and the deck label. */
  sponsor: string;
  /** Short name used in running copy. */
  short: string;
  /** Set to "the" when running copy should read "the British Council", "the Seprod Foundation". */
  article?: "the";
  /** Brand colour, taken from the sponsor's own site or brand guide. Used sparingly. */
  accent: string;

  recipient: { name: string; title: string; ref?: number };
  /** Footer line, e.g. "A private partnership proposal prepared for Lisa D'Oyen, Executive Director, Seprod Foundation." */
  preparedFor: string;

  hero: {
    /** Plain text. `highlight` must be a substring of it and is drawn emphasised. */
    headline: string;
    highlight: string;
    /** One or two sentences. */
    sub: string;
  };

  /** full only: five futures for the "big idea" illustration. Icons from components/art/Icons. */
  futurePaths?: { icon: string; label: string }[];

  why: {
    headline: string;
    mission?: { label: string; quote: string; ref: number };
    /** 3 to 5 sourced points. */
    points: Sourced[];
    /** One bold sentence tying it back to Hack876. Unsourced, must not be a claim about the sponsor. */
    tie: string;
  };

  story: {
    kicker: string;
    headline: string;
    format: "milestones" | "evidence" | "initiatives";
    /** 4 to 6 items. `label` is a year for milestones, a short kicker otherwise. */
    items: { label: string; title?: string; text: string; ref: number }[];
    takeaway: string;
    art: Illustration;
  };

  /** Only a real, confirmed person. Omit when there is no bridge. */
  bridge?: { name: string; role: string; lines: string[] };
  /** Highlighted in the school list when the sponsor has a documented tie to one of our schools. */
  linkedSchool?: { school: School; text: string; ref?: number };

  /** 1 or 2 routes in, e.g. foundation vs marketing. */
  paths: { label: string; title: string; points: string[] }[];
  pathsNote?: Sourced;

  /**
   * The ask. Level (how much) and purpose (what it supports) are separate.
   * Bands, benefits and purposes are defined once in src/data/sponsorship.ts.
   */
  ask: {
    /**
     * What leads the ask.
     * "band"   = a cash contribution at a suggested level.
     * "inkind" = goods, services, people or product access. Cash is the alternative.
     */
    lead: "band" | "inkind";
    /** Suggested contribution level. Required when `lead` is "band". */
    band?: BandKey;
    /** Levels to show. Omit for all four. An empty list shows no cash ladder at all. */
    bands?: BandKey[];
    /** What a contribution could help support, most relevant first. */
    uses: PurposeKey[];
    /** A funding rule recorded for this sponsor, e.g. no grants to individuals. Shown with the uses. */
    restriction?: string;
    /** Why this suggestion, in one or two sentences. */
    why: string;
    /** Recognition line, e.g. "Gold Partner · Inaugural Hack876". */
    recognition: string;
    /** Names the invitation when a band name does not fit, e.g. "Programme Partner". */
    title?: string;
    /** A proposed custom award, clearly a suggestion. */
    award?: { name: string; text: string };
    /** Hack876 tracks they map to: Life, Learn, Culture, Business, Move, Wellbeing, Resilience, Wildcard. */
    tracks: string[];
    /** What an in-kind contribution could actually be, for this sponsor. */
    inkind?: string[];
  };

  /** tool decks only. */
  tool?: {
    headline: string;
    what: string;
    structures: string[];
    /** How access respects age / account terms. Must not claim the sponsor approved anything. */
    ageNote: string;
  };

  /** 4 to 6 ways their people could take part. */
  roles: { title: string; text: string }[];
  /** 2 or 3 rules we hold ourselves to (minors, marketing, data). */
  groundRules: string[];
  /** 3 to 6 year-two possibilities grounded in their existing programmes. */
  future: string[];
  /** 4 to 6 questions this reader is likely to ask. */
  questions: string[];
  /** Closing sentence, e.g. "We would love to explore the right first step with Lisa and the Seprod Foundation team." */
  closingLine: string;

  sources: DeckSource[];
};
