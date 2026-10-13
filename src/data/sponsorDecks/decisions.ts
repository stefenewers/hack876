/*
 * Decision register: open organiser decisions that affect partnership decks.
 * Internal. Never imported by a page or component, and never shown to a
 * recipient (decks.test.ts checks this).
 *
 * One entry per decision, not one per deck. `affects` lists deck slugs.
 * `holdSending` means the listed decks should not go out until it is resolved.
 * Remove an entry when it is decided and the decks reflect the answer.
 */

export type Decision = {
  id: string;
  question: string;
  recommendation: string;
  affects: string[];
  holdSending: boolean;
};

export const decisions: Decision[] = [
  {
    id: "budget-basis",
    question: "There is no written budget behind the Platinum invitations. A funder asked for J$1,000,000 or more will ask what it pays for.",
    recommendation: "Write a one-page budget by use (equipment, prizes, meals, production, programming) and attach it to every Platinum proposal. Until then, send these only as a conversation opener through a warm contact.",
    affects: ["loring", "gracekennedy", "scotiainvestments", "jmmb", "cardinallaw", "ncbfoundation", "digicelfoundation"],
    holdSending: true,
  },
  {
    id: "registered-recipient",
    question: "Several funders give only to a registered organisation or a school. The decks do not say who would receive funds for Hack876.",
    recommendation: "Name the registered partner or host school that can receive and account for grants, then add it to the AFJ deck before any application.",
    affects: ["americanfriendsofjamaica", "mayberryfoundation", "gracekennedyfoundation", "sandalsfoundation", "digicelfoundation", "jmmb"],
    holdSending: false,
  },
  {
    id: "catering-headcount",
    question: "Food and water decks ask for about 80 students plus adults, but the number of mentors, judges, teachers and volunteers is not set.",
    recommendation: "Count the adults and give suppliers one total in writing. The decks already promise a final headcount before anything is ordered.",
    affects: ["juicipatties", "islandgrill", "wisynco", "mayberryfoundation"],
    holdSending: false,
  },
  {
    id: "one-lunch-provider",
    question: "Juici Patties and Island Grill are both asked for the same lunch.",
    recommendation: "Approach one at a time. Send the second only if the first declines, or change it to snacks or a second meal.",
    affects: ["juicipatties", "islandgrill"],
    holdSending: true,
  },
  {
    id: "award-presenters",
    question: "Best Design is mentioned in both the Figma and MacSpot decks. Each award can have one presenting partner.",
    recommendation: "First partner to confirm takes it. Record it in awards.ts and remove it from the other deck before it goes out again.",
    affects: ["figmaeducation", "macspot", "usainboltfoundation"],
    holdSending: false,
  },
  {
    id: "venue-wifi",
    question: "Nobody has tested whether the venue's Wi-Fi can carry about 80 students working at once.",
    recommendation: "Test it at the hotel before the event. If it falls short, arrange extra connectivity directly.",
    affects: ["replit", "obvious"],
    holdSending: false,
  },
  {
    id: "recap-commitment",
    question: "Every deck promises a written recap after the event. Its timing is not set.",
    recommendation: "Commit to sending it within 30 days, and decide who writes it.",
    affects: [],
    holdSending: false,
  },
  {
    id: "event-shirts",
    question: "Gold and Platinum include a shirt logo only if shirts are produced. That has not been decided.",
    recommendation: "Decide before any Gold or Platinum partner confirms, and tell them the artwork deadline.",
    affects: [],
    holdSending: false,
  },
  {
    id: "pickle-redemption",
    question: "The Pickle & Chill deck does not say which team would receive the vouchers or what the redemption conditions are.",
    recommendation: "Attach the experience to one existing award, and agree conditions with the club before announcing it.",
    affects: ["pickleandchill"],
    holdSending: false,
  },
  {
    id: "named-recipients",
    question: "Six decks are addressed to a team, because no current individual was verified.",
    recommendation: "Add a named recipient once an introduction is made.",
    affects: ["sos", "digiview", "tankweld", "pickleandchill", "gracekennedyfoundation", "sandalsfoundation"],
    holdSending: false,
  },
  {
    id: "date-dependent-applications",
    question: "Replit and Seeed take applications against a confirmed event date. The date is still tentative.",
    recommendation: "Hold both applications until schools confirm the date.",
    affects: ["replit", "seeedstudio"],
    holdSending: true,
  },
];
