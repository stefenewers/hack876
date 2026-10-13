/*
 * Award availability: the one place that records which partnership decks
 * mention which award. Internal. Never rendered to a recipient.
 *
 * Rules:
 * - The only special awards are the ones in event.ts (`prizes` without a
 *   `place`). A deck may not invent a new award to personalise a pitch.
 * - A deck may suggest that a partner's support is recognised alongside one
 *   existing award, by setting `ask.presents` to its name. That is a suggestion, never
 *   a naming right, and the judging panel always decides the winner.
 * - Each award can be linked to one partner. When more than one deck
 *   mentions the same award, the first partner to confirm takes it and the
 *   other decks must be updated before they are sent again.
 *
 * `awards.test.ts` fails if a deck names an award that does not exist, or if
 * this register and the decks disagree.
 */

export type AwardOffer = {
  /** Award name, exactly as in event.ts. */
  award: string;
  /** Deck slugs whose proposal mentions presenting or supporting this award. */
  mentionedIn: string[];
  /** Set to a deck slug once a partner has confirmed. Then remove the award from the other decks. */
  confirmedWith: string | null;
};

export const awardOffers: AwardOffer[] = [
  { award: "Best Design", mentionedIn: ["figmaeducation", "macspot"], confirmedWith: null },
  { award: "Boldest Idea", mentionedIn: ["usainboltfoundation"], confirmedWith: null },
  { award: "People’s Choice", mentionedIn: ["macspot"], confirmedWith: null },
];
