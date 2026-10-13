# Sponsor decks

Private proposals for sponsors and partners. Each is a page at `/<slug>opportunity` with a pre-generated PDF in `public/proposals/`.

## The sponsorship structure

Defined once in [`src/data/sponsorship.ts`](../sponsorship.ts). Do not restate amounts in a deck.

| Level | Contribution |
|---|---|
| Bronze Partner | J$50,000 to below J$200,000 |
| Silver Partner | J$200,000 to below J$500,000 |
| Gold Partner | J$500,000 to below J$1,000,000 |
| Platinum Partner | J$1,000,000+ |

Plus **In-kind & Community Support** for devices, gift cards, meals, refreshments, supplies, connectivity, expertise, and contributions below J$50,000.

Two ideas are kept apart:

- **Level** is how much a sponsor contributes. Any amount within a band is welcome.
- **Purpose** is what the contribution could help support (prizes, meals, equipment and so on). A sponsor never has to fund a whole cost, so write "contributes toward" or "helps support", not "covers" or "funds".

Rules that apply to every deck:

- Sponsorship asks are in JMD. No exchange rate is assumed anywhere. Keep USD only in sourced facts about an organisation and in real product-credit denominations.
- Benefits are proposed, to be agreed when a sponsorship is confirmed. No level carries naming rights or influence over judging.
- Student prize commitments live in `src/data/event.ts`. Decks describe the prize items without their values.
- A deck is a proposal. Never state that an organisation has agreed, been contacted, or is a sponsor.

## Adding a deck

1. Add `src/data/sponsorDecks/<slug>.ts` exporting a `SponsorDeckData` (see `types.ts`). In `ask`, set:
   - `lead`: `"band"` for a cash ask, `"inkind"` for goods, services, people or product access.
   - `band`: the suggested level.
   - `bands`: omit to show all four, list some to limit them, or use `[]` for no cash ladder (tool and product-access briefs).
   - `uses`: what a contribution could help support.
   - `restriction`: any funding rule the organisation has, such as no grants to individuals.
2. Add `src/app/<slug>opportunity/page.tsx` rendering `<SponsorDeck deck={deck} />`.
3. Add the route to the `X-Robots-Tag` list in `next.config.ts`.
4. **Add one entry to [`registry.ts`](./registry.ts).** This is what makes the deck appear in the Partnership Hub at `/partnerhub`. `npm test` fails if a deck page has no registry entry or an entry points at a missing file.
5. Generate the PDF from the page's print layout into `public/proposals/` and check it. PDFs are pre-generated, not live exports, so regenerate one whenever its page changes.

Hand-built pages (Loring, GraceKennedy, Scotia, JMMB, Cardinal Law, Norus, MacSpot, MLH, Obvious) use the same shared pieces from `src/components/proposal/Sponsorship.tsx`.

## The Partnership Hub

`/partnerhub` lists every entry in `registry.ts` with search, category filters, and links to view, download or copy each proposal. It is unlisted, not private: anyone with the link can open it. It is not linked from the public site and is marked noindex. School participation materials are not sponsor decks and do not belong in the registry.
