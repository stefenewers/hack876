# Partnership decks: audit and upgrade record

Internal. 13 October 2026.

## Baseline

- Commit: `17ab4cf` (Add six partnership decks and an exploratory brief option).
- Inventory: 36 decks, taken from `src/data/sponsorDecks/registry.ts` and checked against `src/app/*opportunity`. No route or PDF was missing from the registry. The other six PDFs in `public/proposals/` are school materials and are out of scope.
- Source files: 27 decks are data files in `src/data/sponsorDecks/` rendered by `src/components/proposal/SponsorDeck.tsx`. Nine are hand-built pages: Loring, GK General Insurance, Scotia Investments, JMMB, Cardinal Law, Norus, MacSpot, MLH and Obvious.
- Baseline page counts and key asks are in `completion-matrix.md`.

## What was wrong

1. The ask arrived late. In the shared template it was page 8 to 11 of 12 to 16. In the hand-built corporate decks it was page 11 of 19 to 21.
2. Every deck spent five or more pages on Hack876 itself and on the organisation's history before saying what was wanted.
3. No deck named a Hack876 contact other than a general email, and none said who was accountable.
4. 23 decks proposed a new named award. Hack876 has three special awards.
5. Several decks carried stale or contradictory facts: delivery "to the host school, once the venue and date are set" (WATA), "simple to plan once the date and venue are set" (Juici), "on a school campus" (USF), "the host school's safeguarding rules" (Digicel, NCB), and "9 partner schools" (Loring, GK General Insurance). The venue has been confirmed as Spanish Court Hotel, and only one school has confirmed.
6. School lists had no status on them in most decks.
7. Corporate decks sold "proximity to emerging talent", a "talent pipeline" and "visibility", which an inaugural event of about 80 students cannot support.
8. Catering decks named a student count but no adults, timing or delivery point.
9. The AFJ deck showed a JMD sponsorship ladder to a US grant-maker with its own grant range.
10. Mayberry's deck stated that its policy excludes contributions to individuals, and proposed an award and transport in the same breath.

## What changed

- **Reading order.** Every deck now opens with one page that states what Hack876 is, why this organisation, the request, what it makes possible, what the organisation receives, the next step and the organisers' names. The pages after it are: why, request, how it would work, why Hack876 can deliver, evidence and next decision, appendix. Shorter formats merge or drop pages.
- **Content model.** `brief` was added to the deck type and is required. `ask.presents` replaced `ask.award`. `ask.figure` lets a funder's own terms replace a level. `questions`, `futurePaths` and `story.art` were removed.
- **Shared facts.** `src/data/partnership.ts` derives the organisers, contact, school status labels, delivery facts, reporting commitment and safeguards from `event.ts`. Decks use tokens such as `{students}` and `{venue}`.
- **Awards.** No deck proposes a new award. `awards.ts` records the three places an existing award is mentioned.
- **Decisions.** Open organiser decisions are in `decisions.ts`, one entry each, not spread through the decks.
- **Hand-built decks.** Restructured to the same order with the shared sections. About 6,400 lines of page code were removed.
- **Length.** Total PDF pages went from 505 to 207 across the 36 decks.

## Research

No new organisation research was needed for this pass, because it removed claims and did not add any. The sources for the six newest decks were reopened on 13 October 2026 and are in `research-notes.md`. Sources for the other thirty were verified when those decks were written and are listed in each deck; they were not reopened in this pass.

## Verification

- All 36 decks render with one PDF page per section and no overflow, measured in print layout.
- Contact sheets of the final PDFs were reviewed for 34 of the 36. Seprod Foundation and JN Foundation were reviewed on an earlier render and share their templates with decks reviewed on the final one.
- `npm test`, typecheck, lint and build pass.

## Follow-up, same day: no requests for people

The organisers do not need mentors, judges, speakers or volunteers from partners. Norus is the exception, its team has agreed to come, and its deck was left as it was.

- The "how it would work" page, with its people-in-the-room list, was removed from the shared template. Major decks are now six pages and smaller cash decks five.
- `roles`, `paths` and `bridge` were removed from the deck type. A test fails if a deck asks for people.
- Microsoft and Tank-Weld lead with a contribution again (Gold and Silver). The USF and British Council briefs were reduced to requests for information, then withdrawn (see below).
- The "people in the room" pages were removed from Loring, GK General Insurance, Scotia, JMMB and Cardinal Law, and the "show up" page from Obvious. Cardinal Law now leads with a contribution, not a legal session.
- The extra Platinum benefits pages were removed from Loring and GK General Insurance, so both now show only the shared Platinum benefits.

## Decks withdrawn

British Council Jamaica and the Universal Service Fund were removed on 13 October 2026. Once requests for people were dropped, neither had a request worth sending. The inventory is now 34 decks.

## Not changed

- Student prizes, eligibility, the date, the venue and school statuses in `event.ts`.
- The contribution levels and their boundaries.
- The Partnership Hub's behaviour.
- The Norus deck, in the follow-up above.
