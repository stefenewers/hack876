import type { School } from "../event";

/*
 * One private sponsor proposal = one SponsorDeckData entry, rendered by
 * src/components/proposal/SponsorDeck.tsx at /<slug>opportunity.
 *
 * Event numbers, prizes, schools and tier amounts come from event.ts and the
 * component. Never restate them here. Every sponsor-specific claim carries a
 * `ref` that points at an entry in `sources` (first-party wherever possible).
 *
 * Copy rules: no em dashes; never "Title Sponsor" or naming rights; never
 * imply the sponsor has agreed to anything; no invented people, quotes,
 * titles or numbers.
 */

export type DeckKind =
  /** Gold-style foundation / corporate proposal (modelled on jmmbopportunity). */
  | "full"
  /** Prize, people or in-kind ask (modelled on norusopportunity). */
  | "prize"
  /** Access to a tool or product, no tiers (modelled on mlh / obvious). */
  | "tool";

export type TierKey =
  /** Founding Gold Partner, J$1,000,000. */
  | "gold"
  /** Official Prize Partner, ~US$3,500 (the podium prizes). */
  | "prize"
  /** All special awards (US$600), or US$200 for one. */
  | "special"
  /** Food & Student Experience, US$1,000 (cash or in-kind). */
  | "food"
  /** In-kind / People: time, expertise, products. */
  | "inkind";

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

  ask: {
    tier: TierKey;
    fallback?: TierKey;
    /** Why this tier, in one or two sentences. */
    why: string;
    /** Recognition line, e.g. "Official Prize Partner · Inaugural Hack876". */
    recognition: string;
    /** A proposed custom award, clearly a suggestion. */
    award?: { name: string; text: string };
    /** Hack876 tracks they map to: Life, Learn, Culture, Business, Move, Wellbeing, Resilience, Wildcard. */
    tracks: string[];
    /** prize/inkind decks: what an in-kind contribution could actually be. */
    inkind?: string[];
    /**
     * Replaces the recommended tier's name, amount and coverage, for sponsors
     * whose rules don't fit a standard tier (e.g. no grants to individuals).
     */
    custom?: { name: string; amount: string; covers: string[] };
    /** Standard tiers that must not be offered to this sponsor. */
    hideTiers?: TierKey[];
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
