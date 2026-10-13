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
