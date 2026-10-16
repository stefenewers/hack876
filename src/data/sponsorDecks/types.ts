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
 * Hack876 does not ask partners for mentors, judges, speakers or volunteers.
 * Requests are for a contribution, goods, product access or information.
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

  /** For a team with no verified individual, put the whole phrase in `name` ("the SOS team") and leave `title` empty. */
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

  /**
   * The opening summary. Write this first: it is the whole proposal in five
   * sentences, and it must make sense to someone who reads nothing else.
   * Plain statements only. No amounts (the level's range is added from
   * sponsorship.ts), no superlatives, nothing the organisation has not published.
   */
  brief: {
    /** Why this organisation, built on one verified fact from `sources`. */
    fit: string;
    fitRef?: number;
    /** The primary request, stated plainly. One request, not a menu. */
    request: string;
    /** What that contribution makes possible on the day. */
    enables: string;
    /** What the organisation receives or achieves. Concrete, and true of an event of this size. */
    outcome: string;
    /** The decision or reply we are asking for next. */
    next: string;
    /** Supplier decks: quantities, timing and delivery needs. */
    logistics?: string[];
  };

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
  };

  /** Highlighted in the school list when the sponsor has a documented tie to one of our schools. */
  linkedSchool?: { school: School; text: string; ref?: number };

  /** How this organisation takes requests, if it has said. Shown beside the decision we ask for. */
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
     * "exploratory" = an invitation to discuss fit, for an organisation whose published
     *   funding rules may not cover Hack876. No amount, no ladder, no partner title.
     *   Use with `bands: []`, no `band`, and a sourced `restriction`.
     */
    lead: "band" | "inkind" | "exploratory";
    /** Suggested contribution level. Required when `lead` is "band", unless `figure` is set. */
    band?: BandKey;
    /**
     * Replaces the level's range as the headline figure when the funder sets its own terms,
     * e.g. "A programme grant", or a specific amount the organizers have agreed to ask for.
     */
    figure?: string;
    /** Replaces the request page heading, e.g. for a donation rather than a partnership. */
    headline?: string;
    /** How a grant would be used, line by line. No amounts unless the organizers have approved them. */
    budget?: { k: string; v: string }[];
    /** Levels to show. Omit for all four. An empty list shows no cash ladder at all. */
    bands?: BandKey[];
    /** What a contribution could help support, most relevant first. */
    uses: PurposeKey[];
    /** A funding rule recorded for this sponsor, e.g. no grants to individuals. Shown with the uses. */
    restriction?: string;
    /** Why this suggestion, in one or two sentences. */
    why: string;
    /** Recognition line, e.g. "Gold Partner · Inaugural Hack876". Exploratory: a plain statement such as "No funding request in this brief". */
    recognition: string;
    /** Names the invitation when a band name does not fit, e.g. "Programme Partner". */
    title?: string;
    /**
     * An existing special award (named exactly as in event.ts) that this partner could present or help support.
     * Decks may not invent awards. Record every use in awards.ts.
     */
    presents?: string;
    /** Hack876 tracks they map to: Life, Learn, Culture, Business, Move, Wellbeing, Resilience, Wildcard. */
    tracks: string[];
    /** What an in-kind contribution could actually be, for this sponsor. Exploratory: the questions we would like to ask. */
    inkind?: string[];
  };

  /** What Hack876 will measure and report, for funders whose forms ask for metrics. Use {students}-style tokens for shared facts. */
  metrics?: { k: string; v: string }[];

  /** tool decks only. */
  tool?: {
    headline: string;
    what: string;
    structures: string[];
    /** How access respects age / account terms. Must not claim the sponsor approved anything. */
    ageNote: string;
  };

  /** 2 or 3 rules we hold ourselves to (minors, marketing, data). */
  groundRules: string[];
  /** 3 to 6 year-two possibilities grounded in their existing programmes. */
  future: string[];
  /** Closing sentence, e.g. "We would love to explore the right first step with Lisa and the Seprod Foundation team." */
  closingLine: string;

  sources: DeckSource[];
};
