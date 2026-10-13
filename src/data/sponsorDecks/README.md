# Partnership decks

Private proposals for sponsors and partners. Each is a page at `/<slug>opportunity` with a pre-generated PDF in `public/proposals/`.

A deck has one job: let a decision-maker answer five questions quickly. Why us, what are they asking for, what does it achieve, can they deliver, and what do we do next.

## Start with the opening summary

Before anything else, write the deck's `brief`. It is the whole proposal in five sentences, and it is page one.

| Field | Answers |
|---|---|
| `fit` | Why this organisation, built on one verified fact |
| `request` | The primary request. One request, not a menu |
| `enables` | What that contribution makes possible on the day |
| `outcome` | What the organisation receives or achieves |
| `next` | The decision or reply we are asking for |
| `logistics` | Supplier decks only: quantities, timing and delivery |

If the brief does not make sense on its own, the deck is not ready. Rules for writing it:

- No amounts. The level's range is added from `sponsorship.ts`.
- No invented reach, impressions, hires or pipelines. About 80 students in a first-year event is what it is.
- Use `{students}`, `{teams}`, `{venue}`, `{date}`, `{lunch}`, `{doors}` and `{wrap}` for shared facts. They are filled from `event.ts`, so a deck cannot drift from the site.
- Say "contributes toward" or "helps support". A partner never has to cover a whole cost.

## Pick the shortest format that fits

The format follows from `kind` and `ask.lead` (see [`framing.ts`](./framing.ts)).

| Format | When | Pages |
|---|---|---|
| Major | `kind: "full"` with a cash lead | Summary, why, request, how it would work, delivery, next decision, appendix |
| Standard | `kind: "prize"` with a cash lead | Summary, why, request, how it would work, delivery and next decision, appendix |
| Supplier | `ask.lead: "inkind"` or `kind: "tool"` | Summary, request, (terms for tools), delivery and next decision, levels if cash is an alternative |
| Exploratory | `ask.lead: "exploratory"` | Summary, what we understand and what we would ask |

Do not pad a deck to look bigger, and do not shrink text to fit. If a page has nothing to say, the format drops it.

## Where each kind of fact lives

| Fact | File |
|---|---|
| Date, venue, schools and their status, people, prizes, schedule | `src/data/event.ts` |
| Organisers, contact, delivery facts, reporting, safeguards | `src/data/partnership.ts` |
| Contribution levels, benefits, purposes, in-kind rules | `src/data/sponsorship.ts` |
| Everything about one organisation | `src/data/sponsorDecks/<slug>.ts` |
| Which award is mentioned in which deck | [`awards.ts`](./awards.ts), internal |
| Open organiser decisions | [`decisions.ts`](./decisions.ts), internal |

Never copy a shared fact into a deck. A school's status, the venue and the student count are the usual offenders.

## The contribution levels

| Level | Contribution |
|---|---|
| Bronze Partner | J$50,000 to below J$200,000 |
| Silver Partner | J$200,000 to below J$500,000 |
| Gold Partner | J$500,000 to below J$1,000,000 |
| Platinum Partner | J$1,000,000+ |

Plus **In-kind & Community Support** for goods, services, expertise and contributions below J$50,000.

The levels are the commercial framework underneath a tailored proposal. They sit in the appendix, with the suggested level shown on the request page. Do not lead a deck with the benefits table.

- Asks are in JMD. No exchange rate is assumed. Keep USD only in sourced facts about an organisation, in a funder's own grant terms, and in real product denominations.
- Benefits are proposed, to be agreed. No level carries naming rights or influence over judging. The shirt logo applies only if shirts are produced.
- Volunteer hours and the advertised value of software credits are not counted as cash.
- Where a funder sets its own terms, set `ask.figure` (for example "A programme grant") and `bands: []` instead of forcing a level.

## Awards

The only special awards are the ones in `event.ts`. A deck may not invent an award to personalise a pitch. It may suggest that a partner present one existing award by setting `ask.presents`, and that use must be recorded in `awards.ts`. Each award has one presenter: first to confirm takes it.

## Exploratory briefs

For an organisation whose published rules may not cover Hack876, or whose window is closed, do not write a sponsorship ask. Set `lead: "exploratory"`, `bands: []`, no `band`, a sourced `restriction`, and put the questions we would ask in `inkind`. The brief shows no amount, no levels and no partner title. Never state or imply that Hack876 is eligible, that a window is open, or that a late submission would be accepted.

## Adding a deck

1. Write `src/data/sponsorDecks/<slug>.ts`, starting with `brief`. Every organisation-specific claim needs a `ref` to an entry in `sources`.
2. Add `src/app/<slug>opportunity/page.tsx` rendering `<SponsorDeck deck={deck} />`.
3. Add the route to the `X-Robots-Tag` list in `next.config.ts`.
4. Add one entry to [`registry.ts`](./registry.ts). That is what puts it in the Partnership Hub.
5. Generate the PDF from the page's print layout into `public/proposals/` and look at every page.
6. Run `npm test`. It checks that the registry resolves, the levels are contiguous, every deck has a complete summary, no format renders an empty page, exploratory briefs carry no cash ask, shared facts are not duplicated, and no deck invents an award.

Hand-built pages (Loring, GK General Insurance, Scotia, JMMB, Cardinal Law, Norus, MacSpot, MLH, Obvious) follow the same order using `OpeningSummary`, `DeliverySection`, `NextSection` and `DeliveryAndNext` from `src/components/proposal/PartnershipSections.tsx`.

## Internal records

Research notes, the audit, the completion matrix and the decision register are internal. `decisions.ts` and `awards.ts` must never be imported by a page or component, and the tests enforce it. See `docs/partnerships/`.

## The Partnership Hub

`/partnerhub` lists every entry in `registry.ts` with search, category filters, and links to view, download or copy each proposal. It is unlisted, not access-controlled: anyone with the link can open it. It is not linked from the public site and is marked noindex. School participation materials are not partnership decks and do not belong in the registry.
