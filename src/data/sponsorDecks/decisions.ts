/*
 * Decision register: open organiser decisions that affect partnership decks.
 * Internal. Never imported by a page or component, and never shown to a
 * recipient (decks.test.ts checks this).
 *
 * One entry per decision, not one per deck. `affects` lists deck slugs; an
 * empty list means every deck. `neededBefore` says when it has to be settled:
 *   "introduction"  before the proposal is forwarded at all
 *   "commitment"    before a formal request, application or agreement
 *   "fulfilment"    before the contribution is delivered or reported on
 *
 * What the hub shows comes from `readiness` in registry.ts. Keep the two in
 * step, and remove an entry once it is decided and the decks reflect it.
 */

export type Decision = {
  id: string;
  question: string;
  recommendation: string;
  affects: string[];
  neededBefore: "introduction" | "commitment" | "fulfilment";
};

export const decisions: Decision[] = [
  {
    id: "one-lunch-provider",
    question: "Juici Patties and Island Grill are both asked for the same lunch.",
    recommendation: "Choose which to approach first, or give them different meals (for example lunch and an afternoon snack). Then set the first to \"ready\".",
    affects: ["juicipatties", "islandgrill"],
    neededBefore: "introduction",
  },
  {
    id: "sandals-grant-route",
    question: "The Sandals Foundation's project grants exclude one-off events and require a legally registered organisation. The proposal asks directly and offers to follow the grant route instead.",
    recommendation: "If the Foundation asks for an application, use the next concept window and the registered recipient from \"registered-recipient\". Until then, treat its reply as the decision.",
    affects: ["sandalsfoundation"],
    neededBefore: "commitment",
  },
  {
    id: "wisynco-family",
    question: "Wisynco owns a stake in Trade Winds Citrus, the maker of Tru-Juice, and distributes it. The WATA proposal also goes to Wisynco, so both beverage requests may reach the same people.",
    recommendation: "Mention the other request when sending either one, and say Hack876 is happy for Wisynco to decide which product fits best.",
    affects: ["wisynco", "trujuice"],
    neededBefore: "commitment",
  },
  {
    id: "digicel-programme",
    question: "The Build Jamaica proposal commits to coding and online-safety workshops in participating schools from November to February, kits that stay with schools, and follow-up. Who runs the workshops, at which schools, and the line amounts are not set. Build Jamaica also excludes organisations that pass funds to third parties.",
    recommendation: "Name the registered applicant (a school or NGO) that will deliver the programme with Hack876, confirm facilitators and schools, and set the budget lines before applying. Applications open October 22.",
    affects: ["digicelbuildjamaica"],
    neededBefore: "commitment",
  },
  {
    id: "scotiarise-timing",
    question: "Scotiabank allows at least 90 days for a response, so a request sent in mid-October is answered by mid-January at the earliest, about five weeks before the event.",
    recommendation: "Submit the ScotiaRISE form as soon as a registered non-profit applicant is confirmed, and treat it as support for the day itself or for next year if the answer comes late.",
    affects: ["scotiarise"],
    neededBefore: "commitment",
  },
  {
    id: "budget-basis",
    question: "There is no approved event budget in the repository. Missing inputs: the total event cost; a cost for each of venue and production, meals, prizes, equipment and materials, signage and shirts; what is already confirmed in cash and in kind (the venue is hosted); and the remaining gap.",
    recommendation: "Write a one-page budget with those lines and add it as a shared appendix to every Gold and Platinum proposal. Until then those proposals are introduction only and say that a budget will follow.",
    affects: ["loring", "gracekennedy", "scotiainvestments", "jmmb", "cardinallaw", "ncbfoundation", "digicelfoundation", "seprodfoundation", "jpsfoundation", "supremeventuresfoundation", "microsoft"],
    neededBefore: "commitment",
  },
  {
    id: "registered-recipient",
    question: "Several funders give only to a registered organisation or a school. Nothing in the repository says which organisation can receive and account for funds for Hack876.",
    recommendation: "Name the registered entity, or get a school's written agreement to act as recipient. Do not assume a school has agreed.",
    affects: ["americanfriendsofjamaica", "mayberryfoundation", "gracekennedyfoundation", "digicelfoundation", "ncbfoundation", "jmmb", "digicelbuildjamaica", "cibccomtrust", "scotiarise"],
    neededBefore: "commitment",
  },
  {
    id: "date-dependent-applications",
    question: "Replit and Seeed take applications against a confirmed event date. The date is still tentative.",
    recommendation: "Use both briefs for preliminary contact only. Submit the applications once schools confirm the date.",
    affects: ["replit", "seeedstudio"],
    neededBefore: "commitment",
  },
  {
    id: "benefit-specification",
    question: "The levels promise signage placement and, for Gold and Platinum, a dedicated sponsor feature. Neither is specified anywhere: what signage will exist, and what form and channel the feature takes.",
    recommendation: "Decide both before any Silver or higher partner confirms, and write them into sponsorship.ts. Until then the decks say the feature is agreed with each partner.",
    affects: [],
    neededBefore: "commitment",
  },
  {
    id: "event-shirts",
    question: "Gold and Platinum include a shirt logo only if shirts are produced. That has not been decided.",
    recommendation: "Decide before any Gold or Platinum partner confirms, and tell them the artwork deadline.",
    affects: [],
    neededBefore: "commitment",
  },
  {
    id: "recap-commitment",
    question: "Every deck promises a written recap after the event. No deadline or owner is documented.",
    recommendation: "Commit to sending it within 30 days of the event, written by one named organiser. This is a recommendation, not yet an approved commitment, so the decks give no date.",
    affects: [],
    neededBefore: "commitment",
  },
  {
    id: "award-recognition",
    question: "Best Design is mentioned in both the Figma and MacSpot decks, and Boldest Idea in the Usain Bolt Foundation deck. Each award can be linked to one partner.",
    recommendation: "First partner to confirm takes it. Record it in awards.ts and remove it from the other deck before that deck goes out again.",
    affects: ["figmaeducation", "macspot", "usainboltfoundation"],
    neededBefore: "commitment",
  },
  {
    id: "pickle-redemption",
    question: "The Pickle & Chill deck does not say which team would receive the vouchers or what the redemption conditions are.",
    recommendation: "Attach the experience to one existing award, and agree conditions with the club before announcing it.",
    affects: ["pickleandchill"],
    neededBefore: "commitment",
  },
  {
    id: "catering-headcount",
    question: "Food and water decks ask for about 80 students plus adults. The number of mentors, judges, teachers and volunteers is not recorded anywhere.",
    recommendation: "Count the adults and give suppliers one total in writing. The decks promise a final headcount before anything is ordered.",
    affects: ["juicipatties", "islandgrill", "wisynco", "trujuice", "mayberryfoundation"],
    neededBefore: "fulfilment",
  },
  {
    id: "venue-wifi",
    question: "Nobody has tested whether the venue's Wi-Fi can carry about 80 students working at once.",
    recommendation: "Test it at the hotel before the event. If it falls short, arrange extra connectivity directly.",
    affects: ["replit", "obvious"],
    neededBefore: "fulfilment",
  },
];
