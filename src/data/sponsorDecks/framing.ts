import type { SponsorDeckData } from "./types";

/*
 * How a deck frames its ask. Kept apart from the React template so the rules
 * can be tested on their own (see framing.test.ts).
 */

type Ask = SponsorDeckData["ask"];

/** An invitation to discuss fit. No amount, no ladder, no partner title. */
export const isExploratory = (ask: Ask) => ask.lead === "exploratory";

/** Whether a deck shows the cash ladder at all. Exploratory briefs never do. */
export const showsBands = (ask: Ask) => !isExploratory(ask) && (!ask.bands || ask.bands.length > 0);

/** Tool-access and exploratory decks are briefs. Everything else is a proposal. */
export const docType = (deck: Pick<SponsorDeckData, "kind" | "ask">): "brief" | "proposal" =>
  deck.kind === "tool" || isExploratory(deck.ask) ? "brief" : "proposal";

/**
 * The reading format, which sets how many pages a deck gets.
 * "major"       full corporate or foundation proposal
 * "standard"    a smaller cash proposal
 * "supplier"    goods, services, people or product access
 * "exploratory" a question about fit
 */
export type DeckFormat = "major" | "standard" | "supplier" | "exploratory";

export const deckFormat = (deck: Pick<SponsorDeckData, "kind" | "ask">): DeckFormat =>
  isExploratory(deck.ask) ? "exploratory" : deck.kind === "tool" || deck.ask.lead === "inkind" ? "supplier" : deck.kind === "full" ? "major" : "standard";

/** Pages after the opening summary, in order. Used by the renderer and checked in tests so no format produces an empty page. */
export const pagePlan = (deck: Pick<SponsorDeckData, "kind" | "ask" | "sources">): string[] => {
  /* The appendix carries the levels. A long source list also gets it, so sources never crowd the decision page. */
  const levels = showsBands(deck.ask) || deck.sources.length > 5 ? ["appendix"] : [];
  switch (deckFormat(deck)) {
    case "major":
      return ["summary", "why", "request", "delivery", "next", "appendix"];
    case "standard":
      return ["summary", "why", "request", "deliverynext", "appendix"];
    case "supplier":
      return ["summary", "supply", ...(deck.kind === "tool" ? ["terms"] : []), "deliverynext", ...levels];
    case "exploratory":
      return ["summary", "explore"];
  }
};
