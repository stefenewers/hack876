/*
 * Sponsorship structure: the single source of truth for every sponsor deck.
 *
 * Two separate ideas, never merged:
 *   1. LEVEL   - how much a sponsor contributes (a band, in JMD).
 *   2. PURPOSE - what that contribution could help support.
 * A sponsor never has to fund a whole expense to take part. Say "contributes
 * toward" or "helps support", not "covers" or "funds".
 *
 * Rules:
 * - Bands are JMD and do not overlap. They are not conversions of older USD
 *   packages, and no exchange rate is assumed anywhere.
 * - Benefits are proposed, to be agreed when a sponsorship is confirmed.
 * - No band carries naming rights or any say over judging.
 * - Student prize commitments live in event.ts and are not changed here.
 */

export type BandKey = "bronze" | "silver" | "gold" | "platinum";

export type Band = {
  key: BandKey;
  name: string;
  /** Display range. Any amount inside the band is welcome. */
  range: string;
  /** Short form for tight layouts. */
  short: string;
  /** Proposed recognition. Each level includes the one before it. */
  benefits: string[];
};

export const bands: Band[] = [
  {
    key: "bronze",
    name: "Bronze Partner",
    range: "J$50,000 to below J$200,000",
    short: "J$50K to <J$200K",
    benefits: ["Recognition on the Hack876 website", "Included in the grouped sponsor thank-you", "Named in the post-event recap"],
  },
  {
    key: "silver",
    name: "Silver Partner",
    range: "J$200,000 to below J$500,000",
    short: "J$200K to <J$500K",
    benefits: ["Everything in Bronze", "Placement on event signage", "Acknowledgement in the opening and closing"],
  },
  {
    key: "gold",
    name: "Gold Partner",
    range: "J$500,000 to below J$1,000,000",
    short: "J$500K to <J$1M",
    benefits: ["Everything in Silver", "More prominent placement on the website and event signage", "A dedicated sponsor feature**", "Logo on event shirts, if shirts are produced*"],
  },
  {
    key: "platinum",
    name: "Platinum Partner",
    range: "J$1,000,000+",
    short: "J$1M+",
    benefits: ["Everything in Gold", "The most prominent placement on the website and event signage"],
  },
];

export const band = (key: BandKey) => bands.find((b) => b.key === key)!;

/** Shown under every benefits table. */
export const benefitNotes = [
  "These are proposed benefits, to be agreed when a sponsorship is confirmed. A sponsor can contribute any amount within a band.",
  "*Shirt placement applies only if event shirts are produced and artwork arrives before the production deadline.",
  "**The form of the sponsor feature is agreed with each Gold or Platinum partner before it is confirmed.",
  "The judging panel decides every award. Sponsorship does not buy influence over judging, and no level carries naming rights.",
];

/** The option for anything that is not a cash contribution of J$50,000 or more. */
export const inKind = {
  name: "In-kind & Community Support",
  text: "For contributions in kind, and for contributions below J$50,000.",
  examples: ["Devices", "Gift cards", "Meals", "Refreshments", "Supplies", "Connectivity", "Expertise"],
  recognition:
    "A meaningful in-kind contribution can be recognized at an equivalent level, based on a usable value agreed together. The advertised value of software credits or volunteer hours is not counted as cash automatically.",
};

export type PurposeKey = "overall" | "prizes" | "awards" | "meals" | "equipment" | "materials" | "production" | "signage" | "programming" | "logistics";

/** What a contribution could help support. Partial funding is the norm. */
export const purposes: Record<PurposeKey, { label: string; text: string }> = {
  overall: { label: "The event overall", text: "Used where it helps the students most." },
  prizes: { label: "Prizes", text: "Contributes toward the prizes for the top teams." },
  awards: { label: "Special awards", text: "Helps support an existing special award." },
  meals: { label: "Student meals", text: "Contributes toward meals and refreshments on the day." },
  equipment: { label: "Equipment", text: "Helps support the equipment teams build with." },
  materials: { label: "Materials", text: "Contributes toward participant materials and supplies." },
  production: { label: "Event production", text: "Helps support staging, sound and the room." },
  signage: { label: "Signage", text: "Contributes toward signage and wayfinding." },
  programming: { label: "Programming", text: "Helps support mentoring, judging and the student programme." },
  logistics: { label: "Logistics", text: "Contributes toward running the day." },
};

/** Ways to support a physical prize without buying all of it. */
export const prizeSupport = [
  "Donating the item",
  "Donating some of the quantity needed",
  "Gift cards or store credit",
  "A discount on the purchase",
  "A monetary contribution toward buying it",
];

/** How a contribution may be directed. */
export const directionNote = "A sponsor can support the event overall, or agree a specific use with the Hack876 team.";
